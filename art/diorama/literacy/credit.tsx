// ---------------------------------------------------------------- s70–s81: lesson six, your credit score
// A) s70–s71 the study: a LOAN money bag with a price tag that reads SCORE; a 300–850 dial sweeps; lenders ask "will
//            you pay back?".
// B) s72–s75 inside card 6: the FICO pie builds in five parts — on time 35, credit used 30, history length 15, new 10,
//            mix 10 — with a growing list; a SALARY card is shown, then crossed ("not on the list").
// C) s76–s80 the study: two identical houses, $250,000 for 30 years — top score 6.9% vs low 600s 7.9%;
//            +$169 a month, then a red tower +$61,000 of interest; "SAME LOAN" (=).
// D) s81     the rate others charge you (card + house tags) → a bill on the desk quietly shrinking (lesson seven).
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { EXTRA } from './extra'
import { Headline, Person, win } from '../aimoney/common'
import { Bill, C, CreditCard, Cross, DESK, Defs, FONT, Grain, House, Lamp, Study, Tag, fadeIn, scene } from './kit'
import { Building, Column, Gauge, Letter, Num, Pie, PriceTag, Sheet, cues, Sweep } from './kit2'

const K = {
  score70: 's70:score', price: 's70:price', borrowing: 's70:borrowing',
  three71: 's71:three', eight71: 's71:eight', lenders: 's71:lenders', back: 's71:back',
  fico: 's72:fico', five72: 's72:five',
  time73: 's73:time', thirty73: 's73:thirty', using: "s73:you're", next73: 's73:next',
  length: 's74:length', fifteen: 's74:fifteen', new74: 's74:new', mix: 's74:mix', ten74: 's74:ten',
  notice: 's75:notice', salary: 's75:salary', all75: 's75:all',
  care: 's76:care', rate76: 's76:rate', offered: "s76:you're",
  august: 's77:august', two77: 's77:two', thirty77: 's77:thirty', six77: 's77:six', top: 's77:top',
  low: 's78:low', seven78: 's78:seven',
  gap: 's79:gap', hundred79: 's79:hundred', month79: 's79:month',
  thirty80: 's80:thirty', sixty80: 's80:sixty', same: 's80:same', loan: 's80:loan',
  debt81: 's81:debt', charge: 's81:charge', quiet: 's81:quiet', eats: 's81:eats',
}
const PARTS = [['PAYING ON TIME', 35, C.cash], ['CREDIT USED', 30, C.skyD], ['HISTORY LENGTH', 15, C.brass], ['NEW CREDIT', 10, C.plum], ['ACCOUNT MIX', 10, C.teal]] as const

// # a money bag
const Bag: React.FC<{ x: number; y: number; s?: number; o?: number; text?: string }> = ({ x, y, s = 1, o = 1, text = 'LOAN' }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={170} ry={18} fill="#000" opacity={0.22} />
    <path d="M-60 -250 Q0 -280 60 -250 L40 -210 Q160 -150 160 -60 Q160 0 0 0 Q-160 0 -160 -60 Q-160 -150 -40 -210 Z" fill="#C9A877" />
    <path d="M-40 -210 Q0 -190 40 -210" stroke={C.walnutD} strokeWidth={10} fill="none" />
    <text y={-70} textAnchor="middle" fill={C.walnutD} style={{ font: `400 70px ${FONT.big}`, letterSpacing: 3 }}>{text}</text>
  </g>
)

