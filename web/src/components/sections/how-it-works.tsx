const steps = [
  {
    num: '01',
    title: 'Tell us what you need',
    desc: 'Call or email with the role, setting, location, shift pattern, urgency and any specific requirements. We ask the right questions so we understand the environment properly.',
  },
  {
    num: '02',
    title: 'We confirm suitability',
    desc: 'We check availability, experience, compliance and professional registration where required. We only put people forward where we believe the fit is right.',
  },
  {
    num: '03',
    title: 'Cover is arranged',
    desc: 'We confirm the placement details clearly, including timings, location, reporting instructions and any role-specific expectations.',
  },
  {
    num: '04',
    title: 'We stay in contact',
    desc: 'We remain available for updates, changes, short-notice adjustments and follow-up. If the requirement continues, we help plan the next step.',
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

        <ol className="grid md:grid-cols-4 border-t border-rule-light list-none">
          {steps.map((step) => (
            <li
              key={step.num}
              className="pt-8 pb-10 px-8 first:pl-0 last:pr-0 border-r border-rule-light last:border-r-0 max-md:border-r-0 max-md:px-0 max-md:border-b max-md:last:border-b-0 max-md:pb-8"
            >
              <p
                className="font-display text-amber mb-6 leading-none tracking-[-0.02em]"
                aria-hidden="true"
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
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
