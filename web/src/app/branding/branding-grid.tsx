import { Download } from 'lucide-react'
import { HCSLogoMark } from '@/components/hcs-logo'
import { cn } from '@/lib/utils'

type LogoType = 'stacked' | 'lockup' | 'mark'

interface ColorVariant {
  id: string
  label: string
  fg: string
  bg: string
  hasBorder: boolean
}

const COLOR_VARIANTS: ColorVariant[] = [
  { id: 'primary',  label: 'Primary',  fg: '#5C1020', bg: '#FFFFFF', hasBorder: true  },
  { id: 'reversed', label: 'Reversed', fg: '#FFFFFF', bg: '#5C1020', hasBorder: false },
  { id: 'dark',     label: 'Dark',     fg: '#FFFFFF', bg: '#1C1814', hasBorder: false },
  { id: 'cream',    label: 'On Cream', fg: '#5C1020', bg: '#F7F3EE', hasBorder: true  },
  { id: 'mono',     label: 'Mono',     fg: '#1C1814', bg: '#FFFFFF', hasBorder: true  },
]

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

function DlBtn({ href, filename, label, children }: {
  href: string
  filename: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      download={filename}
      className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-[0.07em] uppercase px-2.5 py-1.5 rounded-md transition-colors text-ink-dark hover:bg-ink-dark/6 active:bg-ink-dark/10"
      aria-label={label}
    >
      <Download size={10} />
      {children}
    </a>
  )
}

function CardFooter({ variant, hdHref, hdFilename, uhdHref, uhdFilename, hdLabel, uhdLabel }: {
  variant: ColorVariant
  hdHref: string
  hdFilename: string
  uhdHref: string
  uhdFilename: string
  hdLabel: string
  uhdLabel: string
}) {
  return (
    <div className="bg-cream-dim border-t border-rule-light px-4 py-3 flex items-center justify-between gap-2">
      <div className="flex items-center gap-2 min-w-0">
        <span
          className="w-2.5 h-2.5 rounded-full flex-shrink-0 ring-1 ring-black/10"
          style={{ backgroundColor: variant.fg }}
        />
        <span className="text-[10px] font-medium tracking-[0.1em] text-ink-muted-dark uppercase truncate">
          {variant.label}
        </span>
      </div>
      <div className="flex items-center gap-0.5 flex-shrink-0">
        <DlBtn href={hdHref} filename={hdFilename} label={hdLabel}>HD</DlBtn>
        <DlBtn href={uhdHref} filename={uhdFilename} label={uhdLabel}>Ultra HD</DlBtn>
      </div>
    </div>
  )
}

function LogoCard({ type, variant }: { type: LogoType; variant: ColorVariant }) {
  const hdFile  = `${BASE}/brand/hcs-${type}-${variant.id}@2x.png`
  const uhdFile = `${BASE}/brand/hcs-${type}-${variant.id}@4x.png`

  return (
    <div className={cn('rounded-xl overflow-hidden flex flex-col', variant.hasBorder ? 'ring-1 ring-rule-light' : '')}>
      <div
        className="flex-1 flex items-center justify-center p-8"
        style={{ backgroundColor: variant.bg, minHeight: type === 'lockup' ? 120 : 200 }}
      >
        {type === 'mark' && (
          <HCSLogoMark className="w-20 h-20" style={{ color: variant.fg }} />
        )}
        {type === 'stacked' && (
          <div className="flex flex-col items-center gap-3">
            <HCSLogoMark className="w-16 h-16" style={{ color: variant.fg }} />
            <span
              className="font-display font-semibold text-[13px] leading-tight tracking-[-0.01em] whitespace-nowrap"
              style={{ color: variant.fg, fontVariationSettings: '"opsz" 14, "wght" 560' }}
            >
              Horizon Care Services
            </span>
          </div>
        )}
        {type === 'lockup' && (
          <div className="flex items-center gap-3">
            <HCSLogoMark className="w-10 h-10 flex-shrink-0" style={{ color: variant.fg }} />
            <span
              className="font-display font-semibold text-[16px] leading-none tracking-[-0.01em] whitespace-nowrap"
              style={{ color: variant.fg, fontVariationSettings: '"opsz" 16, "wght" 560' }}
            >
              Horizon Care Services
            </span>
          </div>
        )}
      </div>
      <CardFooter
        variant={variant}
        hdHref={hdFile}  hdFilename={`hcs-logo-${type}-${variant.id}-hd.png`}
        uhdHref={uhdFile} uhdFilename={`hcs-logo-${type}-${variant.id}-ultrahd.png`}
        hdLabel={`Download ${variant.label} ${type} HD`}
        uhdLabel={`Download ${variant.label} ${type} Ultra HD`}
      />
    </div>
  )
}

