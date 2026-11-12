// ---------------------------------------------------------------- s1–s6: the hook — two coworkers, two futures
// A) s1      the shared office: Maya and Jordan at two identical desks, the same $52,000 tag over each; a calendar
//            flips to 20 YEARS on "twenty years".
// B) s1–s5   their two homes side by side, twenty years on: Jordan's side has bills on the floor and a payday
//            calendar (paycheck to paycheck); Maya's side has a full savings jar, a card crossed out (no card debt)
//            and three open doors (choices). Then the two pay slips side by side are equal (not because one earned
//            more), and Maya opens a book on "understood".
// C) s6      the road: a winding path from a first paycheck, step by step past seven stops, to a money tree
//            dropping coins under the moon ("while you sleep").
import React from 'react'
import { lerp, on, span, easeInOut } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Sweep } from '../literacy/kit2'
import { EXTRA } from './extra'
import { Headline, Person, win } from '../aimoney/common'
import { Defs } from '../literacy/kit'
import { Calendar, Jar, Letter } from '../literacy/kit2'
import { BillSheet, Card, Cross, FLOOR, L, LDefs, LGrain, MoneyTree, Office, Paper, Tag, TwoRooms, cues, fadeIn, scene, FONT } from './kit'

const K = {
  coworker: 's1:coworker', salary: 's1:salary', job: 's1:job', city: 's1:city', twenty: 's1:twenty', places: 's1:places',
  paycheck2: 's2:paycheck', never2: 's2:never', ahead: 's2:ahead',
  savings3: 's3:savings', card3: 's3:card', choices: 's3:choices',
  not4: 's4:not', earned4: 's4:earned', more4: 's4:more',
  understood: 's5:understood', works: 's5:works',
  today: 's6:today', literacy: 's6:literacy', out6: 's6:out', step6: 's6:step', first6: 's6:first', way6: 's6:way', earns6: 's6:earns', sleep: 's6:sleep',
}
const STOPS = ['EARN', 'SPEND', 'SAVE', 'PROTECT', 'BORROW', 'PLAN', 'GROW']

