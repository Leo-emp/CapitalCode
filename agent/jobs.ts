// ============================================================
// JOBS — one folder per video with job.json recording which
// steps are done (and their outputs). Any crash resumes at the
// first undone step; nothing is redone that already finished.
// ============================================================
import { existsSync, mkdirSync, readdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { JOBS_DIR } from './paths'

export const STEPS = ['topic', 'research', 'facts', 'script', 'gate_script', 'voice', 'plan', 'gate_plan', 'render', 'gate_video', 'critic', 'package'] as const
export type Step = (typeof STEPS)[number]
export type Job = { topic: string; kind: 'long' | 'short'; created: string; steps: Partial<Record<Step, Record<string, unknown> & { at: string }>> }

const pad = (n: number) => String(n).padStart(2, '0')
export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60)

// # Atomic write: never leave a half-written job.json after a crash
export const writeJson = (file: string, data: unknown) => {
  mkdirSync(dirname(file), { recursive: true })
  const tmp = `${file}.tmp`
  writeFileSync(tmp, JSON.stringify(data, null, 2))
  renameSync(tmp, file)
}
export const readJson = <T>(file: string): T => JSON.parse(readFileSync(file, 'utf8')) as T

export const newJob = (topic: string, opts: { root?: string; now?: Date; kind?: 'long' | 'short' } = {}): string => {
  const now = opts.now ?? new Date()
  const stamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}`
  const dir = join(opts.root ?? JOBS_DIR, `${stamp}_${slugify(topic)}`)
  mkdirSync(dir, { recursive: true })
  writeJson(join(dir, 'job.json'), { topic, kind: opts.kind ?? 'long', created: now.toISOString(), steps: { topic: { at: now.toISOString() }, research: { at: now.toISOString() } } } satisfies Job) // # topic + research happen before a job exists
  return dir
}

export const loadJob = (dir: string): Job => readJson<Job>(join(dir, 'job.json'))

const checkStep = (step: string): Step => {
  if (!(STEPS as readonly string[]).includes(step)) throw new Error(`unknown step "${step}" (steps: ${STEPS.join(', ')})`)
  return step as Step
}

export const markStep = (dir: string, step: Step, data: Record<string, unknown> = {}) => {
  checkStep(step)
  const job = loadJob(dir)
  job.steps[step] = { ...data, at: new Date().toISOString() }
  writeJson(join(dir, 'job.json'), job)
}

export const isDone = (dir: string, step: Step) => Boolean(loadJob(dir).steps[checkStep(step)])

export const nextStep = (dir: string): Step | null => STEPS.find((s) => !isDone(dir, s)) ?? null

// # When an artefact changes, every later step becomes stale
export const unmarkFrom = (dir: string, step: Step) => {
  const job = loadJob(dir)
  for (const s of STEPS.slice(STEPS.indexOf(checkStep(step)))) delete job.steps[s]
  writeJson(join(dir, 'job.json'), job)
}

export const latestJob = (root = JOBS_DIR): string | null => {
  if (!existsSync(root)) return null
  const dirs = readdirSync(root).filter((d) => existsSync(join(root, d, 'job.json'))).sort()
  const open = dirs.filter((d) => nextStep(join(root, d)) !== null)
  const pick = open.at(-1) ?? dirs.at(-1)
  return pick ? join(root, pick) : null
}
