// ---------------------------------------------------------------- s40–s54: the seesaw — why a bond's price moves
// A) s40–42  the market square: Nina at a stall with her 4% certificate ($40 a year); a buyer walks up; ONE YEAR
//            LATER the rate dial swings from 4% to 5%; a brand-new 5% note ($50 a year) appears beside hers.
// B) s43–49  the buyer's choice: Nina's 4% note vs the new 5% note, both tagged $1,000; the buyer shakes his head;
//            Nina's tag drops to $930; the buyer pays $930 (cash to Nina), collects $40 coins, gets $1,000 back;
//            a bar $930 + the gap to $1,000 lifts the return to 5%.
// C) s50–51  flip it: the dial swings down to 3%; Nina's tag climbs to $1,078; the buyer is happy to pay more.
// D) s52     THE SEESAW: RATES on one end, BOND PRICE on the other; it tips on every "up" and "down".
// E) s53–54  Nina just holds: the timeline runs to the end, every $20 still arrives and $1,000 comes back (tick);
//            only a sale turns the lower price into a loss.
import React from 'react'
import { lerp, on, span, easeInOut } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { EXTRA } from './extra'
import { Headline, Person } from '../aimoney/common'
import { Arrow, B, BDefs, BGrain, Cash, Certificate, Coin, CoinStack, Cross, Dial, FLOOR, Flourish, Parchment, PriceTag, Seesaw, Square, Tag, Tick, cues, fadeIn, scene, FONT } from './kit'

const K = {
  wait40: 's40:wait', sell40: 's40:sell', investor40: 's40:investor', any40: 's40:any',
  year41: 's41:year', rates41: 's41:rates', rise41: 's41:rise',
  gov42: 's42:government', new42: 's42:new', five42: 's42:five', fifty42: 's42:fifty', forty42: 's42:forty',
  sell43: 's43:sell', buyer43: 's43:buyer',
  thousand44: 's44:thousand', forty44: 's44:forty', fifty44: 's44:fifty', same44: 's44:same',
  wouldnt45: "s45:wouldn't", lower45: 's45:lower', price45: 's45:price',
  drop46: 's46:drop', five46: 's46:five', new46: 's46:new',
  nine47: 's47:nine', thirty47: 's47:thirty',
  pays48: 's48:pays', collects48: 's48:collects', forty48: 's48:forty', full48: 's48:full', end48: 's48:end',
  gap49: 's49:gap', lifts49: 's49:lifts', five49: 's49:five',
  flip50: 's50:flip', fallen50: 's50:fallen', three50: 's50:three', generous50: 's50:generous',
  more51: 's51:more', seventy51: 's51:seventy',
  seesaw52: 's52:seesaw', up52: 's52:up', down52: 's52:down', down52b: 's52:down#2', up52b: 's52:up#2',
  change53: 's53:change', holds53: 's53:holds', end53: 's53:end', twenty53: 's53:twenty', thousand53: 's53:thousand',
  loss54: 's54:loss', sells54: 's54:sells',
}
const money = (v: number) => '$' + Math.round(v).toLocaleString('en-US')

const Stall: React.FC<{ x: number }> = ({ x }) => (
  <g transform={`translate(${x} ${FLOOR})`}>
    <ellipse cx={0} cy={6} rx={330} ry={18} fill="#000" opacity={0.15} />
    <rect x={-300} y={-260} width={600} height={260} fill="#A9845A" stroke="#6E5230" strokeWidth={5} />
    <rect x={-320} y={-280} width={640} height={30} rx={6} fill="#C49D66" stroke="#6E5230" strokeWidth={4} />
    {[-200, 0, 200].map((d) => <rect key={d} x={d - 80} y={-220} width={160} height={180} rx={6} fill="#B89466" opacity={0.6} />)}
  </g>
)

