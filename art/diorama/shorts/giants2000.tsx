// ============================================================
// SHORT — "In 2000, the safest stocks were the giants too" (s1–s31,
// ≈ 2:10), seven tall pieces. Sourced (Apollo / Bloomberg; Goldman
// Sachs via Voronoi; fund filing June 2026): top 10 ≈ 27% of the
// S&P 500 in 2000 (a record then); forward P/E ≈ 23.6 vs ≈ 16 (2000),
// ≈ 11.5 vs ≈ 16 (2005); of the 2000 top 10 only Microsoft is in
// today's top 10; today the top 10 ≈ 37.9% at ≈ 28 vs ≈ 19.5.
// ============================================================
import React from 'react'
import { Emblem } from '../../logo/Emblem'
import { Mini } from '../../rig/Mini'
import { Calendar, countTo, Label, PriceTag } from '../charts'
import { between, easeInOut, easeOut, lerp, on, P, Pedestal, Platform, pop, rnd, span, Tower, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Big, Company, H, Prop, TallStage, W } from './tall'

// # the 2000 top 10, each with an icon for what it did
const T2000: [string, string][] = [['GE', 'factory'], ['Exxon', 'oil-barrel'], ['Pfizer', 'medical-kit'], ['Cisco', 'server-rack'], ['Citigroup', 'bank'],
  ['Walmart', 'shopping-bag'], ['Microsoft', 'laptop'], ['AIG', 'shield'], ['Merck', 'hospital'], ['Intel', 'ai-chip']]
const MS = 6
const tx = (k: number) => 132 + k * 90
const TH = (k: number) => 200 + rnd(k * 5 + 2) * 150

// # the ten giants of 2000 on their island, under a safe-looking glass shield
const Giants: React.FC<{ f: number; id: string; up: number; fall?: number; keep?: number; glow?: number; y?: number; shield?: number }> = ({ f, id, up, fall = 0, keep = 0, glow = 0, y = 1080, shield = 0 }) => (
  <g>
    <Platform id={id} cx={540} cy={y} rx={470} ry={120} />
    {T2000.map(([, icon], k) => {
      const h = TH(k) * pop(f, up + k * 2, 16)
      // # the nine others tip over and slide off the island when they "fall"
      const out = k === MS ? 0 : fall, dx = (k < MS ? -1 : 1) * out * (300 + k * 20), r = (k < MS ? -1 : 1) * out * 70
      return h > 2 ? <g key={k} opacity={1 - out * 0.85} transform={`translate(${dx} ${out * 160}) rotate(${r} ${tx(k)} ${y - 20})`}>
        <Tower id={id} i={k} x={tx(k)} y={y - 20 + Math.abs(k - 4.5) * 4} h={h * (k === MS ? 1 + keep * 0.25 : 1)} w={62} glow={k === MS ? Math.max(glow, keep) : glow} />
        <Prop id={icon} x={tx(k)} y={y - 20 - h - 74} size={56} f={f} />
      </g> : null
    })}
    {shield > 0 && <g opacity={shield}>
      <path d={`M${70} ${y - 10} A470 520 0 0 1 ${1010} ${y - 10}`} fill="#CFEFFF" opacity={0.14} />
      <path d={`M${70} ${y - 10} A470 520 0 0 1 ${1010} ${y - 10}`} fill="none" stroke="#CFEFFF" strokeOpacity={0.7} strokeWidth={5} />
    </g>}
  </g>
)

// ---------------------------------------------------------------- s1–s3: the safest bet on Earth — nine are gone
const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const y2000 = c('s1:2000'), ten = c('s1:10'), safest = c('s1:safest'), nine = c('s2:nine'), anymore = c('s2:anymore'), here = c('s3:here'), fund = c('s3:fund'), today = c('s3:today')
  return (
    <g>
      <TallStage id="gh" f={f} />
      <g transform={`translate(540 ${lerp(360, 320, on(f, y2000, 20))}) scale(${pop(f, y2000) * 1.3})`}><Calendar x={0} y={0} text="2000" /></g>
      <g opacity={1 - on(f, here, 16)}>
        <Giants f={f} id="gh" up={ten - 6} glow={on(f, c('s1:biggest'))} shield={on(f, safest, 16) * (1 - on(f, nine, 10))} fall={easeInOut(span(f, nine, anymore + 6))} />
      </g>
      <Big text="THE SAFEST BET ON EARTH?" size={76} y={540} o={between(f, safest, nine)} />
      <Big text="9 OF 10: GONE FROM THE TOP" size={76} y={540} o={between(f, c('s2:not'), here)} color={P.coralInk} />
      {/* # …and your index fund today */}
      <g opacity={on(f, here)} transform={`translate(0 ${(1 - on(f, here, 20)) * 60})`}>
        <Label x={W / 2} y={720} text="WHAT IT MEANS FOR" size={70} font="Bebas Neue" color={P.ink} o={on(f, c('s3:matters'))} />
        <g transform={`translate(540 1000) scale(${pop(f, fund)})`}><rect x={-170} y={-110} width={340} height={220} rx={24} fill={P.navy2} stroke={P.champ} strokeWidth={4} />
          <Label x={0} y={18} text="YOUR FUND" size={58} font="Bebas Neue" color={P.champL} /></g>
        <Label x={W / 2} y={1210} text="TODAY" size={60} font="Bebas Neue" color={P.goldInk} o={on(f, today)} />
      </g>
      <Vignette id="gh" w={W} h={H} />
    </g>
  )
}

