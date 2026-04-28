'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    num: '1',
    title: 'Assessment',
    desc: 'A holistic assessment covering physical health, mental health, daily living, finances, social network, and support needs.',
  },
  {
    num: '2',
    title: 'Care Plan',
    desc: 'A personalised plan built around the individual: their goals, choices, and the level of support required.',
  },
  {
    num: '3',
    title: 'Placement',
    desc: 'The right service is matched to the person: accommodation, home care, staffing, or a specialist pathway.',
  },
  {
    num: '4',
    title: 'Review',
    desc: 'Regular meetings track progress, celebrate achievements, and adjust the plan as circumstances change.',
  },
]

export function HowItWorks() {
  return (
    <section className="bg-bg-base py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-text-muted mb-3">
            The process
          </p>
          <h2
            className="font-display text-text-main tracking-[-0.02em]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700 }}
          >
            How care works
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-0 relative">
          {/* Connecting line — sits at the centre of the step markers */}
          <div
            className="hidden md:block absolute top-[22px] h-px bg-border-mid"
            style={{ left: 'calc(12.5% + 28px)', right: 'calc(12.5% + 28px)' }}
            aria-hidden="true"
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                delay: i * 0.1,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="pr-6 md:pr-10 pb-10 md:pb-0"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-full border-2 border-green-brand bg-bg-base flex items-center justify-center flex-shrink-0 relative z-10">
                  <span className="font-display font-semibold text-green-brand text-[15px]">
                    {step.num}
                  </span>
                </div>
              </div>
              <h3 className="font-display text-text-main font-semibold text-[19px] mb-2 tracking-[-0.01em]">
                {step.title}
              </h3>
              <p className="text-text-muted text-[14px] leading-relaxed max-w-[26ch]">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
