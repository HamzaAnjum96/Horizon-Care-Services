#!/usr/bin/env node
'use strict'

// Renders the primary pen artwork via Playwright/Chromium.
// Serves the font over localhost so Chromium actually loads it
// (base64 data URIs for woff2 are silently dropped by Chromium).
// Output: web/public/branding/Pen.png  (5600×1200 — 4× Ultra HD, no background)

const fs      = require('fs')
const path    = require('path')
const http    = require('http')
const { chromium } = require('/opt/node22/lib/node_modules/playwright')

const MARK_PATH =
  'M515.40 396.40C576.24 342.59 644.61 277.25 728.29 263.36C851.52 242.90 951.60 377.80 950.91 490.87C950.46 565.17 919.50 634.46 880.18 696.31C790.82 836.84 645.82 933.72 475.58 920.80C290.64 906.76 89.27 699.94 75.56 516.69C64.58 369.86 194.72 216.68 348.24 278.17C411.57 303.54 463.95 353.25 515.40 396.40Z' +
  ' M578.00 466.90C610.43 496.81 642.74 527.23 680.35 550.69C697.92 561.66 717.01 571.30 737.20 576.43C874.16 611.22 877.82 389.94 749.56 377.46C727.71 375.33 705.92 381.52 686.21 390.43C645.56 408.79 611.76 438.46 578.00 466.90Z' +
  ' M792.40 657.50C770.53 663.58 748.89 669.14 725.96 667.27C606.30 657.54 503.24 529.99 422.10 454.36C388.13 422.71 343.75 376.20 293.10 375.24C272.85 374.86 252.53 382.08 235.89 393.34C167.11 439.88 179.12 531.41 209.11 597.12C231.19 645.48 262.44 689.53 301.78 725.39C416.34 829.83 536.96 841.51 671.24 764.17C719.05 736.64 756.48 698.66 792.40 657.50Z'

const FG    = '#5C1020'
const W     = 1400
const H     = 300
const SCALE = 4

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

function startFontServer(fontPath) {
  return new Promise((resolve) => {
    const fontData = fs.readFileSync(fontPath)
    const server = http.createServer((req, res) => {
      res.writeHead(200, {
        'Content-Type': 'font/woff2',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store',
      })
      res.end(fontData)
    })
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address()
      resolve({ server, url: `http://127.0.0.1:${port}/ss4.woff2` })
    })
  })
}

async function main() {
  const fontPath = findFont()
  const { server, url: fontUrl } = await startFontServer(fontPath)

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; }
  html, body { width: ${W}px; height: ${H}px; overflow: hidden; background: transparent; }
  @font-face {
    font-family: 'SS4';
    src: url('${fontUrl}') format('woff2');
    font-weight: 200 900;
    font-display: block;
  }
</style>
</head>
<body>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" style="display:block">

  <!-- Mark -->
  <svg x="30" y="30" width="240" height="240" viewBox="0 0 1024 1024">
    <path fill="${FG}" fill-rule="evenodd" clip-rule="evenodd" d="${MARK_PATH}"/>
    <circle cx="511.4" cy="201.7" r="99.6" fill="${FG}"/>
  </svg>

  <!-- Name -->
  <text
    x="310" y="152"
    font-family="SS4, Georgia, serif"
    font-size="80"
    font-weight="600"
    font-variation-settings="'opsz' 28, 'wght' 600"
    fill="${FG}"
  >Horizon Care Services</text>

  <!-- Website -->
  <text
    x="310" y="208"
    font-family="SS4, Georgia, serif"
    font-size="32"
    font-weight="300"
    font-variation-settings="'opsz' 10, 'wght' 300"
    fill="${FG}"
    fill-opacity="0.62"
  >www.horizoncareservices.org</text>

</svg>
</body>
</html>`

  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const ctx = await browser.newContext({
    viewport:          { width: W, height: H },
    deviceScaleFactor: SCALE,
  })
  const page = await ctx.newPage()

  await page.setContent(html, { waitUntil: 'networkidle' })

  // Wait until SS4 is fully loaded and painted
  await page.waitForFunction(() =>
    document.fonts.check("600 80px SS4") && document.fonts.check("300 32px SS4")
  , { timeout: 10000 })

  // One extra tick for layout to settle
  await page.waitForTimeout(200)

  const buf = await page.screenshot({
    type:           'png',
    omitBackground: true,
    clip:           { x: 0, y: 0, width: W, height: H },
  })

  await browser.close()
  server.close()

  const out = path.join(__dirname, '../web/public/branding/Pen.png')
  fs.writeFileSync(out, buf)
  console.log(`✓ ${out}`)
  console.log(`  ${(buf.length / 1024).toFixed(0)} KB  |  ${W * SCALE}×${H * SCALE} px`)
}

main().catch(err => { console.error(err); process.exit(1) })
