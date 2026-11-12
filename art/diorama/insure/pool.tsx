// ---------------------------------------------------------------- s9–s17: one big pool
// A) Drivers round a stone pool each drop in one coin (s9 chip); two unlucky bent cars, an umbrella opens over them (covered).
//    Five drivers with ? over each (s10 which); then a field of 100 markers = 10,000 drivers (s11); a jittery guess needle calms as the group grows (s12).
// B) Tiny pool of 10 drivers: one crash drains it (s13, fortune). Big pool of 10,000: one crash barely moves the level; it lands on the dashed guess (s14).
// C) 100 markers, 6 turn red (s15); 600 CLAIMS and a claim card of $17,500 (s16); the claims pipe pours out $10.5 MILLION (s17).
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, win } from '../aimoney/common'
import { camera } from '../aimoney/common'
import { C, Car, Coin, Defs, Dot, Flag, Grain, Land, Pipe, Reservoir, SkyBg, Umbrella, big, fadeIn, scene } from './kit'

const G = 900
const COL = [C.sea, C.roof, C.plum, C.greenD, C.goldD]
const Pool: React.FC<PieceProps> = ({ f, c }) => {
  const chip = c('s9:chip'), little = c('s9:little'), unlucky = c('s9:unlucky'), covered = c('s9:covered')
  const which = c('s10:which'), crashA = c('s10:crash'), tenK = c('s11:ten'), guess = c('s11:guess'), many = c('s11:many')
  const law = c('s12:law'), bigger = c('s12:bigger'), steadier = c('s12:steadier')
  const tiny = c('s13:tiny'), bad = c('s13:bad'), tenth = c('s13:tenth'), fortune = c('s13:fortune')
  const spread = c('s14:spread'), barely = c('s14:barely'), yearly = c('s14:yearly'), close = c('s14:close')
  const records = c('s15:records'), six = c('s15:six'), claim = c('s15:claim'), six2 = c('s16:six'), seventeen = c('s16:seventeen'), expect = c('s17:expect'), tenM = c('s17:ten')
  const AB = c('s13') - 6, BC = c('s15') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = fadeIn(f, BC)
  const a1 = f < which - 6 ? 1 : 1 - on(f, which - 6, 8), a2 = win(f, which - 4, tenK - 4, 8), a3 = on(f, tenK - 4, 8)
  return (
    <g transform={camera(f, ACC.map((k, i) => [c(k), 960, 540, i % 2 ? 1 : 1.035] as [number, number, number, number]), 18)}>
      <Defs />
      {A > 0 && <g opacity={A}>
        <SkyBg sky="noon" f={f} sun={[1720, 220]} />
        <Land f={f} G={G} sea={false} />
        {a1 > 0.01 && <g opacity={a1}>
          <Reservoir x={960} y={G + 20} w={560} h={240} level={0.15 + 0.45 * span(f, chip, chip + 60)} f={f} />
          {[...Array(8)].map((_, k) => { const x = k < 4 ? 260 + k * 110 : 1330 + (k - 4) * 110, t = span(f, chip + k * 4, chip + k * 4 + 22)
            return <g key={k}><Dot x={x} y={G + 30} s={2.2} col={COL[k % 5]} o={on(f, chip - 10 + k * 2, 8)} />
              {t > 0 && t < 1 && <Coin x={lerp(x, 960 + (k - 3.5) * 40, t)} y={lerp(G - 70, G - 160, t) - 120 * Math.sin(Math.PI * t)} r={20} />}</g> })}
          <g opacity={on(f, unlucky - 4, 8)}><Car x={760} y={G - 300} s={0.8} hue={C.roof} bent={1} /><Car x={1160} y={G - 300} s={0.8} hue={C.plum} bent={1} /></g>
          <Umbrella x={960} y={G - 520} s={lerp(0.3, 1.7, pop(f, covered - 2, 12))} o={on(f, covered - 2, 6)} />
        </g>}
        {a2 > 0.01 && <g opacity={a2}>
          {[...Array(5)].map((_, k) => <g key={k}><Dot x={460 + k * 250} y={G - 60} s={3} col={COL[k]} /><text x={460 + k * 250} y={G - 210} textAnchor="middle" fill={C.navy} opacity={on(f, which + k * 4, 6)} style={big(90)}>?</text></g>)}
          <Car x={lerp(-200, 960, on(f, crashA - 6, 14))} y={G + 70} s={0.9} hue={C.roof} o={on(f, crashA - 8, 6)} />
        </g>}
        {a3 > 0.01 && <g opacity={a3}>
          {[...Array(100)].map((_, k) => { const col = k % 20, row = Math.floor(k / 20)
            return <Dot key={k} x={lerp(320, 1600, col / 19) + (row % 2) * 18} y={420 + row * 70} s={1.2} col={COL[k % 5]} o={on(f, tenK - 4 + (k % 20), 6)} /> })}
          <Flag x={960} y={330} text="EACH ONE = 100 DRIVERS" size={36} o={on(f, tenK + 10, 8) * (1 - on(f, law - 6, 6))} />
          <g opacity={on(f, guess - 4, 8)}>
            <rect x={560} y={790} width={800} height={150} rx={20} fill={C.cream} stroke={C.navy} strokeWidth={5} />
            <line x1={600} y1={865} x2={1320} y2={865} stroke={C.green} strokeWidth={6} strokeDasharray="18 12" />
            {(() => { const calm = on(f, bigger, 40), amp = lerp(60, 6, calm); const pts = [...Array(36)].map((_, k) => `${600 + k * 20.5} ${865 + amp * Math.sin(k * 1.9 + f / 6) * (k % 3 ? 0.6 : 1)}`); return <polyline points={pts.join(' ')} fill="none" stroke={C.red} strokeWidth={5} /> })()}
            <Flag x={1440} y={865} text="YOUR GUESS" size={30} o={on(f, many, 8)} color={C.greenL} />
          </g>
          <Flag x={960} y={330} text="LAW OF LARGE NUMBERS" size={44} color={C.gold} o={on(f, law, 8)} />
          <Flag x={960} y={1010} text="BIGGER GROUP = STEADIER" size={36} o={on(f, steadier - 4, 8)} />
        </g>}
      </g>}
      {B > 0 && <g opacity={B}>
        <SkyBg sky="noon" f={f} sun={[1720, 220]} />
        <Land f={f} G={G} sea={false} />
        <g opacity={on(f, tiny - 4, 8)}>
          <Reservoir x={480} y={G + 10} w={300} h={260} level={lerp(0.7, 0.08, on(f, tenth, 30))} f={f} />
          {[...Array(10)].map((_, k) => <Dot key={k} x={300 + (k % 5) * 90} y={G + 90 + Math.floor(k / 5) * 60} s={1.4} col={k === 2 && f > bad ? C.red : COL[k % 5]} />)}
          <Car x={480} y={G - 330} s={0.8} hue={C.red} bent={on(f, bad, 6)} o={on(f, bad - 4, 6)} />
          <Flag x={480} y={G - 460} text="10 DRIVERS" size={36} />
          <Flag x={480} y={G - 140} text="A FORTUNE" size={40} color={C.red} ink="#fff" o={on(f, fortune - 4, 8)} />
        </g>
        <g opacity={on(f, spread - 4, 8)}>
          <Reservoir x={1400} y={G + 10} w={640} h={260} level={0.7 - 0.012 * on(f, barely - 10, 10)} f={f} />
          <line x1={1060} y1={G + 10 - 0.7 * 260} x2={1740} y2={G + 10 - 0.7 * 260} stroke={C.lamp} strokeWidth={6} strokeDasharray="20 12" opacity={on(f, yearly, 8)} />
          {[...Array(40)].map((_, k) => <Dot key={k} x={1110 + (k % 20) * 30} y={G + 80 + Math.floor(k / 20) * 50} s={0.8} col={COL[k % 5]} />)}
          <Car x={1400} y={G - 330} s={0.8} hue={C.red} bent={on(f, c('s14:crash'), 6)} o={on(f, c('s14:crash') - 4, 6)} />
          <Flag x={1400} y={G - 460} text="10,000 DRIVERS" size={36} />
          <Flag x={1400} y={G - 140} text="BARELY MOVES" size={40} color={C.green} ink="#fff" o={win(f, barely, close, 8)} />
          <Flag x={1400} y={G - 140} text="CLOSE TO YOUR GUESS" size={40} color={C.lamp} o={on(f, close - 2, 8)} />
        </g>
      </g>}
      {Cc > 0 && <g opacity={Cc}>
        <SkyBg sky="noon" f={f} sun={[1720, 220]} />
        <Land f={f} G={G} sea={false} />
        <g opacity={1 - on(f, expect - 6, 8)}>
          {[...Array(100)].map((_, k) => { const col = k % 20, row = Math.floor(k / 20), red = [7, 23, 38, 51, 66, 84].includes(k) && f >= six + [7, 23, 38, 51, 66, 84].indexOf(k) * 4
            return <Dot key={k} x={lerp(260, 1180, col / 19)} y={430 + row * 90} s={red ? 1.7 : 1.4} col={red ? C.red : C.stoneD} o={on(f, records - 4 + col, 6)} /> })}
          <Flag x={720} y={330} text="6 IN EVERY 100 CLAIM" size={40} color={C.red} ink="#fff" o={on(f, claim - 4, 8)} />
          <g opacity={on(f, six2 - 4, 8)}><Car x={1540} y={520} s={1.1} hue={C.roof} bent={1} /><Flag x={1540} y={620} text="600 CLAIMS" size={44} /></g>
          <g opacity={on(f, seventeen - 4, 8)} transform={`translate(1540 800) scale(${0.8 + 0.2 * pop(f, seventeen - 4, 10)})`}>
            <rect x={-170} y={-70} width={340} height={140} rx={14} fill={C.cream} stroke={C.ink} strokeWidth={5} /><text y={-18} textAnchor="middle" fill={C.inkSoft} style={big(34)}>AVERAGE CLAIM</text>
            <text y={44} textAnchor="middle" fill={C.ink} style={big(64)}>$17,500</text></g>
        </g>
        <g opacity={on(f, expect - 6, 8)}>
          <Reservoir x={700} y={G} w={600} h={330} level={0.8 - 0.3 * span(f, tenM, tenM + 60)} f={f} />
          <Pipe d={`M1000 ${G - 60} H1300 V${G - 10}`} f={f} flow={on(f, tenM - 6, 10)} />
          {[...Array(6)].map((_, k) => { const a = tenM + k * 9, t = span(f, a, a + 30); return f >= a && t < 1 ? <Coin key={k} x={1300 + 30 * Math.sin(k)} y={lerp(G, G + 120, t)} r={22} o={1 - t} /> : null })}
          <Flag x={1500} y={G - 260} text="CLAIMS: $10.5 MILLION" size={48} color={C.red} ink="#fff" o={on(f, tenM, 8)} />
          <Flag x={700} y={G - 400} text="YOUR POOL" size={40} o={on(f, expect, 8)} />
        </g>
      </g>}
      <Headline f={f} lines={[[chip, 'ONE BIG POOL', C.navy, 108], [tiny, 'SMALL GROUP VS BIG GROUP', C.navy, 96], [records, 'YOUR TOWN, ONE YEAR', C.navy, 100]]} />
      <Grain />
    </g>
  )
}
const ACC = ["s9:insurance","s9:trick","s12:statisticians","s13:drivers","s14:drivers","s15:say","s15:every","s16:average","s16:hundred#2"]  // # accent words: a gentle camera push on each (fills >2 s gaps)
const BEATS = ['s9:chip', 's9:little', 's9:unlucky', 's9:covered', 's10:which', 's10:crash', 's11:ten', 's11:guess', 's11:many', 's12:law', 's12:bigger', 's12:steadier', 's13:tiny', 's13:bad', 's13:tenth', 's13:fortune', 's14:spread', 's14:crash', 's14:barely', 's14:yearly', 's14:close', 's15:records', 's15:six', 's15:claim', 's16:six', 's16:seventeen', 's17:expect', 's17:ten']
export const IN_POOL = makePiece('ins-pool', 'Risk pooling: drivers drop coins into a stone pool, an umbrella opens over two bent cars; five drivers with ?; a field of 100 markers (each = 100 drivers) and a jittery red guess line that calms onto YOUR GUESS (LAW OF LARGE NUMBERS); tiny pool of 10 drivers drained by one crash (A FORTUNE) vs a big pool of 10,000 that BARELY MOVES and lands CLOSE TO YOUR GUESS; 6 in every 100 markers turn red, 600 CLAIMS, AVERAGE CLAIM $17,500, the claims pipe pours out CLAIMS: $10.5 MILLION', {
  mood: 'light', Component: Pool, beats: [...BEATS, ...ACC],
  sfx: [['s9:chip', 'coin', 0.1], ['s9:covered', 'swish', 0.12], ['s11:ten', 'tick', 0.08], ['s12:law', 'ding', 0.1], ['s13:bad', 'crack', 0.14], ['s14:barely', 'softpop', 0.1], ['s15:six', 'pop', 0.1], ['s16:seventeen', 'pop', 0.1], ['s17:ten', 'whoosh', 0.12]] })
