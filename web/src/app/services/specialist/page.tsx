import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { PageHeader } from '@/components/layout/page-header'

export const metadata: Metadata = {
  title: 'Specialist Care — Horizon Care Services',
  description: 'Dementia and Alzheimer\'s care, hospice support, and end-of-life care across England. Delivered by experienced, compassionate professionals.',
}

export default function SpecialistCarePage() {
  return (
    <>
      <Nav />
      <main>
        <PageHeader
          kicker="Services / Specialist Care"
          title="Care that goes further."
          intro="For people living with dementia, those approaching end of life, and families navigating the most difficult periods. Delivered by professionals with the knowledge and the character to do it well."
          cta={{ label: 'Make a referral', href: '/referrals' }}
        />

        <section className="bg-cream py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">

            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 mb-20 lg:mb-28">

              <div>
                <span className="text-[11px] font-medium tracking-[0.1em] text-ink-muted-dark block mb-5">01</span>
                <h2
                  className="font-display text-ink-dark leading-tight tracking-[-0.02em] mb-6"
                  style={{
                    fontSize: 'clamp(1.5rem, 2.4vw, 2rem)',
                    fontVariationSettings: '"opsz" 24, "wght" 580',
                  }}
                >
                  Dementia and Alzheimer&rsquo;s care
                </h2>
                <div className="space-y-4 text-ink-muted-dark text-[15px] leading-relaxed">
                  <p>
                    Dementia changes a person gradually, and care needs to respond to that change. Our staff are trained in dementia-specific approaches: how to communicate when words become harder, how to manage distress calmly, how to structure a day in a way that reduces confusion and maintains dignity.
                  </p>
                  <p>
                    We work with the person and their family to understand their history, their preferences, and what&rsquo;s most important to them. That understanding shapes everything: the routines, the environment, the way our carers speak and move.
                  </p>
                  <p>
                    We also work alongside GPs, memory services, and specialist nurses to ensure that care is medically sound and that any changes in condition are identified and responded to quickly.
                  </p>
                </div>
                <div className="mt-8 space-y-3 border-t border-rule-light pt-8">
                  {[
                    'Person-centred dementia care plans',
                    'Staff trained in therapeutic approaches',
                    'Family support and regular communication',
                    'Coordination with memory services and GPs',
                    'Safe, structured daily routines',
                  ].map((pt) => (
                    <div key={pt} className="flex items-start gap-3">
                      <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-amber flex-shrink-0" />
                      <span className="text-ink-muted-dark text-[14px]">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-medium tracking-[0.1em] text-ink-muted-dark block mb-5">02</span>
                <h2
                  className="font-display text-ink-dark leading-tight tracking-[-0.02em] mb-6"
                  style={{
                    fontSize: 'clamp(1.5rem, 2.4vw, 2rem)',
                    fontVariationSettings: '"opsz" 24, "wght" 580',
                  }}
                >
                  Hospice and end-of-life care
                </h2>
                <div className="space-y-4 text-ink-muted-dark text-[15px] leading-relaxed">
                  <p>
                    End-of-life care requires more than clinical skill. The professionals we place in this area are selected for their experience in palliative settings and their ability to provide care that is calm, compassionate, and unhurried.
                  </p>
                  <p>
                    We work with families through the hardest conversations, providing honest, clear information about what care is available and what to expect. We ensure the person in our care is comfortable, informed, and treated with complete dignity throughout.
                  </p>
                  <p>
                    Our involvement can begin early, with regular support that increases as needs change, or it can be a more focused end-of-life service coordinated with a hospice, palliative care team, or district nursing service.
                  </p>
                </div>
                <div className="mt-8 space-y-3 border-t border-rule-light pt-8">
                  {[
                    'Experienced palliative care professionals',
                    'Pain and symptom management support',
                    'Family guidance and emotional support',
                    'Coordination with hospice and palliative teams',
                    'Flexible hours including overnight and 24-hour care',
                  ].map((pt) => (
                    <div key={pt} className="flex items-start gap-3">
                      <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-amber flex-shrink-0" />
                      <span className="text-ink-muted-dark text-[14px]">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-rule-light pt-16 lg:pt-20">
              <div className="grid lg:grid-cols-[2fr_1fr] gap-10 lg:gap-20 items-start">
                <div>
                  <p className="section-kicker text-ink-muted-dark mb-4">Referring into specialist care</p>
                  <p
                    className="font-display text-ink-dark leading-tight tracking-[-0.02em] mb-6"
                    style={{
                      fontSize: 'clamp(1.5rem, 2.4vw, 2rem)',
                      fontVariationSettings: '"opsz" 24, "wght" 560',
                    }}
                  >
                    We accept referrals from NHS teams, local authorities, and families.
                  </p>
                  <p className="text-ink-muted-dark text-[15px] leading-relaxed max-w-[56ch]">
                    If you&rsquo;re a discharge planner, social worker, or family member looking for specialist care for someone you support, we can move quickly. Call us directly for urgent situations. For planned referrals, use the form below and we&rsquo;ll respond within 2 working days.
                  </p>
                </div>
                <div className="space-y-4">
                  <Link
                    href="/referrals"
                    className="interactive-lift inline-flex items-center gap-2 bg-amber text-deep px-6 py-3 rounded-md text-[14px] font-semibold hover:opacity-90 transition-opacity"
                  >
                    Make a referral <ArrowUpRight size={14} />
                  </Link>
                  <p className="text-ink-muted-dark text-[13px]">
                    Urgent:{' '}
                    <a href="tel:07572701349" className="underline underline-offset-2 hover:text-ink-dark transition-colors">
                      07572 701 349
                    </a>
                  </p>
                  <p className="text-ink-muted-dark text-[13px]">
                    Office:{' '}
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
