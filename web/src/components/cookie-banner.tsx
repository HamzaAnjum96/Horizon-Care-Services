'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { EASE_OUT_EXPO, MOTION_DURATIONS } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { CONSENT_EVENTS, readConsent, writeConsent } from '@/lib/cookie-consent'

type View = 'main' | 'preferences'

export function CookieBanner() {
  const pathname = usePathname()
  const [show, setShow] = useState(false)
  const [view, setView] = useState<View>('main')
  const [functional, setFunctional] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Show on first visit (no recorded decision). Skip auto-show on the
  // privacy policy itself so users can read it before deciding.
  useEffect(() => {
    if (readConsent()) return
    if (pathname === '/privacy-policy') return
    setShow(true)
  }, [pathname])

  // Listen for explicit "open preferences" requests (footer link, etc.)
  useEffect(() => {
    const onOpen = () => {
      const current = readConsent()
      setFunctional(current?.functional ?? false)
      setView('main')
      setShow(true)
    }
    window.addEventListener(CONSENT_EVENTS.OPEN_PREFERENCES, onOpen)
    return () => window.removeEventListener(CONSENT_EVENTS.OPEN_PREFERENCES, onOpen)
  }, [])

  // Esc closes only after a choice has already been recorded.
  useEffect(() => {
    if (!show) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (readConsent()) setShow(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [show])

  // Move focus into the dialog on open.
  useEffect(() => {
    if (!show) return
    const t = window.setTimeout(() => {
      cardRef.current
        ?.querySelector<HTMLButtonElement>('[data-cookie-primary]')
        ?.focus()
    }, 50)
    return () => window.clearTimeout(t)
  }, [show, view])

  const acceptAll = () => {
    writeConsent({ functional: true })
    setShow(false)
  }

  const rejectAll = () => {
    writeConsent({ functional: false })
    setShow(false)
  }

  const savePrefs = () => {
    writeConsent({ functional })
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="cookie-banner"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: MOTION_DURATIONS.fast, ease: EASE_OUT_EXPO }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6 py-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-title"
          aria-describedby="cookie-desc"
        >
          {/* Backdrop — clicks intentionally do nothing; user must choose */}
          <div className="absolute inset-0 bg-deep/75 backdrop-blur-[2px]" aria-hidden="true" />

          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 12, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.99 }}
            transition={{ duration: MOTION_DURATIONS.base, ease: EASE_OUT_EXPO }}
            className="relative w-full max-w-[460px] bg-cream rounded-xl border border-rule-light shadow-[0_30px_80px_-30px_oklch(13%_0.06_24)] overflow-hidden"
          >
            {view === 'main' ? (
              <MainView
                onAccept={acceptAll}
                onReject={rejectAll}
                onCustomize={() => setView('preferences')}
                onClose={() => setShow(false)}
              />
            ) : (
              <PreferencesView
                functional={functional}
                onFunctional={setFunctional}
                onBack={() => setView('main')}
                onSave={savePrefs}
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function MainView({
  onAccept,
  onReject,
  onCustomize,
  onClose,
}: {
  onAccept: () => void
  onReject: () => void
  onCustomize: () => void
  onClose: () => void
}) {
  return (
    <div className="p-7 sm:p-8">
      <p className="section-kicker text-ink-muted-dark mb-3">Privacy</p>
      <h2
        id="cookie-title"
        className="font-display text-ink-dark leading-[1.1] tracking-[-0.02em] mb-4"
        style={{
          fontSize: 'clamp(1.35rem, 2.6vw, 1.6rem)',
          fontVariationSettings: '"opsz" 22, "wght" 600',
        }}
      >
        About cookies on this site.
      </h2>
      <div id="cookie-desc" className="space-y-3 text-[13.5px] text-ink-muted-dark leading-relaxed">
        <p>
          We store a small preference locally to remember the choice you make below. With your permission, we also load an interactive map from a third-party service on our contact page.
        </p>
        <p>
          We don&rsquo;t use analytics, advertising, or any cross-site tracking.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2.5 mt-7">
        <button
          type="button"
          onClick={onReject}
          className="interactive-lift inline-flex items-center justify-center gap-2 border border-rule-light text-ink-dark px-4 py-3 rounded-md text-[13px] font-semibold hover:border-ink-muted-dark/50 transition-colors"
        >
          Reject all
        </button>
        <button
          type="button"
          data-cookie-primary
          onClick={onAccept}
          className="interactive-lift inline-flex items-center justify-center gap-2 bg-brand text-ink-light px-4 py-3 rounded-md text-[13px] font-semibold hover:opacity-90 transition-opacity"
        >
          Accept all <Check size={14} aria-hidden="true" />
        </button>
      </div>

      <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <button
          type="button"
          onClick={onCustomize}
          className="text-[12.5px] font-medium text-ink-dark underline underline-offset-2 hover:text-amber transition-colors text-left"
        >
          Customise preferences
        </button>
        <Link
          href="/privacy-policy"
          onClick={onClose}
          className="text-[12px] text-ink-muted-dark hover:text-ink-dark transition-colors inline-flex items-center gap-1"
        >
          Privacy policy <ArrowUpRight size={11} />
        </Link>
      </div>
    </div>
  )
}

function PreferencesView({
  functional,
  onFunctional,
  onBack,
  onSave,
}: {
  functional: boolean
  onFunctional: (v: boolean) => void
  onBack: () => void
  onSave: () => void
}) {
  return (
    <div className="p-7 sm:p-8">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-[12px] font-medium text-ink-muted-dark hover:text-ink-dark transition-colors mb-5"
      >
        <ArrowLeft size={12} /> Back
      </button>

      <p className="section-kicker text-ink-muted-dark mb-3">Privacy</p>
      <h2
        id="cookie-title"
        className="font-display text-ink-dark leading-[1.1] tracking-[-0.02em] mb-6"
        style={{
          fontSize: 'clamp(1.25rem, 2.4vw, 1.45rem)',
          fontVariationSettings: '"opsz" 22, "wght" 600',
        }}
      >
        Customise preferences.
      </h2>

      <div className="space-y-5">
        <Category
          title="Strictly necessary"
          body="A single local preference that remembers your choice on this banner. The site cannot function without it."
          locked
          checked
        />
        <Category
          title="Functional"
          body="Loads our interactive office map from CartoDB on the contact page. Without this, you see a static placeholder and the address is still available."
          checked={functional}
          onChange={onFunctional}
        />
      </div>

      <button
        type="button"
        data-cookie-primary
        onClick={onSave}
        className="interactive-lift mt-7 w-full inline-flex items-center justify-center gap-2 bg-brand text-ink-light px-4 py-3 rounded-md text-[13px] font-semibold hover:opacity-90 transition-opacity"
      >
        Save preferences <Check size={14} aria-hidden="true" />
      </button>
    </div>
  )
}

function Category({
  title,
  body,
  checked,
  locked,
  onChange,
}: {
  title: string
  body: string
  checked: boolean
  locked?: boolean
  onChange?: (v: boolean) => void
}) {
  return (
    <div className="border-t border-rule-light pt-5 first:border-t-0 first:pt-0">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="font-display text-ink-dark text-[14px] mb-1" style={{ fontVariationSettings: '"opsz" 16, "wght" 600' }}>
            {title}
          </p>
          <p className="text-[12.5px] text-ink-muted-dark leading-relaxed">{body}</p>
        </div>
        {locked ? (
          <span className="text-[10px] font-semibold tracking-[0.1em] text-ink-muted-dark uppercase flex-shrink-0 mt-1">
            Always on
          </span>
        ) : (
          <Toggle checked={checked} onChange={(v) => onChange?.(v)} label={title} />
        )}
      </div>
    </div>
  )
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={`Toggle ${label}`}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative flex-shrink-0 mt-0.5 inline-flex items-center w-[38px] h-[22px] rounded-full transition-colors',
        checked ? 'bg-amber' : 'bg-rule-light',
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'inline-block w-[18px] h-[18px] rounded-full bg-cream shadow-sm transition-transform',
          checked ? 'translate-x-[18px]' : 'translate-x-[2px]',
        )}
      />
    </button>
  )
}
