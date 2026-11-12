// ============================================================
// COVERS — "How Visa Makes $23 Billion a Year From Your Card"
// Story: every card payment drives through Visa's toll booth and
// drops a coin (≈ 15¢ per payment, FY2025: $40.0B ÷ 257.5B).
// ============================================================
import React from 'react'
import { CoverCanvas, Burst, Ground, Glow, Sky } from './kit'
import { Hero, Part, Thing } from './cast'
import { Words } from './words'
import { makeCover } from './registry'

const JOB = '20261103-0028_visa-never-lends-you-a-dollar-it-still-made-20-billion'
const NAVY = '#16294A', GOLD = '#F2B632', BLUE = '#2F5FD0', RED = '#D8432F'

// # a toll booth with a striped barrier and a sign on top (top-left x, y; 300 × 560)
const Booth: React.FC<{ x: number; y: number; sign: string }> = ({ x, y, sign }) => (
  <g transform={`translate(${x} ${y})`} strokeLinejoin="round">
    <rect x={20} y={110} width={260} height={450} rx={18} fill="#F7FAFF" stroke="#05070C" strokeWidth={8} />
    <rect x={55} y={170} width={190} height={150} rx={12} fill="#9ED8FF" stroke="#05070C" strokeWidth={7} />
    <path d="M70 185 L120 185 L80 300 L70 300 Z" fill="#FFFFFF" opacity={0.6} />
    <rect x={0} y={60} width={300} height={70} rx={14} fill={RED} stroke="#05070C" strokeWidth={8} />
    <rect x={30} y={0} width={240} height={80} rx={16} fill={BLUE} stroke="#05070C" strokeWidth={8} />
    <text x={150} y={62} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 64px "Bebas Neue"', letterSpacing: 4 }}>{sign}</text>
    <rect x={95} y={380} width={110} height={70} rx={10} fill={GOLD} stroke="#05070C" strokeWidth={7} />
    <rect x={120} y={402} width={60} height={12} rx={6} fill="#05070C" />
  </g>
)
// # a payment card (centre x, y), tilted
const Card: React.FC<{ x: number; y: number; r: number; s: number }> = ({ x, y, r, s }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x={-150} y={-95} width={300} height={190} rx={20} fill="#05070C" opacity={0.25} transform="translate(10 14)" />
    <rect x={-150} y={-95} width={300} height={190} rx={20} fill={BLUE} stroke="#05070C" strokeWidth={8} />
    <rect x={-115} y={-50} width={58} height={44} rx={8} fill={GOLD} stroke="#05070C" strokeWidth={4} />
    {[0, 1, 2, 3].map((k) => <rect key={k} x={-115 + k * 60} y={32} width={48} height={14} rx={7} fill="#FFFFFF" opacity={0.85} />)}
  </g>
)
// # a coin falling (scenery sparkle around the slot)
const Coin: React.FC<{ x: number; y: number; r?: number }> = ({ x, y, r = 34 }) => (
  <g><circle cx={x} cy={y} r={r} fill={GOLD} stroke="#05070C" strokeWidth={6} /><text x={x} y={y + r * 0.42} textAnchor="middle" fill="#8A5A00" style={{ font: `400 ${r * 1.25}px "Bebas Neue"` }}>¢</text></g>
)

// # 1 — shocked hero watches his card pay the Visa toll booth; coins pour out
export const VISA_1 = makeCover({
  id: 'visa-1', job: JOB, canvas: 'tall',
  concept: 'Your card drives through Visa\'s toll booth and every swipe drops a coin for Visa; the hero is shocked.',
  Component: () => (
    <CoverCanvas canvas="tall" emblem="tl">
      <Sky canvas="tall" top="#2B4A78" bottom="#0E1B33" />
      <Burst canvas="tall" cx={760} cy={1000} color={GOLD} opacity={0.16} rays={20} />
      <Glow id="booth" x={760} y={1020} r={420} color={GOLD} opacity={0.45} />
      <Ground canvas="tall" y={1330} color="#0B1426" edge="#3A5F93" />
      {/* # the road into the booth */}
      <path d="M0 1420 L1080 1420 L1080 1620 L0 1620 Z" fill="#1C2433" />
      {[0, 1, 2, 3, 4, 5].map((k) => <rect key={k} x={k * 200 - 20} y={1512} width={110} height={16} rx={8} fill={GOLD} opacity={0.8} />)}
      <Part name="booth" kind="object" x={640} y={700} w={300} h={560}><Booth x={640} y={700} sign="VISA" /></Part>
      <Part name="coins" kind="scenery" x={600} y={1150} w={400} h={300}>
        <Coin x={700} y={1300} /><Coin x={780} y={1330} r={30} /><Coin x={860} y={1295} /><Coin x={790} y={1210} r={28} /><Coin x={930} y={1360} r={26} /><Coin x={640} y={1370} r={26} />
      </Part>
      <Hero pose="holdUp" expression="shocked" x={300} y={2060} scale={2.5}
        hold={(h) => <Part name="card" kind="object" x={h.x - 30} y={h.y - 150} w={240} h={170} touches={['hero']}><Card x={h.x + 90} y={h.y - 70} r={-18} s={0.8} /></Part>} />
      <Words lines={[{ t: 'HOW VISA MAKES', size: 115 }, { t: 'BILLIONS', size: 165, color: GOLD }, { t: 'EVERY YEAR', size: 115 }]} x={540} y={80} rotate={-3} ring={NAVY} />
    </CoverCanvas>
  ),
})
