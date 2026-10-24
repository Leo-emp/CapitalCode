// ============================================================
// REVIEW SHEETS — stills for checking the art by eye
// (pose strip, expression strip, line-ups…). The full style
// bible (Task 11) assembles these into pages.
// ============================================================

import React from 'react'
import { AbsoluteFill } from 'remotion'
import { EXPRESSIONS } from '../rig/faces'
import { Actor, CAST } from '../rig/Actor'
import { PROPS } from '../props/registry'
import { SCENES } from '../scenes/registry'
import { BarChart, Equation, LineChart, NumberBuild, StackedBar } from '../infographics/charts'
import { ChapterCard, CompareCards, FlowDiagram, KeywordSlam, MapHighlight, QuoteCard, Timeline } from '../infographics/cards'
import { SlideFrame } from '../infographics/SlideFrame'
import { type ThumbProps, Thumbnail } from '../thumbnails/Thumbnail'
import { type Pose, POSE_IDS, POSES } from '../rig/pose'
import { COLORS, fontFaces } from '../tokens'

const Label: React.FC<{ x: number; y: number; text: string }> = ({ x, y, text }) => (
  <text x={x} y={y} textAnchor="middle" fill={COLORS.dim} style={{ fontFamily: 'Inter', fontSize: 26 }}>{text}</text>
)

// # Grid of characters: cells of [label, pose, look]
export const CharacterGrid: React.FC<{ cells: [string, Pose, string][]; cols: number; scale: number; cellH: number }> = ({
  cells, cols, scale, cellH,
}) => {
  const cw = 1920 / cols
  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      <style>{fontFaces()}</style>
      <svg width={1920} height={1080} viewBox="0 0 1920 1080">
        {cells.map(([label, pose, look], i) => {
          const cx = cw * (i % cols) + cw / 2, cy = cellH * Math.floor(i / cols) + cellH - 46
          return (
            <g key={i}>
              <Actor who={look} pose={pose} x={cx} y={cy} scale={scale} breathe={false} />
              <Label x={cx} y={cy + 36} text={label} />
            </g>
          )
        })}
      </svg>
    </AbsoluteFill>
  )
}

export const PoseStrip: React.FC = () => (
  <CharacterGrid cells={POSE_IDS.map((id) => [id, POSES[id], 'hero'] as [string, Pose, string])} cols={8} scale={0.7} cellH={540} />
)

// # Head-and-shoulders close-ups, one per expression
export const ExpressionStrip: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.bg }}>
    <style>{fontFaces()}</style>
    <svg width={1920} height={1080} viewBox="0 0 1920 1080">
      {EXPRESSIONS.map((e, i) => {
        const cx = (1920 / 7) * i + 1920 / 14
        return (
          <g key={e}>
            <Actor who="hero" pose={e === 'thinking' ? 'think' : 'pockets'} expression={e} x={cx} y={1700} scale={2.2} breathe={false} />
            <text x={cx} y={90} textAnchor="middle" fill={COLORS.dim} style={{ fontFamily: "Inter", fontSize: 30 }}>{e}</text>
          </g>
        )
      })}
    </svg>
  </AbsoluteFill>
)

// # The cast side by side
export const CastLineup: React.FC = () => (
  <CharacterGrid cells={CAST.map((id, i) => [id, POSES[(['pockets', 'think', 'holdChest', 'present', 'armsCrossed'] as const)[i % 5]], id] as [string, Pose, string])}
    cols={5} scale={1.45} cellH={1080} />
)

// # Every prop on one sheet (grid), each with its id
export const PropSheet: React.FC<{ page?: number }> = ({ page = 0 }) => {
  const per = 40, cols = 10, list = PROPS.slice(page * per, page * per + per)
  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      <style>{fontFaces()}</style>
      <svg width={1920} height={1080} viewBox="0 0 1920 1080">
        {list.map((p, i) => {
          const x = (i % cols) * 192, y = Math.floor(i / cols) * 270
          const C = p.Component
          return (
            <g key={p.id}>
              <C size={160} x={x + 16} y={y + 20} frame={12} />
              <text x={x + 96} y={y + 220} textAnchor="middle" fill={COLORS.dim} style={{ fontFamily: 'Inter', fontSize: 20 }}>{p.id}</text>
            </g>
          )
        })}
      </svg>
    </AbsoluteFill>
  )
}
export const PropSheet2: React.FC = () => <PropSheet page={1} />
export const PropSheet3: React.FC = () => <PropSheet page={2} />

