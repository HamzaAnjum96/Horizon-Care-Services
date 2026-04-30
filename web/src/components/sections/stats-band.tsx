'use client'

import { motion } from 'framer-motion'
import { EASE_OUT_EXPO, IN_VIEW, MOTION_DURATIONS } from '@/lib/motion'


const stats = [
  { value: '6', label: 'Service areas across England' },
  { value: '2 working\ndays', label: 'Maximum referral response time' },
  { value: '7 days\na week', label: 'On-site staffing availability' },
]

export function StatsBand() {
  return (
    <section className="bg-cream py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-rule-light border-y border-rule-light">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={IN_VIEW}
              transition={{ delay: i * 0.1, duration: MOTION_DURATIONS.base, ease: EASE_OUT_EXPO }}
              className="flex flex-col gap-3 py-10 md:py-0 md:px-12 first:md:pl-0 last:md:pr-0"
            >
              <p
                className="font-display text-forest leading-[1.0] whitespace-pre-line tracking-[-0.03em]"
                style={{
                  fontSize: 'clamp(2.4rem, 4.2vw, 3.8rem)',
                  fontVariationSettings: '"opsz" 48, "wght" 620',
                }}
              >
                {stat.value}
              </p>
              <p className="text-ink-muted-dark text-[12px] font-medium tracking-[0.08em] uppercase leading-snug">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
