'use client'

import { useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Check, Download, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  OnboardingData,
  emptyOnboarding,
  DAYS,
  SHIFT_OPTIONS,
  SETTINGS_OPTIONS,
  SKILL_OPTIONS,
} from './types'
import { validate, ValidationErrors } from './validation'
import {
  Field,
  TextInput,
  TextArea,
  Select,
  RadioGroup,
  CheckboxGroup,
  Checkbox,
  FieldGrid,
  EmailField,
  PhoneField,
  NiNumberField,
  AddressFields,
} from '../fields'

type SectionDef = { id: string; label: string }
const SECTIONS: SectionDef[] = [
  { id: 'personal',      label: 'Personal' },
  { id: 'contact',       label: 'Contact & address' },
  { id: 'emergency',     label: 'Emergency contact' },
  { id: 'bank',          label: 'Bank details' },
  { id: 'payroll',       label: 'Tax & payroll' },
  { id: 'contract',      label: 'Contract' },
  { id: 'availability',  label: 'Availability' },
  { id: 'preferences',   label: 'Work preferences' },
  { id: 'transport',     label: 'Transport' },
  { id: 'declaration',   label: 'Declaration' },
]

const YN = [
  { value: 'yes', label: 'Yes' },
  { value: 'no',  label: 'No' },
]

