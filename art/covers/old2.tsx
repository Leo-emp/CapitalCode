// ============================================================
// COVERS — packaged long videos, batch 2 (re-covered 2026-11-09):
// salary, buybacks, gift cards, AI in subscriptions, Uber,
// stablecoins, free stock apps, index fund concentration.
// v2 (2026-11-10): full-sentence words; the scene shows the story.
// ============================================================
import React from 'react'
import { Burst, CoverCanvas, Glow, Ground, Sky } from './kit'
import { Hero, Part, Thing } from './cast'
import { Arrow, Words } from './words'
import { makeCover } from './registry'
import { Card, GOLD, Phone, Pile, RED, Tag } from './draw'

const wide = (id: string, job: string, concept: string, C: React.FC) => makeCover({ id, job, canvas: 'wide', concept, Component: C })

export const SALARY_1 = wide('salary-1', '20261029-1442_why-a-higher-salary-can-still-leave-you-broke',
  'The salary arrow shoots up, yet the worried hero turns out empty pockets beside an empty wallet.', () => (
  <CoverCanvas canvas="wide">
    <Sky canvas="wide" top="#3DAA6E" bottom="#1C5E3A" />
    <Burst canvas="wide" cx={1150} cy={700} color="#FFFFFF" opacity={0.14} />
    <Ground canvas="wide" y={960} color="#0E3A22" />
    <Thing name="up" prop="arrow-up" x={1060} y={720} size={440} />
    <Part name="tag" kind="object" x={880} y={820} w={300} h={150} touches={['up']}><Tag x={1020} y={895} text="SALARY" s={0.95} r={-6} color="#FFE27A" /></Part>
    <Thing name="wallet" prop="wallet" x={1460} y={820} size={280} />
    <Hero pose="emptyPockets" expression="worried" x={380} y={1310} scale={1.85} />
    <Words lines={[{ t: 'WHY A BIGGER SALARY', size: 105 }, { t: 'CAN STILL', size: 130, color: GOLD }, { t: 'LEAVE YOU BROKE', size: 130, color: GOLD }]} x={1380} y={64} rotate={-3} ring="#0E3A22" />
  </CoverCanvas>
))

export const BUYBACK_1 = wide('buyback-1', '20261101-1543_why-companies-buy-back-their-own-stock',
  'A thinking hero watches a company tower pull its own shares back in.', () => (
  <CoverCanvas canvas="wide">
    <Sky canvas="wide" top="#2B4A78" bottom="#0E1B33" />
    <Glow id="tower" x={1150} y={700} r={420} color="#5BCBFF" opacity={0.35} />
    <Ground canvas="wide" y={960} color="#0B1426" />
    <Thing name="company" prop="skyscraper" x={1100} y={720} size={480} />
    <Thing name="share" prop="stock-certificate" x={1520} y={800} size={260} rotate={-10} />
    <Arrow name="back" from={[1440, 700]} to={[1250, 640]} bend={0.3} />
    <Hero pose="scratchHead" expression="thinking" x={340} y={1310} scale={1.85} />
    <Words lines={[{ t: 'WHY COMPANIES', size: 125 }, { t: 'BUY BACK', size: 135, color: GOLD }, { t: 'THEIR OWN STOCK', size: 130, color: GOLD }]} x={1380} y={64} rotate={-3} ring="#0B1426" />
  </CoverCanvas>
))

