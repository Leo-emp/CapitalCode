// ---------------------------------------------------------------- s1–s6: the hook.
// A) A big trading app on a phone; "zero commission" — a $0 ribbon lands on it. "4.5 billion" — a coin pile grows
//    beside it; "more than half … 2.6 billion … from trades" — the pile splits and the bigger part glows, fed by order
//    slips streaming out of the phone.
// B) "Who paid?" Leo taps BUY; his order slip flies to a dark trading tower; on "pays" a coin arcs from the tower back
//    to the app — and slides in behind the phone, out of sight ("you never see that payment on your screen").
// C) The four steps as stations along a dashed route; the order slip travels it: sold, the gap, the cut, did you pay?
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, fly, hand, win, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Stack } from '../fee/kit'
import { AppPhone, Cent, Ladder, Path, Slip, Tower } from './kit'

const GROUND = 920

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const app1 = c('s1:app'), zero = c('s1:zero'), commission = c('s1:commission'), made = c('s1:made'), d45 = c('s1:45')
  const half = c('s2:half'), d26 = c('s2:26'), came = c('s2:came'), trades = c('s2:trades')
  const s3 = c('s3'), free = c('s3:free'), who = c('s3:who'), paid = c('s3:paid')
  const tap = c('s4:tap'), buy4 = c('s4:buy'), firm = c('s4:firm'), never4 = c('s4:never'), pays = c('s4:pays'), app4 = c('s4:app'), fill = c('s4:fill')
  const see = c('s5:see'), payment5 = c('s5:payment'), screen = c('s5:screen')
  const s6 = c('s6'), follow = c('s6:follow'), four = c('s6:four'), simple = c('s6:simple'), steps = c('s6:steps'), money6 = c('s6:money')
  const AB = s3 - 4, BC = s6 + 6
  const A = win(f, 0, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  return (
    <g>
      <Stage id="hd-hook" frame={f} />
      <Headline f={f} lines={[[zero, '$0 COMMISSION', P.ink, 104], [d45, '2025: ≈ $4.5 BILLION', P.ink, 100], [d26, '≈ $2.6 BILLION FROM TRADES', P.ink, 96], [s3, '', P.ink], [who, 'SO WHO PAID?', P.ink, 112], [tap, '', P.ink], [screen, 'NOT ON YOUR SCREEN', P.ink, 100], [four, '4 SIMPLE STEPS', P.ink, 104]]} />

      {/* # A) the app and its money */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <g transform={`translate(0 ${lerp(20, 0, pop(f, 0, 16))})`} opacity={on(f, 0, 8)}>
          <AppPhone x={560} y={560} s={1.3} zero={on(f, zero, 10)} />
        </g>
        {/* # the year's money: a pile that grows, then splits into "from trades" (≈59%) and the rest */}
        <g opacity={on(f, made, 10)}>
          {(() => { const grow = on(f, d45, 30), sp = on(f, half, 18), lit = on(f, d26, 10)
            const n = Math.round(lerp(4, 24, grow)), nT = Math.round(n * 0.59), nR = n - nT
            return <g>
              <g transform={`translate(${lerp(1300, 1180, sp)} 0)`}><Stack x={0} y={GROUND - 10} n={sp > 0.5 ? nT : n} w={200} />
                {lit > 0 && <ellipse cx={0} cy={GROUND - 10 - nT * 11} rx={150} ry={nT * 13 + 40} fill={P.gold} opacity={0.22 * lit} />}</g>
              {sp > 0.5 && <g transform={`translate(${lerp(1300, 1560, sp)} 0)`} opacity={sp}><Stack x={0} y={GROUND - 10} n={nR} w={200} /></g>}
              <g opacity={on(f, d45, 8) * (1 - on(f, half, 8))}><Label x={1300} y={GROUND + 70} text="$4.5B" size={64} font="Bebas Neue" color={P.goldInk} /></g>
              <g opacity={on(f, d26, 8)}><Label x={1180} y={GROUND + 70} text="$2.6B TRADES" size={56} font="Bebas Neue" color={P.goldInk} /></g>
              <g opacity={on(f, half, 8)}><Label x={1560} y={GROUND + 70} text="THE REST" size={48} font="Bebas Neue" color={P.ink2} /></g>
            </g> })()}
          {/* # order slips streaming from the phone into the trades pile */}
          {f >= came && [0, 1, 2, 3].map((k) => { const t0 = came + k * 8, fl = fly(f, t0, [640, 420], [1180, 640], 18, 90); return f >= t0 && fl.t < 1 ? <Slip key={k} x={fl.x} y={fl.y} s={0.45} o={fl.o} /> : null })}
        </g>
      </g>}

      {/* # B) Leo taps buy; the order flies to a trading firm; the payment slips in behind the phone */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        {(() => {
          const beats: Beat[] = [[0, 'idle', 'thinking'], [who, 'shrug', 'thinking'], [tap - 6, 'phone', 'smiling'], [never4, 'phone', 'neutral']]
          return <g>
            <Person f={f} who="buyer" beats={beats} x={260} y={GROUND} s={0.82} />
            <AppPhone x={640} y={560} s={1.0} press={on(f, buy4, 4) * (1 - on(f, buy4 + 8, 6))} shares={f >= buy4 ? 'BUY 100' : undefined} />
            <g opacity={on(f, firm, 10)} transform={`translate(0 ${lerp(40, 0, pop(f, firm, 16))})`}><Tower x={1460} y={GROUND} s={0.85} f={f} sign="TRADING FIRM" glow={on(f, fill, 8) * (1 - on(f, see, 10))} /></g>
            {/* # the order slip */}
            {(() => { const fl = fly(f, buy4 + 6, [640, 540], [1460, GROUND - 120], 26, 200); return f >= buy4 + 6 ? <Slip x={fl.x} y={fl.y} s={0.7} o={1 - on(f, fill + 10, 8)} /> : null })()}
            {/* # the payment: a coin arcs back to the app and slides behind the phone */}
            {f >= pays && (() => { const fl = fly(f, pays, [1380, 360], [700, 470], 26, 160); const hide = on(f, payment5, 14)
              return <g><Cent x={lerp(fl.x, 760, hide)} y={fl.y} r={34} t="$" o={1 - hide} /></g> })()}
            <g opacity={on(f, screen, 8)}><Label x={640} y={GROUND + 70} text="YOUR SCREEN: JUST THE TRADE" size={46} font="Bebas Neue" color={P.ink2} /></g>
          </g>
        })()}
      </g>}

      {/* # C) the four steps as stations; the order slip travels them */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <Path pts={[[160, GROUND - 130], [1780, GROUND - 130]]} p={span(f, follow, steps + 40)} />
        {([[four, 'ORDER SOLD'], [four + 6, 'THE GAP'], [simple, 'THE CUT'], [steps, 'DID YOU PAY?']] as [number, string][]).map(([at, t], k) => {
          const x = 420 + k * 400
          return <g key={k} opacity={on(f, at, 8)} transform={`translate(${x} ${GROUND - 130 - 20 * (1 - pop(f, at, 14))})`}>
            {k === 0 && <Slip x={0} y={-130} s={1.1} tag={1} />}
            {k === 1 && <g transform="translate(0 -140) scale(0.42)"><Ladder x={0} y={0} gap={180} spread={1} /></g>}
            {k === 2 && <g><Cent x={-40} y={-110} r={42} t="$" /><Cent x={40} y={-140} r={34} t="$" /></g>}
            {k === 3 && <text x={0} y={-80} textAnchor="middle" fill={P.ink} style={{ font: '400 120px "Bebas Neue"' }}>?</text>}
            <circle cx={0} cy={60} r={36} fill={[P.mint, P.gold, P.sky, P.coral][k]} />
            <text x={0} y={78} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 50px "Bebas Neue"' }}>{k + 1}</text>
            <Label x={0} y={150} text={t} size={46} font="Bebas Neue" color={P.ink} />
          </g>
        })}
        {(() => { const t = span(f, four, money6 + 20), xs = [160, 420, 820, 1220, 1620], i = Math.min(3, Math.floor(t * 4)), u = t * 4 - i
          return <Slip x={lerp(xs[i], xs[i + 1], u)} y={GROUND - 420 - Math.sin(u * Math.PI) * 40} s={0.6} o={on(f, four, 8)} /> })()}
      </g>}
      <Vignette id="hd-hook" />
    </g>
  )
}

const BEATS = ['s1:app', 's1:zero', 's1:made', 's1:45', 's2:half', 's2:26', 's2:came', 's2:trades', 's3', 's3:who', 's4:tap', 's4:buy', 's4:firm', 's4:pays', 's4:app', 's4:fill', 's5:payment', 's5:screen', 's6', 's6:follow', 's6:four', 's6:simple', 's6:steps', 's6:money']
export const HD_HOOK = makePiece('hd-hook', 'PFOF long hook: a trading app with $0 commission; its 2025 money ($4.5B) splits so $2.6B glows as "from trades", fed by order slips; Leo taps BUY, the slip flies to a trading firm, a coin arcs back and slides in behind the phone, out of sight; four steps along a route', {
  mood: 'light', Component: Hook, beats: BEATS,
  sfx: [['s1:zero', 'pop', 0.25], ['s1:45', 'cash', 0.3], ['s3:who', 'swish', 0.2], ['s4:buy', 'pop', 0.25], ['s4:pays', 'coin', 0.3], ['s6:four', 'pop', 0.25]] })
