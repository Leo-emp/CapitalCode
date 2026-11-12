// ---------------------------------------------------------------- s24–s39: step two, why an election hit chip stocks.
// A) A data-center building site at dusk (violet → orange sky, cranes, power lines). Who buys the chips: a giant
//    CLOUD CO. tower, a finished data center blinking with servers; thousands of little chips stream into it; a second
//    one rises from the crane → Nvidia sells more (coins). The worry: a permit gets a WAIT stamp, the power line
//    flickers, a cost tag swings; the half-built data center freezes; chip ORDER slips drop from 3 to 1.
// B) An orchard at twilight: a stock price is about the future. An apple tree with a FUTURE APPLES tag and years
//    ticking; a storm cloud drifts over — the tree's price tag drops while every apple stays.
// C) An evening bakery street: the bakery sends bread trucks to a restaurant chain; the chain dims some
//    restaurants; the bakery's FUTURE SALES tag shrinks, TODAY'S ORDERS unchanged. Then the same idea on a chip.
import React from 'react'
import { lerp, on, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win, type Beat } from '../aimoney/common'
import { AMBER, AppleTree, Bakery, ChainSign, ChipCity, Crane, DataCenter, Floor, NEON, Permit, Pylon, RED, Skyline, Sky, StormCloud } from './kit'

const K = {
  why24: 's24:why', election24: 's24:election', chip24: 's24:chip',
  understand25: 's25:understand', know25: 's25:know', buys: 's25:buys', nvidias: "s25:nvidia's", chips25: 's25:chips',
  biggest: 's26:biggest', buyers: 's26:buyers', giant: 's26:giant', tech26: 's26:tech', data26: 's26:data', huge: 's26:huge', computers: 's26:computers', train: 's26:train', run: 's26:run', ai26: 's26:ai',
  every27: 's27:every', needs: 's27:needs', thousands: 's27:thousands', chips27: 's27:chips', more27: 's27:more', built27: 's27:built', more27b: 's27:more#2', sells27: 's27:sells',
  worry: 's28:worry', election28: 's28:election', feared: 's28:feared', tougher: 's28:tougher', rules: 's28:rules', built28: 's28:built', power28: 's28:power', use28: 's28:use', cost: 's28:cost',
  building29: 's29:building', already: 's29:already', permits: 's29:permits', land: 's29:land', connection: 's29:connection', grid: 's29:grid',
  slow: 's30:slow', giants: 's30:giants', build30: 's30:build', fewer30: 's30:fewer', later: 's30:later',
  fewer31: 's31:fewer', means31: 's31:means', fewer31b: 's31:fewer#2', orders31: 's31:orders',
  nothing: 's32:nothing', changed32: 's32:changed', law: 's32:law', passed: 's32:passed', why32: 's32:why', fall32: 's32:fall',
  stock33: 's33:stock', price33: 's33:price', today33: 's33:today', expect33: 's33:expect', earn: 's33:earn', future33: 's33:future',
  think34: 's34:think', apple34: 's34:apple', tree34: 's34:tree', pay34: 's34:pay', apples34: 's34:apples', today34: 's34:today', apples34b: 's34:apples#2', grow: 's34:grow', years34: 's34:years',
  weather: 's35:weather', worse35: 's35:worse', tree35: 's35:tree', worth35: 's35:worth', less35: 's35:less', lost35: 's35:lost', apple35: 's35:apple',
  another36: 's36:another', imagine: 's36:imagine', bakery: 's36:bakery', sells36: 's36:sells', bread: 's36:bread', giant36: 's36:giant', chain36: 's36:chain',
  chain37: 's37:chain', open37: 's37:open', fewer37: 's37:fewer', restaurants: 's37:restaurants', bakerys: "s37:bakery's", future37: 's37:future', sales: 's37:sales', smaller: 's37:smaller', todays: "s37:today's", orders37: 's37:orders', changed37: 's37:changed',
  happened38: 's38:happened', chip38: 's38:chip', future38: 's38:future', cloudier: 's38:cloudier', paid: 's38:paid', less38: 's38:less',
  step39: 's39:step', raised: 's39:raised', risk: 's39:risk', boom39: 's39:boom', slows: 's39:slows', priced: 's39:priced', boom39b: 's39:boom#2',
}
type Key = keyof typeof K