// # a door that swings open (choices)
const Door: React.FC<{ x: number; open: number; o: number; color: string }> = ({ x, open, o, color }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${FLOOR})`}>
    <rect x={-60} y={-240} width={120} height={240} rx={8} fill="#FFF3C4" />
    <rect x={-60} y={-240} width={120 * (1 - 0.7 * open)} height={240} rx={8} fill={color} stroke={L.creamD} strokeWidth={4} />
    <circle cx={-60 + 120 * (1 - 0.7 * open) - 18} cy={-120} r={8} fill={L.gold} />
  </g>
)

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = t.places - 4, BC = c('s6') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = fadeIn(f, BC)
  // # the road: a sine path from x 240 to 1700
  const road = (u: number) => ({ x: lerp(240, 1640, u), y: 700 + Math.sin(u * Math.PI * 2.2) * 120 })
  const roadP = easeInOut(span(f, t.step6, t.way6 + 20))
  const pts = Array.from({ length: 61 }, (_, k) => road(k / 60))
  const d = 'M' + pts.map((p) => `${p.x} ${p.y}`).join(' L')

  return (
    <g>
      <Defs /><LDefs />
      {/* ---------------- A) the shared office ---------------- */}
      {A > 0 && <g opacity={A}>
        <Office />
        <Person f={f} who="investorF" beats={[[0, 'idle', 'smiling'], [t.salary, 'present', 'smiling'], [t.twenty, 'lookFar', 'thinking']]} x={330} y={1060} s={0.8} />
        <Person f={f} who="investor" beats={[[0, 'idle', 'neutral'], [t.salary, 'present', 'smiling'], [t.twenty, 'lookFar', 'thinking']]} x={1590} y={1060} s={0.8} flip />
        {[640, 1280].map((x) => <Tag key={x} x={x} y={470} text="$52,000 A YEAR" size={44} bg={L.sageD} o={on(f, t.salary, 8)} />)}
        <Tag x={960} y={360} text="SAME JOB · SAME CITY" size={40} bg={L.ink} o={on(f, t.city, 8)} />
        <Calendar x={960} y={720} s={1.1} top="+ YEARS" big="20" color={L.terra} o={on(f, t.twenty - 2, 8)} />
      </g>}

      {/* ---------------- B) two homes, twenty years on ---------------- */}
      {B > 0 && <g opacity={B}>
        <TwoRooms dusk />
        {/* Jordan: bills on the floor, a payday calendar, slumped */}
        <g opacity={1 - on(f, t.not4 - 6, 8)}>
          {[0, 1, 2].map((k) => <BillSheet key={k} x={1180 + k * 120} y={FLOOR - 40 - k * 10} s={0.4} r={-14 + k * 12} head="BILL" amount="DUE" o={on(f, t.paycheck2 + k * 4, 6)} />)}
          <Calendar x={1700} y={560} s={0.8} top="PAYDAY" big="?" color={L.terra} o={on(f, t.paycheck2, 8)} />
          <Card x={1250} y={640} s={0.6} r={-8} text="DEBT" o={on(f, t.never2, 8)} />
        </g>
        {/* Maya: savings jar, a card crossed out, three doors */}
        <g opacity={1 - on(f, t.not4 - 6, 8)}>
          <Jar x={470} y={FLOOR - 6} s={0.8} fill={lerp(0.1, 0.85, on(f, t.savings3, 16))} color={L.sage} label="SAVINGS" o={on(f, t.savings3 - 4, 8)} />
          <g opacity={win(f, t.card3 - 2, t.choices + 6, 6)}><Card x={720} y={560} s={0.55} r={6} text="DEBT" /><Cross x={720} y={560} r={80} p={span(f, t.card3 + 4, t.card3 + 14)} /></g>
          {[640, 770, 900].map((x, k) => <Door key={x} x={x} open={on(f, t.choices + k * 3, 10)} o={on(f, t.choices - 2 + k * 3, 6)} color={[L.sage, L.mustard, L.dusk][k]} />)}
        </g>
        {/* equal pay slips (not because one earned more) */}
        <g opacity={on(f, t.not4 - 4, 8) * (1 - on(f, t.understood - 4, 8))}>
          <Letter x={480} y={600} s={0.75} r={-3} amount="$52,000" head="MAYA'S PAY" />
          <Letter x={1440} y={600} s={0.75} r={3} amount="$52,000" head="JORDAN'S PAY" />
          <circle cx={960} cy={580} r={110} fill={L.creamL} stroke={L.ink} strokeWidth={8} opacity={on(f, t.earned4, 8)} /><text x={960} y={650} textAnchor="middle" fill={L.ink} opacity={on(f, t.earned4, 8)} style={{ font: `400 200px ${FONT.big}` }}>=</text>
        </g>
        <Person f={f} who="investorF" beats={[[0, 'relax', 'smiling'], [t.choices, 'celebrate', 'smiling'], [t.not4, 'idle', 'neutral'], [t.understood, 'read', 'smiling'], [t.works, 'thumbsUp', 'smiling']]} x={190} y={1060} s={0.72} o={1 - win(f, t.not4 - 4, t.understood - 2, 8)} />
        <Person f={f} who="investor" beats={[[0, 'slump', 'worried'], [t.never2, 'despair', 'worried'], [t.not4, 'idle', 'neutral'], [t.understood, 'scratchHead', 'thinking']]} x={1700} y={1060} s={0.72} flip o={1 - win(f, t.not4 - 4, t.understood - 2, 8)} />
        {/* the book Maya opens */}
        <g opacity={on(f, t.understood, 8)} transform="translate(520 640)">
          <rect x={-150} y={-100} width={300} height={200} rx={10} fill={L.sageD} /><rect x={-140} y={-92} width={136} height={184} fill={L.creamL} /><rect x={4} y={-92} width={136} height={184} fill={L.creamL} />
          {[0, 1, 2, 3].map((k) => <g key={k}><rect x={-124} y={-70 + k * 36} width={100} height={10} rx={5} fill={L.creamD} /><rect x={22} y={-70 + k * 36} width={100} height={10} rx={5} fill={L.creamD} /></g>)}
          <ellipse cx={0} cy={-130} rx={200} ry={60} fill="url(#ll-glow)" opacity={on(f, t.works, 10)} />
        </g>
      </g>}

      {/* ---------------- C) the road ---------------- */}
      {Cc > 0 && <g opacity={Cc}>
        <Paper />
        <rect x={0} y={260} width={1920} height={820} fill={L.sageL} opacity={0.35} />
        <path d={d} stroke={L.creamD} strokeWidth={70} fill="none" strokeLinecap="round" />
        <path d={d} stroke={L.mustardL} strokeWidth={50} fill="none" strokeLinecap="round" strokeDasharray={`${roadP * 1800} 4000`} />
        {/* the first paycheck at the start */}
        <g opacity={on(f, t.first6 - 2, 8)}><Letter x={230} y={520} s={0.55} r={-6} amount="PAY" head="1ST PAYCHECK" /></g>
        {STOPS.map((s, k) => { const u = (k + 1) / (STOPS.length + 1), p = road(u), lit = on(f, t.step6 + k * 5, 6)
          return <g key={s} opacity={lit}><circle cx={p.x} cy={p.y} r={34} fill={L.white} stroke={L.sageD} strokeWidth={8} /><Tag x={p.x} y={p.y + (k % 2 ? -70 : 92)} text={s} size={34} bg={k % 2 ? L.terraD : L.sageD} /></g> })}
        <MoneyTree x={1700} y={900} s={0.85} g={on(f, t.earns6 - 4, 20)} drop={f > t.earns6 ? ((f - t.earns6) / 30) % 1 : 0} o={on(f, t.way6, 8)} />
        <g opacity={on(f, t.sleep, 10)} transform="translate(1480 340)"><circle r={56} fill="#FFF3C4" /><circle cx={24} cy={-14} r={50} fill={L.sageL} opacity={0.95} /></g>
      </g>}

      <Headline f={f} lines={[[t.coworker, 'SAME SALARY', L.ink, 110], [t.places, 'TWENTY YEARS LATER', L.ink, 104], [t.not4, 'SAME PAY', L.ink, 110], [t.understood, 'THE DIFFERENCE', L.sageD, 110],
        [t.today, 'THE WAY OUT, STEP BY STEP', L.ink, 96]]} />
      <Sweep f={f} at={(EXTRA['ll-hook'] ?? []).map(c)} />
      <LGrain />
    </g>
  )
}

export const LL_HOOK = makePiece('ll-hook', 'The hook: Maya and Jordan at two identical desks in one office with the same $52,000 a year tag, a calendar flips to 20 years; their two homes side by side twenty years on — Jordan slumped with bills on the floor and a payday calendar, Maya relaxed with a full savings jar, a debt card crossed out and three doors opening (choices); two equal $52,000 pay slips with an equals sign; Maya opens a glowing book; a winding road from a first paycheck past seven stops (earn, spend, save, protect, borrow, plan, grow) to a money tree dropping coins under the moon', {
  mood: 'light', Component: Hook, beats: [...Object.values(K), ...(EXTRA['ll-hook'] ?? [])],
  sfx: [['s1:twenty', 'swish', 0.14], ['s3:card', 'swish', 0.12], ['s4:earned', 'pop', 0.12], ['s6:sleep', 'chime', 0.14]] })
