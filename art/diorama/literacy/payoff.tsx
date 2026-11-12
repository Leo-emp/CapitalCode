// ---------------------------------------------------------------- s130–s137: the one idea
// A) s130–s133 the study: the ten cards in a row light up one by one as they are named (paycheck … match); on "rate"
//            they all flip to the same % badge; then three slide left under AGAINST YOU (22% card, 3.7% inflation, a fee)
//            and three slide right under FOR YOU (4% savings, compound growth, 50¢ match).
// B) s134–s135 inside a card: a BILL DUE slip is shown, then crossed ("never show up as a bill"); a magnifier sweeps
//            and finds the hidden % — coins drop: worth real money every year.
// C) s136–s137 the study: one last big card with a % and two arrows — FOR ME? / AGAINST ME?; then the cards stack
//            neatly under the lamp; Maya waves.
import React from 'react'
import { lerp, on, pop, span, easeInOut } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { EXTRA } from './extra'
import { Headline, Person, win } from '../aimoney/common'
import { C, Card, Coin, Cross, DESK, Defs, FONT, Grain, Lamp, PctBadge, Study, Tag, fadeIn, scene } from './kit'
import { Arrow, Magnifier, Num, Sheet, cues, Sweep } from './kit2'

const K = {
  look: 's130:look', paycheck: 's130:paycheck', taxes: 's130:taxes', savings: 's130:savings', cushion: 's130:cushion', debt: 's130:debt',
  credit: 's130:credit', inflation: 's130:inflation', growth: 's130:growth', fees: 's130:fees', match: 's130:match',
  every131: 's131:every', rate: 's131:rate', percent131: 's131:percent', for131: 's131:for', against131: 's131:against',
  twenty132: 's132:twenty', inflation132: 's132:inflation', fee132: 's132:fee', against132: 's132:against',
  four133: 's133:four', compound133: 's133:compound', fifty133: 's133:fifty', for133: 's133:for',
  quiet: 's134:quiet', never134: 's134:never', bill: 's134:bill', pay134: 's134:pay',
  easy: 's135:easy', miss: 's135:miss', spotting: 's135:spotting', money135: 's135:money', year135: 's135:year',
  whole: 's136:whole', question: 's136:question', percent136: 's136:percent', for136: 's136:for', against136: 's136:against',
  money137: 's137:money', advice: 's137:advice', rules: 's137:rules', nobody: 's137:nobody',
}
const NAMES = ['PAYCHECK', 'TAXES', 'SAVINGS', 'CUSHION', 'DEBT', 'CREDIT', 'INFLATION', 'GROWTH', 'FEES', 'MATCH']
// # where cards go: debt(4), inflation(6), fees(8) → AGAINST (left); savings(2), growth(7), match(9) → FOR (right)
const SIDE: Record<number, [number, number, string]> = { 4: [-1, 0, '22% CARD'], 6: [-1, 1, '3.7% PRICES'], 8: [-1, 2, 'FEES'], 2: [1, 0, '4% SAVINGS'], 7: [1, 1, 'GROWTH'], 9: [1, 2, '50¢ MATCH'] }

