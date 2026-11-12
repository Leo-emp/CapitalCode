// ---------------------------------------------------------------- s9–s24: what a stablecoin is.
// A) Two coins ride two price lines: bitcoin's line jumps up and crashes down; the stablecoin's line stays flat at $1
//    while TODAY, TOMORROW and NEXT YEAR tick by along it.
// B) Uses: a coin parks between two trades; a coin flies across the world in minutes (sun → moon, any hour); a trader
//    sells bitcoin and it turns into a stablecoin, the road back to the bank is crossed; a local banknote shrinks while
//    a savings jar fills with digital dollars.
// C) The two biggest: a green USDT tower ($186B at the end of 2025) and a blue USDC tower ($75B).
// D) How it stays at $1: coin ⇄ dollar swap arrows; then a row of coins, and a real dollar drops into the vault for
//    every coin made.
// E) Maya opens a crypto app and buys $1,000 of USDC; the phone shows 1,000 coins; "where did those dollars go?" — a
//    dollar slips out of the phone along a dashed path.
import React from 'react'
import { clamp01, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, Phone, fly, hand, win, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { CoinHQ, Cross, Dollar, Route, SCoin, Vault } from './kit'
import { SaverJar } from '../fee/kit'

const GROUND = 920
// # bitcoin: an orange coin with a B
const BCoin: React.FC<{ x: number; y: number; s?: number; o?: number; spin?: number }> = ({ x, y, s = 1, o = 1, spin = 0 }) => {
  const sx = Math.max(0.08, Math.abs(Math.cos(spin * Math.PI)))
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><g transform={`scale(${sx} 1)`}>
    <ellipse cx={0} cy={7} rx={48} ry={48} fill="#C9741C" /><circle r={48} fill="#F7931A" /><circle r={36} fill="none" stroke="#FFFFFF" strokeWidth={4} opacity={0.6} />
    {sx > 0.4 && <text y={17} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 50px "Bebas Neue"' }}>B</text>}</g></g>
}
// # a bank building (the road back to it gets crossed)
const Bank: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={170} ry={14} fill={P.shadow} opacity={0.18} />
    <rect x={-150} y={-30} width={300} height={30} rx={4} fill="#C9D3E1" />
    {[-105, -35, 35, 105].map((cx) => <rect key={cx} x={cx - 18} y={-200} width={36} height={170} rx={6} fill="#E8EEF5" />)}
    <rect x={-150} y={-230} width={300} height={30} rx={4} fill="#C9D3E1" /><path d="M-170 -230 L0 -310 L170 -230 Z" fill="#E8EEF5" />
    <text x={0} y={-252} textAnchor="middle" fill={P.navy2} style={{ font: '400 34px "Bebas Neue"', letterSpacing: 4 }}>BANK</text>
  </g>
)
// # a little globe
const Globe: React.FC<{ x: number; y: number; r?: number; o?: number }> = ({ x, y, r = 200, o = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <circle r={r} fill="#8FD0F2" />
    <path d={`M${-r * 0.6} ${-r * 0.5} q${r * 0.3} ${-r * 0.2} ${r * 0.5} 0 q${r * 0.1} ${r * 0.3} ${-r * 0.1} ${r * 0.5} q${-r * 0.3} ${r * 0.1} ${-r * 0.4} ${-r * 0.5} Z`} fill="#6FBF73" />
    <path d={`M${r * 0.1} ${r * 0.05} q${r * 0.4} ${-r * 0.25} ${r * 0.6} ${r * 0.05} q${-r * 0.05} ${r * 0.45} ${-r * 0.35} ${r * 0.55} q${-r * 0.3} ${-r * 0.2} ${-r * 0.25} ${-r * 0.6} Z`} fill="#6FBF73" />
    <circle r={r} fill="none" stroke="#5AA8D6" strokeWidth={6} />
  </g>
)

const What: React.FC<PieceProps> = ({ f, c }) => {
  const stable9 = c('s9:stablecoins')
  const normal = c('s10:normal'), bitcoin10 = c('s10:bitcoin'), jump = c('s10:jump'), crash = c('s10:crash'), day10 = c('s10:day')
  const s11 = c('s11'), notMove = c('s11:not'), one11 = c('s11:one'), dollar11 = c('s11:dollar'), today = c('s11:today'), tomorrow = c('s11:tomorrow'), year11 = c('s11:year')
  const s12 = c('s12'), park = c('s12:park'), trades = c('s12:trades'), send = c('s12:send'), world = c('s12:world'), minutes = c('s12:minutes'), hour = c('s12:hour')
  const trader = c('s13:trader'), sells = c('s13:sells'), stable13 = c('s13:stablecoin'), without = c('s13:without'), bank = c('s13:bank')
  const countries = c('s14:countries'), loses = c('s14:loses'), fast = c('s14:fast'), savings = c('s14:savings'), digital = c('s14:digital')
  const two = c('s15:two'), usdt = c('s15:usdt'), usdc = c('s15:usdc'), circle = c('s15:circle')
  const s18c = c('s18:coin'), company19 = c('s19:company'), promise20 = c('s20:promise'), follow21 = c('s21:follow'), usdc22b = c('s22:usdc'), app23 = c('s23:app'), worth16 = c('s16:worth')
  const end16 = c('s16:end'), d186 = c('s16:186'), coins16 = c('s16:coins'), d75 = c('s17:75'), usdc17 = c('s17:usdc'), second = c('s17:second')
  const s18 = c('s18'), stay = c('s18:stay'), promises = c('s19:promises'), swapped = c('s19:swapped'), real19 = c('s19:real')
  const holds = c('s20:holds'), cash = c('s20:cash'), safe = c('s20:safe'), every20 = c('s20:every'), made20 = c('s20:made')
  const meet = c('s21:meet'), maya22 = c('s22:maya'), app22 = c('s22:app'), d1000 = c('s22:1000'), usdc22 = c('s22:usdc')
  const shows = c('s23:shows'), coins23 = c('s23:coins'), worth23 = c('s23:worth'), s24 = c('s24'), where = c('s24:where'), go = c('s24:go')
  // # stretches
  const AB = s12, BC = two - 4, CD = s18, DE = c('s21') - 2
  const A = win(f, stable9 - 30, AB), B = win(f, AB, BC), C = win(f, BC, CD), D = win(f, CD, DE), E = on(f, DE, 10)
  // # B sub-beats: park/send (s12), trader (s13), countries (s14)
  const B1 = win(f, AB, trader - 4), B2 = win(f, trader - 4, countries - 4), B3 = on(f, countries - 4, 10)
  return (
    <g>
      <Stage id="sc-what" frame={f} />
      <Headline f={f} lines={[[stable9, 'STABLECOINS', P.ink, 116], [jump, 'BITCOIN: UP AND DOWN', P.ink, 96], [s11, '', P.ink], [dollar11, 'STABLECOIN: 1 COIN = $1', P.ink, 96], [park, '', P.ink], [minutes, 'ACROSS THE WORLD IN MINUTES', P.ink, 88], [trader, '', P.ink], [fast, '', P.ink], [digital, 'A KIND OF DIGITAL DOLLAR', P.ink, 92], [two, 'THE TWO BIGGEST', P.ink, 104], [d186, '', P.ink], [s18, 'HOW DOES IT STAY AT $1?', P.ink, 100], [holds, '', P.ink], [every20, '$1 HELD FOR EVERY COIN', P.ink, 96], [meet, '', P.ink], [d1000, 'MAYA BUYS $1,000 OF USDC', P.ink, 96], [where, 'WHERE DID THOSE DOLLARS GO?', P.ink, 96]]} />

      {/* # A) two price lines: bitcoin jumps and crashes, the stablecoin stays flat */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        {(() => {
          // # bitcoin's path: flat, a jump up, a crash down, wobble
          const bt = span(f, bitcoin10, day10 + 20)
          const pts = Array.from({ length: 41 }, (_, k) => { const t = k / 40; const y = 420 - 180 * Math.sin(Math.min(1, t * 2.2) * Math.PI) * (t < 0.45 ? 1 : 0) + (t >= 0.45 ? 140 * Math.sin((t - 0.45) * 5.7) : 0) + 30 * Math.sin(t * 31); return [260 + t * 1400, y] as [number, number] })
          const n = Math.max(1, Math.round(bt * 40))
          const d = pts.slice(0, n + 1).map((p, k) => `${k ? 'L' : 'M'}${p[0]} ${p[1]}`).join(' ')
          const head = pts[n]
          return <g opacity={on(f, normal, 10) * (1 - on(f, s11, 10) * 0.6)}>
            <path d={d} fill="none" stroke="#F7931A" strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
            <BCoin x={head[0]} y={head[1]} s={1.1} />
            <g opacity={on(f, bitcoin10, 8)}><Label x={180} y={430} text="BITCOIN" size={52} font="Bebas Neue" color={P.ink} anchor="end" /></g>
          </g>
        })()}
        {(() => {
          const st = span(f, s11, year11 + 20), x = 260 + st * 1400
          return <g opacity={on(f, s11, 10)}>
            <path d={`M260 700 L${x} 700`} stroke={P.sky} strokeWidth={10} strokeLinecap="round" />
            <SCoin x={x} y={700} s={1.1} />
            <g opacity={on(f, one11, 8)}><Label x={180} y={715} text="$1" size={64} font="Bebas Neue" color={P.skyInk} anchor="end" /></g>
            {([[today, 'TODAY', 600], [tomorrow, 'TOMORROW', 1050], [year11, 'NEXT YEAR', 1520]] as [number, string, number][]).map(([at, t, tx], k) =>
              <g key={k} opacity={on(f, at, 8)}><line x1={tx} y1={720} x2={tx} y2={760} stroke={P.ink2} strokeWidth={5} /><Label x={tx} y={810} text={t} size={46} font="Bebas Neue" color={P.ink2} /></g>)}
            <g opacity={on(f, notMove, 8) * (1 - on(f, one11, 8))}><Label x={960} y={640} text="BUILT NOT TO MOVE" size={48} font="Bebas Neue" color={P.ink2} /></g>
          </g>
        })()}
      </g>}

      {/* # B) what people use them for */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        {/* # B1: park between trades, then send across the world */}
        {B1 > 0 && <g opacity={B1}>
          <g opacity={1 - on(f, send, 10)}>
            <BCoin x={420} y={GROUND - 200} s={1.5} o={on(f, park, 8)} />
            <path d="M520 720 L780 720" stroke={P.ink2} strokeWidth={8} strokeDasharray="14 10" opacity={on(f, park, 8)} />
            {/* # the parking spot: a P sign and the coin sliding into it */}
            <g opacity={on(f, park, 8)}><rect x={830} y={GROUND - 60} width={260} height={60} rx={8} fill="none" stroke={P.ink2} strokeWidth={6} strokeDasharray="20 10" />
              <rect x={1100} y={GROUND - 300} width={10} height={300} fill="#8A97AA" /><rect x={1060} y={GROUND - 380} width={90} height={90} rx={14} fill={P.navy3} /><text x={1105} y={GROUND - 310} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 70px "Bebas Neue"' }}>P</text></g>
            <SCoin x={lerp(640, 960, on(f, park + 6, 16))} y={GROUND - 110} s={1.5} o={on(f, park, 8)} />
            <path d="M1180 720 L1440 720" stroke={P.ink2} strokeWidth={8} strokeDasharray="14 10" opacity={on(f, trades, 8)} />
            <BCoin x={1540} y={GROUND - 200} s={1.5} o={on(f, trades, 8)} spin={span(f, trades, trades + 20)} />
          </g>
          <g opacity={on(f, send, 10)}>
            <Globe x={960} y={600} r={230} />
            {(() => { const fl = fly(f, world, [560, 640], [1360, 560], 34, 260); return <SCoin x={fl.x} y={fl.y} s={1.1} o={on(f, send, 8)} /> })()}
            <g opacity={on(f, minutes, 8)}><circle cx={1560} cy={360} r={64} fill={P.paper} stroke={P.edge} strokeWidth={3} /><line x1={1560} y1={360} x2={1560} y2={316} stroke={P.navy2} strokeWidth={8} strokeLinecap="round" transform={`rotate(${(f - minutes) * 12} 1560 360)`} /><line x1={1560} y1={360} x2={1590} y2={360} stroke={P.navy2} strokeWidth={8} strokeLinecap="round" /></g>
            {/* # any hour: the sun sets, the moon rises */}
            <g opacity={on(f, hour, 8)}><circle cx={360} cy={lerp(330, 470, on(f, hour, 20))} r={50} fill={P.gold} opacity={1 - on(f, hour + 10, 14)} /><path d="M380 300 a60 60 0 1 0 50 90 a48 48 0 1 1 -50 -90 Z" fill="#9AA9C8" opacity={on(f, hour + 10, 14)} /></g>
          </g>
        </g>}
        {/* # B2: a trader sells bitcoin; it turns into a stablecoin; the road to the bank is crossed */}
        {B2 > 0 && <g opacity={B2}>
          {(() => {
            const beats: Beat[] = [[0, 'idle', 'neutral'], [trader, 'present', 'smiling'], [sells, 'offer', 'smiling'], [stable13, 'hold', 'smiling'], [without, 'crossNoA', 'smug', 'crossNoB', 14]]
            const hp = hand(f, beats, 420, GROUND, 0.85), t = on(f, sells + 8, 14)
            return <g>
              <Person f={f} who="investor" beats={beats} x={420} y={GROUND} s={0.85} />
              <g opacity={on(f, trader, 8) * (1 - on(f, stable13, 6))}><BCoin x={hp.x + 10} y={hp.y - 30} s={0.75} spin={t * 0.5} /></g>
              <g opacity={on(f, stable13, 6)}><SCoin x={hp.x + 10} y={hp.y - 30} s={0.75} spin={Math.max(0, 0.5 - span(f, stable13, stable13 + 10) * 0.5)} /></g>
              <g opacity={on(f, without, 8)}>
                <Bank x={1500} y={GROUND} s={1.0} />
                <Route pts={[[700, GROUND - 140], [1300, GROUND - 140]]} p={on(f, without, 18)} />
                <Cross x={1000} y={GROUND - 140} o={on(f, bank, 8)} size={56} />
              </g>
            </g>
          })()}
        </g>}
        {/* # B3: local money loses value; savings go into digital dollars */}
        {B3 > 0 && <g opacity={B3}>
          {(() => { const sh = on(f, loses, 40)
            return <g opacity={on(f, countries, 8)}>
              <g transform={`translate(520 560) scale(${lerp(2.2, 1.1, sh)})`}><rect x={-120} y={-62} width={240} height={124} rx={12} fill="#C9A6D9" opacity={lerp(1, 0.55, sh)} /><rect x={-106} y={-48} width={212} height={96} rx={8} fill="none" stroke="#8E6AA8" strokeWidth={4} /><text x={0} y={14} textAnchor="middle" fill="#5E3F78" style={{ font: '400 44px "Bebas Neue"' }}>LOCAL</text></g>
              <g opacity={on(f, fast, 8)}><path d="M720 400 L720 700 M690 660 L720 700 L750 660" fill="none" stroke={P.coral} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" /></g>
            </g> })()}
          <g opacity={on(f, savings, 10)}>
            <SaverJar x={1300} y={GROUND} w={320} h={420} fill={lerp(0.1, 0.7, on(f, savings, 40))} />
            {[0, 1, 2].map((k) => { const fl = fly(f, savings + 6 + k * 8, [1060, 380], [1300, 560], 18, 80); return fl.t < 1 ? <SCoin key={k} x={fl.x} y={fl.y} s={0.7} o={fl.o} /> : null })}
            <g opacity={on(f, digital, 8)}><SCoin x={1300} y={GROUND - 260} s={1.2} /></g>
            <Label x={1300} y={GROUND + 70} text="SAVINGS" size={50} font="Bebas Neue" color={P.ink} />
          </g>
        </g>}
      </g>}

      {/* # C) the two biggest: two towers of coins */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <g opacity={on(f, end16, 8)}><rect x={880} y={290} width={160} height={56} rx={14} fill={P.navy3} /><text x={960} y={330} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>END OF 2025</text></g>
        <g opacity={on(f, worth16, 6) * (1 - on(f, worth16 + 24, 10))}><ellipse cx={700} cy={GROUND - 300} rx={160} ry={300} fill={P.gold} opacity={0.22} /></g>
        {([[700, usdt, d186, 186, 'USDT', '#26A17B', '$186B', 'TETHER'], [1220, usdc, d75, 75, 'USDC', P.sky, '$75B', 'CIRCLE']] as [number, number, number, number, string, string, string, string][]).map(([x, at, num, v, t, col, lab, maker], k) => {
          const h = lerp(60, v * 2.3, on(f, num, 30))
          return <g key={k} opacity={on(f, two + k * 4, 10)}>
            <rect x={x - 120} y={GROUND - h} width={240} height={h} rx={16} fill={col} opacity={0.35 + 0.65 * on(f, at, 10)} />
            {Array.from({ length: Math.floor(h / 40) }, (_, r) => <rect key={r} x={x - 120} y={GROUND - 40 - r * 40} width={240} height={6} fill="#000" opacity={0.1} />)}
            <SCoin x={x} y={GROUND - h - 70} s={1.3} text={t} color={col} spin={k ? (f >= usdc17 ? Math.max(0, 1 - span(f, usdc17, usdc17 + 16)) : 0) : (f >= coins16 ? Math.max(0, 1 - span(f, coins16, coins16 + 16)) : 0)} glow={k ? on(f, usdc17, 8) * (1 - on(f, d75 + 20, 10)) : on(f, coins16, 8) * (1 - on(f, usdc17, 10))} />
            {k === 1 && <g opacity={on(f, second, 8)}><circle cx={x + 150} cy={GROUND - h - 70} r={44} fill={P.navy3} /><text x={x + 150} y={GROUND - h - 54} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 44px "Bebas Neue"' }}>2ND</text></g>}
            <g opacity={on(f, num, 8)}><Label x={x} y={GROUND - h - 160} text={lab} size={70} font="Bebas Neue" color={P.ink} /></g>
            <g opacity={on(f, k ? circle : usdt, 8)}><Label x={x} y={GROUND + 70} text={maker} size={52} font="Bebas Neue" color={P.ink2} /></g>
          </g>
        })}
      </g>}

      {/* # D) how it stays at $1: swap arrows, then a dollar for every coin */}
      {D > 0 && <g opacity={D}>
        <Ground y={GROUND} />
        <g opacity={1 - on(f, holds, 10)}>
          <SCoin x={640} y={560} s={2.4} o={on(f, s18c, 8)} spin={Math.max(0, 1 - span(f, stay, stay + 16))} />
          <g opacity={on(f, company19, 8)}><CoinHQ x={200} y={GROUND} s={0.5} sign="COIN CO." /></g>
          <g opacity={on(f, promise20, 8)} transform="translate(960 300)"><circle r={54} fill={P.gold} /><path d="M-22 0 L-6 16 L24 -18" fill="none" stroke="#FFFFFF" strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" /></g>
          <g opacity={on(f, swapped, 8)}>
            <path d="M840 500 Q960 420 1080 500" fill="none" stroke={P.ink2} strokeWidth={10} strokeLinecap="round" /><path d="M1060 470 L1080 500 L1046 510" fill="none" stroke={P.ink2} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1080 620 Q960 700 840 620" fill="none" stroke={P.ink2} strokeWidth={10} strokeLinecap="round" /><path d="M860 650 L840 620 L874 610" fill="none" stroke={P.ink2} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <g opacity={0.35 * on(f, s18c, 8) + 0.65 * on(f, real19, 8)}><Dollar x={1300} y={560} s={1.6} /></g>
          <g opacity={on(f, promises, 8)}><Label x={960} y={GROUND + 60} text="SWAP BACK ANY TIME" size={52} font="Bebas Neue" color={P.ink2} /></g>
        </g>
        <g opacity={on(f, holds, 10)}>
          <Vault x={1360} y={GROUND} s={0.95} door={on(f, cash, 16)} fill={lerp(0, 0.5, span(f, every20, made20 + 20))} tbills={on(f, safe, 10) * 0.6} label="$1 PER COIN" />
          {/* # a row of coins; each one sends a dollar into the vault */}
          {[0, 1, 2, 3].map((k) => { const at = every20 + k * 6, fl = fly(f, at, [300 + k * 150, 600], [1360, GROUND - 220], 16, 120)
            return <g key={k}><SCoin x={300 + k * 150} y={700} s={0.9} o={on(f, holds + k * 3, 8)} />
              {fl.t < 1 && f >= at && <Dollar x={fl.x} y={fl.y} s={0.5} o={fl.o} />}</g> })}
        </g>
      </g>}

      {/* # E) Maya and her app */}
      {E > 0 && <g opacity={E}>
        <Ground y={GROUND} />
        {(() => {
          const beats: Beat[] = [[0, 'walkA', 'smiling', 'walkB', 12], [maya22 - 4, 'phone', 'smiling'], [d1000, 'phone', 'smiling'], [s24, 'scratchHead', 'thinking']]
          const mx = lerp(-160, 560, on(f, meet, 30))
          const pt = on(f, app22, 14)
          return <g>
            <Person f={f} who="investorF" beats={beats} x={mx} y={GROUND} s={0.85} />
            <g opacity={on(f, follow21, 8) * (1 - on(f, app22, 8))}>{[0, 1, 2, 3].map((k) => <ellipse key={k} cx={700 + k * 110} cy={GROUND - 10 - (k % 2) * 18} rx={26} ry={12} fill={P.ink2} opacity={0.5 * on(f, follow21 + k * 4, 6)} />)}</g>
            <g opacity={on(f, meet, 8) * (1 - on(f, maya22, 8))}><Label x={mx} y={GROUND + 70} text="MAYA" size={48} font="Bebas Neue" color={P.ink2} /></g>
            {/* # her phone, big on the right, showing the app */}
            <g opacity={pt} transform={`translate(${lerp(1500, 1180, pt)} ${520 - 20 * pop(f, app23, 12) * (1 - on(f, app23 + 14, 8))})`}>
              <Phone x={0} y={0} s={1.6}>
                <rect x={-70} y={-136} width={140} height={34} rx={8} fill={f >= usdc22b ? P.skyD : P.navy3} /><text x={0} y={-111} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 24px "Bebas Neue"', letterSpacing: 2 }}>CRYPTO APP</text>
                <g opacity={on(f, d1000, 8)}><text x={0} y={-44} textAnchor="middle" fill={P.navy0} style={{ font: '400 36px "Bebas Neue"' }}>1,000 USDC</text>
                  <text x={0} y={-10} textAnchor="middle" fill="#5C6F8E" style={{ font: '400 26px "Bebas Neue"' }}>{f >= worth23 ? '= $1,000' : ''}</text></g>
                {/* # the coins, stacking on the screen */}
                {Array.from({ length: Math.round(6 * on(f, coins23, 20)) }, (_, k) => <SCoin key={k} x={-40 + (k % 3) * 40} y={70 - Math.floor(k / 3) * 46} s={0.4} />)}
              </Phone>
            </g>
            {/* # where did the dollars go? one slips out along a dashed path */}
            <g opacity={on(f, where, 8)}>
              <Route pts={[[1300, 400], [1500, 300], [1680, 360]]} p={on(f, where, 24)} />
              {(() => { const fl = fly(f, go - 6, [1300, 420], [1690, 330], 24, 80); return <Dollar x={fl.x} y={fl.y} s={0.6} r={10} o={Math.min(1, on(f, go - 6, 6))} /> })()}
            </g>
          </g>
        })()}
      </g>}
      <Vignette id="sc-what" />
    </g>
  )
}

const BEATS = ["s18", "s16:end", "s16:worth", "s18:coin", "s19:company", "s20:promise", "s21:follow", "s22:usdc", "s23:app", 's9:stablecoins', 's10:normal', 's10:bitcoin', 's10:jump', 's10:crash', 's11', 's11:not', 's11:one', 's11:dollar', 's11:today', 's11:tomorrow', 's11:year', 's12:park', 's12:trades', 's12:send', 's12:world', 's12:minutes', 's12:hour', 's13:trader', 's13:sells', 's13:stablecoin', 's13:without', 's13:bank', 's14:countries', 's14:loses', 's14:fast', 's14:savings', 's14:digital', 's15:two', 's15:usdt', 's15:usdc', 's15:circle', 's16:186', 's16:coins', 's17:usdc', 's17:second', 's17:75', 's18:stay', 's19:promises', 's19:swapped', 's19:real', 's20:holds', 's20:cash', 's20:safe', 's20:every', 's21:meet', 's22:maya', 's22:app', 's22:1000', 's23:shows', 's23:coins', 's23:worth', 's24', 's24:where', 's24:go']
export const SC_WHAT = makePiece('sc-what', 'Stablecoin long ch1: bitcoin jumps and crashes while the stablecoin stays flat at $1; uses (parking between trades, sending across the world, trader skips the bank, savings in high-inflation countries); USDT $186B and USDC $75B towers; coin ⇄ dollar swap and a dollar in the vault for every coin; Maya buys $1,000 of USDC on her phone', {
  mood: 'light', Component: What, beats: BEATS,
  sfx: [['s10:crash', 'thud', 0.25], ['s12:world', 'whoosh', 0.25], ['s13:bank', 'swish', 0.2], ['s16:186', 'pop', 0.25], ['s20:every', 'coin', 0.25], ['s22:1000', 'ding', 0.25]] })
