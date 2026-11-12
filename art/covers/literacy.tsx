// ============================================================
// COVERS — "Financial Literacy: Everything You Need to Know"
// Drawn with this video's own art (art/diorama/literacy/kit.tsx): the lamp-lit green study, walnut desk,
// warm index cards, the 49% money test, the % badge. Words = one full, true sentence (owner 2026-11-10).
// ============================================================
import React from 'react'
import { CoverCanvas, Burst, Glow } from './kit'
import { Hero, Part } from './cast'
import { Words } from './words'
import { makeCover } from './registry'
import { C, Card, DESK, Defs, Paycheck, PctBadge, TestSheet } from '../diorama/literacy/kit'
import { Arrow } from '../diorama/literacy/kit2'

const JOB = '20261110-2259_financial-literacy-everything-you-need-to-know'
const INK = '#13261F', GOLD = '#F2C14E'

// # the study, simplified for a cover: green wall, a warm lamp pool, the walnut desk
const Room: React.FC<{ glow?: [number, number] }> = ({ glow = [1250, 620] }) => (
  <g>
    <Defs />
    <rect width={1920} height={1080} fill="url(#fl-wall)" />
    <rect width={1920} height={1080} fill="url(#fl-stripe)" />
    <ellipse cx={glow[0]} cy={glow[1]} rx={900} ry={520} fill="url(#fl-lamp)" />
    <rect x={0} y={DESK + 120} width={1920} height={1080 - DESK - 120} fill="url(#fl-desk)" />
    <rect x={0} y={DESK + 120} width={1920} height={1080 - DESK - 120} fill="url(#fl-wood)" />
    <rect x={0} y={DESK + 120} width={1920} height={10} fill="#fff" opacity={0.14} />
  </g>
)
const MARKS = [1, -1, 1, 1, -1, -1, 1, -1, 1, -1, 1, 1, -1, -1, 1, -1, -1, 1, 1, -1, 1, -1, 1, -1, -1, 1, 1, -1]

// # 1 — ten index cards fanned on the desk, card 1 holds a paycheck; Maya, smiling, presents them
export const LIT_1 = makeCover({
  id: 'literacy-1', job: JOB, canvas: 'wide',
  concept: 'The whole course on one desk: ten warm index cards fan out under the lamp, the top one holding a paycheck, each with a gold % badge; Maya, smiling, points at them.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <Room />
      <Burst canvas="wide" cx={1250} cy={700} color="#FFE9B0" opacity={0.16} rays={20} />
      <Part name="cards" kind="object" x={760} y={440} w={900} h={520}>
        {Array.from({ length: 10 }, (_, k) => <Card key={k} x={880 + k * 80} y={860 - Math.sin((k / 9) * Math.PI) * 160} s={0.78} r={(k - 4.5) * 7} n={k + 1}><PctBadge x={0} y={0} r={40} /></Card>)}
        <Card x={1250} y={600} s={1.5} r={-3} n={1} glow={0.6}><Paycheck x={0} y={-6} s={0.55} open={0.45} amount="$4,200" /></Card>
      </Part>
      <Hero who="investorF" pose="point" expression="smiling" x={400} y={1330} scale={1.85} />
      <Words lines={[{ t: 'THE 10 MONEY RULES', size: 104 }, { t: 'NOBODY EVER', size: 112 }, { t: 'TAUGHT YOU', size: 140, color: GOLD }]} x={1380} y={56} rotate={-2} ring={INK} />
    </CoverCanvas>
  ),
})

// # 2 — the 28-question money test with a red 49% circled; Maya, shocked
export const LIT_2 = makeCover({
  id: 'literacy-2', job: JOB, canvas: 'wide',
  concept: 'The test result: a big 28-question MONEY TEST answer sheet, half the marks wrong, a red 49% circled; Maya, shocked, holds her head.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <Room glow={[1280, 640]} />
      <Glow id="sheet" x={1280} y={660} r={420} color="#FFE9B0" opacity={0.35} />
      <Part name="test" kind="object" x={1010} y={420} w={540} h={600}>
        <TestSheet x={1280} y={720} s={0.92} r={-4} marks={MARKS} score="49%" scoreP={1} />
      </Part>
      <Hero who="investorF" pose="shock" expression="shocked" x={420} y={1330} scale={1.85} />
      <Words lines={[{ t: 'THE AVERAGE ADULT', size: 104 }, { t: 'GETS THIS TEST', size: 112 }, { t: 'HALF WRONG', size: 140, color: GOLD }]} x={1380} y={56} rotate={-2} ring={INK} />
    </CoverCanvas>
  ),
})

// # 3 — one % card between a green arrow (FOR YOU) and a red one (AGAINST YOU); Maya, thinking
export const LIT_3 = makeCover({
  id: 'literacy-3', job: JOB, canvas: 'wide',
  concept: 'The one idea: a single glowing index card with a gold % in the middle, a green arrow up for you and a red arrow down against you; Maya, thinking, points up at it.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <Room glow={[1280, 700]} />
      <Burst canvas="wide" cx={1280} cy={700} color="#FFE9B0" opacity={0.2} rays={22} />
      <Part name="card" kind="object" x={1010} y={540} w={540} h={340}>
        <Card x={1280} y={710} s={1.55} r={-2} glow={0.8}><PctBadge x={0} y={-10} r={66} /></Card>
      </Part>
      <Part name="arrows" kind="extra" x={880} y={480} w={820} h={480} touches={['card']}>
        <Arrow x1={950} y1={920} x2={950} y2={520} color={C.cash} w={34} />
        <Arrow x1={1620} y1={520} x2={1620} y2={920} color={C.red} w={34} />
      </Part>
      <Hero who="investorF" pose="pointUp" expression="thinking" x={420} y={1330} scale={1.85} />
      <Words lines={[{ t: 'IS EVERY PERCENT', size: 104 }, { t: 'WORKING FOR YOU', size: 104 }, { t: 'OR AGAINST?', size: 140, color: GOLD }]} x={1380} y={56} rotate={-2} ring={INK} />
    </CoverCanvas>
  ),
})

export const LITERACY_COVERS = [LIT_1, LIT_2, LIT_3]
