const areas = [
  'Bedfordshire',
  'Buckinghamshire',
  'Cambridgeshire',
  'Hertfordshire',
  'Manchester',
  'London',
]

function GBMap() {
  return (
    <img
      src="/england-outline.svg"
      alt="Great Britain outline showing coverage areas"
      className="w-full max-w-[200px] mx-auto opacity-70"
      style={{ height: 'auto' }}
    />
  )
}

export function AreaSection() {
  return (
    <section className="bg-cream-dim border-t border-rule-light py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-[2fr_1.4fr_2fr] gap-10 lg:gap-12 items-center">

          <div>
            <p className="section-kicker text-ink-muted-dark mb-4">
              Where we work
            </p>
            <p
              className="font-display text-ink-dark leading-tight tracking-[-0.025em] mb-4"
              style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                fontVariationSettings: '"opsz" 36, "wght" 580',
              }}
            >
              Serving England.
            </p>
            <p className="text-ink-muted-dark text-[15px] leading-relaxed max-w-[38ch]">
              Six regions, with additional areas considered depending on role, urgency and safe availability. Available to local authorities, NHS trusts, care homes and healthcare organisations.
            </p>
          </div>

          {/* GB outline map — desktop only */}
          <div className="hidden lg:flex items-center justify-center py-4">
            <GBMap />
          </div>

          <ul className="grid grid-cols-2 gap-x-6 gap-y-3.5 list-none">
            {areas.map((area) => (
              <li key={area} className="flex items-center gap-2.5">
                <span className="w-1 h-1 rounded-full bg-amber flex-shrink-0" aria-hidden="true" />
                <span className="text-ink-dark text-[15px] font-medium">{area}</span>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </section>
  )
}
