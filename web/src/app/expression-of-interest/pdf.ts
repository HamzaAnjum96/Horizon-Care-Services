import jsPDF from 'jspdf'
import type { ExpressionData } from './types'

// Brand tokens — matched to globals.css / branding-grid.tsx exact hex values
const BRAND = {
  ink:     [38,  28,  28 ] as const,   // --ink-dark
  inkSoft: [88,  78,  78 ] as const,   // --ink-muted-dark
  rule:    [220, 215, 210] as const,   // --rule-light
  cream:   [247, 243, 238] as const,   // #F7F3EE  --cream
  deep:    [28,  24,  20 ] as const,   // #1C1814  --deep  (cover band)
  amber:   [173, 73,  50 ] as const,   // --amber
  brand:   [92,  16,  32 ] as const,   // #5C1020  --brand  (logo primary)
}

const FONT = { display: 'times', body: 'helvetica' }

const PAGE = { w: 210, h: 297, marginX: 20, marginTop: 32, marginBottom: 24 }
const CONTENT_W = PAGE.w - PAGE.marginX * 2

type Doc = jsPDF
type Cursor = { y: number; page: number }

// ── Logo images ──────────────────────────────────────────────────
// Pre-exported transparent PNGs from /public/brand/ — same files used by the
// onboarding record so the two documents share a consistent header.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

async function fetchDataUrl(path: string): Promise<string> {
  const res = await fetch(path)
  if (!res.ok) throw new Error(`Failed to load logo image: ${path}`)
  const blob = await res.blob()
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(new Error(`Failed to read image: ${path}`))
    reader.readAsDataURL(blob)
  })
}

async function loadLogos(): Promise<{ primary: string; reversed: string }> {
  const [primary, reversed] = await Promise.all([
    fetchDataUrl(`${BASE_PATH}/brand/hcs-mark-primary-tr.png`),
    fetchDataUrl(`${BASE_PATH}/brand/hcs-mark-cream-tr.png`),
  ])
  return { primary, reversed }
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

function drawHeader(doc: Doc, logos: { primary: string }, name: string) {
  doc.addImage(logos.primary, 'PNG', PAGE.marginX, 11, 13, 13)

  doc.setFont(FONT.display, 'normal')
  doc.setFontSize(11)
  setInk(doc, BRAND.ink)
  doc.text('Horizon Care Services', PAGE.marginX + 16, 17)

  doc.setFont(FONT.body, 'normal')
  doc.setFontSize(7)
  setInk(doc, BRAND.inkSoft)
  doc.text('Expression of interest', PAGE.marginX + 16, 21.5)

  doc.setFont(FONT.body, 'normal')
  doc.setFontSize(8)
  setInk(doc, BRAND.inkSoft)
  doc.text(name, PAGE.w - PAGE.marginX, 17, { align: 'right' })

  setRule(doc, BRAND.rule)
  doc.setLineWidth(0.3)
  doc.line(PAGE.marginX, 27, PAGE.w - PAGE.marginX, 27)
}

function drawFooter(doc: Doc, pageNum: number, totalPages: number, name: string) {
  const y = PAGE.h - 11
  setRule(doc, BRAND.rule)
  doc.setLineWidth(0.2)
  doc.line(PAGE.marginX, y - 4, PAGE.w - PAGE.marginX, y - 4)
  doc.setFont(FONT.body, 'normal')
  doc.setFontSize(7)
  setInk(doc, BRAND.inkSoft)
  doc.text('Horizon Care Services Ltd · Company No. 14615041', PAGE.marginX, y)
  doc.text(name || 'Applicant', PAGE.w / 2, y, { align: 'center' })
  doc.text(`Page ${pageNum} of ${totalPages}`, PAGE.w - PAGE.marginX, y, { align: 'right' })
}

function sectionTitle(doc: Doc, c: Cursor, kicker: string, title: string) {
  ensureSpace(doc, c, 22)
  doc.setFont(FONT.body, 'bold')
  doc.setFontSize(7)
  setInk(doc, BRAND.amber)
  doc.text(kicker.toUpperCase(), PAGE.marginX, c.y, { charSpace: 0.8 })
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
    doc.setFontSize(10)
    setInk(doc, BRAND.ink)
    doc.text(doc.splitTextToSize(v, colW), x, c.y + labelH + 1.5)
  })
  c.y += rowH + 4
}

