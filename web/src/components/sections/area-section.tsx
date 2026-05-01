const areas = [
  'Bedfordshire',
  'Buckinghamshire',
  'Cambridgeshire',
  'Hertfordshire',
  'Manchester',
  'London',
]

export function AreaSection() {
  return (
    <section className="bg-cream-dim border-t border-rule-light py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[2fr_3fr] gap-10 lg:gap-24 items-center">

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
              Six regions, with further expansion planned. Available to individuals,
              families, NHS trusts, and local authorities.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3.5">
            {areas.map((area) => (
              <div key={area} className="flex items-center gap-2.5">
                <span className="w-1 h-1 rounded-full bg-amber flex-shrink-0" />
                <span className="text-ink-dark text-[15px] font-medium">{area}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
