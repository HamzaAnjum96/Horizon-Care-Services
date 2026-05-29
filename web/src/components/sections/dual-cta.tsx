import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export function DualCTA() {
  return (
    <section className="bg-deep py-24 lg:py-32 border-t border-rule-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="lg:max-w-[52ch]">
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
          <p className="text-ink-muted-light text-[15px] leading-relaxed mb-6 lg:max-w-[44ch]">
            For urgent or same-day cover, call us. For planned requirements, email or WhatsApp. Either way, the more detail you give us, the faster we can give you a realistic answer.
          </p>
          <ul className="mb-10 space-y-2">
            {[
              'The role and band or registration required',
              'The setting type (care home, ward, supported living, community, etc.)',
              'Location and date(s) or shift pattern',
              'Urgency level — same day, this week, or planned ahead',
              'Anything specific about the environment or reporting requirements',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-ink-muted-light text-[13px] leading-relaxed">
                <span className="mt-[7px] w-1 h-1 rounded-full bg-amber flex-shrink-0" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
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