// # Scenes in a 4×3 grid at quarter size, hero at each scene's stand anchor
export const SceneSheet: React.FC<{ page?: number }> = ({ page = 0 }) => {
  const list = SCENES.slice(page * 12, page * 12 + 12)
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <style>{fontFaces()}</style>
      {list.map((sc, i) => {
        const C = sc.Component, a = sc.anchors.stand
        return (
          <div key={sc.id} style={{ position: 'absolute', left: (i % 4) * 480, top: Math.floor(i / 4) * 360, width: 480, height: 360, overflow: 'hidden' }}>
            <div style={{ position: 'absolute', width: 1920, height: 1080, transform: 'scale(0.25)', transformOrigin: '0 0' }}>
              <C frame={20} t={0.5} lightsOn={1} />
              <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
                <Actor who="hero" pose="idle" x={a.x} y={a.y} scale={a.scale} breathe={false} />
              </svg>
            </div>
            <div style={{ position: 'absolute', top: 274, left: 0, width: 480, textAlign: 'center', color: '#9AA6B4', font: '20px Inter' }}>{sc.id}</div>
          </div>
        )
      })}
    </AbsoluteFill>
  )
}
export const SceneSheet2: React.FC = () => <SceneSheet page={1} />
export const SceneSheet3: React.FC = () => <SceneSheet page={2} />

