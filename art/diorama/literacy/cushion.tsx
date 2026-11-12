// ---------------------------------------------------------------- s48–s57: lesson four, the emergency cushion
// A) s48    the study: a fat cushion lands on the desk.
// B) s49    inside card 4: three adults; one (and a bit more) lights up red; a surprise $400 bill drops in front of them.
// C) s50    the study: a car breaks down (smoke); its bill slides onto a credit card, which glows red ("hurts").
// D) s51–s52 inside card 4: six month pages, the first three lit, "3 TO 6 MONTHS"; Maya's essentials (rent, food,
//            bills, getting to work) = $3,000 a month; × 3 = $9,000 in a jar.
// E) s53–s57 the study: two jars of $9,000 — AVERAGE 0.38% and HIGH YIELD ≈ 4%; coins drip: +$34 vs +$360 a year;
//            the same money, a different account; a green arrow WORKING FOR HER, then a red one AGAINST (lesson five).
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { EXTRA } from './extra'
import { Headline, Person, win } from '../aimoney/common'
import { Bill, C, Coin, CreditCard, DESK, Defs, FONT, Grain, House, Lamp, Study, Tag, fadeIn, scene } from './kit'
import { Arrow, Basket, Calendar, Car, Jar, Num, Sheet, cues, Sweep } from './kit2'

const K = {
  before48: 's48:before', cushion: 's48:cushion',
  why: "s49:here's", survey: 's49:survey', one49: 's49:one', three49: 's49:three', four49: 's49:four', cash49: 's49:cash',
  car: 's50:car', credit: 's50:credit', exactly: 's50:exactly', hurts: 's50:hurts',
  common: 's51:common', three51: 's51:three', six51: 's51:six', cash51: 's51:cash',
  essentials: "s52:maya's", rent: 's52:rent', food: 's52:food', bills: 's52:bills', work: 's52:work', three52: 's52:three', nine52: 's52:nine',
  keeps: 's53:keeps', national: 's53:national', zero: 's53:zero',
  online: 's54:online', high: 's54:high', four54: 's54:four',
  thirty55: 's55:thirty', three55: 's55:three',
  same: 's56:same', different: 's56:different',
  working: 's57:working', against: 's57:against',
}
const G = 1010

