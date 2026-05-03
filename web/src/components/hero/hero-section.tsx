'use client'

import { useEffect, useRef } from 'react'
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

// Canvas: slowly drifting, subtly undulating horizontal lines.
// Each line has a unique sine-wave frequency and phase so they never
// synchronise. The whole field drifts upward at ~0.35 px/s, wrapping
// seamlessly. A CSS radial mask fades edges to transparent.
// Reduced-motion preference → one static frame, RAF cancelled.
function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number
    let start = 0

    function setup() {
      const dpr = window.devicePixelRatio || 1
      const w = canvas!.offsetWidth
      const h = canvas!.offsetHeight
      if (!w || !h) return
      canvas!.width = Math.round(w * dpr)
      canvas!.height = Math.round(h * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    setup()
    const ro = new ResizeObserver(setup)
    ro.observe(canvas)

    function draw(ts: number) {
      if (!start) start = ts
      const t = reduced ? 0 : (ts - start) / 1000

      const w = canvas!.offsetWidth
      const h = canvas!.offsetHeight
      if (!w || !h) {
        if (!reduced) raf = requestAnimationFrame(draw)
        return
      }
      ctx!.clearRect(0, 0, w, h)

      const spacing = 20
      // No vertical motion or wave amplitude for reduced-motion users
      const amp = reduced ? 0 : 2.5
      const drift = reduced ? 0 : (t * 0.35) % spacing
      const lineCount = Math.ceil(h / spacing) + 2
      const steps = Math.ceil(w / 6) + 2

      ctx!.strokeStyle = 'rgba(245, 244, 241, 0.052)'
      ctx!.lineWidth = 0.65

      for (let i = 0; i < lineCount; i++) {
        // Wrap-around vertical position
        const raw = i * spacing - drift
        const wrap = lineCount * spacing
        const baseY = ((raw % wrap) + wrap) % wrap - spacing

        // Each line: unique wavelength + independent slow phase drift
        const freq = (Math.PI * 2) / (230 + i * 14)
        const phase = i * 0.58 + t * 0.10

        ctx!.beginPath()
        for (let s = 0; s <= steps; s++) {
          const x = s * 6
          const y = baseY + Math.sin(x * freq + phase) * amp
          s === 0 ? ctx!.moveTo(x, y) : ctx!.lineTo(x, y)
        }
        ctx!.stroke()
      }

      if (!reduced) raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [reduced])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      style={{
        maskImage:
          'radial-gradient(ellipse 90% 80% at 50% 52%, black 10%, transparent 80%)',
        WebkitMaskImage:
          'radial-gradient(ellipse 90% 80% at 50% 52%, black 10%, transparent 80%)',
      }}
    />
  )
}

export function HeroSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative bg-deep flex flex-col justify-between overflow-hidden pt-16 border-b border-rule-dark">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-pulse" />
        <HeroCanvas />
      </div>

      <div className="relative flex-1 flex flex-col justify-center px-6 lg:px-10 max-w-7xl mx-auto w-full pt-14 pb-12 lg:pt-18 lg:pb-16">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06, duration: MOTION_DURATIONS.base, ease: EASE_OUT_EXPO }}
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
              transition={{ delay: 0.12 + i * 0.035, duration: MOTION_DURATIONS.medium, ease: EASE_OUT_EXPO }}
              className="inline-block mr-[0.2em] last:mr-0"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34, duration: MOTION_DURATIONS.medium, ease: EASE_OUT_EXPO }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-7 lg:gap-16"
        >
          <p
            className="text-ink-muted-light leading-relaxed max-w-[46ch]"
            style={{ fontSize: 'clamp(0.95rem, 1.35vw, 1.05rem)' }}
          >
            Home care, specialist support, and clinical staffing across England.
            For councils, NHS trusts, and care organisations — and the professionals who want to join us.
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
              href="/contact"
              className="interactive-lift inline-flex items-center gap-2 border border-ink-light/30 text-ink-light px-6 py-3 rounded-md text-[14px] font-semibold hover:border-ink-light/60 hover:bg-ink-light/5 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: MOTION_DURATIONS.base }}
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
