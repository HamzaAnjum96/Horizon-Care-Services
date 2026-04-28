'use client'

import { motion } from 'framer-motion'

export function AboutSection() {
  return (
    <section className="bg-bg-subtle py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[5fr_7fr] gap-14 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-text-muted mb-6">
              Who we are
            </p>
            <blockquote
              className="font-display text-green-brand leading-[1.1] tracking-[-0.02em]"
              style={{
                fontSize: 'clamp(1.7rem, 3.5vw, 2.5rem)',
                fontWeight: 700,
              }}
            >
              Care built around the person, not the process.
            </blockquote>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5 text-text-muted text-[17px] leading-relaxed"
          >
            <p>
              Horizon Care Services is a health and social care provider
              operating across England. We support people with mental health
              needs and learning disabilities through supported accommodation,
              and provide home care and staffing solutions for individuals,
              families, and care organisations.
            </p>
            <p>
              Our approach is grounded in a recovery model and strength-based
              practice. We work with each person to identify what matters to
              them, assess what they need, and build a care plan that reflects
              their goals, not a template.
            </p>
            <p>
              We collaborate with NHS trusts, local authorities, families, and
              the people in our care to make sure support is joined up, reviewed
              regularly, and always moving in the right direction.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
