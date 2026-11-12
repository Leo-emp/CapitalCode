// ---------------------------------------------------------------- s9–s21: lesson one, your real paycheck
// A) s9      the study: a JOB OFFER letter ($60,000) and a phone showing the bank account — they don't match (≠).
// B) s10–s18 inside card 1: Maya (a made-up example) beside one long bar = her $60,000 pay.
//            payroll tax: the 7.65% end of the bar lifts away ($4,590, Social Security + Medicare);
//            income tax: a second bar — the first $16,100 is TAX FREE (standard deduction), $43,900 is taxed,
//            and a $5,020 slice of it lifts; then the two taxes merge: ≈ $9,600 gone, $50,400 kept ≈ $4,200 a month.
// C) s19–s21 the study: the phone shows ≈ $4,200 / month; STATE TAX? and HEALTH INSURANCE? hover (dashed);
//            the $60,000 letter is shown then crossed ("not the sixty thousand"); a check on the monthly number;
//            three empty buckets appear with a "?" (lesson two).
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { EXTRA } from './extra'
import { Headline, Person, win } from '../aimoney/common'
import { C, Check, Cross, DESK, Defs, Grain, Lamp, Study, Tag, fadeIn, scene } from './kit'
import { Bucket, Letter, MoneyBar, Num, Phone, Sheet, cues, Sweep } from './kit2'

const K = {
  number: 's9:number', offer: 's9:offer', lands: 's9:lands', bank: 's9:bank',
  maya: 's10:maya', example: 's10:example', sixty10: 's10:sixty', year10: 's10:year',
  cent: 's11:cent', two: 's11:two', tax11: 's11:tax',
  payroll: 's12:payroll', seven: 's12:seven', social: 's12:social', medicare: 's12:medicare',
  four13: 's13:four', year13: 's13:year',
  federal: 's14:federal', notice: 's14:notice', sixteen: 's14:sixteen', all14: 's14:all',
  free: 's15:free', standard: 's15:standard', single: 's15:single',
  left16: "s16:what's", forty16: 's16:forty', five16: 's16:five',
  add: 's17:add', nine17: 's17:nine', gone: 's17:gone',
  fifty18: 's18:fifty', month18: 's18:month',
  state: 's19:state', health: 's19:health', lives: 's19:lives',
  monthly: 's20:monthly', sixty20: 's20:sixty', real: 's20:real',
  income21: 's21:income', wrong: 's21:wrong',
}
const G = 1010
const FICA = 4590 / 60000, FREE = 16100 / 60000, ITAX = 5020 / 60000, KEEP = 50390 / 60000

