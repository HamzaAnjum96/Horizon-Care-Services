import jsPDF from 'jspdf'
import type { ApplicationData } from './types'

// ── Brand tokens ────────────────────────────────────────────────
// These mirror /src/app/globals.css. jsPDF needs concrete RGB.
const BRAND = {
  ink:     [38, 28, 28] as const,    // ~ ink-dark
  inkSoft: [88, 78, 78] as const,    // ~ ink-muted-dark
  rule:    [220, 215, 210] as const, // ~ rule-light
  cream:   [248, 246, 242] as const, // ~ cream
  deep:    [28, 24, 22] as const,    // ~ deep
  amber:   [173, 73, 50] as const,   // ~ amber
  brand:   [155, 13, 20] as const,   // ~ #9B0D14 logo crimson
}

const FONT = {
  display: 'times',  // serif fallback for Source Serif
  body:    'helvetica',
}

// Page geometry (A4 portrait, mm)
const PAGE = {
  w: 210,
  h: 297,
  marginX: 18,
  marginTop: 28,
  marginBottom: 22,
}
const CONTENT_W = PAGE.w - PAGE.marginX * 2

type Doc = jsPDF

// ── Logo path data (HCS mark — same as components/hcs-logo.tsx) ──
const LOGO_VIEWBOX = 1024
const LOGO_PATH =
  'M 543.6 923.2 L 484.9 923.2 L 483.8 922.1 L 464.6 921.0 L 463.5 919.8 L 456.7 919.8 L 455.6 918.7 L 431.9 915.3 L 401.4 907.4 L 372.1 897.3 L 350.7 888.3 L 313.4 869.1 L 279.6 847.6 L 248.0 823.9 L 219.8 799.1 L 198.9 778.3 L 173.0 748.9 L 151.5 720.7 L 121.1 672.2 L 107.5 645.1 L 96.3 618.1 L 80.5 567.3 L 75.9 543.6 L 74.8 528.9 L 73.7 527.8 L 72.6 493.9 L 71.4 492.8 L 74.8 448.8 L 79.3 426.3 L 88.4 398.1 L 92.9 386.8 L 110.9 352.9 L 129.0 329.2 L 149.8 308.4 L 183.7 284.7 L 199.5 276.8 L 223.2 267.7 L 246.9 262.1 L 264.9 261.0 L 266.1 259.8 L 303.3 261.0 L 327.0 265.5 L 348.4 272.3 L 363.1 277.9 L 390.2 291.4 L 425.1 314.0 L 469.1 350.1 L 515.4 396.4 L 550.4 360.3 L 581.9 332.1 L 612.4 308.4 L 642.9 289.2 L 673.3 274.5 L 704.9 264.4 L 723.0 261.0 L 730.9 261.0 L 732.0 259.8 L 769.2 259.8 L 770.4 261.0 L 778.3 261.0 L 796.3 264.4 L 814.4 270.0 L 851.6 288.1 L 877.5 307.2 L 898.4 328.1 L 919.8 358.6 L 927.7 373.2 L 936.8 394.7 L 943.5 416.1 L 948.1 436.4 L 950.3 460.1 L 951.4 461.2 L 951.4 475.9 L 952.6 477.0 L 951.4 517.6 L 950.3 518.8 L 949.2 537.9 L 948.1 539.1 L 944.7 562.8 L 939.0 585.3 L 928.9 615.8 L 913.1 653.0 L 888.3 698.2 L 858.9 739.9 L 827.3 777.1 L 799.7 804.8 L 779.4 822.8 L 754.6 842.0 L 729.7 858.9 L 694.8 879.2 L 692.5 879.2 L 663.2 893.9 L 642.9 900.7 L 639.5 902.9 L 595.5 915.3 L 565.0 919.8 L 563.9 921.0 L 544.7 922.1 L 543.6 923.2 Z M 772.1 581.9 L 790.7 579.1 L 806.5 572.4 L 816.6 565.6 L 828.5 553.7 L 834.1 545.8 L 842.0 527.8 L 845.4 513.1 L 845.4 504.1 L 846.5 503.0 L 846.5 483.8 L 845.4 482.7 L 844.3 466.9 L 840.9 452.2 L 834.1 434.2 L 827.3 421.7 L 816.1 405.9 L 799.7 390.7 L 789.5 383.9 L 761.3 372.7 L 746.7 371.5 L 745.5 370.4 L 717.3 371.5 L 689.1 379.4 L 662.1 393.0 L 635.0 412.2 L 603.4 440.4 L 578.0 466.9 L 591.5 482.7 L 636.1 526.1 L 660.9 545.3 L 684.6 559.9 L 708.3 571.2 L 728.6 578.0 L 745.5 581.4 L 755.7 581.4 L 756.8 582.5 L 772.1 581.9 Z M 530.6 816.6 L 566.2 812.7 L 603.4 803.6 L 639.5 790.1 L 680.1 768.7 L 710.6 747.2 L 732.0 729.2 L 764.2 695.9 L 782.2 673.3 L 792.4 657.5 L 774.9 664.9 L 759.1 668.3 L 752.3 668.3 L 751.2 669.4 L 717.3 669.4 L 716.2 668.3 L 707.2 668.3 L 684.6 663.7 L 645.1 650.2 L 614.7 634.4 L 592.1 619.7 L 548.1 584.8 L 502.4 539.1 L 439.2 466.9 L 407.6 433.0 L 382.3 409.9 L 357.4 391.8 L 330.4 378.3 L 315.7 373.8 L 303.3 372.7 L 302.2 371.5 L 278.5 371.5 L 262.7 374.9 L 250.3 379.4 L 232.2 389.6 L 220.9 398.6 L 206.8 413.8 L 197.8 427.4 L 191.0 440.9 L 186.5 453.3 L 182.0 472.5 L 179.7 505.2 L 180.9 506.4 L 182.0 531.2 L 185.4 549.2 L 197.8 591.0 L 217.0 632.7 L 238.4 667.7 L 267.7 704.9 L 296.5 733.7 L 329.2 759.6 L 364.2 781.1 L 399.2 796.9 L 444.3 810.4 L 455.6 811.5 L 462.4 813.8 L 469.1 813.8 L 470.3 814.9 L 478.2 814.9 L 479.3 816.1 L 492.8 816.1 L 493.9 817.2 L 530.6 816.6 Z'

