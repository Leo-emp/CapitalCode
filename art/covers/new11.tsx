// ============================================================
// COVERS — unpackaged long videos (2026-11-12): trusts, private
// equity, basic economics, credit scores, national debt, tax
// brackets, financial freedom, real estate, subscriptions,
// mortgages, 9-to-5 to freedom.
// Words are full points the owner approved; the scene shows the story.
// ============================================================
import React from 'react'
import { Burst, CoverCanvas, Glow, Ground, Sky } from './kit'
import { Hero, Part, Thing } from './cast'
import { Arrow, Words } from './words'
import { makeCover } from './registry'
import { GOLD, Paper, Phone, Pile, Tag } from './draw'

const wide = (id: string, job: string, concept: string, C: React.FC) => makeCover({ id, job, canvas: 'wide', concept, Component: C })

export const TRUSTS_1 = wide('trusts-1', '20261109-1408_how-billionaires-use-trusts-to-skip-the-estate-tax',
  'A smug billionaire holds up the key to a locked TRUST chest while the estate tax form sits shut out beside it.', () => (
  <CoverCanvas canvas="wide">
    <Sky canvas="wide" top="#1F3A2E" bottom="#08140F" />
    <Glow id="chest" x={1180} y={720} r={440} color={GOLD} opacity={0.4} />
    <Ground canvas="wide" y={960} color="#05100A" />
    <Thing name="chest" prop="treasure-chest" x={1160} y={740} size={480} />
    <Part name="tag" kind="object" x={1300} y={820} w={300} h={150} touches={['chest']}><Tag x={1450} y={895} text="TRUST" s={0.95} r={-6} color="#FFE27A" /></Part>
    <Thing name="tax" prop="tax-form" x={1580} y={660} size={220} kind="extra" rotate={10} />
    <Hero who="investor" pose="holdUp" expression="smug" x={360} y={1310} scale={1.85}
      hold={(h) => <Thing name="key" prop="key" x={h.x + 70} y={h.y - 80} size={220} shadow={false} touches={['hero']} />} />
    <Words lines={[{ t: 'HOW BILLIONAIRES USE', size: 105 }, { t: 'TRUST FUNDS TO', size: 130, color: GOLD }, { t: 'BEAT THE SYSTEM', size: 130, color: GOLD }]} x={1380} y={64} rotate={-3} ring="#05100A" />
  </CoverCanvas>
))

export const PE_1 = wide('pe-1', '20261109-1433_how-private-equity-actually-works',
  'A shocked hero points at a company tower with a giant LOAN tag hung on it, while the buyout firm walks off with the money bag.', () => (
  <CoverCanvas canvas="wide">
    <Sky canvas="wide" top="#2B4A78" bottom="#0E1B33" />
    <Burst canvas="wide" cx={1150} cy={720} color={GOLD} opacity={0.14} />
    <Ground canvas="wide" y={960} color="#0B1426" />
    <Thing name="company" prop="skyscraper" x={1100} y={720} size={480} />
    <Part name="loan" kind="object" x={900} y={780} w={300} h={150} touches={['company']}><Tag x={1050} y={855} text="LOAN" s={1.0} r={-8} color="#FFE27A" /></Part>
    <Hero name="firm" who="investor" main={false} pose="carry" expression="smug" x={1560} y={1010} scale={1.0} flip
      hold={(h) => <Thing name="bag" prop="money-bag" x={h.x} y={h.y - 30} size={200} shadow={false} kind="extra" touches={['firm']} />} />
    <Hero pose="point" expression="shocked" x={300} y={1310} scale={1.85} />
    <Words lines={[{ t: 'HOW PRIVATE', size: 130 }, { t: 'EQUITY ACTUALLY', size: 130, color: GOLD }, { t: 'WORKS', size: 155, color: GOLD }]} x={1380} y={64} rotate={-3} ring="#0B1426" />
  </CoverCanvas>
))

