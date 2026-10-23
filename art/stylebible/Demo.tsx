// ============================================================
// LIBRARY DEMO — the owner-approved 17-second story rebuilt from
// the art library ONLY (scenes, rig, props, infographics, SFX),
// every move on a cue word from the Andrew HD timings. This is
// the shape of what the Phase-2 engine will generate.
// ============================================================

import React from 'react'
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame } from 'remotion'
import { Equation } from '../infographics/charts'
import { KeywordSlam } from '../infographics/cards'
import { clamp, SlideFrame } from '../infographics/SlideFrame'
import { getProp } from '../props/registry'
import { Actor } from '../rig/Actor'
import { type PoseId, poseAt } from '../rig/pose'
import { getScene } from '../scenes/registry'
import { cueFrame } from '../timing'
import { fontFaces, FPS } from '../tokens'
import { DEMO_VOICE, DEMO_WORDS } from './demoWords'
import { GrainOverlay } from '../GrainOverlay'

const c = (w: string, n = 1) => cueFrame(DEMO_WORDS, w, n)
const C = {
  people: c('people'), think: c('think'), business: c('business'), earns: c('earns'), buyers: c('buyers'), dont: c("don't"),
  picture: c('picture'), shop: c('shop'), three: c('three'), three2: c('three', 2), one: c('one'), million: c('million'),
  but: c('but'), disappears: c('disappears'), deal: c('deal'), flames: c('flames'),
}
export const DEMO_FRAMES = Math.round(DEMO_WORDS[DEMO_WORDS.length - 1].e * FPS) + 36

const sfx = (n: string) => staticFile(`sfx/cc/${n}.wav`)
const Shop = getScene('shop-street')
const Coin = getProp('coin').Component, ShopIcon = getProp('shop-mini').Component, Contract = getProp('contract').Component, Fire = getProp('fire').Component

// ---------------------------------------------------------------- 1. street, hero thinks / points / shrugs
const Street: React.FC<{ f: number }> = ({ f }) => {
  const a = Shop.anchors
  const track: [number, PoseId][] = [[0, 'idle'], [C.think, 'think'], [C.earns, 'point'], [C.dont - 2, 'shrug']]
  const lights = interpolate(f, [C.business, C.business + 2, C.business + 4, C.business + 6], [0, 1, 0.25, 1], clamp)
  const enter = interpolate(f, [C.people - 6, C.people + 10], [0, 1], clamp)
  const dim = interpolate(f, [C.buyers - 3, C.buyers + 3], [0, 0.8], clamp)
  const cam = interpolate(f, [0, C.picture], [1.02, 1.1])
  const out = interpolate(f, [C.picture - 6, C.picture], [1, 0], clamp)
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <AbsoluteFill style={{ transform: `scale(${cam})`, filter: `blur(${dim * 10}px)` }}>
        <Shop.Component frame={f} t={f / C.picture} lightsOn={lights}
          actors={{ mid: <Actor who="owner" pose="idle" x={a.door.x} y={a.door.y} scale={a.door.scale} frame={f} /> }} />
        <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
          <g opacity={enter}><Actor who="hero" pose={poseAt(f, FPS, track)} x={a.stand.x - (1 - enter) * 80} y={a.stand.y} scale={a.stand.scale} frame={f} /></g>
          {[0, 1, 2].map((i) => <Coin key={i} size={90} x={a.prop1.x - 160 + i * 110} y={a.prop1.y - 45 - i * 8} frame={f} enter={C.earns + i * 3} />)}
        </svg>
      </AbsoluteFill>
      <AbsoluteFill style={{ background: '#000', opacity: dim }} />
      {f >= C.buyers - 1 && <KeywordSlam frame={f} words={[{ text: 'BUYERS' }, { text: "DON'T.", tone: 'red' }]} cues={[C.buyers, C.dont]} />}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- 2. the maths slide
const Maths: React.FC<{ f: number }> = ({ f }) => (
  <SlideFrame frame={f} heading="What a small business is worth" headCue={C.picture + 2} source="Illustrative example">
    <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}><ShopIcon size={150} x={150} y={300} frame={f} enter={C.shop} /></svg>
    <Equation frame={f} cues={[C.three, C.three2, C.one, C.million]}
      parts={[{ text: '$350k', label: 'profit per year' }, { op: '× 3' }, { op: '→' }, { text: '$1.05m', label: 'sale price', tone: 'green' }]} />
  </SlideFrame>
)

