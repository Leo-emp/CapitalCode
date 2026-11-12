// ---------------------------------------------------------------- s45–s66: step four — add it all up (the twins).
// A) Two identical twins with a jar each: the same $500 drops into both, the same 7% arrows rise over both; only the fee is
//    different: Twin A's tag "0.05%" ($5 per $10,000 — an index fund: one basket that buys every company on a list, run by
//    very few people), Twin B's tag "1%" with a collector, a pricier fund and an adviser.
// B) The race: both jars grow; a coral bracket between their tops shows the gap at 10, 20, 30 years ($4,000, $26,000,
//    $93,000), a small gap curve bends upward (slowly, then very fast); at 40: $1.23 million vs $958,000, $268,000 behind.
//    Each twin's $240,000 put-in stack; Twin B's gap is taller than Twin B's whole stack.
// C) The $268,000 gap block splits into ≈ $109,000 of fees paid (solid coral, step 2) and ≈ $159,000 of growth never made
//    (dotted, step 3). At 2%: Twin B's jar sinks to $744,000, under a two-thirds line on Twin A's jar.
import React from 'react'
import { Mini } from '../../rig/Mini'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, Headline, Label, Person, win } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { FundHouse, GhostPile, SaverJar, Scoop, Stack, Spot } from './kit'

const GROUND = 920
const AX = 560, BX = 1260 // # the twins' jars
const Tag: React.FC<{ x: number; y: number; text: string; color?: string; o?: number }> = ({ x, y, text, color = P.ink, o = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}><rect x={-text.length * 16 - 20} y={-38} width={text.length * 32 + 40} height={76} rx={38} fill={P.card} stroke={P.edge} strokeWidth={3} />
    <text y={20} textAnchor="middle" fill={color} style={{ font: '400 56px "Bebas Neue"', letterSpacing: 2 }}>{text}</text></g>
)

