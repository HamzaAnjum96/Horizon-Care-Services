const steps = [
  {
    num: '01',
    title: 'Enquiry',
    desc: 'Call or email to tell us what you need. Staffing cover, home care, specialist support — we ask the right questions and respond quickly.',
  },
  {
    num: '02',
    title: 'Matching',
    desc: 'We identify the right people and service model for your requirements. Vetting, compliance, and relevant experience confirmed before deployment.',
  },
  {
    num: '03',
    title: 'Delivery',
    desc: 'Staff or care teams are in place. We handle scheduling, coordination, and any short-notice adjustments as needs change.',
  },
  {
    num: '04',
    title: 'Review',
    desc: 'Regular check-ins keep quality high and capacity aligned. We stay accountable for outcomes and adjust the arrangement as required.',
  },
]

export function HowItWorks() {
  return (
    <section className="bg-cream py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <p className="section-kicker text-ink-muted-dark mb-4">
          How we work
        </p>
        <h2
          className="editorial-title text-ink-dark mb-12 lg:mb-14 max-w-[14ch]"
          style={{ fontSize: 'clamp(1.9rem, 3.6vw, 3rem)' }}
        >
          From enquiry to delivery.
        </h2>

        <div className="grid md:grid-cols-4 border-t border-rule-light">
          {steps.map((step) => (
            <div
              key={step.num}
              className="pt-8 pb-10 px-8 first:pl-0 last:pr-0 border-r border-rule-light last:border-r-0 max-md:border-r-0 max-md:px-0 max-md:border-b max-md:last:border-b-0 max-md:pb-8"
            >
              <p
                className="font-display text-amber mb-6 leading-none tracking-[-0.02em]"
                style={{
                  fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                  fontVariationSettings: '"opsz" 36, "wght" 520',
                }}
              >
                {step.num}
              </p>
              <h3
                className="font-display text-ink-dark mb-3 leading-tight"
                style={{
                  fontSize: 'clamp(1.15rem, 1.8vw, 1.45rem)',
                  fontVariationSettings: '"opsz" 18, "wght" 620',
                }}
              >
                {step.title}
              </h3>
              <p className="text-ink-muted-dark text-[14px] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
