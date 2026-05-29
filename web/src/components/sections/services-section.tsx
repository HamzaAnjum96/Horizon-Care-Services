import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Roster, type RosterEntry } from '@/components/dossier/roster'
import { FieldStamp } from '@/components/dossier/field-stamp'

const roster: RosterEntry[] = [
  { code: 'RGN·RMN·RNLD', role: 'Registered nurses', scope: 'General, mental health and learning disability' },
  { code: 'SW', role: 'Social workers', scope: 'Statutory and community teams' },
  { code: 'OT·PT', role: 'Occupational therapists & physiotherapists', scope: 'Hospital and community rehab' },
  { code: 'HCA', role: 'Healthcare assistants', scope: 'Wards, residential and domiciliary' },
  { code: 'SUP', role: 'Support workers', scope: 'Supported living and complex care' },
]

const complianceChecks = ['DBS', 'NMC', 'HCPC', 'Social Work England', 'Right to Work']

export function ServicesSection() {
  return (
    <section className="bg-cream texture-ledger py-24 lg:py-32">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-baseline justify-between gap-8 mb-3">
          <p className="section-kicker text-ink-muted-dark">On the register</p>
          <span className="register-mono text-ink-muted-dark hidden lg:block">Single shift &rarr; long-term contract</span>
        </div>

        <div className="flex items-end justify-between gap-8 mb-9 lg:mb-12">
          <h2
            className="editorial-title text-ink-dark leading-tight"
            style={{ fontSize: 'clamp(2rem, 4.2vw, 3.35rem)' }}
          >
            Healthcare Staffing
          </h2>
          <div className="hidden sm:block flex-shrink-0 pb-1">
            <FieldStamp>On call · 24/7</FieldStamp>
          </div>
        </div>

        <Roster entries={roster} />

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div className="flex flex-wrap gap-x-5 gap-y-2 items-center">
            <span className="register-mono text-amber">Checks</span>
            {complianceChecks.map((body) => (
              <span key={body} className="text-[13px] font-medium text-ink-muted-dark tracking-[0.02em]">
                {body}
              </span>
            ))}
          </div>
          <Link
            href="/services"
            className="interactive-lift inline-flex items-center gap-2 text-ink-dark text-[13px] font-semibold tracking-[0.03em] hover:gap-3 transition-all whitespace-nowrap"
          >
            Full register and settings <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
