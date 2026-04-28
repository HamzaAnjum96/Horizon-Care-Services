'use client'

import { motion } from 'framer-motion'
import { NumberTicker } from '@/components/ui/number-ticker'

const stats = [
  {
    id: 'areas',
    ticker: true,
    value: 6,
    suffix: '',
    display: null,
    label: 'Service areas across England',
  },
  {
    id: 'response',
    ticker: false,
    value: 2,
    suffix: '',
    display: '2 working\ndays',
    label: 'Referral response time',
  },
  {
    id: 'availability',
    ticker: false,
    value: 7,
    suffix: '',
    display: '7 days\na week',
    label: 'On-site staffing availability',
  },
]

export function StatsBand() {
  return (
    <section className="bg-bg-mid py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                delay: i * 0.1,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col gap-2.5"
            >
              <p
                className="font-display text-amber-light leading-[1.0] whitespace-pre-line tracking-[-0.02em]"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
                  fontWeight: 700,
                }}
              >
                {stat.ticker ? (
                  <NumberTicker value={stat.value} suffix={stat.suffix} />
                ) : (
                  stat.display ?? `${stat.value}${stat.suffix}`
                )}
              </p>
              <p className="text-green-muted text-[13px] font-medium tracking-[0.04em] uppercase leading-snug">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