// Parse the SVG path into segments and emit jsPDF lines/triangles.
// Path uses only M/L/Z so we can do a simple parse.
function drawLogoMark(
  doc: Doc,
  x: number,
  y: number,
  size: number,
  bg: readonly [number, number, number] = BRAND.cream,
) {
  const scale = size / LOGO_VIEWBOX
  const tokens = LOGO_PATH.match(/[MLZ]|-?\d*\.?\d+/g) || []
  doc.setFillColor(BRAND.brand[0], BRAND.brand[1], BRAND.brand[2])
  const subpaths: Array<Array<[number, number]>> = []
  let current: Array<[number, number]> = []
  let i = 0
  while (i < tokens.length) {
    const t = tokens[i]
    if (t === 'M') {
      if (current.length) subpaths.push(current)
      current = []
      const px = parseFloat(tokens[i + 1])
      const py = parseFloat(tokens[i + 2])
      current.push([px, py])
      i += 3
    } else if (t === 'L') {
      const px = parseFloat(tokens[i + 1])
      const py = parseFloat(tokens[i + 2])
      current.push([px, py])
      i += 3
    } else if (t === 'Z') {
      if (current.length) subpaths.push(current)
      current = []
      i += 1
    } else {
      i += 1
    }
  }
  if (current.length) subpaths.push(current)

  // The logo path uses the SVG even-odd fill rule, with three subpaths:
  //   [0] outer body, [1] inner heart cutout, [2] bottom crescent overlay.
  // jsPDF doesn't expose even-odd fills on lines(), so we paint the
  // cutout in the page background colour to simulate the punch-through.
  if (subpaths.length >= 1) fillPolygon(doc, subpaths[0], scale, x, y, BRAND.brand)
  if (subpaths.length >= 2) fillPolygon(doc, subpaths[1], scale, x, y, bg)
  if (subpaths.length >= 3) fillPolygon(doc, subpaths[2], scale, x, y, BRAND.brand)

  // Top circle
  doc.setFillColor(BRAND.brand[0], BRAND.brand[1], BRAND.brand[2])
  const cx = x + 511.4 * scale
  const cy = y + 201.7 * scale
  const r = 99.6 * scale
  doc.circle(cx, cy, r, 'F')
}

