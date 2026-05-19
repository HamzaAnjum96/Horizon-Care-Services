import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export function DualCTA() {
  return (
    <section className="bg-deep py-24 lg:py-32 border-t border-rule-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-[52ch]">
          <p className="section-kicker text-ink-muted-light mb-8">
            Need staff?
          </p>
          <p
            className="font-display text-ink-light leading-[1.05] tracking-[-0.025em] mb-6"
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontVariationSettings: '"opsz" 36, "wght" 560',
            }}
          >
            Tell us what cover you need.
          </p>
          <p className="text-ink-muted-light text-[15px] leading-relaxed mb-10 max-w-[44ch]">
            Tell us the role, setting, location and urgency. We will respond with a clear answer on availability and next steps.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-7">
            <Link
              href="/contact"
              className="interactive-lift inline-flex items-center gap-2 bg-brand text-ink-light px-6 py-3 rounded-md text-[14px] font-semibold hover:opacity-90 transition-opacity"
            >
              Request staff <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
            <a
              href="tel:02037572767"
              className="text-ink-muted-light text-[14px] hover:text-ink-light transition-colors"
            >
              Or call 020 3757 2767
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
