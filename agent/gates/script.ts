// ============================================================
// SCRIPT GATE — free checks before any voice is paid for or any
// frame is rendered. Returns every problem (not just the first)
// so Claude can fix the script in one pass.
// ============================================================
import { allSentences, AREAS, countWords, type FactsDoc, FORMATS, type ScriptDoc } from '../schema'

export type GateOpts = { sources: string[]; minWords?: number; maxWords?: number; banned?: string[]; label?: string }

const BANNED = ['welcome back', 'in this video', 'smash that like', 'like and subscribe', "don't forget to subscribe", 'without further ado', 'hey guys']
const GUARDRAILS: [RegExp, string][] = [
  [/\byou should (buy|sell|invest in)\b/i, 'personal investment advice ("you should buy/sell")'],
  [/\b(buy|sell) (it|this|now)\b.*\bnow\b|\bbuy now\b/i, 'personal investment advice ("buy now")'],
  [/\bguaranteed?\b|\bcan't lose\b|\brisk-free\b/i, 'guarantee language'],
  [/\bwill (go to|reach|hit|be worth) \$?\d/i, 'price prediction stated as fact'],
  [/\b\d+x\b.*\b(soon|easily|guaranteed)\b/i, 'get-rich hype'],
]
const HOOK = /\?|\d|\b(why|how|secret|nobody|lost|lose|crash|billion|million|never|mistake|truth)\b/i
const NUMBER = /\d|%|\$|£|€/

const ngrams = (text: string, n: number) => {
  const w = text.toLowerCase().replace(/[^a-z0-9$%' ]+/g, ' ').split(/\s+/).filter(Boolean)
  const out = new Set<string>()
  for (let i = 0; i + n <= w.length; i++) out.add(w.slice(i, i + n).join(' '))
  return out
}

export const gateScript = (script: ScriptDoc, facts: FactsDoc, opts: GateOpts) => {
  const problems: string[] = []
  // # Andrew HD reads ~182 words/min (measured on the first long video, 2026-10-24) → 8–10 min ≈ 1,450–1,850 words
  const min = opts.minWords ?? 1450, max = opts.maxWords ?? 1850
  const sents = allSentences(script)
  const ids = new Set<string>()
  for (const s of sents) {
    if (ids.has(s.id)) problems.push(`duplicate sentence id "${s.id}"`)
    ids.add(s.id)
  }

  // # length
  const words = sents.reduce((n, s) => n + countWords(s.text), 0)
  if (words < min || words > max) problems.push(`script has ${words} words; needs ${min}–${max} for ${opts.label ?? 'an 8–10 min video'}`)

  // # identity: thesis, area, format
  if (countWords(script.thesis ?? '') < 6) problems.push('thesis missing or too thin — every video argues a clear point of view')
  if (!(AREAS as readonly string[]).includes(script.area)) problems.push(`unknown area "${script.area}" (areas: ${AREAS.join(', ')})`)
  if (!(FORMATS as readonly string[]).includes(script.format)) problems.push(`unknown format "${script.format}" (formats: ${FORMATS.join(', ')})`)

  // # hook in the first two sentences
  if (!sents.slice(0, 2).some((s) => HOOK.test(s.text))) problems.push('weak hook: the first two sentences need a question, a stake or a number')

  // # every number is sourced
  const factIds = new Set(facts.facts.map((f) => f.id))
  for (const s of sents) {
    if (NUMBER.test(s.text) && !(s.facts && s.facts.length)) problems.push(`${s.id}: number without a fact id ("${s.text.slice(0, 60)}")`)
    for (const f of s.facts ?? []) if (!factIds.has(f)) problems.push(`${s.id}: fact "${f}" not in facts.json`)
  }

  // # banned phrases + guardrails
  for (const s of sents) {
    const low = s.text.toLowerCase()
    for (const b of BANNED) if (low.includes(b)) problems.push(`${s.id}: banned phrase "${b}"`)
    for (const b of opts.banned ?? []) if (low.includes(b)) problems.push(`${s.id}: owner rule bans "${b}"`)
    for (const [re, why] of GUARDRAILS) if (re.test(s.text)) problems.push(`${s.id}: guardrail — ${why}`)
  }

  // # natural stress: word present, never consecutive, at most ~1 in 3 sentences
  let stressed = 0
  sents.forEach((s, i) => {
    if (!s.stress) return
    stressed++
    if (!new RegExp(`\\b${s.stress.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(s.text)) problems.push(`${s.id}: stress word "${s.stress}" is not in the sentence`)
    if (i > 0 && sents[i - 1].stress) problems.push(`${s.id}: stress in consecutive sentences (${sents[i - 1].id}, ${s.id})`)
  })
  if (stressed > Math.ceil(sents.length / 3)) problems.push(`too many stressed words (${stressed} in ${sents.length} sentences; max ~1 in 3)`)

  // # originality: no copying from sources (8-word overlap ≤ 2%, no 12-word run)
  if (opts.sources.length) {
    const scriptText = sents.map((s) => s.text).join(' ')
    const mine8 = ngrams(scriptText, 8)
    const src8 = new Set(opts.sources.flatMap((t) => [...ngrams(t, 8)]))
    const shared = [...mine8].filter((g) => src8.has(g)).length
    const src12 = new Set(opts.sources.flatMap((t) => [...ngrams(t, 12)]))
    const run12 = [...ngrams(scriptText, 12)].some((g) => src12.has(g))
    if (mine8.size && (shared / mine8.size > 0.02 || run12)) problems.push(`copied text: ${(100 * shared / mine8.size).toFixed(1)}% 8-word overlap with sources — rewrite in our own words`)
  }

  return { ok: problems.length === 0, problems, words }
}
