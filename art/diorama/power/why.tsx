// ---------------------------------------------------------------- s92–s102: why the data centers don't pay it all.
// A) A data center pays its own bill: an envelope arrives, it pays coins back, a promise scroll is part of it, its servers
//    hum (the power it uses).
// B) The one-price rule: a row of homes and the data center each stand on a step of coins under one line; the data center
//    pushes the line up and every step rises with it, homes too. "Not only on theirs": the hero crosses his arms and
//    shakes his head. The market monitor scoops the risen coral tops into one pile (what it added up).
// C) The tiny grid again: A, B, C and the data center's D at 90; the data center paid its own 90; A+B+C went 180 → 270;
//    the three coral tops lift off and join into one block (the extra 90), which repeats across the region.
// D) The fix: a crane builds a new plant beside each new data center; the line stops rising for everyone else.
// E) PJM's rule: the data center plugs in, and when the grid is under strain its servers dim and the strain gauge relaxes.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Bill as Envelope, Coin, fly, Headline, Label, Person, win } from '../aimoney/common'
import { DataHall, Home, PowerPlant } from './kit'
import { CoinColumn, Crane, Ground, RegionMap, Scroll } from './kit2'

const GROUND = 920
const UNIT = 4

const Why: React.FC<PieceProps> = ({ f, c }) => {
  const s92 = c('s92'), pay92 = c('s92:pay'), bills92 = c('s92:bills'), capacity92 = c('s92:capacity'), use92 = c('s92:use')
  const problem = c('s93:problem'), oneprice = c('s93:oneprice'), rule = c('s93:rule')
  const demand = c('s94:demand'), pushes = c('s94:pushes'), higher = c('s94:higher'), everyones = c('s94:everyone\'s'), share = c('s94:share'), not94 = c('s94:not'), theirs = c('s94:theirs')
  const higher94 = c('s94:higher'), centers100 = c('s100:centers'), s102 = c('s102'), extra95 = c('s95:extra'), monitor95 = c('s95:monitor'), added95 = c('s95:added')
  const remember = c('s96:remember'), tiny = c('s96:tiny')
  const data97 = c('s97:data'), paid97 = c('s97:paid'), own97 = c('s97:own'), d90a = c('s97:90')
  const three98 = c('s98:three'), d180 = c('s98:180'), d270 = c('s98:270')
  const monitor99 = c('s99:monitor'), else99 = c('s99:else'), extra99 = c('s99:extra'), d90 = c('s99:90'), everyone99 = c('s99:everyone'), across = c('s99:across'), region = c('s99:region')
  const fix = c('s100:fix'), bring = c('s100:bring'), own100 = c('s100:own'), plants100 = c('s100:plants')
  const stop = c('s101:stop'), raising = c('s101:raising'), everybody = c('s101:everybody')
  const rules = c('s102:rules'), big = c('s102:big'), connect = c('s102:connect'), cut = c('s102:cut'), strain = c('s102:strain')
  const AB = problem - 4, BC = remember - 4, CD = fix - 4, DE = c('s102') - 4
  const A = win(f, s92, AB), B = win(f, AB, BC), C = win(f, BC, CD), D = win(f, CD, DE), E = on(f, DE, 8)
  const lineUp = on(f, pushes, 18)
  return (
    <g>
      <Stage id="pw-why" frame={f} />
      <Headline f={f} lines={[[capacity92, 'INCLUDING CAPACITY', P.ink, 100], [problem, '', P.ink], [oneprice, 'THE ONE-PRICE RULE', P.goldInk, 104], [demand, '', P.ink], [tiny, '', P.ink], [d90a, 'ITS OWN PROMISE: $90', P.skyInk, 100], [d180, '$180', P.ink, 110], [d270, '$180 → $270', P.coralInk, 110], [d90, 'THE EXTRA $90', P.coralInk, 110], [fix, '', P.ink], [plants100, 'BRING THEIR OWN POWER PLANTS', P.ink, 92], [rules, '', P.ink]]} />

      {/* # A) the data center pays its own bill, capacity included */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <DataHall x={1220} y={GROUND} s={1.0} f={f} lit={0.4 + 0.6 * on(f, use92, 10)} ai={1} waves={on(f, use92, 10)} />
        {(() => { const t = on(f, s92 + 6, 20); return <Envelope x={lerp(200, 760, t)} y={lerp(300, GROUND - 330, t) - Math.sin(t * Math.PI) * 60} s={0.9} r={-6} text="BILL" o={1} /> })()}
        {Array.from({ length: 5 }, (_, k) => { const p = fly(f, pay92 + k * 4, [880, GROUND - 160], [500, GROUND - 330], 18, 120); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.7} o={p.o} /> : null })}
        <g opacity={on(f, capacity92, 10)}><Scroll x={600} y={GROUND - 170} s={0.55} open={on(f, capacity92, 14)} /></g>
      </g>}

      {/* # B) one price: the data center pushes the line up and every step rises, homes too; the monitor adds it up */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        {[0, 1, 2, 3].map((k) => {
          const x = 300 + k * 260, h = lerp(200, 290, lineUp * on(f, share + k * 3, 14))
          return <g key={k} opacity={on(f, problem + k * 3, 8)}>
            <CoinColumn x={x} y={GROUND} h={h} w={170} extra={Math.max(0, h - 200)} />
            <Home x={x} y={GROUND - h} s={0.6} lit={1} />
          </g>
        })}
        <g opacity={on(f, demand, 10)}>
          <CoinColumn x={1400} y={GROUND} h={lerp(200, 290, lineUp)} w={260} extra={Math.max(0, lerp(200, 290, lineUp) - 200)} />
          <DataHall x={1400} y={GROUND - lerp(200, 290, lineUp)} s={0.5} f={f} lit={1} ai={1} />
        </g>
        <line x1={190} y1={GROUND - lerp(200, 290, lineUp)} x2={1560} y2={GROUND - lerp(200, 290, lineUp)} stroke={P.goldD} strokeWidth={8 + 8 * on(f, higher94, 6) * (1 - on(f, higher94 + 18, 10))} strokeDasharray="18 10" opacity={on(f, oneprice, 10)} />
        {/* # "not only on theirs": the hero says no */}
        <g opacity={on(f, not94 - 8, 8) * (1 - on(f, extra95, 8))}><Person f={f} who="hero" beats={[[0, 'point', 'neutral'], [not94, 'crossNoA', 'neutral', 'crossNoB', 10], [theirs + 10, 'idle', 'neutral']]} x={1750} y={GROUND} s={0.62} /></g>
        {/* # the monitor scoops up the coral tops into one pile */}
        <g opacity={on(f, monitor95, 10)}>
          <Person f={f} who="investorF" beats={[[0, 'idle', 'neutral'], [added95, 'countA', 'thinking', 'countB', 12]]} x={1750} y={GROUND} s={0.62} />
          {[0, 1, 2, 3].map((k) => { const p = fly(f, added95 + k * 4, [300 + k * 260, GROUND - 260], [1640, GROUND - 120], 20, 140); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.6} o={p.o} /> : null })}
        </g>
      </g>}

      {/* # C) the tiny grid again: 180 → 270; the extra 90 everyone else pays; across the region */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        {[0, 1, 2, 3].map((k) => {
          const x = 420 + k * 280, own = k === 3
          const lift = !own ? on(f, extra99, 20) : 0
          return <g key={k} opacity={on(f, tiny + k * 3, 8)}>
            <CoinColumn x={x} y={GROUND} h={90 * UNIT - (own ? 0 : 30 * UNIT * lift)} w={170} extra={own ? 0 : Math.max(0, 30 * UNIT * (1 - lift))} />
            {own && <g><DataHall x={x} y={GROUND - 90 * UNIT} s={0.3} f={f} lit={1} ai={1} /><ellipse cx={x} cy={GROUND - 200} rx={130} ry={240} fill={P.sky} opacity={0.18 * on(f, paid97, 8) * (1 - on(f, three98, 8))} /></g>}
            {!own && <PowerPlant x={x} y={GROUND - (90 - 30 * lift) * UNIT} s={0.34} ready={1} f={f} />}
            <Label x={x} y={GROUND + 72} text={'ABCD'[k]} size={60} font="Bebas Neue" color={P.ink} />
          </g>
        })}
        {/* # the three coral tops lift and join into one block: the extra 90 */}
        <g opacity={on(f, extra99, 10)}>
          {[0, 1, 2].map((k) => { const t = on(f, extra99 + k * 3, 18), x = lerp(420 + k * 280, 1640, t), y = lerp(GROUND - 75 * UNIT, 640 - k * 64, t); return <rect key={k} x={x - 85} y={y - 15 * UNIT} width={170} height={30 * UNIT - 6} rx={14} fill={P.coral} /> })}
        </g>
        <g opacity={on(f, else99, 8)}><Person f={f} who="buyer" beats={[[0, 'idle', 'neutral'], [else99, 'shock', 'shocked']]} x={1380} y={GROUND} s={0.5} /></g>
        <g opacity={on(f, monitor99, 8)}><Person f={f} who="investorF" beats={[[0, 'point', 'neutral'], [across, 'present', 'smiling']]} x={1820} y={GROUND} s={0.5} /></g>
        <g opacity={on(f, across, 10)}><RegionMap x={1640} y={250} s={0.3} lit={on(f, region, 12)} /></g>
        {Array.from({ length: 6 }, (_, k) => <rect key={k} x={1550 + (k % 3) * 64} y={200 + Math.floor(k / 3) * 56} width={48} height={32} rx={8} fill={P.coral} opacity={on(f, region + k * 3, 6)} />)}
      </g>}

      {/* # D) the fix: a new plant beside each new data center; the line stops rising */}
      {D > 0 && <g opacity={D}>
        <Ground y={GROUND} />
        <DataHall x={560} y={GROUND} s={0.8 * (1 + 0.05 * on(f, centers100, 8))} f={f} lit={1} ai={1} />
        <g opacity={on(f, bring, 10)}><Crane x={1060} y={GROUND} s={0.8} swing={Math.sin(f / 30) * 0.6} /></g>
        <g opacity={on(f, own100, 10)} transform={`translate(1240 ${GROUND}) scale(${pop(f, plants100)})`}><PowerPlant x={0} y={0} s={0.75} ready={on(f, plants100, 10)} f={f} /></g>
        <Wire2 a={[900, GROUND - 200]} b={[1180, GROUND - 120]} o={on(f, plants100, 10)} />
        {/* # the homes' line stays flat */}
        <g opacity={on(f, stop, 10)}>
          <line x1={1560} y1={GROUND - 200} x2={1900} y2={GROUND - 200} stroke={P.goldD} strokeWidth={8} strokeDasharray="18 10" />
          {[0, 1].map((k) => <g key={k}><CoinColumn x={1650 + k * 180} y={GROUND} h={200} w={130} /><Home x={1650 + k * 180} y={GROUND - 200} s={0.42} lit={1} /></g>)}
        </g>
      </g>}

      {/* # E) connect, but cut back under strain */}
      {E > 0 && <g opacity={E}>
        <Ground y={GROUND} />
        <DataHall x={700} y={GROUND} s={lerp(0.85, 1.0, on(f, s102, 14))} f={f} lit={1 - 0.65 * on(f, cut, 12) * (1 - on(f, strain + 30, 20))} ai={1} />
        {/* # the plug clicks in on "connect" */}
        <g opacity={on(f, big, 8)}>
          <path d={`M1050 ${GROUND - 140} C 1150 ${GROUND - 140}, 1180 ${GROUND - 300}, 1300 ${GROUND - 300}`} fill="none" stroke="#5C6A80" strokeWidth={12} />
          <g transform={`translate(${lerp(1420, 1320, on(f, connect, 10))} ${GROUND - 300})`}><rect x={-30} y={-40} width={60} height={80} rx={10} fill="#5C6A80" /><rect x={30} y={-24} width={30} height={10} fill="#C9CFD8" /><rect x={30} y={14} width={30} height={10} fill="#C9CFD8" /></g>
          <rect x={1380} y={GROUND - 380} width={120} height={160} rx={14} fill="#E9EEF5" stroke="#9AA5B5" strokeWidth={5} />
        </g>
        {/* # the strain gauge: into the red, then back as the data center cuts back */}
        <g opacity={on(f, cut - 10, 10)} transform="translate(1440 520)">
          <path d="M-150 0 A150 150 0 0 1 150 0" fill="none" stroke="#E9EEF5" strokeWidth={40} />
          <path d="M53 -140 A150 150 0 0 1 150 0" fill="none" stroke={P.coral} strokeWidth={40} />
          {(() => { const a = Math.PI * lerp(1.0, 1.85, on(f, cut - 10, 12)) - Math.PI * 0.55 * on(f, strain, 20); return <line x1={0} y1={0} x2={130 * Math.cos(a)} y2={130 * Math.sin(a)} stroke={P.navy2} strokeWidth={12} strokeLinecap="round" /> })()}
          <circle r={18} fill={P.navy2} />
        </g>
      </g>}
      <Vignette id="pw-why" />
    </g>
  )
}
// # a plain cable between two points
const Wire2: React.FC<{ a: [number, number]; b: [number, number]; o?: number }> = ({ a, b, o = 1 }) => <path d={`M${a[0]} ${a[1]} Q${(a[0] + b[0]) / 2} ${Math.max(a[1], b[1]) + 40} ${b[0]} ${b[1]}`} fill="none" stroke="#5C6F8E" strokeWidth={6} opacity={o} />