const Credit: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s72') - 6, BC = c('s76') - 6, CD = c('s81') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = scene(f, BC, CD), D = fadeIn(f, CD)
  const partAt = [t.time73, t.thirty73, t.fifteen, t.new74, t.mix]
  const needle = f < t.three71 ? 300 : lerp(300, 850, span(f, t.three71, t.eight71 + 10)) - 140 * on(f, t.lenders, 20)

  return (
    <g>
      <Defs />
      {/* ---------------- A) a price tag on borrowing ---------------- */}
      {A > 0 && <g opacity={A}>
        <Study f={f} />
        <Lamp x={1790} s={0.75} />
        <g opacity={1 - on(f, t.three71 - 6, 10)}>
          <Bag x={860} y={DESK + 120} s={1.3} o={on(f, t.score70 - 6, 10)} />
          <PriceTag x={1130} y={DESK - 220} text="SCORE" s={1.4} o={on(f, t.price, 8)} />
          <Tag x={860} y={DESK + 200} text="BORROWING" size={40} point="none" o={on(f, t.borrowing, 8)} />
        </g>
        <g opacity={on(f, t.three71 - 6, 10)}>
          <Gauge x={900} y={DESK + 40} r={330} val={needle} />
          <Building x={1500} y={DESK + 120} s={1.1} color={C.inkSoft} h={300} o={on(f, t.lenders, 8)} />
          <Tag x={1500} y={DESK - 290} text="WILL YOU PAY US BACK?" size={36} o={on(f, t.lenders + 4, 8)} />
        </g>
      </g>}

      {/* ---------------- B) five parts — and not your salary ---------------- */}
      {B > 0 && <g opacity={B}>
        <Sheet n={6} />
        <g opacity={1 - on(f, t.notice - 4, 10) * 0.85}>
          <Pie x={620} y={650} r={320} parts={PARTS.map(([, v, col], k) => ({ v, color: col, p: span(f, partAt[k], partAt[k] + 14), label: `${v}%` }))} />
          <Tag x={620} y={290} text="FICO SCORE: 5 PARTS" size={40} point="none" o={on(f, t.fico, 8)} />
          {PARTS.map(([label, v, col], k) => (
            <g key={k} opacity={on(f, partAt[k], 8)}>
              <rect x={1080} y={390 + k * 110} width={60} height={60} rx={10} fill={col} />
              <text x={1170} y={438 + k * 110} fill={C.ink} style={{ font: `400 58px ${FONT.big}`, letterSpacing: 1 }}>{`${label} · ${v}%`}</text>
            </g>
          ))}
        </g>
        <g opacity={on(f, t.salary - 6, 10)}>
          <Letter x={1340} y={640} s={0.85} r={5} amount="$$$" head="YOUR SALARY" />
          <Cross x={1340} y={640} r={230} p={on(f, t.all75 - 6, 12)} />
        </g>
      </g>}

      {/* ---------------- C) the same loan, two rates ---------------- */}
      {Cc > 0 && <g opacity={Cc}>
        <Study f={f} />
        <Tag x={960} y={330} text="$250,000 · 30-YEAR MORTGAGE" size={44} point="none" o={on(f, t.two77, 8)} />
        <g opacity={on(f, t.august - 6, 10)}>
          <House x={560} y={DESK + 60} s={1.1} />
          <Tag x={560} y={DESK + 120} text="TOP SCORE" size={36} point="up" color={C.cashL} o={on(f, t.top, 8)} />
          <PriceTag x={500} y={DESK - 330} text="6.9%" s={1.1} o={on(f, t.six77, 8)} color={C.cashL} />
        </g>
        <g opacity={on(f, t.low - 4, 10)}>
          <House x={1240} y={DESK + 60} s={1.1} />
          <Tag x={1240} y={DESK + 120} text="LOW 600s" size={36} point="up" color={C.tomato} ink="#fff" />
          <PriceTag x={1180} y={DESK - 330} text="7.9%" s={1.1} o={on(f, t.seven78, 8)} color={C.tomato} ink="#fff" />
        </g>
        <Num x={900} y={DESK - 120} text="=" size={160} color={C.paper} o={on(f, t.same, 8)} />
        <Tag x={1240} y={DESK + 220} text="+ $169 EVERY MONTH" size={42} point="none" color={C.tomato} ink="#fff" o={on(f, t.hundred79, 8)} />
        <g opacity={on(f, t.thirty80, 8)}>
          <Column x={1660} base={DESK + 140} h={380 * span(f, t.thirty80, t.sixty80 + 10)} w={200} color={C.red} top={f >= t.sixty80 ? '+$61,000' : undefined} ink={C.paper} />
          <Tag x={1660} y={DESK + 220} text="MORE INTEREST" size={34} point="none" color={C.tomato} ink="#fff" o={on(f, t.sixty80, 8)} />
        </g>
        <Tag x={900} y={DESK + 220} text="SAME LOAN" size={42} point="none" o={on(f, t.same, 8)} />
      </g>}

      {/* ---------------- D) others' rates → the quiet one ---------------- */}
      {D > 0 && <g opacity={D}>
        <Study f={f} />
        <g opacity={1 - on(f, t.quiet - 4, 10)}>
          <CreditCard x={700} y={DESK - 120} s={1.2} r={-6} />
          <House x={1240} y={DESK + 40} s={0.95} />
          <Tag x={960} y={DESK + 180} text="RATES OTHER PEOPLE CHARGE YOU" size={40} point="none" o={on(f, t.charge, 8)} />
        </g>
        <g opacity={on(f, t.quiet - 4, 10)}>
          <Bill x={960} y={DESK - 140} s={lerp(3.6, 2.6, span(f, t.quiet, t.eats + 40))} r={-4} />
          <Tag x={960} y={DESK + 120} text="YOUR OWN MONEY, SHRINKING" size={40} point="none" o={on(f, t.eats, 8)} />
        </g>
      </g>}

      <Headline f={f} lines={[[t.price, 'A PRICE TAG ON BORROWING', C.paper, 96], [t.three71, 'SCORES RUN 300 TO 850', C.paper, 96], [t.fico, 'WHAT GOES INTO IT', C.ink, 104],
        [t.notice, 'NOT ON THE LIST', C.tomatoD, 110], [t.care, 'IT SETS YOUR RATE', C.paper, 104], [t.gap, 'ONE POINT GAP', C.paper, 110], [t.quiet, 'NOW, THE QUIET ONE', C.paper, 104]]} />
      <Sweep f={f} at={EXTRA['fl-credit'].map(c)} />
      <Grain />
    </g>
  )
}

export const FL_CREDIT = makePiece('fl-credit', 'Lesson 6, your credit score: a LOAN money bag with a SCORE price tag; a 300–850 dial sweeps and a lender building asks will you pay us back; inside card 6 the FICO pie builds — paying on time 35%, credit used 30%, history length 15%, new credit 10%, account mix 10%; a YOUR SALARY card crossed; two identical houses, a $250,000 30-year mortgage at 6.9% for a top score vs 7.9% for the low 600s, +$169 every month, a red column +$61,000 more interest, same loan; rates other people charge you, then a bill on the desk quietly shrinking', {
  mood: 'light', Component: Credit, beats: [...Object.values(K), ...EXTRA['fl-credit']],
  sfx: [['s70:price', 'swish', 0.14], ['s71:eight', 'ding', 0.14], ['s75:all', 'swish', 0.14], ['s79:hundred', 'thud', 0.16], ['s80:sixty', 'cash', 0.16]] })
void pop; void win
