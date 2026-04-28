'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const AREAS = [
  'Bedfordshire',
  'Buckinghamshire',
  'Cambridgeshire',
  'Hertfordshire',
  'Manchester',
  'London',
]

const marqueeText = AREAS.join('  ·  ') + '  ·  '

const ease = [0.16, 1, 0.3, 1] as const

export function HeroSection() {
  return (
    <section className="relative min-h-svh bg-forest flex flex-col justify-between overflow-hidden pt-16">
      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center px-6 lg:px-10 max-w-7xl mx-auto w-full py-16 lg:py-24">

        {/* Amber rule above headline — quiet editorial mark */}
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.1, duration: 0.7, ease }}
          className="w-12 h-px bg-amber mb-8 lg:mb-10"
        />

        {/* Headline */}
        <h1
          className="font-display text-ink-light leading-[0.92] tracking-[-0.03em] mb-10 lg:mb-14"
          style={{
            fontSize: 'clamp(3.2rem, 9.5vw, 8.5rem)',
            fontVariationSettings: '"opsz" 72, "wght" 600',
          }}
        >
          {['Care', 'that', 'holds', 'people', 'steady.'].map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.05, duration: 0.6, ease }}
              className="inline-block mr-[0.2em] last:mr-0"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Sub-copy + CTAs side by side on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.62, duration: 0.55, ease }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-16"
        >
          <p
            className="text-ink-muted-light leading-relaxed max-w-[44ch]"
            style={{ fontSize: 'clamp(1rem, 1.6vw, 1.2rem)' }}
          >
            Supported accommodation, home care, and specialist services across
            England. Built around the person.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 flex-shrink-0">
            {/* Text CTA with extending rule */}
            <Link
              href="/services"
              className="group flex items-center gap-3 text-ink-light text-[14px] font-medium tracking-[0.04em] uppercase"
            >
              <span className="h-px bg-ink-light opacity-50 w-6 group-hover:w-10 transition-all duration-300" />
              Our Services
            </Link>

            {/* Primary CTA */}
            <Link
              href="/referrals"
              className="inline-flex items-center gap-2 bg-amber text-deep px-6 py-3 rounded text-[14px] font-semibold hover:opacity-90 transition-opacity"
            >
              Make a Referral
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Area marquee — sits at the bottom of the hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="border-t border-rule-dark overflow-hidden py-3.5"
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
