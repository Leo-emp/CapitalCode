// ---------------------------------------------------------------- s56–s67: the shares that come back.
// A count bar of Apple's shares with a question mark. Five bundles of 100 million shares fly into the shredder (500
// million bought); the bar drops by only 433 million and a gold gap of 66 million glows. A printer prints new share
// papers that fly to three workers (pay in shares); a $12B pay pile. The pizza is cut into one more slice again; a mop
// pushes the extra slices back. In the shop, two slices tear while a cook gets a new half slice. The S&P analyst points
// at a board of shares owed to staff; finally the pizza holds its size with arrows in and out.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, Headline, Person, fly, win, type Beat } from '../aimoney/common'
import { LoneSlice, Pizza, Share, Shredder } from './kit'
import { Figure } from '../gift/kit'
import { OWNER_COLORS } from './share'

// # a desk printer that pushes out a paper (t 0–1)
const Printer: React.FC<{ x: number; y: number; s?: number; t?: number }> = ({ x, y, s = 1, t = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-120} y={-150} width={240} height={50} rx={8} fill="#FFF8E6" stroke="#D6C08E" strokeWidth={3} transform={`translate(0 ${-t * 60})`} />
    <rect x={-160} y={-110} width={320} height={130} rx={20} fill="#5A6680" /><rect x={-130} y={-20} width={260} height={16} rx={6} fill="#1B2233" />
    <circle cx={120} cy={-60} r={12} fill={P.mint} />
  </g>
)

