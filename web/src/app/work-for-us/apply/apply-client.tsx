'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Check, Plus, Trash2, Download, FileText, Beaker } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  ApplicationData,
  emptyApplication,
  emptyEducation,
  emptyEmployment,
  DAYS,
  NATIONALITIES,
  SETTINGS_OPTIONS,
  SHIFT_OPTIONS,
  SKILL_OPTIONS,
  TRAINING_OPTIONS,
} from './types'
import { exampleApplication } from './example-data'
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

// References are hidden for now — kept in the codebase for re-enable later.
const SHOW_REFERENCES = false

type SectionDef = { id: string; label: string }
const SECTIONS: SectionDef[] = [
  { id: 'role', label: 'Role' },
  { id: 'personal', label: 'Personal' },
  { id: 'contact', label: 'Contact' },
  { id: 'address', label: 'Address' },
  { id: 'rtw', label: 'Right to work' },
  { id: 'identification', label: 'Identification' },
  { id: 'dbs', label: 'DBS' },
  { id: 'driving', label: 'Driving' },
  { id: 'experience', label: 'Experience' },
  { id: 'employment', label: 'Employment' },
  { id: 'education', label: 'Education' },
  { id: 'training', label: 'Training' },
  { id: 'skills', label: 'Skills' },
  ...(SHOW_REFERENCES ? [{ id: 'references', label: 'References' }] : []),
  { id: 'emergency', label: 'Emergency' },
  { id: 'declarations', label: 'Declarations' },
  { id: 'consent', label: 'Consent' },
]

const YN: Array<{ value: string; label: string }> = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
]

function readRoleFromUrl(): { code: string; title: string } {
  if (typeof window === 'undefined') return { code: '', title: '' }
  const sp = new URLSearchParams(window.location.search)
  return {
    code: (sp.get('code') || '').trim(),
    title: (sp.get('title') || '').trim(),
  }
}

