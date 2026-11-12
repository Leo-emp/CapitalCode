// ---------------------------------------------------------------- s17–s28: step two, the 401(k) and its match (Jordan's office).
// A) A glass box labelled 401(K) appears on the office floor with a WORK badge; a tax-code page says SECTION 401(K).
// B) Jordan (made up, 27, $46,000) and the boss: the offer card UP TO 6% → +50¢ PER $1. Jordan's coins (2,760) drop into
//    the box, then the boss adds gold coins (1,380) on top. Compare: a 3 % box beside it gets 1,380 + 690, and a dashed
//    pile of 690 is left behind.
// C) The match label; a payroll belt carries paychecks past the box and a slice of each drops in by itself (autopilot).
// D) Vesting: the boss's coins in the box sit behind a little timed lock; Jordan walks off early and some company coins
//    stay behind, while Jordan's own green coins go with Jordan.
// E) The ceiling: a coin stack rises to a bar marked 2026: $24,500 (and $32,500 from age 50).
// F) A desk with NO 401(K)? and a second, empty box.
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { BB, Box, Check, Coin, Label, Lock, No, Office, R } from './kit'

const G = 920

// # a stack of coins inside a box: own (green rim) and company (gold) layers
const Stack: React.FC<{ x: number; y: number; own: number; co: number; left?: number }> = ({ x, y, own, co, left = 0 }) => (
  <g transform={`translate(${x} ${y})`}>
    {Array.from({ length: Math.round(own) }, (_, k) => <ellipse key={'o' + k} cx={0} cy={-k * 16} rx={70} ry={14} fill={R.leaf} stroke={R.forestD} strokeWidth={3} />)}
    {Array.from({ length: Math.round(co) }, (_, k) => <ellipse key={'c' + k} cx={0} cy={-(Math.round(own) + k) * 16} rx={70} ry={14} fill={R.gold} stroke={R.goldD} strokeWidth={3} />)}
    {left > 0 && Array.from({ length: Math.round(left) }, (_, k) => <ellipse key={'l' + k} cx={0} cy={-(Math.round(own) + Math.round(co) + k) * 16} rx={70} ry={14} fill="none" stroke={R.goldD} strokeWidth={3} strokeDasharray="8 6" />)}
  </g>
)