// ---------------------------------------------------------------- s4–s9: the record 27%, real businesses, felt safe
const Record: React.FC<PieceProps> = ({ f, c }) => {
  const bubble = c('s4:bubble'), giants = c('s4:giants'), p27 = c('s4:27'), record = c('s5:record'), risky = c('s6:risky'), startups = c('s6:startups')
  const names = ['general', 'exxon', 'pfizer', 'cisco', 'citigroup', 'walmart', 'microsoft', 'aig', 'merck', 'intel'].map((w) => c(`s7:${w}`))
  const real = c('s8:real'), factories = c('s8:factories'), customers = c('s8:customers'), profits = c('s8:profits'), owning = c('s9:owning'), safest = c('s9:safest')
  const lit = names.findIndex((a, k) => f >= a && (k === 9 || f < names[k + 1]))
  const bub = on(f, bubble, 24)
  return (
    <g>
      <TallStage id="gr" f={f} />
      {/* # the bubble swells around the giants */}
      <circle cx={540} cy={860} r={460 * bub + Math.sin(f / 20) * 6 * bub} fill="#CFEFFF" opacity={0.08 * bub} />
      <circle cx={540} cy={860} r={460 * bub + Math.sin(f / 20) * 6 * bub} fill="none" stroke="#CFEFFF" strokeOpacity={0.5 * bub} strokeWidth={4} />
      <path d={`M${340} ${560} A300 300 0 0 1 ${520} ${450}`} stroke="#FFFFFF" strokeOpacity={0.5 * bub} strokeWidth={12} strokeLinecap="round" fill="none" />
      <Label x={W / 2} y={300} text="THE DOT-COM BUBBLE · 2000" size={56} font="Bebas Neue" color={P.ink2} o={on(f, c('s4:dotcom'))} />
      <Giants f={f} id="gr" up={giants - 8} glow={lit >= 0 ? 0 : on(f, p27) * 0.6} />
      {/* # each name glows as it is said */}
      {lit >= 0 && f < real && <g>
        <ellipse cx={tx(lit)} cy={1080 - TH(lit) - 80} rx={70} ry={70} fill={P.gold} opacity={0.3} />
        <Big text={T2000[lit][0] === 'GE' ? 'GENERAL ELECTRIC' : T2000[lit][0].toUpperCase()} y={430} size={96} o={1} color={P.goldInk} />
      </g>}
      <Big text={`${countTo(27, on(f, p27, 20))}% OF THE S&P 500`} y={430} size={96} o={between(f, p27, risky)} color={P.goldInk} />
      <g opacity={between(f, record, risky)} transform={`translate(860 560) scale(${pop(f, record)})`}><Prop id="trophy" x={0} y={0} size={140} f={f} /><Label x={0} y={110} text="A RECORD" size={40} font="Bebas Neue" color={P.ink} /></g>
      {/* # not risky little start-ups: a tiny tent, crossed out */}
      <g opacity={between(f, risky, names[0])}>
        <path d="M400 620 L540 470 L680 620 Z" fill={P.coral} opacity={0.85} /><rect x={520} y={560} width={40} height={60} fill={P.navy0} opacity={0.4} />
        <path d="M380 450 L700 650 M700 450 L380 650" stroke={P.coral} strokeWidth={18} strokeLinecap="round" opacity={on(f, startups)} />
        <Big text="NOT RISKY START-UPS" y={430} size={84} o={1} color={P.coralInk} />
      </g>
      {/* # real factories, customers, profits */}
      <g opacity={between(f, real - 4, owning)}>
        <g opacity={on(f, factories)}><Prop id="factory" x={240} y={520} size={150} f={f} /></g>
        <g opacity={on(f, customers)}><Prop id="family" x={540} y={500} size={150} f={f} /></g>
        <g opacity={on(f, profits)}><Prop id="cash-stack" x={840} y={520} size={150} f={f} /></g>
        <Big text="REAL BUSINESSES" y={330} size={90} o={on(f, c('s8:household'))} />
      </g>
      {/* # owning them felt safe: a shield over the island, the hero relaxed beside it */}
      <g opacity={on(f, owning)}>
        <path d={`M70 1070 A470 520 0 0 1 1010 1070`} fill="#CFEFFF" opacity={0.12} /><path d={`M70 1070 A470 520 0 0 1 1010 1070`} fill="none" stroke="#CFEFFF" strokeOpacity={0.7} strokeWidth={5} />
        <Big text="IT FELT SAFE" y={400} size={110} o={on(f, safest)} color={P.mintInk} />
      </g>
      <Vignette id="gr" w={W} h={H} />
    </g>
  )
}

