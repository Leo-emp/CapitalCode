// ---------------------------------------------------------------- s1–s7: the hook (Jordan's office, morning).
// A) Jordan at the desk with the ENROLLMENT form; a "_%" box; Jordan picks a number and shrugs. Letters IRA / ROTH /
//    401(K) pour into a bowl of alphabet soup.
// B) Three paths from Jordan's paycheck: a coin to a glass box (you), a coin to the grey TAX envelope (taxes), a coin
//    into a dark hole (nowhere). Then the boss offers a stack of 1,380 dollars; Jordan shakes their head — crossed.
// C) A huge money bag with a top hat (lots of money to invest) is crossed; an ordinary paycheck takes its place;
//    a thick TAX CODE book is crossed; six little signs light up along the desk (the six steps).
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { BB, Box, Check, Coin, Form, Label, No, Office, Plant, R, TaxBox } from './kit'

const G = 920

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const handed1 = c('s1:handed'), form1 = c('s1:form'), work1 = c('s1:work'), much1 = c('s1:much'), pay1 = c('s1:pay'), k401 = c('s1:401k'), picked1 = c('s1:picked'), number1 = c('s1:number'), hoped1 = c('s1:hoped')
  const mentions2 = c('s2:mentions'), ira2 = c('s2:ira'), roth2 = c('s2:roth'), suddenly2 = c('s2:suddenly'), alphabet2 = c('s2:alphabet'), soup2 = c('s2:soup'), right2 = c('s2:right')
  const letters3 = c('s3:letters'), decide3 = c('s3:decide'), real3 = c('s3:real'), pay3 = c('s3:pay'), you3 = c('s3:you'), taxes3 = c('s3:taxes'), nowhere3 = c('s3:nowhere'), all3 = c('s3:all')
  const imagine4 = c('s4:imagine'), employer4 = c('s4:employer'), add4 = c('s4:add'), n1380 = c('s4:1380'), account4 = c('s4:account'), saying4 = c('s4:saying'), no4 = c('s4:no'), knowing4 = c('s4:knowing')
  const thinking5 = c('s5:thinking'), lots5 = c('s5:lots'), money5 = c('s5:money'), invest5 = c('s5:invest'), isnt5 = c("s5:isn't"), accounts5 = c('s5:accounts'), built5 = c('s5:built'), ordinary5 = c('s5:ordinary'), paychecks5 = c('s5:paychecks')
  const need6 = c('s6:need'), read6 = c('s6:read'), code6 = c('s6:code'), understand6 = c('s6:understand'), okay6 = c('s6:okay')
  const step7 = c('s7:step'), retirement7 = c('s7:retirement'), match7 = c('s7:match'), adds7 = c('s7:adds'), traditional7 = c('s7:traditional'), rules7 = c('s7:rules'), pieces7 = c('s7:pieces'), together7 = c('s7:together')

  const AB = letters3 - 6, BC = thinking5 - 6
  const A = win(f, 0, AB), B = win(f, AB - 8, BC), Cc = on(f, BC - 8, 10)
  const jBeats: Beat[] = [[0, 'read', 'neutral'], [form1, 'holdUp', 'neutral'], [much1, 'scratchHead', 'thinking'], [picked1, 'point', 'neutral'], [hoped1, 'shrug', 'worried'], [mentions2, 'think', 'thinking'], [suddenly2, 'facepalm', 'worried'], [right2, 'shrug', 'neutral'],
    [letters3, 'explain', 'neutral'], [decide3, 'pointUp', 'neutral'], [real3, 'explain', 'smiling'], [you3, 'point', 'smiling'], [taxes3, 'point', 'neutral'], [nowhere3, 'shock', 'shocked'], [employer4, 'idle', 'neutral'], [saying4, 'crossNoA', 'neutral', 'crossNoB', 12], [knowing4, 'shrug', 'thinking'],
    [thinking5, 'think', 'thinking'], [isnt5, 'stop', 'smiling'], [ordinary5, 'holdUp', 'smiling'], [need6, 'relax', 'smiling'], [okay6, 'thumbsUp', 'smiling'], [step7, 'present', 'smiling'], [together7, 'thumbsUp', 'smiling']]
  const soupLetters = [['IRA', ira2], ['ROTH', roth2], ['401(K)', alphabet2]] as [string, number][]
  const fly = (a: number) => span(f, a, a + 20)
  const signs = [retirement7, c('s7:401k'), adds7, traditional7, rules7, pieces7]
  const SIGN = ['THE BOX', '401(K) + MATCH', 'THE IRA', 'TRAD VS ROTH', 'TAKING IT OUT', 'HOW IT FITS']

  return (
    <g>
      <Office id="rt-h" f={f} floor={G} desk={A > 0.5 || Cc > 0.5} />
      <Person f={f} who="investor" beats={jBeats} x={360} y={G + 10} s={0.95} />
      {/* # A) the form and the alphabet soup */}
      {A > 0 && <g opacity={A}>
        <Form x={940} y={G - 470 - 8 * pop(f, form1, 14)} s={0.95} r={-3} pct={f >= number1 ? '6%?' : f >= pay1 ? '_%' : ''} checks={f >= k401 ? [0] : []} o={on(f, handed1, 10)} />
        <g opacity={on(f, work1, 8) * (1 - on(f, mentions2, 8))}><Label x={940} y={G - 180} text="AT WORK" size={40} /></g>
        <g opacity={on(f, mentions2 - 4, 10)} transform={`translate(1450 ${G - 236})`}>
          {soupLetters.map(([t, at], k) => { const t0 = span(f, at, at + 18); return <text key={t} x={lerp(-150 + k * 150, -40 + k * 40, t0)} y={lerp(-420, -90 - (k % 2) * 30, t0)} textAnchor="middle" fill={[R.red, R.forest, R.slate][k]} style={BB(70)} opacity={on(f, at, 6)} transform={`rotate(${(1 - t0) * 20 * (k - 1)})`}>{t}</text> })}
          <path d="M-220 -80 Q0 80 220 -80 Z" fill={R.cream} stroke={R.pot} strokeWidth={10} /><ellipse cy={-80} rx={220} ry={30} fill="#F2C38B" opacity={0.9} />
          <g opacity={on(f, soup2, 8)}><Label x={0} y={70} text="ALPHABET SOUP?" size={40} /></g>
        </g>
      </g>}
      {/* # B) where part of your pay goes — and a match you'd say no to */}
      {B > 0 && <g opacity={B}>
        <Check x={760} y={420 + 6 * pop(f, pay3, 12)} s={0.9 * (1 + 0.1 * pop(f, real3, 12))} amount="PAY" o={on(f, letters3, 10)} />
        <g opacity={on(f, you3 - 4, 10)}><Box x={1100} y={G - 20} s={0.62} tag="YOU"><Plant x={0} y={-30} s={0.8} grow={0.5} f={f} /></Box></g>
        <g opacity={on(f, taxes3 - 4, 10)}><TaxBox x={1440} y={G - 120} s={1.1} /></g>
        <g opacity={on(f, nowhere3 - 4, 10) * (1 - on(f, imagine4, 8))} transform={`translate(1760 ${G - 110})`}><ellipse rx={110} ry={50} fill={R.ink} /><Label x={0} y={110} text="NOWHERE" size={36} /></g>
        {[[you3, 1100, G - 220], [taxes3, 1440, G - 140], [nowhere3, 1760, G - 110]].map(([a, tx, ty], k) => f >= (a as number) && fly(a as number) < 1 ? <Coin key={k} x={lerp(760, tx as number, fly(a as number))} y={lerp(420, ty as number, fly(a as number)) - 120 * Math.sin(Math.PI * fly(a as number))} s={0.8} /> : null)}
        {/* the boss offers 1,380 dollars */}
        <g opacity={on(f, employer4 - 4, 10)}>
          <Person f={f} who="owner" beats={[[employer4, 'offer', 'smiling'], [no4, 'shrug', 'worried']]} x={1640} y={G + 10} s={0.85} />
          <g opacity={on(f, add4, 8)}>{[0, 1, 2, 3].map((k) => <Coin key={k} x={1440} y={G - 300 - k * 22 - 10 * pop(f, n1380, 12)} s={0.9} />)}</g>
          <g opacity={on(f, n1380, 8)}><Label x={1440} y={G - 420} text="+$1,380 THIS YEAR" size={42} fill={R.gold} /></g>
          <No x={1440} y={G - 330} r={110} o={on(f, no4, 8)} />
          <g opacity={on(f, knowing4, 8)}><Label x={1440} y={G - 160} text="WITHOUT KNOWING" size={36} /></g>
        </g>
      </g>}
      {/* # C) for ordinary paychecks; no tax code needed; six steps */}
      {Cc > 0 && <g opacity={Cc}>
        <g opacity={win(f, lots5, ordinary5, 8)} transform={`translate(1100 ${G - 300})`}>
          <path d="M-150 120 Q-190 -60 -60 -110 L60 -110 Q190 -60 150 120 Z" fill={R.sand} stroke={R.woodD} strokeWidth={6} /><text y={50} textAnchor="middle" fill={R.forestD} style={BB(120)}>$</text>
          <rect x={-60} y={-200} width={120} height={80} fill={R.ink} /><rect x={-90} y={-130} width={180} height={18} fill={R.ink} />
          <No x={0} y={0} r={170} o={on(f, isnt5, 8)} />
        </g>
        <g opacity={on(f, ordinary5, 10) * (1 - on(f, need6, 8))}><Check x={1100} y={G - 330 - 8 * pop(f, paychecks5, 12)} s={1.3} amount="ORDINARY" /><Label x={1100} y={G - 160} text={f >= built5 ? 'BUILT FOR PAYCHECKS' : 'ACCOUNTS'} size={42} o={on(f, accounts5, 8)} /></g>
        <g opacity={win(f, read6, okay6 + 6, 6)} transform={`translate(1100 ${G - 330}) rotate(-5)`}>
          <rect x={-200} y={-150} width={400} height={300} rx={16} fill={R.slate} /><rect x={-200} y={-150} width={50} height={300} rx={12} fill={R.slateD} />
          <text x={25} y={0} textAnchor="middle" fill={R.paper} style={BB(64)}>TAX CODE</text>
          <No x={0} y={0} r={210} o={on(f, code6, 8)} />
        </g>
        <g opacity={on(f, understand6, 8) * (1 - on(f, step7, 8))}><Label x={1100} y={G - 120} text="YOU CAN UNDERSTAND THIS" size={42} fill={R.forest} ink={R.paper} /></g>
        {signs.map((s, k) => { const x = 700 + k * 205, lit = on(f, s, 8)
          return <g key={k} opacity={on(f, step7 + k * 2, 8)} transform={`translate(${x} ${G - 250 - 14 * pop(f, s, 12)})`}>
            <rect x={-95} y={-90} width={190} height={130} rx={16} fill={lit > 0.5 ? R.gold : R.paper} stroke={R.ink} strokeOpacity={0.2} strokeWidth={3} />
            <text y={-30} textAnchor="middle" fill={R.forestD} style={BB(52)}>{k + 1}</text>
            <text y={20} textAnchor="middle" fill={R.ink} style={BB(28)} transform={k === 1 ? `scale(${1 + 0.15 * pop(f, match7, 12)})` : undefined}>{SIGN[k]}</text>
          </g> })}
      </g>}
      <Headline f={f} lines={[[handed1, 'THAT FORM AT WORK', R.ink, 96], [letters3, 'WHERE YOUR PAY GOES', R.ink, 96], [imagine4, 'FREE MONEY, SAID NO TO', R.ink, 90], [thinking5, 'BUILT FOR PAYCHECKS', R.ink, 96], [step7, '6 STEPS', R.ink, 100]]} />
    </g>
  )
}

