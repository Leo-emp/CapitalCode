// ============================================================
// EPISODE — renders a whole video from timeline.json (made by the
// engine's gate-plan). Every cue is already a frame number, so this
// file only draws: scene shots (scene + HD cast + props + slams),
// infographic slides, chapter cards and the logo, joined by short
// zoom-through transitions, grain on top. Video only — the voice
// and SFX are mixed once by ffmpeg (agent/render.ts).
// ============================================================

import React from 'react'
import { AbsoluteFill, Audio, Easing, interpolate, staticFile, useCurrentFrame } from 'remotion'
import { GrainOverlay } from '../GrainOverlay'
import { ChapterCard, CompareCards, FlowDiagram, KeywordSlam, MapHighlight, QuoteCard, Timeline as TimelineCard } from '../infographics/cards'
import { BarChart, Equation, LineChart, NumberBuild, StackedBar } from '../infographics/charts'
import { formatMoney, pctFormat } from '../infographics/layout'
import { clamp, SlideFrame } from '../infographics/SlideFrame'
import { Emblem } from '../logo/Emblem'
import { Lockup } from '../logo/LogoReveal'
import { getProp } from '../props/registry'
import { Actor, propBox } from '../rig/Actor'
import { type ExpressionId, type Pose, type PoseId, poseAt } from '../rig/pose'
import { getScene } from '../scenes/registry'
import { getVignette } from '../vignettes/registry'
import { FPS, fontFaces } from '../tokens'

// # Same shapes as agent/timeline.ts, with every cue already a frame number
type Tone = 'blue' | 'green' | 'red' | 'champagne' | 'text'
type RActor = { who: string; anchor: string; track: { at: number; pose: string; expression?: string }[]; flip?: boolean }
// # on: 'hand' = held by actor[actor ?? 0] (follows the pose), 'floor' = stands on the anchor's ground line
type RProp = { id: string; anchor: string; at: number; size?: number; on?: 'hand' | 'floor'; actor?: number }
type RScene = { id: string; kind: 'scene'; start: number; scene: string; time?: 'night' | 'dusk' | 'rain' | 'fog'; tone?: 'none' | 'blue' | 'gold' | 'red' | 'green'
  framing?: 'wide' | 'medium' | 'close'; variant?: string; actors?: RActor[]; props?: RProp[]; slam?: { words: { text: string; tone?: Tone }[]; at: number[] } }
type RSlide = { id: string; kind: 'slide'; start: number; slide: string; heading?: string; kicker?: string; source?: string; data: any; at: number[] }
type RChapter = { id: string; kind: 'chapter'; start: number; n: number; title: string }
type RBrand = { id: string; kind: 'brand'; start: number }
export type RShot = RScene | RSlide | RVignette | RChapter | RBrand
export type EpisodeTimeline = { fps: number; durationInFrames: number; shots: { shot: RShot; from: number; to: number }[]; sfx: { name: string; t: number; volume: number }[] }
export type EpisodeProps = { timeline: EpisodeTimeline; voice?: string; width?: number; height?: number }

export const TRANSITION = 8 // # frames of zoom-through between shots

// ---------------------------------------------------------------- number formats a slide can ask for
const FORMATS: Record<string, (v: number) => string> = {
  money: (v) => formatMoney(v, { compact: true }),
  moneyFull: (v) => formatMoney(v),
  pct: (v) => `${Math.round(v * 10) / 10}%`,
  int: (v) => Math.round(v).toLocaleString('en-US'),
  x: (v) => `${Math.round(v * 10) / 10}×`,
  plain: (v) => `${Math.round(v * 100) / 100}`,
  cents: (v) => `${Math.round(v * 10) / 10}¢`,
}
const fmt = (name?: string) => FORMATS[name ?? ''] ?? FORMATS.plain