// ---------------------------------------------------------------- s10–s13: safe ≠ cheap — $23.60 for $1 of profit vs $16
const Price: React.FC<PieceProps> = ({ f, c }) => {
  const safe = c('s10:safe'), cheap = c('s10:cheap'), paying = c('s11:paying'), p236 = c('s11:236'), dollar = c('s11:dollar'), earn = c('s11:earn'), rest = c('s12:rest'), p16 = c('s12:16')
  const famous = c('s13:famous'), premium = c('s13:premium'), loved = c('s13:loved')
  const stack = (n: number, x: number, p: number, gold: boolean) => Array.from({ length: Math.round(n * p) }, (_, k) => <rect key={k} x={x - 110} y={1130 - k * 26} width={220} height={22} rx={6} fill={gold ? (k % 2 ? P.gold : P.goldD) : (k % 2 ? '#5FBF7F' : '#4FAF6F')} />)
  return (
    <g>
      <TallStage id="gp" f={f} />
      <g opacity={1 - on(f, paying - 6)}>
        <g transform={`translate(330 760) scale(${pop(f, safe)})`}><circle r={150} fill={P.mint} opacity={0.9} /><Prop id="shield" x={0} y={0} size={170} f={f} /><Label x={0} y={230} text="SAFE" size={70} font="Bebas Neue" color={P.ink} /></g>
        <Label x={540} y={790} text="≠" size={180} color={P.coralInk} o={on(f, cheap)} />
        <g transform={`translate(760 760) scale(${pop(f, cheap)})`}><PriceTag x={0} y={0} text="CHEAP" s={1.4} /></g>
      </g>
      <g opacity={on(f, paying - 6)}>
        <Label x={W / 2} y={300} text="PRICE FOR $1 OF NEXT YEAR'S PROFIT" size={52} font="Bebas Neue" color={P.ink} />
        {/* # $1 of expected profit, then what investors paid for it */}
        <g transform={`translate(540 ${lerp(640, 470, on(f, earn, 20))}) scale(${pop(f, dollar)})`}><circle r={60} fill={P.gold} /><circle r={48} fill="none" stroke={P.goldD} strokeWidth={5} /><Label x={0} y={18} text="$1" size={54} font="Bebas Neue" color={P.navy0} /></g>
        <g opacity={on(f, p236 - 4)}>{stack(23.6, 330, on(f, p236, 34), true)}<Label x={330} y={1210} text="THE GIANTS" size={44} font="Bebas Neue" color={P.ink} />
          <Label x={330} y={1130 - 23.6 * 26 - 30} text={`$${countTo(23.6, on(f, p236, 34), 2)}`} size={80} font="Bebas Neue" color={P.goldInk} /></g>
        <g opacity={on(f, rest)}>{stack(16, 750, on(f, p16, 24), false)}<Label x={750} y={1210} text="THE REST" size={44} font="Bebas Neue" color={P.ink} />
          <Label x={750} y={1130 - 16 * 26 - 30} text={`$${countTo(16, on(f, p16, 24))}`} size={80} font="Bebas Neue" color={P.mintInk} o={on(f, p16)} /></g>
        {/* # the premium: the extra part of the giants' stack lights up; hearts for "everyone loved them" */}
        <rect x={210} y={1130 - 23.6 * 26 + 20} width={240} height={(23.6 - 16) * 26} rx={10} fill="none" stroke={P.coral} strokeWidth={6} strokeDasharray="14 10" opacity={on(f, premium)} />
        <Label x={480} y={1130 - 20 * 26} text="PREMIUM" size={44} font="Bebas Neue" anchor="start" color={P.coralInk} o={on(f, premium)} />
        {Array.from({ length: 6 }, (_, k) => { const t = span(f, loved + k * 4, loved + k * 4 + 40); return t > 0 && t < 1 ? <path key={k} d="M0 -8 C-12 -22 -30 -6 0 16 C30 -6 12 -22 0 -8 Z" fill={P.coral} transform={`translate(${200 + k * 50} ${lerp(500, 300, t)}) scale(${1.4})`} opacity={1 - t} /> : null })}
        <Label x={W / 2} y={420} text="famous names" size={44} color={P.ink2} o={between(f, famous, loved)} />
      </g>
      <Vignette id="gp" w={W} h={H} />
    </g>
  )
}

