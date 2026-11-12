// ============================================================
// COVERS — "How the Federal Reserve Actually Works"
// Drawn with this video's own art (art/diorama/fed/kit.tsx, "THE ENGINE ROOM"): the committee table and vote board,
// the floor-and-ceiling gauge, the printing press. Words = one full, true sentence (owner rule 2026-11-10).
// ============================================================
import React from 'react'
import { CoverCanvas, Burst } from './kit'
import { Hero, Part } from './cast'
import { Words } from './words'
import { makeCover } from './registry'
import { CreditCard, Engine, F, FDefs, Hall, Seat, Tag } from '../diorama/fed/kit'
import { Press } from '../diorama/fed/hook'

const JOB = '20261112-0358_how-the-federal-reserve-actually-works'
const INK = '#24324A', GOLD = '#E8BE4F', CORAL = '#E0644F'

// # 1 — twelve seats, a 12–0 vote board, a credit card; Sam shocked
export const FED_C1 = makeCover({
  id: 'fed-1', job: JOB, canvas: 'wide',
  concept: 'Twelve people, your card: the committee’s vote board lit 12 of 12 green above a credit card tagged +0.25%; Sam shocked on the left.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <FDefs /><Hall />
      <Burst canvas="wide" cx={1250} cy={700} color="#EDBB8E" opacity={0.22} rays={18} />
      <Part name="board" kind="object" x={860} y={470} w={760} h={300}>
        <rect x={860} y={470} width={760} height={300} rx={24} fill={F.slate} />
        {Array.from({ length: 12 }, (_, k) => <circle key={k} cx={940 + (k % 6) * 120} cy={560 + Math.floor(k / 6) * 120} r={40} fill={F.green} stroke="#0F1828" strokeWidth={5} />)}
      </Part>
      <Part name="card" kind="object" x={1200} y={790} w={420} h={260}>
        <CreditCard x={1410} y={920} s={0.95} r={-6} text="+0.25%" />
      </Part>
      <Hero who="investor" pose="shock" expression="shocked" x={400} y={1330} scale={1.85} />
      <Words lines={[{ t: 'HOW 12 PEOPLE SET', size: 112 }, { t: 'THE RATE ON YOUR', size: 112 }, { t: 'CREDIT CARD', size: 150, color: CORAL }]} x={1380} y={56} rotate={-2} ring={INK} />
    </CoverCanvas>
  ),
})

// # 2 — the floor-and-ceiling gauge in the engine room; hero points at it
export const FED_C2 = makeCover({
  id: 'fed-2', job: JOB, canvas: 'wide',
  concept: 'The hidden lever: a tall glass gauge in the slate engine room with a copper floor and ceiling and the rate ball between them, both plates lifting with arrows; the hero points at it.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <FDefs /><Engine />
      <Burst canvas="wide" cx={1200} cy={700} color="#8FD3DA" opacity={0.16} rays={18} />
      <Part name="gauge" kind="object" x={1000} y={430} w={420} h={600}>
        <rect x={1000} y={430} width={420} height={600} rx={30} fill="#E8F3F3" />
        <rect x={1030} y={650} width={360} height={160} fill={F.tealL} />
        <rect x={1020} y={640} width={380} height={20} rx={8} fill={F.copperD} />
        <rect x={1020} y={800} width={380} height={20} rx={8} fill={F.copper} />
        <circle cx={1210} cy={730} r={32} fill={F.coral} stroke="#fff" strokeWidth={5} />
        <path d="M1460 820 L1460 640 M1430 670 L1460 630 L1490 670" stroke={GOLD} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </Part>
      <Hero pose="point" expression="smiling" x={400} y={1330} scale={1.85} />
      <Words lines={[{ t: 'HOW THE FED', size: 120 }, { t: 'ACTUALLY MOVES', size: 118 }, { t: 'INTEREST RATES', size: 140, color: GOLD }]} x={1380} y={56} rotate={-2} ring={INK} />
    </CoverCanvas>
  ),
})

// # 3 — the printing press with a HALF TRUE badge; hero thinking
export const FED_C3 = makeCover({
  id: 'fed-3', job: JOB, canvas: 'wide',
  concept: 'Does it print money: a big copper printing press pushing out a green bill, a half-filled badge reading HALF TRUE; the hero scratching his head.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <FDefs /><Hall />
      <Burst canvas="wide" cx={1180} cy={720} color="#CDEBD9" opacity={0.25} rays={18} />
      <Part name="press" kind="object" x={880} y={560} w={600} h={380}>
        <Press x={1180} y={930} s={1.4} run={0.15} />
      </Part>
      <Part name="badge" kind="object" x={1500} y={560} w={300} h={300}>
        <g transform="translate(1650 710)"><circle r={140} fill={F.marbleL} stroke={F.ink} strokeWidth={8} /><path d="M0 -140 A140 140 0 0 1 0 140 Z" fill={F.teal} /><text y={-10} textAnchor="middle" fill={F.ink} style={{ font: '400 66px "Bebas Neue"' }}>HALF</text><text y={60} textAnchor="middle" fill={F.ink} style={{ font: '400 66px "Bebas Neue"' }}>TRUE</text></g>
      </Part>
      <Hero pose="scratchHead" expression="thinking" x={400} y={1330} scale={1.85} />
      <Words lines={[{ t: 'DOES THE FED', size: 120 }, { t: 'REALLY JUST', size: 120 }, { t: 'PRINT MONEY?', size: 150, color: CORAL }]} x={1380} y={56} rotate={-2} ring={INK} />
    </CoverCanvas>
  ),
})

export const FED_COVERS = [FED_C1, FED_C2, FED_C3]
void Seat; void Tag
