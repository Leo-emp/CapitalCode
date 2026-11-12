// ============================================================
// COVERS — packaged Shorts (1080×1920), re-covered 2026-11-09.
// ============================================================
import React from 'react'
import { Burst, CoverCanvas, Glow, Ground, Sky } from './kit'
import { Hero, Part, Thing } from './cast'
import { Arrow, Words } from './words'
import { makeCover } from './registry'
import { Burger, Card, Dumbbell, GOLD, Pass, Pile, Popcorn, RED, Seat, Tag, Trap } from './draw'

const tall = (id: string, job: string, concept: string, C: React.FC) => makeCover({ id, job, canvas: 'tall', concept, Component: C })
// # the shared stage of a tall cover: sky, burst behind the object, a floor
const Stage: React.FC<{ top: string; bottom: string; floor: string; burst?: string; bx?: number; by?: number }> = ({ top, bottom, floor, burst = '#FFFFFF', bx = 760, by = 1000 }) => (
  <g><Sky canvas="tall" top={top} bottom={bottom} /><Burst canvas="tall" cx={bx} cy={by} color={burst} opacity={0.16} /><Ground canvas="tall" y={1400} color={floor} /></g>
)

export const FOURPCT_1 = tall('fourpct-1', '20261025-2040_4-percent-of-stocks-made-all-the-gains',
  'A shocked hero sees one tiny group of stocks holding the trophy for the whole market.', () => (
  <CoverCanvas canvas="tall">
    <Stage top="#2B4A78" bottom="#0E1B33" floor="#0B1426" burst={GOLD} />
    <Glow id="tro" x={760} y={980} r={380} color={GOLD} opacity={0.45} />
    <Thing name="trophy" prop="trophy" x={760} y={960} size={460} />
    <Hero pose="shock" expression="shocked" x={280} y={2070} scale={2.4} />
    <Words lines={[{ t: 'HOW 4% OF STOCKS', size: 125 }, { t: 'MADE ALL', size: 150, color: GOLD }, { t: 'THE GAINS', size: 150, color: GOLD }]} x={540} y={150} rotate={-3} ring="#0B1426" />
  </CoverCanvas>
))

export const Y2000_1 = tall('y2000-1', '20261025-1943_in-2000-the-safest-stocks-were-the-giants-too',
  'A worried hero holds the cracked crown of the year-2000 giants: only one of the top ten is still there.', () => (
  <CoverCanvas canvas="tall">
    <Stage top="#5B2A86" bottom="#1E0E36" floor="#140A26" burst="#FFD978" />
    <Thing name="crown" prop="crown" x={760} y={950} size={440} />
    <Thing name="cracks" prop="cracks" x={760} y={950} size={300} kind="extra" shadow={false} touches={['crown']} />
    <Hero pose="nervous" expression="worried" x={280} y={2070} scale={2.4} />
    <Words lines={[{ t: 'WHAT HAPPENED TO', size: 125 }, { t: 'THE BIGGEST', size: 140, color: '#FFD978' }, { t: 'STOCKS OF 2000', size: 140, color: '#FFD978' }]} x={540} y={150} rotate={-3} ring="#2A1150" />
  </CoverCanvas>
))

export const MCD_1 = tall('mcd-1', '20261102-0243_mcdonald-s-makes-more-from-rent-than-from-burgers',
  'The hero holds a burger, shocked, as the real money comes from the rent on the restaurant building.', () => (
  <CoverCanvas canvas="tall">
    <Stage top="#E8564A" bottom="#A82E2A" floor="#7A1F1C" burst={GOLD} />
    <Thing name="shop" prop="shop-mini" x={770} y={930} size={480} />
    <Part name="rent" kind="object" x={600} y={1150} w={340} h={180}><Tag x={770} y={1240} text="RENT" s={1.15} r={-6} color="#FFE27A" /></Part>
    <Hero pose="holdUp" expression="shocked" x={280} y={2070} scale={2.4}
      hold={(h) => <Part name="burger" kind="extra" x={h.x - 30} y={h.y - 170} w={260} h={190} touches={['hero']}><Burger x={h.x + 100} y={h.y - 80} s={0.95} /></Part>} />
    <Words lines={[{ t: "HOW McDONALD'S", size: 130 }, { t: 'REALLY MAKES', size: 140, color: GOLD }, { t: 'ITS MONEY', size: 150, color: GOLD }]} x={540} y={150} rotate={-3} ring="#5A1210" />
  </CoverCanvas>
))

