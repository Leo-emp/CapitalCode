// ---------------------------------------------------------------- s22–s31: SPEND — every dollar gets a job
// A) s22–s23 Jordan's room: his month's money as a stack of bills on the table; rent, food and a night out each
//            carry a slice away; by the end of the month the stack is gone and he turns out his empty pockets.
// B) s24–s31 Maya's room: she sorts the same money before the month starts. A ball-and-chain (punishment) is
//            crossed, a plan clipboard ticks instead; the 50/30/20 book (2005); three jars fill on each step —
//            NEEDS $1,830 (rent, groceries, bills), WANTS $1,100 (eating out, streaming), FUTURE $730 (savings, debt);
//            a gavel (a law) is crossed; in an expensive city the NEEDS jar grows; the FUTURE jar gets the 1 badge.
import React from 'react'
import { lerp, on, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Sweep } from '../literacy/kit2'
import { EXTRA } from './extra'
import { Headline, Person, win } from '../aimoney/common'
import { Defs } from '../literacy/kit'
import { Jar } from '../literacy/kit2'
import { Big, Cross, FLOOR, House, L, LDefs, LGrain, Room, Table, Tag, Tick, cues, fadeIn, scene, FONT } from './kit'

const K = {
  jordan22: 's22:jordan', people22: 's22:people', rent22: 's22:rent', food22: 's22:food', friends22: 's22:friends', spends22: 's22:spends', left22: 's22:left',
  somehow23: 's23:somehow', end23: 's23:end', nothing23: 's23:nothing',
  maya24: 's24:maya', differently: 's24:differently', before24: 's24:before', dollar24: 's24:dollar', job24: 's24:job',
  budget25: 's25:budget', punishment: 's25:punishment', plan25: 's25:plan', gone25: 's25:gone',
  guide26: 's26:guide', fifty26: 's26:fifty', warren: 's26:warren', book26: 's26:book',
  step27: 's27:step', half27: 's27:half', needs27: 's27:needs', rent27: 's27:rent', groceries27: 's27:groceries', bills27: 's27:bills', one27: 's27:one',
  step28: 's28:step', thirty28: 's28:thirty', wants28: 's28:wants', enjoys28: 's28:enjoys', eating28: 's28:eating', streaming28: 's28:streaming', one28: 's28:one',
  step29: 's29:step', twenty29: 's29:twenty', seven29: 's29:seven', future29: 's29:future',
  guide30: 's30:guide', law30: 's30:law', expensive30: 's30:expensive', half30: 's30:half',
  maya31: 's31:seven', important31: 's31:follow', first31: 's31:here',
}

// # small drawn icons for what money goes to
const Plate: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><ellipse rx={70} ry={22} fill="#fff" stroke={L.creamD} strokeWidth={4} /><ellipse cy={-6} rx={36} ry={12} fill={L.terra} /><rect x={-4} y={-70} width={8} height={50} fill={L.inkSoft} transform="rotate(-20)" /></g>
)
const Glasses: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>{[-34, 34].map((k) => <g key={k} transform={`translate(${k} 0) rotate(${k / 3})`}><path d="M-26 -90 L26 -90 L18 -30 L-18 -30 Z" fill={L.mustardL} stroke={L.inkSoft} strokeWidth={4} /><rect x={-3} y={-30} width={6} height={28} fill={L.inkSoft} /><rect x={-20} y={-4} width={40} height={6} fill={L.inkSoft} /></g>)}</g>
)
const Screen: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><rect x={-80} y={-110} width={160} height={100} rx={10} fill={L.ink} /><path d="M-14 -80 L22 -60 L-14 -40 Z" fill={L.terraL} /><rect x={-10} y={-10} width={20} height={14} fill={L.ink} /></g>
)
// # a stack of bills that shrinks (n bills left)
const CashStack: React.FC<{ x: number; y: number; n: number; o?: number }> = ({ x, y, n, o = 1 }) => o <= 0.01 ? null : (
  <g opacity={o}>{Array.from({ length: Math.max(0, Math.round(n)) }, (_, k) => <g key={k} transform={`translate(${x + (k % 2 ? 6 : -6)} ${y - k * 22})`}><rect x={-110} y={-22} width={220} height={40} rx={6} fill={L.cash} stroke={L.cashD} strokeWidth={4} /><circle r={12} fill={L.cashD} opacity={0.6} /></g>)}</g>
)

