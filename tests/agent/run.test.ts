// # run: the next automatic step from the job's state, or what the director must write first
import { expect, test } from 'vitest'
import { nextAction, type JobState } from '../../agent/run'

const base: JobState = {
  kind: 'long', files: new Set(['script.json', 'facts.json', 'plan.json', 'critic.json', 'metadata.json']),
  done: new Set(), scriptHash: 'S', planHash: 'P', gatedScript: undefined, gatedPlan: undefined,
}
const st = (p: Partial<JobState>): JobState => ({ ...base, ...p })

test('a job without a script asks the director for script.json + facts.json', () => {
  expect(nextAction(st({ files: new Set() }))).toEqual({ needs: 'script.json and facts.json (Researcher + Scriptwriter)' })
})

test('steps run in order: gate-script → voice → gate-plan → render → gate-video → critic → package', () => {
  expect(nextAction(st({}))).toEqual({ run: 'gate-script' })
  const d = (...s: string[]) => new Set(s)
  expect(nextAction(st({ done: d('gate_script'), gatedScript: 'S' }))).toEqual({ run: 'voice' })
  expect(nextAction(st({ done: d('gate_script', 'voice'), gatedScript: 'S' }))).toEqual({ run: 'gate-plan' })
  expect(nextAction(st({ done: d('gate_script', 'voice', 'gate_plan'), gatedScript: 'S', gatedPlan: 'P' }))).toEqual({ run: 'render' })
  expect(nextAction(st({ done: d('gate_script', 'voice', 'gate_plan', 'render'), gatedScript: 'S', gatedPlan: 'P' }))).toEqual({ run: 'gate-video' })
  expect(nextAction(st({ done: d('gate_script', 'voice', 'gate_plan', 'render', 'gate_video'), gatedScript: 'S', gatedPlan: 'P' }))).toEqual({ run: 'critic' })
  expect(nextAction(st({ done: d('gate_script', 'voice', 'gate_plan', 'render', 'gate_video', 'critic'), gatedScript: 'S', gatedPlan: 'P' }))).toEqual({ run: 'package' })
  expect(nextAction(st({ done: d('gate_script', 'voice', 'gate_plan', 'render', 'gate_video', 'critic', 'package'), gatedScript: 'S', gatedPlan: 'P' }))).toEqual({ done: true })
})

test('an edited script or plan is re-gated (stale gate never trusted)', () => {
  const all = new Set(['gate_script', 'voice', 'gate_plan', 'render'])
  expect(nextAction(st({ done: all, gatedScript: 'OLD', gatedPlan: 'P' }))).toEqual({ run: 'gate-script' })
  expect(nextAction(st({ done: all, gatedScript: 'S', gatedPlan: 'OLD' }))).toEqual({ run: 'gate-plan' })
})

test('missing plan, critic verdict or metadata stop with what the director must do', () => {
  const d = new Set(['gate_script', 'voice'])
  expect(nextAction(st({ done: d, gatedScript: 'S', files: new Set(['script.json', 'facts.json']) }))).toEqual({ needs: 'plan.json (Visual Director, read words.json + temp/catalog.md)' })
  const v = new Set(['gate_script', 'voice', 'gate_plan', 'render', 'gate_video'])
  expect(nextAction(st({ done: v, gatedScript: 'S', gatedPlan: 'P', files: new Set(['script.json', 'facts.json', 'plan.json']) })))
    .toEqual({ needs: 'critic.json (dispatch the Critic subagent with qa/critic_pack.md)' })
  const c = new Set([...v, 'critic'])
  expect(nextAction(st({ done: c, gatedScript: 'S', gatedPlan: 'P', files: new Set(['script.json', 'facts.json', 'plan.json', 'critic.json']) })))
    .toEqual({ needs: 'metadata.json (Publisher: 3 titles, description, tags, 3 thumbnails)' })
})

test('changed art or timeline since the render makes run render again (never review a stale video)', () => {
  const done = new Set(['gate_script', 'voice', 'gate_plan', 'render', 'gate_video'])
  const s = st({ done, gatedScript: 'S', gatedPlan: 'P', renderKey: 'old', currentRenderKey: 'new', files: new Set(['script.json', 'facts.json', 'plan.json']) })
  expect(nextAction(s)).toEqual({ run: 'render' })
  expect(nextAction({ ...s, currentRenderKey: 'old' })).toEqual({ needs: 'critic.json (dispatch the Critic subagent with qa/critic_pack.md)' })
})

test('a render without a recorded key counts as stale', () => {
  const done = new Set(['gate_script', 'voice', 'gate_plan', 'render', 'gate_video'])
  expect(nextAction(st({ done, gatedScript: 'S', gatedPlan: 'P', currentRenderKey: 'new' }))).toEqual({ run: 'render' })
})
