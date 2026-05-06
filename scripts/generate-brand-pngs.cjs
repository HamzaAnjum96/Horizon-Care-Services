#!/usr/bin/env node
'use strict'

const https = require('https')
const fs = require('fs')
const path = require('path')
const sharp = require('../web/node_modules/sharp')

// ─── Mark path ───────────────────────────────────────────────
const MARK_PATH =
  'M515.40 396.40C576.24 342.59 644.61 277.25 728.29 263.36C851.52 242.90 951.60 377.80 950.91 490.87C950.46 565.17 919.50 634.46 880.18 696.31C790.82 836.84 645.82 933.72 475.58 920.80C290.64 906.76 89.27 699.94 75.56 516.69C64.58 369.86 194.72 216.68 348.24 278.17C411.57 303.54 463.95 353.25 515.40 396.40Z' +
  ' M578.00 466.90C610.43 496.81 642.74 527.23 680.35 550.69C697.92 561.66 717.01 571.30 737.20 576.43C874.16 611.22 877.82 389.94 749.56 377.46C727.71 375.33 705.92 381.52 686.21 390.43C645.56 408.79 611.76 438.46 578.00 466.90Z' +
  ' M792.40 657.50C770.53 663.58 748.89 669.14 725.96 667.27C606.30 657.54 503.24 529.99 422.10 454.36C388.13 422.71 343.75 376.20 293.10 375.24C272.85 374.86 252.53 382.08 235.89 393.34C167.11 439.88 179.12 531.41 209.11 597.12C231.19 645.48 262.44 689.53 301.78 725.39C416.34 829.83 536.96 841.51 671.24 764.17C719.05 736.64 756.48 698.66 792.40 657.50Z'

// ─── Colour variants ─────────────────────────────────────────
const VARIANTS = [
  { id: 'primary',  fg: '#9B0D14', bg: '#FFFFFF' },
  { id: 'reversed', fg: '#FFFFFF', bg: '#9B0D14' },
  { id: 'dark',     fg: '#FFFFFF', bg: '#1C1814' },
  { id: 'cream',    fg: '#9B0D14', bg: '#F7F3EE' },
  { id: 'mono',     fg: '#1C1814', bg: '#FFFFFF' },
]

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

function svgMark(fg, bg) {
  // 1024×1024 with 80px padding on each side
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024"><defs><style></style></defs><rect width="1024" height="1024" fill="${bg}"/>${markEl(fg, 80, 80, 864, 864)}</svg>`
}

function svgStacked(fg, bg, fontB64) {
  // 900×760 — mark 560px element centred, name below
  return `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="760"><defs><style>${fontFace(fontB64)}</style></defs><rect width="900" height="760" fill="${bg}"/>${markEl(fg, 170, 20, 560, 560)}${textEl(fg, 450, 636, 48, 'middle', 'auto', 'Horizon Care Services')}</svg>`
}

function svgLockup(fg, bg, fontB64) {
  // 1400×280 — mark left, name right, vertically centred
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="280"><defs><style>${fontFace(fontB64)}</style></defs><rect width="1400" height="280" fill="${bg}"/>${markEl(fg, 60, 40, 200, 200)}${textEl(fg, 302, 140, 80, 'start', 'middle', 'Horizon Care Services')}</svg>`
}

// ─── Helpers ─────────────────────────────────────────────────
async function renderPng(svgStr, outPath) {
  await sharp(Buffer.from(svgStr))
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(outPath)
}

// ─── Main ────────────────────────────────────────────────────
async function main() {
  const outDir = path.join(__dirname, '../web/public/brand')
  fs.mkdirSync(outDir, { recursive: true })

  // Load the Latin-range woff2 variable font built by Next.js
  const fontPath = path.join(__dirname, '../web/.next/static/media/cef856781ea24bd1-s.p.17m2ldfggy3u-.woff2')
  const fontB64 = fs.readFileSync(fontPath).toString('base64')

  const jobs = []

  for (const v of VARIANTS) {
    jobs.push({ file: `hcs-mark-${v.id}.png`,    svg: svgMark(v.fg, v.bg) })
    jobs.push({ file: `hcs-stacked-${v.id}.png`, svg: svgStacked(v.fg, v.bg, fontB64) })
    jobs.push({ file: `hcs-lockup-${v.id}.png`,  svg: svgLockup(v.fg, v.bg, fontB64) })
  }

  for (const { file, svg } of jobs) {
    const outPath = path.join(outDir, file)
    await renderPng(svg, outPath)
    console.log('  ✓', file)
  }

  console.log(`\nGenerated ${jobs.length} files → web/public/brand/`)
}

main().catch(err => { console.error(err); process.exit(1) })
