// ---------------------------------------------------------------- s20–s27: Nvidia designs GPUs (first for video games: thousands of small sums at once — what AI needs);
// FY to Jan 2026: revenue $216B (+65%), data center $194B; $71 of every $100 left after making the products (gross margin 71.1%); demand + software lock-in;
// Google and Amazon design their own chips, most of the industry still queues; profit ≈ $120B; the shovel seller is winning
import React from 'react'
import { Mini } from '../../rig/Mini'
import { easeOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { beat, type Beat, Calendar, camera, Gpu, Headline, Label, Person, Pile, Prop, Shovel, Split, win } from './common'

// # a game controller
const Pad: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-150 -40 Q-150 -80 -100 -80 L100 -80 Q150 -80 150 -40 L170 50 Q180 100 130 100 Q100 100 80 60 L-80 60 Q-100 100 -130 100 Q-180 100 -170 50 Z" fill="#2C3A55" />
    <rect x={-110} y={-30} width={60} height={20} rx={6} fill="#C9D3E1" /><rect x={-90} y={-50} width={20} height={60} rx={6} fill="#C9D3E1" />
    {[[90, -40, P.coral], [120, -10, P.gold], [60, -10, P.sky], [90, 20, P.mint]].map(([cx, cy, col], k) => <circle key={k} cx={cx as number} cy={cy as number} r={13} fill={col as string} />)}
  </g>
)

