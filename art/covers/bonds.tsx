// ============================================================
// COVERS — "How Bonds Actually Work"
// Drawn with this video's own art (art/diorama/bonds/kit.tsx, "THE ENGRAVED LOAN"): the seesaw, the engraved
// certificate, the bank that closed. Words = one full, true sentence (owner rule 2026-11-10).
// ============================================================
import React from 'react'
import { CoverCanvas, Burst } from './kit'
import { Hero, Part } from './cast'
import { Words } from './words'
import { makeCover } from './registry'
import { B, BDefs, Bank, Certificate, Parchment, PriceTag, Seesaw, Skyline } from '../diorama/bonds/kit'
import { Safe } from '../diorama/bonds/hook'

const JOB = '20261112-0127_how-bonds-actually-work'
const INK = '#1F3A33', GOLD = '#E9C25A', CORAL = '#E58B6B'

// # 1 — the seesaw: RATES up, Nina's bond end down, its price tag dropping; Nina shocked
export const BD_C1 = makeCover({
  id: 'bonds-1', job: JOB, canvas: 'wide',
  concept: 'The seesaw: a big brass seesaw with RATES rising on one end and Nina’s engraved $1,000 bond sinking on the other, its price tag dropped to $930; Nina shocked on the left.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <BDefs /><Parchment />
      <Burst canvas="wide" cx={1250} cy={720} color="#F1D891" opacity={0.22} rays={18} />
      <Part name="seesaw" kind="object" x={760} y={470} w={1080} h={480}>
        <Seesaw x={1300} y={950} w={1000} tilt={16}
          left={<g><rect x={-130} y={-130} width={260} height={130} rx={16} fill={B.ox} /><text y={-46} textAnchor="middle" fill="#fff" style={{ font: '400 70px "Bebas Neue"' }}>RATES ↑</text></g>}
          right={<g><Certificate x={0} y={-130} s={0.46} n={0} /><PriceTag x={0} y={-10} text="$930" color={B.oxL} s={0.9} /></g>} />
      </Part>
      <Hero who="investorF" pose="shock" expression="shocked" x={400} y={1330} scale={1.85} />
      <Words lines={[{ t: 'WHY BOND PRICES', size: 118 }, { t: 'FALL WHEN', size: 118 }, { t: 'RATES RISE', size: 150, color: CORAL }]} x={1380} y={56} rotate={-2} ring={INK} />
    </CoverCanvas>
  ),
})

// # 2 — the "safe" safe: a brass safe of bonds with a crack, hero worried
export const BD_C2 = makeCover({
  id: 'bonds-2', job: JOB, canvas: 'wide',
  concept: 'The safe part that cracked: a brass safe stacked with bond certificates, a crack running down its door, a red −17.8% tag; the hero worried beside it.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <BDefs /><Skyline night />
      <Burst canvas="wide" cx={1180} cy={700} color="#F1D891" opacity={0.18} rays={18} />
      <Part name="safe" kind="object" x={900} y={420} w={560} h={510}>
        <Safe x={1180} y={930} o={1} door={0.85} />
        <path d="M1150 430 L1120 560 L1180 660 L1130 800 L1170 920" stroke={B.navyD} strokeWidth={12} fill="none" strokeLinejoin="round" />
      </Part>
      <Part name="tag" kind="object" x={1480} y={700} w={330} h={120}>
        <g transform="translate(1645 760) rotate(-6)"><rect x={-190} y={-58} width={380} height={116} rx={18} fill={B.ox} /><text y={36} textAnchor="middle" fill="#fff" style={{ font: '400 104px "Bebas Neue"' }}>−17.8%</text></g>
      </Part>
      <Hero pose="despair" expression="worried" x={400} y={1330} scale={1.85} />
      <Words lines={[{ t: 'HOW THE SAFEST BONDS', size: 100 }, { t: 'LOST ALMOST 18%', size: 118 }, { t: 'IN ONE YEAR', size: 150, color: GOLD }]} x={1380} y={56} rotate={-2} ring={INK} />
    </CoverCanvas>
  ),
})

// # 3 — the bank: Silicon Valley Bank closed, bonds stacked beside it, a red loss slab breaking off
export const BD_C3 = makeCover({
  id: 'bonds-3', job: JOB, canvas: 'wide',
  concept: 'The bank that bonds brought down: a night bank with boards and a CLOSED sign, its stack of bond papers beside it with a red LOSS slab breaking off; a shocked saver on the left.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <BDefs /><Skyline night />
      <Burst canvas="wide" cx={1200} cy={720} color="#E58B6B" opacity={0.16} rays={18} />
      <Part name="bank" kind="object" x={860} y={480} w={620} h={460}>
        <Bank x={1170} y={930} s={0.95} night sign="SVB" closed={1} />
      </Part>
      <Part name="bonds" kind="object" x={1500} y={560} w={330} h={380}>
        {Array.from({ length: 6 }, (_, k) => <rect key={k} x={1510 + (k % 2) * 10} y={890 - k * 56} width={300} height={46} rx={6} fill="url(#bd-cert)" stroke={B.green} strokeWidth={3} />)}
        <g transform="translate(1690 590) rotate(14)"><rect x={-150} y={-30} width={300} height={60} rx={8} fill={B.ox} /><text y={16} textAnchor="middle" fill="#fff" style={{ font: '400 46px "Bebas Neue"' }}>LOSS</text></g>
      </Part>
      <Hero who="investor" pose="shock" expression="shocked" x={400} y={1330} scale={1.85} />
      <Words lines={[{ t: 'HOW SAFE BONDS', size: 118 }, { t: 'HELPED BRING DOWN', size: 108 }, { t: 'A BIG BANK', size: 150, color: CORAL }]} x={1380} y={56} rotate={-2} ring={INK} />
    </CoverCanvas>
  ),
})

export const BONDS_COVERS = [BD_C1, BD_C2, BD_C3]