// ---------------------------------------------------------------- s14–s18: the premium flipped; buyers at the top fell furthest
const Flip: React.FC<PieceProps> = ({ f, c }) => {
  const nobody = c('s14:nobody'), later = c('s15:later'), cheaper = c('s15:cheaper'), p115 = c('s15:115'), shrink = c('s16:shrink'), flipped = c('s16:flipped')
  const bought = c('s17:bought'), top = c('s17:top'), picked = c('s17:picked'), fell = c('s18:fell'), furthest = c('s18:furthest'), news = c('s18:news'), baked = c('s18:baked'), price = c('s18:price')
  const A = 1 - on(f, bought - 8), B = on(f, bought - 8)
  // # the see-saw: giants' side heavy (expensive) → flips the other way on "flipped"
  const tilt = lerp(14, -12, easeInOut(span(f, later, flipped + 10)))
  const slide = easeInOut(span(f, fell, furthest + 20))
  return (
    <g>
      <TallStage id="gf" f={f} />
      <g opacity={A}>
        <Big text={f < flipped ? 'THEN…' : 'IT FLIPPED'} size={f < flipped ? 100 : 150} o={on(f, c('s14:then'))} color={f < flipped ? P.ink : P.coralInk} />
        <g transform={`rotate(${tilt} 540 900)`}>
          <rect x={90} y={890} width={900} height={22} rx={11} fill={P.champ} />
          {Array.from({ length: 5 }, (_, k) => <Tower key={k} id="gf" i={k} x={160 + k * 60} y={890} h={170 + k * 16} w={48} />)}
          {Array.from({ length: 24 }, (_, k) => <rect key={k} x={640 + (k % 8) * 40} y={856 - Math.floor(k / 8) * 34} width={30} height={30} rx={5} fill={P.sky} />)}
          <Label x={300} y={980} text={f < later ? '23.6×' : `${countTo(11.5, on(f, p115, 20), 1)}×`} size={70} font="Bebas Neue" color={P.goldInk} o={on(f, nobody)} />
          <Label x={780} y={980} text="16×" size={70} font="Bebas Neue" color={P.mintInk} o={on(f, nobody)} />
        </g>
        <path d="M480 1110 L540 912 L600 1110 Z" fill={P.champ} />
        <Label x={W / 2} y={460} text="5 YEARS LATER · THE GIANTS ARE CHEAPER" size={46} font="Bebas Neue" color={P.ink} o={between(f, cheaper, shrink)} />
        <g opacity={on(f, later)} transform="translate(880 520)"><Calendar x={0} y={0} text={f < cheaper ? '2000' : '2005'} flip={span(f, later, later + 14)} /></g>
      </g>
      {/* # buyers at the top: a crowd on a peak that slides down when the shares fall */}
      <g opacity={B}>
        <path d="M100 1200 L540 520 L980 1200 Z" fill={P.navy3} /><path d="M540 520 L980 1200 L700 1200 Z" fill={P.navy2} />
        {Array.from({ length: 8 }, (_, k) => {
          const side = k % 2 ? 1 : -1, d = slide * (0.6 + rnd(k) * 0.4), x = 540 + side * (24 + k * 14) + side * d * 330, y = 540 + (k % 3) * 10 + d * 560
          return <g key={k} opacity={on(f, picked + k * 2)}><Mini look={['hero', 'owner', 'investor'][k % 3]} x={x} y={y} scale={0.95} frame={f} seed={30 + k} mood={slide > 0.3 ? 'sad' : 'happy'} /></g>
        })}
        <Big text={f < fell ? 'BOUGHT AT THE TOP' : 'FELL FURTHEST'} size={110} o={on(f, top)} color={f < fell ? P.ink : P.coralInk} />
        {/* # good news, already baked into the price */}
        <g opacity={on(f, news)} transform={`translate(${lerp(220, 760, on(f, baked, 18))} ${lerp(500, 620, on(f, baked, 18))}) scale(${lerp(1, 0.4, on(f, baked, 18))})`}><Prop id="newspaper" x={0} y={0} size={150} f={f} /></g>
        <g opacity={on(f, baked - 6)} transform={`translate(800 640) scale(${pop(f, baked - 6)})`}><PriceTag x={0} y={0} text="PRICE" s={1.1} /></g>
        <Label x={760} y={760} text="already in the price" size={38} color={P.ink} o={on(f, price)} />
      </g>
      <Vignette id="gf" w={W} h={H} />
    </g>
  )
}

