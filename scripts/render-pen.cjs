#!/usr/bin/env node
'use strict'

// Renders the primary pen artwork by replicating the exact HTML/CSS layout
// from MerchCard in branding-grid.tsx — same font settings, same flex layout,
// same proportions — scaled to a 1400×300 canvas.
// Output: web/public/branding/Pen.png  (5600×1200 — 4× Ultra HD, no background)

const fs   = require('fs')
const path = require('path')
const http = require('http')
const { chromium } = require('/opt/node22/lib/node_modules/playwright')

const MARK_PATH =
  'M515.40 396.40C576.24 342.59 644.61 277.25 728.29 263.36C851.52 242.90 951.60 377.80 950.91 490.87C950.46 565.17 919.50 634.46 880.18 696.31C790.82 836.84 645.82 933.72 475.58 920.80C290.64 906.76 89.27 699.94 75.56 516.69C64.58 369.86 194.72 216.68 348.24 278.17C411.57 303.54 463.95 353.25 515.40 396.40Z' +
  ' M578.00 466.90C610.43 496.81 642.74 527.23 680.35 550.69C697.92 561.66 717.01 571.30 737.20 576.43C874.16 611.22 877.82 389.94 749.56 377.46C727.71 375.33 705.92 381.52 686.21 390.43C645.56 408.79 611.76 438.46 578.00 466.90Z' +
  ' M792.40 657.50C770.53 663.58 748.89 669.14 725.96 667.27C606.30 657.54 503.24 529.99 422.10 454.36C388.13 422.71 343.75 376.20 293.10 375.24C272.85 374.86 252.53 382.08 235.89 393.34C167.11 439.88 179.12 531.41 209.11 597.12C231.19 645.48 262.44 689.53 301.78 725.39C416.34 829.83 536.96 841.51 671.24 764.17C719.05 736.64 756.48 698.66 792.40 657.50Z'

const FG    = '#5C1020'
const W     = 1400
const H     = 300
const SCALE = 4   // output: 5600×1200

// Scale factor derived from the branding page preview card.
// Preview: mark=32px, gap=10px, padding=16px, total height≈68px → scale to 300px
const S = H / 68  // ≈ 4.41

const MARK_PX = Math.round(32 * S)       // ≈ 141
const GAP_PX  = Math.round(10 * S)       // ≈ 44
const PAD_PX  = Math.round(16 * S)       // ≈ 71
const NAME_PX = (11 * S).toFixed(2)      // ≈ 48.5
const URL_PX  = (8  * S).toFixed(2)      // ≈ 35.3
const MT_PX   = (2  * S).toFixed(2)      // ≈ 8.8  (mt-0.5 = 2px)

function startFontServer(fontPath) {
  return new Promise((resolve) => {
    const fontData = fs.readFileSync(fontPath)
    const server = http.createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'font/woff2', 'Access-Control-Allow-Origin': '*' })
      res.end(fontData)
    })
    server.listen(0, '127.0.0.1', () => {
      resolve({ server, url: `http://127.0.0.1:${server.address().port}/ss4.woff2` })
    })
  })
}

function findFont() {
  const mediaDir = path.join(__dirname, '../web/.next/static/media')
  const known = path.join(mediaDir, 'cef856781ea24bd1-s.p.17m2ldfggy3u-.woff2')
  if (fs.existsSync(known)) return known
  const files = fs.readdirSync(mediaDir)
    .filter(f => f.includes('.p.') && f.endsWith('.woff2'))
    .sort((a, b) => fs.statSync(path.join(mediaDir, b)).size - fs.statSync(path.join(mediaDir, a)).size)
  if (!files.length) throw new Error('Source Serif 4 woff2 not found')
  return path.join(mediaDir, files[0])
}

async function main() {
  const { server, url: fontUrl } = await startFontServer(findFont())

  // Exact replication of the branding page MerchCard pen layout.
  // Font settings match branding-grid.tsx exactly: opsz 14 / wght 600 for name,
  // opsz 10 / wght 300 for URL — same as the live preview.
  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: ${W}px; height: ${H}px; overflow: hidden; background: transparent; }

  @font-face {
    font-family: 'SS4';
    src: url('${fontUrl}') format('woff2');
    font-weight: 200 900;
    font-display: block;
  }

  .wrap {
    width: ${W}px;
    height: ${H}px;
    display: flex;
    align-items: center;
    padding: ${PAD_PX}px;
    gap: ${GAP_PX}px;
  }

  /* Mark SVG */
  .mark { flex-shrink: 0; width: ${MARK_PX}px; height: ${MARK_PX}px; }

  /* Text block */
  .texts { min-width: 0; overflow: hidden; }

  .name {
    font-family: 'SS4', Georgia, serif;
    font-size: ${NAME_PX}px;
    font-weight: 600;
    font-variation-settings: 'opsz' 14, 'wght' 600;
    color: ${FG};
    line-height: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .url {
    font-family: 'SS4', Georgia, serif;
    font-size: ${URL_PX}px;
    font-weight: 300;
    font-variation-settings: 'opsz' 10, 'wght' 300;
    color: ${FG};
    opacity: 0.62;
    line-height: 1.35;
    margin-top: ${MT_PX}px;
    white-space: nowrap;
  }
</style>
</head>
<body>
<div class="wrap">
  <svg class="mark" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
    <path fill="${FG}" fill-rule="evenodd" clip-rule="evenodd" d="${MARK_PATH}"/>
    <circle cx="511.4" cy="201.7" r="99.6" fill="${FG}"/>
  </svg>
  <div class="texts">
    <div class="name">Horizon Care Services</div>
    <div class="url">www.horizoncareservices.org</div>
  </div>
</div>
</body>
</html>`

  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: SCALE })
  const page = await ctx.newPage()

  await page.setContent(html, { waitUntil: 'networkidle' })
  await page.waitForFunction(() =>
    document.fonts.check("600 48px SS4") && document.fonts.check("300 35px SS4")
  , { timeout: 10000 })
  await page.waitForTimeout(200)

  const buf = await page.screenshot({ type: 'png', omitBackground: true, clip: { x: 0, y: 0, width: W, height: H } })
  await browser.close()
  server.close()

  const out = path.join(__dirname, '../web/public/branding/Pen.png')
  fs.writeFileSync(out, buf)
  console.log(`✓ ${out}  |  ${(buf.length/1024).toFixed(0)} KB  |  ${W*SCALE}×${H*SCALE} px`)
}

main().catch(err => { console.error(err); process.exit(1) })
