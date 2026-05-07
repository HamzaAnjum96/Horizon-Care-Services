import jsPDF from 'jspdf'
import type { OnboardingData } from './types'

// Brand tokens — mirror globals.css
const BRAND = {
  ink:     [38, 28, 28] as const,
  inkSoft: [88, 78, 78] as const,
  rule:    [220, 215, 210] as const,
  cream:   [248, 246, 242] as const,
  deep:    [28, 24, 22] as const,
  amber:   [173, 73, 50] as const,
  brand:   [92, 16, 32] as const,
}

const FONT = { display: 'times', body: 'helvetica' }

const PAGE = { w: 210, h: 297, marginX: 18, marginTop: 28, marginBottom: 22 }
const CONTENT_W = PAGE.w - PAGE.marginX * 2

type Doc = jsPDF
type Cursor = { y: number; page: number }

// ── Logo ──────────────────────────────────────────────────────────
const LOGO_VIEWBOX = 1024
const LOGO_PATH =
  'M 543.6 923.2 L 484.9 923.2 L 483.8 922.1 L 464.6 921.0 L 463.5 919.8 L 456.7 919.8 L 455.6 918.7 L 431.9 915.3 L 401.4 907.4 L 372.1 897.3 L 350.7 888.3 L 313.4 869.1 L 279.6 847.6 L 248.0 823.9 L 219.8 799.1 L 198.9 778.3 L 173.0 748.9 L 151.5 720.7 L 121.1 672.2 L 107.5 645.1 L 96.3 618.1 L 80.5 567.3 L 75.9 543.6 L 74.8 528.9 L 73.7 527.8 L 72.6 493.9 L 71.4 492.8 L 74.8 448.8 L 79.3 426.3 L 88.4 398.1 L 92.9 386.8 L 110.9 352.9 L 129.0 329.2 L 149.8 308.4 L 183.7 284.7 L 199.5 276.8 L 223.2 267.7 L 246.9 262.1 L 264.9 261.0 L 266.1 259.8 L 303.3 261.0 L 327.0 265.5 L 348.4 272.3 L 363.1 277.9 L 390.2 291.4 L 425.1 314.0 L 469.1 350.1 L 515.4 396.4 L 550.4 360.3 L 581.9 332.1 L 612.4 308.4 L 642.9 289.2 L 673.3 274.5 L 704.9 264.4 L 723.0 261.0 L 730.9 261.0 L 732.0 259.8 L 769.2 259.8 L 770.4 261.0 L 778.3 261.0 L 796.3 264.4 L 814.4 270.0 L 851.6 288.1 L 877.5 307.2 L 898.4 328.1 L 919.8 358.6 L 927.7 373.2 L 936.8 394.7 L 943.5 416.1 L 948.1 436.4 L 950.3 460.1 L 951.4 461.2 L 951.4 475.9 L 952.6 477.0 L 951.4 517.6 L 950.3 518.8 L 949.2 537.9 L 948.1 539.1 L 944.7 562.8 L 939.0 585.3 L 928.9 615.8 L 913.1 653.0 L 888.3 698.2 L 858.9 739.9 L 827.3 777.1 L 799.7 804.8 L 779.4 822.8 L 754.6 842.0 L 729.7 858.9 L 694.8 879.2 L 692.5 879.2 L 663.2 893.9 L 642.9 900.7 L 639.5 902.9 L 595.5 915.3 L 565.0 919.8 L 563.9 921.0 L 544.7 922.1 L 543.6 923.2 Z M 772.1 581.9 L 790.7 579.1 L 806.5 572.4 L 816.6 565.6 L 828.5 553.7 L 834.1 545.8 L 842.0 527.8 L 845.4 513.1 L 845.4 504.1 L 846.5 503.0 L 846.5 483.8 L 845.4 482.7 L 844.3 466.9 L 840.9 452.2 L 834.1 434.2 L 827.3 421.7 L 816.1 405.9 L 799.7 390.7 L 789.5 383.9 L 761.3 372.7 L 746.7 371.5 L 745.5 370.4 L 717.3 371.5 L 689.1 379.4 L 662.1 393.0 L 635.0 412.2 L 603.4 440.4 L 578.0 466.9 L 591.5 482.7 L 636.1 526.1 L 660.9 545.3 L 684.6 559.9 L 708.3 571.2 L 728.6 578.0 L 745.5 581.4 L 755.7 581.4 L 756.8 582.5 L 772.1 581.9 Z M 530.6 816.6 L 566.2 812.7 L 603.4 803.6 L 639.5 790.1 L 680.1 768.7 L 710.6 747.2 L 732.0 729.2 L 764.2 695.9 L 782.2 673.3 L 792.4 657.5 L 774.9 664.9 L 759.1 668.3 L 752.3 668.3 L 751.2 669.4 L 717.3 669.4 L 716.2 668.3 L 707.2 668.3 L 684.6 663.7 L 645.1 650.2 L 614.7 634.4 L 592.1 619.7 L 548.1 584.8 L 502.4 539.1 L 439.2 466.9 L 407.6 433.0 L 382.3 409.9 L 357.4 391.8 L 330.4 378.3 L 315.7 373.8 L 303.3 372.7 L 302.2 371.5 L 278.5 371.5 L 262.7 374.9 L 250.3 379.4 L 232.2 389.6 L 220.9 398.6 L 206.8 413.8 L 197.8 427.4 L 191.0 440.9 L 186.5 453.3 L 182.0 472.5 L 179.7 505.2 L 180.9 506.4 L 182.0 531.2 L 185.4 549.2 L 197.8 591.0 L 217.0 632.7 L 238.4 667.7 L 267.7 704.9 L 296.5 733.7 L 329.2 759.6 L 364.2 781.1 L 399.2 796.9 L 444.3 810.4 L 455.6 811.5 L 462.4 813.8 L 469.1 813.8 L 470.3 814.9 L 478.2 814.9 L 479.3 816.1 L 492.8 816.1 L 493.9 817.2 L 530.6 816.6 Z'

