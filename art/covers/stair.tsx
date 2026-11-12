// ============================================================
// COVERS — "How to Turn Saving Into Investing, Step by Step"
// Drawn with this video's own art (art/diorama/stair/kit.tsx): the terraced hill, money as water,
// the savings jar, the leaking 22% bucket, the fruit tree. Words = one full, true sentence (owner 2026-11-10).
// ============================================================
import React from 'react'
import { CoverCanvas, Burst, Glow, Ground, Sky } from './kit'
import { Hero, Part } from './cast'
import { Words } from './words'
import { makeCover } from './registry'
import { Bucket, C, Coin, Tank, Terrace, Tree } from '../diorama/stair/kit'

const JOB = '20261110-2217_how-to-turn-saving-into-investing-step-by-step'
const INK = '#16294A', GOLD = '#F2C14E'

// # 1 — Maya points up a five-step terraced hill: a savings jar at the bottom, a fruit tree at the top
export const STAIR_1 = makeCover({
  id: 'stair-1', job: JOB, canvas: 'wide',
  concept: 'The path itself: five glowing stone terraces climb from a small savings jar to a big fruit tree; Maya, smiling, points up the steps.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <Sky canvas="wide" top="#F6B98E" bottom="#FBE6CF" />
      <Burst canvas="wide" cx={1560} cy={380} color="#FFFFFF" opacity={0.22} rays={20} />
      <Glow id="sun" x={1560} y={380} r={300} color="#FFE3A8" opacity={0.7} />
      <Ground canvas="wide" y={1000} color="#5E8F6E" edge="#8DB596" />
      <Part name="stairs" kind="object" x={860} y={420} w={830} h={560}>
        {[0, 1, 2, 3, 4].map((k) => <Terrace key={k} x={860 + k * 160} y={900 - k * 95} w={830 - k * 160} h={110} lit={0.85} n={String(k + 1)} />)}
        <Tank x={960} y={900} w={180} h={170} f={0} fill={0.55} label="SAVINGS" />
        <Tree x={1600} y={520} s={0.62} fruit={1} />
      </Part>
      <Hero who="investorF" pose="pointUp" expression="smiling" x={420} y={1330} scale={1.85} />
      <Words lines={[{ t: 'HOW TO TURN', size: 108 }, { t: 'SAVINGS INTO', size: 108 }, { t: 'INVESTING', size: 140, color: GOLD }]} x={1380} y={56} rotate={-2} ring={INK} />
    </CoverCanvas>
  ),
})

// # 2 — the 30-year surprise: a small cash jar ($184K) vs a huge fruit tree ($900K) from the same $375 a month
export const STAIR_2 = makeCover({
  id: 'stair-2', job: JOB, canvas: 'wide',
  concept: 'Same money, two endings: a small cash jar tagged $184K beside a giant gold-fruit tree tagged $900K; Maya, shocked, looks up at the tree.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <Sky canvas="wide" top="#7FC7E8" bottom="#E4F4EE" />
      <Burst canvas="wide" cx={1380} cy={560} color="#FFFFFF" opacity={0.2} rays={22} />
      <Glow id="tree" x={1380} y={560} r={420} color={GOLD} opacity={0.4} />
      <Ground canvas="wide" y={1000} color="#5E8F6E" edge="#8DB596" />
      <Part name="jar" kind="object" x={860} y={720} w={240} h={290}><Tank x={980} y={1000} w={200} h={250} f={0} fill={0.35} label="$184K" /></Part>
      <Part name="tree" kind="object" x={1180} y={490} w={440} h={520}><Tree x={1400} y={1000} s={2.6} fruit={1} />
        <g transform="translate(1400 600)"><rect x={-150} y={-56} width={300} height={100} rx={20} fill={C.greenD} /><text y={28} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 86px "Bebas Neue"' }}>$900K</text></g></Part>
      <Hero who="investorF" pose="shock" expression="shocked" x={420} y={1330} scale={1.85} />
      <Words lines={[{ t: 'HOW $375 A MONTH', size: 104 }, { t: 'GREW TO', size: 104 }, { t: '$900,000', size: 150, color: GOLD }]} x={1380} y={56} rotate={-2} ring={INK} />
    </CoverCanvas>
  ),
})

// # 3 — the trap first: Maya, worried, holds her savings coin over a leaking 22% bucket beside a waiting sapling
export const STAIR_3 = makeCover({
  id: 'stair-3', job: JOB, canvas: 'wide',
  concept: 'The step most people skip: a steel bucket tagged 22% leaks money out of a hole; Maya, worried, holds a gold coin, deciding where it goes first.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <Sky canvas="wide" top="#E7A08E" bottom="#F6D9BE" />
      <Burst canvas="wide" cx={1280} cy={640} color="#FFFFFF" opacity={0.18} rays={20} />
      <Ground canvas="wide" y={1000} color="#5E8F6E" edge="#8DB596" />
      <Part name="bucket" kind="object" x={1000} y={520} w={520} h={490}><Bucket x={1200} y={1000} s={1.65} f={12} fill={0.6} leak={1} tag="22%" /></Part>
      <Part name="sapling" kind="extra" x={1560} y={700} w={200} h={300}><Tree x={1660} y={1000} s={1.3} grow={0.6} /></Part>
      <Hero who="investorF" pose="holdUp" expression="worried" x={420} y={1330} scale={1.85}
        hold={(h) => <Part name="coin" kind="object" x={h.x - 20} y={h.y - 120} w={130} h={130} touches={['hero']}><Coin x={h.x + 45} y={h.y - 55} s={1.5} /></Part>} />
      <Words lines={[{ t: 'WHAT TO DO', size: 112 }, { t: 'BEFORE YOU', size: 112 }, { t: 'INVEST $1', size: 140, color: GOLD }]} x={1380} y={56} rotate={-2} ring={INK} />
    </CoverCanvas>
  ),
})

export const STAIR_COVERS = [STAIR_1, STAIR_2, STAIR_3]
