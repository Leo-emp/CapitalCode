// ---------------------------------------------------------------- s32–s41: SAVE — pay yourself first, the cushion, where it sits
// A) s32–s34 the two rooms on payday: Maya's phone gets the paycheck and an automatic arrow moves $730 into her
//            savings before she can spend; a bill made out to herself is stamped PAID at the start of the month.
//            Jordan dreams of a piggy bank; at the end of the month it is empty.
// B) s35–s37 the emergency fund: a jar marked CUSHION; a row of six month-pages (three to six months, three lit);
//            it fills one month at a time, about eight months, to $5,500.
// C) s38–s41 where it sits: two bank doors — AVERAGE 0.38% and HIGH-YIELD 4%. On $5,500 a small $20 coin pile vs
//            a $220 pile; a sprout grows out of the $220 (her first passive income); then the cushion jar shakes.
import React from 'react'
import { lerp, on, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Sweep } from '../literacy/kit2'
import { EXTRA } from './extra'
import { Headline, Person, win } from '../aimoney/common'
import { Defs } from '../literacy/kit'
import { Arrow, Calendar, Jar, Phone } from '../literacy/kit2'
import { Big, BillSheet, Coin, FLOOR, L, LDefs, LGrain, MoneyTree, Paper, Room, Tag, TwoRooms, cues, fadeIn, scene, FONT } from './kit'

const K = {
  payday32: 's32:payday', before32: 's32:before', spend32: 's32:spend', automatic: 's32:automatic', transfer: 's32:transfer', seven32: 's32:seven', separate: 's32:separate', account32: 's32:account',
  called33: 's33:called', paying33: 's33:paying', bill33: 's33:bill', start33: 's33:start', month33: 's33:month',
  jordan34: 's34:jordan', plans34: 's34:plans', saves34: 's34:saves', never34: 's34:never',
  goal35: 's35:goal', emergency: 's35:emergency', cash35: 's35:cash', surprises: 's35:surprises',
  guideline: 's36:guideline', three36: 's36:three', six36: 's36:six', essential: 's36:essential',
  three37: 's37:three', five37: 's37:five', seven37: 's37:seven', eight37: 's37:eight',
  keeps38: 's38:keeps', average38: 's38:average', zero38: 's38:zero', many38: 's38:many', high38: 's38:high', four38: 's38:four',
  five39: 's39:five', twenty39: 's39:twenty', average39: 's39:average', two39: 's39:two', four39: 's39:four',
  interest40: 's40:interest', first40: 's40:first', passive40: 's40:passive',
  three41: 's41:three', cushion41: 's41:cushion', tested: 's41:tested',
}

