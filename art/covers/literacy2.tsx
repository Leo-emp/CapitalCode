// ============================================================
// COVERS — remake of "Financial Literacy: Everything You Need to Know"
// Drawn with this video's own art (art/diorama/literacy2/kit.tsx, "TWO LIVES"): the two apartments, the money
// tree, the dentist bill on a card. Words = one full, true sentence (owner rule 2026-11-10).
// ============================================================
import React from 'react'
import { CoverCanvas, Burst } from './kit'
import { Hero, Part } from './cast'
import { Words } from './words'
import { makeCover } from './registry'
import { BillSheet, Card, Coin, L, LDefs, MoneyTree, Room, Tooth, TwoRooms } from '../diorama/literacy2/kit'
import { Defs } from '../diorama/literacy/kit'
import { Arrow, Jar } from '../diorama/literacy/kit2'

const JOB = '20261111-1553_financial-literacy-everything-you-need-to-know'
const INK = '#22303F', GOLD = '#F2C14E'

// # 1 — the two homes: same salary, two lives; Jordan (front, worried) on the bills side, Maya's tree glowing behind
export const LL_C1 = makeCover({
  id: 'literacy2-1', job: JOB, canvas: 'wide',
  concept: 'Same salary, two lives: the split apartment — Maya, smiling and relaxed, on her warm side with a money tree dropping coins; through the wall, Jordan’s cool side with bills due and a debt card.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <Defs /><LDefs />
      <Room x0={0} x1={1260} dusk />
      <Room x0={1260} x1={1920} cool dusk plant={false} />
      <rect x={1250} y={240} width={22} height={840} fill={INK} opacity={0.85} />
      <Burst canvas="wide" cx={1000} cy={700} color="#FFE9B0" opacity={0.16} rays={18} />
      <Part name="maya-side" kind="object" x={820} y={470} w={400} h={500}>
        <MoneyTree x={1010} y={950} s={0.85} g={1} drop={0.3} />
      </Part>
      <Part name="jordan-side" kind="object" x={1360} y={540} w={380} h={340}>
        <BillSheet x={1450} y={780} s={0.42} r={-12} head="BILL" amount="DUE" />
        <BillSheet x={1620} y={790} s={0.42} r={10} head="BILL" amount="DUE" />
        <Card x={1550} y={630} s={0.55} r={-8} text="DEBT" />
      </Part>
      <Hero who="investorF" pose="relax" expression="smiling" x={400} y={1330} scale={1.85} />
      <Words lines={[{ t: 'WHY THE SAME SALARY', size: 100 }, { t: 'CAN END IN TWO', size: 112 }, { t: 'DIFFERENT LIVES', size: 140, color: GOLD }]} x={1380} y={56} rotate={-2} ring={INK} />
    </CoverCanvas>
  ),
})

// # 2 — the money tree pays a bill: a $250 bill stamped PAID by coins from the tree; Maya, smiling, points up at it
export const LL_C2 = makeCover({
  id: 'literacy2-2', job: JOB, canvas: 'wide',
  concept: 'The peak of the video: a money tree dropping coins onto a phone + internet bill that is stamped PAID; Maya, smiling, points up at it.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <Defs /><LDefs />
      <Room />
      <Burst canvas="wide" cx={1250} cy={680} color="#FFF1C2" opacity={0.2} rays={22} />
      <Part name="tree" kind="object" x={900} y={420} w={520} h={560}>
        <MoneyTree x={1150} y={960} s={1.05} g={1} drop={0.4} />
      </Part>
      <Part name="bill" kind="object" x={1420} y={520} w={340} h={440} touches={['tree']}>
        <BillSheet x={1590} y={740} s={0.95} r={6} head="BILL" amount="$250" color={L.terra} stamp="PAID" stampO={1} />
      </Part>
      <Hero who="investorF" pose="pointUp" expression="smiling" x={400} y={1330} scale={1.85} />
      <Words lines={[{ t: 'HOW TO MAKE', size: 110 }, { t: 'YOUR MONEY PAY', size: 112 }, { t: 'YOUR BILLS', size: 150, color: GOLD }]} x={1380} y={56} rotate={-2} ring={INK} />
    </CoverCanvas>
  ),
})

// # 3 — the $800 tooth on a credit card that becomes $1,230; Jordan shocked
export const LL_C3 = makeCover({
  id: 'literacy2-3', job: JOB, canvas: 'wide',
  concept: 'The debt trap from the Borrow part: a cracked tooth and an $800 card swipe, an arrow to a TOTAL PAID $1,230 bill; Jordan, shocked, holds his head.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <Defs /><LDefs />
      <Room cool />
      <Burst canvas="wide" cx={1250} cy={700} color="#FFD9C9" opacity={0.18} rays={20} />
      <Part name="tooth" kind="object" x={880} y={480} w={340} h={420}>
        <Tooth x={1040} y={720} s={1.05} crack={1} />
      </Part>
      <Part name="arrow" kind="extra" x={1200} y={640} w={180} h={100} touches={['tooth', 'total']}>
        <Arrow x1={1210} y1={690} x2={1370} y2={690} color={INK} w={16} />
      </Part>
      <Part name="total" kind="object" x={1380} y={480} w={380} h={480}>
        <BillSheet x={1570} y={720} s={1} r={4} head="TOTAL PAID" amount="$1,230" color={L.red} />
      </Part>
      <Hero who="investor" pose="shock" expression="shocked" x={400} y={1330} scale={1.85} />
      <Words lines={[{ t: 'HOW AN $800 BILL', size: 112 }, { t: 'ENDED UP COSTING', size: 104 }, { t: '$1,230', size: 150, color: GOLD }]} x={1380} y={56} rotate={-2} ring={INK} />
    </CoverCanvas>
  ),
})

export const LITERACY2_COVERS = [LL_C1, LL_C2, LL_C3]
void Coin; void Jar
