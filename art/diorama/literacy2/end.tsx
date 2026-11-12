// ---------------------------------------------------------------- s147–s153: TWENTY YEARS LATER — the payoff
// A) s147–s150 the two homes again (dusk): same job, same salary, same city. Jordan waits by a PAYDAY calendar, his
//              money arrives and leaves straight away (an arrow in, an arrow out). Maya's money tree pays her bills —
//              each bill on her side turns PAID.
// B) s151      what she understood: six small pictures light along a line on their words — a paycheck (where pay
//              goes), three jars (a job for every dollar), an umbrella (protect it), a card crossed (what debt costs),
//              a flag (plan), a money tree (growth into income).
// C) s152–s153 a diploma (a finance degree) shown, then crossed; a hand holding the few ideas; payday — an arrow sends
//              the first slice to savings: pay yourself first. Maya waves.
import React from 'react'
import { lerp, on, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Sweep } from '../literacy/kit2'
import { EXTRA } from './extra'
import { Headline, Person, win } from '../aimoney/common'
import { Defs } from '../literacy/kit'
import { Arrow, Calendar, Jar } from '../literacy/kit2'
import { BillSheet, Card, Coin, Cross, FLOOR, L, LDefs, LGrain, MoneyTree, Paper, Room, Tag, TwoRooms, Umbrella, cues, fadeIn, scene, FONT } from './kit'

const K = {
  twenty147: 's149:twenty', back147: 's149:back', coworkers: 's149:coworkers',
  job148: 's150:job', salary148: 's150:salary', city148: 's150:city',
  jordan149: 's151:jordan', waiting: 's151:waiting', payday149: 's151:payday', comes149: 's151:comes', out149: 's151:out',
  maya150: "s152:maya's", too150: 's152:too', investments: 's152:investments', bills150: 's152:bills', month150: 's152:month',
  never151: 's153:never', understood151: 's153:understood', pay151: 's153:pay', job151: 's153:job', protect151: 's153:protect', debt151: 's153:debt', plan151: 's153:plan', growth151: 's153:growth', income151: 's153:income',
  literacy152: 's154:literacy', degree: 's154:degree', handful: 's154:handful', order: 's154:order',
  step153: 's155:step', payday153: 's155:payday', yourself: 's155:yourself', first153: 's155:first',
}
const ICONS: [string, keyof typeof K, string][] = [['PAY', 'pay151', L.cashD], ['A JOB', 'job151', L.duskD], ['PROTECT', 'protect151', L.sageD], ['DEBT', 'debt151', L.terraD], ['PLAN', 'plan151', L.mustardD], ['GROWTH', 'growth151', L.sageD]]

