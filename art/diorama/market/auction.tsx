// ---------------------------------------------------------------- s25–s33: step three, the market is an auction (afternoon: the buttonwood tree → the auction hall).
// A) You hold your share: an arrow back to Rosa's bakery is crossed; another investor steps up instead; then the scene
//    becomes a great auction hall — paddles up, a gavel, buy/sell arrows going back and forth, a clock that never stops.
// B) 1792: an old buttonwood tree with 24 brokers in top hats around it, a signed agreement; the tree's place turns into
//    the columns of the NEW YORK STOCK EXCHANGE.
// C) Stock vs share: one certificate = a share; a whole pile = stock.
// D) The order board on computer screens: a green BID column and a red ASK column; the chips slide together, a spark,
//    the trade sets the latest price. 99 vs 101; one buyer in a hurry pays 101 → the screen shows 101.
// E) Your phone: BUY is tapped; the order envelope flies to the broker and out to a seller; a stopwatch: a split second.
// F) After the IPO: your coin goes to the investor who sold you the share; the arrow to Rosa's bakery is crossed.
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { BB, Bakery, Buttonwood, Coin, Folk, Label, M, No, Phone, Share, Town } from './kit'

const G = 940

const HallBg: React.FC<{ f: number }> = ({ f }) => (
  <g>
    <rect x={-100} y={-100} width={2200} height={1300} fill="#E9DCC6" />
    {Array.from({ length: 7 }, (_, k) => <g key={k}><rect x={90 + k * 290} y={120} width={70} height={G - 120} fill="#DCCAAA" /><rect x={70 + k * 290} y={100} width={110} height={30} fill="#CDB997" /></g>)}
    <path d={`M-100 100 L2100 100 L2100 40 L-100 40 Z`} fill="#CDB997" />
    {[560, 1360].map((x) => <g key={x}><line x1={x} y1={40} x2={x} y2={150} stroke="#3B3A40" strokeWidth={4} /><circle cx={x} cy={170} r={30} fill={M.lamp} /><circle cx={x} cy={170} r={80 + 4 * Math.sin(f / 18)} fill={M.lamp} opacity={0.16} /></g>)}
    <rect x={-100} y={G} width={2200} height={300} fill="#8E6B4E" />
    {Array.from({ length: 12 }, (_, k) => <rect key={k} x={k * 180} y={G} width={4} height={300} fill="#7A5A40" />)}
  </g>
)
const Chip: React.FC<{ x: number; y: number; text: string; color: string; o?: number; s?: number }> = ({ x, y, text, color, o = 1, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><rect x={-90} y={-32} width={180} height={64} rx={14} fill={color} /><text y={16} textAnchor="middle" fill="#FFFFFF" style={BB(48)}>{text}</text></g>
)

const Auction: React.FC<PieceProps> = ({ f, c }) => {
  const sell25 = c('s25:sell'), not25 = c('s25:not'), back25 = c('s25:back'), another25 = c('s25:another'), investor25 = c('s25:investor')
  const market26 = c('s26:market'), stock28 = c('s28:stock'), share28 = c('s28:share'), price31 = c('s31:price'), part33 = c('s33:part'), giant26 = c('s26:giant'), auction26 = c('s26:auction'), never26 = c('s26:never'), stops26 = c('s26:stops'), buy26 = c('s26:buy'), sell26 = c('s26:sell'), other26 = c('s26:other')
  const started27 = c('s27:started'), y1792 = c('s27:1792'), n24 = c('s27:24'), brokers27 = c('s27:brokers'), york27 = c('s27:york'), signed27 = c('s27:signed'), trade27 = c('s27:trade'), became27 = c('s27:became'), exchange27 = c('s27:exchange')
  const way28 = c('s28:way'), same28 = c('s28:same'), share28b = c('s28:share#2'), piece28 = c('s28:piece'), means28 = c('s28:means'), general28 = c('s28:general')
  const today29 = c('s29:today'), computers29 = c('s29:computers'), buyers29 = c('s29:buyers'), highest29 = c('s29:highest'), bid29 = c('s29:bid'), sellers29 = c('s29:sellers'), lowest29 = c('s29:lowest'), ask29 = c('s29:ask')
  const meet30 = c('s30:meet'), happens30 = c('s30:happens'), becomes30 = c('s30:becomes'), latest30 = c('s30:latest')
  const n99 = c('s31:99'), n101 = c('s31:101'), hurry31 = c('s31:hurry'), pays31 = c('s31:pays'), screen31 = c('s31:screen'), n101c = c('s31:101#3')
  const tap32 = c('s32:tap'), app32 = c('s32:app'), broker32 = c('s32:broker'), order32 = c('s32:order'), matched32 = c('s32:matched'), seller32 = c('s32:seller'), split32 = c('s32:split')
  const miss33 = c('s33:miss'), ipo33 = c('s33:ipo'), company33 = c('s33:company'), trades33 = c('s33:trades'), money33 = c('s33:money'), investor33 = c('s33:investor'), sold33 = c('s33:sold'), not33 = c('s33:not'), bakery33 = c('s33:bakery')

  const AB = started27 - 6, BC = way28 - 4, CD = today29 - 6, DE = tap32 - 6, EF = miss33 - 6
  const A = win(f, 0, AB), B = win(f, AB - 8, BC), Cc = win(f, BC - 8, CD), D = win(f, CD - 8, DE), E = win(f, DE - 8, EF), F = on(f, EF - 8, 10)

  const aBeats: Beat[] = [[0, 'hold', 'thinking'], [not25, 'crossNoA', 'neutral', 'crossNoB', 12], [another25, 'point', 'smiling'], [market26, 'explain', 'smiling'], [auction26, 'idle', 'smiling'], [buy26, 'holdUp', 'smiling']]
  const invBeats: Beat[] = [[0, 'idle', 'neutral'], [investor25, 'waveA', 'smiling', 'waveB', 14], [sell26, 'holdUp', 'smiling']]
  const hall = on(f, giant26 - 4, 12)
  const meet = on(f, meet30, 14)
  const dBuyer: Beat[] = [[CD, 'idle', 'neutral'], [hurry31, 'runA', 'worried', 'runB', 8], [pays31, 'offer', 'smiling'], [screen31, 'celebrate', 'smiling']]
  const eBeats: Beat[] = [[DE, 'phone', 'neutral'], [tap32, 'phone', 'smiling'], [matched32, 'thumbsUp', 'smiling'], [part33, 'pointUp', 'neutral']]
  const fBeats: Beat[] = [[EF, 'explain', 'neutral'], [money33, 'offer', 'smiling'], [not33, 'crossNoA', 'neutral', 'crossNoB', 12]]
  const orderT = span(f, order32, matched32 + 6)
  const price = f >= n101c ? '101' : f >= pays31 ? '101' : f >= n99 ? '—' : ''

  return (
    <g>
      <Town id="mk-a-base" f={f} mood="noon" />
      {/* # A) not back to Rosa: another investor; the auction hall */}
      {A > 0 && <g opacity={A}>
        <g opacity={1 - hall}>
          <Town id="mk-a-a" f={f} mood="noon" />
          <Bakery x={1500} y={G} s={0.8} f={f} o={on(f, back25 - 6, 10) * (1 - on(f, another25, 10))} />
          <g opacity={win(f, back25, another25 + 4, 6)}><path d="M640 520 Q 1000 380 1320 520" fill="none" stroke={M.ink2} strokeWidth={8} strokeDasharray="18 12" /><No x={1000} y={450} r={110} o={on(f, back25 + 4, 8)} /></g>
          <Person f={f} who="investor" beats={invBeats} x={1350} y={G} s={0.85} o={on(f, another25, 10)} />
        </g>
        <g opacity={hall}>
          <HallBg f={f} />
          {/* podium + gavel */}
          <g transform={`translate(1500 ${G})`}><rect x={-120} y={-260} width={240} height={260} fill={M.woodD} /><rect x={-150} y={-280} width={300} height={30} rx={8} fill={M.wood} />
            <g transform={`translate(60 -300) rotate(${-30 + 30 * Math.abs(Math.sin(f / 7))})`}><rect x={-6} y={-60} width={12} height={70} fill={M.woodD} /><rect x={-36} y={-84} width={72} height={34} rx={8} fill={M.wood} /></g></g>
          {Array.from({ length: 9 }, (_, k) => { const up = Math.sin(f / 9 + k * 1.7) > 0.3 && f >= auction26
            return <g key={k}><Folk x={700 + (k % 5) * 130} y={G - 20 * Math.floor(k / 5)} s={2.2} c={['#C27A5E', M.teal, '#7C6BAA', M.brick, '#5E8F6E'][k % 5]} />
              {up && <g transform={`translate(${700 + (k % 5) * 130 + 34} ${G - 230 - 20 * Math.floor(k / 5)})`}><rect x={-4} y={0} width={8} height={70} fill={M.woodD} /><circle r={26} fill={k % 2 ? M.green : M.red} /></g>}</g> })}
          <g opacity={on(f, never26, 8)} transform="translate(300 380)"><circle r={90} fill={M.paper} stroke={M.woodD} strokeWidth={10} /><line x1={0} y1={0} x2={0} y2={-64} stroke={M.ink} strokeWidth={8} strokeLinecap="round" transform={`rotate(${f * 6})`} /><line x1={0} y1={0} x2={44} y2={0} stroke={M.ink} strokeWidth={8} strokeLinecap="round" transform={`rotate(${f * 0.5})`} />
            <g opacity={on(f, stops26, 6)}><text y={140} textAnchor="middle" fill={M.ink} style={BB(44)}>NEVER STOPS</text></g></g>
          <g opacity={on(f, buy26, 8)}><path d="M720 460 L1080 460 l-30 -24 M1080 460 l-30 24" fill="none" stroke={M.green} strokeWidth={12} strokeLinecap="round" /><text x={900} y={440} textAnchor="middle" fill={M.greenD} style={BB(46)}>BUY</text></g>
          <g opacity={on(f, sell26, 8)}><path d="M1080 540 L720 540 l30 -24 M720 540 l30 24" fill="none" stroke={M.red} strokeWidth={12} strokeLinecap="round" /><text x={900} y={600} textAnchor="middle" fill={M.redD} style={BB(46)}>SELL</text></g>
          <g opacity={on(f, other26, 8)}><Label x={900} y={300} text="INVESTOR ↔ INVESTOR" size={54} fill={M.ink} ink="#FFFFFF" /></g>
        </g>
        <g opacity={1 - hall}><Person f={f} who="hero" beats={aBeats} x={360} y={G} s={0.85} /><Share x={560} y={500} s={0.6} r={-6} o={on(f, sell25 - 6, 8)} /></g>
      </g>}

      {/* # B) 1792 under the buttonwood tree → the exchange */}
      {B > 0 && <g opacity={B}>
        <Town id="mk-a-b" f={f} mood="morning" roofs={false} />
        <g opacity={1 - on(f, became27, 12)}>
          <Buttonwood x={960} y={G} s={1.1} f={f} />
          {Array.from({ length: 24 }, (_, k) => { const a = (k / 24) * Math.PI * 2, rx = 520, ry = 70
            return <Folk key={k} x={960 + Math.cos(a) * rx} y={G - 20 + Math.sin(a) * ry} s={1.5} hat c={['#4A4A58', '#5A4636', '#3E4E62'][k % 3]} o={on(f, n24 + (k / 24) * 20, 6)} /> })}
          <g opacity={on(f, y1792, 10)}><Label x={300} y={300} text="1792" size={90} fill={M.ink} ink="#FFFFFF" /></g>
          <g opacity={on(f, brokers27, 8)}><Label x={960} y={G + 70} text={f >= york27 ? '24 BROKERS · NEW YORK' : '24 BROKERS'} size={50} /></g>
          <g opacity={on(f, signed27, 10)} transform={`translate(1580 ${470 - 10 * pop(f, signed27, 12)}) rotate(6)`}><rect x={-130} y={-160} width={260} height={320} rx={10} fill="#F3E6C8" />
            {[0, 1, 2, 3, 4].map((k) => <rect key={k} x={-100} y={-120 + k * 34} width={200} height={8} rx={4} fill="#C9B48E" />)}
            <path d={`M-90 100 q30 -30 60 0 t60 0 t60 0`} fill="none" stroke={M.ink} strokeWidth={5} /><text y={-130} textAnchor="middle" fill={M.ink} style={BB(30)}>AGREEMENT</text></g>
          <g opacity={on(f, trade27, 8)}>{[0, 1, 2].map((k) => { const t = ((f - trade27) / 40 + k / 3) % 1; return <rect key={k} x={lerp(500, 1400, t)} y={G - 250 - 40 * Math.sin(t * Math.PI * 2)} width={40} height={28} rx={4} fill={M.paper} stroke={M.teal} strokeWidth={3} /> })}</g>
        </g>
        <g opacity={on(f, became27, 12)}>
          <g transform={`translate(960 ${G})`}><rect x={-520} y={-60} width={1040} height={60} fill={M.stoneD} /><rect x={-480} y={-460} width={960} height={400} fill={M.cream} />
            {Array.from({ length: 6 }, (_, k) => <rect key={k} x={-430 + k * 168} y={-450} width={60} height={390} fill="#E4D3B5" />)}
            <path d="M-540 -460 L0 -620 L540 -460 Z" fill={M.stone} /><rect x={-520} y={-480} width={1040} height={26} fill="#BBAE96" /></g>
          <g opacity={on(f, exchange27, 8)}><Label x={960} y={260} text="NEW YORK STOCK EXCHANGE" size={60} fill={M.ink} ink="#FFFFFF" /></g>
        </g>
      </g>}

      {/* # C) a share vs stock */}
      {Cc > 0 && <g opacity={Cc}>
        <Town id="mk-a-c" f={f} mood="noon" />
        <g opacity={on(f, share28, 10)}><Share x={620} y={540 - 10 * pop(f, piece28, 12)} s={1.2} big="1 SHARE" /><g opacity={on(f, piece28, 8)}><Label x={620} y={760} text="ONE PIECE" size={54} /></g></g>
        <g opacity={0.35 * on(f, stock28, 10) + 0.65 * on(f, means28, 10)}>{Array.from({ length: 7 }, (_, k) => <Share key={k} x={1250 + (k % 3) * 70 - 70} y={600 - Math.floor(k / 3) * 70 - k * 6} s={0.7} r={-8 + k * 3} big="SHARE" />)}
          <g opacity={on(f, general28, 8)}><Label x={1250} y={760} text="STOCK = OWNING PIECES" size={54} /></g></g>
        <g opacity={on(f, share28b, 8) * (1 - on(f, means28, 8))}><text x={960} y={560} textAnchor="middle" fill={M.ink2} style={BB(110)}>≈</text></g>
      </g>}

      {/* # D) the order book on screens: bid vs ask; 99 / 101 */}
      {D > 0 && <g opacity={D}>
        <HallBg f={f} />
        <g opacity={on(f, computers29, 10)} transform="translate(960 520)">
          <rect x={-560} y={-300} width={1120} height={520} rx={30} fill="#22252E" /><rect x={-530} y={-270} width={1060} height={460} rx={20} fill="#2E3240" />
          <text x={-280} y={-200} textAnchor="middle" fill={M.tealL} style={BB(56)}>{f >= bid29 ? 'BID (BUYERS)' : 'BUYERS'}</text>
          <text x={280} y={-200} textAnchor="middle" fill="#F3A79E" style={BB(56)}>{f >= ask29 ? 'ASK (SELLERS)' : 'SELLERS'}</text>
          {/* bid chips */}
          <g opacity={on(f, buyers29, 8)}>{[0, 1, 2].map((k) => <Chip key={k} x={-280 + (k === 0 ? 180 * meet : 0)} y={-100 + k * 90} text={f >= n99 ? ['$99', '$98', '$97'][k] : ['$99', '$98', '$97'][k]} color={M.greenD} o={k === 0 ? 1 : on(f, highest29, 8)} s={k === 0 ? 1 + 0.08 * on(f, highest29, 8) : 0.9} />)}</g>
          <g opacity={on(f, sellers29, 8)}>{[0, 1, 2].map((k) => <Chip key={k} x={280 - (k === 0 ? 180 * meet : 0)} y={-100 + k * 90} text={['$101', '$102', '$103'][k]} color={M.redD} o={k === 0 ? 1 : on(f, lowest29, 8)} s={k === 0 ? 1 + 0.08 * on(f, lowest29, 8) : 0.9} />)}</g>
          {f >= happens30 && f < n99 && <g opacity={1 - span(f, happens30 + 20, happens30 + 34)}><circle cx={0} cy={-100} r={70 * span(f, happens30, happens30 + 12)} fill={M.butter} opacity={0.8} /><text y={-84} textAnchor="middle" fill={M.ink} style={BB(52)}>TRADE!</text></g>}
          <g opacity={win(f, price31, screen31 + 10, 6) * (0.5 + 0.5 * Math.sin(f / 4))}><rect x={-176} y={106} width={352} height={88} rx={16} fill="none" stroke={M.butter} strokeWidth={6} /></g>
          <g opacity={on(f, latest30, 8)}><rect x={-160} y={120} width={320} height={60} rx={12} fill="#11131A" /><text y={164} textAnchor="middle" fill={M.butter} style={BB(50)}>{`LAST PRICE: $${price || '100'}`}</text></g>
        </g>
        <Person f={f} who="buyer" beats={dBuyer} x={lerp(200, 330, on(f, hurry31, 20))} y={G} s={0.8} o={on(f, n101 - 4, 10)} />
        {f >= pays31 && (() => { const t = span(f, pays31, pays31 + 20); return t < 1 ? <Coin x={lerp(420, 1240, t)} y={lerp(620, 420, t)} s={0.6} text="$101" /> : null })()}
        <g opacity={on(f, becomes30, 8) * (1 - on(f, n99, 6))}><Label x={960} y={G - 20} text="THE TRADE = THE NEW PRICE" size={50} /></g>
      </g>}

      {/* # E) your phone → the broker → a seller, in a split second */}
      {E > 0 && <g opacity={E}>
        <Town id="mk-a-e" f={f} mood="noon" />
        <Person f={f} who="hero" beats={eBeats} x={300} y={G} s={0.85} />
        <Phone x={620} y={560} s={0.9} price="$101" pressed={on(f, tap32, 6)} o={on(f, app32 - 6, 8)} />
        <g opacity={on(f, broker32, 10)} transform={`translate(1100 ${G})`}><rect x={-140} y={-300} width={280} height={300} fill="#BFD8E8" /><rect x={-150} y={-320} width={300} height={30} fill="#5A7BA0" /><text y={-340} textAnchor="middle" fill={M.ink} style={BB(44)}>BROKER</text>
          <rect x={-40} y={-120} width={80} height={120} fill="#5A7BA0" /></g>
        <Person f={f} who="investor" beats={[[0, 'idle', 'neutral'], [matched32, 'handshake', 'smiling']]} x={1620} y={G} s={0.85} o={on(f, seller32 - 6, 10)} />
        {f >= order32 && orderT < 1 && (() => { const x = orderT < 0.5 ? lerp(700, 1100, orderT * 2) : lerp(1100, 1560, orderT * 2 - 1), y = 420 - 120 * Math.sin(orderT * Math.PI * 2) ** 2
          return <g transform={`translate(${x} ${y})`}><rect x={-50} y={-32} width={100} height={64} rx={8} fill={M.paper} stroke={M.teal} strokeWidth={4} /><path d="M-50 -32 L0 6 L50 -32" fill="none" stroke={M.teal} strokeWidth={4} /></g> })()}
        <g opacity={on(f, matched32, 8)}><Label x={1620} y={G + 60} text="MATCHED WITH A SELLER" size={44} /></g>
        <g opacity={on(f, split32, 8)} transform="translate(1100 300)"><circle r={70} fill={M.paper} stroke={M.ink} strokeWidth={8} /><rect x={-10} y={-96} width={20} height={20} fill={M.ink} /><line x1={0} y1={0} x2={0} y2={-50} stroke={M.red} strokeWidth={8} strokeLinecap="round" transform={`rotate(${(f - split32) * 30})`} /></g>
      </g>}

      {/* # F) after the IPO, your money goes to the seller, not the bakery */}
      {F > 0 && <g opacity={F}>
        <Town id="mk-a-f" f={f} mood="noon" />
        <Person f={f} who="hero" beats={fBeats} x={320} y={G} s={0.85} />
        <Bakery x={1100} y={G - 330} s={0.55} f={f} o={on(f, company33 - 6, 10)} />
        <g opacity={on(f, ipo33, 8)}><Label x={1100} y={300} text="IPO: DONE" size={46} fill={M.ink} ink="#FFFFFF" /></g>
        <Person f={f} who="investor" beats={[[0, 'idle', 'neutral'], [sold33, 'receive', 'smiling']]} x={1600} y={G} s={0.85} o={on(f, investor33 - 10, 10)} />
        {f >= money33 && (() => { const t = span(f, money33, money33 + 24); return <Coin x={lerp(520, 1500, t)} y={lerp(620, 660, t) - 120 * Math.sin(t * Math.PI)} s={0.8} text="$" /> })()}
        <g opacity={on(f, trades33, 8)}><path d="M560 560 Q 820 380 1000 560" fill="none" stroke={M.ink2} strokeWidth={8} strokeDasharray="18 12" /></g>
        <No x={790} y={470} r={100} o={on(f, not33, 8) * (f >= bakery33 - 20 ? 1 : 1)} />
      </g>}

      <Headline f={f} lines={[[sell25, 'WHO DO YOU SELL TO?', M.ink, 100], [auction26, 'A GIANT AUCTION', M.ink, 104], [y1792, '1792: 24 BROKERS', M.ink, 100], [way28, 'STOCK OR SHARE?', M.ink, 104], [today29, 'BID VS ASK', M.ink, 110], [n99, 'BUYERS 99 · SELLERS 101', M.ink, 96], [tap32, 'YOU TAP BUY', M.ink, 104], [miss33, 'THE COMPANY USUALLY ISN\'T IN IT', M.ink, 92]]} />
    </g>
  )
}

export const MK_AUCTION = makePiece('mk-auction', 'Step three, the market is an auction: you hold your share, an arrow back to Rosa\'s bakery is crossed, another investor steps up; a great auction hall with paddles, a gavel, buy and sell arrows, a clock that never stops (investor ↔ investor); 1792 under a buttonwood tree, 24 brokers in top hats, a signed agreement, papers passing, then the columns of the New York Stock Exchange; one certificate (a share) vs a pile (stock); a screen with a green BID column and a red ASK column whose top chips slide together into a TRADE spark and set the last price; buyers 99, sellers 101, a buyer runs in a hurry and pays $101; your phone BUY tapped, an order envelope flies to the BROKER and on to a seller (matched) with a stopwatch; after the IPO your coin goes to the investor who sold, the arrow to the bakery is crossed', {
  mood: 'light', Component: Auction,
  beats: ["s25:sell", "s25:not", "s25:back", "s25:another", "s25:investor", "s26:market", "s28:stock", "s28:share", "s31:price", "s33:part", "s26:giant", "s26:auction", "s26:never", "s26:stops", "s26:buy", "s26:sell", "s26:other", "s27:started", "s27:1792", "s27:24", "s27:brokers", "s27:york", "s27:signed", "s27:trade", "s27:became", "s27:exchange", "s28:way", "s28:share#2", "s28:piece", "s28:means", "s28:general", "s29:today", "s29:computers", "s29:buyers", "s29:highest", "s29:bid", "s29:sellers", "s29:lowest", "s29:ask", "s30:meet", "s30:happens", "s30:becomes", "s30:latest", "s31:99", "s31:101", "s31:hurry", "s31:pays", "s31:screen", "s31:101#3", "s32:tap", "s32:app", "s32:broker", "s32:order", "s32:matched", "s32:seller", "s32:split", "s33:miss", "s33:ipo", "s33:company", "s33:trades", "s33:money", "s33:investor", "s33:sold", "s33:not", "s33:bakery"],
  sfx: [['s25:not', 'thud', 0.1], ['s26:auction', 'pop', 0.12], ['s27:signed', 'flutter', 0.12], ['s30:happens', 'ding', 0.14], ['s32:tap', 'click', 0.14], ['s33:money', 'coin', 0.12]] })
