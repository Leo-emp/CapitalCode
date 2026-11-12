// ---------------------------------------------------------------- s87–s94: step eight, leave the 9-to-5 safely.
// A) The office at dawn: a sheet with the two crossing lines ("on paper") beside the office door; three numbered stones appear (s87–s88).
// B) 1: a safe fills with cash bundles — one to two years of his life, $60,000 to $120,000, safe, boring cash (s89).
// C) 2: a storm over the money tree, a red bar down more than a third (s90); Leo opens the safe and lives on it while a SELL sign by the tree is crossed (s91);
//    the sun returns and coins flow back into the safe (s92).
// D) 3: a tap from the pile turned down a little in a rough year; a calendar strip that runs longer (s93).
// E) The office door opens on a sunrise and Leo hands in his notice; or he stays at a desk, smiling, by choice (s94).
import React from 'react'
import { lerp, on, pop, rnd, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win } from '../aimoney/common'
import { C, City, Cross, Defs, Desk, Door, FONT, Grain, MoneyTree, Office, Safe, Tag, Tap, fadeIn, scene } from './kit'

const G = 930
const Stone: React.FC<{ x: number; y: number; n: number; o: number }> = ({ x, y, n, o }) => <g opacity={o} transform={`translate(${x} ${y})`}><ellipse cx={0} cy={6} rx={80} ry={14} fill="#000" opacity={0.2} /><path d="M-70 0 Q-80 -60 -20 -76 Q40 -84 70 -40 Q86 -6 60 0 Z" fill={C.stone} /><text y={-22} textAnchor="middle" fill={C.ink} style={{ font: `400 56px ${FONT.big}` }}>{n}</text></g>

