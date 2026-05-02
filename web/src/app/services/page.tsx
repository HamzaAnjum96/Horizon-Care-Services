import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { PageHeader } from '@/components/layout/page-header'

export const metadata: Metadata = {
  title: 'Services — Horizon Care Services',
  description: 'Staffing solutions, home care, and specialist care across England. Delivered by skilled, regulated professionals.',
}

const services = [
  {
    num: '01',
    name: 'Staffing Solutions',
    href: '/services/staffing',
    summary:
      'Registered nurses, social workers, occupational therapists, physiotherapists, healthcare assistants, and support workers. Available for single shifts, long-term contracts, and short-notice cover around the clock.',
    tags: ['24/7 cover', 'Clinical and non-clinical', 'Short-notice'],
  },
  {
    num: '02',
    name: 'Home Care',
    href: '/services/home-care',
    summary:
      'Personal care, companionship, medication management, and respite support delivered at home. A consistent, familiar carer wherever possible, because continuity matters to the people we support.',
    tags: ['Personal care', 'Medication management', 'Respite'],
  },
  {
    num: '03',
    name: 'Specialist Care',
    href: '/services/specialist',
    summary:
      'Dementia and Alzheimer\'s support, hospice care, and end-of-life planning. Care that requires not just competence but real sensitivity, and professionals with the experience to provide both.',
    tags: ['Dementia', 'Hospice', 'End-of-life'],
  },
]

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHeader
          kicker="What we provide"
          title="Services shaped around each person."
          intro="Three areas of provision, all delivered by professionals who understand that care is only as good as the people providing it."
        />

        <section className="bg-cream py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            {services.map((s, i) => (
              <div
                key={s.num}
                className={`grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-20 py-14 lg:py-16 ${i > 0 ? 'border-t border-rule-light' : ''}`}
              >
                <div>
                  <span className="text-[11px] font-medium tracking-[0.1em] text-ink-muted-dark block mb-4">
                    No. {s.num}
                  </span>
                  <h2
                    className="font-display text-ink-dark leading-tight tracking-[-0.02em] mb-6"
                    style={{
                      fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)',
                      fontVariationSettings: '"opsz" 28, "wght" 580',
                    }}
                  >
                    {s.name}
                  </h2>
                  <Link
                    href={s.href}
                    className="inline-flex items-center gap-2 text-ink-dark text-[13px] font-semibold tracking-[0.03em] hover:gap-3 transition-all group"
                  >
                    Full details <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
                <div>
                  <p className="text-ink-muted-dark text-[16px] leading-relaxed mb-7">
                    {s.summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {s.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-medium tracking-[0.06em] text-ink-muted-dark border border-rule-light px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-cream-dim border-t border-rule-light py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-[2fr_1fr] gap-8 lg:gap-24 items-center">
              <div>
                <p className="section-kicker text-ink-muted-dark mb-4">Where we work</p>
                <p
                  className="font-display text-ink-dark leading-tight tracking-[-0.025em]"
                  style={{
                    fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                    fontVariationSettings: '"opsz" 32, "wght" 560',
                  }}
                >
                  Bedfordshire, Buckinghamshire, Cambridgeshire, Hertfordshire, Manchester, and London.
                </p>
              </div>
              <div>
                <p className="text-ink-muted-dark text-[15px] leading-relaxed mb-6">
                  If you need cover or care in a location not listed here, contact us. We work across England and regularly extend into new areas.
                </p>
                <Link
                  href="/contact"
                  className="interactive-lift inline-flex items-center gap-2 border border-rule-light text-ink-dark px-5 py-2.5 rounded-md text-[13px] font-semibold hover:border-ink-dark/30 transition-colors"
                >
                  Get in touch <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
