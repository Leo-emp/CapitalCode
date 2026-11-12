// ---------------------------------------------------------------- s1–s8: the hook.
// A) A saver drops a coin into a glass jar every month while a calendar flips; "40 years": a flag; "240,000 of your own
//    money": the coins they put in stack up beside the jar.
// B) A fee collector walks in with a long scoop; on "small" it takes a thin coral slice off the top, quietly. "By the
//    time you retire": the jar has grown tall; the collector's pile of scooped coins has grown too (≈ $268,000); a dotted
//    taller jar beside it shows the same money in a fund that charges almost nothing. "More than all the money you put
//    in": the fee pile stands next to the saver's own 240,000 stack — and is taller.
// C) The hero asks how; a tiny "1%" coin beside the big pile; four numbered steps pop up; a magnifier over the pile.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Calendar, Coin, fly, hand, Headline, Label, Person, win, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Magnifier } from '../power/kit2'
import { SaverJar, Scoop, Stack, Spot } from './kit'

const GROUND = 920

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const s1 = c('s1'), save = c('s1:save'), d500 = c('s1:500'), month = c('s1:month'), d40 = c('s1:40')
  const d240 = c('s2:240000'), own = c('s2:own'), money2 = c('s2:money')
  const s3 = c('s3'), fee3 = c('s3:fee'), small = c('s3:small'), notice = c('s3:notice'), d1 = c('s3:1')
  const example4 = c('s4:example'), retire = c('s4:retire'), cost4 = c('s4:cost'), d268 = c('s4:268000'), compared = c('s4:compared'), nothing4 = c('s4:nothing')
  const more5 = c('s5:more'), put5 = c('s5:put'), yourself = c('s5:yourself')
  const s6 = c('s6'), how6 = c('s6:how'), bigger = c('s6:bigger'), saved6 = c('s6:saved')
  const impossible = c('s7:impossible'), maths = c('s7:maths'), four = c('s7:four'), steps = c('s7:steps')
  const exactly = c('s8:exactly'), goes = c('s8:goes')
  const AB = s3 - 4, BC = s6 - 4
  const A = win(f, s1, AB), B = win(f, AB, BC), C = on(f, BC, 8)
  // # the saver's beats: drop a coin in, then look on
  const saverBeats: Beat[] = [[0, 'idle', 'smiling'], [save, 'hold', 'smiling'], [d500, 'reachDown', 'smiling', 'hold', 14], [d240, 'present', 'smiling']]
  return (
    <g>
      <Stage id="fe-hook" frame={f} />
      <Spot f={f} at={c("s4:fund")} x={200} y={560} rx={220} ry={320} />
      <Spot f={f} at={c("s4:putting")} x={200} y={560} rx={220} ry={320} />
      <Spot f={f} at={c("s8:video")} x={1200} y={700} rx={260} ry={220} />
      <Headline f={f} lines={[[d500, '$500 EVERY MONTH', P.ink, 104], [d40, '$500 A MONTH · 40 YEARS', P.ink, 100], [d240, '$240,000 OF YOUR OWN MONEY', P.ink, 96], [s3, '', P.ink], [d1, '1% A YEAR', P.coralInk, 116], [d268, '≈ $268,000', P.coralInk, 120], [more5, 'MORE THAN YOU PUT IN', P.coralInk, 104], [s6, '', P.ink], [four, '4 SIMPLE STEPS', P.ink, 104], [exactly, '', P.ink]]} />

      {/* # A) saving every month */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <Person f={f} who="buyer" beats={saverBeats} x={400} y={GROUND} s={0.85} />
        <SaverJar x={800} y={GROUND} w={340} h={460} fill={lerp(0.05, 0.55, span(f, d500, own))} label="SAVINGS" />
        {/* # a coin drops into the jar every ~10 frames from "500" */}
        {f >= d500 && f < own + 20 && (() => { const ph = ((f - d500) % 12) / 12; return <Coin x={lerp(560, 800, Math.min(1, ph * 1.6))} y={lerp(520, 520, ph) - Math.sin(Math.min(1, ph * 1.6) * Math.PI) * 60} s={0.6} o={1 - Math.max(0, ph - 0.8) * 5} /> })()}
        <g opacity={on(f, month, 8)}><Calendar x={1180} y={360} text={f < d40 ? 'MONTH' : 'YEAR'} s={1.2} flip={((f - month) % 8) / 8} /></g>
        {/* # the money you put in, stacking up */}
        <g opacity={on(f, d240, 10)}><Stack x={1500} y={GROUND - 10} n={Math.round(18 * on(f, d240, 30))} w={220} /></g>
        <g opacity={on(f, money2, 8)}><Label x={1500} y={GROUND + 70} text="YOUR OWN MONEY" size={52} font="Bebas Neue" color={P.ink} /></g>
      </g>}

      {/* # B) the fee collector and the scoop */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        {(() => {
          const grow = on(f, retire, 30), jarH = lerp(420, 620, grow)
          const colBeats: Beat[] = [[0, 'walkA', 'neutral', 'walkB', 12], [fee3 + 20, 'hold', 'smug'], [small, 'reachDown', 'smug'], [notice + 10, 'hold', 'smug'], [cost4, 'present', 'smug']]
          const cx = lerp(1100, 980, on(f, fee3, 24)), hp = hand(f, colBeats, cx, GROUND, 0.78)
          return <g>
            <SaverJar x={560} y={GROUND} h={jarH} w={lerp(320, 360, grow)} fill={lerp(0.55, 0.92, grow)} label="YOUR SAVINGS" cut={on(f, small, 8) * (1 - on(f, notice + 10, 8)) + on(f, cost4, 8)} />
            {/* # the same money in a fund that charges almost nothing: a taller dotted jar */}
            <g opacity={on(f, compared, 10)}>
              <SaverJar x={200} y={GROUND} w={280} h={jarH * 1.28} fill={0.95} />
              <Label x={200} y={GROUND + 70} text="ALMOST NO FEE" size={44} font="Bebas Neue" color={P.ink2} />
            </g>
            <Person f={f} who="owner" beats={colBeats} x={cx} y={GROUND} s={0.78} o={on(f, fee3, 10)} />
            <g opacity={on(f, fee3 + 6, 8)}><Scoop x={hp.x} y={hp.y} s={0.85} r={lerp(-20, 30, on(f, small, 10)) - 40 * on(f, notice, 10)} full={on(f, small + 6, 8)} /></g>
            {/* # the collector's pile of scooped coins grows; then it stands next to "you put in" */}
            <g opacity={on(f, cost4, 10)}><Stack x={1420} y={GROUND - 10} n={Math.round(20 * on(f, d268, 30))} w={210} color={P.coral} /></g>
            <g opacity={on(f, d268, 8)}><Label x={1420} y={GROUND + 70} text="FEE COST" size={52} font="Bebas Neue" color={P.coralInk} /></g>
            <g opacity={on(f, more5, 10)}><Stack x={1690} y={GROUND - 10} n={18} w={210} /><Label x={1680} y={GROUND + 70} text="YOU PUT IN" size={52} font="Bebas Neue" color={P.ink} /></g>
            <g opacity={on(f, yourself, 8)}><line x1={1300} y1={GROUND - 16 - 20 * 22} x2={1800} y2={GROUND - 16 - 20 * 22} stroke={P.coral} strokeWidth={6} strokeDasharray="12 8" /></g>
          </g>
        })()}
      </g>}

      {/* # C) how? — the hero, the tiny 1%, four steps, a magnifier over the pile */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <Person f={f} who="hero" beats={[[0, 'idle', 'neutral'], [how6, 'scratchHead', 'thinking'], [impossible, 'shrug', 'thinking'], [maths, 'explain', 'smiling'], [four, 'countOne', 'smiling'], [exactly, 'point', 'smiling']]} x={330} y={GROUND} s={0.85} />
        {/* # the tiny 1% coin vs the big pile */}
        <g opacity={on(f, how6 + 4, 8) * (1 - on(f, four, 8))}>
          <Coin x={720} y={GROUND - 120} s={2.0} text="1%" />
          <g opacity={on(f, bigger, 8)}><Stack x={1120} y={GROUND - 10} n={20} w={240} color={P.coral} /></g>
          <g opacity={on(f, saved6, 8)}><Stack x={1440} y={GROUND - 10} n={18} w={240} /></g>
        </g>
        {/* # four numbered steps rise */}
        {[0, 1, 2, 3].map((k) => <g key={k} opacity={on(f, four + k * 4, 8) * (1 - on(f, exactly, 8))} transform={`translate(${760 + k * 260} ${GROUND})`}>
          <rect x={-100} y={-(150 + k * 90) * on(f, four + k * 4, 14)} width={200} height={(150 + k * 90) * on(f, four + k * 4, 14)} rx={14} fill={[P.sky, P.gold, P.coral, P.mint][k]} />
          <text x={0} y={-(150 + k * 90) * on(f, four + k * 4, 14) + 80} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 80px "Bebas Neue"' }}>{k + 1}</text>
        </g>)}
        {/* # where the money goes: a magnifier over the fee pile */}
        <g opacity={on(f, exactly, 10)}>
          <Stack x={1200} y={GROUND - 10} n={16} w={220} color={P.coral} />
          <g transform={`translate(${lerp(1500, 1250, on(f, goes, 16))} 520)`}><Magnifier x={0} y={0} s={1}><Coin x={0} y={0} s={1.2} /></Magnifier></g>
        </g>
      </g>}
      <Vignette id="fe-hook" />
    </g>
  )
}

const BEATS = ['s1', 's1:save', 's1:500', 's1:month', 's1:40', 's2:240000', 's2:own', 's2:money', 's3', 's3:fee', 's3:small', 's3:notice', 's3:1', 's4:example', 's4:retire', 's4:cost', 's4:268000', 's4:compared', 's4:nothing', 's5:more', 's5:put', 's5:yourself', 's6', 's6:how', 's6:bigger', 's6:saved', 's7:impossible', 's7:maths', 's7:four', 's7:steps', 's8:exactly', 's8:goes', "s4:putting", "s8:video", "s4:fund"]
export const FE_HOOK = makePiece('fe-hook', 'Fee long: a saver drops $500 a month into a jar for 40 years ($240,000); a fee collector scoops 1% off the top; by retirement the fee pile (~$268,000) beats what they put in; how? four steps', {
  mood: 'light', Component: Hook, beats: BEATS,
  sfx: [['s1:500', 'coin', 0.3], ['s2:240000', 'cash', 0.3], ['s3:fee', 'whoosh', 0.25], ['s3:small', 'swish', 0.3], ['s4:268000', 'thud', 0.35], ['s5:more', 'ding', 0.3], ['s7:four', 'pop', 0.25], ['s8:goes', 'swish', 0.25]] })
