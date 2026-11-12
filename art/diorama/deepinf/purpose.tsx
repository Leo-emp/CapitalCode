// ---------------------------------------------------------------- s74–s91: why a little is on purpose, and when it spirals
// A) The Fed's target: a thermometer with a green band at 2% — ON PURPOSE (s75); a down-arrow DEFLATION (s76); a sepia 1930s street, thermometer below zero: 1929–1933 −27% (s77);
//    a fridge with a waiting shopper; shops sell less, jobs lost (s80); a loan stone stays the same while wages shrink (s81); LOW AND STEADY (s83).
// B) Hyperinflation: a printing press spits notes (s85); ZIMBABWE NOV 2008: 79.6 BILLION % A MONTH (s86); a clock DOUBLES EVERY ~25 HOURS (s87);
//    your basket tag $120 → $240 → $480 (s88); GERMANY OCT 1923: EVERY 3–4 DAYS (s89); the note is refused, crossed out (s90); TRUST (s91).
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win } from '../aimoney/common'
import { camera } from '../aimoney/common'
import { Arrow, Back, Basket, C, Cash, Cut, Defs, Dollar, Grain, Strike, Tag, Thermo, big, box, fadeIn, scene } from './kit'

const G = 900
const Purpose: React.FC<PieceProps> = ({ f, c }) => {
  const zero = c('s74:zero'), surprise = c('s75:surprise'), two = c('s75:two'), purpose = c('s75:purpose'), opposite = c('s76:opposite'), deflation = c('s76:deflation')
  const depression = c('s77:depression'), twenty = c('s77:twenty'), nice = c('s78:nice'), shopper = c('s79:shopper'), years = c('s79:years')
  const fridge = c('s80:fridge'), wait = c('s80:wait'), sell = c('s80:sell'), jobs = c('s80:jobs'), debts = c('s81:debts'), loan = c('s81:loan'), shrink = c('s81:shrink')
  const steady = c('s82:steady'), room = c('s82:room'), low = c('s83:low'), plan = c('s83:plan')
  const destroy = c('s84:destroy'), hyper = c('s85:hyperinflation'), printing = c('s85:printing'), zimbabwe = c('s86:zimbabwe'), billion = c('s86:billion'), month = c('s86:month')
  const peak = c('s87:peak'), hours = c('s87:hours'), forty = c('s88:forty'), eighty = c('s88:eighty'), germany = c('s89:germany'), days = c('s89:days'), refused = c('s90:refused'), trust = c('s91:trust')
  const AB = c('s84') - 6
  const A = scene(f, -20, AB), B = fadeIn(f, AB)
  const a1 = 1 - on(f, depression - 6, 8), a2 = win(f, depression - 6, fridge - 6, 8), a3 = on(f, fridge - 6, 8)
  return (
    <g transform={camera(f, ACC.map((k, i) => [c(k), 960, 540, i % 2 ? 1 : 1.025] as [number, number, number, number]), 26)}>
      <Defs />
      {A > 0 && <g opacity={A}>
        <Back sky={a2 > 0.5 ? 'sepia' : 'day'} f={f} />
        {a1 > 0.01 && <g opacity={a1}>
          <Thermo x={760} y={800} v={lerp(0, 2, on(f, two - 4, 16))} max={8} label="THE FED'S TARGET: 2%" o={on(f, zero - 6, 8)} />
          <rect x={720} y={800 - 20 - 380 * 2 / 8 - 14} width={80} height={28} fill={C.green} opacity={0.6 * on(f, two, 8)} />
          <Tag x={760} y={240} text="WHY NOT ZERO?" size={56} o={on(f, zero - 2, 8) * (1 - on(f, surprise - 4, 8))} />
          <Tag x={1360} y={400} text="ON PURPOSE" size={70} color={C.teal} ink="#fff" o={pop(f, purpose - 2, 12)} />
          <g opacity={on(f, opposite - 4, 8)}><Arrow x1={1360} y1={560} x2={1360} y2={820} col={C.coral} w={16} /><Tag x={1360} y={900} text="DEFLATION: PRICES FALL" size={44} color={C.coral} ink="#fff" o={on(f, deflation - 2, 8)} /></g>
        </g>}
        {a2 > 0.01 && <g opacity={a2}>
          <Thermo x={600} y={800} v={0} max={8} label={f >= c('s77:twenty') ? '1929 → 1933: −27%' : f >= c('s77:1933') ? '1929 → 1933' : f >= c('s77:1929') ? '1929' : ''} />
          <Tag x={1300} y={380} text="THE GREAT DEPRESSION" size={56} color={C.cream} />
          <Tag x={1300} y={540} text="SOUNDS NICE?" size={48} color={C.mustard} o={on(f, nice - 2, 8)} />
          <Tag x={1300} y={680} text="GREAT FOR ONE SHOPPER" size={40} o={on(f, shopper - 2, 8)} />
          <Tag x={1300} y={800} text="EVERYWHERE, FOR YEARS? NOT SO" size={40} color={C.coral} ink="#fff" o={on(f, years - 2, 8)} />
          <Arrow x1={600} y1={300} x2={600} y2={600} o={on(f, twenty - 2, 8)} col={C.coral} w={16} />
        </g>}
        {a3 > 0.01 && <g opacity={a3}>
          <g opacity={1 - on(f, debts - 6, 8)}>
            <Cut d={box(280, 420, 240, 480, 20)} fill={C.cream} /><rect x={300} y={600} width={200} height={6} fill={C.ink} /><rect x={470} y={470} width={12} height={90} rx={6} fill={C.ink} />
            <Tag x={400} y={360} text={f >= wait ? 'CHEAPER NEXT YEAR... WAIT' : 'A NEW FRIDGE'} size={36} />
            <Person f={f} who="buyer" beats={[[0, 'idle', 'thinking'], [wait, 'armsCrossed', 'thinking'], [jobs, 'despair', 'worried']]} x={760} y={G + 20} s={0.85} />
            <Tag x={1350} y={420} text="SHOPS SELL LESS" size={48} color={C.mustard} o={on(f, sell - 2, 8)} />
            <Tag x={1350} y={560} text="PEOPLE LOSE JOBS" size={48} color={C.coral} ink="#fff" o={on(f, jobs - 2, 8)} />
          </g>
          <g opacity={on(f, debts - 6, 8) * (1 - on(f, steady - 6, 8))}>
            <Cut d={box(360, 520, 380, 300, 30)} fill={C.grey} /><text x={550} y={700} textAnchor="middle" fill={C.ink} style={big(60)}>LOAN</text>
            <Tag x={550} y={440} text="STAYS THE SAME" size={40} o={on(f, loan - 2, 8)} />
            <Dollar x={1300} y={640} s={1.4} power={lerp(1, 0.6, on(f, shrink - 2, 20))} v="PAY" />
            <Tag x={1300} y={440} text="WAGES SHRINK AROUND IT" size={40} color={C.coral} ink="#fff" o={on(f, shrink - 2, 8)} />
          </g>
          <g opacity={on(f, steady - 6, 8)}>
            <Thermo x={760} y={800} v={2} max={8} label="2%" />
            <Tag x={1300} y={420} text="KEEPS MONEY MOVING" size={44} color={C.teal} ink="#fff" o={on(f, steady, 8)} />
            <Tag x={1300} y={560} text="ROOM TO CUT RATES" size={44} color={C.mustard} o={on(f, room - 2, 8)} />
            <Tag x={1300} y={700} text="LOW AND STEADY" size={60} color={C.cream} o={pop(f, low - 2, 12)} />
            <Tag x={1300} y={840} text="EASY TO PLAN" size={40} o={on(f, plan - 2, 8)} />
          </g>
        </g>}
      </g>}
      {B > 0 && <g opacity={B}>
        <Back sky="night" f={f} sun={null} />
        <g opacity={1 - on(f, peak - 6, 8)}>
          <Tag x={960} y={300} text="IT CAN DESTROY A CURRENCY" size={52} color={C.coral} ink="#fff" o={on(f, destroy - 2, 8) * (1 - on(f, hyper - 4, 8))} />
          <Tag x={960} y={300} text="HYPERINFLATION" size={72} color={C.coral} ink="#fff" o={on(f, hyper - 2, 8) * (1 - on(f, zimbabwe - 4, 8))} />
          <g opacity={on(f, printing - 6, 8)}>
            <Cut d={box(340, 480, 420, 360, 20)} fill={C.grey} /><circle cx={550} cy={560} r={60} fill={C.ink} /><circle cx={550} cy={560} r={20} fill={C.mustard} transform={`rotate(${f * 8} 550 560)`} />
            {[...Array(6)].map((_, k) => { const t = ((f - printing + k * 12) % 72) / 72; return f > printing ? <Dollar key={k} x={lerp(760, 1500, t)} y={lerp(700, 860, t) - 120 * Math.sin(Math.PI * t)} s={0.45} rot={t * 90} /> : null })}
            <Cash x={1560} y={G + 60} n={lerp(2, 16, span(f, printing, peak))} s={1.2} />
          </g>
          <Tag x={960} y={300} text="ZIMBABWE, NOV 2008" size={56} color={C.mustard} o={on(f, zimbabwe - 2, 8)} />
          <Tag x={960} y={420} text="79.6 BILLION % IN ONE MONTH" size={56} color={C.coral} ink="#fff" o={pop(f, billion - 2, 12)} />
        </g>
        <g opacity={on(f, peak - 6, 8) * (1 - on(f, refused - 6, 8))}>
          <g transform="translate(480 560)"><circle r={200} fill={C.cream} filter="url(#dd-shadow)" />{[...Array(12)].map((_, k) => <line key={k} x1={Math.cos(k * Math.PI / 6) * 170} y1={Math.sin(k * Math.PI / 6) * 170} x2={Math.cos(k * Math.PI / 6) * 190} y2={Math.sin(k * Math.PI / 6) * 190} stroke={C.ink} strokeWidth={6} />)}
            <line x1={0} y1={0} x2={0} y2={-150} stroke={C.ink} strokeWidth={10} transform={`rotate(${(f - peak) * 12})`} /><line x1={0} y1={0} x2={100} y2={0} stroke={C.coral} strokeWidth={14} transform={`rotate(${(f - peak) * 1})`} /><circle r={16} fill={C.ink} /></g>
          <Tag x={480} y={860} text="PRICES DOUBLE EVERY ~25 HOURS" size={40} color={C.coral} ink="#fff" o={on(f, hours - 2, 8)} />
          <Basket x={1300} y={G - 40} s={1.3} tag={f >= eighty ? '$480' : f >= forty ? '$240' : '$120'} tagCol={f >= forty ? C.coral : C.cream} o={on(f, c('s88:imagine') - 4, 8)} />
          <Tag x={1300} y={340} text={f >= eighty ? 'THE DAY AFTER' : f >= forty ? 'TOMORROW' : 'TODAY'} size={44} color={C.mustard} o={on(f, c('s88:imagine') - 2, 8) * (1 - on(f, germany - 4, 8))} />
          <Tag x={1300} y={340} text="GERMANY, OCT 1923: x2 EVERY 3–4 DAYS" size={40} color={C.cream} o={on(f, germany - 2, 8)} />
        </g>
        <g opacity={on(f, refused - 6, 8)}>
          <Dollar x={960} y={560} s={2.4} v="Z$" />
          <Strike x={960} y={560} w={760} t={on(f, refused, 12)} />
          <Tag x={960} y={300} text="PEOPLE REFUSED IT" size={60} color={C.coral} ink="#fff" o={on(f, refused, 8)} />
          <Tag x={960} y={860} text="MONEY WORKS ONLY WHILE PEOPLE TRUST IT" size={46} color={C.mustard} o={on(f, trust - 4, 8)} />
        </g>
      </g>}
      <Headline f={f} lines={[[zero, 'WHY NOT ZERO?', C.ink, 104], [depression, 'WHEN PRICES FALL', C.ink, 104], [steady, 'WHY 2% HELPS', C.ink, 104], [destroy, 'WHEN IT SPIRALS', C.cream, 104]]} until={zimbabwe - 6} />
      <Grain />
    </g>
  )
}
const ACC = ["s74:if","s74:money","s75:reserve","s76:prices","s76:board","s76:worse","s77:consumer","s78:think","s79:cheaper","s79:prices#2","s79:story","s80:waits","s81:while","s82:moving","s82:hits","s83:key","s83:steady","s83:when","s83:borrowing","s84:when","s84:control","s84:currency","s85:usually","s85:bills","s86:2008","s86:prices","s86:nine","s87:roughly","s88:shop","s88:four","s88:after","s89:zimbabwe","s89:first","s89:1923","s89:prices","s89:roughly","s90:end","s90:zimbabwe","s90:all","s91:extreme","s91:shows","s91:everything","s91:money"]  // # accent words: a gentle camera push on each (fills >2 s gaps)
const BEATS = ['s77:1929', 's77:1933', 's74:zero', 's75:surprise', 's75:two', 's75:purpose', 's76:opposite', 's76:deflation', 's77:depression', 's77:twenty', 's78:nice', 's79:shopper', 's79:years', 's80:fridge', 's80:wait', 's80:sell', 's80:jobs', 's81:debts', 's81:loan', 's81:shrink', 's82:steady', 's82:room', 's83:low', 's83:plan', 's84:destroy', 's85:hyperinflation', 's85:printing', 's86:zimbabwe', 's86:billion', 's86:month', 's87:peak', 's87:hours', 's88:imagine', 's88:forty', 's88:eighty', 's89:germany', 's89:days', 's90:refused', 's91:trust']
export const DD_PURPOSE = makePiece('dd-purpose', 'Why a little is on purpose, and hyperinflation, paper-cut: a thermometer THE FED\'S TARGET: 2% with a green band (WHY NOT ZERO?, ON PURPOSE), a falling arrow DEFLATION: PRICES FALL; a sepia 1930s scene 1929 → 1933: −27% (THE GREAT DEPRESSION, SOUNDS NICE?, GREAT FOR ONE SHOPPER, EVERYWHERE, FOR YEARS? NOT SO); a paper fridge and a shopper waiting (CHEAPER NEXT YEAR... WAIT, SHOPS SELL LESS, PEOPLE LOSE JOBS); a LOAN stone that STAYS THE SAME while a PAY note shrinks; 2%: KEEPS MONEY MOVING, ROOM TO CUT RATES, LOW AND STEADY, EASY TO PLAN; at night a printing press spits notes (HYPERINFLATION), ZIMBABWE, NOV 2008: 79.6 BILLION % IN ONE MONTH, a racing clock PRICES DOUBLE EVERY ~25 HOURS, your basket $120 TODAY → $240 TOMORROW → $480 THE DAY AFTER, GERMANY, OCT 1923: x2 EVERY 3–4 DAYS; a Z$ note struck through PEOPLE REFUSED IT, MONEY WORKS ONLY WHILE PEOPLE TRUST IT', {
  mood: 'light', Component: Purpose, beats: [...BEATS, ...ACC],
  sfx: [['s75:purpose', 'ding', 0.12], ['s76:deflation', 'swish', 0.08], ['s77:twenty', 'thud', 0.1], ['s80:jobs', 'thump', 0.08], ['s83:low', 'chime', 0.1], ['s85:printing', 'click', 0.1], ['s86:billion', 'impact', 0.14], ['s88:forty', 'pop', 0.1], ['s88:eighty', 'pop', 0.1], ['s90:refused', 'crack', 0.12]] })
