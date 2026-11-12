// ---------------------------------------------------------------- s58–s79: step four — what it's worth to Tesla.
// A) Tesla's stall again, sign "REGULATORY CREDITS" flipping to "SIDE HUSTLE". Next to the car sales: a huge car-sales
//    block and a thin 2% sliver. Then the year chart: gold bars rise on their years (2017 $360M, 2019 $594M with a red
//    −$862M profit marker, 2020 $1.58B, 2021–23 ≈ $1.5–1.8B while green profit bars tower past $12B, 2024 record $2.8B).
// B) No separate product: an EV rolls off the line and drops a credit card on the side. Compare with profit:
//    2024 profit $7.1B green bar vs credits $2.8B gold bar, "= 39%"; 2025 profit $3.8B vs credits $2.0B, "more than
//    half the size". The note: a revenue pile vs a profit slice after costs and taxes; "sizes, not slices".
// C) Car profits shrink (green bar shrinks) and the same gold bar looks bigger next to it. Recap: a rule book turning
//    into a stack of gold.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, fly, win } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { CreditCert, EVCar, Factory, TSpot } from './kit'

const GROUND = 920
// # credits by year (million USD), from Tesla's 10-Ks; profits shown only where the script says them
const CR: [string, number][] = [['2017', 360], ['2018', 419], ['2019', 594], ['2020', 1580], ['2021', 1465], ['2022', 1776], ['2023', 1790], ['2024', 2763]]
const SC = 0.13 // # px per million in the year chart