// # a small chip icon (flies into the data center)
const Chip: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><rect x={-22} y={-22} width={44} height={44} rx={6} fill="#1C2740" stroke={NEON} strokeWidth={4} />{[-12, 0, 12].map((p) => <g key={p}><rect x={p - 2} y={-32} width={4} height={10} fill="#C9A13A" /><rect x={p - 2} y={22} width={4} height={10} fill="#C9A13A" /></g>)}<rect x={-10} y={-10} width={20} height={20} rx={3} fill={NEON} opacity={0.7} /></g>
)
// # a price tag on a string
const PriceTag: React.FC<{ x: number; y: number; t: string; col?: string; s?: number; r?: number; o?: number }> = ({ x, y, t, col = AMBER, s = 1, r = -6, o = 1 }) => {
  const w = Math.max(220, t.length * 21 + 70), L = -w / 2 - 20, Rr = w / 2 - 20
  return <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}><path d={`M${L} -44 L${Rr} -44 L${Rr + 40} 0 L${Rr} 44 L${L} 44 Z`} fill={col} stroke="#1B1546" strokeWidth={4} /><circle cx={Rr + 6} cy={0} r={8} fill="#1B1546" /><Label x={(L + Rr) / 2} y={14} text={t} size={40} font="Bebas Neue" color="#1B1546" /></g>
}
// # an order slip stack: n slips
const Orders: React.FC<{ x: number; y: number; n: number; o?: number }> = ({ x, y, n, o = 1 }) => (
  <g opacity={o}>{Array.from({ length: 3 }, (_, k) => <g key={k} opacity={k < n ? 1 : 0.15} transform={`translate(${x + k * 26} ${y - k * 20}) rotate(${-6 + 6 * k})`}><rect x={-90} y={-60} width={180} height={120} rx={10} fill="#F4F3FF" /><Label x={0} y={-16} text="CHIP ORDER" size={32} font="Bebas Neue" color="#1B1546" /><rect x={-60} y={10} width={120} height={10} rx={5} fill="#B9BEDD" /></g>)}</g>
)

