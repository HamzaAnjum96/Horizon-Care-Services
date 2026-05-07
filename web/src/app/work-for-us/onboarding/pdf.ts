import jsPDF from 'jspdf'
import type { OnboardingData } from './types'

// Brand tokens — matched to globals.css and branding-grid.tsx
const BRAND = {
  ink:     [38,  28,  28 ] as const,   // --ink-dark
  inkSoft: [88,  78,  78 ] as const,   // --ink-muted-dark
  rule:    [220, 215, 210] as const,   // --rule-light
  cream:   [247, 243, 238] as const,   // #F7F3EE  --cream
  deep:    [28,  24,  20 ] as const,   // #1C1814  --deep
  amber:   [173, 73,  50 ] as const,   // --amber
  brand:   [92,  16,  32 ] as const,   // #5C1020  --brand (logo mark only)
}

const FONT = { display: 'times', body: 'helvetica' }

const PAGE = { w: 210, h: 297, marginX: 20, marginTop: 32, marginBottom: 24 }
const CONTENT_W = PAGE.w - PAGE.marginX * 2

type Doc = jsPDF
type Cursor = { y: number; page: number }

// ── Logo ─────────────────────────────────────────────────────────
// Actual SVG path from hcs-logo.tsx — uses cubic Bézier curves (C) and
// fillRule="evenodd" so the inner shapes punch through the outer body.
const LOGO_SVG_PATH =
  'M515.40 396.40C576.24 342.59 644.61 277.25 728.29 263.36C851.52 242.90 951.60 377.80 950.91 490.87C950.46 565.17 919.50 634.46 880.18 696.31C790.82 836.84 645.82 933.72 475.58 920.80C290.64 906.76 89.27 699.94 75.56 516.69C64.58 369.86 194.72 216.68 348.24 278.17C411.57 303.54 463.95 353.25 515.40 396.40Z M578.00 466.90C610.43 496.81 642.74 527.23 680.35 550.69C697.92 561.66 717.01 571.30 737.20 576.43C874.16 611.22 877.82 389.94 749.56 377.46C727.71 375.33 705.92 381.52 686.21 390.43C645.56 408.79 611.76 438.46 578.00 466.90Z M792.40 657.50C770.53 663.58 748.89 669.14 725.96 667.27C606.30 657.54 503.24 529.99 422.10 454.36C388.13 422.71 343.75 376.20 293.10 375.24C272.85 374.86 252.53 382.08 235.89 393.34C167.11 439.88 179.12 531.41 209.11 597.12C231.19 645.48 262.44 689.53 301.78 725.39C416.34 829.83 536.96 841.51 671.24 764.17C719.05 736.64 756.48 698.66 792.40 657.50Z'
const LOGO_CIRCLE = { cx: 511.4, cy: 201.7, r: 99.6 }

// Parse SVG M/C/Z path into PDF content-stream operators.
// Coordinates are left untransformed — the cm matrix handles scale+flip.
function svgPathToPdfOps(d: string): string {
  const tokens = d.match(/[MCZmcz]|[-+]?\d*\.?\d+/g) || []
  const ops: string[] = []
  let i = 0
  while (i < tokens.length) {
    const cmd = tokens[i]
    if (cmd === 'M') {
      ops.push(`${tokens[i + 1]} ${tokens[i + 2]} m`)
      i += 3
    } else if (cmd === 'C') {
      i += 1
      // C can be followed by implicit repetitions (6 numbers per curve)
      while (i < tokens.length && /^[-+\d]/.test(tokens[i])) {
        ops.push(
          `${tokens[i]} ${tokens[i+1]} ${tokens[i+2]} ${tokens[i+3]} ${tokens[i+4]} ${tokens[i+5]} c`,
        )
        i += 6
      }
    } else if (cmd === 'Z' || cmd === 'z') {
      ops.push('h')
      i += 1
    } else {
      i += 1
    }
  }
  return ops.join(' ')
}