const Staff: React.FC<PieceProps> = ({ f, c }) => {
  const twist = c('s56:twist'), numbers56 = c('s56:numbers')
  const year57 = c('s57:year'), n500 = c('s57:500'), own57 = c('s57:own')
  const fell = c('s58:fell'), n433 = c('s58:433')
  const where = c('s59:where'), n66 = c('s59:66')
  const created = c('s60:created'), handed = c('s60:handed'), staff60 = c('s60:staff'), pay60 = c('s60:pay')
  const workers61 = c('s61:workers')
  const n12 = c('s62:12'), kind62 = c('s62:kind'), s63 = c('s63')
  const worker63 = c('s63:worker'), cuts = c('s63:cuts'), more63 = c('s63:more')
  const mopping = c('s64:mopping'), handed64 = c('s64:handed')
  const shop65 = c('s65:shop'), tearing = c('s65:tearing'), half65 = c('s65:half'), cook = c('s65:cook')
  const analyst = c('s66:analyst'), firm = c('s66:firm'), tied = c('s66:tied'), employees = c('s66:employees'), companies66 = c('s66:companies'), buying66 = c('s66:buying')
  const giant67 = c('s67:giant'), shrinking = c('s67:shrinking')
  const A = win(f, 0, created - 2), B = win(f, created - 4, s63), C = win(f, s63 - 4, shop65), D = win(f, shop65 - 4, analyst), E = on(f, analyst - 4, 8)
  // # the share-count bar: 15,550 → 15,117 (million); drawn as a height out of 16,000
  const H = 640, base = 960, scale = H / 16000
  const drop = easeInOut(span(f, n433, n433 + 20))
  const bought = easeInOut(span(f, fell - 10, fell + 10))
  const workerBeats: Beat[] = [[0, 'idle', 'neutral'], [handed, 'receive', 'smiling'], [workers61, 'holdUp', 'smiling']]
  // # gap fillers (plan gate round 4): one relevant movement in each remaining pause
  const h1 = c('s62:counted')
  const g1 = c('s58:number'), g2 = c('s60:new'), g3 = c('s61:partly'), g4 = c('s64:part'), g5 = c('s65:while'), g6 = c('s67:keeping')
  return (
    <g>
      <Stage id="bb-staff" frame={f} />
      <Headline f={f} lines={[[twist, 'A TWIST IN THE NUMBERS', P.ink, 104], [n500, 'BOUGHT: ABOUT 500 MILLION', P.goldInk, 104], [n433, 'SHARES FELL BY ONLY 433 MILLION', P.ink, 96], [n66, 'WHERE DID 66 MILLION GO?', P.coralInk, 104],
        [created, 'NEW SHARES · MOSTLY STAFF PAY', P.ink, 100], [n12, 'ABOUT $12 BILLION OF STOCK PAY', P.goldInk, 100], [worker63, 'MORE SLICES AGAIN', P.ink, 104], [mopping, 'MOPPING UP STAFF SHARES', P.goldInk, 104],
        [shop65, 'IN OUR SHOP', P.ink, 100], [analyst, 'S&P: MUCH OF IT TIED TO STAFF SHARES', P.ink, 92], [giant67, 'KEEPING THE SLICES FROM SHRINKING', P.goldInk, 96]]} />
      {/* # A: the count bar, the shredder taking 500 million, the bar dropping 433, the 66 gap */}
      {A > 0 && <g opacity={A}>
        <g opacity={on(f, twist, 6)}>
          <rect x={360} y={base - 15550 * scale} width={260} height={15550 * scale} rx={14} fill={P.card} stroke={P.ink2} strokeWidth={3} />
          <rect x={360} y={base - lerp(15550, 15117, drop) * scale} width={260} height={lerp(15550, 15117, drop) * scale} rx={14} fill="#3A6EA8" />
          <text x={490} y={1030} textAnchor="middle" fill={P.ink} style={{ font: '400 54px "Bebas Neue"' }}>APPLE SHARES</text>
          <text x={490} y={base - 15550 * scale - 30} textAnchor="middle" fill={P.goldInk} opacity={on(f, numbers56, 6) * (1 - on(f, year57, 6))} style={{ font: '400 120px "Bebas Neue"' }}>?</text>
        </g>
        <Shredder x={1250} y={760} s={1.2} strips={on(f, own57, 14)} />
        {Array.from({ length: 5 }, (_, k) => { const t = easeInOut(span(f, n500 + k * 4, n500 + k * 4 + 14)); return <g key={k} opacity={on(f, n500 + k * 4, 4) * (1 - span(f, n500 + k * 4 + 12, n500 + k * 4 + 16))}><Share x={lerp(1700, 1250, t)} y={lerp(300 + k * 30, 640, t) - Math.sin(t * Math.PI) * 100} s={0.7} name="100M" /></g> })}
        <g opacity={bought * on(f, fell, 6)}><text x={1250} y={610} textAnchor="middle" fill={P.ink} style={{ font: '400 70px "Bebas Neue"' }}>−500M BOUGHT</text></g>
        {/* # brace: −433 on the bar, +66 glowing gap */}
        <g opacity={on(f, n433, 6)}><path d={`M640 ${base - 15550 * scale} l30 0 l0 ${433 * scale * drop} l-30 0`} stroke={P.ink} strokeWidth={6} fill="none" /><text x={690} y={base - 15550 * scale + 30} fill={P.ink} style={{ font: '400 70px "Bebas Neue"' }}>−433M</text></g>
        <g opacity={on(f, n66, 6)} transform={`translate(1250 380) scale(${pop(f, n66)})`}><rect x={-160} y={-60} width={320} height={120} rx={20} fill={P.gold} /><text x={0} y={30} textAnchor="middle" fill="#0E1B33" style={{ font: '400 90px "Bebas Neue"' }}>+66M NEW</text></g>
        <g opacity={on(f, where, 6) * (1 - on(f, n66, 6))}><text x={1250} y={420} textAnchor="middle" fill={P.coralInk} style={{ font: '400 160px "Bebas Neue"' }}>?</text></g>
      </g>}
      {/* # B: a printer makes new shares for three workers; a $12B pay pile */}
      {B > 0 && <g opacity={B}>
        <Printer x={480} y={760} s={1.3} t={(f % 24) / 24 * on(f, created, 6)} />
        {[0, 1, 2].map((k) => (
          <g key={k}>
            <Person f={f} who={k === 1 ? 'buyer' : 'worker'} beats={workerBeats} x={880 + k * 260} y={1000} s={0.8} o={on(f, staff60 + k * 3, 6)} />
            {[0, 1].map((j) => { const fl = fly(f, handed + k * 6 + j * 14, [480, 600], [910 + k * 260, 740], 18, 200); return <g key={j} opacity={fl.t > 0 ? 1 : 0}><Share x={fl.x} y={fl.y - j * 20} s={0.38} /></g> })}
          </g>
        ))}
        <g opacity={on(f, pay60, 6)} transform={`translate(1150 360) scale(${pop(f, pay60)})`}><rect x={-160} y={-50} width={320} height={100} rx={18} fill={P.card} /><text x={0} y={22} textAnchor="middle" fill={P.ink} style={{ font: '400 64px "Bebas Neue"' }}>PAY = CASH + SHARES</text></g>
        <g opacity={on(f, kind62, 6)} transform={`translate(1700 860) scale(${pop(f, kind62)})`}><rect x={-150} y={-40} width={300} height={80} rx={16} fill={P.gold} /><text x={0} y={20} textAnchor="middle" fill="#0E1B33" style={{ font: '400 56px "Bebas Neue"' }}>STOCK PAY</text></g>
        <g opacity={on(f, n12, 6)}>{Array.from({ length: 12 }, (_, k) => <g key={k} opacity={on(f, n12 + k, 4)}><Coin x={1700 + (k % 3) * 60 - 60} y={760 - Math.floor(k / 3) * 46} s={0.9} /></g>)}<text x={1700} y={540} textAnchor="middle" fill={P.goldInk} style={{ font: '400 90px "Bebas Neue"' }}>$12B</text></g>      </g>}
      {/* # C: the pizza is cut into more slices again; a mop sweeps them back */}
      {C > 0 && <g opacity={C}>
        <g opacity={on(f, s63 + 4, 6) * (1 - on(f, cuts, 6))} transform={`translate(1500 ${lerp(200, 380, on(f, s63 + 4, 12))})`}><Share x={0} y={0} s={0.6} name="NEW" /></g>
        <Pizza x={960} y={600} r={260} n={lerp(8, 9, on(f, cuts, 10)) > 8.5 ? 9 : 8} fx={(k) => ({ tint: k === 8 ? '#2FA36B' : OWNER_COLORS[k], hi: k === 8 ? on(f, more63, 6) : 0, pull: k === 8 ? 0.25 * on(f, more63, 8) * (1 - on(f, mopping, 10)) : 0 })} />
        <g opacity={on(f, mopping, 6)} transform={`translate(${lerp(1700, 1340, easeInOut(span(f, mopping, mopping + 16)))} 700) rotate(-20)`}>
          <rect x={-10} y={-360} width={20} height={360} rx={8} fill="#8E5E36" /><path d="M-90 0 L90 0 L70 80 L-70 80 Z" fill="#9FDCFF" />
          {Array.from({ length: 7 }, (_, k) => <rect key={k} x={-80 + k * 24} y={70} width={14} height={60} rx={6} fill="#9FDCFF" />)}
        </g>
        <g opacity={on(f, handed64, 6)}><Share x={1500} y={360} s={0.6} r={-10} /><Share x={1600} y={420} s={0.6} r={8} /></g>
      </g>}
      {/* # D: in the shop: two slices tear while the cook gets a new half slice */}
      {D > 0 && <g opacity={D}>
        <LoneSlice x={520} y={560} r={260} tear={easeInOut(span(f, tearing, tearing + 18))} tint={OWNER_COLORS[3]} />
        <LoneSlice x={820} y={560} r={260} tear={easeInOut(span(f, tearing + 6, tearing + 24))} tint={OWNER_COLORS[7]} />
        <Person f={f} who="worker" beats={[[0, 'idle', 'neutral'], [cook, 'receive', 'smiling']]} x={1500} y={1000} s={0.95} o={on(f, half65 - 6, 6)} />
        <g opacity={on(f, half65, 6)} transform={`translate(${lerp(1100, 1430, easeInOut(span(f, cook, cook + 16)))} ${lerp(500, 640, easeInOut(span(f, cook, cook + 16)))})`}><LoneSlice x={0} y={0} r={220} w={18} tint="#2FA36B" /></g>
      </g>}
      {/* # E: the analyst at a board; then the pizza holding its size with arrows in and out */}
      {E > 0 && <g opacity={E}>
        <g opacity={1 - on(f, giant67, 8)}>
          <Person f={f} who="investor" beats={[[0, 'idle', 'neutral'], [firm, 'point', 'thinking'], [tied, 'explain', 'neutral']]} x={460} y={1000} s={0.95} />
          <g opacity={on(f, companies66, 6)} transform={`translate(1180 560) scale(${pop(f, companies66)})`}><rect x={-380} y={-260} width={760} height={520} rx={26} fill={P.card} stroke={P.ink2} strokeWidth={3} />
            <text x={0} y={-180} textAnchor="middle" fill={P.ink} style={{ font: '400 60px "Bebas Neue"', letterSpacing: 3 }}>2024 BUYBACKS</text>
            <rect x={-300} y={-120} width={600} height={110} rx={14} fill={P.ink2} opacity={0.25 * on(f, buying66, 6)} />
            <rect x={-300} y={-120} width={600 * on(f, tied, 14)} height={110} rx={14} fill={P.gold} /><text x={0} y={-48} textAnchor="middle" fill="#0E1B33" opacity={on(f, tied, 6)} style={{ font: '400 56px "Bebas Neue"' }}>MUCH TIED TO STAFF SHARES</text>
            {Array.from({ length: 5 }, (_, k) => <g key={k} opacity={on(f, employees + k * 2, 5)}><Share x={-240 + k * 120} y={120} s={0.36} /></g>)}
          </g>
        </g>
        <g opacity={on(f, giant67, 6)}>
          <Pizza x={960} y={620} r={270} n={10} fx={(k) => ({ tint: OWNER_COLORS[k] })} />
          <path d="M520 400 Q620 300 700 400" stroke={P.mintInk} strokeWidth={14} fill="none" strokeLinecap="round" /><path d="M1400 400 Q1300 300 1220 400" stroke={P.coralInk} strokeWidth={14} fill="none" strokeLinecap="round" />
          <g opacity={on(f, shrinking, 6)}><text x={960} y={1030} textAnchor="middle" fill={P.ink} style={{ font: '400 64px "Bebas Neue"' }}>SAME SLICE SIZE</text></g>
          {[0, 1].map((k) => <Share key={k} x={k ? 1500 : 420} y={lerp(300, 380, (Math.sin(f / 10 + k) + 1) / 2)} s={0.5} />)}
        </g>
      </g>}
      {/* # gap fillers */}
      {A > 0 && <g opacity={A}><rect x={350} y={base - 15550 * scale - 10} width={280} height={15550 * scale + 20} rx={18} fill="none" stroke={P.goldInk} strokeWidth={8} opacity={on(f, g1, 6) * (1 - on(f, n433, 6))} /></g>}
      {B > 0 && <g opacity={B}>
        <g opacity={on(f, g2, 6) * (1 - on(f, created, 6))} transform={`translate(480 ${lerp(500, 420, on(f, g2, 10))}) scale(${pop(f, g2)})`}><Share x={0} y={0} s={0.7} name="NEW" /></g>
        {[0, 1, 2].map((k) => <g key={k} opacity={on(f, g3 + k * 2, 6)}><rect x={930 + k * 260} y={760} width={60} height={40} rx={6} fill="#5FBF7F" stroke="#2E8B57" strokeWidth={3} /></g>)}
      </g>}
      {C > 0 && <g opacity={C * on(f, g4, 6) * (1 - on(f, mopping, 6))}><path d="M1700 900 L1700 560" stroke="#8E5E36" strokeWidth={20} strokeLinecap="round" /><path d="M1620 900 L1780 900 L1760 960 L1640 960 Z" fill="#9FDCFF" /></g>}
      {D > 0 && <g opacity={D * on(f, g5, 6) * (1 - on(f, half65 - 6, 6))}><Figure x={1500} y={1000} s={0.9} color="#2FA36B" /></g>}
      {E > 0 && <g opacity={E * on(f, g6, 6)}><circle cx={960} cy={620} r={300 + 10 * Math.sin((f - g6) / 4)} fill="none" stroke={P.goldInk} strokeWidth={10} /></g>}
      {B > 0 && <g opacity={B * on(f, h1, 6) * (1 - on(f, n12, 6))}><ellipse cx={1700} cy={780} rx={150} ry={40} fill="none" stroke={P.goldInk} strokeWidth={6} strokeDasharray="16 10" /></g>}
      <Vignette id="bb-staff" />
    </g>
  )
}