export const ECON_1 = wide('econ-1', '20261110-0426_how-the-economy-actually-works-basic-economics-in-9-minutes',
  'A smiling hero points at money flowing from a factory to a shop — the whole economy as one loop.', () => (
  <CoverCanvas canvas="wide">
    <Sky canvas="wide" top="#FF9A4A" bottom="#C2551E" />
    <Burst canvas="wide" cx={1200} cy={720} color="#FFFFFF" opacity={0.18} />
    <Ground canvas="wide" y={960} color="#7A2E0E" />
    <Thing name="factory" prop="factory" x={1020} y={760} size={380} />
    <Arrow name="flow" from={[1160, 640]} to={[1340, 640]} bend={0.3} />
    <Thing name="cash" prop="banknote" x={1250} y={800} size={160} kind="extra" />
    <Thing name="shop" prop="shop-mini" x={1490} y={770} size={360} />
    <Hero pose="point" expression="smiling" x={300} y={1310} scale={1.85} />
    <Words lines={[{ t: 'HOW THE ECONOMY', size: 120 }, { t: 'REALLY WORKS', size: 135, color: '#FFE27A' }, { t: 'IN 9 MINUTES', size: 135, color: '#FFE27A' }]} x={1380} y={64} rotate={-3} ring="#5A1E06" />
  </CoverCanvas>
))

export const CREDIT_1 = wide('credit-1', '20261110-0549_how-credit-scores-actually-work',
  'A thinking hero points at a credit card under a magnifying glass, its score tag showing 720.', () => (
  <CoverCanvas canvas="wide">
    <Sky canvas="wide" top="#3B2A9E" bottom="#140A40" />
    <Glow id="card" x={1220} y={720} r={420} color="#5BCBFF" opacity={0.35} />
    <Thing name="card" prop="credit-card" x={1130} y={760} size={440} />
    <Thing name="glass" prop="magnifier" x={1440} y={640} size={300} touches={['card']} />
    <Part name="score" kind="object" x={1280} y={840} w={380} h={170} touches={['card']}><Tag x={1470} y={925} text="SCORE 720" s={1.05} r={-6} color="#FFE27A" /></Part>
    <Hero pose="point" expression="thinking" x={300} y={1310} scale={1.85} />
    <Words lines={[{ t: 'WHAT YOUR', size: 125 }, { t: 'CREDIT SCORE', size: 140, color: GOLD }, { t: 'REALLY MEASURES', size: 125, color: GOLD }]} x={1380} y={64} rotate={-3} ring="#140A40" />
  </CoverCanvas>
))

export const DEBT_1 = wide('debt-1', '20261110-0734_how-the-us-national-debt-actually-works',
  'A shocked hero points at a giant $40T IOU, held by a piggy bank (Americans) and a globe (the world).', () => (
  <CoverCanvas canvas="wide">
    <Sky canvas="wide" top="#1C2433" bottom="#07090E" />
    <Glow id="iou" x={1180} y={720} r={420} color={GOLD} opacity={0.35} />
    <Ground canvas="wide" y={960} color="#05070C" edge="#3A5F93" />
    <Thing name="iou" prop="contract" x={1150} y={730} size={440} />
    <Part name="tag" kind="object" x={900} y={820} w={300} h={150} touches={['iou']}><Tag x={1050} y={895} text="$40T" s={1.05} r={-8} color="#FFE27A" /></Part>
    <Thing name="world" prop="globe" x={1550} y={640} size={230} kind="extra" />
    <Thing name="savers" prop="piggy-bank" x={1550} y={880} size={210} kind="extra" />
    <Hero pose="point" expression="shocked" x={300} y={1310} scale={1.85} />
    <Words lines={[{ t: 'WHO AMERICA', size: 125 }, { t: 'REALLY OWES', size: 135, color: GOLD }, { t: '$40 TRILLION TO', size: 125, color: GOLD }]} x={1380} y={64} rotate={-3} ring="#0B1426" />
  </CoverCanvas>
))

