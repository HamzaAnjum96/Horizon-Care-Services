'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { EASE_OUT_EXPO, MOTION_DURATIONS } from '@/lib/motion'

const AREAS = [
  'Bedfordshire',
  'Buckinghamshire',
  'Cambridgeshire',
  'Hertfordshire',
  'Manchester',
  'London',
]

const marqueeText = AREAS.join('  ·  ') + '  ·  '

export function HeroSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative min-h-[76vh] lg:min-h-[82vh] bg-cream flex flex-col justify-between overflow-hidden pt-16 border-b border-rule-light">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 -right-20 h-[22rem] w-[22rem] rounded-full bg-moss-soft/30 blur-3xl" />
        <div className="absolute bottom-10 -left-20 h-[18rem] w-[18rem] rounded-full bg-sky-soft/35 blur-3xl" />
      </div>

      <div className="relative flex-1 flex flex-col justify-center px-6 lg:px-10 max-w-7xl mx-auto w-full py-14 lg:py-16">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: MOTION_DURATIONS.base, ease: EASE_OUT_EXPO }}
          className="section-kicker text-ink-muted-dark mb-7 lg:mb-8"
        >
          Trusted care across England
        </motion.p>

        <h1
          className="font-display text-ink-dark leading-[0.94] tracking-[-0.03em] mb-8 lg:mb-10"
          style={{
            fontSize: 'clamp(2.55rem, 6.4vw, 5.35rem)',
            fontVariationSettings: '"opsz" 72, "wght" 620',
          }}
        >
          {['Care', 'that', 'holds', 'people', 'steady.'].map(
            (word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05, duration: MOTION_DURATIONS.medium, ease: EASE_OUT_EXPO }}
                className="inline-block mr-[0.2em] last:mr-0"
              >
                {word}
              </motion.span>
            ),
          )}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.62, duration: MOTION_DURATIONS.medium, ease: EASE_OUT_EXPO }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-16"
        >
          <p
            className="text-ink-muted-dark leading-relaxed max-w-[50ch]"
            style={{ fontSize: 'clamp(1rem, 1.45vw, 1.13rem)' }}
          >
            Supported accommodation, home care, and specialist support for
            referrers, families, and people who need a dependable care partner.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 flex-shrink-0">
            <Link
              href="/services"
              className="group interactive-lift flex items-center gap-3 text-ink-dark text-[13px] font-semibold tracking-[0.08em] uppercase"
            >
              <span className="h-px bg-ink-dark/60 w-6 group-hover:w-10 transition-all duration-300" />
              View Services
            </Link>

            <Link
              href="/referrals"
              className="interactive-lift inline-flex items-center gap-2 bg-amber text-deep px-6 py-3 rounded-md text-[14px] font-semibold hover:opacity-90 transition-opacity"
            >
              Make a Referral
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: MOTION_DURATIONS.base }}
        className="border-t border-rule-light overflow-hidden py-3.5"
        aria-label="Service areas"
      >
        <div className="marquee-track" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="text-ink-muted-dark text-[11px] font-medium tracking-[0.14em] uppercase flex-shrink-0 px-6"
            >
              {marqueeText}
            </span>
          ))}
        </div>
        <span className="sr-only">{AREAS.join(', ')}</span>
      </motion.div>
    </section>
  )
}
