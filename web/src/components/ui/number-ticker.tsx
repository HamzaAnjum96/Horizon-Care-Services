'use client'

import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'

interface NumberTickerProps {
  value: number
  suffix?: string
  prefix?: string
}

export function NumberTicker({ value, suffix = '', prefix = '' }: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { damping: 50, stiffness: 80 })
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (isInView) motionVal.set(value)
  }, [isInView, motionVal, value])

  useEffect(() => {
    return spring.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(latest)}${suffix}`
      }
    })
  }, [spring, suffix, prefix])

  return (
    <span ref={ref} aria-label={`${prefix}${value}${suffix}`}>
      {prefix}0{suffix}
    </span>
  )
}
