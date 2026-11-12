// ============================================================
// COVERS — long videos (1920×1080): airlines & card miles, buy now
// pay later, America's 1835 debt payoff, shrinkflation.
// v2 (2026-11-10): full-sentence words; the scene shows the story.
// ============================================================
import React from 'react'
import { Burst, CoverCanvas, Glow, Ground, Sky } from './kit'
import { Hero, Part, Thing } from './cast'
import { Arrow, Words } from './words'
import { makeCover } from './registry'
import { Card, GOLD, INK, Paper, Pile, RED, Tag } from './draw'

const wide = (id: string, job: string, concept: string, C: React.FC) => makeCover({ id, job, canvas: 'wide', concept, Component: C })

// # a chip bag (centre x, y; base size 300 × 420)
const Chips: React.FC<{ x: number; y: number; s: number; label: string }> = ({ x, y, s, label }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} strokeLinejoin="round">
    <path d="M-150 -210 L150 -210 L135 -180 L150 180 L135 210 L-135 210 L-150 180 L-135 -180 Z" fill={RED} stroke={INK} strokeWidth={8} />
    <path d="M-150 -210 L150 -210 L135 -180 L-135 -180 Z" fill="#B0301F" />
    <ellipse cx={0} cy={10} rx={100} ry={80} fill={GOLD} stroke={INK} strokeWidth={6} />
    <text x={0} y={30} textAnchor="middle" fill={INK} style={{ font: '400 64px "Bebas Neue"', letterSpacing: 3 }}>CHIPS</text>
    <rect x={-70} y={120} width={140} height={56} rx={10} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
    <text x={0} y={162} textAnchor="middle" fill={INK} style={{ font: '400 44px "Bebas Neue"' }}>{label}</text>
  </g>
)

export const AIRLINES_1 = wide('airlines-1', '20261028-0543_airlines-are-secretly-credit-card-companies',
  'A bank pours money into the airline for miles on its credit card; the hero points at the card, shocked — the card, not the flights, is the money.', () => (
  <CoverCanvas canvas="wide">
    <Sky canvas="wide" top="#5BCBFF" bottom="#2A8FD0" />
    <Burst canvas="wide" cx={1150} cy={680} color="#FFFFFF" opacity={0.2} />
    <Thing name="plane" prop="airplane" x={1120} y={640} size={520} />
    <Part name="card" kind="object" x={940} y={740} w={330} h={220} touches={['plane']}><Card x={1105} y={850} r={-10} s={1.05} color={RED} text="MILES" /></Part>
    <Thing name="bank" prop="bank" x={1520} y={790} size={300} kind="extra" />
    <Part name="cash" kind="extra" x={1330} y={890} w={240} h={90} touches={['bank']}><Pile x={1450} y={950} w={220} r={28} /></Part>
    <Hero pose="point" expression="shocked" x={300} y={1310} scale={1.85} />
    <Words lines={[{ t: 'HOW AIRLINES', size: 120 }, { t: 'REALLY MAKE', size: 130, color: GOLD }, { t: 'THEIR MONEY', size: 130, color: GOLD }]} x={1380} y={64} rotate={-3} ring="#16294A" />
  </CoverCanvas>
))

