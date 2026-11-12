// ---------------------------------------------------------------- s22–s35: lesson two, how tax brackets work
// A) s22–s23 the study: the myth — a raise (+ bills, green arrow up) next to a take-home phone that shrinks (red arrow);
//            a clean cross on "bracket"; a puzzled buyer "believes it".
// B) s24–s31 inside card 2: three buckets 10% / 12% / 22%; Maya's $43,900 pours in, filling the 10% bucket, then most
//            of the 12% one; the 22% bucket glows (only dollars above $50,400); each rate stays put (checks under the
//            lower buckets). The $10,000 raise pours: the 12% bucket fills and $3,500 spills into the 22% bucket.
// C) s32–s33 the buckets clear; the raise becomes one bar: $1,550 income tax + $765 payroll tax lift off, ≈ $7,685 kept.
// D) s34–s35 the study: a pile of bills; only the top bills turn red (22%); "the whole pile" is shown red, then crossed;
//            Maya holds her paycheck by a PAYDAY calendar.
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { EXTRA } from './extra'
import { Headline, Person, win } from '../aimoney/common'
import { Bill, C, Check, Cross, DESK, Defs, Grain, Lamp, Paycheck, Study, Tag, fadeIn, scene } from './kit'
import { Arrow, Bucket, Calendar, MoneyBar, Num, Phone, Sheet, cues, Sweep } from './kit2'

const K = {
  raise22: 's22:raise', shrink: 's22:shrink', pushes: 's22:pushes', bracket: 's22:bracket',
  believe: 's23:believe', brackets23: 's23:brackets',
  picture: 's24:picture', poured: 's24:poured', buckets: 's24:buckets', spills: 's24:spills',
  single: 's25:single', twelve25: 's25:twelve', ten25: 's25:ten',
  everything: 's26:everything', fifty26: 's26:fifty', twelve26: 's26:twelve',
  only27: 's27:only', above27: 's27:above', twenty27: 's27:twenty',
  own: 's28:own', never: 's28:never', below: 's28:below',
  boss: 's29:boss', raise29: 's29:raise',
  rises: 's30:rises', fifty30: 's30:fifty',
  most: 's31:most', three31: 's31:three', twenty31: 's31:twenty',
  one32: 's32:one', payroll32: 's32:payroll', seven32: 's32:seven',
  out33: 's33:out', keeps: 's33:keeps', seven33: 's33:seven',
  moving: 's34:moving', top34: 's34:top', higher34: 's34:higher', whole: 's34:whole',
  knows: 's35:knows', question: 's35:question', day: 's35:day',
}
const BASE = 900

