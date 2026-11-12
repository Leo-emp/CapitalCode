// ---------------------------------------------------------------- s53–s65: step five, autopilot (the drip pipe → 30 years of weather).
// A) A drip pipe with a timer valve runs from Maya's paycheck mailbox to her 401(K) crate; a calendar flips month by
//    month and each flip drops a $250 coin and the employer's $125 coin into the pipe ($375 a month); Maya leans back in
//    a deck chair (never deciding again). The hardest part: a hand reaches for the valve's red STOP lever — crossed.
// B) History as a hillside: Maya's account value 1996 → 2025 (our calc, one point per year) is drawn as a green hill that
//    grows year by year, over the terracotta "money put in" line. 2007: $85,000 vs $54,000. 2008: a storm cloud, the
//    hill drops to $57,000, under the $58,500 line (behind on paper); coins keep dropping into the dip (buying at lower
//    prices). 2012: $122,000 vs $76,500. Then the scale opens to 2025: $900,000 vs $135,000 put in; the T-bill line ends
//    at $184,000; three honest notes (fees + taxes, past ≠ future, prices ×2.1); the gap between the two lines glows.
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { C, Coin, Drop, Ground, NoMark, Sky, Storm, Tree, TXT, num } from './kit'
import { SP, TB } from './data'

const GROUND = 940

