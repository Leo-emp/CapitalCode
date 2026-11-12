// ---------------------------------------------------------------- s31–s48: the tiny made-up grid, the rule, and who pays.
// A) A toy grid: a little town needs three promises (three slots on a shelf). Plants A–D appear as named, each raising a
//    paddle with its price as it is said (20, 40, 60, 90). PJM takes A, B, C: a scroll flies from each into a slot.
//    C was the last needed, so a gold line at 60 runs across and coin columns beside A, B and C rise to 60; A's column
//    shows its own 20 and the extra on top. The three columns pour into one pile: 180. A data center slides in; a fourth
//    slot appears; D's scroll drops in; the line climbs to 90 and every column rises to 90 (the new part coral); the
//    pile becomes 270 next to a faded 180. The data center glows (added one), the coral tops pulse (old ones dearer).
// B) The rule: a staircase of plants; the need marker moves one step further; the price line climbs; every step fills.
// C) Passing it down: PJM's control house, the local power company pays it, then bills fly out to a home, a shop, an
//    office and a factory, each bill sized by how much power they use at the busiest times.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Bill as Envelope, Coin, fly, Headline, Label, Person, Tick, win } from '../aimoney/common'
import { DataHall, Home, PowerPlant, Shop } from './kit'
import { CoinColumn, ControlHouse, Factory, Ground, Office, Paddle, Scroll } from './kit2'

const GROUND = 930
const PX = [720, 1000, 1280, 1560] // # plants A–D
const PRICE = [20, 40, 60, 90]
const UNIT = 4 // # px of coin column per dollar
const SLOT = (k: number) => 190 + k * 120 // # promise slots on the shelf (top-left)

