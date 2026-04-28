'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Plus, Minus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const services = [
  {
    num: '01',
    name: 'Supported Accommodation',
    desc: 'Homes with tailored care for people with mental health needs and learning disabilities, from short-term stabilisation to long-term placements.',
    href: '/services/supported-accommodation',
    points: [
      'Adult Placement Scheme (6 months to 2 years)',
      'Short-Term Support (1 to 6 months)',
      'Step-Down Transitional Support for hospital discharge',
      'Outreach Floating Support for community integration',
      'Current properties in Hatfield, Hertfordshire',
    ],
  },
  {
    num: '02',
    name: 'Staffing Solutions',
    desc: 'Flexible staffing for health and social care organisations: single shifts to long-term cover, available round the clock on short notice.',
    href: '/services/staffing',
    points: [
      'Registered nurses and social workers',
      'Occupational therapists and physiotherapists',
      'Healthcare assistants and support workers',
      'Hospitals, care homes, and community settings',
      'Short-notice and ongoing contract arrangements',
    ],
  },
  {
    num: '03',
    name: 'Home Care',
    desc: 'Person-centred care at home: personal care, companionship, medication management, meal preparation, housekeeping, and shopping support.',
    href: '/services/home-care',
    points: [
      'Personal care and daily living support',
      'Companionship and emotional support',
      'Medication management and adherence',
      'Meal preparation and dietary planning',
      'Respite care for families and carers',
    ],
  },
  {
    num: '04',
    name: 'Specialist Care',
    desc: "Expert care for people with dementia, Alzheimer's disease, or terminal illness, focused on dignity, comfort, and individual wellbeing.",
    href: '/services/specialist',
    points: [
      "Dementia and Alzheimer's specialist support",
      'Hospice and end-of-life care',
      'Respite care and carer relief',
      'Care assessment and personalised planning',
      'Care coordination with NHS and local authority',
    ],
  },
]

export function ServicesSection() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <section className="bg-bg-base py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-text-muted mb-3">
            What we provide
          </p>
          <h2
            className="font-display text-text-main tracking-[-0.02em]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700 }}
          >
            Our services
          </h2>
        </motion.div>

        <div className="divide-y divide-border-soft">
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
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        delay: index * 0.07,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={(e) => e.key === 'Enter' && onToggle()}
        aria-expanded={isExpanded}
        className="flex items-start gap-6 md:gap-10 py-7 cursor-pointer group outline-none"
      >
        {/* Large decorative number */}
        <span
          className="font-display font-bold text-green-tint select-none flex-shrink-0 leading-[1] mt-0.5"
          style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)' }}
          aria-hidden="true"
        >
          {service.num}
        </span>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3
            className="font-display text-text-main font-semibold mb-1.5 group-hover:text-green-brand transition-colors tracking-[-0.01em]"
            style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.55rem)' }}
          >
            {service.name}
          </h3>
          <p className="text-text-muted text-[15px] leading-relaxed max-w-[62ch]">
            {service.desc}
          </p>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <ul className="mt-5 space-y-2">
                  {service.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-[14px] text-text-muted">
                      <span
                        className="mt-[7px] w-1 h-1 rounded-full bg-green-brand flex-shrink-0"
                        aria-hidden="true"
                      />
                      {pt}
                    </li>
                  ))}
                </ul>
                <Link
                  href={service.href}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 text-green-brand text-[13px] font-semibold mt-5 hover:gap-3 transition-all"
                >
                  Explore {service.name} <ArrowRight size={13} />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Toggle icon */}
        <button
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
          onClick={(e) => { e.stopPropagation(); onToggle() }}
          className="flex-shrink-0 pt-1 text-text-muted group-hover:text-green-brand transition-colors"
          tabIndex={-1}
        >
          {isExpanded ? <Minus size={18} /> : <Plus size={18} />}
        </button>
      </div>
    </motion.div>
  )
}
