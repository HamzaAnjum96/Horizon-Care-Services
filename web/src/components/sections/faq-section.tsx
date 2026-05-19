'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: 'What types of staff do you provide?',
    a: 'We place registered nurses (RGN, RMN, RNLD), social workers, occupational therapists, physiotherapists, healthcare assistants and support workers. We cover urgent shifts, planned rotas, and longer-term placements.',
  },
  {
    q: 'Who do you work with?',
    a: 'We work with local authorities, NHS trusts, care homes, supported living providers, residential services, private hospitals and wider healthcare organisations across England.',
  },
  {
    q: 'Can you provide urgent cover?',
    a: "Yes, where suitable professionals are available for your setting. Call us for urgent requirements and we'll triage quickly. If we can't fill it safely, we'll tell you straight away — not after keeping you waiting.",
  },
  {
    q: 'Do you support longer-term contracts?',
    a: 'Yes. Single shifts, block bookings, planned absence cover, rota gaps and ongoing placements — all handled. We work to the same process regardless of duration.',
  },
  {
    q: 'What checks do your staff have?',
    a: "Before we put anyone forward, we verify DBS status, right-to-work, references and professional registration with NMC, Social Work England or HCPC where relevant. We don't send workers whose compliance we haven't confirmed.",
  },
  {
    q: 'What information should we send when requesting staff?',
    a: 'The role and any registration or band required, the setting type, location, shift dates or pattern, urgency level, and anything specific about the environment. The more detail you give us upfront, the faster we can give you a realistic answer.',
  },
  {
    q: 'What happens if the requirement changes after I contact you?',
    a: "Get in touch and we'll adjust. If a shift changes, extends or gets cancelled, let us know as early as possible and we'll coordinate from there. You won't need to re-explain the setting from scratch.",
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
        <p className="section-kicker text-ink-muted-dark mb-12 lg:mb-14">Common questions</p>

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
