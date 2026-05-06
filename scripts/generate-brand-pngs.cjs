#!/usr/bin/env node
'use strict'

const fs = require('fs')
const path = require('path')
const sharp = require('../web/node_modules/sharp')

// ─── Mark path (smooth bezier) ───────────────────────────────
const MARK_PATH =
  'M515.40 396.40C576.24 342.59 644.61 277.25 728.29 263.36C851.52 242.90 951.60 377.80 950.91 490.87C950.46 565.17 919.50 634.46 880.18 696.31C790.82 836.84 645.82 933.72 475.58 920.80C290.64 906.76 89.27 699.94 75.56 516.69C64.58 369.86 194.72 216.68 348.24 278.17C411.57 303.54 463.95 353.25 515.40 396.40Z' +
  ' M578.00 466.90C610.43 496.81 642.74 527.23 680.35 550.69C697.92 561.66 717.01 571.30 737.20 576.43C874.16 611.22 877.82 389.94 749.56 377.46C727.71 375.33 705.92 381.52 686.21 390.43C645.56 408.79 611.76 438.46 578.00 466.90Z' +
  ' M792.40 657.50C770.53 663.58 748.89 669.14 725.96 667.27C606.30 657.54 503.24 529.99 422.10 454.36C388.13 422.71 343.75 376.20 293.10 375.24C272.85 374.86 252.53 382.08 235.89 393.34C167.11 439.88 179.12 531.41 209.11 597.12C231.19 645.48 262.44 689.53 301.78 725.39C416.34 829.83 536.96 841.51 671.24 764.17C719.05 736.64 756.48 698.66 792.40 657.50Z'

// ─── Colour variants ─────────────────────────────────────────
const VARIANTS = [
  { id: 'primary',  fg: '#5C1020', bg: '#FFFFFF' },
  { id: 'reversed', fg: '#FFFFFF', bg: '#5C1020' },
  { id: 'dark',     fg: '#FFFFFF', bg: '#1C1814' },
  { id: 'cream',    fg: '#5C1020', bg: '#F7F3EE' },
  { id: 'mono',     fg: '#1C1814', bg: '#FFFFFF' },
]

// ─── Banner colour tokens ─────────────────────────────────────
// Approximate hex conversions of the site's oklch tokens
const BG_DEEP    = '#0E0C0A'  // oklch(12% 0.008 50)
const INK_LIGHT  = '#F5F1EE'  // oklch(97% 0.005 56)
const INK_MUTED  = '#A29893'  // oklch(70% 0.014 44)
const ICON_COLOR = '#A64E51'  // oklch(55% 0.12 20) — hero icon grid tint

// ─── SVG builders ────────────────────────────────────────────
function fontFace(b64) {
  return `@font-face{font-family:'SS4';src:url('data:font/woff2;base64,${b64}') format('woff2');font-weight:200 900;}`
}

function markEl(fg, x, y, w, h) {
  return `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="0 0 1024 1024"><path fill="${fg}" fill-rule="evenodd" clip-rule="evenodd" d="${MARK_PATH}"/><circle cx="511.4" cy="201.7" r="99.6" fill="${fg}"/></svg>`
}

function textEl(fg, x, y, size, anchor, baseline, label) {
  return `<text x="${x}" y="${y}" font-family="SS4,serif" font-size="${size}" font-weight="600" font-variation-settings="&quot;opsz&quot; 40, &quot;wght&quot; 560" text-anchor="${anchor}" dominant-baseline="${baseline}" fill="${fg}">${label}</text>`
}

function svgMark(fg, bg, s = 1) {
  const W = 1024 * s, H = 1024 * s
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs><style></style></defs><rect width="${W}" height="${H}" fill="${bg}"/>${markEl(fg, 80 * s, 80 * s, 864 * s, 864 * s)}</svg>`
}

function svgStacked(fg, bg, fontB64, s = 1) {
  const W = 900 * s, H = 760 * s
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs><style>${fontFace(fontB64)}</style></defs><rect width="${W}" height="${H}" fill="${bg}"/>${markEl(fg, 170 * s, 20 * s, 560 * s, 560 * s)}${textEl(fg, 450 * s, 636 * s, 48 * s, 'middle', 'auto', 'Horizon Care Services')}</svg>`
}