function fillPolygon(
  doc: Doc,
  pts: Array<[number, number]>,
  scale: number,
  ox: number,
  oy: number,
  rgb: readonly [number, number, number],
) {
  if (pts.length < 3) return
  doc.setFillColor(rgb[0], rgb[1], rgb[2])
  const start = pts[0]
  const lines: Array<[number, number]> = []
  for (let i = 1; i < pts.length; i++) {
    lines.push([(pts[i][0] - pts[i - 1][0]) * scale, (pts[i][1] - pts[i - 1][1]) * scale])
  }
  // close
  lines.push([(start[0] - pts[pts.length - 1][0]) * scale, (start[1] - pts[pts.length - 1][1]) * scale])
  doc.lines(lines, ox + start[0] * scale, oy + start[1] * scale, [1, 1], 'F', true)
}

// ── Layout primitives ───────────────────────────────────────────
type Cursor = { y: number; page: number }

function ensureSpace(doc: Doc, c: Cursor, needed: number) {
  if (c.y + needed > PAGE.h - PAGE.marginBottom) {
    addPage(doc, c)
  }
}

function setInk(doc: Doc, rgb: readonly [number, number, number]) {
  doc.setTextColor(rgb[0], rgb[1], rgb[2])
}

function setRule(doc: Doc, rgb: readonly [number, number, number]) {
  doc.setDrawColor(rgb[0], rgb[1], rgb[2])
}

function drawHeader(doc: Doc, data: ApplicationData) {
  // Logo mark — top-left (page background is cream)
  drawLogoMark(doc, PAGE.marginX, 12, 12, BRAND.cream)

  // Wordmark
  doc.setFont(FONT.display, 'normal')
  doc.setFontSize(12)
  setInk(doc, BRAND.ink)
  doc.text('Horizon Care Services', PAGE.marginX + 16, 18)

  doc.setFont(FONT.body, 'normal')
  doc.setFontSize(7.5)
  setInk(doc, BRAND.inkSoft)
  doc.text('Application for employment', PAGE.marginX + 16, 22.5)

  // Right-aligned role chip
  doc.setFont(FONT.body, 'bold')
  doc.setFontSize(7)
  setInk(doc, BRAND.inkSoft)
  const codeLabel = `REF · ${data.role.code}`
  const codeW = doc.getTextWidth(codeLabel)
  setRule(doc, BRAND.rule)
  doc.setLineWidth(0.2)
  doc.roundedRect(PAGE.w - PAGE.marginX - codeW - 6, 14, codeW + 6, 5.5, 1, 1, 'S')
  doc.text(codeLabel, PAGE.w - PAGE.marginX - 3, 17.7, { align: 'right' })

  // Role title
  doc.setFont(FONT.display, 'italic')
  doc.setFontSize(9)
  setInk(doc, BRAND.ink)
  doc.text(data.role.title, PAGE.w - PAGE.marginX, 22.5, { align: 'right' })

  // Header rule
  setRule(doc, BRAND.rule)
  doc.setLineWidth(0.3)
  doc.line(PAGE.marginX, 26, PAGE.w - PAGE.marginX, 26)
}

function drawFooter(doc: Doc, pageNum: number, totalPages: number, applicantName: string) {
  const y = PAGE.h - 12
  setRule(doc, BRAND.rule)
  doc.setLineWidth(0.2)
  doc.line(PAGE.marginX, y - 4, PAGE.w - PAGE.marginX, y - 4)

  doc.setFont(FONT.body, 'normal')
  doc.setFontSize(7)
  setInk(doc, BRAND.inkSoft)
  doc.text('Horizon Care Services Ltd · Company No. 14615041', PAGE.marginX, y)
  doc.text(applicantName || 'Applicant', PAGE.w / 2, y, { align: 'center' })
  doc.text(`Page ${pageNum} of ${totalPages}`, PAGE.w - PAGE.marginX, y, { align: 'right' })
}

function addPage(doc: Doc, c: Cursor) {
  doc.addPage()
  c.page += 1
  c.y = PAGE.marginTop
}

function sectionTitle(doc: Doc, c: Cursor, kicker: string, title: string) {
  ensureSpace(doc, c, 18)
  // section block
  doc.setFont(FONT.body, 'bold')
  doc.setFontSize(7)
  setInk(doc, BRAND.amber)
  doc.text(kicker.toUpperCase(), PAGE.marginX, c.y, { charSpace: 0.6 })

  doc.setFont(FONT.display, 'normal')
  doc.setFontSize(13)
  setInk(doc, BRAND.ink)
  doc.text(title, PAGE.marginX, c.y + 6)

  setRule(doc, BRAND.ink)
  doc.setLineWidth(0.4)
  doc.line(PAGE.marginX, c.y + 8.5, PAGE.marginX + 12, c.y + 8.5)
  c.y += 13
}

