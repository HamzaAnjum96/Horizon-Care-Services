'use client'

import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

export function AboutSection() {
  return (
    <section className="bg-forest py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-[11px] font-medium tracking-[0.14em] uppercase text-ink-muted-light mb-12 lg:mb-16"
        >
          Who we are
        </motion.p>

        {/* Pull quote — fills the section */}
        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
          className="font-display text-ink-light leading-[1.05] tracking-[-0.025em] mb-16 lg:mb-20"
          style={{
            fontSize: 'clamp(2.2rem, 6vw, 5.5rem)',
            fontVariationSettings: '"opsz" 48, "wght" 500',
            fontStyle: 'italic',
          }}
        >
          Care built around the person, not the process.
        </motion.blockquote>

        {/* Body — three columns on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ delay: 0.15, duration: 0.6, ease }}
          className="grid lg:grid-cols-3 gap-8 lg:gap-12 border-t border-rule-dark pt-10 lg:pt-12"
        >
          <p className="text-ink-muted-light text-[16px] leading-relaxed">
            Horizon Care Services is a health and social care provider operating
            across England. We support people with mental health needs and
            learning disabilities through supported accommodation, and provide
            home care and staffing solutions for individuals, families, and care
            organisations.
          </p>
          <p className="text-ink-muted-light text-[16px] leading-relaxed">
            Our approach is grounded in a recovery model and strength-based
            practice. We work with each person to identify what matters to them,
            assess what they need, and build a care plan that reflects their
            goals, not a template.
          </p>
          <p className="text-ink-muted-light text-[16px] leading-relaxed">
            We collaborate with NHS trusts, local authorities, families, and the
            people in our care to make sure support is joined up, reviewed
            regularly, and always moving in the right direction.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