const K401: React.FC<PieceProps> = ({ f, c }) => {
  const is17 = c('s17:is'), box17 = c('s17:box'), employer17 = c('s17:employer'), offers17 = c('s17:offers'), strange17 = c('s17:strange'), name17 = c('s17:name'), section17 = c('s17:section'), code17 = c('s17:code')
  const meet18 = c('s18:meet'), madeup18 = c('s18:madeup'), n27 = c('s18:27'), earns18 = c('s18:earns'), n46k = c('s18:46000')
  const company19 = c("s19:jordan's"), offer19 = c('s19:offer'), n6 = c('s19:6'), pay19 = c('s19:pay'), add19 = c('s19:add'), n50 = c('s19:50'), every19 = c('s19:every')
  const n6b = c('s20:6'), n2760 = c('s20:2760'), half20 = c('s20:half'), n1380 = c('s20:1380'), added20 = c('s20:added'), company20 = c('s20:company'), top20 = c('s20:top')
  const compare21 = c('s21:compare'), only21 = c('s21:only'), n3 = c('s21:3'), n1380b = c('s21:1380'), add21 = c('s21:add'), half21 = c('s21:half'), n690 = c('s21:690')
  const leave22 = c('s22:leave'), other22 = c('s22:other'), n690b = c('s22:690'), behind22 = c('s22:behind'), every22 = c('s22:every'), year22 = c('s22:year')
  const called23 = c('s23:called'), match23 = c('s23:match'), part23 = c('s23:part'), pay23 = c("s23:jordan's"), gets23 = c('s23:gets'), putting23 = c('s23:putting'), first23 = c('s23:first')
  const straight24 = c('s24:straight'), paycheck24 = c('s24:paycheck'), sees24 = c('s24:sees'), saving24 = c('s24:saving'), autopilot24 = c('s24:autopilot')
  const catch25 = c('s25:catch'), part25 = c('s25:part'), waiting25 = c('s25:waiting'), vesting25 = c('s25:vesting'), leave25 = c('s25:leave'), early25 = c('s25:early'), stay25 = c('s25:stay'), behind25 = c('s25:behind')
  const own26 = c('s26:own'), contributions26 = c('s26:contributions'), always26 = c('s26:always'), belong26 = c('s26:belong')
  const ceiling27 = c('s27:ceiling'), y2026 = c('s27:2026'), most27 = c('s27:most'), own27 = c('s27:own'), n24500 = c('s27:24500'), n32500 = c('s27:32500'), age27 = c('s27:age'), n50b = c('s27:50')
  const not28 = c('s28:not'), job28 = c('s28:job'), k401b = c('s28:401k'), happens28 = c('s28:happens'), second28 = c('s28:second'), box28 = c('s28:box')

  const AB = meet18 - 4, BC = called23 - 4, CD = catch25 - 4, DE = c("s27:there's") - 4, EF = not28 - 4
  const A = win(f, 0, AB), B = win(f, AB - 8, BC), Cc = win(f, BC - 8, CD), D = win(f, CD - 8, DE), E = win(f, DE - 8, EF), F = on(f, EF - 8, 10)

  const jB: Beat[] = [[AB, 'waveA', 'smiling', 'waveB', 14], [n46k, 'present', 'smiling'], [offer19, 'think', 'thinking'], [n2760, 'carry', 'neutral'], [n1380, 'celebrate', 'smiling'], [compare21, 'explain', 'neutral'], [n690, 'shrug', 'worried'], [behind22, 'facepalm', 'worried']]
  const bossB: Beat[] = [[AB, 'idle', 'smiling'], [offer19, 'present', 'smiling'], [n50, 'pointUp', 'smiling'], [added20, 'offer', 'smiling'], [n690, 'shrug', 'neutral']]
  const ownIn = span(f, n2760 - 4, n2760 + 24) * 8, coIn = span(f, added20 - 6, top20 + 16) * 4
  const small = on(f, compare21, 10), n46kb = c('s20:46000')
  // # C) payroll belt
  const belt = (f - straight24) / 3
  // # D) vesting walk
  const walk = span(f, leave25, early25 + 30)
  const jD: Beat[] = [[CD, 'idle', 'neutral'], [waiting25, 'think', 'thinking'], [leave25, 'walkA', 'neutral', 'walkB', 14], [stay25, 'shock', 'worried'], [own26, 'hold', 'smiling'], [belong26, 'thumbsUp', 'smiling']]
  // # E) the ceiling
  const rise = span(f, most27, n24500 + 10)

  return (
    <g>
      <Office id="rt-k" f={f} floor={G} desk={false} />
      {/* # A) the 401(k) box */}
      {A > 0 && <g opacity={A}>
        <g opacity={on(f, is17 - 4, 10)}><Box x={760} y={G} s={1.05} tag="401(K)" tagColor={R.gold} glow={on(f, box17, 10)} /></g>
        <g opacity={on(f, employer17, 8)}><Label x={760} y={G + 60} text={f >= offers17 ? 'OFFERED AT WORK' : 'YOUR EMPLOYER'} size={40} /></g>
        <g opacity={on(f, name17 - 4, 10)} transform={`translate(1250 ${G - 330}) rotate(4)`}>
          <rect x={-220} y={-200} width={440} height={340} rx={14} fill={R.paper} stroke={R.ink} strokeOpacity={0.2} strokeWidth={3} />
          {Array.from({ length: 6 }, (_, k) => <rect key={k} x={-180} y={-140 + k * 40} width={360} height={10} rx={5} fill={R.grey} opacity={0.5} />)}
          <rect x={-190} y={-14 - 8 * pop(f, section17, 12)} width={380} height={70} rx={10} fill={R.gold} opacity={on(f, section17, 8)} />
          <text y={36 - 8 * pop(f, section17, 12)} textAnchor="middle" fill={R.ink} style={BB(52)} opacity={on(f, section17, 8)}>SECTION 401(K)</text>
          <text y={-160} textAnchor="middle" fill={R.slate} style={BB(34)}>{f >= code17 ? 'US TAX CODE' : 'TAX CODE'}</text>
        </g>
        <g opacity={on(f, strange17, 8) * (1 - on(f, section17, 8))}><Label x={1380} y={G - 40} text="WHY THE STRANGE NAME?" size={40} /></g>
      </g>}
      {/* # B) Jordan, the offer and the match */}
      {B > 0 && <g opacity={B}>
        <Person f={f} who="investor" beats={jB} x={300} y={G + 10} s={0.95} />
        <Person f={f} who="owner" beats={bossB} x={1700} y={G + 10} s={0.9} />
        <g opacity={on(f, madeup18, 8) * (1 - on(f, company19, 8))}><Label x={300} y={G - 420} text={f >= n46k ? 'JORDAN · 27 · $46,000' : f >= n27 ? 'JORDAN · 27' : 'JORDAN (MADE UP)'} size={40} /></g>
        <g opacity={on(f, offer19, 8) * (1 - on(f, n2760 - 4, 8))} transform={`translate(1150 300) scale(${1 + 0.06 * pop(f, every19, 12)})`}>
          <rect x={-250} y={-80} width={500} height={160} rx={20} fill={R.forest} />
          <text y={-14} textAnchor="middle" fill={R.paper} style={BB(46)}>{f >= n6 ? 'YOU PUT IN UP TO 6%' : 'THE OFFER'}</text>
          <text y={50} textAnchor="middle" fill={R.gold} style={BB(46)}>{f >= n50 ? '+50¢ FOR EVERY $1' : ''}</text>
        </g>
        {/* Jordan's paycheck: 6 % of $46,000 */}
        <g opacity={win(f, n6b, n2760 + 10, 6)}><Check x={560} y={G - 470 - 8 * pop(f, n46kb, 12)} s={0.7} amount="$46,000" /><Label x={560} y={G - 370} text="6% OF IT" size={34} o={on(f, n6b, 8)} /></g>
        {/* the 6 % box */}
        <g transform={`translate(${lerp(960, 760, small)} 0)`}>
          <Box x={0} y={G} s={0.95} tag={small > 0.5 ? '6%' : '401(K)'} tagColor={R.gold}>
            <Stack x={0} y={-50} own={ownIn} co={coIn} />
          </Box>
          <g opacity={on(f, n2760, 8)}><Label x={0} y={G - 560} text="$2,760 FROM JORDAN" size={34} fill={R.leaf} /></g>
          <g opacity={on(f, n1380, 8)}><Label x={0} y={G - 500} text="+$1,380 COMPANY" size={34} fill={R.gold} /></g>
        </g>
        {f >= added20 && f < top20 + 20 && [0, 1, 2].map((k) => { const t = span(f, added20 + k * 4, added20 + k * 4 + 16); return <Coin key={k} x={lerp(1640, 960, t)} y={lerp(600, 560, t) - 100 * Math.sin(Math.PI * t)} s={0.8} o={t > 0 && t < 1 ? 1 : 0} /> })}
        {/* the 3 % box */}
        <g opacity={on(f, only21, 10)} transform={`translate(0 ${-10 * pop(f, n3, 12)})`}>
          <Box x={1300} y={G} s={0.95} tag="3%" tagColor={R.paper}><Stack x={0} y={-50} own={f >= n1380b ? 4 : 0} co={f >= n690 ? 2 : 0} left={f >= leave22 ? 2 : 0} /></Box>
          <g opacity={on(f, n1380b, 8)}><Label x={1300} y={G - 560} text="$1,380 FROM JORDAN" size={34} fill={R.leaf} /></g>
          <g opacity={on(f, n690, 8)}><Label x={1300} y={G - 500} text="+$690 COMPANY" size={34} fill={R.gold} /></g>
          <g opacity={on(f, other22, 8)}><Label x={1300} y={G + 60} text={f >= every22 ? '$690 LEFT BEHIND, EVERY YEAR' : '$690 LEFT BEHIND'} size={36} fill={R.red} ink={R.paper} /></g>
        </g>
      </g>}
      {/* # C) the match, and saving on autopilot */}
      {Cc > 0 && <g opacity={Cc}>
        <Person f={f} who="investor" beats={[[BC, 'explain', 'smiling'], [gets23, 'point', 'neutral'], [putting23, 'carry', 'neutral'], [sees24, 'relax', 'smiling'], [autopilot24, 'thumbsUp', 'smiling']]} x={300} y={G + 10} s={0.95} />
        <Box x={1100} y={G} s={1} tag={f >= match23 ? 'THE MATCH' : '401(K)'} tagColor={R.gold}><Stack x={0} y={-50} own={4 + 2 * span(f, straight24, autopilot24)} co={2 + 1 * span(f, straight24, autopilot24)} /></Box>
        <g opacity={on(f, part23, 8) * (1 - on(f, straight24, 8))}><Label x={1100} y={G + 60} text={f >= first23 ? 'ONLY IF JORDAN PUTS MONEY IN FIRST' : "PART OF JORDAN'S PAY"} size={38} /></g>
        <g opacity={on(f, straight24 - 4, 10)}>
          <rect x={400} y={300} width={1400} height={30} rx={15} fill={R.slateD} />
          {[0, 1, 2, 3].map((k) => { const x = 400 + (((belt + k * 25) % 100) / 100) * 1400; return <g key={k}><Check x={x} y={250} s={0.45} amount="PAY" />{Math.abs(x - 1100) < 90 && <Coin x={1100} y={lerp(340, G - 200, (Math.abs(x - 1100)) / 90)} s={0.5} />}</g> })}
          <Label x={1100} y={G + 60} text={f >= autopilot24 ? 'SAVING ON AUTOPILOT' : 'STRAIGHT FROM EACH PAYCHECK'} size={40} fill={R.forest} ink={R.paper} />
        </g>
      </g>}
      {/* # D) vesting */}
      {D > 0 && <g opacity={D}>
        <Box x={960} y={G} s={1.05} tag="401(K)" tagColor={R.gold}>
          <Stack x={0} y={-50} own={4} co={f >= stay25 ? 3 : 3} />
        </Box>
        <g opacity={on(f, waiting25, 10)}><Lock x={1120} y={G - 200} s={0.75} text={f >= vesting25 ? 'VESTING' : 'WAIT'} /></g>
        <g opacity={on(f, part25, 8) * (1 - on(f, leave25, 8))}><Label x={960} y={G + 60} text="THE COMPANY'S PART" size={40} fill={R.gold} /></g>
        <Person f={f} who="investor" beats={jD} x={lerp(600, 1650, walk)} y={G + 10} s={0.9} />
        {/* Jordan's own coins go along */}
        <g opacity={on(f, own26, 8)}>{[0, 1, 2].map((k) => <ellipse key={k} cx={lerp(600, 1650, walk) + 110} cy={G - 360 - k * 16} rx={50} ry={10} fill={R.leaf} stroke={R.forestD} strokeWidth={3} />)}</g>
        <g opacity={on(f, stay25, 8) * (1 - on(f, own26, 8))}><Label x={960} y={G + 60} text="SOME COMPANY MONEY STAYS BEHIND" size={38} fill={R.red} ink={R.paper} /></g>
        <g opacity={on(f, contributions26, 8)}><Label x={1300} y={300} text={f >= always26 ? "JORDAN'S OWN MONEY: ALWAYS JORDAN'S" : "JORDAN'S OWN MONEY"} size={42} fill={R.forest} ink={R.paper} /></g>
      </g>}
      {/* # E) the ceiling */}
      {E > 0 && <g opacity={E}>
        <Person f={f} who="investor" beats={[[DE - 20, 'idle', 'neutral'], [c("s27:there's"), 'pointUp', 'neutral'], [n24500, 'reachUp', 'shocked'], [n50b, 'explain', 'smiling']]} x={360} y={G + 10} s={0.95} />
        <g transform={`translate(1100 ${G})`}>
          {Array.from({ length: Math.round(28 * rise) }, (_, k) => <ellipse key={k} cx={0} cy={-k * 20} rx={110} ry={18} fill={k % 2 ? R.leaf : R.forest} stroke={R.forestD} strokeWidth={3} />)}
          <rect x={-260} y={-600} width={520} height={20} rx={10} fill={R.red} opacity={on(f, ceiling27, 8)} />
          <g opacity={on(f, n24500, 8)}><Label x={0} y={-650} text={f >= y2026 ? '2026: $24,500 OF YOUR PAY' : ''} size={44} fill={R.red} ink={R.paper} /></g>
          <rect x={-260} y={-760} width={520} height={14} rx={7} fill={R.brass} opacity={on(f, n32500, 8)} />
          <g opacity={on(f, n32500, 8)}><Label x={0} y={-810} text={f >= age27 ? '$32,500 FROM AGE 50' : '$32,500'} size={40} /></g>
        </g>
        <g opacity={on(f, own27, 8) * (1 - on(f, n32500, 8))}><Label x={1100} y={G + 60} text="FROM JORDAN'S OWN PAY" size={38} /></g>
      </g>}
      {/* # F) no 401(k)? */}
      {F > 0 && <g opacity={F}>
        <Person f={f} who="worker" beats={[[EF, 'shrug', 'worried'], [second28, 'point', 'thinking']]} x={420} y={G + 10} s={0.95} />
        <g opacity={on(f, job28, 10)}><Box x={960} y={G} s={0.9} tag="401(K)" /><No x={960} y={G - 260} r={140} o={on(f, k401b, 8)} /></g>
        <g opacity={on(f, second28 - 4, 10)}><Box x={1500} y={G} s={0.9} tag="?" glow={on(f, box28, 10)} /></g>
        <g opacity={on(f, happens28, 8)}><Label x={1220} y={300} text="NO 401(K) AT YOUR JOB?" size={50} /></g>
      </g>}
      <Headline f={f} lines={[[is17, 'STEP 2: THE 401(K)', R.ink, 100], [meet18, "JORDAN'S MATCH", R.ink, 100], [called23, 'THE MATCH', R.ink, 100], [catch25, 'ONE CATCH: VESTING', R.ink, 96], [ceiling27, 'THE CEILING', R.ink, 100], [not28, 'NO 401(K)?', R.ink, 100]]} />
    </g>
  )
}

