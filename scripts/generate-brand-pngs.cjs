#!/usr/bin/env node
'use strict'

/**
 * Brand asset generator
 *
 * Text-bearing assets (stacked/lockup logos, merch, banners) are rendered
 * via Playwright/Chromium with Source Serif 4 served from a local HTTP server.
 * Chromium silently drops base64 woff2 data URIs, so the font must be served
 * over http://localhost — see `startFontServer()`.
 *
 * Mark-only and icon assets (no text) use sharp.
 *
 * Prerequisites:
 *   npm run build   (in web/)  — emits the woff2 into .next/static/media/
 *   node scripts/generate-brand-pngs.cjs
 */

const fs   = require('fs')
const path = require('path')
const http = require('http')
const sharp = require('../web/node_modules/sharp')
const { chromium } = require('/opt/node22/lib/node_modules/playwright')

// ─── Mark path ───────────────────────────────────────────────
const MARK_PATH =
  'M515.40 396.40C576.24 342.59 644.61 277.25 728.29 263.36C851.52 242.90 951.60 377.80 950.91 490.87C950.46 565.17 919.50 634.46 880.18 696.31C790.82 836.84 645.82 933.72 475.58 920.80C290.64 906.76 89.27 699.94 75.56 516.69C64.58 369.86 194.72 216.68 348.24 278.17C411.57 303.54 463.95 353.25 515.40 396.40Z' +
  ' M578.00 466.90C610.43 496.81 642.74 527.23 680.35 550.69C697.92 561.66 717.01 571.30 737.20 576.43C874.16 611.22 877.82 389.94 749.56 377.46C727.71 375.33 705.92 381.52 686.21 390.43C645.56 408.79 611.76 438.46 578.00 466.90Z' +
  ' M792.40 657.50C770.53 663.58 748.89 669.14 725.96 667.27C606.30 657.54 503.24 529.99 422.10 454.36C388.13 422.71 343.75 376.20 293.10 375.24C272.85 374.86 252.53 382.08 235.89 393.34C167.11 439.88 179.12 531.41 209.11 597.12C231.19 645.48 262.44 689.53 301.78 725.39C416.34 829.83 536.96 841.51 671.24 764.17C719.05 736.64 756.48 698.66 792.40 657.50Z'

// ─── Colour variants ─────────────────────────────────────────
const VARIANTS = [
  { id: 'primary',  fg: '#5C1020', bg: '#FFFFFF', trFg: '#5C1020' },
  { id: 'reversed', fg: '#FFFFFF', bg: '#5C1020', trFg: '#FFFFFF' },
  { id: 'dark',     fg: '#FFFFFF', bg: '#1C1814', trFg: '#FFFFFF' },
  { id: 'cream',    fg: '#5C1020', bg: '#F7F3EE', trFg: '#F7F3EE' },
  { id: 'mono',     fg: '#1C1814', bg: '#FFFFFF', trFg: '#1C1814' },
]

// ─── Banner colour tokens ─────────────────────────────────────
const BG_DEEP    = '#0E0C0A'
const INK_LIGHT  = '#F5F1EE'
const INK_MUTED  = '#A29893'
const ICON_COLOR = '#A64E51'

// ─── Icon grid (banner) ───────────────────────────────────────
function seededFloat(seed) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}
const ICON_POOL = ['cross','cross','logo','logo','logo','logo','dot','dot','dot','shield','shield','heart','heart','ring']
const GRID_COLS = 15
const GRID_ROWS = 10

