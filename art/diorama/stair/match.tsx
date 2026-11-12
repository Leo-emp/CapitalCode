// ---------------------------------------------------------------- s31–s41: step three, grab the free money (noon, Maya's workplace).
// A) Maya's office block with a water tower on its roof (the EMPLOYER). A glass tank labelled 401(k) appears; a pipe runs
//    from her paycheck into it (straight from her paycheck); then the employer's tower opens its own tap into the same
//    tank: the MATCH.
// B) The maths, one big picture: her pipe drops a $1 coin, the employer's tap adds a 50¢ coin for each; a gauge on her
//    pipe reads UP TO 6% OF PAY. $50,000 pay → 6% = $3,000 a year ($250 a month) stacks up in the tank as her column;
//    the employer's column grows to $1,500 ($125 a month); together 4,500: INSTANT +50%. Then the gauge falls to 3%:
//    her column halves, the match column only reaches $750, and the other $750 stays locked in the tower: never paid.
// C) Two checks: a magnifier over the tap's formula plate; a vesting hourglass on the match column that fills to FULLY
//    YOURS as Maya stays. Tax: the $250 leaves the paycheck before the tax slice, so the take-home bar shrinks by less
//    than $250. No match? The tower's tap is crossed; Maya sets up her own small IRA tank, no free money tap.
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { C, Coin, Drop, Ground, NoMark, Paycheck, Sky, Tank, Tap, TXT } from './kit'

const GROUND = 940

