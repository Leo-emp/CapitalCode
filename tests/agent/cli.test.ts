// # Tests for the CLI contract: RESULT_JSON last line, [REFUSED] + exit 1
import { expect, test, vi } from 'vitest'
import { Refusal, result, runCommand } from '../../agent/result'

test('result prints RESULT_JSON as the last line', () => {
  const log = vi.spyOn(console, 'log').mockImplementation(() => {})
  result({ ok: true, n: 2 })
  expect(log.mock.calls.at(-1)?.[0]).toBe('RESULT_JSON: {"ok":true,"n":2}')
  log.mockRestore()
})

test('a refusal prints [REFUSED] and returns exit code 1; success returns 0', async () => {
  const log = vi.spyOn(console, 'log').mockImplementation(() => {})
  expect(await runCommand(async () => { throw new Refusal('no voice yet') })).toBe(1)
  expect(log.mock.calls.some((c) => String(c[0]).startsWith('[REFUSED] no voice yet'))).toBe(true)
  expect(await runCommand(async () => result({ ok: true }))).toBe(0)
  log.mockRestore()
})

test('an unexpected error is reported (never silent) and returns exit code 2', async () => {
  const log = vi.spyOn(console, 'log').mockImplementation(() => {})
  const err = vi.spyOn(console, 'error').mockImplementation(() => {})
  expect(await runCommand(async () => { throw new Error('boom') })).toBe(2)
  expect(err.mock.calls.some((c) => String(c[0]).includes('boom'))).toBe(true)
  log.mockRestore(); err.mockRestore()
})
