// ============================================================
// COVERS — packaged long videos, batch 1 (re-covered 2026-11-09):
// Costco, gyms, AI power bill, casinos, 1% fee, borrow-don't-sell,
// car cost, who makes money from AI.
// v2 (2026-11-10): full-sentence words; the scene shows the story.
// ============================================================
import React from 'react'
import { Burst, CoverCanvas, Glow, Ground, Sky } from './kit'
import { Hero, Part, Thing } from './cast'
import { Arrow, Words } from './words'
import { makeCover } from './registry'
import { Card, Dumbbell, GOLD, Paper, Pile, RED, Tag } from './draw'

const wide = (id: string, job: string, concept: string, C: React.FC) => makeCover({ id, job, canvas: 'wide', concept, Component: C })

export const COSTCO_1 = wide('costco-1', '20261030-1908_costco-barely-profits-from-what-you-buy',
  'A full grocery basket earns Costco a tiny pile; the membership card the hero holds up sits on the big one.', () => (
  <CoverCanvas canvas="wide">
    <Sky canvas="wide" top="#E8564A" bottom="#A82E2A" />
    <Burst canvas="wide" cx={1150} cy={700} color="#FFFFFF" opacity={0.16} />
    <Ground canvas="wide" y={960} color="#7A1F1C" />
    <Thing name="basket" prop="grocery-basket" x={1000} y={760} size={400} />
    <Part name="small" kind="extra" x={920} y={925} w={170} h={60}><Pile x={1010} y={960} w={150} r={22} /></Part>
    <Part name="big" kind="object" x={1280} y={800} w={420} h={170}><Pile x={1490} y={950} w={400} r={40} /></Part>
    <Hero pose="holdUp" expression="smiling" x={330} y={1310} scale={1.85}
      hold={(h) => <Part name="card" kind="object" x={h.x - 20} y={h.y - 170} w={300} h={200} touches={['hero']}><Card x={h.x + 120} y={h.y - 70} r={-12} s={0.95} color="#2F5FD0" text="MEMBER" /></Part>} />
    <Words lines={[{ t: "WHERE COSTCO'S", size: 120 }, { t: 'REAL PROFIT', size: 135, color: GOLD }, { t: 'COMES FROM', size: 135, color: GOLD }]} x={1380} y={64} rotate={-3} ring="#5A1210" />
  </CoverCanvas>
))

export const GYMS_1 = wide('gyms-1', '20261031-1828_gyms-make-money-from-people-who-never-go',
  'The hero lounges at home, smug, beside his untouched dumbbell, while his gym card keeps paying the gym.', () => (
  <CoverCanvas canvas="wide">
    <Sky canvas="wide" top="#7C5CFF" bottom="#3B2A9E" />
    <Burst canvas="wide" cx={1100} cy={720} color="#FFFFFF" opacity={0.14} />
    <Ground canvas="wide" y={950} color="#2A1D73" />
    <Hero pose="leanBack" expression="smug" x={420} y={1240} scale={1.75} />
    <Part name="dumbbell" kind="object" x={800} y={830} w={380} h={130}><Dumbbell x={990} y={895} s={1.15} r={-6} /></Part>
    <Part name="card" kind="object" x={1200} y={600} w={330} h={220}><Card x={1365} y={710} r={10} s={1.05} color={RED} text="GYM" /></Part>
    <Part name="cash" kind="extra" x={1240} y={840} w={380} h={150}><Pile x={1430} y={960} w={360} r={34} /></Part>
    <Words lines={[{ t: 'WHY GYMS MAKE MONEY', size: 110 }, { t: 'FROM PEOPLE', size: 130, color: GOLD }, { t: 'WHO NEVER GO', size: 130, color: GOLD }]} x={1380} y={64} rotate={-3} ring="#1E1460" />
  </CoverCanvas>
))

