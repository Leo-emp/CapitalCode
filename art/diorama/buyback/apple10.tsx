// ---------------------------------------------------------------- s47–s55: ten years of Apple.
// A calendar flips 2014 → 2024. The pizza returns wearing an APPLE flag. One share card splits into four (the 2020
// split), then a tall 2014 stack of shares (23.5 billion) stands beside the ring; a second stack rises to 15 billion
// and a dashed ghost shows the third that disappeared. Then one slice from 2014 and one from 2024 side by side: the
// new one swells to one and a half times, the profit coin on it swells too, and the whole pizza grows big.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, Headline, win } from '../aimoney/common'
import { Calendar } from '../charts'
import { LoneSlice, Pizza, Share, ShareStack } from './kit'

const Apple10: React.FC<PieceProps> = ({ f, c }) => {
  const years = c('s47:years')
  const pizza48 = c('s48:pizza'), apple48 = c('s48:apple'), slices48 = c('s48:slices')
  const sept = c('s49:september'), n23 = c('s49:23'), split = c('s49:split'), four = c('s49:four')
  const ten = c('s50:ten'), n15 = c('s50:15')
  const calc51 = c('s51:calculation'), third = c('s51:third')
  const left52 = c('s52:left'), bigger52 = c('s52:bigger')
  const each53 = c('s53:each'), half53 = c('s53:half'), company53 = c('s53:company')
  const profit54 = c('s54:profit'), grown = c('s54:grown'), bigger54 = c('s54:bigger'), total54 = c('s54:total'), part54 = c('s54:part'), times54 = c('s54:times')
  const slice55 = c('s55:slice'), giant = c('s55:giant'), s54 = c('s54')
  const A = win(f, 0, n23), B = win(f, sept - 4, left52), C = on(f, left52 - 4, 8)
  const H14 = 600, h24 = H14 * 15116.8 / 23464.6
  const grow = easeInOut(span(f, half53, half53 + 18))
  // # gap fillers (plan gate round 4): one relevant movement in each remaining pause
  const g1 = c('s48:shares'), g2 = c('s49:had'), g3 = c('s49:adjust'), g4 = c('s52:every'), g5 = c('s53:calculation'), g6 = c('s54:one')
  return (
    <g>
      <Stage id="bb-apple10" frame={f} />
      <Headline f={f} lines={[[years, 'TEN YEARS OF BUYBACKS', P.ink, 104], [pizza48, 'THE PIZZA = APPLE · SLICES = SHARES', P.ink, 92], [n23, '2014: ABOUT 23.5 BILLION SHARES', P.ink, 96], [split, '(AFTER A LATER 4-FOR-1 SPLIT)', P.ink2, 80],
        [n15, '2024: ABOUT 15.1 BILLION', P.goldInk, 104], [third, 'ABOUT A THIRD FEWER · OUR CALCULATION', P.goldInk, 92], [left52, 'EACH SHARE OWNS MORE', P.ink, 104], [half53, '× 1.5 · OUR CALCULATION', P.goldInk, 110], [giant, 'BIGGER SLICES, GIANT SCALE', P.ink, 100]]} />
      {/* # A: the calendar flips; the pizza with an APPLE flag */}
      {A > 0 && <g opacity={A}>
        <g transform={`translate(${lerp(960, 420, on(f, pizza48, 12))} 600) scale(${pop(f, years)})`}><Calendar x={0} y={0} text={f < years + 24 ? '2014' : '2024'} s={1.4} flip={Math.sin(Math.PI * span(f, years + 12, years + 36))} /></g>
        <g opacity={on(f, pizza48, 6)} transform={`translate(1200 600) scale(${pop(f, pizza48)})`}>
          <Pizza x={0} y={0} r={250} n={12} fx={(k) => ({ pull: on(f, slices48 + k * 0.6, 6) * 0.2 })} />
          <g opacity={on(f, apple48, 6)} transform={`translate(0 ${lerp(-500, -300, on(f, apple48, 10))})`}><rect x={-4} y={0} width={8} height={120} fill={P.ink2} /><rect x={0} y={0} width={190} height={74} rx={10} fill={P.navy2} /><text x={95} y={54} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 54px "Bebas Neue"', letterSpacing: 4 }}>APPLE</text></g>
        </g>
      </g>}
      {/* # B: one share splits into four; the 2014 stack; the 2024 stack rises; a dashed third */}
      {B > 0 && <g opacity={B}>
        <g opacity={on(f, split, 6) * (1 - on(f, ten, 8))}>
          {[0, 1, 2, 3].map((k) => { const t = easeInOut(span(f, four, four + 14)); return <Share key={k} x={1400 + lerp(0, (k - 1.5) * 170, t)} y={lerp(560, 560 + (k % 2) * 60, t)} s={lerp(0.9, 0.5, t)} name="1 → 4" /> })}
        </g>
        <g opacity={on(f, n23, 6)}>
          <ShareStack x={560} y={960} h={H14 * easeInOut(span(f, n23, n23 + 20))} w={300} />
          <text x={560} y={1030} textAnchor="middle" fill={P.ink} style={{ font: '400 60px "Bebas Neue"' }}>2014 · 23.5B</text>
        </g>
        <g opacity={on(f, n15, 6)}>
          <ShareStack x={1300} y={960} h={lerp(H14, h24, easeInOut(span(f, n15, n15 + 20)))} w={300} color={P.gold} />
          <text x={1300} y={1030} textAnchor="middle" fill={P.ink} style={{ font: '400 60px "Bebas Neue"' }}>2024 · 15.1B</text>
          <rect x={1150} y={960 - H14} width={300} height={(H14 - h24) * on(f, calc51, 10)} rx={8} fill="none" stroke={P.coralInk} strokeWidth={6} strokeDasharray="22 14" />
          <g opacity={on(f, third, 6)} transform={`translate(1640 ${960 - H14 + 100}) scale(${pop(f, third)})`}><text x={0} y={0} fill={P.coralInk} style={{ font: '400 120px "Bebas Neue"' }}>−36%</text></g>
        </g>
      </g>}
      {/* # C: a 2014 slice beside a 2024 slice that swells to 1.5×; the profit coin swells; the pizza grows */}
      {C > 0 && <g opacity={C * (1 - on(f, slice55, 8))}>
        <g transform={`translate(560 760) scale(${pop(f, left52)})`}><LoneSlice x={0} y={-180} r={340} w={36} /><text x={0} y={140} textAnchor="middle" fill={P.ink} style={{ font: '400 60px "Bebas Neue"' }}>A 2014 SHARE</text></g>
        <g transform={`translate(1300 760) scale(${pop(f, bigger52)})`}>
          <LoneSlice x={0} y={-180} r={340} w={36 * lerp(1, 1.55, grow)} tint={grow > 0.5 ? '#E9C25A' : undefined} />
          <text x={0} y={140} textAnchor="middle" fill={P.ink} style={{ font: '400 60px "Bebas Neue"' }}>A 2024 SHARE</text>
        </g>
        <path d={`M680 640 L${lerp(680, 1180, on(f, s54, 12))} 640`} stroke={P.goldInk} strokeWidth={8} strokeDasharray="20 14" opacity={on(f, s54, 4) * (1 - on(f, slice55, 6))} />
        <g opacity={on(f, total54, 6) * (1 - on(f, part54, 8))} transform={`translate(930 320) scale(${pop(f, total54)})`}><Coin x={0} y={0} s={2} text="$" /></g>
        <g opacity={on(f, part54, 6)}><Coin x={560} y={560} s={1.1} /><Coin x={1300} y={560} s={1.1 * lerp(1, 1.5, easeInOut(span(f, times54, times54 + 14)))} /></g>
        <g opacity={on(f, grown, 6) * (1 - on(f, bigger54, 6))}><text x={930} y={480} textAnchor="middle" fill={P.ink2} style={{ font: '400 60px "Bebas Neue"' }}>SAME TOTAL PROFIT</text></g>
        <g opacity={on(f, each53, 6) * (1 - on(f, profit54, 6))}><text x={930} y={600} textAnchor="middle" fill={P.goldInk} opacity={on(f, company53, 6)} style={{ font: '400 120px "Bebas Neue"' }}>× 1.5</text></g>
      </g>}
      <g opacity={on(f, slice55, 8)} transform={`translate(960 600) scale(${lerp(0.5, 1.15, easeInOut(span(f, slice55, giant + 14)))}) rotate(${(f - slice55) * 0.3})`}><Pizza x={0} y={0} r={300} n={8} fx={(k) => ({ tint: k % 2 ? '#E9C25A' : undefined, pull: 0.1 })} /></g>
      {/* # gap fillers */}
      {A > 0 && <g opacity={A * on(f, g1, 6)}>{[0, 3, 6, 9].map((k) => { const a = (k * 30 + 15 - 90) * Math.PI / 180; return <g key={k} opacity={on(f, g1 + k, 5)}><Share x={1200 + Math.cos(a) * 170} y={600 + Math.sin(a) * 170} s={0.22} /></g> })}</g>}
      {B > 0 && <g opacity={B}>
        <rect x={400} y={960 - H14} width={320} height={H14} rx={8} fill="none" stroke={P.ink2} strokeWidth={5} strokeDasharray="20 14" opacity={on(f, g2, 6) * (1 - on(f, n23 + 10, 6))} />
        <g opacity={on(f, g3, 6) * (1 - on(f, four, 6))} transform={`translate(1400 ${lerp(380, 560, on(f, g3, 12))})`}><Share x={0} y={0} s={0.9} name="1 SHARE" /></g>
      </g>}
      {C > 0 && <g opacity={C * (1 - on(f, slice55, 8))}>
        <g opacity={on(f, g4, 6) * (1 - on(f, bigger52, 6))}><path d="M930 380 L930 900" stroke={P.ink2} strokeWidth={6} strokeDasharray="20 14" /></g>
        <g opacity={on(f, g5, 6) * (1 - on(f, half53, 6))} transform={`translate(930 340) scale(${pop(f, g5)})`}><rect x={-200} y={-60} width={400} height={120} rx={20} fill={P.card} /><text x={0} y={24} textAnchor="middle" fill={P.ink} style={{ font: '400 64px "Bebas Neue"' }}>23.5 ÷ 15.1</text></g>
        <circle cx={1300} cy={560} r={70 + 10 * on(f, g6, 10)} fill="none" stroke={P.goldInk} strokeWidth={6} opacity={on(f, g6, 6)} />
      </g>}
      <Vignette id="bb-apple10" />
    </g>
  )
}

const BEATS = ['s48:shares', 's49:had', 's49:adjust', 's52:every', 's53:calculation', 's54:one', 's47:years', 's48:pizza', 's48:apple', 's48:slices', 's49:september', 's49:23', 's49:split', 's49:four', 's50:ten', 's50:15', 's51:calculation', 's51:third', 's52:left', 's52:bigger', 's53:each', 's53:half', 's53:company',
  's54', 's54:total', 's54:profit', 's54:grown', 's54:part', 's54:times', 's54:bigger', 's55:slice', 's55:giant']
export const BB_APPLE10 = makePiece('bb-apple10', 'Buybacks long: a calendar flips 2014 to 2024; the pizza with an APPLE flag; one share splits into four; a 2014 stack of 23.5 billion shares and a 2024 stack shrinking to 15.1 billion with a dashed missing third and -36%; a 2014 slice beside a 2024 slice that swells 1.5x, its profit coin swelling too; the pizza grows big', {
  mood: 'dark', Component: Apple10, beats: BEATS,
  sfx: [['s47:years', 'swish', 0.3], ['s49:four', 'pop', 0.3], ['s50:15', 'swish', 0.3], ['s51:third', 'thud', 0.3], ['s53:half', 'chime', 0.3]] })