function buildBannerIcons() {
  const icons = [], placed = []
  let s = 419
  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
      const t = col / (GRID_COLS - 1)
      if (seededFloat(s++) > 0.18 + (1 - t) * 0.44) continue
      const cw = 100 / GRID_COLS, ch = 100 / GRID_ROWS
      const left = col * cw + seededFloat(s++) * cw * 1.15 - cw * 0.08
      const top  = row * ch + seededFloat(s++) * ch * 1.10 - ch * 0.05
      const type = ICON_POOL[Math.floor(seededFloat(s++) * ICON_POOL.length)]
      const raw  = Math.pow(seededFloat(s++), 1.5)
      const size = Math.floor(6 + t * 94 + raw * 12)
      const cPct = size / 13
      const overlaps = placed.some(p => {
        const dx = left - p.left, dy = (top - p.top) * 1.7
        return Math.sqrt(dx*dx + dy*dy) < cPct + p.cPct
      })
      if (overlaps) { s += 3; continue }
      const opacity = (0.04 + t * 0.24) + seededFloat(s++) * 0.09
      s += 2
      placed.push({ left, top, cPct })
      icons.push({ type, left, top, size, opacity })
    }
  }
  return icons
}
const BANNER_ICONS = buildBannerIcons()

function iconsSvgEls(W, H) {
  return BANNER_ICONS.map(icon => {
    const sz = icon.size, x = (icon.left*W/100)-sz/2, y = (icon.top*H/100)-sz/2
    const op = icon.opacity.toFixed(3), c = ICON_COLOR
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
  }).join('')
}

// ─── Mark SVG (sharp — no text) ──────────────────────────────
function markSvgEl(fg, x, y, w, h) {
  return `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="0 0 1024 1024"><path fill="${fg}" fill-rule="evenodd" clip-rule="evenodd" d="${MARK_PATH}"/><circle cx="511.4" cy="201.7" r="99.6" fill="${fg}"/></svg>`
}
function svgMark(fg, bg, s=1) {
  const W=1024*s, H=1024*s
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="${bg}"/>${markSvgEl(fg,80*s,80*s,864*s,864*s)}</svg>`
}
function svgMarkTr(fg, s=1) {
  const W=1024*s, H=1024*s
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${markSvgEl(fg,80*s,80*s,864*s,864*s)}</svg>`
}
function svgIcon(fg, bg, s=1) {
  const W=1024*s, pad=Math.round(51*s), ms=W-pad*2
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${W}"><rect width="${W}" height="${W}" fill="${bg}"/>${markSvgEl(fg,pad,pad,ms,ms)}</svg>`
}
function svgIconTr(fg, s=1) {
  const W=1024*s, pad=Math.round(51*s), ms=W-pad*2
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${W}">${markSvgEl(fg,pad,pad,ms,ms)}</svg>`
}

// ─── Font utilities ───────────────────────────────────────────
function findFont() {
  const mediaDir = path.join(__dirname, '../web/.next/static/media')
  const known = path.join(mediaDir, 'cef856781ea24bd1-s.p.17m2ldfggy3u-.woff2')
  if (fs.existsSync(known)) return known
  const files = fs.readdirSync(mediaDir)
    .filter(f => f.includes('.p.') && f.endsWith('.woff2'))
    .sort((a,b) => fs.statSync(path.join(mediaDir,b)).size - fs.statSync(path.join(mediaDir,a)).size)
  if (!files.length) throw new Error('Source Serif 4 woff2 not found — run npm run build in web/ first')
  return path.join(mediaDir, files[0])
}

function startFontServer(fontPath) {
  return new Promise(resolve => {
    const data = fs.readFileSync(fontPath)
    const server = http.createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'font/woff2', 'Access-Control-Allow-Origin': '*' })
      res.end(data)
    })
    server.listen(0, '127.0.0.1', () =>
      resolve({ server, url: `http://127.0.0.1:${server.address().port}/ss4.woff2` })
    )
  })
}

// ─── Playwright renderer ──────────────────────────────────────
// Shared browser instance, set in main()
let browser

async function renderHtml(html, { w, h, scale=1, transparent=false }) {
  const ctx  = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: scale })
  const page = await ctx.newPage()
  await page.setContent(html, { waitUntil: 'networkidle' })
  await page.waitForFunction(() => document.fonts.ready, { timeout: 10000 })
  await page.waitForTimeout(150)
  const buf = await page.screenshot({ type: 'png', omitBackground: transparent, clip: { x:0, y:0, width:w, height:h } })
  await ctx.close()
  return buf
}

