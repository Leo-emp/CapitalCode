// ---------------------------------------------------------------- s38–s45a: landlords pay for the building first; Amazon, Microsoft, Alphabet, Meta capex ≈ $410B in 2025,
// plans > $700B for 2026 (≈ $2B a day); data centers use ≈ 1.5% of world electricity (IEA), more than double by 2030; one company's spending is another's
// revenue — Nvidia is paid when the chip is bought, gold or no gold; so its sales boom while AI companies lose money
import React from 'react'
import { Mini } from '../../rig/Mini'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { beat, type Beat, Calendar, camera, Coin, Col, DataCenter, Gpu, Headline, Label, Person, Prop, Shovel, win } from './common'

// # a construction crane over a half-built hall
const Crane: React.FC<{ x: number; y: number; s?: number; o?: number; f: number }> = ({ x, y, s = 1, o = 1, f }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-10} y={-520} width={20} height={520} fill="#E9C25A" />{Array.from({ length: 10 }, (_, k) => <path key={k} d={`M-10 ${-k * 52} L10 ${-k * 52 - 52}`} stroke="#B88A2E" strokeWidth={4} />)}
    <rect x={-160} y={-540} width={480} height={20} fill="#E9C25A" /><rect x={-170} y={-560} width={60} height={40} fill="#8A99B0" />
    <line x1={260} y1={-520} x2={260} y2={-300 + Math.sin(f / 15) * 30} stroke="#5A6A86" strokeWidth={4} /><rect x={220} y={-300 + Math.sin(f / 15) * 30} width={80} height={40} rx={6} fill="#A9B7CB" />
  </g>
)

