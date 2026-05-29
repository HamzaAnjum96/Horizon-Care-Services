const areas = [
  { code: 'BED', name: 'Bedfordshire' },
  { code: 'BUCK', name: 'Buckinghamshire' },
  { code: 'CAMB', name: 'Cambridgeshire' },
  { code: 'HERT', name: 'Hertfordshire' },
  { code: 'MAN', name: 'Manchester' },
  { code: 'LDN', name: 'London' },
]

function GBMap() {
  return (
    <div className="relative texture-halftone w-full max-w-[200px] mx-auto">
      <img
        src="/england-outline.svg"
        alt="Great Britain outline showing coverage areas"
        className="relative w-full opacity-60 mix-blend-multiply"
        style={{ height: 'auto', filter: 'sepia(0.4) saturate(1.3) hue-rotate(-12deg)' }}
      />
    </div>
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

          <dl className="border-t border-rule-light">
            {areas.map((area) => (
              <div
                key={area.code}
                className="border-b border-rule-light grid grid-cols-[3.5rem_1fr] gap-x-4 py-3 items-baseline"
              >
                <dt className="register-mono text-amber">{area.code}</dt>
                <dd className="text-ink-dark text-[15px] font-medium">{area.name}</dd>
              </div>
            ))}
          </dl>

        </div>
      </div>
    </section>
  )
}