// ─── CSS font-face snippet ────────────────────────────────────
function fontFaceStyle(url) {
  return `@font-face{font-family:'SS4';src:url('${url}') format('woff2');font-weight:200 900;font-display:block;}`
}

// ─── HTML builders ────────────────────────────────────────────
// Font-variation-settings match branding-grid.tsx exactly.
// Stacked preview: opsz 14, wght 560  |  tracking -0.01em
// Lockup  preview: opsz 16, wght 560  |  tracking -0.01em
// Pen     preview: name opsz 14/600, url opsz 10/300, phone opsz 10/600 (bold)
// Mug     preview: name opsz 14/600, url/phone opsz 10/300
// Banner  preview: headline opsz 64/620, name opsz 64/580

function markSvgInline(fg, w, h) {
  return `<svg viewBox="0 0 1024 1024" width="${w}" height="${h}" style="display:block;flex-shrink:0"><path fill="${fg}" fill-rule="evenodd" clip-rule="evenodd" d="${MARK_PATH}"/><circle cx="511.4" cy="201.7" r="99.6" fill="${fg}"/></svg>`
}

function base(fontUrl, w, h, bg) {
  const bgStyle = bg ? `background:${bg}` : 'background:transparent'
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${w}px;height:${h}px;overflow:hidden;${bgStyle}}
${fontFaceStyle(fontUrl)}
</style></head><body>`
}

// Stacked: 900×760. mark 560×560 centred top, name 48 px below.
// Matches branding-grid.tsx stacked card: opsz 14, wght 560.
function buildStackedHtml(fg, bg, fontUrl) {
  return base(fontUrl, 900, 760, bg) + `
<div style="width:900px;height:760px;display:flex;flex-direction:column;align-items:center;padding-top:20px;gap:16px">
  ${markSvgInline(fg, 560, 560)}
  <div style="font-family:SS4,serif;font-size:48px;font-weight:560;font-variation-settings:'opsz' 14,'wght' 560;color:${fg};line-height:1;letter-spacing:-0.01em;white-space:nowrap">Horizon Care Services</div>
</div>
</body></html>`
}

// Lockup: 1400×280. mark 200×200 left, name alongside.
// Matches branding-grid.tsx lockup card: opsz 16, wght 560.
function buildLockupHtml(fg, bg, fontUrl) {
  return base(fontUrl, 1400, 280, bg) + `
<div style="width:1400px;height:280px;display:flex;align-items:center;padding-left:60px;gap:42px">
  ${markSvgInline(fg, 200, 200)}
  <div style="font-family:SS4,serif;font-size:80px;font-weight:560;font-variation-settings:'opsz' 16,'wght' 560;color:${fg};line-height:1;letter-spacing:-0.01em;white-space:nowrap">Horizon Care Services</div>
</div>
</body></html>`
}

// Pen: 1400×300. Proportions scaled from branding page preview card (S = 300/68).
// Phone number is bold (wght 600) as requested.
function buildPenHtml(fg, bg, fontUrl) {
  const S    = 300 / 68
  const mark = Math.round(32 * S)
  const gap  = Math.round(10 * S)
  const pad  = Math.round(16 * S)
  const name = (11 * S).toFixed(1)
  const sub  = (8  * S).toFixed(1)
  const mt   = (2  * S).toFixed(1)
  return base(fontUrl, 1400, 300, bg) + `
