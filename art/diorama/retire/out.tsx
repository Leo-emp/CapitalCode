// ---------------------------------------------------------------- s53–s61: step five, getting money out (the greenhouse garden path).
// A) The box with red strings tied round it (strings attached: timing).
// B) An age path from 30 to 75 with a gate at 59½; Jordan pulls coins out of the box early at 35 — an extra 10 % TAX
//    envelope takes its share: $5,000 → $500 extra, plus income tax on traditional.
// C) Exceptions: a disability sign and a baby stroller (birth or adoption, up to $5,000) open the gate.
// D) The Roth rule: two locks on the Roth box — 59½ and 5 YEARS — while Jordan's own green contribution coins come
//    out freely any time.
// E) At 73 an alarm clock rings on the TRADITIONAL box (start taking money out); the ROTH box has none.
// F) A coin leaves a 401(k) box and loops back (a loan; rules depend on the plan).
// G) Why: a handshake — a tax break in exchange for keeping the money for later.
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { BB, Box, Clock, Coin, GreenRoom, Label, Lock, No, Plant, R, TaxBox } from './kit'

const G = 920

const Out: React.FC<PieceProps> = ({ f, c }) => {
  const tax53 = c('s53:tax'), break53 = c('s53:break'), strings53 = c('s53:strings'), attached53 = c('s53:attached'), mostly53 = c('s53:mostly'), timing53 = c('s53:timing')
  const take54 = c('s54:take'), before54 = c('s54:before'), age54 = c('s54:age'), n59 = c('s54:59'), half54 = c('s54:half'), extra54 = c('s54:extra'), n10 = c('s54:10'), top54 = c('s54:top'), unless54 = c('s54:unless'), exception54 = c('s54:exception')
  const pulled55 = c('s55:pulled'), n5000 = c('s55:5000'), early55 = c('s55:early'), n500 = c('s55:500'), plus55 = c('s55:plus'), regular55 = c('s55:regular'), income55 = c('s55:income'), traditional55 = c('s55:traditional')
  const exceptions56 = c('s56:exceptions'), disability56 = c('s56:disability'), n5000b = c('s56:5000'), birth56 = c('s56:birth'), adoption56 = c('s56:adoption'), child56 = c('s56:child')
  const roth57 = c('s57:roth'), rule57 = c('s57:rule'), growth57 = c('s57:growth'), taxfree57 = c('s57:taxfree'), n59b = c('s57:59'), half57 = c('s57:half'), account57 = c('s57:account'), five57 = c('s57:five'), old57 = c('s57:old')
  const money58 = c('s58:money'), roth58 = c('s58:roth'), yourself58 = c('s58:yourself'), back58 = c('s58:back'), any58 = c('s58:any'), time58 = c('s58:time'), penalty58 = c('s58:penalty')
  const other59 = c('s59:other'), traditional59 = c('s59:traditional'), start59 = c('s59:start'), taking59 = c('s59:taking'), n73 = c('s59:73'), roth59 = c('s59:roth'), dont59 = c("s59:don't"), alive59 = c('s59:alive')
  const k401 = c('s60:401k'), borrow60 = c('s60:borrow'), balance60 = c('s60:balance'), back60 = c('s60:back'), rules60 = c('s60:rules'), plan60 = c('s60:plan')
  const why61 = c('s61:why'), strings61 = c('s61:strings'), government61 = c('s61:government'), giving61 = c('s61:giving'), exchange61 = c('s61:exchange'), keeping61 = c('s61:keeping'), later61 = c('s61:later')

  const AB = take54 - 4, BC = exceptions56 - 4, CD = roth57 - 4, DE = other59 - 4, EF = k401 - 4, FG = why61 - 4
  const A = win(f, 0, AB), B = win(f, AB - 8, BC), Cc = win(f, BC - 8, CD), D = win(f, CD - 8, DE), E = win(f, DE - 8, EF), F = win(f, EF - 8, FG), Gg = on(f, FG - 8, 10)
  const AX = (age: number) => 300 + (age - 30) * 30 // the age path, 30 → 75 across 1,350 px
  const jB: Beat[] = [[AB, 'explain', 'neutral'], [before54, 'point', 'neutral'], [extra54, 'shock', 'worried'], [pulled55, 'pull', 'neutral'], [n500, 'facepalm', 'worried'], [regular55, 'shrug', 'worried']]

  return (
    <g>
      <GreenRoom id="rt-o" f={f} mood="day" floor={G} />
      {/* # A) strings attached */}
      {A > 0 && <g opacity={A}>
        <Box x={960} y={G} s={1.15}><Plant x={-60} y={-30} s={1} grow={0.8} f={f} /><Plant x={90} y={-30} s={0.85} grow={0.6} f={f} leaves={R.leafL} /></Box>
        <g opacity={on(f, strings53, 10)}>{[-1, 1].map((k) => <path key={k} d={`M${960 + k * 240} ${G - 20} Q${960 + k * 120} ${G - 300} ${960} ${G - 470}`} fill="none" stroke={R.red} strokeWidth={10} strokeDasharray={`${1200 * on(f, strings53, 16)} 2000`} />)}<path d="M930 450 Q960 410 990 450 Q960 490 930 450 Z" fill={R.red} opacity={on(f, attached53, 8)} /></g>
        <g opacity={on(f, break53, 8) * (1 - on(f, strings53, 8))}><Label x={960} y={260} text="THE TAX BREAK…" size={50} /></g>
        <g opacity={on(f, mostly53, 8)}><Clock x={1400} y={420} s={0.7} f={f} ring={on(f, timing53, 8)} /><Label x={1400} y={600} text="IT'S ABOUT TIMING" size={40} /></g>
      </g>}
      {/* # B) early: the extra 10 % */}
      {B > 0 && <g opacity={B}>
        <g transform={`translate(0 ${G - 60})`}>
          <rect x={AX(30)} y={0} width={AX(75) - AX(30)} height={18} rx={9} fill={R.sand} />
          {[30, 40, 50, 60, 70].map((a) => <text key={a} x={AX(a)} y={60} textAnchor="middle" fill={R.ink2} style={BB(34)}>{a}</text>)}
          <g opacity={on(f, n59, 8)} transform={`translate(${AX(59.5)} 0)`}><rect x={-12} y={-260} width={24} height={270} fill={R.brassD} /><rect x={-70} y={-300} width={140} height={60} rx={12} fill={R.forest} /><text y={-258} textAnchor="middle" fill={R.paper} style={BB(40)}>59½</text></g>
        </g>
        <Person f={f} who="investor" beats={jB} x={AX(35)} y={G - 50} s={0.8} />
        <g opacity={on(f, pulled55 - 4, 10)}><Box x={AX(35) + 300} y={G - 70} s={0.55} door="out"><Plant x={0} y={-30} s={0.8} grow={0.7} f={f} /></Box></g>
        <g opacity={on(f, n5000, 8)}><Coin x={lerp(AX(35) + 300, AX(35) + 140, span(f, n5000, early55))} y={G - 360} s={1.4} text="$5,000" /></g>
        <g opacity={on(f, extra54 - 4, 10)} transform={`translate(0 ${-10 * pop(f, c('s55:extra'), 12)})`}><TaxBox x={1350} y={360} s={1.1} text={f >= n10 ? '+10%' : 'EXTRA'} /></g>
        <g opacity={on(f, n500, 8)}><Coin x={lerp(AX(35) + 140, 1350, span(f, n500, n500 + 16))} y={lerp(G - 360, 360, span(f, n500, n500 + 16))} s={0.9} text="$500" /></g>
        <g opacity={on(f, unless54, 8) * (1 - on(f, pulled55, 8))}><Label x={1350} y={520} text={f >= exception54 ? 'UNLESS AN EXCEPTION APPLIES' : 'BEFORE 59½'} size={38} /></g>
        <g opacity={on(f, plus55, 8)}><Label x={1350} y={520} text={f >= traditional55 ? '+ INCOME TAX (TRADITIONAL)' : '+ INCOME TAX'} size={38} fill={R.grey} ink={R.paper} /></g>
      </g>}
      {/* # C) exceptions */}
      {Cc > 0 && <g opacity={Cc}>
        <g transform={`translate(960 ${G})`}><rect x={-14} y={-360} width={28} height={360} fill={R.brassD} /><g transform={`translate(-14 0) scale(${1 - 0.75 * on(f, disability56, 16)} 1)`}><rect x={-260} y={-330} width={246} height={300} rx={10} fill="none" stroke={R.brassD} strokeWidth={12} />{[0, 1, 2].map((k) => <rect key={k} x={-250 + k * 80} y={-320} width={10} height={280} fill={R.brassD} />)}</g><Label x={-130} y={60} text="THE 59½ GATE" size={34} /></g>
        <g opacity={on(f, disability56, 8)} transform="translate(560 560)"><circle r={110} fill={R.slate} /><circle cy={-50} r={18} fill={R.paper} /><path d="M-10 -26 L-10 20 L30 20 L50 60 M-10 0 L30 0" fill="none" stroke={R.paper} strokeWidth={12} strokeLinecap="round" /><circle cx={0} cy={40} r={40} fill="none" stroke={R.paper} strokeWidth={10} /><Label x={0} y={170} text="DISABILITY" size={36} /></g>
        <g opacity={on(f, birth56 - 4, 10)} transform="translate(1380 640)"><path d="M-110 -40 Q-110 -140 0 -140 L0 -40 Z" fill={R.pot} /><rect x={-110} y={-40} width={200} height={70} rx={16} fill={R.pot} /><circle cx={-70} cy={60} r={26} fill={R.ink} /><circle cx={60} cy={60} r={26} fill={R.ink} /><path d="M90 -40 L140 -110" stroke={R.ink} strokeWidth={10} strokeLinecap="round" />
          <Label x={0} y={140} text={f >= adoption56 ? 'BIRTH OR ADOPTION: UP TO $5,000' : 'UP TO $5,000'} size={34} o={on(f, n5000b, 8)} /></g>
        <g opacity={on(f, exceptions56, 8)}><Label x={960} y={260} text="THERE ARE EXCEPTIONS" size={50} /></g>
      </g>}
      {/* # D) the Roth rule */}
      {D > 0 && <g opacity={D}>
        <Person f={f} who="investor" beats={[[CD, 'explain', 'neutral'], [c('s57:need'), 'pointUp', 'neutral'], [n59b, 'countOne', 'neutral'], [account57, 'point', 'neutral'], [five57, 'pointUp', 'neutral'], [yourself58, 'receive', 'smiling'], [penalty58, 'thumbsUp', 'smiling']]} x={320} y={G + 10} s={0.95} />
        <Box x={1050} y={G} s={1.05} tag="ROTH" tagColor={R.gold} door="out" glow={win(f, taxfree57, n59b, 6) + win(f, account57, five57, 6)}><Plant x={0} y={-30} s={1 + 0.06 * pop(f, taxfree57, 14)} grow={0.85} f={f} /></Box>
        <g opacity={on(f, n59b - 4, 10) * (1 - on(f, money58, 8))}><Lock x={1380} y={G - 380 - 10 * pop(f, half57, 12)} s={0.8} text="59½" /></g>
        <g opacity={on(f, five57 - 4, 10) * (1 - on(f, money58, 8))}><Lock x={1600} y={G - 380} s={0.8} text="5 YRS" /></g>
        <g opacity={on(f, growth57, 8) * (1 - on(f, money58, 8))}><Label x={1490} y={G - 160} text={f >= old57 ? 'FOR THE GROWTH TO COME OUT TAX-FREE' : 'THE GROWTH'} size={34} fill={R.forest} ink={R.paper} /></g>
        <g opacity={on(f, money58, 10)}>
          {[0, 1, 2].map((k) => { const t = span(f, back58 + k * 4, back58 + k * 4 + 20); return <ellipse key={k} cx={lerp(1270, 1560, t)} cy={G - 120 - k * 18 - 140 * Math.sin(Math.PI * t * 0.5)} rx={60} ry={12} fill={R.leaf} stroke={R.forestD} strokeWidth={3} /> })}
          <Label x={1490} y={G - 340} text={f >= any58 ? 'YOUR OWN ROTH IRA MONEY: ANY TIME' : 'WHAT YOU PUT IN YOURSELF'} size={36} fill={R.forest} ink={R.paper} />
          <g opacity={on(f, penalty58, 8)}><Label x={1490} y={G - 260} text="NO TAX, NO PENALTY" size={34} /></g>
        </g>
      </g>}
      {/* # E) the other end: 73 */}
      {E > 0 && <g opacity={E}>
        <Box x={620} y={G} s={1} tag="TRADITIONAL" door="out"><Plant x={0} y={-30} s={1} grow={0.95} f={f} /></Box>
        <Box x={1300} y={G} s={1} tag="ROTH" tagColor={R.gold} door="out"><Plant x={0} y={-30} s={1} grow={0.95} f={f} /></Box>
        <g opacity={on(f, n73 - 6, 10)}><Clock x={880} y={420} s={0.8} text="73" f={f} ring={on(f, n73, 8) * (1 - on(f, roth59, 8))} /></g>
        <g opacity={on(f, start59, 8)}><Label x={620} y={G + 60} text={f >= taking59 ? 'MUST START TAKING MONEY OUT' : 'TRADITIONAL'} size={36} fill={R.red} ink={R.paper} /></g>
        <g opacity={on(f, dont59, 8)}><Label x={1300} y={G + 60} text={f >= alive59 ? 'NO RULE WHILE YOU ARE ALIVE' : "ROTH: DOESN'T"} size={36} fill={R.forest} ink={R.paper} /><No x={1560} y={420} r={80} o={on(f, dont59, 8)} /><Clock x={1560} y={420} s={0.45} text="" f={f} /></g>
        <g opacity={on(f, other59, 8) * (1 - on(f, n73, 8))}><Label x={960} y={260} text="AT THE OTHER END" size={50} /></g>
      </g>}
      {/* # F) a 401(k) loan */}
      {F > 0 && <g opacity={F}>
        <Box x={960} y={G} s={1} tag="401(K)" tagColor={R.gold} door="out"><Plant x={0} y={-30} s={1} grow={0.8} f={f} /></Box>
        {f >= borrow60 && (() => { const t = span(f, borrow60, back60 + 30), a = Math.PI * 2 * t; return <Coin x={960 + 360 * Math.sin(a)} y={520 - 160 * Math.cos(a) + 160} s={1} text="LOAN" /> })()}
        <g opacity={on(f, borrow60, 8)}><path d="M1200 360 A360 160 0 1 1 1199 360" fill="none" stroke={R.forest} strokeWidth={6} strokeDasharray="20 14" opacity={0.6} transform="translate(-240 0)" /></g>
        <g opacity={on(f, k401, 8)}><Label x={960} y={260} text={f >= balance60 ? 'BORROW FROM YOUR OWN BALANCE' : 'SOME 401(K) PLANS'} size={44} /></g>
        <g opacity={on(f, rules60, 8)}><Label x={960} y={G + 60} text={f >= plan60 ? 'RULES DEPEND ON THE PLAN' : 'THE RULES…'} size={40} /></g>
      </g>}
      {/* # G) the deal */}
      {Gg > 0 && <g opacity={Gg}>
        <Person f={f} who="investor" beats={[[FG, 'think', 'thinking'], [giving61, 'handshake', 'smiling']]} x={760} y={G + 10} s={0.95} />
        <Person f={f} who="owner" beats={[[FG, 'idle', 'neutral'], [giving61, 'handshake', 'smiling']]} x={1160} y={G + 10} s={0.95} flip />
        <g opacity={on(f, government61, 8)}><Label x={1160} y={G - 440} text="THE GOVERNMENT" size={38} /></g>
        <g opacity={on(f, exchange61, 8)}><Label x={960} y={260} text={f >= keeping61 ? 'A TAX BREAK ⇄ KEEP IT FOR LATER' : 'A TAX BREAK…'} size={48} fill={R.forest} ink={R.paper} /></g>
        <g opacity={on(f, strings61, 8) * (1 - on(f, exchange61, 8))}><Label x={960} y={260} text="WHY ALL THE STRINGS?" size={50} /></g>
      </g>}
      <Headline f={f} lines={[[tax53, 'STEP 5: GETTING MONEY OUT', R.ink, 92], [take54, 'BEFORE 59½', R.ink, 100], [exceptions56, 'EXCEPTIONS', R.ink, 100], [roth57, "ROTH'S OWN RULE", R.ink, 100], [other59, 'AT 73', R.ink, 100], [k401, 'A 401(K) LOAN', R.ink, 100], [why61, 'THE DEAL', R.ink, 100]]} />
    </g>
  )
}

