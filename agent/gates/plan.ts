// ============================================================
// PLAN GATE — refuses a visual plan that would render wrong:
// unresolved cues, unknown art ids, malformed slides, gaps at the
// start, shots out of order, the same scene twice in a row,
// slide share / pace outside the reference, or a scene set that
// repeats a recent video (YouTube "inauthentic content" guard).
// ============================================================
import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { CAST } from '../../art/rig/Actor'
import { EXPRESSIONS } from '../../art/rig/faces'
import { POSE_IDS } from '../../art/rig/pose'
import { PROPS } from '../../art/props/registry'
import { type Anchor, cameraFor, type SceneFraming } from '../../art/scenes/kit'
import { SCENES } from '../../art/scenes/registry'
import { PUBLIC_DIR } from '../paths'
import type { Cue, PlanDoc, TimedWord } from '../schema'
import { layoutProblems, SLIDE_KINDS, SLIDE_SPECS } from '../slides'
import { resolveCue } from '../timeline'

export type History = { job: string; scenes: string[]; slides: string[]; area?: string; format?: string; kind?: string; title?: string; date?: string }[]
export type PlanGateOpts = {
  duration: number; history: History; sfxNames?: string[]
  slideShare?: [number, number]; median?: [number, number]; maxShot?: number; minShot?: number
}

export const sfxAvailable = (): string[] => {
  const d = join(PUBLIC_DIR, 'sfx', 'cc')
  return existsSync(d) ? readdirSync(d).filter((f) => f.endsWith('.wav')).map((f) => f.replace(/\.wav$/, '')) : []
}

// # Is an anchor (± an actor's half-width) inside what the camera shows for this framing?
const inFrame = (anchors: Record<string, Anchor>, framing: SceneFraming, p: Anchor) => {
  const cam = cameraFor(framing, anchors.focus ?? anchors.prop1 ?? { x: 960, y: 540 })
  const x0 = -cam.tx / cam.k, x1 = (1920 - cam.tx) / cam.k, half = 80 * p.scale
  return p.x - half >= x0 && p.x + half <= x1
}

const median = (xs: number[]) => {
  const s = [...xs].sort((a, b) => a - b)
  return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2
}

