// ---------------------------------------------------------------- s36–s47: lesson three, pay yourself first
// A) s36    the study: a savings jar tagged 1ST and a wallet tagged 2ND; the reverse order (SPEND → SAVE) is shown, then crossed.
// B) s37–s38 inside card 3 — the backwards way: pay flies to rent (house), food (basket), friends (two drinks)… the
//            savings jar at the end gets nothing ($0); Maya shrugs.
// C) s39–s42 the flipped order: a PAYDAY calendar, an automatic transfer arrow drops money into the jar FIRST (locked),
//            the rest goes to the wallet; 10% → ≈ $420 a month, ≈ $5,000 a year; Maya barely notices.
// D) s43–s47 the study: a 2005 book; a 50/30/20 pie (needs, wants, savings + debt); a LAW scroll crossed; a city skyline
//            and the needs slice swells; then a stack of bills with SAVINGS on top, like a bill; the jar asks "?" → card 4.
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { EXTRA } from './extra'
import { Headline, Person, win } from '../aimoney/common'
import { Bill, C, Card, Cross, DESK, Defs, FONT, Grain, House, Lamp, Paycheck, Study, Tag, fadeIn, scene } from './kit'
import { Arrow, Basket, Building, Calendar, Jar, Num, Pie, Sheet, cues, Sweep } from './kit2'

const K = {
  save36: 's36:save', spend36: 's36:spend', other: 's36:other', around: 's36:around',
  backwards: 's37:backwards', rent: 's37:rent', food: 's37:food', friends: 's37:friends', save37: 's37:save', month37: 's37:month',
  nothing: 's38:nothing',
  flip: 's39:flip', payday: 's39:payday', automatic: 's39:automatic', savings39: 's39:savings', touch: 's39:touch',
  rest40: 's40:rest', tax40: 's40:tax',
  ten41: 's41:ten', four41: 's41:four', five41: 's41:five',
  barely: 's42:barely', spending: 's42:spending', spent: 's42:spent',
  guide: 's43:guide', fifty43: 's43:fifty', warren: 's43:warren', book: 's43:book',
  fifty44: 's44:fifty', needs44: 's44:needs', thirty44: 's44:thirty', wants: 's44:wants', twenty44: 's44:twenty', debt44: 's44:debt',
  starting: 's45:starting', law: 's45:law', city: 's45:city', bigger: 's45:bigger',
  order46: 's46:order', first46: 's46:first', bill: 's46:bill',
  where47: 's47:where', four47: 's47:four',
}
const G = 1010

// # a leather wallet
const Wallet: React.FC<{ x: number; y: number; s?: number; o?: number; fat?: number }> = ({ x, y, s = 1, o = 1, fat = 0 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={150} ry={14} fill="#000" opacity={0.2} />
    {fat > 0.01 && [0, 1, 2].map((k) => <Bill key={k} x={-10 + k * 14} y={-150 - k * 8} r={-8 + k * 8} o={fat} />)}
    <rect x={-140} y={-150} width={280} height={150} rx={22} fill={C.walnut} /><rect x={-140} y={-150} width={280} height={34} rx={16} fill={C.walnutL} />
    <rect x={40} y={-100} width={110} height={56} rx={16} fill={C.walnutD} /><circle cx={70} cy={-72} r={10} fill={C.brass} />
  </g>
)
// # two drinks (friends)
const Drinks: React.FC<{ x: number; y: number; o?: number }> = ({ x, y, o = 1 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={120} ry={14} fill="#000" opacity={0.2} />
    {[-50, 50].map((k, i) => <g key={k} transform={`translate(${k} 0) rotate(${i ? 10 : -10})`}><path d="M-40 -200 L40 -200 L30 0 L-30 0 Z" fill="#F6D27A" opacity={0.9} /><rect x={-40} y={-214} width={80} height={26} rx={10} fill="#fff" /><path d="M-40 -200 L40 -200 L30 0 L-30 0 Z" fill="none" stroke="#fff" strokeWidth={5} /></g>)}
  </g>
)
// # a book
const Book: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-120} y={-170} width={240} height={340} rx={10} fill="#000" opacity={0.22} transform="translate(8 10)" />
    <rect x={-120} y={-170} width={240} height={340} rx={10} fill={C.tealD} /><rect x={-120} y={-170} width={26} height={340} fill="#000" opacity={0.2} />
    <text x={12} y={-40} textAnchor="middle" fill={C.brassL} style={{ font: `400 66px ${FONT.big}` }}>50/30/20</text>
    <line x1={-60} x2={84} y1={0} y2={0} stroke={C.brassL} strokeWidth={4} />
    <text x={12} y={90} textAnchor="middle" fill="#fff" style={{ font: `400 64px ${FONT.big}` }}>2005</text>
  </g>
)

