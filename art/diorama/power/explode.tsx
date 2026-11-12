// ---------------------------------------------------------------- s49–s64: the year the price exploded (navy mood).
// A) One plant on a pedestal (one megawatt) with a day dial that runs round once (one day). June 2024: a short coin stack,
//    $29. June 2025: the stack shoots up to $270. "Nine times": nine short stacks line up beside the tall one.
// B) The whole region's capacity bill: a jar fills from $2.2 billion to $14.7 billion as each is said.
// C) PJM's reasons: an old plant's lights go out and its gate locks (closing); a forecast board's arrow climbs. The
//    market monitor walks in with a magnifier, looks closer, and a data center appears inside the lens, growing.
// D) What the forecast counts: data centers that already run (solid) and planned ones (dashed outlines) popping up fast.
//    The peak-demand bar rises +5,250 MW; then almost all of it turns data-center blue: ≈ 5,100 MW.
// E) More promises: the staircase; the need reaches one more step; the price line climbs; a family's home rides up too.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Calendar, Coin, Headline, Jar, Label, Person, Tick, win } from '../aimoney/common'
import { DataHall, Home, PowerPlant } from './kit'
import { Ground, Magnifier } from './kit2'

const GROUND = 920
const Stack: React.FC<{ x: number; y: number; n: number; s?: number; o?: number }> = ({ x, y, n, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {Array.from({ length: Math.max(0, Math.round(n)) }, (_, k) => <g key={k}><ellipse cx={0} cy={-k * 16} rx={56} ry={13} fill={P.goldD} /><ellipse cx={0} cy={-k * 16 - 5} rx={56} ry={13} fill={P.gold} /></g>)}
  </g>
)

const Explode: React.FC<PieceProps> = ({ f, c }) => {
  const s49 = c('s49'), megawatt = c('s49:megawatt'), ready49 = c('s49:ready'), day49 = c('s49:day')
  const june50 = c('s50:june'), d29 = c('s50:29')
  const june51 = c('s51:june'), d270 = c('s51:270')
  const nine = c('s52:nine')
  const total = c('s53:total'), whole = c('s53:whole'), year53 = c('s53:year'), d22 = c('s53:22'), d147 = c('s53:147')
  const reasons = c('s54:reasons'), closing = c('s54:closing'), higher = c('s54:higher'), forecast54 = c('s54:forecast')
  const watchdog = c('s55:watchdog'), monitor = c('s55:monitor'), closer = c('s55:closer')
  const data56 = c('s56:data'), main = c('s56:main'), climbed = c('s56:climbed')
  const s57 = c('s57'), counts = c('s58:counts'), already = c('s58:already'), plan58 = c('s58:plan'), build = c('s58:build'), growing = c('s59:growing')
  const s63 = c('s63'), promise50 = c('s50:promise'), year51 = c('s51:year'), same51 = c('s51:same'), need54 = c('s54:need'), before60 = c('s60:before'), further63 = c('s63:further'), including64 = c('s64:including'), forecast60 = c('s60:forecast'), june60 = c('s60:june'), peak60 = c('s60:peak'), d5250 = c('s60:5250'), d5100 = c('s61:5100'), data61 = c('s61:data')
  const s62 = c('s62'), more62 = c('s62:more'), reach = c('s63:reach'), expensive63 = c('s63:expensive'), oneprice = c('s64:oneprice'), paid64 = c('s64:paid'), every64 = c('s64:every'), home64 = c('s64:home')
  const AB = total - 4, BC = reasons - 4, CD = s57 - 2, DE = s62 - 4
  const A = win(f, s49, AB), B = win(f, AB, BC), C = win(f, BC, CD), D = win(f, CD, DE), E = on(f, DE, 8)
  const tall = lerp(2, 2 + 16 * on(f, d270, 24), f >= june51 ? 1 : 0) // # stack height in coins: $29 ≈ 2, $270 ≈ 18
  return (
    <g>
      <Stage id="pw-explode" frame={f} />
      <Headline f={f} lines={[[megawatt, '1 MEGAWATT', P.ink, 96], [day49, '1 MEGAWATT · 1 DAY', P.ink, 96], [june50, '', P.ink], [nine, 'MORE THAN 9×', P.coralInk, 112], [total, '', P.ink], [monitor, 'THE MARKET MONITOR', P.ink, 100], [s57, '', P.ink], [d5250, '+5,250 MW OF PEAK DEMAND', P.ink, 96], [d5100, '≈ 5,100 MW', P.skyInk, 104], [data61, '≈ 5,100 MW FROM DATA CENTERS', P.skyInk, 96], [s62, '', P.ink]]} />

      {/* # A) one megawatt for one day: $29 → $270 */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} dark />
        <g opacity={on(f, s49, 8)}>
          <ellipse cx={420} cy={GROUND - 4} rx={220} ry={40} fill={P.navy4} />
          <ellipse cx={420} cy={GROUND - 4} rx={240} ry={48} fill={P.gold} opacity={0.35 * on(f, promise50, 8) * (1 - on(f, promise50 + 20, 10))} />
          <PowerPlant x={420} y={GROUND - 20} s={0.72} ready={on(f, ready49, 10)} f={f} />
          {/* # the day dial: a sun runs once round on "one day" */}
          <g opacity={on(f, day49, 8)} transform={`translate(420 ${GROUND - 520})`}>
            <circle r={70} fill="none" stroke={P.navy4} strokeWidth={14} />
            <circle r={70} fill="none" stroke={P.gold} strokeWidth={14} strokeDasharray={440} strokeDashoffset={440 * (1 - on(f, day49, 30))} transform="rotate(-90)" />
            <circle cx={70 * Math.cos(-Math.PI / 2 + 2 * Math.PI * on(f, day49, 30))} cy={70 * Math.sin(-Math.PI / 2 + 2 * Math.PI * on(f, day49, 30))} r={18} fill={P.gold} />
          </g>
        </g>
        {/* # the price stack for that promise: June 2024, then June 2025 */}
        <g opacity={on(f, june50, 8)}>
          <Calendar x={1000} y={300} s={1.3} text="" flip={f >= june51 ? on(f, june51, 10) : on(f, year51, 10)} />
          <Label x={1000} y={470} text={f < june51 ? (f < june50 + 12 ? 'JUNE' : 'JUNE 2024') : (f < june51 + 12 ? 'JUNE' : 'JUNE 2025')} size={64} font="Bebas Neue" color={P.ink} />
          <g transform={`translate(${6 * Math.sin(f) * on(f, same51, 4) * (1 - on(f, same51 + 12, 6))} 0)`}><Stack x={1000} y={GROUND - 20} n={f >= d29 || f >= june51 ? tall : 0} s={1.1} /></g>
          <g opacity={f >= june51 ? on(f, d270, 8) : on(f, d29, 8)}><Label x={1150} y={GROUND - 40 - (f >= june51 ? 16 * 1.1 * tall : 40)} text={f >= june51 ? '$270' : '$29'} size={80} font="Bebas Neue" color={f >= june51 ? P.coralInk : P.goldInk} /></g>
        </g>
        {/* # nine short stacks ($29 each) line up beside the tall one */}
        {Array.from({ length: 9 }, (_, k) => <g key={k} opacity={on(f, nine + k * 2, 6)}><Stack x={1340 + (k % 3) * 160} y={GROUND - 20 - Math.floor(k / 3) * 150} n={2} s={0.8} /></g>)}
      </g>}

      {/* # B) the region's whole capacity bill in a jar: $2.2 billion → $14.7 billion */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} dark />
        <Jar x={720} y={GROUND - 20} s={2.0} fill={f < d147 ? 0.15 * on(f, d22, 14) : lerp(0.15, 1, on(f, d147, 24))} label={f >= whole ? 'WHOLE REGION' : undefined} />
        <g opacity={on(f, d22, 8) * (1 - on(f, d147, 8))}><Label x={1330} y={GROUND - 260} text="$2.2 BILLION" size={80} font="Bebas Neue" color={P.goldInk} /></g>
        <g opacity={on(f, d147, 8)}><Label x={1330} y={GROUND - 260} text="$14.7 BILLION" size={96} font="Bebas Neue" color={P.coralInk} /></g>
        <g opacity={on(f, year53, 8)}><Label x={1330} y={GROUND - 170} text="A YEAR" size={60} font="Bebas Neue" color={P.ink2} /></g>
      </g>}

      {/* # C) the reasons, then the market monitor's magnifier finds data centers */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} dark />
        {/* # an old plant closing: its lights go out and a padlock lands on its gate */}
        <g opacity={on(f, reasons, 10) * (1 - on(f, closer, 10))}>
          <PowerPlant x={380} y={GROUND} s={1.0} ready={1 - on(f, closing, 14)} f={f} />
          <g opacity={on(f, closing + 6, 8)} transform={`translate(560 ${GROUND - 80 - 30 * (1 - on(f, closing + 6, 10))})`}><path d="M-22 -10 L-22 -34 Q0 -60 22 -34 L22 -10" fill="none" stroke={P.goldD} strokeWidth={9} /><rect x={-32} y={-14} width={64} height={52} rx={10} fill={P.gold} /></g>
        </g>
        {/* # the forecast board: an arrow climbing */}
        <g opacity={on(f, higher, 10)} transform="translate(980 560)">
          <rect x={-260} y={-200} width={520} height={360} rx={18} fill={P.navy1} stroke={P.navy4} strokeWidth={6} />
          <path d={`M-200 110 L-80 60 L20 70 L${lerp(20, 200, on(f, forecast54, 20))} ${lerp(70, -140, on(f, forecast54, 20)) - 30 * on(f, need54, 10)}`} fill="none" stroke={P.coral} strokeWidth={14} strokeLinejoin="round" strokeLinecap="round" />
          <rect x={-260} y={175} width={520} height={18} rx={9} fill={P.navy4} />
        </g>
        {/* # the market monitor with the magnifier; a data center inside the lens grows on "main reason" */}
        <g opacity={on(f, watchdog, 10)}>
          <Person f={f} who="investorF" beats={[[0, 'walkA', 'neutral', 'walkB', 12], [monitor, 'idle', 'neutral'], [closer, 'point', 'thinking'], [main, 'shock', 'shocked'], [climbed, 'point', 'worried']]} x={lerp(1900, 1560, on(f, watchdog, 30))} y={GROUND} s={0.62} />
          <g opacity={on(f, closer, 10)} transform={`translate(${lerp(1400, 1180, on(f, closer, 16))} ${lerp(560, 520, on(f, closer, 16))})`}>
            <Magnifier x={0} y={0} s={1.1}>
              <g opacity={on(f, data56, 10)} transform={`scale(${lerp(0.12, 0.2, on(f, main, 14))})`}><DataHall x={0} y={160} f={f} lit={1} ai={1} /></g>
            </Magnifier>
          </g>
        </g>
      </g>}

      {/* # D) the forecast counts data centers that run and planned ones; +5,250 MW, ≈ 5,100 of it data centers */}
      {D > 0 && <g opacity={D}>
        <Ground y={GROUND} dark />
        {/* # the forecast board waits from "here is why" */}
        <g opacity={on(f, s57, 10) * (1 - on(f, forecast60, 8))}><rect x={160} y={300} width={1000} height={GROUND - 300} rx={18} fill="none" stroke={P.navy4} strokeWidth={6} /><path d={`M220 ${GROUND - 60} L520 ${GROUND - 160} L760 ${GROUND - 140} L${lerp(760, 1080, on(f, counts, 20))} ${lerp(GROUND - 140, 380, on(f, counts, 20))}`} fill="none" stroke={P.coral} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" opacity={0.6} /></g>
        {[[260, already], [560, already + 6]].map(([x, at], k) => <g key={k} opacity={on(f, at, 10)}><DataHall x={x} y={GROUND} s={0.36} f={f} lit={1} ai={1} /></g>)}
        {Array.from({ length: 5 }, (_, k) => {
          const at = k < 2 ? plan58 + k * 5 : build + 6 + (k - 2) * 6 + (k >= 4 ? growing - build : 0)
          const x = 860 + k * 230, y = GROUND
          return <g key={k} opacity={on(f, at, 8) * (1 - on(f, peak60, 10))} transform={`translate(${x} ${y}) scale(${0.3 * pop(f, at)})`}>
            <rect x={-350} y={-280} width={700} height={280} rx={18} fill="none" stroke={P.sky} strokeWidth={12} strokeDasharray="30 20" />
            <rect x={-320} y={-224} width={640} height={150} rx={10} fill="none" stroke={P.sky} strokeWidth={8} strokeDasharray="20 16" opacity={0.6} />
          </g>
        })}
        {/* # the forecast board frame and its date arrive before the bar */}
        <g opacity={on(f, forecast60, 10)}><rect x={1130} y={300} width={420} height={GROUND - 300} rx={18} fill="none" stroke={P.navy4} strokeWidth={6} /></g>
        <g opacity={on(f, june60, 8)}><Calendar x={1700} y={300} s={1.3} text="" /><Label x={1700} y={470} text={f < june60 + 12 ? 'JUNE' : 'JUNE 2027'} size={60} font="Bebas Neue" color={P.ink} /></g>
        {/* # the peak-demand bar (right), then mostly data-center blue */}
        <g opacity={on(f, peak60, 10)} transform="translate(1340 0)">
          <rect x={-150} y={GROUND - 520 * on(f, d5250, 24)} width={300} height={520 * on(f, d5250, 24)} rx={18} fill={P.coral} />
          <rect x={-150} y={GROUND - 520 * on(f, d5250, 24)} width={300} height={505 * on(f, d5250, 24) * on(f, d5100, 20)} rx={18} fill={P.sky} />
          <g opacity={on(f, before60, 8)}><line x1={-200} y1={GROUND - 40} x2={200} y2={GROUND - 40} stroke={P.ink2} strokeWidth={6} strokeDasharray="14 10" /></g>
          <g opacity={on(f, data61, 10)} transform={`translate(0 ${GROUND - 300})`}><DataHall x={0} y={0} s={0.3} f={f} lit={1} ai={1} /></g>
        </g>
      </g>}

      {/* # E) more promises: the need reaches one more step, the line climbs, every promise — even your home's — costs more */}
      {E > 0 && <g opacity={E}>
        <Ground y={GROUND} dark />
        {[110, 160, 210, 260, 340, 430].map((h, k) => {
          const x = 560 + k * 220, need = f >= reach ? 5 : 4, inNeed = k < need
          const line = lerp(260, 340, on(f, oneprice, 16))
          const fill = inNeed ? lerp(Math.max(h, 260), Math.max(h, line), on(f, paid64 + k * 3, 14)) : h
          return <g key={k} opacity={on(f, s62 + k * 3, 8)}>
            <rect x={x - 90} y={GROUND - fill} width={180} height={fill} rx={12} fill={inNeed && fill > h ? P.gold : P.navy3} />
            <rect x={x - 90} y={GROUND - h} width={180} height={h} rx={12} fill={['#2B4A78', '#33558A', '#3A5F93', '#4A6EA3', '#5A7EB3', '#6A8EC3'][k]} stroke={P.navy4} strokeWidth={4} />
            <PowerPlant x={x + 8} y={GROUND - fill} s={0.32} ready={inNeed ? 1 : 0.3} f={f} />
            {k === 4 && <g opacity={Math.max(on(f, more62, 8) * (1 - 0.5 * on(f, s63, 6)), on(f, further63, 8))}><rect x={x - 96} y={GROUND - h - 6} width={192} height={h + 6} rx={14} fill="none" stroke={P.coral} strokeWidth={6} strokeDasharray="12 8" /></g>}
            {k === 4 && <Tick x={x} y={GROUND - fill + 50} o={on(f, expensive63, 8)} r={30} />}
          </g>
        })}
        {(() => { const ly = GROUND - lerp(260, 340, on(f, oneprice, 16)); return <line x1={300} y1={ly} x2={1560} y2={ly} stroke={P.gold} strokeWidth={8} strokeDasharray="18 10" opacity={on(f, s62, 10)} /> })()}
        {/* # your own home rides on the same line */}
        <g opacity={on(f, every64, 10)}>
          {(() => { const h = lerp(260, 340, on(f, home64 - 10, 14)); return <g>
            <rect x={230} y={GROUND - h} width={200} height={h} rx={12} fill={P.gold} />
            <Home x={330} y={GROUND - h} s={0.62} lit={1} />
            <ellipse cx={330} cy={GROUND - h - 100} rx={150} ry={110} fill={P.gold} opacity={0.2 * on(f, including64, 8)} />
          </g> })()}
        </g>
      </g>}
      <Vignette id="pw-explode" />
    </g>
  )
}

