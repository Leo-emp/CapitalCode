// ============================================================
// RUN — one command for every automatic step. Reads the job's
// state, runs the next deterministic step (gates, voice, render,
// QA, package) until it reaches something only the director can
// write (script, plan, critic verdict, metadata) or the job is done.
// A crash anywhere is resumed by running `run` again: every step is
// cached (voice per chapter, render per chunk), so nothing paid or
// slow repeats.
// ============================================================
import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileHash } from './commands/script'
import { loadJob } from './jobs'

export type JobState = {
  kind: 'long' | 'short'; files: Set<string>; done: Set<string>
  scriptHash?: string; planHash?: string; gatedScript?: string; gatedPlan?: string
}
export type Action = { run: string } | { needs: string } | { done: true }

export const nextAction = (s: JobState): Action => {
  const has = (f: string) => s.files.has(f)
  const done = (x: string) => s.done.has(x)
  if (!has('script.json') || !has('facts.json')) return { needs: 'script.json and facts.json (Researcher + Scriptwriter)' }
  if (!done('gate_script') || s.gatedScript !== s.scriptHash) return { run: 'gate-script' }
  if (!done('voice')) return { run: 'voice' }
  if (!has('plan.json')) return { needs: 'plan.json (Visual Director, read words.json + temp/catalog.md)' }
  if (!done('gate_plan') || s.gatedPlan !== s.planHash) return { run: 'gate-plan' }
  if (!done('render')) return { run: 'render' }
  if (!done('gate_video')) return { run: 'gate-video' }
  if (!done('critic')) return has('critic.json') ? { run: 'critic' } : { needs: 'critic.json (dispatch the Critic subagent with qa/critic_pack.md)' }
  if (!done('package')) return has('metadata.json') ? { run: 'package' } : { needs: 'metadata.json (Publisher: 3 titles, description, tags, 3 thumbnails)' }
  return { done: true }
}

export const jobState = (dir: string): JobState => {
  const job = loadJob(dir)
  const steps = job.steps as Record<string, { hash?: string } | undefined>
  const files = new Set(readdirSync(dir))
  const hash = (f: string) => (existsSync(join(dir, f)) ? fileHash(join(dir, f)) : undefined)
  return {
    kind: job.kind, files, done: new Set(Object.keys(job.steps)),
    scriptHash: hash('script.json'), planHash: hash('plan.json'),
    gatedScript: steps.gate_script?.hash, gatedPlan: steps.gate_plan?.hash,
  }
}