function svgLockup(fg, bg, fontB64, s = 1) {
  const W = 1400 * s, H = 280 * s
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs><style>${fontFace(fontB64)}</style></defs><rect width="${W}" height="${H}" fill="${bg}"/>${markEl(fg, 60 * s, 40 * s, 200 * s, 200 * s)}${textEl(fg, 302 * s, 140 * s, 80 * s, 'start', 'middle', 'Horizon Care Services')}</svg>`
}

function svgIcon(fg, bg, s = 1) {
  // Tight-padded square for app icons (~5% padding)
  const W = 1024 * s, H = 1024 * s
  const pad = Math.round(51 * s)
  const markSize = W - pad * 2
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="${bg}"/>${markEl(fg, pad, pad, markSize, markSize)}</svg>`
}

// ─── Hero icon grid (replicates hero-icon-grid.tsx logic) ────
function seededFloat(seed) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

const ICON_POOL  = ['cross','cross','logo','logo','logo','logo','dot','dot','dot','shield','shield','heart','heart','ring']
const GRID_COLS  = 15
const GRID_ROWS  = 10

function buildBannerIcons() {
  const icons = []
  const placed = []
  let s = 419

  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
      const t = col / (GRID_COLS - 1)
      const fillProb = 0.18 + (1 - t) * 0.44
      if (seededFloat(s++) > fillProb) continue

      const cw   = 100 / GRID_COLS
      const ch   = 100 / GRID_ROWS
      const left = col * cw + seededFloat(s++) * cw * 1.15 - cw * 0.08
      const top  = row * ch + seededFloat(s++) * ch * 1.10 - ch * 0.05
      const type = ICON_POOL[Math.floor(seededFloat(s++) * ICON_POOL.length)]
      const raw  = Math.pow(seededFloat(s++), 1.5)
      const size = Math.floor(6 + t * 94 + raw * 12)
      const cPct = size / 13

      const overlaps = placed.some(p => {
        const dx = left - p.left
        const dy = (top - p.top) * 1.7
        return Math.sqrt(dx * dx + dy * dy) < cPct + p.cPct
      })
      if (overlaps) { s += 3; continue }

      const opacity = (0.04 + t * 0.24) + seededFloat(s++) * 0.09
      s += 2  // consume duration + delay seeds
      placed.push({ left, top, cPct })
      icons.push({ type, left, top, size, opacity })
    }
  }
  return icons
}

const BANNER_ICONS = buildBannerIcons()

function iconEl(icon, W, H, s) {
  const sz = icon.size * s
  const x  = (icon.left * W / 100) - sz / 2
  const y  = (icon.top  * H / 100) - sz / 2
  const op = icon.opacity.toFixed(3)
  const c  = ICON_COLOR

  if (icon.type === 'logo') {
    return `<svg x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${sz}" height="${sz}" viewBox="0 0 1024 1024" opacity="${op}"><path fill="${c}" fill-rule="evenodd" clip-rule="evenodd" d="${MARK_PATH}"/><circle cx="511.4" cy="201.7" r="99.6" fill="${c}"/></svg>`
  }
  let inner = ''
  if (icon.type === 'cross')  inner = `<rect x="8" y="2" width="8" height="20" rx="1.5" fill="${c}"/><rect x="2" y="8" width="20" height="8" rx="1.5" fill="${c}"/>`
  if (icon.type === 'dot')    inner = `<circle cx="12" cy="12" r="4.5" fill="${c}"/>`
  if (icon.type === 'shield') inner = `<path d="M12 2 L20 5.5 L20 11 C20 15.5 16.5 19.5 12 21 C7.5 19.5 4 15.5 4 11 L4 5.5 Z" fill="${c}"/>`
  if (icon.type === 'heart')  inner = `<path d="M12 20.5 C12 20.5 2.5 14 2.5 8.5 C2.5 5.5 4.9 3 8 3 C9.9 3 11.6 4 12 5.2 C12.4 4 14.1 3 16 3 C19.1 3 21.5 5.5 21.5 8.5 C21.5 14 12 20.5 12 20.5 Z" fill="${c}"/>`
  if (icon.type === 'ring')   inner = `<circle cx="12" cy="12" r="8" fill="none" stroke="${c}" stroke-width="2.5"/>`
  return `<svg x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${sz}" height="${sz}" viewBox="0 0 24 24" opacity="${op}">${inner}</svg>`
}

