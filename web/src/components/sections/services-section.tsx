'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const services = [
  {
    num: 'No. 01',
    name: 'Supported Accommodation',
    href: '/services/supported-accommodation',
    points: [
      'Adult Placement Scheme — 6 months to 2 years',
      'Short-Term Support — 1 to 6 months',
      'Step-Down Transitional Support for hospital discharge',
      'Outreach Floating Support for community integration',
      'Current properties in Hatfield, Hertfordshire',
    ],
    note: 'Mental health and learning disability focus',
  },
  {
    num: 'No. 02',
    name: 'Staffing Solutions',
    href: '/services/staffing',
    points: [
      'Registered nurses, social workers, OTs, physiotherapists',
      'Healthcare assistants and support workers',
      'Hospitals, care homes, and community settings',
      'Single shifts through to long-term contracts',
      'Short-notice cover, round the clock',
    ],
    note: '24/7 availability',
  },
  {
    num: 'No. 03',
    name: 'Home Care',
    href: '/services/home-care',
    points: [
      'Personal care and daily living support',
      'Companionship and emotional support',
      'Medication management and adherence',
      'Meal preparation with dietary planning',
      'Respite care for families and carers',
    ],
    note: 'Person-centred, at home',
  },
  {
    num: 'No. 04',
    name: 'Specialist Care',
    href: '/services/specialist',
    points: [
      "Dementia and Alzheimer's specialist support",
      'Hospice and end-of-life care',
      'Respite care and carer relief',
      'Care assessment and personalised planning',
      'Coordination with NHS and local authority',
    ],
    note: 'Dementia, hospice, respite',
  },
]

export function ServicesSection() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <section className="bg-cream py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="section-kicker text-ink-muted-dark mb-4"
        >
          What we provide
        </motion.p>
        <h2
          className="editorial-title text-ink-dark mb-12 lg:mb-14 max-w-[14ch]"
          style={{ fontSize: 'clamp(2rem, 4.2vw, 3.35rem)' }}
        >
          Services shaped around each person.
        </h2>

        {/* Service rows */}
        <div>
          {services.map((service, i) => (
            <ServiceRow
              key={service.num}
              service={service}
              index={i}
              isExpanded={expanded === service.num}
              onToggle={() =>
                setExpanded(expanded === service.num ? null : service.num)
              }
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceRow({
  service,
  index,
  isExpanded,
  onToggle,
}: {
  service: (typeof services)[0]
  index: number
  isExpanded: boolean
  onToggle: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="border-t border-rule-light last:border-b"
    >
      <div
        role="button"
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={(e) => e.key === 'Enter' && onToggle()}
        aria-expanded={isExpanded}
        className="flex items-center justify-between py-7 lg:py-8 cursor-pointer group outline-none"
      >
        {/* Left: ref number + name */}
        <div className="flex items-baseline gap-5 lg:gap-8 min-w-0">
          <span className="text-[11px] font-medium tracking-[0.1em] text-ink-muted-dark flex-shrink-0 hidden sm:block">
            {service.num}
          </span>
          <h3
                className="font-display text-ink-dark group-hover:text-forest transition-colors truncate"
                style={{
                  fontSize: 'clamp(1.4rem, 3vw, 2.4rem)',
                  fontVariationSettings: '"opsz" 24, "wght" 560',
                }}
              >
                {service.name}
          </h3>
        </div>

        {/* Right: note + arrow */}
        <div className="flex items-center gap-4 lg:gap-8 flex-shrink-0 pl-4">
          <span className="hidden lg:block text-[12px] text-ink-muted-dark tracking-[0.03em]">
            {service.note}
          </span>
          <ArrowUpRight
            size={18}
            className={`text-ink-muted-dark transition-all duration-300 ${
              isExpanded ? 'rotate-90 text-forest' : 'group-hover:rotate-12'
            }`}
          />
        </div>
      </div>

      {/* Expandable detail */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 grid lg:grid-cols-[1fr_auto] gap-6 lg:gap-16">
              <ul className="space-y-2 pl-0 sm:pl-[calc(11px*5+2rem)]">
                {service.points.map((pt) => (
                  <li
                    key={pt}
                    className="text-[15px] text-ink-muted-dark leading-snug flex items-start gap-3"
                  >
                    <span className="mt-[7px] w-1 h-1 rounded-full bg-amber flex-shrink-0" />
                    {pt}
                  </li>
                ))}
              </ul>
              <Link
                href={service.href}
                onClick={(e) => e.stopPropagation()}
                className="self-end inline-flex items-center gap-2 text-forest text-[13px] font-semibold tracking-[0.03em] hover:gap-3 transition-all whitespace-nowrap"
              >
                Full details <ArrowUpRight size={13} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