const End: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s153') - 6, BC = c('s154') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = fadeIn(f, BC)
  const inX = lerp(1100, 1500, on(f, t.comes149, 12)), outO = on(f, t.out149, 8)

  return (
    <g>
      <Defs /><LDefs />
      {/* ---------------- A) twenty years later ---------------- */}
      {A > 0 && <g opacity={A}>
        <TwoRooms dusk />
        <g opacity={on(f, t.job148 - 2, 8) * (1 - on(f, t.jordan149 - 4, 8))}>
          <Tag x={960} y={420} text="SAME JOB" size={44} bg={L.ink} o={on(f, t.job148, 6)} />
          <Tag x={960} y={500} text="SAME SALARY" size={44} bg={L.ink} o={on(f, t.salary148, 6)} />
          <Tag x={960} y={580} text="SAME CITY" size={44} bg={L.ink} o={on(f, t.city148, 6)} />
        </g>
        {/* Jordan: money in, money out */}
        <Person f={f} who="investor" beats={[[0, 'idle', 'neutral'], [t.waiting, 'slump', 'worried'], [t.comes149, 'receive', 'neutral'], [t.out149, 'emptyPockets', 'worried']]} x={1720} y={1060} s={0.72} flip />
        <g opacity={on(f, t.jordan149 - 2, 8)}>
          <Calendar x={1280} y={560} s={0.75} top="PAYDAY" big="?" color={L.terraD} o={on(f, t.payday149 - 2, 8)} />
          <Coin x={inX} y={760} r={40} o={on(f, t.comes149 - 2, 6) * (1 - outO)} />
          <Arrow x1={1100} y1={820} x2={1480} y2={820} p={span(f, t.comes149, t.comes149 + 10)} color={L.cashD} w={10} />
          <Arrow x1={1480} y1={880} x2={1100} y2={880} p={span(f, t.out149, t.out149 + 10)} color={L.terraD} w={10} />
        </g>
        {/* Maya: her money pays part of her bills */}
        <Person f={f} who="investorF" beats={[[0, 'idle', 'smiling'], [t.maya150, 'relax', 'smiling'], [t.bills150, 'leanBack', 'smiling']]} x={180} y={1060} s={0.72} />
        <g opacity={on(f, t.maya150 - 2, 8)}>
          <MoneyTree x={560} y={FLOOR} s={0.75} g={1} drop={((f - t.maya150) / 30) % 1} />
          {[0, 1, 2].map((k) => <BillSheet key={k} x={780 + (k % 2) * 30} y={420 + k * 150} s={0.32} r={k % 2 ? 4 : -4} head="BILL" amount={f > t.bills150 + k * 6 ? 'PAID' : 'DUE'} color={f > t.bills150 + k * 6 ? L.sageD : L.terra} o={on(f, t.investments + k * 3, 6)} />)}
        </g>
      </g>}

      {/* ---------------- B) what she understood ---------------- */}
      {B > 0 && <g opacity={B}>
        <Paper />
        <Tag x={960} y={330} text="SHE NEVER EARNED MORE" size={46} bg={L.ink} o={on(f, t.never151, 8)} />
        <line x1={260} x2={1660} y1={700} y2={700} stroke={L.creamD} strokeWidth={16} strokeLinecap="round" />
        {ICONS.map(([name, key, col], k) => { const x = 260 + k * 280, o = on(f, t[key] - 2, 8)
          return <g key={name} opacity={o}>
            <circle cx={x} cy={600} r={110} fill={L.creamL} stroke={col} strokeWidth={8} />
            {k === 0 && <g transform={`translate(${x} 600)`}><rect x={-70} y={-40} width={140} height={80} rx={10} fill={L.cash} /><text y={18} textAnchor="middle" fill="#fff" style={{ font: `400 52px ${FONT.big}` }}>$</text></g>}
            {k === 1 && <g>{[-50, 0, 50].map((d, j) => <Jar key={j} x={x + d} y={650} s={0.24} fill={0.6} color={[L.duskD, L.terra, L.sage][j]} />)}</g>}
            {k === 2 && <Umbrella x={x} y={630} s={0.28} open={1} />}
            {k === 3 && <g><Card x={x} y={600} s={0.32} r={-6} /><Cross x={x} y={600} r={60} p={on(f, t[key] + 4, 8)} /></g>}
            {k === 4 && <g><rect x={x - 4} y={520} width={8} height={150} fill={L.ink} /><path d={`M${x + 4} 520 L${x + 80} 545 L${x + 4} 570 Z`} fill={L.mustardD} /></g>}
            {k === 5 && <MoneyTree x={x} y={680} s={0.28} g={1} />}
            <Tag x={x} y={800} text={name} size={36} bg={col} />
          </g> })}
      </g>}

      {/* ---------------- C) not a degree; the first step ---------------- */}
      {Cc > 0 && <g opacity={Cc}>
        <Room />
        <g opacity={1 - on(f, t.step153 - 4, 8)}>
          <g opacity={on(f, t.degree - 4, 8)} transform="translate(760 600)">
            <rect x={-230} y={-150} width={460} height={300} rx={10} fill="#fff" stroke={L.mustardD} strokeWidth={8} />
            <text x={0} y={-60} textAnchor="middle" fill={L.ink} style={{ font: `400 56px ${FONT.big}`, letterSpacing: 3 }}>DIPLOMA</text>
            {[0, 1].map((k) => <rect key={k} x={-150} y={-10 + k * 40} width={300} height={14} rx={7} fill={L.creamD} />)}
            <circle cx={150} cy={90} r={40} fill={L.terra} />
          </g>
          <Cross x={760} y={600} r={170} p={span(f, t.degree + 2, t.degree + 14)} />
          <g opacity={on(f, t.handful - 2, 8)} transform="translate(1340 640)">
            {[-2, -1, 0, 1, 2].map((k) => <rect key={k} x={-60} y={-200} width={120} height={170} rx={12} fill={[L.sage, L.dusk, L.mustard, L.terra, L.plum][k + 2]} transform={`rotate(${k * 12} 0 40)`} stroke="#fff" strokeWidth={5} />)}
            <path d="M-110 40 Q-120 110 -40 130 L60 130 Q120 110 110 40 Z" fill="#E0A97A" />
          </g>
          <Tag x={1340} y={880} text="A FEW IDEAS, IN ORDER" size={40} bg={L.sageD} o={on(f, t.order, 8)} />
        </g>
        <g opacity={on(f, t.step153 - 2, 8)}>
          <Calendar x={760} y={520} s={0.9} top="PAYDAY" big="1" color={L.sageD} o={on(f, t.payday153 - 2, 8)} />
          <Arrow x1={900} y1={560} x2={1180} y2={700} p={span(f, t.yourself, t.yourself + 12)} color={L.sageD} w={16} bend={-0.2} />
          <Jar x={1320} y={FLOOR - 4} s={1.1} fill={lerp(0.1, 0.35, on(f, t.first153, 14))} color={L.sage} label="SAVINGS" />
          <Tag x={1040} y={330} text="PAY YOURSELF FIRST" size={56} bg={L.sageD} o={on(f, t.yourself, 8)} />
        </g>
        <Person f={f} who="investorF" beats={[[0, 'idle', 'smiling'], [t.degree, 'crossNoA', 'neutral', 'crossNoB', 14], [t.handful, 'present', 'smiling'], [t.yourself, 'waveA', 'smiling', 'waveB', 14]]} x={300} y={1060} s={0.8} />
      </g>}

      <Headline f={f} lines={[[t.twenty147, 'TWENTY YEARS LATER', L.ink, 110], [t.never151, 'WHAT SHE UNDERSTOOD', L.sageD, 104], [t.literacy152, 'FINANCIAL LITERACY', L.ink, 110], [t.step153, 'START THIS PAYDAY', L.sageD, 110]]} />
      <Sweep f={f} at={(EXTRA['ll-end'] ?? []).map(c)} />
      <LGrain />
    </g>
  )
}

export const LL_END = makePiece('ll-end', "Twenty years later: the two homes at dusk again — same job, same salary, same city; Jordan slumped by a PAYDAY calendar, a coin arrives and leaves straight away (arrow in, arrow out); Maya relaxed beside her money tree, her bills turning PAID; she never earned more — six pictures light along a line: pay, a job for every dollar (three jars), protect (umbrella), debt (card crossed), plan (flag), growth (money tree); a diploma shown then crossed (not a finance degree); a hand holding a few idea cards, in order; payday 1, an arrow sends the first slice into her savings jar — pay yourself first; Maya waves", {
  mood: 'light', Component: End, beats: [...Object.values(K), ...(EXTRA['ll-end'] ?? [])],
  sfx: [['s149:twenty', 'swish', 0.12], ['s151:out', 'swish', 0.1], ['s152:bills', 'cash', 0.12], ['s154:degree', 'swish', 0.1], ['s155:yourself', 'chime', 0.16]] })
void win