// # a bank door with its rate on a sign
const BankDoor: React.FC<{ x: number; name: string; rate: string; color: string; o?: number; glow?: number }> = ({ x, name, rate, color, o = 1, glow = 0 }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${FLOOR})`}>
    {glow > 0.01 && <ellipse cx={0} cy={-260} rx={300} ry={300} fill="url(#ll-glow)" opacity={glow} />}
    <ellipse cx={0} cy={6} rx={260} ry={18} fill="#000" opacity={0.14} />
    <rect x={-230} y={-480} width={460} height={480} fill={L.creamL} stroke={L.creamD} strokeWidth={6} />
    <path d="M-260 -470 L0 -580 L260 -470 Z" fill={color} />
    <rect x={-90} y={-260} width={180} height={260} rx={10} fill={color} opacity={0.85} />
    <rect x={-180} y={-440} width={360} height={110} rx={14} fill="#fff" stroke={color} strokeWidth={6} />
    <text x={0} y={-400} textAnchor="middle" fill={L.inkSoft} style={{ font: `400 36px ${FONT.big}`, letterSpacing: 2 }}>{name}</text>
    <text x={0} y={-345} textAnchor="middle" fill={color} style={{ font: `400 56px ${FONT.big}` }}>{rate}</text>
  </g>
)
const Piggy: React.FC<{ x: number; y: number; s?: number; o?: number; empty?: number }> = ({ x, y, s = 1, o = 1, empty = 0 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={0} rx={130} ry={100} fill={L.terraL} stroke={L.terraD} strokeWidth={6} /><circle cx={120} cy={-10} r={40} fill={L.terraL} stroke={L.terraD} strokeWidth={6} />
    <rect x={-30} y={-104} width={60} height={12} rx={6} fill={L.terraD} /><circle cx={70} cy={-40} r={8} fill={L.ink} />
    {[-70, 60].map((k) => <rect key={k} x={k} y={80} width={28} height={40} rx={8} fill={L.terraD} />)}
    {empty > 0.01 && <text x={-10} y={30} textAnchor="middle" fill={L.terraD} opacity={empty} style={{ font: `400 64px ${FONT.big}` }}>$0</text>}
  </g>
)

const Save: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s35') - 6, BC = t.keeps38 - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = fadeIn(f, BC)
  // # B: the jar fills month by month (8 steps) from "five" in s37
  const months = Math.min(8, Math.max(0, Math.floor((f - t.seven37) / 6)))
  const shake = f > t.tested ? Math.sin((f - t.tested) * 1.6) * 6 * (1 - span(f, t.tested, t.tested + 30)) : 0

  return (
    <g>
      <Defs /><LDefs />
      {/* ---------------- A) payday ---------------- */}
      {A > 0 && <g opacity={A}>
        <TwoRooms />
        <Calendar x={720} y={500} s={0.7} top="PAYDAY" big="1" color={L.sageD} o={on(f, t.payday32 - 2, 8)} />
        <Phone x={200} y={600} s={0.7} amount="$3,660" label="PAYCHECK IN" o={on(f, t.payday32, 8) * (1 - on(f, t.called33 - 2, 8))} />
        <Arrow x1={300} y1={560} x2={560} y2={640} p={span(f, t.automatic, t.transfer + 10)} color={L.sageD} w={14} bend={-0.2} />
        <g opacity={on(f, t.transfer, 8)}><Jar x={680} y={FLOOR - 6} s={0.8} fill={lerp(0.05, 0.3, on(f, t.seven32, 14))} color={L.sage} label="SAVINGS" /></g>
        <Tag x={680} y={720} text="$730 AUTOMATIC" size={34} bg={L.sageD} o={on(f, t.seven32, 8) * (1 - on(f, t.called33 - 2, 8))} />
        <BillSheet x={300} y={620} s={0.6} r={-4} head="PAY ME FIRST" amount="$730" color={L.sageD} stamp="PAID" stampO={on(f, t.bill33 + 4, 10)} o={on(f, t.called33, 8)} />
        <Person f={f} who="investorF" beats={[[0, 'phone', 'smiling'], [t.transfer, 'thumbsUp', 'smiling'], [t.called33, 'present', 'smiling']]} x={430} y={1060} s={0.68} o={1 - on(f, t.called33 - 2, 8)} />
        {/* Jordan dreams of saving */}
        <g opacity={on(f, t.jordan34 - 2, 8)}>
          <ellipse cx={1500} cy={520} rx={210} ry={150} fill="#fff" stroke={L.creamD} strokeWidth={5} /><circle cx={1330} cy={680} r={22} fill="#fff" /><circle cx={1300} cy={730} r={14} fill="#fff" />
          <Piggy x={1500} y={530} s={0.9} empty={on(f, t.never34, 8)} />
        </g>
        <Person f={f} who="investor" beats={[[0, 'idle', 'neutral'], [t.plans34, 'think', 'thinking'], [t.saves34, 'emptyPockets', 'neutral'], [t.never34, 'shrug', 'worried']]} x={1250} y={1060} s={0.72} o={on(f, t.jordan34 - 4, 8)} />
      </g>}

      {/* ---------------- B) the emergency fund ---------------- */}
      {B > 0 && <g opacity={B}>
        <Room />
        <Person f={f} who="investorF" beats={[[0, 'idle', 'smiling'], [t.emergency, 'holdChest', 'smiling'], [t.surprises, 'nervous', 'worried'], [t.guideline, 'explain', 'neutral'], [t.five37, 'celebrate', 'smiling']]} x={260} y={1060} s={0.78} />
        <Jar x={720} y={FLOOR - 6} s={1.15} fill={0.05 + 0.85 * (months / 8)} color={L.sage} label="CUSHION" o={on(f, t.emergency - 2, 8)} />
        <Tag x={720} y={460} text="ONLY FOR SURPRISES" size={36} bg={L.sageD} o={win(f, t.surprises, t.three37, 8)} />
        {/* six month-pages, three lit */}
        <g opacity={on(f, t.three36 - 2, 8) * (1 - on(f, t.three37 - 4, 8))}>
          {Array.from({ length: 6 }, (_, k) => <Calendar key={k} x={1060 + k * 140} y={640} s={0.5} top="MONTH" big={String(k + 1)} color={k < 3 ? L.sageD : L.dusk} o={k < 3 ? on(f, t.three36 + k * 3, 6) : on(f, t.six36 - 4 + (k - 3) * 3, 6) * 0.7} />)}
          <Tag x={1410} y={820} text="3–6 MONTHS OF ESSENTIALS" size={40} bg={L.ink} o={on(f, t.essential, 8)} />
        </g>
        <g opacity={on(f, t.three37 - 2, 8)}>
          <Tag x={1350} y={460} text="3 × $1,830 OF NEEDS" size={42} bg={L.duskD} />
          <Big x={1350} y={640} text="$5,500" size={170} color={L.sageD} o={on(f, t.five37, 8)} />
          <g opacity={on(f, t.seven37, 8)}>{Array.from({ length: 8 }, (_, k) => <circle key={k} cx={1110 + k * 68} cy={760} r={24} fill={k < months ? L.sage : L.creamD} stroke={L.sageD} strokeWidth={4} />)}</g>
          <Tag x={1350} y={860} text="≈ 8 MONTHS AT $730" size={40} bg={L.sageD} o={on(f, t.eight37, 8)} />
        </g>
      </g>}

      {/* ---------------- C) where she keeps it ---------------- */}
      {Cc > 0 && <g opacity={Cc}>
        <Paper />
        <BankDoor x={560} name="AVERAGE SAVINGS" rate="0.38% A YEAR" color={L.duskD} o={on(f, t.average38 - 2, 8)} />
        <BankDoor x={1360} name="HIGH-YIELD SAVINGS" rate="≈ 4% A YEAR" color={L.sageD} o={on(f, t.high38 - 4, 8)} glow={on(f, t.four39, 10) * 0.6} />
        <g opacity={on(f, t.five39 - 2, 8) * (1 - on(f, t.three41 - 4, 8))}>
          <Coin x={230} y={FLOOR - 40} r={44} label="$20" o={on(f, t.twenty39, 8)} />
          <Tag x={230} y={FLOOR - 120} text="$20 A YEAR" size={36} bg={L.duskD} o={on(f, t.twenty39, 8)} />
          {Array.from({ length: 6 }, (_, k) => <Coin key={k} x={1640 + (k % 3) * 90} y={FLOOR - 40 - Math.floor(k / 3) * 80} r={44} o={on(f, t.two39 + k * 2, 6)} />)}
          <Tag x={1730} y={FLOOR - 280} text="$220 A YEAR" size={40} bg={L.sageD} o={on(f, t.four39, 8)} />
          <Tag x={960} y={330} text="ON $5,500" size={40} bg={L.ink} />
        </g>
        <MoneyTree x={1360} y={FLOOR + 150} s={0.3} g={on(f, t.first40 - 4, 20)} o={on(f, t.interest40, 8) * (1 - on(f, t.three41 - 4, 8))} />
        <Tag x={1360} y={FLOOR + 110} text="FIRST PASSIVE INCOME" size={30} bg={L.sageD} o={on(f, t.passive40, 8) * (1 - on(f, t.three41 - 4, 8))} />
        <g opacity={on(f, t.three41 - 2, 8)} transform={`translate(${960 + shake} 0)`}>
          <rect x={-2000} y={0} width={4000} height={1080} fill="url(#ll-paper)" />
          <Jar x={0} y={FLOOR - 6} s={1.2} fill={0.3} color={L.sage} label="CUSHION" />
          <Tag x={0} y={480} text="$2,190 AFTER 3 MONTHS" size={44} bg={L.sageD} o={on(f, t.cushion41, 8)} />
        </g>
      </g>}

      <Headline f={f} lines={[[t.payday32, 'PAYDAY', L.sageD, 120], [t.called33, 'PAY YOURSELF FIRST', L.sageD, 110], [t.jordan34, "WHAT'S LEFT? NOTHING", L.terraD, 104], [t.goal35, 'AN EMERGENCY FUND', L.ink, 110],
        [t.keeps38, 'WHERE IT SITS MATTERS', L.ink, 104], [t.three41, 'THE CUSHION GETS TESTED', L.ink, 100]]} />
      <Sweep f={f} at={(EXTRA['ll-save'] ?? []).map(c)} />
      <LGrain />
    </g>
  )
}

export const LL_SAVE = makePiece('ll-save', "Save: on payday Maya's phone gets the $3,660 paycheck and an automatic arrow moves $730 into her savings jar first; a bill made out to herself (PAY ME FIRST $730) is stamped PAID; Jordan dreams of a piggy bank that ends at $0; the emergency fund jar CUSHION fills one month at a time; six month pages with three lit (3–6 months of essentials); 3 × $1,830 = about $5,500 in about 8 months at $730; two bank doors — average savings 0.38% vs high-yield about 4%; on $5,500 a $20 coin vs a $220 pile; a sprout grows (her first passive income); the cushion jar ($2,190 after 3 months) shakes", {
  mood: 'light', Component: Save, beats: [...Object.values(K), ...(EXTRA['ll-save'] ?? [])],
  sfx: [['s32:transfer', 'swish', 0.12], ['s33:bill', 'thud', 0.12], ['s34:never', 'thud', 0.1], ['s37:five', 'ding', 0.12], ['s39:four', 'cash', 0.12], ['s41:tested', 'thud', 0.12]] })