export const POWER_1 = wide('power-1', '20261031-2033_how-ai-data-centers-ended-up-on-your-power-bill',
  'An angry hero holds up his power bill while the AI data center behind him crackles with lightning.', () => (
  <CoverCanvas canvas="wide">
    <Sky canvas="wide" top="#1C2433" bottom="#07090E" />
    <Glow id="srv" x={1200} y={700} r={420} color="#5BCBFF" opacity={0.45} />
    <Ground canvas="wide" y={960} color="#05070C" edge="#3A5F93" />
    <Thing name="servers" prop="server-rack" x={1200} y={700} size={480} />
    <Thing name="bolt" prop="lightning" x={1500} y={620} size={220} kind="extra" shadow={false} />
    <Hero pose="holdUp" expression="angry" x={360} y={1310} scale={1.85}
      hold={(h) => <Part name="bill" kind="object" x={h.x - 30} y={h.y - 250} w={260} h={330} touches={['hero']}><Paper x={h.x + 100} y={h.y - 85} title="POWER BILL" stamp="+AI" s={0.8} /></Part>} />
    <Words lines={[{ t: 'HOW AI ENDED UP', size: 120 }, { t: 'ON YOUR', size: 130, color: '#5BCBFF' }, { t: 'POWER BILL', size: 150, color: '#5BCBFF' }]} x={1380} y={50} rotate={-3} ring="#0B1426" />
  </CoverCanvas>
))

export const CASINO_1 = wide('casino-1', '20261031-0625_how-casinos-win-even-when-you-win',
  'The hero celebrates a small win while the casino owner behind him sits on a far bigger pile.', () => (
  <CoverCanvas canvas="wide">
    <Sky canvas="wide" top="#127A4A" bottom="#06361F" />
    <Burst canvas="wide" cx={420} cy={600} color={GOLD} opacity={0.16} />
    <Ground canvas="wide" y={960} color="#04251A" />
    <Part name="win" kind="extra" x={700} y={900} w={170} h={70}><Pile x={790} y={950} w={150} r={24} /></Part>
    <Thing name="dice" prop="dice" x={930} y={860} size={170} kind="extra" rotate={-10} />
    <Hero name="house" who="owner" main={false} pose="leanBack" expression="smug" x={1150} y={1010} scale={0.95} />
    <Part name="pile" kind="object" x={1290} y={720} w={420} h={230}><Pile x={1500} y={910} w={400} r={42} /></Part>
    <Hero pose="celebrate" expression="smiling" x={400} y={1310} scale={1.85} />
    <Words lines={[{ t: 'HOW CASINOS WIN', size: 120 }, { t: 'EVEN WHEN', size: 130, color: GOLD }, { t: 'YOU WIN', size: 150, color: GOLD }]} x={1400} y={50} rotate={-3} ring="#02180F" />
  </CoverCanvas>
))

export const FEE_1 = wide('fee-1', '20261101-0149_the-1-fee-that-costs-more-than-you-save',
  'A shocked hero points at his savings pouring out of a bucket through a tiny hole labelled 1%.', () => (
  <CoverCanvas canvas="wide">
    <Sky canvas="wide" top="#2B4A78" bottom="#0E1B33" />
    <Glow id="bucket" x={1150} y={700} r={420} color={GOLD} opacity={0.35} />
    <Thing name="bucket" prop="leaky-bucket" x={1130} y={700} size={520} />
    <Part name="tag" kind="object" x={1360} y={780} w={260} h={140} touches={['bucket']}><Tag x={1490} y={850} text="1% FEE" s={0.85} r={8} color="#FFE27A" /></Part>
    <Hero pose="point" expression="shocked" x={300} y={1310} scale={1.85} />
    <Words lines={[{ t: 'HOW A TINY 1% FEE', size: 120 }, { t: 'EATS YOUR', size: 130, color: GOLD }, { t: 'SAVINGS', size: 155, color: GOLD }]} x={1380} y={50} rotate={-3} ring="#0B1426" />
  </CoverCanvas>
))