const Nvidia: React.FC<PieceProps> = ({ f, c }) => {
  const designs = c('s20:designs'), gpus = c('s20:gpus'), built = c('s20:built'), run20 = c('s20:run'), charge = c('s25:charge')
  const video = c('s20a:video'), graphics = c('s20a:graphics'), trick = c('s20a:trick'), thousands = c('s20a:thousands'), once = c('s20a:once'), ai = c('s20a:ai')
  const january = c('s21:january'), d216 = c('s21:216'), d65 = c('s21:65')
  const d194 = c('s22:194'), data = c('s22:data'), equipment = c('s22:equipment')
  const striking = c('s23:striking'), d100 = c('s23:100'), d71 = c('s23:71'), paying = c('s23:paying')
  const gross = c('s24:gross'), far = c('s24:far'), physical = c('s24:physical')
  const two = c('s25:two'), demand = c('s25:demand'), enormous = c('s25:enormous'), software = c('s25:software'), switching = c('s25:switching'), rival = c('s25:rival')
  const customers = c('s25a:customers'), google = c('s25a:google'), amazon = c('s25a:amazon'), own = c('s25a:own'), industry = c('s25a:industry'), lines = c('s25a:lines')
  const result = c('s26:result'), d120 = c('s26:120'), profit = c('s26:profit')
  const shovel = c('s27:shovel'), winning = c('s27:winning')
  const A = win(f, designs, january), B = win(f, january, striking), Cc = win(f, striking, charge), D = win(f, charge, result), E = on(f, result, 10)
  const hero: Beat[] = [[0, 'idle', 'neutral'], [designs, 'present', 'neutral'], [video, 'type', 'smiling'], [trick, 'explain', 'thinking'], [ai, 'pointUp', 'smiling'], [d216, 'shock', 'shocked'], [d65, 'fistPump', 'smiling'],
    [striking, 'explain', 'neutral'], [d71, 'taDa', 'smiling'], [two, 'countOne', 'neutral'], [software, 'countA', 'neutral'], [customers, 'think', 'thinking'], [lines, 'shrug', 'neutral'], [d120, 'oops', 'shocked'], [winning, 'clapA', 'smiling', 'clapB', 12]]
  const W = 4.2 // # px per $1B on the revenue bar
  return (
    <g>
      <Stage id="nv" frame={f} />
      <Headline f={f} lines={[[c("s20a:gpus"), "GPUs…", P.mintInk, 130], [c("s21:financial"), "NVIDIA'S LATEST YEAR", P.ink, 120], [c("s21:nvidia"), "NVIDIA BROUGHT IN…", P.ink, 120], [c("s21:revenue"), "$216 BILLION OF REVENUE", P.goldInk, 116], [c("s21:single"), "IN A SINGLE YEAR", P.mintInk, 124], [c("s22:business"), "THE PART THAT SELLS TO DATA CENTERS", P.ink, 98], [c("s22:ai"), "CHIPS & EQUIPMENT FOR AI", P.skyInk, 112], [c("s24:share"), "THAT SHARE…", P.ink, 124], [c("s24:see"), "NOWHERE NEAR 71%", P.ink, 124], [c("s26:single"), "IN A SINGLE YEAR", P.goldInk, 124], [designs, 'NVIDIA DESIGNS THE CHIPS', P.ink, 116], [gpus, 'CALLED GPUs', P.mintInk, 130], [video, 'FIRST BUILT FOR VIDEO GAMES', P.ink, 110], [thousands, 'THOUSANDS OF SMALL SUMS AT ONCE', P.ink, 100], [ai, '= WHAT AI NEEDS', P.mintInk, 124],
        [january, 'YEAR TO JANUARY 2026', P.ink, 120], [d216, 'REVENUE: $216 BILLION', P.goldInk, 120], [d65, 'UP 65% IN A YEAR', P.mintInk, 124], [d194, '≈ $194B FROM DATA CENTERS', P.skyInk, 112],
        [striking, 'THE STRIKING PART', P.ink, 124], [d71, '≈ $71 LEFT FROM EVERY $100', P.mintInk, 112], [gross, 'GROSS MARGIN ≈ 71%', P.goldInk, 124], [far, 'FAR ABOVE MOST PRODUCT MAKERS', P.ink, 104],
        [charge, 'HOW CAN IT CHARGE SO MUCH?', P.ink, 108], [two, 'TWO REASONS', P.ink, 130], [demand, '1. HUGE DEMAND', P.ink, 124], [software, '2. SOFTWARE LOCK-IN', P.ink, 120], [customers, 'BIG CUSTOMERS DESIGN THEIR OWN', P.ink, 104], [lines, 'MOST STILL LINE UP FOR NVIDIA', P.goldInk, 104],
        [d120, '≈ $120 BILLION PROFIT', P.goldInk, 124], [shovel, 'THE SHOVEL SELLER', P.ink, 124], [winning, '…IS WINNING', P.mintInk, 140]]} />
      <g transform={camera(f, [[gpus, 1240, 600, 1.08], [video, 960, 540, 1], [d65, 1200, 640, 1.05], [striking, 960, 540, 1], [two, 960, 540, 1], [d120, 1240, 640, 1.06], [shovel, 960, 540, 1]])}>
        {/* # A: the GPU, its gaming roots, and thousands of tiny sums lighting at once */}
        <g opacity={A}>
          <g opacity={on(f, designs, 6) * (1 - on(f, video, 8))}><Gpu x={1240} y={560} s={pop(f, designs) * 1.5} glow={on(f, gpus, 10)} label={f >= gpus ? 'GPU' : ''} />
            {[[built, 'BUILDS AI'], [run20, 'RUNS AI']].map(([at, t], k) => <g key={k} opacity={on(f, at as number, 6)} transform={`translate(1700 ${440 + k * 120}) scale(${pop(f, at as number)})`}><rect x={-130} y={-40} width={260} height={80} rx={18} fill={P.mint} /><Label x={0} y={18} text={t as string} size={52} font="Bebas Neue" color={P.navy0} /></g>)}</g>
          <g opacity={on(f, video, 6) * (1 - on(f, thousands, 8))}><Pad x={980} y={620} s={pop(f, video) * 1.1} />
            <g opacity={on(f, graphics, 6)} transform="translate(1480 600)"><rect x={-200} y={-140} width={400} height={280} rx={20} fill="#0E1B33" stroke="#3E5478" strokeWidth={8} />
              {Array.from({ length: 48 }, (_, k) => <rect key={k} x={-180 + (k % 8) * 45} y={-120 + Math.floor(k / 8) * 40} width={40} height={36} fill={['#5BCBFF', '#3DDC97', '#E9C25A', '#F06B5B'][(k + Math.floor(f / 4)) % 4]} opacity={0.85} />)}</g></g>
          <g opacity={on(f, thousands, 6)}>
            {Array.from({ length: 160 }, (_, k) => { const x = 760 + (k % 20) * 50, y = 380 + Math.floor(k / 20) * 64
              const lit = f >= once ? 1 : on(f, thousands + (k % 20) * 0.8, 4) * 0.35
              return <rect key={k} x={x} y={y} width={36} height={44} rx={6} fill={f >= once ? P.mint : '#7F97C2'} opacity={0.55 + 0.45 * lit} /> })}
            <g opacity={on(f, ai, 6)} transform={`translate(1240 920) scale(${pop(f, ai)})`}><rect x={-160} y={-60} width={320} height={120} rx={24} fill={P.mint} /><Label x={0} y={30} text="AI" size={90} font="Bebas Neue" color={P.navy0} /></g>
          </g>
        </g>
        {/* # B: revenue — one long bar; the data-center part lights up */}
        <g opacity={B}>
          <g opacity={on(f, january, 6) * (1 - on(f, d216, 8))} transform={`translate(1240 620) scale(${pop(f, january)})`}><Calendar x={0} y={0} text="2026" s={1.5} /><Label x={0} y={190} text="YEAR TO JANUARY" size={56} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, d216, 6)}>
            <Label x={760} y={480} text="NVIDIA REVENUE" size={52} font="Bebas Neue" color={P.ink} anchor="start" />
            <rect x={760} y={510} width={216 * W * on(f, d216, 24)} height={130} rx={18} fill={P.gold} />
            <rect x={760} y={510} width={194 * W * on(f, d194, 20)} height={130} rx={18} fill={P.sky} opacity={on(f, d194, 6)} />
            <Label x={760 + 216 * W + 24} y={598} text={f >= d216 ? '$216B' : ''} size={70} font="Bebas Neue" color={P.ink} anchor="start" />
            <Label x={760 + 194 * W / 2} y={598} text={f >= data ? 'DATA CENTERS ≈ $194B' : ''} size={58} font="Bebas Neue" color={P.navy0} />
          </g>
          <g opacity={on(f, d65, 6)} transform={`translate(1150 820) scale(${pop(f, d65)})`}><rect x={-170} y={-60} width={340} height={120} rx={20} fill={P.mint} /><Label x={-20} y={34} text="+65%" size={96} font="Bebas Neue" color={P.navy0} /><g transform="translate(120 0)"><Prop id="arrow-up" x={0} y={0} size={80} f={f} /></g></g>
          <g opacity={on(f, equipment, 6)} transform="translate(1600 830)">{[0, 1, 2].map((k) => <g key={k} transform={`translate(${k * 70 - 70} ${-k * 20})`}><Gpu x={0} y={0} s={0.3} glow={0.8} /></g>)}</g>
        </g>
        {/* # C: every $100 of sales — $71 left after making the products */}
        <g opacity={Cc}>
          <g opacity={on(f, d100, 6)} transform={`translate(1210 380) scale(${pop(f, d100)})`}><rect x={-150} y={-60} width={300} height={120} rx={18} fill={P.mint} stroke="#1E9A63" strokeWidth={6} /><Label x={0} y={30} text="$100" size={90} font="Bebas Neue" color={P.navy0} /><Label x={0} y={110} text="OF SALES" size={48} font="Bebas Neue" color={P.ink2} /></g>
          <Split x={760} y={600} kept={71} t={on(f, d71, 24)} keptText="≈ $71 LEFT" costText={f >= paying ? 'COST' : ''} o={on(f, d71, 6)} />
          <g opacity={on(f, gross, 6)} transform={`translate(1210 860) scale(${pop(f, gross)})`}><rect x={-300} y={-60} width={600} height={120} rx={20} fill={P.card} /><Label x={0} y={30} text="GROSS MARGIN 71%" size={78} font="Bebas Neue" color={P.goldInk} /></g>
          <g opacity={on(f, physical, 6)} transform={`translate(1660 860) scale(${pop(f, physical)})`}><Prop id="trophy" x={0} y={0} size={240} f={f} /></g>
        </g>
        {/* # D: two reasons — a queue of buyers; a padlock of software around the chip; then rivals' own chips, the queue stays */}
        <g opacity={D}>
          <Gpu x={1500} y={560} s={1} glow={0.7 + 0.3 * Math.sin(f / 8)} label="NVIDIA" />
          <g opacity={on(f, charge, 6) * (1 - on(f, demand, 8))} transform={`translate(1000 600) scale(${pop(f, charge) * 1.2})`}><Prop id="price-tag" x={0} y={0} size={180} f={f} /><Label x={0} y={140} text="$$$" size={60} font="Bebas Neue" color={P.goldInk} /></g>
          {Array.from({ length: 7 }, (_, k) => <g key={k} opacity={on(f, demand + k * 2, 6)}><Mini look={['investor', 'owner', 'worker', 'buyer', 'hero', 'owner', 'investor'][k]} x={lerp(700, 1300 - k * 100, easeOut(span(f, demand + k * 2, demand + k * 2 + 20)))} y={1000} scale={1.05} frame={f} seed={k + 120} /></g>)}
          <g opacity={on(f, software, 6)}><rect x={1330} y={440} width={340} height={240} rx={24} fill="none" stroke={P.goldInk} strokeWidth={12} strokeDasharray="22 14" /><g transform={`translate(1700 420) scale(${pop(f, software)})`}><Prop id="padlock" x={0} y={0} size={120} f={f} /></g></g>
          <g opacity={on(f, rival, 6) * (1 - on(f, customers, 8))} transform="translate(1000 520)"><Gpu x={0} y={0} s={0.55} glow={0.1} /><Label x={0} y={100} text="RIVAL CHIP" size={48} font="Bebas Neue" color={P.ink2} /><path d="M140 0 L260 0" stroke={P.coralInk} strokeWidth={10} strokeDasharray="14 10" /><circle cx={300} cy={0} r={36} fill={P.coral} /><path d="M282 -18 L318 18 M318 -18 L282 18" stroke="#FFF" strokeWidth={8} /></g>
          {[[google, 'GOOGLE'], [amazon, 'AMAZON']].map(([at, t], k) => <g key={k} opacity={on(f, at as number, 6) * (1 - on(f, lines, 10) * 0.5)} transform={`translate(${860 + k * 320} 470) scale(${pop(f, at as number)})`}>
            <rect x={-150} y={-100} width={300} height={200} rx={20} fill={P.card} /><Prop id="ai-chip" x={0} y={-20} size={100} f={f} /><Label x={0} y={70} text={f >= own ? `${t} CHIP` : (t as string)} size={52} font="Bebas Neue" color={P.ink} /></g>)}
          <g opacity={on(f, enormous, 6)}><Label x={1000} y={1060} text={f >= industry ? 'MOST OF THE INDUSTRY' : 'DEMAND'} size={48} font="Bebas Neue" color={P.ink2} /></g>
        </g>
        {/* # E: the profit pile, then the shovel seller crowned */}
        <g opacity={E}>
          <Gpu x={1240} y={460} s={1.1} glow={0.8} label="NVIDIA" />
          <Pile x={1240} y={980} n={on(f, d120, 30) * 27} s={1.3} />
          <g opacity={on(f, d120, 6)} transform={`translate(1650 860) scale(${pop(f, d120)})`}><rect x={-150} y={-60} width={300} height={120} rx={20} fill={P.gold} /><Label x={0} y={34} text="$120B" size={96} font="Bebas Neue" color={P.navy0} /></g>
          <g opacity={on(f, profit, 6)}><Label x={1650} y={970} text="PROFIT IN ONE YEAR" size={48} font="Bebas Neue" color={P.ink2} /></g>
          <g opacity={on(f, shovel, 6)} transform={`translate(860 640) rotate(-20) scale(${pop(f, shovel) * 1.1})`}><Shovel x={0} y={0} /></g>
          <g opacity={on(f, winning, 6)} transform={`translate(1240 260) scale(${pop(f, winning)})`}><Prop id="crown" x={0} y={0} size={150} f={f} /></g>
        </g>
        <Person f={f} who="hero" beats={hero} x={300} y={1190} s={1.4} life={2} />
      </g>
      <Vignette id="nv" />
    </g>
  )
}