const Leave: React.FC<PieceProps> = ({ f, c }) => {
  const leave = c('s87:leave')
  const crossing = c('s88:crossing'), paper = c('s88:paper'), walking = c('s88:walking'), office = c('s88:office'), three88 = c('s88:three')
  const buffer = c('s89:buffer'), keeps = c('s89:keeps'), two89 = c('s89:two'), sixty = c('s89:sixty'), twenty89 = c('s89:twenty'), safe89 = c('s89:safe'), boring = c('s89:boring')
  const plan = c('s90:plan'), bad = c('s90:bad'), market90 = c('s90:market'), fell = c('s90:fell'), third = c('s90:third')
  const lives = c('s91:lives'), instead = c('s91:instead'), selling = c('s91:selling'), cheap = c('s91:cheap')
  const recovers = c('s92:recovers'), refills = c('s92:refills')
  const three93 = c('s93:three'), flexible = c('s93:flexible'), rough = c('s93:rough'), less = c('s93:less'), longer = c('s93:longer')
  const hands = c('s94:hands'), notice = c('s94:notice'), keeps94 = c('s94:keeps'), working = c('s94:working'), wants = c('s94:wants')

  const AB = c('s89') - 6, BC = c('s90') - 6, CD = c('s93') - 6, DE = c('s94') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = scene(f, BC, CD), D = scene(f, CD, DE), E = fadeIn(f, DE)
  const storm = f < recovers ? 1 : 1 - span(f, recovers, recovers + 24)
  const safeFill = f < lives ? 1 : f < recovers ? lerp(1, 0.5, span(f, lives, cheap)) : lerp(0.5, 1, span(f, refills - 10, refills + 30))
  const stay = on(f, keeps94, 10)

  return (
    <g>
      <Defs />
      {/* # A) on paper vs out the door */}
      {A > 0 && <g opacity={A}>
        <Office f={f} sky="dawn" />
        <g opacity={win(f, crossing - 6, three88, 8)} transform={`translate(560 ${G - 330}) rotate(-4)`}>
          <rect x={-200} y={-150} width={400} height={300} rx={8} fill="#fff" /><path d="M-160 100 Q0 90 160 -100" stroke={C.cashD} strokeWidth={9} fill="none" /><line x1={-160} y1={-30} x2={160} y2={-30} stroke={C.goldD} strokeWidth={8} /><circle cx={92} cy={-30} r={14} fill={C.red} />
        </g>
        <Tag x={560} y={G - 100} text="ON PAPER" size={40} o={win(f, paper, three88, 8)} point="none" />
        <Door x={1320} y={G} open={0} o={on(f, walking - 6, 8)} />
        <Tag x={1320} y={G + 60} text="OUT OF THE OFFICE" size={38} o={win(f, office, three88, 8)} point="none" />
        {[1, 2, 3].map((n, k) => <g key={n} transform={`translate(0 ${-14 * pop(f, c('s88:first') + k * 3, 10)})`}><Stone x={480 + k * 300} y={G} n={n} o={on(f, three88 + k * 5, 6)} /></g>)}
        <Person f={f} who="investor" beats={[[0, 'idle', 'neutral'], [paper, 'point', 'neutral'], [three88, 'countOne', 'smiling'], [c('s88:first'), 'present', 'smiling']]} x={1680} y={G} s={0.9} flip />
      </g>}

      {/* # B) 1: the cash buffer */}
      {B > 0 && <g opacity={B}>
        <City sky="day" f={f} sun={[1700, 250]} ground={G} />
        <Safe x={960} y={G} s={1.2} fill={span(f, buffer, twenty89 + 10)} open={on(f, keeps, 14)} />
        <Tag x={960} y={G - 470} text="1: A CASH BUFFER" size={44} o={on(f, buffer, 8)} color={C.sun} />
        <Tag x={1500} y={G - 300} text="1 TO 2 YEARS OF HIS LIFE" size={38} o={on(f, two89, 8)} point="none" />
        <Tag x={1500} y={G - 220} text="$60,000 TO $120,000" size={44} o={on(f, sixty, 8)} point="none" color={C.cash} ink="#fff" />
        <Tag x={960} y={G + 60} text="SAFE, BORING CASH" size={40} o={on(f, safe89, 8)} point="none" />
        <Person f={f} who="investor" beats={[[0, 'idle', 'smiling'], [keeps, 'present', 'smiling'], [boring, 'thumbsUp', 'smiling']]} x={420} y={G} s={0.92} />
      </g>}

      {/* # C) 2: a plan for bad years */}
      {Cc > 0 && <g opacity={Cc}>
        <City sky={storm > 0.5 ? 'storm' : 'day'} f={f} sun={storm > 0.5 ? null : [1700, 250]} ground={G} />
        {storm > 0.02 && Array.from({ length: 60 }, (_, k) => { const x = rnd(k) * 1920, y = ((rnd(k + 3) * 1080 + f * 22) % 1180) - 100; return <line key={k} x1={x} y1={y} x2={x - 10} y2={y + 36} stroke="#DCE4F2" strokeWidth={3} opacity={0.5 * storm} /> })}
        <MoneyTree x={520} y={G} g={0.85} f={f} s={0.9} storm={storm} />
        <g opacity={win(f, c('s90:remember') - 4, lives, 8)} transform={`translate(960 ${G})`}>
          <rect x={-70} y={-380} width={140} height={380} fill="#C9CED8" opacity={0.6} /><rect x={-70} y={-380 * (1 - 0.3655 * on(f, fell, 16))} width={140} height={380 * (1 - 0.3655 * on(f, fell, 16))} fill={C.red} />
          <Tag x={0} y={-430} text="2008: DOWN MORE THAN A THIRD" size={34} o={on(f, third - 6, 8)} color={C.red} ink="#fff" />
        </g>
        <Tag x={520} y={G + 60} text="2: A PLAN FOR BAD YEARS" size={40} o={on(f, plan, 8)} point="none" color={C.sun} />
        <g opacity={on(f, lives - 6, 8)}>
          <Safe x={1400} y={G} s={0.95} fill={safeFill} open={win(f, lives, recovers, 10)} />
          <Person f={f} who="investor" beats={[[0, 'reachDown', 'neutral'], [instead, 'crossNoA', 'neutral'], [recovers, 'relief', 'smiling'], [refills, 'thumbsUp', 'smiling']]} x={1720} y={G} s={0.9} flip />
          <Tag x={1400} y={G - 440} text="LIVES ON THE BUFFER" size={38} o={win(f, lives, recovers, 8)} />
          <g opacity={win(f, selling - 4, recovers, 8)} transform={`translate(860 ${G - 240})`}>
            <rect x={-6} y={-40} width={12} height={280} fill={C.bark} /><rect x={-110} y={-120} width={220} height={90} rx={10} fill={C.red} /><text y={-60} textAnchor="middle" fill="#fff" style={{ font: `400 56px ${FONT.big}` }}>SELL</text>
            <Cross x={0} y={-75} r={110} p={on(f, cheap - 4, 12)} />
          </g>
          {f >= refills - 10 && [0, 1, 2, 3].map((k) => { const at = refills - 10 + k * 8, t = span(f, at, at + 20); return f >= at && t < 1 ? <g key={k} transform={`translate(${lerp(620, 1400, t)} ${lerp(G - 480, G - 300, t) - 120 * Math.sin(Math.PI * t)})`}><ellipse rx={20} ry={9} fill={C.goldD} /><ellipse cy={-3} rx={20} ry={9} fill={C.gold} /></g> : null })}
          <Tag x={1400} y={G - 440} text="REFILLS THE BUFFER" size={38} o={on(f, refills, 8)} color={C.cash} ink="#fff" />
        </g>
      </g>}

      {/* # D) 3: stay flexible */}
      {D > 0 && <g opacity={D}>
        <City sky="day" f={f} sun={[1700, 250]} ground={G} />
        <MoneyTree x={520} y={G} g={0.85} f={f} s={0.9} />
        <Tap x={900} y={G - 260} f={f} flow={f < less ? 1 : 0.45} s={1.1} />
        <g transform={`translate(900 ${G - 450})`} opacity={on(f, less - 4, 8)}><path d="M-60 -40 A70 70 0 0 1 60 -40" stroke={C.amber} strokeWidth={10} fill="none" /><path d="M-40 -70 L-62 -40 L-26 -30" stroke={C.amber} strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>
        <Tag x={900} y={G + 60} text="A LITTLE LESS IN A ROUGH YEAR" size={38} o={on(f, rough, 8)} point="none" />
        <Tag x={480} y={G + 60} text="3: STAY FLEXIBLE" size={40} o={on(f, flexible, 8)} point="none" color={C.sun} />
        <g opacity={on(f, helpsOrLonger(f, longer), 8)} transform={`translate(1460 ${G - 300})`}>
          {Array.from({ length: 8 }, (_, k) => <rect key={k} x={-280 + k * 70} y={-40} width={60} height={80} rx={8} fill={k < 6 ? C.paper : C.cash} opacity={k < 6 ? 1 : on(f, longer + (k - 6) * 6, 6)} />)}
          <Tag x={0} y={110} text="IT LASTS LONGER" size={40} o={on(f, longer, 8)} point="none" color={C.cash} ink="#fff" />
        </g>
        <Person f={f} who="investor" beats={[[0, 'idle', 'neutral'], [flexible, 'explain', 'smiling'], [less, 'pull', 'neutral'], [longer, 'thumbsUp', 'smiling']]} x={1180} y={G} s={0.85} o={on(f, three93 - 6, 8) * 0} />
      </g>}

      {/* # E) the notice — or work by choice */}
      {E > 0 && <g opacity={E}>
        <Office f={f} sky="dawn" />
        <g opacity={1 - stay}>
          <Door x={1300} y={G} open={on(f, notice, 24)} />
          <Person f={f} who="investor" beats={[[0, 'idle', 'smiling'], [c('s94:only'), 'pointUp', 'smiling'], [hands, 'offer', 'smiling'], [notice + 20, 'walkA', 'smiling', 'walkB', 14]]} x={lerp(760, 1240, span(f, notice + 20, keeps94))} y={G} s={0.92} o={1 - on(f, keeps94 - 14, 8)} />
          <g opacity={win(f, hands - 4, notice + 24, 8)} transform={`translate(${880} ${G - 330}) rotate(-8)`}><rect x={-60} y={-80} width={120} height={160} rx={6} fill="#fff" />{[0, 1, 2, 3].map((k) => <rect key={k} x={-40} y={-50 + k * 30} width={80 - (k % 2) * 20} height={10} rx={5} fill={C.stoneD} />)}</g>
          <Tag x={760} y={G + 60} text="HANDS IN HIS NOTICE" size={38} o={on(f, notice, 8)} point="none" />
        </g>
        <g opacity={stay}>
          <Desk x={760} y={G} f={f} s={1} screen={C.sun} />
          <Person f={f} who="investor" beats={[[0, 'typeSit', 'smiling'], [wants, 'thumbsUp', 'smiling']]} x={1240} y={G} s={0.92} flip />
          <Tag x={960} y={G + 60} text={f >= wants ? 'ONLY BECAUSE HE WANTS TO' : 'OR KEEPS WORKING'} size={40} o={on(f, working, 8)} point="none" color={f >= wants ? C.cash : C.cream} ink={f >= wants ? '#fff' : C.ink} />
        </g>
      </g>}

      <Headline f={f} lines={[[leave, 'STEP 8: LEAVE SAFELY', C.cream, 104], [three88, 'THREE THINGS FIRST', C.cream, 104], [buffer, 'A CASH BUFFER', C.ink, 108], [plan, 'A PLAN FOR BAD YEARS', C.cream, 104],
        [recovers, 'THEN REFILL IT', C.ink, 104], [three93, 'STAY FLEXIBLE', C.ink, 108], [hands, 'THEN, AND ONLY THEN', C.cream, 104], [keeps94, 'WORK BY CHOICE', C.cream, 108]]} />
      <Grain />
    </g>
  )
}
const helpsOrLonger = (_f: number, longer: number) => longer - 30

