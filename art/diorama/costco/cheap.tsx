// ---------------------------------------------------------------- s24–s31a: why not raise prices? low prices are the product; markup cap reportedly 14% branded / 15% Kirkland
// ($100 cost → ≈ $114 max); fewer than 4,000 items in big packs, huge volumes, simple warehouses; the $1.50 hot dog since 1985 — a promise
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { type Beat, Calendar, camera, Headline, Label, Person, Prop, Tick, win } from '../aimoney/common'
import { Mini } from '../../rig/Mini'
import { Coin } from '../aimoney/common'
import { HotDog, Rack, Warehouse } from './kit'

const Box: React.FC<{ x: number; y: number; text: string; color: string; s?: number; o?: number }> = ({ x, y, text, color, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><rect x={-140} y={-70} width={280} height={140} rx={20} fill={color} /><Label x={0} y={30} text={text} size={84} font="Bebas Neue" color={P.navy0} /></g>
)

const Cheap: React.FC<PieceProps> = ({ f, c }) => {
  const strange = c('s24:strange'), raise = c('s24:raise'), more = c('s24:more')
  const low = c('s25:low'), product = c('s25:product')
  const sinegal = c('s26:sinegal'), rule = c('s26:rule'), d14 = c('s26:14'), d15 = c('s26:15')
  const buys = c('s26a:buys'), d100 = c('s26a:100'), d114 = c('s26a:114')
  const many = c('s26b:many'), own = c('s26b:own'), stop = c('s26b:stop')
  const simple = c('s27:simple'), d4000 = c('s27:4000'), packs = c('s27:packs')
  const huge = c('s28:huge'), cheaply = c('s28:cheaply'), restock = c('s28:restock')
  const concrete = c('s28a:concrete'), steel = c('s28a:steel'), pallets = c('s28a:pallets'), fancy = c('s28a:fancy')
  const hot = c('s29:hot'), d150 = c('s29:50'), in1985 = c('s29:in')
  const today = c('s30:today'), d40 = c('s30:40'), still = c('s30:still')
  const rich = c('s31:rich'), promise = c('s31:promise'), trust = c('s31:trust')
  const message = c('s31a:message'), ripoff = c("s31a:ripoff")
  const A = win(f, c('s24'), simple), B = win(f, simple, hot), Cc = on(f, hot, 10)
  const hero: Beat[] = [[0, 'scratchHead', 'thinking'], [c('s24:goods'), 'present', 'neutral'], [c('s26a:sell'), 'offer', 'neutral'], [c('s28:items'), 'countOne', 'neutral'], [c('s28a:stacked'), 'pointUp', 'neutral'], [c('s31a:same'), 'nodA', 'neutral'], [c('s27:costco'), 'present', 'smiling'], [raise, 'pointUp', 'thinking'], [low, 'explain', 'smiling'], [d14, 'countOne', 'neutral'], [d114, 'present', 'neutral'], [stop, 'stop', 'neutral'],
    [simple, 'explain', 'neutral'], [huge, 'celebrate', 'smiling'], [steel, 'present', 'neutral'], [hot, 'hold', 'smiling'], [still, 'fistPump', 'smiling'], [promise, 'handshake', 'smiling'], [ripoff, 'thumbsUp', 'smiling']]
  const founder: Beat[] = [[0, 'idle', 'neutral'], [rule, 'signA', 'neutral', 'signB', 14], [d15, 'stop', 'neutral']]
  return (
    <g>
      <Stage id="cp" frame={f} />
      <Headline f={f} lines={[[strange, 'A STRANGE QUESTION', P.ink, 130], [raise, 'WHY NOT RAISE PRICES?', P.coralInk, 124], [low, 'THE LOW PRICES…', P.ink, 130], [product, '…ARE THE PRODUCT', P.goldInk, 130],
        [sinegal, 'CO-FOUNDER JIM SINEGAL', P.ink, 120], [rule, 'A RULE (REPORTEDLY)', P.ink, 124], [d14, 'BRANDED: MAX 14% MARKUP', P.goldInk, 112], [d15, 'COSTCO BRAND: MAX 15%', P.goldInk, 116],
        [d100, 'BUYS FOR $100…', P.ink, 130], [d114, '…SELLS FOR ≤ $114', P.mintInk, 130], [many, 'MANY STORES ADD FAR MORE', P.ink, 116], [stop, 'COSTCO STOPS THERE', P.goldInk, 124],
        [simple, 'KEEP IT SIMPLE', P.ink, 140], [d4000, 'FEWER THAN 4,000 ITEMS', P.goldInk, 116], [packs, 'OFTEN IN BIG PACKS', P.ink, 124], [huge, 'HUGE AMOUNTS OF EACH', P.ink, 120], [cheaply, 'BOUGHT MORE CHEAPLY', P.mintInk, 120], [restock, 'RESTOCKED FASTER', P.mintInk, 124],
        [concrete, 'CONCRETE FLOORS', P.ink, 130], [steel, 'STEEL RACKS', P.ink, 140], [pallets, 'GOODS ON PALLETS', P.ink, 130], [fancy, 'NO FANCY DISPLAYS', P.ink, 124],
        [hot, 'THE FAMOUS HOT DOG', P.ink, 124], [d150, '$1.50 IN 1985', P.goldInk, 130], [today, 'TODAY…', P.ink, 140], [still, 'STILL $1.50', P.mintInk, 140], [rich, 'NOT A MONEY-MAKER', P.ink, 124], [promise, 'IT IS A PROMISE', P.goldInk, 130],
        [message, 'THE MESSAGE:', P.ink, 130], [ripoff, 'NOTHING HERE IS A RIP-OFF', P.mintInk, 108]]} />
      <g transform={camera(f, [[d114, 1240, 620, 1.05], [many, 960, 540, 1], [huge, 1240, 620, 1.04], [concrete, 960, 540, 1], [d150, 1240, 620, 1.05], [promise, 960, 540, 1]])}>
        {/* # A: the question; low prices as the product; the founder's markup rule; $100 → $114 */}
        <g opacity={A}>
          <g opacity={on(f, c('s24'), 6) * (1 - on(f, low, 8))} transform={`translate(1240 620) scale(${pop(f, c('s24')) * 1.3})`}><Prop id="price-tag" x={0} y={0} size={200} f={f} />
            <g opacity={on(f, raise, 6)} transform={`translate(150 ${-60 - 30 * Math.abs(Math.sin(f / 8))})`}><Prop id="arrow-up" x={0} y={0} size={100} f={f} /></g><g opacity={on(f, more, 6)} transform="translate(-150 -60)"><circle r={44} fill={P.gold} /><Label x={0} y={24} text="?" size={70} font="Bebas Neue" color={P.navy0} /></g></g>
          <g opacity={on(f, low, 6) * (1 - on(f, sinegal, 8))} transform={`translate(1240 620) scale(${pop(f, low) * 1.4})`}><circle r={150} fill={P.gold} opacity={0.2 + 0.1 * Math.sin(f / 6)} /><Prop id="price-tag" x={0} y={0} size={200} f={f} /><Label x={0} y={200} text={f >= product ? 'THE PRODUCT' : 'LOW PRICES'} size={60} font="Bebas Neue" color={P.goldInk} /></g>
          <g opacity={on(f, sinegal, 6)}>
            <Person f={f} who="investor" beats={founder} x={1790} y={1190} s={1.1} flip life={7} />
            <g opacity={1 - on(f, d100, 8)}>
              <g opacity={on(f, d14, 6)} transform={`translate(1000 560) scale(${pop(f, d14)})`}><rect x={-170} y={-110} width={340} height={220} rx={24} fill={P.card} /><Label x={0} y={-30} text="BRANDED" size={52} font="Bebas Neue" color={P.ink} /><Label x={0} y={70} text="≤ 14%" size={110} font="Bebas Neue" color={P.goldInk} /></g>
              <g opacity={on(f, c('s26:brand'), 6) * (1 - on(f, d15, 8))} transform={`translate(1380 560) scale(${pop(f, c('s26:brand'))})`}><rect x={-70} y={-90} width={140} height={160} rx={12} fill="#E05A4C" /><Label x={0} y={0} text="COSTCO" size={34} font="Bebas Neue" color="#FFF" /><Label x={0} y={36} text="BRAND" size={34} font="Bebas Neue" color="#FFF" /></g>
              <g opacity={on(f, d15, 6)} transform={`translate(1380 560) scale(${pop(f, d15)})`}><rect x={-170} y={-110} width={340} height={220} rx={24} fill={P.card} /><Label x={0} y={-30} text="COSTCO BRAND" size={52} font="Bebas Neue" color={P.ink} /><Label x={0} y={70} text="≤ 15%" size={110} font="Bebas Neue" color={P.goldInk} /></g>
            </g>
            <g opacity={on(f, c('s26a:numbers'), 6) * (1 - on(f, d100, 8))} transform={`translate(1180 560) scale(${pop(f, c('s26a:numbers'))})`}><Prop id="calculator" x={-120} y={0} size={170} f={f} /><g opacity={on(f, c('s26a:item'), 6)}><rect x={60} y={-80} width={150} height={160} rx={12} fill="#C98F5A" /><rect x={60} y={-80} width={150} height={30} rx={10} fill="#A86F42" /></g></g>
            <g opacity={on(f, buys, 6)}>
              <Box x={960} y={560} text="$100" color={P.sky} s={pop(f, d100)} o={on(f, d100, 6)} />
              <g opacity={on(f, d114, 6)}><path d="M1110 560 L1240 560" stroke={P.goldInk} strokeWidth={10} /><path d="M1230 540 L1260 560 L1230 580 Z" fill={P.goldInk} /><Box x={1410} y={560} text="$114" color={P.mint} s={pop(f, d114)} /><Label x={960} y={680} text="COST" size={48} font="Bebas Neue" color={P.ink2} /><Label x={1410} y={680} text="MAX PRICE" size={48} font="Bebas Neue" color={P.ink2} /></g>
              <g opacity={on(f, many, 6)} transform={`translate(1180 900) scale(${pop(f, many)})`}><Mini look="owner" x={-120} y={120} scale={0.7} frame={f} seed={33} /><g transform={`translate(60 ${-40 - 40 * on(f, c('s26b:far'), 14)})`}><Prop id="price-tag" x={0} y={0} size={170} f={f} /><Prop id="arrow-up" x={110} y={-20} size={90} f={f} /></g>
                <g opacity={on(f, own, 6)} transform="translate(230 40)"><rect x={-50} y={-70} width={100} height={110} rx={10} fill="#E05A4C" /><Label x={0} y={0} text="OWN" size={40} font="Bebas Neue" color="#FFF" /></g></g>
              <g opacity={on(f, c('s26b:charge'), 6)} transform="translate(1500 380)"><Prop id="price-tag" x={0} y={0} size={120} f={f} /><Prop id="arrow-up" x={80} y={-10} size={70} f={f} /><path d="M-80 -60 L100 60" stroke={P.coral} strokeWidth={12} strokeLinecap="round" opacity={on(f, c('s26b:charge') + 8, 6)} /></g>
            </g>
          </g>
        </g>
        {/* # B: few items, big packs, huge volumes; the bare warehouse racks */}
        <g opacity={B}>
          <g opacity={1 - on(f, concrete, 8)}>
            <g opacity={on(f, d4000, 6)} transform={`translate(960 600) scale(${pop(f, d4000)})`}><Rack x={0} y={260} s={0.55} seed={1} /><Label x={0} y={-170} text="< 4,000 ITEMS" size={64} font="Bebas Neue" color={P.goldInk} /></g>
            <g opacity={on(f, packs, 6)} transform={`translate(1460 620) scale(${pop(f, packs)})`}>{[0, 1, 2, 3].map((k) => <rect key={k} x={-110 + (k % 2) * 110} y={-110 + Math.floor(k / 2) * 110} width={100} height={100} rx={10} fill={['#E9C25A', '#E05A4C', '#3A6EA8', '#3DDC97'][k]} />)}<Label x={0} y={170} text="BIG PACKS" size={52} font="Bebas Neue" color={P.ink} /></g>
            {Array.from({ length: 4 }, (_, k) => { const t = easeInOut(span(f, huge + k * 6, huge + k * 6 + 30)); return f >= huge ? <g key={k} opacity={1 - span(f, huge + k * 6 + 26, huge + k * 6 + 32)} transform={`translate(${lerp(1900, 1300, t)} ${880 + k * 24}) scale(0.5)`}><Prop id="truck" x={0} y={0} size={200} f={f} /></g> : null })}
            <g opacity={on(f, c('s28:buy'), 6)} transform={`translate(1460 900) scale(${pop(f, c('s28:buy')) * 0.8})`}><Prop id="handshake" x={0} y={-40} size={150} f={f} /></g>
            <g opacity={on(f, c('s28:faster'), 6)} transform={`translate(1720 400) scale(${pop(f, c('s28:faster')) * 0.8})`}><Prop id="clock" x={0} y={0} size={150} f={f} /></g>
            <g opacity={on(f, cheaply, 6)} transform="translate(1000 900)"><Tick x={0} y={0} o={1} r={40} /><Label x={60} y={16} text="CHEAPER" size={52} font="Bebas Neue" color={P.mintInk} anchor="start" /></g>
            <g opacity={on(f, restock, 6)} transform="translate(1000 990)"><Tick x={0} y={0} o={1} r={40} /><Label x={60} y={16} text="FASTER" size={52} font="Bebas Neue" color={P.mintInk} anchor="start" /></g>
          </g>
          <g opacity={on(f, concrete, 6)}>
            <rect x={600} y={960} width={1220} height={120} rx={20} fill="#B7BCC4" />
            <g opacity={on(f, c('s28a:warehouses'), 6) * (1 - on(f, steel, 8))} transform={`translate(1240 900) scale(${pop(f, c('s28a:warehouses')) * 0.9})`}><Warehouse x={0} y={0} label="WAREHOUSE" /></g>
            <g opacity={on(f, c('s28a:pay'), 6)} transform="translate(1660 520)"><Coin x={0} y={0} s={0.9} /><path d="M-40 -40 L40 40" stroke={P.coral} strokeWidth={10} strokeLinecap="round" /></g>
            {[0, 1, 2].map((k) => <Rack key={k} x={900 + k * 380} y={960} s={0.85} o={on(f, steel + k * 4, 6)} seed={k} />)}
            <g opacity={on(f, fancy, 6)} transform="translate(1660 380)"><circle r={60} fill={P.coral} /><path d="M-30 -30 L30 30 M30 -30 L-30 30" stroke="#FFF" strokeWidth={12} strokeLinecap="round" /></g>
          </g>
        </g>
        {/* # C: the hot dog — 1985, still $1.50 four decades on — a promise */}
        <g opacity={Cc}>
          <g opacity={on(f, c('s29:famous'), 6)} transform="translate(1180 360)"><rect x={-200} y={-50} width={400} height={100} rx={18} fill="#E05A4C" /><Label x={0} y={32} text="FOOD COURT" size={64} font="Bebas Neue" color="#FFF" /></g>
          <g transform={`translate(0 ${-24 * Math.max(0, Math.sin(span(f, c('s31:dog'), c('s31:dog') + 14) * Math.PI))})`}><HotDog x={1180} y={600} s={1.2 * pop(f, hot) * (1 + 0.08 * Math.max(0, Math.sin(span(f, c('s29:drink'), c('s29:drink') + 12) * Math.PI)))} price={f >= d150 ? '$1.50' : undefined} /></g>
          {[c('s30:50'), c('s31a:price')].map((at, k) => <circle key={k} cx={1156} cy={732} r={lerp(60, 150, span(f, at, at + 16))} fill="none" stroke={P.goldInk} strokeWidth={8} opacity={f >= at ? 1 - span(f, at, at + 16) : 0} />)}
          <g opacity={on(f, c('s31:costco'), 6) * (1 - on(f, promise, 8))} transform="translate(860 940)">{[0, 1].map((k) => <circle key={k} cx={k * 44} cy={0} r={18} fill={P.gold} />)}<g opacity={on(f, rich, 6)} transform="translate(160 -40)"><Prop id="money-bag" x={0} y={0} size={110} f={f} /><path d="M-50 -50 L50 50" stroke={P.coral} strokeWidth={10} strokeLinecap="round" /></g></g>
          <g opacity={on(f, c('s31:next'), 6) * (1 - on(f, c('s31a:member'), 8))} transform={`translate(1660 860) scale(${pop(f, c('s31:next')) * 0.8})`}><Calendar x={0} y={0} text="2027" s={1.2} /><Label x={0} y={170} text="$1.50" size={64} font="Bebas Neue" color={P.mintInk} /></g>
          <g opacity={on(f, c('s31a:member'), 6)}><Mini look="buyer" x={900} y={1010} scale={0.9} frame={f} seed={55} mood="happy" /></g>
          <g opacity={on(f, in1985, 6) * (1 - on(f, today, 8))} transform={`translate(1660 460) scale(${pop(f, in1985)})`}><Calendar x={0} y={0} text="1985" s={1.3} /></g>
          <g opacity={on(f, today, 6) * (1 - on(f, c('s31:next'), 8))} transform={`translate(1660 460) scale(${pop(f, today)})`}><Calendar x={0} y={0} text="2026" s={1.3} /><Label x={0} y={170} text={f >= d40 ? '40+ YEARS' : ''} size={56} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, promise, 6)} transform={`translate(1660 860) scale(${pop(f, promise)})`}><Prop id="handshake" x={0} y={0} size={160} f={f} /><Label x={0} y={120} text={f >= trust ? 'SAME PRICE NEXT YEAR' : 'A PROMISE'} size={48} font="Bebas Neue" color={P.goldInk} /></g>
          <g opacity={on(f, ripoff, 6)} transform={`translate(800 420) scale(${pop(f, ripoff)})`}><Tick x={0} y={0} o={1} r={60} /></g>
        </g>
        <Person f={f} who="hero" beats={hero} x={320} y={1190} s={1.4} life={2} />
      </g>
      <Vignette id="cp" />
    </g>
  )
}

