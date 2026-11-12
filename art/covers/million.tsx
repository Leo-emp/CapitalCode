// ============================================================
// COVERS — "If I Had 1 Million Dollars to Invest Today"
// Story: a million is a machine that pays about $40,000 a year, not a
// never-work-again pile. Picture: Leo, shocked, holds up the small
// $40,000 paycheck the giant $1,000,000 money machine just paid out.
// ============================================================
import React from 'react'
import { CoverCanvas, Burst, Ground, Glow, Sky } from './kit'
import { Hero, Part } from './cast'
import { Words } from './words'
import { makeCover } from './registry'
import { Machine, Paycheck } from '../diorama/million/kit'

const JOB = '20261109-1403_if-i-had-1-million-dollars-to-invest-today'
const GOLD = '#F2B632', NAVY = '#16294A'

// # 1 — shocked Leo holds the $40,000 paycheck in front of the huge $1M machine
export const MILLION_1 = makeCover({
  id: 'million-1', job: JOB, canvas: 'wide',
  concept: 'What a million really pays: a giant money machine labelled $1,000,000 drops one $40,000 paycheck; Leo holds it up, shocked — far less than "never work again".',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <Sky canvas="wide" top="#2FB38C" bottom="#11624F" />
      <Burst canvas="wide" cx={1340} cy={560} color="#FFFFFF" opacity={0.16} rays={22} />
      <Glow id="mach" x={1340} y={600} r={460} color={GOLD} opacity={0.38} />
      <Ground canvas="wide" y={1000} color="#0B3F33" edge="#3FD1A3" />
      <Part name="machine" kind="object" x={1010} y={300} w={680} h={710}><Machine x={1340} y={1000} s={1.15} f={40} plate="$1,000,000" /></Part>
      <Hero who="investor" pose="holdUp" expression="shocked" x={420} y={1390} scale={2.05}
        hold={(h) => <Part name="paycheck" kind="object" x={h.x - 30} y={h.y - 230} w={360} h={220} touches={['hero']}><Paycheck x={h.x + 150} y={h.y - 120} s={0.95} r={-6} amt="$40,000" sub="A YEAR" /></Part>} />
      <Words lines={[{ t: 'WHAT $1 MILLION', size: 112 }, { t: 'REALLY PAYS', size: 140, color: GOLD }]} x={1300} y={40} rotate={-2} ring={NAVY} />
    </CoverCanvas>
  ),
})