// ---------------------------------------------------------------- s19–s22: of the 2000 top 10, only Microsoft is still there
const NOW = ['NVIDIA', 'Apple', 'Alphabet', 'Microsoft', 'Amazon', 'Broadcom', 'Micron', 'Meta', 'Tesla', 'Eli Lilly']
const List: React.FC<PieceProps> = ({ f, c }) => {
  const list = c('s19:list'), today = c('s19:today'), only = c('s20:only'), one = c('s20:one'), ms = c('s21:microsoft'), slid = c('s22:slid'), newG = c('s22:new'), climbed = c('s22:climbed')
  const row = (k: number) => 430 + k * 76
  return (
    <g>
      <TallStage id="gl" f={f} />
      <Label x={290} y={340} text="TOP 10 · 2000" size={56} font="Bebas Neue" color={P.ink} o={on(f, list)} />
      <Label x={790} y={340} text="TOP 10 · TODAY" size={56} font="Bebas Neue" color={P.ink} o={on(f, today)} />
      {T2000.map(([n], k) => {
        const isMs = k === MS, down = isMs ? 0 : easeInOut(span(f, slid + k * 2, slid + k * 2 + 30)), move = isMs ? easeInOut(span(f, ms - 6, ms + 20)) : 0
        const x = lerp(290, 790, move), y = lerp(row(k), row(3), move) + down * (720 - k * 20)
        return <g key={n} opacity={on(f, list + k * 2) * (1 - down * 0.9)}>
          <rect x={x - 200} y={y - 30} width={400} height={60} rx={16} fill={isMs && f >= one ? P.gold : P.navy3} opacity={0.95} />
          <Label x={x} y={y + 13} text={n === 'GE' ? 'General Electric' : n} size={34} color={isMs && f >= one ? P.navy0 : P.champL} />
        </g>
      })}
      {/* # the new giants climb in from below and take the other places */}
      {NOW.map((n, k) => k === 3 ? null : <g key={n} opacity={on(f, newG + k * 2)} transform={`translate(0 ${(1 - easeOut(span(f, climbed + k * 2, climbed + k * 2 + 24))) * 500})`}>
        <rect x={590} y={row(k) - 30} width={400} height={60} rx={16} fill={P.sky} opacity={0.9} /><Label x={790} y={row(k) + 13} text={n} size={34} color={P.navy0} />
      </g>)}
      <Big text="ONLY 1 OF 10" y={1250} size={90} o={between(f, only, slid)} color={P.goldInk} />
      <Vignette id="gl" w={W} h={H} />
    </g>
  )
}

