'use client'

import { motion } from 'framer-motion'

const areas = [
  { name: 'Bedfordshire',    weight: 500, size: 'clamp(1.5rem, 3vw, 2rem)' },
  { name: 'Buckinghamshire', weight: 700, size: 'clamp(2rem, 4vw, 2.75rem)' },
  { name: 'Cambridgeshire',  weight: 500, size: 'clamp(1.3rem, 2.5vw, 1.75rem)' },
  { name: 'Hertfordshire',   weight: 750, size: 'clamp(2.25rem, 4.5vw, 3.25rem)' },
  { name: 'Manchester',      weight: 600, size: 'clamp(1.75rem, 3.5vw, 2.5rem)' },
  { name: 'London',          weight: 800, size: 'clamp(2.75rem, 5.5vw, 4rem)' },
]

export function AreaSection() {
  return (
    <section className="bg-bg-subtle py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[2fr_3fr] gap-14 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-text-muted mb-3">
              Coverage
            </p>
            <h2
              className="font-display text-text-main tracking-[-0.02em] mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700 }}
            >
              Serving
              <br />
              England.
            </h2>
            <p className="text-text-muted text-[15px] leading-relaxed max-w-[40ch]">
              We operate across six regions, with further expansion planned.
              Services are available to individuals, families, NHS trusts, and
              local authorities.
            </p>
          </motion.div>

          <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1.5">
            {areas.map((area, i) => (
              <motion.span
                key={area.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  delay: i * 0.07,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-display text-text-main tracking-[-0.02em]"
                style={{ fontSize: area.size, fontWeight: area.weight }}
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