<div style="width:1400px;height:300px;display:flex;align-items:center;padding:0 ${pad}px;gap:${gap}px">
  ${markSvgInline(fg, mark, mark)}
  <div style="min-width:0;overflow:hidden">
    <div style="font-family:SS4,serif;font-size:${name}px;font-weight:600;font-variation-settings:'opsz' 14,'wght' 600;color:${fg};line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Horizon Care Services</div>
    <div style="font-family:SS4,serif;font-size:${sub}px;font-weight:600;font-variation-settings:'opsz' 10,'wght' 600;color:${fg};line-height:1.35;margin-top:${mt}px;white-space:nowrap">www.horizoncareservices.org</div>
    <div style="font-family:SS4,serif;font-size:${sub}px;font-weight:600;font-variation-settings:'opsz' 10,'wght' 600;color:${fg};line-height:1.35;margin-top:${mt}px;white-space:nowrap">020 3757 2767</div>
  </div>
</div>
</body></html>`
}

// Mug: 900×900. mark 420×420 centred top, text centred below.
// Matches branding-grid.tsx mug card: name opsz 14/600, sub opsz 10/300.
function buildMugHtml(fg, bg, fontUrl, withPhone) {
  const nameSize = withPhone ? 62 : 68
  const subSize  = withPhone ? 28 : 32
  const yGap     = withPhone ? 14 : 20
  return base(fontUrl, 900, 900, bg) + `
<div style="width:900px;height:900px;display:flex;flex-direction:column;align-items:center;padding-top:60px;gap:${yGap}px">
  ${markSvgInline(fg, 420, 420)}
  <div style="font-family:SS4,serif;font-size:${nameSize}px;font-weight:600;font-variation-settings:'opsz' 14,'wght' 600;color:${fg};line-height:1;white-space:nowrap;text-align:center">Horizon Care Services</div>
  <div style="font-family:SS4,serif;font-size:${subSize}px;font-weight:600;font-variation-settings:'opsz' 10,'wght' 600;color:${fg};line-height:1;white-space:nowrap;text-align:center">www.horizoncareservices.org</div>
  ${withPhone ? `<div style="font-family:SS4,serif;font-size:${subSize}px;font-weight:600;font-variation-settings:'opsz' 10,'wght' 600;color:${fg};line-height:1;white-space:nowrap;text-align:center">020 3757 2767</div>` : ''}
</div>
</body></html>`
}

// Banner hero: 1920×640.
// Headline opsz 64/620, tag opsz 14/300 — matches branding-grid.tsx BannerCard.
function buildBannerHeroHtml(fontUrl) {
  const W=1920, H=640, lm=80
  const cx=Math.round(W*0.80), cy=Math.round(H*0.50), r=Math.round(W*0.72)
  const iconsSvg = iconsSvgEls(W, H)
  return base(fontUrl, W, H, BG_DEEP) + `
<div style="position:relative;width:${W}px;height:${H}px;overflow:hidden;background:${BG_DEEP}">
  <div style="position:absolute;inset:0;-webkit-mask-image:radial-gradient(circle ${r}px at ${cx}px ${cy}px, black 0%, transparent 88%)">
    <svg width="${W}" height="${H}" style="display:block">${iconsSvg}</svg>
  </div>
  <div style="position:absolute;left:${lm}px;top:195px;display:flex;flex-direction:column;gap:18px">
    <div style="font-family:SS4,serif;font-size:11px;font-weight:400;color:${INK_MUTED};letter-spacing:0.14em;text-transform:uppercase">HEALTHCARE STAFFING  ·  ENGLAND</div>
    <div style="font-family:SS4,serif;font-size:72px;font-weight:620;font-variation-settings:'opsz' 64,'wght' 620;color:${INK_LIGHT};line-height:1.1">Staffing that holds<br>care steady.</div>
    <div style="font-family:SS4,serif;font-size:17px;font-weight:300;font-variation-settings:'opsz' 14,'wght' 300;color:${INK_MUTED}">Reliable healthcare staffing for NHS and care providers across England.</div>
  </div>
  <div style="position:absolute;top:600px;left:0;right:0;height:1px;background:rgba(245,241,238,0.12)"></div>
  <div style="position:absolute;left:${lm}px;top:626px;font-family:SS4,serif;font-size:11px;font-weight:400;color:${INK_MUTED};letter-spacing:0.14em;text-transform:uppercase">BEDFORDSHIRE  ·  GREATER MANCHESTER  ·  MERSEYSIDE  ·  LANCASHIRE  ·  YORKSHIRE</div>