export const BNPL_1 = wide('bnpl-1', '20261029-0149_the-business-behind-buy-now-pay-later',
  'A thinking shopper holds his bag; behind him the store hands a fee to the pay-later company, which counts the money.', () => (
  <CoverCanvas canvas="wide">
    <Sky canvas="wide" top="#7C5CFF" bottom="#3B2A9E" />
    <Burst canvas="wide" cx={1100} cy={700} color="#FFFFFF" opacity={0.16} />
    <Ground canvas="wide" y={960} color="#2A1D73" />
    <Thing name="store" prop="shop-mini" x={1000} y={720} size={440} />
    <Part name="fee" kind="object" x={880} y={470} w={280} h={150} touches={['store']}><Tag x={1020} y={545} text="FEE" s={0.95} r={-8} color="#FFE27A" /></Part>
    <Hero name="lender" who="investor" main={false} pose="carry" expression="smug" x={1520} y={1010} scale={1.0} flip
      hold={(h) => <Thing name="bag" prop="money-bag" x={h.x} y={h.y - 30} size={200} shadow={false} kind="extra" touches={['lender']} />} />
    <Hero pose="holdUp" expression="thinking" x={330} y={1310} scale={1.85}
      hold={(h) => <Thing name="shopping" prop="shopping-bag" x={h.x + 60} y={h.y - 90} size={260} shadow={false} touches={['hero']} />} />
    <Words lines={[{ t: 'WHO PAYS WHEN YOU', size: 110 }, { t: 'BUY NOW,', size: 130, color: GOLD }, { t: 'PAY LATER?', size: 130, color: GOLD }]} x={1380} y={64} rotate={-3} ring="#1E1460" />
  </CoverCanvas>
))

export const DEBT1835_1 = wide('debt1835-1', '20261103-0236_america-once-paid-off-all-its-debt-here-s-what-happened-next',
  'The hero proudly holds the 1835 ledger stamped PAID, but behind him the banks are cracking — what happened next was a crash.', () => (
  <CoverCanvas canvas="wide">
    <Sky canvas="wide" top="#2B4A78" bottom="#0E1B33" />
    <Glow id="bank" x={1250} y={700} r={420} color={RED} opacity={0.3} />
    <Ground canvas="wide" y={960} color="#0B1426" />
    <Thing name="bank" prop="bank" x={1250} y={710} size={500} />
    <Thing name="cracks" prop="cracks" x={1250} y={700} size={340} kind="extra" shadow={false} touches={['bank']} />
    <Thing name="alarm" prop="exclamation" x={1560} y={600} size={200} kind="extra" shadow={false} />
    <Hero pose="holdUp" expression="worried" x={330} y={1310} scale={1.85}
      hold={(h) => <Part name="ledger" kind="object" x={h.x - 30} y={h.y - 250} w={280} h={340} touches={['hero']}><Paper x={h.x + 100} y={h.y - 85} title="US DEBT" stamp="PAID" s={0.85} /></Part>} />
    <Words lines={[{ t: 'WHAT HAPPENED WHEN', size: 110 }, { t: 'AMERICA PAID OFF', size: 125, color: GOLD }, { t: 'ALL ITS DEBT', size: 125, color: GOLD }]} x={1300} y={64} rotate={-3} ring="#0B1426" />
  </CoverCanvas>
))

export const SHRINK_1 = wide('shrink-1', '20261103-0455_your-snacks-are-shrinking-here-s-what-it-really-costs-you',
  'An angry hero points at the shrunken chip bag beside the big old one — both with the same $4.99 price.', () => (
  <CoverCanvas canvas="wide">
    <Sky canvas="wide" top="#FFE27A" bottom="#F2B632" />
    <Burst canvas="wide" cx={1150} cy={700} color="#FFFFFF" opacity={0.3} />
    <Part name="old-bag" kind="object" x={880} y={470} w={280} h={400}><Chips x={1020} y={670} s={0.95} label="$4.99" /></Part>
    <Arrow name="shrinks" from={[1180, 640]} to={[1330, 760]} bend={-0.25} color={RED} />
    <Part name="new-bag" kind="object" x={1360} y={690} w={170} h={240}><Chips x={1445} y={810} s={0.56} label="$4.99" /></Part>
    <Hero pose="point" expression="angry" x={300} y={1310} scale={1.85} />
    <Words lines={[{ t: 'WHY YOUR SNACKS', size: 120 }, { t: 'KEEP GETTING', size: 130, color: RED }, { t: 'SMALLER', size: 150, color: RED }]} x={1380} y={50} rotate={-3} ring="#7A2E00" />
  </CoverCanvas>
))
