// ---------------------------------------------------------------- s103–s107: the answer.
// A) The hero beside the family's opened bill; an AI chip floats up as if to become its own line on it — the hero crosses
//    his arms and shakes his head (it does not show up as its own line).
// B) "Inside a promise": the promise scroll unrolls and inside it a power plant stands ready under a hot sun (the busiest
//    day); the AI chip slips into the scroll.
// C) "Everyone pays the same price": a row of people each hold out the same coin; the AI chip's coin breaks into small
//    pieces that drop into their hands; they shrug ("may never use it").
// D) "The next time your power bill goes up": the family's bill rises in the window; a long wire stretches from their home
//    across the land to a data center far away on the horizon ("hundreds of miles away").
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Bill as Envelope, Coin, Person, win } from '../aimoney/common'
import { DataHall, Home, PowerPlant, Pylon, Wire } from './kit'
import { Clouds, Ground, Scroll, Sun } from './kit2'

const GROUND = 920
const Chip: React.FC<{ x: number; y: number; s?: number; o?: number; f: number }> = ({ x, y, s = 1, o = 1, f }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle r={90} fill={P.sky} opacity={0.15 + 0.08 * Math.sin(f / 6)} />
    <rect x={-56} y={-40} width={112} height={80} rx={10} fill="#2A3F6E" stroke={P.sky} strokeWidth={5} />
    {[-36, -12, 12, 36].map((dx) => <g key={dx}><rect x={dx - 4} y={-56} width={8} height={16} fill={P.sky} /><rect x={dx - 4} y={40} width={8} height={16} fill={P.sky} /></g>)}
    <text y={14} textAnchor="middle" fill={P.sky} style={{ font: '400 44px "Bebas Neue"', letterSpacing: 2 }}>AI</text>
  </g>
)

