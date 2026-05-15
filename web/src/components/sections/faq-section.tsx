'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: 'What services does Horizon Care Services provide?',
    a: 'We provide three core services: home care (personal care, companionship, medication management, meal preparation, housekeeping, and respite support); healthcare staffing (registered nurses, social workers, occupational therapists, physiotherapists, healthcare assistants, and support workers); and specialist care for people living with dementia and those with life-limiting conditions including hospice and end-of-life care.',
  },
  {
    q: 'What areas does Horizon Care Services cover?',
    a: 'We operate across Bedfordshire, Buckinghamshire, Cambridgeshire, Hertfordshire, Greater Manchester, and London. Contact us if you are outside these areas. We can often extend coverage.',
  },
  {
    q: 'Is Horizon Care Services CQC registered?',
    a: 'Yes. Horizon Care Services Ltd is registered with and regulated by the Care Quality Commission (CQC) in England. Our services are provided in accordance with the Health and Social Care Act 2008 (Regulated Activities) Regulations 2014. Company number 14615041.',
  },
  {
    q: 'How do I arrange home care from Horizon Care Services?',
    a: 'Call 020 3757 2767 (Monday to Friday, 9am to 5pm), message via WhatsApp at the same number, or email contact@horizoncareservices.org. We respond within 2 working days to discuss requirements and confirm next steps.',
  },
  {
    q: 'How quickly can Horizon Care Services provide healthcare staff?',
    a: 'For urgent requirements, we can often respond the same day. For planned placements, we confirm availability within 2 working days. Staffing is available 24/7 for NHS trusts, local authorities, care homes, and other care organisations across England.',
  },
  {
    q: 'Does Horizon Care Services work with NHS trusts and local authorities?',
    a: 'Yes. We work with NHS trusts, local authorities, private care homes, and commissioning teams across England. We are transparent about capacity, rates, and compliance from the first conversation. Call 020 3757 2767 or email contact@horizoncareservices.org to discuss a commissioning requirement.',
  },
  {
    q: 'What types of healthcare professionals does Horizon Care Services place?',
    a: 'We place registered nurses (RGN, RMN, RNLD), social workers, occupational therapists, physiotherapists, healthcare assistants, and support workers in ward, community, residential, and domiciliary settings across England.',
  },
]

export function FaqSection() {
  const [openSet, setOpenSet] = useState<Set<number>>(new Set())

  const toggle = (i: number) => {
    setOpenSet((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  return (
    <section className="bg-cream py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <p className="section-kicker text-ink-muted-dark mb-4">Common questions</p>
        <h2
          className="editorial-title text-ink-dark mb-12 lg:mb-14 max-w-[14ch]"
          style={{ fontSize: 'clamp(1.9rem, 3.6vw, 3rem)' }}
        >
          Frequently asked.
        </h2>

        <dl>
          {faqs.map((faq, i) => {
            const isOpen = openSet.has(i)
            const panelId = `faq-panel-${i}`
            return (
              <div key={i} className="border-t border-rule-light last:border-b">
                <dt>
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between py-6 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/50 focus-visible:ring-offset-4 focus-visible:ring-offset-cream"
                  >
                    <span
                      className="font-display text-ink-dark group-hover:opacity-75 transition-opacity duration-200"
                      style={{
                        fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
                        fontVariationSettings: '"opsz" 18, "wght" 580',
                      }}
                    >
                      {faq.q}
                    </span>
                    <span className="flex-shrink-0 ml-6 text-ink-muted-dark group-hover:text-ink-dark transition-colors duration-200">
                      {isOpen ? (
                        <Minus size={15} aria-hidden="true" />
                      ) : (
                        <Plus size={15} aria-hidden="true" />
                      )}
                    </span>
                  </button>
                </dt>
                <dd
                  id={panelId}
                  aria-hidden={!isOpen}
                  style={{
                    display: 'grid',
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    opacity: isOpen ? 1 : 0,
                    transition:
                      'grid-template-rows 240ms cubic-bezier(0.16,1,0.3,1), opacity 180ms ease',
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="text-ink-muted-dark text-[15px] leading-relaxed pb-7 max-w-[72ch]">
                      {faq.a}
                    </p>
                  </div>
                </dd>
              </div>
            )
          })}
        </dl>
      </div>
    </section>
  )
}
