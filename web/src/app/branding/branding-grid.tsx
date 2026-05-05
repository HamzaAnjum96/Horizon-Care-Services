'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'
import { HCSLogoMark } from '@/components/hcs-logo'
import { cn } from '@/lib/utils'

const MARK_PATH =
  'M 543.6 923.2 L 484.9 923.2 L 483.8 922.1 L 464.6 921.0 L 463.5 919.8 L 456.7 919.8 L 455.6 918.7 L 431.9 915.3 L 401.4 907.4 L 372.1 897.3 L 350.7 888.3 L 313.4 869.1 L 279.6 847.6 L 248.0 823.9 L 219.8 799.1 L 198.9 778.3 L 173.0 748.9 L 151.5 720.7 L 121.1 672.2 L 107.5 645.1 L 96.3 618.1 L 80.5 567.3 L 75.9 543.6 L 74.8 528.9 L 73.7 527.8 L 72.6 493.9 L 71.4 492.8 L 74.8 448.8 L 79.3 426.3 L 88.4 398.1 L 92.9 386.8 L 110.9 352.9 L 129.0 329.2 L 149.8 308.4 L 183.7 284.7 L 199.5 276.8 L 223.2 267.7 L 246.9 262.1 L 264.9 261.0 L 266.1 259.8 L 303.3 261.0 L 327.0 265.5 L 348.4 272.3 L 363.1 277.9 L 390.2 291.4 L 425.1 314.0 L 469.1 350.1 L 515.4 396.4 L 550.4 360.3 L 581.9 332.1 L 612.4 308.4 L 642.9 289.2 L 673.3 274.5 L 704.9 264.4 L 723.0 261.0 L 730.9 261.0 L 732.0 259.8 L 769.2 259.8 L 770.4 261.0 L 778.3 261.0 L 796.3 264.4 L 814.4 270.0 L 851.6 288.1 L 877.5 307.2 L 898.4 328.1 L 919.8 358.6 L 927.7 373.2 L 936.8 394.7 L 943.5 416.1 L 948.1 436.4 L 950.3 460.1 L 951.4 461.2 L 951.4 475.9 L 952.6 477.0 L 951.4 517.6 L 950.3 518.8 L 949.2 537.9 L 948.1 539.1 L 944.7 562.8 L 939.0 585.3 L 928.9 615.8 L 913.1 653.0 L 888.3 698.2 L 858.9 739.9 L 827.3 777.1 L 799.7 804.8 L 779.4 822.8 L 754.6 842.0 L 729.7 858.9 L 694.8 879.2 L 692.5 879.2 L 663.2 893.9 L 642.9 900.7 L 639.5 902.9 L 595.5 915.3 L 565.0 919.8 L 563.9 921.0 L 544.7 922.1 L 543.6 923.2 Z' +
  ' M 772.1 581.9 L 790.7 579.1 L 806.5 572.4 L 816.6 565.6 L 828.5 553.7 L 834.1 545.8 L 842.0 527.8 L 845.4 513.1 L 845.4 504.1 L 846.5 503.0 L 846.5 483.8 L 845.4 482.7 L 844.3 466.9 L 840.9 452.2 L 834.1 434.2 L 827.3 421.7 L 816.1 405.9 L 799.7 390.7 L 789.5 383.9 L 761.3 372.7 L 746.7 371.5 L 745.5 370.4 L 717.3 371.5 L 689.1 379.4 L 662.1 393.0 L 635.0 412.2 L 603.4 440.4 L 578.0 466.9 L 591.5 482.7 L 636.1 526.1 L 660.9 545.3 L 684.6 559.9 L 708.3 571.2 L 728.6 578.0 L 745.5 581.4 L 755.7 581.4 L 756.8 582.5 L 772.1 581.9 Z' +
  ' M 530.6 816.6 L 566.2 812.7 L 603.4 803.6 L 639.5 790.1 L 680.1 768.7 L 710.6 747.2 L 732.0 729.2 L 764.2 695.9 L 782.2 673.3 L 792.4 657.5 L 774.9 664.9 L 759.1 668.3 L 752.3 668.3 L 751.2 669.4 L 717.3 669.4 L 716.2 668.3 L 707.2 668.3 L 684.6 663.7 L 645.1 650.2 L 614.7 634.4 L 592.1 619.7 L 548.1 584.8 L 502.4 539.1 L 439.2 466.9 L 407.6 433.0 L 382.3 409.9 L 357.4 391.8 L 330.4 378.3 L 315.7 373.8 L 303.3 372.7 L 302.2 371.5 L 278.5 371.5 L 262.7 374.9 L 250.3 379.4 L 232.2 389.6 L 220.9 398.6 L 206.8 413.8 L 197.8 427.4 L 191.0 440.9 L 186.5 453.3 L 182.0 472.5 L 179.7 505.2 L 180.9 506.4 L 182.0 531.2 L 185.4 549.2 L 197.8 591.0 L 217.0 632.7 L 238.4 667.7 L 267.7 704.9 L 296.5 733.7 L 329.2 759.6 L 364.2 781.1 L 399.2 796.9 L 444.3 810.4 L 455.6 811.5 L 462.4 813.8 L 469.1 813.8 L 470.3 814.9 L 478.2 814.9 L 479.3 816.1 L 492.8 816.1 L 493.9 817.2 L 530.6 816.6 Z'

type LogoType = 'stacked' | 'lockup' | 'mark'

interface ColorVariant {
  id: string
  label: string
  fg: string
  bg: string
  hasBorder: boolean
}