export const GIFT_1 = wide('gift-1', '20261101-0228_why-companies-love-selling-you-gift-cards',
  'A smiling hero holds up a gift card while the store behind him already sits on the cash.', () => (
  <CoverCanvas canvas="wide">
    <Sky canvas="wide" top="#FF7A9C" bottom="#B03A6A" />
    <Burst canvas="wide" cx={1150} cy={700} color="#FFFFFF" opacity={0.18} />
    <Ground canvas="wide" y={960} color="#6E1F44" />
    <Thing name="store" prop="shop-mini" x={1150} y={720} size={440} />
    <Part name="cash" kind="extra" x={1300} y={830} w={380} h={170} touches={['store']}><Pile x={1490} y={960} w={360} r={36} /></Part>
    <Hero pose="holdUp" expression="smiling" x={360} y={1310} scale={1.85}
      hold={(h) => <Part name="gift" kind="object" x={h.x - 20} y={h.y - 180} w={300} h={200} touches={['hero']}><Card x={h.x + 120} y={h.y - 80} r={-12} s={0.95} color="#8E3FD0" text="GIFT" /></Part>} />
    <Words lines={[{ t: 'WHY COMPANIES LOVE', size: 110 }, { t: 'SELLING YOU', size: 130, color: '#FFE27A' }, { t: 'GIFT CARDS', size: 150, color: '#FFE27A' }]} x={1380} y={50} rotate={-3} ring="#4A0E2C" />
  </CoverCanvas>
))

export const AIBUNDLE_1 = wide('aibundle-1', '20261102-1636_you-re-already-paying-for-ai-even-if-you-never-use-it',
  'An angry hero holds his subscription app while an AI robot sits inside the price with a +$30 tag.', () => (
  <CoverCanvas canvas="wide">
    <Sky canvas="wide" top="#1E3A63" bottom="#0B1426" />
    <Glow id="robot" x={1200} y={720} r={400} color="#5BCBFF" opacity={0.4} />
    <Thing name="robot" prop="robot-head" x={1160} y={720} size={420} />
    <Part name="tag" kind="object" x={1360} y={800} w={320} h={170}><Tag x={1520} y={885} text="+$30/YR" s={1.05} r={-8} color="#FFE27A" /></Part>
    <Hero pose="holdUp" expression="angry" x={340} y={1310} scale={1.85}
      hold={(h) => <Part name="phone" kind="extra" x={h.x - 20} y={h.y - 270} w={180} h={340} touches={['hero']}><Phone x={h.x + 70} y={h.y - 100} s={0.85} r={-8} text="AI" /></Part>} />
    <Words lines={[{ t: "HOW YOU'RE ALREADY", size: 115 }, { t: 'PAYING FOR AI', size: 150, color: '#5BCBFF' }]} x={1380} y={64} rotate={-3} ring="#0B1426" />
  </CoverCanvas>
))

export const UBER_1 = wide('uber-1', '20261102-0900_your-cheap-uber-rides-were-paid-for-by-investors',
  'A happy rider gives a thumbs-up for a cheap trip while a worried investor carries his money bag to the car.', () => (
  <CoverCanvas canvas="wide">
    <Sky canvas="wide" top="#1C2433" bottom="#07090E" />
    <Burst canvas="wide" cx={1150} cy={720} color={GOLD} opacity={0.14} />
    <Ground canvas="wide" y={950} color="#05070C" edge="#3A5F93" />
    <Thing name="car" prop="car" x={1080} y={800} size={500} />
    <Arrow name="pays" from={[1450, 680]} to={[1270, 700]} bend={-0.3} />
    <Hero name="investor" who="investor" main={false} pose="carry" expression="worried" x={1570} y={1010} scale={1.0} flip
      hold={(h) => <Thing name="bag" prop="money-bag" x={h.x} y={h.y - 30} size={200} shadow={false} touches={['investor']} />} />
    <Hero pose="thumbsUp" expression="smiling" x={330} y={1310} scale={1.85} />
    <Words lines={[{ t: 'WHO REALLY PAID', size: 120 }, { t: 'FOR YOUR', size: 130, color: GOLD }, { t: 'CHEAP UBER RIDES', size: 125, color: GOLD }]} x={1380} y={50} rotate={-3} ring="#0B1426" />
  </CoverCanvas>
))

