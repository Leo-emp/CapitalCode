// ---------------------------------------------------------------- s44–s60: step three — the app gets its cut.
// A) The trading tower hands coins back to the app. A small ladder: a wedge of its spread breaks off and flows to the
//    app ("a fixed percentage of the spread"). A routing report unfolds (public). A market order: Leo's slip gets a
//    NOW stamp. Six firms' coin piles for 100 shares (43¢ … 101¢); one share: ½¢ to 1¢; Leo's 100: 40¢ to $1.
// B) The tally of Leo's 100 shares, as one gap split three ways: Leo's $1 coin, the market maker's $2 block, and out
//    of that block a wedge to the app (40¢–$1). Arrows show it all comes out of the same small gap.
// C) Options: a purple contract card (100 shares, a set price, a set date); a coin pile under it (32–54¢ per
//    contract). Two bars, last three months of 2025: options $314M vs stocks $94M. A crypto coin with a small
//    percentage slice. All of it pours into one pile: about $2.6B of trading revenue in 2025.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { HSpot as Spot } from './kit'
import { Headline, Label, Person, Stamp, fly, win } from '../aimoney/common'
import { Calendar } from '../charts'
import { Ground } from '../power/kit2'
import { Stack } from '../fee/kit'
import { AppPhone, Cent, Ladder, Slip, Tower } from './kit'

const GROUND = 920
const FIRMS: [string, number][] = [['CITADEL', 43], ['HRT', 67], ['VIRTU', 73], ['TWO SIGMA', 75], ['G1', 83], ['JANE ST.', 101]]