const Auto: React.FC<PieceProps> = ({ f, c }) => {
  const heavy53 = c('s53:heavy'), lifting53 = c('s53:lifting'), autopilot53 = c('s53:autopilot'), gone61 = c('s61:gone'), account61 = c('s61:account'), even65 = c('s65:even')
  const d250 = c('s54:250'), leave54 = c('s54:leave'), month54 = c('s54:month'), automatically54 = c('s54:automatically'), employers54 = c("s54:employer's"), d125 = c('s54:125'), d375 = c('s54:375'), without54 = c('s54:without'), deciding54 = c('s54:deciding')
  const because55 = c('s55:because'), automatic55 = c('s55:automatic'), hardest55 = c('s55:hardest'), picking55 = c('s55:picking'), not55 = c('s55:not'), stopping55 = c('s55:stopping')
  const start56 = c('s56:start'), s500 = c('s56:500'), gone57 = c('s57:gone'), account57 = c('s57:account'), saving59 = c('s59:saving'), paper59 = c('s59:paper'), moment60 = c('s60:moment'), sell60 = c('s60:sell'), test56 = c('s56:test'), history56 = c('s56:history'), k45 = c('s56:4500'), dividends56 = c('s56:dividends')
  const y2007 = c('s57:2007'), k54 = c('s57:54000'), k85 = c('s57:85000')
  const y2008 = c('s58:2008'), fell58 = c('s58:fell'), p37 = c('s58:37'), dropped58 = c('s58:dropped'), k57 = c('s58:57000')
  const k585 = c('s59:58500'), thirteen59 = c('s59:thirteen'), behind59 = c('s59:behind')
  const stop60 = c('s60:stop'), automatic60 = c('s60:automatic'), keeps60 = c('s60:keeps'), buying60 = c('s60:buying'), lower60 = c('s60:lower')
  const y2012 = c('s61:2012'), k765 = c('s61:76500'), k122 = c('s61:122000')
  const thirty62 = c('s62:thirty'), y2025 = c('s62:2025'), k135 = c('s62:135000'), grown62 = c('s62:grown'), k900 = c('s62:900000')
  const treasury63 = c('s63:treasury'), k184 = c('s63:184000')
  const fees64 = c('s64:fees'), past64 = c('s64:past'), prices64 = c('s64:prices'), doubled64 = c('s64:doubled')
  const gap65 = c('s65:gap'), enormous65 = c('s65:enormous')

  const y1996 = c('s56:1996'), follow54 = c('s54:follow'), started56 = c('s56:started'), account58 = c('s58:account'), less59 = c('s59:less'), gone59 = c('s59:gone'), went62 = c('s62:went'), same63 = c('s63:same'), cash63 = c('s63:cash'), thirty64 = c('s64:thirty')
  const AB = test56 - 6
  const A = win(f, 0, AB), B = on(f, AB - 8, 10)

  // # A) the drip pipe on a timer
  const aBeats: Beat[] = ([...[[0, 'explain', 'smiling'], [automatically54, 'present', 'smiling'], [without54, 'relax', 'smiling'], [hardest55, 'think', 'thinking'], [not55, 'crossNoA', 'neutral', 'crossNoB', 12], [stopping55, 'stop', 'neutral']], [follow54, 'clapA', 'smiling', 'clapB', 12]] as Beat[]).sort((p, q) => p[0] - q[0])
  const monthFlip = f >= leave54 ? Math.floor((f - leave54) / 24) : -1
  const stopLever = on(f, because55, 12)

  // # B) the chart: years shown so far, and the y-scale (opens from 150k to 1M on "thirty")
  const yearsShown = f < history56 ? 0 : f < y2007 ? lerp(1, 12, span(f, history56, y2007)) : f < y2008 ? 12 : f < y2012 ? lerp(12, 17, span(f, y2008, y2012)) : f < thirty62 ? 17 : lerp(17, 30, span(f, thirty62, y2025 + 10))
  const yMax = lerp(150000, 1000000, span(f, thirty62, y2025 + 12))
  const X0 = 300, X1 = 1600, YB = 860, YT = 300
  const px = (i: number) => lerp(X0, X1, i / 29), py = (v: number) => YB - (YB - YT) * Math.min(1.08, v / yMax)
  const n = Math.max(0, Math.min(30, yearsShown))
  const pts = (arr: number[]) => { const out: string[] = []; const full = Math.floor(n); for (let i = 0; i < full; i++) out.push(`${px(i).toFixed(1)} ${py(arr[i]).toFixed(1)}`)
    if (full < 30 && n > full && full > 0) { const t = n - full; out.push(`${lerp(px(full - 1), px(full), t).toFixed(1)} ${lerp(py(arr[full - 1]), py(arr[full]), t).toFixed(1)}`) } return out }
  const spP = pts(SP), putIn = Array.from({ length: 30 }, (_, i) => 4500 * (i + 1)), inP = pts(putIn), tbP = pts(TB)
  const hill = spP.length > 1 ? `M ${X0} ${YB} L ${spP.join(' L ')} L ${spP[spP.length - 1].split(' ')[0]} ${YB} Z` : ''
  const bBeats: Beat[] = ([...[[AB, 'idle', 'neutral'], [history56, 'explain', 'smiling'], [k85, 'confident', 'smiling'], [fell58, 'shock', 'shocked'], [behind59, 'despair', 'worried'], [automatic60, 'confident', 'neutral'], [buying60, 'countA', 'smiling', 'countB', 14], [k122, 'fistPump', 'smiling'], [k900, 'celebrate', 'smiling'], [fees64, 'explain', 'neutral'], [enormous65, 'taDa', 'smiling']], [started56, 'point', 'smiling'], [account58, 'facepalm', 'worried'], [less59, 'pointDown', 'worried'], [gone59, 'countA', 'worried', 'countB', 14], [went62, 'present', 'smiling'], [grown62, 'jump', 'smiling'], [same63, 'point', 'neutral'], [treasury63, 'present', 'neutral'], [cash63, 'shrug', 'neutral'], [thirty64, 'countOne', 'neutral']] as Beat[]).sort((p, q) => p[0] - q[0])
  const storm = win(f, y2008 - 4, y2012, 12)
  const note = (at: number) => win(f, at, even65, 8)

  return (
    <g>
      <Sky id="sv-a-base" f={f} mood="dawn" />
      {/* # A) the drip pipe on a timer */}
      {A > 0 && <g opacity={A}>
        <Sky id="sv-a-a" f={f} mood="dawn" /><Ground y={GROUND - 20} seed={37} />
        {/* mailbox */}
        <g opacity={on(f, heavy53, 10)} transform={`translate(520 ${GROUND - 10 - 14 * (1 - pop(f, heavy53, 12))})`}><rect x={-8} y={-200} width={16} height={200} fill={C.woodD} /><rect x={-90} y={-300} width={180} height={110} rx={40} fill={C.terra} /><rect x={70} y={-300} width={12} height={60} fill={C.red} /><text y={-232} textAnchor="middle" fill="#FFFFFF" style={TXT(36)}>PAYCHECK</text></g>
        {/* the pipe with a timer valve */}
        <path opacity={on(f, lifting53, 10)} d={`M 610 ${GROUND - 250} L 1330 ${GROUND - 250} Q 1380 ${GROUND - 250} 1380 ${GROUND - 200} L 1380 ${GROUND - 170}`} fill="none" stroke="#9AA6B2" strokeWidth={30} strokeLinecap="round" />
        <g transform={`translate(960 ${GROUND - 250})`}><circle r={64} fill={C.paper} stroke="#7C8794" strokeWidth={10} /><line x1={0} y1={0} x2={0} y2={-44} stroke={C.ink} strokeWidth={7} strokeLinecap="round" transform={`rotate(${f * 4})`} /><circle r={8} fill={C.ink} />
          <g opacity={on(f, autopilot53, 8)}><text y={110} textAnchor="middle" fill={C.ink} style={TXT(48)}>AUTOPILOT</text></g>
          {/* the STOP lever */}
          <g opacity={stopLever} transform="translate(80 -70)"><rect x={-8} y={-80} width={16} height={80} rx={6} fill="#7C8794" transform={`rotate(${-30 + 30 * on(f, picking55, 10)})`} /><circle cy={-86} r={24} fill={C.red} /><text y={-130} textAnchor="middle" fill={C.red} style={TXT(44)}>STOP</text></g>
          <NoMark x={80} y={-150} r={90} o={on(f, not55, 8)} />
        </g>
        {/* calendar flips and coins drop in */}
        <g opacity={on(f, month54 - 6, 10)} transform={`translate(760 ${GROUND - 520})`}><rect x={-90} y={-80} width={180} height={160} rx={14} fill={C.paper} stroke="#E3D3B6" strokeWidth={4} /><rect x={-90} y={-80} width={180} height={46} rx={14} fill={C.terra} />
          <text y={-46} textAnchor="middle" fill="#FFFFFF" style={TXT(36)}>MONTH</text><text y={50} textAnchor="middle" fill={C.ink} style={TXT(80)}>{Math.max(1, monthFlip + 1)}</text></g>
        {monthFlip >= 0 && (() => { const t = ((f - leave54) % 24) / 24; return <g><Coin x={lerp(620, 900, t)} y={GROUND - 250 - 26} s={0.45} text="$250" o={t < 0.9 ? 1 : 0} />
          {f >= employers54 && <Coin x={lerp(1250, 1360, t)} y={GROUND - 250 - 26} s={0.38} text="$125" o={t < 0.9 ? 1 : 0} />}</g> })()}
        <g opacity={on(f, employers54, 10)} transform={`translate(1250 ${GROUND - 420})`}><rect x={-80} y={-60} width={160} height={120} rx={16} fill={C.wood} /><text y={14} textAnchor="middle" fill="#FFFFFF" style={TXT(34)}>EMPLOYER</text><rect x={-8} y={60} width={16} height={110} fill="#9AA6B2" /></g>
        {/* the crate with its tree, watered */}
        <g transform={`translate(1380 ${GROUND - 10})`}><rect x={-170} y={-160} width={340} height={160} rx={10} fill={C.wood} /><rect x={-100} y={-110} width={200} height={56} rx={12} fill={C.paper} /><text y={-68} textAnchor="middle" fill={C.ink} style={TXT(44)}>401(K)</text></g>
        <Tree x={1380} y={GROUND - 170} s={0.85} grow={0.5 + 0.3 * span(f, leave54, AB)} />
        {f >= leave54 && [0, 1].map((k) => <Drop key={k} x={1380} y={GROUND - 160 + ((f * 3 + k * 20) % 40)} s={0.4} />)}
        <g opacity={on(f, d375, 8)} transform={`translate(1380 ${GROUND - 560 - 10 * pop(f, d375, 12)})`}><rect x={-170} y={-44} width={340} height={80} rx={16} fill={C.greenD} /><text y={16} textAnchor="middle" fill="#FFFFFF" style={TXT(58)}>$375 A MONTH</text></g>
        <g opacity={win(f, deciding54, hardest55, 8)} transform={`translate(330 ${GROUND - 600 - 10 * pop(f, deciding54, 12)})`}><circle r={56} fill={C.paper} /><text y={30} textAnchor="middle" fill={C.ink2} style={TXT(80)}>?</text><NoMark x={0} y={0} r={70} o={on(f, deciding54 + 6, 8)} /></g>
        <g opacity={on(f, automatic55, 10) * (0.5 + 0.5 * Math.sin(f / 6))}><circle cx={960} cy={GROUND - 250} r={86} fill="none" stroke={C.goldL} strokeWidth={10} /></g>
        {/* Maya in a deck chair */}
        <Person f={f} who="investorF" beats={aBeats} x={250} y={GROUND} s={0.85} />
      </g>}

      {/* # B) the history hill */}
      {B > 0 && <g opacity={B}>
        <Sky id="sv-a-b" f={f} mood={storm > 0.5 ? 'storm' : 'noon'} hills={false} />
        <g opacity={storm}><rect x={-100} y={-100} width={2200} height={1300} fill="#5B6478" opacity={0.25} /></g>
        <Ground y={YB + 20} seed={39} flowers={false} />
        {/* the hill of Maya's account */}
        {hill && <path d={hill} fill={C.leaf} opacity={0.95} />}
        {spP.length > 1 && <path d={`M ${spP.join(' L ')}`} fill="none" stroke={C.greenD} strokeWidth={8} strokeLinejoin="round" />}
        {/* the money-put-in line and the T-bill line */}
        {inP.length > 1 && <path d={`M ${inP.join(' L ')}`} fill="none" stroke={C.terraD} strokeWidth={7} strokeDasharray="16 10" />}
        {tbP.length > 1 && f >= same63 && <path d={`M ${tbP.join(' L ')}`} fill="none" stroke={C.waterD} strokeWidth={7} opacity={on(f, same63, 10)} />}
        {/* axis years */}
        <g opacity={on(f, history56, 10)} transform={`translate(0 ${-10 * Math.sin(Math.PI * span(f, y1996, y1996 + 14))})`}><text x={X0} y={YB + 90} textAnchor="middle" fill={C.ink} style={TXT(44)}>1996</text>
          {f >= y2007 && <text x={px(11)} y={YB + 90} textAnchor="middle" fill={C.ink} style={TXT(44)}>2007</text>}
          {f >= y2012 && f < thirty62 && <text x={px(16)} y={YB + 90} textAnchor="middle" fill={C.ink} style={TXT(44)}>2012</text>}
          {f >= y2025 && <text x={X1} y={YB + 90} textAnchor="middle" fill={C.ink} style={TXT(44)}>2025</text>}</g>
        <g opacity={on(f, k45, 8) * (1 - on(f, y2007, 8))}><rect x={X0 + 40} y={YT - 40} width={460} height={70} rx={16} fill={C.paper} /><text x={X0 + 270} y={YT + 10} textAnchor="middle" fill={C.ink} style={TXT(48)}>$4,500 IN EVERY YEAR</text></g>
        <g opacity={on(f, s500, 8) * (1 - on(f, y2007, 8))}><text x={X0 + 270} y={YT + 80} textAnchor="middle" fill={C.ink2} style={TXT(40)}>{f >= dividends56 ? 'S&P 500, DIVIDENDS BACK IN' : 'S&P 500'}</text></g>
        {(() => { const t = span(f, start56, start56 + 20); return t > 0 && t < 1 ? <Coin x={X0} y={lerp(YT, YB - 30, t)} s={0.5} o={1 - t * 0.5} /> : null })()}
        <g opacity={win(f, gone57, y2008, 8)}>{Array.from({ length: 6 }, (_, k) => <Coin key={k} x={px(11) + 40} y={py(putIn[11]) + 90 - k * 14} s={0.3} o={on(f, gone57 + k * 3, 6)} />)}</g>
        <g opacity={win(f, account57, y2008, 8) * (0.4 + 0.3 * Math.sin(f / 6))}>{hill && <path d={hill} fill={C.goldL} />}</g>
        {/* 2007 */}
        <g opacity={win(f, k85, y2008, 8)}>{(() => { const x = px(11); return <g><circle cx={x} cy={py(SP[11])} r={14} fill={C.greenD} />
          <rect x={x - 130} y={py(SP[11]) - 100} width={260} height={66} rx={14} fill={C.greenD} /><text x={x} y={py(SP[11]) - 54} textAnchor="middle" fill="#FFFFFF" style={TXT(48)}>≈ $85,000</text>
          <g opacity={on(f, k54, 6)}><rect x={x + 30} y={py(putIn[11]) + 10} width={220} height={60} rx={14} fill={C.paper} /><text x={x + 140} y={py(putIn[11]) + 54} textAnchor="middle" fill={C.terraD} style={TXT(44)}>IN: $54,000</text></g></g> })()}</g>
        {/* 2008: the storm */}
        <g opacity={storm}><Storm x={px(12)} y={200} s={0.9} f={f} rain={1} bolt={win(f, fell58, fell58 + 16, 4)} /></g>
        <g opacity={win(f, p37, k765 - 10, 8)}>{(() => { const x = px(12); return <g>
          <g opacity={on(f, p37, 6) * (1 - on(f, dropped58, 6))}><rect x={x + 40} y={py(SP[12]) - 150} width={190} height={66} rx={14} fill={C.red} /><text x={x + 135} y={py(SP[12]) - 104} textAnchor="middle" fill="#FFFFFF" style={TXT(50)}>−37%</text></g>
          <g opacity={on(f, k57, 6)}><circle cx={x} cy={py(SP[12])} r={14} fill={C.red} /><rect x={x + 40} y={py(SP[12]) - 150} width={260} height={66} rx={14} fill={C.red} /><text x={x + 170} y={py(SP[12]) - 104} textAnchor="middle" fill="#FFFFFF" style={TXT(48)}>≈ $57,000</text></g>
          <g opacity={on(f, k585, 6)}><rect x={x + 40} y={py(putIn[12]) + 14} width={240} height={60} rx={14} fill={C.paper} /><text x={x + 160} y={py(putIn[12]) + 58} textAnchor="middle" fill={C.terraD} style={TXT(44)}>IN: $58,500</text></g>
          <g opacity={on(f, behind59, 8)}><text x={x + 170} y={py(SP[12]) - 180} textAnchor="middle" fill={C.ink} style={TXT(48)}>{f >= behind59 ? 'BEHIND ON PAPER' : ''}</text></g>
        </g> })()}</g>
        <g opacity={win(f, thirteen59, keeps60, 8)}><rect x={px(12) - 260} y={py(SP[12]) - 40} width={200} height={60} rx={14} fill={C.ink} /><text x={px(12) - 160} y={py(SP[12]) + 4} textAnchor="middle" fill="#FFFFFF" style={TXT(42)}>{f >= saving59 ? '13 YEARS IN' : '13 YEARS'}</text></g>
        <g opacity={win(f, paper59, keeps60, 8)}><rect x={px(12) - 70} y={py(SP[12]) + 40} width={140} height={90} rx={6} fill={C.paper} stroke="#D9C29A" strokeWidth={4} transform={`rotate(-6 ${px(12)} ${py(SP[12]) + 85})`} /><text x={px(12)} y={py(SP[12]) + 98} textAnchor="middle" fill={C.red} style={TXT(36)}>PAPER</text></g>
        <g opacity={win(f, moment60, automatic60, 8)}><circle cx={px(12)} cy={py(SP[12])} r={40 + 8 * Math.sin(f / 4)} fill="none" stroke={C.red} strokeWidth={8} /></g>
        {f >= sell60 && f < automatic60 + 10 && [0, 1, 2].map((k) => { const t = span(f, sell60 + k * 5, sell60 + k * 5 + 20); return <Coin key={k} x={lerp(px(12), px(12) - 200 - k * 40, t)} y={lerp(py(SP[12]), py(SP[12]) + 120, t) - 90 * Math.sin(t * Math.PI)} s={0.35} o={(1 - t) * 0.9} /> })}
        <g opacity={win(f, stop60, automatic60, 8)}><text x={px(12) - 200} y={py(SP[12]) + 200} textAnchor="middle" fill={C.red} style={TXT(44)}>{f >= sell60 ? 'STOP OR SELL?' : 'STOP?'}</text></g>
        {/* coins keep dropping into the dip */}
        {f >= keeps60 && f < y2012 + 20 && [0, 1, 2].map((k) => { const t = ((f - keeps60) / 30 + k / 3) % 1, x = px(12 + k * 0.8); return <Coin key={k} x={x} y={lerp(240, py(SP[12]) - 30, t)} s={0.4} o={1 - t} /> })}
        <g opacity={win(f, lower60, y2012, 8)}><text x={px(13)} y={YB - 40} textAnchor="middle" fill={C.ink} style={TXT(46)}>BUYING AT LOWER PRICES</text></g>
        {/* 2012 */}
        <g opacity={win(f, k122, thirty62 + 4, 8)}>{(() => { const x = px(16); return <g><circle cx={x} cy={py(SP[16])} r={14} fill={C.greenD} />
          <rect x={x - 140} y={py(SP[16]) - 100} width={280} height={66} rx={14} fill={C.greenD} /><text x={x} y={py(SP[16]) - 54} textAnchor="middle" fill="#FFFFFF" style={TXT(48)}>≈ $122,000</text>
          <g opacity={on(f, k765 - 30, 6)}><rect x={x + 30} y={py(putIn[16]) + 10} width={230} height={60} rx={14} fill={C.paper} /><text x={x + 145} y={py(putIn[16]) + 54} textAnchor="middle" fill={C.terraD} style={TXT(44)}>IN: $76,500</text></g></g> })()}</g>
        <g opacity={win(f, gone61, thirty62, 8)}>{Array.from({ length: 6 }, (_, k) => <Coin key={k} x={px(16) + 40} y={py(putIn[16]) + 90 - k * 14} s={0.3} o={on(f, gone61 + k * 3, 6)} />)}</g>
        <g opacity={win(f, account61, thirty62, 8) * (0.4 + 0.3 * Math.sin(f / 6))}>{hill && <path d={hill} fill={C.goldL} />}</g>
        {/* 2025 */}
        <g opacity={on(f, k900, 8)}>{(() => { const x = px(29); return <g><circle cx={x} cy={py(SP[29])} r={16} fill={C.greenD} />
          <rect x={x - 330} y={py(SP[29]) - 40} width={300} height={74} rx={16} fill={C.greenD} /><text x={x - 180} y={py(SP[29]) + 12} textAnchor="middle" fill="#FFFFFF" style={TXT(56)}>≈ $900,000</text></g> })()}</g>
        <g opacity={on(f, k135, 8)}><rect x={px(29) - 300} y={py(putIn[29]) - 90} width={280} height={60} rx={14} fill={C.paper} /><text x={px(29) - 160} y={py(putIn[29]) - 46} textAnchor="middle" fill={C.terraD} style={TXT(44)}>IN: $135,000</text></g>
        <g opacity={on(f, k184, 8)}><rect x={px(29) + 90} y={py(TB[29]) - 34} width={220} height={60} rx={14} fill={C.waterD} /><text x={px(29) + 200} y={py(TB[29]) + 10} textAnchor="middle" fill="#FFFFFF" style={TXT(44)}>CASH: $184K</text></g>
        {/* three honest notes */}
        <g transform="translate(700 380)">
          <g opacity={note(fees64)}><rect x={-160} y={-40} width={320} height={66} rx={14} fill={C.paper} /><text y={8} textAnchor="middle" fill={C.ink} style={TXT(44)}>BEFORE FEES + TAXES</text></g>
          <g opacity={note(past64)} transform="translate(0 90)"><rect x={-160} y={-40} width={320} height={66} rx={14} fill={C.paper} /><text y={8} textAnchor="middle" fill={C.ink} style={TXT(44)}>PAST ≠ FUTURE</text></g>
          <g opacity={note(prices64)} transform="translate(0 180)"><rect x={-160} y={-40} width={320} height={66} rx={14} fill={C.paper} /><text y={8} textAnchor="middle" fill={C.ink} style={TXT(44)}>{f >= doubled64 ? 'PRICES × 2.1' : 'PRICES'}</text></g>
        </g>
        {/* the gap */}
        <g opacity={on(f, even65, 10)}>{(() => { const x = px(29) + 60; return <g><line x1={x} y1={py(SP[29])} x2={x} y2={py(TB[29])} stroke={C.gold} strokeWidth={14} strokeLinecap="round" />
          <g opacity={on(f, gap65, 8)} transform={`translate(0 ${-8 * pop(f, enormous65, 12) + 8})`}><rect x={x - 250} y={(py(SP[29]) + py(TB[29])) / 2 - 40} width={230} height={74} rx={16} fill={C.gold} /><text x={x - 135} y={(py(SP[29]) + py(TB[29])) / 2 + 14} textAnchor="middle" fill={C.ink} style={TXT(56)}>THE GAP</text></g></g> })()}</g>
        {/* Maya reacts at the foot of the hill */}
        <Person f={f} who="investorF" beats={bBeats} x={150} y={GROUND + 20} s={0.7} />
      </g>}

      <Headline f={f} lines={[[heavy53, 'STEP 5: AUTOPILOT', C.ink, 100], [hardest55, 'THE HARD PART: NOT STOPPING', C.ink, 92], [test56, "MAYA'S PLAN, 1996 → 2025", C.ink, 96], [y2008, '2008: THE MARKET FELL ≈ 37%', C.ink, 92], [automatic60, 'THE MONEY KEPT GOING IN', C.ink, 96], [thirty62, 'AFTER 30 YEARS', C.greenD, 100], [fees64, 'TO BE FAIR', C.ink, 100], [gap65, 'STILL AN ENORMOUS GAP', C.ink, 96]]} />
    </g>
  )
}

