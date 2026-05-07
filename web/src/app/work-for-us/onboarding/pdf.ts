import jsPDF from 'jspdf'
import type { OnboardingData } from './types'

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

const PAGE = { w: 210, h: 297, marginX: 20, marginTop: 32, marginBottom: 24 }
const CONTENT_W = PAGE.w - PAGE.marginX * 2

type Doc = jsPDF
type Cursor = { y: number; page: number }

// ── Logo ─────────────────────────────────────────────────────────
// Draws a reliable brand mark using shapes + text rather than SVG polygon
// fills, which vary across PDF viewers.
function drawLogoMark(doc: Doc, x: number, y: number, size: number, onDark: boolean) {
  const bg = onDark ? BRAND.deep : BRAND.cream
  const mark = size * 0.72

  // Outer circle in brand colour
  doc.setFillColor(BRAND.brand[0], BRAND.brand[1], BRAND.brand[2])
  doc.circle(x + mark / 2, y + mark / 2, mark / 2, 'F')

  // Inner circle cut-out in background colour (simulates logo ring)
  doc.setFillColor(bg[0], bg[1], bg[2])
  doc.circle(x + mark / 2, y + mark / 2, mark * 0.28, 'F')

  // "HCS" monogram
  doc.setFont(FONT.body, 'bold')
  doc.setFontSize(mark * 2.3)
  doc.setTextColor(248, 246, 242)
  doc.text('H', x + mark / 2, y + mark * 0.64, { align: 'center' })
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
  drawLogoMark(doc, PAGE.marginX, 11, 13, false)

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

  // Pre-compute actual heights so ensureSpace reserves enough room.
  const heights = fields.map((f) => {
    const labelLines = doc.splitTextToSize(f.label.toUpperCase(), Math.max(colW - 2, 12))
    const valueLines = doc.splitTextToSize(f.value && f.value.trim() ? f.value : '—', colW)
    return labelLines.length * 3.4 + 1.5 + valueLines.length * 4.5 + 3
  })
  const rowH = Math.max(...heights)
  ensureSpace(doc, c, rowH + 4)

  fields.forEach((f, i) => {
    const x = PAGE.marginX + i * (colW + gap)
    const v = f.value && f.value.trim() ? f.value : '—'

    doc.setFont(FONT.body, 'bold')
    doc.setFontSize(6.8)
    setInk(doc, BRAND.inkSoft)
    const labelLines = doc.splitTextToSize(f.label.toUpperCase(), Math.max(colW - 2, 12))
    doc.text(labelLines, x, c.y, { charSpace: 0.5 })
    const labelH = labelLines.length * 3.4

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
  const totalH = 3.4 + 1.5 + wrapped.length * 4.5 + 5
  ensureSpace(doc, c, totalH)
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

  drawLogoMark(doc, PAGE.marginX, 20, 20, true)

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
    const badge = `Start date: ${fmtDate(data.personal.employmentStartDate)}`
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
  doc.text('SUMMARY', PAGE.marginX, c.y + 3, { charSpace: 0.6 })
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

  // 05 — Tax & payroll
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