const Pay: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s10') - 6, BC = c('s19') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = fadeIn(f, BC)

  // # B) the bar story
  const bar = on(f, t.sixty10, 12)
  const ficaLift = 170 * on(f, t.social - 4, 16) * (1 - on(f, t.add, 14))
  const second = win(f, t.federal - 4, t.add + 10, 12)
  const freeP = on(f, t.sixteen, 12), itaxLift = 120 * on(f, t.five16, 14)
  const merge = on(f, t.add, 16)

  return (
    <g>
      <Defs />
      {/* ---------------- A) offer letter ≠ bank account ---------------- */}
      {A > 0 && <g opacity={A}>
        <Study f={f} />
        <Lamp x={1730} s={0.85} />
        <Letter x={720} y={DESK - 150 + 40 * (1 - pop(f, t.offer - 4, 14))} s={0.95} r={-4} o={on(f, t.offer - 4, 10)} amount="$60,000" />
        <Phone x={1230} y={DESK - 150 + 40 * (1 - pop(f, t.lands - 4, 14))} s={0.95} o={on(f, t.lands - 4, 10)} amount="$ ?" />
        <Num x={975} y={DESK - 110} text="≠" size={220} color={C.tomato} o={on(f, t.bank, 10)} />
      </g>}

      {/* ---------------- B) inside card 1: the bar ---------------- */}
      {B > 0 && <g opacity={B}>
        <Sheet n={1} />
        <Person f={f} who="investorF" beats={[[0, 'waveA', 'smiling', 'waveB', 14], [t.example, 'present', 'smiling'], [t.two, 'countOne', 'thinking'], [t.seven, 'point', 'thinking'], [t.notice, 'pointUp', 'smiling'],
          [t.forty16, 'explain', 'thinking'], [t.add, 'shock', 'shocked'], [t.fifty18, 'point', 'smiling'], [t.month18, 'thumbsUp', 'smiling']]} x={330} y={G} s={0.95} />
        <Tag x={330} y={370} text="MAYA" size={46} o={on(f, t.maya, 8)} />
        <Tag x={330} y={300} text="MADE-UP EXAMPLE" size={30} point="none" color={C.paperD} o={win(f, t.example, t.payroll, 8)} />
        {/* # the pay bar */}
        <MoneyBar x={680} y={420} w={1140} h={140} o={bar} segs={merge < 0.5 ? [
          { a: 0, b: 1 - FICA, color: C.cash, label: f < t.payroll ? '$60,000 A YEAR' : '' },
          { a: 1 - FICA, b: 1, color: f < t.payroll ? C.cash : C.red, lift: ficaLift, label: '' },
        ] : [
          { a: 0, b: KEEP, color: C.cash, label: f >= t.fifty18 ? 'KEPT ≈ $50,400 A YEAR' : 'KEPT' },
          { a: KEEP, b: 1, color: C.red, lift: 40 * merge, label: '' },
        ]} />
        <Num x={680 + 1140 * (1 - FICA / 2)} y={420 - ficaLift - 24} text="7.65%" size={52} color={C.redD} o={on(f, t.seven, 8) * (1 - on(f, t.add, 10))} />
        <Tag x={1430} y={420 - 150} text="SOCIAL SECURITY + MEDICARE" size={34} point="none" o={win(f, t.social, t.federal, 8)} color={C.paperD} />
        <Num x={680 + 1140 * (1 - FICA) - 30} y={420 - ficaLift + 60} text="$4,590" size={66} color={C.redD} anchor="end" o={win(f, t.four13, t.federal, 8)} />
        <Tag x={680 + 1140 * (1 - FICA) - 140} y={340} text="PAYROLL TAX" size={36} o={win(f, t.payroll, t.social, 8)} />
        {/* # the income-tax bar */}
        <g opacity={second}>
          <Tag x={1250} y={700} text="INCOME TAX" size={36} point="none" o={on(f, t.federal, 8)} color={C.ink} ink={C.paper} />
          <MoneyBar x={680} y={780} w={1140} h={130} segs={[
            { a: 0, b: FREE, color: C.cash, label: freeP > 0.5 ? 'TAX FREE' : '', o: 1 },
            { a: FREE, b: 1, color: f >= t.free ? C.sky : C.cash, label: f >= t.forty16 ? 'TAXED: $43,900' : '' },
            { a: 1 - ITAX, b: 1, color: C.red, lift: itaxLift, o: on(f, t.five16, 8) },
          ]} />
          <Tag x={680 + 1140 * FREE / 2} y={970} text={f >= t.standard ? "$16,100 · STANDARD DEDUCTION" : "$16,100"} size={32} point="up" o={on(f, t.sixteen, 8)} />
          <Num x={1780} y={780 - itaxLift - 20} text="$5,020" size={60} color={C.redD} anchor="end" o={on(f, t.five16 + 4, 8)} />
        </g>
        <Num x={680 + 1140 * (1 + KEEP) / 2 - 60} y={420 - 70} text="≈ $9,600 GONE" size={58} color={C.redD} o={on(f, t.nine17, 8)} />
        <g opacity={on(f, t.month18, 10)}>
          <Num x={1250} y={760} text="÷ 12 MONTHS" size={64} color={C.inkSoft} />
          <Num x={1250} y={900} text="≈ $4,200 A MONTH" size={120} color={C.cashD} />
        </g>
      </g>}

      {/* ---------------- C) the real number to plan with ---------------- */}
      {Cc > 0 && <g opacity={Cc}>
        <Study f={f} />
        <Lamp x={1760} s={0.8} />
        <g opacity={1 - on(f, t.income21 - 6, 10)}>
          <Phone x={1060} y={DESK - 150} s={0.95} amount="$4,200" label="EACH MONTH" />
          <g strokeDasharray="10 10"><Tag x={700} y={DESK - 330} text="STATE TAX?" size={42} point="none" o={on(f, t.state, 8) * 0.85} color={C.paperD} /></g>
          <Tag x={700} y={DESK - 230} text="HEALTH INSURANCE?" size={42} point="none" o={on(f, t.health, 8) * 0.85} color={C.paperD} />
          <Tag x={700} y={DESK - 130} text="DEPENDS WHERE" size={34} point="none" o={on(f, t.lives, 8) * 0.85} color={C.wallL} ink={C.paper} />
          <g opacity={on(f, t.sixty20 - 4, 8)}><Letter x={1500} y={DESK - 150} s={0.62} r={6} amount="$60,000" /><Cross x={1500} y={DESK - 150} r={150} p={on(f, t.sixty20 + 8, 12)} /></g>
          <Check x={1200} y={DESK - 380} r={50} p={on(f, t.real, 10)} />
        </g>
        {/* # lesson two teaser: three buckets and a question */}
        <g opacity={on(f, t.income21 - 4, 10)}>
          {[0, 1, 2].map((k) => <Bucket key={k} x={620 + k * 340} y={DESK + 120} w={220 + k * 20} h={260} fill={0} rate={['10%', '12%', '22%'][k]} color={C.teal} o={on(f, t.income21 + k * 5, 8)} />)}
          <Num x={1300} y={DESK - 260} text="?" size={260} color={C.brassL} o={on(f, t.wrong, 8)} />
        </g>
      </g>}

      <Headline f={f} lines={[[t.offer, 'OFFER ≠ BANK ACCOUNT', C.paper, 100], [t.maya, 'MEET MAYA', C.ink, 100], [BC + 4, 'THE REAL MONTHLY NUMBER', C.paper, 96], [t.two, 'TWO TAXES COME OUT FIRST', C.ink, 92], [t.federal, 'INCOME TAX: NOT ON EVERY DOLLAR', C.ink, 86],
        [t.add, 'BOTH TAXES TOGETHER', C.ink, 96], [t.monthly, 'PLAN WITH THIS NUMBER', C.paper, 100], [t.income21, 'HOW IS IT WORKED OUT?', C.brassL, 100]]} />
      <Sweep f={f} at={EXTRA['fl-pay'].map(c)} />
      <Grain />
    </g>
  )
}

export const FL_PAY = makePiece('fl-pay', 'Lesson 1, your real paycheck: a $60,000 job offer letter ≠ a phone bank balance; inside card 1 Maya (made-up example) beside a long pay bar; the 7.65% payroll-tax end lifts away ($4,590, Social Security + Medicare); a second bar shows the first $16,100 tax free (standard deduction), $43,900 taxed and a $5,020 slice lifting; both taxes merge: about $9,600 gone, $50,400 kept, about $4,200 a month; in the study the phone shows $4,200 a month, state tax and health insurance hover as question tags, the $60,000 letter is crossed, a check on the monthly number, three empty tax buckets with a question mark', {
  mood: 'light', Component: Pay, beats: [...Object.values(K), ...EXTRA['fl-pay']],
  sfx: [['s9:bank', 'thud', 0.16], ['s12:social', 'swish', 0.16], ['s16:five', 'swish', 0.14], ['s18:month', 'cash', 0.18], ['s20:sixty', 'swish', 0.14]] })
void lerp; void span
