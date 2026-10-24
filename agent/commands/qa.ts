// # CLI: gate-video (QA + critic pack) and critic (accepts the independent Critic's verdict)
import { existsSync, readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { register } from '../cli'
import { flagSheets, frameSheets, gateVideo, plannedMotion, shotFrames } from '../gates/video'
import { isDone, loadJob, markStep, readJson, unmarkFrom, writeJson } from '../jobs'
import { refuse, result } from '../result'
import type { Timeline } from '../timeline'

export const CRITIC_MIN = 8 // # out of 10 — below this the video goes back for fixes
export const CRITIC_CHECKS = ['hook', 'thesis', 'accuracy', 'originality', 'visuals', 'sync', 'pacing', 'audio'] as const
export type CriticDoc = { verdict: 'pass' | 'fix'; score: number; checks: Record<(typeof CRITIC_CHECKS)[number], number>; fixes: string[]; notes?: string }

// # Max 2 Critic rounds (spec §5c). After round 2 a "fix" is accepted only with the director's
// # written note on what was done; its fixes are kept and shown in the owner's review note.
export const MAX_CRITIC_ROUNDS = 2
// # rounds = archived verdicts (critic_round<N>.json) + the current critic.json
export const criticRound = (dir: string) => readdirSync(dir).filter((f) => /^critic_round\d+\.json$/.test(f)).length + 1
export type CriticDecision = { accept: true; flagged: string[]; note?: string } | { accept: false; reason: string }
export const criticDecision = (c: CriticDoc, round: number, final?: string): CriticDecision => {
  if (c.verdict === 'pass') return { accept: true, flagged: [] }
  if (round < MAX_CRITIC_ROUNDS) return { accept: false, reason: `critic asked for ${c.fixes.length} fix(es) (score ${c.score}, round ${round}/${MAX_CRITIC_ROUNDS})` }
  if (!final) return { accept: false, reason: `round ${round}/${MAX_CRITIC_ROUNDS} used: apply the fixes, re-render, check them, then run: critic <job> --final "what was done"` }
  return { accept: true, flagged: c.fixes, note: final }
}

// # The Critic's verdict must be complete and consistent before the job can be packaged
export const checkCritic = (c: CriticDoc): string[] => {
  const p: string[] = []
  if (c.verdict !== 'pass' && c.verdict !== 'fix') p.push('verdict must be "pass" or "fix"')
  if (!(c.score >= 1 && c.score <= 10)) p.push('score must be 1–10')
  for (const k of CRITIC_CHECKS) if (!(c.checks?.[k] >= 1 && c.checks?.[k] <= 10)) p.push(`checks.${k} must be 1–10`)
  if (c.verdict === 'pass' && c.score < CRITIC_MIN) p.push(`a pass needs score ≥ ${CRITIC_MIN} (got ${c.score})`)
  if (c.verdict === 'pass' && CRITIC_CHECKS.some((k) => c.checks?.[k] < 6)) p.push('a pass cannot have any check below 6')
  if (c.verdict === 'fix' && !c.fixes?.length) p.push('a "fix" verdict must list fixes')
  return p
}

const PACK = (dir: string, sheets: string[], flags: string[], stats: object, shots: string[] = []) => `# Critic pack — ${dir}

You are the independent CapitalCode Critic. You did not write or plan this video.
Judge it as a demanding viewer and as YouTube's "inauthentic content" reviewer.

Read: script.json (thesis + chapters), facts.json (sources), plan.json (visual plan).
Look at every frame sheet (one frame per 10 s) and every flag sheet (frames around
a suspected one-frame glitch — decide if it is a real glitch).

Sheets:
${sheets.map((s) => `- ${s}`).join('\n')}
Every shot near its end (shot_NN = plan.json shots[NN-1]) — check each build finished cleanly:
${shots.length ? `- ${shots[0]} … ${shots.at(-1)} (${shots.length} frames)` : '- none'}
Flags (red-bordered, f-2 … f+2):
${flags.length ? flags.map((s) => `- ${s}`).join('\n') : '- none'}
Measured: ${JSON.stringify(stats)}

Score 1–10 each: ${CRITIC_CHECKS.join(', ')}.
- hook: do the first 2 sentences + first shots make a viewer stay?
- thesis: one clear point of view, argued, not a reworded article?
- accuracy: every number matches facts.json; no advice, no hype?
- originality: own structure/examples; could not be mistaken for a template?
- visuals: polished, varied, on-brand; characters consistent; text readable?
- sync: visuals land on the words they illustrate?
- pacing: no dead air, no shot that overstays?
- audio: voice clear, SFX supportive not distracting?

Write critic.json: { "verdict": "pass" | "fix", "score": n, "checks": {...}, "fixes": ["shot id / sentence id: what to change"], "notes": "..." }
Pass only if score ≥ ${CRITIC_MIN} and no check below 6.
`

register('gate-video', 'gate-video <job>  — duration, loudness, flicker scan, critic pack (qa/)', (a) => {
  const dir = a[0] ?? refuse('give the job folder')
  if (!isDone(dir, 'render')) refuse('run render first')
  const tl = readJson<Timeline>(join(dir, 'timeline.json'))
  const file = join(dir, 'final.mp4')
  // # brightness band for the night-flat world (living film §4: target 25–30%); the first video was 6.9%
  const r = gateVideo(file, { expectSeconds: tl.durationInFrames / tl.fps, cuts: plannedMotion(tl), brightness: [20, 35], maxChangeEvery: 1.5 })
  const qa = join(dir, 'qa')
  const sheets = frameSheets(file, qa, loadJob(dir).kind === 'short' ? 3 : 10)
  const flags = flagSheets(file, r.flags, tl.fps, qa)
  const shots = shotFrames(file, tl, join(qa, 'shots'))
  writeJson(join(qa, 'report.json'), r)
  writeFileSync(join(qa, 'critic_pack.md'), PACK(dir, sheets, flags, r.stats, shots))
  if (!r.ok) {
    for (const p of r.problems) console.log(`  - ${p}`)
    refuse(`video gate failed with ${r.problems.length} problem(s)`)
  }
  unmarkFrom(dir, 'gate_video')
  markStep(dir, 'gate_video', { ...r.stats, flags: r.flags.length })
  result({ ok: true, ...r.stats, flags: r.flags, pack: join(qa, 'critic_pack.md'), next: 'critic (dispatch the Critic subagent with qa/critic_pack.md)' })
})

register('critic', 'critic <job>  — accept critic.json (pass ≥ 8) or list the fixes', (a) => {
  const dir = a[0] ?? refuse('give the job folder')
  if (!isDone(dir, 'gate_video')) refuse('run gate-video first')
  if (!existsSync(join(dir, 'critic.json'))) refuse('critic.json missing — dispatch the Critic subagent with qa/critic_pack.md')
  const c = readJson<CriticDoc>(join(dir, 'critic.json'))
  const bad = checkCritic(c)
  if (bad.length) { for (const p of bad) console.log(`  - ${p}`); refuse('critic.json is incomplete') }
  const round = criticRound(dir)
  const final = a.find((x) => x.startsWith('--final='))?.slice(8) ?? (a.includes('--final') ? a[a.indexOf('--final') + 1] : undefined)
  const d = criticDecision(c, round, final)
  if (!d.accept) { for (const f of c.fixes) console.log(`  - FIX: ${f}`); return refuse(d.reason) }
  markStep(dir, 'critic', { score: c.score, round, flagged: d.flagged, note: d.note })
  result({ ok: true, score: c.score, round, flagged: d.flagged.length, next: 'package' })
})
