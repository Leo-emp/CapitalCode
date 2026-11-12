// ---------------------------------------------------------------- s11–s19: a bond is a loan — Nina's ten-year note, step by step
// One stage on engraved parchment: the US Treasury (a domed building) on the right, Nina on the left.
// s11     cash on the left, an arrow to the domed building: LENDER → BORROWER, the arrow reads A LOAN.
// s12–13  Nina steps in, the cash lands in her hand ($1,000, won't need it for 10 years); a TREASURY NOTE 4%
//         certificate appears by the building.
// s15     step one: the cash flies to the building, the certificate flies to Nina.
// s16–17  step two: a 10-year timeline with 20 notches; each payment a coupon is clipped off her certificate and
//         a $20 coin flies from the building onto Nina's growing stack; 4% of $1,000 = $40 a year = 2 × $20.
// s18     step three: the timeline runs to its end, the bond matures and the $1,000 flies back to her.
// s19     in total: 20 coins = $400, plus the $1,000.
import React from 'react'
import { lerp, on, span, easeInOut } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { EXTRA } from './extra'
import { Headline, Person } from '../aimoney/common'
import { Arrow, B, BDefs, BGrain, Capitol, Cash, Certificate, Coin, CoinStack, FLOOR, Flourish, Parchment, Tag, cues, FONT } from './kit'

const K = {
  bond11: 's11:bond', loan11: 's11:loan', lender11: 's11:lender',
  nina12: 's12:nina', made12: 's12:made', thousand12: 's12:thousand', ten12: 's12:ten',
  lends13: 's13:lends', gov13: 's13:government', treasury13: 's13:treasury', four13: 's13:four',
  step14: "s14:here's",
  one15: 's15:one', pays15: 's15:pays', cash15: 's15:cash',
  two16: 's16:two', six16: 's16:six', twenty16: 's16:twenty', interest16: 's16:interest',
  four17: 's17:four', forty17: 's17:forty', split17: 's17:split',
  three18: 's18:three', ten18: 's18:ten', matures18: 's18:matures', back18: 's18:back',
  total19: 's19:total', payments19: 's19:payments', four19: 's19:four', plus19: 's19:plus', back19: 's19:back',
}
const CAP = { x: 1520, y: 700 }, HAND = { x: 450, y: 640 }