const Payoff: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s134') - 6, BC = c('s136') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = fadeIn(f, BC)
  const named = [t.paycheck, t.taxes, t.savings, t.cushion, t.debt, t.credit, t.inflation, t.growth, t.fees, t.match]
  const flipT = (k: number) => span(f, t.rate + k * 2, t.rate + k * 2 + 10)
  const sideT = (k: number) => SIDE[k]?.[0] === -1 ? easeInOut(span(f, t.twenty132 - 4 + SIDE[k][1] * 12, t.twenty132 + 10 + SIDE[k][1] * 12)) : SIDE[k] ? easeInOut(span(f, t.four133 - 4 + SIDE[k][1] * 12, t.four133 + 10 + SIDE[k][1] * 12)) : 0
  const stack = easeInOut(span(f, t.money137 - 6, t.advice + 10))

  return (
    <g>
      <Defs />
      {/* ---------------- A) ten cards, one idea, two sides ---------------- */}
      {A > 0 && <g opacity={A}>
        <Study f={f} />
        <Tag x={640} y={340} text="AGAINST YOU" size={52} color={C.tomato} ink="#fff" point="none" o={on(f, t.against131, 8)} />
        <Tag x={1280} y={340} text="FOR YOU" size={52} color={C.cashD} ink="#fff" point="none" o={on(f, t.for131, 8)} />
        {NAMES.map((name, k) => {
          const ft = flipT(k), sq = Math.abs(Math.cos(ft * Math.PI)), back = ft > 0.5
          const side = SIDE[k], st = sideT(k)
          const rx = 210 + k * 167, ry = DESK - 20
          const x = side ? lerp(rx, side[0] < 0 ? 640 : 1280, st) : rx, y = side ? lerp(ry, 470 + side[1] * 190, st) : ry
          const fade = side ? 1 : 1 - 0.75 * on(f, t.twenty132 - 4, 12)
          return <g key={k} opacity={on(f, named[k] - 4, 6) * fade} transform={`translate(${x} ${y}) scale(${sq} 1) translate(${-x} ${-y})`}>
            <Card x={x} y={y} s={lerp(0.5, 0.75, st)} n={k + 1} glow={win(f, named[k], named[k] + 30, 8)}>
              {!back && <text y={10} textAnchor="middle" fill={C.ink} style={{ font: `400 ${name.length > 7 ? 62 : 76}px ${FONT.big}` }}>{name}</text>}
              {back && !(side && st > 0.5) && <PctBadge x={0} y={-6} r={54} />}
              {back && side && st > 0.5 && <g><PctBadge x={-104} y={-6} r={40} color={side[0] < 0 ? C.red : C.cashD} /><text x={30} y={14} textAnchor="middle" fill={side[0] < 0 ? C.redD : C.cashD} style={{ font: `400 ${side[2].length > 9 ? 44 : 52}px ${FONT.big}` }}>{side[2]}</text></g>}
            </Card>
          </g>
        })}
      </g>}

      {/* ---------------- B) quiet rates: no bill ---------------- */}
      {B > 0 && <g opacity={B}>
        <Sheet />
        <g opacity={1 - on(f, t.easy - 4, 10)}>
          <g transform="translate(960 640) rotate(-4)" opacity={on(f, t.never134 - 6, 8)}>
            <rect x={-230} y={-260} width={460} height={520} rx={12} fill="#000" opacity={0.18} transform="translate(8 10)" />
            <rect x={-230} y={-260} width={460} height={520} rx={12} fill="#fff" />
            <rect x={-230} y={-260} width={460} height={90} rx={12} fill={C.tomato} />
            <text y={-196} textAnchor="middle" fill="#fff" style={{ font: `400 60px ${FONT.big}`, letterSpacing: 4 }}>BILL DUE</text>
            {['INFLATION', 'FEES', 'MISSED MATCH'].map((s, k) => <text key={k} x={-190} y={-80 + k * 80} fill={C.ink} style={{ font: `400 52px ${FONT.big}` }}>{s}</text>)}
            <text x={0} y={200} textAnchor="middle" fill={C.inkSoft} style={{ font: `400 56px ${FONT.big}` }}>TOTAL: $ ?</text>
          </g>
          <Cross x={960} y={640} r={300} p={on(f, t.bill + 4, 12)} />
        </g>
        <g opacity={on(f, t.easy - 4, 10)}>
          {[[520, 520], [960, 700], [1400, 520]].map(([x, y], k) => <PctBadge key={k} x={x} y={y} r={70} o={0.25 + 0.75 * on(f, t.spotting + k * 8, 8)} color={k === 1 ? C.red : C.brass} />)}
          <Magnifier x={lerp(400, 1400, span(f, t.miss, t.spotting + 24))} y={lerp(560, 540, span(f, t.miss, t.spotting + 24))} s={1} r={-10} />
          {[0, 1, 2].map((k) => { const p = ((f - t.money135) / 20 + k / 3) % 1; return f > t.money135 ? <Coin key={k} x={860 + k * 100} y={760 + p * 160} r={34} o={1 - p} /> : null })}
          <Tag x={960} y={960} text="WORTH REAL MONEY, EVERY YEAR" size={40} point="none" o={on(f, t.money135, 8)} />
        </g>
      </g>}

      {/* ---------------- C) the one question ---------------- */}
      {Cc > 0 && <g opacity={Cc}>
        <Study f={f} lamp={1} />
        <Lamp x={1760} s={0.8} />
        <g opacity={1 - stack}>
          <Card x={960} y={DESK - 160} s={1.4} r={-2} glow={on(f, t.percent136, 10)}>
            <PctBadge x={0} y={-10} r={70} o={on(f, t.percent136 - 4, 8)} />
          </Card>
          <Arrow x1={760} y1={DESK - 160} x2={560} y2={DESK - 160} p={span(f, t.for136, t.for136 + 10)} color={C.cash} w={18} />
          <Tag x={560} y={DESK - 30} text="FOR ME?" size={56} color={C.cashD} ink="#fff" point="none" o={on(f, t.for136, 8)} />
          <Arrow x1={1160} y1={DESK - 160} x2={1360} y2={DESK - 160} p={span(f, t.against136, t.against136 + 10)} color={C.red} w={18} />
          <Tag x={1360} y={DESK - 30} text="AGAINST ME?" size={56} color={C.tomato} ink="#fff" point="none" o={on(f, t.against136, 8)} />
        </g>
        <g opacity={stack}>
          {Array.from({ length: 10 }, (_, k) => <Card key={k} x={960 + (k % 2 ? 4 : -4)} y={DESK + 40 - k * 8} s={0.8} r={(k % 3) - 1} n={k === 9 ? 10 : undefined} />)}
          <Person f={f} who="investorF" beats={[[0, 'idle', 'smiling'], [t.advice, 'waveA', 'smiling', 'waveB', 14]]} x={1400} y={1080} s={0.85} flip o={on(f, t.money137, 10)} />
          <Num x={960} y={DESK + 230} text="NOT ADVICE · JUST THE RULES" size={56} color={C.paper} o={on(f, t.rules, 8)} />
        </g>
      </g>}

      <Headline f={f} lines={[[t.look, 'LOOK BACK AT EVERY CARD', C.paper, 100], [t.rate, 'EVERY ONE IS A RATE', C.brassL, 104], [t.twenty132, 'WORKING AGAINST YOU', C.tomato, 100], [t.four133, 'WORKING FOR YOU', C.cashL, 104],
        [t.quiet, 'THE QUIET RATES', C.ink, 110], [t.whole, 'FINANCIAL LITERACY IN ONE QUESTION', C.paper, 88], [t.money137, 'HOW THE MONEY REALLY WORKS', C.brassL, 96]]} />
      <Sweep f={f} at={EXTRA['fl-payoff'].map(c)} />
      <Grain />
    </g>
  )
}

export const FL_PAYOFF = makePiece('fl-payoff', 'The one idea: ten index cards in a row light as they are named — paycheck, taxes, savings, cushion, debt, credit, inflation, growth, fees, match — then all flip to the same % badge; the 22% card, 3.7% inflation and a fee slide under AGAINST YOU, 4% savings, compound growth and a 50¢ match under FOR YOU; a BILL DUE slip for inflation, fees and a missed match is crossed (they never send a bill); a magnifier spots the hidden % marks and coins drop; one big card with a % and two arrows: FOR ME? AGAINST ME?; the cards stack under the lamp, Maya waves, not advice, just the rules', {
  mood: 'light', Component: Payoff, beats: [...Object.values(K), ...EXTRA['fl-payoff']],
  sfx: [['s131:rate', 'chime', 0.16], ['s134:bill', 'swish', 0.14], ['s135:spotting', 'ding', 0.14], ['s136:question', 'pop', 0.14]] })
void pop
