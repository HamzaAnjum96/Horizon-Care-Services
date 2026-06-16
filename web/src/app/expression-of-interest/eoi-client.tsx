'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Beaker, Check, Download, FileText, Paperclip, Upload } from 'lucide-react'
import { ExpressionData, emptyExpression } from './types'
import { exampleExpression } from './example-data'
import { validate, ValidationErrors } from './validation'
import { Field, TextInput, FieldGrid, EmailField, PhoneField, Checkbox } from '../work-for-us/fields'

const CAREERS_EMAIL = 'careers@horizoncareservices.org'

function readPositionFromUrl(): string {
  if (typeof window === 'undefined') return ''
  const sp = new URLSearchParams(window.location.search)
  return (sp.get('position') || sp.get('title') || '').trim()
}

export function ExpressionClient() {
  const [data, setData] = useState<ExpressionData>(() => emptyExpression(readPositionFromUrl()))
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [phase, setPhase] = useState<'form' | 'done'>('form')
  const [submitting, setSubmitting] = useState(false)
  const [downloadName, setDownloadName] = useState('')
  const [positionLocked, setPositionLocked] = useState(false)
  const errorBannerRef = useRef<HTMLDivElement | null>(null)

  // Re-read the URL on mount so a shared role-specific link (?position=…)
  // pre-fills and locks the position even after static prerender.
  useEffect(() => {
    const position = readPositionFromUrl()
    if (position) {
      setData((d) => ({ ...d, position }))
      setPositionLocked(true)
    }
  }, [])

  const setAddress = (patch: Partial<ExpressionData['address']>) =>
    setData((d) => ({ ...d, address: { ...d.address, ...patch } }))
  const setContact = (patch: Partial<ExpressionData['contact']>) =>
    setData((d) => ({ ...d, contact: { ...d.contact, ...patch } }))

  const fillExampleData = () => {
    setData(exampleExpression(positionLocked ? data.position : ''))
    setErrors({})
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const errorList = useMemo(
    () => Object.entries(errors).map(([k, v]) => ({ key: k, msg: v })),
    [errors],
  )

  const generatePdf = async () => {
    const e = validate(data)
    setErrors(e)
    if (Object.keys(e).length > 0) {
      requestAnimationFrame(() => {
        errorBannerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
      return
    }

    setSubmitting(true)
    try {
      const { generateExpressionPdf, buildPdfFilename } = await import('./pdf')
      const doc = await generateExpressionPdf(data)
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

  return (
    <div className="max-w-3xl mx-auto">
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault()
          generatePdf()
        }}
        className="space-y-12"
      >
        {/* Test-fill helper for QA / preview */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border border-amber/30 bg-amber/5 rounded-md px-5 py-4">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.1em] text-amber uppercase mb-1">
              Test mode
            </p>
            <p className="text-[13px] text-ink-muted-dark leading-snug">
              Auto-fill the form with realistic example data to preview the PDF output.
            </p>
          </div>
          <button
            type="button"
            onClick={fillExampleData}
            className="interactive-lift inline-flex items-center gap-2 bg-brand text-ink-light px-4 py-2 rounded-md text-[12.5px] font-semibold hover:opacity-90 transition-opacity flex-shrink-0"
          >
            <Beaker size={13} /> Fill with test data
          </button>
        </div>

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
              {errorList.map((e) => (
                <li key={e.key}>{e.msg}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Applicant */}
        <Section number="01" title="Your details">
          <FieldGrid cols={2}>
            <Field label="Full name" required htmlFor="eoi-name" error={errors['fullName']}>
              <TextInput
                id="eoi-name"
                autoComplete="name"
                value={data.fullName}
                onChange={(v) => setData((d) => ({ ...d, fullName: v }))}
                invalid={Boolean(errors['fullName'])}
              />
            </Field>
            <Field
              label="Position applying for"
              required
              htmlFor="eoi-position"
              error={errors['position']}
              hint={positionLocked ? 'Filled in from the link you followed' : undefined}
            >
              <TextInput
                id="eoi-position"
                value={data.position}
                onChange={(v) => setData((d) => ({ ...d, position: v }))}
                readOnly={positionLocked}
                invalid={Boolean(errors['position'])}
              />
            </Field>
          </FieldGrid>
        </Section>

        {/* Contact */}
        <Section number="02" title="Contact">
          <FieldGrid cols={2}>
            <EmailField
              id="eoi-email"
              label="Email address"
              required
              value={data.contact.email}
              onChange={(v) => setContact({ email: v })}
              error={errors['contact.email']}
            />
            <PhoneField
              id="eoi-phone"
              label="Phone number"
              required
              value={data.contact.phone}
              onChange={(v) => setContact({ phone: v })}
              error={errors['contact.phone']}
              placeholder="07700 000000"
              autoComplete="tel"
            />
          </FieldGrid>
        </Section>

        {/* Address */}
        <Section number="03" title="Address">
          <FieldGrid cols={2}>
            <Field label="Address line 1" required htmlFor="eoi-addr1" error={errors['address.line1']}>
              <TextInput
                id="eoi-addr1"
                autoComplete="address-line1"
                value={data.address.line1}
                onChange={(v) => setAddress({ line1: v })}
                invalid={Boolean(errors['address.line1'])}
              />
            </Field>
            <Field label="Address line 2" htmlFor="eoi-addr2">
              <TextInput
                id="eoi-addr2"
                autoComplete="address-line2"
                value={data.address.line2}
                onChange={(v) => setAddress({ line2: v })}
              />
            </Field>
          </FieldGrid>
          <FieldGrid cols={3}>
            <Field label="Town / city" required htmlFor="eoi-town" error={errors['address.town']}>
              <TextInput
                id="eoi-town"
                autoComplete="address-level2"
                value={data.address.town}
                onChange={(v) => setAddress({ town: v })}
                invalid={Boolean(errors['address.town'])}
              />
            </Field>
            <Field label="County" htmlFor="eoi-county">
              <TextInput
                id="eoi-county"
                autoComplete="address-level1"
                value={data.address.county}
                onChange={(v) => setAddress({ county: v })}
              />
            </Field>
            <Field label="Postcode" required htmlFor="eoi-postcode" error={errors['address.postcode']}>
              <TextInput
                id="eoi-postcode"
                autoComplete="postal-code"
                placeholder="LU3 3JG"
                value={data.address.postcode}
                onChange={(v) => setAddress({ postcode: v.toUpperCase() })}
                invalid={Boolean(errors['address.postcode'])}
              />
            </Field>
          </FieldGrid>
        </Section>

        {/* CV */}
        <Section number="04" title="Your CV">
          <Field
            label="Attach your CV"
            required
            error={errors['cvFileName']}
            hint="PDF or Word document. Your CV is attached to the email you’ll send — it stays on your device until then."
          >
            <CvPicker
              fileName={data.cvFileName}
              invalid={Boolean(errors['cvFileName'])}
              onPick={(name) => setData((d) => ({ ...d, cvFileName: name }))}
            />
          </Field>
        </Section>

        {/* Consent */}
        <Section number="05" title="Consent">
          <Checkbox
            id="eoi-consent"
            checked={data.consent}
            onChange={(v) => setData((d) => ({ ...d, consent: v }))}
            invalid={Boolean(errors['consent'])}
            label={
              <>
                I consent to Horizon Care Services Ltd processing the personal data in this form for
                recruitment purposes, in line with our{' '}
                <Link href="/privacy-policy" className="underline underline-offset-2">
                  privacy policy
                </Link>
                . <span className="text-amber">*</span>
              </>
            }
          />
          {errors['consent'] && (
            <p className="text-[12px] text-amber font-medium pl-7">{errors['consent']}</p>
          )}
        </Section>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-8 border-t border-rule-light">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-ink-muted-dark hover:text-ink-dark transition-colors"
          >
            <ArrowLeft size={14} /> Back to home
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="interactive-lift inline-flex items-center gap-2 bg-brand text-ink-light px-7 py-3.5 rounded-md text-[14px] font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-wait"
          >
            {submitting ? 'Generating PDF…' : <>Generate &amp; download PDF <Download size={14} /></>}
          </button>
        </div>
      </form>
    </div>
  )
}

// ── CV file picker ──────────────────────────────────────────────
function CvPicker({
  fileName,
  invalid,
  onPick,
}: {
  fileName: string
  invalid?: boolean
  onPick: (name: string) => void
}) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="sr-only"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) onPick(f.name)
        }}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={
          'interactive-lift inline-flex items-center gap-2 border px-4 py-2.5 rounded-md text-[13px] font-semibold transition-colors ' +
          (invalid
            ? 'border-amber text-amber'
            : 'border-rule-light text-ink-dark hover:border-amber hover:text-amber')
        }
      >
        <Upload size={14} /> {fileName ? 'Choose a different file' : 'Choose CV file'}
      </button>
      {fileName && (
        <span className="inline-flex items-center gap-2 text-[13px] text-ink-dark min-w-0">
          <Paperclip size={13} className="text-ink-muted-dark flex-shrink-0" />
          <span className="truncate font-mono text-[12.5px]">{fileName}</span>
        </span>
      )}
    </div>
  )
}

// ── Section helper ──────────────────────────────────────────────
function Section({
  number,
  title,
  children,
}: {
  number: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-6">
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
      </div>
      <div className="space-y-6">{children}</div>
    </section>
  )
}

// ── Done screen ─────────────────────────────────────────────────
function DoneScreen({
  data,
  filename,
  onRedownload,
}: {
  data: ExpressionData
  filename: string
  onRedownload: () => void
}) {
  const mailto = `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(
    `Expression of interest — ${data.position || 'Position'} — ${data.fullName}`,
  )}&body=${encodeURIComponent(
    `Dear Horizon Care Services,\n\nPlease find attached my expression of interest for the ${
      data.position || 'advertised'
    } position, along with my CV (${data.cvFileName || 'attached'}).\n\nKind regards,\n${data.fullName}`,
  )}`

  return (
    <div className="max-w-3xl mx-auto text-center py-10">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber/15 text-amber mb-7">
        <Check size={28} strokeWidth={2.5} />
      </div>
      <p className="section-kicker text-ink-muted-dark mb-3">Expression of interest generated</p>
      <h2
        className="font-display text-ink-dark leading-tight tracking-[-0.02em] mb-5"
        style={{
          fontSize: 'clamp(1.8rem, 3.4vw, 2.8rem)',
          fontVariationSettings: '"opsz" 32, "wght" 580',
        }}
      >
        Your PDF has downloaded.
      </h2>
      <p className="text-ink-muted-dark text-[15px] leading-relaxed max-w-[56ch] mx-auto mb-4">
        Email the PDF to{' '}
        <a href={mailto} className="text-ink-dark underline underline-offset-2">
          {CAREERS_EMAIL}
        </a>
        {' '}— and remember to{' '}
        <strong className="text-ink-dark font-semibold">attach your CV</strong>
        {data.cvFileName ? ` (${data.cvFileName})` : ''} to the same email.
      </p>
      <p className="text-ink-muted-dark text-[13px] leading-relaxed max-w-[52ch] mx-auto mb-8">
        We respond to expressions of interest within 2 working days.
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
        <a
          href={mailto}
          className="interactive-lift inline-flex items-center gap-2 bg-brand text-ink-light px-5 py-2.5 rounded-md text-[13px] font-semibold hover:opacity-90 transition-opacity"
        >
          Open email <ArrowUpRight size={13} />
        </a>
      </div>
    </div>
  )
}