export function ApplyClient() {
  const [data, setData] = useState<ApplicationData>(() => emptyApplication(readRoleFromUrl()))
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [phase, setPhase] = useState<'form' | 'review' | 'done'>('form')
  const [submitting, setSubmitting] = useState(false)
  const [downloadName, setDownloadName] = useState<string>('')
  const errorBannerRef = useRef<HTMLDivElement | null>(null)
  const [roleLocked, setRoleLocked] = useState<{ code: boolean; title: boolean }>({
    code: false,
    title: false,
  })

  // On mount in the browser, re-read the URL. This guarantees the role is
  // populated even if the static-export prerender resolved Suspense before
  // the URL was visible.
  useEffect(() => {
    const { code, title } = readRoleFromUrl()
    if (code || title) {
      setData((d) => ({
        ...d,
        role: { code: code || d.role.code, title: title || d.role.title },
      }))
      setRoleLocked({ code: Boolean(code), title: Boolean(title) })
    }
    // Listen for back/forward navigation that changes the query string.
    const onPop = () => {
      const next = readRoleFromUrl()
      if (next.code || next.title) {
        setData((d) => ({
          ...d,
          role: { code: next.code || d.role.code, title: next.title || d.role.title },
        }))
        setRoleLocked({ code: Boolean(next.code), title: Boolean(next.title) })
      }
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const fillExampleData = () => {
    setData(exampleApplication(data.role))
    setErrors({})
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const update = <K extends keyof ApplicationData>(
    key: K,
    patch: Partial<ApplicationData[K]>,
  ) => {
    setData(
      (d) =>
        ({
          ...d,
          [key]: { ...(d[key] as Record<string, unknown>), ...patch },
        }) as ApplicationData,
    )
  }

  const setRole = (patch: Partial<ApplicationData['role']>) => update('role', patch)
  const setPersonal = (patch: Partial<ApplicationData['personal']>) => update('personal', patch)
  const setContact = (patch: Partial<ApplicationData['contact']>) => update('contact', patch)
  const setAddress = (patch: Partial<ApplicationData['address']>) => update('address', patch)
  const setRTW = (patch: Partial<ApplicationData['rightToWork']>) => update('rightToWork', patch)
  const setID = (patch: Partial<ApplicationData['identification']>) => update('identification', patch)
  const setDBS = (patch: Partial<ApplicationData['dbs']>) => update('dbs', patch)
  const setDriving = (patch: Partial<ApplicationData['driving']>) => update('driving', patch)
  const setExperience = (patch: Partial<ApplicationData['experience']>) => update('experience', patch)
  const setTraining = (patch: Partial<ApplicationData['training']>) => update('training', patch)
  const setSkills = (patch: Partial<ApplicationData['skills']>) => update('skills', patch)
  const setEmergency = (patch: Partial<ApplicationData['emergency']>) => update('emergency', patch)
  const setDeclarations = (patch: Partial<ApplicationData['declarations']>) =>
    update('declarations', patch)
  const setConsent = (patch: Partial<ApplicationData['consent']>) => update('consent', patch)

  const errorList = useMemo(
    () => Object.entries(errors).map(([k, v]) => ({ key: k, msg: v })),
    [errors],
  )

  const handleValidate = (): boolean => {
    const e = validate(data)
    setErrors(e)
    if (Object.keys(e).length > 0) {
      // scroll to top banner
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
      // Lazy-load jsPDF only when needed (keeps the form chunk small).
      const { generateApplicationPdf, buildPdfFilename } = await import('./pdf')
      const doc = generateApplicationPdf(data)
      const filename = buildPdfFilename(data)
      doc.save(filename)
      setDownloadName(filename)
      setPhase('done')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      console.error('PDF generation failed', err)
      alert('Sorry — we couldn’t generate your PDF. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (phase === 'done') {
    return <DoneScreen data={data} filename={downloadName} onRedownload={generatePdf} />
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
      {/* Sticky section nav */}
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
        onSubmit={(e) => {
          e.preventDefault()
          goToReview()
        }}
        className="space-y-16"
      >
        {/* Test App — fills the form with example data for QA / preview.
            Remove or guard with NODE_ENV when going fully live. */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border border-amber/30 bg-amber/5 rounded-md px-5 py-4">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.1em] text-amber uppercase mb-1">
              Test mode
            </p>
            <p className="text-[13px] text-ink-muted-dark leading-snug">
              Auto-fill the entire form with realistic example data for testing the PDF output.
            </p>
          </div>
          <button
            type="button"
            onClick={fillExampleData}
            className="interactive-lift inline-flex items-center gap-2 bg-amber text-ink-light px-4 py-2 rounded-md text-[12.5px] font-semibold hover:opacity-90 transition-opacity flex-shrink-0"
          >
            <Beaker size={13} /> Fill with test data
          </button>
        </div>

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

        {/* 01 — Role */}
        <Section id="role" number="01" title="Role you’re applying for">
          <FieldGrid>
            <Field label="Job code" required htmlFor="role-code" error={errors['role.code']}>
              <TextInput
                id="role-code"
                value={data.role.code}
                onChange={(v) => setRole({ code: v })}
                readOnly={roleLocked.code}
                invalid={Boolean(errors['role.code'])}
              />
            </Field>
            <Field label="Job title" required htmlFor="role-title" error={errors['role.title']}>
              <TextInput
                id="role-title"
                value={data.role.title}
                onChange={(v) => setRole({ title: v })}
                readOnly={roleLocked.title}
                invalid={Boolean(errors['role.title'])}
              />
            </Field>
          </FieldGrid>
          {(roleLocked.code || roleLocked.title) && (
            <p className="mt-3 text-[12px] text-ink-muted-dark/80">
              These details have been filled in from the role you selected. To apply for a different role, use the back link below.
            </p>
          )}
        </Section>

        {/* 02 — Personal */}
        <Section id="personal" number="02" title="Personal details">
          <FieldGrid cols={4}>
            <Field label="Title" htmlFor="p-title">
              <Select
                id="p-title"
                value={data.personal.title}
                onChange={(v) => setPersonal({ title: v })}
                options={[
                  { value: '', label: 'Select…' },
                  { value: 'Mr', label: 'Mr' },
                  { value: 'Mrs', label: 'Mrs' },
                  { value: 'Miss', label: 'Miss' },
                  { value: 'Ms', label: 'Ms' },
                  { value: 'Mx', label: 'Mx' },
                  { value: 'Dr', label: 'Dr' },
                  { value: 'Other', label: 'Other' },
                ]}
              />
            </Field>
            <Field
              label="First name"
              required
              htmlFor="p-first"
              error={errors['personal.firstName']}
            >
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
                  { value: '', label: 'Prefer not to say' },
                  { value: 'Female', label: 'Female' },
                  { value: 'Male', label: 'Male' },
                  { value: 'Non-binary', label: 'Non-binary' },
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

        {/* 03 — Contact */}
        <Section id="contact" number="03" title="Contact details">
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
        </Section>

        {/* 04 — Address */}
        <Section id="address" number="04" title="Address">
          <AddressFields
            value={data.address}
            onChange={setAddress}
            errors={{
              line1: errors['address.line1'],
              town: errors['address.town'],
              postcode: errors['address.postcode'],
            }}
          />
        </Section>

        {/* 05 — Right to work */}
        <Section
          id="rtw"
          number="05"
          title="Right to work in the UK"
          intro="UK law requires us to verify the right to work for every applicant."
        >
          <FieldGrid cols={3}>
            <Field
              label="Nationality"
              required
              htmlFor="r-nat"
              error={errors['rightToWork.nationality']}
            >
              <Select
                id="r-nat"
                value={data.rightToWork.nationality}
                onChange={(v) =>
                  setRTW({
                    nationality: v,
                    nationalityOther:
                      v === 'Other' ? data.rightToWork.nationalityOther : '',
                  })
                }
                invalid={Boolean(errors['rightToWork.nationality'])}
                options={[
                  { value: '', label: 'Select…' },
                  ...NATIONALITIES.map((n) => ({ value: n, label: n })),
                ]}
              />
            </Field>
            <Field
              label="Right to work in the UK?"
              required
              error={errors['rightToWork.hasRightToWork']}
            >
              <RadioGroup
                name="rtw-yes"
                value={data.rightToWork.hasRightToWork}
                onChange={(v) =>
                  setRTW({ hasRightToWork: v as 'yes' | 'no' })
                }
                options={YN}
                invalid={Boolean(errors['rightToWork.hasRightToWork'])}
              />
            </Field>
            <Field
              label="Basis (e.g. British, Settled, Visa)"
              htmlFor="r-basis"
            >
              <TextInput
                id="r-basis"
                value={data.rightToWork.rightToWorkBasis}
                onChange={(v) => setRTW({ rightToWorkBasis: v })}
              />
            </Field>
          </FieldGrid>
          {data.rightToWork.nationality === 'Other' && (
            <FieldGrid>
              <Field
                label="Specify nationality"
                required
                htmlFor="r-nat-other"
                error={errors['rightToWork.nationalityOther']}
              >
                <TextInput
                  id="r-nat-other"
                  value={data.rightToWork.nationalityOther}
                  onChange={(v) => setRTW({ nationalityOther: v })}
                  invalid={Boolean(errors['rightToWork.nationalityOther'])}
                />
              </Field>
            </FieldGrid>
          )}
          {data.rightToWork.hasRightToWork === 'yes' && (
            <>
              <FieldGrid cols={2}>
                <Field label="Visa / immigration status" htmlFor="r-visa">
                  <TextInput
                    id="r-visa"
                    value={data.rightToWork.visaStatus}
                    onChange={(v) => setRTW({ visaStatus: v })}
                  />
                </Field>
                <Field label="Visa expiry date" htmlFor="r-visa-exp">
                  <TextInput
                    id="r-visa-exp"
                    type="date"
                    value={data.rightToWork.visaExpiry}
                    onChange={(v) => setRTW({ visaExpiry: v })}
                  />
                </Field>
              </FieldGrid>
              <FieldGrid cols={3}>
                <Field
                  label="Document type"
                  required
                  error={errors['rightToWork.documentType']}
                >
                  <Select
                    value={data.rightToWork.documentType}
                    onChange={(v) =>
                      setRTW({
                        documentType: v as ApplicationData['rightToWork']['documentType'],
                      })
                    }
                    options={[
                      { value: '', label: 'Select…' },
                      { value: 'brp', label: 'BRP (Biometric Residence Permit)' },
                      { value: 'evisa', label: 'eVisa' },
                      { value: 'share-code', label: 'Share code' },
                      { value: 'passport', label: 'British / Irish passport' },
                      { value: 'other', label: 'Other' },
                    ]}
                    invalid={Boolean(errors['rightToWork.documentType'])}
                  />
                </Field>
                <Field
                  label="Document reference"
                  htmlFor="r-doc-ref"
                  error={errors['rightToWork.documentRef']}
                  hint="BRP / eVisa reference number"
                >
                  <TextInput
                    id="r-doc-ref"
                    value={data.rightToWork.documentRef}
                    onChange={(v) => setRTW({ documentRef: v })}
                    invalid={Boolean(errors['rightToWork.documentRef'])}
                  />
                </Field>
                <Field
                  label="Share code"
                  htmlFor="r-share"
                  error={errors['rightToWork.shareCode']}
                  hint="From gov.uk/right-to-work, valid 90 days"
                >
                  <TextInput
                    id="r-share"
                    placeholder="W12 345 678"
                    value={data.rightToWork.shareCode}
                    onChange={(v) => setRTW({ shareCode: v.toUpperCase() })}
                    invalid={Boolean(errors['rightToWork.shareCode'])}
                  />
                </Field>
              </FieldGrid>
            </>
          )}
        </Section>

        {/* 06 — Identification */}
        <Section id="identification" number="06" title="Identification">
          <FieldGrid cols={2}>
            <NiNumberField
              id="ni"
              value={data.identification.niNumber}
              onChange={(v) => setID({ niNumber: v })}
              error={errors['identification.niNumber']}
            />
          </FieldGrid>
        </Section>

        {/* 07 — DBS */}
        <Section
          id="dbs"
          number="07"
          title="DBS status"
          intro="An enhanced DBS check is required for all roles. We can support you through the process if you don’t currently have one."
        >
          <FieldGrid cols={4}>
            <Field
              label="Do you have an enhanced DBS?"
              required
              error={errors['dbs.status']}
            >
              <RadioGroup
                name="dbs-status"
                value={data.dbs.status}
                onChange={(v) =>
                  setDBS({ status: v as 'yes' | 'no' | 'pending' })
                }
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'pending', label: 'Pending' },
                  { value: 'no', label: 'No' },
                ]}
                invalid={Boolean(errors['dbs.status'])}
              />
            </Field>
            {data.dbs.status === 'yes' && (
              <>
                <Field label="Certificate number" htmlFor="dbs-cert">
                  <TextInput
                    id="dbs-cert"
                    value={data.dbs.certificateNumber}
                    onChange={(v) => setDBS({ certificateNumber: v })}
                  />
                </Field>
                <Field label="Issue date" htmlFor="dbs-iss">
                  <TextInput
                    id="dbs-iss"
                    type="date"
                    value={data.dbs.issueDate}
                    onChange={(v) => setDBS({ issueDate: v })}
                  />
                </Field>
                <Field label="On the Update Service?">
                  <RadioGroup
                    name="dbs-upd"
                    value={data.dbs.onUpdateService}
                    onChange={(v) =>
                      setDBS({ onUpdateService: v as 'yes' | 'no' })
                    }
                    options={YN}
                  />
                </Field>
              </>
            )}
          </FieldGrid>
        </Section>

        {/* 08 — Driving */}
        <Section id="driving" number="08" title="Driving licence & vehicle">
          <FieldGrid cols={4}>
            <Field
              label="UK driving licence?"
              required
              error={errors['driving.hasLicence']}
            >
              <RadioGroup
                name="d-licence"
                value={data.driving.hasLicence}
                onChange={(v) =>
                  setDriving({ hasLicence: v as 'yes' | 'no' })
                }
                options={YN}
                invalid={Boolean(errors['driving.hasLicence'])}
              />
            </Field>
            {data.driving.hasLicence === 'yes' && (
              <>
                <Field label="Licence type" htmlFor="d-type">
                  <Select
                    id="d-type"
                    value={data.driving.licenceType}
                    onChange={(v) => setDriving({ licenceType: v })}
                    options={[
                      { value: '', label: 'Select…' },
                      { value: 'Full', label: 'Full' },
                      { value: 'Provisional', label: 'Provisional' },
                      { value: 'International', label: 'International' },
                    ]}
                  />
                </Field>
                <Field label="Penalty points" htmlFor="d-pen">
                  <TextInput
                    id="d-pen"
                    inputMode="numeric"
                    value={data.driving.penaltyPoints}
                    onChange={(v) => setDriving({ penaltyPoints: v })}
                  />
                </Field>
              </>
            )}
            <Field
              label="Access to a vehicle?"
              required
              error={errors['driving.hasVehicle']}
            >
              <RadioGroup
                name="d-vehicle"
                value={data.driving.hasVehicle}
                onChange={(v) =>
                  setDriving({ hasVehicle: v as 'yes' | 'no' })
                }
                options={YN}
                invalid={Boolean(errors['driving.hasVehicle'])}
              />
            </Field>
            {data.driving.hasVehicle === 'yes' && (
              <Field label="Business-use insurance?">
                <RadioGroup
                  name="d-ins"
                  value={data.driving.businessInsurance}
                  onChange={(v) =>
                    setDriving({ businessInsurance: v as 'yes' | 'no' | 'na' })
                  }
                  options={[
                    { value: 'yes', label: 'Yes' },
                    { value: 'no', label: 'No' },
                    { value: 'na', label: 'N/A' },
                  ]}
                />
              </Field>
            )}
          </FieldGrid>
        </Section>

        {/* 09 — Experience */}
        <Section id="experience" number="09" title="Care experience">
          <FieldGrid cols={2}>
            <Field
              label="Years of care experience"
              required
              htmlFor="x-years"
              error={errors['experience.yearsInCare']}
            >
              <TextInput
                id="x-years"
                inputMode="decimal"
                value={data.experience.yearsInCare}
                onChange={(v) => setExperience({ yearsInCare: v })}
                invalid={Boolean(errors['experience.yearsInCare'])}
              />
            </Field>
          </FieldGrid>
          <Field label="Settings worked in (select all that apply)">
            <CheckboxGroup
              values={data.experience.settings}
              onChange={(v) => setExperience({ settings: v })}
              options={SETTINGS_OPTIONS}
            />
          </Field>
          <Field
            label="Tell us about your experience"
            required
            htmlFor="x-summary"
            error={errors['experience.summary']}
            hint="A short paragraph (3–5 sentences) on what you’ve done and what you’re good at"
          >
            <TextArea
              id="x-summary"
              rows={5}
              value={data.experience.summary}
              onChange={(v) => setExperience({ summary: v })}
              invalid={Boolean(errors['experience.summary'])}
            />
          </Field>
        </Section>

        {/* 10 — Employment */}
        <Section
          id="employment"
          number="10"
          title="Employment history"
          intro="Most recent first. Add at least your current/most recent role."
        >
          <div className="space-y-8">
            {data.employment.map((entry, i) => (
              <div
                key={i}
                className={cn(
                  'border-t border-rule-light pt-7 space-y-5',
                  i === 0 && 'border-t-0 pt-0',
                )}
              >
                <div className="flex items-center justify-between">
                  <p className="section-kicker text-ink-muted-dark">
                    Entry {String(i + 1).padStart(2, '0')}
                  </p>
                  {data.employment.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        setData((d) => ({
                          ...d,
                          employment: d.employment.filter((_, j) => j !== i),
                        }))
                      }
                      className="inline-flex items-center gap-1.5 text-[12px] text-ink-muted-dark hover:text-amber transition-colors"
                    >
                      <Trash2 size={12} /> Remove
                    </button>
                  )}
                </div>
                <FieldGrid cols={2}>
                  <Field
                    label="Employer"
                    required={i === 0}
                    error={i === 0 ? errors['employment.0'] : undefined}
                  >
                    <TextInput
                      value={entry.employer}
                      onChange={(v) =>
                        setData((d) => ({
                          ...d,
                          employment: d.employment.map((e, j) =>
                            j === i ? { ...e, employer: v } : e,
                          ),
                        }))
                      }
                    />
                  </Field>
                  <Field label="Role / job title" required={i === 0}>
                    <TextInput
                      value={entry.role}
                      onChange={(v) =>
                        setData((d) => ({
                          ...d,
                          employment: d.employment.map((e, j) =>
                            j === i ? { ...e, role: v } : e,
                          ),
                        }))
                      }
                    />
                  </Field>
                </FieldGrid>
                <FieldGrid cols={4}>
                  <Field label="From">
                    <TextInput
                      type="date"
                      value={entry.from}
                      onChange={(v) =>
                        setData((d) => ({
                          ...d,
                          employment: d.employment.map((e, j) =>
                            j === i ? { ...e, from: v } : e,
                          ),
                        }))
                      }
                    />
                  </Field>
                  <Field label="To">
                    <TextInput
                      type="date"
                      value={entry.to}
                      onChange={(v) =>
                        setData((d) => ({
                          ...d,
                          employment: d.employment.map((e, j) =>
                            j === i ? { ...e, to: v, current: false } : e,
                          ),
                        }))
                      }
                    />
                  </Field>
                  <div className="flex items-end pb-2">
                    <Checkbox
                      checked={entry.current}
                      onChange={(c) =>
                        setData((d) => ({
                          ...d,
                          employment: d.employment.map((e, j) =>
                            j === i ? { ...e, current: c, to: c ? '' : e.to } : e,
                          ),
                        }))
                      }
                      label="Current role"
                    />
                  </div>
                  <Field label="Reason for leaving">
                    <TextInput
                      value={entry.reasonForLeaving}
                      onChange={(v) =>
                        setData((d) => ({
                          ...d,
                          employment: d.employment.map((e, j) =>
                            j === i ? { ...e, reasonForLeaving: v } : e,
                          ),
                        }))
                      }
                    />
                  </Field>
                </FieldGrid>
                <Field label="Key responsibilities">
                  <TextArea
                    rows={3}
                    value={entry.responsibilities}
                    onChange={(v) =>
                      setData((d) => ({
                        ...d,
                        employment: d.employment.map((e, j) =>
                          j === i ? { ...e, responsibilities: v } : e,
                        ),
                      }))
                    }
                  />
                </Field>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setData((d) => ({ ...d, employment: [...d.employment, emptyEmployment()] }))
              }
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-ink-dark hover:text-amber transition-colors"
            >
              <Plus size={14} /> Add another employer
            </button>
          </div>
        </Section>

        {/* 11 — Education */}
        <Section id="education" number="11" title="Education & qualifications">
          <div className="space-y-8">
            {data.education.map((entry, i) => (
              <div
                key={i}
                className={cn(
                  'border-t border-rule-light pt-7',
                  i === 0 && 'border-t-0 pt-0',
                )}
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="section-kicker text-ink-muted-dark">
                    Entry {String(i + 1).padStart(2, '0')}
                  </p>
                  {data.education.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        setData((d) => ({
                          ...d,
                          education: d.education.filter((_, j) => j !== i),
                        }))
                      }
                      className="inline-flex items-center gap-1.5 text-[12px] text-ink-muted-dark hover:text-amber transition-colors"
                    >
                      <Trash2 size={12} /> Remove
                    </button>
                  )}
                </div>
                <FieldGrid cols={4}>
                  <Field label="Institution">
                    <TextInput
                      value={entry.institution}
                      onChange={(v) =>
                        setData((d) => ({
                          ...d,
                          education: d.education.map((e, j) =>
                            j === i ? { ...e, institution: v } : e,
                          ),
                        }))
                      }
                    />
                  </Field>
                  <Field label="Qualification">
                    <TextInput
                      value={entry.qualification}
                      onChange={(v) =>
                        setData((d) => ({
                          ...d,
                          education: d.education.map((e, j) =>
                            j === i ? { ...e, qualification: v } : e,
                          ),
                        }))
                      }
                    />
                  </Field>
                  <Field label="Year">
                    <TextInput
                      inputMode="numeric"
                      value={entry.year}
                      onChange={(v) =>
                        setData((d) => ({
                          ...d,
                          education: d.education.map((e, j) =>
                            j === i ? { ...e, year: v } : e,
                          ),
                        }))
                      }
                    />
                  </Field>
                  <Field label="Grade">
                    <TextInput
                      value={entry.grade}
                      onChange={(v) =>
                        setData((d) => ({
                          ...d,
                          education: d.education.map((e, j) =>
                            j === i ? { ...e, grade: v } : e,
                          ),
                        }))
                      }
                    />
                  </Field>
                </FieldGrid>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setData((d) => ({ ...d, education: [...d.education, emptyEducation()] }))
              }
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-ink-dark hover:text-amber transition-colors"
            >
              <Plus size={14} /> Add another qualification
            </button>
          </div>
        </Section>

        {/* 12 — Training */}
        <Section id="training" number="12" title="Relevant training & certificates">
          <Field label="Completed training (select all that apply)">
            <CheckboxGroup
              values={data.training.items}
              onChange={(v) => setTraining({ items: v })}
              options={TRAINING_OPTIONS}
            />
          </Field>
          <Field label="Other training" htmlFor="t-other">
            <TextArea
              id="t-other"
              rows={3}
              value={data.training.other}
              onChange={(v) => setTraining({ other: v })}
            />
          </Field>
        </Section>

        {/* 13 — Skills */}
        <Section id="skills" number="13" title="Skills & availability">
          <Field label="Skills">
            <CheckboxGroup
              values={data.skills.list}
              onChange={(v) => setSkills({ list: v })}
              options={SKILL_OPTIONS}
            />
          </Field>
          <FieldGrid cols={2}>
            <Field label="Languages spoken" htmlFor="s-lang">
              <TextInput
                id="s-lang"
                placeholder="English, Urdu, Polish…"
                value={data.skills.languages}
                onChange={(v) => setSkills({ languages: v })}
              />
            </Field>
            <Field label="Earliest start date" htmlFor="s-start">
              <TextInput
                id="s-start"
                type="date"
                value={data.skills.earliestStart}
                onChange={(v) => setSkills({ earliestStart: v })}
              />
            </Field>
          </FieldGrid>
          <Field label="Available days">
            <CheckboxGroup
              values={data.skills.availableDays}
              onChange={(v) => setSkills({ availableDays: v })}
              options={DAYS}
            />
          </Field>
          <Field label="Shift preferences">
            <CheckboxGroup
              values={data.skills.shiftPreferences}
              onChange={(v) => setSkills({ shiftPreferences: v })}
              options={SHIFT_OPTIONS}
            />
          </Field>
          <Field label="Anything else we should know about your availability?" htmlFor="s-notes">
            <TextArea
              id="s-notes"
              rows={3}
              value={data.skills.additionalNotes}
              onChange={(v) => setSkills({ additionalNotes: v })}
            />
          </Field>
        </Section>

        {/* 14 — References (hidden — gathered later in the process) */}
        {SHOW_REFERENCES && (
        <Section
          id="references"
          number="14"
          title="References"
          intro="Two professional references, ideally including your current/most recent line manager. We will not contact them without your permission."
        >
          <div className="space-y-10">
            {data.references.map((ref, i) => (
              <div
                key={i}
                className={cn(
                  'border-t border-rule-light pt-7',
                  i === 0 && 'border-t-0 pt-0',
                )}
              >
                <p className="section-kicker text-ink-muted-dark mb-5">Referee {i + 1}</p>
                <FieldGrid cols={3}>
                  <Field
                    label="Full name"
                    required
                    error={errors[`references.${i}.name`]}
                  >
                    <TextInput
                      value={ref.name}
                      onChange={(v) =>
                        setData((d) => ({
                          ...d,
                          references: d.references.map((r, j) =>
                            j === i ? { ...r, name: v } : r,
                          ),
                        }))
                      }
                      invalid={Boolean(errors[`references.${i}.name`])}
                    />
                  </Field>
                  <Field label="Job title">
                    <TextInput
                      value={ref.role}
                      onChange={(v) =>
                        setData((d) => ({
                          ...d,
                          references: d.references.map((r, j) =>
                            j === i ? { ...r, role: v } : r,
                          ),
                        }))
                      }
                    />
                  </Field>
                  <Field
                    label="Organisation"
                    required
                    error={errors[`references.${i}.organisation`]}
                  >
                    <TextInput
                      value={ref.organisation}
                      onChange={(v) =>
                        setData((d) => ({
                          ...d,
                          references: d.references.map((r, j) =>
                            j === i ? { ...r, organisation: v } : r,
                          ),
                        }))
                      }
                      invalid={Boolean(errors[`references.${i}.organisation`])}
                    />
                  </Field>
                </FieldGrid>
                <FieldGrid cols={2}>
                  <Field label="Relationship">
                    <TextInput
                      placeholder="Line manager, colleague…"
                      value={ref.relationship}
                      onChange={(v) =>
                        setData((d) => ({
                          ...d,
                          references: d.references.map((r, j) =>
                            j === i ? { ...r, relationship: v } : r,
                          ),
                        }))
                      }
                    />
                  </Field>
                  <Field label="Years known">
                    <TextInput
                      inputMode="numeric"
                      value={ref.yearsKnown}
                      onChange={(v) =>
                        setData((d) => ({
                          ...d,
                          references: d.references.map((r, j) =>
                            j === i ? { ...r, yearsKnown: v } : r,
                          ),
                        }))
                      }
                    />
                  </Field>
                </FieldGrid>
                <FieldGrid cols={2}>
                  <EmailField
                    label="Email"
                    value={ref.email}
                    onChange={(v) =>
                      setData((d) => ({
                        ...d,
                        references: d.references.map((r, j) =>
                          j === i ? { ...r, email: v } : r,
                        ),
                      }))
                    }
                    error={errors[`references.${i}.email`] || errors[`references.${i}.contact`]}
                  />
                  <PhoneField
                    label="Phone"
                    value={ref.phone}
                    onChange={(v) =>
                      setData((d) => ({
                        ...d,
                        references: d.references.map((r, j) =>
                          j === i ? { ...r, phone: v } : r,
                        ),
                      }))
                    }
                    error={errors[`references.${i}.contact`]}
                  />
                </FieldGrid>
              </div>
            ))}
          </div>
        </Section>
        )}

        {/* 15 — Emergency */}
        <Section id="emergency" number="15" title="Emergency contact">
          <FieldGrid cols={2}>
            <Field label="Full name" required error={errors['emergency.name']}>
              <TextInput
                value={data.emergency.name}
                onChange={(v) => setEmergency({ name: v })}
                invalid={Boolean(errors['emergency.name'])}
              />
            </Field>
            <Field
              label="Relationship"
              required
              error={errors['emergency.relationship']}
            >
              <TextInput
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

        {/* 16 — Declarations */}
        <Section
          id="declarations"
          number="16"
          title="Health & safeguarding declarations"
          intro="We are required to ask the questions below. Honest answers will not automatically prevent employment — we’ll discuss any disclosure with you."
        >
          <div className="space-y-7">
            <Field
              label="Do you have any unspent criminal convictions, cautions, or pending investigations?"
              required
              error={errors['declarations.convictions']}
            >
              <RadioGroup
                name="dec-conv"
                value={data.declarations.convictions}
                onChange={(v) =>
                  setDeclarations({ convictions: v as 'yes' | 'no' })
                }
                options={YN}
                invalid={Boolean(errors['declarations.convictions'])}
              />
            </Field>
            {data.declarations.convictions === 'yes' && (
              <Field
                label="Please give details"
                required
                error={errors['declarations.convictionsDetail']}
              >
                <TextArea
                  rows={3}
                  value={data.declarations.convictionsDetail}
                  onChange={(v) => setDeclarations({ convictionsDetail: v })}
                  invalid={Boolean(errors['declarations.convictionsDetail'])}
                />
              </Field>
            )}

            <Field
              label="Have you ever been the subject of a safeguarding referral, investigation, or dismissal from a care role?"
              required
              error={errors['declarations.safeguarding']}
            >
              <RadioGroup
                name="dec-safe"
                value={data.declarations.safeguarding}
                onChange={(v) =>
                  setDeclarations({ safeguarding: v as 'yes' | 'no' })
                }
                options={YN}
                invalid={Boolean(errors['declarations.safeguarding'])}
              />
            </Field>
            {data.declarations.safeguarding === 'yes' && (
              <Field
                label="Please give details"
                required
                error={errors['declarations.safeguardingDetail']}
              >
                <TextArea
                  rows={3}
                  value={data.declarations.safeguardingDetail}
                  onChange={(v) => setDeclarations({ safeguardingDetail: v })}
                  invalid={Boolean(errors['declarations.safeguardingDetail'])}
                />
              </Field>
            )}

            <Field
              label="Do you have any health condition or disability that might affect your ability to perform this role (with reasonable adjustments)?"
              required
              error={errors['declarations.healthCondition']}
            >
              <RadioGroup
                name="dec-health"
                value={data.declarations.healthCondition}
                onChange={(v) =>
                  setDeclarations({ healthCondition: v as 'yes' | 'no' })
                }
                options={YN}
                invalid={Boolean(errors['declarations.healthCondition'])}
              />
            </Field>
            {data.declarations.healthCondition === 'yes' && (
              <Field
                label="Please give details (and any adjustments needed)"
                required
                error={errors['declarations.healthDetail']}
              >
                <TextArea
                  rows={3}
                  value={data.declarations.healthDetail}
                  onChange={(v) => setDeclarations({ healthDetail: v })}
                  invalid={Boolean(errors['declarations.healthDetail'])}
                />
              </Field>
            )}

            <div className="border-t border-rule-light pt-7 space-y-4">
              <Checkbox
                checked={data.declarations.fitToWork}
                onChange={(v) => setDeclarations({ fitToWork: v })}
                invalid={Boolean(errors['declarations.fitToWork'])}
                label="I confirm that, to the best of my knowledge, I am fit to undertake the role I am applying for."
              />
              {errors['declarations.fitToWork'] && (
                <p className="text-[12px] text-amber font-medium pl-7">
                  {errors['declarations.fitToWork']}
                </p>
              )}
              <Checkbox
                checked={data.declarations.accuracy}
                onChange={(v) => setDeclarations({ accuracy: v })}
                invalid={Boolean(errors['declarations.accuracy'])}
                label="I confirm that the information provided is, to the best of my knowledge, true and complete. I understand that any false statement or omission may result in withdrawal of an offer or dismissal."
              />
              {errors['declarations.accuracy'] && (
                <p className="text-[12px] text-amber font-medium pl-7">
                  {errors['declarations.accuracy']}
                </p>
              )}
            </div>

            <FieldGrid cols={2}>
              <Field
                label="Signature (type your full name)"
                required
                htmlFor="sig"
                error={errors['declarations.signature']}
              >
                <TextInput
                  id="sig"
                  className="font-display italic text-[18px]"
                  value={data.declarations.signature}
                  onChange={(v) => setDeclarations({ signature: v })}
                  invalid={Boolean(errors['declarations.signature'])}
                />
              </Field>
              <Field
                label="Date"
                required
                htmlFor="sig-date"
                error={errors['declarations.signatureDate']}
              >
                <TextInput
                  id="sig-date"
                  type="date"
                  value={data.declarations.signatureDate}
                  onChange={(v) => setDeclarations({ signatureDate: v })}
                  invalid={Boolean(errors['declarations.signatureDate'])}
                />
              </Field>
            </FieldGrid>
          </div>
        </Section>

        {/* 17 — Consent */}
        <Section
          id="consent"
          number="17"
          title="Consent for data processing"
          intro="See our privacy policy for full details on how we handle your information."
        >
          <div className="space-y-4">
            <Checkbox
              checked={data.consent.dataProcessing}
              onChange={(v) => setConsent({ dataProcessing: v })}
              invalid={Boolean(errors['consent.dataProcessing'])}
              label={
                <>
                  I consent to Horizon Care Services Ltd processing the personal data in this application for recruitment purposes, in line with our{' '}
                  <Link href="/privacy-policy" className="underline underline-offset-2">
                    privacy policy
                  </Link>
                  . <span className="text-amber">*</span>
                </>
              }
            />
            {errors['consent.dataProcessing'] && (
              <p className="text-[12px] text-amber font-medium pl-7">
                {errors['consent.dataProcessing']}
              </p>
            )}
            <Checkbox
              checked={data.consent.referenceCheck}
              onChange={(v) => setConsent({ referenceCheck: v })}
              label="I consent to Horizon Care Services contacting the referees listed above (only after a verbal offer has been made)."
            />
            <Checkbox
              checked={data.consent.dbsCheck}
              onChange={(v) => setConsent({ dbsCheck: v })}
              label="I consent to an enhanced DBS check being undertaken as part of the recruitment process."
            />
          </div>
        </Section>

        {/* Submit row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-8 border-t border-rule-light">
          <Link
            href="/work-for-us"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-ink-muted-dark hover:text-ink-dark transition-colors"
          >
            <ArrowLeft size={14} /> Back to roles
          </Link>
          <button
            type="submit"
            className="interactive-lift inline-flex items-center gap-2 bg-deep text-ink-light px-7 py-3.5 rounded-md text-[14px] font-semibold hover:bg-ink-dark transition-colors"
          >
            Review application <ArrowUpRight size={14} />
          </button>
        </div>
      </form>
    </div>
  )
}

// ── Section helper ─────────────────────────────────────────────
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

// ── Review screen ───────────────────────────────────────────────
function ReviewScreen({
  data,
  onEdit,
  onConfirm,
  submitting,
}: {
  data: ApplicationData
  onEdit: () => void
  onConfirm: () => void
  submitting: boolean
}) {
  const fullName = [data.personal.title, data.personal.firstName, data.personal.middleNames, data.personal.surname]
    .filter((s) => s.trim())
    .join(' ')

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
          Review your application before downloading.
        </h2>
        <p className="text-ink-muted-dark text-[15px] leading-relaxed max-w-[60ch]">
          Take a moment to check the details below. When you’re ready, generate the branded PDF — it’ll download to your device. Send it to <a href="mailto:careers@horizoncareservices.org" className="underline underline-offset-2">careers@horizoncareservices.org</a> to complete your application.
        </p>
      </div>

      <div className="border border-rule-light rounded-lg overflow-hidden">
        <div className="bg-deep text-ink-light px-7 py-6">
          <p className="text-[11px] tracking-[0.14em] uppercase text-ink-muted-light mb-1">
            Application summary
          </p>
          <p
            className="font-display text-[22px]"
            style={{ fontVariationSettings: '"opsz" 22, "wght" 580' }}
          >
            {fullName || '—'}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-1 mt-3 text-[13px] text-ink-muted-light">
            <span>{data.role.code}</span>
            <span>{data.role.title}</span>
            <span>{data.contact.email}</span>
            <span>{data.contact.mobile}</span>
          </div>
        </div>

        <div className="divide-y divide-rule-light">
          <ReviewBlock title="Personal details">
            <ReviewItem label="Full name" value={fullName} />
            <ReviewItem label="Date of birth" value={data.personal.dob} />
            <ReviewItem label="Gender" value={data.personal.gender} />
            <ReviewItem label="Pronouns" value={data.personal.pronouns} />
          </ReviewBlock>
          <ReviewBlock title="Contact">
            <ReviewItem label="Email" value={data.contact.email} />
            <ReviewItem label="Mobile" value={data.contact.mobile} />
            <ReviewItem label="Telephone" value={data.contact.telephone} />
          </ReviewBlock>
          <ReviewBlock title="Address">
            <ReviewItem
              label="Address"
              value={[data.address.line1, data.address.line2, data.address.town, data.address.county, data.address.postcode]
                .filter(Boolean)
                .join(', ')}
            />
            <ReviewItem label="Years at address" value={data.address.yearsAtAddress} />
          </ReviewBlock>
          <ReviewBlock title="Right to work">
            <ReviewItem
              label="Nationality"
              value={
                data.rightToWork.nationality === 'Other'
                  ? data.rightToWork.nationalityOther
                  : data.rightToWork.nationality
              }
            />
            <ReviewItem label="Right to work" value={data.rightToWork.hasRightToWork} />
            <ReviewItem label="Visa status" value={data.rightToWork.visaStatus} />
            <ReviewItem label="Document type" value={data.rightToWork.documentType} />
            <ReviewItem label="Share code" value={data.rightToWork.shareCode} />
          </ReviewBlock>
          <ReviewBlock title="Identification & checks">
            <ReviewItem label="NI number" value={data.identification.niNumber} />
            <ReviewItem label="Enhanced DBS" value={data.dbs.status} />
            <ReviewItem label="DBS update service" value={data.dbs.onUpdateService} />
            <ReviewItem label="Driving licence" value={data.driving.hasLicence} />
            <ReviewItem label="Vehicle access" value={data.driving.hasVehicle} />
          </ReviewBlock>
          <ReviewBlock title="Experience">
            <ReviewItem label="Years in care" value={data.experience.yearsInCare} />
            <ReviewItem label="Settings" value={data.experience.settings.join(' · ')} />
            <ReviewItem
              label="Most recent employer"
              value={`${data.employment[0]?.role || ''} at ${data.employment[0]?.employer || ''}`}
            />
            <ReviewItem
              label="Employment history"
              value={`${data.employment.filter((e) => e.employer.trim()).length} entries`}
            />
            <ReviewItem
              label="Education"
              value={`${data.education.filter((e) => e.institution.trim()).length} qualifications`}
            />
            <ReviewItem label="Training items" value={String(data.training.items.length)} />
          </ReviewBlock>
          <ReviewBlock title="Availability">
            <ReviewItem label="Days" value={data.skills.availableDays.join(', ')} />
            <ReviewItem label="Shifts" value={data.skills.shiftPreferences.join(', ')} />
            <ReviewItem label="Earliest start" value={data.skills.earliestStart} />
          </ReviewBlock>
          <ReviewBlock title="Emergency contact">
            <ReviewItem
              label="Emergency contact"
              value={`${data.emergency.name || '—'} (${data.emergency.relationship || '—'}) · ${data.emergency.phone || '—'}`}
            />
            {SHOW_REFERENCES &&
              data.references.map((r, i) => (
                <ReviewItem
                  key={i}
                  label={`Referee ${i + 1}`}
                  value={`${r.name || '—'} · ${r.organisation || '—'}`}
                />
              ))}
          </ReviewBlock>
          <ReviewBlock title="Declarations">
            <ReviewItem
              label="Unspent convictions"
              value={data.declarations.convictions}
            />
            <ReviewItem label="Safeguarding" value={data.declarations.safeguarding} />
            <ReviewItem label="Health condition" value={data.declarations.healthCondition} />
            <ReviewItem
              label="Fitness to work"
              value={data.declarations.fitToWork ? 'Confirmed' : 'Not confirmed'}
            />
            <ReviewItem
              label="Accuracy"
              value={data.declarations.accuracy ? 'Confirmed' : 'Not confirmed'}
            />
            <ReviewItem
              label="Signed"
              value={`${data.declarations.signature || '—'} on ${data.declarations.signatureDate || '—'}`}
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
          <ArrowLeft size={14} /> Edit application
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

// ── Done screen ─────────────────────────────────────────────────
function DoneScreen({
  data,
  filename,
  onRedownload,
}: {
  data: ApplicationData
  filename: string
  onRedownload: () => void
}) {
  return (
    <div className="max-w-3xl mx-auto text-center py-10">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber/15 text-amber mb-7">
        <Check size={28} strokeWidth={2.5} />
      </div>
      <p className="section-kicker text-ink-muted-dark mb-3">Application generated</p>
      <h2
        className="font-display text-ink-dark leading-tight tracking-[-0.02em] mb-5"
        style={{
          fontSize: 'clamp(1.8rem, 3.4vw, 2.8rem)',
          fontVariationSettings: '"opsz" 32, "wght" 580',
        }}
      >
        Your application PDF has downloaded.
      </h2>
      <p className="text-ink-muted-dark text-[15px] leading-relaxed max-w-[54ch] mx-auto mb-8">
        Please send the PDF as an attachment to{' '}
        <a
          href={`mailto:careers@horizoncareservices.org?subject=${encodeURIComponent(`Application: ${data.role.code} ${data.role.title}`)}`}
          className="text-ink-dark underline underline-offset-2"
        >
          careers@horizoncareservices.org
        </a>
        . We respond to applications within 2 working days.
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
        <Link
          href="/work-for-us"
          className="interactive-lift inline-flex items-center gap-2 bg-deep text-ink-light px-5 py-2.5 rounded-md text-[13px] font-semibold hover:bg-ink-dark transition-colors"
        >
          Back to roles <ArrowUpRight size={13} />
        </Link>
      </div>
    </div>
  )
}
