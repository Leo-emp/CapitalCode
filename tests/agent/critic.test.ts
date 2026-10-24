// # The Critic's verdict is only accepted when complete and consistent
import { expect, test } from 'vitest'
import { checkCritic, type CriticDoc } from '../../agent/commands/qa'

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