const Capex: React.FC<PieceProps> = ({ f, c }) => {
  const landlord = c('s38:landlord'), building = c('s38:building'), expensive = c('s38:expensive')
  const in25 = c('s39:in'), amazon = c('s39:amazon'), microsoft = c('s39:microsoft'), alphabet = c('s39:alphabet'), meta = c('s39:meta'), d410 = c('s39:410'), capital = c('s39:capital')
  const data39 = c('s39:data'), ai39 = c('s39:ai'), y26 = c('s40:2026'), d700 = c('s40:700')
  const almost = c('s41:almost'), day = c('s41:day')
  const power = c('s42:power'), agency = c('s42:agency'), d15 = c('s42:15'), electricity = c('s42:electricity')
  const expects = c('s43:expects'), double = c('s43:double'), by2030 = c('s43:by')
  const key = c('s44:key'), spending = c('s44:spending'), revenue = c('s44:revenue')
  const buys = c('s45:buys'), nvidia = c('s45:nvidia'), paid = c('s45:paid'), gold = c('s45:gold')
  const boom = c('s45a:boom'), lose = c('s45a:lose')
  const A = win(f, landlord, in25), B = win(f, in25, power), Cc = win(f, power, key), D = on(f, key, 10)
  const hero: Beat[] = [[0, 'idle', 'neutral'], [building, 'carryHeavy', 'neutral'], [expensive, 'despair', 'worried'], [in25, 'explain', 'neutral'], [d410, 'shock', 'shocked'], [d700, 'oops', 'shocked'], [day, 'scratchHead', 'thinking'],
    [power, 'pointUp', 'neutral'], [double, 'shock', 'shocked'], [key, 'countOne', 'neutral'], [revenue, 'explain', 'smiling'], [paid, 'clapA', 'smiling', 'clapB', 12], [gold, 'shrug', 'neutral'], [lose, 'shrug', 'worried']]
  const K = 0.7 // # px per $1B on the capex columns
  return (
    <g>
      <Stage id="cx" frame={f} />
      <Headline f={f} lines={[[c("s38:buildings"), "AND THESE BUILDINGS…", P.ink, 120], [c("s41:every"), "EVERY SINGLE DAY", P.goldInk, 124], [c("s45:whether"), "WHETHER OR NOT…", P.ink, 124], [c("s45a:nvidia's"), "THAT'S HOW…", P.ink, 124], [c("s45a:companies"), "EVEN AS AI COMPANIES…", P.ink, 116], [landlord, 'BUILD FIRST, EARN LATER', P.ink, 124], [expensive, 'VERY EXPENSIVE', P.coralInk, 140], [in25, 'BIG TECH SPENDING ON BUILDINGS & CHIPS', P.ink, 92], [d410, '2025: ≈ $410 BILLION', P.goldInk, 124],
        [y26, '2026 PLANS', P.ink, 130], [d700, 'MORE THAN $700 BILLION', P.coralInk, 120], [almost, '≈ $2 BILLION A DAY', P.goldInk, 130],
        [power, 'THEY NEED POWER', P.ink, 130], [d15, '≈ 1.5% OF THE WORLD’S ELECTRICITY', P.goldInk, 100], [double, 'MORE THAN DOUBLE BY 2030', P.coralInk, 112],
        [key, 'THE KEY IDEA', P.ink, 130], [spending, "ONE COMPANY'S SPENDING…", P.ink, 116], [revenue, "…IS ANOTHER'S REVENUE", P.mintInk, 116], [paid, 'NVIDIA IS PAID THAT DAY', P.mintInk, 116], [gold, 'GOLD OR NO GOLD', P.goldInk, 124],
        [boom, "NVIDIA'S SALES BOOM…", P.mintInk, 120], [lose, '…LOSE MONEY', P.coralInk, 130]]} />
      <g transform={camera(f, [[expensive, 1240, 640, 1.05], [in25, 960, 540, 1], [d700, 1200, 600, 1.04], [power, 960, 540, 1], [key, 960, 540, 1], [paid, 1200, 620, 1.05], [boom, 960, 540, 1]])}>
        {/* # A: a data center going up under cranes; price tags pop on "expensive" */}
        <g opacity={A}>
          <Crane x={900} y={900} s={0.9} o={on(f, building, 8)} f={f} /><Crane x={1700} y={900} s={0.8} o={on(f, building + 6, 8)} f={f} />
          <g opacity={on(f, landlord, 8)}><DataCenter x={1300} y={900} s={0.9} lit={on(f, building, 30)} f={f} /></g>
          {[[1040, 520], [1360, 440], [1560, 560]].map(([x, y], k) => <g key={k} opacity={on(f, expensive + k * 3, 6)} transform={`translate(${x} ${y}) rotate(${-8 + k * 8}) scale(${pop(f, expensive + k * 3)})`}><Prop id="price-tag" x={0} y={0} size={120} f={f} /><Label x={0} y={90} text="$$$" size={52} font="Bebas Neue" color={P.coralInk} /></g>)}
        </g>
        {/* # B: four companies, then two columns — 2025 and 2026 plans — and the day calendar */}
        <g opacity={B}>
          {[[amazon, 'AMAZON'], [microsoft, 'MICROSOFT'], [alphabet, 'ALPHABET'], [meta, 'META']].map(([at, t], k) => <g key={k} opacity={on(f, at as number, 6)} transform={`translate(${760 + k * 300} 330) scale(${pop(f, at as number)})`}>
            <rect x={-140} y={-56} width={280} height={112} rx={20} fill={P.card} /><Label x={0} y={22} text={t as string} size={62} font="Bebas Neue" color={P.ink} /></g>)}
          <Col x={900} y={980} h={410 * K * on(f, d410, 24)} w={220} color={P.gold} value={f >= d410 ? '$410B' : ''} label="2025" o={on(f, d410, 6)} />
          <g opacity={on(f, data39, 6) * (1 - on(f, y26, 8))}><DataCenter x={1350} y={940} s={0.45} f={f} lit={1} /><g opacity={on(f, ai39, 6)} transform={`translate(1350 680) scale(${pop(f, ai39)})`}><rect x={-70} y={-40} width={140} height={80} rx={16} fill={P.mint} /><Label x={0} y={22} text="AI" size={64} font="Bebas Neue" color={P.navy0} /></g></g>
          <Col x={1240} y={980} h={725 * K * on(f, d700, 30)} w={220} color={P.coral} value={f >= d700 ? '$700B+' : ''} label={f >= y26 ? '2026 PLANS' : ''} o={on(f, y26, 6)} />
          <g opacity={on(f, almost, 6)} transform={`translate(1640 680) scale(${pop(f, almost)})`}><Calendar x={0} y={0} text="1 DAY" s={1.2} /><g transform="translate(0 200)"><rect x={-130} y={-50} width={260} height={100} rx={18} fill={P.gold} /><Label x={0} y={30} text="≈ $2B" size={80} font="Bebas Neue" color={P.navy0} /></g></g>
        </g>
        {/* # C: the power — a plug, a globe with a 1.5% slice; the 2024 → 2030 bar more than doubles */}
        <g opacity={Cc}>
          <g opacity={on(f, power, 6)} transform={`translate(900 560) scale(${pop(f, power)})`}><circle r={120} fill={P.card} /><Prop id="lightning" x={0} y={-6} size={160} f={f} /></g>
          <g opacity={on(f, agency, 6)} transform={`translate(1300 560) scale(${pop(f, agency)})`}><circle r={130} fill="#2E6FB0" /><Prop id="globe" x={0} y={0} size={240} f={f} />
            {f >= d15 && <path d={`M0 0 L0 -130 A130 130 0 0 1 ${Math.sin(Math.PI * 2 * 0.015) * 130} ${-Math.cos(Math.PI * 2 * 0.015) * 130} Z`} fill={P.gold} opacity={on(f, d15, 6)} />}
            {f >= d15 && <g opacity={on(f, d15 + 6, 8)}><circle cx={6} cy={-118} r={22} fill="none" stroke={P.goldInk} strokeWidth={5} /><path d="M24 -128 L150 -190" stroke={P.goldInk} strokeWidth={5} /><circle cx={200} cy={-210} r={56} fill={P.card} stroke={P.goldInk} strokeWidth={5} /><text x={200} y={-194} textAnchor="middle" fill={P.goldInk} style={{ font: '400 48px "Bebas Neue"' }}>1.5%</text></g>}</g>
          <g opacity={on(f, electricity, 6)}><Label x={1300} y={760} text="DATA CENTERS ≈ 1.5%" size={54} font="Bebas Neue" color={P.goldInk} /></g>
          <g opacity={on(f, expects, 6)}>
            <rect x={760} y={880} width={300} height={80} rx={14} fill={P.sky} /><Label x={780} y={936} text="2024" size={56} font="Bebas Neue" color={P.navy0} anchor="start" />
            <rect x={760} y={980} width={300 + 390 * on(f, double, 24)} height={80} rx={14} fill={P.coral} opacity={on(f, double, 6)} /><Label x={780} y={1036} text={f >= by2030 ? '2030 (IEA)' : ''} size={56} font="Bebas Neue" color="#FFFFFF" anchor="start" />
            <Label x={1090 + 390} y={1036} text={f >= double + 20 ? '×2+' : ''} size={72} font="Bebas Neue" color={P.coralInk} anchor="start" />
          </g>
        </g>
        {/* # D: spending → revenue; the cloud buys a chip, Nvidia's till rings that day; the diggers may or may not find gold */}
        <g opacity={D}>
          <g opacity={1 - on(f, buys, 8)}>
            <g opacity={on(f, spending, 6)} transform="translate(900 640)"><circle r={110} fill={P.card} /><Prop id="wallet" x={0} y={0} size={140} f={f} /><Label x={0} y={170} text="SPENDING" size={56} font="Bebas Neue" color={P.coralInk} /></g>
            <g opacity={on(f, revenue, 6)} transform="translate(1560 640)"><circle r={110} fill={P.card} /><Prop id="cash-stack" x={0} y={0} size={140} f={f} /><Label x={0} y={170} text="REVENUE" size={56} font="Bebas Neue" color={P.mintInk} /></g>
            {Array.from({ length: 5 }, (_, k) => { const t = easeInOut(span(f, spending + 8 + k * 5, spending + 30 + k * 5)); return <Coin key={k} x={lerp(1000, 1460, t)} y={640 - Math.sin(t * Math.PI) * 140} s={0.7} o={on(f, spending + 8 + k * 5, 3) * (1 - span(f, spending + 28 + k * 5, spending + 32 + k * 5))} /> })}
          </g>
          <g opacity={on(f, buys, 6)}>
            <DataCenter x={900} y={900} s={0.55} f={f} label="CLOUD" />
            <Gpu x={1560} y={520} s={0.8} glow={0.8} label={f >= nvidia ? 'NVIDIA' : ''} />
            {(() => { const t = easeInOut(span(f, buys + 4, buys + 30)); return <g opacity={1 - span(f, buys + 28, buys + 34)} transform={`translate(${lerp(1560, 900, t)} ${lerp(520, 720, t) - Math.sin(t * Math.PI) * 120}) scale(0.3)`}><Gpu x={0} y={0} glow={1} /></g> })()}
            {Array.from({ length: 5 }, (_, k) => { const t = easeInOut(span(f, paid + k * 4, paid + 20 + k * 4)); return <Coin key={k} x={lerp(900, 1560, t)} y={lerp(640, 760, t) - Math.sin(t * Math.PI) * 120} s={0.7} o={on(f, paid + k * 4, 3) * (1 - span(f, paid + 18 + k * 4, paid + 22 + k * 4))} /> })}
            <g opacity={on(f, paid, 6)} transform={`translate(1560 800) scale(${pop(f, paid)})`}><rect x={-150} y={-46} width={300} height={92} rx={16} fill={P.mint} /><Label x={0} y={22} text="PAID TODAY" size={60} font="Bebas Neue" color={P.navy0} /></g>
            <g opacity={on(f, gold, 6) * (1 - on(f, boom, 8))}>{[0, 1].map((k) => <g key={k}><Mini look={['hero', 'worker'][k]} x={1150 + k * 160} y={1010} scale={0.9} frame={f} seed={k + 190} /><g transform={`translate(${1215 + k * 130} 950) rotate(${-30 + Math.abs(Math.sin(f / 6 + k)) * 24})`}><Shovel x={0} y={0} s={0.3} /></g></g>)}
              <g transform={`translate(1250 820) scale(${pop(f, gold) * 0.6})`}><circle r={44} fill={P.gold} /><Label x={0} y={24} text="?" size={70} font="Bebas Neue" color={P.navy0} /></g></g>
            <g opacity={on(f, boom, 6)} transform="translate(1800 560)"><Prop id="arrow-up" x={0} y={0} size={110} f={f} /></g>
            <g opacity={on(f, lose, 6)} transform={`translate(1240 940) scale(${pop(f, lose)})`}><circle r={80} fill={P.card} /><Prop id="robot-head" x={0} y={-4} size={100} f={f} /><g transform="translate(110 0)"><Prop id="arrow-down" x={0} y={0} size={90} f={f} /></g></g>
          </g>
        </g>
        <Person f={f} who="hero" beats={hero} x={300} y={1190} s={1.4} life={2} />
      </g>
      <Vignette id="cx" />
    </g>
  )
}