export const RT_HOOK = makePiece('rt-hook', "Hook: Jordan's office; Jordan at the desk with a 401(k) enrollment form whose % box gets a hopeful number, then IRA, ROTH and 401(K) letters pour into a bowl of alphabet soup; three coins fly from Jordan's paycheck to a glass box (you), a grey TAX envelope (taxes) and a dark hole (nowhere); the boss offers a stack of coins (+1,380 dollars this year) and Jordan shakes their head, crossed; a huge money bag in a top hat is crossed and an ordinary paycheck takes its place; a thick tax code book is crossed; six numbered signs light up for the six steps", {
  mood: 'light', Component: Hook,
  beats: ["s1:handed", "s1:form", "s1:work", "s1:much", "s1:pay", "s1:401k", "s1:picked", "s1:number", "s1:hoped", "s2:mentions", "s2:ira", "s2:roth", "s2:suddenly", "s2:alphabet", "s2:soup", "s2:right", "s3:letters", "s3:decide", "s3:real", "s3:pay", "s3:you", "s3:taxes", "s3:nowhere", "s4:imagine", "s4:employer", "s4:add", "s4:1380", "s4:saying", "s4:no", "s4:knowing", "s5:thinking", "s5:lots", "s5:isn't", "s5:accounts", "s5:built", "s5:ordinary", "s5:paychecks", "s6:need", "s6:read", "s6:code", "s6:understand", "s6:okay", "s7:step", "s7:retirement", "s7:match", "s7:adds", "s7:traditional", "s7:rules", "s7:pieces", "s7:together", "s7:401k"],
  sfx: [['s2:soup', 'pop', 0.1], ['s4:1380', 'coin', 0.1], ['s4:no', 'thud', 0.1]] })