function fmtDate(d: string) {
  if (!d) return ''
  const m = d.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (!m) return d
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${m[3]} ${months[parseInt(m[2], 10) - 1]} ${m[1]}`
}

// ── Main entry ────────────────────────────────────────────────────
export async function generateExpressionPdf(data: ExpressionData): Promise<jsPDF> {
  const logos = await loadLogos()

  const doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true })
  const c: Cursor = { y: PAGE.marginTop, page: 1 }
  const name = data.fullName.trim()
  const today = fmtDate(new Date().toISOString().slice(0, 10))

  // Cover band
  doc.setFillColor(BRAND.deep[0], BRAND.deep[1], BRAND.deep[2])
  doc.rect(0, 0, PAGE.w, 76, 'F')

  // Cream mark on dark cover band — transparent PNG, no background box
  doc.addImage(logos.reversed, 'PNG', PAGE.marginX, 18, 24, 24)

  doc.setFont(FONT.display, 'normal')
  doc.setFontSize(11)
  doc.setTextColor(245, 240, 232)
  doc.text('Horizon Care Services', PAGE.marginX + 29, 29)

  doc.setFont(FONT.body, 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(190, 180, 170)
  doc.text('Expression of interest', PAGE.marginX + 29, 34)

  doc.setFont(FONT.display, 'normal')
  doc.setFontSize(32)
  doc.setTextColor(248, 246, 242)
  doc.text(name || 'Applicant', PAGE.marginX, 62)

  doc.setFont(FONT.body, 'normal')
  doc.setFontSize(9)
  doc.setTextColor(190, 180, 170)
  doc.text(`Submitted ${today}`, PAGE.marginX, 70)

  // Position pill (right-aligned on cover band)
  if (data.position.trim()) {
    const pill = data.position.trim()
    doc.setFont(FONT.body, 'bold')
    doc.setFontSize(8)
    const pillW = doc.getTextWidth(pill) + 8
    doc.setFillColor(BRAND.amber[0], BRAND.amber[1], BRAND.amber[2])
    doc.roundedRect(PAGE.w - PAGE.marginX - pillW, 22, pillW, 6.5, 1.5, 1.5, 'F')
    doc.setTextColor(248, 246, 242)
    doc.text(pill, PAGE.w - PAGE.marginX - 4, 26.2, { align: 'right' })
  }

  c.y = 96

  // Summary background panel
  doc.setFillColor(239, 235, 229)
  doc.rect(0, 76, PAGE.w, 44, 'F')

  doc.setFont(FONT.body, 'bold')
  doc.setFontSize(7)
  setInk(doc, BRAND.amber)
  doc.text('SUMMARY', PAGE.marginX, c.y, { charSpace: 0.8 })
  c.y += 10

  fieldRow(doc, c, [
    { label: 'Email', value: data.contact.email },
    { label: 'Phone', value: data.contact.phone },
    { label: 'Postcode', value: data.address.postcode },
  ])

  // 01 — Applicant
  sectionTitle(doc, c, 'Section 01', 'Applicant')
  fieldRow(doc, c, [
    { label: 'Full name', value: data.fullName },
    { label: 'Position applying for', value: data.position },
  ])

  // 02 — Contact
  sectionTitle(doc, c, 'Section 02', 'Contact details')
  fieldRow(doc, c, [
    { label: 'Email', value: data.contact.email },
    { label: 'Phone', value: data.contact.phone },
  ])

  // 03 — Address
  sectionTitle(doc, c, 'Section 03', 'Address')
  fieldRow(doc, c, [
    { label: 'Address line 1', value: data.address.line1 },
    { label: 'Address line 2', value: data.address.line2 },
  ])
  fieldRow(doc, c, [
    { label: 'Town / city', value: data.address.town },
    { label: 'County', value: data.address.county },
    { label: 'Postcode', value: data.address.postcode },
  ])

  // 04 — CV
  sectionTitle(doc, c, 'Section 04', 'Curriculum vitae')
  fieldRow(doc, c, [
    { label: 'CV file', value: data.cvFileName || '—' },
  ])
  doc.setFont(FONT.body, 'italic')
  doc.setFontSize(8.5)
  setInk(doc, BRAND.inkSoft)
  doc.text(
    'The CV named above is attached to the applicant’s covering email.',
    PAGE.marginX,
    c.y,
  )
  c.y += 8

  // Consent note
  sectionTitle(doc, c, 'Section 05', 'Consent')
  doc.setFont(FONT.body, 'normal')
  doc.setFontSize(9.5)
  setInk(doc, BRAND.ink)
  const consentText = doc.splitTextToSize(
    data.consent
      ? 'The applicant consents to Horizon Care Services Ltd processing the personal data in this expression of interest for recruitment purposes, in line with the company privacy policy.'
      : 'Consent for data processing was not recorded.',
    CONTENT_W,
  )
  doc.text(consentText, PAGE.marginX, c.y)
  c.y += consentText.length * 4.5 + 4

  // Headers & footers on all pages
  const totalPages = doc.getNumberOfPages()
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p)
    if (p > 1) drawHeader(doc, logos, name)
    drawFooter(doc, p, totalPages, name)
  }

  return doc
}

export function buildPdfFilename(data: ExpressionData): string {
  const safeName = data.fullName
    .replace(/[^A-Za-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  return `HCS-Expression-of-Interest_${safeName || 'Applicant'}_${date}.pdf`
}
