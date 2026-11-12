// ---------------------------------------------------------------- s82–s88: PLAN — net worth, one dated goal, the $730 switches to investing
// A) s82–s85 a balance scale: OWN on one pan, OWE on the other. Maya: her $5,500 cushion jar vs nothing owed —
//            the scoreboard reads +$5,500. Jordan: an $800 card vs nothing saved — his scoreboard drops below zero.
// B) s86–s87 one goal with a date: a road with a flag marked IN 20 YEARS and a money tree at its end (her money, not
//            just her job, pays her bills). Then two lanes: money she may need soon (the cushion jar, SAFE IN SAVINGS)
//            and money for a goal 20 years away (an investment line that dips and recovers).
// C) s88     the switch: the full cushion jar gets a DONE tick; the monthly $730 coins now turn away from it toward a
//            signpost INVESTING — where, and how it grows, comes next.
import React from 'react'
import { lerp, on, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Sweep } from '../literacy/kit2'
import { EXTRA } from './extra'
import { Headline, Person } from '../aimoney/common'
import { Defs } from '../literacy/kit'
import { Jar, Scale } from '../literacy/kit2'
import { Card, Coin, FLOOR, L, LDefs, LGrain, MoneyTree, Paper, Room, Tag, Tick, cues, fadeIn, scene, FONT } from './kit'

const K = {
  plan82: 's82:plan', stand82: 's82:stand', maya82: 's82:maya', net82: 's82:net',
  simple83: 's83:simple', own83: 's83:own', savings83: 's83:savings', away83: 's83:away', owe83: 's83:owe', card83: 's83:card',
  maya84: 's84:maya', five84: 's84:five', debt84: 's84:debt', net84: 's84:net',
  jordan85: 's85:jordan', owes85: 's85:owes', nothing85: 's85:nothing', zero85: 's85:zero',
  goal86: 's86:goal', date86: 's86:date', twenty86: 's86:twenty', job86: 's86:job', bills86: 's86:bills',
  soon87: 's87:soon', cushion87: 's87:cushion', safe87: 's87:safe', goal87: 's87:goal', invested87: 's87:invested', recover87: 's87:recover', patches87: 's87:patches',
  now88: 's88:now', seven88: 's88:seven', investing88: 's88:investing', choosing: 's88:choosing', grows88: 's88:grows',
}