const BEATS = ["s88:first", "s94:only", "s90:remember", 's87:leave', 's88:crossing', 's88:paper', 's88:walking', 's88:office', 's88:three', 's89:buffer', 's89:keeps', 's89:two', 's89:sixty', 's89:twenty', 's89:safe', 's89:boring',
  's90:plan', 's90:bad', 's90:market', 's90:fell', 's90:third', 's91:lives', 's91:instead', 's91:selling', 's91:cheap', 's92:recovers', 's92:refills', 's93:three', 's93:flexible', 's93:rough', 's93:less', 's93:longer',
  's94:hands', 's94:notice', 's94:keeps', 's94:working', 's94:wants']
export const FF_LEAVE = makePiece('ff-leave', 'Freedom step eight: the office at dawn, a sheet with the crossing lines (ON PAPER), the office door (OUT OF THE OFFICE), three numbered stones; a safe fills with cash (1: A CASH BUFFER, 1 TO 2 YEARS OF HIS LIFE, $60,000 TO $120,000, SAFE, BORING CASH); a storm over the money tree, a red bar (2008: DOWN MORE THAN A THIRD), Leo opens the safe (LIVES ON THE BUFFER), a SELL sign by the tree crossed, the sun returns and coins flow back (REFILLS THE BUFFER); a tap turned down a little (A LITTLE LESS IN A ROUGH YEAR, 3: STAY FLEXIBLE) and a calendar strip that grows (IT LASTS LONGER); the office door opens on a sunrise as Leo hands in his notice and walks out; or he works at a desk smiling (ONLY BECAUSE HE WANTS TO)', {
  mood: 'light', Component: Leave, beats: BEATS,
  sfx: [['s88:three', 'pop', 0.12], ['s89:sixty', 'coin', 0.15], ['s90:fell', 'thud', 0.18], ['s91:cheap', 'swish', 0.12], ['s92:refills', 'coin', 0.15], ['s93:longer', 'ding', 0.15], ['s94:notice', 'whoosh', 0.15], ['s94:wants', 'chime', 0.15]] })