// Draw the HCS logo mark at (x, y) mm (top-left), sized size×size mm.
// Uses raw PDF operators so Bézier curves and even-odd fill are exact.
function drawLogoMark(
  doc: Doc,
  x: number,
  y: number,
  size: number,
  color: readonly [number, number, number],
) {
  // jsPDF scaleFactor: user units (mm) → PDF points
  const sf = doc.internal.scaleFactor
  // Page height in PDF points (PDF origin is bottom-left)
  const pageH_pt = doc.internal.pageSize.height * sf

  // Scale from SVG units (0–1024) to PDF points, with Y-axis flip
  const s = (size * sf) / 1024
  const tx = x * sf
  const ty = pageH_pt - y * sf // top of logo in PDF coords

  // Normalise RGB 0-255 → 0-1 for PDF rg operator
  const r = (color[0] / 255).toFixed(4)
  const g = (color[1] / 255).toFixed(4)
  const b = (color[2] / 255).toFixed(4)

  const w = (s: string) => doc.internal.write(s)

  w('q')
  // Transformation matrix: scale + flip Y so SVG Y-down maps to PDF Y-up
  w(`${s.toFixed(6)} 0 0 ${(-s).toFixed(6)} ${tx.toFixed(3)} ${ty.toFixed(3)} cm`)
  w(`${r} ${g} ${b} rg`) // non-stroking fill colour

  // Compound path with even-odd fill — inner shapes cut through outer body
  w(svgPathToPdfOps(LOGO_SVG_PATH))
  w('f*') // f* = fill with even-odd rule

  // Circle (separate SVG element — just a plain filled circle)
  const { cx, cy, r: cr } = LOGO_CIRCLE
  const k = cr * 0.5523 // cubic Bézier approximation constant
  w(
    `${cx + cr} ${cy} m ` +
    `${cx + cr} ${cy + k} ${cx + k} ${cy + cr} ${cx} ${cy + cr} c ` +
    `${cx - k} ${cy + cr} ${cx - cr} ${cy + k} ${cx - cr} ${cy} c ` +
    `${cx - cr} ${cy - k} ${cx - k} ${cy - cr} ${cx} ${cy - cr} c ` +
    `${cx + k} ${cy - cr} ${cx + cr} ${cy - k} ${cx + cr} ${cy} c h f`,
  )

  w('Q')
}

// ── Layout helpers ────────────────────────────────────────────────
function ensureSpace(doc: Doc, c: Cursor, needed: number) {
  if (c.y + needed > PAGE.h - PAGE.marginBottom) {
    doc.addPage()
    c.page += 1
    c.y = PAGE.marginTop
  }
}

function setInk(doc: Doc, rgb: readonly [number, number, number]) {
  doc.setTextColor(rgb[0], rgb[1], rgb[2])
}

function setRule(doc: Doc, rgb: readonly [number, number, number]) {
  doc.setDrawColor(rgb[0], rgb[1], rgb[2])
}

function drawHeader(doc: Doc, workerName: string) {
  drawLogoMark(doc, PAGE.marginX, 11, 13, BRAND.brand)

  doc.setFont(FONT.display, 'normal')
  doc.setFontSize(11)
  setInk(doc, BRAND.ink)
  doc.text('Horizon Care Services', PAGE.marginX + 16, 17)

  doc.setFont(FONT.body, 'normal')
  doc.setFontSize(7)
  setInk(doc, BRAND.inkSoft)
  doc.text('New worker onboarding record', PAGE.marginX + 16, 21.5)

  doc.setFont(FONT.body, 'normal')
  doc.setFontSize(8)
  setInk(doc, BRAND.inkSoft)
  doc.text(workerName, PAGE.w - PAGE.marginX, 17, { align: 'right' })

  setRule(doc, BRAND.rule)
  doc.setLineWidth(0.3)
  doc.line(PAGE.marginX, 27, PAGE.w - PAGE.marginX, 27)
}

function drawFooter(doc: Doc, pageNum: number, totalPages: number, workerName: string) {
  const y = PAGE.h - 11
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
  ensureSpace(doc, c, 22)
  doc.setFont(FONT.body, 'bold')
  doc.setFontSize(7)
  setInk(doc, BRAND.amber)
  doc.text(kicker.toUpperCase(), PAGE.marginX, c.y, { charSpace: 0.6 })
  doc.setFont(FONT.display, 'normal')
  doc.setFontSize(13)
  setInk(doc, BRAND.ink)
  doc.text(title, PAGE.marginX, c.y + 6.5)
  setRule(doc, BRAND.ink)
  doc.setLineWidth(0.4)
  doc.line(PAGE.marginX, c.y + 9, PAGE.marginX + 14, c.y + 9)
  c.y += 16
}

