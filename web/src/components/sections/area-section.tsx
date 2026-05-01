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
    <section className="bg-cream-dim border-t border-rule-light py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[2fr_3fr] gap-10 lg:gap-24 items-center">

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={IN_VIEW}
            transition={{ duration: MOTION_DURATIONS.base, ease: EASE_OUT_EXPO }}
          >
            <p className="section-kicker text-ink-muted-dark mb-4">
              Where we work
            </p>
            <p
              className="font-display text-ink-dark leading-tight tracking-[-0.025em] mb-4"
              style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                fontVariationSettings: '"opsz" 36, "wght" 580',
              }}
            >
              Serving England.
            </p>
            <p className="text-ink-muted-dark text-[15px] leading-relaxed max-w-[38ch]">
              Six regions, with further expansion planned. Available to individuals,
              families, NHS trusts, and local authorities.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={IN_VIEW}
            transition={{ delay: 0.1, duration: MOTION_DURATIONS.base, ease: EASE_OUT_EXPO }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3.5"
          >
            {areas.map((area) => (
              <div key={area} className="flex items-center gap-2.5">
                <span className="w-1 h-1 rounded-full bg-amber flex-shrink-0" />
                <span className="text-ink-dark text-[15px] font-medium">{area}</span>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