</div>
</body></html>`
}

// Banner logo: 1920×640.
// Name opsz 64/580 — matches branding-grid.tsx BannerCard logo variant.
function buildBannerLogoHtml(fontUrl) {
  const W=1920, H=640
  const cx=Math.round(W*0.80), cy=Math.round(H*0.50), r=Math.round(W*0.72)
  const iconsSvg = iconsSvgEls(W, H)
  const markSize=200, mx=Math.round(W/2-markSize/2)
  const blockTop=132
  return base(fontUrl, W, H, BG_DEEP) + `
<div style="position:relative;width:${W}px;height:${H}px;overflow:hidden;background:${BG_DEEP}">
  <div style="position:absolute;inset:0;-webkit-mask-image:radial-gradient(circle ${r}px at ${cx}px ${cy}px, black 0%, transparent 88%)">
    <svg width="${W}" height="${H}" style="display:block">${iconsSvg}</svg>
  </div>
  <div style="position:absolute;top:${blockTop}px;left:0;right:0;display:flex;flex-direction:column;align-items:center;gap:28px">
    ${markSvgInline(INK_LIGHT, markSize, markSize)}
    <div style="font-family:SS4,serif;font-size:80px;font-weight:580;font-variation-settings:'opsz' 64,'wght' 580;color:${INK_LIGHT};line-height:1;letter-spacing:-0.01em;white-space:nowrap">Horizon Care Services</div>
    <div style="font-family:SS4,serif;font-size:13px;font-weight:300;color:${INK_MUTED};letter-spacing:0.14em;text-transform:uppercase">HEALTHCARE STAFFING  ·  ENGLAND</div>
  </div>
</div>
</body></html>`
}

// ─── Merch SVG (embedded font, vector download) ───────────────
function fontFaceSvg(b64) {
  return `@font-face{font-family:'SS4';src:url('data:font/woff2;base64,${b64}') format('woff2');font-weight:200 900;}`
}

// Pen SVG (with phone, phone bold)
function buildPenSvg(fg, fontB64) {
  const S=300/68, mark=Math.round(32*S), gap=Math.round(10*S), pad=Math.round(16*S)
  const name=(11*S).toFixed(1), sub=(8*S).toFixed(1), mt=(2*S).toFixed(1)
  const tx = pad + mark + gap
  const yName = Math.round(300/2 - (parseFloat(name)*0.5 + parseFloat(mt) + parseFloat(sub) + parseFloat(mt) + parseFloat(sub)) / 2 + parseFloat(name)*0.8)
  const yUrl  = yName + Math.round(parseFloat(name)*0.3 + parseFloat(mt) + parseFloat(sub)*0.8)
  const yPhone = yUrl + Math.round(parseFloat(mt) + parseFloat(sub))
  const markY = Math.round((300 - mark) / 2)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="300"><defs><style>${fontFaceSvg(fontB64)}</style></defs>` +
    `<svg x="${pad}" y="${markY}" width="${mark}" height="${mark}" viewBox="0 0 1024 1024"><path fill="${fg}" fill-rule="evenodd" clip-rule="evenodd" d="${MARK_PATH}"/><circle cx="511.4" cy="201.7" r="99.6" fill="${fg}"/></svg>` +
    `<text x="${tx}" y="${yName}" font-family="SS4,serif" font-size="${name}" font-weight="600" font-variation-settings="&quot;opsz&quot; 14, &quot;wght&quot; 600" fill="${fg}">Horizon Care Services</text>` +
    `<text x="${tx}" y="${yUrl}" font-family="SS4,serif" font-size="${sub}" font-weight="600" font-variation-settings="&quot;opsz&quot; 10, &quot;wght&quot; 600" fill="${fg}">www.horizoncareservices.org</text>` +
    `<text x="${tx}" y="${yPhone}" font-family="SS4,serif" font-size="${sub}" font-weight="600" font-variation-settings="&quot;opsz&quot; 10, &quot;wght&quot; 600" fill="${fg}">020 3757 2767</text>` +
    `</svg>`
}