function fieldRow(doc: Doc, c: Cursor, fields: Array<{ label: string; value: string }>) {
  const gap = 5
  const colW = (CONTENT_W - gap * (fields.length - 1)) / fields.length

  const heights = fields.map((f) => {
    const ll = doc.splitTextToSize(f.label.toUpperCase(), Math.max(colW - 2, 12))
    const vl = doc.splitTextToSize(f.value && f.value.trim() ? f.value : '—', colW)
    return ll.length * 3.4 + 1.5 + vl.length * 4.5 + 3
  })
  const rowH = Math.max(...heights)
  ensureSpace(doc, c, rowH + 4)

  fields.forEach((f, i) => {
    const x = PAGE.marginX + i * (colW + gap)
    const v = f.value && f.value.trim() ? f.value : '—'

    doc.setFont(FONT.body, 'bold')
    doc.setFontSize(6.8)
    setInk(doc, BRAND.inkSoft)
    const ll = doc.splitTextToSize(f.label.toUpperCase(), Math.max(colW - 2, 12))
    doc.text(ll, x, c.y, { charSpace: 0.5 })
    const labelH = ll.length * 3.4

    doc.setFont(FONT.body, 'normal')
    doc.setFontSize(9.5)
    setInk(doc, BRAND.ink)
    doc.text(doc.splitTextToSize(v, colW), x, c.y + labelH + 1.5)
  })
  c.y += rowH + 4
}

function paragraph(doc: Doc, c: Cursor, label: string, value: string) {
  const v = value && value.trim() ? value : '—'
  doc.setFont(FONT.body, 'normal')
  doc.setFontSize(9.5)
  const wrapped = doc.splitTextToSize(v, CONTENT_W)
  ensureSpace(doc, c, 3.4 + 1.5 + wrapped.length * 4.5 + 5)
  doc.setFont(FONT.body, 'bold')
  doc.setFontSize(6.8)
  setInk(doc, BRAND.inkSoft)
  doc.text(label.toUpperCase(), PAGE.marginX, c.y, { charSpace: 0.5 })
  doc.setFont(FONT.body, 'normal')
  doc.setFontSize(9.5)
  setInk(doc, BRAND.ink)
  doc.text(wrapped, PAGE.marginX, c.y + 5)
  c.y += 5 + wrapped.length * 4.5 + 5
}

