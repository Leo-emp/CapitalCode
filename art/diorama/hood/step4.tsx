// ---------------------------------------------------------------- s61–s74: step four — did Leo pay anything? (navy: the catch)
// A) Leo's phone receipt: commission $0 ✓, a price a little better than the screen ✓.
// B) The catch: on a small ladder, Leo's line at $100.03 and a dashed line a little lower with a "?". Three towers
//    line up; auction paddles rise; the winner gives a bigger share of the spread — a coin travels to Leo.
// C) The SEC's estimate: a $1.5B-a-year pile for all brokers together (five apps around it, one is Robinhood); it
//    crumbles into tiny dots over a big crowd — very little per trade, nobody notices.
// D) Once it wasn't small: a gavel and a $65M stamp (2020); a 2015–2018 strip where Robinhood's price bars sit worse
//    than other brokers', fed by a fat stream of payments; a $34M pile slides away from the customers even after a
//    "$0 commission" sign; a SETTLED stamp — without admitting or denying.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { HSpot as Spot } from './kit'
import { Headline, Label, Person, Stamp, Tick, fly, win } from '../aimoney/common'
import { Ground, Gavel } from '../power/kit2'
import { GovBuilding, Stack } from '../fee/kit'
import { Mini } from '../../rig/Mini'
import { AppPhone, Cent, Ladder, Paddle, Tower } from './kit'

const GROUND = 920
const NAVY = '#1B2A4A'