// ---------------------------------------------------------------- scene shot
// # A slam darkens the scene, lays a near-solid band behind the words and hides the props,
// # so no sign, prop or screen text reads through the slam (Critic, first long video)
export const slamLayers = (f: number, slamAt: number | undefined) => {
  if (slamAt === undefined || f < slamAt - 3) return { dim: 0, band: 0, props: true }
  const k = interpolate(f, [slamAt - 3, slamAt + 3], [0, 1], clamp)
  return { dim: 0.86 * k, band: 0.96 * k, props: false }
}
const SceneShotView: React.FC<{ s: RScene; f: number; from: number; to: number }> = ({ s, f, from, to }) => {
  const Scene = getScene(s.scene)
  const a = Scene.anchors
  const t = interpolate(f, [from, to], [0, 1], clamp)
  const slots: Record<'back' | 'mid' | 'front', React.ReactNode[]> = { back: [], mid: [], front: [] }

  const actorAt: { pose: Pose; anchor: typeof a[string]; flip: boolean }[] = []
  for (const [i, act] of (s.actors ?? []).entries()) {
    const anc = a[act.anchor]
    // # the second spot faces the first (two-person moments) unless the plan says otherwise
    const flip = act.flip ?? (act.anchor === 'stand2' && a.stand ? anc.x > a.stand.x : false)
    const keys = [...act.track].sort((x, y) => x.at - y.at)
    const pose = poseAt(f, FPS, keys.map((k) => [k.at, k.pose as PoseId]))
    const expr = [...keys].reverse().find((k) => k.at <= f && k.expression)?.expression as ExpressionId | undefined
    actorAt.push({ pose, anchor: anc, flip })
    // # an actor whose first key is after the cut walks in on that cue; otherwise it is there from the start
    const enterAt = keys[0].at > from + 2 ? keys[0].at : -999
    const enter = interpolate(f, [enterAt - 4, enterAt + 8], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) })
    slots[anc.layer].push(
      <g key={`a${i}`} opacity={enter} transform={`translate(${(1 - enter) * (flip ? 60 : -60)} 0)`}>
        <Actor who={act.who} pose={pose} expression={expr} x={anc.x} y={anc.y} scale={anc.scale} frame={f} flip={flip} />
      </g>,
    )
  }
  const slamAt = s.slam?.at[0]
  const layers = slamLayers(f, slamAt)
  const perAnchor: Record<string, number> = {}
  for (const [i, p] of (s.props ?? []).entries()) {
    const anc = a[p.anchor]
    const Prop = getProp(p.id).Component
    const size = (p.size ?? 170) * anc.scale
    if (f < p.at - 1 || !layers.props) continue
    const holder = p.on === 'hand' ? actorAt[p.actor ?? 0] : undefined
    const box = propBox(p.on, size, anc, holder ? { pose: holder.pose, flip: holder.flip, actor: holder.anchor } : {})
    // # several props on one anchor fan out (not for held props)
    const k = p.on === 'hand' ? 0 : (perAnchor[p.anchor] = (perAnchor[p.anchor] ?? -1) + 1)
    const layer = holder ? holder.anchor.layer : anc.layer
    slots[layer].push(<Prop key={`p${i}`} size={box.size} x={box.x + k * size * 0.72} y={box.y - k * 8} frame={f} enter={p.at} />)
  }

  // # slow push-in keeps every scene alive; a slam darkens the scene and hits the words
  const push = interpolate(f, [from, to], [1.0, 1.05], clamp)
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ transform: `scale(${push})` }}>
        <Scene.Component frame={f} t={t} lightsOn={1} time={s.time} tone={s.tone} framing={s.framing} variant={s.variant}
          actors={{ back: slots.back.length ? slots.back : undefined, mid: slots.mid.length ? slots.mid : undefined, front: slots.front.length ? slots.front : undefined }} />
      </AbsoluteFill>
      {s.slam && slamAt !== undefined && f >= slamAt - 3 && (
        <>
          <AbsoluteFill style={{ background: '#000', opacity: layers.dim }} />
          <AbsoluteFill style={{ justifyContent: 'center' }}>
            <div style={{ height: 380, background: 'linear-gradient(180deg, transparent 0%, #000 18%, #000 82%, transparent 100%)', opacity: layers.band }} />
          </AbsoluteFill>
          <KeywordSlam frame={f} words={s.slam.words} cues={s.slam.at} />
        </>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- infographic slide
const SlideBody: React.FC<{ s: RSlide; f: number }> = ({ s, f }) => {
  const d = s.data, at = s.at
  switch (s.slide) {
    case 'number': return <NumberBuild frame={f} value={d.value} cues={[at[0], Math.max(at[1], at[0] + 20)]} label={d.label} tone={d.tone} format={fmt(d.format ?? 'money')} />
    case 'equation': return <Equation frame={f} parts={d.parts} cues={at} />
    case 'bars': return <BarChart frame={f} bars={d.bars} cues={at} max={d.max} format={d.format === 'pct' ? pctFormat(d.bars.map((b: { value: number }) => b.value)) : fmt(d.format)} />
    case 'line': return <LineChart frame={f} values={d.values} cues={[at[0], Math.max(at[1], at[0] + 30)]} area={d.area} tone={d.tone}
      annotate={d.annotate ? { ...d.annotate, cue: at[2] } : undefined} yFormat={fmt(d.format)} xLabels={d.xLabels} />
    case 'stacked': return <StackedBar frame={f} segments={d.segments} cues={at} format={d.format === 'pct' ? pctFormat(d.segments.map((x: { value: number }) => x.value)) : fmt(d.format)} />
    case 'flow': return <FlowDiagram frame={f} nodes={d.nodes} cues={at} />
    case 'timeline': return <TimelineCard frame={f} points={d.points} cues={at} />
    case 'compare': return <CompareCards frame={f} cards={d.cards} cues={at} />
    case 'map': return <MapHighlight frame={f} pins={d.pins} cues={at} />
    case 'quote': return <QuoteCard frame={f} quote={d.quote} who={d.who} cue={at[0]} />
    case 'slam': return <KeywordSlam frame={f} words={d.words} cues={at} />
    default: return null
  }
}
const SlideShotView: React.FC<{ s: RSlide; f: number; from: number }> = ({ s, f, from }) => {
  const Icon = s.data?.icon ? getProp(s.data.icon).Component : null
  return (
    <SlideFrame frame={f} heading={s.heading} kicker={s.kicker} source={s.source} headCue={from + 2}>
      {Icon && <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}><Icon size={150} x={1650} y={70} frame={f} enter={from + 6} /></svg>}
      <SlideBody s={s} f={f} />
    </SlideFrame>
  )
}

// ---------------------------------------------------------------- vignette (animated mini-scene)
type RVignette = { id: string; kind: 'vignette'; start: number; vignette: string; heading?: string; kicker?: string; source?: string; data: any; at: number[] }
const VignetteShotView: React.FC<{ s: RVignette; f: number; from: number }> = ({ s, f, from }) => {
  const V = getVignette(s.vignette).Component
  return (
    <SlideFrame frame={f} heading={s.heading} kicker={s.kicker} source={s.source} headCue={from + 2}>
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}><V frame={f} data={s.data} cues={s.at} /></svg>
    </SlideFrame>
  )
}