function drawLogoMark(doc: Doc, x: number, y: number, size: number, bg: readonly [number, number, number] = BRAND.cream) {
  const scale = size / LOGO_VIEWBOX
  const tokens = LOGO_PATH.match(/[MLZ]|-?\d*\.?\d+/g) || []
  const subpaths: Array<Array<[number, number]>> = []
  let current: Array<[number, number]> = []
  let i = 0
  while (i < tokens.length) {
    const t = tokens[i]
    if (t === 'M') {
      if (current.length) subpaths.push(current)
      current = [[parseFloat(tokens[i + 1]), parseFloat(tokens[i + 2])]]
      i += 3
    } else if (t === 'L') {
      current.push([parseFloat(tokens[i + 1]), parseFloat(tokens[i + 2])])
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
  if (subpaths[0]) fillPolygon(doc, subpaths[0], scale, x, y, BRAND.brand)
  if (subpaths[1]) fillPolygon(doc, subpaths[1], scale, x, y, bg)
  if (subpaths[2]) fillPolygon(doc, subpaths[2], scale, x, y, BRAND.brand)
  doc.setFillColor(BRAND.brand[0], BRAND.brand[1], BRAND.brand[2])
  doc.circle(x + 511.4 * scale, y + 201.7 * scale, 99.6 * scale, 'F')
}

function fillPolygon(doc: Doc, pts: Array<[number, number]>, scale: number, ox: number, oy: number, rgb: readonly [number, number, number]) {
  if (pts.length < 3) return
  doc.setFillColor(rgb[0], rgb[1], rgb[2])
  const lines: Array<[number, number]> = []
  for (let i = 1; i < pts.length; i++) {
    lines.push([(pts[i][0] - pts[i - 1][0]) * scale, (pts[i][1] - pts[i - 1][1]) * scale])
  }
  lines.push([(pts[0][0] - pts[pts.length - 1][0]) * scale, (pts[0][1] - pts[pts.length - 1][1]) * scale])
  doc.lines(lines, ox + pts[0][0] * scale, oy + pts[0][1] * scale, [1, 1], 'F', true)
}

// ── Layout helpers ────────────────────────────────────────────────
function ensureSpace(doc: Doc, c: Cursor, needed: number) {
  if (c.y + needed > PAGE.h - PAGE.marginBottom) {
    doc.addPage()
    c.page += 1
    c.y = PAGE.marginTop
  }
}

function setInk(doc: Doc, rgb: readonly [number, number, number]) { doc.setTextColor(rgb[0], rgb[1], rgb[2]) }
function setRule(doc: Doc, rgb: readonly [number, number, number]) { doc.setDrawColor(rgb[0], rgb[1], rgb[2]) }

function drawHeader(doc: Doc, workerName: string) {
  drawLogoMark(doc, PAGE.marginX, 12, 12, BRAND.cream)
  doc.setFont(FONT.display, 'normal')
  doc.setFontSize(12)
  setInk(doc, BRAND.ink)
  doc.text('Horizon Care Services', PAGE.marginX + 16, 18)
  doc.setFont(FONT.body, 'normal')
  doc.setFontSize(7.5)
  setInk(doc, BRAND.inkSoft)
  doc.text('New worker onboarding record', PAGE.marginX + 16, 22.5)
  doc.setFont(FONT.body, 'normal')
  doc.setFontSize(8)
  setInk(doc, BRAND.inkSoft)
  doc.text(workerName, PAGE.w - PAGE.marginX, 19, { align: 'right' })
  setRule(doc, BRAND.rule)
  doc.setLineWidth(0.3)
  doc.line(PAGE.marginX, 26, PAGE.w - PAGE.marginX, 26)
}

function drawFooter(doc: Doc, pageNum: number, totalPages: number, workerName: string) {
  const y = PAGE.h - 12
  setRule(doc, BRAND.rule)
  doc.setLineWidth(0.2)
  doc.line(PAGE.marginX, y - 4, PAGE.w - PAGE.marginX, y - 4)
  doc.setFont(FONT.body, 'normal')
  doc.setFontSize(7)
  setInk(doc, BRAND.inkSoft)
  doc.text('Horizon Care Services Ltd · Company No. 14615041', PAGE.marginX, y)
  doc.text(workerName || 'Worker', PAGE.w / 2, y, { align: 'center' })
  doc.text(`Page ${pageNum} of ${totalPages}`, PAGE.w - PAGE.marginX, y, { align: 'right' })
}

function sectionTitle(doc: Doc, c: Cursor, kicker: string, title: string) {
  ensureSpace(doc, c, 18)
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

function fieldRow(doc: Doc, c: Cursor, fields: Array<{ label: string; value: string }>) {
  const gap = 4
  const colW = (CONTENT_W - gap * (fields.length - 1)) / fields.length
  const heights = fields.map((f) => {
    const ll = doc.splitTextToSize(f.label.toUpperCase(), Math.max(colW - 2, 10))
    const vl = doc.splitTextToSize(f.value && f.value.trim() ? f.value : '—', colW)
    return ll.length * 3.2 + 1 + vl.length * 4 + 2
  })
  const rowH = Math.max(...heights)
  ensureSpace(doc, c, rowH + 2)
  fields.forEach((f, i) => {
    const x = PAGE.marginX + i * (colW + gap)
    const v = f.value && f.value.trim() ? f.value : '—'
    doc.setFont(FONT.body, 'bold')
    doc.setFontSize(6.8)
    setInk(doc, BRAND.inkSoft)
    const ll = doc.splitTextToSize(f.label.toUpperCase(), Math.max(colW - 2, 10))
    doc.text(ll, x, c.y, { charSpace: 0.5 })
    doc.setFont(FONT.body, 'normal')
    doc.setFontSize(9.5)
    setInk(doc, BRAND.ink)
    doc.text(doc.splitTextToSize(v, colW), x, c.y + ll.length * 3.2 + 1)
  })
  c.y += rowH + 2
}

function paragraph(doc: Doc, c: Cursor, label: string, value: string) {
  const v = value && value.trim() ? value : '—'
  const wrapped = doc.splitTextToSize(v, CONTENT_W)
  ensureSpace(doc, c, 3.2 + 1 + wrapped.length * 4 + 4)
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
  setInk(doc, BRAND.ink)
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
    doc.text(item, x + padX, c.y + 3.5)
    x += w + 2
  }
  c.y += rowH + 5
}

function yn(v: string) {
  if (v === 'yes') return 'Yes'
  if (v === 'no') return 'No'
  if (v === 'na') return 'N/A'
  return v || '—'
}

function fmtDate(d: string) {
  if (!d) return ''
  const m = d.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (!m) return d
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${m[3]} ${months[parseInt(m[2], 10) - 1]} ${m[1]}`
}

function fullName(d: OnboardingData) {
  return [d.personal.title, d.personal.firstName, d.personal.middleNames, d.personal.surname]
    .map((s) => s.trim())
    .filter(Boolean)
    .join(' ')
}

// ── Main entry ────────────────────────────────────────────────────
export function generateOnboardingPdf(data: OnboardingData): jsPDF {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true })
  const c: Cursor = { y: PAGE.marginTop, page: 1 }
  const name = fullName(data)

  // Cover band
  doc.setFillColor(BRAND.deep[0], BRAND.deep[1], BRAND.deep[2])
  doc.rect(0, 0, PAGE.w, 70, 'F')
  drawLogoMark(doc, PAGE.marginX, 22, 18, BRAND.deep)
  doc.setFont(FONT.display, 'normal')
  doc.setFontSize(11)
  doc.setTextColor(245, 240, 232)
  doc.text('Horizon Care Services', PAGE.marginX + 23, 30)
  doc.setFont(FONT.body, 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(190, 180, 170)
  doc.text('New worker onboarding record', PAGE.marginX + 23, 35)
  doc.setFont(FONT.display, 'normal')
  doc.setFontSize(28)
  doc.setTextColor(248, 246, 242)
  doc.text(name || 'New Worker', PAGE.marginX, 56)
  doc.setFont(FONT.body, 'normal')
  doc.setFontSize(9)
  doc.setTextColor(190, 180, 170)
  doc.text(
    `Submitted ${fmtDate(data.declaration.date) || fmtDate(new Date().toISOString().slice(0, 10))}`,
    PAGE.marginX,
    62,
  )

  c.y = 84

  // Summary strip
  doc.setFont(FONT.body, 'bold')
  doc.setFontSize(7)
  setInk(doc, BRAND.amber)
  doc.text('SUMMARY', PAGE.marginX, c.y + 3, { charSpace: 0.6 })
  c.y += 8

  fieldRow(doc, c, [
    { label: 'Email', value: data.contact.email },
    { label: 'Mobile', value: data.contact.mobile },
    { label: 'NI number', value: data.payroll.niNumber.toUpperCase() },
    { label: 'Earliest start', value: fmtDate(data.contract.earliestStart) },
  ])
  fieldRow(doc, c, [
    { label: 'Bank account', value: data.bank.accountName },
    { label: 'Sort code', value: data.bank.sortCode },
    { label: 'Account number', value: data.bank.accountNumber },
    { label: 'Bank', value: data.bank.bankName },
  ])

  // Section 01 — Personal
  sectionTitle(doc, c, 'Section 01', 'Personal details')
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

  // Section 02 — Contact
  sectionTitle(doc, c, 'Section 02', 'Contact details')
  fieldRow(doc, c, [
    { label: 'Email', value: data.contact.email },
    { label: 'Mobile', value: data.contact.mobile },
    { label: 'Telephone (alt)', value: data.contact.telephone },
  ])
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
    paragraph(doc, c, 'Previous address', data.address.previousAddress)
  }

  // Section 03 — Emergency
  sectionTitle(doc, c, 'Section 03', 'Emergency contact')
  fieldRow(doc, c, [
    { label: 'Name', value: data.emergency.name },
    { label: 'Relationship', value: data.emergency.relationship },
    { label: 'Phone', value: data.emergency.phone },
    { label: 'Email', value: data.emergency.email },
  ])

  // Section 04 — Bank
  sectionTitle(doc, c, 'Section 04', 'Bank details')
  fieldRow(doc, c, [
    { label: 'Account name', value: data.bank.accountName },
    { label: 'Sort code', value: data.bank.sortCode },
    { label: 'Account number', value: data.bank.accountNumber },
    { label: 'Bank / building society', value: data.bank.bankName },
  ])

  // Section 05 — Tax & payroll
  sectionTitle(doc, c, 'Section 05', 'Tax & payroll')
  fieldRow(doc, c, [
    { label: 'NI number', value: data.payroll.niNumber.toUpperCase() },
    { label: 'Starter declaration', value: `Statement ${data.payroll.starterDeclaration}` },
    { label: 'Student loan', value: yn(data.payroll.studentLoan) },
    { label: 'Student loan plan', value: data.payroll.studentLoanPlan.replace('plan', 'Plan ').replace('postgrad', 'Postgraduate') },
  ])
  fieldRow(doc, c, [
    { label: 'P45 from previous employer', value: yn(data.payroll.hasPreviousP45) },
  ])

  // Section 06 — Contract
  sectionTitle(doc, c, 'Section 06', 'Contract preference')
  const contractLabels: Record<string, string> = { 'zero-hours': 'Zero-hours', 'part-time': 'Part-time', 'full-time': 'Full-time' }
  fieldRow(doc, c, [
    { label: 'Contract type', value: contractLabels[data.contract.type] || '' },
    { label: 'Hours / week (min)', value: data.contract.hoursMin },
    { label: 'Hours / week (max)', value: data.contract.hoursMax },
    { label: 'Earliest start date', value: fmtDate(data.contract.earliestStart) },
  ])

  // Section 07 — Availability
  sectionTitle(doc, c, 'Section 07', 'Availability')
  chips(doc, c, 'Available days', data.availability.days)
  chips(doc, c, 'Shift preferences', data.availability.shifts)

  // Section 08 — Work preferences
  sectionTitle(doc, c, 'Section 08', 'Work preferences')
  chips(doc, c, 'Care settings', data.preferences.settings)
  chips(doc, c, 'Skills & specialisms', data.preferences.skills)
  if (data.preferences.additionalNotes.trim()) {
    paragraph(doc, c, 'Additional notes', data.preferences.additionalNotes)
  }

  // Section 09 — Transport
  sectionTitle(doc, c, 'Section 09', 'Transport')
  fieldRow(doc, c, [
    { label: 'Own car', value: yn(data.transport.hasCar) },
    { label: 'Business-use insurance', value: yn(data.transport.businessInsurance) },
    { label: 'Max travel (miles)', value: data.transport.maxTravelMiles },
    { label: 'Uses public transport', value: yn(data.transport.usesPublicTransport) },
  ])

  // Section 10 — Declaration & signature
  sectionTitle(doc, c, 'Section 10', 'Declaration & signature')
  paragraph(
    doc,
    c,
    'Declaration',
    'I confirm that all information provided in this onboarding form is accurate and complete. I understand that any false statement or omission may result in dismissal. I consent to Horizon Care Services Ltd processing the personal data above for employment and payroll purposes.',
  )
  ensureSpace(doc, c, 26)
  doc.setFont(FONT.body, 'bold')
  doc.setFontSize(6.8)
  setInk(doc, BRAND.inkSoft)
  doc.text('SIGNED', PAGE.marginX, c.y, { charSpace: 0.5 })
  doc.text('DATE', PAGE.marginX + CONTENT_W * 0.6, c.y, { charSpace: 0.5 })
  doc.setFont(FONT.display, 'italic')
  doc.setFontSize(18)
  setInk(doc, BRAND.ink)
  doc.text(data.declaration.signature || '—', PAGE.marginX, c.y + 9)
  doc.setFont(FONT.body, 'normal')
  doc.setFontSize(10)
  doc.text(fmtDate(data.declaration.date) || '—', PAGE.marginX + CONTENT_W * 0.6, c.y + 9)
  doc.setLineWidth(0.3)
  setRule(doc, BRAND.ink)
  doc.line(PAGE.marginX, c.y + 12, PAGE.marginX + CONTENT_W * 0.55, c.y + 12)
  doc.line(PAGE.marginX + CONTENT_W * 0.6, c.y + 12, PAGE.w - PAGE.marginX, c.y + 12)
  c.y += 18

  // Headers & footers
  const totalPages = doc.getNumberOfPages()
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p)
    if (p > 1) drawHeader(doc, name)
    drawFooter(doc, p, totalPages, name)
  }

  return doc
}

export function buildPdfFilename(data: OnboardingData): string {
  const safeName = fullName(data)
    .replace(/[^A-Za-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  const date = (data.declaration.date || new Date().toISOString().slice(0, 10)).replace(/-/g, '')
  return `HCS-Onboarding_${safeName || 'Worker'}_${date}.pdf`
}
