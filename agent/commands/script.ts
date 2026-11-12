// # CLI: gate-script — validates script.json + facts.json (+ sources/*.txt) and pins the script hash
import { createHash } from 'node:crypto'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { register } from '../cli'
import { type AuditDoc, checkAudit } from '../gates/audit'
import { gateScript } from '../gates/script'
import { loadJob, markStep, readJson, unmarkFrom } from '../jobs'
import { refuse, result } from '../result'
import type { FactsDoc, ScriptDoc } from '../schema'
import { bannedPhrases, loadMemory } from '../learning'

export const SHORT_WORDS = [360, 530] as const
export const fileHash = (file: string) => createHash('sha256').update(readFileSync(file)).digest('hex').slice(0, 16)

export const readSources = (dir: string): string[] => {
  const d = join(dir, 'sources')
  return existsSync(d) ? readdirSync(d).filter((f) => f.endsWith('.txt')).map((f) => readFileSync(join(d, f), 'utf8')) : []
}

register('gate-script', 'gate-script <job>  — check script.json + facts.json before voicing', (a) => {
  const dir = a[0] ?? refuse('give the job folder')
  for (const f of ['script.json', 'facts.json']) if (!existsSync(join(dir, f))) refuse(`${f} missing in ${dir}`)
  const script = readJson<ScriptDoc>(join(dir, 'script.json'))
  const facts = readJson<FactsDoc>(join(dir, 'facts.json'))
  // # a Short is 2:00–2:58 (YouTube Shorts end at 3:00): ~182 words/min → 360–530 words
  const job = loadJob(dir), short = job.kind === 'short'
  // # a long video of a chosen length: ~182 words a minute, −10% / +12% around it
  const timed = !short && job.minutes ? { minWords: Math.round(job.minutes * 182 * 0.9), maxWords: Math.round(job.minutes * 182 * 1.12), label: `a ${job.minutes}-minute video` } : {}
  const r = gateScript(script, facts, { sources: readSources(dir), banned: bannedPhrases(loadMemory()), ...(short ? { minWords: SHORT_WORDS[0], maxWords: SHORT_WORDS[1], label: 'a 2–3 min Short' } : timed) })
  if (!r.ok) {
    for (const p of r.problems) console.log(`  - ${p}`)
    refuse(`script gate failed with ${r.problems.length} problem(s)`)
  }
  const hash = fileHash(join(dir, 'script.json'))
  // # owner rule: no voice until every line is audited for correct info, concepts and sense (audit.json for THIS script)
  const auditFile = join(dir, 'audit.json')
  const audit = checkAudit(script, facts, existsSync(auditFile) ? readJson<AuditDoc>(auditFile) : undefined, hash)
  if (audit.length) {
    for (const p of audit) console.log(`  - ${p}`)
    refuse(`accuracy audit incomplete: ${audit.length} problem(s) (script hash ${hash})`)
  }
  unmarkFrom(dir, 'facts')
  markStep(dir, 'facts', { count: facts.facts.length })
  markStep(dir, 'script', { hash, words: r.words })
  markStep(dir, 'gate_script', { hash })
  result({ ok: true, words: r.words, hash, next: 'voice' })
})
