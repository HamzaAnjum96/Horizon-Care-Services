'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { EASE_OUT_EXPO, MOTION_DURATIONS } from '@/lib/motion'
import { HeroIconGrid } from '@/components/hero/hero-icon-grid'
import { RefLine } from '@/components/dossier/ref-line'
import { FieldStamp } from '@/components/dossier/field-stamp'

interface PageHeaderProps {
  kicker: string
  title: string
  intro?: string
  cta?: { label: string; href: string }
  showGrid?: boolean
  /** Document reference segments shown after "Ref /". Falls back to [kicker]. */
  refSegments?: string[]
  /** Optional stamp pinned top-right of the header. */
  stamp?: string
}

export function PageHeader({ kicker, title, intro, cta, showGrid = true, refSegments, stamp }: PageHeaderProps) {
  return (
    <div className="relative bg-deep texture-halftone wash-deep border-b border-rule-dark pt-28 pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
      {showGrid && <HeroIconGrid />}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: MOTION_DURATIONS.base, ease: EASE_OUT_EXPO }}
          className="flex items-start justify-between gap-6 mb-6"
        >
          <RefLine segments={refSegments ?? [kicker]} />
          {stamp && (
            <div className="hidden sm:block flex-shrink-0">
              <FieldStamp reversed>{stamp}</FieldStamp>
            </div>
          )}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24, duration: MOTION_DURATIONS.medium, ease: EASE_OUT_EXPO }}
          className="font-display text-ink-light leading-[0.96] tracking-[-0.03em] max-w-[20ch]"
          style={{
            fontSize: 'clamp(2.4rem, 5.2vw, 4.2rem)',
            fontVariationSettings: '"opsz" 56, "wght" 600',
          }}
        >
          {title}
        </motion.h1>

        {(intro || cta) && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.36, duration: MOTION_DURATIONS.medium, ease: EASE_OUT_EXPO }}
            className="mt-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
          >
            {intro && (
              <p
                className="text-ink-muted-light leading-relaxed max-w-[50ch]"
                style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)' }}
              >
                {intro}
              </p>
            )}
            {cta && (
              <Link
                href={cta.href}
                className="interactive-lift inline-flex items-center gap-2 bg-brand text-ink-light px-6 py-3 rounded-md text-[14px] font-semibold hover:opacity-90 transition-opacity flex-shrink-0"
              >
                {cta.label} <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}