export const AI_CAPEX = makePiece('ai-capex', 'Long: Big Tech capex ≈ $410B (2025) → > $700B planned (2026), ≈ $2B a day; data centers ≈ 1.5% of world electricity, > double by 2030 (IEA); spending = revenue for suppliers; Nvidia paid at sale', { mood: 'dark', Component: Capex,
  beats: ["s38:landlord", "s38:building", "s38:expensive", "s39:in", "s39:amazon", "s39:microsoft", "s39:alphabet", "s39:meta", "s39:410", "s39:capital", "s39:data", "s39:ai", "s40:2026", "s40:700", "s41:almost", "s41:day", "s42:power", "s42:agency", "s42:15", "s42:electricity", "s43:expects", "s43:double", "s43:by", "s44:key", "s44:spending", "s44:revenue", "s45:buys", "s45:nvidia", "s45:paid", "s45:gold", "s45a:boom", "s45a:lose", "s38:buildings", "s41:every", "s45:whether", "s45a:nvidia's", "s45a:companies"],
  sfx: [['s38:expensive', 'thud', 0.4], ['s39:410', 'impact', 0.5], ['s40:700', 'impact', 0.6], ['s41:day', 'tick', 0.4], ['s42:15', 'pop', 0.4], ['s43:double', 'riser', 0.4], ['s44:revenue', 'coin', 0.4], ['s45:paid', 'ding', 0.5], ['s45a:lose', 'thud', 0.4]] })
