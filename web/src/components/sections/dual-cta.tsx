import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { RefLine } from '@/components/dossier/ref-line'
import { FieldStamp } from '@/components/dossier/field-stamp'

const intake = [
  'The role and band or registration required',
  'The setting type (care home, ward, supported living, community)',
  'Location and date(s) or shift pattern',
  'Urgency: same day, this week, or planned ahead',
  'Anything specific about the environment or reporting',
]

export function DualCTA() {
  return (
    <section className="relative bg-deep dark-grain texture-halftone wash-deep py-24 lg:py-32 border-t border-rule-dark overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-start justify-between gap-6 mb-10">
          <RefLine segments={['Request', 'Cover']} />
          <div className="hidden sm:block flex-shrink-0">
            <FieldStamp reversed>Response ≤ 2 working days</FieldStamp>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-x-16 gap-y-12 items-start">
          <div>
            <p
              className="font-display text-ink-light leading-[1.05] tracking-[-0.025em] mb-6 max-w-[16ch]"
              style={{
                fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
                fontVariationSettings: '"opsz" 36, "wght" 560',
              }}
            >
              Tell us what cover you need.
            </p>
            <p className="text-ink-muted-light text-[15px] leading-relaxed mb-8 lg:max-w-[44ch]">
              For urgent or same-day cover, call us. For planned requirements, email or WhatsApp. The more detail you give us, the faster we can give you a realistic answer.
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

          <dl className="border-t border-rule-dark">
            {intake.map((item, i) => (
              <div
                key={item}
                className="border-b border-rule-dark grid grid-cols-[2.5rem_1fr] gap-x-4 py-3.5 items-baseline"
              >
                <dt className="register-mono text-amber-dim" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </dt>
                <dd className="text-ink-muted-light text-[14px] leading-relaxed">{item}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
