// ---------------------------------------------------------------- s9–s20: what inflation really is
// A) A paper market shelf of six price tags: gas rises, a TV falls (just shifting, s10); then ALL the tags climb together (s11); your dollar shrinks (s12).
// B) Your basket: $120 → $123.60 (s13) → $161 in ten years (s14); a paper card 72 ÷ RATE = YEARS TO DOUBLE (s15); three calendars 2% → 36, 3% → 24, 7% → 10 (s16);
//    a $100 tag from JANUARY 2000 turns into $200 in 2026 (s17); a $100 bill in a drawer shrinks to half (s18).
// C) Two tags: NOMINAL = what the tag says, REAL = what it buys (s19); pay +3% and prices +3% cancel: REAL PAY +0% (s20).
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, win } from '../aimoney/common'
import { camera } from '../aimoney/common'
import { Arrow, Back, Basket, C, Calendar, Cut, Defs, Dollar, Grain, Tag, big, box, fadeIn, scene } from './kit'

const G = 900
const ITEMS = ['GAS', 'TV', 'RENT', 'BREAD', 'SHOES', 'COFFEE']
const What: React.FC<PieceProps> = ({ f, c }) => {
  const general = c('s9:general'), almost = c('s9:almost'), gas = c('s10:gas'), tvs = c('s10:tvs'), shifting = c('s10:shifting'), whole = c('s11:whole'), climbs = c('s11:climbs')
  const losing = c('s12:losing'), buying = c('s12:buying'), becomes = c('s13:becomes'), sixty = c('s13:sixty'), ten = c('s14:ten'), sixty1 = c('s14:sixty')
  const trick = c('s15:trick'), divide = c('s15:divide'), double = c('s15:double'), two = c('s16:two'), thirty = c('s16:thirty'), three = c('s16:three'), twenty = c('s16:twenty'), seven = c('s16:seven'), ten16 = c('s16:ten')
  const theory = c('s17:theory'), january = c('s17:january'), two17 = c('s17:two'), drawer = c('s18:drawer'), fifty = c('s18:fifty')
  const split = c('s19:split'), nominal = c('s19:nominal'), real = c('s19:real'), pay = c('s20:pay'), prices = c('s20:prices'), move = c('s20:move')
  const AB = c('s13') - 6, BC = c('s19') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = fadeIn(f, BC)
  const lift = (k: number) => { const own = k === 0 ? 60 * on(f, gas, 12) : k === 1 ? -50 * on(f, tvs, 12) : 0; const all = -110 * on(f, whole + k * 3, 16); return (f < whole ? own : own * (1 - on(f, whole, 10))) + all }
  const b1 = 1 - on(f, trick - 6, 8), b2 = win(f, trick - 6, theory - 4, 8), b3 = on(f, theory - 4, 8)
  return (
    <g transform={camera(f, ACC.map((k, i) => [c(k), 960, 540, i % 2 ? 1 : 1.025] as [number, number, number, number]), 26)}>
      <Defs />
      {A > 0 && <g opacity={A}>
        <Back sky="day" f={f} />
        <g opacity={1 - on(f, losing - 6, 8)}>
          <Cut d={box(220, G - 170, 1480, 40, 8)} fill={C.brown} />
          {ITEMS.map((t, k) => { const x = 330 + k * 250, y = G - 300 + lift(k) - (k === 0 ? 120 * 0 : 0)
            return <g key={k} opacity={on(f, general - 4 + k * 3, 8)}><line x1={x - 40} y1={G - 170} x2={x - 40} y2={y + 10} stroke={C.ink} strokeWidth={3} /><Tag x={x} y={y} text={t} size={40} color={k === 0 && f >= gas && f < whole ? C.coral : k === 1 && f >= tvs && f < whole ? C.teal : f >= whole ? C.mustard : C.cream} /></g> })}
          <Tag x={960} y={300} text="JUST PRICES SHIFTING" size={44} o={win(f, shifting - 2, whole - 2, 8)} />
          <Tag x={960} y={300} text="THE WHOLE BASKET CLIMBS" size={48} color={C.coral} ink="#fff" o={on(f, climbs - 4, 8)} />
          {f >= whole && ITEMS.map((_, k) => <Arrow key={k} x1={330 + k * 250} y1={G - 150} x2={330 + k * 250} y2={G - 230} o={on(f, whole + k * 3, 8)} col={C.coral} w={8} />)}
        </g>
        <g opacity={on(f, losing - 6, 8)}>
          <Dollar x={960} y={560} s={2} power={lerp(1, 0.6, on(f, buying - 4, 24))} />
          <Tag x={960} y={820} text="LESS BUYING POWER" size={50} color={C.coral} ink="#fff" o={on(f, buying, 8)} />
        </g>
      </g>}
      {B > 0 && <g opacity={B}>
        <Back sky="warm" f={f} sun={[1640, 230]} />
        {b1 > 0.01 && <g opacity={b1}>
          <Basket x={760} y={G - 30} s={1.5} tag={f >= ten ? (f >= sixty1 ? '$161' : '$123.60') : f >= sixty ? '$123.60' : '$120'} tagCol={f >= sixty ? C.coral : C.cream} />
          <Calendar x={1460} y={520} s={1.3} text={f >= ten ? '10 YEARS' : '1 YEAR'} o={on(f, becomes - 4, 8)} col={C.teal} />
          <Tag x={1460} y={720} text="AT 3% A YEAR" size={40} color={C.mustard} o={on(f, becomes, 8)} />
        </g>}
        {b2 > 0.01 && <g opacity={b2}>
          <g transform={`translate(960 400) scale(${0.9 + 0.1 * pop(f, trick - 2, 12)})`}>
            <Cut d={box(-430, -110, 860, 220, 18)} fill={C.cream} />
            <text y={-30} textAnchor="middle" fill={C.inkSoft} style={big(44)}>THE RULE OF 72</text>
            <text y={60} textAnchor="middle" fill={C.ink} opacity={on(f, divide - 2, 8)} style={big(70)}>72 ÷ RATE = YEARS TO DOUBLE</text>
          </g>
          {([[two, '2%', thirty, '36 YRS'], [three, '3%', twenty, '24 YRS'], [seven, '7%', ten16, '~10 YRS']] as [number, string, number, string][]).map(([a, r, b, y], k) =>
            <g key={k} opacity={pop(f, a - 2, 10)}><Tag x={520 + k * 440} y={640} text={r} size={56} color={[C.teal, C.mustard, C.coral][k]} /><Calendar x={520 + k * 440} y={810} text={y} o={on(f, b - 2, 8)} col={[C.teal, C.mustard, C.coral][k]} /></g>)}
          <Tag x={960} y={560} text="PRICES DOUBLE IN..." size={36} o={on(f, double - 2, 8) * (1 - on(f, two - 4, 6))} />
        </g>}
        {b3 > 0.01 && <g opacity={b3}>
          <Tag x={560} y={480} text="$100" size={90} rot={-4} />
          <Calendar x={560} y={700} text="JAN 2000" o={on(f, january - 2, 8)} />
          <Arrow x1={760} y1={480} x2={1080} y2={480} o={on(f, two17 - 6, 8)} col={C.coral} />
          <Tag x={1340} y={480} text="$200" size={110} color={C.coral} ink="#fff" o={pop(f, two17 - 2, 12)} rot={3} />
          <Calendar x={1340} y={700} text="SEP 2026" o={on(f, two17, 8)} col={C.teal} />
          <g opacity={on(f, drawer - 6, 8)} transform="translate(960 0)">
            <rect x={-1960} y={0} width={4000} height={1080} fill={C.paper} opacity={on(f, drawer - 6, 8)} />
            <Cut d={box(-380, 560, 760, 280, 14)} fill={C.brown} /><rect x={-80} y={600} width={160} height={24} rx={12} fill={C.mustard} />
            <Dollar x={0} y={420} s={1.6} power={lerp(1, 0.5, on(f, fifty - 4, 24))} v="$100" />
            <Tag x={0} y={250} text={f >= fifty ? 'BUYS ABOUT $50 OF STUFF' : 'KEPT IN A DRAWER SINCE 2000'} size={44} color={f >= fifty ? C.coral : C.cream} ink={f >= fifty ? '#fff' : C.ink} />
          </g>
        </g>}
      </g>}
      {Cc > 0 && <g opacity={Cc}>
        <Back sky="mint" f={f} sun={null} />
        <g opacity={1 - on(f, pay - 6, 8)}>
          <Tag x={560} y={440} text="NOMINAL" size={80} color={C.mustard} o={pop(f, nominal - 2, 10)} rot={-3} />
          <text x={560} y={590} textAnchor="middle" fill={C.ink} opacity={on(f, nominal, 8)} style={big(46)}>WHAT THE TAG SAYS</text>
          <Tag x={1360} y={440} text="REAL" size={80} color={C.teal} ink="#fff" o={pop(f, real - 2, 10)} rot={3} />
          <text x={1360} y={590} textAnchor="middle" fill={C.ink} opacity={on(f, real, 8)} style={big(46)}>WHAT IT CAN BUY</text>
          <Basket x={1360} y={900} s={0.8} o={on(f, real + 4, 8)} />
        </g>
        <g opacity={on(f, pay - 6, 8)}>
          <Dollar x={560} y={520} s={1.2} /><Arrow x1={560} y1={700} x2={560} y2={360} o={on(f, pay, 8)} col={C.teal} /><Tag x={560} y={780} text="PAY +3%" size={50} o={on(f, pay, 8)} color={C.teal} ink="#fff" />
          <Basket x={1360} y={640} s={1} /><Arrow x1={1360} y1={700} x2={1360} y2={360} o={on(f, prices, 8)} col={C.coral} /><Tag x={1360} y={780} text="PRICES +3%" size={50} o={on(f, prices, 8)} color={C.coral} ink="#fff" />
          <Tag x={960} y={920} text="REAL PAY: +0%" size={64} color={C.mustard} o={pop(f, move - 6, 12)} />
        </g>
      </g>}
      <Headline f={f} lines={[[general, 'WHAT INFLATION IS', C.ink, 104], [becomes, 'YOUR $120 SHOP', C.ink, 104], [trick, 'WHEN PRICES DOUBLE', C.ink, 104], [theory, 'NOT JUST THEORY', C.ink, 104], [split, 'NOMINAL VS REAL', C.ink, 108]]} />
      <Grain />
    </g>
  )
}
const ACC = ["s9:inflation","s9:not","s9:average","s10:that's","s11:inflation","s12:here's","s12:way","s12:inflation","s13:year","s15:there's","s15:seventy","s15:inflation","s15:get","s15:years","s17:hundred","s17:cost#2","s17:2026","s18:put","s18:dollar","s18:now","s18:stuff","s19:two","s19:tag","s19:buy","s20:percent#2","s20:rose","s20:real"]  // # accent words: a gentle camera push on each (fills >2 s gaps)
const BEATS = ['s9:general', 's9:almost', 's10:gas', 's10:tvs', 's10:shifting', 's11:whole', 's11:climbs', 's12:losing', 's12:buying', 's13:becomes', 's13:sixty', 's14:ten', 's14:sixty', 's15:trick', 's15:divide', 's15:double', 's16:two', 's16:thirty', 's16:three', 's16:twenty', 's16:seven', 's16:ten', 's17:theory', 's17:january', 's17:two', 's18:drawer', 's18:fifty', 's19:split', 's19:nominal', 's19:real', 's20:pay', 's20:prices', 's20:move']
export const DD_WHAT = makePiece('dd-what', 'What inflation is, paper-cut: a market shelf of price tags GAS (up), TV (down) = JUST PRICES SHIFTING, then all tags climb (THE WHOLE BASKET CLIMBS), a banknote shrinks LESS BUYING POWER; your basket $120 → $123.60 → $161 with a calendar 1 YEAR / 10 YEARS AT 3% A YEAR; THE RULE OF 72 card (72 ÷ RATE = YEARS TO DOUBLE) with 2% → 36 YRS, 3% → 24 YRS, 7% → ~10 YRS; $100 in JAN 2000 → $200 in SEP 2026; a $100 bill in a drawer shrinks (BUYS ABOUT $50 OF STUFF); NOMINAL (what the tag says) vs REAL (what it can buy); PAY +3%, PRICES +3%, REAL PAY: +0%', {
  mood: 'light', Component: What, beats: [...BEATS, ...ACC],
  sfx: [['s10:gas', 'pop', 0.08], ['s10:tvs', 'pop', 0.08], ['s11:whole', 'riser', 0.1], ['s12:buying', 'swish', 0.1], ['s13:sixty', 'ding', 0.08], ['s14:sixty', 'ding', 0.1], ['s15:trick', 'pop', 0.1], ['s16:two', 'pop', 0.08], ['s16:three', 'pop', 0.08], ['s16:seven', 'pop', 0.08], ['s17:two', 'impact', 0.1], ['s18:fifty', 'thud', 0.1], ['s19:nominal', 'pop', 0.08], ['s19:real', 'pop', 0.08], ['s20:move', 'ding', 0.1]] })