// Mug SVG
function buildMugSvg(fg, fontB64, withPhone) {
  const W=900, H=900, mw=420, mx=Math.round((W-mw)/2), my=60
  const cx=Math.round(W/2)
  const nameSize=withPhone?62:68, subSize=withPhone?28:32
  const yName=withPhone?530:550, yUrl=withPhone?602:624
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs><style>${fontFaceSvg(fontB64)}</style></defs>` +
    `<svg x="${mx}" y="${my}" width="${mw}" height="${mw}" viewBox="0 0 1024 1024"><path fill="${fg}" fill-rule="evenodd" clip-rule="evenodd" d="${MARK_PATH}"/><circle cx="511.4" cy="201.7" r="99.6" fill="${fg}"/></svg>` +
    `<text x="${cx}" y="${yName}" font-family="SS4,serif" font-size="${nameSize}" font-weight="600" font-variation-settings="&quot;opsz&quot; 14, &quot;wght&quot; 600" text-anchor="middle" fill="${fg}">Horizon Care Services</text>` +
    `<text x="${cx}" y="${yUrl}" font-family="SS4,serif" font-size="${subSize}" font-weight="600" font-variation-settings="&quot;opsz&quot; 10, &quot;wght&quot; 600" text-anchor="middle" fill="${fg}">www.horizoncareservices.org</text>` +
    (withPhone ? `<text x="${cx}" y="${Math.round(yUrl+subSize+10)}" font-family="SS4,serif" font-size="${subSize}" font-weight="600" font-variation-settings="&quot;opsz&quot; 10, &quot;wght&quot; 600" text-anchor="middle" fill="${fg}">020 3757 2767</text>` : '') +
    `</svg>`
}

// ─── Sharp renderer (mark/icon — no text) ────────────────────
async function renderSharp(svgStr, outPath) {
  await sharp(Buffer.from(svgStr)).png({ compressionLevel: 9 }).toFile(outPath)
}

// ─── Main ────────────────────────────────────────────────────
async function main() {
  const outDir  = path.join(__dirname, '../web/public/brand')
  fs.mkdirSync(outDir, { recursive: true })

  const fontPath = findFont()
  const fontB64  = fs.readFileSync(fontPath).toString('base64')
  const { server, url: fontUrl } = await startFontServer(fontPath)

  browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  async function savePng(html, file, opts) {
    const buf = await renderHtml(html, opts)
    fs.writeFileSync(path.join(outDir, file), buf)
    console.log('  ✓', file)
  }
  async function saveSharp(svgStr, file) {
    await renderSharp(svgStr, path.join(outDir, file))
    console.log('  ✓', file)
  }
  function saveSvg(content, file) {
    fs.writeFileSync(path.join(outDir, file), content, 'utf8')
    console.log('  ✓', file)
  }

  for (const v of VARIANTS) {
    // ── Mark (sharp, no text) ──
    for (const [s, sx] of [[1,''], [2,'@2x'], [4,'@4x']]) {
      await saveSharp(svgMark(v.fg, v.bg, s),  `hcs-mark-${v.id}${sx}.png`)
    }
    for (const [s, sx] of [[1,''], [2,'@2x']]) {
      await saveSharp(svgMarkTr(v.trFg, s), `hcs-mark-${v.id}-tr${sx}.png`)
    }

    // ── Icons (sharp, no text) ──
    await saveSharp(svgIcon(v.fg, v.bg, 1),   `hcs-icon-${v.id}.png`)
    await saveSharp(svgIcon(v.fg, v.bg, 2),   `hcs-icon-${v.id}@2x.png`)
    await saveSharp(svgIconTr(v.trFg, 1),     `hcs-icon-${v.id}-tr.png`)
    await saveSharp(svgIconTr(v.trFg, 2),     `hcs-icon-${v.id}-tr@2x.png`)

    // ── Stacked logo (Playwright) ──
    const stackedSolid = buildStackedHtml(v.fg, v.bg, fontUrl)
    const stackedTr    = buildStackedHtml(v.trFg, null, fontUrl)
    for (const [s, sx] of [[1,''], [2,'@2x'], [4,'@4x']]) {
      await savePng(stackedSolid, `hcs-stacked-${v.id}${sx}.png`, { w:900, h:760, scale:s })
    }
    for (const [s, sx] of [[1,''], [2,'@2x']]) {
      await savePng(stackedTr, `hcs-stacked-${v.id}-tr${sx}.png`, { w:900, h:760, scale:s, transparent:true })
    }

    // ── Lockup logo (Playwright) ──
    const lockupSolid = buildLockupHtml(v.fg, v.bg, fontUrl)
    const lockupTr    = buildLockupHtml(v.trFg, null, fontUrl)
    for (const [s, sx] of [[1,''], [2,'@2x'], [4,'@4x']]) {
      await savePng(lockupSolid, `hcs-lockup-${v.id}${sx}.png`, { w:1400, h:280, scale:s })
    }
    for (const [s, sx] of [[1,''], [2,'@2x']]) {
      await savePng(lockupTr, `hcs-lockup-${v.id}-tr${sx}.png`, { w:1400, h:280, scale:s, transparent:true })
    }

    // ── Pen — with phone only (Playwright) ──
    const penSolid = buildPenHtml(v.fg, v.bg, fontUrl)
    const penTr    = buildPenHtml(v.trFg, null, fontUrl)
    for (const [s, sx] of [[1,''], [2,'@2x'], [4,'@4x']]) {
      await savePng(penSolid, `hcs-merch-pen-${v.id}-phone${sx}.png`, { w:1400, h:300, scale:s })
    }
    for (const [s, sx] of [[1,''], [2,'@2x']]) {
      await savePng(penTr, `hcs-merch-pen-${v.id}-phone-tr${sx}.png`, { w:1400, h:300, scale:s, transparent:true })
    }
    saveSvg(buildPenSvg(v.trFg, fontB64), `hcs-merch-pen-${v.id}-phone-tr.svg`)

    // ── Mug — with and without phone (Playwright) ──
    for (const withPhone of [false, true]) {
      const ps = withPhone ? '-phone' : ''
      const mugSolid = buildMugHtml(v.fg, v.bg, fontUrl, withPhone)
      const mugTr    = buildMugHtml(v.trFg, null, fontUrl, withPhone)
      for (const [s, sx] of [[1,''], [2,'@2x'], [4,'@4x']]) {
        await savePng(mugSolid, `hcs-merch-mug-${v.id}${ps}${sx}.png`, { w:900, h:900, scale:s })
      }
      for (const [s, sx] of [[1,''], [2,'@2x']]) {
        await savePng(mugTr, `hcs-merch-mug-${v.id}${ps}-tr${sx}.png`, { w:900, h:900, scale:s, transparent:true })
      }
      saveSvg(buildMugSvg(v.trFg, fontB64, withPhone), `hcs-merch-mug-${v.id}${ps}-tr.svg`)
    }
  }

  // ── Banners (Playwright) ──
  const heroHtml = buildBannerHeroHtml(fontUrl)
  const logoHtml = buildBannerLogoHtml(fontUrl)
  for (const [s, sx] of [[1,''], [2,'@2x']]) {
    await savePng(heroHtml, `hcs-banner-hero${sx}.png`, { w:1920, h:640, scale:s })
    await savePng(logoHtml, `hcs-banner-logo${sx}.png`, { w:1920, h:640, scale:s })
  }

  await browser.close()
  server.close()
  console.log('\nDone.')
}

main().catch(err => { console.error(err); process.exit(1) })
