'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { EASE_OUT_EXPO, MOTION_DURATIONS } from '@/lib/motion'
import { HeroIconGrid } from '@/components/hero/hero-icon-grid'

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
    <section className="relative bg-deep dark-grain flex flex-col justify-between overflow-hidden pt-16 border-b border-rule-dark">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-pulse" />
        <HeroIconGrid />
      </div>

      <div className="relative flex-1 flex flex-col justify-center px-6 lg:px-10 max-w-7xl mx-auto w-full pt-14 pb-12 lg:pt-18 lg:pb-16">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06, duration: MOTION_DURATIONS.base, ease: EASE_OUT_EXPO }}
          className="section-kicker text-ink-muted-light mb-6"
        >
          Healthcare staffing · England
        </motion.p>

        <h1
          className="font-display text-ink-light leading-[0.94] tracking-[-0.03em] mb-7 lg:mb-8"
          style={{
            fontSize: 'clamp(2.4rem, 5.6vw, 4.6rem)',
            fontVariationSettings: '"opsz" 64, "wght" 620',
          }}
        >
          {['The', 'right', 'people,', 'right', 'when', 'your', 'service', 'needs', 'them.'].map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 + i * 0.035, duration: MOTION_DURATIONS.medium, ease: EASE_OUT_EXPO }}
              className="inline-block mr-[0.2em] last:mr-0"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34, duration: MOTION_DURATIONS.medium, ease: EASE_OUT_EXPO }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-7 lg:gap-16"
        >
          <p
            className="text-ink-muted-light leading-relaxed lg:max-w-[46ch]"
            style={{ fontSize: 'clamp(0.95rem, 1.35vw, 1.05rem)' }}
          >
            Horizon Care Services supplies vetted health and social care professionals to local authorities, NHS trusts, care homes and healthcare organisations across England. We support urgent cover, planned staffing gaps and longer-term placements with clear communication from the first call.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-7 flex-shrink-0">
            <Link
              href="/contact"
              className="interactive-lift inline-flex items-center gap-2 bg-brand text-ink-light px-6 py-3 rounded-md text-[14px] font-semibold hover:opacity-90 transition-opacity"
            >
              Request staff
            </Link>
            <Link
              href="/contact"
              className="interactive-lift inline-flex items-center gap-2 border border-ink-light/30 text-ink-light px-6 py-3 rounded-md text-[14px] font-semibold hover:border-ink-light/60 hover:bg-ink-light/5 transition-colors"
            >
              Speak to us about cover
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: MOTION_DURATIONS.base }}
        className="relative border-t border-rule-dark overflow-hidden py-3.5"
        aria-label="Service areas"
      >
        <div className="marquee-track" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="text-ink-muted-light text-[11px] font-medium tracking-[0.14em] uppercase flex-shrink-0 px-6"
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
