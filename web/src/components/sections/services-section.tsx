import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const points = [
  'Registered Nurses (RGN, RMN, RNLD)',
  'Senior Healthcare Assistants (Senior HCAs)',
  'Healthcare Assistants (HCAs)',
  'Support Workers',
  'Single shifts and emergency cover through to long-term contracts — 24/7',
]

const complianceChecks = ['DBS', 'NMC', 'Right to Work', 'References', 'Training']

export function ServicesSection() {
  return (
    <section className="bg-cream py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <p className="section-kicker text-ink-muted-dark mb-4">
          What we provide
        </p>

        <div className="border-t border-b border-rule-light py-8 lg:py-10">
          <div className="flex items-baseline justify-between gap-8 mb-7">
            <h2
              className="editorial-title text-ink-dark leading-tight"
              style={{ fontSize: 'clamp(2rem, 4.2vw, 3.35rem)' }}
            >
              Healthcare Staffing
            </h2>
            <span className="hidden lg:block text-[12px] text-ink-muted-dark tracking-[0.03em] flex-shrink-0">
              24/7 availability
            </span>
          </div>

          <div className="mb-6">
            <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-2 mb-5">
              {points.map((pt) => (
                <li
                  key={pt}
                  className="text-[15px] text-ink-muted-dark leading-snug flex items-start gap-3"
                >
                  <span className="mt-[7px] w-1 h-1 rounded-full bg-amber flex-shrink-0" />
                  {pt}
                </li>
              ))}
            </ul>
            <Link
              href="/services"
              className="interactive-lift inline-flex items-center gap-2 text-ink-dark text-[13px] font-semibold tracking-[0.03em] hover:gap-3 transition-all whitespace-nowrap"
            >
              Full details <ArrowUpRight size={13} aria-hidden="true" />
            </Link>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2 items-center border-t border-rule-light pt-5">
            <span className="section-kicker text-ink-muted-dark">Checks include</span>
            {complianceChecks.map((body) => (
              <span key={body} className="text-[12px] font-medium text-ink-muted-dark tracking-[0.04em]">
                {body}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