export const CO_CHEAP = makePiece('co-cheap', 'Long: cheap on purpose — markup cap reportedly 14% / 15% ($100 → ≤ $114); < 4,000 items in big packs; bare warehouses; the $1.50 hot dog since 1985 as a promise', { mood: 'light', Component: Cheap,
  beats: ["s24:strange", "s24:raise", "s24:more", "s25:low", "s25:product", "s26:sinegal", "s26:rule", "s26:14", "s26:15", "s26a:buys", "s26a:100", "s26a:114", "s26b:many", "s26b:own", "s26b:stop", "s27:simple", "s27:4000", "s27:packs", "s28:huge", "s28:cheaply", "s28:restock", "s28a:concrete", "s28a:steel", "s28a:pallets", "s28a:fancy", "s29:hot", "s29:50", "s29:in", "s30:today", "s30:40", "s30:still", "s31:rich", "s31:promise", "s31:trust", "s31a:message", "s31a:ripoff", "s24", "s24:goods", "s26a:sell", "s28:items", "s28a:stacked", "s31a:same", "s27:costco", "s26:brand", "s26a:numbers", "s26a:item", "s26b:far", "s26b:charge", "s28:buy", "s28:faster", "s28a:warehouses", "s28a:pay", "s29:famous", "s31:dog", "s29:drink", "s30:50", "s31a:price", "s31:costco", "s31:next", "s31a:member"],
  sfx: [['s25:product', 'chime', 0.4], ['s26:14', 'pop', 0.4], ['s26:15', 'pop', 0.4], ['s26a:114', 'ding', 0.4], ['s27:4000', 'pop', 0.4], ['s28a:steel', 'thud', 0.4], ['s29:50', 'coin', 0.5], ['s30:still', 'chime', 0.5]] })
