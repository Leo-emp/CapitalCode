// # Learning memory: owner feedback, approvals, references and results become rules the next run reads
import { mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expect, test } from 'vitest'
import { gateScript } from '../../agent/gates/script'
import {
  addRule, bannedPhrases, brief, emptyMemory, loadMemory, preferences, recordApproval, recordFeedback, recordReference, recordResult, retireRule, saveMemory,
} from '../../agent/learning'

const at = new Date('2026-10-24T10:00:00Z')

test('rules are added with a source and id, and retired rules leave the brief', () => {
  let m = emptyMemory()
  m = addRule(m, { area: 'voice', rule: 'Keep the read calm; no shouting on numbers', source: 'feedback', evidence: 'job A' }, at)
  m = addRule(m, { area: 'script', rule: 'Never open with "Imagine"', source: 'feedback', ban: 'imagine', evidence: 'job A' }, at)
  expect(m.rules.map((r) => r.id)).toEqual(['r1', 'r2'])
  m = retireRule(m, 'r1', 'owner changed mind', at)
  const b = brief(m)
  expect(b).not.toContain('calm; no shouting')
  expect(b).toContain('Never open with "Imagine"')
})

test('the same rule twice is strengthened, not duplicated', () => {
  let m = emptyMemory()
  m = addRule(m, { area: 'visual', rule: 'Fewer slides in the hook', source: 'feedback' }, at)
  m = addRule(m, { area: 'visual', rule: 'fewer slides in the hook.', source: 'approval' }, at)
  expect(m.rules).toHaveLength(1)
  expect(m.rules[0].strength).toBe(2)
})

test('ban rules become phrases the script gate refuses', () => {
  let m = emptyMemory()
  m = addRule(m, { area: 'script', rule: 'Do not say "game changer"', source: 'feedback', ban: 'game changer' }, at)
  const phrases = bannedPhrases(m)
  expect(phrases).toEqual(['game changer'])
  const script = { title: 't', area: 'investing', format: 'explainer', thesis: 'buyers pay for future earnings not past ones',
    chapters: [{ title: 'c', sentences: [{ id: 's1', text: 'Why is this a game changer?' }] }] } as any
  const r = gateScript(script, { facts: [] }, { sources: [], minWords: 1, maxWords: 99, banned: phrases })
  expect(r.problems.some((p) => p.includes('owner rule') && p.includes('game changer'))).toBe(true)
})

test('approvals build preferences: chosen thumbnail layouts and approval rate by format', () => {
  let m = emptyMemory()
  m = recordApproval(m, { job: 'a', verdict: 'approved', format: 'explainer', area: 'investing', title: 1, thumb: { layout: 'split', index: 2 } }, at)
  m = recordApproval(m, { job: 'b', verdict: 'approved', format: 'explainer', area: 'investing', title: 2, thumb: { layout: 'split', index: 1 } }, at)
  m = recordApproval(m, { job: 'c', verdict: 'rejected', format: 'list', area: 'crypto', note: 'too hypey' }, at)
  const p = preferences(m)
  expect(p.thumbLayouts[0]).toEqual({ key: 'split', n: 2 })
  expect(p.byFormat.explainer).toEqual({ approved: 2, rejected: 0 })
  expect(p.byFormat.list).toEqual({ approved: 0, rejected: 1 })
  // # a rejection with a note is also kept as feedback
  expect(m.feedback.some((f) => f.job === 'c' && f.note === 'too hypey')).toBe(true)
})

test('results rank past videos; the brief names the best and the worst', () => {
  let m = emptyMemory()
  m = recordResult(m, { job: 'a', title: 'Why rent beats buying', views: 12000, ctr: 6.1, avd: 52 }, at)
  m = recordResult(m, { job: 'b', title: 'Seven ETFs explained', views: 900, ctr: 2.0, avd: 31 }, at)
  const b = brief(m)
  expect(b.indexOf('Why rent beats buying')).toBeLessThan(b.indexOf('Seven ETFs explained'))
  expect(b).toMatch(/CTR 6\.1%/)
})

test('feedback and references are kept with the date and show in the brief', () => {
  let m = emptyMemory()
  m = recordFeedback(m, { job: 'a', note: 'charts too small on phone' }, at)
  m = recordReference(m, { ref: 'https://youtu.be/x', take: 'cold open on a shocking number' }, at)
  const b = brief(m)
  expect(b).toContain('charts too small on phone')
  expect(b).toContain('cold open on a shocking number')
})

test('memory round-trips through disk', () => {
  const file = join(mkdtempSync(join(tmpdir(), 'cc-')), 'taste', 'learning.json')
  const m = addRule(emptyMemory(), { area: 'title', rule: 'Questions over statements', source: 'analytics' }, at)
  saveMemory(m, file)
  expect(loadMemory(file)).toEqual(m)
  expect(loadMemory(join(file, '..', 'missing.json'))).toEqual(emptyMemory())
})
