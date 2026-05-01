import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export function DualCTA() {
  return (
    <section className="bg-deep py-24 lg:py-32 border-t border-rule-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-rule-dark">

          <div className="flex flex-col pb-12 md:pb-0 md:pr-14 lg:pr-20">
            <p className="section-kicker text-ink-muted-light mb-8">
              Referrers
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
              professionals. We respond within 2 working days with a thorough, person-centred assessment.
            </p>
            <div>
              <Link
                href="/referrals"
                className="interactive-lift inline-flex items-center gap-2 bg-amber text-deep px-6 py-3 rounded-md text-[14px] font-semibold hover:opacity-90 transition-opacity"
              >
                Start a referral <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          <div className="flex flex-col pt-12 md:pt-0 md:pl-14 lg:pl-20">
            <p className="section-kicker text-ink-muted-light mb-8">
              Care professionals
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
                className="interactive-lift inline-flex items-center gap-2 border border-ink-light/25 text-ink-light px-6 py-3 rounded-md text-[14px] font-semibold hover:border-ink-light/55 hover:bg-ink-light/[0.05] transition-all duration-200"
              >
                View opportunities <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
