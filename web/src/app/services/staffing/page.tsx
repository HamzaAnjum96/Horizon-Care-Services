import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { PageHeader } from '@/components/layout/page-header'

export const metadata: Metadata = {
  title: 'Staffing Solutions — Horizon Care Services',
  description: 'Skilled clinical and care professionals for NHS trusts, nursing homes, care homes, and community settings across England.',
}

const roles = [
  { title: 'Registered Nurses', detail: 'RGN, RMN, RNLD. Ward cover, community nursing, and specialist settings.' },
  { title: 'Social Workers', detail: 'Qualified social workers with experience across adult and children\'s services.' },
  { title: 'Occupational Therapists', detail: 'Assessment, rehabilitation, and discharge planning support.' },
  { title: 'Physiotherapists', detail: 'Community and hospital-based physio provision.' },
  { title: 'Healthcare Assistants', detail: 'Experienced HCAs across ward, residential, and home environments.' },
  { title: 'Support Workers', detail: 'Trained support workers for residential, community, and domiciliary settings.' },
]

const settings = [
  'NHS hospital wards and departments',
  'Nursing homes and residential care homes',
  'Community and domiciliary care',
  'Mental health units',
  'Learning disability services',
  'Private hospitals and clinics',
]

export default function StaffingPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHeader
          kicker="Services / Staffing Solutions"
          title="The right people, where you need them."
          intro="Skilled care professionals deployed to hospitals, care homes, and community settings across England. Available for single shifts, short-term contracts, and long-term placements, with 24/7 cover when it matters most."
          cta={{ label: 'Get in touch', href: '/contact' }}
        />

        <section className="bg-cream py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">

            <div className="grid lg:grid-cols-[5fr_4fr] gap-12 lg:gap-24 mb-20 lg:mb-28">
              <div>
                <p className="section-kicker text-ink-muted-dark mb-5">What we provide</p>
                <p
                  className="font-display text-ink-dark leading-tight tracking-[-0.02em] mb-8"
                  style={{
                    fontSize: 'clamp(1.7rem, 2.8vw, 2.4rem)',
                    fontVariationSettings: '"opsz" 28, "wght" 560',
                  }}
                >
                  Clinical and care staff, not just headcount.
                </p>
                <div className="space-y-4 text-ink-muted-dark text-[15px] leading-relaxed max-w-[62ch]">
                  <p>
                    When a ward is short-staffed or a care home needs cover at short notice, the quality of the person who walks through the door matters. We don&rsquo;t operate a revolving door of unvetted temps. Every professional on our register has been assessed, referenced, and matched to the environments they&rsquo;re placed in.
                  </p>
                  <p>
                    We&rsquo;ve been providing staffing support to care organisations across England for three years. In that time, we&rsquo;ve built a register of professionals who understand what good care looks like in practice and bring that standard with them, regardless of the setting.
                  </p>
                  <p>
                    Whether you need a registered nurse for a night shift, a social worker for a caseload block, or long-term staffing support while a team is rebuilt, we can respond quickly, reliably, and with people who know what they&rsquo;re doing.
                  </p>
                </div>
              </div>

              <div className="lg:pt-12">
                <p className="section-kicker text-ink-muted-dark mb-5">Response</p>
                <div className="space-y-5">
                  {[
                    { label: 'Availability', value: '24 hours a day, 7 days a week' },
                    { label: 'Short-notice cover', value: 'Same-day and next-day placements' },
                    { label: 'Contract length', value: 'Single shift through to long-term' },
                    { label: 'Response time', value: 'Within 2 working hours for urgent requests' },
                  ].map(({ label, value }) => (
                    <div key={label} className="border-t border-rule-light pt-5">
                      <p className="text-[11px] font-medium tracking-[0.1em] text-ink-muted-dark uppercase mb-1">{label}</p>
                      <p className="text-ink-dark text-[15px] font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-rule-light pt-16 lg:pt-20">
              <p className="section-kicker text-ink-muted-dark mb-10">Roles we cover</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
                {roles.map((role) => (
                  <div key={role.title}>
                    <h3
                      className="font-display text-ink-dark mb-2 leading-snug"
                      style={{
                        fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
                        fontVariationSettings: '"opsz" 16, "wght" 620',
                      }}
                    >
                      {role.title}
                    </h3>
                    <p className="text-ink-muted-dark text-[14px] leading-relaxed">{role.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-rule-light mt-16 lg:mt-20 pt-16 lg:pt-20">
              <p className="section-kicker text-ink-muted-dark mb-10">Settings we support</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-4">
                {settings.map((setting) => (
                  <div key={setting} className="flex items-start gap-3">
                    <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-amber flex-shrink-0" />
                    <span className="text-ink-muted-dark text-[15px]">{setting}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        <section className="bg-deep border-t border-rule-dark py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-[2fr_1fr] gap-8 lg:gap-20 items-center">
              <div>
                <p className="section-kicker text-ink-muted-light mb-4">Get in touch</p>
                <p
                  className="font-display text-ink-light leading-tight tracking-[-0.025em] mb-4"
                  style={{
                    fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                    fontVariationSettings: '"opsz" 32, "wght" 560',
                  }}
                >
                  Need cover or a longer-term staffing solution?
                </p>
                <p className="text-ink-muted-light text-[15px] leading-relaxed max-w-[48ch]">
                  Call us directly for urgent requirements. For planned cover, email us and we&rsquo;ll respond within 2 working hours.
                </p>
              </div>
              <div className="space-y-4">
                <a
                  href="tel:07572701349"
                  className="block text-ink-light font-display text-[1.3rem] hover:text-amber transition-colors"
                  style={{ fontVariationSettings: '"opsz" 20, "wght" 560' }}
                >
                  07572 701 349
                </a>
                <p className="text-ink-muted-light text-[13px]">Urgent staffing, 24/7</p>
                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="interactive-lift inline-flex items-center gap-2 bg-amber text-deep px-6 py-3 rounded-md text-[14px] font-semibold hover:opacity-90 transition-opacity"
                  >
                    Get in touch <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
