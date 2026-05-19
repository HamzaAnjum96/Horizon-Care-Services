const areas = [
  'Bedfordshire',
  'Buckinghamshire',
  'Cambridgeshire',
  'Hertfordshire',
  'Manchester',
  'London',
]

// Path data: Al MacDonald / Fritz Lekschas, simple-world-map, CC BY-SA 3.0
// viewBox origin: 30.767 241.591 (world map), UK occupies x≈391–410 y≈367–397
const UK_MAINLAND = 'M400.63 367.984l-1.583 2.395.63.958h3.65v1.6l-.953 1.278.632 3.354 2.058 3.994 1.58 3.672 2.534.96 1.105 1.92-.155 1.754-1.582.96-.156.794 1.106.64-.95 1.28-2.222.958-4.28-.477-6.663 3.035-2.22-1.115 6.345-3.674-.796-.476-3.33-.32 2.06-3.033.318-2.56 2.696-.318-.475-4.953-3.175-.156-.95-1.115.155-3.675-1.9.156 1.9-6.387 3.492-2.56 1.127 1.11z'
const UK_ISLAND = 'M393.974 378.693l-2.853.32-.155 2.56 1.9 1.278 2.06-.474.795-1.436-1.746-2.247z'

// Dot positions calibrated from UK path bounding box using geographic projection
const coverageDots = [
  { label: 'Manchester',      cx: 401.5, cy: 384.0, delay: '0s',   dur: '4.2s' },
  { label: 'Cambridgeshire',  cx: 407.5, cy: 388.8, delay: '0.7s', dur: '3.8s' },
  { label: 'Bedfordshire',    cx: 405.5, cy: 389.6, delay: '1.1s', dur: '4.6s' },
  { label: 'Buckinghamshire', cx: 403.8, cy: 391.2, delay: '0.3s', dur: '5.0s' },
  { label: 'Hertfordshire',   cx: 407.0, cy: 390.6, delay: '1.5s', dur: '3.5s' },
  { label: 'London',          cx: 406.2, cy: 392.4, delay: '0.9s', dur: '4.8s' },
]

function UKMap() {
  return (
    <svg
      viewBox="387 364 27 36"
      aria-label="Coverage areas: Manchester, Cambridgeshire, Bedfordshire, Buckinghamshire, Hertfordshire and London"
      role="img"
      className="w-full max-w-[180px] mx-auto"
      style={{ height: 'auto' }}
    >
      <path
        d={UK_MAINLAND}
        fill="none"
        stroke="var(--rule-light)"
        strokeWidth="0.35"
        strokeLinejoin="round"
      />
      <path
        d={UK_ISLAND}
        fill="none"
        stroke="var(--rule-light)"
        strokeWidth="0.35"
        strokeLinejoin="round"
      />

      {coverageDots.map((dot) => (
        <g key={dot.label}>
          <title>{dot.label}</title>
          <circle
            cx={dot.cx}
            cy={dot.cy}
            r={2.0}
            fill="none"
            stroke="var(--amber)"
            strokeWidth="0.25"
            style={{
              opacity: 0.22,
              animation: `hero-breathe ${dot.dur} ease-in-out infinite`,
              animationDelay: dot.delay,
            }}
          />
          <circle cx={dot.cx} cy={dot.cy} r={0.7} fill="var(--amber)" />
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

          {/* UK coverage dot map — tablet and up */}
          <div className="hidden md:flex items-center justify-center py-4">
            <UKMap />
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
