// ---------------------------------------------------------------- s34–s46: who gets the money.
// A note with a question mark. The two sellers walk off the edge holding cash; the eight who stayed close in round the
// eight wider slices. Then a split screen: BUYBACK on the left (cash to two, slices bigger), DIVIDEND on the right (a
// coin flies to each of ten owners, every slice stays). Two arrows from one till to both. A see-saw tips toward
// buybacks; two bars rise (630 dividends, 943 buybacks); Apple's two coin towers (15 against 95); a crown lands on the
// ring and 18 of 20 squares turn gold.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, Headline, Person, fly, win, type Beat } from '../aimoney/common'
import { Figure, Note, Till } from '../gift/kit'
import { Pizza, Ring } from './kit'
import { Building } from '../kit'
import { Calendar } from '../charts'
import { OWNER_COLORS } from './share'

const Who: React.FC<PieceProps> = ({ f, c }) => {
  const cash34 = c('s34:cash')
  const two35 = c('s35:two'), walk = c('s35:walk'), money35 = c('s35:money')
  const eight = c('s36:eight'), no36 = c('s36:no'), bigger36 = c('s36:bigger')
  const compare = c('s37:compare'), dividend37 = c('s37:dividend')
  const every38 = c('s38:every'), nobody38 = c('s38:nobody')
  const both = c('s39:both'), back39 = c('s39:back'), owners39 = c('s39:owners')
  const difference = c('s40:difference'), only40 = c('s40:only'), stays40 = c('s40:stays'), more40 = c('s40:more')
  const bigger41 = c('s41:bigger'), two41 = c('s41:two')
  const n630 = c('s42:630'), dividends42 = c('s42:dividends'), companies42 = c('s42:companies'), s42 = c('s42')
  const n943 = c('s43:943'), buybacks43 = c('s43:buybacks')
  const apple44 = c('s44:apple'), gap = c('s44:gap')
  const n15 = c('s45:15'), n95 = c('s45:95'), fin45 = c('s45:financial'), paid45 = c('s45:paid')
  const biggest = c('s46:biggest'), n20 = c('s46:20'), n18 = c('s46:18'), quarter46 = c('s46:quarter'), companies46 = c('s46:companies')
  const A = win(f, 0, compare), B = win(f, compare - 4, bigger41), C = win(f, bigger41 - 4, apple44), D = on(f, apple44 - 4, 8)
  const sellers: Beat[] = [[0, 'idle', 'smiling'], [walk, 'walkA', 'smiling', 'walkB', 10], [money35 + 30, 'holdUp', 'smiling']]
  const out = easeInOut(span(f, walk, walk + 40))
  // # gap fillers (plan gate round 4): one relevant movement in each remaining pause
  const h1 = c('s42:dividends'), h2 = c('s45:buybacks')
  const g1 = c('s36:instead'), g2 = c('s37:companies'), g3 = c('s38:shop'), g4 = c('s40:paid'), g5 = c('s41:buybacks'), g6 = c('s42:big'), g7 = c('s43:spent'), g8 = c('s44:clearly'), g9 = c('s46:apple'), g10 = c('s46:largest')
  return (
    <g>
      <Stage id="bb-who" frame={f} />
      <Headline f={f} lines={[[cash34, 'WHO GETS THE CASH?', P.ink, 110], [two35, 'THE TWO WHO SOLD', P.goldInk, 104], [eight, 'THE 8 WHO STAYED: A BIGGER SLICE', P.ink, 96], [compare, 'BUYBACK VS DIVIDEND', P.ink, 108],
        [both, 'BOTH GIVE CASH BACK', P.ink, 104], [bigger41, 'BUYBACKS ARE BIGGER', P.goldInk, 108], [n630, '2024 · 500 BIG US COMPANIES', P.ink, 96], [apple44, 'APPLE · 2024 FINANCIAL YEAR', P.ink, 96], [biggest, 'THE BIGGEST BUYER', P.goldInk, 110]]} />
      {/* # A: the two sellers walk off with cash; the eight stay round wider slices */}
      {A > 0 && <g opacity={A}>
        <g opacity={on(f, cash34, 6) * (1 - on(f, two35, 6))} transform={`translate(960 560) scale(${pop(f, cash34) * 1.8})`}><Note x={0} y={0} text="$" /><text x={0} y={-90} textAnchor="middle" fill={P.goldInk} style={{ font: '400 140px "Bebas Neue"' }}>?</text></g>
        <g opacity={on(f, two35, 6)}>
          <Person f={f} who="buyer" beats={sellers} x={lerp(700, -200, out)} y={1000} s={0.9} flip />
          <Person f={f} who="worker" beats={sellers} x={lerp(1220, 2100, out)} y={1000} s={0.9} />
          <Note x={lerp(700, -200, out) + 60} y={760} s={0.5} o={on(f, money35, 6)} text="$" />
          <Note x={lerp(1220, 2100, out) + 60} y={760} s={0.5} o={on(f, money35, 6)} text="$" />
        </g>
        <g opacity={on(f, eight, 6)}>
          <g transform={`translate(960 560) scale(${0.6 + 0.4 * on(f, bigger36, 12)}) translate(-960 -560)`}><Pizza x={960} y={560} r={230} n={8} fx={(k) => ({ tint: OWNER_COLORS[[0, 1, 2, 4, 5, 6, 8, 9][k]], pull: 0.15 * on(f, bigger36, 10) })} /></g>
          {Array.from({ length: 8 }, (_, k) => { const a = (k * 45 + 22.5 - 90) * Math.PI / 180; return <g key={k} opacity={on(f, eight + k, 5)}><Figure x={960 + Math.cos(a) * 430} y={620 + Math.sin(a) * 300 + 80} s={0.7} color={OWNER_COLORS[[0, 1, 2, 4, 5, 6, 8, 9][k]]} /></g> })}
          <g opacity={on(f, no36, 6) * (1 - on(f, bigger36, 6))}><text x={1560} y={360} fill={P.coralInk} style={{ font: '400 90px "Bebas Neue"' }}>NO CASH</text></g>
        </g>
      </g>}
      {/* # B: split screen, buyback (left) and dividend (right) */}
      {B > 0 && <g opacity={B}>
        <rect x={958} y={240} width={4} height={780} fill={P.ink2} opacity={0.4} />
        <text x={480} y={300} textAnchor="middle" fill={P.goldInk} style={{ font: '400 72px "Bebas Neue"', letterSpacing: 3 }}>BUYBACK</text>
        <text x={1440} y={300} textAnchor="middle" fill={P.skyInk} opacity={on(f, dividend37, 6)} style={{ font: '400 72px "Bebas Neue"', letterSpacing: 3 }}>DIVIDEND</text>
        {/* # left: 8 wider slices; two notes fly out to the edge (only sellers paid) */}
        <g transform={`translate(480 620) scale(${0.9 + 0.12 * on(f, more40, 10)})`}><Pizza x={0} y={0} r={190} n={8} fx={(k) => ({ tint: OWNER_COLORS[k] })} /></g>
        {[0, 1].map((i) => { const fl = fly(f, only40 + i * 5, [480, 620], [i ? 860 : 100, 900], 18, 150); return <g key={i} opacity={on(f, only40, 4)}><Note x={fl.x} y={fl.y} s={0.5} text="$" /></g> })}
        <g opacity={on(f, stays40, 6)}><text x={480} y={1000} textAnchor="middle" fill={P.ink} style={{ font: '400 56px "Bebas Neue"' }}>SELLERS PAID · SLICES BIGGER</text></g>
        {/* # right: 10 slices; one coin flies to each of ten owners round it */}
        <g opacity={on(f, dividend37, 8)}>
          <Pizza x={1440} y={620} r={190} n={10} fx={(k) => ({ tint: OWNER_COLORS[k] })} />
          {Array.from({ length: 10 }, (_, k) => { const a = (k * 36 + 18 - 90) * Math.PI / 180, to: [number, number] = [1440 + Math.cos(a) * 320, 620 + Math.sin(a) * 280]; const fl = fly(f, every38 + k * 1.5, [1440, 620], to, 14, 80); return <g key={k} opacity={on(f, every38 + k * 1.5, 3)}><Figure x={to[0]} y={to[1] + 60} s={0.42} color={OWNER_COLORS[k]} /><Coin x={fl.x} y={fl.y - 40} s={0.6} /></g> })}
          <g opacity={on(f, nobody38, 6)}><text x={1440} y={1000} textAnchor="middle" fill={P.ink} style={{ font: '400 56px "Bebas Neue"' }}>EVERYONE PAID · NO SLICE GIVEN UP</text></g>
        </g>
        {/* # both: arrows from one till above to each side */}
        <g opacity={on(f, both, 6) * (1 - on(f, difference, 6))}>
          <path d={`M960 300 Q700 ${lerp(300, 380, on(f, back39, 10))} 520 430`} stroke={P.goldInk} strokeWidth={14} fill="none" strokeLinecap="round" />
          <path d={`M960 300 Q1220 ${lerp(300, 380, on(f, back39, 10))} 1400 430`} stroke={P.goldInk} strokeWidth={14} fill="none" strokeLinecap="round" />
          <Coin x={960} y={300} s={1.6} />
          <g opacity={on(f, owners39, 6)}><Figure x={500} y={500} s={0.5} color={OWNER_COLORS[0]} /><Figure x={1420} y={500} s={0.5} color={OWNER_COLORS[1]} /></g>
        </g>
        <g opacity={on(f, difference, 6) * (1 - on(f, only40, 8))} transform={`translate(960 620) scale(${pop(f, difference) * 1.4})`}><circle r={80} fill={P.card} /><text x={0} y={36} textAnchor="middle" fill={P.coralInk} style={{ font: '400 120px "Bebas Neue"' }}>≠</text></g>
      </g>}
      {/* # C: a see-saw tips toward buybacks; two bars 630 and 943 */}
      {C > 0 && <g opacity={C}>
        <g opacity={1 - on(f, n630 - 2, 8)}>
          <path d="M960 840 L900 960 L1020 960 Z" fill={P.ink2} />
          <g transform={`rotate(${lerp(0, -12, easeInOut(span(f, two41, two41 + 16)))} 960 840)`}><rect x={460} y={820} width={1000} height={24} rx={12} fill={P.navy3} />
            <g transform="translate(560 760)"><Coin x={0} y={0} s={1.3} text="DIV" /></g><g transform="translate(1360 740)"><Coin x={-40} y={10} s={1.3} /><Coin x={40} y={10} s={1.3} /><Coin x={0} y={-50} s={1.3} text="BUY" /></g></g>
        </g>
        {/* # the 500 companies: a row of small towers along the floor */}
        <g opacity={on(f, s42, 6)} transform={`translate(1640 400) scale(${pop(f, s42)})`}><circle r={130} fill={P.card} /><Building x={0} y={90} s={1.1} seed={2} glow={on(f, companies42, 8)} /><text x={0} y={190} textAnchor="middle" fill={P.ink} style={{ font: '400 56px "Bebas Neue"' }}>500</text></g>
        {[[n630, 629.6, 'DIVIDENDS', '$630B', P.sky, 700, dividends42], [n943, 942.5, 'BUYBACKS', '$943B', P.gold, 1220, buybacks43]].map(([at, v, lab, val, col, x], k) => {
          const h = 600 * (v as number) / 1000 * easeInOut(span(f, at as number, (at as number) + 18))
          return <g key={k} opacity={on(f, at as number, 6)}>
            <rect x={(x as number) - 150} y={940 - h} width={300} height={h} rx={18} fill={col as string} />
            <text x={x as number} y={1010} textAnchor="middle" fill={P.ink} style={{ font: '400 60px "Bebas Neue"', letterSpacing: 2 }}>{lab as string}</text>
            <text x={x as number} y={910 - h} textAnchor="middle" fill={P.ink} style={{ font: '400 90px "Bebas Neue"' }}>{val as string}</text>
          </g>
        })}
      </g>}
      {/* # D: Apple: two coin towers 15 vs 95; a crown; 18 of 20 squares gold */}
      {D > 0 && <g opacity={D}>
        <g transform={`translate(${lerp(0, -260, on(f, biggest, 12))} 0)`}><Ring x={560} y={820} s={0.8} />
          <g opacity={on(f, biggest, 8)} transform={`translate(560 ${lerp(300, 520, easeInOut(span(f, biggest, biggest + 12)))})`}><path d="M-90 40 L-90 -40 L-45 0 L0 -60 L45 0 L90 -40 L90 40 Z" fill={P.gold} stroke={P.goldD} strokeWidth={6} /></g></g>
        <g opacity={on(f, fin45, 6) * (1 - on(f, n15, 8))} transform={`translate(1350 560) scale(${pop(f, fin45)})`}><Calendar x={0} y={0} text="FY 2024" s={1.2} /></g>
        <g opacity={on(f, paid45, 6) * (1 - on(f, biggest, 8))}><rect x={1000} y={960} width={760} height={14} rx={7} fill={P.ink2} /></g>
        <g opacity={1 - on(f, biggest, 8)}>
          {[[n15, 15.2, 'DIVIDENDS', '$15B', 1150], [n95, 95.0, 'BUYBACKS', '$95B', 1560]].map(([at, v, lab, val, x], k) => {
            const n = Math.round((v as number) / 5 * easeInOut(span(f, at as number, (at as number) + 20)))
            return <g key={k} opacity={on(f, at as number, 6)}>
              {Array.from({ length: n }, (_, i) => <g key={i}><ellipse cx={x as number} cy={940 - i * 28 + 8} rx={90} ry={22} fill={P.goldD} /><ellipse cx={x as number} cy={940 - i * 28} rx={90} ry={22} fill={k ? P.gold : P.sky} /></g>)}
              <text x={x as number} y={1020} textAnchor="middle" fill={P.ink} style={{ font: '400 56px "Bebas Neue"', letterSpacing: 2 }}>{lab as string}</text>
              <text x={x as number} y={900 - n * 28} textAnchor="middle" fill={P.ink} style={{ font: '400 84px "Bebas Neue"' }}>{val as string}</text>
            </g>
          })}
          <g opacity={on(f, gap, 6) * (1 - on(f, fin45 - 4, 6))}><path d="M1250 880 L1450 500" stroke={P.goldInk} strokeWidth={10} strokeDasharray="20 14" /></g>
        </g>
        <g opacity={on(f, n20, 6)}>
          {Array.from({ length: 20 }, (_, k) => { const lit = k < 18 ? on(f, n18 + k * 0.8, 5) : 0; return <g key={k} transform={`translate(${940 + (k % 5) * 170} ${360 + Math.floor(k / 5) * 150}) scale(${pop(f, n20 + k * 0.5)})`}><rect x={-70} y={-60} width={140} height={120} rx={16} fill={lit > 0.5 ? P.gold : P.card} stroke={P.ink2} strokeWidth={3} />{lit > 0.5 ? <text x={0} y={22} textAnchor="middle" fill="#0E1B33" style={{ font: '400 60px "Bebas Neue"' }}>APPLE</text> : <g opacity={on(f, quarter46, 6)}><g opacity={on(f, companies46 + k * 0.4, 5)}><Building x={0} y={50} s={0.4} seed={k} /></g></g>}</g> })}
          <g opacity={on(f, n18 + 16, 6)}><text x={1280} y={1050} textAnchor="middle" fill={P.goldInk} style={{ font: '400 64px "Bebas Neue"' }}>18 OF THE 20 BIGGEST BUYBACK QUARTERS</text></g>
        </g>
      </g>}
      {/* # gap fillers */}
      {A > 0 && <g opacity={A * on(f, g1, 6)}>{Array.from({ length: 8 }, (_, k) => { const a = (k * 45 + 22.5 - 90) * Math.PI / 180; return <path key={k} d={`M${960 + Math.cos(a) * 380} ${640 + Math.sin(a) * 260} L${960 + Math.cos(a) * 290} ${600 + Math.sin(a) * 200}`} stroke={P.goldInk} strokeWidth={6} strokeLinecap="round" opacity={on(f, g1 + k, 4)} /> })}</g>}
      {B > 0 && <g opacity={B}>
        <g opacity={on(f, g2, 6) * (1 - on(f, both, 6))} transform={`translate(960 ${lerp(160, 330, on(f, g2, 12))}) scale(0.5)`}><Till x={0} y={0} open={0.5} bills={1} /></g>
        <g opacity={on(f, g3, 6) * (1 - on(f, every38, 6))}>{Array.from({ length: 10 }, (_, k) => { const a = (k * 36 + 18 - 90) * Math.PI / 180; return <Figure key={k} x={1440 + Math.cos(a) * 320} y={620 + Math.sin(a) * 280 + 60} s={0.42 * pop(f, g3 + k)} color={OWNER_COLORS[k]} /> })}</g>
        <g opacity={on(f, g4, 6)}><Figure x={100} y={1000} s={0.55} color={OWNER_COLORS[3]} /><Figure x={860} y={1000} s={0.55} color={OWNER_COLORS[7]} /></g>
      </g>}
      {C > 0 && <g opacity={C * on(f, g5, 6) * (1 - on(f, n630 - 2, 8))}><g transform={`translate(1360 ${lerp(500, 690, easeInOut(span(f, g5, g5 + 12)))})`}><Coin x={0} y={0} s={1.2} text="BUY" /></g></g>}
      {C > 0 && <g opacity={C}>
        <circle cx={1640} cy={400} r={140} fill="none" stroke={P.goldInk} strokeWidth={8} opacity={on(f, g6, 6) * (1 - on(f, n943, 6))} />
        <rect x={1070} y={340} width={300} height={600} rx={18} fill="none" stroke={P.goldInk} strokeWidth={6} strokeDasharray="22 14" opacity={on(f, g7, 6) * (1 - on(f, n943 + 18, 6))} />
      </g>}
      {D > 0 && <g opacity={D}>
        <g opacity={on(f, g8, 6) * (1 - on(f, n15, 6))} transform={`translate(${lerp(380, 700, on(f, g8, 14))} 560)`}><circle r={80} fill="none" stroke={P.ink} strokeWidth={14} /><path d="M56 56 L120 120" stroke={P.ink} strokeWidth={18} strokeLinecap="round" /></g>
        <g opacity={on(f, g9, 6) * (1 - on(f, biggest, 6))}><circle cx={560} cy={760} r={360} fill="none" stroke={P.goldInk} strokeWidth={8} /></g>
        <g opacity={on(f, g10, 6) * (1 - on(f, n18, 6))}><rect x={850} y={280} width={860} height={620} rx={24} fill="none" stroke={P.goldInk} strokeWidth={8} /></g>
      </g>}
      {C > 0 && <g opacity={C * on(f, h1, 6)}><g transform={`translate(700 ${lerp(200, 320, easeInOut(span(f, h1, h1 + 12)))})`}><Coin x={0} y={0} s={1.1} text="DIV" /></g></g>}
      {D > 0 && <g opacity={D * on(f, h2, 6) * (1 - on(f, biggest, 6))}><rect x={1450} y={300} width={220} height={680} rx={24} fill="none" stroke={P.goldInk} strokeWidth={8} /></g>}
      <Vignette id="bb-who" />
    </g>
  )
}

