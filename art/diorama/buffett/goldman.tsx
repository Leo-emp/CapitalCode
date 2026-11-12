// ---------------------------------------------------------------- s25–s43: the Goldman deal (casino-style rebuild).
// Three persistent scenes. 1) Goldman Sachs, huge, in the storm: its vault door swings open on nothing, a wall clock
// races, and Buffett walks up with a briefcase; an ORDINARY share paper is crossed out. 2) A PREFERRED certificate on
// an easel; each year a 10% coin drops from the bank into Buffett's tower ($500M a year, 2009, 2010); the bank pulls
// the paper back and a +10% bonus coin flies out. 3) A big coupon on a table beside a tall share-price gauge with a
// $115 line: the price climbs past it and the coupon glows; it falls and the coupon dims while 10% coins keep coming;
// the example: the gauge at $150, a gold $35 gap between 115 and 150; at $100 the coupon goes in a drawer; a big plus.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage as StageBg, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, Headline, fly, win } from '../aimoney/common'
import { Calendar } from '../charts'
import { Mini } from '../../rig/Mini'
import { Clock, Share } from '../buyback/kit'
import { Bank, Briefcase, Coupon, Storm } from './kit'
import { Buffett, CoinTower, Street, gestB } from './hook'

// # a tall share-price gauge: a glass tube from $50 to $200 with a $115 line; price p fills it
const Gauge: React.FC<{ x: number; y: number; p: number; f: number }> = ({ x, y, p, f }) => {
  const h = 640, yy = (v: number) => y - (v - 50) / 150 * h
  return (
    <g>
      <rect x={x - 70} y={y - h - 20} width={140} height={h + 40} rx={70} fill="#0D1424" />
      <rect x={x - 46} y={yy(p)} width={92} height={y - yy(p)} rx={40} fill={p >= 115 ? P.mint : P.coral} />
      <ellipse cx={x} cy={yy(p)} rx={46} ry={10} fill="#FFFFFF" opacity={0.35 + 0.1 * Math.sin(f / 5)} />
      <path d={`M${x - 120} ${yy(115)} L${x + 120} ${yy(115)}`} stroke={P.gold} strokeWidth={8} strokeDasharray="18 10" />
      <text x={x + 140} y={yy(115) + 16} fill={P.goldInk} style={{ font: '400 56px "Bebas Neue"' }}>$115</text>
      <text x={x - 140} y={yy(p) + 18} textAnchor="end" fill={P.ink} style={{ font: '400 64px "Bebas Neue"' }}>${Math.round(p)}</text>
    </g>
  )
}