// # a plump cushion
const Cushion: React.FC<{ x: number; y: number; s?: number; o?: number; squash?: number }> = ({ x, y, s = 1, o = 1, squash = 0 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s * (1 + 0.08 * squash)} ${s * (1 - 0.12 * squash)})`} opacity={o}>
    <ellipse cx={0} cy={8} rx={300} ry={26} fill="#000" opacity={0.22} />
    <path d="M-290 -20 Q-300 -190 -250 -200 Q0 -240 250 -200 Q300 -190 290 -20 Q0 20 -290 -20 Z" fill={C.tomato} />
    <path d="M-250 -200 Q0 -240 250 -200 Q200 -170 0 -180 Q-200 -170 -250 -200 Z" fill="#fff" opacity={0.2} />
    <circle cx={0} cy={-110} r={16} fill={C.tomatoD} />
    {[-1, 1].map((k) => <path key={k} d={`M${k * 290} -20 L${k * 320} 10 M${k * 250} -200 L${k * 280} -230`} stroke={C.tomatoD} strokeWidth={10} strokeLinecap="round" />)}
    <text y={-60} textAnchor="middle" fill="#fff" opacity={0.9} style={{ font: `400 64px ${FONT.big}`, letterSpacing: 4 }}>CASH CUSHION</text>
  </g>
)

const Cushions: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s49') - 6, BC = c('s50') - 6, CD = c('s51') - 6, DE = c('s53') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = scene(f, BC, CD), D = scene(f, CD, DE), E = fadeIn(f, DE)

  const land = pop(f, t.cushion - 6, 16)
  const slide = span(f, t.credit, t.credit + 16)
  const drip = (at: number, k: number) => { const p = ((f - at) / 20 + k / 3) % 1; return f > at ? p : -1 }

  return (
    <g>
      <Defs />
      {/* ---------------- A) build a cushion ---------------- */}
      {A > 0 && <g opacity={A}>
        <Study f={f} />
        <Lamp x={1760} s={0.8} />
        <Cushion x={960} y={DESK + 120 - 220 * (1 - land)} s={1.2} o={on(f, t.cushion - 6, 6)} squash={Math.max(0, Math.sin(span(f, t.cushion + 6, t.cushion + 20) * Math.PI))} />
      </g>}

      {/* ---------------- B) one in three couldn't cover $400 ---------------- */}
      {B > 0 && <g opacity={B}>
        <Sheet n={4} />
        {(['buyer', 'worker', 'investor'] as const).map((who, k) => {
          const hit = k === 2 && f >= t.three49
          return <g key={who} opacity={on(f, t.one49 - 4 + k * 3, 8)}>
            {hit && <ellipse cx={560 + k * 400} cy={G - 260} rx={190} ry={330} fill={C.tomato} opacity={0.18} />}
            <Person f={f} who={who} beats={[[0, 'idle', 'neutral'], [t.four49 + k * 3, hit ? 'shock' : 'think', hit ? 'shocked' : 'thinking']]} x={560 + k * 400} y={G + 30} s={0.8} flip={k === 2} />
          </g>
        })}
        <Tag x={1360} y={470} text="MORE THAN 1 IN 3" size={44} color={C.tomato} ink="#fff" o={on(f, t.three49, 8)} />
        <g opacity={on(f, t.four49, 8)} transform={`translate(0 ${-60 * (1 - pop(f, t.four49, 14))})`}>
          <Bill x={960} y={430} s={2.2} r={-6} red />
          <Tag x={960} y={320} text={f >= t.cash49 ? "NO CASH FOR IT" : "SURPRISE $400 BILL"} size={42} />
        </g>
        
      </g>}

      {/* ---------------- C) the car breaks down → the card ---------------- */}
      {Cc > 0 && <g opacity={Cc}>
        <Study f={f} />
        <Car x={620} y={DESK + 140} s={1.2} smoke={on(f, t.car, 16)} o={on(f, BC, 8)} />
        <g opacity={on(f, t.car + 6, 8)}><Bill x={lerp(760, 1320, slide)} y={lerp(DESK - 260, DESK - 40, slide)} s={1.8} r={lerp(-8, 6, slide)} red /></g>
        <CreditCard x={1360} y={DESK - 40} s={1.4} r={-6} o={on(f, t.credit - 6, 8)} />
        <ellipse cx={1360} cy={DESK - 40} rx={260} ry={180} fill={C.red} opacity={0.25 * on(f, t.hurts, 10)} />
        <Tag x={1360} y={DESK + 190} text="LESSON 5 →" size={36} point="none" o={on(f, t.exactly, 8)} />
      </g>}

      {/* ---------------- D) how big: 3–6 months of essentials ---------------- */}
      {D > 0 && <g opacity={D}>
        <Sheet n={4} />
        <g opacity={1 - on(f, t.essentials - 4, 10)}>
          {Array.from({ length: 6 }, (_, k) => <Calendar key={k} x={360 + k * 240} y={600} s={0.85} top="MONTH" big={String(k + 1)} color={k < 3 ? C.cashD : C.teal}
            o={on(f, (k < 3 ? t.three51 : t.six51) + (k % 3) * 3, 8) * (k < 3 ? 1 : 0.6)} />)}
          <Tag x={960} y={820} text="3 TO 6 MONTHS OF ESSENTIALS" size={46} point="none" o={on(f, t.six51 + 4, 8)} />
          <Tag x={960} y={910} text="IN CASH" size={40} point="none" color={C.cashL} o={on(f, t.cash51, 8)} />
        </g>
        <g opacity={on(f, t.essentials - 4, 10)}>
          <House x={300} y={700} s={0.7} o={on(f, t.rent, 8)} /><Tag x={300} y={750} text="RENT" size={32} point="up" o={on(f, t.rent, 8)} />
          <Basket x={600} y={700} s={0.55} o={on(f, t.food, 8)} /><Tag x={600} y={750} text="FOOD" size={32} point="up" o={on(f, t.food, 8)} />
          <g opacity={on(f, t.bills, 8)}><Bill x={880} y={600} s={1.4} r={-6} /><Bill x={900} y={640} s={1.4} r={4} /><Tag x={890} y={750} text="BILLS" size={32} point="up" /></g>
          <Car x={1160} y={700} s={0.45} o={on(f, t.work, 8)} /><Tag x={1160} y={750} text="GETTING TO WORK" size={32} point="up" o={on(f, t.work, 8)} />
          <Num x={730} y={920} text="= $3,000 A MONTH" size={70} color={C.ink} o={on(f, t.three52, 8)} />
          <Jar x={1600} y={880} s={1} fill={span(f, t.three52 + 10, t.nine52 + 10) * 0.9} label="× 3" o={on(f, t.three52 + 6, 8)} />
          <Num x={1600} y={440} text="$9,000" size={110} color={C.cashD} o={on(f, t.nine52, 8)} />
        </g>
      </g>}

      {/* ---------------- E) where it sits matters ---------------- */}
      {E > 0 && <g opacity={E}>
        <Study f={f} />
        <Lamp x={1780} s={0.75} />
        <g opacity={1 - on(f, t.working - 4, 10) * 0.75}>
          <Jar x={680} y={DESK + 100} s={1.15} fill={0.7} label="$9,000" o={on(f, t.national - 4, 10)} />
          <Tag x={680} y={DESK - 340} text="AVERAGE 0.38%" size={44} color={C.paperD} o={on(f, t.zero, 8)} />
          <Jar x={1240} y={DESK + 100} s={1.15} fill={0.7} label="$9,000" color={C.goldD} o={on(f, t.online - 4, 10)} />
          <Tag x={1240} y={DESK - 340} text="HIGH YIELD ≈ 4%" size={44} color={C.cashL} o={on(f, t.four54, 8)} />
          {/* # coins drip out on "thirty four" (one slow coin) and "three hundred and sixty" (a fast stream) */}
          {[0].map((k) => { const p = drip(t.thirty55, k); return p >= 0 && f < t.same ? <Coin key={k} x={680} y={DESK + 120 + p * 120} r={22} o={1 - p} /> : null })}
          {[0, 1, 2].map((k) => { const p = drip(t.three55, k); return p >= 0 && f < t.same ? <Coin key={k} x={1240} y={DESK + 120 + p * 120} r={28} o={1 - p} /> : null })}
          <Num x={680} y={DESK + 250} text="+ $34 A YEAR" size={60} color={C.paper} o={on(f, t.thirty55, 8)} />
          <Num x={1240} y={DESK + 250} text="+ $360 A YEAR" size={72} color={C.brassL} o={on(f, t.three55, 8)} />
          <Tag x={960} y={DESK - 120} text="SAME MONEY" size={40} point="none" o={win(f, t.same, t.working, 8)} />
        </g>
        <Arrow x1={1480} y1={DESK - 40} x2={1480} y2={DESK - 400} p={span(f, t.working, t.working + 14)} color={C.cash} w={22} />
        <Tag x={1480} y={DESK + 40} text="WORKING FOR HER" size={40} point="none" color={C.cashL} o={on(f, t.working, 8)} />
        <Arrow x1={440} y1={DESK - 400} x2={440} y2={DESK - 40} p={span(f, t.against, t.against + 14)} color={C.red} w={22} />
        <Tag x={440} y={DESK + 40} text="AGAINST HER" size={40} point="none" color={C.tomato} ink="#fff" o={on(f, t.against, 8)} />
      </g>}

      <Headline f={f} lines={[[t.cushion, 'FIRST, A CUSHION', C.paper, 110], [t.survey, 'A SURPRISE $400 BILL', C.ink, 100], [BC + 4, 'NO CUSHION → THE CARD', C.paper, 100],
        [t.common, 'HOW BIG?', C.ink, 110], [t.keeps, 'WHERE IT SITS MATTERS', C.paper, 100], [t.same, 'SAME $9,000, 10× THE INTEREST', C.paper, 92]]} />
      <Sweep f={f} at={EXTRA['fl-cushion'].map(c)} />
      <Grain />
    </g>
  )
}

export const FL_CUSHION = makePiece('fl-cushion', 'Lesson 4, the emergency cushion: a fat red CASH CUSHION lands on the desk; inside card 4 three adults, more than one in three can\'t cover a surprise $400 bill; a car breaks down in smoke and its red bill slides onto a credit card that glows red; six month pages, three to six months of essentials in cash; Maya\'s rent, food, bills and getting to work = $3,000 a month, × 3 = $9,000 in a jar; two $9,000 jars — average 0.38% drips $34 a year, high yield about 4% streams $360; green arrow working for her, red arrow against', {
  mood: 'light', Component: Cushions, beats: [...Object.values(K), ...EXTRA['fl-cushion']],
  sfx: [['s48:cushion', 'thud', 0.18], ['s49:four', 'swish', 0.14], ['s50:car', 'thud', 0.14], ['s52:nine', 'cash', 0.16], ['s55:three', 'cash', 0.16]] })
