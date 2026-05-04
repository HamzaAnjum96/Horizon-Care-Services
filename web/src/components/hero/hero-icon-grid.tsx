'use client'

import { useReducedMotion } from 'framer-motion'
import { HCSLogoMark } from '@/components/hcs-logo'

function seededFloat(seed: number): number {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

const COLS = 13
const ROWS = 8

type IconType =
  | 'cross'
  | 'dot'
  | 'logo'
  | 'shield'

interface IconSpec {
  id: string
  type: IconType
  left: number
  top: number
  size: number
  opacity: number
  duration: number
  delay: number
}

function buildIcons(): IconSpec[] {
  const icons: IconSpec[] = []
  const pool: IconType[] = [
    'cross', 'cross', 'cross',
    'dot', 'dot', 'dot',
    'shield', 'shield', 'shield',
    'logo', 'logo', 'logo',
  ]
  // offset seed so arrangement differs from the old 7×5 layout
  let s = 137

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      // density gradient: sparse on left, dense on right
      const t = col / (COLS - 1)
      const skipChance = 0.72 - t * 0.62   // left ~72% skip → right ~10% skip
      if (seededFloat(s++) < skipChance) continue

      const cw = 100 / COLS
      const ch = 100 / ROWS
      const left = col * cw + seededFloat(s++) * cw * 0.8 + cw * 0.1
      const top  = row * ch + seededFloat(s++) * ch * 0.8 + ch * 0.1
      const type = pool[Math.floor(seededFloat(s++) * pool.length)]
      // power skew: most icons small, few large
      const raw  = Math.pow(seededFloat(s++), 1.7)
      const size = Math.floor(raw * 62) + 11
      const opacity  = 0.12 + seededFloat(s++) * 0.18
      const duration = 4   + seededFloat(s++) * 5
      const delay    = -(seededFloat(s++) * 9)

      icons.push({ id: `${row}-${col}`, type, left, top, size, opacity, duration, delay })
    }
  }
  return icons
}

const ICONS = buildIcons()

function IconShape({ type, size }: { type: IconType; size: number }) {
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
        <rect x="8" y="2" width="8" height="20" rx="1.5" fill="currentColor" />
        <rect x="2" y="8" width="20" height="8" rx="1.5" fill="currentColor" />
      </svg>
    )
  }
  if (type === 'dot') {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
        <circle cx="12" cy="12" r="4.5" fill="currentColor" />
      </svg>
    )
  }
  if (type === 'shield') {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
        <path
          d="M12 2 L20 5.5 L20 11 C20 15.5 16.5 19.5 12 21 C7.5 19.5 4 15.5 4 11 L4 5.5 Z"
          fill="currentColor"
        />
      </svg>
    )
  }
  return null
}

export function HeroIconGrid() {
  const reduced = useReducedMotion()

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none select-none"
      style={{
        color: 'oklch(55% 0.12 20)',
        maskImage:
          'radial-gradient(ellipse 92% 82% at 50% 50%, black 10%, transparent 80%)',
        WebkitMaskImage:
          'radial-gradient(ellipse 92% 82% at 50% 50%, black 10%, transparent 80%)',
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
