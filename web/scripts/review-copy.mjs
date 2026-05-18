/**
 * Round 2: Critical editorial review of generated copy.
 * Takes copy-draft.json, checks agency positioning, outputs copy-final.json.
 * Usage: node scripts/review-copy.mjs
 */

import Anthropic from '@anthropic-ai/sdk'
import { readFileSync, writeFileSync } from 'fs'

const client = new Anthropic()

const REVIEW_PROMPT = `
You are a critical editor reviewing website copy for a healthcare STAFFING AGENCY called Horizon Care Services.

Rules for the copy:
1. The company PLACES staff — they do NOT deliver care directly
2. No language implying they run a nursing home, care home, or provide personal care themselves
3. No filler words: "passionate", "dedicated", "committed", "proud"
4. Short sentences, active voice, direct
5. Calm and professional tone
6. Target audience: NHS commissioners, LA commissioners, care home managers (for services); registered nurses, HCAs, social workers etc (for careers)

For each section, either approve it (return as-is) or rewrite it to fix problems.
Return ONLY valid JSON matching the input structure.
`

async function main() {
  const draft = JSON.parse(readFileSync('scripts/copy-draft.json', 'utf8'))

  const msg = await client.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 2000,
    messages: [{
      role: 'user',
      content: `${REVIEW_PROMPT}\n\nHere is the draft copy to review:\n${JSON.stringify(draft, null, 2)}\n\nReturn the reviewed/corrected JSON only.`
    }]
  })

  const text = msg.content[0].text.trim()
  const jsonStart = text.indexOf('{')
  const jsonEnd = text.lastIndexOf('}')
  const json = JSON.parse(text.slice(jsonStart, jsonEnd + 1))

  writeFileSync('scripts/copy-final.json', JSON.stringify(json, null, 2))
  console.log('copy-final.json written successfully')
  console.log(JSON.stringify(json, null, 2))
}

main().catch(console.error)