const First: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s37') - 6, BC = c('s39') - 6, CD = c('s43') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = scene(f, BC, CD), D = fadeIn(f, CD)

  // # B) a bill flies from the paycheck (left) to each destination on its word
  const dest = [[t.rent, 620], [t.food, 980], [t.friends, 1320]] as const
  const flyBill = (at: number, x: number, k: number) => { const p = span(f, at - 4, at + 12); return p > 0 && p < 1 ? <Bill key={k} x={lerp(260, x, p)} y={lerp(560, 700, p) - Math.sin(p * Math.PI) * 160} s={1.3} r={p * 30} /> : null }
  // # C) the transfer: money drops into the jar on "automatic"
  const drop = span(f, t.automatic, t.savings39 + 10)
  const jarFill = lerp(0.05, 0.45, on(f, t.savings39, 16)) + 0.2 * on(f, t.five41, 16)
  // # D) the 50/30/20 pie, needs swell on "bigger"
  const swell = on(f, t.city, 20)

  return (
    <g>
      <Defs />
      {/* ---------------- A) save first, spend what's left ---------------- */}
      {A > 0 && <g opacity={A}>
        <Study f={f} />
        <Lamp x={1760} s={0.8} />
        <Jar x={700} y={DESK + 80} s={1} fill={0.35} label="SAVINGS" o={on(f, t.save36 - 4, 10)} />
        <Tag x={700} y={DESK - 330} text="1ST" size={56} color={C.cashL} o={on(f, t.save36, 8)} />
        <Wallet x={1180} y={DESK + 80} s={1.2} fat={0.8} o={on(f, t.spend36 - 4, 10)} />
        <Tag x={1180} y={DESK - 330} text="2ND" size={56} o={on(f, t.spend36, 8)} />
        <g opacity={on(f, t.other, 8)}><Tag x={940} y={DESK + 230} text="SPEND → SAVE" size={46} point="none" color={C.paperD} /><Cross x={940} y={DESK + 230} r={90} p={on(f, t.around, 12)} /></g>
      </g>}

      {/* ---------------- B) the backwards way ---------------- */}
      {B > 0 && <g opacity={B}>
        <Sheet n={3} />
        <Paycheck x={260} y={560} s={0.8} open={0.5} amount="$4,200" who="PAY: MAYA" o={on(f, AB, 10)} />
        <House x={620} y={G - 60} s={0.95} o={on(f, t.rent, 8)} /><Tag x={620} y={G - 20} text="RENT" size={36} point="up" o={on(f, t.rent, 8)} />
        <Basket x={980} y={G - 60} s={0.8} o={on(f, t.food, 8)} /><Tag x={980} y={G - 20} text="FOOD" size={36} point="up" o={on(f, t.food, 8)} />
        <Drinks x={1320} y={G - 60} o={on(f, t.friends, 8)} /><Tag x={1320} y={G - 20} text="FRIENDS" size={36} point="up" o={on(f, t.friends, 8)} />
        <Jar x={1660} y={G - 60} s={0.85} fill={0} label="SAVE" o={on(f, t.save37, 8)} />
        {dest.map(([at, x], k) => flyBill(at, x, k))}
        <Tag x={1660} y={G - 380} text="$0 LEFT" size={50} color={C.tomato} ink="#fff" o={on(f, t.nothing, 8)} />
        <Tag x={1660} y={G - 20} text="LAST" size={36} point="up" o={on(f, t.month37, 8)} />
      </g>}

      {/* ---------------- C) flip the order ---------------- */}
      {Cc > 0 && <g opacity={Cc}>
        <Sheet n={3} />
        <Calendar x={260} y={560} s={1.1} top="PAYDAY" big="1" o={on(f, t.payday - 4, 8)} />
        <Jar x={760} y={G - 40} s={1.1} fill={jarFill} label="SAVINGS" o={on(f, t.flip, 8)} />
        <Tag x={760} y={460} text="1ST · AUTOMATIC" size={40} color={C.cashL} o={on(f, t.automatic, 8)} />
        <Arrow x1={400} y1={560} x2={680} y2={640} p={span(f, t.automatic - 4, t.automatic + 12)} color={C.cashD} w={14} bend={-0.2} />
        {drop > 0 && drop < 1 && <Bill x={760} y={lerp(380, G - 200, drop)} s={1.3} />}
        {/* # a lock: she can't touch it */}
        <g opacity={on(f, t.touch, 8)} transform={`translate(890 ${G - 300})`}><rect x={-34} y={-10} width={68} height={56} rx={10} fill={C.brass} /><path d="M-20 -10 V-30 A20 20 0 0 1 20 -30 V-10" stroke={C.brassD} strokeWidth={10} fill="none" /></g>
        <Wallet x={1350} y={G - 40} s={1.3} fat={on(f, t.rest40, 12)} o={on(f, t.rest40 - 4, 8)} />
        <Tag x={1350} y={G - 330} text="2ND: LIVE ON THE REST" size={38} o={on(f, t.rest40, 8)} />
        <g opacity={on(f, t.ten41, 8)}>
          <Tag x={760} y={330} text="10% OF TAKE HOME" size={40} point="none" color={C.paperD} />
          <Num x={1250} y={430} text={f >= t.five41 ? '≈ $5,000 A YEAR' : f >= t.four41 ? '≈ $420 A MONTH' : ''} size={90} color={C.cashD} />
        </g>
        <Person f={f} who="investorF" beats={[[0, 'present', 'smiling'], [t.barely, 'relax', 'smiling'], [t.spent, 'thumbsUp', 'smiling']]} x={1720} y={G + 40} s={0.8} o={on(f, t.barely - 4, 10)} />
      </g>}

      {/* ---------------- D) 50 / 30 / 20 ---------------- */}
      {D > 0 && <g opacity={D}>
        <Study f={f} />
        <g opacity={1 - on(f, t.order46 - 4, 10)}>
          <Book x={520} y={DESK - 120} s={1} o={on(f, t.warren - 6, 10) * (1 - on(f, t.fifty44 - 4, 10))} />
          <Pie x={960} y={DESK - 170} r={lerp(240, 270, swell)} parts={[
            { v: 50 + 14 * swell, color: C.skyD, p: span(f, t.fifty44, t.fifty44 + 14), label: 'NEEDS 50' },
            { v: 30 - 8 * swell, color: C.tomato, p: span(f, t.thirty44, t.thirty44 + 14), label: 'WANTS 30' },
            { v: 20 - 6 * swell, color: C.cash, p: span(f, t.twenty44, t.twenty44 + 14), label: 'SAVE 20' },
          ]} />
          <Tag x={1400} y={DESK - 360} text="RENT · GROCERIES" size={34} point="none" o={win(f, t.needs44, t.thirty44, 8)} />
          <Tag x={1400} y={DESK - 360} text="SAVINGS + DEBT" size={34} point="none" color={C.cashL} o={win(f, t.debt44, t.starting, 8)} />
          <g opacity={win(f, t.starting, t.city, 8)}><Card x={1450} y={DESK - 140} s={0.8} title="LAW" /><Cross x={1450} y={DESK - 140} r={130} p={on(f, t.law, 12)} /></g>
          <g opacity={on(f, t.city - 4, 10)}>{[0, 1, 2, 3].map((k) => <Building key={k} x={1330 + k * 120} y={DESK + 40} s={0.8} h={240 + (k % 2) * 110} color={[C.skyD, C.plum, C.tealD, C.inkSoft][k]} />)}</g>
        </g>
        <g opacity={on(f, t.order46 - 4, 10)}>
          {Array.from({ length: 5 }, (_, k) => <Bill key={k} x={900} y={DESK + 40 - k * 40} s={1.8} r={k % 2 ? 2 : -2} />)}
          <Tag x={900} y={DESK - 220} text="SAVINGS: PAID FIRST" size={42} color={C.cashL} o={on(f, t.first46, 8)} />
          <Tag x={900} y={DESK + 150} text="LIKE A BILL" size={36} point="up" o={on(f, t.bill, 8)} />
          <Jar x={1380} y={DESK + 80} s={0.8} fill={0.5} o={on(f, t.where47 - 4, 8)} />
          <Num x={1380} y={DESK - 260} text="?" size={160} color={C.brassL} o={on(f, t.where47, 8)} />
          <Card x={540} y={DESK - 220} s={0.7} n={4} r={-4} o={on(f, t.four47, 8)} glow={on(f, t.four47, 8)} />
        </g>
      </g>}

      <Headline f={f} lines={[[t.save36, 'SAVE FIRST, SPEND WHAT\'S LEFT', C.paper, 92], [t.backwards, 'THE BACKWARDS WAY', C.ink, 100], [t.nothing, 'NOTHING LEFT', C.tomatoD, 110],
        [t.flip, 'FLIP THE ORDER', C.ink, 110], [t.guide, 'THE 50/30/20 RULE', C.paper, 110], [t.starting, 'A STARTING POINT', C.paper, 100], [t.order46, 'THE ORDER MATTERS MOST', C.paper, 96]]} />
      <Sweep f={f} at={EXTRA['fl-first'].map(c)} />
      <Grain />
    </g>
  )
}

export const FL_FIRST = makePiece('fl-first', 'Lesson 3, pay yourself first: a savings jar tagged 1ST and a wallet 2ND, the reverse order crossed; inside card 3 the backwards way — pay flies to rent, food and friends and the savings jar at the end gets $0; then the flipped order: PAYDAY calendar, an automatic transfer drops money into a locked jar first, the rest fills the wallet, 10% = about $420 a month, $5,000 a year; a 2005 book and a 50/30/20 pie of needs, wants and savings, a LAW card crossed, a city skyline makes the needs slice swell; a stack of bills with savings paid first like a bill; a jar with a question mark and card 4', {
  mood: 'light', Component: First, beats: [...Object.values(K), ...EXTRA['fl-first']],
  sfx: [['s36:around', 'swish', 0.14], ['s38:nothing', 'thud', 0.18], ['s39:automatic', 'cash', 0.16], ['s44:twenty', 'pop', 0.14], ['s45:law', 'swish', 0.14]] })
void pop
