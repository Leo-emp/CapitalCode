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
import { camKeys, DEPTH, framed, layerCam } from '../../art/motion/camera'
import { type Anchor, cameraFor, OVERSCAN, type SceneFraming } from '../../art/scenes/kit'
import { SCENES } from '../../art/scenes/registry'
import { VIGNETTES } from '../../art/vignettes/registry'
import { PUBLIC_DIR } from '../paths'
import type { Cue, PlanDoc, TimedWord } from '../schema'
import { DECOR_FIGURES, layoutProblems, SLIDE_KINDS, SLIDE_SPECS } from '../slides'
import { resolveCue } from '../timeline'

export type History = { job: string; scenes: string[]; slides: string[]; area?: string; format?: string; kind?: string; title?: string; date?: string }[]
export type PlanGateOpts = {
  duration: number; history: History; sfxNames?: string[]
  slideShare?: [number, number]; median?: [number, number]; maxShot?: number; minShot?: number
  // # owner review 2026-10-24: something on screen fast, few slams, brand early
  firstVisual?: number; maxSlams?: number; brandBy?: number
  // # "show what is said": share of sentences allowed without their own illustration, longest gap (s)
  maxBare?: number; maxGap?: number
  // # living film (spec §12.6): most of the runtime is pictures — text (slides, slams, kinetic text) at most this share
  maxText?: number
}

// # Living film framing: where each planned camera move lands, every (non-walking) person must be fully in
// # the frame or fully out of it — never a hand or half a body at the edge, never a head cut off at the top
const framingCuts = (s: { framing?: SceneFraming; camera?: { at: Cue; to: string | { x: number; y: number }; zoom?: number }[]; actors?: { who: string; anchor: string; path?: unknown[] }[] }, anchors: Record<string, Anchor>): string[] => {
  const fc = cameraFor(s.framing ?? 'wide', anchors.focus ?? anchors.prop1 ?? { x: 960, y: 540 })
  const base = { x: (960 - fc.tx) / fc.k, y: (540 - fc.ty) / fc.k, zoom: fc.k }
  const keys = camKeys(0, base, (s.camera ?? []).map((c, i) => ({ ...c, at: i + 1 })), anchors).slice(1)
  const out: string[] = []
  keys.forEach((k, i) => {
    for (const a of s.actors ?? []) {
      const p = anchors[a.anchor]
      if (!p || a.path?.length) continue
      const v = framed(layerCam({ ...k, zoom: k.zoom * OVERSCAN }, DEPTH[p.layer]))
      const x0 = (p.x - 100 * p.scale) * v.k + v.tx, x1 = (p.x + 100 * p.scale) * v.k + v.tx
      const top = (p.y - 580 * p.scale) * v.k + v.ty, foot = p.y * v.k + v.ty
      const shown = Math.max(0, Math.min(1920, x1) - Math.max(0, x0)) / (x1 - x0)
      const cue = s.camera![i].at
      if (shown > 0.05 && shown < 0.95) out.push(`camera at "${cue.word ?? cue.sentence}" cuts ${a.who} at the frame edge (${Math.round(shown * 100)}% in frame) — zoom out, aim between, or let them leave the frame`)
      else if (shown >= 0.95 && top < 0 && foot > 0) out.push(`camera at "${cue.word ?? cue.sentence}" cuts ${a.who}'s head off — aim lower or zoom out`)
    }
  })
  return out
}

// # Seconds of on-screen text one scene slam / one kinetic text counts for in the text share
export const SLAM_TEXT_S = 2, KINETIC_TEXT_S = 1.5
// # Poses that are talk, not an action — a key to one of these does not show anything (spec §12.1)
const TALK_POSES = ['idle', 'talk', 'present']