// # Every infographic, finished state, quarter size (sample data, illustrative)
const F = 200
export const INFO_SAMPLES: [string, React.ReactNode][] = [
  ['NumberBuild', <SlideFrame frame={F} heading="FTX, November 2022"><NumberBuild frame={F} value={8e9} cues={[0, 40]} label="missing from customer accounts" tone="red" format={(v) => '$' + Math.round(v).toLocaleString('en-US')} size={120} /></SlideFrame>],
  ['Equation', <SlideFrame frame={F} heading="A million-dollar starting point"><Equation frame={F} parts={[{ text: '$350k', label: 'profit per year' }, { op: '× 3' }, { op: '→' }, { text: '$1.05m', label: 'sale price', tone: 'green' }]} cues={[0, 10, 20, 30]} /></SlideFrame>],
  ['BarChart', <SlideFrame frame={F} heading="Every Bitcoin crash, peak to bottom"><BarChart frame={F} bars={[{ label: '2014', value: 86, tone: 'red' }, { label: '2018', value: 84, tone: 'red' }, { label: '2022', value: 77, tone: 'red' }]} cues={[0, 12, 24]} max={100} format={(v) => '-' + Math.round(v) + '%'} /></SlideFrame>],
  ['LineChart', <SlideFrame frame={F} heading="Bitcoin 2021–2022"><LineChart frame={F} values={[33, 45, 59, 58, 37, 35, 42, 47, 44, 61, 69, 46, 38, 43, 46, 38, 32, 20, 23, 20, 19, 21, 17, 16.5]} cues={[0, 90]} area annotate={{ index: 10, text: 'PEAK $69,000', cue: 50 }} yFormat={(v) => '$' + v + 'k'} xLabels={['2021', '2022']} /></SlideFrame>],
  ['StackedBar', <SlideFrame frame={F} heading="The deal price is not your payout"><StackedBar frame={F} segments={[{ label: 'debt', value: 300000, tone: 'red' }, { label: 'fees + taxes', value: 150000, tone: 'champagne' }, { label: 'your share', value: 600000, tone: 'green' }]} cues={[0, 10, 20]} /></SlideFrame>],
  ['FlowDiagram', <SlideFrame frame={F} heading="Sales are not the sale price"><FlowDiagram frame={F} nodes={[{ title: 'Sales', sub: '$1.2m a year' }, { title: 'Costs', sub: 'rent, staff, stock', tone: 'red' }, { title: 'Owner earnings', sub: '$350k', tone: 'green' }]} cues={[0, 10, 20]} /></SlideFrame>],
  ['Timeline', <SlideFrame frame={F} heading="The year you see is not the whole story"><Timeline frame={F} points={[{ when: '10 years', what: 'selling online' }, { when: '3 months', what: 'research' }, { when: '1 year', what: 'trading' }]} cues={[0, 10, 20]} /></SlideFrame>],
  ['CompareCards', <SlideFrame frame={F} heading="Where should $10,000 go?"><CompareCards frame={F} cards={[{ title: 'Index fund', value: '~7%', lines: ['long-term average', 'low fees'], tone: 'green', winner: true }, { title: 'Savings', value: '4%', lines: ['safe', 'beats inflation?'] }, { title: 'Crypto', value: '±60%', lines: ['very volatile'], tone: 'red' }]} cues={[0, 10, 20]} /></SlideFrame>],
  ['MapHighlight', <SlideFrame frame={F} heading="Where the chips are made"><MapHighlight frame={F} pins={[{ x: 0.83, y: 0.42, label: 'Taiwan', below: true }, { x: 0.86, y: 0.33, label: 'South Korea', tone: 'blue' }, { x: 0.22, y: 0.3, label: 'USA', tone: 'green' }]} cues={[0, 10, 20]} /></SlideFrame>],
  ['QuoteCard', <SlideFrame frame={F}><QuoteCard frame={F} quote="Price is what you pay. Value is what you get." who="Warren Buffett" cue={0} /></SlideFrame>],
  ['ChapterCard', <ChapterCard frame={F} n={1} title="How the price is worked out" />],
  ['KeywordSlam', <SlideFrame frame={F}><KeywordSlam frame={F} words={[{ text: 'BUYERS' }, { text: "DON'T.", tone: 'red' }]} cues={[0, 10]} /></SlideFrame>],
]
export const InfoSheet: React.FC = () => (
  <AbsoluteFill style={{ background: '#000' }}>
    <style>{fontFaces()}</style>
    {INFO_SAMPLES.map(([name, el], i) => (
      <div key={name} style={{ position: 'absolute', left: (i % 4) * 480, top: Math.floor(i / 4) * 360, width: 480, height: 360, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: 1920, height: 1080, transform: 'scale(0.25)', transformOrigin: '0 0' }}>{el}</div>
        <div style={{ position: 'absolute', top: 276, width: 480, textAlign: 'center', color: '#9AA6B4', font: '20px Inter' }}>{name}</div>
      </div>
    ))}
  </AbsoluteFill>
)

// # 6 sample thumbnails for the test story (3 dark, 3 bright) + the same at phone size
export const THUMB_SAMPLES: ThumbProps[] = [
  { layout: 'hero-left', words: 'WHO GETS THE $1M?', accent: [3], tone: 'green', character: { pose: 'think', expression: 'shocked' }, prop: 'cash-stack', scene: 'shop-street' },
  { layout: 'object-center', words: 'THE DEAL BURNS', accent: [2], tone: 'red', prop: 'fire' },
  { layout: 'split', words: 'NOT FOR PROFIT', accent: [2], tone: 'champagne', character: { pose: 'shrug', expression: 'worried' }, prop: 'shop-mini' },
  { layout: 'hero-left', words: "BUYERS DON'T PAY THIS", accent: [1], tone: 'red', character: { pose: 'point', expression: 'smug' }, prop: 'price-tag', bright: true },
  { layout: 'object-center', words: '$350K × 3 = ?', accent: [2], tone: 'champagne', prop: 'calculator', bright: true },
  { layout: 'split', words: 'SMALL SHOP. $1M EXIT', accent: [2, 3], tone: 'green', character: { pose: 'celebrate', expression: 'smiling' }, prop: 'money-bag', bright: true },
]
export const ThumbSheet: React.FC = () => (
  <AbsoluteFill style={{ background: '#111' }}>
    <style>{fontFaces()}</style>
    {THUMB_SAMPLES.map((t, i) => (
      <React.Fragment key={i}>
        <div style={{ position: 'absolute', left: (i % 3) * 640, top: Math.floor(i / 3) * 360, width: 640, height: 360, overflow: 'hidden' }}><Thumbnail {...t} width={640} /></div>
        <div style={{ position: 'absolute', left: 60 + i * 300, top: 860, width: 168, height: 94, overflow: 'hidden' }}><Thumbnail {...t} width={168} /></div>
      </React.Fragment>
    ))}
    <div style={{ position: 'absolute', left: 60, top: 790, color: '#9AA6B4', font: '24px Inter' }}>Phone size (168 × 94) — words must still read:</div>
  </AbsoluteFill>
)