const COLOR_VARIANTS: ColorVariant[] = [
  { id: 'primary',  label: 'Primary',   fg: '#9B0D14', bg: '#FFFFFF', hasBorder: true  },
  { id: 'reversed', label: 'Reversed',  fg: '#FFFFFF', bg: '#9B0D14', hasBorder: false },
  { id: 'dark',     label: 'Dark',      fg: '#FFFFFF', bg: '#1C1814', hasBorder: false },
  { id: 'cream',    label: 'On Cream',  fg: '#9B0D14', bg: '#F7F3EE', hasBorder: true  },
  { id: 'mono',     label: 'Mono',      fg: '#1C1814', bg: '#FFFFFF', hasBorder: true  },
]

function buildMarkSvg(fg: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024"><path fill="${fg}" fill-rule="evenodd" clip-rule="evenodd" d="${MARK_PATH}"/><circle cx="511.4" cy="201.7" r="99.6" fill="${fg}"/></svg>`
}

function loadSvgImage(svgStr: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const blob = new Blob([svgStr], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const img = new Image()
    img.onload = () => { URL.revokeObjectURL(url); resolve(img) }
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('SVG load failed')) }
    img.src = url
  })
}

async function downloadPng(type: LogoType, variant: ColorVariant) {
  await document.fonts.ready

  let canvasW: number
  let canvasH: number

  if (type === 'mark') {
    canvasW = 1024; canvasH = 1024
  } else if (type === 'stacked') {
    canvasW = 900; canvasH = 840
  } else {
    canvasW = 1140; canvasH = 300
  }

  const canvas = document.createElement('canvas')
  canvas.width = canvasW
  canvas.height = canvasH
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = variant.bg
  ctx.fillRect(0, 0, canvasW, canvasH)

  const markImg = await loadSvgImage(buildMarkSvg(variant.fg))

  if (type === 'mark') {
    ctx.drawImage(markImg, 80, 80, 864, 864)

  } else if (type === 'stacked') {
    const markSize = 560
    const markX = (canvasW - markSize) / 2
    const markY = 30
    ctx.drawImage(markImg, markX, markY, markSize, markSize)

    ctx.fillStyle = variant.fg
    ctx.font = '600 50px "Source Serif 4", Georgia, serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    ctx.fillText('Horizon Care Services', canvasW / 2, markY + markSize + 20)

  } else {
    const markSize = 240
    const markY = (canvasH - markSize) / 2
    ctx.drawImage(markImg, 40, markY, markSize, markSize)

    ctx.fillStyle = variant.fg
    ctx.font = '600 54px "Source Serif 4", Georgia, serif'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.fillText('Horizon Care Services', 40 + markSize + 44, canvasH / 2)
  }

  canvas.toBlob((blob) => {
    if (!blob) return
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `hcs-logo-${type}-${variant.id}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }, 'image/png')
}

interface LogoCardProps {
  type: LogoType
  variant: ColorVariant
}

function LogoCard({ type, variant }: LogoCardProps) {
  const [busy, setBusy] = useState(false)

  async function handleDownload() {
    setBusy(true)
    try {
      await downloadPng(type, variant)
    } finally {
      setBusy(false)
    }
  }

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
          <HCSLogoMark
            className="w-20 h-20"
            style={{ color: variant.fg }}
          />
        )}

        {type === 'stacked' && (
          <div className="flex flex-col items-center gap-3">
            <HCSLogoMark
              className="w-16 h-16"
              style={{ color: variant.fg }}
            />
            <span
              className="font-display font-semibold text-[13px] leading-tight tracking-[-0.01em] whitespace-nowrap"
              style={{
                color: variant.fg,
                fontVariationSettings: '"opsz" 14, "wght" 600',
              }}
            >
              Horizon Care Services
            </span>
          </div>
        )}

        {type === 'lockup' && (
          <div className="flex items-center gap-3">
            <HCSLogoMark
              className="w-10 h-10 flex-shrink-0"
              style={{ color: variant.fg }}
            />
            <span
              className="font-display font-semibold text-[16px] leading-none tracking-[-0.01em] whitespace-nowrap"
              style={{
                color: variant.fg,
                fontVariationSettings: '"opsz" 16, "wght" 600',
              }}
            >
              Horizon Care Services
            </span>
          </div>
        )}
      </div>

      {/* Footer bar */}
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
        <button
          onClick={handleDownload}
          disabled={busy}
          className={cn(
            'inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.06em] uppercase px-3 py-1.5 rounded-md transition-colors flex-shrink-0',
            busy
              ? 'text-ink-muted-dark cursor-wait'
              : 'text-ink-dark hover:bg-ink-dark/6 active:bg-ink-dark/10',
          )}
          aria-label={`Download ${variant.label} ${type} PNG`}
        >
          <Download size={11} />
          PNG
        </button>
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

        {/* Colour reference strip */}
        <div className="border-t border-rule-light pt-14">
          <p className="section-kicker text-ink-muted-dark mb-8">Brand Colours</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: 'Crimson',    hex: '#9B0D14', role: 'Primary brand' },
              { name: 'White',      hex: '#FFFFFF',  role: 'Primary base',  border: true },
              { name: 'Cream',      hex: '#F7F3EE',  role: 'Warm base',     border: true },
              { name: 'Charcoal',   hex: '#1C1814',  role: 'Dark base' },
              { name: 'Deep',       hex: '#0E0C0A',  role: 'Deepest dark' },
            ].map(({ name, hex, role, border }) => (
              <div key={hex} className="space-y-3">
                <div
                  className={cn(
                    'h-14 rounded-lg',
                    border ? 'ring-1 ring-rule-light' : '',
                  )}
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
