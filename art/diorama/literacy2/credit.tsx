// ---------------------------------------------------------------- s71–s84: CREDIT — the three-digit number and its price
// A) s71–s77 a score dial 300–850 (lenders read it); beside it a pie fills with the five FICO parts as they are
//            named: on time 35%, amount used 30%, history 15%, new 10%, mix 10%. A late payment and a nearly maxed
//            card push the needle down. Salary is shown, then crossed (not on the list); two small dials, Maya high
//            and Jordan lower — far apart.
// B) s78–s82 the street: two identical cars, each a $25,000 five-year loan; price tags 4.4% (top score) and 9.7%
//            (scores 600–660); +$63 a month, +$3,750 interest for the exact same car.
// C) s83–s84 Maya's room: no card debt (card crossed), a full cushion jar, $730 arriving each month; a plan clipboard.
import React from 'react'
import { lerp, on, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Sweep } from '../literacy/kit2'
import { EXTRA } from './extra'
import { Headline, Person, win } from '../aimoney/common'
import { Defs } from '../literacy/kit'
import { Gauge, Jar, Letter, Pie, PriceTag } from '../literacy/kit2'
import { Big, Card, Coin, Cross, FLOOR, L, LDefs, LGrain, Paper, Room, Street, Tag, Tick, cues, fadeIn, scene, FONT } from './kit'

const K = {
  number71: 's69:number', credit71: 's69:credit', three71: 's69:three', eight71: 's69:eight', lenders71: 's69:lenders', back71: 's69:back',
  fico: 's70:fico', five72: 's70:five', parts72: 's70:parts',
  biggest: 's71:biggest', thirty73: 's71:thirty', time73: 's71:time',
  thirty74: 's72:thirty', limits: 's72:limits', using: 's72:using',
  length75: 's73:length', fifteen75: 's73:fifteen', new75: 's73:new', mix75: 's73:mix', ten75: 's73:ten',
  late76: 's74:late', maxed: 's74:maxed', down76: 's74:down',
  missing: "s75:what's", salary77: 's75:salary', list77: 's75:list', maya77: 's75:maya', same77: 's75:same', apart: 's75:apart',
  matters78: 's76:score', price78: 's76:price', borrow78: 's76:borrow',
  car79: 's77:car', loan79: 's77:loan', years79: 's77:years', mid80: 's78:mid', twenty79: 's77:twenty', five79: 's77:five',
  top80: 's78:top', four80: 's78:four', buyers80: 's78:buyers', six80: 's78:six', nine80: 's78:nine',
  sixty81: 's79:sixty', month81: 's79:month', three81: 's79:three', interest81: 's79:interest', same81: 's79:same',
  maya83: 's80:maya', card83: 's80:card', nine83: 's80:nine', full83: 's80:full', seven83: 's81:seven', arriving: 's81:month',
  question84: 's81:what', money84: 's81:do', needs84: 's81:needs', plan84: 's81:plan',
}

const Auto: React.FC<{ x: number; y: number; s?: number; o?: number; color: string }> = ({ x, y, s = 1, o = 1, color }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={260} ry={18} fill="#000" opacity={0.18} />
    <path d="M-250 -50 L-230 -120 L-120 -135 L-60 -215 L120 -215 L190 -135 L250 -115 L250 -40 Z" fill={color} />
    <path d="M-44 -200 L110 -200 L160 -140 L-96 -140 Z" fill="#DCEFF2" /><rect x={-260} y={-60} width={520} height={34} rx={14} fill="#000" opacity={0.15} />
    {[-150, 160].map((k) => <g key={k}><circle cx={k} cy={-16} r={52} fill={L.ink} /><circle cx={k} cy={-16} r={22} fill={L.creamD} /></g>)}
    <rect x={220} y={-110} width={30} height={20} rx={6} fill={L.mustardL} />
  </g>
)

