'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { EASE_OUT_EXPO, MOTION_DURATIONS } from '@/lib/motion'
import { HeroIconGrid } from '@/components/hero/hero-icon-grid'
import { RefLine } from '@/components/dossier/ref-line'
import { FieldStamp } from '@/components/dossier/field-stamp'

export function HeroSection() {
  return (
    <section className="relative bg-deep dark-grain texture-halftone wash-amber flex flex-col justify-between overflow-hidden pt-16 border-b border-rule-dark min-h-[88vh] lg:min-h-[92vh]">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-pulse" />
        <HeroIconGrid />
      </div>

      <div className="relative flex-1 flex flex-col justify-center px-6 lg:px-10 max-w-7xl mx-auto w-full pt-14 pb-12 lg:pt-18 lg:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06, duration: MOTION_DURATIONS.base, ease: EASE_OUT_EXPO }}
          className="mb-10"
        >
          <RefLine
            segments={['HCS', 'Staffing', 'England']}
            trailing={
              <span className="hidden sm:block ml-2">
                <FieldStamp>On call · 24/7</FieldStamp>
              </span>
            }
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: MOTION_DURATIONS.slow, ease: EASE_OUT_EXPO }}
          className="font-display text-ink-light leading-[0.96] tracking-[-0.03em] mb-9 lg:mb-10 max-w-[15ch]"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontVariationSettings: '"opsz" 64, "wght" 620',
          }}
        >
          <span className="riso-offset" data-echo="Cover">Cover</span> for wards, homes and community teams across England.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: MOTION_DURATIONS.medium, ease: EASE_OUT_EXPO }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-7 lg:gap-16"
        >
          <p
            className="text-ink-muted-light leading-relaxed lg:max-w-[46ch]"
            style={{ fontSize: 'clamp(0.95rem, 1.35vw, 1.05rem)' }}
          >
            Nurses, social workers, OTs, HCAs and support workers for NHS trusts, local authorities, care homes and supported living services. Tell us the role, setting and urgency. We assess suitability against where you work, not just job title, and confirm availability honestly. If we can&apos;t safely cover the shift, we say so.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-7 flex-shrink-0">
            <Link
              href="/contact"
              className="interactive-lift inline-flex items-center gap-2 bg-brand text-ink-light px-6 py-3 rounded-md text-[14px] font-semibold hover:opacity-90 transition-opacity"
            >
              Request staffing support
            </Link>
            <Link
              href="/contact"
              className="interactive-lift inline-flex items-center gap-2 border border-ink-light/30 text-ink-light px-6 py-3 rounded-md text-[14px] font-semibold hover:border-ink-light/60 hover:bg-ink-light/5 transition-colors"
            >
              Discuss your requirement
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
