// ---------------------------------------------------------------- s1–s7: the hook (cream).
// A) A quiet room: a JANUARY 2000 calendar; a hand-drawn $100 bill goes into the dresser drawer, which slides shut.
//    "Today" → the calendar flips to TODAY, the drawer slides open, the bill still says $100.
// B) Two baskets side by side: what $100 bought in 2000 (full, ten items) vs what it buys now (five items).
//    "Nobody stole anything": a sneaky figure crossed out. "Time quietly took about half": an hourglass drains while
//    five items lift out of the right basket.
// C) Time works both ways: an hourglass in the middle, a coin tower growing on the left (FOR YOU) and one shrinking on
//    the right (AGAINST YOU). Four idea badges light up. Ava steps in.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, hand, win, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { CalPage, DollarBill, NoMark, StepBadge } from '../bank/kit'
import { Mini } from '../../rig/Mini'
import { Basket, CoinTower, Dresser, Hourglass, Room, Window } from './kit'

const GROUND = 930

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const hid = c('s1:hid'), d100 = c('s1:100'), drawer1 = c('s1:drawer'), january = c('s1:january'), y2000 = c('s1:2000')
  const today = c('s2:today'), open2 = c('s2:open'), bill2 = c('s2:bill'), says = c('s2:says')
  const buys3 = c('s3:buys'), only3 = c('s3:only'), d50 = c('s3:50'), back3 = c('s3:back')
  const nobody = c('s4:nobody'), stole = c('s4:stole'), sat = c('s4:sat'), time4 = c('s4:time'), took = c('s4:took'), half4 = c('s4:half')
  const way6 = c('s6:way'), comes6 = c('s6:comes'), all5 = c('s5:all'), sometimes5 = c('s5:sometimes'), time5 = c('s5:time'), works5 = c('s5:works'), you5 = c('s5:you'), against5 = c('s5:against')
  const four6 = c('s6:four'), ideas6 = c('s6:ideas'), rarely = c('s6:rarely')
  const one7 = c('s7:one'), saver7 = c('s7:saver'), ava7 = c('s7:ava')

  const AB = buys3 - 8, BC = time5 - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  // # A) the drawer: opens on "hid", the bill drops in on "drawer", shuts, reopens on "open"
  const openA = on(f, hid, 10) * (1 - on(f, drawer1 + 10, 10)) + on(f, open2, 12)
  const billIn = on(f, d100, 8) * (1 - on(f, bill2, 6))
  const aBeats: Beat[] = [[0, 'idle', 'smiling'], [hid, 'offer', 'smiling'], [today, 'reachDown', 'smiling'], [bill2, 'holdUp', 'smiling'], [says, 'present', 'smiling']]
  const hp = hand(f, aBeats, 330, GROUND, 1.1)
  // # B) items lifting out of today's basket
  const lifted = (i: number) => (i >= 5 ? on(f, lerp(took, half4 + 6, (i - 5) / 4), 10) : 0)

  return (
    <g>
      <Stage id="m4-hook" frame={f} />

      {/* # A) the drawer */}
      {A > 0 && <g opacity={A}>
        <Room ground={GROUND} />
        <Window x={1500} y={430} s={1.1} />
        <Dresser x={820} y={GROUND} s={1.25} open={openA}>
          <g opacity={billIn}><DollarBill x={0} y={-6} s={0.9} t="$100" /></g>
        </Dresser>
        <g opacity={on(f, january, 8)} transform={`translate(1500 ${760 - 12 * pop(f, today, 12)})`}><CalPage x={0} y={0} s={1.0} m={f >= today ? 'TODAY' : 'JANUARY'} d={f >= today ? '2026' : f >= y2000 ? '2000' : ''} col={f >= today ? '#2E5C9A' : '#C94A3E'} /></g>
        <Person f={f} who="investorF" beats={aBeats} x={330} y={GROUND} s={1.1} />
        {/* the bill held up on "bill" */}
        <g opacity={on(f, bill2, 8)} transform={`translate(${hp.x + 110} ${hp.y - 20 - 10 * pop(f, says, 12)})`}><DollarBill x={0} y={0} s={1.0} r={-8} t="$100" /></g>
      </g>}

      {/* # B) two baskets */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <g transform="translate(470 0)">
          <Basket x={0} y={760} s={1.6} shown={10} />
          <Label x={0} y={880} text="$100 IN 2000" size={54} font="Bebas Neue" color={P.ink} />
        </g>
        <g opacity={on(f, only3, 8)} transform="translate(1450 0)">
          <Basket x={0} y={760} s={1.6} shown={10 - Math.floor(5 * span(f, took, half4 + 10) + 0.001)} pop={Array.from({ length: 10 }, (_, i) => 2 * lifted(i))} />
          {/* lifted items float away upwards, fading */}
          <Label x={0} y={880} text={f >= d50 ? '$100 TODAY' : '$100 TODAY…'} size={54} font="Bebas Neue" color={P.coralInk} />
        </g>
        <g opacity={on(f, d50, 8) * (1 - on(f, nobody, 8))}><Label x={960} y={520} text="≈ HALF" size={80} font="Bebas Neue" color={P.coralInk} /></g>
        {/* the sneaky figure, crossed */}
        <g opacity={win(f, nobody, sat, 8)}><Mini look="worker" x={960} y={GROUND} scale={0.9} frame={f} seed={5} mood="neutral" /><NoMark x={960} y={800} o={on(f, stole, 8)} r={110} /></g>
        <g opacity={on(f, time4, 10)}><Hourglass x={960} y={560} s={0.9} t={span(f, time4, half4 + 20)} /></g>
      </g>}

      {/* # C) time works both ways; four ideas; Ava */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <g opacity={1 - on(f, four6, 10)}>
          <Hourglass x={960} y={640 - 16 * pop(f, way6, 12) - 16 * pop(f, comes6, 12)} s={1.1} t={span(f, BC, four6)} r={180 * on(f, all5, 16) + 180 * on(f, against5, 16)} />
          <g opacity={on(f, sometimes5, 8)}><CoinTower x={460} y={GROUND - 10} n={2 + 10 * span(f, works5, against5 + 20)} /><Label x={460} y={GROUND + 70} text="FOR YOU" size={56} font="Bebas Neue" color={P.mintInk} /></g>
          <g opacity={on(f, against5, 8)}><CoinTower x={1460} y={GROUND - 10} n={12 - 10 * span(f, against5, four6)} red /><Label x={1460} y={GROUND + 70} text="AGAINST YOU" size={56} font="Bebas Neue" color={P.coralInk} /></g>
        </g>
        {([[four6, 'INFLATION'], [ideas6, 'REAL RETURN'], [rarely, 'COMPOUNDING'], [c('s6:simply'), 'DEBT COMPOUNDING']] as [number, string][]).map(([at, t], k) =>
          <StepBadge key={k} x={600 + k * 330} y={600 - 16 * pop(f, at, 14)} n={k + 1} t={t} o={on(f, at, 8)} lit={win(f, at, at + 24, 6)} />)}
        <g opacity={on(f, one7, 10)}><Person f={f} who="investorF" beats={[[one7, 'idle', 'smiling'], [saver7, 'waveA', 'smiling'], [ava7, 'present', 'smiling']]} x={230} y={GROUND} s={1.05} />
          <g opacity={on(f, ava7, 8)}><Label x={230} y={GROUND + 64} text="AVA (MADE-UP SAVER)" size={44} font="Bebas Neue" color={P.ink} /></g></g>
      </g>}
      <Headline f={f} lines={[[hid, '$100 IN A DRAWER, JANUARY 2000', P.ink, 96], [today, 'TODAY: STILL SAYS $100', P.ink, 104], [buys3, 'BUT IT BUYS ABOUT HALF', P.coralInk, 104], [nobody, 'NOBODY STOLE IT', P.ink, 106], [time4, 'TIME TOOK IT', P.coralInk, 110], [time5, 'TIME WORKS BOTH WAYS', P.ink, 106], [four6, '4 SIMPLE IDEAS', P.ink, 110]]} />
      <Vignette id="m4-hook" />
    </g>
  )
}

