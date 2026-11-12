// ============================================================
// COVERS — "$100 in 1928: Why Investing Beats Saving Over Time"
// Story: $100 in the S&P 500 (dividends reinvested) from 1928 to 2025
// became about $1.16 million; in Treasury bills, about $2,600
// (Damodaran, NYU). Picture: an amazed saver beside a tiny coin stack
// and a towering gold mountain.
// ============================================================
import React from 'react'
import { CoverCanvas, Burst, Ground, Glow, Sky } from './kit'
import { Hero, Part } from './cast'
import { Words } from './words'
import { makeCover } from './registry'

const JOB = '20261109-1252_100-dollars-in-1928-why-investing-beats-saving-over-time'
const INK = '#05070C', GOLD = '#F2B632', GOLDD = '#B88A2E', GREEN = '#0F5132'

// # a tall gold mountain of coins (base centre x, y)
const GoldPeak: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`} strokeLinejoin="round">
    <path d="M-330 0 Q-170 -300 0 -600 Q170 -300 330 0 Z" fill={GOLD} stroke={INK} strokeWidth={10} />
    {[[-150, -80], [-60, -150], [40, -90], [130, -60], [-20, -260], [60, -330], [-90, -330], [10, -450]].map(([cx, cy], k) => <ellipse key={k} cx={cx} cy={cy} rx={36} ry={14} fill={GOLDD} opacity={0.6} />)}
    <path d="M-60 -560 L0 -600 L40 -540" stroke="#FFFFFF" strokeWidth={14} fill="none" opacity={0.7} strokeLinecap="round" />
  </g>
)
// # a tiny stack of coins (base centre x, y)
const TinyStack: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}>{[0, 1, 2].map((k) => <ellipse key={k} cx={0} cy={-k * 18} rx={46} ry={16} fill={GOLD} stroke={INK} strokeWidth={6} />)}</g>
)

// # 1 — amazed saver, a tiny stack vs a gold mountain
export const INVEST_1 = makeCover({
  id: 'invest-1', job: JOB, canvas: 'wide',
  concept: '$100 in 1928 became about $1.16 million in US stocks (dividends reinvested) vs about $2,600 in Treasury bills: an amazed saver stands between a tiny coin stack and a towering gold mountain.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <Sky canvas="wide" top="#2FBF8A" bottom="#0F6B4A" />
      <Burst canvas="wide" cx={1310} cy={520} color="#FFFFFF" opacity={0.18} rays={20} />
      <Glow id="peak" x={1310} y={620} r={460} color={GOLD} opacity={0.45} />
      <Ground canvas="wide" y={990} color={GREEN} edge="#7FE0B4" />
      <Part name="mountain" kind="object" x={1000} y={380} w={620} h={560}><g transform="translate(1310 940) scale(0.93) translate(-1310 -940)"><GoldPeak x={1310} y={940} /></g></Part>
      <Part name="stack" kind="object" x={780} y={920} w={100} h={70}><TinyStack x={830} y={985} /></Part>
      <Hero who="investorF" pose="shock" expression="shocked" x={420} y={1380} scale={2.05} />
      <Words lines={[{ t: '$100 IN 1928', size: 104 }, { t: '= $1.16 MILLION', size: 132, color: GOLD }]} x={1290} y={56} rotate={-2} ring={GREEN} />
    </CoverCanvas>
  ),
})
