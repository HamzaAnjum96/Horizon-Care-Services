'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: 'What types of healthcare professionals do you place?',
    a: 'Registered nurses (RGN, RMN, RNLD), social workers, occupational therapists, physiotherapists, healthcare assistants, and support workers. We cover clinical and non-clinical roles across hospital, community, residential, and domiciliary settings.',
  },
  {
    q: 'How quickly can you provide cover?',
    a: 'For urgent requests, we aim to respond within 2 working hours and can often provide same-day cover. For planned requirements, we confirm availability within 2 working days. We operate 24 hours a day, 7 days a week.',
  },
  {
    q: 'What vetting and compliance checks do your staff hold?',
    a: 'Every professional on our register has been DBS checked, reference verified, and assessed for the environments they are placed in. We confirm professional registration — NMC for nurses, SWE for social workers, HCPC for allied health professionals — before any placement.',
  },
  {
    q: 'Which settings do you work with?',
    a: 'NHS hospital wards and departments, mental health units, learning disability services, care homes, community and domiciliary settings, and private hospitals. If you are outside our listed areas, contact us — we work across England.',
  },
  {
    q: 'Which areas do you cover?',
    a: 'Bedfordshire, Buckinghamshire, Cambridgeshire, Hertfordshire, Greater Manchester, and London. We regularly extend beyond these areas — contact us if you are elsewhere in England.',
  },
  {
    q: 'Do you work with NHS trusts and local authorities?',
    a: 'Yes. We work with NHS trusts, local authorities, private care organisations, and commissioning teams across England. We are transparent about capacity, rates, and compliance from the first conversation. Call 020 3757 2767 or email contact@horizoncareservices.org.',
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
