// ---------------------------------------------------------------- s37–s45: step four, why the goal isn't zero (the Fed's thermostat room).
// A) A stately room with columns; a giant brass thermostat on the wall; a Fed official (investorF) turns it; the needle
//    swings past ZERO and settles on the green 2 % notch.
// B) TOO HOT: the room glows orange, the needle swings to 15 %, a 1980 tag; TOO COLD: the room turns icy blue, the needle
//    drops below zero: DEFLATION.
// C) Why falling prices hurt: a TV in a shop window, its tag falling ($500 → $450 NEXT MONTH); a shopper waits (arms
//    crossed), three more shoppers wait; the shop's sign flips to CLOSED, two workers walk off; the tag falls again.
//    Then a backpack labelled DEBT on a shopper grows heavier while their pay coin shrinks.
// D) Back to the thermostat: needle at 2 %, a soft cushion between 0 and 2; a calm calendar with a gentle arrow
//    (plan saving, borrowing, spending); then the needle swings into the red again (2022) and the official looks worried.
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { BB, Coin, FedRoom, K, Label, Tag, Thermostat, TV } from './kit'

const G = 930

const Goal: React.FC<PieceProps> = ({ f, c }) => {
  const federal37 = c('s37:federal'), central37 = c('s37:central'), target37 = c('s37:target'), isnt37 = c('s37:isn\'t'), zero37 = c('s37:zero'), n2 = c('s37:2'), year37 = c('s37:year')
  const thermostat38 = c('s38:thermostat'), hot38 = c('s38:hot'), run38 = c('s38:run'), y1980 = c('s38:1980'), rose38 = c('s38:rose'), n15 = c('s38:15')
  const cold39 = c('s39:cold'), slide39 = c('s39:slide'), opposite39 = c('s39:opposite'), falling39 = c('s39:falling'), deflation39 = c('s39:deflation')
  const great40 = c('s40:great'), until40 = c('s40:until'), do40 = c('s40:do')
  const tv41 = c('s41:tv'), cheaper41 = c('s41:cheaper'), wait41 = c('s41:wait'), everyone41 = c('s41:everyone'), stores41 = c('s41:stores'), less41 = c('s41:less'), cut41 = c('s41:cut'), jobs41 = c('s41:jobs'), fall41 = c('s41:fall'), further41 = c('s41:further')
  const debts42 = c('s42:debts'), heavier42 = c('s42:heavier'), owe42 = c('s42:owe'), same42 = c('s42:same'), harder42 = c('s42:harder'), earn42 = c('s42:earn'), falling42 = c('s42:falling')
  const fed43 = c('s43:fed'), above43 = c('s43:above'), n2b = c('s43:2'), slow43 = c('s43:slow'), barely43 = c('s43:barely'), cushion43 = c('s43:cushion'), deflation43 = c('s43:deflation')
  const trust44 = c('s44:trust'), slowly44 = c('s44:slowly'), steadily44 = c('s44:steadily'), plan44 = c('s44:plan'), saving44 = c('s44:saving'), borrowing44 = c('s44:borrowing'), spending44 = c('s44:spending')
  const thermostat45 = c('s45:thermostat'), hot45 = c('s45:hot'), y2022 = c('s45:2022'), cool45 = c('s45:cool'), down45 = c('s45:down')

  const AB = thermostat38 - 4, BC = great40 - 4, CD = fed43 - 4
  const A = win(f, 0, AB), B = win(f, AB - 8, BC), Cc = win(f, BC - 8, CD), D = on(f, CD - 8, 10)
  const tint = f >= cold39 && f < great40 ? 'cold' : f >= hot38 && f < cold39 ? 'hot' : f >= hot45 && f >= CD ? 'hot' : 'calm'

  // # the needle
  const needle = (() => {
    if (f < zero37) return 6
    if (f < n2) return lerp(6, 0, span(f, zero37 - 6, zero37 + 6))
    if (f < hot38) return lerp(0, 2, span(f, n2, n2 + 10)) + 0.15 * Math.sin(f / 6)
    if (f < cold39) return lerp(2, 15, span(f, hot38, n15 + 6))
    if (f < great40) return lerp(15, -1.5, span(f, cold39, deflation39 + 6))
    return -1.5
  })()
  const needle2 = f < hot45 ? lerp(-1.5, 2, span(f, CD, n2b + 8)) + 0.1 * Math.sin(f / 7) : lerp(2, 9.1, span(f, hot45, y2022 + 8))
  const oBeats: Beat[] = [[0, 'idle', 'neutral'], [target37, 'point', 'neutral'], [isnt37, 'crossNoA', 'neutral', 'crossNoB', 12], [n2, 'thumbsUp', 'smiling'], [hot38, 'shock', 'worried'], [cold39, 'nervous', 'worried']]
  const runs45 = c('s45:runs')
  const o2Beats: Beat[] = [[runs45, 'nervous', 'worried'], [CD, 'explain', 'smiling'], [cushion43, 'present', 'smiling'], [plan44, 'thumbsUp', 'smiling'], [hot45, 'shock', 'worried'], [cool45, 'think', 'thinking']]
  // # C) the shop and the waiting crowd
  const tvPrice = f < cheaper41 ? 500 : f < fall41 ? 450 : lerp(450, 400, span(f, fall41, further41 + 8))
  const closed = on(f, stores41, 10)
  const debtS = 1 + 0.5 * span(f, heavier42, owe42 + 10)
  const coinS = 1 - 0.45 * span(f, harder42, falling42 + 10)

  return (
    <g>
      <FedRoom id="in-g" f={f} tint={tint as 'calm' | 'hot' | 'cold'} floor={G} />
      {/* frost and heat effects on the walls */}
      {tint === 'cold' && <g opacity={0.5}>{Array.from({ length: 14 }, (_, k) => <path key={k} transform={`translate(${100 + k * 140} ${120 + (k % 3) * 60})`} d="M0 -30 L0 30 M-26 -15 L26 15 M-26 15 L26 -15" stroke="#FFFFFF" strokeWidth={6} strokeLinecap="round" />)}</g>}
      {f >= run38 && f < cold39 && [0, 1, 2, 3].map((k) => { const t = span(f, run38 + k * 3, run38 + k * 3 + 26); return <Tag key={k} x={1150 + (k - 1.5) * 150} y={260 - 240 * t} s={0.6} text="$" color={K.coral} o={(1 - t) * on(f, run38 + k * 3, 6)} r={k % 2 ? 10 : -10} /> })}
      {tint === 'hot' && <g opacity={0.35}>{Array.from({ length: 8 }, (_, k) => <path key={k} d={`M${100 + k * 250} ${G} q20 -60 0 -120 q-20 -60 0 -120`} fill="none" stroke={K.fire} strokeWidth={10} transform={`translate(0 ${-10 * Math.sin(f / 8 + k)})`} />)}</g>}
      {/* # A + B) the thermostat */}
      {(A > 0 || B > 0) && <g opacity={Math.max(A, B)}>
        <Person f={f} who="investorF" beats={oBeats} x={360} y={G + 20} s={0.95} />
        <g opacity={on(f, federal37 - 4, 10)}><Thermostat x={1150} y={470} s={1.15} value={needle} goal={on(f, n2, 10)} text={f >= n2 ? (f >= hot38 && f < cold39 ? (f >= n15 ? '15%' : '') : f >= cold39 ? (f >= falling39 ? 'BELOW 0' : '') : '2%') : f >= zero37 ? '0?' : ''} /></g>
        <g opacity={on(f, central37, 8) * (1 - on(f, hot38, 8))}><Label x={1150} y={G + 60} text={f >= year37 ? 'THE TARGET: 2% A YEAR' : "AMERICA'S CENTRAL BANK"} size={42} /></g>
        <No2 f={f} at={isnt37} until={n2} />
        <g opacity={win(f, hot38, cold39, 8)}><Label x={1150} y={G + 60} text={f >= y1980 ? '1980: ALMOST 15% IN A YEAR' : 'TOO HOT: PRICES RUN AWAY'} size={42} fill={K.coral} ink={K.paper} /></g>
        <g opacity={on(f, cold39, 8)}><Label x={1150} y={G + 60} text={f >= deflation39 ? 'DEFLATION' : 'TOO COLD: FALLING PRICES'} size={44} fill={K.sea} ink={K.paper} /></g>
      </g>}
      {/* # C) what falling prices do */}
      {Cc > 0 && <g opacity={Cc}>
        {/* the shop */}
        <g transform={`translate(1250 ${G})`}>
          <rect x={-330} y={-560} width={660} height={560} fill={K.cream} /><rect x={-350} y={-600} width={700} height={56} rx={10} fill={K.mintD} />
          <text y={-560} textAnchor="middle" fill={K.paper} style={BB(44)}>TV SHOP</text>
          <rect x={-280} y={-480} width={560} height={330} rx={12} fill={K.ice} />
          <g opacity={on(f, tv41 - 4, 10)}><TV x={-40} y={-200} s={0.9} f={f} price={`$${Math.round(tvPrice)}`} /></g>
          <g opacity={on(f, cheaper41, 8) * (1 - closed)}><Label x={0} y={-90} text="CHEAPER NEXT MONTH" size={38} fill={K.sun} /></g>
          <g opacity={closed} transform={`rotate(${-6 + 6 * Math.sin(f / 20)} 0 -90)`}><rect x={-140} y={-130} width={280} height={84} rx={12} fill={K.red} /><text y={-72} textAnchor="middle" fill={K.paper} style={BB(60)}>CLOSED</text></g>
          {/* workers leave */}
          <g opacity={on(f, cut41, 8) * (1 - on(f, debts42, 8))}>{[0, 1].map((k) => <Person key={k} f={f} who="worker" beats={[[cut41, 'walkA', 'worried', 'walkB', 14]]} x={lerp(200 + k * 90, 420 + k * 90, span(f, jobs41, jobs41 + 40))} y={30} s={0.55} />)}</g>
          <g opacity={on(f, jobs41, 8) * (1 - on(f, debts42, 8))}><Label x={300} y={60} text="JOBS CUT" size={38} fill={K.coral} ink={K.paper} /></g>
        </g>
        {/* the waiting shopper(s) */}
        <g opacity={1 - on(f, debts42, 10)}>
          <Person f={f} who="buyer" beats={[[BC, 'think', 'thinking'], [until40, 'scratchHead', 'thinking'], [do40, 'shrug', 'neutral'], [wait41, 'armsCrossed', 'smug'], [stores41, 'shrug', 'worried']]} x={330} y={G + 20} s={0.9} />
          {[0, 1, 2].map((k) => <g key={k} opacity={on(f, everyone41 + k * 3, 8)}><Person f={f} who={['investor', 'owner', 'investorF'][k]} beats={[[everyone41, 'armsCrossed', 'neutral']]} x={520 + k * 120} y={G + 30} s={0.62} /></g>)}
          <g opacity={on(f, wait41, 8)}><Label x={330} y={G - 380} text="WAIT…" size={42} /></g>
          <g opacity={on(f, less41, 8)}><Label x={640} y={G - 280} text="FEWER SALES" size={38} /></g>
        </g>
        {/* debts get heavier */}
        <g opacity={on(f, debts42, 10)}>
          <Person f={f} who="buyer" beats={[[debts42, 'carryHeavy', 'worried'], [earn42, 'despair', 'worried']]} x={420} y={G + 20} s={0.9} />
          <g transform={`translate(600 ${G - 160}) scale(${debtS})`}><rect x={-80} y={-110} width={160} height={180} rx={34} fill={K.plumD} /><rect x={-60} y={-60} width={120} height={60} rx={12} fill={K.plum} /><text y={-18} textAnchor="middle" fill={K.paper} style={BB(40)}>DEBT</text></g>
          <g opacity={on(f, owe42, 8)}><Label x={600} y={G + 60} text={f >= same42 ? 'SAME DOLLARS OWED' : 'YOU OWE'} size={38} /></g>
          <g opacity={on(f, harder42 - 4, 8)}><Coin x={900} y={500} s={2 * coinS} text="PAY" /><Label x={900} y={640} text="HARDER TO EARN" size={38} fill={K.coral} ink={K.paper} /></g>
        </g>
      </g>}
      {/* # D) the 2 % sweet spot, then 2022 */}
      {D > 0 && <g opacity={D}>
        <Person f={f} who="investorF" beats={o2Beats} x={360} y={G + 20} s={0.95} />
        <Thermostat x={1150} y={470} s={1.15} value={needle2} goal={1} text={f >= hot45 ? (f >= y2022 ? '2022' : '') : '2%'} />
        <g opacity={win(f, cushion43, trust44, 8)} transform={`translate(970 640) scale(${1 + 0.15 * pop(f, deflation43, 14)} ${1 - 0.15 * pop(f, deflation43, 14)})`}><ellipse rx={130} ry={46} fill={K.lilac} stroke={K.lilacD} strokeWidth={6} /><Label x={0} y={90} text="A CUSHION ABOVE ZERO" size={36} /></g>
        <g opacity={on(f, above43, 8) * (1 - on(f, cushion43, 8))}><Label x={1150} y={G + 60} text={f >= barely43 ? 'SLOW ENOUGH TO BARELY NOTICE' : 'A LITTLE ABOVE ZERO'} size={40} /></g>
        <g opacity={win(f, trust44, hot45, 8)}>
          <g transform="translate(1150 820)">{['SAVE', 'BORROW', 'SPEND'].map((t, k) => <g key={t} opacity={on(f, [saving44, borrowing44, spending44][k], 8)} transform={`translate(${(k - 1) * 230} 0)`}><rect x={-100} y={-40} width={200} height={70} rx={16} fill={K.mint} /><text y={12} textAnchor="middle" fill={K.ink} style={BB(40)}>{t}</text></g>)}</g>
          <Label x={1150} y={G + 80} text="PEOPLE CAN PLAN" size={38} o={on(f, plan44, 8)} />
          <g opacity={on(f, slowly44, 8)} transform="translate(1560 250)"><rect x={-150} y={-90} width={300} height={190} rx={18} fill={K.paper} stroke={K.ink} strokeOpacity={0.2} strokeWidth={3} /><rect x={-150} y={-90} width={300} height={40} rx={14} fill={K.coral} />
            <path d={`M-120 70 L${-120 + 240 * span(f, slowly44, steadily44 + 12)} ${70 - 80 * span(f, slowly44, steadily44 + 12)}`} stroke={K.green} strokeWidth={10} strokeLinecap="round" /><text y={-58} textAnchor="middle" fill={K.paper} style={BB(30)}>SLOW & STEADY</text></g>
        </g>
        <g opacity={on(f, hot45, 8)}><Label x={1150} y={G + 60} text={f >= cool45 ? 'HOW DO YOU COOL IT?' : 'TOO HOT AGAIN'} size={44} fill={K.coral} ink={K.paper} /></g>
      </g>}
      <Headline f={f} lines={[[federal37, 'STEP 4: THE GOAL IS 2%', K.ink, 96], [thermostat38, 'A THERMOSTAT', K.ink, 100], [great40, 'WHY FALLING PRICES HURT', K.ink, 92], [fed43, 'AIM A LITTLE ABOVE ZERO', K.ink, 92], [thermostat45, 'TOO HOT IN 2022', K.coralD, 96]]} />
    </g>
  )
}
// # a red cross over the ZERO mark on "isn't zero"
const No2: React.FC<{ f: number; at: number; until: number }> = ({ f, at, until }) => {
  const o = win(f, at, until + 6, 6)
  return o > 0.01 ? <g opacity={o} transform="translate(930 560)"><circle r={70} fill="none" stroke={K.red} strokeWidth={12} /><line x1={-48} y1={-48} x2={48} y2={48} stroke={K.red} strokeWidth={12} strokeLinecap="round" /><text y={140} textAnchor="middle" fill={K.red} style={BB(40)}>NOT 0%</text></g> : null
}