function chips(doc: Doc, c: Cursor, label: string, items: string[]) {
  ensureSpace(doc, c, 14)
  doc.setFont(FONT.body, 'bold')
  doc.setFontSize(6.8)
  setInk(doc, BRAND.inkSoft)
  doc.text(label.toUpperCase(), PAGE.marginX, c.y, { charSpace: 0.5 })
  c.y += 4

  if (!items.length) {
    doc.setFont(FONT.body, 'italic')
    doc.setFontSize(9)
    setInk(doc, BRAND.inkSoft)
    doc.text('—', PAGE.marginX, c.y + 3.5)
    c.y += 8
    return
  }

  doc.setFont(FONT.body, 'normal')
  doc.setFontSize(8.5)
  setInk(doc, BRAND.ink)
  let x = PAGE.marginX
  const rowH = 5.5
  const padX = 3

  for (const item of items) {
    const w = doc.getTextWidth(item) + padX * 2
    if (x + w > PAGE.w - PAGE.marginX) {
      x = PAGE.marginX
      c.y += rowH + 2
      ensureSpace(doc, c, rowH + 6)
    }
    setRule(doc, BRAND.rule)
    doc.setLineWidth(0.2)
    doc.roundedRect(x, c.y, w, rowH, 0.9, 0.9, 'S')
    doc.text(item, x + padX, c.y + 3.8)
    x += w + 2.5
  }
  c.y += rowH + 6
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
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
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
  doc.rect(0, 0, PAGE.w, 76, 'F')

  // Logo mark on cover — render on deep background (reversed variant: white mark)
  drawLogoMark(doc, PAGE.marginX, 20, 20, [245, 240, 232])

  doc.setFont(FONT.display, 'normal')
  doc.setFontSize(11)
  doc.setTextColor(245, 240, 232)
  doc.text('Horizon Care Services', PAGE.marginX + 26, 29)

  doc.setFont(FONT.body, 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(190, 180, 170)
  doc.text('New worker onboarding record', PAGE.marginX + 26, 34)

  doc.setFont(FONT.display, 'normal')
  doc.setFontSize(28)
  doc.setTextColor(248, 246, 242)
  doc.text(name || 'New Worker', PAGE.marginX, 58)

  doc.setFont(FONT.body, 'normal')
  doc.setFontSize(9)
  doc.setTextColor(190, 180, 170)
  const submittedDate = fmtDate(data.declaration.date) || fmtDate(new Date().toISOString().slice(0, 10))
  doc.text(`Submitted ${submittedDate}`, PAGE.marginX, 65)

  // Employment start date badge
  if (data.personal.employmentStartDate) {
    const badge = `Start: ${fmtDate(data.personal.employmentStartDate)}`
    doc.setFont(FONT.body, 'bold')
    doc.setFontSize(8)
    const badgeW = doc.getTextWidth(badge) + 8
    doc.setFillColor(BRAND.amber[0], BRAND.amber[1], BRAND.amber[2])
    doc.roundedRect(PAGE.w - PAGE.marginX - badgeW, 22, badgeW, 6.5, 1.5, 1.5, 'F')
    doc.setTextColor(248, 246, 242)
    doc.text(badge, PAGE.w - PAGE.marginX - 4, 26.2, { align: 'right' })
  }

  c.y = 92

  // Summary strip
  doc.setFont(FONT.body, 'bold')
  doc.setFontSize(7)
  setInk(doc, BRAND.amber)
  doc.text('SUMMARY', PAGE.marginX, c.y, { charSpace: 0.6 })
  c.y += 10

  fieldRow(doc, c, [
    { label: 'Email', value: data.contact.email },
    { label: 'Mobile', value: data.contact.mobile },
    { label: 'NI number', value: data.payroll.niNumber.toUpperCase() },
    { label: 'Employment start date', value: fmtDate(data.personal.employmentStartDate) || fmtDate(data.contract.earliestStart) },
  ])
  fieldRow(doc, c, [
    { label: 'Bank account name', value: data.bank.accountName },
    { label: 'Sort code', value: data.bank.sortCode },
    { label: 'Account number', value: data.bank.accountNumber },
    { label: 'Bank', value: data.bank.bankName },
  ])

  // 01 — Personal
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
    { label: 'Sex (HMRC)', value: data.personal.sex === 'male' ? 'Male' : data.personal.sex === 'female' ? 'Female' : '—' },
    { label: 'Employment start date', value: fmtDate(data.personal.employmentStartDate) },
  ])
  fieldRow(doc, c, [
    { label: 'Gender identity', value: data.personal.gender || '—' },
    { label: 'Pronouns', value: data.personal.pronouns || '—' },
  ])

  // 02 — Contact
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
    { label: 'Country', value: data.address.country || 'England' },
  ])
  fieldRow(doc, c, [
    { label: 'Years at address', value: data.address.yearsAtAddress },
  ])
  if (data.address.previousAddress.trim()) {
    paragraph(doc, c, 'Previous address', data.address.previousAddress)
  }

  // 03 — Emergency
  sectionTitle(doc, c, 'Section 03', 'Emergency contact')
  fieldRow(doc, c, [
    { label: 'Name', value: data.emergency.name },
    { label: 'Relationship', value: data.emergency.relationship },
    { label: 'Phone', value: data.emergency.phone },
    { label: 'Email', value: data.emergency.email },
  ])

  // 04 — Bank
  sectionTitle(doc, c, 'Section 04', 'Bank details')
  fieldRow(doc, c, [
    { label: 'Account name', value: data.bank.accountName },
    { label: 'Sort code', value: data.bank.sortCode },
    { label: 'Account number', value: data.bank.accountNumber },
    { label: 'Bank / building society', value: data.bank.bankName },
  ])

  // 05 — Tax & payroll (HMRC Starter Checklist)
  sectionTitle(doc, c, 'Section 05', 'Tax & payroll (HMRC Starter Checklist)')
  fieldRow(doc, c, [
    { label: 'National Insurance number', value: data.payroll.niNumber.toUpperCase() },
    { label: 'Starter declaration', value: `Statement ${data.payroll.starterDeclaration}` },
    { label: 'P45 available', value: yn(data.payroll.hasPreviousP45) },
  ])
  const planLabel = data.payroll.studentLoanPlan
    ? data.payroll.studentLoanPlan.replace('plan', 'Plan ').replace('postgrad', 'Postgraduate')
    : '—'
  fieldRow(doc, c, [
    { label: 'Student / postgrad loan', value: yn(data.payroll.studentLoan) },
    { label: 'Loan not currently repaying', value: yn(data.payroll.studentLoanNotRepaying) },
    { label: 'Loan plan type', value: planLabel },
  ])

  // 06 — Contract
  sectionTitle(doc, c, 'Section 06', 'Contract preference')
  const contractLabels: Record<string, string> = {
    'zero-hours': 'Zero-hours',
    'part-time':  'Part-time',
    'full-time':  'Full-time',
  }
  fieldRow(doc, c, [
    { label: 'Contract type', value: contractLabels[data.contract.type] || '—' },
    { label: 'Hours / week (min)', value: data.contract.hoursMin || '—' },
    { label: 'Hours / week (max)', value: data.contract.hoursMax || '—' },
    { label: 'Preferred start date', value: fmtDate(data.contract.earliestStart) },
  ])

  // 07 — Availability
  sectionTitle(doc, c, 'Section 07', 'Availability')
  chips(doc, c, 'Available days', data.availability.days)
  chips(doc, c, 'Shift preferences', data.availability.shifts)

  // 08 — Work preferences
  sectionTitle(doc, c, 'Section 08', 'Work preferences')
  chips(doc, c, 'Care settings', data.preferences.settings)
  chips(doc, c, 'Skills & specialisms', data.preferences.skills)
  if (data.preferences.additionalNotes.trim()) {
    paragraph(doc, c, 'Additional notes', data.preferences.additionalNotes)
  }

  // 09 — Transport
  sectionTitle(doc, c, 'Section 09', 'Transport')
  fieldRow(doc, c, [
    { label: 'Own car', value: yn(data.transport.hasCar) },
    { label: 'Business-use insurance', value: yn(data.transport.businessInsurance) },
    { label: 'Max travel (miles)', value: data.transport.maxTravelMiles || '—' },
    { label: 'Uses public transport', value: yn(data.transport.usesPublicTransport) },
  ])

  // 10 — Declaration
  sectionTitle(doc, c, 'Section 10', 'Declaration & signature')
  paragraph(
    doc,
    c,
    'Declaration',
    'I confirm that all information provided in this onboarding form is accurate and complete. I understand that any false statement or omission may result in dismissal. I consent to Horizon Care Services Ltd processing the personal data above for employment and payroll purposes.',
  )

  ensureSpace(doc, c, 30)
  doc.setFont(FONT.body, 'bold')
  doc.setFontSize(6.8)
  setInk(doc, BRAND.inkSoft)
  doc.text('SIGNED', PAGE.marginX, c.y, { charSpace: 0.5 })
  doc.text('DATE', PAGE.marginX + CONTENT_W * 0.6, c.y, { charSpace: 0.5 })
  doc.setFont(FONT.display, 'italic')
  doc.setFontSize(18)
  setInk(doc, BRAND.ink)
  doc.text(data.declaration.signature || '—', PAGE.marginX, c.y + 10)
  doc.setFont(FONT.body, 'normal')
  doc.setFontSize(10)
  doc.text(fmtDate(data.declaration.date) || '—', PAGE.marginX + CONTENT_W * 0.6, c.y + 10)
  doc.setLineWidth(0.3)
  setRule(doc, BRAND.ink)
  doc.line(PAGE.marginX, c.y + 14, PAGE.marginX + CONTENT_W * 0.55, c.y + 14)
  doc.line(PAGE.marginX + CONTENT_W * 0.6, c.y + 14, PAGE.w - PAGE.marginX, c.y + 14)
  c.y += 20

  // Headers & footers on all pages
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