const Goldman: React.FC<PieceProps> = ({ f, c }) => {
  const sept = c('s25:september'), goldman26 = c('s26:goldman'), biggest26 = c('s26:biggest')
  const panic27 = c('s27:panic'), money27 = c('s27:money'), fast = c('s27:fast')
  const offered = c('s28:offered'), ordinary = c('s28:ordinary')
  const preferred29 = c('s29:preferred'), loan = c('s30:loan'), year30 = c('s30:year')
  const n10 = c('s31:10'), n500 = c('s32:500'), single = c('s32:single')
  const back33 = c('s33:back'), bonus = c('s33:bonus')
  const warrants = c('s34:warrants'), coupon35 = c('s35:coupon'), later = c('s35:later'), today = c('s35:today')
  const n115 = c('s36:115'), five = c('s36:five'), recovered = c('s37:recovered'), above = c('s37:above'), lot = c('s37:lot')
  const badly = c('s38:badly'), n10b = c('s38:10'), numbers = c('s39:numbers'), n150 = c('s40:150')
  const n115b = c('s41:115'), n35 = c('s41:35'), below = c('s42:below'), never42 = c('s42:never')
  const add = c('s43:add'), away = c('s43:away')
  const A = win(f, 0, preferred29 - 4, 10), B = win(f, preferred29 - 4, warrants - 4, 10), Cw = on(f, warrants - 4, 10)
  // # the share price on the gauge, by beat
  const price = f < recovered ? 100 : f < badly ? lerp(100, 160, easeInOut(span(f, above - 6, above + 16)))
    : f < numbers ? lerp(160, 80, easeInOut(span(f, badly, badly + 18))) : f < below ? lerp(80, 150, easeInOut(span(f, n150 - 6, n150 + 12))) : lerp(150, 100, easeInOut(span(f, below, below + 14)))
  const yearsIn = Math.min(2, Math.floor((f - n500) / 24) + 1)
  // # extra gesture words (each pause gets Buffett acting on a word)
  const G = [c('s28:but'), c('s30:preferred'), c('s32:5'), c('s33:goldman'), c('s34:one'), c('s36:5'), c('s36:buy'), c('s36:time'), c('s37:those'), c('s39:a'), c('s40:shares'), c('s41:coupon'), c('s41:150'), c('s41:share#2'), c('s43:so'), c('s43:they')]
  return (
    <g>
      <StageBg id="wb-goldman" frame={f} />
      <Headline f={f} lines={[[sept, 'SEPTEMBER 2008', P.ink, 100], [panic27, 'BANKS NEEDED MONEY FAST', P.coralInk, 100], [preferred29, 'PREFERRED STOCK', P.goldInk, 110], [loan, 'A BIT LIKE A LOAN', P.ink, 104],
        [n10, '10% A YEAR', P.goldInk, 120], [n500, '$500 MILLION EVERY YEAR', P.goldInk, 104], [back33, 'BUY IT BACK? +10% BONUS', P.ink, 100], [warrants, 'PLUS: WARRANTS', P.goldInk, 110], [coupon35, 'A WARRANT = A COUPON', P.ink, 104],
        [n115, '$5B OF SHARES AT $115, FOR 5 YEARS', P.goldInk, 96], [numbers, 'EXAMPLE', P.ink, 110], [n35, '$35 OF VALUE PER SHARE', P.goldInk, 104], [below, 'BELOW $115? DON’T USE IT', P.ink, 100], [add, 'ONLY UPSIDE', P.mintInk, 110]]} />
      {/* # A: Goldman in the storm; an empty vault; a racing clock; Buffett arrives with cash */}
      {A > 0 && <g opacity={A}>
        <Street f={f} lamps={[120]} />
        <g transform={`translate(960 ${lerp(1200, 1000, on(f, goldman26, 16))})`}><Bank x={0} y={0} s={lerp(1.1, 1.45, on(f, biggest26, 16))} name="GOLDMAN SACHS" f={f} shake={on(f, panic27, 6) * 0.7} /></g>
        <g transform={`translate(${lerp(1500, 1450, on(f, sept, 24))} 400)`}><Storm x={0} y={0} s={1.1} f={f} bolt={on(f, panic27, 3) * (1 - on(f, panic27 + 8, 5))} /></g>
        <g opacity={on(f, sept, 8)} transform={`translate(300 ${lerp(200, 380, on(f, sept, 14))})`}><Calendar x={0} y={0} text="2008" s={1.2} /></g>
        <g opacity={on(f, money27, 6)} transform="translate(1600 760)"><rect x={-170} y={-190} width={340} height={380} rx={26} fill="#5A6680" /><g transform={`translate(-150 0) scale(${1 - 0.85 * on(f, money27 + 4, 12)} 1) translate(150 0)`}><circle r={130} fill="#3A4660" /><circle r={50} fill="#5A6680" /></g><text y={-220} textAnchor="middle" fill={P.coralInk} opacity={on(f, money27 + 10, 6)} style={{ font: '400 64px "Bebas Neue"' }}>EMPTY</text></g>
        <g opacity={on(f, fast, 6) * (1 - on(f, offered, 8))} transform="translate(330 640) scale(0.8)"><Clock x={0} y={0} t={((f - fast) / 18) % 1} warn={1} /></g>
        <g opacity={on(f, offered - 4, 8)}><Buffett f={f} beats={gestB([[0, 'walkA', 'neutral', 'walkB', 10], [offered + 10, 'offer', 'smiling']], G)} x={lerp(-200, 360, easeInOut(span(f, offered - 4, offered + 10)))} y={1060} s={1.15} plate={0} /></g>
        <g opacity={on(f, offered + 6, 6)} transform={`translate(${lerp(360, 620, on(f, offered + 6, 14))} 800)`}><Briefcase x={0} y={0} s={0.85} open={on(f, offered + 12, 10)} /></g>
        <g opacity={on(f, ordinary, 6) * (1 - on(f, preferred29 - 6, 6))} transform={`translate(620 430) scale(${pop(f, ordinary) * 0.9})`}><Share x={0} y={0} name="ORDINARY" /><path d="M-170 -120 L170 120 M170 -120 L-170 120" stroke={P.coral} strokeWidth={22} strokeLinecap="round" /></g>
      </g>}
      {/* # B: the PREFERRED certificate; a yearly 10% coin into Buffett's tower; bought back with a bonus */}
      {B > 0 && <g opacity={B}>
        <Street f={f} lamps={[]} />
        <Bank x={1500} y={1000} s={1.05} name="GOLDMAN SACHS" f={f} />
        <g transform={`translate(${lerp(560, 1500, easeInOut(span(f, back33 + 2, back33 + 20)))} ${lerp(560, 420, easeInOut(span(f, back33 + 2, back33 + 20)))})`}>
          <rect x={-8} y={60} width={16} height={330} fill="#8E5E36" opacity={1 - on(f, back33 + 2, 6)} />
          <g transform={`scale(${pop(f, preferred29) * lerp(1.5, 0.6, on(f, back33 + 2, 14))})`}><Share x={0} y={0} name="PREFERRED" color="#B4821C" /><circle cx={130} cy={90} r={46} fill={P.gold} /></g>
        </g>
        <Buffett f={f} beats={gestB([[0, 'idle', 'smiling'], [n500, 'receive', 'smiling'], [bonus, 'celebrate', 'smiling']], G)} x={260} y={1060} s={1.05} plate={0} />
        {/* # each year a coin drops from the bank into the tower beside Buffett */}
        {Array.from({ length: 6 }, (_, k) => { const p = fly(f, year30 + k * 12, [1500, 520], [560, 820], 18, 200); return <g key={k} opacity={p.o}><Coin x={p.x} y={p.y} s={1.3} text="10%" /></g> })}
        <CoinTower x={560} y={980} n={on(f, year30, 4) * Math.min(10, (f - year30) / 12 * 1.4)} s={0.9} label={f > n500 ? '$500M / YEAR' : undefined} />
        <g opacity={on(f, n10, 6) * (1 - on(f, n500, 8))} transform={`translate(1000 300) scale(${pop(f, n10) * 1.4})`}><Coin x={0} y={0} s={2} text="10%" /></g>
        <g opacity={on(f, n500, 6) * (1 - on(f, back33, 8))} transform="translate(980 330)"><Calendar x={0} y={0} text={yearsIn > 1 ? '2010' : '2009'} s={1.2} /></g>
        {(() => { const p = fly(f, bonus + 2, [1500, 520], [420, 600], 20, 260); return <g opacity={on(f, bonus, 4)}><Coin x={p.x} y={p.y} s={1.8} text="+10%" /></g> })()}
      </g>}
      {/* # C: the coupon and the share-price gauge */}
      {Cw > 0 && <g opacity={Cw}>
        <rect x={0} y={900} width={1920} height={180} fill="#3A2A20" /><rect x={0} y={900} width={1920} height={14} fill="#5A3A22" />
        <g transform={`translate(${f < never42 ? 640 : lerp(640, 520, on(f, never42, 12))} ${f < never42 ? lerp(1100, 560, on(f, warrants, 16)) : lerp(560, 860, on(f, never42, 12))}) rotate(${lerp(-18, -4, on(f, warrants, 16))}) scale(1.45)`}>
          <Coupon x={0} y={0} price={f < n115 ? (f > today ? '$X' : '$?') : '$115'} name={f < n115 ? 'COUPON' : 'GOLDMAN'} glow={price >= 115 && f > recovered ? 1 : 0} used={f > badly && f < numbers ? 0.5 : f > never42 ? 0.6 : 0} />
        </g>
        <g opacity={on(f, later, 6) * (1 - on(f, n115, 8))} transform="translate(1160 400)"><Calendar x={0} y={0} text="LATER" s={1.1} /></g>
        <g opacity={on(f, five, 6) * (1 - on(f, recovered, 8))}>{[0, 1, 2, 3, 4].map((k) => <g key={k} opacity={on(f, five + k * 3, 4)} transform={`translate(${380 + k * 170} 330) scale(0.65)`}><Calendar x={0} y={0} text={`${2009 + k}`} /></g>)}</g>
        <g opacity={on(f, n115, 8)}><Gauge x={1480} y={900} p={price} f={f} /></g>
        <g opacity={on(f, n35, 6) * (1 - on(f, below, 6))}><rect x={1434} y={900 - (150 - 50) / 150 * 640} width={92} height={(150 - 115) / 150 * 640} fill={P.gold} /><text x={1600} y={900 - (132 - 50) / 150 * 640} fill={P.goldInk} style={{ font: '400 90px "Bebas Neue"' }}>+$35</text></g>
        {Array.from({ length: 4 }, (_, k) => { const t = easeInOut(span(f, n10b + k * 6, n10b + k * 6 + 14)); return <g key={k} opacity={on(f, n10b + k * 6, 4) * (1 - on(f, numbers, 6))}><Coin x={1000 + k * 70} y={lerp(-60, 860, t)} s={1} text="10%" /></g> })}
        <g opacity={on(f, add, 6)} transform={`translate(1000 420) scale(${pop(f, add) * 1.2})`}><circle r={110} fill={P.mint} /><path d="M-56 0 L56 0 M0 -56 L0 56" stroke="#FFFFFF" strokeWidth={24} strokeLinecap="round" /></g>
        <g opacity={on(f, away, 6)} transform={`translate(1000 680) scale(${pop(f, away)})`}><circle r={80} fill={P.navy3} /><path d="M-40 0 L40 0" stroke="#FFFFFF" strokeWidth={20} strokeLinecap="round" /><path d="M-90 -90 L90 90" stroke={P.coral} strokeWidth={18} strokeLinecap="round" /></g>
        <g opacity={on(f, numbers, 6) * (1 - on(f, below, 6))}><Mini look="hero" x={1780} y={1060} scale={1} frame={f} seed={77} mood={price > 115 ? 'happy' : 'neutral'} /></g>
      </g>}
      <Vignette id="wb-goldman" />
    </g>
  )
}

