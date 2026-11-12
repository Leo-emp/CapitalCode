// ============================================================
// COVERS — "The Stock Market Fully Explained for Beginners"
// Drawn with this video's own art (art/diorama/market/kit.tsx): Market Street, Rosa's bakery split into shares,
// the auction, the roulette-vs-bakery contrast. Words = one full, true sentence (owner rule 2026-11-10).
// ============================================================
import React from 'react'
import { CoverCanvas, Burst, Glow, Ground, Sky } from './kit'
import { Hero, Part } from './cast'
import { Words } from './words'
import { makeCover } from './registry'
import { Bakery, Coin, M, Share } from '../diorama/market/kit'

const JOB = '20261111-0123_the-stock-market-fully-explained-for-beginners'
const INK = '#2A1E1A', GOLD = '#F4C95D'

// # 1 — the bakery cut into a grid, one glowing piece lifting out to the hero: what a share is
export const MARKET_1 = makeCover({
  id: 'market-1', job: JOB, canvas: 'wide',
  concept: 'A share is a slice of a business: Rosa\'s bakery front is cut into a grid and one glowing piece lifts out toward the hero, who points at it, amazed.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <Sky canvas="wide" top="#F7B98C" bottom="#FCE6CC" />
      <Burst canvas="wide" cx={1250} cy={560} color="#FFFFFF" opacity={0.2} rays={22} />
      <Glow id="b" x={1250} y={600} r={420} color={GOLD} opacity={0.35} />
      <Ground canvas="wide" y={1000} color="#B9A281" edge="#CFC3AE" />
      <Part name="bakery" kind="object" x={990} y={490} w={600} h={520}><Bakery x={1290} y={1000} s={1.08} f={0} grid={1} lift={1} glow={0.6} /></Part>
      <Hero who="hero" pose="point" expression="shocked" x={400} y={1330} scale={1.85} />
      <Words lines={[{ t: 'HOW THE', size: 110 }, { t: 'STOCK MARKET', size: 130, color: GOLD }, { t: 'ACTUALLY WORKS', size: 110 }]} x={1380} y={56} rotate={-2} ring={INK} />
    </CoverCanvas>
  ),
})

// # 2 — roulette wheel vs a working bakery: is it gambling?
export const MARKET_2 = makeCover({
  id: 'market-2', job: JOB, canvas: 'wide',
  concept: 'The doubt: a spinning roulette wheel on one side, Rosa\'s glowing bakery pouring coins on the other; the hero, thinking, weighs them.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <Sky canvas="wide" top="#5E4B7A" bottom="#E79C7A" />
      <Ground canvas="wide" y={1000} color="#8E6B4E" edge="#B98E62" />
      <Part name="wheel" kind="object" x={860} y={560} w={380} h={380}>
        <g transform="translate(1050 750)"><circle r={190} fill={M.woodD} /><circle r={165} fill="#2A2A30" />
          {Array.from({ length: 16 }, (_, k) => <path key={k} d={`M0 0 L${165 * Math.cos(k * Math.PI / 8)} ${165 * Math.sin(k * Math.PI / 8)} A165 165 0 0 1 ${165 * Math.cos((k + 1) * Math.PI / 8)} ${165 * Math.sin((k + 1) * Math.PI / 8)} Z`} fill={k % 2 ? M.red : '#22252E'} />)}<circle r={44} fill={M.gold} /></g></Part>
      <Part name="bakery" kind="object" x={1280} y={600} w={360} h={400}><Bakery x={1460} y={1000} s={0.68} f={0} glow={1} />
        {[0, 1, 2].map((k) => <Coin key={k} x={1540 + k * 40} y={600 - k * 50} s={0.55} />)}</Part>
      <Hero who="hero" pose="weighA" expression="thinking" x={400} y={1330} scale={1.85} />
      <Words lines={[{ t: 'IS THE STOCK', size: 112 }, { t: 'MARKET JUST', size: 112 }, { t: 'GAMBLING?', size: 140, color: GOLD }]} x={1380} y={56} rotate={-2} ring={INK} />
    </CoverCanvas>
  ),
})

// # 3 — the hero holds a share certificate; behind it, the whole bakery it owns a piece of
export const MARKET_3 = makeCover({
  id: 'market-3', job: JOB, canvas: 'wide',
  concept: 'What you really own: the hero holds up a share certificate in front of the bakery it is a piece of, with a dividend coin popping out.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <Sky canvas="wide" top="#8FCBE6" bottom="#E4F3EE" />
      <Burst canvas="wide" cx={1300} cy={620} color="#FFFFFF" opacity={0.18} rays={20} />
      <Ground canvas="wide" y={1000} color="#B9A281" edge="#CFC3AE" />
      <Part name="bakery" kind="object" x={1010} y={530} w={560} h={480}><Bakery x={1290} y={1000} s={1.0} f={0} /></Part>
      <Hero who="hero" pose="holdUp" expression="smiling" x={400} y={1330} scale={1.85}
        hold={(h) => <Part name="share" kind="object" x={h.x - 40} y={h.y - 200} w={300} h={210} touches={['hero']}><Share x={h.x + 110} y={h.y - 95} s={0.95} r={-6} /></Part>} />
      <Words lines={[{ t: 'WHAT YOU', size: 112 }, { t: 'REALLY OWN WHEN', size: 104 }, { t: 'YOU BUY A STOCK', size: 112, color: GOLD }]} x={1380} y={56} rotate={-2} ring={INK} />
    </CoverCanvas>
  ),
})

export const MARKET_COVERS = [MARKET_1, MARKET_2, MARKET_3]
