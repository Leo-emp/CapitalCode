// ============================================================
// FACES — minimal features on the dark head (Alux-style): light
// brows, eye glints behind the glasses, a mouth line. Readable at
// thumbnail size: expressions are carried mostly by brows + mouth.
// Head centre (0,-88), glasses at x −16 / 22, y −84.
// ============================================================

import React from 'react'
import type { Look } from './looks'
import type { ExpressionId } from './pose'

export const EXPRESSIONS: ExpressionId[] = ['neutral', 'thinking', 'shocked', 'worried', 'smiling', 'smug', 'angry']

const LIGHT = '#CFEFFF'

// # Brow: from (x1,y1) to (x2,y2), slightly arched by `arc`
const Brow: React.FC<{ x1: number; y1: number; x2: number; y2: number; arc?: number }> = ({ x1, y1, x2, y2, arc = -3 }) => (
  <path d={`M${x1} ${y1} Q${(x1 + x2) / 2} ${(y1 + y2) / 2 + arc} ${x2} ${y2}`} stroke={LIGHT} strokeWidth={5} strokeLinecap="round" fill="none" />
)
const Eye: React.FC<{ x: number; r?: number; happy?: boolean }> = ({ x, r = 3.5, happy }) =>
  happy
    ? <path d={`M${x - 6} -82 Q${x} -89 ${x + 6} -82`} stroke={LIGHT} strokeWidth={3} fill="none" strokeLinecap="round" />
    : <circle cx={x} cy={-84} r={r} fill={LIGHT} />

const mouth = (d: string, fill = 'none') => <path d={d} stroke={LIGHT} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" fill={fill} />

export const Face: React.FC<{ expression: ExpressionId; look: Look }> = ({ expression: e }) => {
  // # Left brow sits over the left lens (x −30..−4), right brow over the right lens (x 8..36)
  const parts: Record<ExpressionId, React.ReactNode> = {
    neutral: <>
      <Brow x1={-30} y1={-106} x2={-4} y2={-106} /><Brow x1={8} y1={-106} x2={36} y2={-106} />
      <Eye x={-16} /><Eye x={22} />{mouth('M-6 -50 L16 -50')}</>,
    thinking: <>
      <Brow x1={-30} y1={-104} x2={-4} y2={-104} arc={0} /><Brow x1={8} y1={-116} x2={36} y2={-112} arc={-5} />
      <Eye x={-14} /><Eye x={24} />{mouth('M-2 -50 Q8 -48 18 -53')}</>,
    shocked: <>
      <Brow x1={-30} y1={-118} x2={-4} y2={-120} arc={-7} /><Brow x1={8} y1={-120} x2={36} y2={-118} arc={-7} />
      <Eye x={-16} r={5.5} /><Eye x={22} r={5.5} />
      <ellipse cx={5} cy={-48} rx={10} ry={13} fill="#05080F" stroke={LIGHT} strokeWidth={4} /></>,
    worried: <>
      <Brow x1={-30} y1={-104} x2={-4} y2={-112} arc={1} /><Brow x1={8} y1={-112} x2={36} y2={-104} arc={1} />
      <Eye x={-16} /><Eye x={22} />{mouth('M-6 -48 Q0 -54 5 -50 Q10 -46 16 -52')}</>,
    smiling: <>
      <Brow x1={-30} y1={-108} x2={-4} y2={-110} arc={-4} /><Brow x1={8} y1={-110} x2={36} y2={-108} arc={-4} />
      <Eye x={-16} happy /><Eye x={22} happy />{mouth('M-8 -54 Q5 -40 18 -54', '#E6F4FF')}</>,
    smug: <>
      <Brow x1={-30} y1={-104} x2={-4} y2={-104} arc={0} /><Brow x1={8} y1={-112} x2={36} y2={-109} arc={-3} />
      <Eye x={-14} r={3} /><Eye x={24} r={3} />{mouth('M-4 -50 Q8 -50 18 -57')}</>,
    angry: <>
      <Brow x1={-30} y1={-112} x2={-4} y2={-102} arc={1} /><Brow x1={8} y1={-102} x2={36} y2={-112} arc={1} />
      <Eye x={-16} r={3} /><Eye x={22} r={3} />{mouth('M-6 -46 Q5 -54 16 -46')}</>,
  }
  return <g data-expression={e}>{parts[e]}</g>
}