const BEATS = ['s49', 's49:megawatt', 's49:ready', 's49:day', 's50:june', 's50:29', 's51:june', 's51:270', 's52:nine', 's53:total', 's53:22', 's53:147', 's54:reasons', 's54:closing', 's54:higher', 's54:forecast', 's55:watchdog', 's55:monitor', 's55:closer', 's56:data', 's56:main', 's56:climbed', 's57', 's58:counts', 's58:already', 's58:plan', 's58:build', 's59:growing', 's60:peak', 's60:5250', 's61:5100', 's61:data', 's62', 's62:more', 's63:reach', 's63:expensive', 's64:oneprice', 's64:paid', 's64:every', 's64:home', 's60:forecast', 's60:june', 's50:promise', 's51:year', 's51:same', 's53:whole', 's54:need', 's60:before', 's63:further', 's64:including', 's63']
export const PW_EXPLODE = makePiece('pw-explode', 'Power long (dark): one megawatt for one day, $29 then $270, nine times; the region bill $2.2bn → $14.7bn; plants closing, forecast up, the market monitor finds data centers; running and planned data centers; +5,250 MW, ≈5,100 from data centers; more promises lift every step, your home too', {
  mood: 'dark', Component: Explode, beats: BEATS,
  sfx: [['s49:day', 'tick', 0.25], ['s50:29', 'coin', 0.3], ['s51:270', 'riser', 0.35], ['s52:nine', 'pop', 0.25], ['s53:147', 'thud', 0.35], ['s54:closing', 'click', 0.3], ['s55:closer', 'swish', 0.3], ['s56:main', 'ding', 0.3], ['s58:plan', 'softpop', 0.25], ['s60:5250', 'riser', 0.3], ['s64:oneprice', 'swish', 0.3], ['s64:home', 'coin', 0.3]] })