// ─── Banner cards ─────────────────────────────────────────────

const BANNER_BG   = '#0E0C0A'
const BANNER_INK  = '#F5F1EE'
const BANNER_MUTED = '#A29893'
const BANNER_ICON  = '#A64E51'

function BannerCard({ type, label, description }: {
  type: 'hero' | 'logo'
  label: string
  description: string
}) {
  const hdFile  = `${BASE}/brand/hcs-banner-${type}.png`
  const uhdFile = `${BASE}/brand/hcs-banner-${type}@2x.png`

  return (
    <div className="rounded-xl overflow-hidden flex flex-col ring-1 ring-rule-light">
      {/* Preview — 3:1 aspect, dark background matching the actual banner */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '3 / 1', backgroundColor: BANNER_BG }}>
        {/* Icon grid echo — single large logo on right, fading in */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            maskImage: 'radial-gradient(ellipse 55% 70% at 82% 50%, black 0%, transparent 85%)',
            WebkitMaskImage: 'radial-gradient(ellipse 55% 70% at 82% 50%, black 0%, transparent 85%)',
          }}
        >
          <div className="absolute right-[8%] top-1/2 -translate-y-1/2">
            <HCSLogoMark style={{ color: BANNER_ICON, width: 80, height: 80, opacity: 0.22 }} />
          </div>
        </div>

        {type === 'hero' && (
          <div className="absolute inset-0 flex flex-col justify-center px-8 gap-2">
            <p
              className="text-[7px] font-medium tracking-[0.13em] uppercase"
              style={{ color: BANNER_MUTED }}
            >
              Registered Health &amp; Social Care · England
            </p>
            <p
              className="font-display leading-tight"
              style={{
                fontSize: 'clamp(1.05rem, 2.6vw, 1.55rem)',
                fontVariationSettings: '"opsz" 64, "wght" 620',
                color: BANNER_INK,
              }}
            >
              Care that holds<br />people steady.
            </p>
            <p className="text-[7px] leading-relaxed" style={{ color: BANNER_MUTED }}>
              Home care, specialist support, and clinical staffing across England.
            </p>
          </div>
        )}

        {type === 'logo' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <HCSLogoMark style={{ color: BANNER_INK, width: 36, height: 36 }} />
            <p
              className="font-display"
              style={{
                fontSize: 'clamp(0.85rem, 2vw, 1.3rem)',
                fontVariationSettings: '"opsz" 64, "wght" 580',
                color: BANNER_INK,
              }}
            >
              Horizon Care Services
            </p>
            <p className="text-[7px] tracking-[0.13em] uppercase" style={{ color: BANNER_MUTED }}>
              Registered Health &amp; Social Care · England
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-cream-dim border-t border-rule-light px-4 py-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[12px] font-semibold text-ink-dark">{label}</p>
          <p className="text-[11px] text-ink-muted-dark mt-0.5">{description}</p>
        </div>
        <div className="flex items-center gap-0.5 flex-shrink-0">
          <DlBtn href={hdFile} filename={`hcs-banner-${type}.png`} label={`Download ${label} HD`}>HD</DlBtn>
          <DlBtn href={uhdFile} filename={`hcs-banner-${type}@2x.png`} label={`Download ${label} Ultra HD`}>Ultra HD</DlBtn>
        </div>
      </div>
    </div>
  )
}

// ─── App icon size ladder ─────────────────────────────────────

// Size ladder for app icon preview: small → large, bottom-aligned
const ICON_SIZES = [24, 40, 64, 96]

function AppIconCard({ variant }: { variant: ColorVariant }) {
  const hdFile  = `${BASE}/brand/hcs-icon-${variant.id}.png`
  const uhdFile = `${BASE}/brand/hcs-icon-${variant.id}@2x.png`

  return (
    <div className={cn('rounded-xl overflow-hidden flex flex-col', variant.hasBorder ? 'ring-1 ring-rule-light' : '')}>
      <div
        className="flex-1 flex items-end justify-center gap-2.5 px-4 pb-5 pt-8"
        style={{ backgroundColor: variant.bg, minHeight: 200 }}
      >
        {ICON_SIZES.map((size) => (
          <HCSLogoMark
            key={size}
            style={{ color: variant.fg, width: size, height: size, flexShrink: 0 }}
          />
        ))}
      </div>
      <CardFooter
        variant={variant}
        hdHref={hdFile}  hdFilename={`hcs-icon-${variant.id}-1024.png`}
        uhdHref={uhdFile} uhdFilename={`hcs-icon-${variant.id}-2048.png`}
        hdLabel={`Download ${variant.label} app icon 1024 px`}
        uhdLabel={`Download ${variant.label} app icon 2048 px`}
      />
    </div>
  )
}

