// # voice command refuses an ungated or edited-after-gate script
import { mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expect, test } from 'vitest'
import { checkVoiceReady } from '../../agent/commands/voice'
import { fileHash } from '../../agent/commands/script'
import { markStep, newJob } from '../../agent/jobs'

const job = () => {
  const dir = newJob('vc', { root: mkdtempSync(join(tmpdir(), 'ccvc-')) })
  writeFileSync(join(dir, 'script.json'), '{"a":1}')
  return dir
}

test('refuses before gate-script', () => {
  expect(() => checkVoiceReady(job())).toThrow(/gate-script first/)
})

test('refuses when script.json changed after the gate', () => {
  const dir = job()
  markStep(dir, 'gate_script', { hash: fileHash(join(dir, 'script.json')) })
  writeFileSync(join(dir, 'script.json'), '{"a":2}')
  expect(() => checkVoiceReady(dir)).toThrow(/changed since gate-script/)
})

test('passes for a gated, unchanged script', () => {
  const dir = job()
  markStep(dir, 'gate_script', { hash: fileHash(join(dir, 'script.json')) })
  expect(() => checkVoiceReady(dir)).not.toThrow()
})
