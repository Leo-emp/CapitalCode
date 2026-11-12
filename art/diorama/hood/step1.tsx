// ---------------------------------------------------------------- s18–s28: step one — your order gets sold.
// A) Leo's phone on the left, the stock exchange on the right; a dashed road from the phone to the exchange. At the
//    exchange, buyers and sellers post prices and a matching pair trades (a flash). "Rarely goes there first": the
//    road gets a cross.
// B) The road bends to a dark trading tower — the market maker — which buys from one person and sells to another.
//    Ten order slips from ten phones: nine fly to a handful of towers, one to the exchange (more than 90%, SEC).
//    The towers get their names: Citadel Securities, Virtu, Jane Street.
// C) Coins fly from the towers to the app ("they pay the app"), labelled payment for order flow; Leo's order slip
//    gets a price tag — something the app can sell.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { HSpot as Spot } from './kit'
import { Headline, Label, Person, fly, win, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Mini } from '../../rig/Mini'
import { AppPhone, Cent, Exchange, Path, Slip, Tower, XMark } from './kit'

const GROUND = 920
// # a small price card a buyer or seller holds up
const PriceCard: React.FC<{ x: number; y: number; t: string; color: string; o?: number; flash?: number }> = ({ x, y, t, color, o = 1, flash = 0 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    {flash > 0 && <circle r={70} fill={P.gold} opacity={0.4 * flash} />}
    <rect x={-70} y={-28} width={140} height={56} rx={10} fill={color} /><text x={0} y={14} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 36px "Bebas Neue"' }}>{t}</text>
  </g>
)

const Step1: React.FC<PieceProps> = ({ f, c }) => {
  const leos = c("s18:leo's"), doesnt = c("s18:doesn't"), go18 = c('s18:go'), exchange18 = c('s18:exchange')
  const picture = c('s19:picture'), landing = c('s19:landing'), floor = c('s19:floor'), york = c('s19:york')
  const public20 = c('s20:public'), buyers = c('s20:buyers'), sellers = c('s20:sellers'), prices20 = c('s20:prices'), match = c('s20:match'), traded = c('s20:traded')
  const small21 = c('s21:small'), rarely = c('s21:rarely'), first = c('s21:first')
  const instead = c('s22:instead'), sends = c('s22:sends'), firm22 = c('s22:firm'), maker22 = c('s22:maker')
  const always = c('s23:always'), buy23 = c('s23:buy'), anyone = c('s23:anyone'), sell23 = c('s23:sell')
  const d90 = c('s24:90'), small24 = c('s24:small'), handful = c('s24:handful'), firms24 = c('s24:firms'), sec = c('s24:sec')
  const names = c('s25:names'), citadel = c('s25:citadel'), virtu = c('s25:virtu'), jane = c('s25:jane')
  const heres = c("s26:here's"), never26 = c('s26:never'), pay26 = c('s26:pay'), app26 = c('s26:app'), orders26 = c('s26:orders')
  const payment = c('s27:payment'), name27 = c('s27:name'), flow = c('s27:flow')
  const step28 = c('s28:step'), tap28 = c('s28:tap'), becomes = c('s28:becomes'), sell28 = c('s28:sell')
  const AB = instead - 4, BC = heres - 4
  const A = win(f, leos - 30, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  const B1 = win(f, AB, d90 - 6), B2 = on(f, d90 - 6, 10)
  return (
    <g>
      <Stage id="hd-step1" frame={f} />
      <Spot f={f} at={c("s23:wants#2")} x={1700} y={780} rx={160} ry={220} />
      <Spot f={f} at={c("s20:exchange")} x={1380} y={700} rx={320} ry={260} />
      <Spot f={f} at={c("s23:firm")} x={1060} y={640} rx={240} ry={300} />
      <Spot f={f} at={c("s24")} x={1060} y={640} rx={240} ry={300} />
      <Spot f={f} at={c("s24:leo's")} x={1200} y={760} rx={420} ry={200} />
      <Spot f={f} at={c("s25:robinhood")} x={1200} y={640} rx={520} ry={280} />
      <Spot f={f} at={c("s26:most")} x={360} y={560} rx={200} ry={260} />
      <Spot f={f} at={c("s27:name")} x={860} y={330} rx={300} ry={90} />
      <Headline f={f} lines={[[leos, 'STEP 1: YOUR ORDER GETS SOLD', P.ink, 92], [york, 'THE NEW YORK STOCK EXCHANGE?', P.ink, 92], [public20, 'A BIG PUBLIC MARKET', P.ink, 100], [rarely, 'RARELY THERE FIRST', P.coralInk, 100], [maker22, 'A MARKET MAKER', P.ink, 108], [d90, 'MORE THAN 90% OF SMALL ORDERS', P.ink, 92], [citadel, 'A HANDFUL OF FIRMS', P.ink, 100], [pay26, 'THEY PAY THE APP', P.ink, 104], [payment, '', P.ink], [becomes, 'YOUR TAP, FOR SALE', P.ink, 104]]} />

      {/* # A) the road to the exchange, the public market, the cross */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <AppPhone x={260} y={560} s={0.85} shares="BUY 100" />
        <g opacity={on(f, exchange18 - 4, 10)}><Exchange x={1380} y={GROUND} s={1.0} f={f} /></g>
        <Path pts={[[380, 520], [1100, 520]]} p={on(f, go18, 24)} />
        {(() => { const t = span(f, go18, landing + 10); return <Slip x={lerp(420, 980, t * (1 - on(f, rarely, 10)))} y={480 - Math.sin(t * Math.PI) * 40} s={0.6} /> })()}
        <g opacity={on(f, york, 8)}><Label x={1380} y={GROUND + 70} text="NEW YORK STOCK EXCHANGE" size={48} font="Bebas Neue" color={P.ink} /></g>
        {/* # buyers and sellers post prices; a matching pair trades */}
        <g opacity={on(f, buyers, 8)}>
          <Mini look="investorF" x={1160} y={GROUND} scale={0.75} frame={f} seed={3} mood="happy" />
          <PriceCard x={1160} y={GROUND - 270} t="BUY $20" color={P.skyD} o={on(f, prices20, 8)} flash={on(f, match, 6) * (1 - on(f, traded + 10, 8))} />
        </g>
        <g opacity={on(f, sellers, 8)}>
          <Mini look="worker" x={1600} y={GROUND} scale={0.75} frame={f} seed={4} mood="happy" />
          <PriceCard x={1600} y={GROUND - 270} t="SELL $20" color={P.coral} o={on(f, prices20, 8)} flash={on(f, match, 6) * (1 - on(f, traded + 10, 8))} />
        </g>
        <XMark x={740} y={520} o={Math.max(on(f, exchange18 + 8, 8) * (1 - on(f, picture, 8)), on(f, rarely, 8))} size={52} />
      </g>}

      {/* # B) the market maker; ten orders, nine to a handful of towers; their names */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        {B1 > 0 && <g opacity={B1}>
          <AppPhone x={260} y={560} s={0.85} shares="BUY 100" />
          <g opacity={on(f, instead, 10)} transform={`translate(0 ${lerp(40, 0, pop(f, instead, 16))})`}><Tower x={1060} y={GROUND} s={0.95} f={f} sign="MARKET MAKER" /></g>
          <Path pts={[[380, 520], [900, 520]]} p={on(f, sends, 20)} />
          {(() => { const fl = fly(f, sends + 6, [420, 480], [1060, GROUND - 120], 26, 120); return f >= sends + 6 && fl.t < 1 ? <Slip x={fl.x} y={fl.y} s={0.6} /> : null })()}
          {/* # always ready to buy from a seller and sell to a buyer */}
          <g opacity={on(f, buy23, 8)}><Mini look="worker" x={1460} y={GROUND} scale={0.8} frame={f} seed={21} mood="happy" />
            {(() => { const fl = fly(f, buy23 + 4, [1440, GROUND - 260], [1120, GROUND - 300], 20, 80); return <Cent x={fl.x} y={fl.y} r={26} t="$" o={fl.t < 1 ? 1 : 0} /> })()}</g>
          <g opacity={on(f, sell23, 8)}><Mini look="investorF" x={1700} y={GROUND} scale={0.8} frame={f} seed={22} mood="happy" />
            {(() => { const fl = fly(f, sell23 + 4, [1120, GROUND - 380], [1690, GROUND - 260], 22, 100); return <g opacity={fl.t < 1 ? 1 : 0}><rect x={fl.x - 56} y={fl.y - 22} width={112} height={44} rx={6} fill={P.paper} stroke={P.edge} strokeWidth={3} /><text x={fl.x} y={fl.y + 10} textAnchor="middle" fill={P.navy0} style={{ font: '400 28px "Bebas Neue"' }}>SHARES</text></g> })()}</g>
          <g opacity={on(f, always, 8)}><Label x={1060} y={GROUND + 70} text="ALWAYS READY TO BUY AND SELL" size={44} font="Bebas Neue" color={P.ink2} /></g>
        </g>}
        {B2 > 0 && <g opacity={B2}>
          {/* # ten phones on the left; nine slips go to the towers, one to the exchange */}
          {Array.from({ length: 10 }, (_, k) => <g key={k} opacity={on(f, d90 - 6 + k, 6)}><rect x={150} y={180 + k * 68} width={60} height={56} rx={10} fill="#111A2E" /><rect x={156} y={186 + k * 68} width={48} height={44} rx={6} fill="#F7FAFF" /></g>)}
          {Array.from({ length: 10 }, (_, k) => { const toEx = k === 9, at = small24 + k * 3, to: [number, number] = toEx ? [1700, 300] : [[860, 1200, 1540][k % 3], GROUND - 200]
            const fl = fly(f, at, [230, 210 + k * 68], to, 24, 60); return f >= at && fl.t < 1 ? <Slip key={k} x={fl.x} y={fl.y} s={0.35} /> : null })}
          {[0, 1, 2].map((k) => { const x = [860, 1200, 1540][k], nm = ['CITADEL SECURITIES', 'VIRTU', 'JANE STREET'][k], at = [citadel, virtu, jane][k]
            return <g key={k} opacity={on(f, handful - 6 + k * 3, 10)}><Tower x={x} y={GROUND} s={0.6} f={f + k * 7} sign={f >= at ? nm : 'MARKET MAKER'} /></g> })}
          <g opacity={on(f, small24 + 30, 10)}><Exchange x={1760} y={430} s={0.35} f={f} /></g>
          <g opacity={on(f, sec, 8)}><Label x={1200} y={GROUND + 70} text="SOURCE: SEC" size={40} font="Bebas Neue" color={P.ink2} /></g>
        </g>}
      </g>}

      {/* # C) the towers pay the app; the order gets a price tag */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <AppPhone x={360} y={560} s={1.0} />
        {[0, 1, 2].map((k) => <Tower key={k} x={[1040, 1340, 1640][k]} y={GROUND} s={0.55} f={f + k * 7} sign={['CITADEL', 'VIRTU', 'JANE ST.'][k]} />)}
        {f >= pay26 && [0, 1, 2, 3, 4, 5].map((k) => { const t = ((f - pay26 + k * 9) % 54) / 54, fx = [1040, 1340, 1640][k % 3]
          return <Cent key={k} x={lerp(fx, 440, t)} y={lerp(GROUND - 400, 470, t) - Math.sin(t * Math.PI) * 120} r={24} t="$" o={Math.min(1, t * 6) * (1 - Math.max(0, t - 0.85) * 6)} /> })}
        {f >= pay26 && [0, 1].map((k) => { const t = ((f - pay26 + k * 27) % 54) / 54, tx = [1040, 1640][k]
          return <Slip key={k} x={lerp(440, tx - 150, t)} y={lerp(700, GROUND - 60, t)} s={0.35} o={Math.min(1, t * 6) * (1 - Math.max(0, t - 0.85) * 6)} /> })}
        <g opacity={on(f, payment, 8) * (1 - on(f, becomes, 8))} transform="translate(560 800) rotate(-4)"><rect x={-260} y={-34} width={520} height={68} rx={14} fill={P.gold} /><text x={0} y={14} textAnchor="middle" fill={P.navy0} style={{ font: '400 44px "Bebas Neue"', letterSpacing: 2 }}>PAYMENT FOR ORDER FLOW</text></g>
        <g opacity={on(f, step28, 10)} transform={`translate(720 ${lerp(560, 500, on(f, becomes, 14))})`}><Slip x={0} y={0} s={1.4} tag={on(f, sell28, 8)} /></g>
      </g>}
      <Vignette id="hd-step1" />
    </g>
  )
}

const BEATS = ["s23:wants#2", "s20:exchange", "s23:firm", "s24", "s24:leo's", "s25:robinhood", "s26:most", "s27:name", "s18:leo's", "s18:doesn't", 's18:go', 's18:exchange', 's19:picture', 's19:landing', 's19:york', 's20:public', 's20:buyers', 's20:sellers', 's20:prices', 's20:match', 's21:small', 's21:rarely', 's22:instead', 's22:sends', 's22:firm', 's22:maker', 's23:always', 's23:buy', 's23:sell', 's24:90', 's24:small', 's24:handful', 's24:sec', 's25:citadel', 's25:virtu', 's25:jane', "s26:here's", 's26:pay', 's26:app', 's27:payment', 's27:flow', 's28:step', 's28:becomes', 's28:sell']
export const HD_STEP1 = makePiece('hd-step1', 'PFOF long step 1: Leo\'s order road to the New York Stock Exchange (a public market where buyers and sellers post prices and matching orders trade) gets a cross — it goes to a market maker\'s tower instead (always ready to buy and sell); 9 of 10 small orders go to a handful of towers (SEC: more than 90%): Citadel Securities, Virtu, Jane Street; coins fly from the towers to the app — payment for order flow; Leo\'s order slip gets a price tag', {
  mood: 'light', Component: Step1, beats: BEATS,
  sfx: [['s18:go', 'whoosh', 0.2], ['s20:match', 'ding', 0.2], ['s21:rarely', 'swish', 0.2], ['s22:sends', 'whoosh', 0.2], ['s24:90', 'pop', 0.2], ['s26:pay', 'coin', 0.3], ['s28:sell', 'pop', 0.25]] })
