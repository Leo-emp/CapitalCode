// ---------------------------------------------------------------- s94–s98: the payoff — so, are bonds safe?
// A) s94     back in your study with the brass safe of bonds from the hook.
// B) s95     the whole loan in one loop: Nina's $1,000 goes to the borrower, $20 coupons come back on a schedule,
//            then the $1,000 comes home at the end.
// C) s96–97  split: on the left a brass SHIELD (a strong borrower) stops the NOT PAYING arrow — tick; on the right the
//            seesaw: RATES move and the price end drops, further on the long plank — no shield there.
// D) s98     Nina holds to the end — the timeline fills, AS PROMISED; then a second Nina-coin path: SELL at the
//            wrong time and the seesaw tips the price tag.
import React from 'react'
import { lerp, on, span, easeInOut } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { EXTRA } from './extra'
import { Headline, Person } from '../aimoney/common'
import { Arrow, B, BDefs, BGrain, Capitol, Cash, Certificate, Coin, Coupon, Cross, FLOOR, Flourish, Parchment, PriceTag, Seesaw, Study, Tag, Tick, cues, fadeIn, scene, FONT } from './kit'
import { Safe } from './hook'

const K = {
  back94: 's94:back', boring94: 's94:boring', safe94: 's94:safe', money94: 's94:money',
  bond95: 's95:bond', loan95: 's95:loan', lend95: 's95:lend', paid95: 's95:paid', schedule95: 's95:schedule', back95: 's95:back', end95: 's95:end',
  safe96: 's96:safe', strong96: 's96:strong', not96: 's96:not',
  not97: 's97:not', rates97: 's97:rates', moving97: 's97:moving', price97: 's97:price', further97: 's97:further', longer97: 's97:longer',
  hold98: 's98:hold', end98: 's98:end', exactly98: 's98:exactly', promised98: 's98:promised', sell98: 's98:sell', wrong98: 's98:wrong', seesaw98: 's98:seesaw', decides98: 's98:decides',
}