const LOGO_SECTIONS: { type: LogoType; heading: string; sub: string }[] = [
  {
    type: 'stacked',
    heading: 'Logo — Stacked',
    sub: 'Mark with name below. Use for square-format placements and profile images.',
  },
  {
    type: 'lockup',
    heading: 'Logo — Horizontal',
    sub: 'Mark with name alongside. Primary lockup for headers, email signatures, and documents.',
  },
  {
    type: 'mark',
    heading: 'Logo Mark',
    sub: 'Standalone mark. Use only where Horizon Care Services is already identified by context.',
  },
]

export function BrandingGrid() {
  return (
    <section className="bg-cream py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-20 lg:space-y-28">

        {/* ── Logo sections ── */}
        {LOGO_SECTIONS.map(({ type, heading, sub }) => (
          <div key={type}>
            <div className="mb-8 lg:mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <h2
                  className="font-display text-ink-dark mb-2"
                  style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.65rem)', fontVariationSettings: '"opsz" 22, "wght" 620' }}
                >
                  {heading}
                </h2>
                <p className="text-ink-muted-dark text-[14px] leading-relaxed max-w-[60ch]">{sub}</p>
              </div>
              <p className="text-[11px] font-medium tracking-[0.12em] text-ink-muted-dark uppercase flex-shrink-0">
                5 colour variants
              </p>
            </div>
            <div
              className={cn(
                'grid gap-4',
                type === 'lockup'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
                  : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
              )}
            >
              {COLOR_VARIANTS.map((variant) => (
                <LogoCard key={variant.id} type={type} variant={variant} />
              ))}
            </div>
          </div>
        ))}

        {/* ── App Icons ── */}
        <div>
          <div className="mb-8 lg:mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <h2
                className="font-display text-ink-dark mb-2"
                style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.65rem)', fontVariationSettings: '"opsz" 22, "wght" 620' }}
              >
                App Icons
              </h2>
              <p className="text-ink-muted-dark text-[14px] leading-relaxed max-w-[60ch]">
                Tight-padded square mark for favicons, app store listings, and platform profile images.
                HD exports at 1024 × 1024 px; Ultra HD at 2048 × 2048 px.
              </p>
            </div>
            <p className="text-[11px] font-medium tracking-[0.12em] text-ink-muted-dark uppercase flex-shrink-0">
              5 colour variants
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {COLOR_VARIANTS.map((variant) => (
              <AppIconCard key={variant.id} variant={variant} />
            ))}
          </div>
        </div>

        {/* ── Banners ── */}
        <div>
          <div className="mb-8 lg:mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <h2
                className="font-display text-ink-dark mb-2"
                style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.65rem)', fontVariationSettings: '"opsz" 22, "wght" 620' }}
              >
                Banners
              </h2>
              <p className="text-ink-muted-dark text-[14px] leading-relaxed max-w-[60ch]">
                Full-width banner exports at 1920 × 640 px for social media headers, presentations, and documents.
                HD at 1×; Ultra HD at 2×.
              </p>
            </div>
            <p className="text-[11px] font-medium tracking-[0.12em] text-ink-muted-dark uppercase flex-shrink-0">
              2 layouts
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <BannerCard
              type="hero"
              label="Hero — Text"
              description='Headline "Care that holds people steady." with kicker and service areas strip.'
            />
            <BannerCard
              type="logo"
              label="Hero — Logo"
              description="Centred logo mark with name at display size and registered care subtitle."
            />
          </div>
        </div>

        {/* ── Brand Colours ── */}
        <div className="border-t border-rule-light pt-14">
          <p className="section-kicker text-ink-muted-dark mb-8">Brand Colours</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: 'Midnight Red', hex: '#5C1020', role: 'Primary brand' },
              { name: 'White',        hex: '#FFFFFF', role: 'Primary base',  border: true },
              { name: 'Cream',        hex: '#F7F3EE', role: 'Warm base',     border: true },
              { name: 'Charcoal',     hex: '#1C1814', role: 'Dark base' },
              { name: 'Deep',         hex: '#0E0C0A', role: 'Deepest dark' },
            ].map(({ name, hex, role, border }) => (
              <div key={hex} className="space-y-3">
                <div
                  className={cn('h-14 rounded-lg', border ? 'ring-1 ring-rule-light' : '')}
                  style={{ backgroundColor: hex }}
                />
                <div>
                  <p className="text-ink-dark text-[13px] font-semibold">{name}</p>
                  <p className="text-ink-muted-dark text-[11px] font-mono tracking-wide">{hex}</p>
                  <p className="text-ink-muted-dark text-[11px] mt-0.5">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Typography ── */}
        <div className="border-t border-rule-light pt-14">
          <p className="section-kicker text-ink-muted-dark mb-10">Typography</p>
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">

            {/* Source Serif 4 */}
            <div>
              <div className="mb-5 flex items-baseline gap-3">
                <p className="text-ink-dark text-[15px] font-semibold">Source Serif 4</p>
                <span className="text-[11px] font-mono tracking-wide text-ink-muted-dark uppercase">Display</span>
              </div>
              <div className="space-y-2 mb-7 overflow-hidden">
                <p
                  className="font-display text-ink-dark leading-none"
                  style={{ fontSize: '3rem', fontVariationSettings: '"opsz" 40, "wght" 600' }}
                >
                  Horizon Care
                </p>
                <p
                  className="font-display text-ink-dark"
                  style={{ fontSize: '1.5rem', fontVariationSettings: '"opsz" 24, "wght" 400' }}
                >
                  Compassionate care, every day.
                </p>
                <p
                  className="font-display text-ink-muted-dark"
                  style={{ fontSize: '1rem', fontVariationSettings: '"opsz" 10, "wght" 300' }}
                >
                  Supporting families across Greater Manchester
                </p>
              </div>
              <dl className="space-y-2 text-[12px]">
                <div className="flex gap-3">
                  <dt className="text-ink-muted-dark font-medium w-14 flex-shrink-0">Axes</dt>
                  <dd className="text-ink-dark font-mono">opsz 8–60 · wght 200–900</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="text-ink-muted-dark font-medium w-14 flex-shrink-0">Use for</dt>
                  <dd className="text-ink-muted-dark">Page titles, section headings, hero text, pull quotes, editorial display</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="text-ink-muted-dark font-medium w-14 flex-shrink-0">Avoid</dt>
                  <dd className="text-ink-muted-dark">Body copy under 14 px, data tables, UI controls</dd>
                </div>
              </dl>
            </div>

            {/* Bricolage Grotesque */}
            <div>
              <div className="mb-5 flex items-baseline gap-3">
                <p className="text-ink-dark text-[15px] font-semibold">Bricolage Grotesque</p>
                <span className="text-[11px] font-mono tracking-wide text-ink-muted-dark uppercase">Body · UI</span>
              </div>
              <div className="space-y-2 mb-7">
                <p
                  className="text-ink-dark leading-tight"
                  style={{ fontSize: '2rem', fontWeight: 700 }}
                >
                  Supporting families
                </p>
                <p
                  className="text-ink-dark"
                  style={{ fontSize: '1.25rem', fontWeight: 500 }}
                >
                  Across Greater Manchester.
                </p>
                <p className="text-ink-muted-dark text-sm">
                  Our care workers are selected for both clinical skill and the warmth that makes a real difference to daily life.
                </p>
              </div>
              <dl className="space-y-2 text-[12px]">
                <div className="flex gap-3">
                  <dt className="text-ink-muted-dark font-medium w-14 flex-shrink-0">Axes</dt>
                  <dd className="text-ink-dark font-mono">wdth 75–100 · wght 200–800</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="text-ink-muted-dark font-medium w-14 flex-shrink-0">Use for</dt>
                  <dd className="text-ink-muted-dark">Body copy, navigation, labels, buttons, captions, forms</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="text-ink-muted-dark font-medium w-14 flex-shrink-0">Avoid</dt>
                  <dd className="text-ink-muted-dark">Display sizes above 48 px, decorative editorial headings</dd>
                </div>
              </dl>
            </div>

          </div>
        </div>

        {/* ── Usage notes ── */}
        <div className="border-t border-rule-light pt-14 grid md:grid-cols-3 gap-10">
          {[
            {
              heading: 'Clear space',
              body: 'Maintain clear space around the logo equal to the height of the mark. Never crowd the logo with other elements.',
            },
            {
              heading: 'Minimum size',
              body: 'The horizontal lockup should not be reproduced smaller than 120 px wide. The standalone mark should not be smaller than 24 px.',
            },
            {
              heading: 'Misuse',
              body: 'Do not recolour, rotate, stretch, add effects, or rearrange elements of the logo. Use only the approved colour variants on this page.',
            },
          ].map(({ heading, body }) => (
            <div key={heading}>
              <p className="text-ink-dark text-[13px] font-semibold mb-2">{heading}</p>
              <p className="text-ink-muted-dark text-[14px] leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