export function OnboardingClient() {
  const [data, setData] = useState<OnboardingData>(emptyOnboarding)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [phase, setPhase] = useState<'form' | 'review' | 'done'>('form')
  const [submitting, setSubmitting] = useState(false)
  const [downloadName, setDownloadName] = useState('')
  const errorBannerRef = useRef<HTMLDivElement | null>(null)

  const update = <K extends keyof OnboardingData>(key: K, patch: Partial<OnboardingData[K]>) => {
    setData(
      (d) =>
        ({
          ...d,
          [key]: { ...(d[key] as Record<string, unknown>), ...patch },
        }) as OnboardingData,
    )
  }

  const setPersonal     = (p: Partial<OnboardingData['personal']>)     => update('personal', p)
  const setContact      = (p: Partial<OnboardingData['contact']>)      => update('contact', p)
  const setAddress      = (p: Partial<OnboardingData['address']>)      => update('address', p)
  const setEmergency    = (p: Partial<OnboardingData['emergency']>)    => update('emergency', p)
  const setBank         = (p: Partial<OnboardingData['bank']>)         => update('bank', p)
  const setPayroll      = (p: Partial<OnboardingData['payroll']>)      => update('payroll', p)
  const setContract     = (p: Partial<OnboardingData['contract']>)     => update('contract', p)
  const setAvailability = (p: Partial<OnboardingData['availability']>) => update('availability', p)
  const setPreferences  = (p: Partial<OnboardingData['preferences']>)  => update('preferences', p)
  const setTransport    = (p: Partial<OnboardingData['transport']>)    => update('transport', p)
  const setDeclaration  = (p: Partial<OnboardingData['declaration']>)  => update('declaration', p)

  const errorList = useMemo(
    () => Object.entries(errors).map(([k, v]) => ({ key: k, msg: v })),
    [errors],
  )

  const handleValidate = (): boolean => {
    const e = validate(data)
    setErrors(e)
    if (Object.keys(e).length > 0) {
      requestAnimationFrame(() => {
        errorBannerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
      return false
    }
    return true
  }

  const goToReview = () => {
    if (handleValidate()) {
      setPhase('review')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const generatePdf = async () => {
    setSubmitting(true)
    try {
      const { generateOnboardingPdf, buildPdfFilename } = await import('./pdf')
      const doc = generateOnboardingPdf(data)
      const filename = buildPdfFilename(data)
      doc.save(filename)
      setDownloadName(filename)
      setPhase('done')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      console.error('PDF generation failed', err)
      alert('Sorry — we couldn't generate your PDF. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (phase === 'done') {
    return <DoneScreen filename={downloadName} onRedownload={generatePdf} />
  }

  if (phase === 'review') {
    return (
      <ReviewScreen
        data={data}
        onEdit={() => setPhase('form')}
        onConfirm={generatePdf}
        submitting={submitting}
      />
    )
  }

  return (
    <div className="grid lg:grid-cols-[220px_minmax(0,1fr)] gap-10 lg:gap-16">
      {/* Sticky nav */}
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <p className="section-kicker text-ink-muted-dark mb-4">On this page</p>
          <ol className="space-y-1.5 text-[12.5px]">
            {SECTIONS.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="flex items-baseline gap-2 text-ink-muted-dark hover:text-ink-dark transition-colors leading-snug"
                >
                  <span className="font-mono text-[10px] text-ink-muted-dark/60 w-5 flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{s.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </aside>

      <form
        noValidate
        onSubmit={(e) => { e.preventDefault(); goToReview() }}
        className="space-y-16"
      >
        {/* Error banner */}
        {errorList.length > 0 && (
          <div
            ref={errorBannerRef}
            role="alert"
            className="border border-amber/40 bg-amber/5 rounded-md p-5"
          >
            <p className="font-display text-ink-dark text-[16px] mb-2">
              Please fix {errorList.length} {errorList.length === 1 ? 'issue' : 'issues'} before continuing.
            </p>
            <ul className="text-[13px] text-ink-muted-dark space-y-1 list-disc pl-5">
              {errorList.slice(0, 6).map((e) => (
                <li key={e.key}>{e.msg}</li>
              ))}
              {errorList.length > 6 && <li>…and {errorList.length - 6} more.</li>}
            </ul>
          </div>
        )}

        {/* 01 — Personal */}
        <Section id="personal" number="01" title="Personal details">
          <FieldGrid cols={4}>
            <Field label="Title" htmlFor="p-title">
              <Select
                id="p-title"
                value={data.personal.title}
                onChange={(v) => setPersonal({ title: v })}
                options={[
                  { value: '',      label: 'Select…' },
                  { value: 'Mr',    label: 'Mr' },
                  { value: 'Mrs',   label: 'Mrs' },
                  { value: 'Miss',  label: 'Miss' },
                  { value: 'Ms',    label: 'Ms' },
                  { value: 'Mx',    label: 'Mx' },
                  { value: 'Dr',    label: 'Dr' },
                  { value: 'Other', label: 'Other' },
                ]}
              />
            </Field>
            <Field label="First name" required htmlFor="p-first" error={errors['personal.firstName']}>
              <TextInput
                id="p-first"
                autoComplete="given-name"
                value={data.personal.firstName}
                onChange={(v) => setPersonal({ firstName: v })}
                invalid={Boolean(errors['personal.firstName'])}
              />
            </Field>
            <Field label="Middle name(s)" htmlFor="p-middle">
              <TextInput
                id="p-middle"
                autoComplete="additional-name"
                value={data.personal.middleNames}
                onChange={(v) => setPersonal({ middleNames: v })}
              />
            </Field>
            <Field label="Surname" required htmlFor="p-last" error={errors['personal.surname']}>
              <TextInput
                id="p-last"
                autoComplete="family-name"
                value={data.personal.surname}
                onChange={(v) => setPersonal({ surname: v })}
                invalid={Boolean(errors['personal.surname'])}
              />
            </Field>
          </FieldGrid>
          <FieldGrid cols={4}>
            <Field label="Preferred name" htmlFor="p-pref" hint="What we should call you">
              <TextInput
                id="p-pref"
                value={data.personal.preferredName}
                onChange={(v) => setPersonal({ preferredName: v })}
              />
            </Field>
            <Field label="Date of birth" required htmlFor="p-dob" error={errors['personal.dob']}>
              <TextInput
                id="p-dob"
                type="date"
                autoComplete="bday"
                value={data.personal.dob}
                onChange={(v) => setPersonal({ dob: v })}
                invalid={Boolean(errors['personal.dob'])}
              />
            </Field>
            <Field label="Gender" htmlFor="p-gender">
              <Select
                id="p-gender"
                value={data.personal.gender}
                onChange={(v) => setPersonal({ gender: v })}
                options={[
                  { value: '',              label: 'Prefer not to say' },
                  { value: 'Female',        label: 'Female' },
                  { value: 'Male',          label: 'Male' },
                  { value: 'Non-binary',    label: 'Non-binary' },
                  { value: 'Self-describe', label: 'Self-describe' },
                ]}
              />
            </Field>
            <Field label="Pronouns" htmlFor="p-pronouns">
              <TextInput
                id="p-pronouns"
                placeholder="e.g. she/her"
                value={data.personal.pronouns}
                onChange={(v) => setPersonal({ pronouns: v })}
              />
            </Field>
          </FieldGrid>
        </Section>

        {/* 02 — Contact & address */}
        <Section id="contact" number="02" title="Contact & address">
          <FieldGrid cols={3}>
            <EmailField
              id="c-email"
              label="Email"
              required
              value={data.contact.email}
              onChange={(v) => setContact({ email: v })}
              error={errors['contact.email']}
              autoComplete="email"
            />
            <PhoneField
              id="c-mobile"
              label="Mobile"
              required
              value={data.contact.mobile}
              onChange={(v) => setContact({ mobile: v })}
              error={errors['contact.mobile']}
              placeholder="07700 000000"
              autoComplete="tel"
            />
            <PhoneField
              id="c-tel"
              label="Telephone (alternative)"
              value={data.contact.telephone}
              onChange={(v) => setContact({ telephone: v })}
            />
          </FieldGrid>
          <AddressFields
            value={data.address}
            onChange={setAddress}
            errors={{
              line1:    errors['address.line1'],
              town:     errors['address.town'],
              postcode: errors['address.postcode'],
            }}
            idPrefix="ob-addr"
          />
        </Section>

        {/* 03 — Emergency contact */}
        <Section id="emergency" number="03" title="Emergency contact">
          <FieldGrid cols={2}>
            <Field label="Full name" required error={errors['emergency.name']}>
              <TextInput
                value={data.emergency.name}
                onChange={(v) => setEmergency({ name: v })}
                invalid={Boolean(errors['emergency.name'])}
              />
            </Field>
            <Field label="Relationship" required error={errors['emergency.relationship']}>
              <TextInput
                placeholder="Partner, parent, sibling…"
                value={data.emergency.relationship}
                onChange={(v) => setEmergency({ relationship: v })}
                invalid={Boolean(errors['emergency.relationship'])}
              />
            </Field>
          </FieldGrid>
          <FieldGrid cols={2}>
            <PhoneField
              label="Phone"
              required
              value={data.emergency.phone}
              onChange={(v) => setEmergency({ phone: v })}
              error={errors['emergency.phone']}
            />
            <EmailField
              label="Email"
              value={data.emergency.email}
              onChange={(v) => setEmergency({ email: v })}
            />
          </FieldGrid>
        </Section>

        {/* 04 — Bank details */}
        <Section
          id="bank"
          number="04"
          title="Bank details"
          intro="Used for payroll only. Your bank details are stored securely and never shared beyond the payroll team."
        >
          <FieldGrid cols={2}>
            <Field
              label="Account name"
              required
              htmlFor="b-name"
              error={errors['bank.accountName']}
              hint="Full name exactly as it appears on your bank account"
            >
              <TextInput
                id="b-name"
                autoComplete="name"
                value={data.bank.accountName}
                onChange={(v) => setBank({ accountName: v })}
                invalid={Boolean(errors['bank.accountName'])}
              />
            </Field>
            <Field
              label="Bank / building society"
              required
              htmlFor="b-bank"
              error={errors['bank.bankName']}
            >
              <TextInput
                id="b-bank"
                placeholder="e.g. Barclays, Nationwide…"
                value={data.bank.bankName}
                onChange={(v) => setBank({ bankName: v })}
                invalid={Boolean(errors['bank.bankName'])}
              />
            </Field>
          </FieldGrid>
          <FieldGrid cols={2}>
            <Field
              label="Sort code"
              required
              htmlFor="b-sort"
              error={errors['bank.sortCode']}
              hint="6 digits, e.g. 01-02-03"
            >
              <TextInput
                id="b-sort"
                inputMode="numeric"
                placeholder="01-02-03"
                value={data.bank.sortCode}
                onChange={(v) => setBank({ sortCode: v })}
                invalid={Boolean(errors['bank.sortCode'])}
                maxLength={8}
              />
            </Field>
            <Field
              label="Account number"
              required
              htmlFor="b-acc"
              error={errors['bank.accountNumber']}
              hint="8 digits"
            >
              <TextInput
                id="b-acc"
                inputMode="numeric"
                placeholder="00000000"
                value={data.bank.accountNumber}
                onChange={(v) => setBank({ accountNumber: v })}
                invalid={Boolean(errors['bank.accountNumber'])}
                maxLength={8}
              />
            </Field>
          </FieldGrid>
        </Section>

        {/* 05 — Tax & payroll */}
        <Section
          id="payroll"
          number="05"
          title="Tax & payroll"
          intro="We need this to set you up on HMRC payroll correctly from your first pay run."
        >
          <FieldGrid cols={2}>
            <NiNumberField
              id="ni"
              value={data.payroll.niNumber}
              onChange={(v) => setPayroll({ niNumber: v })}
              error={errors['payroll.niNumber']}
            />
            <Field
              label="Do you have a P45 from your previous employer?"
              error={errors['payroll.hasPreviousP45']}
            >
              <RadioGroup
                name="p45"
                value={data.payroll.hasPreviousP45}
                onChange={(v) =>
                  setPayroll({ hasPreviousP45: v as 'yes' | 'no' })
                }
                options={YN}
                invalid={Boolean(errors['payroll.hasPreviousP45'])}
              />
            </Field>
          </FieldGrid>

          <Field
            label="Starter declaration"
            required
            error={errors['payroll.starterDeclaration']}
            hint="This tells HMRC which tax code to use from your first pay day. Choose the statement that applies to you."
          >
            <RadioGroup
              name="starter-decl"
              value={data.payroll.starterDeclaration}
              onChange={(v) =>
                setPayroll({
                  starterDeclaration: v as 'A' | 'B' | 'C',
                })
              }
              options={[
                {
                  value: 'A',
                  label: 'A — First job since 6 April, no state benefit or occupational pension',
                },
                {
                  value: 'B',
                  label: 'B — Only job now, but had another job or received state benefit / pension since 6 April',
                },
                {
                  value: 'C',
                  label: 'C — I have another job or receive a state or occupational pension',
                },
              ]}
              invalid={Boolean(errors['payroll.starterDeclaration'])}
            />
          </Field>

          <FieldGrid cols={2}>
            <Field label="Do you have a student loan?" error={errors['payroll.studentLoan']}>
              <RadioGroup
                name="student-loan"
                value={data.payroll.studentLoan}
                onChange={(v) =>
                  setPayroll({
                    studentLoan: v as 'yes' | 'no',
                    studentLoanPlan: v === 'no' ? '' : data.payroll.studentLoanPlan,
                  })
                }
                options={YN}
              />
            </Field>
            {data.payroll.studentLoan === 'yes' && (
              <Field label="Student loan plan" htmlFor="sl-plan">
                <Select
                  id="sl-plan"
                  value={data.payroll.studentLoanPlan}
                  onChange={(v) =>
                    setPayroll({
                      studentLoanPlan: v as OnboardingData['payroll']['studentLoanPlan'],
                    })
                  }
                  options={[
                    { value: '',        label: 'Select…' },
                    { value: 'plan1',   label: 'Plan 1 (pre-Sept 2012 / NI / Scottish)' },
                    { value: 'plan2',   label: 'Plan 2 (post-Sept 2012 England/Wales)' },
                    { value: 'plan4',   label: 'Plan 4 (Scottish loan from 2021)' },
                    { value: 'postgrad', label: 'Postgraduate loan' },
                  ]}
                />
              </Field>
            )}
          </FieldGrid>
        </Section>

        {/* 06 — Contract preference */}
        <Section
          id="contract"
          number="06"
          title="Contract preference"
          intro="This helps us get the right paperwork ready before your first shift."
        >
          <FieldGrid cols={4}>
            <Field label="Contract type" htmlFor="ct-type">
              <Select
                id="ct-type"
                value={data.contract.type}
                onChange={(v) =>
                  setContract({ type: v as OnboardingData['contract']['type'] })
                }
                options={[
                  { value: 'zero-hours', label: 'Zero-hours' },
                  { value: 'part-time',  label: 'Part-time (fixed hours)' },
                  { value: 'full-time',  label: 'Full-time (fixed hours)' },
                ]}
              />
            </Field>
            <Field
              label="Minimum hours / week"
              htmlFor="ct-min"
              hint="Leave blank if flexible"
            >
              <TextInput
                id="ct-min"
                inputMode="numeric"
                placeholder="e.g. 16"
                value={data.contract.hoursMin}
                onChange={(v) => setContract({ hoursMin: v })}
              />
            </Field>
            <Field
              label="Maximum hours / week"
              htmlFor="ct-max"
              hint="Leave blank if flexible"
            >
              <TextInput
                id="ct-max"
                inputMode="numeric"
                placeholder="e.g. 40"
                value={data.contract.hoursMax}
                onChange={(v) => setContract({ hoursMax: v })}
              />
            </Field>
            <Field
              label="Earliest available start date"
              required
              htmlFor="ct-start"
              error={errors['contract.earliestStart']}
            >
              <TextInput
                id="ct-start"
                type="date"
                value={data.contract.earliestStart}
                onChange={(v) => setContract({ earliestStart: v })}
                invalid={Boolean(errors['contract.earliestStart'])}
              />
            </Field>
          </FieldGrid>
        </Section>

        {/* 07 — Availability */}
        <Section id="availability" number="07" title="Availability">
          <Field label="Available days" required error={errors['availability.days']}>
            <CheckboxGroup
              values={data.availability.days}
              onChange={(v) => setAvailability({ days: v })}
              options={DAYS}
            />
          </Field>
          <Field label="Shift preferences">
            <CheckboxGroup
              values={data.availability.shifts}
              onChange={(v) => setAvailability({ shifts: v })}
              options={SHIFT_OPTIONS}
            />
          </Field>
        </Section>

        {/* 08 — Work preferences */}
        <Section id="preferences" number="08" title="Work preferences">
          <Field label="Care settings you're happy to work in">
            <CheckboxGroup
              values={data.preferences.settings}
              onChange={(v) => setPreferences({ settings: v })}
              options={SETTINGS_OPTIONS}
            />
          </Field>
          <Field label="Skills & specialisms">
            <CheckboxGroup
              values={data.preferences.skills}
              onChange={(v) => setPreferences({ skills: v })}
              options={SKILL_OPTIONS}
            />
          </Field>
          <Field
            label="Anything else we should know?"
            htmlFor="pref-notes"
            hint="Languages spoken, specific client preferences, conditions you have experience with, etc."
          >
            <TextArea
              id="pref-notes"
              rows={4}
              value={data.preferences.additionalNotes}
              onChange={(v) => setPreferences({ additionalNotes: v })}
            />
          </Field>
        </Section>

        {/* 09 — Transport */}
        <Section id="transport" number="09" title="Transport">
          <FieldGrid cols={4}>
            <Field label="Do you have your own car?" error={errors['transport.hasCar']}>
              <RadioGroup
                name="t-car"
                value={data.transport.hasCar}
                onChange={(v) =>
                  setTransport({
                    hasCar: v as 'yes' | 'no',
                    businessInsurance: v === 'no' ? '' : data.transport.businessInsurance,
                  })
                }
                options={YN}
                invalid={Boolean(errors['transport.hasCar'])}
              />
            </Field>
            {data.transport.hasCar === 'yes' && (
              <>
                <Field label="Business-use insurance?">
                  <RadioGroup
                    name="t-ins"
                    value={data.transport.businessInsurance}
                    onChange={(v) =>
                      setTransport({
                        businessInsurance: v as 'yes' | 'no' | 'na',
                      })
                    }
                    options={[
                      { value: 'yes', label: 'Yes' },
                      { value: 'no',  label: 'No' },
                      { value: 'na',  label: 'N/A' },
                    ]}
                  />
                </Field>
                <Field
                  label="Max travel distance (miles)"
                  htmlFor="t-miles"
                  hint="How far you're willing to travel for a shift"
                >
                  <TextInput
                    id="t-miles"
                    inputMode="numeric"
                    placeholder="e.g. 10"
                    value={data.transport.maxTravelMiles}
                    onChange={(v) => setTransport({ maxTravelMiles: v })}
                  />
                </Field>
              </>
            )}
            <Field label="Do you use public transport?">
              <RadioGroup
                name="t-pt"
                value={data.transport.usesPublicTransport}
                onChange={(v) =>
                  setTransport({ usesPublicTransport: v as 'yes' | 'no' })
                }
                options={YN}
              />
            </Field>
          </FieldGrid>
        </Section>

        {/* 10 — Declaration */}
        <Section
          id="declaration"
          number="10"
          title="Declaration & signature"
          intro="Please read and confirm the statements below before signing."
        >
          <div className="space-y-4">
            <Checkbox
              checked={data.declaration.accuracy}
              onChange={(v) => setDeclaration({ accuracy: v })}
              invalid={Boolean(errors['declaration.accuracy'])}
              label="I confirm that all information provided in this form is, to the best of my knowledge, true and complete. I understand that any false statement or omission may result in the withdrawal of an offer or dismissal."
            />
            {errors['declaration.accuracy'] && (
              <p className="text-[12px] text-amber font-medium pl-7">
                {errors['declaration.accuracy']}
              </p>
            )}
            <Checkbox
              checked={data.declaration.dataConsent}
              onChange={(v) => setDeclaration({ dataConsent: v })}
              invalid={Boolean(errors['declaration.dataConsent'])}
              label={
                <>
                  I consent to Horizon Care Services Ltd processing the personal and financial data in this form for employment and payroll purposes. <span className="text-amber">*</span>
                </>
              }
            />
            {errors['declaration.dataConsent'] && (
              <p className="text-[12px] text-amber font-medium pl-7">
                {errors['declaration.dataConsent']}
              </p>
            )}
          </div>
          <FieldGrid cols={2}>
            <Field
              label="Signature (type your full name)"
              required
              htmlFor="sig"
              error={errors['declaration.signature']}
            >
              <TextInput
                id="sig"
                className="font-display italic text-[18px]"
                value={data.declaration.signature}
                onChange={(v) => setDeclaration({ signature: v })}
                invalid={Boolean(errors['declaration.signature'])}
              />
            </Field>
            <Field
              label="Date"
              required
              htmlFor="sig-date"
              error={errors['declaration.date']}
            >
              <TextInput
                id="sig-date"
                type="date"
                value={data.declaration.date}
                onChange={(v) => setDeclaration({ date: v })}
                invalid={Boolean(errors['declaration.date'])}
              />
            </Field>
          </FieldGrid>
        </Section>

        {/* Submit row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-8 border-t border-rule-light">
          <Link
            href="/work-for-us"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-ink-muted-dark hover:text-ink-dark transition-colors"
          >
            <ArrowLeft size={14} /> Back
          </Link>
          <button
            type="submit"
            className="interactive-lift inline-flex items-center gap-2 bg-deep text-ink-light px-7 py-3.5 rounded-md text-[14px] font-semibold hover:bg-ink-dark transition-colors"
          >
            Review & download <ArrowUpRight size={14} />
          </button>
        </div>
      </form>
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────────
function Section({
  id,
  number,
  title,
  intro,
  children,
}: {
  id: string
  number: string
  title: string
  intro?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24 space-y-6">
      <div>
        <p className="section-kicker text-ink-muted-dark mb-2">
          <span className="font-mono mr-2">{number}</span>Section
        </p>
        <h2
          className="font-display text-ink-dark leading-tight tracking-[-0.02em]"
          style={{
            fontSize: 'clamp(1.4rem, 2.2vw, 1.85rem)',
            fontVariationSettings: '"opsz" 24, "wght" 580',
          }}
        >
          {title}
        </h2>
        {intro && (
          <p className="text-ink-muted-dark text-[14px] leading-relaxed mt-3 max-w-[58ch]">
            {intro}
          </p>
        )}
      </div>
      <div className="space-y-6">{children}</div>
    </section>
  )
}

// ── Review screen ─────────────────────────────────────────────────
function ReviewScreen({
  data,
  onEdit,
  onConfirm,
  submitting,
}: {
  data: OnboardingData
  onEdit: () => void
  onConfirm: () => void
  submitting: boolean
}) {
  const name = [
    data.personal.title,
    data.personal.firstName,
    data.personal.middleNames,
    data.personal.surname,
  ]
    .filter((s) => s.trim())
    .join(' ')

  const contractLabels: Record<string, string> = {
    'zero-hours': 'Zero-hours',
    'part-time': 'Part-time',
    'full-time': 'Full-time',
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12">
        <p className="section-kicker text-ink-muted-dark mb-3">Step 2 of 2 · Review</p>
        <h2
          className="font-display text-ink-dark leading-tight tracking-[-0.02em] mb-4"
          style={{
            fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
            fontVariationSettings: '"opsz" 32, "wght" 580',
          }}
        >
          Review your details before downloading.
        </h2>
        <p className="text-ink-muted-dark text-[15px] leading-relaxed max-w-[60ch]">
          Check everything below carefully — your bank details and NI number are used for payroll. When you're ready, generate the PDF and hand it to your manager.
        </p>
      </div>

      <div className="border border-rule-light rounded-lg overflow-hidden">
        <div className="bg-deep text-ink-light px-7 py-6">
          <p className="text-[11px] tracking-[0.14em] uppercase text-ink-muted-light mb-1">
            Onboarding summary
          </p>
          <p
            className="font-display text-[22px]"
            style={{ fontVariationSettings: '"opsz" 22, "wght" 580' }}
          >
            {name || '—'}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-1 mt-3 text-[13px] text-ink-muted-light">
            <span>{data.contact.email}</span>
            <span>{data.contact.mobile}</span>
            <span>NI: {data.payroll.niNumber}</span>
          </div>
        </div>

        <div className="divide-y divide-rule-light">
          <ReviewBlock title="Personal details">
            <ReviewItem label="Full name" value={name} />
            <ReviewItem label="Date of birth" value={data.personal.dob} />
            <ReviewItem label="Gender" value={data.personal.gender} />
          </ReviewBlock>
          <ReviewBlock title="Contact">
            <ReviewItem label="Email" value={data.contact.email} />
            <ReviewItem label="Mobile" value={data.contact.mobile} />
            <ReviewItem
              label="Address"
              value={[
                data.address.line1,
                data.address.line2,
                data.address.town,
                data.address.postcode,
              ]
                .filter(Boolean)
                .join(', ')}
            />
          </ReviewBlock>
          <ReviewBlock title="Emergency contact">
            <ReviewItem
              label="Emergency contact"
              value={`${data.emergency.name} (${data.emergency.relationship}) · ${data.emergency.phone}`}
            />
          </ReviewBlock>
          <ReviewBlock title="Bank details">
            <ReviewItem label="Account name" value={data.bank.accountName} />
            <ReviewItem label="Sort code" value={data.bank.sortCode} />
            <ReviewItem label="Account number" value={data.bank.accountNumber} />
            <ReviewItem label="Bank" value={data.bank.bankName} />
          </ReviewBlock>
          <ReviewBlock title="Tax & payroll">
            <ReviewItem label="NI number" value={data.payroll.niNumber} />
            <ReviewItem label="Starter declaration" value={`Statement ${data.payroll.starterDeclaration}`} />
            <ReviewItem label="Student loan" value={data.payroll.studentLoan === 'yes' ? `Yes — ${data.payroll.studentLoanPlan}` : data.payroll.studentLoan} />
            <ReviewItem label="P45 available" value={data.payroll.hasPreviousP45} />
          </ReviewBlock>
          <ReviewBlock title="Contract & availability">
            <ReviewItem label="Contract type" value={contractLabels[data.contract.type] || ''} />
            <ReviewItem label="Earliest start" value={data.contract.earliestStart} />
            <ReviewItem label="Available days" value={data.availability.days.join(', ')} />
            <ReviewItem label="Shift preferences" value={data.availability.shifts.join(', ')} />
          </ReviewBlock>
          <ReviewBlock title="Transport">
            <ReviewItem label="Own car" value={data.transport.hasCar} />
            <ReviewItem label="Business insurance" value={data.transport.businessInsurance} />
            <ReviewItem label="Max travel (miles)" value={data.transport.maxTravelMiles} />
          </ReviewBlock>
          <ReviewBlock title="Declaration">
            <ReviewItem
              label="Signed"
              value={`${data.declaration.signature || '—'} on ${data.declaration.date || '—'}`}
            />
          </ReviewBlock>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-10">
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-2 text-[13px] font-medium text-ink-muted-dark hover:text-ink-dark transition-colors"
        >
          <ArrowLeft size={14} /> Edit details
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={submitting}
          className="interactive-lift inline-flex items-center gap-2 bg-amber text-ink-light px-7 py-3.5 rounded-md text-[14px] font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-wait"
        >
          {submitting ? (
            <>Generating PDF…</>
          ) : (
            <>
              Generate &amp; download PDF <Download size={14} />
            </>
          )}
        </button>
      </div>
    </div>
  )
}

function ReviewBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="px-7 py-6">
      <p className="section-kicker text-ink-muted-dark mb-4">{title}</p>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">{children}</dl>
    </div>
  )
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <dt className="text-[11px] font-semibold tracking-[0.08em] text-ink-muted-dark uppercase mb-0.5">
        {label}
      </dt>
      <dd className="text-[14px] text-ink-dark leading-snug break-words">
        {value && value.trim() ? value : <span className="text-ink-muted-dark/50">—</span>}
      </dd>
    </div>
  )
}

// ── Done screen ───────────────────────────────────────────────────
function DoneScreen({
  filename,
  onRedownload,
}: {
  filename: string
  onRedownload: () => void
}) {
  return (
    <div className="max-w-3xl mx-auto text-center py-10">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber/15 text-amber mb-7">
        <Check size={28} strokeWidth={2.5} />
      </div>
      <p className="section-kicker text-ink-muted-dark mb-3">Onboarding complete</p>
      <h2
        className="font-display text-ink-dark leading-tight tracking-[-0.02em] mb-5"
        style={{
          fontSize: 'clamp(1.8rem, 3.4vw, 2.8rem)',
          fontVariationSettings: '"opsz" 32, "wght" 580',
        }}
      >
        Your onboarding form has downloaded.
      </h2>
      <p className="text-ink-muted-dark text-[15px] leading-relaxed max-w-[54ch] mx-auto mb-8">
        Please hand the PDF to your manager or send it to{' '}
        <a
          href="mailto:hr@horizoncareservices.org"
          className="text-ink-dark underline underline-offset-2"
        >
          hr@horizoncareservices.org
        </a>
        . Your details will be added to payroll within 2 working days.
      </p>

      {filename && (
        <div className="inline-flex items-center gap-3 border border-rule-light rounded-md px-4 py-3 mb-8">
          <FileText size={16} className="text-ink-muted-dark" />
          <span className="font-mono text-[12.5px] text-ink-dark">{filename}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
        <button
          type="button"
          onClick={onRedownload}
          className="interactive-lift inline-flex items-center gap-2 border border-rule-light text-ink-dark px-5 py-2.5 rounded-md text-[13px] font-semibold hover:border-amber hover:text-amber transition-colors"
        >
          Download again <Download size={13} />
        </button>
      </div>
    </div>
  )
}
