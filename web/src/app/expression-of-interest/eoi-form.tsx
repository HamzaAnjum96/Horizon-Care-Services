'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Check } from 'lucide-react'
import { Field, TextInput, TextArea, RadioGroup } from '../work-for-us/fields'

// ── Native Google Form submission ───────────────────────────────
// Posts to the form's /formResponse endpoint in the background (no-cors),
// so the applicant stays on this page and never sees Google. Responses land
// in the linked Google Sheet exactly as a normal Google Form submission.
const FORM_ACTION =
  'https://docs.google.com/forms/d/e/1FAIpQLSc-6ShCKYrT4TN52MpXidw11H7N6CfgJ5gm8eNMSxzYk8EKiw/formResponse'

// Field IDs from the form's "Get pre-filled link".
// The three Yes/No ids are matched by their order in the form — verify with a
// test submission. "entry.1004237903" (Job Ref.) exists but isn't collected here.
//
// email / phone / address are blank because the Google Form has no question for
// them yet. Add those questions, grab a fresh pre-filled link, paste the entry
// ids below, and the inputs switch on automatically (validation + submit).
const FIELD = {
  firstName:        'entry.704701710',
  surname:          'entry.1600847244',
  role:             'entry.1686103786',
  rightToWork:      'entry.100634696',
  experience:       'entry.1247109978',
  experienceDetail: 'entry.1174664231',
  drivingLicence:   'entry.1865237791',
  hours:            'entry.1363007283',
  referee:          'entry.709355516',
  email:   'entry.1960713328',
  phone:   'entry.509331244',
  // Home address has no question on the Google Form yet — add one, grab a fresh
  // pre-filled link, and paste its entry id here to switch the field on.
  address: '',
}

