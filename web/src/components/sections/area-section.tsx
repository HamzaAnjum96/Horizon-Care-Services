const areas = [
  'Bedfordshire',
  'Buckinghamshire',
  'Cambridgeshire',
  'Hertfordshire',
  'Manchester',
  'London',
]

const coverageDots = [
  { label: 'Manchester',      cx: 45,  cy: 65,  delay: '0s',    dur: '4.2s', abbr: 'Manchester' },
  { label: 'Cambridgeshire',  cx: 118, cy: 97,  delay: '0.7s',  dur: '3.8s', abbr: 'Cambs.' },
  { label: 'Bedfordshire',    cx: 108, cy: 110, delay: '1.1s',  dur: '4.6s', abbr: 'Beds.' },
  { label: 'Buckinghamshire', cx: 90,  cy: 122, delay: '0.3s',  dur: '5.0s', abbr: 'Bucks.' },
  { label: 'Hertfordshire',   cx: 110, cy: 130, delay: '1.5s',  dur: '3.5s', abbr: 'Herts.' },
  { label: 'London',          cx: 114, cy: 147, delay: '0.9s',  dur: '4.8s', abbr: 'London' },
]

function EnglandMap() {
  return (
    <svg
      viewBox="0 0 160 200"
      aria-label="England coverage areas: Manchester, Cambridgeshire, Bedfordshire, Buckinghamshire, Hertfordshire and London"
      role="img"
      className="w-full max-w-[200px] mx-auto"
      style={{ height: 'auto' }}
    >
      {/* Simplified England outline */}
      <path
        d="M 85 8 C 110 10, 140 28, 148 55 C 155 78, 142 100, 138 118 C 134 136, 140 152, 128 168 C 116 184, 95 192, 78 190 C 58 188, 38 178, 30 162 C 20 144, 22 122, 28 102 C 34 82, 18 60, 28 38 C 38 18, 62 6, 85 8 Z"
        fill="none"
        stroke="var(--rule-light)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {coverageDots.map((dot) => (
        <g key={dot.label}>
          <title>{dot.label}</title>
          {/* Pulse ring — opacity only, reliable cross-browser */}
          <circle
            cx={dot.cx}
            cy={dot.cy}
            r="10"
            fill="none"
            stroke="var(--amber)"
            strokeWidth="1"
            style={{
              opacity: 0.2,
              animation: `hero-breathe ${dot.dur} ease-in-out infinite`,
              animationDelay: dot.delay,
            }}
          />
          {/* Solid dot */}
          <circle cx={dot.cx} cy={dot.cy} r="4" fill="var(--amber)" />
          {/* Label */}
          <text
            x={dot.cx + 8}
            y={dot.cy + 3.5}
            fontSize="8"
            fill="var(--ink-muted-dark)"
            textAnchor="start"
            style={{
              fontFamily: 'var(--font-bricolage), system-ui, sans-serif',
              fontWeight: 500,
              letterSpacing: '0.02em',
            }}
          >
            {dot.abbr}
          </text>
        </g>
      ))}
    </svg>
  )
}

export function AreaSection() {
  return (
    <section className="bg-cream-dim border-t border-rule-light py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-[2fr_2fr_2fr] gap-10 lg:gap-16 items-center">

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

          {/* England coverage dot map — tablet and up */}
          <div className="hidden md:flex items-center justify-center py-4">
            <EnglandMap />
          </div>

          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-x-6 gap-y-3.5 list-none">
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