export const RT_OUT = makePiece('rt-out', "Step five, getting money out: the greenhouse box gets red strings tied around it and an alarm clock rings (it's about timing); an age path from 30 to 75 with a brass gate at 59 and a half, Jordan at 35 pulls a 5,000-dollar coin out of the box and 500 dollars flies into a +10% TAX envelope, plus income tax on traditional; exceptions swing the gate open: a disability sign and a baby stroller (birth or adoption, up to 5,000 dollars); the Roth box gets two locks, 59 and a half and 5 years, for the growth to come out tax-free, while Jordan's own green contribution coins come out any time with no tax or penalty; at the other end an alarm clock at 73 rings on the traditional box (must start taking money out) while the Roth box has none (crossed); a LOAN coin loops out of a 401(k) box and back (rules depend on the plan); Jordan shakes hands with the government: a tax break in exchange for keeping the money for later", {
  mood: 'light', Component: Out,
  beats: ["s53:break", "s53:strings", "s53:attached", "s53:mostly", "s53:timing", "s54:take", "s54:before", "s54:59", "s54:extra", "s54:10", "s54:unless", "s54:exception", "s55:pulled", "s55:5000", "s55:early", "s55:500", "s55:plus", "s55:regular", "s55:traditional", "s56:exceptions", "s56:disability", "s56:5000", "s56:birth", "s56:adoption", "s57:roth", "s57:growth", "s57:taxfree", "s57:59", "s57:half", "s57:account", "s57:five", "s57:old", "s58:money", "s58:yourself", "s58:back", "s58:any", "s58:penalty", "s59:other", "s59:start", "s59:taking", "s59:73", "s59:roth", "s59:don't", "s59:alive", "s60:401k", "s60:borrow", "s60:balance", "s60:back", "s60:rules", "s60:plan", "s61:why", "s61:strings", "s61:government", "s61:giving", "s61:exchange", "s61:keeping", "s55:extra", "s57:need"],
  sfx: [['s54:10', 'thud', 0.1], ['s55:500', 'coin', 0.1], ['s59:73', 'ding', 0.1], ['s61:giving', 'softpop', 0.1]] })
