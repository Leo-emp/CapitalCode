// ---------------------------------------------------------------- s68–s72: the whole picture (grandma's kitchen at dusk).
// Along the counter, each part of the story lights up as its line is said:
// 1) the shopping cart lifts with its tags and a little 80,000 counter (what it is + how it's measured);
// 2) a mango, a fuel barrel and a thought bubble (the three causes);
// 3) the thermostat settles on 2 % and the rate lever rises (the Fed);
// 4) the drawer: cash shrinks a little, a green arrow of money that grows faster keeps its power;
// then grandma's bill lifts into the light, whole, while the price tags around it double.
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { BB, Bill, Cart, Drawer, K, Kitchen, Label, Lever, Mango, Tag, Thermostat } from './kit'

const G = 900

const Whole: React.FC<PieceProps> = ({ f, c }) => {
  const inflation68 = c('s68:inflation'), cart68 = c('s68:cart'), expensive68 = c('s68:expensive'), measured68 = c('s68:measured'), tracking68 = c('s68:tracking'), n80k = c('s68:80000')
  const comes69 = c('s69:comes'), money69 = c('s69:money'), goods69 = c('s69:goods'), costs69 = c('s69:costs'), expecting69 = c('s69:expecting')
  const fed70 = c('s70:fed'), n2 = c('s70:2'), zero70 = c('s70:zero'), hot70 = c('s70:hot'), raises70 = c('s70:raises'), cool70 = c('s70:cool'), spending70 = c('s70:spending')
  const cash71 = c('s71:cash'), drawer71 = c('s71:drawer'), shrinks71 = c('s71:shrinks'), grows71 = c('s71:grows'), faster71 = c('s71:faster'), keeps71 = c('s71:keeps'), power71 = c('s71:power')
  const grandmas72 = c("s72:grandma's"), bill72 = c('s72:bill'), never72 = c('s72:never'), broken72 = c('s72:broken'), prices72 = c('s72:prices'), doubled72 = c('s72:doubled'), time72 = c('s72:time')

  const lit = (a: number) => 0.4 + 0.6 * on(f, a, 12)
  const END = grandmas72 - 6, fin = on(f, END, 14)
  const hBeats: Beat[] = [[0, 'explain', 'smiling'], [cart68, 'point', 'neutral'], [comes69, 'explain', 'neutral'], [fed70, 'point', 'neutral'], [cash71, 'reachDown', 'thinking'], [grows71, 'thumbsUp', 'smiling'], [bill72, 'holdUp', 'smiling'], [broken72, 'present', 'smiling'], [time72, 'thumbsUp', 'smiling']]
  const needle = f < n2 ? 6 : f < hot70 ? lerp(6, 2, span(f, n2, n2 + 10)) : f < cool70 ? lerp(2, 5, span(f, hot70, raises70)) : lerp(5, 2, span(f, cool70, spending70 + 10))
  const lev = f < raises70 ? 1 : lerp(1, 4, span(f, raises70, cool70 + 6))

  return (
    <g>
      <Kitchen id="in-wh" f={f} mood="dusk" counter={G} />
      <g opacity={1 - fin}>
        {/* 1) the cart */}
        <g opacity={lit(inflation68)}>
          <g transform={`translate(0 ${-30 * on(f, cart68, 12)})`}><Cart x={740} y={G} s={0.85} f={f} /></g>
          {[0, 1, 2].map((k) => <Tag key={k} x={660 + k * 90} y={560 - 50 * on(f, expensive68, 12)} s={0.6} text="$" color={on(f, expensive68, 8) > 0.5 ? K.coral : K.sun} string={50} />)}
          <g opacity={on(f, tracking68, 8)}><Label x={700} y={G + 60} text={f >= n80k ? '≈ 80,000 PRICES' : 'MEASURED MONTHLY'} size={36} /></g>
        </g>
        {/* 2) the causes */}
        <g opacity={lit(comes69)}>
          <g opacity={on(f, goods69, 8)}><Mango x={960} y={700} s={1.4} /></g>
          <g opacity={on(f, costs69, 8)} transform="translate(1080 760)"><rect x={-40} y={-60} width={80} height={110} rx={14} fill={K.red} /><text y={8} textAnchor="middle" fill={K.paper} style={BB(26)}>FUEL</text></g>
          <g opacity={on(f, expecting69, 8)} transform="translate(1000 540)"><ellipse rx={90} ry={56} fill="#FFFFFF" /><text y={18} textAnchor="middle" fill={K.coral} style={BB(50)}>$↑?</text></g>
          <g opacity={on(f, money69, 8)}><Label x={1080} y={G + 60} text="DEMAND · COSTS · EXPECTATIONS" size={30} /></g>
        </g>
        {/* 3) the Fed */}
        <g opacity={lit(fed70)}>
          <Thermostat x={1400} y={560} s={0.55} value={needle} goal={on(f, n2, 8)} />
          <Lever x={1650} y={G - 40} s={0.5} value={lev} />
          <g opacity={on(f, zero70, 8)}><Label x={1500} y={G + 60} text={f >= raises70 ? 'TOO HOT → RATES UP' : '2%, NOT ZERO'} size={34} /></g>
        </g>
        {/* 4) the drawer */}
        <g opacity={lit(cash71)}>
          <Drawer x={290} y={G - 120} open={on(f, drawer71 - 4, 14) * 0.9}><Bill x={0} y={-40} s={0.5 * (1 - 0.3 * on(f, shrinks71, 12))} /></Drawer>
          <g opacity={on(f, grows71, 8)}><path d={`M200 ${420} L${200 + 220 * on(f, faster71, 14)} ${420 - 150 * on(f, faster71, 14)}`} stroke={K.green} strokeWidth={16} strokeLinecap="round" /><Label x={320} y={300} text={f >= keeps71 ? 'KEEPS ITS POWER' : 'GROWS FASTER'} size={34} fill={K.green} ink={K.paper} /></g>
        </g>
      </g>
      {/* the ending: grandma's bill, whole, with prices doubled around it */}
      <g opacity={fin}>
        <Person f={f} who="hero" beats={hBeats} x={360} y={G + 10} s={0.95} />
        <Bill x={1000} y={480 - 10 * pop(f, bill72, 14)} s={1.4} glow={0.6 + 0.4 * on(f, never72, 10)} />
        <g opacity={on(f, broken72, 8)}><Label x={1000} y={680} text="NEVER BROKEN" size={50} fill={K.green} ink={K.paper} /></g>
        {[[720, 280], [1300, 260], [700, 760], [1320, 780]].map(([x, y], k) => <Tag key={k} x={x} y={y - 20 * on(f, doubled72, 12)} s={0.85 * (1 + 0.4 * on(f, doubled72 + k * 2, 10))} text={f >= doubled72 ? `$${(k + 1) * 4}` : `$${(k + 1) * 2}`} color={f >= doubled72 ? K.coral : K.sun} r={k % 2 ? 8 : -8} o={on(f, prices72 + k * 2, 8)} />)}
      </g>
      <Headline f={f} lines={[[inflation68, 'THE WHOLE PICTURE', K.paper, 100], [comes69, '3 CAUSES', K.paper, 100], [fed70, 'THE FED AIMS FOR 2%', K.paper, 96], [cash71, 'YOUR MONEY', K.paper, 100], [grandmas72, "GRANDMA'S $100", K.paper, 100]]} />
    </g>
  )
}

export const IN_WHOLE = makePiece('in-whole', "The whole picture: grandma's kitchen at dusk; along the counter each part lights up as it is named: the shopping cart with rising tags and an 80,000-prices counter; a mango, a red fuel can and a thought bubble (demand, costs, expectations); the thermostat settling on 2 percent with a rate lever rising when it runs hot; the drawer where the bill shrinks while a green arrow of money that grows faster keeps its power; then grandma's 100-dollar bill lifts into the light, never broken, while the price tags around it double", {
  mood: 'dark', Component: Whole,
  beats: ["s68:inflation", "s68:cart", "s68:expensive", "s68:tracking", "s68:80000", "s69:comes", "s69:money", "s69:goods", "s69:costs", "s69:expecting", "s70:fed", "s70:2", "s70:zero", "s70:hot", "s70:raises", "s70:cool", "s70:spending", "s71:cash", "s71:drawer", "s71:shrinks", "s71:grows", "s71:faster", "s71:keeps", "s72:grandma's", "s72:bill", "s72:never", "s72:broken", "s72:prices", "s72:doubled", "s72:time"],
  sfx: [['s70:2', 'click', 0.1], ['s72:doubled', 'chime', 0.12]] })
