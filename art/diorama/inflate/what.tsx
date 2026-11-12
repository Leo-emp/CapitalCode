// ---------------------------------------------------------------- s9–s16: step one, what inflation is (a supermarket aisle).
// A) A cart in the aisle with five price tags on strings; on "creep up together" all five rise at once; the bill beside
//    the hero stretches less far (a reach arrow shortens).
// B) Only the eggs' tag jumps (bird flu) — an egg problem; then the WHOLE cart lifts with every tag.
// C) The bill stays exactly the same (a ruler beside it does not change) while the bag it buys shrinks: purchasing power.
// D) A staircase of price tags from JANUARY 2000 ($100) to OCTOBER 2026 ($200); each step is 2.6 % taller than the last;
//    the first two steps read $102.60 and $105.30, then it climbs to $200.
// E) A scoreboard on a stand asks WHO KEEPS SCORE?
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { BB, Aisle, Bag, Bill, Cart, Eggs, K, Label, No, Tag } from './kit'

const G = 920

const What: React.FC<PieceProps> = ({ f, c }) => {
  const inflation9 = c('s9:inflation'), prices9 = c('s9:prices'), everything9 = c('s9:everything'), creep9 = c('s9:creep'), together9 = c('s9:together'), dollar9 = c('s9:dollar'), stretches9 = c('s9:stretches'), far9 = c('s9:far')
  const not10 = c('s10:not'), thing10 = c('s10:thing'), eggs10 = c('s10:eggs'), jump10 = c('s10:jump'), bird10 = c('s10:bird'), problem10 = c('s10:problem'), whole10 = c('s10:whole'), cart10 = c('s10:cart'), moves10 = c('s10:moves')
  const notice11 = c('s11:notice'), bill11 = c('s11:bill'), never11 = c('s11:never'), changes11b = c('s11:changes#2'), stuff11 = c('s11:stuff'), buy11 = c('s11:buy'), purchasing11 = c('s11:purchasing'), power11 = c('s11:power')
  const january12 = c('s12:january'), october12 = c('s12:october'), doubled12 = c('s12:doubled'), n26 = c('s12:26'), year12 = c('s12:year')
  const n26b = c('s13:26'), tiny13 = c('s13:tiny'), stacks13 = c('s13:stacks'), lands13 = c('s13:lands'), top13 = c('s13:top'), higher13 = c('s13:higher')
  const stacks14 = c('s14:stacks'), n100 = c('s14:100'), n102 = c('s14:102'), one14 = c('s14:one'), n105 = c('s14:105'), two14 = c('s14:two'), adds14 = c('s14:adds'), more14 = c('s14:more')
  const n100b = c('s15:100'), prices16 = c('s16:prices'), much16 = c('s16:much'), n26c = c('s14:26'), year15 = c('s15:year'), small15 = c('s15:small'), turned15 = c('s15:turned'), n200 = c('s15:200')
  const move16 = c('s16:move'), someone16 = c('s16:someone'), score16 = c('s16:score'), measures16 = c('s16:measures'), how16 = c('s16:how')

  const AB = notice11 - 6, BC = january12 - 6, CD = someone16 - 4
  const A = win(f, 0, AB), B = win(f, AB - 8, BC), D = win(f, BC - 8, CD), E = on(f, CD - 8, 10)

  // # A) tags creep up together; then only the eggs tag; then the whole cart
  const rise = on(f, creep9, 16) * (1 - on(f, not10, 10))
  const eggJump = on(f, jump10, 10) * (1 - on(f, whole10, 10))
  const lift = on(f, moves10, 14)
  const reach = lerp(1, 0.62, span(f, stretches9, far9 + 10)) * (1 - on(f, not10, 6)) + on(f, not10, 6)
  const aBeats: Beat[] = [[0, 'explain', 'neutral'], [everything9, 'point', 'neutral'], [together9, 'shock', 'shocked'], [dollar9, 'holdUp', 'worried'], [not10, 'stop', 'neutral'], [eggs10, 'point', 'neutral'], [problem10, 'shrug', 'smiling'], [whole10, 'pointUp', 'shocked'], [moves10, 'shock', 'shocked']]
  // # B) the bill does not change, the bag shrinks
  const bag = lerp(1, 0.5, span(f, stuff11, power11 + 6))
  const bBeats: Beat[] = [[AB, 'holdUp', 'neutral'], [never11, 'stop', 'neutral'], [changes11b, 'point', 'thinking'], [purchasing11, 'explain', 'smiling']]
  // # D) the staircase of tags
  const STEPS = 10
  const grow = (k: number) => 100 * Math.pow(2, k / (STEPS - 1)) // 100 → 200 over the staircase
  const shown = f < october12 ? 1 : 1 + Math.floor((STEPS - 1) * span(f, october12, doubled12 + 10))
  const zoomFirst = win(f, stacks14 - 4, small15, 8)

  return (
    <g>
      <Aisle id="in-w" f={f} floor={G} />
      {/* # A) the cart and its tags */}
      {A > 0 && <g opacity={A}>
        <Person f={f} who="hero" beats={aBeats} x={300} y={G + 10} s={0.95} />
        <g transform={`translate(0 ${-60 * lift})`} opacity={on(f, inflation9 - 4, 10)}>
          <Cart x={1150} y={G} s={1.25} f={f} />
          {[0, 1, 2, 3, 4].map((k) => { const isEgg = k === 2, up = rise + (isEgg ? eggJump : 0) + lift * 0.5
            return <Tag key={k} x={890 + k * 130} y={560 - 120 * up - 10 * k % 2} s={0.8} text={isEgg && eggJump > 0.2 ? '$6' : `$${[3, 5, 4, 2, 7][k] + (rise > 0.5 || lift > 0.3 ? 1 : 0)}`} color={up > 0.3 ? K.coral : K.sun} string={60 + 120 * up} r={k % 2 ? 6 : -6} o={on(f, prices9 + k * 2, 8)} /> })}
        </g>
        {/* the eggs on their own */}
        <g opacity={win(f, eggs10, whole10, 8)}><Eggs x={1150} y={G - 340} s={1.1} /><Label x={1150} y={G - 440} text={f >= problem10 ? 'AN EGG PROBLEM' : 'BIRD FLU'} size={38} fill={K.paper} o={on(f, bird10, 8)} /></g>
        {/* the dollar's reach */}
        <g opacity={on(f, dollar9, 8) * (1 - on(f, not10, 8))}>
          <Bill x={560} y={420} s={0.55} r={-6} />
          <path d={`M640 420 L${640 + 260 * reach} 420`} stroke={K.mintD} strokeWidth={12} strokeLinecap="round" /><path d={`M${640 + 260 * reach} 396 L${676 + 260 * reach} 420 L${640 + 260 * reach} 444 Z`} fill={K.mintD} />
        </g>
        <g opacity={on(f, thing10, 8) * (1 - on(f, eggs10, 8))}><Label x={1150} y={G + 70} text="NOT ONE THING" size={40} /></g>
        <g opacity={on(f, whole10, 8)}><Label x={1150} y={G + 70} text="THE WHOLE CART" size={42} fill={K.coral} ink={K.paper} /></g>
      </g>}
      {/* # B) the same bill, a smaller bag */}
      {B > 0 && <g opacity={B}>
        <Person f={f} who="hero" beats={bBeats} x={300} y={G + 10} s={0.95} />
        <Bill x={820} y={520 - 6 * pop(f, bill11, 12)} s={1.05} glow={on(f, bill11, 10)} />
        <g opacity={on(f, never11, 8)}><Label x={820} y={680} text="SAME $100" size={44} /></g>
        <g opacity={on(f, stuff11 - 4, 10)}><Bag x={1400} y={G} s={1.2 * (0.6 + 0.4 * bag)} fill={bag} /><Label x={1400} y={G + 70} text={f >= purchasing11 ? 'PURCHASING POWER' : 'WHAT IT BUYS'} size={40} fill={f >= buy11 ? K.coral : K.paper} ink={f >= buy11 ? K.paper : K.ink} /></g>
      </g>}
      {/* # D) the staircase of prices */}
      {D > 0 && <g opacity={D}>
        {Array.from({ length: STEPS }, (_, k) => { if (k >= shown) return null
          const v = grow(k), h = 90 + (v - 100) * 3.4, x = 260 + k * 150
          const hot = (zoomFirst > 0.5 && k < 3) || (f >= stacks13 && f < lands13 && k < 4)
          return <g key={k}>
            <rect x={x - 62} y={G - h} width={124} height={h} rx={10} fill={k === STEPS - 1 ? K.coral : hot ? K.sun : K.mint} opacity={zoomFirst > 0.5 && k >= 3 ? 0.35 : 1} />
            <rect x={x - 62} y={G - h} width={124} height={16} rx={8} fill="#FFFFFF" opacity={0.4} />
          </g> })}
        <g opacity={on(f, january12, 8)}><Tag x={260} y={G - 160} s={0.9} text="$100" /><Label x={260} y={G + 60} text="JAN 2000" size={38} /></g>
        <g opacity={on(f, october12, 8) * (1 - zoomFirst)}><Label x={260 + 9 * 150} y={G + 60} text="OCT 2026" size={38} /></g>
        <g opacity={on(f, doubled12, 8) * (1 - zoomFirst)}><Tag x={260 + 9 * 150} y={G - 90 - 340 - 80} s={1.05} text="$200" color={K.coral} /></g>
        <g opacity={on(f, n26, 8) * (1 - on(f, n26c, 8))} transform={`translate(960 300) scale(${1 + 0.12 * pop(f, n26b, 14)})`}><Label x={0} y={0} text={f >= tiny13 ? '2.6% SOUNDS TINY…' : '≈ 2.6% A YEAR'} size={52} fill={K.ink} ink={K.paper} /></g>
        {/* a little 2.6 % block lands on top of each step (stacks) */}
        {f >= lands13 && f < n100 && [1, 2, 3].map((k) => { const x = 260 + k * 150, h = 90 + (grow(k) - 100) * 3.4, t = span(f, lands13 + k * 4, lands13 + k * 4 + 12)
          return <rect key={k} x={x - 50} y={lerp(260, G - h - 26, t)} width={100} height={22} rx={6} fill={K.coral} opacity={t > 0 ? 1 : 0} /> })}
        <g opacity={on(f, higher13, 8) * (1 - on(f, n100, 8))}><Label x={960} y={380} text="ON TOP OF LAST YEAR" size={40} /></g>
        {/* the first two steps up close */}
        <g opacity={zoomFirst}>
          <Tag x={260 + 150} y={G - 250} s={0.9} text="$102.60" color={K.sun} o={on(f, n102, 8)} />
          <Tag x={260 + 300} y={G - 300} s={0.9} text="$105.30" color={K.sun} o={on(f, n105, 8)} />
          <Label x={260 + 150} y={G + 60} text="1 YEAR" size={36} o={on(f, one14, 8)} />
          <Label x={260 + 300} y={G + 60} text="2 YEARS" size={36} o={on(f, two14, 8)} />
          <Label x={900} y={300} text={f >= more14 ? '+ A LITTLE MORE EACH YEAR' : f >= n100 ? '$100 OF SHOPPING' : 'AT 2.6% A YEAR'} size={44} o={on(f, n26c, 8)} />
        </g>
        {/* a little bill climbs the staircase, year after year */}
        {f >= year15 && (() => { const t = span(f, n100b, n200), k = Math.min(9, Math.floor(t * 9.999)), h = 90 + (grow(k) - 100) * 3.4
          return <g opacity={on(f, year15, 8)}><Bill x={260 + k * 150} y={G - h - 60} s={0.34} /></g> })()}
        <g opacity={on(f, turned15, 8)} transform={`translate(960 300) scale(${1 + 0.1 * pop(f, prices16, 14) + 0.1 * pop(f, much16, 14)})`}><Label x={0} y={0} text="$100 → $200" size={60} fill={K.coral} ink={K.paper} /></g>
      </g>}
      {/* # E) who keeps score? */}
      {E > 0 && <g opacity={E}>
        <g transform={`translate(960 ${G})`}>
          <rect x={-10} y={-260} width={20} height={260} fill={K.woodD} />
          <rect x={-300} y={-560} width={600} height={320} rx={24} fill={K.ink} /><rect x={-280} y={-540} width={560} height={280} rx={16} fill="#3A2C50" />
          <text y={-430} textAnchor="middle" fill={K.sun} style={BB(70)}>PRICES</text>
          <text y={-330} textAnchor="middle" fill={K.paper} style={BB(90)}>{f >= measures16 ? '?' : '↑'}</text>
        </g>
        <Label x={960} y={G + 70} text={f >= how16 ? 'WHO MEASURES IT — AND HOW?' : 'SOMEONE KEEPS SCORE'} size={42} o={on(f, score16 - 4, 8)} />
      </g>}
      <Headline f={f} lines={[[inflation9, 'INFLATION', K.ink, 110], [not10, 'NOT ONE THING', K.ink, 100], [notice11, 'SAME BILL, LESS STUFF', K.ink, 96], [january12, 'PRICES DOUBLED', K.coralD, 100], [stacks14, 'IT STACKS', K.ink, 100], [move16, 'WHO KEEPS SCORE?', K.ink, 100]]} />
    </g>
  )
}

