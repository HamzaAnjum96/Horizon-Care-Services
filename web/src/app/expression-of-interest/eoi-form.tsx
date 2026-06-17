'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Check } from 'lucide-react'
import { Field, TextInput } from '../work-for-us/fields'

// ── Native Google Form submission ───────────────────────────────
// Posts to the form's /formResponse endpoint in the background (no-cors),
// so the applicant stays on this page and never sees Google. Responses land
// in the linked Google Sheet exactly as a normal Google Form submission.
//
// Field IDs come from the form's "Get pre-filled link". To add a question:
// type a dummy answer into it in Google Forms, copy a fresh pre-filled link,
// and add the new entry.xx…  id below with a matching input.
const FORM_ACTION =
  'https://docs.google.com/forms/d/e/1FAIpQLSc-6ShCKYrT4TN52MpXidw11H7N6CfgJ5gm8eNMSxzYk8EKiw/formResponse'
const FIELD_NAME = 'entry.704701710'

export function ExpressionForm() {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('Please enter your name')
      return
    }
    setError('')
    setSubmitting(true)
    try {
      const body = new FormData()
      body.append(FIELD_NAME, name.trim())
      // no-cors: the request reaches Google but the response is opaque, so we
      // can't read success — a resolved fetch means it was sent.
      await fetch(FORM_ACTION, { method: 'POST', mode: 'no-cors', body })
      setDone(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      console.error('Form submission failed', err)
      setError('Sorry — we couldn’t send that. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
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
          Thanks for registering your interest{name.trim() ? `, ${name.trim().split(' ')[0]}` : ''}.
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

  return (
    <form noValidate onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-8">
      <Field label="Full name" required htmlFor="eoi-name" error={error}>
        <TextInput
          id="eoi-name"
          autoComplete="name"
          placeholder="Your full name"
          value={name}
          onChange={(v) => {
            setName(v)
            if (error) setError('')
          }}
          invalid={Boolean(error)}
        />
      </Field>

      <button
        type="submit"
        disabled={submitting}
        className="interactive-lift inline-flex items-center gap-2 bg-brand text-ink-light px-7 py-3.5 rounded-md text-[14px] font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-wait"
      >
        {submitting ? 'Sending…' : <>Submit <ArrowUpRight size={14} /></>}
      </button>
    </form>
  )
}
