// ---------------------------------------------------------------- s44–s57b: built for people who won't come.
// A) The gym assembles piece by piece; ten first-timers line up, four glow (40% never belonged to a gym); a $15 tag,
//    windows light up, a friendly smile badge over the door; one nervous first-timer at the door smiles and walks in.
// B) Casual members: empty machines while coins still arrive from homes; a month strip with weeks crossed out and a tiny
//    coin; calendar pages flip, a coin with each, an unsigned cancel form waits.
// C) The revolving door: ten members, half walk out each year, new ones walk in; one bar 7,200 → half → refilled by
//    3,600 new sign-ups; a loop: big plans → pays → comes less → round again.
// D) Scale: a map of small gyms lights up (2,896 clubs, 20.8 million members); a coin with $19.51; a pot fills to about
//    $140k a month while the gym's windows stay mostly dark; two bars 2011 → 2025 (5,900 → 7,200) beside a floor plan
//    of the same size (20,000 sq ft).
import React from 'react'
import { Mini } from '../../rig/Mini'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Calendar, Coin, Doc, fly, Headline, Label, Person, win } from '../aimoney/common'
import { FloorPlan, GymFront, KeyTag, MiniGym, Pot, Treadmill, VisitStrip } from './kit'

const LOOKS = ['buyer', 'investor', 'hero', 'worker', 'owner', 'investorF']

