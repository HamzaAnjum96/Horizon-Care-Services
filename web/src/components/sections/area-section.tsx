'use client'

import { motion } from 'framer-motion'
import { EASE_OUT_EXPO, IN_VIEW, MOTION } from '@/lib/motion'

const areas = [
  { name: 'Bedfordshire',    wght: 400, size: 'clamp(1.5rem, 3vw, 2rem)',       opsz: 24 },
  { name: 'Buckinghamshire', wght: 600, size: 'clamp(2rem, 4vw, 2.75rem)',      opsz: 32 },
  { name: 'Cambridgeshire',  wght: 400, size: 'clamp(1.3rem, 2.5vw, 1.75rem)', opsz: 20 },
  { name: 'Hertfordshire',   wght: 700, size: 'clamp(2.25rem, 4.5vw, 3.25rem)', opsz: 40 },
  { name: 'Manchester',      wght: 500, size: 'clamp(1.75rem, 3.5vw, 2.5rem)', opsz: 28 },
  { name: 'London',          wght: 600, size: 'clamp(2.75rem, 5.5vw, 4rem)',   opsz: 48 },
]

export function AreaSection() {
  return (
    <section className="bg-forest py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[2fr_3fr] gap-14 lg:gap-24 items-start">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={IN_VIEW}
            transition={{ duration: MOTION.base, ease: EASE_OUT_EXPO }}
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

          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            {areas.map((area, i) => (
              <motion.span
                key={area.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={IN_VIEW}
                transition={{
                  delay: i * MOTION.stagger,
                  duration: MOTION.base,
                  ease: EASE_OUT_EXPO,
                }}
                className="font-display text-ink-light tracking-[-0.025em]"
                style={{
                  fontSize: area.size,
                  fontVariationSettings: `"opsz" ${area.opsz}, "wght" ${area.wght}`,
                }}
              >
                {area.name}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
