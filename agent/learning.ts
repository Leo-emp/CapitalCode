// ============================================================
// LEARNING — the agent's long-term memory (taste/learning.json,
// committed with the repo). Four inputs make it better each video:
//   1. owner feedback  → notes, distilled by Claude into rules
//   2. approvals       → which titles/thumbnails/formats the owner picks
//   3. references      → what a reference video/thumbnail teaches us
//   4. results         → views / CTR / avg view duration per video
// `brief()` is read at the start of every run; "ban" rules are also
// enforced by the script gate, so a correction can never be forgotten.
// ============================================================
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { readJson, writeJson } from './jobs'
import { ROOT } from './paths'

export const LEARNING_FILE = join(ROOT, 'taste', 'learning.json')

export const RULE_AREAS = ['topic', 'script', 'hook', 'voice', 'visual', 'pacing', 'title', 'thumbnail', 'shorts'] as const
export type RuleArea = (typeof RULE_AREAS)[number]
export type Source = 'feedback' | 'approval' | 'reference' | 'analytics'

export type Rule = {
  id: string; area: RuleArea; rule: string; source: Source; ban?: string; evidence?: string
  strength: number; added: string; status: 'active' | 'retired'; retired?: string; why?: string
}
export type Feedback = { job?: string; note: string; at: string }
export type Approval = {
  job: string; verdict: 'approved' | 'rejected'; at: string; format?: string; area?: string
  title?: number; thumb?: { layout: string; index: number }; note?: string
}
export type Reference = { ref: string; take: string; at: string }
export type Result = { job: string; title: string; views: number; ctr?: number; avd?: number; at: string }
export type Memory = { rules: Rule[]; feedback: Feedback[]; approvals: Approval[]; references: Reference[]; results: Result[] }

export const emptyMemory = (): Memory => ({ rules: [], feedback: [], approvals: [], references: [], results: [] })
export const loadMemory = (file = LEARNING_FILE): Memory => (existsSync(file) ? { ...emptyMemory(), ...readJson<Memory>(file) } : emptyMemory())
export const saveMemory = (m: Memory, file = LEARNING_FILE) => writeJson(file, m)

const iso = (d: Date) => d.toISOString()
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]+/g, '').replace(/\s+/g, ' ').trim()

// ------------------------------------------------------------ rules
// # A rule seen again (same wording, same area) gets stronger instead of duplicating
export const addRule = (m: Memory, r: { area: RuleArea; rule: string; source: Source; ban?: string; evidence?: string }, now = new Date()): Memory => {
  const same = m.rules.find((x) => x.status === 'active' && x.area === r.area && norm(x.rule) === norm(r.rule))
  if (same) return { ...m, rules: m.rules.map((x) => (x === same ? { ...x, strength: x.strength + 1, evidence: [x.evidence, r.evidence].filter(Boolean).join('; ') } : x)) }
  const id = `r${m.rules.length + 1}`
  return { ...m, rules: [...m.rules, { id, ...r, ban: r.ban?.toLowerCase(), strength: 1, added: iso(now), status: 'active' }] }
}

export const retireRule = (m: Memory, id: string, why: string, now = new Date()): Memory => {
  if (!m.rules.some((r) => r.id === id)) throw new Error(`no rule ${id}`)
  return { ...m, rules: m.rules.map((r) => (r.id === id ? { ...r, status: 'retired', retired: iso(now), why } : r)) }
}

export const bannedPhrases = (m: Memory) => m.rules.filter((r) => r.status === 'active' && r.ban).map((r) => r.ban!)

// ------------------------------------------------------------ inputs
export const recordFeedback = (m: Memory, f: { job?: string; note: string }, now = new Date()): Memory =>
  ({ ...m, feedback: [...m.feedback, { ...f, at: iso(now) }] })

// # A rejection's note is feedback too (the reason matters more than the verdict)
export const recordApproval = (m: Memory, a: Omit<Approval, 'at'>, now = new Date()): Memory => {
  const next = { ...m, approvals: [...m.approvals.filter((x) => x.job !== a.job), { ...a, at: iso(now) }] }
  return a.note ? recordFeedback(next, { job: a.job, note: a.note }, now) : next
}