function field(doc: Doc, c: Cursor, label: string, value: string, colW = CONTENT_W, x = PAGE.marginX) {
  const v = value && value.trim() ? value : '—'

  doc.setFont(FONT.body, 'bold')
  doc.setFontSize(6.8)
  setInk(doc, BRAND.inkSoft)
  // Wrap labels too — uppercase + 0.5mm charSpace makes them ~10–12% wider
  // than splitTextToSize accounts for, so reserve a bit of slack.
  const labelLines = doc.splitTextToSize(label.toUpperCase(), Math.max(colW - 2, 10))
  doc.text(labelLines, x, c.y, { charSpace: 0.5 })
  const labelH = labelLines.length * 3.2

  doc.setFont(FONT.body, 'normal')
  doc.setFontSize(9.5)
  setInk(doc, BRAND.ink)
  const wrapped = doc.splitTextToSize(v, colW)
  doc.text(wrapped, x, c.y + labelH + 1)
  return labelH + 1 + wrapped.length * 4 + 2
}

function fieldRow(doc: Doc, c: Cursor, fields: Array<{ label: string; value: string }>) {
  const colCount = fields.length
  const gap = 4
  const colW = (CONTENT_W - gap * (colCount - 1)) / colCount

  // Pre-compute the row height so we can keep label+value together when
  // a page break is needed.
  const heights = fields.map((f) => {
    const labelLines = doc.splitTextToSize(f.label.toUpperCase(), Math.max(colW - 2, 10))
    const valueLines = doc.splitTextToSize(
      f.value && f.value.trim() ? f.value : '—',
      colW,
    )
    return labelLines.length * 3.2 + 1 + valueLines.length * 4 + 2
  })
  const rowH = Math.max(...heights)
  ensureSpace(doc, c, rowH + 2)

  let maxAdvance = 0
  fields.forEach((f, i) => {
    const x = PAGE.marginX + i * (colW + gap)
    const advance = field(doc, c, f.label, f.value, colW, x)
    if (advance > maxAdvance) maxAdvance = advance
  })
  c.y += maxAdvance + 2
}

function paragraph(doc: Doc, c: Cursor, label: string, value: string) {
  const v = value && value.trim() ? value : '—'

  // Pre-compute wrap so we can ensureSpace BEFORE drawing the label —
  // otherwise the label can end up orphaned at the bottom of the page
  // while its value lands on the next.
  doc.setFont(FONT.body, 'normal')
  doc.setFontSize(9.5)
  const wrapped = doc.splitTextToSize(v, CONTENT_W)
  const totalH = 3.2 + 1 + wrapped.length * 4 + 4
  ensureSpace(doc, c, totalH)

  doc.setFont(FONT.body, 'bold')
  doc.setFontSize(6.8)
  setInk(doc, BRAND.inkSoft)
  doc.text(label.toUpperCase(), PAGE.marginX, c.y, { charSpace: 0.5 })

  doc.setFont(FONT.body, 'normal')
  doc.setFontSize(9.5)
  setInk(doc, BRAND.ink)
  doc.text(wrapped, PAGE.marginX, c.y + 4)
  c.y += 4 + wrapped.length * 4 + 4
}

function chips(doc: Doc, c: Cursor, label: string, items: string[]) {
  doc.setFont(FONT.body, 'bold')
  doc.setFontSize(6.8)
  setInk(doc, BRAND.inkSoft)
  doc.text(label.toUpperCase(), PAGE.marginX, c.y, { charSpace: 0.5 })
  c.y += 3.2

  if (!items.length) {
    doc.setFont(FONT.body, 'italic')
    doc.setFontSize(9)
    setInk(doc, BRAND.inkSoft)
    doc.text('—', PAGE.marginX, c.y + 3)
    c.y += 6
    return
  }

  doc.setFont(FONT.body, 'normal')
  doc.setFontSize(8.5)
  let x = PAGE.marginX
  const rowH = 5
  const padX = 2.6
  for (const item of items) {
    const w = doc.getTextWidth(item) + padX * 2
    if (x + w > PAGE.w - PAGE.marginX) {
      x = PAGE.marginX
      c.y += rowH + 1.5
      ensureSpace(doc, c, rowH + 4)
    }
    setRule(doc, BRAND.rule)
    doc.setLineWidth(0.2)
    doc.roundedRect(x, c.y, w, rowH, 0.8, 0.8, 'S')
    setInk(doc, BRAND.ink)
    doc.text(item, x + padX, c.y + 3.5)
    x += w + 2
  }
  c.y += rowH + 5
}

