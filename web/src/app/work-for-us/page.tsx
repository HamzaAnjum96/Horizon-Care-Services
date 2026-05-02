import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { PageHeader } from '@/components/layout/page-header'

export const metadata: Metadata = {
  title: 'Work For Us — Horizon Care Services',
  description: 'Join a team of skilled care professionals. Flexible hours, competitive rates, and a genuine commitment to high-quality care.',
}

const roles = [
  { title: 'Registered Nurses', note: 'RGN, RMN, RNLD' },
  { title: 'Social Workers', note: 'Adults and children\'s services' },
  { title: 'Occupational Therapists', note: 'Community and hospital' },
  { title: 'Physiotherapists', note: 'Community and inpatient' },
  { title: 'Healthcare Assistants', note: 'All settings' },
  { title: 'Support Workers', note: 'Domiciliary and residential' },
]

export default function WorkForUsPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHeader
          kicker="Work for us"
          title="Join a team that takes care seriously."
          intro="We recruit skilled health and social care professionals for flexible and long-term roles across England. If you want to work somewhere your standards are respected and your contribution recognised, we want to hear from you."
        />

        <section className="bg-cream py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">

            <div className="grid lg:grid-cols-[5fr_4fr] gap-12 lg:gap-24 mb-20 lg:mb-28">
              <div>
                <p className="section-kicker text-ink-muted-dark mb-5">Why Horizon</p>
                <p
                  className="font-display text-ink-dark leading-tight tracking-[-0.02em] mb-8"
                  style={{
                    fontSize: 'clamp(1.7rem, 2.8vw, 2.4rem)',
                    fontVariationSettings: '"opsz" 28, "wght" 560',
                  }}
                >
                  Flexible work, without compromising what matters.
                </p>
                <div className="space-y-4 text-ink-muted-dark text-[15px] leading-relaxed max-w-[62ch]">
                  <p>
                    We&rsquo;re a health and social care company, not a staffing agency. That distinction matters. We&rsquo;re selective about who we work with because our reputation depends on the people we place — and theirs depends on us matching them to the right settings.
                  </p>
                  <p>
                    We have been operating for three years, working with NHS trusts, local authorities, and care organisations across England. In that time we&rsquo;ve built long-term working relationships with our staff — not because we lock people in, but because we treat them as professionals and pay what the work is worth.
                  </p>
                  <p>
                    If you want shifts that fit around your life, a team that responds when you need something, and roles where your skills are actually used — talk to us.
                  </p>
                </div>
              </div>

              <div className="lg:pt-12">
                <p className="section-kicker text-ink-muted-dark mb-5">What we offer</p>
                <div className="space-y-5">
                  {[
                    { label: 'Pay rates', value: 'Competitive, reviewed regularly and paid on time.' },
                    { label: 'Flexibility', value: 'Choose your shifts. We work around your availability.' },
                    { label: 'Variety', value: 'Range of settings: hospitals, care homes, community, domiciliary.' },
                    { label: 'Support', value: 'A named coordinator you can actually reach when you need to.' },
                    { label: 'Development', value: 'Access to training and ongoing professional development.' },
                  ].map(({ label, value }) => (
                    <div key={label} className="border-t border-rule-light pt-5">
                      <p className="text-[11px] font-medium tracking-[0.1em] text-ink-muted-dark uppercase mb-1">{label}</p>
                      <p className="text-ink-dark text-[14px] leading-relaxed">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-rule-light pt-16 lg:pt-20 mb-20 lg:mb-28">
              <p className="section-kicker text-ink-muted-dark mb-10">Roles we recruit for</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6">
                {roles.map((role) => (
                  <div key={role.title} className="border-t border-rule-light pt-5">
                    <h3
                      className="font-display text-ink-dark mb-1 leading-snug"
                      style={{
                        fontSize: 'clamp(1rem, 1.3vw, 1.1rem)',
                        fontVariationSettings: '"opsz" 16, "wght" 620',
                      }}
                    >
                      {role.title}
                    </h3>
                    <p className="text-ink-muted-dark text-[13px]">{role.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-rule-light pt-16 lg:pt-20">
              <div className="grid lg:grid-cols-[2fr_1fr] gap-10 lg:gap-20 items-start">
                <div>
                  <p className="section-kicker text-ink-muted-dark mb-4">How to apply</p>
                  <p
                    className="font-display text-ink-dark leading-tight tracking-[-0.02em] mb-6"
                    style={{
                      fontSize: 'clamp(1.5rem, 2.4vw, 2rem)',
                      fontVariationSettings: '"opsz" 24, "wght" 560',
                    }}
                  >
                    Send us your CV and tell us what you&rsquo;re looking for.
                  </p>
                  <p className="text-ink-muted-dark text-[15px] leading-relaxed max-w-[54ch]">
                    Email your CV to{' '}
                    <a
                      href="mailto:admin@horizoncareservices.org"
                      className="text-ink-dark underline underline-offset-2 hover:opacity-70 transition-opacity"
                    >
                      admin@horizoncareservices.org
                    </a>{' '}
                    with a brief note about the type of work you&rsquo;re looking for, your availability, and your preferred locations. We will get back to you within 2 working days.
                  </p>
                  <p className="text-ink-muted-dark text-[14px] leading-relaxed mt-4 max-w-[54ch]">
                    All positions are subject to DBS check, professional registration verification, and employment references. We are an equal opportunities employer.
                  </p>
                </div>
                <div className="space-y-4">
                  <a
                    href="mailto:admin@horizoncareservices.org"
                    className="interactive-lift inline-flex items-center gap-2 bg-amber text-deep px-6 py-3 rounded-md text-[14px] font-semibold hover:opacity-90 transition-opacity"
                  >
                    Email your CV <ArrowUpRight size={14} />
                  </a>
                  <p className="text-ink-muted-dark text-[13px]">
                    Or call us on{' '}
                    <a href="tel:01582354119" className="underline underline-offset-2 hover:text-ink-dark transition-colors">
                      01582 354 119
                    </a>
                  </p>
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
