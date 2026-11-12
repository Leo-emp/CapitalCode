// ============================================================
// COVERS — "4 Money Ideas That Decide If Time Works For You or Against You"
// Story: $100 kept since January 2000 buys about half as much today
// (CPI-U Sept 2026 / Jan 2000 = 1.986). Picture: a shocked saver holds a
// $100 bill whose right half is crumbling away, next to a huge hourglass.
// ============================================================
import React from 'react'
import { CoverCanvas, Burst, Ground, Glow, Sky } from './kit'
import { Hero, Part } from './cast'
import { Words } from './words'
import { makeCover } from './registry'

const JOB = '20261109-0850_4-money-ideas-that-decide-if-time-works-for-you-or-against-y'
const INK = '#05070C', GOLD = '#F2B632', PLUM = '#3A1D5C'

// # a big hourglass (centre x, y; ~420 × 760), gold sand mostly fallen
const Glass: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`} strokeLinejoin="round">
    <rect x={-210} y={-390} width={420} height={50} rx={18} fill="#8E5B3A" stroke={INK} strokeWidth={8} />
    <rect x={-210} y={340} width={420} height={50} rx={18} fill="#8E5B3A" stroke={INK} strokeWidth={8} />
    <path d="M-170 -340 L170 -340 Q170 -90 20 0 Q170 90 170 340 L-170 340 Q-170 90 -20 0 Q-170 -90 -170 -340 Z" fill="#EAF4FF" opacity={0.85} stroke={INK} strokeWidth={8} />
    <path d="M-70 -120 L70 -120 L0 -10 Z" fill={GOLD} stroke={INK} strokeWidth={4} />
    <path d="M-150 330 L150 330 L0 120 Z" fill={GOLD} stroke={INK} strokeWidth={5} />
    <line x1={0} y1={-10} x2={0} y2={150} stroke={GOLD} strokeWidth={8} />
    <path d="M-120 -300 Q-130 -150 -60 -60" stroke="#FFFFFF" strokeWidth={14} fill="none" opacity={0.7} strokeLinecap="round" />
  </g>
)
// # a $100 bill whose right half crumbles into flakes (centre x, y), tilted
const HalfBill: React.FC<{ x: number; y: number; r: number; s: number }> = ({ x, y, r, s }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} strokeLinejoin="round">
    <path d="M-170 -80 L10 -80 L30 -50 L5 -20 L35 10 L10 40 L28 80 L-170 80 Z" fill="#8FCB9F" stroke={INK} strokeWidth={8} />
    <ellipse cx={-70} cy={0} rx={46} ry={46} fill="#CDE9D3" stroke="#2F6E45" strokeWidth={5} />
    <text x={-70} y={18} textAnchor="middle" fill="#2F6E45" style={{ font: '400 56px "Bebas Neue"' }}>$</text>
    <text x={-150} y={-36} fill="#2F6E45" style={{ font: '400 40px "Bebas Neue"' }}>100</text>
    {[[60, -50, 18], [90, 10, 14], [120, -20, 11], [80, 60, 12], [140, 40, 9], [165, -45, 8]].map(([fx, fy, fr], k) => <rect key={k} x={fx - fr} y={fy - fr} width={fr * 2} height={fr * 2} rx={3} fill="#8FCB9F" stroke={INK} strokeWidth={4} transform={`rotate(${k * 23} ${fx} ${fy})`} />)}
  </g>
)

// # 1 — shocked saver, a crumbling $100 bill, a huge hourglass
export const MONEY4_1 = makeCover({
  id: 'money4-1', job: JOB, canvas: 'wide',
  concept: 'Why $100 now buys half: a shocked saver holds a $100 bill crumbling away while a huge hourglass runs out — time quietly took half its buying power.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <Sky canvas="wide" top="#8E5BD8" bottom="#4A2A8C" />
      <Burst canvas="wide" cx={1450} cy={560} color="#FFFFFF" opacity={0.16} rays={20} />
      <Glow id="glass" x={1450} y={600} r={420} color={GOLD} opacity={0.4} />
      <Ground canvas="wide" y={990} color="#2A1450" edge="#B48CF0" />
      <Part name="hourglass" kind="object" x={1240} y={300} w={420} h={680}><g transform="translate(1450 640) scale(0.85) translate(-1450 -640)"><Glass x={1450} y={640} /></g></Part>
      <Hero who="investorF" pose="holdUp" expression="shocked" x={440} y={1380} scale={2.05}
        hold={(h) => <Part name="bill" kind="object" x={h.x - 30} y={h.y - 200} w={380} h={220} touches={['hero']}><HalfBill x={h.x + 120} y={h.y - 90} r={-10} s={0.95} /></Part>} />
      <Words lines={[{ t: 'WHY $100 NOW', size: 100 }, { t: 'BUYS HALF', size: 136, color: GOLD }]} x={1320} y={56} rotate={-2} ring={PLUM} />
    </CoverCanvas>
  ),
})
