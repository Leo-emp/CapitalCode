// # The Critic's verdict is only accepted when complete and consistent
import { describe, expect, test } from 'vitest'
import { checkCritic, criticDecision, type CriticDoc } from '../../agent/commands/qa'

const checks = { hook: 8, thesis: 9, accuracy: 9, originality: 8, visuals: 8, sync: 8, pacing: 8, audio: 9 }
test('a complete pass ≥ 8 is accepted', () => expect(checkCritic({ verdict: 'pass', score: 8.5, checks, fixes: [] })).toEqual([]))
test('a pass below 8, or with a weak check, is refused', () => {
  expect(checkCritic({ verdict: 'pass', score: 7, checks, fixes: [] }).join()).toMatch(/score ≥ 8/)
  expect(checkCritic({ verdict: 'pass', score: 9, checks: { ...checks, sync: 5 }, fixes: [] }).join()).toMatch(/below 6/)
})
test('missing checks and an empty fix list are refused', () => {
  const c = { verdict: 'fix', score: 6, checks: { hook: 5 }, fixes: [] } as unknown as CriticDoc
  const out = checkCritic(c).join('\n')
  expect(out).toMatch(/checks.thesis/)
  expect(out).toMatch(/must list fixes/)
})

// # Max 2 Critic rounds (spec §5c): after that the director applies the fixes, checks them and
// # accepts with a written note; the open fixes go to the owner's review note, never silently dropped
describe('critic round limit', () => {
  const fix = { verdict: 'fix', score: 7.9, checks: {}, fixes: ['sh10: start on s16'] } as any
  const pass = { verdict: 'pass', score: 8.4, checks: {}, fixes: [] } as any
  test('a pass is accepted in any round', () => {
    expect(criticDecision(pass, 1)).toEqual({ accept: true, flagged: [] })
  })
  test('a fix in round 1 is refused with its fixes', () => {
    expect(criticDecision(fix, 1)).toEqual({ accept: false, reason: expect.stringMatching(/1 fix/) })
  })
  test('after 2 rounds a fix needs a final note, then is accepted with the fixes flagged', () => {
    expect(criticDecision(fix, 2)).toEqual({ accept: false, reason: expect.stringMatching(/--final/) })
    expect(criticDecision(fix, 2, 'all 9 applied, stills checked')).toEqual({ accept: true, flagged: ['sh10: start on s16'], note: 'all 9 applied, stills checked' })
  })
  test('a final note cannot skip round 2', () => {
    expect(criticDecision(fix, 1, 'skip').accept).toBe(false)
  })
})
