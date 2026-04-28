'use client'

import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

const stats = [
  { value: '6', label: 'Service areas across England' },
  { value: '2 working\ndays', label: 'Maximum referral response time' },
  { value: '7 days\na week', label: 'On-site staffing availability' },
]

export function StatsBand() {
  return (
    <section className="bg-deep py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-rule-dark">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.5, ease }}
              className="flex flex-col gap-3 py-10 md:py-0 md:px-12 first:md:pl-0 last:md:pr-0"
            >
              <p
                className="font-display text-amber leading-[1.0] whitespace-pre-line tracking-[-0.03em]"
                style={{
                  fontSize: 'clamp(2.8rem, 5vw, 4.25rem)',
                  fontVariationSettings: '"opsz" 48, "wght" 600',
                  fontStyle: 'italic',
                }}
              >
                {stat.value}
              </p>
              <p className="text-ink-muted-light text-[12px] font-medium tracking-[0.08em] uppercase leading-snug">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