const Step3: React.FC<PieceProps> = ({ f, c }) => {
  const maker44 = c('s44:maker'), hands = c('s44:hands'), back44 = c('s44:back'), app44 = c('s44:app')
  const robinhood45 = c('s45:robinhood'), stock45 = c('s45:stock'), fixed = c('s45:fixed'), spread45 = c('s45:spread')
  const amounts = c('s46:amounts'), public46 = c('s46:public'), publish = c('s46:publish'), report = c('s46:report')
  const market47 = c('s47:market'), right = c('s47:right'), current = c('s47:current'), leos47 = c("s47:leo's")
  const october = c('s48:october'), sp = c('s48:sp'), received = c('s48:received'), d43 = c('s48:43'), shares48 = c('s48:shares'), firm48 = c('s48:firm')
  const half = c('s49:half'), share49 = c('s49:share')
  const leos50 = c("s50:leo's"), earned = c('s50:earned'), d40 = c('s50:40'), dollar50 = c('s50:dollar')
  const add51 = c('s51:add'), madeup = c('s51:madeup')
  const saved = c('s52:saved'), d1 = c('s52:1'), kept = c('s52:kept'), d2 = c('s52:2'), paid52 = c('s52:paid'), d40b = c('s52:40')
  const everyone = c('s53:everyone'), comes = c('s53:comes'), gap53 = c('s53:gap')
  const options54 = c('s54:options'), more54 = c('s54:more')
  const option55 = c('s55:option'), contract55 = c('s55:contract'), set55 = c('s55:set'), date55 = c('s55:date')
  const each56 = c('s56:each'), biggest56 = c('s56:biggest'), paid56 = c('s56:paid'), d32 = c('s56:32'), oct56 = c('s56:october')
  const biggest57 = c('s57:biggest'), business = c('s57:business')
  const last58 = c('s58:last'), d2025 = c('s58:2025'), d314 = c('s58:314'), stocks58 = c('s58:stocks'), d94 = c('s58:94')
  const crypto = c('s59:crypto'), percentage = c('s59:percentage'), trade59 = c('s59:trade')
  const add60 = c('s60:add'), cents60 = c('s60:cents'), d26 = c('s60:26'), revenue = c('s60:revenue')
  const AB = add51 - 4, BC = options54 - 4
  const A = win(f, maker44 - 30, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  const A1 = win(f, maker44 - 30, market47 - 4), A2 = win(f, market47 - 4, october - 4), A3 = on(f, october - 4, 10)
  const C1 = win(f, BC, last58 - 4), C2 = on(f, last58 - 4, 10)
  return (
    <g>
      <Stage id="hd-step3" frame={f} />
      <Spot f={f} at={c("s48:sp")} x={1175} y={760} rx={620} ry={200} />
      <Spot f={f} at={c("s53:something")} x={960} y={640} rx={760} ry={260} />
      <Spot f={f} at={c("s58:2025")} x={610} y={700} rx={320} ry={240} />
      <Spot f={f} at={c("s59:there")} x={1120} y={640} rx={140} ry={140} />
      <Spot f={f} at={c("s44:app")} x={300} y={560} rx={200} ry={260} />
      <Spot f={f} at={c("s45:says")} x={900} y={470} rx={260} ry={200} />
      <Spot f={f} at={c("s47:leo's")} x={1000} y={520} rx={300} ry={200} />
      <Spot f={f} at={c("s48:market")} x={1175} y={800} rx={240} ry={120} />
      <Spot f={f} at={c("s48:robinhood's")} x={300} y={560} rx={200} ry={260} />
      <Spot f={f} at={c("s48:firm")} x={1175} y={760} rx={620} ry={200} />
      <Spot f={f} at={c("s49:share")} x={1175} y={330} rx={200} ry={90} />
      <Spot f={f} at={c("s52:screen")} x={330} y={600} rx={200} ry={300} />
      <Spot f={f} at={c("s53:chain")} x={960} y={640} rx={760} ry={260} />
      <Spot f={f} at={c("s53:small")} x={960} y={380} rx={160} ry={120} />
      <Spot f={f} at={c("s56:options")} x={760} y={520} rx={300} ry={200} />
      <Spot f={f} at={c("s56:october")} x={1360} y={800} rx={160} ry={160} />
      <Spot f={f} at={c("s57:options")} x={760} y={520} rx={300} ry={200} />
      <Spot f={f} at={c("s58:months")} x={610} y={700} rx={320} ry={240} />
      <Spot f={f} at={c("s59:little")} x={1120} y={640} rx={140} ry={140} />
      <Spot f={f} at={c("s60:trading")} x={1560} y={700} rx={220} ry={260} />
      <g opacity={on(f, c("s48:october"), 8) * (1 - on(f, c("s49:half"), 8))}><rect x={1085} y={180} width={180} height={56} rx={14} fill={P.navy3} /><text x={1175} y={220} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>OCT 2025</text></g>
      <Headline f={f} lines={[[maker44, 'STEP 3: THE APP GETS ITS CUT', P.ink, 96], [fixed, 'A FIXED % OF THE SPREAD', P.ink, 100], [public46, 'THE AMOUNTS ARE PUBLIC', P.ink, 100], [market47, 'A MARKET ORDER: RIGHT AWAY', P.ink, 96], [d43, 'OCT 2025: 43¢ TO 101¢ PER 100 SHARES', P.ink, 84], [half, '½¢ TO 1¢ PER SHARE', P.ink, 104], [d40, "LEO'S 100 SHARES: ≈ 40¢ TO $1", P.ink, 92], [add51, "ADDING UP LEO'S TRADE", P.ink, 96], [comes, 'ALL FROM THE SAME SMALL GAP', P.ink, 96], [more54, 'OPTIONS PAY MORE', P.ink, 108], [d32, '32¢ TO 54¢ PER CONTRACT', P.ink, 100], [d314, 'LAST 3 MONTHS OF 2025', P.ink, 96], [crypto, 'CRYPTO: A SMALL % OF EACH TRADE', P.ink, 92], [d26, '2025: ≈ $2.6 BILLION FROM TRADING', P.goldInk, 92]]} />

      {/* # A) the cut: coins back, a wedge of the spread, the report, the market order, the real numbers */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <AppPhone x={300} y={560} s={0.9} />
        {A1 > 0 && <g opacity={A1}>
          <Tower x={1500} y={GROUND} s={0.85} f={f} sign="MARKET MAKER" />
          {f >= hands && [0, 1, 2].map((k) => { const fl = fly(f, hands + k * 7, [1440, GROUND - 400], [360, 470], 24, 150); return fl.t < 1 ? <Cent key={k} x={fl.x} y={fl.y} r={26} t="$" o={fl.o} /> : null })}
          {/* # a small ladder; a wedge of its spread breaks off toward the app */}
          <g opacity={on(f, stock45, 10)}><g transform="translate(900 470) scale(0.6)"><Ladder x={0} y={0} gap={220} spread={1} /></g>
            <g transform={`translate(${lerp(900, 420, on(f, spread45, 20))} ${lerp(470, 480, on(f, spread45, 20))})`} opacity={on(f, fixed, 8)}><path d="M0 0 L60 -30 L60 30 Z" fill={P.gold} stroke={P.goldD} strokeWidth={3} /></g></g>
          {/* # the routing report unfolds */}
          <g opacity={on(f, amounts, 8)} transform={`translate(900 ${lerp(820, 760, on(f, publish, 14))}) scale(${lerp(0.4, 1, on(f, report, 14))})`}>
            <rect x={-150} y={-90} width={300} height={180} rx={12} fill={P.paper} stroke={P.edge} strokeWidth={3} />
            <text x={0} y={-44} textAnchor="middle" fill={P.navy2} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 2 }}>ROUTING REPORT</text>
            {[0, 1, 2].map((r) => <g key={r}><rect x={-120} y={-14 + r * 30} width={130} height={12} rx={6} fill="#C8B994" /><rect x={40} y={-14 + r * 30} width={80} height={12} rx={6} fill={P.gold} /></g>)}
          </g>
        </g>}
        {A2 > 0 && <g opacity={A2}>
          <g transform={`translate(1000 520)`}><Slip x={0} y={0} s={1.6} /><Stamp x={260} y={0} text="NOW" f={f} at={right} size={64} color={P.coralInk} /></g>
          <g opacity={on(f, current, 8)}><Label x={1000} y={760} text="AT THE CURRENT PRICE" size={48} font="Bebas Neue" color={P.ink2} /></g>
        </g>}
        {A3 > 0 && <g opacity={A3}>
          {/* # six firms' payments for 100 shares, as coin piles; only the spoken ends are labelled */}
          {FIRMS.map(([nm, v], k) => { const x = 700 + k * 190, n = Math.round(v / 8)
            return <g key={k} opacity={on(f, c('s48:market') + k * 3, 8)}>
              <Stack x={x} y={GROUND - 10} n={Math.round(n * on(f, c('s48:market') + k * 4, 30))} w={110} />
              <Label x={x} y={GROUND + 60} text={nm} size={38} font="Bebas Neue" color={P.ink2} />
              {(k === 0 || k === 5) && <g opacity={on(f, k === 0 ? d43 : shares48, 8)}><Label x={x} y={GROUND - 30 - n * 22 - 20} text={`${v}¢`} size={52} font="Bebas Neue" color={P.goldInk} /></g>}
            </g> })}
          <g opacity={on(f, shares48, 8) * (1 - on(f, half, 8))}><Label x={1175} y={300} text="FOR EVERY 100 SHARES" size={48} font="Bebas Neue" color={P.ink} /></g>
          {/* # one share: half a cent to a cent */}
          <g opacity={on(f, half, 8) * (1 - on(f, leos50, 8))} transform="translate(1175 330)"><rect x={-120} y={-34} width={240} height={68} rx={12} fill={P.paper} stroke={P.edge} strokeWidth={3} /><text x={0} y={14} textAnchor="middle" fill={P.navy0} style={{ font: '400 44px "Bebas Neue"' }}>1 SHARE = ½¢–1¢</text></g>
          {/* # Leo's 100 shares: the app gets 40 cents to a dollar */}
          {f >= earned && [0, 1, 2].map((k) => { const fl = fly(f, earned + k * 6, [1175, 360], [360, 470], 22, 120); return fl.t < 1 ? <Cent key={k} x={fl.x} y={fl.y} r={24} o={fl.o} /> : null })}
          <g opacity={on(f, d40, 8)}><Label x={300} y={GROUND + 70} text="≈ 40¢ TO $1" size={56} font="Bebas Neue" color={P.goldInk} /></g>
        </g>}
      </g>}

      {/* # B) the tally: one gap, split three ways */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <g opacity={on(f, madeup, 8)}><Label x={960} y={260} text="MADE-UP PRICES" size={40} font="Bebas Neue" color={P.ink2} /></g>
        {/* # Leo's dollar */}
        <g opacity={on(f, add51, 8)}>
          <Person f={f} who="buyer" beats={[[0, 'receive', 'smiling']]} x={330} y={GROUND} s={0.75} />
          <g opacity={on(f, saved, 8)}><Cent x={330} y={GROUND - 560} r={50} t="$1" /></g>
          <g opacity={on(f, d1, 8)}><Label x={330} y={GROUND + 70} text="LEO SAVED $1" size={50} font="Bebas Neue" color={P.ink} /></g>
        </g>
        {/* # the market maker's $2 block, a wedge of it going to the app */}
        <g opacity={on(f, add51 + 6, 8)}>
          <Tower x={960} y={GROUND} s={0.6} f={f} sign="MARKET MAKER" />
          <g opacity={on(f, kept, 8)}><rect x={1100} y={GROUND - 200} width={200} height={200} rx={14} fill={P.gold} /></g>
          <g opacity={on(f, d2, 8)}><Label x={1200} y={GROUND - 220} text="KEPT $2" size={50} font="Bebas Neue" color={P.goldInk} /></g>
          <g transform={`translate(${lerp(0, 300, on(f, paid52, 20))} ${lerp(0, -60, on(f, paid52, 20))})`} opacity={on(f, paid52, 8)}>
            <rect x={1100} y={GROUND - 200} width={200} height={70} rx={12} fill="#F6D47A" stroke={P.goldD} strokeWidth={4} />
            <g opacity={on(f, d40b, 8)}><text x={1200} y={GROUND - 152} textAnchor="middle" fill={P.navy0} style={{ font: '400 40px "Bebas Neue"' }}>40¢–$1</text></g>
          </g>
          <g opacity={on(f, add51 + 12, 8)}><AppPhone x={1720} y={GROUND - 420} s={0.55} /><g opacity={on(f, d40b, 8)}><Label x={1720} y={GROUND + 70} text="APP: 40¢–$1" size={50} font="Bebas Neue" color={P.ink} /></g></g>
        </g>
        {/* # it all comes out of the same small gap */}
        <g opacity={on(f, everyone, 8)}><g transform="translate(960 380) scale(0.42)"><Ladder x={0} y={0} gap={200} spread={1} /></g>
          <g opacity={on(f, comes, 8)}>{[[420, 640], [1100, 650], [1560, 560]].map(([x, y], k) => <path key={k} d={`M960 ${430} Q${(960 + x) / 2} 470 ${x} ${y}`} fill="none" stroke={P.goldD} strokeWidth={5} strokeDasharray="10 8" />)}</g></g>
      </g>}

      {/* # C) options, the two bars, crypto, the total */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        {C1 > 0 && <g opacity={C1}>
          <g opacity={1 - on(f, each56, 10)} transform={`translate(760 ${lerp(560, 500, on(f, option55, 14))}) rotate(-4)`}>
            <rect x={-260} y={-150} width={520} height={300} rx={20} fill="#E8D9FF" stroke="#9D7FD0" strokeWidth={5} />
            <text x={0} y={-90} textAnchor="middle" fill="#5E3F9A" style={{ font: '400 56px "Bebas Neue"', letterSpacing: 4 }}>OPTION CONTRACT</text>
            {/* # its three parts as pictures: 100 shares, a set price, a set date */}
            <g opacity={on(f, contract55, 8)} transform="translate(-160 30)"><Stack x={0} y={40} n={5} w={90} color={P.sky} /><Label x={0} y={90} text="100 SHARES" size={34} font="Bebas Neue" color="#5E3F9A" /></g>
            <g opacity={on(f, set55, 8)} transform="translate(0 30)"><path d="M-50 -30 L40 -30 L60 0 L40 30 L-50 30 Z" fill={P.gold} /><Label x={0} y={90} text="SET PRICE" size={34} font="Bebas Neue" color="#5E3F9A" /></g>
            <g opacity={on(f, date55, 8)} transform="translate(160 20)"><Calendar x={0} y={0} text="DATE" s={0.5} /><Label x={0} y={100} text="SET DATE" size={34} font="Bebas Neue" color="#5E3F9A" /></g>
          </g>
          <g opacity={on(f, each56, 10)}><AppPhone x={520} y={540} s={0.8} /></g>
          {/* # options: the biggest trading business — a trophy */}
          <g opacity={on(f, biggest57, 10)} transform={`translate(900 ${lerp(420, 380, pop(f, biggest57, 14))})`}><path d="M-70 -80 L70 -80 L60 10 Q0 60 -60 10 Z" fill={P.gold} stroke={P.goldD} strokeWidth={5} /><path d="M-70 -60 Q-120 -50 -60 0 M70 -60 Q120 -50 60 0" fill="none" stroke={P.goldD} strokeWidth={8} /><rect x={-20} y={40} width={40} height={50} fill={P.goldD} /><rect x={-60} y={90} width={120} height={24} rx={6} fill={P.goldD} /><text x={0} y={-24} textAnchor="middle" fill={P.navy0} style={{ font: '400 38px "Bebas Neue"' }}>#1</text><Label x={0} y={170} text="OPTIONS" size={48} font="Bebas Neue" color={P.ink} /></g>
          {[0, 1].map((k) => { const x = [1240, 1600][k]
            return <g key={k} opacity={on(f, each56 + k * 4, 10)}><Tower x={x} y={GROUND} s={0.5} f={f + k * 9} sign={['CITADEL', 'DASH / IMC'][k]} />
              {f >= paid56 && (() => { const t = ((f - paid56 + k * 14) % 40) / 40; return <g opacity={Math.min(1, t * 6) * (1 - Math.max(0, t - 0.85) * 6)}><Cent x={lerp(x, 600, t)} y={lerp(GROUND - 380, 460, t) - Math.sin(t * Math.PI) * 100} r={30} t="$" /></g> })()}
              <g opacity={on(f, d32, 8)}><Label x={x} y={GROUND + 70} text={['32¢', '54¢'][k] + ' PER CONTRACT'} size={42} font="Bebas Neue" color={P.ink} /></g></g> })}
        </g>}
        {C2 > 0 && <g opacity={C2}>
          {/* # two bars: options vs stocks, last three months of 2025 */}
          {([[460, d314, 314, 'OPTIONS $314M', '#9D7FD0'], [760, d94, 94, 'STOCKS $94M', P.sky]] as [number, number, number, string, string][]).map(([x, at, v, t, col], k) => {
            const h = lerp(0, v * 1.4, on(f, at, 24)) * (1 - on(f, add60, 20) * 0.6)
            return <g key={k} opacity={on(f, k ? stocks58 : last58, 10)}>
              <rect x={x - 100} y={GROUND - h} width={200} height={h} rx={14} fill={col} />
              <g opacity={on(f, at, 8)}><Label x={x} y={GROUND + 70} text={t} size={48} font="Bebas Neue" color={P.ink} /></g>
            </g> })}
          {/* # crypto: a coin with a small slice */}
          <g opacity={on(f, crypto, 10)} transform="translate(1120 640)"><circle r={90} fill="#F7931A" /><text y={30} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 90px "Bebas Neue"' }}>B</text>
            <g opacity={on(f, percentage, 8)} transform={`translate(${lerp(0, 50, on(f, trade59, 14))} ${lerp(0, -30, on(f, trade59, 14))})`}><path d="M0 0 L90 0 A90 90 0 0 0 78 -45 Z" fill={P.gold} stroke={P.goldD} strokeWidth={3} /></g>
            <g opacity={on(f, crypto, 8)}><Label x={0} y={210} text="CRYPTO" size={48} font="Bebas Neue" color={P.ink} /></g></g>
          {/* # all of it into one pile */}
          <g opacity={on(f, add60, 10)}><Stack x={1560} y={GROUND - 10} n={Math.round(lerp(4, 22, on(f, cents60, 30)))} w={220} />
            <g opacity={on(f, d26, 8)}><Label x={1560} y={GROUND + 70} text="≈ $2.6B" size={64} font="Bebas Neue" color={P.goldInk} /></g></g>
          {f >= add60 && [0, 1, 2].map((k) => { const fl = fly(f, add60 + k * 6, [[460, 760, 1120][k], 560], [1560, GROUND - 300], 22, 120); return fl.t < 1 ? <Cent key={k} x={fl.x} y={fl.y} r={26} t="$" o={fl.o} /> : null })}
        </g>}
      </g>}
      <Vignette id="hd-step3" />
    </g>
  )
}

