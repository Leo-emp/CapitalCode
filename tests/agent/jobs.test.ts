// # Tests for the job folder + step bookkeeping (resume after any crash)
import { mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, test } from 'vitest'
import { isDone, latestJob, loadJob, markStep, newJob, nextStep, readJson, STEPS, unmarkFrom, writeJson } from '../../agent/jobs'

const root = () => mkdtempSync(join(tmpdir(), 'ccjobs-'))

describe('jobs', () => {
  test('new job folder is YYYYMMDD-HHMM_slug and starts at the first step', () => {
    const r = root()
    const dir = newJob('Why Small Shops Sell for $1M?', { root: r, now: new Date(2026, 9, 24, 9, 5) })
    expect(dir.replace(/\\/g, '/')).toMatch(/\/20261024-0905_why-small-shops-sell-for-1m$/)
    expect(loadJob(dir).topic).toBe('Why Small Shops Sell for $1M?')
    expect(nextStep(dir)).toBe(STEPS[0])
  })
  test('marking steps advances; data is kept; unmarkFrom resets later steps', () => {
    const r = root()
    const dir = newJob('t', { root: r })
    markStep(dir, 'topic', { area: 'investing' })
    markStep(dir, 'research')
    expect(isDone(dir, 'research')).toBe(true)
    expect(nextStep(dir)).toBe('facts')
    expect(loadJob(dir).steps.topic?.area).toBe('investing')
    unmarkFrom(dir, 'research')
    expect(isDone(dir, 'research')).toBe(false)
    expect(isDone(dir, 'topic')).toBe(true)
  })
  test('unknown step is refused', () => {
    const dir = newJob('t', { root: root() })
    expect(() => markStep(dir, 'dance' as never)).toThrow(/dance/)
  })
  test('latestJob finds the newest unfinished job', () => {
    const r = root()
    newJob('a', { root: r, now: new Date(2026, 0, 1, 1, 1) })
    const b = newJob('b', { root: r, now: new Date(2026, 0, 2, 1, 1) })
    expect(latestJob(r)).toBe(b)
  })
})

// # writeJson makes missing folders (research writes into temp/research on a fresh clone)
test('writeJson creates missing parent folders', () => {
  const file = join(mkdtempSync(join(tmpdir(), 'cc-')), 'a', 'b', 'x.json')
  writeJson(file, { ok: 1 })
  expect(readJson(file)).toEqual({ ok: 1 })
})
