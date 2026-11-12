// ---------------------------------------------------------------- s7–s14b: a $100 cart — ≈ $89 to suppliers, ≈ $11 gross margin (10-K: much lower margins than most retailers),
// ≈ $9 running costs for 939 warehouses, ≈ $2 left; that $2 covers taxes, interest and owners' profit; a second stream of money
// # picture-first (owner r36/r37/r39): a shopper, a supplier, a Costco manager and a rival owner act it out with real coins; short labels only
import React from 'react'
import { Mini } from '../../rig/Mini'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { type Beat, Calendar, camera, Coin, Headline, Label, Person, Prop, win } from '../aimoney/common'
import { Cart, CoinGrid, CoinJar, MemberCard, Note, Warehouse } from './kit'

const CartScene: React.FC<PieceProps> = ({ f, c }) => {
  const shopping = c('s7:shopping'), d100 = c('s7:100'), stuff = c('s7:stuff')
  const pay = c('s8:pay'), companies = c('s8:companies'), goods = c('s8:goods'), whole = c('s8:whole'), d89 = c('s8:89')
  const lot = c('s8a:lot'), saves = c('s8a:saves'), back = c('s8a:back'), lower = c('s8a:lower')
  const anything = c('s9:anything'), d11 = c('s9:11')
  const gross = c('s9a:gross'), keeps = c('s9a:keeps'), bills = c('s9a:bills')
  const most = c('s10:most'), report = c('s10:report'), lowerM = c('s10:lower'), retailers = c('s10:retailers')
  const running = c('s11:running'), wages = c('s11:wages'), electricity = c('s11:electricity'), rent = c('s11:rent'), trucks = c('s11:trucks'), d939 = c('s11:939')
  const d9 = c('s12:9'), cart100 = c('s13:100'), d2 = c('s13:2')
  const big = c('s14:big'), thin = c('s14:thin')
  const taxes = c('s14a:taxes'), interest = c('s14a:interest'), owners = c('s14a:owners'), ordinary = c('s14a:ordinary')
  const anyth = c('s14b:anything'), second = c('s14b:second'), shoppers = c('s14b:shoppers'), never = c('s14b:never')
  const A = win(f, c('s7'), anything), B = win(f, anything, running), Cc = win(f, running, taxes), D = on(f, taxes, 10)
  const hero: Beat[] = [[0, 'present', 'smiling'], [c('s8a:hands'), 'offer', 'neutral'], [c('s9a:11'), 'countOne', 'neutral'], [c('s10:than'), 'measure', 'neutral'], [c('s14b:costco'), 'present', 'neutral'], [c('s14b:because'), 'pointUp', 'neutral'], [pay, 'explain', 'neutral'], [lot, 'shock', 'shocked'], [back, 'offer', 'smiling'], [d11, 'countOne', 'neutral'], [most, 'point', 'thinking'],
    [running, 'countA', 'neutral', 'countB', 14], [d2, 'pointDown', 'neutral'], [thin, 'measure', 'thinking'], [taxes, 'explain', 'neutral'], [anyth, 'pointUp', 'smiling'], [never, 'scratchHead', 'thinking']]
  const shopper: Beat[] = [[0, 'walkA', 'smiling', 'walkB', 12], [d100, 'push', 'smiling'], [lot, 'shock', 'shocked'], [back, 'celebrate', 'smiling']]
  const supplier: Beat[] = [[0, 'idle', 'neutral'], [companies, 'waveA', 'smiling', 'waveB', 14], [whole, 'countA', 'smiling', 'countB', 14], [d89, 'receive', 'smiling'], [c('s8:every'), 'celebrate', 'smiling']]
  const manager: Beat[] = [[0, 'idle', 'neutral'], [d11, 'present', 'smiling'], [c('s9a:before'), 'nervous', 'worried'], [most, 'shrug', 'neutral']]
  const rival: Beat[] = [[0, 'idle', 'smug'], [most, 'confident', 'smug']]
  const sx = lerp(760, 960, span(f, c('s7'), d100 + 10))
  return (
    <g>
      <Stage id="cc" frame={f} />
      <Headline f={f} lines={[[c('s7'), 'A $100 CART', P.ink, 140], [d89, '≈ $89 TO SUPPLIERS', P.coralInk, 124], [lower, 'LOWER PRICES', P.mintInk, 140], [d11, '≈ $11 LEFT', P.mintInk, 150], [gross, 'GROSS MARGIN', P.goldInk, 140],
        [most, 'OTHERS KEEP MORE', P.ink, 140], [running, 'RUNNING COSTS', P.ink, 140], [d9, '−$9', P.coralInk, 160], [d2, '≈ $2 LEFT', P.mintInk, 160], [thin, 'A THIN SLICE', P.ink, 140], [ordinary, 'ORDINARY?', P.ink, 150], [second, 'A SECOND STREAM', P.goldInk, 130]]} />
      <g transform={camera(f, [[c("s9a:keeps"), 1300, 820, 1.08], [c("s9a:bills"), 1580, 820, 1.08], [c("s10:report"), 1430, 460, 1.1], [c("s10:retailers"), 1500, 700, 1.04], [c("s11:wages"), 820, 440, 1.1], [c("s11:electricity"), 1100, 440, 1.1], [c("s11:rent"), 1380, 440, 1.1], [c("s11:trucks"), 1660, 440, 1.1], [c("s11:939"), 1020, 800, 1.06], [c("s12:9"), 1240, 900, 1.08], [c("s14a:taxes"), 940, 720, 1.08], [c("s14a:interest"), 1240, 720, 1.08], [c("s14a:owners"), 1540, 720, 1.08], [c("s14a:ordinary"), 1700, 440, 1.08], [c("s14b:anything"), 960, 540, 1], [c("s14b:second"), 1500, 560, 1.08], [c("s14b:never"), 1600, 900, 1.08], [d89, 1240, 620, 1.03], [lot, 960, 540, 1], [d11, 1240, 620, 1.04], [most, 960, 540, 1], [d2, 1240, 620, 1.08], [thin, 960, 540, 1], [taxes, 960, 540, 1]])}>
        {/* # A: the shopper wheels in a cart; a $100 note; it turns into 100 coins — 89 fly to the supplier; savings go back to the shopper */}
        <g opacity={A}>
          <g opacity={1 - on(f, pay, 10)}>
            <Person f={f} who="buyer" beats={shopper} x={sx} y={1190} s={1.15} life={9} />
            <Cart x={sx + 250} y={1000} s={0.8} fill={on(f, shopping, 20)} />
            <g opacity={on(f, stuff, 6)}>{[0, 1, 2].map((k) => <Prop key={k} id={['grocery-basket', 'shopping-bag', 'pizza'][k]} x={1440 + k * 120} y={640 + (k % 2) * 60} size={110} f={f} />)}</g>
            <Note x={sx + 260} y={560} s={pop(f, d100) * 1.1} o={on(f, d100, 6)} />
          </g>
          <g opacity={on(f, c('s8:first'), 6)}>
            <g opacity={on(f, c('s8:first'), 6)}><CoinGrid f={f} x={1100} y={600} s={0.9} ta={d89} tb={1e9} a={[1660, 960]} /></g>
            <Person f={f} who="worker" beats={supplier} x={1720} y={1190} s={1.15} flip life={4} o={on(f, companies, 8)} />
            <g opacity={on(f, goods, 6)} transform={`translate(1720 420) scale(${pop(f, goods)})`}><Prop id="factory" x={0} y={0} size={210} f={f} /></g>
            <g opacity={on(f, whole, 6) * (1 - on(f, lot, 8))} transform={`translate(1460 380) scale(${pop(f, whole) * 0.8})`}><Calendar x={0} y={0} text="1 YR" s={1.1} /></g>
            {Array.from({ length: Math.round(on(f, d89 + 10, 40) * 9) }, (_, k) => <g key={k} transform={`translate(${1600 + (k % 3) * 46} ${1010 - Math.floor(k / 3) * 22})`}><ellipse cx={0} cy={4} rx={22} ry={8} fill={P.goldD} /><ellipse cx={0} cy={0} rx={22} ry={8} fill={P.gold} /></g>)}
            <g opacity={on(f, saves, 6)}>{Array.from({ length: 5 }, (_, k) => { const t = span(f, back + k * 4, back + k * 4 + 20); return t > 0 && t < 1 ? <Coin key={k} x={lerp(1100, 760, t)} y={600 - Math.sin(t * Math.PI) * 160} s={0.6} /> : null })}
              <g opacity={on(f, back, 6)}><Person f={f} who="buyer" beats={shopper} x={760} y={1190} s={1.05} life={9} /></g>
              <g opacity={on(f, lower, 6)} transform={`translate(1100 ${380 + 40 * on(f, lower, 14)}) scale(${pop(f, lower)})`}><Prop id="price-tag" x={0} y={0} size={150} f={f} /><Prop id="arrow-down" x={110} y={0} size={90} f={f} /></g></g>
          </g>
        </g>
        {/* # B: 11 coins land in Costco's jar (the gross margin); bills wait; the rival store's jar is fuller */}
        <g opacity={B}>
          <Person f={f} who="investor" beats={manager} x={1020} y={1190} s={1.15} life={7} />
          <CoinJar x={1300} y={900} s={1.1} fill={on(f, d11, 20) * 0.78} label={f >= gross ? 'COSTCO' : ''} />
          {Array.from({ length: 11 }, (_, k) => { const t = span(f, d11 - 10 + k * 1.5, d11 + 8 + k * 1.5); return t > 0 && t < 1 ? <Coin key={k} x={lerp(1240, 1300, t)} y={lerp(380, 820, t)} s={0.5} /> : null })}
          <g opacity={on(f, c('s9:left'), 6) * (1 - on(f, gross, 8))} transform="translate(1300 820)"><circle r={120} fill={P.gold} opacity={0.2 + 0.1 * Math.sin(f / 5)} /></g>
          {(() => { const t = span(f, c('s9a:paying'), c('s9a:paying') + 40); return t > 0 && t < 1 ? <g transform={`translate(${lerp(1500, 2000, t)} 470)`}><Prop id="truck" x={0} y={0} size={150} f={f} /><Coin x={-20} y={-80} s={0.5} /></g> : null })()}
          <g opacity={on(f, c('s10:far'), 6)}>{[0, 1, 2].map((k) => <Coin key={k} x={1520 + k * 40} y={640 - ((f - c('s10:far') + k * 9) % 30) * 2} s={0.5} />)}</g>
          <g opacity={on(f, c('s10:aims'), 6)} transform={`translate(1120 720) scale(${pop(f, c('s10:aims')) * 0.8})`}><circle r={60} fill="#FFF" stroke={P.coral} strokeWidth={10} /><circle r={36} fill="none" stroke={P.coral} strokeWidth={10} /><circle r={12} fill={P.coral} /></g>
          <g opacity={on(f, keeps, 6)} transform="translate(1300 560)"><circle r={70} fill={P.mint} opacity={0.25 + 0.15 * Math.sin(f / 5)} /></g>
          <g opacity={on(f, bills, 6) * (1 - on(f, most, 8))} transform={`translate(1580 820) scale(${pop(f, bills)})`}><Prop id="bills-stack" x={0} y={0} size={170} f={f} /></g>
          <g opacity={on(f, most, 6)}>
            <Person f={f} who="owner" beats={rival} x={1800} y={1190} s={1.05} flip life={5} />
            <CoinJar x={1560} y={900} s={1.1} fill={1} label="OTHERS" />
            <g opacity={on(f, report, 6)} transform={`translate(1430 380) scale(${pop(f, report)})`}><Prop id="contract" x={0} y={0} size={150} f={f} /><Label x={0} y={110} text="10-K" size={48} font="Bebas Neue" color={P.ink2} /></g>
            <g opacity={on(f, lowerM, 6)}><path d="M1300 600 L1300 520" stroke={P.mintInk} strokeWidth={8} /><path d="M1560 600 L1560 480" stroke={P.coralInk} strokeWidth={8} /></g>
            <g opacity={on(f, retailers, 6)}>{[0, 1].map((k) => <g key={k} transform={`translate(${1640 + k * 120} 470) scale(0.8)`}><Prop id="shop-mini" x={0} y={0} size={120} f={f} /></g>)}</g>
          </g>
        </g>
        {/* # C: from Costco's 11 coins, 9 fly to wages, power, rent and trucks for 939 warehouses; 2 are left — a thin slice */}
        <g opacity={Cc}>
          <CoinJar x={1240} y={960} s={1.1} fill={lerp(0.78, 0.14, on(f, d9, 24))} label="COSTCO" />
          {[[wages, 'money-bag', 'WAGES'], [electricity, 'lightning', 'POWER'], [rent, 'house', 'BUILDINGS'], [trucks, 'truck', 'TRUCKS']].map(([at, id, t], k) => { const x = 820 + k * 280
            return <g key={k} opacity={on(f, at as number, 6) * (1 - on(f, d2, 10))}><g transform={`translate(${x} 420) scale(${pop(f, at as number)})`}><circle r={90} fill={P.card} /><Prop id={id as string} x={0} y={-4} size={120} f={f} /><Label x={0} y={140} text={t as string} size={46} font="Bebas Neue" color={P.ink} /></g>
              {(() => { const tt = span(f, (at as number) + 2, (at as number) + 22); return tt > 0 && tt < 1 ? <Coin x={lerp(1240, x, tt)} y={lerp(700, 470, tt) - Math.sin(tt * Math.PI) * 120} s={0.6} /> : null })()}</g> })}
          <g opacity={on(f, d939, 6) * (1 - on(f, d2, 10))}>{Array.from({ length: 10 }, (_, k) => <g key={k} opacity={on(f, d939 + k * 1.5, 4)}><Warehouse x={760 + (k % 5) * 130} y={720 + Math.floor(k / 5) * 110} s={0.17} /></g>)}<Label x={1020} y={950} text="× 939" size={56} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, cart100, 6)} transform={`translate(1600 980) scale(${pop(f, cart100) * 0.55})`}><Cart x={0} y={0} fill={1} /></g>
          <g opacity={on(f, big, 6)} transform={`translate(1580 560) scale(${pop(f, big)})`}><Warehouse x={0} y={0} s={0.55} /></g>
          <g opacity={on(f, thin, 6)} transform={`translate(1240 470) scale(${pop(f, thin)})`}><circle r={150} fill={P.coral} /><path d="M0 0 L0 -150 A150 150 0 0 1 18.8 -148.8 Z" fill={P.mint} /><circle r={150} fill="none" stroke={P.ink2} strokeWidth={4} /><Prop id="magnifier" x={70} y={-150} size={110} f={f} /></g>
        </g>
        {/* # D: the 2 coins split three ways; an ordinary shop… then a second stream of money pours from the card into Costco */}
        <g opacity={D}>
          <g opacity={1 - on(f, anyth, 8)}>
            <g transform={`translate(1240 420) scale(${pop(f, c('s14a:two')) * lerp(1.3, 0.8, on(f, c('s14a:own'), 14))})`}>{[0, 1].map((k) => <circle key={k} cx={-24 + k * 48} cy={0} r={22} fill={P.gold} />)}</g>
            <g opacity={on(f, c('s14a:company'), 6)}>{[0, 1, 2].map((k) => <Mini key={k} look={['investor', 'owner', 'hero'][k]} x={1480 + k * 70} y={960} scale={0.45} frame={f} seed={k + 90} />)}</g>
            {[[taxes, 'tax-form', 'TAXES'], [interest, 'bank', 'INTEREST'], [owners, 'stock-certificate', 'OWNERS']].map(([at, id, t], k) => <g key={k} opacity={on(f, at as number, 6)}>
              <path d={`M1240 450 L${940 + k * 300} 640`} stroke={P.goldInk} strokeWidth={5} strokeDasharray="12 10" />
              <g transform={`translate(${940 + k * 300} 720) scale(${pop(f, at as number)})`}><circle r={90} fill={P.card} /><Prop id={id as string} x={0} y={-4} size={110} f={f} /><Label x={0} y={140} text={t as string} size={48} font="Bebas Neue" color={P.ink} /></g></g>)}
            <g opacity={on(f, ordinary, 6)} transform={`translate(1700 420) scale(${pop(f, ordinary)})`}><Prop id="shop-mini" x={0} y={0} size={160} f={f} /></g>
          </g>
          <g opacity={on(f, anyth, 6)}>
            <Warehouse x={1040} y={920} s={1} label="COSTCO" />
            <MemberCard x={1640} y={500} s={pop(f, second)} o={on(f, second, 6)} r={8} glow={1} />
            {Array.from({ length: 6 }, (_, k) => { const t = ((f - second) / 30 + k / 6) % 1; return f >= second ? <Coin key={k} x={lerp(1560, 1180, t)} y={lerp(560, 760, t) - Math.sin(t * Math.PI) * 80} s={0.55} o={Math.sin(t * Math.PI)} /> : null })}
            <g opacity={on(f, shoppers, 6)}><Mini look="buyer" x={1640} y={1000} scale={0.9} frame={f} seed={77} /><g opacity={on(f, never, 6)} transform="translate(1690 780)"><circle r={44} fill={P.white} /><Label x={0} y={22} text="?" size={64} font="Bebas Neue" color={P.navy1} /></g></g>
          </g>
        </g>
        <Person f={f} who="hero" beats={hero} x={320} y={1190} s={1.4} life={2} />
      </g>
      <Vignette id="cc" />
    </g>
  )
}

