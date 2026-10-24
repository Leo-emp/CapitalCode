// # doctor: every precondition of a run is checked in seconds, before anything slow or paid starts
import { expect, test } from 'vitest'
import { doctor } from '../../agent/doctor'

const ok = {
  env: { AZURE_SPEECH_KEY: 'k', AZURE_SPEECH_REGION: 'eastus' },
  has: (_: string) => true,
  tool: (_: string) => true,
  freeGB: () => 40,
  nodeMajor: 24,
}

test('a healthy machine passes every check', () => {
  const r = doctor(ok)
  expect(r.ok).toBe(true)
  expect(r.checks.every((c) => c.ok)).toBe(true)
})

test('missing key, missing ffmpeg, missing font file and low disk are each reported with a fix', () => {
  const r = doctor({ ...ok, env: { AZURE_SPEECH_REGION: 'eastus' }, tool: (t) => t !== 'ffmpeg', has: (f) => !f.includes('Inter-700'), freeGB: () => 2 })
  expect(r.ok).toBe(false)
  const bad = r.checks.filter((c) => !c.ok).map((c) => c.name)
  expect(bad).toEqual(expect.arrayContaining(['azure key', 'ffmpeg', 'fonts', 'disk space']))
  expect(r.checks.find((c) => c.name === 'azure key')!.fix).toMatch(/\.env\.local/)
  // # secrets are never echoed
  expect(JSON.stringify(r)).not.toContain('"k"')
})
