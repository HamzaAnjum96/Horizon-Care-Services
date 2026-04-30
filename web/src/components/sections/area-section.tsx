'use client'

import { motion } from 'framer-motion'
import { EASE_OUT_EXPO, IN_VIEW, MOTION_DURATIONS } from '@/lib/motion'

const areas = [
  'Bedfordshire',
  'Buckinghamshire',
  'Cambridgeshire',
  'Hertfordshire',
  'Manchester',
  'London',
]

export function AreaSection() {
  return (
    <section className="bg-deep py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[2fr_3fr] gap-14 lg:gap-24 items-start">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={IN_VIEW}
            transition={{ duration: MOTION_DURATIONS.base, ease: EASE_OUT_EXPO }}
          >
            <p className="section-kicker text-ink-muted-light mb-7">
              Coverage
            </p>
            <p
              className="font-display text-ink-light leading-tight tracking-[-0.025em] mb-8"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontVariationSettings: '"opsz" 36, "wght" 580',
              }}
            >
              Serving England.
            </p>
            <p className="text-ink-muted-light text-[15px] leading-relaxed max-w-[40ch]">
              We operate across six regions, with further expansion planned.
              Services are available to individuals, families, NHS trusts, and
              local authorities.
            </p>
          </motion.div>

          <div>
            {areas.map((area, i) => (
              <motion.div
                key={area}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={IN_VIEW}
                transition={{ delay: i * 0.07, duration: MOTION_DURATIONS.base, ease: EASE_OUT_EXPO }}
                className="flex items-center justify-between py-[1.1rem] border-b border-ink-light/15 first:border-t first:border-ink-light/15"
              >
                <span
                  className="font-display text-ink-light leading-tight tracking-[-0.02em]"
                  style={{
                    fontSize: 'clamp(1.35rem, 2.4vw, 2rem)',
                    fontVariationSettings: '"opsz" 22, "wght" 480',
                  }}
                >
                  {area}
                </span>
                <span className="text-ink-muted-light text-[11px] font-medium tracking-[0.12em] tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