const BEATS = ['s92', 's92:pay', 's92:capacity', 's92:use', 's93:problem', 's93:oneprice', 's94:demand', 's94:pushes', 's94:share', 's94:not', 's94:theirs', 's95:extra', 's95:monitor', 's95:added', 's96:remember', 's96:tiny', 's97:paid', 's97:90', 's98:three', 's98:180', 's98:270', 's99:extra', 's99:90', 's99:across', 's99:region', 's100:fix', 's100:bring', 's100:own', 's100:plants', 's101:stop', 's101:raising', 's101:everybody', 's102:rules', 's102:big', 's102:connect', 's102:cut', 's102:strain', 's99:else', 's99:monitor', 's94:higher', 's100:centers', 's102']
export const PW_WHY = makePiece('pw-why', 'Power long: the data center pays its own bill incl. capacity; one price lifts every home with it (hero: not only theirs); the monitor adds it up; the tiny grid again — own 90, 180 → 270, the extra 90 across the region; the fix: bring your own plant; connect but cut back under strain', {
  mood: 'light', Component: Why, beats: BEATS,
  sfx: [['s92:pay', 'coin', 0.3], ['s92:capacity', 'flutter', 0.25], ['s94:pushes', 'riser', 0.3], ['s94:not', 'swish', 0.25], ['s95:added', 'cash', 0.3], ['s98:270', 'thud', 0.3], ['s99:extra', 'swish', 0.3], ['s100:plants', 'pop', 0.3], ['s102:connect', 'click', 0.35], ['s102:strain', 'glitch', 0.25]] })
