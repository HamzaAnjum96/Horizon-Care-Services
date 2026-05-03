'use client'

import { useReducedMotion } from 'framer-motion'
import { HCSLogoMark } from '@/components/hcs-logo'

function seededFloat(seed: number): number {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

const COLS = 11
const ROWS = 7

type IconType =
  | 'cross'
  | 'ring'
  | 'dot'
  | 'logo'
  | 'heartbeat'
  | 'pill'
  | 'diamond'
  | 'hex'
  | 'asterisk'
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
  // weighted pool — simpler shapes more common, logo rare
  const pool: IconType[] = [
    'cross', 'cross',
    'ring', 'ring',
    'dot', 'dot',
    'heartbeat',
    'pill',
    'diamond',
    'hex',
    'asterisk',
    'shield',
    'logo',
  ]
  let s = 0

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (seededFloat(s++) < 0.22) continue

      const cw = 100 / COLS
      const ch = 100 / ROWS
      const left = col * cw + seededFloat(s++) * cw * 0.8 + cw * 0.1
      const top  = row * ch + seededFloat(s++) * ch * 0.8 + ch * 0.1
      const type = pool[Math.floor(seededFloat(s++) * pool.length)]
      const size = 18 + Math.floor(seededFloat(s++) * 48)
      const opacity  = 0.04 + seededFloat(s++) * 0.07
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
    // Bold filled medical cross — arm width ~8/24 (Red Cross proportion)
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
        <rect x="8" y="2" width="8" height="20" rx="1.5" fill="currentColor" />
        <rect x="2" y="8" width="20" height="8" rx="1.5" fill="currentColor" />
      </svg>
    )
  }
  if (type === 'ring') {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
        <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.8" fill="none" />
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
  if (type === 'heartbeat') {
    return (
      <svg viewBox="0 0 36 18" width={size * 1.8} height={size * 0.9} aria-hidden="true">
        <polyline
          points="0,9 6,9 9,3 12,15 15,6 18,12 21,9 36,9"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    )
  }
  if (type === 'pill') {
    const w = size * 1.7
    const h = size * 0.7
    const r = h / 2
    return (
      <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} aria-hidden="true">
        <rect x={0} y={0} width={w} height={h} rx={r} ry={r}
          stroke="currentColor" strokeWidth="1.8" fill="none" />
        <line x1={w / 2} y1={h * 0.2} x2={w / 2} y2={h * 0.8}
          stroke="currentColor" strokeWidth="1.8" />
      </svg>
    )
  }
  if (type === 'diamond') {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
        <polygon
          points="12,2 22,12 12,22 2,12"
          stroke="currentColor" strokeWidth="1.8" fill="none"
        />
      </svg>
    )
  }
  if (type === 'hex') {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
        <polygon
          points="12,2 20.66,7 20.66,17 12,22 3.34,17 3.34,7"
          stroke="currentColor" strokeWidth="1.8" fill="none"
        />
      </svg>
    )
  }
  if (type === 'asterisk') {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
        <line x1="12" y1="2"  x2="12" y2="22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="2.5" y1="7"   x2="21.5" y2="17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="21.5" y1="7"  x2="2.5"  y2="17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  }
  if (type === 'shield') {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
        <path
          d="M12 2 L20 5.5 L20 11 C20 15.5 16.5 19.5 12 21 C7.5 19.5 4 15.5 4 11 L4 5.5 Z"
          stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinejoin="round"
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
      className="absolute inset-0 pointer-events-none select-none text-ink-light"
      style={{
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
