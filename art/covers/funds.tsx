// ============================================================
// COVERS — "Index Funds vs Mutual Funds vs ETFs vs Hedge Funds"
// Story: four fund types; broad index funds averaged about 0.09% a year in fees in 2025 vs 0.57% for active funds
// (Morningstar), and hedge funds often charge about 2% a year plus 20% of profits (SEC Investor.gov).
// Picture: a curious saver points at four labelled fund boxes on a shelf; the index fund box glows with a
// green 0.09% tag, the hedge fund box wears a red 2% + 20% tag.
// ============================================================
import React from 'react'
import { CoverCanvas, Burst, Ground, Glow, Sky } from './kit'
import { Hero, Part } from './cast'
import { Words } from './words'
import { makeCover } from './registry'
import { Tag } from './draw'

const JOB = '20261109-1811_index-funds-vs-mutual-funds-vs-etfs-vs-hedge-funds'
const INK = '#05070C', GOLD = '#F2B632'

// # a fund box: coloured crate with a ribbon and a label
const Box: React.FC<{ x: number; y: number; w: number; h: number; color: string; label: string; size?: number }> = ({ x, y, w, h, color, label, size = 50 }) => (
  <g strokeLinejoin="round">
    <rect x={x - w / 2} y={y - h} width={w} height={h} rx={18} fill={color} stroke={INK} strokeWidth={9} />
    <rect x={x - 16} y={y - h} width={32} height={h} fill={GOLD} stroke={INK} strokeWidth={5} />
    <rect x={x - w / 2 + 18} y={y - h * 0.62} width={w - 36} height={size + 26} rx={12} fill="#FFFFFF" stroke={INK} strokeWidth={6} />
    <text x={x} y={y - h * 0.62 + size + 6} textAnchor="middle" fill={INK} style={{ font: `400 ${size}px "Bebas Neue"` }}>{label}</text>
  </g>
)

// # 1 — which fund? four boxes, the cheap index fund glows
export const FUNDS_1 = makeCover({
  id: 'funds-1', job: JOB, canvas: 'wide',
  concept: 'Which of the four fund types should your money be in? A curious saver points at four labelled fund boxes; the index fund glows with a 0.09% fee tag (Morningstar 2025 average for broad index funds) and the hedge fund wears a 2% + 20% fee tag (typical hedge fund fees, SEC Investor.gov).',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <Sky canvas="wide" top="#6A4BD8" bottom="#2A1D7A" />
      <Burst canvas="wide" cx={1200} cy={700} color="#FFFFFF" opacity={0.16} rays={20} />
      <Glow id="index" x={1050} y={760} r={280} color="#3DDC97" opacity={0.55} />
      <Ground canvas="wide" y={990} color="#1B1250" edge="#9C86FF" />
      <Part name="boxes" kind="object" x={700} y={600} w={960} h={390}>
        <Box x={810} y={985} w={220} h={300} color="#2F8FE0" label="MUTUAL" />
        <Box x={1050} y={985} w={220} h={370} color="#1FAE6A" label="INDEX" size={58} />
        <Box x={1290} y={985} w={220} h={300} color="#9A5BE0" label="ETF" />
        <Box x={1530} y={985} w={220} h={300} color="#7A1E34" label="HEDGE" />
      </Part>
      <Part name="tags" kind="object" x={900} y={470} w={790} h={160} touches={['boxes']}>
        <Tag x={1050} y={545} text="0.09% FEE" r={-6} s={1.25} color="#B8F5D4" />
        <Tag x={1530} y={600} text="2% + 20%" r={6} s={1.15} color="#FFB3A8" />
      </Part>
      <Hero who="investor" pose="point" expression="thinking" x={330} y={1360} scale={1.85} />
      <Words lines={[{ t: 'WHICH FUND SHOULD', size: 108 }, { t: 'YOUR MONEY', size: 120, color: GOLD }, { t: 'ACTUALLY BE IN?', size: 108 }]} x={1300} y={56} rotate={-2} ring="#2A1D7A" />
    </CoverCanvas>
  ),
})