const Twins: React.FC<PieceProps> = ({ f, c }) => {
  const add45 = c('s45:add'), d40 = c('s45:40'), twins = c('s46:twins'), same47 = c('s47:same'), d500 = c('s47:500'), seven = c('s47:7'), growth47 = c('s47:growth')
  const fee48 = c('s48:fee'), different = c('s48:different'), small49 = c('s49:small'), number49 = c('s49:number')
  const twinA = c('s50'), index50 = c('s50:index'), d005 = c('s50:005'), d5 = c('s50:5'), d10k = c('s50:10000')
  const index51 = c('s51:index'), buys = c('s51:buys'), list = c('s51:list'), sp = c('s51:sp'), few = c('s51:few'), little = c('s51:little')
  const twinB = c('s52'), d1 = c('s52:1'), pricier = c('s52:pricier'), advisers = c("s52:adviser's"), both = c('s52:both')
  const first53 = c('s53:first'), y10 = c('s54:10'), d4000 = c('s54:4000'), y20 = c('s55:20'), d26 = c('s55:26000'), y30 = c('s56:30'), d93 = c('s56:93000')
  const gap57 = c('s57:gap'), slowly = c('s57:slowly'), fast = c('s57:fast'), against = c('s57:against')
  const y40 = c('s58:40'), d123 = c('s58:123'), d958 = c('s59:958000'), d268 = c('s60:268000'), behind60 = c('s60:behind')
  const remember = c('s61:remember'), d240 = c('s61:240000'), cost62 = c('s62:cost'), saved62 = c('s62:saved')
  const where = c('s63:where'), d109 = c('s64:109000'), step64 = c('s64:step'), d159 = c('s65:159000'), step65 = c('s65:step')
  const d2 = c('s66:2'), d744 = c('s66:744000'), thirds = c('s66:thirds')
  const AB = first53 - 4, BC = where - 4
  const A = win(f, add45, AB), B = win(f, AB, BC), C = on(f, BC, 8)
  // # B: the race — jar heights over time; the year we are at
  const yr = f < y10 ? 2 : f < y20 ? lerp(10, 20, on(f, y20 - 20, 20)) : f < y30 ? lerp(20, 30, on(f, y30 - 20, 20)) : f < y40 ? lerp(30, 40, on(f, y40 - 20, 20)) : 40
  const balA = (y: number) => Math.pow(y / 40, 1.9), balB = (y: number) => balA(y) * (1 - 0.219 * Math.pow(y / 40, 1.6))
  const H = 440, hA = 200 + H * balA(yr), hB = 200 + H * balB(yr) - 200 * (balA(yr) - balB(yr))
  const gapText = f < y10 ? '' : f < y20 ? '$4,000' : f < y30 ? '$26,000' : f < y40 ? '$93,000' : '$268,000'
  const gapAt = f < y20 ? d4000 : f < y30 ? d26 : f < y40 ? d93 : d268
  return (
    <g>
      <Stage id="fe-twins" frame={f} />
      <Spot f={f} at={c("s61:dollars")} x={1560} y={700} rx={160} ry={300} />
      <Spot f={f} at={c("s63:dollars")} x={960} y={740} rx={500} ry={240} />
      <Spot f={f} at={c("s53:same")} x={900} y={700} rx={600} ry={260} />
      <Spot f={f} at={c("s54")} x={900} y={700} rx={600} ry={260} />
      <Spot f={f} at={c("s64:top")} x={720} y={740} rx={220} ry={240} />
      <Spot f={f} at={c("s64:paid#2")} x={720} y={740} rx={220} ry={240} />
      <Spot f={f} at={c("s62:1")} x={1780} y={640} rx={140} ry={320} />
      <Spot f={f} at={c("s49:thing")} x={900} y={700} rx={600} ry={260} />
      <Spot f={f} at={c("s49:except")} x={1260} y={500} rx={200} ry={300} />
      <Spot f={f} at={c("s64:about")} x={720} y={740} rx={220} ry={240} />
      <Spot f={f} at={c("s65:make")} x={1200} y={740} rx={280} ry={240} />
      <Spot f={f} at={c("s47:same#2")} x={560} y={700} rx={200} ry={260} />
      <Spot f={f} at={c("s49:people")} x={900} y={700} rx={600} ry={260} />
      <Spot f={f} at={c("s51:american")} x={910} y={240} rx={280} ry={140} />
      <Spot f={f} at={c("s51:run")} x={1110} y={60} rx={120} ry={80} />
      <Spot f={f} at={c("s53:accounts")} x={900} y={700} rx={600} ry={260} />
      <Spot f={f} at={c("s59:has")} x={1260} y={500} rx={200} ry={300} />
      <Spot f={f} at={c("s62:twin")} x={1780} y={640} rx={140} ry={320} />
      <Spot f={f} at={c("s62:everything")} x={1560} y={640} rx={140} ry={320} />
      <Spot f={f} at={c("s63:268000")} x={960} y={740} rx={500} ry={240} />
      <Spot f={f} at={c("s64:fees")} x={720} y={740} rx={220} ry={240} />
      <Spot f={f} at={c("s65:growth")} x={1200} y={740} rx={280} ry={240} />
      <Spot f={f} at={c("s66:twin")} x={720} y={600} rx={200} ry={360} />
      <Headline f={f} lines={[[d40, 'OVER 40 YEARS', P.ink, 104], [twins, 'TWO TWINS', P.ink, 110], [d500, 'SAME $500 A MONTH', P.ink, 100], [seven, 'SAME 7% GROWTH', P.mintInk, 100], [different, 'ONLY THE FEE IS DIFFERENT', P.coralInk, 100], [twinA, '', P.ink], [first53, '', P.ink], [slowly, 'SLOWLY AT FIRST…', P.ink, 100], [fast, '…THEN VERY FAST', P.coralInk, 104], [y40, '', P.ink], [d268, '≈ $268,000 BEHIND', P.coralInk, 110], [remember, '', P.ink], [saved62, 'MORE THAN TWIN B SAVED', P.coralInk, 100], [where, 'WHERE DID $268,000 GO?', P.ink, 100], [d2, '', P.ink], [d744, 'AT 2%: ≈ $744,000', P.coralInk, 104], [thirds, 'LESS THAN 2/3 OF TWIN A', P.coralInk, 100]]} />

      {/* # A) the twins: same money, same growth, different fee */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        {[[AX, 'A'], [BX, 'B']].map(([x, n], k) => <g key={n as string} opacity={on(f, add45 + k * 4, 8)}>
          <Person f={f} who="buyer" beats={[[0, 'waveA', 'smiling'], [same47, 'reachDown', 'smiling', 'hold', 14], [different, 'idle', k ? 'worried' : 'smiling']]} x={(x as number) - 230} y={GROUND} s={0.7} />
          <SaverJar x={x as number} y={GROUND} w={260} h={400} fill={lerp(0.2, 0.55, span(f, d500, different))} label={`TWIN ${n}`} />
          {f >= d500 && f < different && (() => { const ph = ((f - d500 + k * 6) % 14) / 14; return <Coin x={(x as number) - 140 + 140 * ph} y={lerp(GROUND - 520, GROUND - 400, ph)} s={0.5} /> })()}
          <g opacity={on(f, seven, 8) * (1 - on(f, different, 8))}>{[-60, 0, 60].map((dx, j) => <path key={j} d={`M${(x as number) + dx} ${GROUND - 470} l0 -${50 + 16 * Math.sin(f / 8 + j)} m-16 16 l16 -16 l16 16`} fill="none" stroke={P.mint} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />)}</g>
        </g>)}
        {/* # Twin A: 0.05% — $5 per $10,000 — an index fund basket */}
        <g opacity={on(f, d005, 8)}><Tag x={AX} y={GROUND - 520} text="0.05% A YEAR" color={P.mintInk} /></g>
        <g opacity={on(f, d10k, 8) * (1 - on(f, index51, 8))}><Tag x={AX} y={GROUND - 620} text="$5 PER $10,000" /></g>
        <g opacity={on(f, index51, 10) * (1 - on(f, twinB, 8))} transform="translate(910 220)">
          <rect x={-260} y={-150} width={520} height={250} rx={20} fill={P.card} stroke={P.edge} strokeWidth={3} />
          {/* # the list: rows of company buildings, all bought */}
          {Array.from({ length: 30 }, (_, k) => <rect key={k} x={-230 + (k % 10) * 46} y={-120 + Math.floor(k / 10) * 56 + (k % 3) * 6} width={30} height={40 - (k % 3) * 6} rx={4} fill={['#7FC8D8', '#F3D9A4', '#E8B4C8'][k % 3]} opacity={on(f, buys + k, 4)} />)}
          <g opacity={on(f, sp, 8)}><Label x={0} y={85} text="S&P 500" size={52} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, few, 8)} transform="translate(330 60)"><Mini look="worker" x={0} y={0} scale={0.8} frame={f} seed={3} mood="happy" /><Mini look="investorF" x={50} y={0} scale={0.8} frame={f} seed={4} mood="happy" /></g>
        </g>
        {/* # Twin B: 1% — a collector, a pricier fund, an adviser */}
        <g opacity={on(f, d1, 8)}><Tag x={BX} y={GROUND - 520} text="1% A YEAR" color={P.coralInk} /></g>
        <g opacity={on(f, fee48, 10)}><Scoop x={BX + 230} y={GROUND - 330} s={0.8} r={-20} full={on(f, d1, 8)} /></g>
        <g opacity={on(f, pricier, 8)}><FundHouse x={1610} y={GROUND} s={0.5} sign="PRICIER" color={P.coral} /></g>
        <g opacity={on(f, advisers, 8)}><Person f={f} who="investorF" beats={[[0, 'explain', 'smiling'], [both, 'present', 'smug']]} x={1830} y={GROUND} s={0.55} /></g>
      </g>}

      {/* # B) the race */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <SaverJar x={AX} y={GROUND} w={300} h={hA} fill={0.92} label="TWIN A" />
        <SaverJar x={BX} y={GROUND} w={300} h={hB} fill={0.92} label="TWIN B" />
        {/* # the gap bracket between the jar tops */}
        {f >= y10 && <g opacity={on(f, y10, 8) * (1 - on(f, remember, 10))}>
          <line x1={AX + 170} y1={GROUND - hA} x2={BX + 170} y2={GROUND - hA} stroke={P.coral} strokeWidth={5} strokeDasharray="12 8" />
          <line x1={BX + 170} y1={GROUND - hA} x2={BX + 170} y2={GROUND - hB} stroke={P.coral} strokeWidth={10} />
          <g opacity={on(f, gapAt, 8)}><Label x={BX + 330} y={GROUND - (hA + hB) / 2 + 20} text={gapText} size={64} font="Bebas Neue" color={P.coralInk} /></g>
        </g>}
        <g opacity={on(f, y10, 8) * (1 - on(f, remember, 10))}><Label x={(AX + BX) / 2} y={GROUND + 72} text={`YEAR ${f < y20 ? 10 : f < y30 ? 20 : f < y40 ? 30 : 40}`} size={56} font="Bebas Neue" color={P.ink} /></g>
        {/* # the gap curve: slowly, then very fast */}
        <g opacity={on(f, gap57, 10) * (1 - on(f, y40, 10))} transform="translate(1620 520)">
          <rect x={-130} y={-200} width={260} height={260} rx={16} fill={P.card} stroke={P.edge} strokeWidth={3} />
          <path d={Array.from({ length: 21 }, (_, i) => { const t = i / 20; return `${i ? 'L' : 'M'}${-100 + 200 * t} ${40 - 220 * Math.pow(t, 2.6)}` }).join(' ')} fill="none" stroke={P.coral} strokeWidth={10} strokeLinecap="round" strokeDasharray={600} strokeDashoffset={600 * (1 - span(f, slowly, fast + 20))} />
        </g>
        {/* # 40 years: the two totals */}
        <g opacity={on(f, d123, 8) * (1 - on(f, remember, 10))}><Label x={AX - 300} y={GROUND - hA + 60} text="≈ $1.23M" size={72} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, d958, 8) * (1 - on(f, remember, 10))}><Label x={BX - 330} y={GROUND - hB + 60} text="≈ $958,000" size={66} font="Bebas Neue" color={P.ink} /></g>
        {/* # each put in $240,000; Twin B's gap (as a coral stack) is taller than Twin B's whole put-in stack */}
        <g opacity={on(f, remember, 10)}>
          <Stack x={1520} y={GROUND - 10} n={Math.round(18 * on(f, d240, 14))} w={140} />
          <g opacity={on(f, d240, 8)}><Label x={1520} y={GROUND + 72} text="PUT IN" size={48} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, cost62, 8)}><Stack x={1740} y={GROUND - 10} n={Math.round(20 * on(f, cost62, 16))} w={140} color={P.coral} /><Label x={1740} y={GROUND + 72} text="FEE COST" size={48} font="Bebas Neue" color={P.coralInk} /></g>
        </g>
      </g>}

      {/* # C) the gap splits: fees paid (step 2) and growth never made (step 3); then the 2% case */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <g opacity={1 - on(f, d2, 10)}>
          {(() => { const sp2 = on(f, d109, 16), x0 = 560, w = 800, h = 360, y0 = GROUND - h, wF = w * (109 / 268)
            return <g>
              <rect x={x0} y={y0} width={wF} height={h} rx={18} fill={P.coral} />
              <rect x={x0 + wF + 120 * sp2} y={y0} width={w - wF} height={h} rx={18} fill={on(f, d159, 8) > 0 ? '#FFF6E2' : P.coral} stroke={P.goldD} strokeWidth={on(f, d159, 8) * 6} strokeDasharray="16 12" />
              {on(f, d159, 8) > 0 && <GhostPile x={x0 + wF + 120 * sp2 + (w - wF) / 2} y={GROUND - 60} n={Math.round(12 * on(f, d159, 14))} w={200} />}
              <g opacity={on(f, d109, 8)}><Label x={x0 + wF / 2} y={y0 - 40} text="≈ $109,000 FEES" size={56} font="Bebas Neue" color={P.coralInk} /></g>
              <g opacity={on(f, step64, 8)}><Label x={x0 + wF / 2} y={GROUND + 72} text="STEP 2" size={60} font="Bebas Neue" color={P.ink} /></g>
              <g opacity={on(f, d159, 8)}><Label x={x0 + wF + 120 + (w - wF) / 2} y={y0 - 40} text="≈ $159,000 GROWTH" size={56} font="Bebas Neue" color={P.goldInk} /></g>
              <g opacity={on(f, step65, 8)}><Label x={x0 + wF + 120 + (w - wF) / 2} y={GROUND + 72} text="STEP 3" size={60} font="Bebas Neue" color={P.ink} /></g>
            </g> })()}
          <g opacity={on(f, where, 8)}><Person f={f} who="hero" beats={[[0, 'scratchHead', 'thinking'], [d109, 'point', 'neutral'], [d159, 'present', 'smiling']]} x={300} y={GROUND} s={0.75} /></g>
        </g>
        {/* # the 2% case */}
        <g opacity={on(f, d2, 10)}>
          <SaverJar x={AX + 160} y={GROUND} w={320} h={640} fill={0.92} label="TWIN A" />
          <SaverJar x={BX} y={GROUND} w={320} h={lerp(560, 640 * 0.607, on(f, d744, 18))} fill={0.92} label="TWIN B AT 2%" />
          <g opacity={on(f, thirds, 8)}><line x1={AX - 40} y1={GROUND - 640 * 2 / 3} x2={BX + 220} y2={GROUND - 640 * 2 / 3} stroke={P.coral} strokeWidth={6} strokeDasharray="14 10" /><Label x={AX - 160} y={GROUND - 640 * 2 / 3 + 18} text="2/3" size={60} font="Bebas Neue" color={P.coralInk} /></g>
        </g>
      </g>}
      <Vignette id="fe-twins" />
    </g>
  )
}