const Seesaw1: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s43') - 4, BC = c('s50') - 4, CD = c('s52') - 4, DE = c('s53') - 4
  const A = scene(f, -20, AB), Bs = scene(f, AB, BC), Cs = scene(f, BC, CD), Ds = scene(f, CD, DE), Es = fadeIn(f, DE)
  // # A: rate dial 4 → 5
  const rateA = lerp(4, 5, easeInOut(span(f, t.rise41 - 2, t.rise41 + 18)))
  // # B: Nina's price 1,000 → 930 between "lower" and "thirty"
  const priceB = lerp(1000, 930, easeInOut(span(f, t.lower45, t.thirty47 + 4)))
  const pay = easeInOut(span(f, t.pays48, t.pays48 + 18)), back = easeInOut(span(f, t.full48, t.full48 + 18))
  // # C: dial 5 → 3, price 1,000 → 1,078
  const rateC = lerp(5, 3, easeInOut(span(f, t.fallen50 - 2, t.three50 + 12)))
  const priceC = lerp(1000, 1078.4, easeInOut(span(f, t.more51, t.seventy51 + 6)))
  // # D: seesaw tilts: + = RATES (left) up
  const tilt = 12 * (on(f, t.up52 - 2, 10) - 2 * on(f, t.down52b - 2, 12))
  // # E: holding to the end
  const hold = span(f, t.holds53, t.end53 + 20)
  return (
    <g>
      <BDefs />
      {/* ---------------- A) she can sell any time; rates rise ---------------- */}
      {A > 0 && <g opacity={A}>
        <Square />
        <Stall x={760} />
        <Person f={f} who="investorF" beats={[[0, 'idle', 'smiling'], [t.sell40, 'present', 'smiling'], [t.rise41, 'shock', 'worried'], [t.forty42, 'scratchHead', 'worried']]} x={260} y={1060} s={0.8} />
        <Certificate x={760} y={470} s={0.5} n={0} rate="4%" />
        <Tag x={760} y={350} text="$40 A YEAR" size={38} bg={B.green} o={on(f, t.forty42, 8)} />
        <Person f={f} who="buyer" o={on(f, t.investor40 - 2, 10)} beats={[[0, 'idle', 'neutral'], [t.investor40, 'waveA', 'smiling'], [t.new42, 'point', 'smiling']]} x={1700} y={1060} s={0.8} flip />
        <Tag x={1240} y={300} text="ONE YEAR LATER" size={40} bg={B.inkSoft} o={on(f, t.year41, 8)} />
        <Dial x={1240} y={640} v={rateA} max={6} r={170} text="NEW NOTES PAY" o={on(f, t.rates41 - 2, 8) * (1 - on(f, t.new42 - 2, 8))} />
        <Certificate x={1240} y={560} s={0.5} n={0} rate="5%" title="NEW NOTE" color={B.blueD} o={on(f, t.new42, 10)} />
        <Tag x={1240} y={440} text="$50 A YEAR" size={38} bg={B.blueD} o={on(f, t.fifty42, 8)} />
      </g>}

      {/* ---------------- B) think like the buyer ---------------- */}
      {Bs > 0 && <g opacity={Bs}>
        <Square />
        <Person f={f} who="investorF" beats={[[0, 'present', 'neutral'], [t.lower45, 'nervous', 'worried'], [t.pays48 + 10, 'receive', 'neutral'], [t.gap49, 'idle', 'neutral']]} x={230} y={1060} s={0.78} />
        <Person f={f} who="buyer" beats={[[0, 'think', 'thinking'], [t.wouldnt45, 'crossNoA', 'neutral'], [t.thirty47 + 6, 'nodA', 'smiling'], [t.pays48, 'offer', 'smiling'], [t.collects48 + 6, 'receive', 'smiling'], [t.lifts49, 'thumbsUp', 'smiling']]} x={1720} y={1060} s={0.78} flip />
        {/* two notes, one choice (until the sale) */}
        <g opacity={1 - on(f, t.gap49 - 4, 8)}>
          <Certificate x={720} y={480} s={0.46} n={0} rate="4%" title="NINA'S NOTE" />
          <Tag x={720} y={340} text="$40 A YEAR" size={36} bg={B.green} o={on(f, t.forty44, 8)} />
          <PriceTag x={720} y={590} text={money(priceB)} color={priceB < 999 ? B.oxL : B.brassL} o={on(f, t.thousand44 - 2, 8)} />
          <g opacity={1 - on(f, t.pays48 - 6, 8)}>
            <Certificate x={1220} y={480} s={0.46} n={0} rate="5%" title="NEW NOTE" color={B.blueD} />
            <Tag x={1220} y={340} text="$50 A YEAR" size={36} bg={B.blueD} o={on(f, t.fifty44, 8)} />
            <PriceTag x={1220} y={590} text="$1,000" o={on(f, t.same44 - 2, 8)} />
          </g>
          <Cross x={720} y={480} r={90} p={on(f, t.wouldnt45, 8) * (1 - on(f, t.lower45, 8))} />
          {/* the sale: cash to Nina, coins + $1,000 to the buyer */}
          {pay > 0.01 && pay < 0.99 && <Cash x={lerp(1560, 420, pay)} y={820 - Math.sin(Math.PI * pay) * 40} s={0.6} text="$930" />}
          {f > t.collects48 && f < t.full48 && [0, 1].map((k) => { const p = ((f - t.collects48) / 22 + k / 2) % 1; return <Coin key={k} x={lerp(900, 1560, p)} y={lerp(700, 640, p) - Math.sin(Math.PI * p) * 80} r={30} label="$40" /> })}
          {back > 0.01 && back < 0.99 && <Cash x={lerp(1000, 1560, back)} y={640 - Math.sin(Math.PI * back) * 120} s={0.6} />}
          <Tag x={1220} y={860} text="+ $40 A YEAR, + $1,000 AT THE END" size={34} bg={B.ink} o={on(f, t.collects48, 8)} />
        </g>
        {/* the gap lifts the return */}
        {on(f, t.gap49 - 2, 8) > 0.01 && <g opacity={on(f, t.gap49 - 2, 8)}>
          <rect x={860} y={FLOOR - 465} width={220} height={465} rx={10} fill="url(#bd-greenbar)" />
          <text x={970} y={FLOOR - 200} textAnchor="middle" fill="#fff" style={{ font: `400 64px ${FONT.big}` }}>$930</text>
          <rect x={860} y={FLOOR - 500 - 35 * on(f, t.gap49, 12)} width={220} height={35 * on(f, t.gap49, 12) + 35} rx={8} fill={B.brass} stroke={B.brassD} strokeWidth={4} />
          <line x1={830} x2={1110} y1={FLOOR - 535} y2={FLOOR - 535} stroke={B.ink} strokeWidth={5} strokeDasharray="12 8" />
          <Tag x={1290} y={FLOOR - 535} text="$1,000" size={44} bg={B.ink} />
          <Tag x={1290} y={FLOOR - 450} text="THE GAP" size={40} bg={B.brassD} o={on(f, t.gap49, 8)} />
          <Tag x={970} y={300} text="RETURN: 5%" size={56} bg={B.green} o={on(f, t.five49, 8)} />
        </g>}
      </g>}

      {/* ---------------- C) flip it: rates fall to 3% ---------------- */}
      {Cs > 0 && <g opacity={Cs}>
        <Square />
        <Person f={f} who="investorF" beats={[[0, 'idle', 'neutral'], [t.generous50, 'confident', 'smug'], [t.seventy51, 'celebrate', 'smiling']]} x={260} y={1060} s={0.8} />
        <Person f={f} who="buyer" beats={[[0, 'think', 'thinking'], [t.more51, 'offer', 'smiling']]} x={1700} y={1060} s={0.8} flip />
        <Dial x={1180} y={600} v={rateC} max={6} r={160} text="NEW NOTES PAY" />
        <Certificate x={700} y={460} s={0.46} n={0} rate="4%" title="NINA'S NOTE" />
        <Tag x={700} y={320} text="$40 A YEAR" size={36} bg={B.green} o={on(f, t.generous50 - 4, 8)} />
        <PriceTag x={700} y={570} text={money(priceC)} color={priceC > 1001 ? B.greenL : B.brassL} />
      </g>}

      {/* ---------------- D) the seesaw ---------------- */}
      {Ds > 0 && <g opacity={Ds}>
        <Parchment />
        <Seesaw x={960} y={FLOOR} w={1400} tilt={tilt}
          left={<g><rect x={-150} y={-150} width={300} height={150} rx={16} fill={B.ox} /><text y={-56} textAnchor="middle" fill="#fff" style={{ font: `400 72px ${FONT.big}`, letterSpacing: 4 }}>RATES</text></g>}
          right={<g><Certificate x={0} y={-130} s={0.42} n={0} /><text y={-260} textAnchor="middle" fill={B.ink} style={{ font: `400 56px ${FONT.big}`, letterSpacing: 4 }}>BOND PRICE</text></g>} />
        <Arrow x1={150} y1={tilt > 0 ? 560 : 360} x2={150} y2={tilt > 0 ? 360 : 560} p={Math.abs(tilt) > 6 ? 1 : 0} color={B.ox} />
        <Arrow x1={1780} y1={tilt > 0 ? 360 : 560} x2={1780} y2={tilt > 0 ? 560 : 360} p={Math.abs(tilt) > 6 ? 1 : 0} color={B.green} />
      </g>}

      {/* ---------------- E) holding to the end ---------------- */}
      {Es > 0 && <g opacity={Es}>
        <Parchment />
        <Person f={f} who="investorF" beats={[[0, 'idle', 'neutral'], [t.holds53, 'hold', 'smiling'], [t.thousand53, 'celebrate', 'smiling'], [t.loss54, 'stop', 'neutral']]} x={280} y={1060} s={0.8} />
        <Certificate x={760} y={460} s={0.5} n={0} rate="4%" o={1 - on(f, t.loss54 - 4, 8)} />
        <g opacity={on(f, t.holds53 - 2, 8) * (1 - on(f, t.loss54 - 4, 8))}>
          <rect x={600} y={1000} width={1160} height={12} rx={6} fill={B.parchDD} />
          {Array.from({ length: 19 }, (_, k) => <rect key={k} x={600 + k * 64 - 3} y={985} width={6} height={42} fill={k / 18 <= hold ? B.green : B.inkL} />)}
          <circle cx={600 + 1160 * hold} cy={1006} r={16} fill={B.brass} stroke={B.brassD} strokeWidth={4} />
          <CoinStack x={1120} y={FLOOR} h={Math.round(18 * hold)} r={46} />
          <Tag x={1120} y={FLOOR - 18 * 16 - 70} text="EVERY $20" size={38} bg={B.brassD} o={on(f, t.twenty53, 8)} />
          <Cash x={1520} y={760} s={0.8} o={on(f, t.thousand53 - 2, 8)} />
          <Tick x={1520} y={600} r={46} p={on(f, t.thousand53 + 6, 8)} />
        </g>
        {on(f, t.loss54 - 4, 8) > 0.01 && <g opacity={on(f, t.loss54 - 4, 8)}>
          <PriceTag x={820} y={360} text="$930" color={B.oxL} s={1.2} />
          <Arrow x1={1000} y1={560} x2={1360} y2={560} p={on(f, t.sells54 - 2, 12)} color={B.ox} />
          <Tag x={1180} y={500} text="ONLY IF SHE SELLS" size={38} bg={B.ox} o={on(f, t.sells54, 8)} />
          <Tag x={820} y={640} text="REAL LOSS" size={44} bg={B.oxD} o={on(f, t.loss54, 8)} />
        </g>}
      </g>}

      <Headline f={f} lines={[[t.wait40, 'SHE CAN SELL ANY TIME', B.ink, 104], [t.rates41, 'RATES RISE', B.ox, 116], [t.sell43, 'THINK LIKE THE BUYER', B.ink, 106], [t.drop46, 'THE PRICE DROPS', B.ox, 112],
        [t.flip50, 'NOW FLIP IT', B.ink, 116], [t.seesaw52, 'THE SEESAW', B.ink, 120], [t.change53, "WHAT DOESN'T CHANGE", B.green, 108]]} />
      <Flourish f={f} at={(EXTRA['bd-seesaw1'] ?? []).map(c)} />
      <BGrain />
    </g>
  )
}

export const BD_SEESAW1 = makePiece('bd-seesaw1', "The seesaw: at a market stall Nina holds her 4% note ($40 a year), a buyer walks up, one year later the rate dial swings to 5% and a new 5% note ($50 a year) appears; the buyer compares both tagged $1,000 and shakes his head, Nina's tag drops to about $930, the buyer pays $930, collects $40 coins and gets $1,000 back, a $930 bar plus the gap to $1,000 lifts the return to 5%; flip it, the dial falls to 3% and her tag climbs to about $1,078; a big seesaw RATES vs BOND PRICE tips on every up and down; holding to the end every $20 still arrives and $1,000 comes back, only a sale makes the $930 a real loss", {
  mood: 'light', Component: Seesaw1, beats: [...Object.values(K), ...(EXTRA['bd-seesaw1'] ?? [])],
  sfx: [['s41:rise', 'riser', 0.08], ['s45:lower', 'thud', 0.1], ['s48:pays', 'cash', 0.1], ['s51:seventy', 'ding', 0.1], ['s52:seesaw', 'swish', 0.1], ['s53:thousand', 'chime', 0.1]] })
