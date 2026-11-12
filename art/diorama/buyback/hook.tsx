// ---------------------------------------------------------------- s1–s7: the hook.
// A SEP 2024 calendar; Apple's glass ring rises; a flood of money drops beside it. A factory, a phone and another
// company each pop up and get crossed out. Then the money flies into the ring while share papers fly back out of the
// market into it (it buys itself). Two bars: 95 spent on buybacks against 94 of profit. After the brand card: a city
// of 500 small towers lights up, a record counter, a question mark over the ring, and the video's three promises.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, Headline, Phone, Stamp, Tick, fly, win } from '../aimoney/common'
import { Building } from '../kit'
import { Calendar } from '../charts'
import { Note } from '../gift/kit'
import { Board, Pizza, Ring, Share } from './kit'
import { Figure } from '../gift/kit'

// # a small factory with a chimney
const Factory: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-170} y={-120} width={340} height={120} fill="#7A8AA6" /><path d="M-170 -120 L-110 -180 L-110 -120 L-50 -180 L-50 -120 L10 -180 L10 -120 Z" fill="#5C6F8E" />
    <rect x={90} y={-260} width={50} height={140} fill="#5C6F8E" />
    {[0, 1, 2, 3].map((k) => <rect key={k} x={-140 + k * 70} y={-80} width={44} height={44} rx={6} fill={P.gold} opacity={0.8} />)}
  </g>
)
const Cross: React.FC<{ x: number; y: number; t: number; s?: number }> = ({ x, y, t, s = 1 }) => t > 0 ? (
  <g transform={`translate(${x} ${y}) scale(${s * lerp(1.4, 1, t)})`} opacity={t}>
    <path d="M-120 -120 L120 120 M120 -120 L-120 120" stroke={P.coral} strokeWidth={34} strokeLinecap="round" />
  </g>
) : null

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const sept = c('s1:september'), apple1 = c('s1:apple'), m95 = c('s1:95')
  const factory = c('s2:factory'), phone = c('s2:phone'), company2 = c('s2:company')
  const apple3 = c('s3:apple'), buying = c('s3:buying'), own = c('s3:own'), shares3 = c('s3:shares')
  const more4 = c('s4:more'), profit4 = c('s4:profit'), n94 = c('s4:94')
  const alone = c('s5:alone'), n500 = c('s5:500'), america = c('s5:america'), record = c('s5:record'), n943 = c('s5:943'), back5 = c('s5:back')
  const why = c('s6:why'), itself = c('s6:itself')
  const buyback7 = c('s7:buyback'), money7 = c('s7:money'), catch7 = c('s7:catch')
  // # scene windows (each clears before the next arrives)
  const A = win(f, 0, factory), B = win(f, factory - 4, apple3), C = win(f, apple3 - 4, more4), D = win(f, more4 - 4, alone)
  const E = win(f, alone - 4, why), F = on(f, why - 4, 8)
  const rise = easeInOut(span(f, apple1, apple1 + 14))
  // # gap fillers (plan gate round 4): one relevant movement in each remaining pause
  const h1 = c('s5:943')
  const g1 = c('s1:thing'), g2 = c('s5:in'), g3 = c('s5:buying'), g4 = c('s7:video'), g5 = c('s7:people')
  return (
    <g>
      <Stage id="bb-hook" frame={f} />
      <Headline f={f} lines={[[sept, 'SEPTEMBER 2024', P.ink, 96], [m95, '$95 BILLION', P.goldInk, 120], [factory, 'NOT A FACTORY', P.ink, 100], [phone, 'NOT A NEW PHONE', P.ink, 100], [company2, 'NOT ANOTHER COMPANY', P.ink, 100],
        [own, 'ITS OWN SHARES', P.goldInk, 116], [more4, 'MORE THAN ITS PROFIT', P.ink, 104], [n500, '500 BIG US COMPANIES', P.ink, 100], [n943, '$943 BILLION · A RECORD', P.goldInk, 108], [why, 'WHY BUY ITSELF?', P.ink, 112]]} until={buyback7} />
      {/* # A: the calendar, the ring rising, a flood of money */}
      {A > 0 && <g opacity={A}>
        <g transform={`translate(380 560) scale(${pop(f, 0)})`}><Calendar x={0} y={0} text="SEP 24" s={1.3} /></g>
        <g transform={`translate(0 ${lerp(500, 0, rise)})`} opacity={on(f, apple1, 6)}><Ring x={1000} y={720} s={1.05} /></g>
        {Array.from({ length: 14 }, (_, k) => { const t0 = m95 + k * 1.5, p = easeInOut(span(f, t0, t0 + 12)); return <g key={k} opacity={on(f, t0, 3)}><Note x={1500 + (k % 4) * 70 - 100} y={lerp(-120, 900 - Math.floor(k / 4) * 46, p)} s={0.9} r={(k * 37) % 30 - 15} text="$" /></g> })}      </g>}
      {/* # B: three things it did NOT buy, each crossed out in the middle */}
      {B > 0 && <g opacity={B}>
        {[[factory, phone], [phone, company2], [company2, apple3]].map(([a, b], k) => {
          const o = on(f, a, 6) * (1 - on(f, b - 2, 6)), x = lerp(1500, 960, easeInOut(span(f, a, a + 10)))
          return o > 0 ? <g key={k} opacity={o}>
            <g transform={`translate(${x} 700) scale(${pop(f, a) * 1.4})`}>{k === 0 ? <Factory x={0} y={60} /> : k === 1 ? <Phone x={0} y={-60} s={1}><rect x={-60} y={-110} width={120} height={70} rx={10} fill={P.sky} /></Phone> : <Building x={0} y={80} s={1.6} seed={3} />}</g>
            <Cross x={960} y={620} t={on(f, a + 12, 6)} s={1.3} />
          </g> : null
        })}
      </g>}
      {/* # C: the ring buys its own shares: money flies out to the market, share papers fly back into the ring */}
      {C > 0 && <g opacity={C}>
        <Ring x={560} y={760} s={0.95} />
        <g transform={`translate(1450 600) scale(${pop(f, apple3 + 4)})`}><Board x={0} y={0} f={f} hi={on(f, own, 8)} /></g>
        {Array.from({ length: 5 }, (_, k) => { const p = fly(f, buying + k * 4, [600, 620], [1400, 560], 16, 160); return <g key={k} opacity={p.o}><Note x={p.x} y={p.y} s={0.8} text="$" /></g> })}
        {Array.from({ length: 5 }, (_, k) => { const p = fly(f, own + 4 + k * 4, [1450, 560], [560, 600], 18, 200); return <g key={k} opacity={p.o}><Share x={p.x} y={p.y} s={0.6} name="APPLE" r={-8 + k * 4} /></g> })}
        <g opacity={on(f, shares3, 8)}>{[0, 1, 2].map((k) => <Share key={k} x={560 - 60 + k * 60} y={420 - k * 24} s={0.7} name="APPLE" r={-6 + k * 6} />)}</g>
      </g>}
      {/* # D: two bars, 95 spent buying shares against 94 of profit */}
      {D > 0 && <g opacity={D}>
        {[[more4, 95, 'BUYBACKS', P.gold, 680], [profit4, 93.7, 'PROFIT', P.mint, 1240]].map(([at, v, lab, col, x], k) => {
          const h = 560 * (v as number) / 100 * easeInOut(span(f, at as number, (at as number) + 18))
          return <g key={k} opacity={on(f, at as number, 6)}>
            <rect x={(x as number) - 150} y={940 - h} width={300} height={h} rx={18} fill={col as string} />
            <text x={x as number} y={1010} textAnchor="middle" fill={P.ink} style={{ font: '400 64px "Bebas Neue"', letterSpacing: 3 }}>{lab as string}</text>
            <text x={x as number} y={910 - h} textAnchor="middle" fill={P.ink} opacity={k === 0 ? 1 : on(f, n94, 8)} style={{ font: '400 88px "Bebas Neue"' }}>{k === 0 ? '$95B' : '$94B'}</text>
          </g>
        })}
        <Tick x={680} y={300} o={on(f, n94 + 10, 8)} />
      </g>}
      {/* # E: a city of 500 small towers lights up; a record stamp; a coin counter */}
      {E > 0 && <g opacity={E}>
        <g opacity={1 - on(f, n500 - 4, 8)} transform={`translate(960 ${lerp(900, 720, on(f, alone, 12))}) scale(${lerp(0.6, 1, on(f, alone, 12))})`}><Ring x={0} y={0} /></g>
        {Array.from({ length: 16 }, (_, k) => { const col = k % 8, row = Math.floor(k / 8), t0 = n500 + k * 1.2; return <g key={k} opacity={on(f, t0, 5)}><Building x={260 + col * 200} y={640 + row * 300} s={1.5} seed={k} glow={on(f, america + k * 0.8, 6)} /></g> })}
        <Stamp x={1500} y={330} text="RECORD" f={f} at={record} />
        {Array.from({ length: 10 }, (_, k) => { const p = fly(f, back5 + k * 2, [260 + (k % 8) * 200, 640], [1700, 980], 16, 120); return <g key={k} opacity={p.o}><Coin x={p.x} y={p.y} s={1.1} /></g> })}
      </g>}
      {/* # F: the ring with a big question mark, then the three promises: a pizza, cash in hand, a warning */}
      {F > 0 && <g opacity={F}>
        <g opacity={1 - on(f, buyback7 - 4, 8)}>
          <Ring x={960} y={820} s={1.1} />
          <text x={960} y={470} textAnchor="middle" fill={P.goldInk} opacity={on(f, itself, 6)} transform={`translate(960 520) scale(${pop(f, itself)}) translate(-960 -520)`} style={{ font: '400 260px "Bebas Neue"' }}>?</text>
        </g>
        {[[buyback7, 'WHAT IT DOES'], [money7, 'WHO GETS THE CASH'], [catch7, 'THE CATCH']].map(([at, lab], k) => (
          <g key={k} opacity={on(f, at as number, 6)} transform={`translate(${420 + k * 540} 640) scale(${pop(f, at as number)})`}>
            <circle r={190} fill={P.card} />
            {k === 0 && <Pizza x={0} y={0} r={130} n={10} board={0} />}
            {k === 1 && <g><Note x={-30} y={10} s={1} r={-10} text="$" /><Note x={30} y={-20} s={1} r={8} text="$" /></g>}
            {k === 2 && <g><path d="M0 -120 L120 90 L-120 90 Z" fill={P.coral} /><rect x={-10} y={-50} width={20} height={80} rx={8} fill="#FFFFFF" /><circle cx={0} cy={60} r={12} fill="#FFFFFF" /></g>}
            <text x={0} y={270} textAnchor="middle" fill={P.ink} style={{ font: '400 56px "Bebas Neue"', letterSpacing: 2 }}>{lab as string}</text>
          </g>
        ))}
      </g>}
      {/* # gap fillers */}
      <g opacity={A * on(f, g1, 6)} transform={`translate(1560 ${lerp(560, 420, on(f, g1, 12))}) scale(${pop(f, g1)})`}><circle r={70} fill={P.card} /><text x={0} y={34} textAnchor="middle" fill={P.goldInk} style={{ font: '400 110px "Bebas Neue"' }}>?</text></g>
      <g opacity={E * on(f, g2, 6) * (1 - on(f, n500, 6))}><path d="M760 520 L1160 520" stroke={P.goldInk} strokeWidth={10} strokeDasharray="22 14" strokeDashoffset={-(f - g2) * 3} /></g>
      <g opacity={E * on(f, g3, 6)}>{Array.from({ length: 6 }, (_, k) => { const p = fly(f, g3 + k * 3, [960, 240], [700 + (k - 2.5) * 120, 990], 14, 60); return <g key={k} opacity={p.o}><Share x={p.x} y={p.y} s={0.35} /></g> })}</g>
      <g opacity={F * on(f, g4, 6) * (1 - on(f, buyback7, 4))}>{[0, 1, 2].map((k) => <circle key={k} cx={420 + k * 540} cy={640} r={190 * pop(f, g4 + k * 3)} fill="none" stroke={P.ink2} strokeWidth={6} strokeDasharray="18 12" />)}</g>
      <g opacity={F * on(f, g5, 6)}>{[0, 1, 2].map((k) => <g key={k} opacity={on(f, g5 + k * 2, 5)}><Figure x={1420 + k * 80} y={1040} s={0.42} color={P.navy4} /></g>)}</g>
      <g opacity={E * on(f, h1, 6)}><g transform={`translate(1700 ${lerp(1000, 860, on(f, h1, 12))})`}>{[0, 1, 2, 3].map((k) => <Coin key={k} x={0} y={-k * 26} s={1.3} />)}</g></g>
      <Vignette id="bb-hook" />
    </g>
  )
}

const BEATS = ['s5:943', 's1:thing', 's5:in', 's5:buying', 's7:video', 's7:people', 's1', 's1:september', 's1:apple', 's1:95', 's2:factory', 's2:phone', 's2:company', 's3:apple', 's3:buying', 's3:own', 's3:shares', 's4:more', 's4:profit', 's4:94',
  's5:alone', 's5:500', 's5:america', 's5:record', 's5:back', 's6:why', 's6:itself', 's7:buyback', 's7:money', 's7:catch']
export const BB_HOOK = makePiece('bb-hook', 'Buybacks long: SEP 2024 calendar, Apple ring rises, money floods in; a factory, a phone and a company each crossed out; money flies to the market and share papers fly back into the ring; bars 95 buybacks vs 94 profit; a city of 500 towers lights up with a RECORD stamp; a question mark over the ring; three promise medallions (pizza, cash, warning)', {
  mood: 'dark', Component: Hook, beats: BEATS,
  sfx: [['s1:95', 'coin', 0.35], ['s2:factory', 'swish', 0.3], ['s3:own', 'pop', 0.3], ['s4:profit', 'click', 0.3], ['s5:record', 'thud', 0.35], ['s6:itself', 'pop', 0.3]] })
