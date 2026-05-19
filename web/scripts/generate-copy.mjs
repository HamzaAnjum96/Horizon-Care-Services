/**
 * Round 1: Generate copy for all rewritten sections.
 * Requires ANTHROPIC_API_KEY in env.
 * Usage: node scripts/generate-copy.mjs > scripts/copy-draft.json
 */

import Anthropic from '@anthropic-ai/sdk'
import { writeFileSync } from 'fs'

const client = new Anthropic()

const BRAND_VOICE = `
Horizon Care Services is a healthcare staffing agency.
We supply registered nurses, social workers, occupational therapists,
physiotherapists, healthcare assistants, and support workers to NHS trusts,
local authorities, and care organisations across England.

Brand voice rules:
- Calm, direct, professional
- Short sentences. Active voice.
- No filler: "passionate", "dedicated", "committed to excellence" are banned
- Confident without being aggressive
- We use "we" for the organisation
- Never imply we are a nursing home, care home, or direct care provider
- We PLACE staff, we do not DELIVER care directly
`

const SECTIONS = {
  'hero-kicker':   'The section header badge above the hero headline (short, e.g. "Healthcare staffing · England")',
  'hero-headline': 'The main hero H1 (5–7 short words, punchy)',
  'hero-body':     'A 1–2 sentence body paragraph under the headline. Max 40 words. Position as staffing agency for NHS/LA.',
  'footer-tagline':'A single sentence tagline for the footer. Max 15 words. Reflects staffing agency.',
  'organisations-tab-headline': '5–6 word headline for the "For Organisations" folder tab',
  'organisations-tab-body':     '2–3 sentence body for the "For Organisations" tab. For NHS/LA commissioners.',
  'professionals-tab-headline': '5–6 word headline for the "For Healthcare Professionals" tab',
  'professionals-tab-body':     '2–3 sentence body for healthcare professionals joining the register.',
  'about-intro-heading':        'A short subheading (max 12 words) for the "Who we are" section of the About page. No CQC.',
  'about-intro-p1':             'First paragraph (2–3 sentences) introducing HCS as a staffing agency. No CQC.',
  'about-intro-p2':             'Second paragraph (2–3 sentences) about 3 years experience and selectivity of staff.',
  'about-approach-1-title':     'Title for first approach pillar: about vetting/selecting staff carefully',
  'about-approach-1-body':      'Body (2–3 sentences) for the careful selection approach pillar',
  'about-approach-2-title':     'Title for second approach pillar: about coordination and communication',
  'about-approach-2-body':      'Body (2–3 sentences) for the coordination approach pillar',
  'about-approach-3-title':     'Title for third approach pillar: about being honest about capacity',
  'about-approach-3-body':      'Body (2–3 sentences) for the honest-about-capacity approach pillar',
}

async function generateSection(key, description) {
  const msg = await client.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 200,
    messages: [{
      role: 'user',
      content: `${BRAND_VOICE}\n\nWrite the following for the website:\n${description}\n\nReturn ONLY the copy text, no quotes, no explanation.`
    }]
  })
  return msg.content[0].text.trim()
}

async function main() {
  const result = {}
  for (const [key, desc] of Object.entries(SECTIONS)) {
    process.stderr.write(`Generating: ${key}...\n`)
    result[key] = await generateSection(key, desc)
  }
  writeFileSync('scripts/copy-draft.json', JSON.stringify(result, null, 2))
  console.log(JSON.stringify(result, null, 2))
}

main().catch(console.error)