// ---------------------------------------------------------------- 3. owner disappears, the deal burns
const Burn: React.FC<{ f: number }> = ({ f }) => {
  const zoom = interpolate(f, [C.but, C.disappears + 10, C.flames, C.flames + 20], [1.0, 1.35, 1.35, 1.2], clamp)
  const gone = interpolate(f, [C.disappears, C.disappears + 16], [0, 1], clamp)
  const enter = interpolate(f, [C.but - 6, C.but + 2], [0, 1], clamp)
  const shake = f >= C.flames ? Math.max(0, 1 - (f - C.flames) / 14) : 0
  const flash = interpolate(f, [C.flames, C.flames + 2, C.flames + 12], [0, 0.4, 0], clamp)
  const burn = interpolate(f, [C.flames + 4, C.flames + 30], [0, 1], clamp)
  return (
    <AbsoluteFill style={{ opacity: enter }}>
      <AbsoluteFill style={{ transformOrigin: '1470px 760px', transform: `scale(${zoom}) translate(${shake * 14 * Math.sin(f * 2.7)}px, ${shake * 10 * Math.cos(f * 3.3)}px)` }}>
        <Shop.Component frame={f} t={0.4} lightsOn={1} actors={{ mid: gone < 1
          ? <g opacity={1 - gone} transform={`translate(0 ${-gone * 20})`}><Actor who="owner" pose="idle" x={Shop.anchors.door.x} y={Shop.anchors.door.y} scale={Shop.anchors.door.scale} frame={f} /></g>
          : null }} />
        <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
          <g opacity={1 - burn}><Contract size={300} x={1020} y={250} frame={f} enter={C.deal} /></g>
          {[0, 1, 2, 3, 4].map((i) => <Fire key={i} size={420} x={600 + i * 230} y={600} frame={f + i * 5} enter={C.flames - 2 + i} />)}
        </svg>
      </AbsoluteFill>
      <AbsoluteFill style={{ background: '#FF8A3A', opacity: flash, mixBlendMode: 'screen' }} />
    </AbsoluteFill>
  )
}

export const LibraryDemo: React.FC = () => {
  const f = useCurrentFrame()
  const hits: [number, string, number][] = [[C.people, 'swish', 0.3], [C.business, 'tick', 0.45], [C.earns, 'cash', 0.35], [C.buyers, 'whoosh', 0.3],
    [C.dont, 'impact', 0.5], [C.picture - 4, 'whoosh', 0.35], [C.shop, 'pop', 0.4], [C.three, 'swish', 0.35], [C.three2, 'swish', 0.35],
    [C.one, 'whoosh', 0.25], [C.million, 'ding', 0.35], [C.but - 6, 'whoosh', 0.35], [C.deal, 'thud', 0.45], [C.flames - 2, 'impact', 0.55]]
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <style>{fontFaces()}</style>
      <Audio src={staticFile(DEMO_VOICE)} />
      {f < C.picture && <Street f={f} />}
      {f >= C.picture && f < C.but && <Maths f={f} />}
      {f >= C.but - 6 && <Burn f={f} />}
      <GrainOverlay frame={f} />
      {hits.map(([at, n, v], i) => <Sequence key={i} from={at}><Audio src={sfx(n)} volume={v} /></Sequence>)}
    </AbsoluteFill>
  )
}

