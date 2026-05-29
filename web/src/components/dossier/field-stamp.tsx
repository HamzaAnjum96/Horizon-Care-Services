'use client'

import { useRef } from 'react'
import { useInView } from 'framer-motion'

interface FieldStampProps {
  children: React.ReactNode
  /** Use on dark surfaces for the dimmer amber outline. */
  reversed?: boolean
  /** Settle on scroll into view. Defaults to true. */
  animate?: boolean
  className?: string
}

/**
 * A rotated, double-ruled, lightly distressed stamp. The signature dossier
 * accent: 'RESPONSE ≤ 2 WORKING DAYS', 'DBS VERIFIED', 'ON CALL · 24/7'.
 * Static by default; settles into place when scrolled into view.
 */
export function FieldStamp({ children, reversed = false, animate = true, className = '' }: FieldStampProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <span
      ref={ref}
      className={[
        'field-stamp',
        reversed ? 'field-stamp--reversed' : '',
        animate && inView ? 'stamp-animate' : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      {children}
    </span>
  )
}