export const TAX_1 = wide('tax-1', '20261110-2138_how-tax-brackets-actually-work',
  'A smiling hero holds up his raise; behind him the bracket ladder shows only the top step taxed at 22%.', () => (
  <CoverCanvas canvas="wide">
    <Sky canvas="wide" top="#3DAA6E" bottom="#1C5E3A" />
    <Burst canvas="wide" cx={1150} cy={700} color="#FFFFFF" opacity={0.14} />
    <Ground canvas="wide" y={960} color="#0E3A22" />
    <Thing name="ladder" prop="ladder" x={1140} y={720} size={480} />
    <Part name="rate" kind="object" x={1340} y={760} w={280} h={150} touches={['ladder']}><Tag x={1480} y={835} text="22%" s={1.0} r={8} color="#FFE27A" /></Part>
    <Hero pose="holdUp" expression="smiling" x={340} y={1310} scale={1.85}
      hold={(h) => <Part name="raise" kind="object" x={h.x - 30} y={h.y - 250} w={280} h={340} touches={['hero']}><Paper x={h.x + 100} y={h.y - 85} title="PAYCHECK" stamp="RAISE" s={0.85} /></Part>} />
    <Words lines={[{ t: 'WHY A RAISE NEVER', size: 110 }, { t: 'PUTS YOU IN A WORSE', size: 110, color: GOLD }, { t: 'TAX BRACKET', size: 140, color: GOLD }]} x={1380} y={64} rotate={-3} ring="#0E3A22" />
  </CoverCanvas>
))

export const FREEDOM_1 = wide('freedom-1', '20261110-2205_how-to-reach-financial-freedom-step-by-step',
  'A smiling hero points up a ladder that climbs to a money tree — freedom is a set of steps.', () => (
  <CoverCanvas canvas="wide">
    <Sky canvas="wide" top="#5BCBFF" bottom="#2A8FD0" />
    <Burst canvas="wide" cx={1300} cy={680} color="#FFFFFF" opacity={0.2} />
    <Ground canvas="wide" y={960} color="#2E7A3E" />
    <Thing name="ladder" prop="ladder" x={1080} y={740} size={460} />
    <Thing name="tree" prop="money-tree" x={1470} y={700} size={400} touches={['ladder']} />
    <Hero pose="point" expression="smiling" x={300} y={1310} scale={1.85} />
    <Words lines={[{ t: 'THE STEPS TO', size: 125 }, { t: 'FINANCIAL FREEDOM,', size: 120, color: GOLD }, { t: 'IN ORDER', size: 150, color: GOLD }]} x={1380} y={64} rotate={-3} ring="#16294A" />
  </CoverCanvas>
))

export const HOUSING_1 = wide('housing-1', '20261111-0137_how-the-real-estate-market-actually-works',
  'A puzzled hero scratches his head at a house with a huge price tag, an interest-rate sign beside it.', () => (
  <CoverCanvas canvas="wide">
    <Sky canvas="wide" top="#FF7A9C" bottom="#B03A6A" />
    <Burst canvas="wide" cx={1150} cy={700} color="#FFFFFF" opacity={0.18} />
    <Ground canvas="wide" y={960} color="#6E1F44" />
    <Thing name="house" prop="house" x={1130} y={740} size={500} />
    <Part name="price" kind="object" x={1320} y={600} w={340} h={180} touches={['house']}><Tag x={1490} y={690} text="$420K" s={1.15} r={-8} color="#FFE27A" /></Part>
    <Thing name="rate" prop="interest-percent" x={1570} y={880} size={200} kind="extra" />
    <Hero pose="scratchHead" expression="thinking" x={340} y={1310} scale={1.85} />
    <Words lines={[{ t: 'WHAT REALLY DECIDES', size: 110 }, { t: 'HOW MUCH A', size: 130, color: '#FFE27A' }, { t: 'HOUSE COSTS', size: 145, color: '#FFE27A' }]} x={1380} y={64} rotate={-3} ring="#4A0E2C" />
  </CoverCanvas>
))

