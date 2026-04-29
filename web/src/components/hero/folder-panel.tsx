'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { EASE_OUT_EXPO, MOTION_DURATIONS } from '@/lib/motion'
import { StickerBadge } from './sticker-badge'

type Audience = 'families' | 'professionals'

export function FolderPanel() {
  const [active, setActive] = useState<Audience>('families')

  return (
    /* mt-11 creates vertical space so the tabs can sit above the panel */
    <div className="relative mt-11">
      {/* Folder tabs — positioned flush against the panel top */}
      <div className="absolute bottom-full left-0 flex items-end gap-[3px]">
        <TabButton
          isActive={active === 'families'}
          onClick={() => setActive('families')}
        >
          For Individuals &amp; Families
        </TabButton>
        <TabButton
          isActive={active === 'professionals'}
          onClick={() => setActive('professionals')}
        >
          For Professionals
        </TabButton>
      </div>

      {/* Panel — rounded-tl-none so it merges flush with the active tab */}
      <motion.div
        initial={{ opacity: 0, y: 44, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: MOTION_DURATIONS.slow, ease: EASE_OUT_EXPO }}
        className="bg-bg-base rounded-[20px] rounded-tl-none overflow-hidden"
        style={{
          boxShadow: '0 32px 80px oklch(0% 0 0 / 0.45)',
        }}
      >
        <AnimatePresence mode="wait">
          {active === 'families' ? (
            <FamiliesContent key="families" />
          ) : (
            <ProfessionalsContent key="professionals" />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

function TabButton({
  isActive,
  onClick,
  children,
}: {
  isActive: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-5 py-2.5 rounded-t-xl text-[13px] font-medium transition-all select-none',
        isActive
          ? 'bg-bg-base text-text-main z-10 translate-y-0'
          : [
              'bg-[oklch(87%_0.02_145)] text-text-muted translate-y-[4px]',
              'shadow-[inset_0_-3px_8px_oklch(0%_0_0_/_0.06)]',
              'hover:bg-[oklch(91%_0.02_145)]',
            ],
      )}
    >
      {children}
    </button>
  )
}

/* ─── Families content ───────────────────────────── */
function FamiliesContent() {
  const words = ['Care', 'that', 'holds', 'people', 'steady.']

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 8 }}
      transition={{ duration: MOTION_DURATIONS.fast, ease: EASE_OUT_EXPO }}
      className="grid md:grid-cols-[1fr_auto]"
    >
      {/* Left: headline + body + CTAs */}
      <div className="px-8 py-10 md:px-12 md:py-14">
        <h1
          className="font-display text-text-main leading-[1.06] mb-5 tracking-[-0.02em]"
          style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', fontWeight: 750 }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.15 + i * 0.045,
                duration: MOTION_DURATIONS.base,
                ease: EASE_OUT_EXPO,
              }}
              className="inline-block mr-[0.22em] last:mr-0"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.46, duration: MOTION_DURATIONS.base }}
          className="text-text-muted text-[17px] leading-relaxed max-w-[50ch] mb-8"
        >
          Supported accommodation, home care, and specialist services across
          England. Built around the person, not the paperwork.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.56, duration: MOTION_DURATIONS.base, ease: EASE_OUT_EXPO }}
          className="flex flex-wrap gap-3"
        >
          <Link
            href="/services"
            className="interactive-lift inline-flex items-center gap-2 bg-green-brand text-text-inv px-5 py-2.5 rounded-lg font-medium text-[14px] hover:bg-green-hover transition-colors"
          >
            Our Services <ArrowRight size={14} />
          </Link>
          <Link
            href="/referrals"
            className="interactive-lift inline-flex items-center gap-2 bg-amber text-text-main px-5 py-2.5 rounded-lg font-semibold text-[14px] hover:opacity-90 transition-opacity"
          >
            Make a Referral <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>

      {/* Right: sticker cluster */}
      <div className="hidden md:flex flex-col justify-center gap-3.5 px-10 py-12 border-l border-border-soft min-w-[230px]">
        <StickerBadge variant="amber" rotate={-2} delay={0.62}>
          Staffed 7 days a week
        </StickerBadge>
        <StickerBadge variant="sage" rotate={1.5} delay={0.74}>
          6 service areas
        </StickerBadge>
        <StickerBadge variant="cream" rotate={-1} delay={0.86}>
          2-day referral response
        </StickerBadge>

        <p className="text-[12px] text-text-muted mt-3 leading-snug">
          Bedfordshire, Hertfordshire,
          <br />
          London and more.
        </p>
      </div>
    </motion.div>
  )
}

/* ─── Professionals content ──────────────────────── */
function ProfessionalsContent() {
  const words = ['Staff', 'and', 'referrals,', 'handled', 'with', 'care.']

  return (
    <motion.div
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -8 }}
      transition={{ duration: MOTION_DURATIONS.fast, ease: EASE_OUT_EXPO }}
      className="grid md:grid-cols-[1fr_auto]"
    >
      <div className="px-8 py-10 md:px-12 md:py-14">
        <h1
          className="font-display text-text-main leading-[1.06] mb-5 tracking-[-0.02em]"
          style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', fontWeight: 750 }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.045,
                duration: MOTION_DURATIONS.base,
                ease: EASE_OUT_EXPO,
              }}
              className="inline-block mr-[0.22em] last:mr-0"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: MOTION_DURATIONS.base }}
          className="text-text-muted text-[17px] leading-relaxed max-w-[50ch] mb-8"
        >
          Staffing solutions and referral pathways for NHS trusts, local
          authorities, and care organisations. Available round the clock.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: MOTION_DURATIONS.base, ease: EASE_OUT_EXPO }}
          className="flex flex-wrap gap-3"
        >
          <Link
            href="/services/staffing"
            className="interactive-lift inline-flex items-center gap-2 bg-green-brand text-text-inv px-5 py-2.5 rounded-lg font-medium text-[14px] hover:bg-green-hover transition-colors"
          >
            Staffing Solutions <ArrowRight size={14} />
          </Link>
          <Link
            href="/referrals"
            className="interactive-lift inline-flex items-center gap-2 bg-amber text-text-main px-5 py-2.5 rounded-lg font-semibold text-[14px] hover:opacity-90 transition-opacity"
          >
            Submit a Referral <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>

      <div className="hidden md:flex flex-col justify-center gap-3.5 px-10 py-12 border-l border-border-soft min-w-[230px]">
        <StickerBadge variant="deep" rotate={-1.5} delay={0.38}>
          24/7 availability
        </StickerBadge>
        <StickerBadge variant="amber" rotate={2} delay={0.48}>
          Short-notice cover
        </StickerBadge>
        <StickerBadge variant="sage" rotate={-2.5} delay={0.58}>
          NHS &amp; LA referrals
        </StickerBadge>

        <p className="text-[12px] text-text-muted mt-3 leading-snug">
          Urgent staffing:
          <br />
          <a
            href="tel:07572701349"
            className="interactive-lift font-semibold text-green-brand hover:text-green-hover transition-colors"
          >
            07572 701 349
          </a>
        </p>
      </div>
    </motion.div>
  )
}