// ---------------------------------------------------------------- s23–s27: today it is bigger and pricier — not a forecast, the same question
const Today: React.FC<PieceProps> = ({ f, c }) => {
  const today = c('s23:today'), p38 = c('s23:38'), even = c('s23:even'), p28 = c('s24:28'), p19 = c('s24:19'), crash = c('s25:crash'), coming = c('s25:coming')
  const giants = c("s26:today's"), growing = c('s26:growing'), profits = c('s26:profits'), question = c('s27:question'), again = c('s27:again')
  const A = 1 - on(f, crash - 6), B = between(f, crash - 6, question - 6), C = on(f, question - 6)
  const bar = (x: number, v: number, p: number, col: string, txt: string, lab: string, o: number) => <g opacity={o}>
    <rect x={x - 90} y={1150 - v * 17 * p} width={180} height={v * 17 * p} rx={14} fill={col} />
    <Label x={x} y={1150 - v * 17 * p - 24} text={txt} size={72} font="Bebas Neue" color={P.ink} /><Label x={x} y={1210} text={lab} size={40} font="Bebas Neue" color={P.ink2} /></g>
  return (
    <g>
      <TallStage id="gt" f={f} />
      <g opacity={A}>
        <Big text={f < p28 ? 'TOP 10 SHARE OF THE INDEX' : 'PRICE ÷ NEXT YEAR\'S PROFIT'} size={64} o={on(f, today)} />
        <g opacity={1 - on(f, p28 - 8)}>
          {bar(320, 27, 1, P.navy4, '27%', '2000', on(f, today))}
          {bar(760, 37.9, on(f, p38, 24), P.gold, `${countTo(37.9, on(f, p38, 24), 1)}%`, 'TODAY', on(f, p38 - 4))}
          <Label x={W / 2} y={440} text="even bigger than 2000" size={44} color={P.coralInk} o={on(f, even)} />
        </g>
        <g opacity={on(f, p28 - 8)}>
          {bar(320, 28, on(f, p28, 24), P.gold, `${countTo(28, on(f, p28, 24))}×`, 'TOP 10', 1)}
          {bar(760, 19.5, on(f, p19, 20), P.mint, `${countTo(19.5, on(f, p19, 20), 1)}×`, 'THE REST', on(f, p19 - 4))}
        </g>
      </g>
      {/* # not a forecast: the crash icon is crossed out; the giants might grow into their prices */}
      <g opacity={B}>
        <g opacity={1 - on(f, giants - 4)}><Prop id="arrow-down" x={540} y={700} size={260} f={f} />
          <path d="M360 540 L720 860 M720 540 L360 860" stroke={P.coral} strokeWidth={22} strokeLinecap="round" opacity={on(f, coming)} />
          <Big text="NOT A CRASH CALL" size={100} o={on(f, crash)} /></g>
        <g opacity={on(f, giants - 4)}>
          {Array.from({ length: 5 }, (_, k) => { const h = (220 + k * 40) * (1 + 0.45 * on(f, growing + k * 3, 30)); return <g key={k}><Tower id="gt" i={k} x={220 + k * 160} y={1180} h={h} w={90} glow={on(f, profits)} />
            {Array.from({ length: Math.round(6 * on(f, profits + k * 3, 20)) }, (_, j) => <ellipse key={j} cx={220 + k * 160} cy={1180 - h - 50 - j * 9} rx={26} ry={7} fill={j % 2 ? P.gold : P.goldD} />)}</g> })}
          <Big text="THEY MIGHT GROW INTO IT" size={86} o={on(f, growing)} color={P.mintInk} />
        </g>
      </g>
      <g opacity={C}>
        <g transform={`translate(540 760) scale(${pop(f, question) * (1 + 0.04 * Math.sin(f / 8))})`}><Prop id="question" x={0} y={0} size={340} f={f} /></g>
        <Big text="THE SAME OLD QUESTION" size={96} o={on(f, question)} />
        <Label x={W / 2} y={1080} text="what are you paying for it?" size={52} color={P.goldInk} o={on(f, again)} />
      </g>
      <Vignette id="gt" w={W} h={H} />
    </g>
  )
}

