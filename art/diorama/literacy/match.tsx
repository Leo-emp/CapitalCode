// ---------------------------------------------------------------- s118–s129: lesson ten, free money (the match)
// A) s118–s121 the study: a pile of cash left on the desk — FREE MONEY; a 401(k) jar fed straight from a paycheck;
//            the employer's hand drops extra coins on top — the MATCH; the rule: $1 in → +50¢, up to 6% of pay.
// B) s122–s125 inside card 10: Maya's $60,000; her 6% = $3,600 a year ($300 a month) fills the jar; her employer adds
//            $1,800 (gold); "+50% before any growth".
// C) s126–s129 the study: a scale — an instant 50% outweighs a 22% card rate (the exception from lesson five); at only
//            3%: $900 of match, and $900 left on the table; a paycheck with a slice crossed; then all ten cards fan out.
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { EXTRA } from './extra'
import { Headline, Person, win } from '../aimoney/common'
import { Bill, C, Card, Coin, CreditCard, Cross, DESK, Defs, FONT, Grain, Lamp, Paycheck, Study, Tag, fadeIn, scene } from './kit'
import { Arrow, Jar, Letter, Num, Scale, Sheet, cues, Sweep } from './kit2'

const K = {
  free118: 's118:free', table118: 's118:table',
  employers119: 's119:employers', four119: 's119:four', retirement: 's119:retirement', paycheck119: 's119:paycheck',
  add120: 's120:add', top120: 's120:top', match120: 's120:match',
  formula: 's121:formula', vanguard: "s121:vanguard's", dollar121: 's121:dollar', six121: 's121:six', employer121: 's121:employer', fifty121: 's121:fifty',
  maya: 's122:maya', sixty122: 's122:sixty',
  six123: 's123:six', three123: 's123:three', month123: 's123:month',
  employer124: 's124:employer', fifty124: 's124:fifty', eight124: 's124:eight',
  boost: 's125:boost', grown125: 's125:grown',
  exception: 's126:exception', full126: 's126:full', card126: 's126:card', instant: 's126:instant', twenty126: 's126:twenty',
  three127: 's127:three', nine127: 's127:nine', table127: 's127:table',
  turning: 's128:turning', pay128: 's128:pay',
  ten129: 's129:ten', common: 's129:common',
}
const G = 1010

// # an employer's hand (sleeve + open palm) dropping coins
const Hand: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-300} y={-40} width={260} height={90} rx={20} fill={C.ink} /><rect x={-60} y={-46} width={40} height={102} rx={10} fill={C.paper} />
    <path d="M-24 -40 Q60 -60 110 -20 Q140 0 100 20 L30 30 Q-10 60 -24 50 Z" fill="#E0A97A" />
  </g>
)