function iconGridSvg(W, H, s) {
  // Mask replicates: radial-gradient(ellipse 70% 62% at 80% 50%, black, transparent 90%)
  const cx = Math.round(W * 0.80)
  const cy = Math.round(H * 0.50)
  const r  = Math.round(W * 0.72)
  const defs = `<radialGradient id="ig-grad" cx="${cx}" cy="${cy}" r="${r}" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="white" stop-opacity="1"/><stop offset="88%" stop-color="white" stop-opacity="0"/></radialGradient><mask id="ig-mask"><rect width="${W}" height="${H}" fill="url(#ig-grad)"/></mask>`
  const els = BANNER_ICONS.map(icon => iconEl(icon, W, H, s)).join('')
  return `<defs>${defs}</defs><g mask="url(#ig-mask)">${els}</g>`
}

// ─── Banner: hero text layout ─────────────────────────────────
function svgHeroBanner(fontB64, s = 1) {
  const W = 1920 * s, H = 640 * s
  const lm = 80 * s

  // Vertical rhythm — content block centred in 600px content area (40px strip below)
  const fsKicker  = Math.round(11 * s)
  const fsHead    = Math.round(72 * s)
  const fsTag     = Math.round(17 * s)
  const fsAreas   = Math.round(11 * s)
  const lsKicker  = (fsKicker * 0.14).toFixed(2)
  const lsAreas   = (fsAreas  * 0.14).toFixed(2)

  const yKicker   = Math.round(195 * s)
  const yHead1    = Math.round(290 * s)
  const yHead2    = Math.round(374 * s)
  const yTag      = Math.round(412 * s)
  const yStripTop = Math.round(600 * s)
  const yAreas    = Math.round(626 * s)

  const fvHead = '&quot;opsz&quot; 64, &quot;wght&quot; 620'
  const fvTag  = '&quot;opsz&quot; 14, &quot;wght&quot; 300'

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs><style>${fontFace(fontB64)}</style></defs>
  <rect width="${W}" height="${H}" fill="${BG_DEEP}"/>
  ${iconGridSvg(W, H, s)}
  <text x="${lm}" y="${yKicker}" font-family="SS4,serif" font-size="${fsKicker}" font-weight="400" letter-spacing="${lsKicker}" fill="${INK_MUTED}">REGISTERED HEALTH &amp; SOCIAL CARE  ·  ENGLAND</text>
  <text x="${lm}" y="${yHead1}" font-family="SS4,serif" font-size="${fsHead}" font-variation-settings="${fvHead}" fill="${INK_LIGHT}">Care that holds</text>
  <text x="${lm}" y="${yHead2}" font-family="SS4,serif" font-size="${fsHead}" font-variation-settings="${fvHead}" fill="${INK_LIGHT}">people steady.</text>
  <text x="${lm}" y="${yTag}" font-family="SS4,serif" font-size="${fsTag}" font-variation-settings="${fvTag}" fill="${INK_MUTED}">Home care, specialist support, and clinical staffing across England.</text>
  <rect x="0" y="${yStripTop}" width="${W}" height="1" fill="${INK_LIGHT}" fill-opacity="0.12"/>
  <text x="${lm}" y="${yAreas}" font-family="SS4,serif" font-size="${fsAreas}" font-weight="400" letter-spacing="${lsAreas}" fill="${INK_MUTED}">BEDFORDSHIRE  ·  BUCKINGHAMSHIRE  ·  CAMBRIDGESHIRE  ·  HERTFORDSHIRE  ·  MANCHESTER  ·  LONDON</text>
</svg>`
}

// ─── Banner: logo centred layout ─────────────────────────────
function svgLogoBanner(fontB64, s = 1) {
  const W = 1920 * s, H = 640 * s

  const markSize  = Math.round(200 * s)
  const fsName    = Math.round(80  * s)
  const fsSub     = Math.round(13  * s)
  const lsSub     = (fsSub * 0.14).toFixed(2)

  // Content block: mark(200) + gap(28) + name(80) + gap(14) + sub(13) ≈ 335px, centred in 600px
  const blockTop  = Math.round(((600 - 335) / 2) * s)
  const mx        = Math.round(W / 2 - markSize / 2)
  const my        = blockTop
  const yName     = my + markSize + Math.round(28 * s) + fsName
  const ySub      = yName + Math.round(18 * s) + fsSub

  const fvName    = '&quot;opsz&quot; 64, &quot;wght&quot; 580'

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs><style>${fontFace(fontB64)}</style></defs>
  <rect width="${W}" height="${H}" fill="${BG_DEEP}"/>
  ${iconGridSvg(W, H, s)}
  ${markEl(INK_LIGHT, mx, my, markSize, markSize)}
  <text x="${Math.round(W / 2)}" y="${yName}" font-family="SS4,serif" font-size="${fsName}" font-variation-settings="${fvName}" text-anchor="middle" fill="${INK_LIGHT}">Horizon Care Services</text>
  <text x="${Math.round(W / 2)}" y="${ySub}" font-family="SS4,serif" font-size="${fsSub}" font-weight="300" letter-spacing="${lsSub}" text-anchor="middle" fill="${INK_MUTED}">REGISTERED HEALTH &amp; SOCIAL CARE  ·  ENGLAND</text>
</svg>`
}