export const IN_WHAT = makePiece('in-what', "Step one, what inflation is: a supermarket aisle; a full cart with five price tags on strings that all creep up together, while the reach of a dollar shortens; then only the eggs' tag jumps (bird flu, an egg problem) and then the whole cart lifts with every tag; the same 100-dollar bill stays unchanged while the bag it buys shrinks (purchasing power); a staircase of price steps from 100 dollars in January 2000 to 200 dollars in October 2026, small blocks landing on top of each step (2.6 percent a year stacks), the first two steps up close at 102.60 and 105.30; a scoreboard asks who keeps score", {
  mood: 'light', Component: What,
  beats: ["s9:inflation", "s9:prices", "s9:everything", "s9:creep", "s9:together", "s9:dollar", "s9:stretches", "s9:far", "s10:not", "s10:thing", "s10:eggs", "s10:jump", "s10:bird", "s10:problem", "s10:whole", "s10:moves", "s11:notice", "s11:bill", "s11:never", "s11:changes#2", "s11:stuff", "s11:buy", "s11:purchasing", "s11:power", "s12:january", "s12:october", "s12:doubled", "s12:26", "s13:26", "s13:tiny", "s13:stacks", "s13:lands", "s13:higher", "s14:stacks", "s14:100", "s14:102", "s14:one", "s14:105", "s14:two", "s14:more", "s15:100", "s16:prices", "s16:much", "s14:26", "s15:year", "s15:small", "s15:turned", "s15:200", "s16:someone", "s16:score", "s16:measures", "s16:how"],
  sfx: [['s10:moves', 'whoosh', 0.1], ['s12:doubled', 'pop', 0.1], ['s15:200', 'ding', 0.1]] })
