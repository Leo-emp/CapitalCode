// # Tests for the accuracy audit gate (owner rule 2026-10-28: info, concepts and explanation must be correct and make sense)
import { describe, expect, test } from 'vitest'
import { type AuditDoc, checkAudit } from '../../agent/gates/audit'
import type { FactsDoc, ScriptDoc } from '../../agent/schema'

const script: ScriptDoc = { title: 't', area: 'personal-finance', format: 'explainer', thesis: 'x',
  chapters: [{ title: 'A', sentences: [{ id: 's1', text: 'The first month costs about 93 dollars.', facts: ['f_calc'] }, { id: 's2', text: 'That is most of the payment.' }] }] }
const facts: FactsDoc = { facts: [
  { id: 'f_rate', value: 22.36, unit: '%', asOf: '2026-08', source: 'Federal Reserve G.19', url: 'https://x' },
  { id: 'f_calc', value: 93.17, unit: 'USD', asOf: '2026-10', source: 'CapitalCode calculation: 5000 × 22.36% ÷ 12', url: '' },
] } as FactsDoc
const good = (): AuditDoc => ({
  scriptHash: 'abc',
  sentences: { s1: { verdict: 'ok', why: '5000 × 0.2236 ÷ 12 = 93.17, rounds to 93' }, s2: { verdict: 'ok', why: '93 of the 143 dollar payment is 65 percent, so most' } },
  calcs: [{ fact: 'f_calc', recomputed: 'python: 93.17', matches: true }],
  realityCheck: 'Card calculators (Motley Fool, WealthNorth) show 17–33 years for similar balances; ours is 15, on the short side.',
})

describe('accuracy audit gate', () => {
  test('a complete audit for the current script passes', () => {
    expect(checkAudit(script, facts, good(), 'abc')).toEqual([])
  })
  test('no audit → refused', () => {
    expect(checkAudit(script, facts, undefined, 'abc').join()).toMatch(/audit.json missing/)
  })
  test('an audit of an older script is refused (edit the script → re-audit)', () => {
    expect(checkAudit(script, facts, good(), 'def').join()).toMatch(/older script/)
  })
  test('every sentence needs a real reason', () => {
    const a = good(); delete a.sentences.s2; a.sentences.s1.why = 'ok'
    const p = checkAudit(script, facts, a, 'abc').join('\n')
    expect(p).toMatch(/s2: not audited/)
    expect(p).toMatch(/s1: say why/)
  })
  test('every one of our calculations must be re-done independently and match', () => {
    const a = good(); a.calcs = []
    expect(checkAudit(script, facts, a, 'abc').join()).toMatch(/f_calc: our calculation is not re-done/)
    a.calcs = [{ fact: 'f_calc', recomputed: 'python: 94.01', matches: false }]
    expect(checkAudit(script, facts, a, 'abc').join()).toMatch(/does not match/)
  })
  test('the headline result needs an outside reality check', () => {
    const a = good(); a.realityCheck = ''
    expect(checkAudit(script, facts, a, 'abc').join()).toMatch(/realityCheck/)
  })
})