export const RT_K401 = makePiece('rt-k401', "Step two, the 401(k) and the match: a glass box labelled 401(K) appears in Jordan's office, offered at work, and a tax-code page highlights SECTION 401(K); Jordan (made up, 27, 46,000 dollars) waves; the boss holds up the offer (you put in up to 6 percent, +50 cents for every dollar); green coins (2,760 from Jordan) stack into the box and gold coins (+1,380 from the company) fly on top; a 3 percent box beside it gets only 1,380 + 690 and a dashed pile of 690 is left behind every year; a payroll belt carries paychecks past the box and a coin drops in from each (saving on autopilot); vesting: a timed lock on the company's coins, Jordan walks away early and some company money stays behind while Jordan's own green coins go along; a coin tower rises to a red ceiling bar (2026: 24,500 dollars, 32,500 from age 50); a worker with no 401(k) at their job, the box crossed, a second empty box with a question mark", {
  mood: 'light', Component: K401,
  beats: ["s17:is", "s17:box", "s17:employer", "s17:offers", "s17:strange", "s17:name", "s17:section", "s17:code", "s18:meet", "s18:madeup", "s18:27", "s18:46000", "s19:jordan's", "s19:offer", "s19:6", "s19:50", "s19:every", "s20:6", "s20:2760", "s20:1380", "s20:added", "s20:top", "s21:compare", "s21:only", "s21:3", "s21:1380", "s21:690", "s22:leave", "s22:other", "s22:behind", "s22:every", "s23:called", "s23:match", "s23:part", "s23:gets", "s23:putting", "s23:first", "s24:straight", "s24:sees", "s24:autopilot", "s25:catch", "s25:part", "s25:waiting", "s25:vesting", "s25:leave", "s25:early", "s25:stay", "s26:own", "s26:contributions", "s26:always", "s26:belong", "s27:ceiling", "s27:2026", "s27:most", "s27:own", "s27:24500", "s27:32500", "s27:age", "s27:50", "s28:not", "s28:job", "s28:401k", "s28:happens", "s28:second", "s28:box", "s27:there's", "s20:46000"],
  sfx: [['s20:2760', 'coin', 0.1], ['s20:1380', 'cash', 0.1], ['s22:690', 'thud', 0.1], ['s27:24500', 'tick', 0.1]] })
