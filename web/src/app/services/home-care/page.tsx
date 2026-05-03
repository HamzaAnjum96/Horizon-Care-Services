import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { PageHeader } from '@/components/layout/page-header'

export const metadata: Metadata = {
  title: 'Home Care — Horizon Care Services',
  description: 'Personal care, companionship, medication management, and respite support delivered at home across England.',
}

const careTypes = [
  {
    title: 'Personal care',
    desc: 'Bathing, dressing, grooming, continence support, and help with mobility. Delivered with sensitivity and respect for the person\'s dignity and preferences.',
  },
  {
    title: 'Companionship',
    desc: 'Regular visits that provide social connection, conversation, and meaningful company. Isolation affects health. Consistent, caring presence makes a real difference.',
  },
  {
    title: 'Medication management',
    desc: 'Prompt reminders, administration support, and monitoring for side effects or missed doses. Properly trained staff, clear records, and coordination with GPs and pharmacies where needed.',
  },
  {
    title: 'Meal preparation',
    desc: 'Nutritious meals planned around dietary needs, cultural preferences, and the person\'s own tastes. Not a standard menu: food that someone actually wants to eat.',
  },
  {
    title: 'Housekeeping and shopping',
    desc: 'Light household tasks, laundry, and support with grocery shopping. Practical help that keeps a home running and removes stress from daily life.',
  },
  {
    title: 'Respite care',
    desc: 'Planned relief for family carers and loved ones. We provide cover so that the people doing the most important work can rest, recover, and return well.',
  },
]

export default function HomeCarePage() {
  return (
    <>
      <Nav />
      <main>
        <PageHeader
          kicker="Services / Home Care"
          title="Care at home, done properly."
          intro="Support that fits around the person, not a rota. We work with individuals, families, NHS trusts, and local authorities to provide home care that is consistent, reliable, and genuinely person-centred."
          cta={{ label: 'Get in touch', href: '/contact' }}
        />

        <section className="bg-cream py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">

            <div className="grid lg:grid-cols-[5fr_4fr] gap-12 lg:gap-24 mb-20 lg:mb-28">
              <div>
                <p className="section-kicker text-ink-muted-dark mb-5">Our approach</p>
                <p
                  className="font-display text-ink-dark leading-tight tracking-[-0.02em] mb-8"
                  style={{
                    fontSize: 'clamp(1.7rem, 2.8vw, 2.4rem)',
                    fontVariationSettings: '"opsz" 28, "wght" 560',
                  }}
                >
                  Consistency matters more than convenience.
                </p>
                <div className="space-y-4 text-ink-muted-dark text-[15px] leading-relaxed max-w-[62ch]">
                  <p>
                    Good home care depends on the relationship between a person and the carer who supports them. We work hard to keep that relationship consistent, assigning the same carers wherever possible and taking the time to understand what matters to each individual before a visit ever happens.
                  </p>
                  <p>
                    Every care package starts with a thorough assessment: the person&rsquo;s needs, their daily routines, their preferences, and what they want their life to look like. That assessment shapes the care plan, and the plan is reviewed regularly so it stays accurate as circumstances change.
                  </p>
                  <p>
                    We cover Bedfordshire, Buckinghamshire, Cambridgeshire, Hertfordshire, Manchester, and London. For families or referrers outside those areas, contact us. We can often extend depending on geography.
                  </p>
                </div>
              </div>

              <div className="lg:pt-12">
                <p className="section-kicker text-ink-muted-dark mb-5">How it works</p>
                <div className="space-y-5">
                  {[
                    { step: '01', label: 'Assessment', value: 'Full needs assessment at home or in hospital, at your pace.' },
                    { step: '02', label: 'Care plan', value: 'Written plan agreed with the person and, where appropriate, their family.' },
                    { step: '03', label: 'Carer match', value: 'We match on skills, availability, and personal fit.' },
                    { step: '04', label: 'Ongoing review', value: 'Regular reviews with the person, family, and any other involved professionals.' },
                  ].map(({ label, value }) => (
                    <div key={label} className="border-t border-rule-light pt-5">
                      <p className="text-[11px] font-medium tracking-[0.1em] text-ink-muted-dark uppercase mb-1">{label}</p>
                      <p className="text-ink-dark text-[15px]">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-rule-light pt-16 lg:pt-20">
              <p className="section-kicker text-ink-muted-dark mb-10">What we provide</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
                {careTypes.map((ct) => (
                  <div key={ct.title}>
                    <h3
                      className="font-display text-ink-dark mb-3 leading-snug"
                      style={{
                        fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
                        fontVariationSettings: '"opsz" 16, "wght" 620',
                      }}
                    >
                      {ct.title}
                    </h3>
                    <p className="text-ink-muted-dark text-[14px] leading-relaxed">{ct.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        <section className="bg-cream-dim border-t border-rule-light py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-[2fr_1fr] gap-8 lg:gap-20 items-start">
              <div>
                <p className="section-kicker text-ink-muted-dark mb-4">For organisations and families</p>
                <p
                  className="font-display text-ink-dark leading-tight tracking-[-0.025em] mb-5"
                  style={{
                    fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                    fontVariationSettings: '"opsz" 32, "wght" 560',
                  }}
                >
                  We work with NHS trusts, local authorities, and families.
                </p>
                <p className="text-ink-muted-dark text-[15px] leading-relaxed max-w-[52ch]">
                  Whether you are commissioning care for a caseload or arranging support for a family member, we respond within 2 working days with an honest assessment and a clear proposal.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="interactive-lift inline-flex items-center gap-2 bg-amber text-deep px-6 py-3 rounded-md text-[14px] font-semibold hover:opacity-90 transition-opacity"
                >
                  Get in touch <ArrowUpRight size={14} />
                </Link>
                <p className="text-ink-muted-dark text-[13px] mt-4">
                  Or call <a href="tel:02037572767" className="underline underline-offset-2 hover:text-ink-dark transition-colors">020 3757 2767</a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