// # a scoreboard panel
const Board: React.FC<{ x: number; y: number; value: string; color: string; o?: number; title?: string }> = ({ x, y, value, color, o = 1, title = 'NET WORTH' }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y})`}>
    <rect x={-230} y={-130} width={460} height={260} rx={22} fill={L.ink} /><rect x={-210} y={-110} width={420} height={220} rx={14} fill="#1B2533" />
    <text x={0} y={-50} textAnchor="middle" fill={L.creamD} style={{ font: `400 40px ${FONT.big}`, letterSpacing: 4 }}>{title}</text>
    <text x={0} y={70} textAnchor="middle" fill={color} style={{ font: `400 120px ${FONT.big}` }}>{value}</text>
  </g>
)

const Plan: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = t.goal86 - 6, BC = c('s88') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = fadeIn(f, BC)
  const jordan = on(f, t.jordan85 - 2, 10)
  const tilt = lerp(lerp(0, -12, on(f, t.five84, 12)), 12, jordan)   // # − = left (OWN) down
  // # B: the long-goal investment line (dips, recovers)
  const line = Array.from({ length: 41 }, (_, k) => { const u = k / 40; return [1060 + u * 680, 860 - u * 300 + Math.sin(u * 14) * 36 + (u > 0.45 && u < 0.6 ? 70 : 0)] })
  const lineP = span(f, t.invested87, t.patches87 + 20)
  const lanes = on(f, t.soon87 - 4, 8)
  // # C: coins turn from the jar to the signpost
  const turn = on(f, t.investing88 - 2, 12)

  return (
    <g>
      <Defs /><LDefs />
      {/* ---------------- A) net worth ---------------- */}
      {A > 0 && <g opacity={A}>
        <Paper />
        <Scale x={760} y={FLOOR + 60} tilt={tilt} s={0.95} o={on(f, t.own83 - 4, 8)}
          left={<g><Tag x={0} y={-230} text="OWN" size={44} bg={L.sageD} /><g opacity={1 - jordan}><Jar x={0} y={-10} s={0.5} fill={0.8} color={L.sage} o={on(f, t.savings83, 8)} /></g></g>}
          right={<g><Tag x={0} y={-230} text="OWE" size={44} bg={L.terraD} /><Card x={0} y={-60} s={0.45} r={-6} text="$800" o={jordan || on(f, t.card83, 8) * (1 - on(f, t.maya84 - 2, 6))} /></g>} />
        <Tag x={760} y={300} text="OWN − OWE = NET WORTH" size={44} bg={L.ink} o={on(f, t.simple83, 8)} />
        <Board x={1520} y={560} value={jordan > 0.5 ? '−$800' : '+$5,500'} color={jordan > 0.5 ? L.terra : L.sage} title={jordan > 0.5 ? "JORDAN'S NET WORTH" : "MAYA'S NET WORTH"} o={on(f, t.net84 - 4, 8)} />
        <Tag x={1520} y={760} text="BELOW ZERO" size={44} bg={L.terraD} o={on(f, t.zero85, 8)} />
      </g>}

      {/* ---------------- B) one goal with a date ---------------- */}
      {B > 0 && <g opacity={B}>
        <Room />
        <Person f={f} who="investorF" beats={[[0, 'idle', 'smiling'], [t.goal86, 'pointUp', 'smiling'], [t.bills86, 'lookFar', 'thinking'], [t.soon87, 'explain', 'neutral'], [t.invested87, 'point', 'smiling']]} x={230} y={1060} s={0.78} />
        <g opacity={1 - lanes}>
          <rect x={480} y={FLOOR - 10} width={1300} height={20} rx={10} fill={L.creamD} />
          <Tag x={600} y={FLOOR - 40} text="TODAY" size={36} bg={L.inkSoft} o={on(f, t.date86, 8)} />
          <g opacity={on(f, t.twenty86 - 2, 8)}>
            <rect x={1380} y={FLOOR - 340} width={8} height={340} fill={L.ink} />
            <path d={`M1388 ${FLOOR - 340} L1630 ${FLOOR - 296} L1388 ${FLOOR - 252} Z`} fill={L.sageD} />
            <text x={1402} y={FLOOR - 284} fill="#fff" style={{ font: `400 36px ${FONT.big}` }}>IN 20 YEARS</text>
          </g>
          <MoneyTree x={1760} y={FLOOR} s={0.6} g={on(f, t.job86 - 4, 18)} o={on(f, t.job86 - 6, 8)} />
          <Tag x={1150} y={360} text="HER MONEY PAYS HER BILLS" size={42} bg={L.sageD} o={on(f, t.bills86, 8)} />
        </g>
        <g opacity={lanes}>
          <Jar x={640} y={FLOOR - 4} s={0.9} fill={0.85} color={L.sage} label="CUSHION" o={on(f, t.cushion87 - 2, 8)} />
          <Tag x={640} y={380} text="NEEDED SOON: SAFE IN SAVINGS" size={36} bg={L.sageD} o={on(f, t.safe87, 8)} />
          <g opacity={on(f, t.goal87 - 2, 8)}>
            <path d={'M' + line.filter((_, k) => k / 40 <= lineP).map((p) => p.join(' ')).join(' L')} stroke={L.duskD} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <Tag x={1400} y={380} text="20 YEARS AWAY: INVESTED" size={36} bg={L.duskD} o={on(f, t.invested87, 8)} />
            <Tag x={1400} y={460} text="TIME TO RECOVER" size={32} bg={L.inkSoft} o={on(f, t.recover87, 8)} />
          </g>
        </g>
      </g>}

      {/* ---------------- C) the switch ---------------- */}
      {Cc > 0 && <g opacity={Cc}>
        <Room />
        <Person f={f} who="investorF" beats={[[0, 'present', 'smiling'], [t.investing88, 'point', 'smiling'], [t.choosing, 'think', 'thinking']]} x={230} y={1060} s={0.78} />
        <Jar x={720} y={FLOOR - 4} s={1} fill={0.92} color={L.sage} label="CUSHION" />
        <Tick x={720} y={480} r={44} p={on(f, t.now88, 8)} />
        <Tag x={720} y={400} text="FULL: DONE" size={36} bg={L.sageD} o={on(f, t.now88, 8)} />
        {/* the monthly $730: coins arrive, then turn toward the signpost */}
        {f > t.seven88 && [0, 1, 2].map((k) => { const p = ((f - t.seven88) / 28 + k / 3) % 1
          const x = lerp(1060, lerp(760, 1500, turn), p), y = lerp(380, lerp(600, 620, turn), p)
          return <Coin key={k} x={x} y={y} r={34} o={1 - p * 0.5} /> })}
        <Tag x={1060} y={320} text="$730 EVERY MONTH" size={40} bg={L.ink} o={on(f, t.seven88, 8)} />
        <g opacity={on(f, t.investing88 - 2, 8)} transform={`translate(1600 ${FLOOR})`}>
          <rect x={-10} y={-420} width={20} height={420} fill={L.floorD} />
          <path d="M-150 -400 L150 -400 L200 -350 L150 -300 L-150 -300 Z" fill={L.duskD} />
          <text x={10} y={-334} textAnchor="middle" fill="#fff" style={{ font: `400 52px ${FONT.big}`, letterSpacing: 3 }}>INVESTING</text>
        </g>
        <Tag x={1600} y={720} text="WHERE? HOW FAST?" size={38} bg={L.inkSoft} o={on(f, t.choosing, 8)} />
      </g>}

      <Headline f={f} lines={[[t.plan82, 'WHERE YOU STAND', L.ink, 110], [t.simple83, 'NET WORTH', L.ink, 120], [t.goal86, 'ONE GOAL, WITH A DATE', L.ink, 104], [t.soon87, 'SOON VS LATER', L.ink, 110],
        [t.now88, 'THE $730 SWITCHES', L.sageD, 110]]} />
      <Sweep f={f} at={(EXTRA['ll-plan'] ?? []).map(c)} />
      <LGrain />
    </g>
  )
}

export const LL_PLAN = makePiece('ll-plan', "Plan: a balance scale with OWN and OWE pans — Maya's $5,500 cushion jar and nothing owed, the scoreboard reads +$5,500; Jordan's $800 card and nothing saved tips it, his net worth −$800, below zero; one goal with a date — a road from TODAY to a flag IN 20 YEARS and a money tree (her money pays her bills); money needed soon (the cushion jar, safe in savings) vs money 20 years away (an investment line that dips and recovers, time to recover); the full cushion gets a DONE tick and the $730 coins each month turn away from it toward an INVESTING signpost — where, and how fast, comes next", {
  mood: 'light', Component: Plan, beats: [...Object.values(K), ...(EXTRA['ll-plan'] ?? [])],
  sfx: [['s84:five', 'ding', 0.1], ['s85:zero', 'thud', 0.12], ['s86:twenty', 'pop', 0.1], ['s88:investing', 'chime', 0.12]] })