const BEATS = ['s28:but', 's30:preferred', 's32:5', 's33:goldman', 's34:one', 's36:5', 's36:buy', 's36:time', 's37:those', 's39:a', 's40:shares', 's41:coupon', 's41:150', 's41:share#2', 's43:so', 's43:they', 's25:september', 's26:goldman', 's26:biggest', 's27:panic', 's27:money', 's27:fast', 's28:offered', 's28:ordinary', 's29:preferred', 's30:loan', 's30:year', 's31:10', 's32:500', 's32:single', 's33:back', 's33:bonus',
  's34:warrants', 's35:coupon', 's35:later', 's35:today', 's36:115', 's36:five', 's37:recovered', 's37:above', 's37:lot', 's38:badly', 's38:10', 's39:numbers', 's40:150', 's41:115', 's41:35', 's42:below', 's42:never', 's43:add', 's43:away']
export const WB_GOLDMAN = makePiece('wb-goldman', 'Buffett long (casino-style): Goldman Sachs grows huge in the storm while its vault door swings open on nothing and a clock races; Buffett walks up with a briefcase and an ORDINARY share is crossed out; a PREFERRED certificate on an easel while 10% coins drop every year from the bank into Buffett\'s growing tower ($500M a year, 2009, 2010); the bank pulls the certificate back and a +10% bonus coin flies to Buffett; a big coupon slides onto a table beside a tall share-price gauge with a $115 line: the price climbs past it and the coupon glows, falls and the coupon dims while 10% coins keep coming; at $150 a gold $35 band; at $100 the coupon goes in a drawer; a big plus and a crossed minus', {
  mood: 'dark', Component: Goldman, beats: BEATS,
  sfx: [['s27:panic', 'thud', 0.3], ['s29:preferred', 'pop', 0.3], ['s31:10', 'ding', 0.35], ['s33:bonus', 'coin', 0.3], ['s34:warrants', 'swish', 0.3], ['s37:lot', 'chime', 0.3], ['s41:35', 'ding', 0.3]] })