const Spend: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = t.maya24 - 6
  const A = scene(f, -20, AB), B = fadeIn(f, AB)
  // # Jordan's stack: 10 bills; rent takes 4, food 2, friends 2, the rest 2
  const left = 10 - 4 * on(f, t.rent22, 10) - 2 * on(f, t.food22, 10) - 2 * on(f, t.friends22, 10) - 2 * on(f, t.end23, 14)
  // # Maya's jars
  const needsT = on(f, t.half27, 16), wantsT = on(f, t.thirty28, 16), futT = on(f, t.twenty29, 16)
  const city = on(f, t.expensive30, 14) * (1 - on(f, t.maya31 - 4, 12))
  const jarO = on(f, t.step27 - 4, 8)

  return (
    <g>
      <Defs /><LDefs />
      {/* ---------------- A) Jordan's month ---------------- */}
      {A > 0 && <g opacity={A}>
        <Room cool />
        <Table x={760} y={760} s={1} />
        <CashStack x={760} y={720} n={left} />
        <Tag x={760} y={400} text="$3,660 THIS MONTH" size={44} bg={L.terraD} o={on(f, t.jordan22, 8) * (1 - on(f, t.nothing23, 8))} />
        <g opacity={on(f, t.rent22 - 4, 8) * (1 - on(f, t.end23, 8))}><circle cx={1250} cy={600} r={170} fill="#fff" stroke={L.creamD} strokeWidth={6} /><circle cx={1440} cy={760} r={22} fill="#fff" /><circle cx={1480} cy={820} r={14} fill="#fff" /></g>
        <House x={1250} y={690} s={0.5} o={win(f, t.rent22 - 2, t.food22 + 6, 6)} color={L.terra} />
        <Plate x={1250} y={610} s={1.1} o={win(f, t.food22 - 2, t.friends22 + 6, 6)} />
        <Glasses x={1250} y={650} s={1.2} o={win(f, t.friends22 - 2, t.left22 + 10, 6)} />
        <Tag x={1250} y={850} text="RENT" size={40} bg={L.inkSoft} o={win(f, t.rent22, t.food22 + 6, 6)} />
        <Tag x={1250} y={850} text="FOOD" size={40} bg={L.inkSoft} o={win(f, t.food22, t.friends22 + 6, 6)} />
        <Tag x={1250} y={850} text="NIGHTS OUT" size={40} bg={L.inkSoft} o={win(f, t.friends22, t.left22 + 10, 6)} />
        <Big x={760} y={560} text="$0 LEFT" size={110} color={L.terraD} o={on(f, t.nothing23, 8)} />
        <Person f={f} who="investor" beats={[[0, 'idle', 'smiling'], [t.rent22, 'offer', 'neutral'], [t.friends22, 'celebrate', 'smiling'], [t.somehow23, 'scratchHead', 'thinking'], [t.nothing23, 'emptyPockets', 'worried']]} x={1620} y={1060} s={0.8} flip />
      </g>}

      {/* ---------------- B) Maya gives every dollar a job ---------------- */}
      {B > 0 && <g opacity={B}>
        <Room />
        {/* an expensive city rising in the window area */}
        {city > 0.01 && <g opacity={city}>{[0, 1, 2, 3, 4].map((k) => <rect key={k} x={760 + k * 85} y={600 - 160 * city - (k % 2) * 50} width={70} height={160 * city + (k % 2) * 50} fill={L.duskD} opacity={0.6} />)}</g>}
        <Person f={f} who="investorF" beats={[[0, 'idle', 'smiling'], [t.dollar24, 'present', 'smiling'], [t.punishment, 'crossNoA', 'neutral', 'crossNoB', 14], [t.plan25, 'thumbsUp', 'smiling'], [t.guide26, 'read', 'smiling'],
          [t.step27, 'countOne', 'thinking'], [t.step28, 'point', 'smiling'], [t.step29, 'pointUp', 'smiling'], [t.law30, 'shrug', 'neutral'], [t.important31, 'thumbsUp', 'smiling']]} x={250} y={1060} s={0.78} />
        {/* before the jars: punishment crossed, a plan ticked, the book */}
        <g opacity={1 - jarO}>
          <g opacity={win(f, t.punishment - 2, t.guide26, 8)} transform="translate(760 640)">
            <circle cx={60} cy={60} r={70} fill={L.ink} /><path d="M-160 -40 Q-90 -20 -40 20 Q0 50 20 50" stroke={L.inkSoft} strokeWidth={14} fill="none" strokeDasharray="20 10" /><rect x={-210} y={-70} width={70} height={60} rx={10} fill={L.inkSoft} />
            <Cross x={-40} y={0} r={130} p={span(f, t.punishment + 4, t.punishment + 14)} />
          </g>
          <g opacity={win(f, t.plan25 - 2, t.guide26 + 4, 8)} transform="translate(1300 620)">
            <rect x={-150} y={-200} width={300} height={380} rx={16} fill={L.creamL} stroke={L.sageD} strokeWidth={6} /><rect x={-60} y={-220} width={120} height={44} rx={10} fill={L.sageD} />
            {[0, 1, 2].map((k) => <g key={k}><Tick x={-90} y={-100 + k * 100} r={30} p={on(f, t.plan25 + k * 4, 6)} /><rect x={-40} y={-112 + k * 100} width={160} height={24} rx={8} fill={L.creamD} /></g>)}
          </g>
          <g opacity={on(f, t.guide26 - 2, 8)} transform="translate(1040 640) rotate(-4)">
            <rect x={-200} y={-150} width={400} height={300} rx={14} fill={L.mustard} /><rect x={-186} y={-136} width={372} height={272} rx={8} fill={L.mustardL} />
            <text x={0} y={-10} textAnchor="middle" fill={L.ink} style={{ font: `400 110px ${FONT.big}` }} opacity={on(f, t.fifty26, 8)}>50/30/20</text>
            <text x={0} y={90} textAnchor="middle" fill={L.inkSoft} style={{ font: `400 52px ${FONT.big}`, letterSpacing: 4 }} opacity={on(f, t.book26 - 4, 8)}>A 2005 BOOK</text>
          </g>
        </g>
        {/* the three jars */}
        <g opacity={jarO}>
          <Jar x={720} y={FLOOR - 4} s={lerp(1, 1.18, city)} fill={0.1 + 0.8 * needsT} color={L.duskD} label="NEEDS" />
          <Jar x={1110} y={FLOOR - 4} s={1} fill={0.1 + 0.55 * wantsT} color={L.terra} label="WANTS" o={on(f, t.step28 - 4, 8)} />
          <Jar x={1500} y={FLOOR - 4} s={1} fill={0.1 + 0.4 * futT} color={L.sage} label="FUTURE" o={on(f, t.step29 - 4, 8)} />
          <Tag x={720} y={520} text="50% · $1,830" size={42} bg={L.duskD} o={on(f, t.one27, 8)} />
          <Tag x={1110} y={520} text="30% · $1,100" size={42} bg={L.terraD} o={on(f, t.one28, 8)} />
          <Tag x={1500} y={520} text="20% · $730" size={42} bg={L.sageD} o={on(f, t.seven29, 8)} />
          {/* what each jar pays for, on the spoken words, above the jars */}
          <g opacity={win(f, t.rent27 - 2, t.step28, 6)}>
            <House x={600} y={430} s={0.3} color={L.duskD} o={on(f, t.rent27 - 2, 6)} />
            <Plate x={720} y={400} s={0.6} o={on(f, t.groceries27 - 2, 6)} />
            <g opacity={on(f, t.bills27 - 2, 6)} transform="translate(840 380)"><rect x={-34} y={-44} width={68} height={88} rx={6} fill="#fff" stroke={L.inkSoft} strokeWidth={4} /><rect x={-20} y={-24} width={40} height={8} fill={L.creamD} /><rect x={-20} y={-4} width={40} height={8} fill={L.creamD} /></g>
          </g>
          <g opacity={win(f, t.eating28 - 2, t.step29, 6)}><Plate x={1040} y={400} s={0.6} /><Screen x={1190} y={440} s={0.7} o={on(f, t.streaming28 - 2, 6)} /></g>
          {/* not a law: a gavel, crossed */}
          <g opacity={win(f, t.law30 - 2, t.expensive30 + 6, 6)} transform="translate(1110 380)">
            <rect x={-90} y={-40} width={180} height={70} rx={20} fill={L.floorD} /><rect x={-14} y={20} width={28} height={130} rx={10} fill={L.floorD} transform="rotate(30)" />
            <Cross x={0} y={20} r={90} p={span(f, t.law30 + 2, t.law30 + 12)} />
          </g>
          <Tag x={720} y={380} text="EXPENSIVE CITY: MORE" size={36} bg={L.duskD} o={win(f, t.expensive30, t.maya31, 8)} />
          {/* the first job */}
          <g opacity={on(f, t.important31, 8)}><circle cx={1500} cy={380} r={60} fill={L.mustard} /><text x={1500} y={408} textAnchor="middle" fill={L.ink} style={{ font: `400 46px ${FONT.big}` }}>$730</text>
            <ellipse cx={1500} cy={720} rx={210} ry={240} fill="url(#ll-glow)" opacity={0.6} /></g>
        </g>
      </g>}

      <Headline f={f} lines={[[t.jordan22, "JORDAN'S MONTH", L.terraD, 110], [t.nothing23, 'NOTHING LEFT', L.terraD, 110], [t.maya24, 'EVERY DOLLAR GETS A JOB', L.sageD, 100], [t.budget25, 'A BUDGET = A PLAN', L.ink, 104],
        [t.guide26, 'THE 50/30/20 GUIDE', L.ink, 104], [t.guide30, 'A GUIDE, NOT A LAW', L.ink, 104], [t.maya31, 'THE MONEY WE FOLLOW', L.sageD, 104]]} />
      <Sweep f={f} at={(EXTRA['ll-spend'] ?? []).map(c)} />
      <LGrain />
    </g>
  )
}

export const LL_SPEND = makePiece('ll-spend', "Spend: Jordan's $3,660 as a stack of bills on his table — rent, food and nights out each carry a slice away until $0 is left and he turns out his empty pockets; Maya in her room sorts the money before the month: a ball-and-chain (punishment) crossed, a plan clipboard ticked, the 50/30/20 book from 2005; three jars fill step by step — NEEDS 50% $1,830 (rent, groceries, bills), WANTS 30% $1,100 (eating out, streaming), FUTURE 20% $730 (savings, debt); a gavel (law) crossed; an expensive city makes the NEEDS jar bigger; the FUTURE jar's $730 is marked as the money the video follows", {
  mood: 'light', Component: Spend, beats: [...Object.values(K), ...(EXTRA['ll-spend'] ?? [])],
  sfx: [['s23:nothing', 'thud', 0.12], ['s25:punishment', 'swish', 0.1], ['s27:half', 'pop', 0.1], ['s28:thirty', 'pop', 0.1], ['s29:twenty', 'pop', 0.1], ['s31:follow', 'ding', 0.12]] })