const BEATS = ["s48:sp", "s53:something", "s58:2025", "s59:there", "s44:app", "s45:says", "s47:leo's", "s48:market", "s48:robinhood's", "s48:firm", "s49:share", "s52:screen", "s53:chain", "s53:small", "s56:options", "s56:october", "s57:options", "s58:months", "s59:little", "s60:trading", "s48:october", 's44:maker', 's44:hands', 's44:back', 's45:stock', 's45:fixed', 's45:spread', 's46:amounts', 's46:public', 's46:publish', 's46:report', 's47:market', 's47:right', 's47:current', 's48:october', 's48:received', 's48:43', 's48:shares', 's49:half', "s50:leo's", 's50:earned', 's50:40', 's51:add', 's51:madeup', 's52:saved', 's52:1', 's52:kept', 's52:2', 's52:paid', 's52:40', 's53:everyone', 's53:comes', 's54:options', 's54:more', 's55:option', 's55:contract', 's55:set', 's55:date', 's56:paid', 's56:32', 's56:biggest', 's57:biggest', 's58:last', 's58:314', 's58:stocks', 's58:94', 's59:crypto', 's59:percentage', 's59:trade', 's60:add', 's60:cents', 's60:26']
export const HD_STEP3 = makePiece('hd-step3', 'PFOF long step 3: the market maker hands coins back to the app; a wedge of the spread (a fixed %) flows to the app; a public routing report; a market order stamped NOW; six firms\' coin piles per 100 shares (43¢…101¢), ½¢–1¢ a share, Leo\'s 100 shares ≈ 40¢–$1; the tally (Leo $1, market maker $2, app 40¢–$1 out of it) all from one small gap; options: a contract card (100 shares, set price, set date), 32–54¢ per contract; options $314M vs stocks $94M (Q4 2025); crypto takes a small % slice; all into ≈ $2.6B', {
  mood: 'light', Component: Step3, beats: BEATS,
  sfx: [['s44:hands', 'coin', 0.25], ['s46:report', 'pop', 0.2], ['s47:right', 'thud', 0.25], ['s48:43', 'pop', 0.2], ['s52:2', 'cash', 0.2], ['s54:more', 'pop', 0.2], ['s58:314', 'thud', 0.25], ['s60:26', 'cash', 0.3]] })