export const IN_GOAL = makePiece('in-goal', "Step four, why the goal is 2 percent and not zero: a stately Fed room with a giant brass thermostat; a Fed official points, the needle passes zero (crossed) and settles on the green 2 percent notch; too hot: the room glows orange and the needle swings to 15 percent (1980); too cold: frost on the walls, the needle drops below zero (deflation); a TV shop window: the TV's tag falls, cheaper next month, a shopper crosses their arms and waits, more shoppers wait, the shop sign flips to CLOSED and workers walk away, the tag falls again; a shopper carries a DEBT backpack that grows heavier while their PAY coin shrinks; back at the thermostat at 2 percent with a cushion above zero and SAVE / BORROW / SPEND blocks people can plan with; then the needle swings into the red for 2022", {
  mood: 'light', Component: Goal,
  beats: ["s37:federal", "s37:central", "s37:target", "s37:zero", "s37:2", "s37:year", "s38:thermostat", "s38:hot", "s38:run", "s38:1980", "s38:15", "s39:cold", "s39:falling", "s39:deflation", "s40:great", "s40:until", "s40:do", "s41:tv", "s41:cheaper", "s41:wait", "s41:everyone", "s41:stores", "s41:less", "s41:cut", "s41:jobs", "s41:fall", "s41:further", "s42:debts", "s42:heavier", "s42:owe", "s42:same", "s42:harder", "s42:earn", "s42:falling", "s43:fed", "s43:above", "s43:2", "s43:barely", "s43:cushion", "s43:deflation", "s44:trust", "s44:slowly", "s44:steadily", "s44:plan", "s44:saving", "s44:borrowing", "s44:spending", "s45:hot", "s45:2022", "s45:cool", "s45:runs"],
  sfx: [['s37:2', 'click', 0.1], ['s38:15', 'whoosh', 0.1], ['s39:deflation', 'crack', 0.1], ['s41:stores', 'thud', 0.1]] })