const BEATS = ['s62:counted', 's58:number', 's60:new', 's61:partly', 's64:part', 's65:while', 's67:keeping', 's56:twist', 's56:numbers', 's57:year', 's57:500', 's57:own', 's58:fell', 's58:433', 's59:where', 's59:66', 's60:created', 's60:handed', 's60:staff', 's60:pay', 's61:workers', 's62:kind', 's62:12', 's63',
  's63:worker', 's63:cuts', 's63:more', 's64:mopping', 's64:handed', 's65:shop', 's65:tearing', 's65:half', 's65:cook', 's66:analyst', 's66:firm', 's66:companies', 's66:buying', 's66:tied', 's66:employees', 's67:giant', 's67:shrinking']
export const BB_STAFF = makePiece('bb-staff', 'Buybacks long: a bar of Apple shares with a question mark; five 100M share bundles fly into a shredder; the bar drops only 433M and a gold +66M NEW tag glows; a printer prints shares that fly to three workers; a $12B pay pile; the pizza is cut into one more slice; a mop sweeps the extra back; two slices tear while a cook gets a new half slice; the S&P analyst points at a board of shares owed to staff; the pizza keeps its slice size', {
  mood: 'light', Component: Staff, beats: BEATS,
  sfx: [['s57:500', 'swish', 0.3], ['s58:433', 'click', 0.3], ['s59:66', 'pop', 0.35], ['s60:handed', 'swish', 0.3], ['s62:12', 'coin', 0.3], ['s65:tearing', 'crack', 0.3], ['s66:tied', 'ding', 0.3]] })
