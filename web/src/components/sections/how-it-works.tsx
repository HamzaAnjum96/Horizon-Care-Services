'use client'

import { motion } from 'framer-motion'
import { EASE_OUT_EXPO, IN_VIEW, MOTION_DURATIONS } from '@/lib/motion'


const steps = [
  {
    num: '01',
    title: 'Assessment',
    desc: 'A holistic assessment covering physical health, mental health, daily living, finances, social network, and support needs.',
  },
  {
    num: '02',
    title: 'Care Plan',
    desc: 'A personalised plan built around the individual: their goals, choices, and the level of support required.',
  },
  {
    num: '03',
    title: 'Placement',
    desc: 'The right service is matched to the person — accommodation, home care, staffing, or a specialist pathway.',
  },
  {
    num: '04',
    title: 'Review',
    desc: 'Regular meetings track progress, celebrate achievements, and adjust the plan as circumstances change.',
  },
]

export function HowItWorks() {
  return (
    <section className="bg-cream-dim py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={IN_VIEW}
          transition={{ duration: MOTION_DURATIONS.base, ease: EASE_OUT_EXPO }}
          className="section-kicker text-ink-muted-dark mb-4"
        >
          The process
        </motion.p>
        <h2
          className="editorial-title text-ink-dark mb-12 lg:mb-14 max-w-[14ch]"
          style={{ fontSize: 'clamp(1.9rem, 3.6vw, 3rem)' }}
        >
          A clear referral and support pathway.
        </h2>

        <div className="grid md:grid-cols-4 border-t border-rule-light">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={IN_VIEW}
              transition={{ delay: i * 0.08, duration: MOTION_DURATIONS.base, ease: EASE_OUT_EXPO }}
              className="pt-8 pb-10 pr-8 border-r border-rule-light last:border-r-0 max-md:border-r-0 max-md:border-b max-md:last:border-b-0"
            >
              <p
                className="font-display text-forest mb-6 leading-none tracking-[-0.02em]"
                style={{
                  fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                  fontVariationSettings: '"opsz" 36, "wght" 520',
                }}
              >
                {step.num}
              </p>
              <h3
                className="font-display text-ink-dark mb-3 leading-tight"
                style={{
                  fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)',
                  fontVariationSettings: '"opsz" 16, "wght" 600',
                }}
              >
                {step.title}
              </h3>
              <p className="text-ink-muted-dark text-[14px] leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
