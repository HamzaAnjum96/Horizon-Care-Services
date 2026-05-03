'use client'

import { useReducedMotion } from 'framer-motion'
import { HCSLogoMark } from '@/components/hcs-logo'

function seededFloat(seed: number): number {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

const COLS = 7
const ROWS = 5

interface IconSpec {
  id: string
  type: 'cross' | 'ring' | 'dot' | 'logo'
  left: number
  top: number
  size: number
  opacity: number
  duration: number
  delay: number
}

function buildIcons(): IconSpec[] {
  const icons: IconSpec[] = []
  const pool: IconSpec['type'][] = ['cross', 'ring', 'dot', 'logo', 'cross', 'ring', 'dot']
  let s = 0

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (seededFloat(s++) < 0.30) continue

      const cw = 100 / COLS
      const ch = 100 / ROWS
      const left = col * cw + seededFloat(s++) * cw * 0.8 + cw * 0.1
      const top  = row * ch + seededFloat(s++) * ch * 0.8 + ch * 0.1
      const type = pool[Math.floor(seededFloat(s++) * pool.length)]
      const size = 20 + Math.floor(seededFloat(s++) * 58)
      const opacity  = 0.04 + seededFloat(s++) * 0.07
      const duration = 4   + seededFloat(s++) * 5
      const delay    = -(seededFloat(s++) * 9)

      icons.push({ id: `${row}-${col}`, type, left, top, size, opacity, duration, delay })
    }
  }
  return icons
}

const ICONS = buildIcons()

function IconShape({ type, size }: { type: IconSpec['type']; size: number }) {
  if (type === 'logo') {
    return (
      <div style={{ width: size, height: size }}>
        <HCSLogoMark className="w-full h-full" />
      </div>
    )
  }
  if (type === 'cross') {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
        <rect x="10.5" y="2" width="3" height="20" rx="0.75" fill="currentColor" />
        <rect x="2" y="10.5" width="20" height="3" rx="0.75" fill="currentColor" />
      </svg>
    )
  }
  if (type === 'ring') {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
        <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <circle cx="12" cy="12" r="4.5" fill="currentColor" />
    </svg>
  )
}

export function HeroIconGrid() {
  const reduced = useReducedMotion()

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none select-none text-ink-light"
      style={{
        maskImage:
          'radial-gradient(ellipse 88% 78% at 50% 50%, black 15%, transparent 78%)',
        WebkitMaskImage:
          'radial-gradient(ellipse 88% 78% at 50% 50%, black 15%, transparent 78%)',
      }}
    >
      {ICONS.map((icon) => (
        <div
          key={icon.id}
          className="absolute"
          style={{
            left: `${icon.left}%`,
            top: `${icon.top}%`,
            marginLeft: -icon.size / 2,
            marginTop: -icon.size / 2,
            opacity: icon.opacity,
            animation: reduced
              ? 'none'
              : `hcs-breathe ${icon.duration.toFixed(2)}s ${icon.delay.toFixed(2)}s ease-in-out infinite`,
            willChange: reduced ? 'auto' : 'transform',
          }}
        >
          <IconShape type={icon.type} size={icon.size} />
        </div>
      ))}
    </div>
  )
}
