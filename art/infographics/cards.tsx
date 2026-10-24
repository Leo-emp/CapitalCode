// ============================================================
// CARDS & DIAGRAMS — flow diagram, timeline, comparison cards,
// map highlight, quote card, chapter card, key-word slam.
// ============================================================

import React from 'react'
import { AbsoluteFill, interpolate } from 'remotion'
import { Emblem } from '../logo/Emblem'
import { COLORS, fontFaces } from '../tokens'
import { slamSize } from './layout'
import { build, clamp, rise, TONE, type Tone } from './SlideFrame'

// ------------------------------------------------------------
// FLOW DIAGRAM — boxes left → right, arrows draw between them
// ------------------------------------------------------------
export const FlowDiagram: React.FC<{ frame: number; nodes: { title: string; sub?: string; tone?: Tone }[]; cues: number[]; y?: number }> = ({ frame, nodes, cues, y = 440 }) => {
  const n = nodes.length, gap = 110, w = (1620 - gap * (n - 1)) / n
  return (
    <div style={{ position: 'absolute', left: 150, top: y, display: 'flex', alignItems: 'center', gap }}>
      {nodes.map((nd, i) => {
        const g = build(frame, cues[Math.min(i, cues.length - 1)])
        return (
          <React.Fragment key={i}>
            <div style={{ width: w, padding: '30px 26px', border: `2px solid ${TONE[nd.tone ?? 'blue']}`, borderRadius: 8, background: 'rgba(42,168,242,0.06)', ...rise(g) }}>
              <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: 3, color: TONE[nd.tone ?? 'blue'] }}>{nd.title.toUpperCase()}</div>
              {nd.sub && <div style={{ fontSize: 22, color: COLORS.dim, marginTop: 10 }}>{nd.sub}</div>}
            </div>
            {i < n - 1 && (
              <svg width={gap} height={30} style={{ position: 'absolute', left: (w + gap) * i + w, top: '50%', marginTop: -15 }}>
                <line x1={10} y1={15} x2={10 + (gap - 30) * build(frame, cues[Math.min(i + 1, cues.length - 1)])} y2={15} stroke={COLORS.champagne} strokeWidth={3} />
                <path d={`M${gap - 26} 5 L${gap - 12} 15 L${gap - 26} 25`} fill="none" stroke={COLORS.champagne} strokeWidth={3} opacity={build(frame, cues[Math.min(i + 1, cues.length - 1)])} />
              </svg>
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

// ------------------------------------------------------------
// TIMELINE — a line with labelled points, each on its cue
// ------------------------------------------------------------
export const Timeline: React.FC<{ frame: number; points: { when: string; what: string; tone?: Tone }[]; cues: number[]; y?: number }> = ({ frame, points, cues, y = 560 }) => {
  const span = 1620, step = span / Math.max(1, points.length - 1)
  const line = interpolate(frame, [cues[0], cues[cues.length - 1] + 10], [0, 1], clamp)
  return (
    <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
      <line x1={150} x2={150 + span * line} y1={y} y2={y} stroke={COLORS.dim} strokeWidth={3} />
      {points.map((p, i) => {
        const g = build(frame, cues[Math.min(i, cues.length - 1)], false), x = 150 + step * i, col = TONE[p.tone ?? 'blue']
        return (
          <g key={i} opacity={Math.min(1, g * 2)}>
            <circle cx={x} cy={y} r={14 * Math.min(1.2, g)} fill={col} />
            <text x={x} y={y - 40} textAnchor={i === 0 ? 'start' : i === points.length - 1 ? 'end' : 'middle'} fill={COLORS.text} style={{ font: '700 34px Inter' }}>{p.when}</text>
            <text x={x} y={y + 60} textAnchor={i === 0 ? 'start' : i === points.length - 1 ? 'end' : 'middle'} fill={COLORS.dim} style={{ font: '24px Inter' }}>{p.what}</text>
          </g>
        )
      })}
    </svg>
  )
}

// ------------------------------------------------------------
// COMPARISON CARDS — 2–3 options side by side, winner glows
// ------------------------------------------------------------
export const CompareCards: React.FC<{ frame: number; cards: { title: string; value: string; lines: string[]; tone?: Tone; winner?: boolean }[]; cues: number[] }> = ({ frame, cards, cues }) => (
  <div style={{ position: 'absolute', left: 150, right: 150, top: 330, display: 'flex', gap: 40 }}>
    {cards.map((c, i) => {
      const g = build(frame, cues[Math.min(i, cues.length - 1)]), col = TONE[c.tone ?? 'blue']
      return (
        <div key={i} style={{ flex: 1, padding: '40px 36px', borderRadius: 10, border: `2px solid ${c.winner ? col : 'rgba(255,255,255,0.12)'}`,
          background: c.winner ? `${col}14` : 'rgba(255,255,255,0.03)', boxShadow: c.winner ? `0 0 50px ${col}33` : 'none', ...rise(g, 40) }}>
          <div style={{ fontSize: 26, letterSpacing: 4, color: COLORS.dim, fontWeight: 700 }}>{c.title.toUpperCase()}</div>
          <div style={{ fontSize: 84, fontWeight: 800, color: col, margin: '16px 0 22px' }}>{c.value}</div>
          {c.lines.map((l, k) => <div key={k} style={{ fontSize: 26, color: COLORS.text, marginTop: 10, opacity: 0.85 }}>• {l}</div>)}
        </div>
      )
    })}
  </div>
)

// ------------------------------------------------------------
// MAP HIGHLIGHT — dotted world (same mask as the map scene) with
// labelled pins popping on cues. x/y are 0..1 of the map box.
// ------------------------------------------------------------
const MASK = [
  '................................................', '......######...........######.##########........', '...############.......###...################....',
  '..############.......####..##################...', '....##########.......###..###################...', '.....########.........##.####################...',
  '......#######........######..###############....', '.......####..........#######..##########.##.....', '........###..........#######...#######...#......',
  '.........###..........######....####.....#......', '..........####........#####......##......##.....', '...........#####.......####.............####....',
  '...........######......###..............####....', '............#####......##................##.....', '............####........................#.......',
  '............###.................................', '............##..................................', '................................................',
]
export const MapHighlight: React.FC<{ frame: number; pins: { x: number; y: number; label: string; tone?: Tone; below?: boolean }[]; cues: number[] }> = ({ frame, pins, cues }) => {
  const X = 380, Y = 260, CW = 24, CH = 30
  return (
    <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
      {MASK.flatMap((row, r) => [...row].map((ch, c) => ch === '#' ? <circle key={`${c}-${r}`} cx={X + c * CW} cy={Y + r * CH} r={7} fill="#1E6FA8" opacity={0.45} /> : null))}
      {pins.map((p, i) => {
        const g = build(frame, cues[Math.min(i, cues.length - 1)], false), px = X + p.x * 48 * CW, py = Y + p.y * 18 * CH, col = TONE[p.tone ?? 'champagne']
        return (
          <g key={i} opacity={Math.min(1, g * 2)}>
            <circle cx={px} cy={py} r={26 * g} fill={col} opacity={0.25} /><circle cx={px} cy={py} r={10} fill={col} />
            <rect x={px + 22} y={py - 46 + (p.below ? 56 : 0)} width={p.label.length * 17 + 30} height={44} rx={6} fill="rgba(5,7,12,0.85)" stroke={col} strokeWidth={2} />
            <text x={px + 37} y={py - 16 + (p.below ? 56 : 0)} fill={COLORS.text} style={{ font: '700 26px Inter' }}>{p.label}</text>
          </g>
        )
      })}
    </svg>
  )
}

// ------------------------------------------------------------
// QUOTE CARD — a sourced quote with a big champagne quote mark
// ------------------------------------------------------------
export const QuoteCard: React.FC<{ frame: number; quote: string; who: string; cue: number }> = ({ frame, quote, who, cue }) => {
  const g = build(frame, cue)
  return (
    <div style={{ position: 'absolute', left: 260, right: 260, top: 300, ...rise(g, 30) }}>
      <div style={{ fontFamily: 'Georgia, serif', fontSize: 200, lineHeight: 0.6, color: COLORS.champagne }}>“</div>
      <div style={{ fontSize: 52, fontWeight: 600, lineHeight: 1.3, color: COLORS.text }}>{quote}</div>
      <div style={{ fontSize: 28, color: COLORS.dim, marginTop: 30 }}>— {who}</div>
    </div>
  )
}

// ------------------------------------------------------------
// CHAPTER CARD — "01  How the price is worked out"
// ------------------------------------------------------------
export const ChapterCard: React.FC<{ frame: number; n: number; title: string; cue?: number }> = ({ frame, n, title, cue = 0 }) => {
  const g = build(frame, cue)
  return (
    <AbsoluteFill style={{ background: '#060A11', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter' }}>
      <style>{fontFaces()}</style>
      <div style={{ display: 'flex', alignItems: 'center', gap: 60 }}>
        <div style={{ fontSize: 130, fontWeight: 800, color: COLORS.champagne, transform: `translateX(${(1 - g) * -40}px)`, opacity: g }}>{String(n).padStart(2, '0')}</div>
        <div style={{ fontSize: 50, fontWeight: 600, color: COLORS.text, clipPath: `inset(0 ${(1 - g) * 100}% 0 0)` }}>{title}</div>
      </div>
      <svg width={60} height={60} style={{ position: 'absolute', right: 70, bottom: 60, opacity: 0.7 }}><Emblem size={60} /></svg>
    </AbsoluteFill>
  )
}

// ------------------------------------------------------------
// KEY-WORD SLAM — big condensed words hitting on their cues,
// accent word in red/green/champagne, small shake on impact
// ------------------------------------------------------------
export const KeywordSlam: React.FC<{ frame: number; words: { text: string; tone?: Tone }[]; cues: number[]; size?: number }> = ({ frame, words, cues, size = 200 }) => {
  const last = cues[cues.length - 1]
  const fit = slamSize(words.map((w) => w.text), size)
  const shake = frame >= last ? Math.max(0, 1 - (frame - last) / 10) : 0
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 40, fontFamily: 'Bebas Neue',
      transform: `translate(${shake * 12 * Math.sin(frame * 2.9)}px, ${shake * 8 * Math.cos(frame * 3.1)}px)` }}>
      <style>{fontFaces()}</style>
      {words.map((w, i) => {
        const g = build(frame, cues[Math.min(i, cues.length - 1)], false)
        return <div key={i} style={{ fontSize: fit, color: TONE[w.tone ?? 'text'], transform: `scale(${2.2 - 1.2 * g})`, opacity: Math.min(1, g * 2),
          textShadow: w.tone && w.tone !== 'text' ? `0 0 40px ${TONE[w.tone]}88` : 'none' }}>{w.text}</div>
      })}
    </AbsoluteFill>
  )
}