const Built: React.FC<PieceProps> = ({ f, c }) => {
  const s44 = c('s44'), built = c('s44:built'), member44 = c('s44:member')
  const y2025 = c('s55:2025'), paper = c('s57a:paper'), average57 = c('s57b:average')
  const chief = c('s45:chief'), d40 = c('s45:40'), never45 = c('s45:never')
  const low = c('s46:low'), bright = c('s46:bright'), judgment = c('s46:judgmentfree'), casual = c('s46:casual')
  const easy = c('s46a:easy'), safe = c('s46a:safe'), foot = c('s46a:foot')
  const good = c('s47:good'), crowd = c('s47:crowd'), pay47 = c('s47:pay')
  const skipping = c('s48:skipping'), loss = c('s48:loss'), monthly48 = c('s48:monthly'), low48 = c('s48:low')
  const months = c('s49:months'), cancelling = c('s49:cancelling')
  const leave = c('s50:leave'), lot = c('s50:lot'), lose = c('s51:lose'), npr51 = c('s51:npr'), half = c('s51:half'), signing = c('s52:signing')
  const d7200a = c('s52a:7200'), halfA = c('s52a:half'), d3600 = c('s52a:3600'), level = c('s52a:level')
  const big = c('s53:big'), pays53 = c('s53:pays'), less = c('s53:less'), machine = c('s53:machine')
  const huge = c('s54:huge'), d208 = c('s55:208'), d2896 = c('s55:2896')
  const d19 = c('s56:19'), month56 = c('s56:month'), club57 = c('s57:club'), d140 = c('s57:140'), fees = c('s57:fees'), mostly = c('s57:mostly'), building = c('s57:building')
  const fuller = c('s57a:fuller'), d5900 = c('s57b:5900'), d7200b = c('s57b:7200'), d20000 = c('s57b:20000')
  const A = win(f, s44, good), B = win(f, good, leave), C = win(f, leave, huge), D = on(f, huge, 12)
  // # the revolving membership: who has left / joined by now
  const outN = (f >= leave ? 1 : 0) + (f >= lot ? 1 : 0) + Math.round(3 * span(f, half, half + 30)), inN = Math.round(5 * span(f, signing, signing + 30))
  const loopT = f >= big ? ((f - big) / 90) % 1 : 0
  return (
    <g>
      <Stage id="gm-built" frame={f} />
      <Headline f={f} lines={[[built, 'BUILT FOR CASUAL MEMBERS', P.ink, 100], [d40, '40% NEW TO GYMS', P.goldInk, 110], [casual, 'THE CASUAL FIRST-TIMER', P.ink, 100], [good, 'PAYS, RARELY COMES', P.ink, 104], [leave, 'HALF LEAVE EACH YEAR', P.coralInk, 104], [d3600, '≈ 3,600 NEW SIGN-UPS', P.goldInk, 104], [huge, '', P.ink], [d2896, '2,896 CLUBS · 20.8M MEMBERS', P.ink, 92], [d140, '≈ $140K A MONTH PER CLUB', P.goldInk, 100], [fuller, 'FULLER ON PAPER', P.ink, 104]]} />
      {/* # the drawing sits a little larger on the stage (static, never a zoom) */}
      <g transform="translate(960 900) scale(1.15) translate(-960 -900)">
      {/* # A) the club built for first-timers */}
      {A > 0 && <g opacity={A}>
        <g opacity={1 - on(f, chief, 6) + on(f, low, 6)}>
          <g transform={`translate(1100 900) scale(${lerp(0.6, 1, on(f, built, 20))})`} opacity={on(f, s44, 4)}><GymFront x={0} y={0} s={1.1} lit={on(f, bright, 12)} doors={on(f, easy, 14)} sign="GYM" /></g>
        </g>
        <g opacity={on(f, member44, 4) * (1 - on(f, chief, 6))}><Mini look="buyer" x={1640} y={1000} scale={1.1} frame={f} seed={88} /></g>
        <g opacity={on(f, chief, 4) * (1 - on(f, low, 6))}>
          {Array.from({ length: 10 }, (_, k) => { const glow = k < 4 && f >= d40 + k * 3; return <g key={k}>{glow && <circle cx={420 + k * 120} cy={880} r={62 + 12 * on(f, never45, 6)} fill={P.gold} opacity={0.4} />}<Mini look={LOOKS[k % 6]} x={420 + k * 120} y={1000} scale={1} frame={f} seed={k + 80} mood={glow ? 'happy' : 'neutral'} /></g> })}
          <g opacity={on(f, c('s45:before'), 4)}><Label x={600} y={720} text="NEVER IN A GYM BEFORE" size={46} font="Bebas Neue" color={P.goldInk} /><path d="M420 760 L420 780 L780 780 L780 760" fill="none" stroke={P.goldInk} strokeWidth={4} /></g>
        </g>
        <g opacity={on(f, low, 4)}>
          <g transform={`translate(420 560) scale(${pop(f, low)}) rotate(${-10 * (1 - on(f, low, 12))})`} opacity={on(f, c('s46:who'), 4)}><rect x={-100} y={-56} width={200} height={112} rx={20} fill="#F08A3C" /><text x={0} y={24} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 74px "Bebas Neue"' }}>$15</text></g>
          <g opacity={on(f, judgment, 4)} transform={`translate(1100 430) scale(${pop(f, judgment) * (1 + 0.15 * Math.sin(Math.PI * span(f, c('s46:slogan'), c('s46:slogan') + 12)))})`}><circle r={70} fill="#3DDC97" /><path d="M-30 -10 L-30 -16 M30 -10 L30 -16 M-34 18 Q0 46 34 18" stroke="#FFFFFF" strokeWidth={9} strokeLinecap="round" fill="none" /></g>
          <g opacity={on(f, c('s46a:joining'), 4) * (1 - on(f, foot, 4))} transform={`translate(1100 560) scale(${0.45 * pop(f, c('s46a:joining'))})`}><KeyTag x={0} y={0} text="JOIN" /></g>
          <ellipse cx={1100} cy={800} rx={140} ry={160} fill={P.gold} opacity={0.2 * on(f, c('s46a:idea'), 6)} />
          <g opacity={on(f, c('s47:casual'), 4)}><Mini look="worker" x={1300} y={1010} scale={0.9} frame={f} seed={95} mood="happy" /></g>
          {/* # the nervous first-timer at the door relaxes and walks in */}
          <g opacity={on(f, casual, 4)}><Person f={f} who="buyer" beats={[[0, 'nervous', 'worried'], [easy, 'relief', 'smiling'], [safe, 'thumbsUp', 'smiling'], [foot, 'walkA', 'smiling', 'walkB', 10]]} x={lerp(1650, 1160, span(f, foot, foot + 40))} y={1000} s={0.66} o={1 - on(f, foot + 34, 4)} /></g>
        </g>
      </g>}
      {/* # B) the casual member: empty machines, coins still arriving, skipped weeks, months of payments */}
      {B > 0 && <g opacity={B}>
        <g opacity={1 - on(f, skipping, 6)}>
          {[0, 1, 2].map((k) => <Treadmill key={k} x={420 + k * 340} y={880} s={0.9} f={f} />)}
          <g opacity={on(f, crowd, 4)}><Label x={760} y={980} text="EMPTY MACHINES" size={46} font="Bebas Neue" color={P.ink2} /></g>
          <g opacity={on(f, monthly48, 4)} transform="translate(760 560)"><Calendar x={0} y={0} text="MONTH" s={1.1} /></g>
          <g opacity={on(f, low48, 4)} transform={`translate(1000 ${lerp(380, 460, on(f, low48, 12))}) scale(0.6)`}><rect x={-100} y={-56} width={200} height={112} rx={20} fill="#F08A3C" /><text x={0} y={24} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 74px "Bebas Neue"' }}>$15</text></g>
          <g opacity={on(f, pay47, 4)}>{[0, 1, 2].map((k) => <Mini key={k} look={LOOKS[k + 1]} x={1300 + k * 130} y={1000} scale={0.9} frame={f} seed={k + 90} />)}
            {Array.from({ length: 6 }, (_, k) => { const p = fly(f, pay47 + k * 8, [1300 + (k % 3) * 130, 820], [760, 560], 24, 140); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.8} o={p.o} /> : null })}</g>
        </g>
        <g opacity={on(f, skipping, 4) * (1 - on(f, months, 6))}>
          <VisitStrip x={960} y={560} n={1} of={28} w={1100} />
          {[1, 2, 3].map((k) => <line key={k} x1={960 - 550 + k * 275 + 20} y1={530} x2={960 - 550 + (k + 1) * 275 - 20} y2={590} stroke={P.coralInk} strokeWidth={6} opacity={on(f, skipping + k * 4, 4)} />)}
          <g opacity={on(f, loss, 4)}><Coin x={960} y={760} s={0.55} text="15" /><Label x={960} y={850} text="SMALL LOSS" size={46} font="Bebas Neue" color={P.ink2} /></g>
        </g>
        <g opacity={on(f, months, 4)}>
          {Array.from({ length: 5 }, (_, k) => <g key={k} opacity={on(f, (k === 0 ? c('s49:keep') : months) + k * 6, 6)} transform={`translate(${520 + k * 150} ${620 - k * 10}) rotate(${-8 + k * 4}) scale(1.2)`}><Calendar x={0} y={0} text={['JAN', 'FEB', 'MAR', 'APR', 'MAY'][k]} s={1} /><Coin x={0} y={140} s={0.6} text="15" /></g>)}
          <g opacity={on(f, cancelling, 4)}><Doc x={1500} y={640} s={1.1} r={4} title="CANCEL" lines={4} /></g>
        </g>
      </g>}
      {/* # C) the revolving door */}
      {C > 0 && <g opacity={C}>
        <g opacity={1 - on(f, d7200a, 6)}>
          <g opacity={on(f, c('s51'), 4) * (1 - on(f, signing, 6))} transform={`rotate(${lerp(12, 5, on(f, npr51, 6))} 1560 460)`}><Doc x={1560} y={460} s={1} r={0} title="NPR 2014" lines={3} /></g>
          <g opacity={on(f, c('s51:year'), 4) * (1 - on(f, signing, 6))} transform="translate(360 460) scale(1.1)"><Calendar x={0} y={0} text="YEAR" s={1} /></g>
          <ellipse cx={960} cy={760} rx={130} ry={120} fill={P.gold} opacity={0.25 * on(f, c('s52:gym'), 6) * (1 - on(f, d7200a, 4))} />
          <GymFront x={960} y={860} s={0.8} doors={1} lit={1 - 0.6 * on(f, lose, 4) * (1 - on(f, lose + 10, 4))} />
          {Array.from({ length: 10 }, (_, k) => { const out = k < outN, x = 600 + k * 80 + (out ? -lerp(0, 700, span(f, (k === 0 ? leave : k === 1 ? lot : half) + k * 4, (k === 0 ? leave : k === 1 ? lot : half) + k * 4 + 40)) : 0); return <Mini key={k} look={LOOKS[k % 6]} x={x} y={1010} scale={0.8} frame={f} seed={k + 100} mood={out ? 'sad' : 'neutral'} /> })}
          <g opacity={on(f, c('s52:same'), 4)}><line x1={560} y1={880} x2={1560} y2={880} stroke={P.goldInk} strokeWidth={5} strokeDasharray="14 10" /></g>
          <g opacity={on(f, c('s52a:club'), 4)}><Label x={960} y={500} text="ONE CLUB" size={50} font="Bebas Neue" color={P.goldInk} /></g>
          {Array.from({ length: 5 }, (_, k) => k < inN ? <Mini key={k} look={LOOKS[(k + 3) % 6]} x={lerp(2000, 1160 + k * 80, span(f, signing + k * 6, signing + k * 6 + 40))} y={1010} scale={0.8} frame={f} seed={k + 120} mood="happy" /> : null)}
        </g>
        <g opacity={on(f, d7200a, 4) * (1 - on(f, big, 6))}>
          <rect x={560} y={760 - 400} width={260} height={400} rx={14} fill="#F08A3C" opacity={0.35} />
          <rect x={560} y={760 - 400 * (1 - 0.5 * on(f, halfA, 16)) } width={260} height={400 * (1 - 0.5 * on(f, halfA, 16))} rx={14} fill="#F08A3C" />
          <Label x={690} y={830} text={f >= halfA ? '≈ 3,600 LEFT' : '7,200'} size={50} font="Bebas Neue" color={P.ink} />
          <g opacity={on(f, d3600, 4)}><rect x={1000} y={760 - 200 * on(f, d3600, 20)} width={260} height={200 * on(f, d3600, 20)} rx={14} fill="#3DDC97" /><g opacity={on(f, c('s52a:signups'), 4)}><Label x={1130} y={830} text="+ 3,600 NEW" size={50} font="Bebas Neue" color={P.ink} /></g><g opacity={on(f, c('s52a:year'), 4)} transform="translate(1400 560)"><Calendar x={0} y={0} text="YEAR" s={1} /></g></g>
          <g opacity={on(f, level, 4)}><line x1={520} y1={360} x2={1320} y2={360} stroke={P.goldInk} strokeWidth={5} strokeDasharray="14 10" /><Label x={1480} y={376} text="SAME SIZE" size={46} font="Bebas Neue" color={P.goldInk} /></g>
        </g>
        <g opacity={on(f, big, 4)}>
          <ellipse cx={960} cy={620} rx={420} ry={240} fill="none" stroke={P.ink2} strokeWidth={5} strokeDasharray="10 14" opacity={on(f, machine, 6)} />
          {[[big, 'BIG PLANS', 960, 380], [pays53, 'PAYS', 1380, 620], [less, 'COMES LESS', 960, 860]].map(([at, t, x, y], k) => <g key={k} opacity={on(f, at as number, 4)}><circle cx={x as number} cy={y as number} r={80} fill={P.card} stroke={P.edge} strokeWidth={4} /><Label x={x as number} y={(y as number) + 130} text={t as string} size={44} font="Bebas Neue" color={P.ink} />
            {k === 0 && <text x={x as number} y={(y as number) + 22} textAnchor="middle" style={{ font: '400 70px "Bebas Neue"' }} fill={P.goldInk}>★</text>}
            {k === 1 && <Coin x={x as number} y={y as number} s={0.8} text="15" />}
            {k === 2 && <Treadmill x={(x as number) - 10} y={(y as number) + 40} s={0.4} f={f} />}</g>)}
          {f >= machine && (() => { const a = loopT * Math.PI * 2 - Math.PI / 2; return <Mini look="buyer" x={960 + Math.cos(a) * 420} y={620 + Math.sin(a) * 240 + 60} scale={0.7} frame={f} seed={130} /> })()}
        </g>
      </g>}
      {/* # D) scale */}
      {D > 0 && <g opacity={D}>
        <g opacity={1 - on(f, d19, 6)}>
          {Array.from({ length: 60 }, (_, k) => <MiniGym key={k} x={360 + (k % 12) * 110} y={420 + Math.floor(k / 12) * 110} s={0.9} o={on(f, d2896 + k * 0.4, 4) + 0.2 * on(f, huge, 4) + 0.25 * on(f, y2025 + k * 0.2, 4)} />)}
          <g opacity={on(f, d208, 4)}>{Array.from({ length: 40 }, (_, k) => <circle key={k} cx={360 + (k * 37) % 1220} cy={420 + ((k * 53) % 440)} r={7} fill="#5BCBFF" opacity={0.8} />)}</g>
        </g>
        <g opacity={on(f, d19, 4) * (1 - on(f, fuller, 6))}>
          <g transform={`translate(520 560) scale(${pop(f, c('s56:paid'))})`}><Coin x={0} y={0} s={2} text="$" /></g>{[0, 1, 2].map((k) => <Coin key={k} x={420 + k * 100} y={420} s={0.8} o={on(f, month56 + k * 3, 4)} />)}
          <Label x={520} y={720} text="≈ $19.51 A MONTH, EACH" size={44} font="Bebas Neue" color={P.ink} />
          <g opacity={on(f, c('s57:7200'), 4) * (1 - on(f, mostly, 4))}>{Array.from({ length: 8 }, (_, k) => <Mini key={k} look={LOOKS[k % 6]} x={1300 + (k % 4) * 110} y={1040 - Math.floor(k / 4) * 0} scale={0.6} frame={f} seed={k + 210} />)}</g>
          <g opacity={on(f, club57, 4)}><Pot x={1000} y={900} s={0.95} fill={0.15 * on(f, club57, 6) + 0.85 * on(f, d140, 40)} label="ONE CLUB" /></g>
          {Array.from({ length: 6 }, (_, k) => { const p = fly(f, fees + k * 4, [520, 480], [1000, 640], 18, 120); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.7} o={p.o} /> : null })}
          <g opacity={on(f, mostly, 4)}>{[0, 1].map((k) => <Mini key={k} look={['buyer', 'worker'][k]} x={1460 + k * 200} y={620} scale={0.8} frame={f} seed={k + 200} />)}</g>
          <g opacity={on(f, building, 4)}><GymFront x={1560} y={900} s={0.5} lit={0.1} /><Label x={1560} y={980} text="MOSTLY EMPTY" size={44} font="Bebas Neue" color={P.ink2} /></g>
        </g>
        <g opacity={on(f, paper, 4) * (1 - on(f, average57, 6))}><Doc x={960} y={600} s={1.5} r={-3} title="MEMBERS" lines={6} /></g>
        <g opacity={on(f, average57, 4)}>
          <rect x={460} y={900 - 330 * on(f, d5900, 16)} width={200} height={330 * on(f, d5900, 16)} rx={14} fill="#5BCBFF" /><Label x={560} y={960} text="2011" size={46} font="Bebas Neue" color={P.ink} /><Label x={560} y={880 - 330 * on(f, d5900, 16)} text="≈ 5,900" size={46} font="Bebas Neue" color={P.ink} o={on(f, d5900, 4)} />
          <rect x={760} y={900 - 400 * on(f, d7200b, 16)} width={200} height={400 * on(f, d7200b, 16)} rx={14} fill="#F08A3C" /><Label x={860} y={960} text="2025" size={46} font="Bebas Neue" color={P.ink} o={on(f, c('s57b:by'), 4)} /><Label x={860} y={880 - 400 * on(f, d7200b, 16)} text="≈ 7,200" size={46} font="Bebas Neue" color={P.ink} o={on(f, d7200b, 4)} />
          <g opacity={on(f, d20000, 4)}><FloorPlan x={1420} y={640} w={500} h={300} cols={20} rows={12} taken={0} /><Label x={1420} y={880} text="≈ 20,000 SQ FT" size={46} font="Bebas Neue" color={P.ink} /></g>
        </g>
      </g>}
      </g>
      <Vignette id="gm-built" />
    </g>
  )
}