// # the office block with a water tower on its roof (the employer)
const Office: React.FC<{ x: number; y: number; s?: number; o?: number; f: number }> = ({ x, y, s = 1, o = 1, f }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={250} ry={18} fill="#000" opacity={0.14} />
    <rect x={-200} y={-520} width={400} height={520} fill="#6F8FB8" /><rect x={-200} y={-520} width={400} height={20} fill="#5A789F" />
    {Array.from({ length: 9 }, (_, k) => { const col = k % 3, row = Math.floor(k / 3); return <rect key={k} x={-160 + col * 115} y={-470 + row * 105} width={90} height={70} rx={6} fill={(k + Math.floor(f / 90)) % 5 ? '#CFE4F3' : '#FFE9A8'} /> })}
    <rect x={-50} y={-90} width={100} height={90} fill="#3E5A80" /><rect x={-90} y={-150} width={180} height={50} rx={10} fill={C.paper} /><text y={-113} textAnchor="middle" fill={C.ink} style={TXT(36)}>EMPLOYER</text>
    {/* the water tower */}
    <g transform="translate(60 -520)"><rect x={-70} y={-60} width={10} height={60} fill={C.woodD} /><rect x={60} y={-60} width={10} height={60} fill={C.woodD} />
      <rect x={-90} y={-220} width={180} height={170} rx={20} fill={C.wood} />{[0, 1, 2].map((k) => <rect key={k} x={-90} y={-190 + k * 50} width={180} height={8} fill={C.woodD} />)}
      <path d="M-100 -220 L0 -280 L100 -220 Z" fill={C.terraD} /></g>
  </g>
)
const Col: React.FC<{ x: number; y: number; h: number; w?: number; color: string; top?: string; base?: string; o?: number }> = ({ x, y, h, w = 170, color, top, base, o = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    {Array.from({ length: Math.max(0, Math.round(h / 30)) }, (_, k) => <g key={k}><ellipse cx={0} cy={-k * 30 - 14} rx={w / 2} ry={14} fill={color} /><ellipse cx={0} cy={-k * 30 - 20} rx={w / 2 - 8} ry={9} fill="#FFFFFF" opacity={0.25} /></g>)}
    {top && <text y={-h - 40} textAnchor="middle" fill={C.ink} style={TXT(58)}>{top}</text>}
    {base && <text y={58} textAnchor="middle" fill={C.ink} style={TXT(44)}>{base}</text>}
  </g>
)

const Match: React.FC<PieceProps> = ({ f, c }) => {
  const easiest31 = c('s31:easiest'), make31 = c('s31:make')
  const employers32 = c('s32:employers'), k401 = c('s32:401k'), account32 = c('s32:account'), straight32 = c('s32:straight'), paycheck32 = c('s32:paycheck')
  const add33 = c('s33:add'), own33 = c('s33:own'), called33 = c('s33:called'), match33 = c('s33:match')
  const formula34 = c('s34:formula'), c50a = c('s34:50'), every34 = c('s34:every'), dollar34 = c('s34:dollar'), up34 = c('s34:up'), six34 = c('s34:6')
  const numbers35 = c('s35:numbers'), k50 = c('s35:50000'), k3a = c('s35:3000'), d250 = c('s35:250')
  const adds36 = c('s36:adds'), k15 = c('s36:1500'), d125 = c('s36:125')
  const before37 = c('s37:before'), market37 = c('s37:market'), k3b = c('s37:3000'), k45 = c('s37:4500'), instant37 = c('s37:instant')
  const only38 = c('s38:only'), three38 = c('s38:3'), d750 = c('s38:750'), other38 = c('s38:other'), never38 = c('s38:never'), paid38 = c('s38:paid')
  const check39 = c('s39:check'), exact39 = c('s39:exact'), vesting39 = c('s39:vesting'), long39 = c('s39:long'), stay39 = c('s39:stay'), fully39 = c('s39:fully'), yours39 = c('s39:yours')
  const regular40 = c('s40:regular'), income40 = c('s40:income'), tax40 = c('s40:tax'), d250b = c('s40:250'), shrinks40 = c('s40:shrinks'), less40 = c('s40:less')
  const no41 = c('s41:no'), job41 = c('s41:job'), skip41 = c('s41:skip'), ira41 = c('s41:ira'), open41 = c('s41:open'), without41 = c('s41:without'), free41 = c('s41:free')

  const make31b = c('s31:make'), six34b = c('s34:6'), mayas35 = c("s35:maya's"), each36 = c('s36:each'), k401c = c('s40:401k'), goes40 = c('s40:goes'), similar41 = c('s41:similar')
  const AB = formula34 - 6, BC = check39 - 6
  const A = win(f, 0, AB), B = win(f, AB - 8, BC), Cc = on(f, BC - 8, 10)

  // # A) the office, the 401(k) tank, her pipe, the employer's tap
  const aBeats: Beat[] = ([...[[0, 'idle', 'smiling'], [easiest31, 'celebrate', 'smiling'], [employers32, 'point', 'neutral'], [paycheck32, 'holdUp', 'smiling'], [add33, 'clapA', 'smiling', 'clapB', 12], [match33, 'thumbsUp', 'smiling']], [make31b, 'fistPump', 'smiling']] as Beat[]).sort((p, q) => p[0] - q[0])
  const tankFillA = 0.1 + 0.25 * span(f, straight32, add33) + 0.25 * span(f, add33, AB)
  // # B) the maths
  const herH = 300 * span(f, k3a - 6, k3a + 16) * (1 - 0.5 * on(f, three38, 16))
  const empH = 150 * span(f, k15 - 6, k15 + 16) * (1 - 0.5 * on(f, three38, 16))
  const gauge = f >= three38 ? 3 : 6
  const merge = on(f, k45, 16) * (1 - on(f, only38, 12))
  // # C) checks, tax, no match
  const cBeats: Beat[] = ([...[[BC, 'explain', 'neutral'], [exact39, 'read', 'thinking'], [vesting39, 'think', 'thinking'], [stay39, 'confident', 'smiling'], [regular40, 'present', 'neutral'], [shrinks40, 'pointDown', 'neutral'], [less40, 'nodA', 'smiling', 'nodB', 14], [no41, 'shrug', 'neutral'], [ira41, 'hold', 'smiling'], [open41, 'typeSit', 'smiling'], [without41, 'idle', 'neutral']], [k401c, 'point', 'neutral'], [goes40, 'pointDown', 'neutral'], [similar41, 'nodA', 'smiling', 'nodB', 14]] as Beat[]).sort((p, q) => p[0] - q[0])
  const vest = span(f, long39, yours39 + 10)
  const tax = on(f, regular40 - 4, 10) * (1 - on(f, no41, 10))
  const noMatch = on(f, no41, 10)

  return (
    <g>
      <Sky id="sv-m-base" f={f} mood="noon" />
      {/* # A) the employer's office and the 401(k) tank */}
      {A > 0 && <g opacity={A}>
        <Sky id="sv-m-a" f={f} mood="noon" /><Ground y={GROUND - 20} seed={21} />
        <Office x={1500} y={GROUND - 10} s={0.92} f={f} o={on(f, employers32 - 6, 12)} />
        <Person f={f} who="investorF" beats={aBeats} x={360} y={GROUND} s={0.88} />
        <g opacity={on(f, k401 - 4, 10)}><Tank x={960} y={GROUND - 30} w={260} h={330} f={f} fill={tankFillA} label="401(K)" sub={f >= account32 ? 'RETIREMENT' : ''} /></g>
        {/* her paycheck → pipe → tank */}
        <g opacity={on(f, paycheck32, 10)}>
          <Paycheck x={560} y={420} s={0.6} amt="" sub="PAYCHECK" />
          <path d="M 660 420 L 900 420 Q 930 420 930 450 L 930 560" fill="none" stroke="#9AA6B2" strokeWidth={26} strokeLinecap="round" />
          {[0, 1].map((k) => <Drop key={k} x={930} y={580 + ((f * 5 + k * 40) % 80)} s={0.6} />)}
        </g>
        {/* the employer's tap from the tower into the same tank */}
        <g opacity={on(f, add33, 12)}>
          <path d={`M 1500 ${GROUND - 540} L 1500 ${GROUND - 600} L 1080 ${GROUND - 600}`} fill="none" stroke="#9AA6B2" strokeWidth={26} strokeLinecap="round" />
          <Tap x={1060} y={GROUND - 600} s={0.9} open={on(f, own33, 14)} f={f} flip len={190} handle={C.green} />
          <g opacity={on(f, match33, 8)} transform={`translate(1260 ${GROUND - 660})`}><rect x={-100} y={-42} width={200} height={76} rx={16} fill={C.greenD} /><text y={16} textAnchor="middle" fill="#FFFFFF" style={TXT(56)}>MATCH</text></g>
        </g>
      </g>}

      {/* # B) the maths: $1 + 50¢, 6%, $3,000 + $1,500 */}
      {B > 0 && <g opacity={B}>
        <Sky id="sv-m-b" f={f} mood="noon" /><Ground y={GROUND - 20} seed={23} />
        {/* her pipe (left) and the employer's tap (right) both feed the central tank */}
        <Paycheck x={300} y={360 - 14 * Math.sin(Math.PI * span(f, mayas35, mayas35 + 14))} s={0.75} amt={f >= k50 ? '$50,000' : ''} sub="MAYA'S PAY" />
        <path d="M 430 360 L 760 360 Q 790 360 790 390 L 790 470" fill="none" stroke="#9AA6B2" strokeWidth={28} strokeLinecap="round" />
        <g opacity={win(f, c50a, every34 + 4, 6)}><Coin x={1103} y={430 + 20 * pop(f, c50a, 12)} s={0.5} text="50¢" /></g>
        <g opacity={win(f, six34b, numbers35, 8) * (0.5 + 0.5 * Math.sin(f / 5))}><circle cx={600} cy={360} r={84} fill="none" stroke={C.goldL} strokeWidth={10} /></g>
        {/* the % gauge on her pipe */}
        <g transform="translate(600 360)"><circle r={62} fill={C.paper} stroke="#9AA6B2" strokeWidth={8} /><text y={18} textAnchor="middle" fill={C.ink} style={TXT(52)}>{gauge}%</text>
          <text y={-80} textAnchor="middle" fill={C.ink} style={TXT(40)}>{f >= up34 ? 'UP TO 6% OF PAY' : ''}</text></g>
        <path d="M 1640 260 L 1640 300 L 1180 300" fill="none" stroke="#9AA6B2" strokeWidth={28} strokeLinecap="round" />
        <rect x={1560} y={140} width={160} height={130} rx={18} fill={C.wood} /><text x={1640} y={222} textAnchor="middle" fill="#FFFFFF" style={TXT(36)}>EMPLOYER</text>
        <Tap x={1160} y={300} s={0.9} open={on(f, every34, 12)} f={f} flip len={140} handle={C.green} />
        {/* $1 coin and the 50¢ coin that follows it */}
        {f >= every34 && f < numbers35 && [0, 1].map((k) => { const t = ((f - every34) / 40 + k / 2) % 1; return <g key={k}><Coin x={790} y={480 + 260 * t} s={0.55} text="$1" o={1 - t} />{f >= dollar34 && <Coin x={1103} y={450 + 260 * t} s={0.4} text="50¢" o={1 - t} />}</g> })}
        {(() => { const t = span(f, each36, each36 + 22); return t > 0 && t < 1 ? <g><Coin x={790} y={480 + 300 * t} s={0.5} text="$1" o={1 - t} /><Coin x={1103} y={450 + 330 * t} s={0.38} text="50¢" o={1 - t} /></g> : null })()}
        <g opacity={win(f, k3b, k45, 6)}><rect x={950 - 140 - 100} y={GROUND - 360} width={200} height={330} rx={24} fill="none" stroke={C.goldL} strokeWidth={8} /></g>
        {/* the tank with two columns inside: hers and the match */}
        <g transform="translate(950 0)">
          <rect x={-260} y={GROUND - 440} width={520} height={420} rx={30} fill={C.glass} opacity={0.55} stroke="#FFFFFF" strokeWidth={6} />
          <rect x={-274} y={GROUND - 34} width={548} height={30} rx={10} fill={C.woodD} />
          <Col x={-140} y={GROUND - 40} h={herH} color={C.water} top={f >= k3a ? (f >= three38 ? '$1,500' : '$3,000') : ''} o={on(f, numbers35, 8)} />
          <Col x={140} y={GROUND - 40} h={empH} color={C.green} top={f >= k15 ? (f >= d750 ? '$750' : '$1,500') : ''} o={on(f, adds36, 8)} />
          <g opacity={on(f, numbers35, 8)}><text x={-140} y={GROUND + 44} textAnchor="middle" fill={C.ink} style={TXT(44)}>{f >= d250 ? 'MAYA $250/MO' : 'MAYA'}</text></g>
          <g opacity={on(f, adds36, 8)}><text x={140} y={GROUND + 44} textAnchor="middle" fill={C.greenD} style={TXT(44)}>{f >= d125 ? 'MATCH $125/MO' : 'MATCH'}</text></g>
        </g>
        {/* together: 4,500, instant +50% */}
        <g opacity={merge}>
          <g transform={`translate(1420 ${560 - 10 * pop(f, k45, 12)})`}><rect x={-150} y={-60} width={300} height={110} rx={20} fill={C.ink} /><text y={20} textAnchor="middle" fill="#FFFFFF" style={TXT(76)}>= $4,500</text></g>
          <g opacity={on(f, instant37, 8)} transform={`translate(1420 ${700 - 10 * pop(f, instant37, 12)})`}><rect x={-170} y={-50} width={340} height={90} rx={20} fill={C.greenD} /><text y={16} textAnchor="middle" fill="#FFFFFF" style={TXT(62)}>INSTANT +50%</text></g>
        </g>
        <g opacity={on(f, before37, 8) * (1 - on(f, k45, 8))}><rect x={1300} y={520} width={240} height={160} rx={20} fill="#24365A" /><path d="M1330 640 L1380 600 L1420 620 L1470 570 L1510 590" fill="none" stroke={C.ink2} strokeWidth={6} />
          <NoMark x={1420} y={600} r={100} o={on(f, market37, 8)} /></g>
        {/* only 3%: the other $750 stays locked in the tower */}
        <g opacity={on(f, other38, 10)} transform={`translate(1640 ${600 + 6 * Math.sin(f / 10)})`}>
          <Col x={0} y={0} h={150 * on(f, other38, 16)} w={120} color={C.green} o={0.45} />
          <g transform="translate(0 -230)"><path d="M-26 0 L-26 -26 A26 26 0 0 1 26 -26 L26 0" fill="none" stroke="#8D99A6" strokeWidth={10} /><rect x={-40} y={-4} width={80} height={62} rx={12} fill={C.gold} /></g>
          <g opacity={on(f, never38, 8)}><rect x={-150} y={30} width={300} height={70} rx={16} fill={C.red} /><text y={80} textAnchor="middle" fill="#FFFFFF" style={TXT(48)}>{f >= paid38 ? '$750 NEVER PAID' : '$750'}</text></g>
        </g>
      </g>}

      {/* # C) two checks, the tax, no match → an IRA */}
      {Cc > 0 && <g opacity={Cc}>
        <Sky id="sv-m-c" f={f} mood="noon" /><Ground y={GROUND - 20} seed={25} />
        <Person f={f} who="investorF" beats={cBeats} x={330} y={GROUND} s={0.88} />
        <g opacity={1 - on(f, regular40 - 4, 10)}>
          {/* the formula plate under a magnifier */}
          <g opacity={on(f, exact39 - 6, 10)} transform="translate(900 470)">
            <rect x={-200} y={-80} width={400} height={160} rx={20} fill={C.paper} stroke="#D9C29A" strokeWidth={5} />
            <Coin x={-110} y={0} s={0.7} text="$1" /><text x={-20} y={18} textAnchor="middle" fill={C.ink} style={TXT(60)}>→</text><Coin x={90} y={0} s={0.55} text="50¢" />
            <g transform={`translate(${40 + 60 * Math.sin(f / 20)} 20)`}><circle r={90} fill="#FFFFFF" opacity={0.18} stroke={C.ink} strokeWidth={12} /><rect x={58} y={58} width={26} height={110} rx={10} fill={C.ink} transform="rotate(-45 70 70)" /></g>
          </g>
          {/* vesting: an hourglass on the match column */}
          <g opacity={on(f, vesting39, 10)} transform="translate(1460 0)">
            <Col x={0} y={GROUND - 40} h={150} color={C.green} />
            <g transform={`translate(0 ${GROUND - 330})`}>
              <path d="M-70 -110 L70 -110 L10 0 L70 110 L-70 110 L-10 0 Z" fill={C.glass} stroke={C.wood} strokeWidth={10} />
              <path d={`M${-60 + 50 * vest} ${-100 + 90 * vest} L${60 - 50 * vest} ${-100 + 90 * vest} L0 0 Z`} fill={C.gold} />
              <path d={`M${-60 * vest} ${100 - 90 * vest} L${60 * vest} ${100 - 90 * vest} L60 100 L-60 100 Z`} fill={C.gold} />
            </g>
            <g opacity={on(f, fully39, 8)}><rect x={-170} y={GROUND + 10} width={340} height={70} rx={16} fill={C.greenD} /><text y={GROUND + 60} textAnchor="middle" fill="#FFFFFF" style={TXT(52)}>FULLY YOURS</text></g>
            <g opacity={win(f, long39, fully39, 8)}><text y={GROUND + 60} textAnchor="middle" fill={C.ink} style={TXT(48)}>{f >= stay39 ? 'STAY · YEARS' : 'HOW LONG?'}</text></g>
          </g>
        </g>
        {/* tax: the $250 leaves before income tax; take-home shrinks by less */}
        <g opacity={tax}>
          <g transform="translate(900 0)">
            <Paycheck x={0} y={380} s={0.9} amt="" sub="PAYCHECK" />
            {(() => { const t = span(f, goes40, income40 + 10); return <g transform={`translate(${lerp(0, -260, t)} ${lerp(380, 640, t)})`}><Coin x={0} y={0} s={0.8} text="$250" /></g> })()}
            <g opacity={on(f, income40, 10)}><text x={-260} y={760} textAnchor="middle" fill={C.ink} style={TXT(44)}>BEFORE TAX</text></g>
          </g>
          {/* the take-home bar shrinks by a smaller notch */}
          <g opacity={on(f, d250b - 4, 10)} transform="translate(1240 0)">
            <rect x={0} y={560} width={560} height={90} rx={16} fill={C.stone} />
            <rect x={0} y={560} width={lerp(560, 460, on(f, shrinks40, 16))} height={90} rx={16} fill={C.green} />
            <text x={20} y={530} fill={C.ink} style={TXT(48)}>TAKE-HOME PAY</text>
            <g opacity={on(f, less40, 8)}><rect x={380} y={680} width={300} height={70} rx={16} fill={C.paper} /><text x={530} y={728} textAnchor="middle" fill={C.ink} style={TXT(46)}>LESS THAN $250</text></g>
            <g opacity={on(f, tax40, 8)}><rect x={360} y={420} width={200} height={66} rx={14} fill={C.terra} /><text x={460} y={466} textAnchor="middle" fill="#FFFFFF" style={TXT(44)}>LESS TAX</text></g>
          </g>
        </g>
        {/* no match at your job → an IRA you open yourself */}
        <g opacity={noMatch}>
          <g transform="translate(1500 300)"><rect x={-80} y={-60} width={160} height={130} rx={18} fill={C.wood} /><text y={22} textAnchor="middle" fill="#FFFFFF" style={TXT(34)}>EMPLOYER</text>
            <Tap x={-100} y={110} s={0.8} open={0} f={f} flip len={100} /></g>
          <NoMark x={1470} y={380} r={120} o={on(f, job41, 8) * (1 - on(f, skip41 + 20, 10))} />
          <g opacity={on(f, ira41, 10)}><Tank x={900} y={GROUND - 30} w={230} h={280} f={f} fill={0.15 + 0.3 * span(f, open41, without41)} label="IRA" sub={f >= open41 ? 'YOU OPEN IT' : ''} /></g>
          <g opacity={on(f, free41, 8)} transform="translate(1470 640)"><rect x={-180} y={-40} width={360} height={74} rx={16} fill={C.paper} /><text y={16} textAnchor="middle" fill={C.ink} style={TXT(48)}>NO FREE MONEY TAP</text></g>
        </g>
      </g>}

      <Headline f={f} lines={[[easiest31, 'STEP 3: THE FREE MONEY', C.ink, 96], [match33, 'THE EMPLOYER MATCH', C.greenD, 96], [formula34, '50¢ PER $1, UP TO 6% OF PAY', C.ink, 92], [numbers35, 'MAYA: 6% OF $50,000', C.ink, 96], [instant37, '$3,000 → $4,500', C.greenD, 100], [three38, 'PUT IN LESS, LOSE THE MATCH', C.red, 92], [check39, 'CHECK YOUR OWN PLAN', C.ink, 96], [regular40, 'IT GOES IN BEFORE TAX', C.ink, 96], [no41, 'NO MATCH? AN IRA', C.ink, 96]]} />
    </g>
  )
}

export const SV_MATCH = makePiece('sv-match', 'Step three, the employer match: Maya beside her office block with a water tower on the roof (EMPLOYER); a glass 401(k) tank, a pipe from her paycheck into it, the tower opens its own green tap into the same tank (MATCH); the maths: her pipe drops $1 coins, the tap adds a 50¢ coin for each, a gauge UP TO 6% OF PAY, $50,000 pay, her column $3,000 ($250/mo), the match column $1,500 ($125/mo), = $4,500 instant +50% (a market chart crossed), the gauge drops to 3%: columns halve, $750 stays locked in the tower, never paid; a magnifier over the $1 → 50¢ formula plate, a vesting hourglass fills to FULLY YOURS; $250 coin leaves the paycheck before tax, the take-home bar shrinks by less than $250; no match: the employer tap crossed, Maya opens her own IRA tank (no free money tap)', {
  mood: 'light', Component: Match,
  beats: ["s31:easiest", "s32:employers", "s32:401k", "s32:account", "s32:straight", "s32:paycheck", "s33:add", "s33:own", "s33:match", "s34:formula", "s34:50", "s34:every", "s34:dollar", "s34:up", "s35:numbers", "s35:50000", "s35:3000", "s35:250", "s36:adds", "s36:1500", "s36:125", "s37:before", "s37:market", "s37:3000", "s37:4500", "s37:instant", "s38:only", "s38:3", "s38:750", "s38:other", "s38:never", "s38:paid", "s39:check", "s39:exact", "s39:vesting", "s39:long", "s39:stay", "s39:fully", "s39:yours", "s40:regular", "s40:income", "s40:tax", "s40:250", "s40:shrinks", "s40:less", "s41:no", "s41:job", "s41:skip", "s41:ira", "s41:open", "s41:without", "s41:free", "s31:make", "s34:6", "s35:maya's", "s36:each", "s40:401k", "s40:goes", "s41:similar"],
  sfx: [['s33:match', 'chime', 0.14], ['s34:every', 'coin', 0.12], ['s37:4500', 'cash', 0.14], ['s38:never', 'thud', 0.14], ['s39:fully', 'ding', 0.12], ['s41:ira', 'softpop', 0.12]] })