export const SV_AUTO = makePiece('sv-auto', 'Step five, autopilot: a drip pipe with a timer valve runs from Maya\'s PAYCHECK mailbox to her 401(K) crate tree; a month calendar flips and each flip drops a $250 coin and the employer\'s $125 coin into the pipe ($375 a month); Maya leans back; a red STOP lever on the valve is crossed (not stopping); history as a hillside: her account 1996-2025 grows as a green hill over the dashed money-put-in line: 2007 ≈$85,000 vs $54,000; a storm over 2008, −37%, the hill drops to ≈$57,000 under $58,500 (behind on paper); coins keep dropping into the dip (buying at lower prices); 2012 ≈$122,000 vs $76,500; the scale opens to 2025: ≈$900,000 vs $135,000 put in, the T-bill line ends at $184K; notes before fees + taxes, past ≠ future, prices ×2.1; a gold bracket marks the gap', {
  mood: 'light', Component: Auto,
  beats: ["s53:heavy", "s53:lifting", "s53:autopilot", "s61:gone", "s61:account", "s65:even", "s54:leave", "s54:month", "s54:automatically", "s54:employer's", "s54:375", "s54:without", "s54:deciding", "s55:because", "s55:automatic", "s55:hardest", "s55:picking", "s55:not", "s55:stopping", "s56:start", "s56:500", "s57:gone", "s57:account", "s59:saving", "s59:paper", "s60:moment", "s60:sell", "s56:test", "s56:history", "s56:4500", "s56:dividends", "s57:2007", "s57:54000", "s57:85000", "s58:2008", "s58:fell", "s58:37", "s58:dropped", "s58:57000", "s59:58500", "s59:thirteen", "s59:behind", "s60:stop", "s60:automatic", "s60:keeps", "s60:buying", "s60:lower", "s61:2012", "s61:76500", "s61:122000", "s62:thirty", "s62:2025", "s62:135000", "s62:grown", "s62:900000", "s63:treasury", "s63:184000", "s64:fees", "s64:past", "s64:prices", "s64:doubled", "s65:gap", "s65:enormous", "s56:1996", "s54:follow", "s56:started", "s58:account", "s59:less", "s59:gone", "s62:went", "s63:same", "s63:cash", "s64:thirty"],
  sfx: [['s53:autopilot', 'click', 0.12], ['s54:250', 'coin', 0.12], ['s55:not', 'thud', 0.12], ['s58:fell', 'crack', 0.16], ['s60:keeps', 'coin', 0.1], ['s62:900000', 'chime', 0.15]] })
