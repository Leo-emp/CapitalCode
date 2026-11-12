// ---------------------------------------------------------------- s7–s21: EARN — where the paycheck goes, active vs passive
// A) s7–s9   the office: Maya and Jordan introduced (made-up example); one offer letter, $52,000 a year; it turns into
//            a month: $4,330.
// B) s10–s16 the pay bar: a paycheck lands at $3,660, not $4,330 (the top number is crossed). Then one big bar of
//            the year's $52,000: a thin strip for payroll tax (7.65% of all pay → Social Security + Medicare); the
//            income-tax part shows its slices — the first $16,100 NOT TAXED, then 10%, then 12%; the two taxes lift
//            off into a TAX box (about $8,000 a year); what is left becomes $3,660 a month.
// C) s17–s21 active vs passive: Maya at her desk with an hourglass — coins fall only while the sand runs; she stops,
//            the coins stop. Beside it a money tree drops coins by itself: a bank (interest), a company (dividends).
//            Both coworkers stand under ACTIVE; the tree waits as the goal; the $3,660 returns with a question.
import React from 'react'
import { lerp, on, span, easeInOut } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Sweep } from '../literacy/kit2'
import { EXTRA } from './extra'
import { Headline, Person, win } from '../aimoney/common'
import { Defs } from '../literacy/kit'
import { Arrow, Hourglass, Letter, MoneyBar } from '../literacy/kit2'
import { Big, Coin, Cross, Desk, FLOOR, L, LDefs, LGrain, MoneyTree, Office, Paper, Plaque, Tag, cues, fadeIn, scene, FONT } from './kit'

const K = {
  maya7: 's7:maya', jordan7: 's7:jordan', made7: 's7:made', real7: 's7:real',
  started8: 's8:started', fifty8: 's8:fifty', year8: 's8:year',
  four9: 's9:four', month9: 's9:month',
  lands10: 's10:lands', smaller10: 's10:smaller', three10: 's10:three',
  rest11: 's11:rest', two11: 's11:two', reaches11: 's11:reaches',
  payroll: 's12:payroll', seven12: 's12:seven', security: 's12:security', medicare: 's12:medicare',
  federal13: 's13:federal', sixteen13: 's13:sixteen', taxed13: 's13:taxed',
  layers: 's14:layers', ten14: 's14:ten', twelve14: 's14:twelve',
  together15: 's15:together', eight15: 's15:eight', state15: 's15:state', health15: 's15:health',
  real16: 's16:real', live16: 's16:live', three16: 's16:three',
  notice17: 's17:notice', work17: 's17:work',
  active18: 's18:active', time18: 's18:time', stop18: 's18:stop', stops18: 's18:stops',
  second19: 's19:second', passive19: 's19:passive', keeps19: 's19:keeps', hours19: 's19:hours', interest19: 's19:interest', bank19: 's19:bank', dividends19: 's19:dividends', company19: 's19:company',
  now20: 's20:now', first20: 's20:first', getting20: 's20:getting', building20: 's20:building', second20: 's20:second',
  first21: 's21:first', happens21: 's21:happens', month21: 's21:month',
}

// # a small bank (columns) and a small company tower
const Bank: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={4} rx={150} ry={12} fill="#000" opacity={0.14} />
    <path d="M-140 -150 L0 -230 L140 -150 Z" fill={L.duskD} /><rect x={-130} y={-150} width={260} height={20} fill={L.dusk} />
    {[-95, -32, 32, 95].map((k) => <rect key={k} x={k - 14} y={-130} width={28} height={110} fill={L.creamL} />)}
    <rect x={-140} y={-20} width={280} height={20} fill={L.dusk} />
    <text x={0} y={-168} textAnchor="middle" fill="#fff" style={{ font: `400 34px ${FONT.big}` }}>BANK</text>
  </g>
)
const Tower: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={4} rx={110} ry={10} fill="#000" opacity={0.14} />
    <rect x={-80} y={-260} width={160} height={260} fill={L.mustard} /><rect x={-80} y={-260} width={36} height={260} fill="#000" opacity={0.08} />
    {Array.from({ length: 12 }, (_, k) => <rect key={k} x={-56 + (k % 3) * 40} y={-236 + Math.floor(k / 3) * 56} width={26} height={34} fill={L.creamL} />)}
    <text x={0} y={-276} textAnchor="middle" fill={L.mustardD} style={{ font: `400 34px ${FONT.big}` }}>COMPANY</text>
  </g>
)

