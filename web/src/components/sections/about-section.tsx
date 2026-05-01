'use client'

import { motion } from 'framer-motion'
import { EASE_OUT_EXPO, IN_VIEW, MOTION_DURATIONS } from '@/lib/motion'


export function AboutSection() {
  return (
    <section className="bg-cream-dim py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={IN_VIEW}
          transition={{ duration: MOTION_DURATIONS.medium, ease: EASE_OUT_EXPO }}
          style={{ originX: 0 }}
          className="w-10 h-[2px] bg-amber mb-3"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={IN_VIEW}
          transition={{ duration: MOTION_DURATIONS.base, ease: EASE_OUT_EXPO }}
          className="section-kicker text-ink-muted-dark mb-6"
        >
          Who we are
        </motion.p>

        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={IN_VIEW}
          transition={{ duration: MOTION_DURATIONS.slow, ease: EASE_OUT_EXPO }}
          className="font-display text-ink-dark leading-[1.05] tracking-[-0.025em] mb-14 lg:mb-16 max-w-[16ch]"
          style={{
            fontSize: 'clamp(2rem, 5.2vw, 4.7rem)',
            fontVariationSettings: '"opsz" 48, "wght" 580',
          }}
        >
          Care built around the person, not the process.
        </motion.blockquote>

        {/* Body — three columns on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={IN_VIEW}
          transition={{ delay: 0.15, duration: MOTION_DURATIONS.medium, ease: EASE_OUT_EXPO }}
          className="grid lg:grid-cols-3 gap-8 lg:gap-12 border-t border-rule-light pt-10 lg:pt-12"
        >
          <p className="text-ink-muted-dark text-[16px] leading-relaxed">
            Horizon Care Services is a health and social care provider operating
            across England. We support people with mental health needs and
            learning disabilities through supported accommodation, and provide
            home care and staffing solutions for individuals, families, and care
            organisations.
          </p>
          <p className="text-ink-muted-dark text-[16px] leading-relaxed">
            Our approach is grounded in a recovery model and strength-based
            practice. We work with each person to identify what matters to them,
            assess what they need, and build a care plan that reflects their
            goals, not a template.
          </p>
          <p className="text-ink-muted-dark text-[16px] leading-relaxed">
            We collaborate with NHS trusts, local authorities, families, and the
            people in our care to make sure support is joined up, reviewed
            regularly, and always moving in the right direction.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