export const gatePlan = (plan: PlanDoc, words: TimedWord[], o: PlanGateOpts) => {
  const problems: string[] = []
  const [shareMin, shareMax] = o.slideShare ?? [0.35, 0.65]
  const [medMin, medMax] = o.median ?? [6, 14]
  const sfxNames = o.sfxNames ?? sfxAvailable()
  const cue = (id: string, c: Cue | undefined): number | null => {
    if (!c) { problems.push(`${id}: missing cue`); return null }
    try { return resolveCue(words, c) } catch (e) { problems.push(`${id}: ${(e as Error).message}`); return null }
  }

  if (!plan.shots?.length) return { ok: false, problems: ['plan has no shots'], stats: null }
  const ids = new Set<string>()
  const starts: number[] = []
  for (const s of plan.shots) {
    if (ids.has(s.id)) problems.push(`${s.id}: duplicate shot id`)
    for (const l of layoutProblems(s as Parameters<typeof layoutProblems>[0])) problems.push(`${s.id}: ${l}`)
    ids.add(s.id)
    starts.push(cue(s.id, s.start) ?? NaN)
    if (s.kind === 'scene') {
      const sc = SCENES.find((x) => x.id === s.scene)
      if (!sc) problems.push(`${s.id}: unknown scene "${s.scene}"`)
      for (const a of s.actors ?? []) {
        if (!CAST.includes(a.who)) problems.push(`${s.id}: unknown actor "${a.who}" (cast: ${CAST.join(', ')})`)
        if (sc && !sc.anchors[a.anchor]) problems.push(`${s.id}: scene ${s.scene} has no anchor "${a.anchor}" (has: ${Object.keys(sc.anchors).join(', ')})`)
        if (sc && sc.anchors[a.anchor] && !inFrame(sc.anchors, s.framing ?? 'wide', sc.anchors[a.anchor]))
          problems.push(`${s.id}: actor ${a.who} at "${a.anchor}" is out of frame with ${s.framing} framing — use wide/medium or another anchor`)
        if (!a.track?.length) problems.push(`${s.id}: actor ${a.who} has an empty track`)
        for (const k of a.track ?? []) {
          if (!(POSE_IDS as string[]).includes(k.pose)) problems.push(`${s.id}: unknown pose "${k.pose}"`)
          if (k.expression && !(EXPRESSIONS as string[]).includes(k.expression)) problems.push(`${s.id}: unknown expression "${k.expression}"`)
          cue(s.id, k.at)
        }
      }
      for (const p of s.props ?? []) {
        if (!PROPS.some((x) => x.id === p.id)) problems.push(`${s.id}: unknown prop "${p.id}"`)
        if (sc && !sc.anchors[p.anchor]) problems.push(`${s.id}: scene ${s.scene} has no anchor "${p.anchor}"`)
        cue(s.id, p.at)
      }
      if (s.slam) { s.slam.at.forEach((c) => cue(s.id, c)); if (!s.slam.words?.length) problems.push(`${s.id}: slam needs words`) }
    } else if (s.kind === 'slide') {
      if (!SLIDE_KINDS.includes(s.slide)) problems.push(`${s.id}: unknown slide "${s.slide}" (kinds: ${SLIDE_KINDS.join(', ')})`)
      else {
        const bad = SLIDE_SPECS[s.slide].check(s.data)
        if (bad) problems.push(`${s.id}: ${s.slide} ${bad}`)
        else if ((s.at ?? []).length > SLIDE_SPECS[s.slide].items(s.data)) problems.push(`${s.id}: more cues than ${s.slide} items`)
      }
      if (s.data?.icon && !PROPS.some((x) => x.id === s.data.icon)) problems.push(`${s.id}: unknown icon prop "${String(s.data.icon)}"`)
      for (const c of s.at ?? []) cue(s.id, c)
    } else if (s.kind === 'chapter') {
      if (!s.title) problems.push(`${s.id}: chapter needs a title`)
    } else if (s.kind !== 'brand') problems.push(`${(s as { id: string }).id}: unknown shot kind "${(s as { kind: string }).kind}"`)
  }
  for (const [i, x] of (plan.sfx ?? []).entries()) {
    if (!sfxNames.includes(x.name)) problems.push(`sfx ${i}: unknown sound "${x.name}" (have: ${sfxNames.join(', ')})`)
    cue(`sfx ${i}`, x.at)
  }

  // # coverage + order
  const first = words[0]?.s ?? 0
  if (Number.isFinite(starts[0]) && starts[0] > first + 0.05) problems.push(`first shot must start on the first sentence (starts at ${starts[0].toFixed(2)} s)`)
  starts[0] = 0
  for (let i = 1; i < starts.length; i++)
    if (Number.isFinite(starts[i]) && Number.isFinite(starts[i - 1]) && starts[i] < starts[i - 1] + 0.5)
      problems.push(`${plan.shots[i].id}: starts before (or <0.5 s after) the previous shot`)

  // # pace, share, repeats — measured on the shots that resolved
  const lens = starts.map((s, i) => (i + 1 < starts.length ? starts[i + 1] : o.duration) - s)
  const valid = lens.every(Number.isFinite)
  const stats = {
    shots: plan.shots.length,
    slideShare: valid ? plan.shots.reduce((a, s, i) => a + (s.kind === 'slide' ? lens[i] : 0), 0) / o.duration : NaN,
    medianShot: valid ? median(lens) : NaN,
    scenes: [...new Set(plan.shots.flatMap((s) => (s.kind === 'scene' ? [s.scene] : [])))],
    slides: [...new Set(plan.shots.flatMap((s) => (s.kind === 'slide' ? [s.slide] : [])))],
  }
  if (valid) {
    lens.forEach((l, i) => {
      if (l > (o.maxShot ?? 30)) problems.push(`${plan.shots[i].id}: shot is ${l.toFixed(1)} s (max ${o.maxShot ?? 30})`)
      if (l < (o.minShot ?? 1)) problems.push(`${plan.shots[i].id}: shot is ${l.toFixed(2)} s (min ${o.minShot ?? 1})`)
    })
    if (stats.slideShare < shareMin || stats.slideShare > shareMax) problems.push(`slide share ${(stats.slideShare * 100).toFixed(0)}% (want ${shareMin * 100}–${shareMax * 100}%)`)
    if (stats.medianShot < medMin || stats.medianShot > medMax) problems.push(`median shot ${stats.medianShot.toFixed(1)} s (want ${medMin}–${medMax} s)`)
  }
  plan.shots.forEach((s, i) => {
    const prev = plan.shots[i - 1]
    if (i && s.kind === 'scene' && prev.kind === 'scene' && prev.scene === s.scene) problems.push(`${s.id}: same scene twice in a row (${s.scene})`)
  })
  if (stats.scenes.length >= 3)
    for (const h of o.history.slice(-10)) {
      const overlap = stats.scenes.filter((x) => h.scenes.includes(x)).length / stats.scenes.length
      if (overlap > 0.6) problems.push(`variety: ${Math.round(overlap * 100)}% of scenes repeat recent video ${h.job} — pick other scenes`)
    }
  return { ok: problems.length === 0, problems, stats }
}
