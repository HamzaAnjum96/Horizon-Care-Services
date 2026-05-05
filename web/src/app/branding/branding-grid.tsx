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
  { id: 'primary',  label: 'Primary',  fg: '#9B0D14', bg: '#FFFFFF', hasBorder: true  },
  { id: 'reversed', label: 'Reversed', fg: '#FFFFFF', bg: '#9B0D14', hasBorder: false },
  { id: 'dark',     label: 'Dark',     fg: '#FFFFFF', bg: '#1C1814', hasBorder: false },
  { id: 'cream',    label: 'On Cream', fg: '#9B0D14', bg: '#F7F3EE', hasBorder: true  },
  { id: 'mono',     label: 'Mono',     fg: '#1C1814', bg: '#FFFFFF', hasBorder: true  },
]

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

function LogoCard({ type, variant }: { type: LogoType; variant: ColorVariant }) {
  const file = `${BASE}/brand/hcs-${type}-${variant.id}.png`

  return (
    <div
      className={cn(
        'rounded-xl overflow-hidden flex flex-col',
        variant.hasBorder ? 'ring-1 ring-rule-light' : '',
      )}
    >
      {/* Preview */}
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

      {/* Footer */}
      <div className="bg-cream-dim border-t border-rule-light px-4 py-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <span
            className="w-3 h-3 rounded-full flex-shrink-0 ring-1 ring-black/10"
            style={{ backgroundColor: variant.fg }}
          />
          <span className="text-[11px] font-medium tracking-[0.1em] text-ink-muted-dark uppercase truncate">
            {variant.label}
          </span>
        </div>
        <a
          href={file}
          download={`hcs-logo-${type}-${variant.id}.png`}
          className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.06em] uppercase px-3 py-1.5 rounded-md transition-colors text-ink-dark hover:bg-ink-dark/6 active:bg-ink-dark/10"
          aria-label={`Download ${variant.label} ${type} PNG`}
        >
          <Download size={11} />
          PNG
        </a>
      </div>
    </div>
  )
}

const SECTIONS: { type: LogoType; heading: string; sub: string }[] = [
  {
    type: 'stacked',
    heading: 'Logo — Stacked',
    sub: 'Mark with name below. Use for square-format placements, app icons, and profile images.',
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

        {SECTIONS.map(({ type, heading, sub }) => (
          <div key={type}>
            <div className="mb-8 lg:mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <h2
                  className="font-display text-ink-dark mb-2"
                  style={{
                    fontSize: 'clamp(1.3rem, 2.2vw, 1.65rem)',
                    fontVariationSettings: '"opsz" 22, "wght" 620',
                  }}
                >
                  {heading}
                </h2>
                <p className="text-ink-muted-dark text-[14px] leading-relaxed max-w-[60ch]">
                  {sub}
                </p>
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

        {/* Colour reference */}
        <div className="border-t border-rule-light pt-14">
          <p className="section-kicker text-ink-muted-dark mb-8">Brand Colours</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: 'Crimson',  hex: '#9B0D14', role: 'Primary brand' },
              { name: 'White',    hex: '#FFFFFF',  role: 'Primary base',  border: true },
              { name: 'Cream',    hex: '#F7F3EE',  role: 'Warm base',     border: true },
              { name: 'Charcoal', hex: '#1C1814',  role: 'Dark base' },
              { name: 'Deep',     hex: '#0E0C0A',  role: 'Deepest dark' },
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

        {/* Usage notes */}
        <div className="border-t border-rule-light pt-14 grid md:grid-cols-3 gap-10">
          {[
            {
              heading: 'Clear space',
              body: 'Maintain clear space around the logo equal to the height of the mark. Never crowd the logo with other elements.',
            },
            {
              heading: 'Minimum size',
              body: 'The horizontal lockup should not be reproduced smaller than 120px wide. The standalone mark should not be smaller than 24px.',
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
