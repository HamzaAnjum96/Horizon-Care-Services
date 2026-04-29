'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { EASE_OUT_EXPO, IN_VIEW, MOTION } from '@/lib/motion'

export function DualCTA() {
  return (
    <section className="bg-deep py-24 lg:py-32 border-t border-rule-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-rule-dark">

          {/* Referrers */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={IN_VIEW}
            transition={{ duration: MOTION.slow, ease: EASE_OUT_EXPO }}
            className="flex flex-col pb-12 md:pb-0 md:pr-14 lg:pr-20"
          >
            <p className="section-kicker text-ink-muted-light mb-8">
              For referrers
            </p>
            <p
              className="font-display text-ink-light leading-[1.05] tracking-[-0.025em] mb-6"
              style={{
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                fontVariationSettings: '"opsz" 36, "wght" 560',
              }}
            >
              Refer a person in need.
            </p>
            <p className="text-ink-muted-light text-[15px] leading-relaxed mb-10 max-w-[44ch]">
              For NHS trusts, local authorities, social workers, and other
              professionals. We respond within 2 working days and provide a thorough, person-centred assessment.
            </p>
            <div>
              <Link
                href="/referrals"
                className="interactive-lift inline-flex items-center gap-2 bg-amber text-deep px-6 py-3 rounded text-[14px] font-semibold hover:opacity-90"
              >
                Start a referral <ArrowUpRight size={14} />
              </Link>
            </div>
          </motion.div>

          {/* Professionals */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={IN_VIEW}
            transition={{
              delay: 0.08,
              duration: MOTION.slow,
              ease: EASE_OUT_EXPO,
            }}
            className="flex flex-col pt-12 md:pt-0 md:pl-14 lg:pl-20"
          >
            <p className="section-kicker text-ink-muted-light mb-8">
              For care professionals
            </p>
            <p
              className="font-display text-ink-light leading-[1.05] tracking-[-0.025em] mb-6"
              style={{
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                fontVariationSettings: '"opsz" 36, "wght" 560',
              }}
            >
              Join our care team.
            </p>
            <p className="text-ink-muted-light text-[15px] leading-relaxed mb-10 max-w-[44ch]">
              We recruit registered nurses, social workers, occupational
              therapists, healthcare assistants, and support workers. Competitive rates, flexible shifts, and ongoing professional development.
            </p>
            <div>
              <Link
                href="/work-for-us"
                className="interactive-lift inline-flex items-center gap-2 border border-rule-dark text-ink-light px-6 py-3 rounded text-[14px] font-semibold hover:border-ink-muted-light"
              >
                View opportunities <ArrowUpRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
