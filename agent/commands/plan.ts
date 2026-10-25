// # CLI: gate-plan — checks plan.json against words.json, writes timeline.json, pins the plan hash
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { register } from '../cli'
import { gatePlan, type History } from '../gates/plan'
import { isDone, loadJob, markStep, readJson, unmarkFrom, writeJson } from '../jobs'
import { HISTORY_FILE } from '../paths'
import { refuse, result } from '../result'
import type { PlanDoc, ScriptDoc, TimedWord } from '../schema'
import { captionChunks } from '../captions'
import { timedTokens } from '../package'
import { buildTimeline } from '../timeline'
import { fileHash } from './script'

export const readHistory = (file = HISTORY_FILE): History => (existsSync(file) ? readJson<History>(file) : [])

// # Shorts run faster and carry fewer slides than long videos
export const PACE = {
// # living film (spec §7, §12.6): something shown every ≤ 2 s, every sentence shown, text ≤ 25% (Shorts ≤ 35%)
  long: { slideShare: [0, 1] as [number, number], median: [6, 14] as [number, number], maxShot: 30, minShot: 1, maxGap: 2, maxBare: 0, maxText: 0.25 },
  // # a Short (2–3 min, made from scratch): tall canvas, diorama pieces only; captions are not counted as text
  short: { slideShare: [0, 1] as [number, number], median: [1.5, 5] as [number, number], maxShot: 8, minShot: 0.8, maxSlams: 1, brandBy: Infinity, maxGap: 2, maxBare: 0, maxText: 0.25, canvas: 'tall' as const, piecesOnly: true },
}

register('gate-plan', 'gate-plan <job>  — check plan.json, write timeline.json', (a) => {
  const dir = a[0] ?? refuse('give the job folder')
  if (!isDone(dir, 'voice')) refuse('run voice first')
  if (!existsSync(join(dir, 'plan.json'))) refuse(`plan.json missing in ${dir}`)
  const job = loadJob(dir)
  const plan = readJson<PlanDoc>(join(dir, 'plan.json'))
  const words = readJson<TimedWord[]>(join(dir, 'words.json'))
  const duration = Number(job.steps.voice?.duration)
  const r = gatePlan(plan, words, { duration, history: readHistory().filter((h) => h.job !== dir), ...PACE[job.kind === 'short' ? 'short' : 'long'] })
  if (!r.ok) {
    for (const p of r.problems) console.log(`  - ${p}`)
    refuse(`plan gate failed with ${r.problems.length} problem(s)`)
  }
  // # a Short gets big word-by-word captions, spelled as the script writes them
  const captions = job.kind === 'short' ? captionChunks(timedTokens(words, readJson<ScriptDoc>(join(dir, 'script.json'))).flatMap((x) => x.toks)) : undefined
  writeJson(join(dir, 'timeline.json'), buildTimeline(plan, words, duration, undefined, captions))
  const hash = fileHash(join(dir, 'plan.json'))
  unmarkFrom(dir, 'plan')
  markStep(dir, 'plan', { hash, ...r.stats })
  markStep(dir, 'gate_plan', { hash })
  result({ ok: true, ...r.stats, next: 'render' })
})