const Match: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s122') - 6, BC = c('s126') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = fadeIn(f, BC)
  const own = on(f, t.three123, 18) * 0.5, emp = on(f, t.eight124, 18) * 0.25
  const drops = (at: number, x: number, k: number) => { const p = ((f - at) / 18 + k / 3) % 1; return f > at ? <Coin key={k} x={x + (k - 1) * 40} y={lerp(DESK - 420, DESK - 160, p)} r={30} o={1 - p * 0.6} /> : null }
  const tilt = lerp(0, -14, on(f, t.instant, 16))   // # left (match 50%) sinks

  return (
    <g>
      <Defs />
      {/* ---------------- A) free money ---------------- */}
      {A > 0 && <g opacity={A}>
        <Study f={f} />
        <Lamp x={1790} s={0.7} />
        <g opacity={1 - on(f, t.employers119 - 6, 10)}>
          {Array.from({ length: 6 }, (_, k) => <Bill key={k} x={820 + (k % 3) * 140} y={DESK + 40 - Math.floor(k / 3) * 40} s={1.6} r={(k * 13) % 20 - 10} o={on(f, t.free118 - 6 + k * 2, 6)} />)}
          <Tag x={960} y={DESK - 160} text="FREE MONEY" size={60} color={C.cashL} o={on(f, t.free118, 8)} />
          <Tag x={960} y={DESK + 190} text="LEFT ON THE TABLE?" size={40} point="none" o={on(f, t.table118, 8)} />
        </g>
        <g opacity={on(f, t.employers119 - 6, 10)}>
          <Paycheck x={480} y={DESK - 120} s={0.9} open={0.4} amount="$" who="PAY TO: YOU" />
          <Arrow x1={640} y1={DESK - 150} x2={830} y2={DESK - 100} p={span(f, t.paycheck119, t.paycheck119 + 12)} color={C.cashD} w={14} />
          <Jar x={960} y={DESK + 110} s={1.1} fill={lerp(0.2, 0.55, on(f, t.paycheck119, 16)) + 0.2 * on(f, t.match120, 16)} label="401(K)" />
          <Tag x={960} y={DESK + 200} text="RETIREMENT ACCOUNT" size={36} point="none" o={on(f, t.retirement, 8)} />
          <Hand x={1300} y={DESK - 440} s={1} o={on(f, t.add120 - 4, 8)} />
          {f < t.formula + 10 && [0, 1, 2].map((k) => (f > t.top120 ? drops(t.top120, 1000, k) : null))}
          <Tag x={1460} y={DESK - 330} text="THE MATCH" size={46} color={C.brassL} o={on(f, t.match120, 8)} />
          <g opacity={on(f, t.dollar121 - 4, 8)}>
            <Coin x={1380} y={DESK - 40} r={70} label="$1" />
            <Num x={1500} y={DESK - 20} text="→" size={80} color={C.paper} />
            <Coin x={1630} y={DESK - 40} r={56} label="50¢" o={on(f, t.fifty121, 8)} />
            <Tag x={1500} y={DESK + 100} text="UP TO 6% OF PAY" size={36} point="none" o={on(f, t.six121, 8)} />
          </g>
        </g>
      </g>}

      {/* ---------------- B) Maya's match ---------------- */}
      {B > 0 && <g opacity={B}>
        <Sheet n={10} />
        <Person f={f} who="investorF" beats={[[0, 'present', 'smiling'], [t.six123, 'countOne', 'thinking'], [t.eight124, 'celebrate', 'smiling'], [t.boost, 'thumbsUp', 'smiling']]} x={300} y={G} s={0.92} />
        <Letter x={700} y={560} s={0.7} r={-4} amount="$60,000" head="MAYA'S PAY" o={on(f, t.sixty122 - 4, 8)} />
        <Jar x={1250} y={G - 40} s={1.5} fill={own + emp} color={C.cash} />
        <Tag x={1250} y={G + 20} text="401(K)" size={40} point="none" />
        {emp > 0.01 && <rect x={1250 - 150} y={G - 40 - 435 * (own + emp)} width={300} height={435 * emp} rx={30} fill={C.gold} opacity={0.95} />}
        <Tag x={1250} y={330} text="SHE PUTS IN 6% = $3,600 A YEAR" size={40} point="none" color={C.cashL} o={win(f, t.three123, t.employer124, 8)} />
        <Tag x={1250} y={410} text="$300 A MONTH" size={36} point="none" o={win(f, t.month123, t.employer124, 8)} />
        <Tag x={1250} y={330} text="EMPLOYER ADDS $1,800" size={44} point="none" color={C.brassL} o={on(f, t.eight124, 8)} />
        <Hand x={1640} y={480} s={0.8} o={win(f, t.employer124 - 4, t.boost + 30, 8)} />
        <Num x={1660} y={760} text="+50%" size={150} color={C.goldD} o={on(f, t.boost, 8)} />
        <Tag x={1660} y={830} text="BEFORE ANY GROWTH" size={32} point="none" o={on(f, t.grown125, 8)} />
      </g>}

      {/* ---------------- C) the exception, the half match, all ten ---------------- */}
      {Cc > 0 && <g opacity={Cc}>
        <Study f={f} />
        <g opacity={1 - on(f, t.three127 - 4, 10)}>
          <Scale x={960} y={DESK + 120} tilt={tilt} left={<g><Coin x={0} y={-60} r={60} label="50%" /><Tag x={0} y={-170} text="MATCH" size={34} point="none" color={C.brassL} /></g>}
            right={<g><CreditCard x={0} y={-50} s={0.55} r={-4} /><Tag x={0} y={-170} text="CARD 22%" size={34} point="none" color={C.tomato} ink="#fff" o={on(f, t.card126, 8)} /></g>} />
          <Tag x={960} y={DESK + 200} text="THE EXCEPTION: GET THE FULL MATCH" size={40} point="none" color={C.brassL} o={on(f, t.full126, 8)} />
        </g>
        <g opacity={on(f, t.three127 - 4, 10) * (1 - on(f, t.turning - 4, 10))}>
          <Jar x={700} y={DESK + 110} s={1.1} fill={0.35} label="ONLY 3%" />
          <Num x={700} y={DESK - 300} text="$900 MATCH" size={80} color={C.brassL} o={on(f, t.nine127, 8)} />
          {Array.from({ length: 4 }, (_, k) => <Bill key={k} x={1240 + (k % 2) * 150} y={DESK + 40 - Math.floor(k / 2) * 40} s={1.6} r={k * 7 - 10} o={on(f, t.table127 - 4 + k * 2, 6)} />)}
          <Tag x={1310} y={DESK - 120} text="$900 LEFT ON THE TABLE" size={42} color={C.tomato} ink="#fff" o={on(f, t.table127, 8)} />
        </g>
        <g opacity={on(f, t.turning - 4, 10) * (1 - on(f, t.ten129 - 4, 10))}>
          <Paycheck x={960} y={DESK - 120} s={1.4} open={0.6} amount="PAY" who="PAY TO: YOU" />
          <Cross x={1100} y={DESK - 260} r={90} p={on(f, t.pay128, 12)} />
        </g>
        <g opacity={on(f, t.ten129 - 4, 10)}>
          {Array.from({ length: 10 }, (_, k) => <Card key={k} x={lerp(960, 300 + k * 147, on(f, t.ten129 + k * 2, 12))} y={DESK - 60 + Math.abs(k - 4.5) * 14} s={0.52} r={(k - 4.5) * 3} n={k + 1} glow={on(f, t.common, 10)} />)}
        </g>
      </g>}

      <Headline f={f} lines={[[t.free118, 'NEVER LEAVE FREE MONEY', C.paper, 104], [t.employers119, 'THE 401(K)', C.paper, 110], [t.formula, 'A COMMON MATCH', C.paper, 104],
        [t.maya, 'BACK TO MAYA', C.ink, 110], [t.boost, 'AN INSTANT 50%', C.ink, 110], [t.exception, '50% BEATS 22%', C.paper, 110], [t.three127, 'HALF THE MATCH?', C.paper, 104], [t.ten129, 'ALL TEN CARDS', C.paper, 110]]} />
      <Sweep f={f} at={EXTRA['fl-match'].map(c)} />
      <Grain />
    </g>
  )
}

export const FL_MATCH = makePiece('fl-match', 'Lesson 10, free money: a pile of cash left on the desk — free money; a 401(k) jar fed straight from a paycheck; an employer\'s hand drops coins on top — the match; $1 in → +50¢, up to 6% of pay; inside card 10 Maya\'s $60,000: her 6% = $3,600 a year ($300 a month) fills the jar, the employer adds $1,800 in gold, +50% before any growth; a scale where the 50% match outweighs a 22% card; only 3%: a $900 match and $900 of bills left on the table; a paycheck crossed (turning down pay); all ten index cards fan out', {
  mood: 'light', Component: Match, beats: [...Object.values(K), ...EXTRA['fl-match']],
  sfx: [['s118:free', 'cash', 0.16], ['s120:match', 'pop', 0.14], ['s124:eight', 'cash', 0.18], ['s126:instant', 'thud', 0.14], ['s127:table', 'swish', 0.14], ['s129:common', 'chime', 0.14]] })
void pop; void FONT