const Step4: React.FC<PieceProps> = ({ f, c }) => {
  const did = c('s61:did'), leo61 = c('s61:leo'), anything = c('s61:anything')
  const paid62 = c('s62:paid'), no62 = c('s62:no'), commission62 = c('s62:commission'), better62 = c('s62:better'), screen62 = c('s62:screen')
  const catch63 = c('s63:catch'), even63 = c('s63:even'), price63 = c('s63:price')
  const more64 = c('s64:more'), compete64 = c('s64:compete'), offered = c('s64:offered')
  const auction65 = c('s65:auction'), several = c('s65:several'), bid65 = c('s65:bid'), winner = c('s65:winner'), bigger = c('s65:bigger'), spread65 = c('s65:spread')
  const sec66 = c('s66:sec'), studied = c('s66:studied')
  const estimated = c('s67:estimated'), shortfall = c('s67:shortfall'), d15 = c('s67:15'), year67 = c('s67:year'), small67 = c('s67:small'), auction67 = c('s67:auction')
  const covered = c('s68:covered'), all68 = c('s68:all'), robinhood68 = c('s68:robinhood')
  const millions = c('s69:millions'), billions = c('s69:billions'), little = c('s69:little'), nobody = c('s69:nobody'), notices = c('s69:notices')
  const once = c('s70:once'), small70 = c('s70:small')
  const sec71 = c('s71:sec'), fined = c('s71:fined'), d65 = c('s71:65')
  const between = c('s72:between'), customers72 = c('s72:customers'), worse = c('s72:worse'), other72 = c('s72:other'), unusually = c('s72:unusually'), payments72 = c('s72:payments')
  const counting = c('s73:counting'), commissions73 = c('s73:commissions'), saved73 = c('s73:saved'), lost = c('s73:lost'), d34 = c('s73:34')
  const settled = c('s74:settled'), admitting = c('s74:admitting'), denying = c('s74:denying'), past = c('s74:past')
  const AB = catch63 - 4, BC = sec66 - 4, CD = once - 4
  const A = win(f, did - 30, AB), B = win(f, AB, BC), C = win(f, BC, CD), D = on(f, CD, 10)
  const D1 = win(f, CD, counting - 4), D2 = on(f, counting - 4, 10)
  return (
    <g>
      <Stage id="hd-step4" frame={f} />
      <Spot f={f} at={c("s66")} x={380} y={700} rx={220} ry={240} />
      <Spot f={f} at={c("s67:compete")} x={960} y={760} rx={220} ry={240} />
      <Spot f={f} at={c("s72:2015")} x={970} y={280} rx={220} ry={70} />
      <Spot f={f} at={c("s72:2018")} x={970} y={280} rx={220} ry={70} />
      <Spot f={f} at={c("s64:order")} x={520} y={400} rx={260} ry={120} />
      <Spot f={f} at={c("s64:offered")} x={520} y={440} rx={260} ry={120} />
      <Spot f={f} at={c("s65:spread")} x={560} y={420} rx={160} ry={120} />
      <Spot f={f} at={c("s66:studied")} x={380} y={700} rx={220} ry={240} />
      <Spot f={f} at={c("s67:year")} x={960} y={760} rx={220} ry={240} />
      <Spot f={f} at={c("s67:investors")} x={960} y={760} rx={220} ry={240} />
      <Spot f={f} at={c("s67:auction")} x={960} y={760} rx={220} ry={240} />
      <Spot f={f} at={c("s69:shares")} x={960} y={760} rx={700} ry={260} />
      <Spot f={f} at={c("s69:trade")} x={960} y={760} rx={700} ry={260} />
      <Spot f={f} at={c("s70:small")} x={760} y={800} rx={160} ry={160} />
      <Spot f={f} at={c("s72:found")} x={960} y={700} rx={400} ry={260} />
      <Spot f={f} at={c("s72:robinhood")} x={1300} y={800} rx={160} ry={200} />
      <Spot f={f} at={c("s72:makers")} x={1660} y={700} rx={160} ry={240} />
      <Spot f={f} at={c("s73:even")} x={600} y={760} rx={420} ry={240} />
      <Spot f={f} at={c("s74:robinhood")} x={1520} y={360} rx={240} ry={120} />
      <Spot f={f} at={c("s74:findings")} x={1520} y={480} rx={300} ry={90} />
      <Spot f={f} at={c("s74:practices")} x={1520} y={420} rx={300} ry={160} />
      <g opacity={on(f, c("s71"), 8) * (1 - on(f, c("s72:between"), 8))}><rect x={910} y={260} width={180} height={56} rx={14} fill={P.navy3} /><text x={1000} y={300} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>2020</text></g>
      <Headline f={f} lines={[[did, 'STEP 4: DID LEO PAY ANYTHING?', P.ink, 92], [catch63, 'THE CATCH: AN EVEN BETTER PRICE?', P.coralInk, 92], [auction65, 'AN AUCTION FOR HIS ORDER', P.ink, 100], [d15, 'SEC: ≈ $1.5 BILLION A YEAR', P.ink, 100], [covered, 'ALL BROKERS TOGETHER', P.ink, 100], [little, 'VERY LITTLE PER TRADE', P.ink, 100], [once, '', P.ink], [d65, '2020: SEC FINES ROBINHOOD $65M', P.coralInk, 92], [worse, 'WORSE PRICES THAN OTHER BROKERS', P.ink, 92], [d34, 'CUSTOMERS LOST ≈ $34M', P.coralInk, 100], [settled, 'SETTLED · NO ADMISSION', P.ink, 100]]} />

      {/* # A) the receipt: two ticks */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <Person f={f} who="buyer" beats={[[0, 'phone', 'thinking'], [no62, 'phone', 'smiling'], [better62, 'thumbsUp', 'smiling']]} x={420} y={GROUND} s={0.85} />
        <AppPhone x={1080} y={540} s={1.25} shares="BOUGHT 100" />
        <g opacity={on(f, commission62, 8)}><Tick x={1380} y={380} o={1} r={40} /><Label x={1440} y={396} text="COMMISSION $0" size={48} font="Bebas Neue" color={P.ink} anchor="start" /></g>
        <g opacity={on(f, better62, 8)}><Tick x={1380} y={500} o={1} r={40} /><Label x={1440} y={516} text="1¢ BETTER PRICE" size={48} font="Bebas Neue" color={P.ink} anchor="start" /></g>
      </g>}

      {/* # B) the catch: could it be better? an auction */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <g transform="translate(520 460) scale(0.75)">
          <Ladder x={0} y={0} gap={320} />
          <line x1={-230} y1={-80} x2={230} y2={-80} stroke={P.coralD} strokeWidth={6} strokeDasharray="14 8" />
          <text x={-250} y={-66} textAnchor="end" fill={P.ink} style={{ font: '400 40px "Bebas Neue"' }}>LEO $100.03</text>
          <g opacity={on(f, even63, 8)}><line x1={-230} y1={-20} x2={230} y2={-20} stroke={P.mint} strokeWidth={6} strokeDasharray="6 10" /><text x={260} y={-4} fill={P.mintInk} style={{ font: '400 64px "Bebas Neue"' }}>?</text></g>
        </g>
        {[0, 1, 2].map((k) => <g key={k} opacity={on(f, more64 + k * 4, 10)}><Tower x={1160 + k * 250} y={GROUND} s={0.6} f={f + k * 9} sign={`FIRM ${k + 1}`} /></g>)}
        {[0, 1, 2].map((k) => { const up = on(f, bid65 + k * 5, 10), win3 = k === 2 ? on(f, winner, 8) : 0
          return <g key={k} opacity={on(f, several, 8)}><Paddle x={1160 + k * 250} y={lerp(GROUND - 300, GROUND - 440, up)} s={0.9} n={['1', '2', '3'][k]} color={win3 > 0.5 ? P.mint : P.coral} />
            {k === 2 && win3 > 0 && <circle cx={1660} cy={lerp(GROUND - 300, GROUND - 440, up) - 40} r={80} fill={P.gold} opacity={0.25 * win3} />}</g> })}
        {f >= bigger && (() => { const fl = fly(f, bigger, [1660, GROUND - 480], [560, 400], 26, 160); return <Cent x={fl.x} y={fl.y} r={30} t="¢" /> })()}
      </g>}

      {/* # C) the SEC's estimate: all brokers together; spread over millions */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <g opacity={on(f, c('s66'), 10) * (1 - on(f, millions, 10))}><GovBuilding x={380} y={GROUND} s={0.8} /><g opacity={on(f, c('s66'), 8)}><rect x={300} y={GROUND - 470} width={160} height={56} rx={14} fill={P.navy3} /><text x={380} y={GROUND - 430} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>2022</text></g><Label x={380} y={GROUND + 70} text="SEC" size={56} font="Bebas Neue" color={NAVY} /></g>
        {/* # the pile */}
        <g opacity={on(f, estimated, 10) * (1 - on(f, millions, 12))}>
          <Stack x={960} y={GROUND - 10} n={Math.round(lerp(3, 18, on(f, d15, 26)))} w={220} />
          <g opacity={on(f, d15, 8)}><Label x={960} y={GROUND + 70} text="≈ $1.5B A YEAR" size={56} font="Bebas Neue" color={NAVY} /></g>
          <g opacity={on(f, shortfall, 8) * (1 - on(f, all68, 8))}><Label x={960} y={420} text="COMPETITIVE SHORTFALL" size={46} font="Bebas Neue" color={P.ink} /></g>
        </g>
        {/* # all brokers' apps around it */}
        <g opacity={on(f, all68, 8) * (1 - on(f, millions, 12))}>{[0, 1, 2, 3, 4].map((k) => { const a = Math.PI * (0.15 + k * 0.175), x = 960 + Math.cos(a) * -520, y = 640 - Math.sin(a) * 300
          return <g key={k}><AppPhone x={x} y={y} s={0.32} />{k === 2 && <g opacity={on(f, robinhood68, 8)}><Label x={x} y={y + 110} text="ROBINHOOD" size={36} font="Bebas Neue" color={P.ink} /></g>}</g> })}</g>
        {/* # spread over a big crowd: tiny dots each */}
        <g opacity={on(f, millions, 10)}>
          {Array.from({ length: 24 }, (_, k) => { const row = Math.floor(k / 8), col = k % 8
            return <g key={k} opacity={on(f, millions + k, 6)}><Mini look={['buyer', 'investorF', 'hero', 'investor', 'worker', 'owner'][(k + row) % 6]} x={300 + col * 190 + (row % 2) * 95} y={GROUND - row * 130} scale={0.55} frame={f} seed={k + 140} mood="neutral" />
              <Cent x={300 + col * 190 + (row % 2) * 95} y={GROUND - row * 130 - 170} r={7} o={on(f, billions, 8)} /></g> })}
          <g opacity={on(f, nobody, 8)}><Label x={960} y={GROUND + 70} text="NOBODY NOTICES" size={52} font="Bebas Neue" color={NAVY} /></g>
        </g>
      </g>}

      {/* # D) 2020: the fine, the worse prices, the $34M, settled */}
      {D > 0 && <g opacity={D}>
        <Ground y={GROUND} />
        {D1 > 0 && <g opacity={D1}>
          <g opacity={on(f, once, 8)}><Stack x={760} y={GROUND - 10} n={Math.round(lerp(2, 14, on(f, small70, 24)))} w={180} color={P.coral} /></g>
          <g opacity={on(f, once, 10)}><GovBuilding x={360} y={GROUND} s={0.7} /><Label x={360} y={GROUND + 70} text="SEC · 2020" size={50} font="Bebas Neue" color={NAVY} /></g>
          <g transform={`translate(700 ${GROUND - 330}) rotate(${lerp(-50, 15, on(f, fined, 6))})`} opacity={on(f, fined - 6, 6) * (1 - on(f, between, 8))}><Gavel x={0} y={0} s={1.6} /></g>
          <g opacity={1 - on(f, between, 8)}><Stamp x={1000} y={480} text="$65M FINE" f={f} at={d65} size={80} /></g>
          {/* # 2015–2018: price bars, Robinhood's sit worse */}
          <g opacity={on(f, between, 10)}>
            <rect x={780} y={250} width={380} height={56} rx={14} fill={P.navy3} /><text x={970} y={290} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>2015 – 2018</text>
            <g opacity={on(f, customers72, 8)}><Label x={1040} y={360} text="PRICE CUSTOMERS PAID" size={44} font="Bebas Neue" color={P.ink} /></g>
            {[0, 1, 2].map((k) => <g key={k} opacity={on(f, other72, 8)}><rect x={760 + k * 140} y={GROUND - 260} width={100} height={260} rx={10} fill={P.mint} /></g>)}
            <g opacity={on(f, customers72, 8)}><rect x={1240} y={GROUND - lerp(260, 360, on(f, worse, 16))} width={120} height={lerp(260, 360, on(f, worse, 16))} rx={10} fill={P.coral} /><Label x={1300} y={GROUND + 70} text="ROBINHOOD" size={44} font="Bebas Neue" color={NAVY} /></g>
            <g opacity={on(f, unusually, 8)}><AppPhone x={1300} y={420} s={0.35} /></g>
            <g opacity={on(f, other72, 8)}><Label x={900} y={GROUND + 70} text="OTHER BROKERS" size={44} font="Bebas Neue" color={NAVY} /></g>
            <g opacity={on(f, unusually, 8)}><Tower x={1660} y={GROUND} s={0.5} f={f} sign="MM" />
              {[0, 1, 2, 3].map((k) => { const t = ((f - payments72 + k * 7) % 28) / 28; return f >= payments72 ? <Cent key={k} x={lerp(1600, 1320, t)} y={lerp(GROUND - 420, 440, t) - Math.sin(t * Math.PI) * 60} r={26} t="$" o={Math.min(1, t * 5) * (1 - Math.max(0, t - 0.8) * 5)} /> : null })}</g>
          </g>
        </g>}
        {D2 > 0 && <g opacity={D2}>
          {Array.from({ length: 10 }, (_, k) => <g key={k}><Mini look={['buyer', 'investorF', 'hero', 'investor', 'worker'][k % 5]} x={300 + (k % 5) * 150} y={GROUND - Math.floor(k / 5) * 140} scale={0.6} frame={f} seed={k + 180} mood={f >= lost ? 'sad' : 'neutral'} /></g>)}
          <g opacity={on(f, commissions73, 8)} transform="translate(600 300) rotate(-6)"><rect x={-170} y={-34} width={340} height={68} rx={14} fill={P.gold} /><text x={0} y={14} textAnchor="middle" fill={P.navy0} style={{ font: '400 44px "Bebas Neue"' }}>{f >= saved73 ? 'COMMISSIONS SAVED ✓' : 'COMMISSIONS'}</text></g>
          <g transform={`translate(${lerp(1000, 1400, on(f, lost, 30))} 0)`} opacity={on(f, lost - 6, 8)}><Stack x={0} y={GROUND - 10} n={12} w={200} color={P.coral} />
            <g opacity={on(f, d34, 8)}><Label x={0} y={GROUND + 70} text="≈ $34M LOST" size={54} font="Bebas Neue" color={NAVY} /></g></g>
          <g opacity={on(f, settled, 8)}><Stamp x={1520} y={360} text="SETTLED" f={f} at={settled} size={70} color={P.skyInk} /></g>
          <g opacity={on(f, admitting, 8)}><Label x={1520} y={480} text="NO ADMISSION, NO DENIAL" size={44} font="Bebas Neue" color={P.ink} /></g>
        </g>}
      </g>}
      <Vignette id="hd-step4" />
    </g>
  )
}

