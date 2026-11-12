// ============================================================
// COVERS — "How Inflation Actually Works"
// Drawn with this video's own art (art/diorama/inflate/kit.tsx): grandma's 100-dollar bill and a half-empty bag,
// the Fed's brass thermostat set to 2 %, and the mango stall whose price board climbs. Words = one full, true sentence.
// ============================================================
import React from 'react'
import { CoverCanvas, Burst, Glow, Ground, Sky } from './kit'
import { Hero, Part } from './cast'
import { Words } from './words'
import { makeCover } from './registry'
import { Bag, Bill, K, Mango, Pile, Stall, Tag, Thermostat } from '../diorama/inflate/kit'

const JOB = '20261112-0142_how-inflation-actually-works'
const INK = '#2E2140', SUN = '#F7C548'

// # 1 — grandma's bill glows, the bag beside it is half empty: prices doubled
export const INFLATE_1 = makeCover({
  id: 'inflate-1', job: JOB, canvas: 'wide',
  concept: 'The stake: a crisp 100-dollar bill glows next to a grocery bag that is only half full, price tags floating up around it; the hero stares, shocked.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <Sky canvas="wide" top="#F9C98A" bottom="#FDEBC8" />
      <Burst canvas="wide" cx={1250} cy={620} color="#FFFFFF" opacity={0.2} rays={22} />
      <Ground canvas="wide" y={1000} color="#A4704A" edge="#FBEBD3" />
      <Part name="bill" kind="object" x={900} y={520} w={480} h={260}><Bill x={1140} y={650} s={1.5} r={-8} glow={1} /></Part>
      <Part name="bag" kind="object" x={1330} y={640} w={340} h={330}><Bag x={1500} y={960} s={1.25} fill={0.5} /></Part>
      {[[1380, 560, '$4'], [1680, 600, '$6']].map(([x, y, t], k) => <Tag key={k} x={x as number} y={y as number} s={1.1} text={t as string} color={K.coral} r={k ? 8 : -8} />)}
      <Hero who="hero" pose="shock" expression="shocked" x={400} y={1330} scale={1.85} />
      <Words lines={[{ t: 'PRICES DOUBLED', size: 120, color: SUN }, { t: 'SINCE 2000', size: 120 }]} x={1380} y={70} rotate={-2} ring={INK} />
    </CoverCanvas>
  ),
})

// # 2 — the Fed's thermostat with its needle on the 2 % notch
export const INFLATE_2 = makeCover({
  id: 'inflate-2', job: JOB, canvas: 'wide',
  concept: 'The surprise: a giant brass thermostat with its needle on the green 2 % notch, the hot side glowing red; the hero points at it, thinking — the Fed wants some inflation.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <Sky canvas="wide" top="#B3A4DE" bottom="#EDE6FB" />
      <Glow id="t" x={1200} y={700} r={440} color="#F27B5B" opacity={0.25} />
      <Ground canvas="wide" y={1000} color="#7C5032" edge="#4A3466" />
      <Part name="thermostat" kind="object" x={950} y={450} w={500} h={500}><Thermostat x={1200} y={700} s={0.98} value={2} goal={1} text="2%" /></Part>
      <Hero who="hero" pose="point" expression="thinking" x={400} y={1330} scale={1.85} />
      <Words lines={[{ t: 'WHY THE FED', size: 112 }, { t: 'WANTS 2%', size: 140, color: SUN }, { t: 'INFLATION', size: 112 }]} x={1400} y={40} rotate={-2} ring={INK} />
    </CoverCanvas>
  ),
})

// # 3 — the mango stall: same mangoes, the price board jumps
export const INFLATE_3 = makeCover({
  id: 'inflate-3', job: JOB, canvas: 'wide',
  concept: 'The mechanism: an island mango stall piled with mangoes, its price board jumping from $2 to $3 in red as coins pour in; the hero, shocked, holds one mango.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <Sky canvas="wide" top="#7FD0EC" bottom="#E3F6FB" />
      <Burst canvas="wide" cx={1250} cy={640} color="#FFFFFF" opacity={0.18} rays={20} />
      <Ground canvas="wide" y={1000} color="#DDBB7C" edge="#F3D9A4" />
      <Part name="stall" kind="object" x={960} y={480} w={620} h={520}><Stall x={1270} y={1000} s={1} price="$3" priceColor={K.coral}><Pile x={0} y={-150} s={1.05} full={1} /></Stall></Part>
      <Hero who="hero" pose="holdUp" expression="shocked" x={400} y={1330} scale={1.85}
        hold={(h) => <Part name="mango" kind="object" x={h.x - 60} y={h.y - 120} w={160} h={130} touches={['hero']}><Mango x={h.x + 20} y={h.y - 60} s={1.6} /></Part>} />
      <Words lines={[{ t: 'WHAT REALLY', size: 112 }, { t: 'MAKES PRICES', size: 112 }, { t: 'RISE', size: 150, color: SUN }]} x={1400} y={40} rotate={-2} ring={INK} />
    </CoverCanvas>
  ),
})

export const INFLATE_COVERS = [INFLATE_1, INFLATE_2, INFLATE_3]