export const MINPAY_1 = tall('minpay-1', '20261028-0426_the-minimum-payment-trap',
  'A despairing hero is chained to his card by an hourglass: paying the minimum on $5,000 takes about 15 years.', () => (
  <CoverCanvas canvas="tall">
    <Stage top="#1C2433" bottom="#07090E" floor="#05070C" burst={RED} />
    <Thing name="hourglass" prop="hourglass" x={790} y={880} size={420} />
    <Part name="card" kind="object" x={560} y={1110} w={370} h={240}><Card x={745} y={1230} r={-8} s={1.15} color={RED} text="MIN PAY" /></Part>
    <Hero pose="despair" expression="worried" x={280} y={2070} scale={2.4} />
    <Words lines={[{ t: 'WHY THE MINIMUM', size: 125 }, { t: 'PAYMENT KEEPS', size: 140, color: RED }, { t: 'YOU IN DEBT', size: 150, color: RED }]} x={540} y={150} rotate={-3} ring="#2A0A0A" />
  </CoverCanvas>
))

export const HUNDRED_1 = tall('hundred-1', '20261025-1859_where-your-100-dollars-in-an-index-fund-really-goes',
  'A curious hero holds a $100 bill while most of it flows to a few giant towers.', () => (
  <CoverCanvas canvas="tall">
    <Stage top="#3DAA6E" bottom="#1C5E3A" floor="#0E3A22" />
    <Thing name="giants" prop="skyscraper" x={780} y={860} size={440} />
    <Arrow name="flow" from={[560, 1180]} to={[700, 1000]} bend={0.3} />
    <Hero pose="holdUp" expression="thinking" x={280} y={2070} scale={2.4}
      hold={(h) => <Thing name="bill" prop="banknote" x={h.x + 80} y={h.y - 80} size={260} shadow={false} touches={['hero']} />} />
    <Words lines={[{ t: 'WHERE YOUR $100', size: 130 }, { t: 'IN AN INDEX FUND', size: 125, color: GOLD }, { t: 'REALLY GOES', size: 150, color: GOLD }]} x={540} y={150} rotate={-3} ring="#0E3A22" />
  </CoverCanvas>
))

export const SEATS_1 = tall('seats-1', '20261030-2125_why-airlines-sell-seats-that-don-t-exist',
  'A shocked hero holds a boarding pass for a seat that already has another ticket on it.', () => (
  <CoverCanvas canvas="tall">
    <Stage top="#5BCBFF" bottom="#2A8FD0" floor="#1A62B0" />
    <Part name="seat" kind="object" x={650} y={820} w={260} h={360}><Seat x={780} y={1000} s={1.2} /></Part>
    <Part name="pass2" kind="extra" x={640} y={1200} w={300} h={150}><Pass x={790} y={1275} r={8} s={1} text="12A" /></Part>
    <Hero pose="holdUp" expression="shocked" x={280} y={2070} scale={2.4}
      hold={(h) => <Part name="pass" kind="object" x={h.x - 30} y={h.y - 150} w={300} h={150} touches={['hero']}><Pass x={h.x + 120} y={h.y - 75} r={-10} s={1} text="12A" /></Part>} />
    <Words lines={[{ t: 'WHY AIRLINES SELL', size: 120 }, { t: 'SEATS THAT', size: 150, color: GOLD }, { t: "DON'T EXIST", size: 150, color: GOLD }]} x={540} y={150} rotate={-3} ring="#16294A" />
  </CoverCanvas>
))

export const POPCORN_1 = tall('popcorn-1', '20261102-1649_cinemas-keep-80-cents-of-every-popcorn-dollar',
  'A shocked hero hugs a giant popcorn bucket with a huge price tag: the snack, not the ticket, pays the cinema.', () => (
  <CoverCanvas canvas="tall">
    <Stage top="#7A1F3A" bottom="#2A0814" floor="#1A0410" burst={GOLD} />
    <Glow id="pop" x={760} y={980} r={400} color={GOLD} opacity={0.4} />
    <Part name="popcorn" kind="object" x={600} y={720} w={330} h={430}><Popcorn x={765} y={960} s={1.25} /></Part>
    <Part name="tag" kind="extra" x={600} y={1180} w={340} h={180}><Tag x={770} y={1270} text="KEEPS 80¢" s={1.15} r={-6} color="#FFE27A" /></Part>
    <Hero pose="shock" expression="shocked" x={280} y={2070} scale={2.4} />
    <Words lines={[{ t: 'WHY CINEMAS MAKE', size: 125 }, { t: 'THEIR MONEY', size: 140, color: GOLD }, { t: 'ON POPCORN', size: 150, color: GOLD }]} x={540} y={150} rotate={-3} ring="#3A0618" />
  </CoverCanvas>
))