const BEATS = ['s45:add', 's45:40', 's46:twins', 's47:same', 's47:500', 's47:7', 's47:growth', 's48:fee', 's48:different', 's49:small', 's49:number', 's50', 's50:index', 's50:005', 's50:5', 's50:10000', 's51:index', 's51:buys', 's51:list', 's51:sp', 's51:few', 's51:little', 's52', 's52:1', 's52:pricier', "s52:adviser's", 's52:both', 's53:first', 's54:10', 's54:4000', 's55:20', 's55:26000', 's56:30', 's56:93000', 's57:gap', 's57:slowly', 's57:fast', 's57:against', 's58:40', 's58:123', 's59:958000', 's60:268000', 's60:behind', 's61:remember', 's61:240000', 's62:cost', 's62:saved', 's63:where', 's64:109000', 's64:step', 's65:159000', 's65:step', 's66:2', 's66:744000', 's66:thirds', "s47:same#2", "s49:people", "s51:american", "s51:run", "s53:accounts", "s59:has", "s62:twin", "s62:everything", "s63:268000", "s64:fees", "s65:growth", "s66:twin", "s64:top", "s64:paid#2", "s62:1", "s49:thing", "s49:except", "s64:about", "s65:make", "s61:dollars", "s63:dollars", "s53:same", "s54"]
export const FE_TWINS = makePiece('fe-twins', 'Fee long step four: twins with the same $500 and 7%, only the fee differs (0.05% index fund vs 1%); the race — gaps $4k/$26k/$93k then $268k at 40 ($1.23M vs $958k); more than the $240k put in; the gap splits into $109k fees + $159k lost growth; at 2% $744k, under two thirds', {
  mood: 'light', Component: Twins, beats: BEATS,
  sfx: [['s46:twins', 'pop', 0.25], ['s47:500', 'coin', 0.25], ['s48:different', 'swish', 0.25], ['s50:005', 'ding', 0.25], ['s52:1', 'thud', 0.3], ['s54:4000', 'tick', 0.25], ['s55:26000', 'tick', 0.25], ['s56:93000', 'tick', 0.3], ['s57:fast', 'riser', 0.3], ['s60:268000', 'thud', 0.35], ['s62:saved', 'ding', 0.3], ['s64:109000', 'coin', 0.3], ['s65:159000', 'swish', 0.3], ['s66:744000', 'thud', 0.3]] })