const Payoff: React.FC<PieceProps> = ({ f, c }) => {
  const answer = c('s103:answer'), ai104 = c('s104:ai'), not104 = c('s104:not'), show104 = c('s104:show'), line = c('s104:line')
  const s105 = c('s105'), inside = c('s105:inside'), promise = c('s105:promise'), keeping = c('s105:keeping'), ready = c('s105:ready'), busiest = c('s105:busiest')
  const everyone = c('s106:everyone'), same = c('s106:same'), price106 = c('s106:price'), part = c('s106:part'), boom = c('s106:boom'), shared = c('s106:shared'), people = c('s106:people'), never = c('s106:never')
  const s107 = c('s107'), bill107 = c('s107:bill'), up = c('s107:up'), reason = c('s107:reason'), building = c('s107:building'), computers = c('s107:computers'), hundreds = c('s107:hundreds'), miles = c('s107:miles'), away = c('s107:away')
  const AB = s105 - 4, BC = c('s106') - 4, CD = s107 - 4
  const A = win(f, answer, AB), B = win(f, AB, BC), C = win(f, BC, CD), D = on(f, CD, 8)
  return (
    <g>
      <Stage id="pw-payoff" frame={f} />

      {/* # A) AI does not show up as its own line: the hero says no */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <g transform={`translate(860 520)`}>
          <rect x={-260} y={-300} width={520} height={600} rx={18} fill={P.paper} stroke={P.edge} strokeWidth={4} />
          <rect x={-260} y={-300} width={520} height={80} rx={18} fill={P.skyD} />
          {/* # the bill's parts as small drawings: a pole, a bulb, a scroll */}
          <g transform="translate(-140 -110) scale(0.35)"><rect x={-14} y={-200} width={28} height={200} fill="#8A6A44" /><rect x={-90} y={-190} width={180} height={18} fill="#6E5236" /></g>
          <g transform="translate(-140 50)"><circle r={38} fill={P.gold} /><rect x={-16} y={36} width={32} height={22} rx={4} fill="#8A97AA" /></g>
          <g transform="translate(-140 190) scale(0.3)"><Scroll x={0} y={0} open={1} /></g>
          {[-130, 30, 190].map((y) => <rect key={y} x={-40} y={y - 6} width={250} height={14} rx={7} fill="#E2D2B0" />)}
        </g>
        {/* # the AI chip rises as if to join the bill, then stops */}
        <Chip x={1360} y={lerp(GROUND - 140, 380, on(f, ai104, 16))} s={0.9} o={on(f, ai104, 8)} f={f} />
        <Person f={f} who="hero" beats={[[0, 'present', 'neutral'], [ai104, 'point', 'neutral'], [not104, 'crossNoA', 'neutral', 'crossNoB', 10], [line + 14, 'idle', 'neutral']]} x={1620} y={GROUND} s={0.7} />
      </g>}

      {/* # B) it shows up inside a promise: the scroll holds a plant standing ready on the busiest day */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <g transform="translate(860 500)">
          <rect x={-400 * on(f, s105, 16)} y={-300} width={800 * on(f, s105, 16)} height={600} rx={16} fill="#FFF6E2" stroke="#CDB58C" strokeWidth={5} />
          <rect x={-420 * on(f, s105, 16) - 26} y={-320} width={52} height={640} rx={26} fill="#E2C996" /><rect x={420 * on(f, s105, 16) - 26} y={-320} width={52} height={640} rx={26} fill="#E2C996" />
          <g opacity={on(f, keeping, 10)}><PowerPlant x={-40} y={220} s={0.9} ready={on(f, ready, 10)} f={f} /></g>
          <g opacity={on(f, busiest, 8)}><Sun x={250} y={-170} heat={1} f={f} /></g>
          <g opacity={on(f, promise, 8)}><circle cx={0} cy={300} r={48} fill="#C94A3E" /><circle cx={0} cy={300} r={30} fill="#E06B5B" /></g>
        </g>
        {/* # the AI chip slips into the promise */}
        {(() => { const t = on(f, inside, 18); return <Chip x={lerp(1600, 1100, t)} y={lerp(300, 420, t)} s={lerp(0.9, 0.5, t)} o={1 - 0.2 * t} f={f} /> })()}
      </g>}

      {/* # C) everyone pays the same price; the AI boom's cost shared out; people who may never use it shrug */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <Chip x={960} y={260} s={1.0} o={on(f, everyone, 10) * (1 - on(f, shared + 20, 10))} f={f} />
        {Array.from({ length: 6 }, (_, k) => {
          const x = 330 + k * 250, who = ['buyer', 'investorF', 'worker', 'owner', 'investor', 'hero'][k]
          return <g key={k} opacity={on(f, everyone + k * 3, 8)}>
            <Person f={f} who={who} beats={[[0, 'idle', 'neutral'], [same, 'offer', 'neutral'], [shared + k * 2, 'receive', 'neutral'], [never + k * 2, 'shrug', 'thinking']]} x={x} y={GROUND} s={0.56} />
            <g opacity={on(f, price106, 8) * (1 - on(f, shared, 8))}><Coin x={x + 70} y={GROUND - 250} s={0.7} /></g>
            {/* # a piece of the chip's cost drops into each hand */}
            {f >= part && (() => { const t = on(f, shared + k * 2, 16); return <rect x={lerp(960, x + 60, t) - 16} y={lerp(300, GROUND - 260, t) - 10} width={32} height={20} rx={5} fill={P.coral} opacity={on(f, part, 8)} /> })()}
          </g>
        })}
      </g>}

      {/* # D) your bill goes up; the reason may be a building full of computers hundreds of miles away */}
      {D > 0 && <g opacity={D}>
        <Ground y={GROUND} />
        <Clouds f={f} at={[[700, 260, 0.8], [1300, 220, 0.7]]} />
        <Home x={260} y={GROUND} s={1.2} lit={1} />
        {/* # the bill rises out of the home */}
        {(() => { const t = on(f, bill107, 14); return <g opacity={t}><Envelope x={300} y={lerp(GROUND - 250, GROUND - 480, on(f, up, 16))} s={0.7} r={-6} text="BILL" /></g> })()}
        {/* # the long wire across the land on small pylons, to a tiny data center on the horizon */}
        {[560, 900, 1200, 1440, 1620].map((x, k) => <g key={x} opacity={on(f, reason + k * 4, 8)}><Pylon x={x} y={GROUND - 120 - k * 40} s={1 - k * 0.16} /></g>)}
        {[[380, GROUND - 230], [560, GROUND - 330], [900, GROUND - 330], [1200, GROUND - 310], [1440, GROUND - 290], [1620, GROUND - 265], [1760, GROUND - 315]].slice(0, -1).map((a, k, arr) => {
          const pts: [number, number][] = [[380, GROUND - 230], [560, GROUND - 330], [900, GROUND - 370], [1200, GROUND - 380], [1440, GROUND - 365], [1620, GROUND - 340], [1760, GROUND - 330]]
          return <Wire key={k} a={pts[k]} b={pts[k + 1]} draw={span(f, reason + k * 4, reason + 10 + k * 4)} sag={20 - k * 2} glow={on(f, miles, 10)} />
        })}
        <g opacity={on(f, building, 10)}><DataHall x={1790} y={GROUND - 300} s={0.22} f={f} lit={on(f, computers, 8)} ai={1} /></g>
        <Person f={f} who="buyer" beats={[[0, 'idle', 'neutral'], [up, 'shock', 'shocked'], [reason, 'lookFar', 'thinking'], [hundreds, 'point', 'neutral']]} x={520} y={GROUND} s={0.62} />
      </g>}
      <Vignette id="pw-payoff" />
    </g>
  )
}

const BEATS = ['s103:answer', 's104:ai', 's104:not', 's104:line', 's105', 's105:inside', 's105:promise', 's105:keeping', 's105:ready', 's105:busiest', 's106:everyone', 's106:same', 's106:price', 's106:part', 's106:shared', 's106:never', 's107', 's107:bill', 's107:up', 's107:reason', 's107:building', 's107:computers', 's107:hundreds', 's107:miles']
export const PW_PAYOFF = makePiece('pw-payoff', 'Power long payoff: AI is not its own line on the bill (hero says no); it hides inside the promise (a plant ready on the busiest day); everyone pays the same price, the AI boom cost shared by people who may never use it; your bill goes up, the reason a data center miles away', {
  mood: 'light', Component: Payoff, beats: BEATS,
  sfx: [['s104:not', 'swish', 0.25], ['s105:inside', 'flutter', 0.3], ['s106:same', 'coin', 0.3], ['s106:shared', 'softpop', 0.25], ['s107:up', 'riser', 0.3], ['s107:miles', 'whoosh', 0.3]] })