const Why: React.FC<PieceProps> = ({ f, c }) => {
  const q = Object.fromEntries(Object.entries(K).map(([k, v]) => [k, c(v)])) as Record<Key, number>
  const AB = q.nothing - 8, BC = q.another36 - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  const halt = on(f, q.slow, 12)
  const build2 = 0.55 * span(f, q.more27, q.built27 + 30)
  const gloom = on(f, q.weather, 20), cloud37 = on(f, q.fewer37, 14)
  const farmer: Beat[] = [[AB, 'idle', 'neutral'], [q.pay34, 'present', 'smiling'], [q.weather, 'lookFar', 'worried'], [q.less35, 'shrug', 'worried'], [q.apple35, 'point', 'thinking']]
  return (
    <g>
      <Stage id="nv-why" frame={f} />
      {/* # A) the building site */}
      {A > 0 && <g opacity={A}>
        <Sky id="nvy-sky" top="#2A1E6E" bottom="#FF8E5E" glow={AMBER} gx={960} gy={900} f={f} stars={12} />
        <Skyline y={900} col="#2A1F55" seed={13} h={160} o={0.8} />
        <Floor id="nvy-floor" y={900} top="#3A2A50" bottom="#140F2A" rim={AMBER} />
        <Pylon x={1780} y={900} s={0.9} o={on(f, q.power28, 8) * 0.3 + 0.7} live={1 - 0.8 * win(f, q.power28, q.grid + 20, 6) * (0.5 + 0.5 * Math.sin(f / 2))} />
        {/* the big buyer */}
        <g opacity={on(f, q.biggest, 10)}><rect x={120} y={380} width={220} height={520} rx={8} fill="#2F3A7A" /><rect x={110} y={350} width={240} height={50} rx={10} fill="#4E5AB0" /><Label x={230} y={385} text="CLOUD CO." size={38} font="Bebas Neue" color="#E8E6FF" />
          {Array.from({ length: 16 }, (_, k) => <rect key={k} x={140 + (k % 4) * 50} y={430 + Math.floor(k / 4) * 110} width={30} height={60} fill={AMBER} opacity={0.5} />)}
          <Label x={230} y={960} text="GIANT TECH COMPANIES" size={38} font="Bebas Neue" color="#FFE0C2" o={on(f, q.giant, 8)} /></g>
        <DataCenter x={720} y={900} s={0.95} o={on(f, q.data26, 10)} f={f} lit={on(f, q.computers, 12)} />
        <g opacity={on(f, q.train, 8) * (1 - on(f, q.every27, 8))}><Label x={720} y={600} text="COMPUTERS THAT TRAIN AND RUN AI" size={44} font="Bebas Neue" color={NEON} /></g>
        {/* thousands of chips stream in */}
        {Array.from({ length: 12 }, (_, k) => { const t0 = q.needs + k * 4, t = span(f, t0, t0 + 30); return t > 0 && t < 1 ? <Chip key={k} x={lerp(230, 720, t)} y={lerp(300, 700, t) - 140 * Math.sin(Math.PI * t)} s={0.8} /> : null })}
        <g opacity={on(f, q.thousands, 8) * (1 - on(f, q.more27, 8))}><Label x={720} y={560} text="THOUSANDS OF CHIPS EACH" size={50} font="Bebas Neue" color={NEON} /></g>
        <Crane x={1150} y={900} s={0.95} o={on(f, q.more27, 10)} swing={Math.sin(f / 30) * (1 - halt)} />
        <DataCenter x={1450} y={900} s={0.8} o={on(f, q.more27, 10)} build={build2} f={f} />
        <g opacity={win(f, q.sells27, q.worry, 8)}><Label x={1300} y={320} text="MORE DATA CENTERS = MORE CHIPS SOLD" size={46} font="Bebas Neue" color={NEON} /></g>
        {/* the worry */}
        <g opacity={on(f, q.tougher, 10) * (1 - on(f, q.slow, 10))}>
          <Permit x={1000} y={440} s={0.75} stamp={on(f, q.permits, 10)} text="WAIT" />
          <g opacity={on(f, q.rules, 8)}><Label x={1000} y={270} text="TOUGHER RULES?" size={50} font="Bebas Neue" color={RED} /></g>
          <PriceTag x={1640} y={420} t="COSTS ↑" col="#FF9AA5" o={on(f, q.cost, 8)} r={-8 + 10 * Math.sin(f / 12)} />
          <g opacity={on(f, q.land, 8)}><Label x={1450} y={980} text={f >= q.grid ? 'PERMITS · LAND · POWER GRID' : f >= q.land ? 'PERMITS · LAND' : 'PERMITS'} size={44} font="Bebas Neue" color="#FFE0C2" /></g>
        </g>
        <g opacity={on(f, q.slow, 10)}><Label x={1500} y={320} text={f >= q.later ? 'FEWER, OR LATER' : 'BUILDING SLOWS'} size={54} font="Bebas Neue" color={RED} /></g>
        <g opacity={on(f, q.fewer31, 10)} transform="translate(0 0)"><rect x={480} y={300} width={420} height={260} rx={20} fill="#1B1546" opacity={0.85} /><Orders x={660} y={460} n={3 - 2 * on(f, q.fewer31b, 14)} /><Label x={690} y={340} text="FEWER CHIP ORDERS" size={44} font="Bebas Neue" color={RED} o={on(f, q.orders31, 8)} /></g>
      </g>}
      {/* # B) the orchard: price = the future */}
      {B > 0 && <g opacity={B}>
        <Sky id="nvy-sky2" top={gloom > 0.5 ? '#1A1A40' : '#2A3A7A'} bottom={gloom > 0.5 ? '#3A3A6A' : '#9E8AE0'} f={f} stars={10} />
        <path d="M0 780 Q480 700 960 760 Q1440 820 1920 740 L1920 1080 L0 1080 Z" fill="#1E4A3A" /><path d="M0 860 Q600 800 1200 860 Q1600 900 1920 850 L1920 1080 L0 1080 Z" fill="#163A2E" />
        <g opacity={1 - on(f, q.think34, 12)}>
          <g opacity={on(f, q.nothing, 8)} transform="translate(560 560)"><rect x={-180} y={-120} width={360} height={220} rx={16} fill="#F4F3FF" /><Label x={0} y={-60} text="NEW LAW" size={56} font="Bebas Neue" color="#1B1546" />
            {[0, 1, 2].map((k) => <rect key={k} x={-130} y={-20 + k * 34} width={260} height={14} rx={7} fill="#B9BEDD" />)}
            <path d="M-200 -140 L200 120 M200 -140 L-200 120" stroke={RED} strokeWidth={16} strokeLinecap="round" opacity={on(f, q.law, 10)} /></g>
          <g opacity={on(f, q.nothing, 8)}><Label x={560} y={760} text={f >= q.passed ? 'NO NEW LAW HAD PASSED' : 'NOTHING HAD CHANGED YET'} size={46} font="Bebas Neue" color="#E8E6FF" /></g>
          <g opacity={on(f, q.stock33, 10)} transform="translate(1340 520)">
            <PriceTag x={-220} y={0} t="STOCK PRICE" s={1.1} />
            <g opacity={on(f, q.expect33, 8)}>{['2027', '2028', '2029', '…'].map((y, k) => <g key={k} opacity={on(f, q.expect33 + k * 6, 8)}><circle cx={60 + k * 110} cy={0} r={44} fill="#2A2460" stroke={AMBER} strokeWidth={4} /><Label x={60 + k * 110} y={12} text={y} size={30} font="Bebas Neue" color={AMBER} /></g>)}</g>
            <Label x={150} y={110} text={f >= q.earn ? 'EXPECTED FUTURE PROFITS' : 'NOT JUST TODAY'} size={46} font="Bebas Neue" color="#E8E6FF" o={on(f, q.today33, 8)} />
          </g>
        </g>
        <g opacity={on(f, q.think34, 12)}>
          <AppleTree x={1100} y={860} s={1.2} apples={14} gloom={gloom} />
          <StormCloud x={1100} y={220} s={0.9} o={gloom} f={f} rain={0.6} />
          <Person f={f} who="worker" beats={farmer} x={520} y={900} s={1.0} />
          <PriceTag x={1560} y={600} t={f >= q.less35 ? 'TREE: WORTH LESS' : 'TREE PRICE'} col={f >= q.less35 ? '#FF9AA5' : '#9FF5C8'} s={1.1} o={on(f, q.pay34, 8)} r={f >= q.less35 ? 8 : -6} />
          <g opacity={win(f, q.apples34b, q.weather, 8)}><Label x={1560} y={720} text="= ALL THE APPLES TO COME" size={40} font="Bebas Neue" color="#E8E6FF" /></g>
          <g opacity={on(f, q.lost35, 8)}><Label x={1100} y={980} text="NOT ONE APPLE LOST" size={48} font="Bebas Neue" color={AMBER} /></g>
        </g>
      </g>}
      {/* # C) the bakery street, then the chip */}
      {C > 0 && <g opacity={C}>
        <Sky id="nvy-sky3" top="#120E36" bottom="#4A2A5A" glow={AMBER} gx={500} gy={800} f={f} stars={20} />
        <Floor id="nvy-floor3" y={900} top="#2A2040" bottom="#0E0A20" rim={AMBER} />
        <g opacity={1 - on(f, q.happened38, 12)}>
          <Bakery x={420} y={900} s={0.95} o={on(f, q.bakery, 10)} />
          <ChainSign x={1480} y={900} s={0.95} o={on(f, q.chain36, 10)} open={6 - 3 * cloud37} />
          {[0, 1, 2].map((k) => { const t = ((f - q.bread - k * 30) % 90) / 90; return f > q.bread ? <g key={k} transform={`translate(${lerp(620, 1200, Math.max(0, t))} 850)`} opacity={t > 0 ? 1 : 0}><rect x={-70} y={-60} width={110} height={60} rx={8} fill="#E8E6FF" /><rect x={40} y={-44} width={40} height={44} rx={6} fill={AMBER} /><circle cx={-40} cy={4} r={14} fill="#1B1546" /><circle cx={50} cy={4} r={14} fill="#1B1546" /></g> : null })}
          <g opacity={on(f, q.fewer37, 8)}><Label x={1480} y={980} text="FEWER RESTAURANTS?" size={46} font="Bebas Neue" color={RED} /></g>
          <PriceTag x={420} y={380} t={`FUTURE SALES ${f >= q.smaller ? '↓' : ''}`} col={f >= q.smaller ? '#FF9AA5' : '#9FF5C8'} s={lerp(1.1, 0.85, on(f, q.smaller, 14))} o={on(f, q.future37, 8)} />
          <PriceTag x={960} y={300} t="TODAY'S ORDERS: SAME" col="#E8E6FF" o={on(f, q.todays, 8)} r={2} />
        </g>
        <g opacity={on(f, q.happened38, 12)}>
          <ChipCity id="nvy-chip" x={960} y={660} s={1.0} dim={0.5 * on(f, q.cloudier, 16)} />
          <StormCloud x={960} y={250} s={0.85} o={on(f, q.cloudier, 12)} f={f} rain={0.4} />
          <PriceTag x={1560} y={600} t={f >= q.paid ? 'PRICE ↓' : 'PRICE'} col={f >= q.less38 ? '#FF9AA5' : '#9FF5C8'} s={1.1} o={on(f, q.future38, 8)} />
          <g opacity={on(f, q.raised, 8)}><Label x={960} y={980} text="RISK: THE AI BUILDING BOOM SLOWS" size={50} font="Bebas Neue" color={RED} /></g>
        </g>
      </g>}
      <Headline f={f} lines={[[q.why24, 'WHY WOULD AN ELECTION HIT CHIPS?', '#E8E6FF', 92], [q.buys, 'WHO BUYS NVIDIA’S CHIPS?', '#E8E6FF', 100], [q.every27, 'MORE DATA CENTERS, MORE CHIPS', NEON, 96],
        [q.worry, 'THE WORRY', RED, 110], [q.fewer31, 'FEWER DATA CENTERS = FEWER ORDERS', RED, 92], [q.nothing, 'BUT NOTHING HAD CHANGED YET', '#E8E6FF', 96], [q.stock33, 'A PRICE IS ABOUT THE FUTURE', '#E8E6FF', 100],
        [q.think34, 'LIKE BUYING AN APPLE TREE', '#E8E6FF', 100], [q.another36, 'OR A BAKERY', '#E8E6FF', 108], [q.happened38, 'SAME WITH CHIP STOCKS', '#E8E6FF', 104]]} />
      <Vignette id="nv-why" />
    </g>
  )
}

