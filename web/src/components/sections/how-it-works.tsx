'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { EASE_OUT_EXPO, MOTION_DURATIONS } from '@/lib/motion'
import { FieldStamp } from '@/components/dossier/field-stamp'

const stages = [
  {
    num: '01',
    stage: 'Intake',
    status: 'Received',
    title: 'Tell us what you need',
    desc: "Call or email with the role, setting, location and shift times. Tell us anything specific about the environment, and we'll ask if we need more detail.",
  },
  {
    num: '02',
    stage: 'Review',
    status: 'Assessed',
    title: 'We confirm suitability',
    desc: "We check experience, compliance and professional registration before putting anyone forward. We only suggest a worker when their background genuinely fits what you've described.",
  },
  {
    num: '03',
    stage: 'Placement',
    status: 'Confirmed',
    title: 'Cover is arranged',
    desc: "We confirm all the details directly with the worker: shift times, where to report, who to speak to and anything specific about the role.",
  },
  {
    num: '04',
    stage: 'Aftercare',
    status: 'On record',
    title: 'We stay in contact',
    desc: "We stay reachable after placement for same-day changes, extensions and anything that comes up mid-shift. If a requirement grows, you don't start from scratch. We already know your service.",
  },
]

export function HowItWorks() {
  const ref = useRef<HTMLOListElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const reduceMotion = useReducedMotion()

  return (
    <section className="bg-cream py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-baseline justify-between gap-6 mb-3">
          <p className="section-kicker text-ink-muted-dark">How we work</p>
          <span className="register-mono text-ink-muted-dark hidden sm:block">Docket · Intake to cover</span>
        </div>
        <h2
          className="editorial-title text-ink-dark mb-12 lg:mb-16 max-w-[20ch]"
          style={{ fontSize: 'clamp(1.9rem, 3.6vw, 3rem)' }}
        >
          Need to cover.
        </h2>

        <ol ref={ref} className="list-none border-t border-rule-light">
          {stages.map((stage, i) => (
            <motion.li
              key={stage.num}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: reduceMotion ? 0 : 0.06 + i * 0.1,
                duration: MOTION_DURATIONS.medium,
                ease: EASE_OUT_EXPO,
              }}
              className="border-b border-rule-light grid gap-x-8 gap-y-4 py-8 lg:py-9 lg:grid-cols-[8rem_1fr_8rem] lg:items-baseline"
            >
              <div className="register-mono text-ink-muted-dark flex items-baseline gap-2 lg:flex-col lg:gap-1">
                <span className="text-amber">{stage.num}</span>
                <span>{stage.stage}</span>
              </div>

              <div>
                <h3
                  className="font-display text-ink-dark mb-2.5 leading-tight tracking-[-0.015em]"
                  style={{
                    fontSize: 'clamp(1.2rem, 1.9vw, 1.55rem)',
                    fontVariationSettings: '"opsz" 22, "wght" 600',
                  }}
                >
                  {stage.title}
                </h3>
                <p className="text-ink-muted-dark text-[15px] leading-relaxed max-w-[60ch]">
                  {stage.desc}
                </p>
              </div>

              <div className="lg:flex lg:justify-end lg:pt-1">
                <FieldStamp>{stage.status}</FieldStamp>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