const Example: React.FC<PieceProps> = ({ f, c }) => {
  const tiny = c('s31:tiny'), grid31 = c('s31:grid'), three32 = c('s32:three'), promises32 = c('s32:promises')
  const plantA = c('s33'), p20 = c('s33:20'), plantB = c('s33:plant#2'), p40 = c('s33:40'), plantC = c('s33:plant#3'), p60 = c('s33:60'), plantD = c('s33:plant#4'), p90 = c('s33:90')
  const takesA = c('s34:a'), thenB = c('s34:b'), thenC = c('s34:c'), enough34 = c('s34:enough')
  const last35 = c('s35:last'), paid35 = c('s35:paid'), each35 = c('s35:each')
  const asked = c('s36:asked'), still36 = c('s36:still'), gets36 = c('s36:gets')
  const cost37 = c('s37:cost'), d180 = c('s37:180'), total = c('s37:total')
  const data38 = c('s38:data'), four38 = c('s38:four')
  const take39 = c('s39:take'), d90 = c('s39:90')
  const last40 = c('s40:last'), paid40 = c('s40:paid')
  const same41 = c('s41:same'), d270 = c('s41:270')
  const data42 = c('s42:data'), added = c('s42:added'), old42 = c('s42:old'), expensive = c('s42:expensive')
  const d90b = c('s39:90'), d180b = c('s41:180'), enough34b = c('s34:enough'), p60b = c('s35:60'), a60 = c('s36:60'), instead38 = c('s38:instead'), must39 = c('s39:must'), d39 = c('s40:d'), already41 = c('s41:already'), data42b = c('s42:data'), follows = c('s43:follows'), needs44 = c('s44:needs'), rule = c('s43:rule'), more44 = c('s44:more'), further = c('s44:further'), expensive44 = c('s44:expensive'), lastPrice = c('s45:price'), up45 = c('s45:up'), every45 = c('s45:every'), paid45 = c('s45:paid'), newest = c('s45:newest')
  const passed = c('s46:passed'), local = c('s47'), payPjm = c('s47:pay'), add47 = c('s47:add'), bills = c('s47:bills')
  const homes = c('s48'), shops = c('s48:shops'), offices = c('s48:offices'), factories = c('s48:factories'), use48 = c('s48:use'), busiest = c('s48:busiest')
  const AB = rule - 4, BC = passed - 4
  const A = win(f, c('s31'), AB), B = win(f, AB, BC), C = on(f, BC, 8)
  // # A: the price everyone is paid (60, then 90) and how tall each column is
  const price = f < paid40 ? 60 : 60 + 30 * on(f, paid40, 18)
  const taken = [takesA, thenB, thenC, take39]
  const named = [plantA, plantB, plantC, plantD], said = [p20, p40, p60, p90]
  const pile = f < d270 ? 180 : 270
  return (
    <g>
      <Stage id="pw-example" frame={f} />
      <Headline f={f} lines={[[tiny, 'A TINY, MADE-UP GRID', P.ink, 96], [three32, '', P.ink], [rule, 'ONE RULE', P.goldInk, 104], [passed, '', P.ink]]} />

      {/* # A) the tiny grid */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        {/* # the little town (left) */}
        <g opacity={on(f, tiny - 30, 10)}>
          <Home x={150} y={GROUND} s={0.62} lit={1} /><Home x={320} y={GROUND} s={0.52} lit={1} />
        </g>
        {/* # the shelf of promise slots (top-left): three, then a fourth */}
        <g opacity={on(f, three32, 10)}>
          <rect x={110} y={420} width={130 + 120 * (f >= four38 ? 4 : 3) - 80} height={18} rx={8} fill="#8E6232" />
          <rect x={130} y={240} width={360 + (f >= four38 ? 120 : 0)} height={190} rx={16} fill={P.gold} opacity={0.18 * on(f, enough34b, 8) * (1 - on(f, last35, 10)) + 0.18 * on(f, instead38, 8) * (1 - on(f, take39, 10))} />
          {[0, 1, 2, 3].map((k) => {
            const at = k < 3 ? three32 + k * 4 : four38
            return <g key={k} opacity={on(f, at, 8)}><rect x={SLOT(k) - 50} y={250} width={100} height={170} rx={12} fill="none" stroke={k < 3 ? '#CDB58C' : P.coral} strokeWidth={5} strokeDasharray="12 8" /></g>
          })}
        </g>
        {/* # the plants, their paddles and columns */}
        {PX.map((x, k) => {
          const shown = on(f, named[k], 10), isTaken = f >= taken[k]
          const colH = isTaken && f >= paid35 + k * 3 && (k < 3 || f >= paid40) ? (k < 3 ? price : 60 + 30 * on(f, paid40, 18)) * UNIT * on(f, paid35 + k * 3, 16) : 0
          const ownH = PRICE[k] * UNIT, extra = Math.max(0, colH - Math.min(colH, Math.max(ownH, 60 * UNIT)))
          const glowA = k === 0 ? on(f, asked, 8) * (1 - on(f, cost37, 8)) : 0
          return <g key={k} opacity={shown}>
            <PowerPlant x={x - 10} y={GROUND - colH} s={0.5} ready={isTaken ? 1 : k === 3 ? 0.3 + 0.7 * on(f, must39, 8) : 0.3} f={f} />
            {k === 3 && <Tick x={x + 110} y={GROUND - colH - 120} o={on(f, d39, 8) * (1 - on(f, same41, 8))} r={28} />}
            <Label x={x} y={GROUND + 72} text={'ABCD'[k]} size={64} font="Bebas Neue" color={P.ink} />
            <g opacity={on(f, said[k], 8) * (k === 0 ? Math.max(1 - on(f, paid35, 8), on(f, asked, 8) * (1 - on(f, cost37, 8))) : k === 3 ? Math.max(1 - on(f, paid35, 8), on(f, take39, 8) * (1 - on(f, last40 + 20, 8))) : 1 - on(f, paid35, 8))}><Paddle x={x - 150} y={GROUND - colH - 200} s={0.75 * (k === 3 ? 1 + 0.15 * on(f, d90b, 6) * (1 - on(f, d90b + 14, 8)) : 1)} text={String(PRICE[k])} color={k === 2 && f >= last35 && f < last40 ? '#FFE38A' : P.paper} /></g>
            {/* # the column: gold up to 60 (C's price), coral for the extra from the rise to 90 */}
            {colH > 0 && <CoinColumn x={x} y={GROUND} h={colH} w={170} extra={k < 3 ? Math.max(0, colH - 60 * UNIT) : 0} />}
            {/* # A asked for 20: a dashed mark at 20 on its column and a glow above it */}
            {k === 0 && glowA > 0 && <g opacity={glowA}><line x1={x - 100} y1={GROUND - ownH} x2={x + 100} y2={GROUND - ownH} stroke={P.navy2} strokeWidth={6} strokeDasharray="10 8" /><rect x={x - 88} y={GROUND - 60 * UNIT} width={176} height={60 * UNIT - ownH} rx={10} fill={P.mint} opacity={0.35 * on(f, still36, 10) + 0.3 * on(f, a60, 8)} /></g>}
            {/* # the promise scroll flies from the plant to its slot when taken */}
            {(() => { const p = fly(f, taken[k], [x, GROUND - colH - 200], [SLOT(k), 335], 20, 140); return f >= taken[k] ? <Scroll x={p.o > 0 && f < taken[k] + 20 ? p.x : SLOT(k)} y={p.o > 0 && f < taken[k] + 20 ? p.y : 335} s={0.42} o={1} /> : null })()}
            {isTaken && <Tick x={x + 110} y={GROUND - colH - 200} o={on(f, taken[k], 8) * (1 - on(f, paid35, 8))} r={28} />}
            {k === 3 && extra < 0 && null}
          </g>
        })}
        {/* # the price line across the columns (60, then 90) */}
        <g opacity={on(f, last35, 10)}>
          <line x1={PX[0] - 100} y1={GROUND - price * UNIT} x2={PX[0] - 100 + (PX[3] - PX[0] + 200) * on(f, paid35, 20)} y2={GROUND - price * UNIT} stroke={P.goldD} strokeWidth={8 + 6 * on(f, p60b, 6) * (1 - on(f, p60b + 16, 10))} strokeDasharray="18 10" />
        </g>
        {/* # the pile: the columns pour into one total — 180, then 270 */}
        <g opacity={on(f, cost37, 10) * (1 - on(f, data38, 8)) + on(f, same41, 10)}>
          {[0, 1, 2].map((k) => { const p = fly(f, cost37 + k * 5, [PX[k], GROUND - 200], [330, 600], 20, 120); return p.o > 0 && f < cost37 + 26 ? <Coin key={k} x={p.x} y={p.y} s={0.7} o={p.o} /> : null })}
          <g transform={`translate(330 660) scale(${1 + 0.08 * on(f, already41, 6) * (1 - on(f, already41 + 14, 10))})`}>
            {Array.from({ length: pile === 180 ? 6 : 9 }, (_, k) => <g key={k}><ellipse cx={0} cy={-k * 18} rx={64} ry={14} fill={k >= 6 ? P.coralD : P.goldD} /><ellipse cx={0} cy={-k * 18 - 6} rx={64} ry={14} fill={k >= 6 ? P.coral : P.gold} /></g>)}
          </g>
          <g opacity={f >= same41 ? on(f, d270, 8) : on(f, d180, 8)}><Label x={330} y={735} text={`$${pile}`} size={72} font="Bebas Neue" color={pile === 270 ? P.coralInk : P.ink} /></g>
          {f >= d180b && <g opacity={0.45}><Label x={470} y={735} text="$180" size={48} font="Bebas Neue" color={P.ink2} /></g>}
        </g>
        {/* # the data center arrives on the right; glows when it "added one promise" */}
        <g opacity={on(f, data38, 10)} transform={`translate(${lerp(260, 0, on(f, data38, 18))} 0)`}>
          <ellipse cx={1750} cy={GROUND - 120} rx={220} ry={150} fill={P.sky} opacity={0.2 * Math.max(on(f, added, 8), on(f, data42b, 8)) * (1 - on(f, old42, 8))} />
          <DataHall x={1760} y={GROUND} s={0.38} f={f} lit={1} ai={1} />
        </g>
        {/* # old promises more expensive: the coral tops pulse */}
        {[0, 1, 2].map((k) => <rect key={k} x={PX[k] - 92} y={GROUND - 90 * UNIT - 8} width={184} height={30 * UNIT + 16} rx={12} fill="none" stroke={P.coral} strokeWidth={6} opacity={on(f, expensive, 8) * (0.6 + 0.4 * Math.sin(f / 4))} />)}
      </g>}

      {/* # B) the rule on a real staircase: one step more, the line climbs, every step fills */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        {[110, 160, 210, 260, 330, 420].map((h, k) => {
          const x = 380 + k * 220, need = f >= further ? 5 : 4, inNeed = k < need
          const line = f >= lastPrice ? lerp(260, 330, on(f, up45, 16)) : 260
          const fill = inNeed && f >= every45 ? lerp(h, line, on(f, every45 + k * 3, 16)) : inNeed && k < 4 ? Math.max(h, 260) : h
          return <g key={k} opacity={on(f, rule + k * 3, 8)} transform={`translate(0 ${30 * (1 - on(f, follows + k * 2, 12))})`}>
            <rect x={x - 90} y={GROUND - fill} width={180} height={fill} rx={12} fill={inNeed && fill > h ? P.gold : '#E9DCC0'} />
            <rect x={x - 90} y={GROUND - h} width={180} height={h} rx={12} fill={['#FFF6E2', '#FFE9C2', '#FFD9A8', '#FFC48F', '#FFB07A', '#FF9C6A'][k]} stroke="#CDB58C" strokeWidth={4} />
            <PowerPlant x={x + 8} y={GROUND - fill} s={0.34} ready={inNeed ? 1 : 0.3} f={f} />
            {k === 4 && <g opacity={Math.max(on(f, needs44, 8) * 0.5, on(f, more44, 8))}><rect x={x - 96} y={GROUND - h - 6} width={192} height={h + 6} rx={14} fill="none" stroke={P.coral} strokeWidth={6} strokeDasharray="12 8" /></g>}
            {k === 4 && <Tick x={x} y={GROUND - fill + 50} o={on(f, expensive44, 8)} r={30} />}
            {k === 4 && <g opacity={on(f, newest, 8)}><ellipse cx={x} cy={GROUND - fill - 120} rx={120} ry={60} fill={P.gold} opacity={0.25} /></g>}
          </g>
        })}
        <g opacity={on(f, rule, 10)}>
          {(() => { const ly = GROUND - (f >= lastPrice ? lerp(260, 330, on(f, up45, 16)) : 260); return <line x1={280} y1={ly} x2={1340} y2={ly} stroke={P.goldD} strokeWidth={8} strokeDasharray="18 10" /> })()}
        </g>
        {/* # coins rain onto every step on "paid more" */}
        {Array.from({ length: 5 }, (_, k) => { const p = fly(f, paid45 + k * 3, [380 + k * 220, 300], [380 + k * 220, GROUND - 340], 14, 30); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.6} o={p.o} /> : null })}
      </g>}

      {/* # C) passing it down: PJM → the local power company → everyone's bills */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <ControlHouse x={250} y={GROUND} s={0.78} f={f} />
        <g opacity={on(f, local, 10)}>
          <Office x={680} y={GROUND} s={1.1} />
          <g transform={`translate(680 ${GROUND - 450})`}><rect x={-120} y={-40} width={240} height={64} rx={14} fill={P.navy3} /><text y={8} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"', letterSpacing: 3 }}>POWER COMPANY</text></g>
        </g>
        {/* # the power company pays PJM */}
        {Array.from({ length: 4 }, (_, k) => { const p = fly(f, payPjm + k * 4, [640, GROUND - 300], [320, GROUND - 260], 18, 90); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.6} o={p.o} /> : null })}
        {/* # customers, each popping in as named */}
        {([[homes, 'home', 1000], [shops, 'shop', 1260], [offices, 'office', 1520], [factories, 'factory', 1770]] as [number, string, number][]).map(([at, kind, x], k) => {
          const g = pop(f, at)
          return <g key={kind} opacity={on(f, at, 8)} transform={`translate(${x} ${GROUND}) scale(${g}) translate(${-x} ${-GROUND})`}>
            {kind === 'home' && <Home x={x} y={GROUND} s={0.95} lit={1} />}
            {kind === 'shop' && <Shop x={x} y={GROUND} s={0.9} lit={1} />}
            {kind === 'office' && <Office x={x} y={GROUND} s={0.85} />}
            {kind === 'factory' && <Factory x={x} y={GROUND} s={0.75} f={f} />}
            {/* # its bill lands on it, sized by how much it uses at the busiest times */}
            {(() => { const sz = [0.42, 0.52, 0.64, 0.8][k], top = [250, 230, 330, 260][k], t = on(f, add47 + k * 4, 18), bx = lerp(680, x, t), by = lerp(GROUND - 400, GROUND - top - 70, t) - Math.sin(t * Math.PI) * 100
              return f >= add47 + k * 4 ? <Envelope x={bx} y={by} s={lerp(0.3, sz, on(f, use48, 14)) * (1 + 0.06 * on(f, busiest, 6) * Math.sin(f / 3))} r={-6} /> : null })()}
          </g>
        })}
      </g>}
      <Vignette id="pw-example" />
    </g>
  )
}