const BEATS = ['s42:dividends', 's45:buybacks', 's36:instead', 's37:companies', 's38:shop', 's40:paid', 's41:buybacks', 's42:big', 's43:spent', 's44:clearly', 's46:apple', 's46:largest', 's34:cash', 's35:two', 's35:walk', 's35:money', 's36:eight', 's36:no', 's36:bigger', 's37:compare', 's37:dividend', 's38:every', 's38:nobody', 's39:both', 's39:back', 's39:owners', 's40:difference', 's40:only', 's40:stays', 's40:more',
  's41:bigger', 's41:two', 's42', 's42:companies', 's42:630', 's43:943', 's44:apple', 's44:gap', 's45:financial', 's45:paid', 's45:15', 's45:95', 's46:biggest', 's46:20', 's46:quarter', 's46:companies', 's46:18']
export const BB_WHO = makePiece('bb-who', 'Buybacks long: a note with a question mark; the two sellers walk off with cash; the eight who stayed circle a pizza of eight wider slices; split screen buyback (notes to two sellers, slices bigger) vs dividend (a coin to each of ten owners); arrows from one coin to both; a see-saw tips to buybacks; bars 630 dividends vs 943 buybacks; Apple coin towers 15 vs 95; a crown on the ring; 18 of 20 squares turn gold', {
  mood: 'light', Component: Who, beats: BEATS,
  sfx: [['s35:money', 'coin', 0.3], ['s38:every', 'coin', 0.3], ['s41:two', 'thud', 0.3], ['s43:943', 'ding', 0.3], ['s46:biggest', 'chime', 0.35]] })