export const NV_WHY = makePiece('nv-why', 'Why an election hit chips: a dusk building site — a CLOUD CO. tower (giant tech companies), a blinking data center with servers, little chips streaming into it, a crane raising a second data center (more data centers = more chips sold); a BUILDING PERMIT stamped WAIT, a flickering power line, a swinging COSTS tag, permits · land · power grid; the build freezes (fewer, or later) and CHIP ORDER slips drop from 3 to 1; nothing had changed yet (NEW LAW crossed out); a stock price tag points to future years; an orchard apple tree priced $1,000 drops to $600 under a storm cloud while not one apple is lost; an evening bakery sends bread vans to a restaurant chain that dims some restaurants — FUTURE SALES tag shrinks, TODAY’S ORDERS SAME; the chip city dims under a cloud and its PRICE tag drops', {
  mood: 'dark', Component: Why, beats: Object.values(K),
  sfx: [['s26:data', 'pop', 0.2], ['s27:thousands', 'whoosh', 0.2], ['s29:permits', 'thud', 0.25], ['s31:fewer#2', 'click', 0.2], ['s32:law', 'swish', 0.2], ['s35:less', 'thud', 0.2], ['s37:smaller', 'thud', 0.2], ['s38:cloudier', 'whoosh', 0.2]] })