// ---------------------------------------------------------------- s28–s31: great company ≠ great investment; the price decides — loop back
const Lesson: React.FC<PieceProps> = ({ f, c, to }) => {
  const great = c('s28:great'), inv = c('s28:investment'), not = c('s28:not'), price = c('s29:price'), right = c('s29:right'), fall = c('s29:fall'), back = c('s30'), safest = c('s30:safest'), only = c('s31:only'), one = c('s31:one')
  const A = 1 - on(f, back - 4), B = on(f, back - 4), end = on(f, to - 36, 18)
  // # the price slider: a ball pushed higher up the ramp has further to fall
  const hi = on(f, price, 24), drop = easeInOut(span(f, fall - 6, fall + 24))
  const ballX = lerp(300, 820, hi), ballY = lerp(1120, 640, hi) + drop * (1120 - lerp(1120, 640, hi))
  return (
    <g>
      <TallStage id="gs" f={f} />
      <g opacity={A}>
        <g opacity={1 - on(f, price - 4)}>
          <g transform={`translate(300 720) scale(${pop(f, great)})`}><circle r={170} fill={P.card} opacity={0.9} /><Prop id="crown" x={0} y={-10} size={200} f={f} /><Label x={0} y={250} text="GREAT COMPANY" size={52} font="Bebas Neue" color={P.ink} /></g>
          <Label x={540} y={760} text="≠" size={170} color={P.coralInk} o={on(f, not)} />
          <g transform={`translate(780 720) scale(${pop(f, inv)})`}><circle r={170} fill={P.card} opacity={0.9} /><Prop id="chart-board" x={0} y={-10} size={200} f={f} /><Label x={0} y={250} text="GREAT INVESTMENT" size={52} font="Bebas Neue" color={P.ink} /></g>
          <Big text="NOT ALWAYS THE SAME" size={100} o={on(f, c('s28:always'))} />
        </g>
        <g opacity={on(f, price - 4)}>
          <Big text="THE PRICE DECIDES" size={110} o={1} />
          <path d="M200 1160 L900 600 L900 1160 Z" fill={P.navy3} opacity={0.9} />
          <Label x={260} y={1220} text="LOW PRICE" size={40} font="Bebas Neue" color={P.mintInk} /><Label x={860} y={560} text="HIGH PRICE" size={40} font="Bebas Neue" color={P.coralInk} />
          <circle cx={ballX} cy={ballY - 40} r={40} fill={P.gold} />
          <Label x={W / 2} y={460} text={f < fall ? 'how much has to go right…' : '…and how far you can fall'} size={50} color={f < fall ? P.ink : P.coralInk} o={on(f, right)} />
        </g>
      </g>
      {/* # loop back to the opening: 2000, the safest bet on Earth — only one left at the top */}
      <g opacity={B * (1 - end)}>
        <g transform="translate(540 420) scale(1.5)"><Calendar x={0} y={0} text="2000" /></g>
        <Giants f={f} id="gs" up={back - 30} shield={on(f, safest, 16) * (1 - on(f, only, 10))} fall={easeInOut(span(f, only, one + 20))} keep={on(f, one, 16)} />
        <Big text="ONLY ONE IS STILL AT THE TOP" size={78} y={700} o={on(f, only)} color={P.goldInk} />
      </g>
      <g opacity={end}><svg x={W / 2 - 80} y={600} width={160} height={160}><Emblem size={160} /></svg>
        <Label x={W / 2} y={850} text="CAPITALCODE" size={80} font="Bebas Neue" color={P.ink} /></g>
      <Vignette id="gs" w={W} h={H} />
    </g>
  )
}