const Earn: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = t.lands10 - 6, BC = c('s17') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = fadeIn(f, BC)
  // # B: the paycheck first, then the year bar
  const barO = on(f, t.rest11 - 2, 10) * (1 - on(f, t.real16 - 6, 10))
    const X0 = 210, W = 1500
  const segs = [
    { a: 0, b: 16100 / 52000, color: L.sage, label: 'NOT TAXED', o: on(f, t.sixteen13 - 2, 8) },
    { a: 16100 / 52000, b: 28500 / 52000, color: L.mustard, label: '10%', o: on(f, t.ten14 - 2, 8) },
    { a: 28500 / 52000, b: 1, color: L.terra, label: '12%', o: on(f, t.twelve14 - 2, 8) },
  ]
  // # C: hourglass runs while Maya works, stops on "stop"
  const working = f < t.stop18
  const sand = working ? ((f - BC) / 120) % 1 : 0.6

  return (
    <g>
      <Defs /><LDefs />
      {/* ---------------- A) meet Maya and Jordan, the offer ---------------- */}
      {A > 0 && <g opacity={A}>
        <Office desks={0} />
        <Person f={f} who="investorF" beats={[[0, 'idle', 'smiling'], [t.maya7, 'waveA', 'smiling', 'waveB', 14], [t.started8, 'present', 'smiling'], [t.four9, 'countOne', 'thinking']]} x={420} y={1060} s={0.8} />
        <Person f={f} who="investor" beats={[[0, 'idle', 'neutral'], [t.jordan7, 'waveA', 'smiling', 'waveB', 14], [t.started8, 'thumbsUp', 'smiling'], [t.four9, 'idle', 'smiling']]} x={1500} y={1060} s={0.8} flip />
        <Plaque x={420} y={330} text="MAYA" color={L.sageD} o={on(f, t.maya7, 8)} />
        <Plaque x={1500} y={330} text="JORDAN" color={L.terraD} o={on(f, t.jordan7, 8)} />
        <Tag x={960} y={250} text="MADE-UP EXAMPLE" size={36} bg={L.inkSoft} o={win(f, t.made7, t.fifty8, 8)} />
        <g opacity={on(f, t.fifty8 - 2, 8) * (1 - on(f, t.four9 - 4, 8))}><Letter x={960} y={560} s={0.8} amount="$52,000" head="JOB OFFER" /></g>
        <g opacity={on(f, t.four9 - 2, 8)}>
          <rect x={760} y={430} width={400} height={260} rx={20} fill={L.creamL} stroke={L.sageD} strokeWidth={6} />
          <Big x={960} y={560} text="$4,330" size={130} color={L.cashD} />
          <Big x={960} y={640} text="A MONTH" size={50} color={L.inkSoft} o={on(f, t.month9, 8)} />
        </g>
      </g>}

      {/* ---------------- B) the paycheck and the year bar ---------------- */}
      {B > 0 && <g opacity={B}>
        <Paper />
        {/* the paycheck that lands smaller */}
        <g opacity={1 - on(f, t.rest11 - 4, 8)}>
          <g transform={`translate(960 ${lerp(260, 600, easeInOut(span(f, t.lands10 - 4, t.lands10 + 10)))})`}>
            <rect x={-330} y={-150} width={660} height={300} rx={20} fill="#000" opacity={0.15} transform="translate(8 10)" />
            <rect x={-330} y={-150} width={660} height={300} rx={20} fill={L.creamL} stroke={L.sageD} strokeWidth={6} />
            <text x={-290} y={-90} fill={L.inkSoft} style={{ font: `400 44px ${FONT.big}`, letterSpacing: 3 }}>FIRST PAYCHECK</text>
            <Big x={-120} y={30} text="$4,330" size={110} color={L.inkSoft} o={1 - on(f, t.three10, 8) * 0.55} />
            <Cross x={-120} y={-8} r={70} p={span(f, t.smaller10, t.smaller10 + 12)} />
            <Big x={180} y={30} text="$3,660" size={110} color={L.cashD} o={on(f, t.three10, 8)} />
          </g>
        </g>
        {/* the year bar */}
        <g opacity={barO} transform="translate(0 90)">
          <Big x={X0} y={430} text="$52,000 A YEAR" size={58} color={L.ink} anchor="start" />
          {/* payroll strip: 7.65% of all pay */}
          <g opacity={on(f, t.payroll - 2, 8)}>
            <rect x={X0} y={460} width={W} height={40} rx={10} fill={L.duskD} />
            <text x={X0 + 20} y={492} fill="#fff" style={{ font: `400 34px ${FONT.big}`, letterSpacing: 2 }}>PAYROLL TAX · 7.65% OF ALL PAY</text>
            <Tag x={X0 + W - 280} y={570} text="SOCIAL SECURITY + MEDICARE" size={32} bg={L.duskD} o={win(f, t.security, t.federal13, 8)} />
          </g>
          {/* income tax slices */}
          <MoneyBar x={X0} y={520} w={W} h={130} segs={segs} o={on(f, t.federal13 - 4, 8)} />
          <Tag x={X0 + W * (16100 / 52000) / 2} y={730} text="FIRST $16,100" size={40} bg={L.sageD} o={win(f, t.sixteen13, t.layers + 10, 8)} />
          <Tag x={X0 + W * (22300 / 52000)} y={730} text="$1,240 TAX" size={36} bg={L.mustardD} o={win(f, t.ten14, t.together15, 8)} />
          <Tag x={X0 + W * (40250 / 52000)} y={730} text="$2,820 TAX" size={36} bg={L.terraD} o={win(f, t.twelve14, t.together15, 8)} />
          {/* the two taxes leave into a box */}
          <g opacity={on(f, t.together15 - 2, 8)}>
            <rect x={1360} y={780} width={350} height={170} rx={20} fill={L.ink} />
            <text x={1535} y={846} textAnchor="middle" fill="#fff" style={{ font: `400 46px ${FONT.big}`, letterSpacing: 3 }}>TWO TAXES</text>
            <text x={1535} y={920} textAnchor="middle" fill={L.mustardL} style={{ font: `400 62px ${FONT.big}` }} opacity={on(f, t.eight15, 8)}>≈ $8,000 A YEAR</text>
            <Arrow x1={1100} y1={700} x2={1340} y2={850} p={span(f, t.together15, t.together15 + 12)} color={L.ink} w={10} />
          </g>
          <g opacity={on(f, t.state15 - 2, 8)}>
            <Tag x={500} y={860} text="+ STATE TAX" size={36} bg={L.inkSoft} />
            <Tag x={820} y={860} text="+ HEALTH INSURANCE" size={36} bg={L.inkSoft} o={on(f, t.health15, 8)} />
            <Big x={660} y={950} text="NOT COUNTED HERE" size={40} color={L.inkSoft} />
          </g>
        </g>
        {/* what is left */}
        <g opacity={on(f, t.real16 - 4, 10)}>
          <rect x={560} y={400} width={800} height={380} rx={30} fill={L.creamL} stroke={L.cashD} strokeWidth={8} />
          <text x={960} y={500} textAnchor="middle" fill={L.inkSoft} style={{ font: `400 52px ${FONT.big}`, letterSpacing: 3 }}>WHAT THEY LIVE ON</text>
          <Big x={960} y={660} text="$3,660" size={190} color={L.cashD} o={on(f, t.three16 - 2, 8)} />
          <Big x={960} y={740} text="A MONTH" size={56} color={L.inkSoft} o={on(f, t.three16, 8)} />
        </g>
      </g>}

      {/* ---------------- C) active vs passive ---------------- */}
      {Cc > 0 && <g opacity={Cc}>
        <Office desks={0} />
        <rect x={948} y={240} width={24} height={840} fill={L.ink} opacity={0.6} />
        {/* left: active */}
        <g opacity={1 - on(f, t.now20 - 4, 10)}>
          <Desk x={420} />
          <Person f={f} who="investorF" beats={[[0, 'type', 'neutral'], [t.time18, 'type', 'thinking'], [t.stop18, 'relax', 'neutral'], [t.stops18, 'shrug', 'worried']]} x={240} y={1060} s={0.72} />
          <Hourglass x={700} y={720} s={0.9} t={sand} o={on(f, t.active18 - 6, 8)} />
          {working && f > t.active18 && [0, 1, 2].map((k) => { const p = ((f - t.active18) / 24 + k / 3) % 1; return <Coin key={k} x={700} y={lerp(760, 880, p)} r={24} o={1 - p} /> })}
          <Cross x={700} y={600} r={70} p={span(f, t.stops18, t.stops18 + 12)} />
          <Tag x={480} y={330} text="ACTIVE INCOME" size={48} bg={L.terraD} o={on(f, t.active18, 8)} />
          <Tag x={480} y={410} text="YOUR TIME → MONEY" size={36} bg={L.inkSoft} o={on(f, t.time18, 8)} />
        </g>
        {/* right: passive */}
        <g opacity={on(f, t.second19 - 4, 8) * (1 - on(f, t.now20 - 4, 10))}>
          <MoneyTree x={1440} y={900} s={0.8} g={on(f, t.keeps19 - 4, 18)} drop={f > t.keeps19 ? ((f - t.keeps19) / 30) % 1 : 0} />
          <Tag x={1440} y={330} text="PASSIVE INCOME" size={48} bg={L.sageD} o={on(f, t.passive19, 8)} />
          <Bank x={1160} y={900} s={0.7} o={on(f, t.bank19 - 2, 8)} />
          <Tower x={1760} y={900} s={0.7} o={on(f, t.company19 - 4, 8)} />
          <Tag x={1160} y={960} text="INTEREST" size={34} bg={L.duskD} o={on(f, t.interest19, 8)} />
          <Tag x={1760} y={960} text="DIVIDENDS" size={34} bg={L.mustardD} o={on(f, t.dividends19, 8)} />
        </g>
        {/* both coworkers: only active income for now; the tree is the goal */}
        <g opacity={on(f, t.now20 - 4, 10) * (1 - on(f, t.happens21 - 4, 10))}>
          <Person f={f} who="investorF" beats={[[0, 'idle', 'neutral'], [t.first20, 'type', 'neutral'], [t.building20, 'lookFar', 'thinking']]} x={330} y={1060} s={0.72} />
          <Person f={f} who="investor" beats={[[0, 'idle', 'neutral'], [t.first20, 'type', 'neutral'], [t.building20, 'lookFar', 'thinking']]} x={700} y={1060} s={0.72} flip />
          <Tag x={515} y={360} text="ONLY ACTIVE INCOME" size={44} bg={L.terraD} o={on(f, t.first20, 8)} />
          <MoneyTree x={1440} y={900} s={0.8} g={lerp(0.15, 0.7, on(f, t.building20, 30))} o={on(f, t.getting20, 8)} />
          <Tag x={1440} y={330} text="THE GOAL" size={48} bg={L.sageD} o={on(f, t.second20, 8)} />
        </g>
        <g opacity={on(f, t.happens21 - 4, 10)}>
          <rect x={560} y={420} width={800} height={340} rx={30} fill={L.creamL} stroke={L.cashD} strokeWidth={8} />
          <Big x={960} y={620} text="$3,660" size={170} color={L.cashD} />
          <Big x={960} y={700} text="EVERY MONTH" size={50} color={L.inkSoft} o={on(f, t.month21, 8)} />
          <text x={1420} y={520} fill={L.terraD} style={{ font: `400 220px ${FONT.big}` }} opacity={on(f, t.happens21, 8)}>?</text>
        </g>
      </g>}

      <Headline f={f} lines={[[t.maya7, 'MAYA AND JORDAN', L.ink, 104], [t.lands10, 'THE FIRST PAYCHECK', L.ink, 104], [t.rest11, 'WHERE THE REST WENT', L.ink, 104], [t.real16, 'THE REAL NUMBER', L.cashD, 110],
        [t.notice17, 'TWO KINDS OF INCOME', L.ink, 104], [t.now20, 'FOR NOW: ONLY ONE', L.ink, 104], [t.happens21, 'WHERE DOES IT GO?', L.ink, 104]]} />
      <Sweep f={f} at={(EXTRA['ll-earn'] ?? []).map(c)} />
      <LGrain />
    </g>
  )
}

export const LL_EARN = makePiece('ll-earn', 'Earn: Maya and Jordan introduced in their office (made-up example), a $52,000 job offer that turns into $4,330 a month; the first paycheck lands at $3,660 with the $4,330 crossed; one bar of the year’s $52,000 — a payroll-tax strip (7.65% of all pay, Social Security + Medicare), the income-tax part sliced into the first $16,100 not taxed, a 10% slice ($1,240) and a 12% slice ($2,820); both taxes flow into a TWO TAXES box ≈ $8,000 a year, state tax and health insurance not counted; $3,660 a month is what they live on; Maya at her desk beside an hourglass dropping coins only while she works (active income) until she stops; a money tree dropping coins with a bank (interest) and a company (dividends) — passive income; both coworkers under ONLY ACTIVE INCOME with the tree as the goal; $3,660 every month with a question mark', {
  mood: 'light', Component: Earn, beats: [...Object.values(K), ...(EXTRA['ll-earn'] ?? [])],
  sfx: [['s8:fifty', 'pop', 0.12], ['s10:smaller', 'swish', 0.12], ['s15:together', 'swish', 0.12], ['s16:three', 'ding', 0.12], ['s18:stops', 'thud', 0.12], ['s19:passive', 'chime', 0.12]] })