export const CRYPTO_1 = wide('crypto-1', '20261101-1524_your-crypto-dollar-earns-interest-just-not-for-you',
  'A puzzled hero holds his crypto dollar while the company behind it collects the interest pile.', () => (
  <CoverCanvas canvas="wide">
    <Sky canvas="wide" top="#3B2A9E" bottom="#140A40" />
    <Glow id="pct" x={1200} y={700} r={420} color={GOLD} opacity={0.35} />
    <Thing name="interest" prop="interest-percent" x={1180} y={690} size={380} />
    <Part name="pile" kind="extra" x={1300} y={830} w={400} h={170} touches={['interest']}><Pile x={1500} y={960} w={380} r={36} /></Part>
    <Hero pose="holdUp" expression="thinking" x={340} y={1310} scale={1.85}
      hold={(h) => <Thing name="coin" prop="crypto-coin" x={h.x + 70} y={h.y - 80} size={230} shadow={false} touches={['hero']} />} />
    <Words lines={[{ t: 'WHO EARNS THE INTEREST', size: 100 }, { t: 'ON YOUR', size: 130, color: GOLD }, { t: 'CRYPTO DOLLAR?', size: 135, color: GOLD }]} x={1370} y={64} rotate={-3} ring="#140A40" />
  </CoverCanvas>
))

export const STOCKAPP_1 = wide('stockapp-1', '20261102-0255_your-free-stock-app-gets-paid-every-time-you-trade',
  'A happy hero taps FREE on his trading app while a trading firm behind it walks off with a bag of money from his trades.', () => (
  <CoverCanvas canvas="wide">
    <Sky canvas="wide" top="#3DDC97" bottom="#127A4A" />
    <Burst canvas="wide" cx={1150} cy={720} color="#FFFFFF" opacity={0.16} />
    <Ground canvas="wide" y={970} color="#0B4A2C" />
    <Hero name="firm" who="buyer" main={false} pose="carry" expression="smug" x={1250} y={1010} scale={1.05}
      hold={(h) => <Thing name="bag" prop="money-bag" x={h.x} y={h.y - 30} size={200} shadow={false} touches={['firm']} />} />
    <Part name="pile" kind="extra" x={1420} y={830} w={340} h={170}><Pile x={1590} y={960} w={300} r={32} /></Part>
    <Hero pose="holdUp" expression="smiling" x={360} y={1310} scale={1.85}
      hold={(h) => <Part name="phone" kind="object" x={h.x - 20} y={h.y - 270} w={200} h={360} touches={['hero']}><Phone x={h.x + 80} y={h.y - 90} s={0.9} r={-8} text="FREE" screen="#FFE27A" /></Part>} />
    <Words lines={[{ t: 'HOW FREE STOCK APPS', size: 105 }, { t: 'MAKE MONEY', size: 130, color: '#FFE27A' }, { t: 'FROM YOUR TRADES', size: 125, color: '#FFE27A' }]} x={1380} y={50} rotate={-3} ring="#0B3A22" />
  </CoverCanvas>
))

export const INDEX_1 = wide('index-1', '20261024-1153_your-index-fund-is-less-diversified-than-you-think',
  'A worried hero looks at a basket meant for 500 companies, but a few giant towers fill most of it.', () => (
  <CoverCanvas canvas="wide">
    <Sky canvas="wide" top="#E9C25A" bottom="#B88A2E" />
    <Burst canvas="wide" cx={1150} cy={720} color="#FFFFFF" opacity={0.22} />
    <Thing name="basket" prop="grocery-basket" x={1150} y={830} size={460} />
    <Thing name="giants" prop="skyscraper" x={1150} y={600} size={300} kind="extra" touches={['basket']} />
    <Hero pose="nervous" expression="worried" x={340} y={1310} scale={1.85} />
    <Words lines={[{ t: 'WHY YOUR INDEX FUND', size: 105 }, { t: 'IS LESS DIVERSIFIED', size: 105, color: RED }, { t: 'THAN YOU THINK', size: 130, color: RED }]} x={1360} y={50} rotate={-3} ring="#3A2A00" />
  </CoverCanvas>
))