const Loan1: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const nina = on(f, t.nina12 - 4, 10)
  // # the cash: on the left (s11) → Nina's hand (s12) → the building (step one) → back to Nina (step three)
  const toNina = easeInOut(span(f, t.nina12, t.nina12 + 14)), toGov = easeInOut(span(f, t.pays15, t.pays15 + 20)), back = easeInOut(span(f, t.back18 - 8, t.back18 + 14))
  let cx = lerp(560, HAND.x, toNina), cy = lerp(640, HAND.y, toNina)
  cx = lerp(cx, CAP.x, toGov); cy = lerp(cy, CAP.y, toGov) - Math.sin(Math.PI * toGov) * 160
  cx = lerp(cx, 860, back); cy = lerp(cy, 820, back) - Math.sin(Math.PI * back) * 160
  const cashO = toGov > 0.98 && back < 0.02 ? 0 : 1
  // # the certificate: by the building (s13), flies to Nina on "pays"
  const certP = easeInOut(span(f, t.pays15 + 6, t.pays15 + 26))
  const certX = lerp(1520, 860, certP), certY = lerp(400, 520, certP) - Math.sin(Math.PI * certP) * 80
  // # payments: 0 → 6 during step two, 6 → 20 during step three
  const paid = Math.floor(lerp(0, 6, span(f, t.twenty16, t.three18 - 6)) + lerp(0, 14, span(f, t.three18, t.matures18 + 6)) + 0.0001)
  const lastPayAt = paid < 6 ? lerp(t.twenty16, t.three18 - 6, paid / 6) : lerp(t.three18, t.matures18 + 6, (paid - 6) / 14)
  const fly = paid > 0 ? span(f, lastPayAt, lastPayAt + 12) : 1
  const timeline = on(f, t.two16 - 2, 10) * (1 - on(f, t.total19, 8))
  const runner = paid / 20

  return (
    <g>
      <BDefs />
      <Parchment />
      <Capitol x={CAP.x} y={FLOOR} s={0.75} o={on(f, t.loan11 - 6, 10)} />
      <Tag x={CAP.x} y={FLOOR + 70} text={f < t.gov13 ? 'BORROWER' : 'US GOVERNMENT'} size={40} bg={B.greenD} o={on(f, t.loan11 - 4, 8)} />
      {/* s11: lender → borrower */}
      <g opacity={on(f, t.loan11 - 2, 8) * (1 - nina)}>
        <Arrow x1={720} y1={640} x2={1240} y2={640} p={on(f, t.loan11, 14)} color={B.brassD} />
        <Tag x={980} y={590} text="A LOAN" size={46} bg={B.brassD} o={on(f, t.loan11 + 4, 8)} />
        <Tag x={560} y={760} text="LENDER" size={40} bg={B.ink} o={on(f, t.lender11, 8)} />
      </g>
      <Person f={f} who="investorF" o={nina} beats={[[0, 'hold', 'smiling'], [t.lends13, 'offer', 'smiling'], [t.pays15 + 20, 'hold', 'smiling'], [t.twenty16 + 4, 'receive', 'smiling'], [t.matures18, 'celebrate', 'smiling'], [t.total19, 'present', 'smiling']]} x={300} y={1060} s={0.8} />
      <Tag x={300} y={FLOOR + 110} text="NINA" size={40} bg={B.green} o={nina} />
      {cashO > 0 && <Cash x={cx} y={cy} s={toGov > 0.02 && back < 0.02 ? 0.7 : 0.8} o={on(f, t.bond11 - 2, 8)} />}
      <Tag x={820} y={430} text="WON'T NEED IT FOR 10 YEARS" size={34} bg={B.inkSoft} o={on(f, t.ten12, 8) * (1 - on(f, t.lends13, 8))} />
      {/* the certificate */}
      <Certificate x={certX} y={certY} s={0.55} o={on(f, t.treasury13 - 2, 10)} title="TREASURY NOTE" rate="4%" n={20} coupons={20 - paid} years="10 YEARS" />
      {/* step two: timeline + coins */}
      {timeline > 0.01 && <g opacity={timeline}>
        <rect x={600} y={1000} width={1160} height={12} rx={6} fill={B.parchDD} />
        {Array.from({ length: 21 }, (_, k) => <rect key={k} x={600 + k * 58 - 3} y={k % 2 ? 990 : 980} width={6} height={k % 2 ? 32 : 52} fill={k <= paid ? B.green : B.inkL} />)}
        <circle cx={600 + 1160 * runner} cy={1006} r={16} fill={B.brass} stroke={B.brassD} strokeWidth={4} />
        <text x={600} y={962} textAnchor="middle" fill={B.inkSoft} style={{ font: `400 30px ${FONT.big}` }}>TODAY</text>
        <text x={1760} y={962} textAnchor="middle" fill={B.inkSoft} style={{ font: `400 30px ${FONT.big}` }}>10 YEARS</text>
        <Tag x={1000} y={920} text="EVERY 6 MONTHS" size={30} bg={B.green} o={on(f, t.six16, 8) * (1 - on(f, t.four17 - 2, 8))} />
      </g>}
      {paid > 0 && fly < 1 && <Coin x={lerp(CAP.x - 120, 560, fly)} y={lerp(640, FLOOR - paid * 16, fly) - Math.sin(Math.PI * fly) * 120} r={34} label="$20" />}
      <CoinStack x={600} y={FLOOR} h={Math.max(0, paid - (fly < 1 ? 1 : 0))} r={44} />
      <Tag x={600} y={FLOOR + 70} text={`${paid} × $20`} size={34} bg={B.brassD} o={paid > 0 ? 1 - on(f, t.total19, 6) : 0} />
      {/* s17: $40 a year = 2 × $20 */}
      <g opacity={on(f, t.four17, 8) * (1 - on(f, t.three18 - 2, 8))}>
        <Tag x={1180} y={330} text="4% × $1,000 = $40 A YEAR" size={42} bg={B.greenD} />
        <Tag x={1180} y={410} text="= $20 + $20" size={40} bg={B.brassD} o={on(f, t.split17, 8)} />
      </g>
      {/* s19: totals */}
      <Tag x={600} y={975} text="20 × $20 = $400" size={44} bg={B.brassD} o={on(f, t.four19, 8)} />
      <Tag x={1010} y={975} text="+ $1,000 BACK" size={44} bg={B.green} o={on(f, t.plus19, 8)} />

      <Headline f={f} lines={[[t.bond11, 'A BOND IS A LOAN', B.ink, 116], [t.nina12, 'MEET NINA', B.ink, 116], [t.treasury13, 'A 10-YEAR TREASURY NOTE', B.ink, 104], [t.one15, 'STEP 1: SHE PAYS $1,000', B.ink, 104],
        [t.two16, 'STEP 2: $20 EVERY 6 MONTHS', B.green, 100], [t.three18, 'STEP 3: $1,000 COMES BACK', B.ink, 100], [t.total19, 'IN TOTAL', B.ink, 116]]} />
      <Flourish f={f} at={(EXTRA['bd-loan1'] ?? []).map(c)} />
      <BGrain />
    </g>
  )
}

export const BD_LOAN1 = makePiece('bd-loan1', "A bond is a loan: cash with an arrow A LOAN from LENDER to the domed US Treasury (BORROWER); Nina steps in holding $1,000 she won't need for 10 years; a TREASURY NOTE 4% certificate with 20 coupons; step one the cash flies to the government and the certificate to Nina; step two a 10-year timeline, every six months a coupon is clipped and a $20 coin flies onto her stack, 4% × $1,000 = $40 a year = $20 + $20; step three the bond matures and the $1,000 flies back; in total 20 × $20 = $400 plus the $1,000 back", {
  mood: 'light', Component: Loan1, beats: [...Object.values(K), ...(EXTRA['bd-loan1'] ?? [])],
  sfx: [['s15:pays', 'swish', 0.1], ['s16:twenty', 'coin', 0.1], ['s18:back', 'cash', 0.12], ['s19:four', 'ding', 0.1]] })
