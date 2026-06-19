const pillars = [
  {
    title: 'We check before we place',
    body: "Every worker is DBS-checked, referenced and verified for their right to work before we place them. We don't send anyone whose compliance we haven't confirmed.",
  },
  {
    title: 'We match people to the right setting',
    body: "A nursing home, a residential care home and a supported living service each have different demands. We look at where someone has actually worked before, not just what's on their CV.",
  },
  {
    title: 'We communicate clearly',
    body: "You'll always know where things stand. If we can cover the shift, we'll tell you how and when. If we can't, we'll say so straight away — not keep you waiting.",
  },
  {
    title: 'We support both urgent and planned requirements',
    body: "Same-day calls and three-month planned rotas are both things we handle. We don't treat one as more important than the other.",
  },
  {
    title: 'We remain accountable',
    body: "Getting a worker to you isn't where we stop. We stay reachable, follow up when it matters and resolve issues should they arise.",
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
          className="font-display text-ink-dark leading-[1.05] tracking-[-0.025em] mb-14 lg:mb-16 lg:max-w-[16ch]"
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
              className="border-t border-rule-light py-7 lg:py-8 grid lg:grid-cols-[48px_1fr_1.4fr] gap-x-8 gap-y-1.5 lg:items-baseline"
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