const Brackets: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s24') - 6, BC = c('s32') - 6, CD = c('s34') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = scene(f, BC, CD), D = fadeIn(f, CD)

  // # B) bucket levels: Maya's $43,900 → 10% full, 12% at 31,500 / 38,000; the raise → 12% full, 22% gets 3,500 (shown as 0.3)
  const b1 = span(f, t.twelve25 - 4, t.ten25 + 10)
  const b2 = lerp(0, 31500 / 38000, span(f, t.everything, t.twelve26 + 12)) + (1 - 31500 / 38000) * span(f, t.rises, t.fifty30 + 12)
  const b3 = 0.3 * span(f, t.three31, t.twenty31 + 10)
  const pouring = f > t.poured && f < t.twenty31 + 12 && !(f > t.twelve26 + 14 && f < t.raise29)
  const target = f < t.everything ? 0 : f < t.three31 ? 1 : 2
  const BX = [540, 960, 1420]

  return (
    <g>
      <Defs />
      {/* ---------------- A) the myth ---------------- */}
      {A > 0 && <g opacity={A}>
        <Study f={f} />
        <Lamp x={1760} s={0.8} />
        <g opacity={on(f, t.raise22 - 4, 10)}>
          {[0, 1, 2, 3].map((k) => <Bill key={k} x={720} y={DESK - 40 - k * 26} s={1.4} r={k % 2 ? 3 : -3} o={on(f, t.raise22 + k * 3, 6)} />)}
          <Tag x={720} y={DESK - 220} text="+ RAISE" size={46} color={C.cashL} />
          <Arrow x1={520} y1={DESK + 60} x2={520} y2={DESK - 300} p={span(f, t.raise22, t.raise22 + 16)} color={C.cash} w={16} />
        </g>
        <g opacity={on(f, t.shrink - 4, 10)}>
          <Phone x={1200} y={DESK - 120} s={0.85} amount={f < t.shrink + 10 ? '$4,200' : '$4,100'} label="TAKE HOME" />
          <Arrow x1={1400} y1={DESK - 360} x2={1400} y2={DESK - 60} p={span(f, t.shrink, t.shrink + 14)} color={C.red} w={16} />
          <Cross x={1200} y={DESK - 120} r={240} p={on(f, t.bracket, 12)} />
        </g>
        <Person f={f} who="buyer" beats={[[0, 'idle', 'neutral'], [t.shrink, 'nervous', 'worried'], [t.believe, 'scratchHead', 'thinking'], [t.brackets23, 'shrug', 'thinking']]} x={300} y={1070} s={0.9} />
        <Tag x={300} y={470} text="MYTH" size={50} color={C.tomato} ink="#fff" o={on(f, t.believe, 8)} />
      </g>}

      {/* ---------------- B) the buckets ---------------- */}
      {B > 0 && <g opacity={B}>
        <Sheet n={2} />
        <Tag x={300} y={330} text={f < t.rises ? "MAYA'S TAXABLE: $43,900" : "WITH THE RAISE: $53,900"} size={38} point="none" color={f < t.rises ? C.paperD : C.cashL} o={on(f, t.picture, 8)} />
        {/* # the pour: a stream from a pitcher above into the current bucket */}
        {pouring && <g>
          <path d={`M${BX[target] - 10} 330 L${BX[target] + 10} 330 L${BX[target] + 8} ${BASE - 40} L${BX[target] - 8} ${BASE - 40} Z`} fill={C.cash} opacity={0.75} />
          <g transform={`translate(${BX[target] + 70} 300) rotate(-35)`}><rect x={-60} y={-50} width={120} height={100} rx={18} fill={C.paper} stroke={C.inkSoft} strokeWidth={5} /><text y={16} textAnchor="middle" fill={C.cashD} style={{ font: '400 50px "Bebas Neue"' }}>$</text></g>
        </g>}
        <Bucket x={BX[0]} y={BASE} w={240} h={230} fill={b1} rate="10%" color={C.cash} o={on(f, t.buckets, 8)} label={f >= t.twelve25 ? 'FIRST $12,400' : undefined} />
        <Bucket x={BX[1]} y={BASE} w={320} h={400} fill={b2} rate="12%" color={C.cash} o={on(f, t.buckets + 4, 8)} label={f >= t.fifty26 ? 'UP TO $50,400' : undefined} />
        <Bucket x={BX[2]} y={BASE} w={320} h={400} fill={b3} rate="22%" color={C.cash} o={on(f, t.buckets + 8, 8)} label={f >= t.above27 ? 'ABOVE $50,400' : undefined} glow={win(f, t.only27, t.own, 10) * 0.8} />
        {/* # each rate stays put */}
        <Check x={BX[0]} y={BASE - 300} r={36} p={win(f, t.below - 4, t.boss, 8)} />
        <Check x={BX[1]} y={BASE - 470} r={36} p={win(f, t.below + 2, t.boss, 8)} />
        <Tag x={BX[1] + 260} y={BASE - 520} text="RATE NEVER CHANGES" size={34} point="none" o={win(f, t.never, t.boss, 8)} />
        {/* # the raise */}
        <Tag x={1640} y={330} text="+ $10,000 RAISE" size={44} color={C.cashL} point="none" o={on(f, t.raise29, 8)} />
        <Tag x={BX[1]} y={BASE - 470} text="+$6,500 AT 12%" size={36} point="down" o={win(f, t.most, t.one32, 8)} />
        <Tag x={BX[2]} y={BASE - 470} text="$3,500 AT 22%" size={36} point="down" color={C.brassL} o={on(f, t.three31 + 6, 8)} />
      </g>}

      {/* ---------------- C) what the raise really leaves ---------------- */}
      {Cc > 0 && <g opacity={Cc}>
        <Sheet n={2} />
        <Num x={960} y={400} text="THE $10,000 RAISE" size={80} color={C.inkSoft} />
        <MoneyBar x={300} y={500} w={1320} h={150} segs={[
          { a: 0, b: 0.7685, color: C.cash, label: f >= t.keeps ? 'KEPT ≈ $7,685' : '' },
          { a: 0.7685, b: 0.845, color: f >= t.seven32 ? C.red : C.cash, lift: 120 * on(f, t.seven32, 12) },
          { a: 0.845, b: 1, color: f >= t.one32 ? C.red : C.cash, lift: 120 * on(f, t.one32, 12) },
        ]} />
        <Num x={300 + 1320 * 0.925} y={340} text="$1,550" size={56} color={C.redD} o={on(f, t.one32 + 6, 8)} />
        <Tag x={300 + 1320 * 0.92} y={720} text="INCOME TAX" size={32} point="up" o={on(f, t.one32 + 6, 8)} />
        <Num x={300 + 1320 * 0.805} y={340} text="$765" size={52} color={C.redD} o={on(f, t.seven32 + 6, 8)} />
        <Tag x={300 + 1320 * 0.78} y={810} text="PAYROLL TAX" size={32} point="up" o={on(f, t.payroll32, 8)} />
        <Check x={300 + 1320 * 0.38} y={830} r={50} p={on(f, t.keeps, 10)} />
      </g>}

      {/* ---------------- D) never the whole pile ---------------- */}
      {D > 0 && <g opacity={D}>
        <Study f={f} />
        <Lamp x={1760} s={0.8} />
        <g opacity={1 - on(f, t.knows - 4, 10)}>
          {Array.from({ length: 12 }, (_, k) => {
            const topRed = k >= 10 && f >= t.top34, allRed = f >= t.whole && f < t.whole + 26
            return <Bill key={k} x={960 + (k % 2 ? 6 : -6)} y={DESK + 60 - k * 34} s={2} r={k % 2 ? 2 : -2} red={topRed || allRed} o={on(f, t.moving + k, 4)} />
          })}
          <Tag x={1260} y={DESK - 330} text="ONLY THE TOP DOLLARS: 22%" size={38} point="none" color={C.brassL} o={win(f, t.top34 + 6, t.whole, 8)} />
          <Tag x={1260} y={DESK - 330} text="THE WHOLE PILE?" size={44} point="none" color={C.paper} o={on(f, t.whole, 8)} />
          <Cross x={960} y={DESK - 140} r={250} p={on(f, t.whole + 14, 12)} />
        </g>
        <g opacity={on(f, t.knows - 4, 10)}>
          <Person f={f} who="investorF" beats={[[0, 'present', 'smiling'], [t.question, 'think', 'thinking'], [t.day, 'pointUp', 'smiling']]} x={560} y={1070} s={0.95} />
          <Paycheck x={960} y={DESK - 120} s={1} open={on(f, t.knows + 4, 14)} amount="$4,200" who="PAY TO: MAYA" />
          <Calendar x={1380} y={DESK - 140} s={1.2} o={on(f, t.day - 4, 10)} top="PAYDAY" big="1" />
        </g>
      </g>}

      <Headline f={f} lines={[[t.raise22, 'CAN A RAISE SHRINK YOUR PAY?', C.paper, 92], [t.bracket, 'NEVER', C.brassL, 120], [t.buckets, 'TAX BRACKETS = BUCKETS', C.ink, 100],
        [t.own, 'EACH BUCKET, ITS OWN RATE', C.ink, 96], [t.raise29, 'NOW ADD A $10,000 RAISE', C.ink, 96], [BC + 4, 'WHAT SHE KEEPS', C.ink, 100],
        [CD + 4, 'ONLY THE TOP DOLLARS', C.paper, 100], [t.knows, 'NEXT: WHAT TO DO WITH IT', C.paper, 96]]} />
      <Sweep f={f} at={EXTRA['fl-brackets'].map(c)} />
      <Grain />
    </g>
  )
}

export const FL_BRACKETS = makePiece('fl-brackets', 'Lesson 2, tax brackets: the myth — a raise next to a shrinking take-home phone, crossed; inside card 2 Maya\'s $43,900 pours into three buckets 10% (first $12,400), 12% (up to $50,400), 22% (above), each rate checked as unchanged; a $10,000 raise fills the 12% bucket and spills $3,500 into the 22% one; the raise as a bar: $1,550 income tax and $765 payroll tax lift off, about $7,685 kept; a pile of bills where only the top turns red, the whole pile red is crossed; Maya with her paycheck and a PAYDAY calendar', {
  mood: 'light', Component: Brackets, beats: [...Object.values(K), ...EXTRA['fl-brackets']],
  sfx: [['s22:bracket', 'swish', 0.16], ['s25:ten', 'pop', 0.14], ['s31:three', 'pop', 0.14], ['s33:keeps', 'cash', 0.18], ['s34:whole', 'swish', 0.14]] })
void pop
