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
    <section className="relative bg-deep flex flex-col justify-between overflow-hidden pt-16 border-b border-rule-dark">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-pulse" />
        <div className="hero-dot-grid" />
        {/* Ring decoration — orbit dots trace the logo's circular dot motif */}
        <svg
          viewBox="0 0 400 400"
          aria-hidden="true"
          className="absolute right-[-6%] top-1/2 -translate-y-[44%] w-[min(50vw,36rem)] text-ink-light hidden lg:block pointer-events-none select-none z-[2]"
        >
          {/* Outer ring + cardinal ticks */}
          <g className="hero-ring-outer">
            <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="0.6" />
            <line x1="200" y1="20"  x2="200" y2="33"  stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="380" y1="200" x2="367" y2="200" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="200" y1="380" x2="200" y2="367" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="20"  y1="200" x2="33"  y2="200" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </g>

          {/* Inner ring */}
          <g className="hero-ring-inner">
            <circle cx="200" cy="200" r="116" fill="none" stroke="currentColor" strokeWidth="0.45" />
          </g>

          {/* Center registration dot */}
          <circle cx="200" cy="200" r="1.5" fill="currentColor" style={{ opacity: 0.18 }} />

          {/* Main orbit dot — outer ring, clockwise 40 s */}
          <g className="hero-orbit-outer" style={{ opacity: 0.14 }}>
            <circle cx="200" cy="20" r="4.5" fill="currentColor" />
          </g>

          {/* Secondary orbit dot — inner ring, 180° phase offset */}
          <g className="hero-orbit-inner" style={{ opacity: 0.10 }}>
            <circle cx="200" cy="84" r="2.5" fill="currentColor" />
          </g>
        </svg>
      </div>

      <div className="relative flex-1 flex flex-col justify-center px-6 lg:px-10 max-w-7xl mx-auto w-full pt-14 pb-12 lg:pt-18 lg:pb-16">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: MOTION_DURATIONS.base, ease: EASE_OUT_EXPO }}
          className="section-kicker text-ink-muted-light mb-6"
        >
          Registered health &amp; social care · England
        </motion.p>

        <h1
          className="font-display text-ink-light leading-[0.94] tracking-[-0.03em] mb-7 lg:mb-8"
          style={{
            fontSize: 'clamp(2.4rem, 5.6vw, 4.6rem)',
            fontVariationSettings: '"opsz" 64, "wght" 620',
          }}
        >
          {['Care', 'that', 'holds', 'people', 'steady.'].map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 + i * 0.05, duration: MOTION_DURATIONS.medium, ease: EASE_OUT_EXPO }}
              className="inline-block mr-[0.2em] last:mr-0"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.56, duration: MOTION_DURATIONS.medium, ease: EASE_OUT_EXPO }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-7 lg:gap-16"
        >
          <p
            className="text-ink-muted-light leading-relaxed max-w-[46ch]"
            style={{ fontSize: 'clamp(0.95rem, 1.35vw, 1.05rem)' }}
          >
            Supported accommodation, home care, and specialist support across
            England. For NHS referrers, local authorities, and families.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-7 flex-shrink-0">
            <Link
              href="/services"
              className="group interactive-lift flex items-center gap-3 text-ink-light text-[13px] font-semibold tracking-[0.08em] uppercase"
            >
              <span className="h-px bg-ink-light/50 w-6 group-hover:w-10 transition-all duration-300" />
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
        transition={{ delay: 0.85, duration: MOTION_DURATIONS.base }}
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