const beat = (sid: string, ws: string[]) => ws.map((w) => (w ? `${sid}:${w}` : sid))
export const GIANTS2000 = [
  makePiece('g2k-hook', 'Short: 2000 — the safest bet on Earth; nine are gone from the top', { canvas: 'tall', mood: 'dark', Component: Hook,
    beats: [...beat('s1', ['year', '2000', '10', 'biggest', 'companies', 'america', 'looked', 'safest', 'bet', 'earth']), ...beat('s2', ['nine', 'them', 'not', 'top', '10', 'anymore']), ...beat('s3', ['here', 'happened', 'why', 'matters', 'index', 'fund', 'today'])],
    sfx: [['s1:2000', 'softpop', 0.6], ['s1:10', 'riser', 0.4], ['s1:safest', 'chime', 0.5], ['s2:nine', 'crack', 0.6], ['s2:anymore', 'thud', 0.5], ['s3:fund', 'pop', 0.5]] }),
  makePiece('g2k-record', 'Short: the record 27% — real businesses that felt safe', { canvas: 'tall', mood: 'light', Component: Record,
    beats: [...beat('s4', ['', 'top', 'dotcom', 'bubble', 'those', '10', 'giants', 'made', '27', 'sp', '500']), ...beat('s5', ['', 'record', 'time']), ...beat('s6', ['', 'not', 'risky', 'little', 'startups']),
      ...beat('s7', ['general', 'electric', 'exxon', 'pfizer', 'cisco', 'citigroup', 'walmart', 'microsoft', 'aig', 'merck', 'intel']), ...beat('s8', ['household', 'names', 'real', 'factories', 'customers', 'real#3', 'profits']),
      ...beat('s9', ['owning', 'felt', 'safest', 'part', 'market'])],
    sfx: [['s4:bubble', 'riser', 0.4], ['s4:27', 'pop', 0.5], ['s5:record', 'ding', 0.5], ['s6:startups', 'glitch', 0.4], ['s7:general', 'tick', 0.4], ['s7:microsoft', 'tick', 0.4], ['s7:intel', 'tick', 0.4],
      ['s8:factories', 'pop', 0.4], ['s8:profits', 'coin', 0.5], ['s9:safest', 'chime', 0.4]] }),
  makePiece('g2k-price', 'Short: safe ≠ cheap — $23.60 for $1 of profit vs $16', { canvas: 'tall', mood: 'light', Component: Price,
    beats: [...beat('s10', ['but', 'safe', 'cheap', 'same', 'thing']), ...beat('s11', ['investors', 'paying', '236', 'every', 'dollar', 'giants', 'expected', 'earn', 'next', 'year']), ...beat('s12', ['', 'rest', 'market', 'paid', '16']),
      ...beat('s13', ['', 'other', 'words', 'famous', 'names', 'big', 'premium', 'everyone', 'loved'])],
    sfx: [['s10:safe', 'pop', 0.4], ['s10:cheap', 'glitch', 0.4], ['s11:dollar', 'coin', 0.6], ['s11:236', 'cash', 0.5], ['s12:16', 'cash', 0.4], ['s13:premium', 'ding', 0.4], ['s13:loved', 'chime', 0.4]] }),
  makePiece('g2k-flip', 'Short: the premium flipped; buyers at the top fell furthest', { canvas: 'tall', mood: 'dark', Component: Flip,
    beats: [...beat('s14', ['then', 'premium', 'something', 'nobody', 'expected']), ...beat('s15', ['five', 'years', 'later', 'giants', 'cheaper', '115', 'times', 'rest', '16']), ...beat('s16', ['', 'premium', 'not', 'shrink', 'flipped']),
      ...beat('s17', ['people', 'bought', 'top', 'picked', 'biggest', 'bestknown', 'companies', 'world']), ...beat('s18', ['', 'shares', 'fell', 'furthest', 'because', 'good', 'news', 'baked', 'price'])],
    sfx: [['s15:later', 'swish', 0.5], ['s15:115', 'tick', 0.5], ['s16:flipped', 'impact', 0.6], ['s17:picked', 'pop', 0.4], ['s18:fell', 'whoosh', 0.6], ['s18:baked', 'softpop', 0.4]] }),
  makePiece('g2k-list', 'Short: of the 2000 top 10 only Microsoft remains', { canvas: 'tall', mood: 'light', Component: List,
    beats: [...beat('s19', ['now', 'look', 'list', 'again', 'today']), ...beat('s20', ['', '10', 'leaders', 'only', 'one', 'still', 'top', '10#2']), ...beat('s21', ['microsoft']),
      ...beat('s22', ['', 'other', 'nine', 'slid', 'down', 'rankings', 'new', 'giants', 'climbed', 'past'])],
    sfx: [['s19:list', 'flutter', 0.5], ['s20:one', 'ding', 0.5], ['s21:microsoft', 'chime', 0.6], ['s22:slid', 'whoosh', 0.5], ['s22:climbed', 'riser', 0.4]] }),
  makePiece('g2k-today', 'Short: today — 37.9% at 28× vs 19.5×; not a forecast, the same question', { canvas: 'tall', mood: 'dark', Component: Today,
    beats: [...beat('s23', ['today', 'top', '10', '38', 'index', 'even', 'more']), ...beat('s24', ['', 'trade', '28', 'times', 'next', 'earnings', 'against', '19', 'half', 'rest']), ...beat('s25', ['', 'not', 'mean', 'crash', 'coming']),
      ...beat('s26', ["today's", 'giants', 'might', 'growing', 'prices', 'some', 'earning', 'enormous', 'profits']), ...beat('s27', ['but', 'mean', 'same', 'old', 'question', 'matters', 'again'])],
    sfx: [['s23:38', 'pop', 0.5], ['s24:28', 'cash', 0.5], ['s24:19', 'tick', 0.4], ['s25:coming', 'glitch', 0.4], ['s26:growing', 'riser', 0.4], ['s26:profits', 'coin', 0.5], ['s27:question', 'softpop', 0.5]] }),
  makePiece('g2k-lesson', 'Short: great company ≠ great investment; the price decides — loop back to 2000', { canvas: 'tall', mood: 'light', Component: Lesson,
    beats: [...beat('s28', ['', 'great', 'company', 'great#2', 'investment', 'not', 'always', 'same']), ...beat('s29', ['', 'price', 'pay', 'decides', 'much', 'go', 'right', 'far', 'fall', "doesn't"]),
      ...beat('s30', ['', 'biggest', 'companies', 'america', 'looked', 'safest', 'bet', 'earth']), ...beat('s31', ['only', 'one', 'still', 'top'])],
    sfx: [['s28:great', 'pop', 0.4], ['s28:not', 'glitch', 0.4], ['s29:price', 'riser', 0.4], ['s29:fall', 'whoosh', 0.6], ['s30', 'swish', 0.5], ['s31:only', 'crack', 0.5], ['s31:one', 'chime', 0.6]] }),
]
