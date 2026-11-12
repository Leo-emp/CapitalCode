// ============================================================
// COVERS — Shorts: savings (0.38% ≈ $38 a year on $10,000 vs a
// bank's 3.9% at the Fed ≈ $390) and lottery (states keep ≈ 33¢
// of every dollar, Census FY2024).
// ============================================================
import React from 'react'
import { Burst, CoverCanvas, Glow, Ground, Sky } from './kit'
import { Hero, Part, Thing } from './cast'
import { Words } from './words'
import { makeCover } from './registry'

const GOLD = '#F2B632', INK = '#05070C'
const Coin: React.FC<{ x: number; y: number; r?: number }> = ({ x, y, r = 34 }) => (
  <g><circle cx={x} cy={y} r={r} fill={GOLD} stroke={INK} strokeWidth={r * 0.16} /><text x={x} y={y + r * 0.45} textAnchor="middle" fill="#8A5A00" style={{ font: `400 ${r * 1.3}px "Bebas Neue"` }}>$</text></g>
)

// # savings: a worried hero holds one coin; the bank sits on a mountain of coins
export const SAVINGS_1 = makeCover({
  id: 'savings-1', job: '20261103-0420_why-your-savings-account-pays-almost-nothing', canvas: 'tall',
  concept: 'You get one coin for your $10,000; the bank behind you sits on a pile ten times bigger.',
  Component: () => (
    <CoverCanvas canvas="tall">
      <Sky canvas="tall" top="#1A6B7C" bottom="#0B3640" />
      <Burst canvas="tall" cx={760} cy={900} color="#7FE3C4" opacity={0.14} />
      <Glow id="bank" x={760} y={950} r={460} color={GOLD} opacity={0.4} />
      <Ground canvas="tall" y={1360} color="#07262D" edge="#1A6B7C" />
      <Part name="pile" kind="scenery" x={540} y={1060} w={520} h={340}>
        {Array.from({ length: 22 }, (_, i) => <Coin key={i} x={580 + (i % 7) * 70 + ((i / 7) | 0) * 30} y={1350 - ((i / 7) | 0) * 62} r={40} />)}
      </Part>
      <Thing name="bank" prop="bank" x={790} y={880} size={430} shadow={false} />
      <Hero pose="holdUp" expression="worried" x={280} y={2070} scale={2.4}
        hold={(h) => <Part name="coin" kind="object" x={h.x - 20} y={h.y - 120} w={110} h={110} touches={['hero']}><Coin x={h.x + 35} y={h.y - 65} r={46} /></Part>} />
      <Words lines={[{ t: 'WHY YOUR SAVINGS', size: 120 }, { t: 'ACCOUNT PAYS', size: 135, color: GOLD }, { t: 'ALMOST NOTHING', size: 135, color: GOLD }]} x={540} y={150} rotate={-3} ring="#0B3640" />
    </CoverCanvas>
  ),
})

// # a lottery ticket (centre x, y)
const Ticket: React.FC<{ x: number; y: number; r?: number; s?: number }> = ({ x, y, r = 0, s = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} strokeLinejoin="round">
    <rect x={-170} y={-100} width={340} height={200} rx={16} fill={INK} opacity={0.25} transform="translate(10 12)" />
    <path d="M-170 -100 H170 V-30 A30 30 0 0 0 170 30 V100 H-170 V30 A30 30 0 0 0 -170 -30 Z" fill="#FFE27A" stroke={INK} strokeWidth={8} />
    <text x={0} y={-40} textAnchor="middle" fill="#C94A3E" style={{ font: '400 56px "Bebas Neue"', letterSpacing: 4 }}>LOTTO</text>
    {[0, 1, 2, 3, 4].map((k) => <g key={k}><circle cx={-120 + k * 60} cy={40} r={24} fill="#FFFFFF" stroke={INK} strokeWidth={5} /><text x={-120 + k * 60} y={52} textAnchor="middle" fill={INK} style={{ font: '400 32px "Bebas Neue"' }}>{[7, 13, 22, 41, 58][k]}</text></g>)}
  </g>
)

// # lottery: a hopeful hero holds up his ticket while the state walks off with the money bag
export const LOTTERY_1 = makeCover({
  id: 'lottery-1', job: '20261103-0716_the-lottery-keeps-33-cents-of-every-dollar', canvas: 'tall',
  concept: 'The hero dreams over his ticket; behind him the state quietly walks away with a bag of money.',
  Component: () => (
    <CoverCanvas canvas="tall">
      <Sky canvas="tall" top="#5B2A86" bottom="#1E0E36" />
      <Burst canvas="tall" cx={300} cy={980} color="#FFD978" opacity={0.18} />
      <Ground canvas="tall" y={1380} color="#140A26" edge="#7A4BB0" />
      <Hero name="state" who="buyer" main={false} pose="carry" expression="smug" x={790} y={1400} scale={1.15} flip
        hold={(h) => <Thing name="bag" prop="money-bag" x={h.x} y={h.y - 40} size={230} shadow={false} touches={['state']} />} />
      <Part name="sign" kind="extra" x={680} y={640} w={240} h={90}>
        <rect x={680} y={640} width={240} height={90} rx={14} fill="#F7FAFF" stroke={INK} strokeWidth={7} />
        <text x={800} y={704} textAnchor="middle" fill={INK} style={{ font: '400 64px "Bebas Neue"', letterSpacing: 3 }}>THE STATE</text>
      </Part>
      <Hero pose="holdUp" expression="smiling" x={290} y={2080} scale={2.35}
        hold={(h) => <Part name="ticket" kind="object" x={h.x - 60} y={h.y - 200} w={320} h={200} touches={['hero']}><Ticket x={h.x + 100} y={h.y - 100} r={-10} s={0.9} /></Part>} />
      <Words lines={[{ t: 'WHO REALLY WINS', size: 130 }, { t: 'THE LOTTERY?', size: 190, color: '#FFD978' }]} x={540} y={150} rotate={-3} ring="#2A1150" />
    </CoverCanvas>
  ),
})