// ---------------------------------------------------------------- one shot, with its transition in/out
const ShotView: React.FC<{ s: RShot; f: number; from: number; to: number }> = ({ s, f, from, to }) => {
  const inP = interpolate(f, [from, from + TRANSITION], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) })
  const outP = interpolate(f, [to, to + TRANSITION], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) })
  const scale = (1.06 - 0.06 * inP) * (1 + 0.08 * outP)
  const body =
    s.kind === 'scene' ? <SceneShotView s={s} f={f} from={from} to={to} />
    : s.kind === 'slide' ? <SlideShotView s={s} f={f} from={from} />
    : s.kind === 'vignette' ? <VignetteShotView s={s} f={f} from={from} />
    : s.kind === 'chapter' ? <ChapterCard frame={f} n={s.n} title={s.title} cue={from} />
    : <Lockup f={f - from} />
  return <AbsoluteFill style={{ opacity: from === 0 ? 1 : inP, transform: `scale(${from === 0 ? 1 + 0.08 * outP : scale})` }}>{body}</AbsoluteFill>
}

// # Shots visible at frame f: the current one, plus the previous one while it zooms out under the new one
export const visibleShots = (tl: EpisodeTimeline, f: number) => tl.shots.filter((x) => f >= x.from && f < x.to + TRANSITION)

// # Small brand emblem top-left on every shot except the brand card (channel identity, like Alux)
export const cornerLogo = (kind: string) => kind !== 'brand'

export const Episode: React.FC<EpisodeProps> = ({ timeline, voice }) => {
  const f = useCurrentFrame()
  const current = timeline.shots.find((x) => f >= x.from && f < x.to)
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <style>{fontFaces()}</style>
      {voice && <Audio src={staticFile(voice)} />}
      {visibleShots(timeline, f).map((x) => <ShotView key={x.shot.id} s={x.shot} f={f} from={x.from} to={x.to} />)}
      {current && cornerLogo(current.shot.kind) && (
        <svg width={56} height={56} style={{ position: 'absolute', left: 48, top: 40, opacity: 0.85 }}><Emblem size={56} /></svg>
      )}
      <GrainOverlay frame={f} />
    </AbsoluteFill>
  )
}