export const SUBS_1 = wide('subs-1', '20261103-0629_why-every-app-now-wants-a-monthly-subscription',
  'A worried hero holds his phone while a calendar behind it charges $9.99 every month, the bills piling up.', () => (
  <CoverCanvas canvas="wide">
    <Sky canvas="wide" top="#7C5CFF" bottom="#3B2A9E" />
    <Burst canvas="wide" cx={1150} cy={720} color="#FFFFFF" opacity={0.14} />
    <Ground canvas="wide" y={960} color="#2A1D73" />
    <Thing name="calendar" prop="calendar" x={1140} y={740} size={440} />
    <Part name="fee" kind="object" x={1300} y={810} w={360} h={170} touches={['calendar']}><Tag x={1480} y={895} text="$9.99/MO" s={1.05} r={-6} color="#FFE27A" /></Part>
    <Thing name="bills" prop="bills-stack" x={1560} y={620} size={220} kind="extra" />
    <Hero pose="holdUp" expression="worried" x={340} y={1310} scale={1.85}
      hold={(h) => <Part name="phone" kind="extra" x={h.x - 20} y={h.y - 270} w={180} h={340} touches={['hero']}><Phone x={h.x + 70} y={h.y - 100} s={0.85} r={-8} text="APP" /></Part>} />
    <Words lines={[{ t: 'WHY EVERY APP', size: 125 }, { t: 'NOW WANTS A', size: 130, color: GOLD }, { t: 'MONTHLY SUBSCRIPTION', size: 105, color: GOLD }]} x={1380} y={64} rotate={-3} ring="#1E1460" />
  </CoverCanvas>
))

export const MORTGAGE_1 = wide('mortgage-1', '20261111-1151_how-mortgages-actually-work',
  'A shocked hero points at his house getting a tiny pile while the bank next to it sits on the big pile of interest.', () => (
  <CoverCanvas canvas="wide">
    <Sky canvas="wide" top="#E8564A" bottom="#A82E2A" />
    <Burst canvas="wide" cx={1200} cy={700} color="#FFFFFF" opacity={0.16} />
    <Ground canvas="wide" y={960} color="#7A1F1C" />
    <Thing name="house" prop="house" x={1000} y={780} size={360} />
    <Part name="small" kind="extra" x={900} y={925} w={170} h={60}><Pile x={990} y={960} w={150} r={22} /></Part>
    <Thing name="bank" prop="bank" x={1450} y={700} size={380} />
    <Part name="big" kind="object" x={1240} y={830} w={420} h={170} touches={['bank']}><Pile x={1450} y={960} w={400} r={40} /></Part>
    <Hero pose="point" expression="shocked" x={300} y={1310} scale={1.85} />
    <Words lines={[{ t: 'WHERE YOUR', size: 125 }, { t: 'MORTGAGE PAYMENT', size: 125, color: GOLD }, { t: 'REALLY GOES', size: 140, color: GOLD }]} x={1380} y={64} rotate={-3} ring="#5A1210" />
  </CoverCanvas>
))

export const NINETOFIVE_1 = wide('ninetofive-1', '20261111-1732_from-9-to-5-to-financial-freedom-step-by-step',
  'A smiling hero points from his office briefcase and clock along an arrow to a money tree.', () => (
  <CoverCanvas canvas="wide">
    <Sky canvas="wide" top="#E9C25A" bottom="#B88A2E" />
    <Burst canvas="wide" cx={1450} cy={700} color="#FFFFFF" opacity={0.22} />
    <Ground canvas="wide" y={960} color="#6E5214" />
    <Thing name="briefcase" prop="briefcase" x={980} y={820} size={280} />
    <Thing name="clock" prop="clock" x={980} y={620} size={190} kind="extra" />
    <Arrow name="to-tree" from={[1110, 740]} to={[1290, 700]} bend={-0.3} />
    <Thing name="tree" prop="money-tree" x={1480} y={720} size={420} />
    <Hero pose="point" expression="smiling" x={300} y={1310} scale={1.85} />
    <Words lines={[{ t: 'HOW TO GO FROM', size: 120 }, { t: '9-TO-5 TO', size: 140, color: '#FFFFFF' }, { t: 'FINANCIAL FREEDOM', size: 120, color: '#FFFFFF' }]} x={1380} y={64} rotate={-3} ring="#3A2A00" />
  </CoverCanvas>
))