const Shield: React.FC<{ x: number; y: number; o: number }> = ({ x, y, o }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${0.8 + 0.2 * o})`}>
    <path d="M0 -170 L140 -120 Q140 60 0 160 Q-140 60 -140 -120 Z" fill="url(#bd-brass)" stroke={B.brassD} strokeWidth={8} />
    <path d="M0 -120 L95 -86 Q95 40 0 110 Q-95 40 -95 -86 Z" fill={B.green} />
    <text y={20} textAnchor="middle" fill="#fff" style={{ font: `400 44px ${FONT.big}`, letterSpacing: 2 }}>STRONG</text>
  </g>
)

const End: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s95') - 4, BC = c('s96') - 4, CD = c('s98') - 4
  const A = scene(f, -20, AB), Bs = scene(f, AB, BC), Cs = scene(f, BC, CD), Ds = fadeIn(f, CD)
  // # B: loop of three stations around a circle
  const loopP = [on(f, t.lend95 - 2, 10), on(f, t.paid95 - 2, 10), on(f, t.back95 - 2, 10)]
  // # C: the arrow hits the shield and stops
  const hit = easeInOut(span(f, t.not96 - 6, t.not96 + 8))
  const rock = on(f, t.moving97 - 2, 10)
  const tiltC = rock * (10 + 4 * Math.sin((f - t.moving97) / 8)) + 6 * on(f, t.further97, 10)
  // # D: hold → timeline fills; sell → seesaw
  const hold = easeInOut(span(f, t.hold98, t.promised98 + 6)), sell = on(f, t.sell98 - 2, 10)
  return (
    <g>
      <BDefs />
      {/* ---------------- A) back to the safe ---------------- */}
      {A > 0 && <g opacity={A}>
        <Study />
        <Person f={f} who="hero" beats={[[0, 'idle', 'neutral'], [t.boring94, 'present', 'smiling'], [t.money94, 'point', 'smiling']]} x={420} y={1060} s={0.82} />
        <Safe x={1220} y={FLOOR} o={1} door={on(f, t.safe94 - 4, 14)} />
      </g>}

      {/* ---------------- B) a bond is just a loan ---------------- */}
      {Bs > 0 && <g opacity={Bs}>
        <Parchment />
        <Person f={f} who="investorF" beats={[[0, 'idle', 'smiling'], [t.lend95, 'offer', 'smiling'], [t.paid95, 'receive', 'smiling'], [t.end95, 'celebrate', 'smiling']]} x={300} y={1060} s={0.8} />
        <Capitol x={1580} y={FLOOR} s={0.62} o={on(f, t.loan95 - 4, 8)} />
        <Tag x={1580} y={FLOOR + 70} text="BORROWER" size={38} bg={B.greenD} o={on(f, t.loan95 - 2, 8)} />
        <g opacity={loopP[0]}><Arrow x1={560} y1={420} x2={1360} y2={420} p={on(f, t.lend95, 14)} color={B.brassD} /><Cash x={960} y={360} s={0.6} /><Tag x={960} y={470} text="YOU LEND" size={36} bg={B.brassD} /></g>
        <g opacity={loopP[1]}>{[0, 1, 2, 3].map((k) => <Coupon key={k} x={lerp(1320, 640, (k + 1) / 5)} y={620 + (k % 2) * 20} s={0.8} r={k % 2 ? 6 : -6} o={on(f, t.paid95 + k * 4, 6)} />)}<Tag x={960} y={720} text="PAID ON A SCHEDULE" size={36} bg={B.green} o={on(f, t.schedule95, 8)} /></g>
        <g opacity={loopP[2]}><Arrow x1={1360} y1={860} x2={560} y2={860} p={on(f, t.back95, 14)} color={B.green} /><Cash x={960} y={800} s={0.6} /><Tag x={960} y={930} text="BACK AT THE END" size={36} bg={B.green} o={on(f, t.end95, 8)} /></g>
      </g>}

      {/* ---------------- C) safe from one thing, not the other ---------------- */}
      {Cs > 0 && <g opacity={Cs}>
        <Parchment />
        <rect x={958} y={260} width={4} height={760} fill={B.parchDD} />
        <Certificate x={250} y={560} s={0.4} n={0} />
        <Shield x={560} y={560} o={on(f, t.strong96 - 2, 10)} />
        <Arrow x1={900} y1={560} x2={lerp(900, 720, hit)} y2={560} p={on(f, t.not96 - 6, 6)} color={B.ox} />
        <Tag x={800} y={420} text="NOT PAYING" size={38} bg={B.ox} o={on(f, t.not96, 8)} />
        <Tick x={560} y={800} r={50} p={on(f, t.not96 + 10, 8)} />
        <Seesaw x={1440} y={FLOOR} w={760} tilt={tiltC} o={on(f, t.not97 - 2, 10)}
          left={<g opacity={on(f, t.rates97 - 2, 8)}><rect x={-80} y={-90} width={160} height={90} rx={12} fill={B.ox} /><text y={-32} textAnchor="middle" fill="#fff" style={{ font: `400 44px ${FONT.big}` }}>RATES</text></g>}
          right={<g><Certificate x={0} y={-70} s={0.26} n={0} seal={false} amount="PRICE" title="BOND" /></g>} />
        <Tag x={1440} y={330} text="NOT SAFE FROM RATES" size={40} bg={B.ox} o={on(f, t.not97, 8)} />
        <Tag x={1440} y={FLOOR + 70} text="LONGER BOND = BIGGER DROP" size={34} bg={B.ink} o={on(f, t.longer97, 8)} />
      </g>}

      {/* ---------------- D) hold or sell ---------------- */}
      {Ds > 0 && <g opacity={Ds}>
        <Parchment />
        <Person f={f} who="investorF" beats={[[0, 'hold', 'smiling'], [t.promised98, 'celebrate', 'smiling'], [t.sell98, 'think', 'thinking'], [t.decides98, 'shrug', 'neutral']]} x={300} y={1060} s={0.8} />
        <g opacity={1 - sell * 0.0}>
          <Certificate x={760} y={420} s={0.42} n={0} />
          <rect x={600} y={620} width={560} height={14} rx={7} fill={B.parchDD} />
          <rect x={600} y={620} width={560 * hold} height={14} rx={7} fill={B.green} />
          <circle cx={600 + 560 * hold} cy={627} r={16} fill={B.brass} stroke={B.brassD} strokeWidth={4} />
          <Tick x={1220} y={627} r={40} p={on(f, t.promised98 - 2, 8)} />
          <Tag x={880} y={700} text="HOLD: AS PROMISED" size={40} bg={B.green} o={on(f, t.exactly98, 8)} />
        </g>
        <Seesaw x={1500} y={FLOOR + 40} w={620} tilt={sell * 12 * Math.sin((f - t.sell98) / 10)} o={sell}
          left={<g><rect x={-70} y={-80} width={140} height={80} rx={12} fill={B.ox} /><text y={-28} textAnchor="middle" fill="#fff" style={{ font: `400 40px ${FONT.big}` }}>RATES</text></g>}
          right={<PriceTag x={0} y={-180} text="PRICE" s={0.7} />} />
        <Tag x={1500} y={330} text="SELL: THE SEESAW DECIDES" size={40} bg={B.ox} o={on(f, t.wrong98, 8)} />
      </g>}

      <Headline f={f} lines={[[t.back94, 'SO, ARE BONDS SAFE?', B.ink, 112], [t.bond95, 'JUST A LOAN', B.ink, 116], [t.safe96, 'SAFE FROM ONE THING', B.green, 110], [t.not97, 'NOT FROM THE OTHER', B.ox, 110], [t.hold98, 'HOLD OR SELL', B.ink, 116]]} />
      <Flourish f={f} at={(EXTRA['bd-end'] ?? []).map(c)} />
      <BGrain />
    </g>
  )
}

export const BD_END = makePiece('bd-end', "Payoff: back in your study with the brass safe of bonds; the whole loan as a loop — Nina lends $1,000 to the borrower, $20 coupons come back on a schedule, the $1,000 comes home at the end; a brass STRONG shield stops the NOT PAYING arrow (tick) while beside it a seesaw shows rates moving and the bond price dropping, further for longer bonds; Nina holds to the end and the timeline fills as promised, while selling puts her price tag on a rocking seesaw", {
  mood: 'light', Component: End, beats: [...Object.values(K), ...(EXTRA['bd-end'] ?? [])],
  sfx: [['s95:back', 'cash', 0.1], ['s96:not', 'impact', 0.1], ['s98:promised', 'chime', 0.12]] })