const BEATS = ['s31:tiny', 's31:grid', 's32:three', 's33', 's33:20', 's33:plant#2', 's33:40', 's33:plant#3', 's33:60', 's33:plant#4', 's33:90', 's34:a', 's34:b', 's34:c', 's35:last', 's35:paid', 's36:asked', 's36:still', 's37:cost', 's37:180', 's38:data', 's38:four', 's39:take', 's40:last', 's40:paid', 's41:same', 's41:270', 's42:added', 's42:old', 's42:expensive', 's43:rule', 's44:more', 's44:further', 's44:expensive', 's45:price', 's45:up', 's45:every', 's45:paid', 's45:newest', 's46:passed', 's47', 's47:pay', 's47:add', 's48', 's48:shops', 's48:offices', 's48:factories', 's48:use', 's48:busiest', 's34:enough', 's35:60', 's36:60', 's38:instead', 's39:must', 's40:d', 's41:already', 's42:data', 's43:follows', 's44:needs', 's39:90', 's41:180']
export const PW_EXAMPLE = makePiece('pw-example', 'Power long: a tiny made-up grid — plants A–D at 20/40/60/90, three promises at 60 each = 180; a data center needs a fourth, D at 90, all paid 90 = 270; the rule on a staircase; the cost passed down to homes, shops, offices, factories', {
  mood: 'light', Component: Example, beats: BEATS,
  sfx: [['s33:20', 'pop', 0.25], ['s33:40', 'pop', 0.25], ['s33:60', 'pop', 0.25], ['s33:90', 'pop', 0.25], ['s34:a', 'flutter', 0.25], ['s34:b', 'flutter', 0.25], ['s34:c', 'flutter', 0.25], ['s35:paid', 'coin', 0.35], ['s37:180', 'cash', 0.3], ['s38:data', 'whoosh', 0.3], ['s40:paid', 'coin', 0.35], ['s41:270', 'thud', 0.35], ['s45:paid', 'coin', 0.3], ['s47:bills', 'flutter', 0.3]] })