export const CO_CART = makePiece('co-cart', 'Long: a $100 cart — ≈ $89 to suppliers, ≈ $11 gross margin, ≈ $9 running costs (939 warehouses), ≈ $2 left; a second stream of money', { mood: 'light', Component: CartScene,
  beats: ["s7:shopping", "s7:100", "s7:stuff", "s8:pay", "s8:companies", "s8:goods", "s8:whole", "s8:89", "s8a:lot", "s8a:saves", "s8a:back", "s8a:lower", "s9:anything", "s9:11", "s9a:gross", "s9a:keeps", "s9a:bills", "s10:most", "s10:report", "s10:lower", "s10:retailers", "s11:running", "s11:wages", "s11:electricity", "s11:rent", "s11:trucks", "s11:939", "s12:9", "s13:100", "s13:2", "s14:big", "s14:thin", "s14a:taxes", "s14a:interest", "s14a:owners", "s14a:ordinary", "s14b:anything", "s14b:second", "s14b:shoppers", "s14b:never", "s7", "s8a:hands", "s9a:11", "s10:than", "s14b:costco", "s14b:because", "s8:every", "s9a:before", "s8:first", "s9:left", "s9a:paying", "s10:far", "s10:aims", "s14a:two", "s14a:own", "s14a:company"],
  sfx: [['s7:100', 'pop', 0.4], ['s8:89', 'whoosh', 0.4], ['s9:11', 'coin', 0.4], ['s12:9', 'whoosh', 0.4], ['s13:2', 'ding', 0.5], ['s14b:second', 'chime', 0.5]] })