// # Icons that decorate but do not SHOW anything the voice says — never count as illustration
export const GENERIC_ICONS = ['question', 'exclamation', 'tick', 'cross', 'warning', 'magnifier', 'clock', 'calendar']

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
  // # zoom-into (living film): a shot grows out of a spot (or a point) of the shot before it
  plan.shots.forEach((s, i) => {
    const z = s.enter?.zoomInto
    if (z === undefined) return
    if (i === 0) { problems.push(`${s.id}: the first shot has nothing to zoom out of`); return }
    if (typeof z !== 'string') return
    const prev = plan.shots[i - 1]
    if (prev.kind !== 'scene') { problems.push(`${s.id}: zoomInto "${z}" needs the previous shot to be a scene — give a point {x, y} instead`); return }
    if (!SCENES.find((x) => x.id === prev.scene)?.anchors[z]) problems.push(`${s.id}: zoomInto "${z}" is not a spot of the previous shot (scene ${prev.scene})`)
  })
  for (const s of plan.shots) {
    if (ids.has(s.id)) problems.push(`${s.id}: duplicate shot id`)
    for (const l of layoutProblems(s as Parameters<typeof layoutProblems>[0])) problems.push(`${s.id}: ${l}`)
    ids.add(s.id)
    starts.push(cue(s.id, s.start) ?? NaN)
    if (s.kind === 'scene') {
      const sc = SCENES.find((x) => x.id === s.scene)
      if (!sc) problems.push(`${s.id}: unknown scene "${s.scene}"`)
      if (DECOR_FIGURES.includes(s.scene) && !(s as { decorOk?: boolean }).decorOk)
        problems.push(`${s.id}: scene ${s.scene} shows made-up figures (prices/%/tickers) — pick another scene, or set decorOk: true if they fit the story`)
      for (const a of s.actors ?? []) {
        if (!CAST.includes(a.who)) problems.push(`${s.id}: unknown actor "${a.who}" (cast: ${CAST.join(', ')})`)
        if (sc && !sc.anchors[a.anchor]) problems.push(`${s.id}: scene ${s.scene} has no anchor "${a.anchor}" (has: ${Object.keys(sc.anchors).join(', ')})`)
        if (sc && sc.anchors[a.anchor] && !inFrame(sc.anchors, s.framing ?? 'wide', sc.anchors[a.anchor]))
          problems.push(`${s.id}: actor ${a.who} at "${a.anchor}" is out of frame with ${s.framing} framing — use wide/medium or another anchor`)
        if (!a.track?.length) problems.push(`${s.id}: actor ${a.who} has an empty track`)
        for (const leg of a.path ?? []) {
          if (sc && !sc.anchors[leg.to]) problems.push(`${s.id}: path anchor "${leg.to}" not in scene ${s.scene}`)
          cue(s.id, leg.at)
        }
        for (const k of a.track ?? []) {
          if (!(POSE_IDS as string[]).includes(k.pose)) problems.push(`${s.id}: unknown pose "${k.pose}"`)
          if (k.expression && !(EXPRESSIONS as string[]).includes(k.expression)) problems.push(`${s.id}: unknown expression "${k.expression}"`)
          cue(s.id, k.at)
        }
      }
      for (const p of s.props ?? []) {
        if (!PROPS.some((x) => x.id === p.id)) problems.push(`${s.id}: unknown prop "${p.id}"`)
        if (sc && !sc.anchors[p.anchor]) problems.push(`${s.id}: scene ${s.scene} has no anchor "${p.anchor}"`)
        if (p.on !== undefined && p.on !== 'hand' && p.on !== 'floor') problems.push(`${s.id}: prop ${p.id}: on must be "hand" or "floor"`)
        const n = (s.actors ?? []).length
        if (p.give) {
          if (p.on !== 'hand') problems.push(`${s.id}: prop ${p.id} can only be given from a hand (on: "hand")`)
          if (p.give.to >= n) problems.push(`${s.id}: prop ${p.id} is given to actor ${p.give.to}, but the shot has ${n} actor${n === 1 ? '' : 's'}`)
          cue(s.id, p.give.at)
        }
        if (p.on === 'hand' && (p.actor ?? 0) >= n) problems.push(`${s.id}: prop ${p.id} is held by actor ${p.actor ?? 0}, but the shot has ${n} actor${n === 1 ? '' : 's'}`)
        cue(s.id, p.at)
      }
      // # kinetic text (owner: "occasionally where relevant") — at most 2 per shot
      if ((s.text ?? []).length > 2) problems.push(`${s.id}: ${s.text!.length} kinetic texts — at most 2 per shot (text is a spice, not the meal)`)
      for (const k of s.text ?? []) {
        if (!['pop', 'type', 'stamp', 'count'].includes(k.style)) problems.push(`${s.id}: text style "${k.style}" (pop, type, stamp, count)`)
        if (k.anchor && sc && !sc.anchors[k.anchor]) problems.push(`${s.id}: text anchor "${k.anchor}" not in scene ${s.scene}`)
        cue(s.id, k.at)
      }
      for (const c of s.camera ?? []) {
        if (typeof c.to === 'string' && sc && !sc.anchors[c.to]) problems.push(`${s.id}: camera target "${c.to}" not in scene ${s.scene}`)
        cue(s.id, c.at)
      }
      if (sc && s.camera?.length && s.camera.every((c) => typeof c.to !== 'string' || sc.anchors[c.to])) for (const p of framingCuts(s, sc.anchors)) problems.push(`${s.id}: ${p}`)
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
    } else if (s.kind === 'vignette') {
      if (s.heading && s.heading.length > 36) problems.push(`${s.id}: vignette heading is longer than one line (max 36 characters)`)
      const v = VIGNETTES.find((x) => x.id === s.vignette)
      if (!v) problems.push(`${s.id}: unknown vignette "${s.vignette}" (vignettes: ${VIGNETTES.map((x) => x.id).join(', ')})`)
      else {
        const bad = v.check(s.data)
        if (bad) problems.push(`${s.id}: ${s.vignette} ${bad}`)
        else if ((s.at ?? []).length > v.items(s.data)) problems.push(`${s.id}: more cues than ${s.vignette} steps (${v.items(s.data)})`)
      }
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
    // # a vignette is half data (labels, numbers), half illustration → counts 0.5 toward slide share
    slideShare: valid ? plan.shots.reduce((a, s, i) => a + (s.kind === 'slide' ? lens[i] : s.kind === 'vignette' ? 0.5 * lens[i] : 0), 0) / o.duration : NaN,
    medianShot: valid ? median(lens) : NaN,
    scenes: [...new Set(plan.shots.flatMap((s) => (s.kind === 'scene' ? [s.scene] : [])))],
    slides: [...new Set(plan.shots.flatMap((s) => (s.kind === 'slide' ? [s.slide] : [])))],
    // # text on screen: slides + scene slams + kinetic texts, as a share of the runtime
    textShare: valid ? plan.shots.reduce((a, s, i) => a + (s.kind === 'slide' ? lens[i]
      : s.kind === 'scene' ? (s.slam ? SLAM_TEXT_S : 0) + (s.text?.length ?? 0) * KINETIC_TEXT_S : 0), 0) / o.duration : NaN,
  }
  if (valid) {
    lens.forEach((l, i) => {
      if (l > (o.maxShot ?? 30)) problems.push(`${plan.shots[i].id}: shot is ${l.toFixed(1)} s (max ${o.maxShot ?? 30})`)
      if (l < (o.minShot ?? 1)) problems.push(`${plan.shots[i].id}: shot is ${l.toFixed(2)} s (min ${o.minShot ?? 1})`)
    })
    if (stats.slideShare < shareMin || stats.slideShare > shareMax) problems.push(`slide share ${(stats.slideShare * 100).toFixed(0)}% (want ${shareMin * 100}–${shareMax * 100}%)`)
    if (o.maxText !== undefined && stats.textShare > o.maxText) problems.push(`text ${Math.round(stats.textShare * 100)}% of runtime (max ${Math.round(o.maxText * 100)}%) — show it with a scene, vignette or metaphor instead of a slide`)
    if (stats.medianShot < medMin || stats.medianShot > medMax) problems.push(`median shot ${stats.medianShot.toFixed(1)} s (want ${medMin}–${medMax} s)`)
  }
  // # a slide shows its first item within `firstVisual` s of the cut (no heading-only seconds)
  plan.shots.forEach((s, i) => {
    if ((s.kind !== 'slide' && s.kind !== 'vignette') || !s.at?.length || !Number.isFinite(starts[i])) return
    let first: number
    try { first = resolveCue(words, s.at[0]) } catch { return }
    const gap = first - starts[i]
    if (gap > (o.firstVisual ?? 1.0)) problems.push(`${s.id}: slide is empty for ${gap.toFixed(1)} s after the cut — start the shot on "${s.at[0].word ?? 'its first word'}" (${s.at[0].sentence}) or cue the first item earlier`)
  })
  // # show what is said: every sentence should get its own illustrative event (slide/vignette step,
  // # a meaningful prop, a slam); chapter and brand cards count as visual content for the gap check
  {
    const events: Cue[] = []
    const marks: number[] = []
    plan.shots.forEach((s, i) => {
      if (s.kind === 'slide' || s.kind === 'vignette') events.push(...(s.at ?? []))
      if (s.kind === 'scene') {
        for (const p of s.props ?? []) {
          if (!GENERIC_ICONS.includes(p.id)) events.push(p.at)
          if (p.give) events.push(p.give.at) // # handing it over is an action
        }
        if (s.slam) events.push(...s.slam.at)
        // # living film (spec §12.1): the camera going to a named spot, a walk, an action pose or a change of
        // # feeling, kinetic text — all show the line; talk poses and the engine's drift/follow/idle do not
        for (const c of s.camera ?? []) events.push(c.at)
        for (const a of s.actors ?? []) {
          for (const leg of a.path ?? []) events.push(leg.at)
          a.track.slice(1).forEach((k) => { if (k.expression || !TALK_POSES.includes(k.pose)) events.push(k.at) })
        }
        for (const k of s.text ?? []) events.push(k.at)
      }
      if ((s.kind === 'chapter' || s.kind === 'brand') && Number.isFinite(starts[i])) marks.push(starts[i])
      // # a chapter card's title is the visual for the sentence it opens on
      if (s.kind === 'chapter') events.push(s.start)
    })
    const sids = [...new Set(words.map((w) => w.sid))]
    const shown = new Set(events.map((c) => c.sentence))
    const bare = sids.filter((x) => !shown.has(x))
    if (sids.length && bare.length / sids.length > (o.maxBare ?? 0.1))
      problems.push(`${bare.length} of ${sids.length} sentences have nothing on screen that shows what is said (max ${Math.round((o.maxBare ?? 0.1) * 100)}%): ${bare.slice(0, 12).join(', ')}${bare.length > 12 ? ' …' : ''} — add a vignette step, a slide item or a meaningful prop on each; generic icons and pose changes do not count`)
    const times = events.flatMap((c) => { try { return [resolveCue(words, c)] } catch { return [] } }).concat(marks, [first, o.duration]).sort((a, b) => a - b)
    // # every gap over the limit, longest first (up to 8), so the director can fix them in one pass
    const gaps: [number, number][] = []
    for (let k = 1; k < times.length; k++) if (times[k] - times[k - 1] > (o.maxGap ?? 6)) gaps.push([times[k] - times[k - 1], times[k - 1]])
    for (const [len, at] of gaps.sort((a, b) => b[0] - a[0]).slice(0, 8))
      problems.push(`no illustration for ${len.toFixed(1)} s from ${at.toFixed(1)} s (max ${o.maxGap ?? 6} s) — show what is being said there`)
  }
  const slams = plan.shots.filter((s) => (s.kind === 'scene' && s.slam) || (s.kind === 'slide' && s.slide === 'slam')).length
  if (slams > (o.maxSlams ?? 3)) problems.push(`${slams} slams (max ${o.maxSlams ?? 3}) — keep them for the real payoff lines`)
  plan.shots.forEach((s, i) => {
    if (s.kind === 'brand' && starts[i] > (o.brandBy ?? 25)) problems.push(`${s.id}: brand card at ${starts[i].toFixed(1)} s (max ${o.brandBy ?? 25} s)`)
  })
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