export const AI_NVIDIA = makePiece('ai-nvidia', 'Long: Nvidia GPUs (gaming roots, parallel sums); FY2026 revenue $216B (+65%), data center $194B; $71 kept of every $100 (gross margin 71%); demand + software lock-in; rivals’ own chips; ≈ $120B profit', { mood: 'dark', Component: Nvidia,
  beats: ["s20:designs", "s20:gpus", "s20:built", "s20:run", "s25:charge", "s20a:video", "s20a:graphics", "s20a:trick", "s20a:thousands", "s20a:once", "s20a:ai", "s21:january", "s21:216", "s21:65", "s22:194", "s22:data", "s22:equipment", "s23:striking", "s23:100", "s23:71", "s23:paying", "s24:gross", "s24:far", "s24:physical", "s25:two", "s25:demand", "s25:enormous", "s25:software", "s25:switching", "s25:rival", "s25a:customers", "s25a:google", "s25a:amazon", "s25a:own", "s25a:industry", "s25a:lines", "s26:result", "s26:120", "s26:profit", "s27:shovel", "s27:winning", "s20a:gpus", "s21:financial", "s21:nvidia", "s21:revenue", "s21:single", "s22:business", "s22:ai", "s24:share", "s24:see", "s26:single"],
  sfx: [['s20:gpus', 'pop', 0.4], ['s20a:once', 'swish', 0.4], ['s21:216', 'impact', 0.5], ['s21:65', 'ding', 0.4], ['s23:71', 'chime', 0.5], ['s25:software', 'click', 0.4], ['s25a:google', 'pop', 0.4], ['s25a:amazon', 'pop', 0.4], ['s26:120', 'impact', 0.6], ['s27:winning', 'chime', 0.5]] })