export const GM_BUILT = makePiece('gm-built', 'Gym long: built for first-timers (40% never in a gym; $15, bright clubs, friendly badge); casual members pay and skip; half leave each year, 3,600 new sign-ups keep 7,200 level; the loop; 2,896 clubs, 20.8M members, $19.51, ≈ $140k a month per club; 5,900 → 7,200 members in the same floor', {
  mood: 'dark', Component: Built,
  beats: ["s44", "s44:built", "s44:member", "s55:2025", "s57a:paper", "s57b:average", "s45:chief", "s45:40", "s45:never", "s46:low", "s46:bright", "s46:judgmentfree", "s46:casual", "s46a:easy", "s46a:safe", "s46a:foot", "s47:good", "s47:crowd", "s47:pay", "s48:skipping", "s48:loss", "s48:monthly", "s48:low", "s49:months", "s49:cancelling", "s50:leave", "s50:lot", "s51:lose", "s51:npr", "s51:half", "s52:signing", "s52a:7200", "s52a:half", "s52a:3600", "s52a:level", "s53:big", "s53:pays", "s53:less", "s53:machine", "s54:huge", "s55:208", "s55:2896", "s56:19", "s56:month", "s57:club", "s57:140", "s57:fees", "s57:mostly", "s57:building", "s57a:fuller", "s57b:5900", "s57b:7200", "s57b:20000", "s45:before", "s46:who", "s46:slogan", "s46a:joining", "s46a:idea", "s47:casual", "s49:keep", "s51", "s51:year", "s52:gym", "s52:same", "s52a:club", "s52a:signups", "s52a:year", "s56:paid", "s57:7200", "s57b:by"],
  sfx: [['s44:built', 'pop', 0.3], ['s45:40', 'chime', 0.3], ['s46a:foot', 'swish', 0.3], ['s47:pay', 'coin', 0.35], ['s49:months', 'flutter', 0.3], ['s51:half', 'swish', 0.3], ['s52a:3600', 'pop', 0.3], ['s53:machine', 'whoosh', 0.3], ['s55:2896', 'tick', 0.3], ['s57:140', 'cash', 0.35], ['s57b:7200', 'pop', 0.3]] })