const BEATS = ['s6:way', 's6:comes', 's5:all', 's5:sometimes', 's1:hid', 's1:100', 's1:drawer', 's1:january', 's1:2000', 's2:today', 's2:open', 's2:drawer', 's2:bill', 's2:says', 's2:100', 's3:buys', 's3:only', 's3:50', 's3:back', 's4:nobody', 's4:stole', 's4:sat', 's4:time', 's4:took', 's4:half', 's5:time', 's5:works', 's5:against', 's6:four', 's6:ideas', 's6:rarely', 's6:simply', 's7:one', 's7:saver', 's7:ava']
export const M4_HOOK = makePiece('m4-hook', 'Money ideas hook: a $100 bill goes into a dresser drawer in January 2000; today the drawer opens and the bill still says $100; two baskets — full for $100 in 2000, half the items lift out of today’s; a sneaky figure crossed out (nobody stole it); an hourglass drains (time took it); time works both ways: a coin tower grows FOR YOU and one shrinks AGAINST YOU; four idea badges; Ava the made-up saver', {
  mood: 'light', Component: Hook, beats: BEATS,
  sfx: [['s1:drawer', 'thud', 0.15], ['s2:open', 'pop', 0.15], ['s3:50', 'thud', 0.2], ['s4:stole', 'thud', 0.15], ['s6:four', 'pop', 0.25]] })
