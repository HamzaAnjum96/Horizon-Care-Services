'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { StickerBadge } from '@/components/hero/sticker-badge'

export function DualCTA() {
  return (
    <section className="bg-bg-deep py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {/* Referrers block */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col pb-12 md:pb-0 md:pr-14 lg:pr-20"
          >
            <StickerBadge variant="amber" rotate={-1.5} delay={0}>
              For referrers
            </StickerBadge>

            <h2
              className="font-display text-text-inv mt-6 mb-4 leading-tight tracking-[-0.02em]"
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 700,
              }}
            >
              Make a referral
            </h2>
            <p className="text-green-muted text-[15px] leading-relaxed mb-8 max-w-[44ch]">
              For NHS trusts, local authorities, social workers, and other
              professionals. We respond within 2 working days and carry out a
              thorough holistic assessment.
            </p>
            <div className="mt-auto">
              <Link
                href="/referrals"
                className="inline-flex items-center gap-2 bg-amber text-text-main px-6 py-3 rounded-lg font-semibold text-[15px] hover:opacity-90 transition-opacity"
              >
                Start a referral <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>

          {/* Professionals block */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col pt-12 md:pt-0 md:pl-14 lg:pl-20"
          >
            <StickerBadge variant="sage" rotate={1} delay={0.1}>
              For care professionals
            </StickerBadge>

            <h2
              className="font-display text-text-inv mt-6 mb-4 leading-tight tracking-[-0.02em]"
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 700,
              }}
            >
              Work with us
            </h2>
            <p className="text-green-muted text-[15px] leading-relaxed mb-8 max-w-[44ch]">
              We recruit registered nurses, social workers, occupational
              therapists, healthcare assistants, and support workers. Competitive
              rates, flexible shifts, professional development.
            </p>
            <div className="mt-auto">
              <Link
                href="/work-for-us"
                className="inline-flex items-center gap-2 border border-white/25 text-text-inv px-6 py-3 rounded-lg font-semibold text-[15px] hover:bg-white/5 transition-colors"
              >
                View opportunities <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
