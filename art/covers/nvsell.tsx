// ============================================================
// COVERS — "Why the Stock Market Just Fell: Nvidia's 440 Billion Dollar Day"
// Story: on Nov 5, 2026 Nvidia fell 9.26% and lost more than $440 billion of market value in one day (CNBC; Yahoo
// Finance). Picture: a shocked investor holds up a phone gone red beside a giant glowing AI chip cracking in two,
// under a red night sky. No real person is shown.
// ============================================================
import React from 'react'
import { CoverCanvas, Burst, Ground, Glow, Sky } from './kit'
import { Hero, Part } from './cast'
import { Words } from './words'
import { makeCover } from './registry'

const JOB = '20261110-2137_why-the-stock-market-just-fell-nvidia-s-440-billion-dollar-d'
const INK = '#05070C', NEON = '#39F5A0', RED = '#FF4D5E'

// # the giant AI chip, split by a red crack (centre x, y)
const BigChip: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`} strokeLinejoin="round">
    {Array.from({ length: 10 }, (_, k) => <rect key={k} x={-300 + k * 64} y={190} width={26} height={60} rx={6} fill="#E0B23A" stroke={INK} strokeWidth={5} />)}
    <g transform="translate(-18 8) rotate(-5)"><path d="M-330 -200 L0 -200 L-40 -60 L30 40 L-20 210 L-330 210 Z" fill="#26344E" stroke={INK} strokeWidth={10} /></g>
    <g transform="translate(18 8) rotate(5)"><path d="M330 -200 L0 -200 L-40 -60 L30 40 L-20 210 L330 210 Z" fill="#26344E" stroke={INK} strokeWidth={10} /></g>
    {[-120, -40, 40, 120].map((yy, k) => <path key={k} d={`M-280 ${yy} L-120 ${yy} L-90 ${yy - 30} L90 ${yy - 30} L120 ${yy} L280 ${yy}`} fill="none" stroke={NEON} strokeWidth={8} opacity={0.85} />)}
    <rect x={-120} y={-70} width={240} height={130} rx={16} fill="#0B1220" stroke={NEON} strokeWidth={8} />
    <path d="M0 -200 L-40 -60 L30 40 L-20 210" fill="none" stroke={RED} strokeWidth={16} />
  </g>
)
// # a phone gone red, held up
const RedPhone: React.FC<{ x: number; y: number; r?: number }> = ({ x, y, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r})`}>
    <rect x={-90} y={-170} width={180} height={340} rx={28} fill="#0B0A18" stroke={INK} strokeWidth={8} />
    <rect x={-74} y={-150} width={148} height={300} rx={18} fill="#2A0A16" />
    <path d="M-60 -100 C -20 -110 10 -40 60 60" fill="none" stroke={RED} strokeWidth={12} strokeLinecap="round" />
    <path d="M40 60 L62 64 L58 40" fill="none" stroke={RED} strokeWidth={12} strokeLinecap="round" />
  </g>
)

// # 1 — shocked investor, phone red, the chip cracks
export const NVSELL_1 = makeCover({
  id: 'nvsell-1', job: JOB, canvas: 'wide',
  concept: 'Nvidia lost more than $440 billion of market value on Nov 5, 2026 (stock -9.26%): a shocked investor holds up a phone gone red beside a giant glowing AI chip cracking in two under a red night sky.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <Sky canvas="wide" top="#2A0A2E" bottom="#0A0820" />
      <Burst canvas="wide" cx={1260} cy={700} color={RED} opacity={0.18} rays={22} />
      <Glow id="chip" x={1260} y={720} r={430} color={NEON} opacity={0.35} />
      <Ground canvas="wide" y={1000} color="#0E0A22" edge={RED} />
      <Part name="chip" kind="object" x={900} y={480} w={720} h={500}><g transform="translate(1260 740) scale(1.0) translate(-1260 -740)"><BigChip x={1260} y={740} /></g></Part>
      <Part name="phone" kind="object" x={560} y={430} w={210} h={360} touches={['hero']}><RedPhone x={665} y={610} r={10} /></Part>
      <Hero who="investorF" pose="shock" expression="shocked" x={330} y={1370} scale={1.85} />
      <Words lines={[{ t: 'WHY NVIDIA LOST', size: 112 }, { t: '$440 BILLION', size: 140, color: RED }, { t: 'IN ONE DAY', size: 112 }]} x={1290} y={56} rotate={-2} ring="#2A0A2E" />
    </CoverCanvas>
  ),
})