// # HD cast in the owner's reference poses + HD expression strip
export const CastHD: React.FC = () => {
  const cast: [string, keyof typeof POSES, string][] = [['hero', 'pockets', 'neutral'], ['buyer', 'think', 'thinking'], ['investor', 'holdChest', 'neutral'], ['owner', 'present', 'neutral'], ['worker', 'armsCrossed', 'neutral']]
  return (
    <AbsoluteFill style={{ background: '#05070C' }}>
      <style>{fontFaces()}</style>
      <svg width={1920} height={1080} viewBox="0 0 1920 1080">
        {cast.map(([id, pose, ex], i) => (
          <g key={id}>
            <Actor who={id} pose={pose} expression={ex as never} x={200 + i * 380} y={1010} scale={1.45} breathe={false} />
            <text x={200 + i * 380} y={1062} textAnchor="middle" fill="#9AA6B4" style={{ font: '28px Inter' }}>{id}</text>
          </g>
        ))}
      </svg>
    </AbsoluteFill>
  )
}
export const ExpressionsHD: React.FC = () => (
  <AbsoluteFill style={{ background: '#05070C' }}>
    <style>{fontFaces()}</style>
    <svg width={1920} height={1080} viewBox="0 0 1920 1080">
      {EXPRESSIONS.map((e, i) => {
        const cx = (1920 / 7) * i + 1920 / 14
        return (
          <g key={e}>
            <text x={cx} y={250} textAnchor="middle" fill="#9AA6B4" style={{ font: '30px Inter' }}>{e}</text>
            <Actor who="hero" pose={e === 'thinking' ? 'think' : 'pockets'} expression={e} x={cx} y={1700} scale={2.2} breathe={false} />
          </g>
        )
      })}
    </svg>
  </AbsoluteFill>
)

export const SceneSheet4: React.FC = () => <SceneSheet page={3} />
export const SceneSheet5: React.FC = () => <SceneSheet page={4} />
export const SceneSheet6: React.FC = () => <SceneSheet page={5} />

// # One scene in its variants: times/weathers, colour moods, camera framings
export const VariantSheet: React.FC = () => {
  const sc = SCENES.find((x) => x.id === 'wall-street')!
  const C = sc.Component
  const cells: [string, Record<string, string>][] = [
    ['night', { time: 'night' }], ['dusk', { time: 'dusk' }], ['rain', { time: 'rain' }], ['fog', { time: 'fog' }],
    ['tone blue', { tone: 'blue' }], ['tone gold', { tone: 'gold' }], ['tone red', { tone: 'red' }], ['tone green', { tone: 'green' }],
    ['wide', { framing: 'wide' }], ['medium', { framing: 'medium' }], ['close', { framing: 'close' }], ['dusk + gold + close', { time: 'dusk', tone: 'gold', framing: 'close' }],
  ]
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <style>{fontFaces()}</style>
      {cells.map(([label, v], i) => (
        <div key={label} style={{ position: 'absolute', left: (i % 4) * 480, top: Math.floor(i / 4) * 360, width: 480, height: 360, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', width: 1920, height: 1080, transform: 'scale(0.25)', transformOrigin: '0 0' }}><C frame={30} {...(v as object)} /></div>
          <div style={{ position: 'absolute', top: 276, width: 480, textAlign: 'center', color: '#9AA6B4', font: '20px Inter' }}>{label}</div>
        </div>
      ))}
    </AbsoluteFill>
  )
}