const BEATS = ["s66", "s67:compete", "s72:2015", "s72:2018", "s64:order", "s64:offered", "s65:spread", "s66:studied", "s67:year", "s67:investors", "s67:auction", "s69:shares", "s69:trade", "s70:small", "s72:found", "s72:robinhood", "s72:makers", "s73:even", "s74:robinhood", "s74:findings", "s74:practices", "s71", 's61:did', 's61:anything', 's62:no', 's62:commission', 's62:better', 's63:catch', 's63:even', 's64:more', 's64:compete', 's65:auction', 's65:several', 's65:bid', 's65:winner', 's65:bigger', 's66:sec', 's67:estimated', 's67:shortfall', 's67:15', 's68:all', 's68:robinhood', 's69:millions', 's69:billions', 's69:nobody', 's70:once', 's71:sec', 's71:fined', 's71:65', 's72:between', 's72:customers', 's72:worse', 's72:other', 's72:unusually', 's72:payments', 's73:commissions', 's73:saved', 's73:lost', 's73:34', 's74:settled', 's74:admitting']
export const HD_STEP4 = makePiece('hd-step4', 'PFOF long step 4 (navy): Leo\'s receipt (commission $0 ✓, 1¢ better ✓); the catch — a lower dashed line "?" and an auction (three firms raise paddles, the winner gives up a bigger share, a coin goes to Leo); the SEC\'s ≈$1.5B-a-year competitive shortfall for all brokers together, spread over a big crowd (nobody notices); 2020: SEC fines Robinhood $65M — 2015–2018 worse prices than other brokers fed by unusually high payments, customers lost ≈$34M even after saved commissions; settled, no admission', {
  mood: 'dark', Component: Step4, beats: BEATS,
  sfx: [['s62:commission', 'ding', 0.2], ['s65:winner', 'ding', 0.25], ['s67:15', 'thud', 0.25], ['s69:millions', 'swish', 0.2], ['s71:fined', 'thud', 0.35], ['s73:34', 'thud', 0.3], ['s74:settled', 'pop', 0.25]] })
