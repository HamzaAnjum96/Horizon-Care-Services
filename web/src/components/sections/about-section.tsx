const pillars = [
  {
    title: 'We check before we place',
    body: 'DBS checks, references, right-to-work checks and professional registration confirmed before placement.',
  },
  {
    title: 'We match people to settings',
    body: 'A care home, hospital ward and supported living service need different workers. We look at experience, environment and fit.',
  },
  {
    title: 'We communicate clearly',
    body: 'You get clear updates on availability, suitability and timescales. If we cannot safely meet a requirement, we say so.',
  },
  {
    title: 'We support urgent and planned needs',
    body: 'Short-notice cover, single shifts, planned absence and longer-term contracts — all supported.',
  },
  {
    title: 'We stay accountable',
    body: 'Our role does not end once a name is sent. We stay available, respond to issues and review arrangements where needed.',
  },
]

export function AboutSection() {
  return (
    <section className="bg-cream-dim py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <p className="section-kicker text-ink-muted-dark mb-6">
          Why Horizon
        </p>

        <h2
          className="font-display text-ink-dark leading-[1.05] tracking-[-0.025em] mb-14 lg:mb-16 max-w-[16ch]"
          style={{
            fontSize: 'clamp(2rem, 5.2vw, 4.7rem)',
            fontVariationSettings: '"opsz" 48, "wght" 580',
          }}
        >
          Not just names on a rota.
        </h2>

        <div>
          {pillars.map((pillar, i) => (
            <div
              key={pillar.title}
              className="border-t border-rule-light py-7 md:py-8 grid md:grid-cols-[48px_1fr_1.4fr] gap-x-8 gap-y-1.5 md:items-baseline"
            >
              <span
                className="font-mono text-[11px] tracking-widest"
                style={{ color: 'var(--amber-dim)' }}
                aria-hidden="true"
              >
                0{i + 1}
              </span>
              <h3
                className="font-display text-ink-dark leading-snug tracking-[-0.015em]"
                style={{
                  fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)',
                  fontVariationSettings: '"opsz" 22, "wght" 620',
                }}
              >
                {pillar.title}
              </h3>
              <p className="text-ink-muted-dark text-[15px] leading-relaxed">
                {pillar.body}
              </p>
            </div>
          ))}
          <div className="border-t border-rule-light" />
        </div>

      </div>
    </section>
  )
}