export const recordReference = (m: Memory, r: { ref: string; take: string }, now = new Date()): Memory =>
  ({ ...m, references: [...m.references, { ...r, at: iso(now) }] })

export const recordResult = (m: Memory, r: Omit<Result, 'at'>, now = new Date()): Memory =>
  ({ ...m, results: [...m.results.filter((x) => x.job !== r.job), { ...r, at: iso(now) }] })

// ------------------------------------------------------------ what the memory says
const tally = (keys: string[]) =>
  Object.entries(keys.reduce<Record<string, number>>((a, k) => ({ ...a, [k]: (a[k] ?? 0) + 1 }), {}))
    .map(([key, n]) => ({ key, n })).sort((a, b) => b.n - a.n)

export const preferences = (m: Memory) => {
  const rate = (field: 'format' | 'area') => m.approvals.reduce<Record<string, { approved: number; rejected: number }>>((acc, a) => {
    const k = a[field]
    if (!k) return acc
    const cur = acc[k] ?? { approved: 0, rejected: 0 }
    return { ...acc, [k]: { ...cur, [a.verdict]: cur[a.verdict] + 1 } }
  }, {})
  return {
    thumbLayouts: tally(m.approvals.flatMap((a) => (a.verdict === 'approved' && a.thumb ? [a.thumb.layout] : []))),
    byFormat: rate('format'),
    byArea: rate('area'),
  }
}

// # Best-performing first: CTR × average view duration, then views
const score = (r: Result) => (r.ctr ?? 0) * (r.avd ?? 0) || r.views / 1000

export const brief = (m: Memory) => {
  const active = m.rules.filter((r) => r.status === 'active').sort((a, b) => b.strength - a.strength)
  const p = preferences(m)
  const results = [...m.results].sort((a, b) => score(b) - score(a))
  const lines = ['# CapitalCode learning brief (read before every run; obey every rule)', '']
  lines.push('## Owner rules', ...(active.length ? RULE_AREAS.flatMap((area) => {
    const rs = active.filter((r) => r.area === area)
    return rs.length ? [`**${area}**`, ...rs.map((r) => `- [${r.id}${r.strength > 1 ? ` ×${r.strength}` : ''}, ${r.source}] ${r.rule}${r.ban ? ` _(gate bans "${r.ban}")_` : ''}`)] : []
  }) : ['- (none yet)']), '')
  lines.push('## What the owner approves')
  if (!m.approvals.length) lines.push('- (no approvals yet)')
  else {
    if (p.thumbLayouts.length) lines.push(`- Thumbnail layouts picked: ${p.thumbLayouts.map((t) => `${t.key} ×${t.n}`).join(', ')}`)
    for (const [k, v] of Object.entries(p.byFormat)) lines.push(`- Format ${k}: ${v.approved} approved, ${v.rejected} rejected`)
    for (const [k, v] of Object.entries(p.byArea)) lines.push(`- Area ${k}: ${v.approved} approved, ${v.rejected} rejected`)
  }
  lines.push('', '## Results (best first)', ...(results.length
    ? results.map((r) => `- ${r.title} — ${r.views.toLocaleString('en-US')} views${r.ctr != null ? `, CTR ${r.ctr}%` : ''}${r.avd != null ? `, avg view ${r.avd}%` : ''}`)
    : ['- (no published results yet)']), '')
  lines.push('## Recent owner feedback (newest first)', ...(m.feedback.length
    ? m.feedback.slice(-15).reverse().map((f) => `- ${f.at.slice(0, 10)}${f.job ? ` (${f.job})` : ''}: ${f.note}`)
    : ['- (none yet)']), '')
  lines.push('## Reference lessons', ...(m.references.length ? m.references.slice(-15).reverse().map((r) => `- ${r.take} — ${r.ref}`) : ['- (none yet)']), '')
  return lines.join('\n')
}