const Worth: React.FC<PieceProps> = ({ f, c }) => {
  const step58 = c('s58:step'), worth58 = c('s58:worth')
  const calls = c('s59:calls'), regulatory = c('s59:regulatory'), call59 = c("s59:call"), side59 = c('s59:side')
  const next60 = c('s60:next'), sales60 = c('s60:sales'), small = c('s60:small'), y2025a = c('s60:2025'), d2 = c('s60:2'), revenue60 = c('s60:revenue')
  const y2017 = c('s61:2017'), d360 = c('s61:360')
  const y2019 = c('s62:2019'), d594 = c('s62:594'), lost62 = c('s62:lost'), d862 = c('s62:862')
  const y2020 = c('s63:2020'), d58 = c('s63:58'), twice63 = c('s63:twice')
  const y2021 = c('s64:2021'), y2023 = c('s64:2023'), sold64 = c('s64:sold'), profit64 = c('s64:profit'), faster = c('s64:faster')
  const stayed = c('s65:stayed'), profit65 = c('s65:profit'), climbed = c('s65:climbed'), d12 = c('s65:12'), y2022b = c('s65:2022')
  const looked = c('s66:looked'), small66 = c('s66:small'), business66 = c('s66:business')
  const y2024 = c('s67:2024'), record = c('s67:record'), d28 = c('s67:8')
  const unusual = c('s68:unusual'), build68 = c('s68:build'), separate = c('s68:separate'), product = c('s68:product')
  const come69 = c('s69:come'), electric69 = c('s69:electric'), already = c('s69:already'), selling69 = c('s69:selling')
  const compare = c('s70:compare'), profit70 = c('s70:profit')
  const y2024b = c('s71:2024'), whole71 = c('s71:whole'), d71 = c('s71:7')
  const brought72 = c('s72:brought'), d28b = c('s72:8'), equal = c('s72:equal'), d39 = c('s72:39')
  const y2025 = c('s73:2025'), fell = c('s73:fell'), d38 = c('s73:8'), credits73 = c('s73:credits'), d2b = c('s73:2')
  const half74 = c('s74:half'), size74 = c('s74:size')
  const note = c('s75:note'), revenue75 = c('s75:revenue'), profit75 = c('s75:profit'), left75 = c('s75:left'), costs75 = c('s75:costs'), taxes = c('s75:taxes')
  const compares = c('s76:compares'), sizes = c('s76:sizes'), doesnt76 = c("s76:doesn't"), half76 = c('s76:half')
  const still = c('s77:still'), clear = c('s77:clear'), room77 = c('s77:room'), big77 = c('s77:big'), years77 = c('s77:years')
  const profits78 = c('s78:profits'), shrink = c('s78:shrink'), same78 = c('s78:same'), bigger78 = c('s78:bigger')
  const step79 = c('s79:step'), rule79 = c('s79:rule'), clean = c('s79:clean'), turned = c('s79:turned'), billions79 = c('s79:billions')

  const AB = unusual - 6, BC = profits78 - 6
  const A = win(f, step58 - 40, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  const A1 = 1 - on(f, y2017 - 6, 10), A2 = on(f, y2017 - 6, 10)
  const B1 = 1 - on(f, compare - 6, 10), B2 = on(f, compare - 6, 10) * (1 - on(f, note - 6, 10)), B3 = on(f, note - 6, 10)
  const yearAt = [y2017, y2017 + 12, y2019, y2020, y2021, y2021 + 20, y2023, y2024]
  const profitBars: [number, number][] = [[4, 5519], [5, 12556], [6, 14997]] // # 2021–2023 profits (millions): all far taller than the credit scale, so drawn cut off with a break mark

  return (
    <g>
      <Stage id="ts-worth" frame={f} />
      <TSpot f={f} at={record} x={1580} y={560} rx={160} ry={220} />
      <TSpot f={f} at={d39} x={1100} y={560} rx={200} ry={200} />
      <Headline f={f} lines={[[step58, "STEP 4: WHAT IT'S WORTH", P.ink, 104], [side59, 'THE SIDE HUSTLE', P.ink, 110], [d2, '≈ 2% OF REVENUE (2025)', P.ink, 100], [y2017, 'CREDITS, YEAR BY YEAR', P.ink, 104], [d862, '2019: STILL A LOSS', P.coralInk, 100], [faster, 'PROFIT GREW FASTER', P.mintInk, 104], [record, '2024: RECORD ≈ $2.8B', P.goldInk, 104], [unusual, 'NO SEPARATE PRODUCT', P.ink, 104], [compare, 'NEXT TO PROFIT', P.ink, 110], [d39, '2024: ≈ 39% OF PROFIT', P.ink, 104], [half74, '2025: MORE THAN HALF', P.ink, 104], [note, 'REVENUE ≠ PROFIT', P.ink, 110], [sizes, 'COMPARING SIZES', P.ink, 104], [shrink, 'WHEN PROFIT SHRINKS…', P.ink, 104], [turned, 'A RULE → BILLIONS', P.goldInk, 110]]} />

      {/* # A) the name; 2% of revenue; the year chart */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <g opacity={A1}>
          <Factory x={420} y={GROUND} s={1} name="TESLA" color="#3E4A61" />
          <g opacity={on(f, calls, 6) * (1 - on(f, sales60 - 4, 10))} transform={`translate(1200 ${GROUND - 40 * (1 - pop(f, calls, 14))})`}>
            <rect x={-170} y={-170} width={340} height={170} rx={10} fill="#E9C25A" /><path d="M-200 -170 L200 -170 L180 -230 L-180 -230 Z" fill={P.coral} />
            <text x={0} y={-80} textAnchor="middle" fill={P.navy0} style={{ font: `400 ${f >= side59 ? 50 : 36}px "Bebas Neue"`, letterSpacing: 2 }}>{f >= side59 ? 'SIDE HUSTLE' : 'REGULATORY CREDITS'}</text>
            <g opacity={on(f, regulatory, 8)}><g transform="translate(0 -320) scale(0.7)"><CreditCert x={0} y={0} /></g></g>
          </g>
          <Person f={f} who="hero" beats={[[0, 'idle', 'smiling'], [calls, 'present', 'smiling'], [side59, 'thumbsUp', 'smiling'], [small, 'point', 'smiling'], [d2, 'shrug', 'smiling']]} x={1760} y={GROUND} s={0.75} flip />
          {/* # next to car sales: a big block and a thin sliver */}
          <g opacity={on(f, sales60 - 4, 10)}>
            <rect x={760} y={GROUND - 520} width={720} height={520} rx={14} fill={P.navy3} />
            <text x={1120} y={GROUND - 260} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 60px "Bebas Neue"' }}>{f >= revenue60 ? "ALL TESLA'S REVENUE" : 'CAR SALES & MORE'}</text>
            <rect x={1480} y={GROUND - 520} width={lerp(0, 15, on(f, small, 14))} height={520} rx={4} fill={P.gold} />
            <g opacity={on(f, d2, 8)}><path d="M1500 300 L1600 240" stroke={P.goldInk} strokeWidth={5} /><Label x={1610} y={250} text="≈ 2%" size={64} font="Bebas Neue" color={P.goldInk} anchor="start" /></g>
            <g opacity={on(f, y2025a, 8)}><Label x={1120} y={GROUND + 56} text="2025" size={48} font="Bebas Neue" color={P.ink} /></g>
          </g>
        </g>
        <g opacity={A2}>
          <line x1={200} y1={GROUND} x2={1760} y2={GROUND} stroke={P.ink} strokeWidth={4} />
          {CR.map(([yr, v], k) => { const at = yearAt[k], x = 300 + k * 190, h = lerp(0, v * SC, on(f, at + 4, 18))
            return <g key={k} opacity={on(f, at, 6)}>
              <rect x={x - 60} y={GROUND - h} width={120} height={h} rx={10} fill={P.gold} stroke={k === 7 && f >= record ? P.goldD : 'none'} strokeWidth={6} transform={k === 7 ? `translate(0 ${-10 * pop(f, c('s67:billion'), 12)})` : undefined} />
              <Label x={x} y={GROUND + 50} text={yr} size={40} font="Bebas Neue" color={P.ink} />
              {[0, 2, 3, 7].includes(k) && <g opacity={on(f, [d360, 0, d594, d58, 0, 0, 0, d28][k], 8)}><Label x={x} y={GROUND - h - 22} text={['$360M', '', '$594M', '$1.58B', '', '', '', '$2.8B'][k]} size={40} font="Bebas Neue" color={P.goldInk} /></g>}
            </g> })}
          <Person f={f} who="investorF" beats={[[0, 'present', 'smiling'], [lost62, 'facepalm', 'worried'], [d58, 'shrug', 'shocked'], [faster, 'point', 'smiling'], [looked, 'think', 'thinking'], [record, 'celebrate', 'smiling']]} x={1810} y={GROUND} s={0.62} flip />
          {/* # 2019 loss marker */}
          <g opacity={on(f, lost62, 8) * (1 - on(f, y2020, 10))} transform={`translate(680 ${380 - 14 * pop(f, c('s62:year'), 12)})`}><rect x={-110} y={-40} width={220} height={80} rx={12} fill={P.coral} /><text y={16} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 46px "Bebas Neue"' }}>{f >= d862 ? 'PROFIT −$862M' : 'PROFIT: LOSS'}</text></g>
          {/* # 2020: ×2 profit note */}
          <g opacity={on(f, c('s63:billion'), 8) * (1 - on(f, y2021, 10))}><Label x={870} y={GROUND - 1580 * SC - 70} text="> 2 × THAT YEAR'S PROFIT" size={36} font="Bebas Neue" color={P.ink2} /></g>
          {/* # 2021–2023: green profit bars tower beside the credits */}
          {profitBars.map(([k, v], j) => { const x = 300 + k * 190 + 96, h = lerp(0, 640, on(f, profit64 + j * 4, 20)) // # profit is far taller than the chart: drawn cut off, with a break mark
            return <g key={k} opacity={on(f, profit64, 8) * (1 - on(f, y2024 - 4, 12))}><rect x={x - 24} y={GROUND - h} width={48} height={h} rx={6} fill={P.mint} />
              <path d={`M${x - 30} ${GROUND - h + 40} l12 -10 l12 10 l12 -10 l12 10 l12 -10`} fill="none" stroke="#FFFFFF" strokeWidth={6} opacity={on(f, profit64 + j * 4 + 20, 6)} /></g> })}
          <g opacity={on(f, climbed, 8) * (1 - on(f, y2024 - 4, 12))} transform={`translate(0 ${-12 * pop(f, c('s65:2023'), 12)})`}><Label x={1350} y={GROUND - 640 - 20} text={f >= d12 ? 'PROFIT PAST $12B (2022, 2023)' : 'PROFIT'} size={38} font="Bebas Neue" color={P.mintInk} /></g>
          <g opacity={on(f, stayed, 8) * (1 - on(f, y2024 - 4, 12))} transform={`translate(0 ${-12 * pop(f, c('s65:year'), 12)})`}><Label x={620} y={420} text={f >= c('s65:8') ? 'CREDITS ≈ $1.5–1.8B' : f >= c('s65:half') ? 'CREDITS ≈ $1.5B…' : 'CREDITS'} size={38} font="Bebas Neue" color={P.goldInk} /></g>
          <g opacity={on(f, c('s66:while'), 8) * (1 - on(f, y2024 - 4, 12))}><Label x={620} y={480} text="LOOKED SMALL" size={38} font="Bebas Neue" color={P.ink2} /></g>
        </g>
      </g>}

      {/* # B) no separate product; compare with profit; the note */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <g opacity={B1}>
          {/* # the line: EVs roll out; credits drop off the side */}
          <rect x={160} y={GROUND - 260} width={420} height={260} rx={12} fill="#3E4A61" /><text x={370} y={GROUND - 200} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>TESLA FACTORY</text>
          {[0, 1, 2].map((k) => { const t = span(f, come69 + k * 10, come69 + k * 10 + 50); return <g key={k} opacity={on(f, come69 + k * 10, 6)}><EVCar x={lerp(580, 1500, t)} y={GROUND} s={0.45} f={f} /></g> })}
          {[0, 1, 2].map((k) => { const at = electric69 + k * 10, fl = fly(f, at, [800 + k * 100, GROUND - 120], [1600 + (k - 1) * 60, 420 + k * 30], 18, 80); return f >= at ? <CreditCert key={k} x={fl.x} y={fl.y} s={0.5} r={(k - 1) * 6} /> : null })}
          <g opacity={on(f, c("s68:here's"), 8) * (1 - on(f, come69, 8))} transform="translate(1100 520)"><rect x={-150} y={-90} width={300} height={180} rx={16} fill={P.card} stroke={P.edge} strokeWidth={4} strokeDasharray="12 8" /><text y={12} textAnchor="middle" fill={P.ink2} style={{ font: '400 40px "Bebas Neue"' }}>SEPARATE PRODUCT?</text><path d="M-110 -70 L110 70" stroke={P.coralInk} strokeWidth={10} strokeLinecap="round" opacity={on(f, product, 6)} /></g>
          <g opacity={on(f, already, 8)}><Label x={1100} y={GROUND + 50} text="FROM CARS IT ALREADY SELLS" size={44} font="Bebas Neue" color={P.mintInk} /></g>
        </g>
        <g opacity={B2}>
          {/* # 2024 and 2025: profit vs credits */}
          {([[y2024b, whole71, 7091, d71, '$7.1B', brought72, 2763, d28b, '$2.8B', '2024', 420], [y2025, fell, 3794, d38, '$3.8B', credits73, 1993, d2b, '$2.0B', '2025', 1240]] as [number, number, number, number, string, number, number, number, string, string, number][]).map(([ya, pa, pv, pl, plab, ca, cv, cl, clab, yr, x], k) => (
            <g key={k} opacity={on(f, ya, 8)}>
              <Label x={x + 140} y={GROUND + 56} text={yr} size={50} font="Bebas Neue" color={P.ink} />
              <rect x={x} y={GROUND - lerp(0, pv * 0.075, on(f, pa, 18))} width={130} height={lerp(0, pv * 0.075, on(f, pa, 18))} rx={10} fill={P.mint} />
              <g opacity={on(f, pl, 8)} transform={k === 0 ? `translate(0 ${-12 * pop(f, c('s71:billion'), 12)})` : undefined}><Label x={x + 65} y={GROUND - pv * 0.075 - 26} text={`PROFIT ${plab}`} size={36} font="Bebas Neue" color={P.mintInk} /></g>
              <rect x={x + 160} y={GROUND - lerp(0, cv * 0.075, on(f, k === 0 ? c('s72:credits') : ca, 18))} width={130} height={lerp(0, cv * 0.075, on(f, k === 0 ? c('s72:credits') : ca, 18))} rx={10} fill={P.gold} />
              <g opacity={on(f, cl, 8)}><Label x={x + 225} y={GROUND - cv * 0.075 - 26} text={`CREDITS ${clab}`} size={36} font="Bebas Neue" color={P.goldInk} /></g>
              {k === 0 && <g opacity={on(f, equal, 8)}><rect x={x} y={GROUND - pv * 0.075 * 0.39} width={130} height={4} fill={P.goldInk} /><Label x={x + 65} y={GROUND - pv * 0.075 * 0.39 - 14} text="39%" size={38} font="Bebas Neue" color={P.goldInk} /></g>}
              {k === 1 && <g opacity={on(f, half74, 8)} transform={`translate(0 ${-10 * pop(f, c('s74:profit'), 12)})`}><rect x={x} y={GROUND - pv * 0.075 * 0.5} width={130} height={4} fill={P.ink} /><Label x={x + 65} y={GROUND - pv * 0.075 * 0.5 - 14} text="HALF" size={36} font="Bebas Neue" color={P.ink} /></g>}
            </g>))}
          <Person f={f} who="investor" beats={[[0, 'idle', 'thinking'], [d39, 'point', 'smiling'], [half74, 'shrug', 'shocked']]} x={1800} y={GROUND} s={0.7} flip />
        </g>
        <g opacity={B3}>
          {/* # revenue vs profit: the money in, then costs and taxes come off, profit is what's left */}
          <g transform="translate(560 0)">
            <rect x={-150} y={GROUND - 500} width={300} height={500} rx={14} fill={P.navy3} opacity={on(f, revenue75, 8)} />
            <g opacity={on(f, revenue75, 8)}><Label x={0} y={GROUND + 50} text="REVENUE: MONEY IN" size={42} font="Bebas Neue" color={P.ink} /></g>
            <rect x={-150} y={GROUND - 500} width={300} height={lerp(0, 380, on(f, costs75, 18))} rx={14} fill="#9D7FD0" />
            <g opacity={on(f, costs75, 8)}><text x={0} y={GROUND - 330} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 44px "Bebas Neue"' }}>{f >= taxes ? 'COSTS + TAXES' : 'COSTS'}</text></g>
            <g opacity={on(f, left75, 8)}><rect x={-150} y={GROUND - 120} width={300} height={120} rx={14} fill={P.mint} /><text x={0} y={GROUND - 45} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 44px "Bebas Neue"' }}>PROFIT</text></g>
          </g>
          <g opacity={on(f, compares, 8)} transform="translate(1340 560)">
            <rect x={-260} y={-150} width={240} height={300} rx={14} fill={P.mint} /><text x={-140} y={10} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 44px "Bebas Neue"' }}>PROFIT</text>
            <rect x={20} y={0} width={240} height={150} rx={14} fill={P.gold} /><text x={140} y={90} textAnchor="middle" fill={P.navy0} style={{ font: '400 44px "Bebas Neue"' }}>CREDITS</text>
            <g opacity={on(f, sizes, 8)}><text x={0} y={220} textAnchor="middle" fill={P.ink} style={{ font: '400 46px "Bebas Neue"' }}>SIZES, SIDE BY SIDE</text></g>
            <g opacity={on(f, doesnt76, 8)} transform={`translate(0 ${-10 * pop(f, c('s76:credits'), 12)})`}><text x={0} y={-190} textAnchor="middle" fill={P.coralInk} style={{ font: '400 40px "Bebas Neue"' }}>NOT "HALF THE PROFIT CAME FROM CREDITS"</text></g>
          </g>
          <Person f={f} who="investorF" beats={[[0, 'present', 'smiling'], [costs75, 'point', 'thinking'], [doesnt76, 'countA', 'thinking'], [still, 'present', 'smiling']]} x={1800} y={GROUND} s={0.62} flip />
          <g opacity={on(f, still, 8)}><Label x={560} y={330} text={f >= years77 ? 'A BIG PART, FOR YEARS' : 'STILL…'} size={56} font="Bebas Neue" color={P.goldInk} /></g>
        </g>
      </g>}

      {/* # C) when profit shrinks; recap */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <g opacity={1 - on(f, step79 - 4, 10)}>
          <rect x={620} y={GROUND - lerp(600, 260, on(f, shrink, 24))} width={240} height={lerp(600, 260, on(f, shrink, 24))} rx={14} fill={P.mint} />
          <Person f={f} who="investor" beats={[[0, 'idle', 'thinking'], [shrink, 'shrug', 'worried'], [bigger78, 'point', 'shocked']]} x={300} y={GROUND} s={0.8} />
          <Label x={740} y={GROUND + 56} text="CAR PROFIT" size={44} font="Bebas Neue" color={P.ink} />
          <rect x={1060} y={GROUND - 180} width={240} height={180} rx={14} fill={P.gold} stroke={P.goldD} strokeWidth={f >= bigger78 ? 8 : 0} />
          <Label x={1180} y={GROUND + 56} text="SAME CREDITS" size={44} font="Bebas Neue" color={P.ink} />
          <g opacity={on(f, bigger78, 8)}><Label x={1180} y={GROUND - 220} text="A BIGGER PART" size={44} font="Bebas Neue" color={P.goldInk} /></g>
          <g opacity={on(f, same78, 8)}><path d="M1180 640 L1180 700" stroke={P.goldInk} strokeWidth={6} /></g>
        </g>
        <g opacity={on(f, step79 - 4, 10)}>
          <g opacity={1 - on(f, turned, 14)} transform="translate(700 560)"><rect x={-130} y={-170} width={260} height={340} rx={14} fill="#2B3A55" /><rect x={-110} y={-150} width={220} height={300} rx={8} fill="#EEF3FA" /><text y={-80} textAnchor="middle" fill={P.navy0} style={{ font: '400 50px "Bebas Neue"' }}>RULE</text>
            <g opacity={on(f, clean, 8)}><text y={20} textAnchor="middle" fill={P.mintInk} style={{ font: '400 36px "Bebas Neue"' }}>CLEANER CARS</text></g></g>
          <g opacity={on(f, turned, 8)}>{Array.from({ length: 10 }, (_, k) => <ellipse key={k} cx={1100} cy={GROUND - 30 - k * 34} rx={110} ry={24} fill={P.gold} stroke={P.goldD} strokeWidth={4} opacity={on(f, turned + k * 2, 4)} />)}
            <g opacity={on(f, billions79, 8)}><Label x={1100} y={GROUND - 400} text="BILLIONS FOR TESLA" size={52} font="Bebas Neue" color={P.goldInk} /></g></g>
          <g opacity={on(f, rule79, 8)}><path d="M860 560 L960 560 M936 536 L960 560 L936 584" fill="none" stroke={P.ink} strokeWidth={8} strokeLinecap="round" /></g>
        </g>
      </g>}
      <Vignette id="ts-worth" />
    </g>
  )
}

const BEATS = ['s65:year', 's62:year', 's63:billion', 's74:profit', 's76:credits', 's65:half', 's65:8', 's65:2023', 's66:while', 's67:billion', "s68:here's", 's71:billion', 's72:credits', 's58:step', 's58:worth', 's59:calls', 's59:regulatory', 's59:call', 's59:side', 's60:next', 's60:sales', 's60:small', 's60:2025', 's60:2', 's60:revenue', 's61:2017', 's61:360', 's62:2019', 's62:594', 's62:lost', 's62:862', 's63:2020', 's63:58', 's63:twice', 's64:2021', 's64:2023', 's64:sold', 's64:profit', 's64:faster', 's65:stayed', 's65:profit', 's65:climbed', 's65:12', 's65:2022', 's66:looked', 's66:small', 's66:business', 's67:2024', 's67:record', 's67:8', 's68:unusual', 's68:build', 's68:separate', 's68:product', 's69:come', 's69:electric', 's69:already', 's69:selling', 's70:compare', 's70:profit', 's71:2024', 's71:whole', 's71:7', 's72:brought', 's72:8', 's72:equal', 's72:39', 's73:2025', 's73:fell', 's73:8', 's73:credits', 's73:2', 's74:half', 's74:size', 's75:note', 's75:revenue', 's75:profit', 's75:left', 's75:costs', 's75:taxes', 's76:compares', 's76:sizes', "s76:doesn't", 's76:half', 's77:still', 's77:clear', 's77:room', 's77:big', 's77:years', 's78:profits', 's78:shrink', 's78:same', 's78:bigger', 's79:step', 's79:rule', 's79:clean', 's79:turned', 's79:billions']
export const TS_WORTH = makePiece('ts-worth', 'Tesla long step 4: the stall sign "regulatory credits" becomes "side hustle"; about 2% of Tesla\'s 2025 revenue (a thin gold sliver beside a big revenue block); gold credit bars by year: 2017 $360M, 2019 $594M while profit was −$862M, 2020 $1.58B (more than twice profit), 2021–23 about $1.5–1.8B while profit passed $12B, 2024 record $2.8B; credits come from EVs already sold (no separate product); 2024 profit $7.1B vs credits $2.8B (39%), 2025 profit $3.8B vs credits $2.0B (more than half); revenue vs profit after costs and taxes, comparing sizes not slices; when profit shrinks the same credits are a bigger part; a rule turned into billions', {
  mood: 'light', Component: Worth, beats: BEATS,
  sfx: [['s59:side', 'pop', 0.25], ['s60:2', 'pop', 0.2], ['s62:862', 'thud', 0.2], ['s63:58', 'pop', 0.2], ['s67:record', 'pop', 0.25], ['s69:electric', 'coin', 0.2], ['s72:39', 'pop', 0.2], ['s74:half', 'pop', 0.2], ['s75:costs', 'swish', 0.2], ['s79:turned', 'coin', 0.25]] })
