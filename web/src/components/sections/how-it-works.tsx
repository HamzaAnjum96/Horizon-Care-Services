'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { EASE_OUT_EXPO, MOTION_DURATIONS } from '@/lib/motion'

const steps = [
  {
    num: '01',
    title: 'Tell us what you need',
    desc: "Call or email us with the role, setting, location and shift times. Tell us anything specific about the environment — we'll ask if we need more detail.",
  },
  {
    num: '02',
    title: 'We confirm suitability',
    desc: "We check experience, compliance and professional registration before putting anyone forward. We only suggest a worker when their background genuinely fits what you've described.",
  },
  {
    num: '03',
    title: 'Cover is arranged',
    desc: "We confirm all the details directly with the worker — shift times, where to report, who to speak to and anything specific about the role.",
  },
  {
    num: '04',
    title: 'We stay in contact',
    desc: "We're reachable after the placement for changes or anything that comes up on the day. If you need cover again, we're already familiar with what you need.",
  },
]

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const reduceMotion = useReducedMotion()
  const [connectorsVisible, setConnectorsVisible] = useState(false)

  useEffect(() => {
    if (isInView) setConnectorsVisible(true)
  }, [isInView])

  return (
    <section className="bg-cream py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <p className="section-kicker text-ink-muted-dark mb-4">
          How we work
        </p>
        <h2
          className="editorial-title text-ink-dark mb-12 lg:mb-14 max-w-[20ch]"
          style={{ fontSize: 'clamp(1.9rem, 3.6vw, 3rem)' }}
        >
          From staffing need to confirmed cover.
        </h2>

        <div ref={ref} className="relative">
          {/* SVG flow connectors — desktop only */}
          <div
            className="hidden md:block absolute left-0 right-0 pointer-events-none"
            style={{ top: '2rem' }}
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 900 24"
              preserveAspectRatio="none"
              className="w-full"
              style={{ height: 24 }}
              overflow="visible"
            >
              <defs>
                <marker
                  id="hiw-arrow"
                  viewBox="0 0 10 10"
                  refX="9"
                  refY="5"
                  markerWidth="5"
                  markerHeight="5"
                  orient="auto"
                >
                  <path d="M 0 1 L 9 5 L 0 9 z" fill="var(--amber-dim)" />
                </marker>
              </defs>
              {/* Three connectors between 4 equal-width columns */}
              {/* Column boundary at 25%, 50%, 75%; connectors span inner gap */}
              <line
                x1="13%" y1="12" x2="24%" y2="12"
                stroke="var(--amber-dim)"
                strokeWidth="1"
                strokeDasharray="4 3"
                markerEnd="url(#hiw-arrow)"
                className={`flow-connector-line${connectorsVisible ? ' is-visible' : ''}`}
              />
              <line
                x1="38%" y1="12" x2="49%" y2="12"
                stroke="var(--amber-dim)"
                strokeWidth="1"
                strokeDasharray="4 3"
                markerEnd="url(#hiw-arrow)"
                className={`flow-connector-line${connectorsVisible ? ' is-visible' : ''}`}
              />
              <line
                x1="63%" y1="12" x2="74%" y2="12"
                stroke="var(--amber-dim)"
                strokeWidth="1"
                strokeDasharray="4 3"
                markerEnd="url(#hiw-arrow)"
                className={`flow-connector-line${connectorsVisible ? ' is-visible' : ''}`}
              />
            </svg>
          </div>

          <ol className="grid md:grid-cols-4 border-t border-rule-light list-none">
            {steps.map((step, i) => (
              <motion.li
                key={step.num}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: reduceMotion ? 0 : 0.06 + i * 0.1,
                  duration: MOTION_DURATIONS.medium,
                  ease: EASE_OUT_EXPO,
                }}
                className="pt-8 pb-10 md:px-8 first:md:pl-0 last:md:pr-0 max-md:border-b max-md:last:border-b-0 max-md:pb-8"
              >
                <p
                  className="font-display text-amber mb-3 leading-none tracking-[-0.02em]"
                  aria-hidden="true"
                  style={{
                    fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                    fontVariationSettings: '"opsz" 36, "wght" 520',
                  }}
                >
                  {step.num}
                </p>
                <h3
                  className="font-display text-ink-dark mb-3 leading-tight"
                  style={{
                    fontSize: 'clamp(1.15rem, 1.8vw, 1.45rem)',
                    fontVariationSettings: '"opsz" 18, "wght" 620',
                  }}
                >
                  {step.title}
                </h3>
                <p className="text-ink-muted-dark text-[14px] leading-relaxed">
                  {step.desc}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