export const BORROW_1 = wide('borrow-1', '20261031-0302_the-rich-don-t-sell-they-borrow',
  'A smug rich investor keeps his shares and walks out of the bank with a bag of borrowed cash.', () => (
  <CoverCanvas canvas="wide">
    <Sky canvas="wide" top="#1A1A2E" bottom="#07070F" />
    <Glow id="bank" x={1200} y={700} r={440} color={GOLD} opacity={0.4} />
    <Ground canvas="wide" y={960} color="#05050C" />
    <Thing name="bank" prop="bank" x={1180} y={720} size={480} />
    <Thing name="shares" prop="stock-certificate" x={1530} y={800} size={240} kind="extra" rotate={8} />
    <Hero who="investor" pose="carry" expression="smug" x={420} y={1310} scale={1.85}
      hold={(h) => <Thing name="cash" prop="money-bag" x={h.x} y={h.y - 30} size={240} shadow={false} touches={['hero']} />} />
    <Words lines={[{ t: 'WHY THE RICH', size: 125 }, { t: 'BORROW INSTEAD', size: 130, color: GOLD }, { t: 'OF SELLING', size: 140, color: GOLD }]} x={1380} y={50} rotate={-3} ring="#3A2A00" />
  </CoverCanvas>
))

export const CAR_1 = wide('car-1', '20261028-1609_what-your-car-really-costs',
  'A shocked hero points at his new car and its true monthly price tag: about $1,072.', () => (
  <CoverCanvas canvas="wide">
    <Sky canvas="wide" top="#5BCBFF" bottom="#2A8FD0" />
    <Burst canvas="wide" cx={1150} cy={720} color="#FFFFFF" opacity={0.2} />
    <Ground canvas="wide" y={950} color="#3A5F93" />
    <Thing name="car" prop="car" x={1120} y={800} size={560} />
    <Part name="tag" kind="object" x={1260} y={560} w={400} h={210} touches={['car']}><Tag x={1460} y={665} text="$1,072/MO" s={1.25} r={-6} color="#FFE27A" /></Part>
    <Hero pose="point" expression="shocked" x={300} y={1310} scale={1.85} />
    <Words lines={[{ t: 'WHAT YOUR CAR', size: 120 }, { t: 'REALLY COSTS', size: 130, color: GOLD }, { t: 'EVERY MONTH', size: 130, color: GOLD }]} x={1380} y={64} rotate={-3} ring="#16294A" />
  </CoverCanvas>
))

export const AIMONEY_1 = wide('aimoney-1', '20261030-0344_who-is-actually-making-money-from-ai',
  'A thinking hero looks past the small robot to the chip maker sitting on a big pile of coins — the shovel sellers win.', () => (
  <CoverCanvas canvas="wide">
    <Sky canvas="wide" top="#1E3A63" bottom="#0B1426" />
    <Glow id="chip" x={1350} y={700} r={420} color={GOLD} opacity={0.4} />
    <Thing name="robot" prop="robot-head" x={900} y={760} size={240} kind="extra" />
    <Arrow name="to-chip" from={[1010, 700]} to={[1170, 700]} bend={0.3} />
    <Thing name="chip" prop="ai-chip" x={1360} y={690} size={400} />
    <Part name="pile" kind="object" x={1150} y={850} w={440} h={150} touches={['chip']}><Pile x={1370} y={965} w={420} r={38} /></Part>
    <Hero pose="scratchHead" expression="thinking" x={330} y={1310} scale={1.85} />
    <Words lines={[{ t: "WHO'S ACTUALLY", size: 120 }, { t: 'MAKING MONEY', size: 135, color: GOLD }, { t: 'FROM AI?', size: 150, color: GOLD }]} x={1380} y={50} rotate={-3} ring="#0B1426" />
  </CoverCanvas>
))