const Credit: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s76') - 6, BC = c('s80') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = fadeIn(f, BC)
  const needle = lerp(720, 740, on(f, t.time73, 20)) - 150 * on(f, t.late76, 14) - 60 * on(f, t.maxed, 14)
  const parts = [
    { v: 35, color: L.sageD, p: on(f, t.thirty73, 12), label: '35%' },
    { v: 30, color: L.duskD, p: on(f, t.thirty74, 12), label: '30%' },
    { v: 15, color: L.mustard, p: on(f, t.fifteen75, 12), label: '15%' },
    { v: 10, color: L.terra, p: on(f, t.new75, 12), label: '10%' },
    { v: 10, color: L.plum, p: on(f, t.mix75, 12), label: '10%' },
  ]
  const NAMES: [string, number, string][] = [['PAYING ON TIME', t.time73, L.sageD], ['AMOUNT USED', t.limits, L.duskD], ['HISTORY LENGTH', t.length75, L.mustardD], ['NEW CREDIT', t.new75, L.terraD], ['ACCOUNT MIX', t.mix75, L.plum]]
  const pieO = on(f, t.fico - 2, 8) * (1 - on(f, t.missing - 4, 8))

  return (
    <g>
      <Defs /><LDefs />
      {/* ---------------- A) the score and its parts ---------------- */}
      {A > 0 && <g opacity={A}>
        <Paper />
        <g opacity={1 - on(f, t.missing - 4, 8)}>
          <Gauge x={560} y={760} r={300} val={needle} o={on(f, t.credit71 - 4, 8)} />
          <Big x={560} y={890} text={String(Math.round(needle))} size={100} color={L.ink} o={on(f, t.credit71, 8)} />
          <Tag x={560} y={985} text="LENDERS: WILL YOU PAY BACK?" size={36} bg={L.inkSoft} o={on(f, t.lenders71, 8) * (1 - on(f, t.late76 - 4, 8))} />
          <g opacity={on(f, t.late76 - 2, 8)}>
            <Tag x={560} y={985} text={f < t.maxed ? 'A LATE PAYMENT' : 'A MAXED-OUT CARD'} size={40} bg={L.red} />
          </g>
          <g opacity={pieO}>
            <Pie x={1240} y={640} r={250} parts={parts} />
            {NAMES.map(([n, at, col], k) => <Tag key={n} x={1660} y={430 + k * 100} text={n} size={34} bg={col} o={on(f, at, 8)} />)}
          </g>
        </g>
        {/* salary is not on the list */}
        <g opacity={on(f, t.missing - 2, 8)}>
          <g opacity={1 - on(f, t.maya77 - 4, 8)}>
            <Letter x={960} y={600} s={0.8} amount="$52,000" head="SALARY" />
            <Cross x={960} y={600} r={170} p={span(f, t.list77 - 4, t.list77 + 8)} />
          </g>
          <g opacity={on(f, t.maya77 - 2, 8)}>
            <Gauge x={560} y={760} r={230} val={780} />
            <Gauge x={1360} y={760} r={230} val={lerp(780, 590, on(f, t.apart - 6, 16))} />
            <Tag x={560} y={880} text="MAYA" size={44} bg={L.sageD} />
            <Tag x={1360} y={880} text="JORDAN" size={44} bg={L.terraD} />
            <Tag x={960} y={360} text="SAME SALARY" size={44} bg={L.ink} o={on(f, t.same77, 8)} />
          </g>
        </g>
      </g>}

      {/* ---------------- B) the same car, two prices ---------------- */}
      {B > 0 && <g opacity={B}>
        <Street />
        <Auto x={560} y={FLOOR + 40} s={1} color={L.sage} o={on(f, t.car79 - 4, 8)} />
        <Auto x={1360} y={FLOOR + 40} s={1} color={L.sage} o={on(f, t.car79 - 2, 8)} />
        <Tag x={820} y={330} text="$25,000 LOAN" size={46} bg={L.ink} o={on(f, t.loan79 - 4, 8)} />
        <Tag x={1140} y={330} text="5 YEARS" size={46} bg={L.ink} o={on(f, t.years79, 8)} />
        <Tag x={960} y={440} text="AVERAGE NEW-CAR RATES, MID 2026" size={34} bg={L.inkSoft} o={win(f, t.mid80, t.sixty81, 8)} />
        <PriceTag x={560} y={560} text="4.4%" s={1.2} r={-6} color={L.sageL} o={on(f, t.four80 - 2, 8)} />
        <Tag x={560} y={700} text="TOP SCORES" size={38} bg={L.sageD} o={on(f, t.top80, 8)} />
        <PriceTag x={1360} y={560} text="9.7%" s={1.2} r={6} color={L.terraL} o={on(f, t.nine80 - 2, 8)} />
        <Tag x={1360} y={700} text="SCORES 600–660" size={38} bg={L.terraD} o={on(f, t.six80, 8)} />
        <g opacity={on(f, t.sixty81 - 2, 8)}>
          <rect x={1560} y={360} width={330} height={250} rx={22} fill={L.creamL} stroke={L.terraD} strokeWidth={6} />
          <Big x={1725} y={450} text="+$63 A MONTH" size={52} color={L.terraD} />
          <Big x={1725} y={540} text="+$3,750" size={70} color={L.terraD} o={on(f, t.three81, 8)} />
          <Big x={1725} y={590} text="IN INTEREST" size={36} color={L.inkSoft} o={on(f, t.interest81, 8)} />
        </g>
        <Tag x={960} y={440} text="THE EXACT SAME CAR" size={40} bg={L.inkSoft} o={on(f, t.same81, 8)} />
      </g>}

      {/* ---------------- C) where Maya stands ---------------- */}
      {Cc > 0 && <g opacity={Cc}>
        <Room />
        <Person f={f} who="investorF" beats={[[0, 'idle', 'smiling'], [t.card83, 'crossNoA', 'neutral', 'crossNoB', 14], [t.full83, 'thumbsUp', 'smiling'], [t.arriving, 'receive', 'smiling'], [t.money84, 'scratchHead', 'thinking'], [t.question84, 'think', 'thinking'], [t.needs84, 'pointUp', 'smiling'], [t.plan84, 'holdUp', 'smiling']]} x={250} y={1060} s={0.8} />
        <g opacity={1 - on(f, t.question84 - 4, 8)}>
          <Card x={700} y={560} s={0.7} r={-6} text="DEBT" o={on(f, t.card83 - 2, 8)} />
          <Cross x={700} y={560} r={110} p={span(f, t.card83 + 2, t.card83 + 12)} />
          <Jar x={1100} y={FLOOR - 4} s={1} fill={0.85} color={L.sage} label="CUSHION" o={on(f, t.full83 - 2, 8)} />
          <Tick x={1100} y={500} r={40} p={on(f, t.full83 + 4, 8)} />
          <Tag x={1100} y={420} text="FULL AFTER ~9 MONTHS" size={36} bg={L.sageD} o={on(f, t.nine83, 8)} />
          <g opacity={on(f, t.seven83 - 2, 8)}>
            {[0, 1, 2].map((k) => { const p = ((f - t.seven83) / 30 + k / 3) % 1; return <Coin key={k} x={1560} y={lerp(380, 760, p)} r={40} label="$" o={1 - p * 0.7} /> })}
            <Tag x={1560} y={850} text="$730 EVERY MONTH" size={40} bg={L.sageD} o={on(f, t.arriving, 8)} />
          </g>
        </g>
        <g opacity={on(f, t.question84 - 2, 8)} transform="translate(1100 620)">
          <rect x={-180} y={-240} width={360} height={460} rx={18} fill={L.creamL} stroke={L.sageD} strokeWidth={8} /><rect x={-70} y={-262} width={140} height={50} rx={12} fill={L.sageD} />
          <text x={0} y={-150} textAnchor="middle" fill={L.ink} style={{ font: `400 64px ${FONT.big}`, letterSpacing: 4 }} opacity={on(f, t.plan84, 8)}>THE PLAN</text>
          {[0, 1, 2].map((k) => <rect key={k} x={-130} y={-80 + k * 80} width={260} height={26} rx={10} fill={L.creamD} />)}
        </g>
      </g>}

      <Headline f={f} lines={[[t.number71, 'THE CREDIT SCORE', L.ink, 110], [t.fico, 'FIVE PARTS', L.ink, 110], [t.late76, 'WHAT PULLS IT DOWN', L.terraD, 104], [t.missing, "WHAT'S MISSING", L.ink, 110],
        [t.matters78, 'THE PRICE OF BORROWING', L.ink, 100], [t.maya83, 'WHERE MAYA STANDS', L.sageD, 104]]} />
      <Sweep f={f} at={(EXTRA['ll-credit'] ?? []).map(c)} />
      <LGrain />
    </g>
  )
}

export const LL_CREDIT = makePiece('ll-credit', "Credit: a score dial from 300 to 850 that lenders read; a pie fills with the five FICO parts as they are named — paying on time 35%, amount used 30%, history length 15%, new credit 10%, account mix 10%; a late payment and a maxed-out card push the needle down; a $52,000 salary letter is shown then crossed (not on the list); two dials, Maya high and Jordan lower, the same salary; on a street two identical cars, each a $25,000 five-year loan, price tags 4.4% (top scores) and 9.7% (scores 600–660): +$63 a month and +$3,750 in interest for the exact same car; Maya's room — a debt card crossed, a full cushion jar ticked, $730 coins arriving every month, full after about 9 months, then THE PLAN clipboard", {
  mood: 'light', Component: Credit, beats: [...Object.values(K), ...(EXTRA['ll-credit'] ?? [])],
  sfx: [['s69:credit', 'pop', 0.1], ['s74:late', 'thud', 0.12], ['s75:list', 'swish', 0.12], ['s78:nine', 'ding', 0.12], ['s79:three', 'thud', 0.12], ['s81:plan', 'chime', 0.12]] })
