'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { EASE_OUT_EXPO, MOTION_DURATIONS } from '@/lib/motion'

interface StickerBadgeProps {
  children: React.ReactNode
  rotate?: number
  variant?: 'amber' | 'sage' | 'cream' | 'deep'
  delay?: number
  className?: string
}

const variantClasses: Record<NonNullable<StickerBadgeProps['variant']>, string> = {
  amber: 'bg-amber text-text-main',
  sage:  'bg-[oklch(85%_0.08_148)] text-text-main',
  cream: 'bg-[oklch(95%_0.015_90)] text-text-main',
  deep:  'bg-bg-mid text-text-inv',
}

export function StickerBadge({
  children,
  rotate = -2,
  variant = 'amber',
  delay = 0,
  className,
}: StickerBadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.65, rotate: rotate * 3.5 }}
      animate={{ opacity: 1, scale: 1, rotate }}
      transition={{ delay, duration: MOTION_DURATIONS.medium, ease: EASE_OUT_EXPO }}
      className={cn(
        'inline-block px-3 py-[5px] rounded-[6px]',
        'text-[11px] font-semibold tracking-[0.06em] uppercase whitespace-nowrap',
        'shadow-[0_2px_0_oklch(0%_0_0_/_0.12),_0_4px_14px_oklch(0%_0_0_/_0.2)]',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </motion.span>
  )
}