function divider(doc: Doc, c: Cursor) {
  ensureSpace(doc, c, 4)
  setRule(doc, BRAND.rule)
  doc.setLineWidth(0.15)
  doc.line(PAGE.marginX, c.y, PAGE.w - PAGE.marginX, c.y)
  c.y += 4
}

function yn(v: string) {
  if (v === 'yes') return 'Yes'
  if (v === 'no') return 'No'
  if (v === 'pending') return 'Pending'
  if (v === 'na') return 'N/A'
  return ''
}

function fmtDate(d: string) {
  if (!d) return ''
  // Stored as YYYY-MM-DD (HTML date input). Render as DD MMM YYYY.
  const m = d.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (!m) return d
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${m[3]} ${months[parseInt(m[2], 10) - 1]} ${m[1]}`
}

function fullName(d: ApplicationData) {
  const parts = [d.personal.title, d.personal.firstName, d.personal.middleNames, d.personal.surname]
    .map((s) => s.trim())
    .filter(Boolean)
  return parts.join(' ')
}

// ── Main entry ──────────────────────────────────────────────────
export function generateApplicationPdf(data: ApplicationData): jsPDF {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true })
  const c: Cursor = { y: PAGE.marginTop, page: 1 }
  const name = fullName(data)

  // ── Cover plate ─────────────────────────────────────────────
  // Deep band at top
  doc.setFillColor(BRAND.deep[0], BRAND.deep[1], BRAND.deep[2])
  doc.rect(0, 0, PAGE.w, 70, 'F')

  // Cover plate logo sits on the deep band, so the cutout punches through
  // to the deep colour.
  drawLogoMark(doc, PAGE.marginX, 22, 18, BRAND.deep)

  doc.setFont(FONT.display, 'normal')
  doc.setFontSize(11)
  doc.setTextColor(245, 240, 232)
  doc.text('Horizon Care Services', PAGE.marginX + 23, 30)

  doc.setFont(FONT.body, 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(190, 180, 170)
  doc.text('Application for employment', PAGE.marginX + 23, 35)

  // Big title
  doc.setFont(FONT.display, 'normal')
  doc.setFontSize(28)
  doc.setTextColor(248, 246, 242)
  doc.text(name || 'Applicant', PAGE.marginX, 56)

  doc.setFont(FONT.body, 'normal')
  doc.setFontSize(9)
  doc.setTextColor(190, 180, 170)
  doc.text(
    `Submitted ${fmtDate(data.declarations.signatureDate) || fmtDate(new Date().toISOString().slice(0, 10))}`,
    PAGE.marginX,
    62,
  )

  // Role pill on cover (right-aligned)
  doc.setFillColor(BRAND.amber[0], BRAND.amber[1], BRAND.amber[2])
  const pillLabel = `${data.role.code} · ${data.role.title}`
  doc.setFont(FONT.body, 'bold')
  doc.setFontSize(8)
  const pillW = doc.getTextWidth(pillLabel) + 8
  doc.roundedRect(PAGE.w - PAGE.marginX - pillW, 24, pillW, 6.5, 1.5, 1.5, 'F')
  doc.setTextColor(248, 246, 242)
  doc.text(pillLabel, PAGE.w - PAGE.marginX - pillW / 2, 28.2, { align: 'center' })

  c.y = 84

  // Summary strip
  setRule(doc, BRAND.rule)
  doc.setLineWidth(0.4)
  doc.line(PAGE.marginX, c.y - 2, PAGE.marginX + 12, c.y - 2)
  doc.setFont(FONT.body, 'bold')
  doc.setFontSize(7)
  setInk(doc, BRAND.amber)
  doc.text('SUMMARY', PAGE.marginX, c.y + 3, { charSpace: 0.6 })
  c.y += 8

  fieldRow(doc, c, [
    { label: 'Email', value: data.contact.email },
    { label: 'Mobile', value: data.contact.mobile },
    { label: 'Postcode', value: data.address.postcode },
  ])
  fieldRow(doc, c, [
    { label: 'Right to work', value: yn(data.rightToWork.hasRightToWork) },
    { label: 'DBS', value: yn(data.dbs.status) },
    { label: 'Driving licence', value: yn(data.driving.hasLicence) },
    { label: 'Vehicle', value: yn(data.driving.hasVehicle) },
  ])

  // ── Section: Role ───────────────────────────────────────────
  sectionTitle(doc, c, 'Section 01', 'Role applied for')
  fieldRow(doc, c, [
    { label: 'Role code', value: data.role.code },
    { label: 'Role title', value: data.role.title },
  ])

  // ── Section: Personal ───────────────────────────────────────
  sectionTitle(doc, c, 'Section 02', 'Personal details')
  fieldRow(doc, c, [
    { label: 'Title', value: data.personal.title },
    { label: 'First name', value: data.personal.firstName },
    { label: 'Middle name(s)', value: data.personal.middleNames },
    { label: 'Surname', value: data.personal.surname },
  ])
  fieldRow(doc, c, [
    { label: 'Preferred name', value: data.personal.preferredName },
    { label: 'Date of birth', value: fmtDate(data.personal.dob) },
    { label: 'Gender', value: data.personal.gender },
    { label: 'Pronouns', value: data.personal.pronouns },
  ])

  // ── Section: Contact ────────────────────────────────────────
  sectionTitle(doc, c, 'Section 03', 'Contact details')
  fieldRow(doc, c, [
    { label: 'Email', value: data.contact.email },
    { label: 'Mobile', value: data.contact.mobile },
    { label: 'Telephone (alt)', value: data.contact.telephone },
  ])

  // ── Section: Address ────────────────────────────────────────
  sectionTitle(doc, c, 'Section 04', 'Address')
  fieldRow(doc, c, [
    { label: 'Address line 1', value: data.address.line1 },
    { label: 'Address line 2', value: data.address.line2 },
  ])
  fieldRow(doc, c, [
    { label: 'Town / city', value: data.address.town },
    { label: 'County', value: data.address.county },
    { label: 'Postcode', value: data.address.postcode },
    { label: 'Years at address', value: data.address.yearsAtAddress },
  ])
  if (data.address.previousAddress.trim()) {
    paragraph(doc, c, 'Previous address (if less than 3 years)', data.address.previousAddress)
  }

  // ── Section: Right to Work ──────────────────────────────────
  sectionTitle(doc, c, 'Section 05', 'Right to work in the UK')
  fieldRow(doc, c, [
    {
      label: 'Nationality',
      value:
        data.rightToWork.nationality === 'Other'
          ? data.rightToWork.nationalityOther
          : data.rightToWork.nationality,
    },
    { label: 'Right to work', value: yn(data.rightToWork.hasRightToWork) },
    { label: 'Basis', value: data.rightToWork.rightToWorkBasis },
  ])
  fieldRow(doc, c, [
    { label: 'Visa status', value: data.rightToWork.visaStatus },
    { label: 'Visa expiry', value: fmtDate(data.rightToWork.visaExpiry) },
  ])
  const docTypeLabel: Record<string, string> = {
    brp: 'BRP',
    evisa: 'eVisa',
    'share-code': 'Share code',
    passport: 'Passport',
    other: 'Other',
  }
  fieldRow(doc, c, [
    { label: 'Document type', value: docTypeLabel[data.rightToWork.documentType] || '' },
    { label: 'Document reference', value: data.rightToWork.documentRef },
    { label: 'Share code', value: data.rightToWork.shareCode },
  ])

  // ── Section: Identification ─────────────────────────────────
  sectionTitle(doc, c, 'Section 06', 'Identification')
  fieldRow(doc, c, [
    { label: 'NI number', value: data.identification.niNumber.toUpperCase() },
  ])

  // ── Section: DBS ────────────────────────────────────────────
  sectionTitle(doc, c, 'Section 07', 'DBS status')
  fieldRow(doc, c, [
    { label: 'Enhanced DBS', value: yn(data.dbs.status) },
    { label: 'Certificate no.', value: data.dbs.certificateNumber },
    { label: 'Issue date', value: fmtDate(data.dbs.issueDate) },
    { label: 'On Update Service', value: yn(data.dbs.onUpdateService) },
  ])

  // ── Section: Driving ────────────────────────────────────────
  sectionTitle(doc, c, 'Section 08', 'Driving licence & vehicle')
  fieldRow(doc, c, [
    { label: 'Driving licence', value: yn(data.driving.hasLicence) },
    { label: 'Licence type', value: data.driving.licenceType },
    { label: 'Penalty points', value: data.driving.penaltyPoints },
    { label: 'Vehicle access', value: yn(data.driving.hasVehicle) },
    { label: 'Business insurance', value: yn(data.driving.businessInsurance) },
  ])

  // ── Section: Care Experience ────────────────────────────────
  sectionTitle(doc, c, 'Section 09', 'Care experience')
  fieldRow(doc, c, [{ label: 'Years in care', value: data.experience.yearsInCare }])
  chips(doc, c, 'Settings worked in', data.experience.settings)
  paragraph(doc, c, 'Experience summary', data.experience.summary)

  // ── Section: Employment ─────────────────────────────────────
  sectionTitle(doc, c, 'Section 10', 'Employment history')
  data.employment.forEach((e, i) => {
    if (!e.employer.trim() && !e.role.trim() && !e.from && !e.to) return
    if (i > 0) divider(doc, c)
    ensureSpace(doc, c, 30)
    doc.setFont(FONT.body, 'bold')
    doc.setFontSize(7)
    setInk(doc, BRAND.inkSoft)
    doc.text(`#${String(i + 1).padStart(2, '0')}`, PAGE.marginX, c.y, { charSpace: 0.5 })
    c.y += 4
    fieldRow(doc, c, [
      { label: 'Employer', value: e.employer },
      { label: 'Role', value: e.role },
    ])
    fieldRow(doc, c, [
      { label: 'From', value: fmtDate(e.from) },
      { label: 'To', value: e.current ? 'Present' : fmtDate(e.to) },
      { label: 'Reason for leaving', value: e.current ? '—' : e.reasonForLeaving },
    ])
    if (e.responsibilities.trim()) {
      paragraph(doc, c, 'Key responsibilities', e.responsibilities)
    }
  })

  // ── Section: Education ──────────────────────────────────────
  sectionTitle(doc, c, 'Section 11', 'Education & qualifications')
  data.education.forEach((ed, i) => {
    if (!ed.institution.trim() && !ed.qualification.trim()) return
    if (i > 0) divider(doc, c)
    fieldRow(doc, c, [
      { label: 'Institution', value: ed.institution },
      { label: 'Qualification', value: ed.qualification },
      { label: 'Year', value: ed.year },
      { label: 'Grade', value: ed.grade },
    ])
  })

  // ── Section: Training ───────────────────────────────────────
  sectionTitle(doc, c, 'Section 12', 'Training & certificates')
  chips(doc, c, 'Completed training', data.training.items)
  if (data.training.other.trim()) {
    paragraph(doc, c, 'Other training', data.training.other)
  }

  // ── Section: Skills & Availability ──────────────────────────
  sectionTitle(doc, c, 'Section 13', 'Skills & availability')
  chips(doc, c, 'Skills', data.skills.list)
  fieldRow(doc, c, [
    { label: 'Languages spoken', value: data.skills.languages },
    { label: 'Earliest start', value: fmtDate(data.skills.earliestStart) },
  ])
  chips(doc, c, 'Available days', data.skills.availableDays)
  chips(doc, c, 'Shift preferences', data.skills.shiftPreferences)
  if (data.skills.additionalNotes.trim()) {
    paragraph(doc, c, 'Notes', data.skills.additionalNotes)
  }

  // ── Section: References ─────────────────────────────────────
  // References are gathered later in the process — only render the block
  // if the applicant has actually filled at least one referee.
  const hasReferees = data.references.some(
    (r) => r.name.trim() || r.organisation.trim() || r.email.trim() || r.phone.trim(),
  )
  if (hasReferees) {
    sectionTitle(doc, c, 'Section 14', 'References')
    data.references.forEach((r, i) => {
      if (i > 0) divider(doc, c)
      ensureSpace(doc, c, 24)
      doc.setFont(FONT.body, 'bold')
      doc.setFontSize(7)
      setInk(doc, BRAND.inkSoft)
      doc.text(`Referee ${i + 1}`, PAGE.marginX, c.y, { charSpace: 0.5 })
      c.y += 4
      fieldRow(doc, c, [
        { label: 'Name', value: r.name },
        { label: 'Role', value: r.role },
        { label: 'Organisation', value: r.organisation },
      ])
      fieldRow(doc, c, [
        { label: 'Relationship', value: r.relationship },
        { label: 'Years known', value: r.yearsKnown },
      ])
      fieldRow(doc, c, [
        { label: 'Email', value: r.email },
        { label: 'Phone', value: r.phone },
      ])
    })
  }

  // ── Section: Emergency ──────────────────────────────────────
  sectionTitle(doc, c, 'Section 15', 'Emergency contact')
  fieldRow(doc, c, [
    { label: 'Name', value: data.emergency.name },
    { label: 'Relationship', value: data.emergency.relationship },
  ])
  fieldRow(doc, c, [
    { label: 'Phone', value: data.emergency.phone },
    { label: 'Email', value: data.emergency.email },
  ])

  // ── Section: Declarations ───────────────────────────────────
  sectionTitle(doc, c, 'Section 16', 'Health & safeguarding declarations')
  fieldRow(doc, c, [
    {
      label: 'Unspent convictions',
      value: yn(data.declarations.convictions),
    },
    {
      label: 'Safeguarding referrals',
      value: yn(data.declarations.safeguarding),
    },
    {
      label: 'Health condition',
      value: yn(data.declarations.healthCondition),
    },
  ])
  if (data.declarations.convictions === 'yes')
    paragraph(doc, c, 'Convictions — details', data.declarations.convictionsDetail)
  if (data.declarations.safeguarding === 'yes')
    paragraph(doc, c, 'Safeguarding — details', data.declarations.safeguardingDetail)
  if (data.declarations.healthCondition === 'yes')
    paragraph(doc, c, 'Health — details', data.declarations.healthDetail)
  fieldRow(doc, c, [
    { label: 'Confirms fitness to work', value: data.declarations.fitToWork ? 'Yes' : 'No' },
    { label: 'Confirms accuracy of information', value: data.declarations.accuracy ? 'Yes' : 'No' },
  ])

  // ── Section: Consent ────────────────────────────────────────
  sectionTitle(doc, c, 'Section 17', 'Consent for data processing')
  fieldRow(doc, c, [
    { label: 'Application processing', value: data.consent.dataProcessing ? 'Consented' : 'Not given' },
    { label: 'Reference checks', value: data.consent.referenceCheck ? 'Consented' : 'Not given' },
    { label: 'DBS check', value: data.consent.dbsCheck ? 'Consented' : 'Not given' },
  ])

  // ── Section: Signature ──────────────────────────────────────
  sectionTitle(doc, c, 'Section 18', 'Applicant declaration & signature')
  ensureSpace(doc, c, 30)
  paragraph(
    doc,
    c,
    'Declaration',
    'I confirm that the information provided in this application is, to the best of my knowledge, complete and accurate. I understand that any false statement or omission may result in the withdrawal of any offer of employment or in dismissal. I consent to Horizon Care Services Ltd processing this information for the purposes of recruitment, in accordance with their privacy policy.',
  )

  // Signature box
  ensureSpace(doc, c, 26)
  doc.setFont(FONT.body, 'bold')
  doc.setFontSize(6.8)
  setInk(doc, BRAND.inkSoft)
  doc.text('SIGNED', PAGE.marginX, c.y, { charSpace: 0.5 })
  doc.text('DATE', PAGE.marginX + CONTENT_W * 0.6, c.y, { charSpace: 0.5 })

  doc.setFont(FONT.display, 'italic')
  doc.setFontSize(18)
  setInk(doc, BRAND.ink)
  doc.text(data.declarations.signature || '—', PAGE.marginX, c.y + 9)

  doc.setFont(FONT.body, 'normal')
  doc.setFontSize(10)
  setInk(doc, BRAND.ink)
  doc.text(fmtDate(data.declarations.signatureDate) || '—', PAGE.marginX + CONTENT_W * 0.6, c.y + 9)

  setRule(doc, BRAND.ink)
  doc.setLineWidth(0.3)
  doc.line(PAGE.marginX, c.y + 12, PAGE.marginX + CONTENT_W * 0.55, c.y + 12)
  doc.line(PAGE.marginX + CONTENT_W * 0.6, c.y + 12, PAGE.w - PAGE.marginX, c.y + 12)
  c.y += 18

  // ── Render header / footer on every page ────────────────────
  const totalPages = doc.getNumberOfPages()
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p)
    if (p > 1) drawHeader(doc, data) // page 1 has its own cover
    drawFooter(doc, p, totalPages, name)
  }

  return doc
}

export function buildPdfFilename(data: ApplicationData): string {
  const safeName = fullName(data)
    .replace(/[^A-Za-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  const date = (data.declarations.signatureDate || new Date().toISOString().slice(0, 10)).replace(/-/g, '')
  const safeCode = data.role.code.replace(/[^A-Za-z0-9-]+/g, '-')
  return `HCS-Application_${safeCode}_${safeName || 'Applicant'}_${date}.pdf`
}