const YN = [
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' },
]
const ROLES = [
  { value: 'Carer', label: 'Carer' },
  { value: 'Nurse', label: 'Nurse' },
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[\d\s+()-]{7,}$/

type FormState = {
  firstName: string
  surname: string
  email: string
  phone: string
  address: string
  role: string
  rightToWork: string
  experience: string
  experienceDetail: string
  drivingLicence: string
  hours: string
  referred: string // client-only — drives the referee field, not sent to Google
  referee: string
}

const EMPTY: FormState = {
  firstName: '', surname: '', email: '', phone: '', address: '',
  role: '', rightToWork: '', experience: '', experienceDetail: '',
  drivingLicence: '', hours: '', referred: '', referee: '',
}

function readReferee(): string {
  if (typeof window === 'undefined') return ''
  const sp = new URLSearchParams(window.location.search)
  return (sp.get('referee') || sp.get('ref') || '').trim()
}

export function ExpressionForm() {
  const [f, setF] = useState<FormState>(EMPTY)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const bannerRef = useRef<HTMLDivElement | null>(null)

  // Pre-fill the referee from the URL (?referee=Name or ?ref=Name) so an
  // existing employee can share a link that tags the referral on submission.
  useEffect(() => {
    const r = readReferee()
    if (r) setF((s) => ({ ...s, referred: 'Yes', referee: r }))
  }, [])

  const set = (patch: Partial<FormState>) => {
    setF((s) => ({ ...s, ...patch }))
  }

  const validate = (): Record<string, string> => {
    const e: Record<string, string> = {}
    if (!f.firstName.trim()) e.firstName = 'First name is required'
    if (!f.surname.trim()) e.surname = 'Surname is required'
    if (FIELD.email) {
      if (!f.email.trim()) e.email = 'Email address is required'
      else if (!EMAIL_RE.test(f.email.trim())) e.email = 'Enter a valid email address'
    }
    if (FIELD.phone) {
      if (!f.phone.trim()) e.phone = 'Phone number is required'
      else if (!PHONE_RE.test(f.phone.trim())) e.phone = 'Enter a valid phone number'
    }
    if (FIELD.address && !f.address.trim()) e.address = 'Home address is required'
    if (!f.role) e.role = 'Please choose a role'
    if (!f.rightToWork) e.rightToWork = 'Please answer this question'
    if (!f.experience) e.experience = 'Please answer this question'
    if (f.experience === 'Yes' && !f.experienceDetail.trim())
      e.experienceDetail = 'Please give details of your experience'
    if (!f.drivingLicence) e.drivingLicence = 'Please answer this question'
    if (!f.hours.trim()) {
      e.hours = 'Please tell us your weekly availability'
    } else {
      const n = Number(f.hours.trim())
      if (!Number.isFinite(n) || n <= 0 || n > 168)
        e.hours = 'Enter a number of hours between 1 and 168'
    }
    if (!f.referred) e.referred = 'Please answer this question'
    if (f.referred === 'Yes' && !f.referee.trim())
      e.referee = 'Please give the name of the employee who referred you'
    return e
  }

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) {
      requestAnimationFrame(() =>
        bannerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      )
      return
    }
    setSubmitting(true)
    try {
      const body = new FormData()
      const put = (id: string, v: string) => {
        if (id && v.trim()) body.append(id, v.trim())
      }
      put(FIELD.firstName, f.firstName)
      put(FIELD.surname, f.surname)
      put(FIELD.email, f.email)
      put(FIELD.phone, f.phone)
      put(FIELD.address, f.address)
      put(FIELD.role, f.role)
      put(FIELD.rightToWork, f.rightToWork)
      put(FIELD.experience, f.experience)
      if (f.experience === 'Yes') put(FIELD.experienceDetail, f.experienceDetail)
      put(FIELD.drivingLicence, f.drivingLicence)
      put(FIELD.hours, f.hours)
      if (f.referred === 'Yes') put(FIELD.referee, f.referee)

      // no-cors: the request reaches Google but the response is opaque, so a
      // resolved fetch is our success signal.
      await fetch(FORM_ACTION, { method: 'POST', mode: 'no-cors', body })
      setDone(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      console.error('Form submission failed', err)
      setErrors({ _form: 'Sorry — we couldn’t send that. Please check your connection and try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  if (done) return <DoneScreen firstName={f.firstName} />

  const messages = Object.entries(errors)
    .filter(([k]) => k !== '_form')
    .map(([, v]) => v)

  return (
    <form noValidate onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-7">
      {(messages.length > 0 || errors._form) && (
        <div ref={bannerRef} role="alert" className="border border-amber/40 bg-amber/5 rounded-md p-5">
          {errors._form ? (
            <p className="text-[14px] text-ink-dark">{errors._form}</p>
          ) : (
            <>
              <p className="font-display text-ink-dark text-[16px] mb-2">
                Please fix {messages.length} {messages.length === 1 ? 'thing' : 'things'} before submitting.
              </p>
              <ul className="text-[13px] text-ink-muted-dark space-y-1 list-disc pl-5">
                {messages.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-x-5 gap-y-7">
        <Field label="First name" required htmlFor="f-first" error={errors.firstName}>
          <TextInput id="f-first" autoComplete="given-name" value={f.firstName} onChange={(v) => set({ firstName: v })} invalid={Boolean(errors.firstName)} />
        </Field>
        <Field label="Surname" required htmlFor="f-surname" error={errors.surname}>
          <TextInput id="f-surname" autoComplete="family-name" value={f.surname} onChange={(v) => set({ surname: v })} invalid={Boolean(errors.surname)} />
        </Field>
      </div>

      {(FIELD.email || FIELD.phone) && (
        <div className="grid sm:grid-cols-2 gap-x-5 gap-y-7">
          {FIELD.email && (
            <Field label="Email address" required htmlFor="f-email" error={errors.email}>
              <TextInput id="f-email" type="email" inputMode="email" autoComplete="email" value={f.email} onChange={(v) => set({ email: v })} invalid={Boolean(errors.email)} />
            </Field>
          )}
          {FIELD.phone && (
            <Field label="Phone number" required htmlFor="f-phone" error={errors.phone}>
              <TextInput id="f-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="07700 000000" value={f.phone} onChange={(v) => set({ phone: v })} invalid={Boolean(errors.phone)} />
            </Field>
          )}
        </div>
      )}

      {FIELD.address && (
        <Field label="Home address" required htmlFor="f-addr" error={errors.address}>
          <TextArea id="f-addr" rows={3} value={f.address} onChange={(v) => set({ address: v })} invalid={Boolean(errors.address)} />
        </Field>
      )}

      <Field label="Which role are you applying for?" required error={errors.role}>
        <RadioGroup name="role" value={f.role} onChange={(v) => set({ role: v })} options={ROLES} invalid={Boolean(errors.role)} />
      </Field>

      <Field label="Do you have the right to work in the UK?" required error={errors.rightToWork}>
        <RadioGroup name="rtw" value={f.rightToWork} onChange={(v) => set({ rightToWork: v })} options={YN} invalid={Boolean(errors.rightToWork)} />
      </Field>

      <Field label="Do you have any experience in care?" required error={errors.experience}>
        <RadioGroup name="exp" value={f.experience} onChange={(v) => set({ experience: v })} options={YN} invalid={Boolean(errors.experience)} />
      </Field>
      {f.experience === 'Yes' && (
        <Field
          label="If yes, please specify which employer(s) you worked for and the roles and responsibilities you had."
          required
          htmlFor="f-expd"
          error={errors.experienceDetail}
        >
          <TextArea id="f-expd" rows={4} value={f.experienceDetail} onChange={(v) => set({ experienceDetail: v })} invalid={Boolean(errors.experienceDetail)} />
        </Field>
      )}

      <Field label="Do you have a full UK driving licence?" required error={errors.drivingLicence}>
        <RadioGroup name="dl" value={f.drivingLicence} onChange={(v) => set({ drivingLicence: v })} options={YN} invalid={Boolean(errors.drivingLicence)} />
      </Field>

      <Field label="How many hours per week would you be available to work?" required htmlFor="f-hours" error={errors.hours}>
        <TextInput id="f-hours" inputMode="numeric" placeholder="e.g. 37.5" value={f.hours} onChange={(v) => set({ hours: v })} invalid={Boolean(errors.hours)} />
      </Field>

      <Field label="Have you been referred by anyone currently working at Horizon?" required error={errors.referred}>
        <RadioGroup
          name="referred"
          value={f.referred}
          onChange={(v) => set({ referred: v, referee: v === 'No' ? '' : f.referee })}
          options={YN}
          invalid={Boolean(errors.referred)}
        />
      </Field>
      {f.referred === 'Yes' && (
        <Field
          label="Please give the name of the Horizon employee who referred you."
          required
          htmlFor="f-referee"
          error={errors.referee}
        >
          <TextInput id="f-referee" value={f.referee} onChange={(v) => set({ referee: v })} invalid={Boolean(errors.referee)} />
        </Field>
      )}

      <div className="pt-4">
        <button
          type="submit"
          disabled={submitting}
          className="interactive-lift inline-flex items-center gap-2 bg-brand text-ink-light px-7 py-3.5 rounded-md text-[14px] font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-wait"
        >
          {submitting ? 'Sending…' : <>Submit <ArrowUpRight size={14} /></>}
        </button>
      </div>
    </form>
  )
}

function DoneScreen({ firstName }: { firstName: string }) {
  return (
    <div className="max-w-xl mx-auto text-center py-6">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber/15 text-amber mb-7">
        <Check size={28} strokeWidth={2.5} />
      </div>
      <p className="section-kicker text-ink-muted-dark mb-3">Thank you</p>
      <h2
        className="font-display text-ink-dark leading-tight tracking-[-0.02em] mb-5"
        style={{
          fontSize: 'clamp(1.7rem, 3.2vw, 2.4rem)',
          fontVariationSettings: '"opsz" 30, "wght" 580',
        }}
      >
        We’ve got your details.
      </h2>
      <p className="text-ink-muted-dark text-[15px] leading-relaxed max-w-[46ch] mx-auto mb-8">
        Thanks for registering your interest{firstName.trim() ? `, ${firstName.trim()}` : ''}.
        Our recruitment team will be in touch shortly.
      </p>
      <Link
        href="/"
        className="interactive-lift inline-flex items-center gap-2 bg-brand text-ink-light px-5 py-2.5 rounded-md text-[13px] font-semibold hover:opacity-90 transition-opacity"
      >
        Back to home <ArrowUpRight size={13} />
      </Link>
    </div>
  )
}