// ─── Helpers ─────────────────────────────────────────────────
async function renderPng(svgStr, outPath) {
  await sharp(Buffer.from(svgStr))
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(outPath)
}

function findFont(mediaDir) {
  const known = path.join(mediaDir, 'cef856781ea24bd1-s.p.17m2ldfggy3u-.woff2')
  if (fs.existsSync(known)) return known
  const files = fs.readdirSync(mediaDir).filter(f => f.includes('.p.') && f.endsWith('.woff2'))
  if (!files.length) throw new Error('No preloaded woff2 found in ' + mediaDir)
  files.sort((a, b) => fs.statSync(path.join(mediaDir, b)).size - fs.statSync(path.join(mediaDir, a)).size)
  return path.join(mediaDir, files[0])
}

// ─── Main ────────────────────────────────────────────────────
async function main() {
  const outDir = path.join(__dirname, '../web/public/brand')
  fs.mkdirSync(outDir, { recursive: true })

  const mediaDir = path.join(__dirname, '../web/.next/static/media')
  const fontPath = findFont(mediaDir)
  const fontB64 = fs.readFileSync(fontPath).toString('base64')

  const jobs = []

  for (const v of VARIANTS) {
    // Logo variants — standard (1×), HD (2×), Ultra HD (4×)
    for (const [s, suffix] of [[1, ''], [2, '@2x'], [4, '@4x']]) {
      jobs.push({ file: `hcs-mark-${v.id}${suffix}.png`,    svg: svgMark(v.fg, v.bg, s) })
      jobs.push({ file: `hcs-stacked-${v.id}${suffix}.png`, svg: svgStacked(v.fg, v.bg, fontB64, s) })
      jobs.push({ file: `hcs-lockup-${v.id}${suffix}.png`,  svg: svgLockup(v.fg, v.bg, fontB64, s) })
    }
    // App icons — HD (1024×1024), Ultra HD (2048×2048)
    jobs.push({ file: `hcs-icon-${v.id}.png`,    svg: svgIcon(v.fg, v.bg, 1) })
    jobs.push({ file: `hcs-icon-${v.id}@2x.png`, svg: svgIcon(v.fg, v.bg, 2) })
  }

  // Banners — 1920×640 at 1× and 2×
  for (const [s, suffix] of [[1, ''], [2, '@2x']]) {
    jobs.push({ file: `hcs-banner-hero${suffix}.png`,  svg: svgHeroBanner(fontB64, s) })
    jobs.push({ file: `hcs-banner-logo${suffix}.png`,  svg: svgLogoBanner(fontB64, s) })
  }

  for (const { file, svg } of jobs) {
    const outPath = path.join(outDir, file)
    await renderPng(svg, outPath)
    console.log('  ✓', file)
  }

  console.log(`\nGenerated ${jobs.length} files → web/public/brand/`)
}

main().catch(err => { console.error(err); process.exit(1) })