export const TRIAL_1 = tall('trial-1', '20261101-1707_why-free-trials-ask-for-your-card',
  'A worried hero holds out his card toward a "free" trial that is really a trap.', () => (
  <CoverCanvas canvas="tall">
    <Stage top="#FFE27A" bottom="#F2B632" floor="#B88A2E" burst="#FFFFFF" />
    <Part name="trap" kind="object" x={600} y={1110} w={360} h={170}><Trap x={780} y={1180} s={1.05} /></Part>
    <Part name="tag" kind="extra" x={610} y={830} w={330} h={170}><Tag x={775} y={915} text="FREE" s={1.1} r={-8} /></Part>
    <Hero pose="holdUp" expression="worried" x={280} y={2070} scale={2.4}
      hold={(h) => <Part name="card" kind="extra" x={h.x - 20} y={h.y - 170} w={300} h={200} touches={['hero']}><Card x={h.x + 120} y={h.y - 75} r={-12} s={0.95} /></Part>} />
    <Words lines={[{ t: 'WHY FREE TRIALS', size: 130 }, { t: 'ASK FOR', size: 150, color: RED }, { t: 'YOUR CARD', size: 150, color: RED }]} x={540} y={150} rotate={-3} ring="#5A3A00" />
  </CoverCanvas>
))

export const NINETY9_1 = tall('ninety9-1', '20261029-2309_why-prices-end-in-99',
  'A thinking hero stares at a giant $3.99 tag — the 99 is aimed at his brain, not his wallet.', () => (
  <CoverCanvas canvas="tall">
    <Stage top="#8E3FD0" bottom="#3B1470" floor="#25084A" burst="#FFD978" />
    <Part name="tag" kind="object" x={560} y={780} w={460} h={260}><Tag x={780} y={910} text="$3.99" s={1.6} r={-8} color="#FFE27A" /></Part>
    <Thing name="brain" prop="question" x={790} y={1220} size={240} kind="extra" />
    <Hero pose="scratchHead" expression="thinking" x={280} y={2070} scale={2.4} />
    <Words lines={[{ t: 'WHY PRICES', size: 180 }, { t: 'END IN .99', size: 200, color: '#FFD978' }]} x={540} y={150} rotate={-3} ring="#25084A" />
  </CoverCanvas>
))

export const GYM22_1 = tall('gym22-1', '20261101-0412_your-gym-sells-22-memberships-per-spot',
  'A smug hero relaxes at home with an untouched dumbbell: the gym sold 22 memberships for every spot.', () => (
  <CoverCanvas canvas="tall">
    <Stage top="#7C5CFF" bottom="#3B2A9E" floor="#2A1D73" />
    <Part name="dumbbell" kind="object" x={560} y={1150} w={380} h={140}><Dumbbell x={750} y={1220} s={1.1} r={-8} /></Part>
    <Part name="card" kind="extra" x={620} y={830} w={340} h={220}><Card x={790} y={940} r={10} s={1.1} color={RED} text="GYM" /></Part>
    <Hero pose="leanBack" expression="smug" x={280} y={2070} scale={2.4} />
    <Words lines={[{ t: 'WHY YOUR GYM SELLS', size: 115 }, { t: '22 MEMBERSHIPS', size: 140, color: GOLD }, { t: 'PER SPOT', size: 160, color: GOLD }]} x={540} y={150} rotate={-3} ring="#1E1460" />
  </CoverCanvas>
))

export const INDEXS_1 = tall('indexs-1', '20261024-1153_your-index-fund-is-less-diversified-than-you-think',
  'A worried hero holds his index-fund basket while a few giant towers take up most of it.', () => (
  <CoverCanvas canvas="tall">
    <Stage top="#E9C25A" bottom="#B88A2E" floor="#7A5A1A" />
    <Thing name="basket" prop="grocery-basket" x={780} y={1110} size={430} />
    <Thing name="giants" prop="skyscraper" x={780} y={820} size={380} kind="extra" touches={['basket']} />
    <Hero pose="nervous" expression="worried" x={280} y={2070} scale={2.4} />
    <Words lines={[{ t: 'WHY YOUR INDEX FUND', size: 110 }, { t: 'IS LESS DIVERSIFIED', size: 110, color: RED }, { t: 'THAN YOU THINK', size: 135, color: RED }]} x={540} y={150} rotate={-3} ring="#3A2A00" />
  </CoverCanvas>
))

export { Pile }
