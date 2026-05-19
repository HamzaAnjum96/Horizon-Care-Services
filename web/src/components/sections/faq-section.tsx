'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: 'What types of staff do you provide?',
    a: 'We place registered nurses, social workers, occupational therapists, physiotherapists, healthcare assistants and support workers across health and social care settings.',
  },
  {
    q: 'Who do you work with?',
    a: 'We work with local authorities, NHS trusts, care homes, residential services, supported living providers, private hospitals, clinics and healthcare organisations.',
  },
  {
    q: 'Can you provide urgent cover?',
    a: 'Yes. We support urgent and short-notice staffing requirements where suitable professionals are available. For urgent cover, we aim to respond within 2 working hours.',
  },
  {
    q: 'Do you support longer-term contracts?',
    a: 'Yes. We can support single shifts, block bookings, planned absence, rota gaps and longer-term placements.',
  },
  {
    q: 'What checks do your staff have?',
    a: 'Checks depend on the role and setting, but may include DBS checks, right-to-work confirmation, references, identity checks, training evidence and professional registration checks with NMC, Social Work England or HCPC where relevant.',
  },
  {
    q: 'What information should we send when requesting staff?',
    a: 'Send the role, setting, location, shift pattern, urgency, required qualifications, and any compliance or reporting requirements. If the need is urgent, call us and we will work through the detail quickly.',
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
