// ============================================================
// SHORT — "4 percent of stocks made all the gains" (s1–s29, ≈ 2:14),
// seven tall pieces. Sourced: Bessembinder (J. Financial Economics
// 2018; SSRN abstract) — 1926–2016, the best 4% of listed US stocks
// explain the market's whole net gain over T-bills, the rest together
// matched T-bills, and slightly more than 4 in 7 stocks did worse than
// one-month T-bills over their lifetime; top 10 = 37.9% of the
// S&P 500 (fund filing, June 2026).
// ============================================================
import React from 'react'
import { Emblem } from '../../logo/Emblem'
import { Mini } from '../../rig/Mini'
import { countTo, Label, PriceTag } from '../charts'
import { between, easeInOut, easeOut, FundBox, lerp, on, P, Pedestal, Platform, pop, rnd, span, Tower, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Big, H, Prop, TallStage, W } from './tall'

// # 100 stocks as a 10 × 10 grid; these four are "the 4%"
const WIN = new Set([13, 37, 62, 86])
const cell = (j: number, x0 = 180, y0 = 560, g = 80) => ({ x: x0 + (j % 10) * g, y: y0 + Math.floor(j / 10) * g })

// # a lottery ticket (face up: a colour band; face down: a "?")
const Ticket: React.FC<{ x: number; y: number; r?: number; s?: number; kind: 'lose' | 'even' | 'win'; down?: boolean; crossed?: number; o?: number }> = ({ x, y, r = 0, s = 1, kind, down, crossed = 0, o = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-60} y={-38} width={120} height={76} rx={10} fill={down ? P.navy4 : kind === 'win' ? P.gold : P.paper} stroke={down ? 'none' : P.edge} strokeWidth={3} />
    {!down && <rect x={-60} y={-12} width={120} height={14} fill={kind === 'win' ? P.goldD : kind === 'even' ? P.ink2 : P.coral} opacity={0.6} />}
    {down && <Label x={0} y={16} text="?" size={44} font="Bebas Neue" color={P.champL} />}
    {crossed > 0 && <path d="M-46 -26 L46 26 M46 -26 L-46 26" stroke={P.coral} strokeWidth={8} strokeLinecap="round" opacity={crossed} />}
  </g>
)

// ---------------------------------------------------------------- s1–s3: 4% made all the gains; 96% ≈ cash
const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const since = c('s1:since'), p4 = c('s1:4'), all = c('s1:all'), gains = c('s1:gains'), p96 = c('s2:96'), cash = c('s2:cash'), bills = c('s2:bills'), find = c('s3:find'), f4 = c('s3:4')
  const rise = on(f, all, 24), dim = on(f, p96, 16)
  const scan = span(f, find - 10, f4 + 20)
  const mag = { x: lerp(160, 900, (Math.sin(scan * Math.PI * 1.5) + 1) / 2), y: lerp(560, 1220, scan) }
  return (
    <g>
      <TallStage id="fh" f={f} />
      {Array.from({ length: 100 }, (_, j) => {
        const p = cell(j), w = WIN.has(j), k = pop(f, since + j * 0.35, 10)
        const h = w ? 40 + 380 * rise : 40
        return k > 0.01 ? <g key={j} transform={`translate(${p.x} ${p.y}) scale(${k})`}>
          {w && rise > 0.02 ? <Tower id="fh" i={j % 10} x={0} y={30} h={h} w={52} glow={on(f, gains)} /> :
            <rect x={-26} y={-26} width={52} height={52} rx={10} fill={w && f >= p4 ? P.gold : P.sky} opacity={w ? 1 : 1 - dim * 0.65} />}
        </g> : null
      })}
      {/* # the other 96: a flat line, like cash in Treasury bills */}
      <g opacity={on(f, cash)}><rect x={150} y={1290 - 70} width={780} height={6} rx={3} fill={P.ink2} opacity={0.6} /><Label x={540} y={1200} text="≈ CASH IN T-BILLS" size={40} font="Bebas Neue" color={P.ink2} o={on(f, bills)} /></g>
      <Big text={`${countTo(4, on(f, p4, 10))}% → ALL THE NET GAINS`} size={96} o={on(f, p4) * (1 - on(f, p96 - 4))} color={P.goldInk} />
      <Big text="THE OTHER 96%" size={110} o={between(f, p96, find - 6)} />
      <Big text="FIND THE 4%?" size={130} o={on(f, find - 6)} color={P.goldInk} />
      <g opacity={on(f, find - 10)}><Prop id="magnifier" x={mag.x} y={mag.y} size={200} f={f} /></g>
      <Vignette id="fh" w={W} h={H} />
    </g>
  )
}

// ---------------------------------------------------------------- s4–s9a: the study — most stocks did worse than cash
const Study: React.FC<PieceProps> = ({ f, c }) => {
  const prof = c('s4:professor'), named = c('s4:bessembinder'), every = c('s5:every'), y26 = c('s5:nineteen'), y16 = c('s5:sixteen'), asked = c('s6:asked'), beat = c('s6:beat'), cash = c('s6:cash')
  const most = c('s7:most'), not = c('s7:not'), p4 = c('s8:4'), p7 = c('s8:7'), worse = c('s8:worse'), bills = c('s8:bills'), safest = c('s9:safest'), boring = c('s9:boring'), plenty = c('s9a:plenty'), nowhere = c('s9a:nowhere')
  const A = 1 - on(f, most - 6), B = between(f, most - 6, plenty - 6), C = on(f, plenty - 6)
  const line = easeInOut(span(f, y26, y16 + 10))
  return (
    <g>
      <TallStage id="fs" f={f} />
      <g opacity={A}>
        {/* # the professor, and a long timeline of stocks being born */}
        <g opacity={on(f, prof)}><Pedestal x={250} y={760} r={110} /><Mini look="investor" x={230} y={760} scale={1.5} frame={f} seed={41} mood="neutral" />
          <g transform="translate(240 500)"><Prop id="graduation-cap" x={0} y={0} size={110} f={f} /></g>
          <Label x={250} y={850} text="Hendrik Bessembinder" size={36} color={P.ink} o={on(f, named)} /></g>
        <rect x={140} y={1050} width={800 * line} height={8} rx={4} fill={P.ink2} />
        <Label x={140} y={1110} text="1926" size={48} font="Bebas Neue" anchor="start" color={P.ink} o={on(f, y26)} />
        <Label x={940} y={1110} text="2016" size={48} font="Bebas Neue" anchor="end" color={P.ink} o={on(f, y16)} />
        {Array.from({ length: 60 }, (_, k) => { const x = 150 + rnd(k * 3) * 780, t = (x - 140) / 800; return t <= line ? <rect key={k} x={x - 7} y={1020 - rnd(k * 5) * 260} width={14} height={14} rx={3} fill={P.sky} opacity={0.8} /> : null })}
        <Label x={W / 2} y={330} text="EVERY LISTED US STOCK" size={84} font="Bebas Neue" color={P.ink} o={on(f, every) * (1 - on(f, asked - 4))} />
        {/* # did it beat plain cash? */}
        <g opacity={on(f, asked)}>
          <Big text="DID IT BEAT PLAIN CASH?" size={84} o={1} />
          <g transform={`translate(700 640) scale(${pop(f, beat)})`}><Prop id="chart-board" x={0} y={0} size={170} f={f} /></g>
          <Label x={700} y={790} text="vs" size={60} font="Bebas Neue" color={P.ink2} o={on(f, cash)} />
          <g transform={`translate(860 640) scale(${pop(f, cash)})`}><Prop id="cash-stack" x={0} y={0} size={150} f={f} /></g>
        </g>
      </g>
      {/* # most did not: 4 in every 7 lost to T-bills */}
      <g opacity={B}>
        <Big text={f < p4 ? 'MOST DID NOT' : 'MORE THAN 4 IN 7'} size={120} o={on(f, not)} color={P.coralInk} />
        {Array.from({ length: 35 }, (_, j) => {
          const x = 220 + (j % 7) * 106, y = 520 + Math.floor(j / 7) * 120, lose = j % 7 < 4, k = pop(f, p7 + (j % 7) * 2, 12)
          return <g key={j} transform={`translate(${x} ${y}) scale(${Math.max(0.6, k)})`}><circle r={40} fill={lose && f >= worse ? P.coral : P.sky} opacity={0.9} />
            {lose && f >= worse && <path d="M-16 -16 L16 16 M16 -16 L-16 16" stroke={P.white} strokeWidth={7} strokeLinecap="round" />}</g>
        })}
        <Label x={W / 2} y={1150} text="did worse than one-month T-bills" size={44} color={P.ink} o={on(f, bills)} />
        <g opacity={on(f, safest)} transform={`translate(880 440) scale(${pop(f, safest)})`}><Prop id="piggy-bank" x={0} y={0} size={110} f={f} /></g>
        <Label x={W / 2} y={460} text="…than the most boring thing you can own" size={40} color={P.ink2} o={on(f, boring)} />
      </g>
      {/* # companies people knew, going nowhere: buildings beside a flat line */}
      <g opacity={C}>
        {Array.from({ length: 6 }, (_, k) => <g key={k}><Tower id="fs" i={k} x={200 + k * 140} y={1000} h={(200 + k * 20) * pop(f, plenty + k * 3)} w={80} />
          <g opacity={on(f, c('s9a:believed') + k * 2)}><path d="M0 -10 C-12 -24 -30 -8 0 14 C30 -8 12 -24 0 -10 Z" fill={P.coral} transform={`translate(${200 + k * 140} ${1000 - 280 - k * 20}) scale(1.3)`} /></g></g>)}
        <path d={`M140 ${1080} L${lerp(140, 940, on(f, c('s9a:quietly'), 30))} 1080`} stroke={P.ink2} strokeWidth={8} strokeLinecap="round" />
        <Big text="WENT NOWHERE" size={120} o={on(f, nowhere)} color={P.coralInk} />
      </g>
      <Vignette id="fs" w={W} h={H} />
    </g>
  )
}

// ---------------------------------------------------------------- s10–s13a: a few huge winners — a lottery, not a fair race
const Lottery: React.FC<PieceProps> = ({ f, c }) => {
  const tiny = c('s10:tiny'), winners = c('s10:winners'), enorm = c('s10:enormous'), paid = c('s10:paid'), race = c('s11:race'), lottery = c('s11:lottery'), prizes = c('s11:prizes')
  const lose = c('s12:lose'), even = c('s12:even'), win = c('s12:win'), rest = c('s12:rest'), nobody = c('s13:nobody'), advance = c('s13:advance'), winner = c("s13a:winner"), loser = c("s13a:loser"), giant = c('s13a:giant'), exist = c('s13a:exist')
  const A = 1 - on(f, race - 6), B = between(f, race - 6, winner - 4), C = on(f, winner - 4)
  const down = on(f, nobody, 12)
  const kindOf = (j: number): 'lose' | 'even' | 'win' => ([5, 22, 31].includes(j) ? 'win' : j % 3 === 0 ? 'even' : 'lose')
  return (
    <g>
      <TallStage id="fl" f={f} />
      <g opacity={A}>
        <Platform id="fl" cx={540} cy={1100} rx={460} ry={110} />
        {Array.from({ length: 12 }, (_, k) => {
          const big = k === 3 || k === 8, h = big ? 120 + 560 * on(f, enorm, 30) : 90 + rnd(k) * 40
          return <Tower key={k} id="fl" i={k} x={130 + k * 74} y={1090} h={h * pop(f, tiny + k)} w={52} glow={big ? on(f, winners) : 0} />
        })}
        {/* # coins rain from the two winners onto all the others */}
        {Array.from({ length: 30 }, (_, k) => { const t = span(f, paid + k * 2, paid + k * 2 + 26); return t > 0 && t < 1 ? <ellipse key={k} cx={lerp([352, 722][k % 2], 130 + (k * 5 % 12) * 74, t)} cy={lerp(420, 980, t) - Math.sin(t * Math.PI) * 80} rx={16} ry={6} fill={P.gold} /> : null })}
        <Big text="A FEW ENORMOUS WINNERS" size={90} o={on(f, enorm)} color={P.goldInk} />
      </g>
      <g opacity={B}>
        {/* # a fair race turns into a lottery: lanes become tickets */}
        <g opacity={1 - on(f, lottery - 4)}>{Array.from({ length: 5 }, (_, k) => <rect key={k} x={120} y={520 + k * 130} width={840} height={110} fill={k % 2 ? P.navy2 : P.navy3} />)}
          {Array.from({ length: 5 }, (_, k) => <g key={k} transform={`translate(${160 + on(f, race, 40) * (200 + k * 90)} ${575 + k * 130})`}><Mini look={['hero', 'owner', 'investor', 'worker', 'buyer'][k]} x={0} y={40} scale={0.6} frame={f} seed={50 + k} /></g>)}
          <Big text="A FAIR RACE?" size={120} o={on(f, race)} /></g>
        <g opacity={on(f, lottery - 4)}>
          <Big text={f < nobody ? 'A LOTTERY' : 'NOBODY KNOWS WHICH'} size={f < nobody ? 140 : 100} o={1} color={f < nobody ? P.goldInk : P.ink} />
          {Array.from({ length: 36 }, (_, j) => {
            const k = kindOf(j), x = 200 + (j % 6) * 136, y = 520 + Math.floor(j / 6) * 112, glow = k === 'win' && f >= win && down < 1
            return <g key={j}>{glow && <ellipse cx={x} cy={y} rx={80} ry={56} fill={P.gold} opacity={0.35} />}
              <Ticket x={x} y={y} kind={k} down={down > 0.5} crossed={k === 'lose' ? on(f, lose + (j % 6), 10) * (1 - down) : 0} o={pop(f, lottery + j * 0.6)} s={glow ? 1.15 : 1} r={down > 0 ? Math.sin(f / 10 + j) * 3 * down : 0} /></g>
          })}
          <Label x={W / 2} y={1250} text={f < even ? 'most lose' : f < win ? 'some break even' : f < nobody ? 'a handful win big' : 'in advance'} size={50} color={P.ink} o={on(f, lose) * (1 - on(f, advance + 30))} />
        </g>
      </g>
      {/* # today's winner can be tomorrow's loser; the next giant may not exist yet */}
      <g opacity={C}>
        <Platform id="fl2" cx={540} cy={1100} rx={460} ry={110} />
        <g transform={`rotate(${60 * easeInOut(span(f, loser, loser + 24))} 330 1090)`} opacity={1 - on(f, loser + 20) * 0.5}><Tower id="fl2" i={0} x={330} y={1090} h={460} w={110} glow={1 - on(f, loser)} /></g>
        <Label x={330} y={1180} text="TODAY'S WINNER" size={40} font="Bebas Neue" color={P.ink} o={on(f, winner)} />
        <rect x={700} y={1090 - 460} width={110} height={460} rx={8} fill="none" stroke={P.ink2} strokeWidth={5} strokeDasharray="18 14" opacity={on(f, giant)} />
        <Label x={755} y={1090 - 490} text="?" size={110} font="Bebas Neue" color={P.ink2} o={on(f, exist)} />
        <Big text="NEXT GIANT: NOT BORN YET?" size={84} o={on(f, giant)} color={P.ink} />
      </g>
      <Vignette id="fl" w={W} h={H} />
    </g>
  )
}

// ---------------------------------------------------------------- s14–s18a: an index fund buys every ticket
const Every: React.FC<PieceProps> = ({ f, c }) => {
  const reason = c('s14:reason'), guess = c('s15:guess'), buys = c('s16:buys'), every = c('s16:every'), future = c('s17:future'), giant = c('s17:giant'), own = c('s17:own'), piece = c('s17:piece')
  const pay = c('s18:pay'), losers = c('s18:losers'), never = c('s18:never'), simple = c('s18a:simple'), idea = c('s18a:idea')
  const sweep = easeInOut(span(f, every - 4, every + 30))
  const box = { x: 540, y: 1000 }
  return (
    <g>
      <TallStage id="fe" f={f} />
      <Big text={f < buys ? 'WHY INDEX FUNDS WORK' : f < future ? 'IT BUYS EVERY TICKET' : f < pay ? 'YOU ALREADY OWN A PIECE' : 'WINNERS PAY FOR LOSERS'} size={84} o={on(f, reason)} color={P.ink} />
      {/* # no guessing: a crossed-out crystal ball (the dice) */}
      <g opacity={between(f, guess - 4, buys)} transform="translate(540 560)"><Prop id="dice" x={0} y={0} size={180} f={f} /><path d="M-110 -110 L110 110 M110 -110 L-110 110" stroke={P.coral} strokeWidth={18} strokeLinecap="round" opacity={on(f, c('s15:not'))} /></g>
      {/* # 36 tickets fly into the fund */}
      {Array.from({ length: 36 }, (_, j) => {
        const sx = 200 + (j % 6) * 136, sy = 470 + Math.floor(j / 6) * 80, t = easeInOut(span(f, every - 4 + j * 0.5, every + 20 + j * 0.5))
        return f < buys - 6 ? null : <Ticket key={j} x={lerp(sx, box.x, t)} y={lerp(sy, box.y - 60, t) - Math.sin(t * Math.PI) * 100} s={lerp(0.9, 0.3, t)} r={t * 200} kind={[5, 22, 31].includes(j) ? 'win' : 'lose'} o={(1 - t * 0.9) * on(f, buys - 6)} />
      })}
      <FundBox id="fe" x={box.x} y={box.y} s={0.9} open={on(f, buys - 6) * (1 - sweep * 0.5)} label="INDEX FUND" />
      {/* # a future giant grows out of the fund: you own a slice of it already */}
      <g opacity={on(f, future)}><Tower id="fe" i={2} x={800} y={980} h={520 * easeOut(span(f, giant, own + 20))} w={100} glow={on(f, own)} />
        <g opacity={on(f, piece)} transform="translate(800 980)"><rect x={-50} y={-180} width={100} height={60} fill={P.gold} /><Label x={130} y={-140} text="yours" size={44} color={P.goldInk} /></g></g>
      {/* # winners pay for losers: coins pass from the giant to small buildings */}
      {Array.from({ length: 16 }, (_, k) => { const t = span(f, pay + k * 3, pay + k * 3 + 24); return t > 0 && t < 1 ? <ellipse key={k} cx={lerp(800, 150 + (k % 4) * 90, t)} cy={lerp(500, 1150, t) - Math.sin(t * Math.PI) * 120} rx={16} ry={6} fill={P.gold} /> : null })}
      {Array.from({ length: 4 }, (_, k) => <rect key={k} x={110 + k * 90} y={1150 - 70} width={60} height={70 * pop(f, losers + k * 2)} rx={6} fill={P.sky} opacity={0.85} />)}
      <Label x={W / 2} y={460} text="no need to know which is which" size={44} color={P.ink2} o={between(f, never, simple)} />
      <g opacity={on(f, simple)} transform={`translate(540 480) scale(${pop(f, idea)})`}><circle r={80} fill={P.mint} /><path d="M-34 0 l24 24 l46 -52" stroke={P.white} strokeWidth={16} fill="none" strokeLinecap="round" /></g>
      <Vignette id="fe" w={W} h={H} />
    </g>
  )
}

// ---------------------------------------------------------------- s19–s22: the catch — bigger companies get more; 38% in 10 that already won
const Catch: React.FC<PieceProps> = ({ f, c }) => {
  const catchW = c('s19:catch'), hiding = c('s19:hiding'), holds = c('s20:holds'), bigger = c('s20:bigger'), already = c('s20:already'), p38 = c('s21:38'), ten = c('s21:10'), winners = c('s22:winners'), won = c('s22:won')
  const tall = on(f, bigger, 30)
  return (
    <g>
      <TallStage id="fc" f={f} />
      <Big text={f < p38 ? 'THE CATCH' : `${countTo(38, on(f, p38, 18))}% IN JUST 10`} size={f < p38 ? 140 : 120} o={on(f, catchW)} color={f < p38 ? P.coralInk : P.goldInk} />
      <g opacity={on(f, hiding) * (1 - on(f, holds - 4))} transform="translate(540 760)"><FundBox id="fc" x={0} y={0} s={1.1} label="S&P 500" /><g transform={`translate(${lerp(260, 120, on(f, hiding, 20))} -120)`}><Prop id="magnifier" x={0} y={0} size={220} f={f} /></g></g>
      <g opacity={on(f, holds - 4)}>
        <Platform id="fc" cx={540} cy={1120} rx={470} ry={110} />
        {Array.from({ length: 40 }, (_, k) => {
          const top = k < 10, x = 110 + (k % 20) * 45 + (top ? 0 : 0), row = Math.floor(k / 20)
          const h = top ? lerp(60, 200 + (10 - k) * 26, tall) : lerp(60, 40, tall)
          return top ? <Tower key={k} id="fc" i={k} x={250 + k * 60} y={1080} h={h} w={46} glow={on(f, ten)} /> : <rect key={k} x={x - 14} y={1150 - row * 30 - h * 0.5} width={28} height={h * 0.5} rx={4} fill={P.sky} opacity={0.75} />
        })}
        {/* # trophies: the winners that have already won */}
        {Array.from({ length: 10 }, (_, k) => <g key={k} opacity={on(f, winners + k * 2)}><Prop id="trophy" x={250 + k * 60} y={1080 - (200 + (10 - k) * 26) - 50} size={56} f={f} /></g>)}
        <Label x={W / 2} y={460} text="bigger company → more of your money" size={44} color={P.ink} o={between(f, bigger, p38)} />
        <Label x={W / 2} y={460} text="the winners that already won" size={50} color={P.goldInk} o={on(f, won)} />
      </g>
      <Vignette id="fc" w={W} h={H} />
    </g>
  )
}

// ---------------------------------------------------------------- s23–s26b: tickets that already paid out — a different bet
const Paid: React.FC<PieceProps> = ({ f, c }) => {
  const every = c('s23:every'), anymore = c('s23:anymore'), lot = c('s24:lot'), paidOut = c('s24:paid'), prices = c('s24:prices'), keep = c('s24:keep'), work = c('s25:work'), perfectly = c('s25:perfectly')
  const different = c('s26:different'), famous = c('s26:famous'), old = c('s26a:old'), everything = c('s26a:everything'), luck = c('s26a:luck'), today = c('s26b:today'), placed = c('s26b:placed')
  const A = 1 - on(f, different - 6), B = on(f, different - 6)
  return (
    <g>
      <TallStage id="fp" f={f} />
      <g opacity={A}>
        <Big text={f < lot ? 'NOT EVERY TICKET ANYMORE' : 'TICKETS THAT ALREADY PAID'} size={84} o={on(f, every)} />
        {Array.from({ length: 12 }, (_, j) => {
          const big = j < 5, x = 220 + (j % 4) * 210, y = 560 + Math.floor(j / 4) * 200, s = big ? lerp(1, 1.5, on(f, anymore, 20)) : lerp(1, 0.6, on(f, anymore, 20))
          return <g key={j}><Ticket x={x} y={y} kind={big ? 'win' : 'lose'} s={s} o={pop(f, every + j)} />
            {big && <g opacity={on(f, paidOut + j * 2)} transform={`translate(${x} ${y}) rotate(-14)`}><rect x={-70} y={-24} width={140} height={48} rx={8} fill="none" stroke={P.coral} strokeWidth={6} /><Label x={0} y={14} text="PAID" size={40} font="Bebas Neue" color={P.coralInk} /></g>}
            {big && <g opacity={on(f, prices + j * 2)}><PriceTag x={x + 70} y={y + 70} text="$$$" s={0.55} r={-6} /></g>}
          </g>
        })}
        <Label x={W / 2} y={1210} text="priced as if they keep on paying" size={44} color={P.ink} o={on(f, keep)} />
        <g opacity={on(f, work)} transform={`translate(860 440) scale(${pop(f, perfectly)})`}><circle r={56} fill={P.mint} /><path d="M-24 0 l16 16 l32 -36" stroke={P.white} strokeWidth={12} fill="none" strokeLinecap="round" /></g>
      </g>
      {/* # two bets: the old idea (own a little of everything, let luck find you) vs today's (already placed) */}
      <g opacity={B}>
        <Big text="A DIFFERENT BET" size={120} o={on(f, different)} />
        <g transform={`translate(300 ${lerp(800, 760, on(f, old, 16))}) rotate(-4)`} opacity={on(f, famous - 6)}>
          <rect x={-200} y={-260} width={400} height={520} rx={26} fill={P.paper} stroke={P.edge} strokeWidth={3} />
          <rect x={-200} y={-260} width={400} height={90} rx={26} fill={P.sky} /><Label x={0} y={-200} text="THE OLD IDEA" size={50} font="Bebas Neue" color={P.navy0} />
          {Array.from({ length: 30 }, (_, k) => <rect key={k} x={-150 + (k % 6) * 54} y={-130 + Math.floor(k / 6) * 54} width={40} height={40} rx={8} fill={P.sky} opacity={on(f, everything)} />)}
          <g opacity={on(f, luck)} transform="translate(0 180)"><Prop id="seedling" x={0} y={0} size={110} f={f} /></g>
        </g>
        <g transform={`translate(790 ${lerp(840, 760, on(f, today, 16))}) rotate(4)`} opacity={on(f, today)}>
          <rect x={-200} y={-260} width={400} height={520} rx={26} fill={P.paper} stroke={P.edge} strokeWidth={3} />
          <rect x={-200} y={-260} width={400} height={90} rx={26} fill={P.gold} /><Label x={0} y={-200} text="TODAY" size={50} font="Bebas Neue" color={P.navy0} />
          {Array.from({ length: 10 }, (_, k) => <rect key={k} x={-150 + (k % 5) * 64} y={-120 + Math.floor(k / 5) * 140} width={44} height={120} rx={8} fill={P.gold} opacity={on(f, placed + k)} />)}
          <Label x={0} y={220} text="bet already placed" size={34} color={P.navy0} o={on(f, placed)} />
        </g>
      </g>
      <Vignette id="fp" w={W} h={H} />
    </g>
  )
}

// ---------------------------------------------------------------- s27–s29: loop back — own them all, but know where your money sits
const Loop: React.FC<PieceProps> = ({ f, c, to }) => {
  const p4 = c('s27:4'), all = c('s27:all'), owning = c('s28:owning'), catchW = c('s28:catch'), money = c('s29:money'), sitting = c('s29:sitting'), last = c('s29:last'), winners = c('s29:winners')
  const end = on(f, to - 36, 18), net = on(f, owning, 24)
  return (
    <g>
      <TallStage id="fo" f={f} />
      <g opacity={1 - end}>
        {Array.from({ length: 100 }, (_, j) => {
          const p = cell(j, 180, 560, 80), w = WIN.has(j)
          return <rect key={j} x={p.x - 26} y={p.y - 26} width={52} height={52} rx={10} fill={w && f >= p4 ? P.gold : P.sky} opacity={w ? 1 : 0.55 + 0.45 * net} transform={w && f >= all ? `translate(0 ${-20 * on(f, all)})` : undefined} />
        })}
        {/* # owning them all: a net around the whole grid catches the 4 */}
        <rect x={130} y={510} width={820 * net} height={820} rx={30} fill="none" stroke={P.mint} strokeWidth={8} strokeDasharray="22 14" opacity={net} />
        <Big text={f < owning ? '4% MADE ALL THE GAINS' : f < money ? 'OWN THEM ALL' : 'KNOW WHERE IT SITS'} size={100} o={on(f, p4 - 4)} color={f < money ? P.goldInk : P.ink} />
        {/* # your money piled on the last round of winners */}
        <g opacity={on(f, sitting)}>{[13, 37, 62, 86].map((j, k) => { const p = cell(j, 180, 560, 80); return <g key={j}>{Array.from({ length: Math.round(8 * on(f, last + k * 3, 20)) }, (_, i) => <ellipse key={i} cx={p.x} cy={p.y - 40 - i * 9} rx={24} ry={7} fill={i % 2 ? P.gold : P.goldD} />)}</g> })}
          <Label x={W / 2} y={1250} text="the last round of winners" size={46} color={P.goldInk} o={on(f, winners)} /></g>
        <g opacity={on(f, catchW) * (1 - on(f, sitting))}><Label x={W / 2} y={1250} text="you catch them" size={46} color={P.mintInk} /></g>
      </g>
      <g opacity={end}><svg x={W / 2 - 80} y={620} width={160} height={160}><Emblem size={160} /></svg>
        <Label x={W / 2} y={870} text="CAPITALCODE" size={80} font="Bebas Neue" color={P.ink} /></g>
      <Vignette id="fo" w={W} h={H} />
    </g>
  )
}

const beat = (sid: string, ws: string[]) => ws.map((w) => (w ? `${sid}:${w}` : sid))
export const FOURPERCENT = [
  makePiece('f4-hook', 'Short: 4% of stocks made all the net gains; 96% ≈ cash', { canvas: 'tall', mood: 'dark', Component: Hook,
    beats: [...beat('s1', ['since', 'about', '4', 'american', 'stocks', 'created', 'all', 'market\'s', 'net', 'gains']), ...beat('s2', ['', 'other', '96', 'added', 'together', 'about', 'parking', 'cash', 'treasury', 'bills']), ...beat('s3', ['so', 'how', 'supposed', 'find', '4'])],
    sfx: [['s1:4', 'ding', 0.5], ['s1:all', 'riser', 0.5], ['s1:gains', 'chime', 0.5], ['s2:96', 'thud', 0.5], ['s2:cash', 'cash', 0.4], ['s3:find', 'swish', 0.5]] }),
  makePiece('f4-study', 'Short: Bessembinder — most stocks did worse than cash', { canvas: 'tall', mood: 'light', Component: Study,
    beats: [...beat('s4', ['this', 'comes', 'finance', 'professor', 'named', 'hendrik', 'bessembinder']), ...beat('s5', ['he', 'looked', 'every', 'listed', 'stock', 'from', 'nineteen', 'twentysix', 'all', 'way', 'twenty', 'sixteen']),
      ...beat('s6', ['and', 'asked', 'simple', 'question', 'each', 'one', 'did', 'beat', 'plain', 'cash']), ...beat('s7', ['most', 'not']), ...beat('s8', ['slightly', 'more', '4', 'every', '7', 'stocks', 'worse', 'lifetime', 'onemonth', 'treasury', 'bills']),
      ...beat('s9', ['that', 'safest', 'most', 'boring', 'thing', 'own']), ...beat('s9a', ['plenty', 'companies', 'people', 'knew', 'believed', 'quietly', 'went', 'nowhere'])],
    sfx: [['s4:professor', 'pop', 0.5], ['s5:nineteen', 'swish', 0.4], ['s5:sixteen', 'tick', 0.4], ['s6:beat', 'pop', 0.4], ['s7:not', 'thud', 0.5], ['s8:7', 'pop', 0.4], ['s8:worse', 'glitch', 0.4], ['s9a:nowhere', 'thud', 0.4]] }),
  makePiece('f4-lottery', 'Short: a few enormous winners — a lottery, not a fair race', { canvas: 'tall', mood: 'dark', Component: Lottery,
    beats: [...beat('s10', ['meanwhile', 'tiny', 'group', 'winners', 'grew', 'enormous', 'paid', 'everything', 'else']), ...beat('s11', ['', 'makes', 'stock', 'market', 'less', 'fair', 'race', 'more', 'lottery', 'few', 'gigantic', 'prizes']),
      ...beat('s12', ['most', 'tickets', 'lose', 'some', 'break', 'even', 'handful', 'win', 'big', 'make', 'rest']), ...beat('s13', ['', 'hard', 'part', 'nobody', 'tell', 'advance', 'tickets', 'winners']),
      ...beat('s13a', ["today's", 'winner', "tomorrow's", 'loser', 'next', 'giant', 'might', 'exist', 'yet'])],
    sfx: [['s10:enormous', 'riser', 0.5], ['s10:paid', 'coin', 0.5], ['s11:race', 'swish', 0.4], ['s11:lottery', 'chime', 0.5], ['s12:lose', 'tick', 0.4], ['s12:win', 'cash', 0.5], ['s13:nobody', 'flutter', 0.5], ['s13a:loser', 'thud', 0.5], ['s13a:giant', 'softpop', 0.4]] }),
  makePiece('f4-every', 'Short: an index fund buys every ticket; winners pay for losers', { canvas: 'tall', mood: 'light', Component: Every,
    beats: [...beat('s14', ['', 'real', 'reason', 'index', 'funds', 'work', 'well']), ...beat('s15', ['', 'index', 'fund', 'not', 'try', 'guess', 'winners']), ...beat('s16', ['', 'simply', 'buys', 'every', 'ticket']),
      ...beat('s17', ['', 'whenever', 'future', 'giant', 'shows', 'already', 'own', 'small', 'piece']), ...beat('s18', ['', 'winners', 'pay', 'losers', 'never', 'know', 'which', 'which#2']), ...beat('s18a', ['', 'beautifully', 'simple', 'idea'])],
    sfx: [['s15:guess', 'glitch', 0.3], ['s16:every', 'flutter', 0.6], ['s17:giant', 'riser', 0.4], ['s17:piece', 'ding', 0.5], ['s18:pay', 'coin', 0.5], ['s18a:simple', 'chime', 0.5]] }),
  makePiece('f4-catch', 'Short: the catch — 38% in 10 winners that already won', { canvas: 'tall', mood: 'dark', Component: Catch,
    beats: [...beat('s19', ['but', 'catch', 'hiding', 'inside', "today's", 'index']), ...beat('s20', ['', 'sp', '500', 'fund', 'holds', 'more', 'each', 'company', 'bigger', 'company#2', 'already']),
      ...beat('s21', ['right', 'about', '38', 'sits', 'just', '10', 'companies']), ...beat('s22', ['those', 'winners', 'already', 'won'])],
    sfx: [['s19:catch', 'thud', 0.5], ['s19:hiding', 'swish', 0.4], ['s20:bigger', 'riser', 0.4], ['s21:38', 'pop', 0.5], ['s21:10', 'chime', 0.5], ['s22:winners', 'ding', 0.4]] }),
  makePiece('f4-paid', 'Short: tickets that already paid out — a different bet', { canvas: 'tall', mood: 'light', Component: Paid,
    beats: [...beat('s23', ['so', 'not', 'holding', 'every', 'ticket', 'anymore']), ...beat('s24', ['you', 'holding', 'lot', 'tickets', 'already', 'paid', 'out', 'prices', 'assume', 'keep', 'paying']),
      ...beat('s25', ['that', 'might', 'work', 'perfectly', 'well']), ...beat('s26', ['but', 'different', 'bet', 'one', 'made', 'index', 'funds', 'famous']),
      ...beat('s26a', ['', 'old', 'idea', 'own', 'little', 'everything', 'luck', 'find']), ...beat('s26b', ['today', 'big', 'part', 'money', 'already', 'placed', 'bet'])],
    sfx: [['s24:paid', 'softpop', 0.5], ['s24:prices', 'cash', 0.4], ['s25:perfectly', 'ding', 0.4], ['s26:different', 'swish', 0.5], ['s26a:luck', 'chime', 0.4], ['s26b:placed', 'thud', 0.5]] }),
  makePiece('f4-loop', 'Short: loop back — 4% made all the gains; own them all, know where your money sits', { canvas: 'tall', mood: 'dark', Component: Loop,
    beats: [...beat('s27', ['about', '4', 'stocks', 'made', 'all', 'gains']), ...beat('s28', ['owning', 'them', 'all', 'how', 'make', 'sure', 'catch']), ...beat('s29', ['just', 'know', 'how', 'much', 'money', 'already', 'sitting', 'last', 'round', 'winners'])],
    sfx: [['s27:4', 'ding', 0.5], ['s28:owning', 'whoosh', 0.5], ['s28:catch', 'chime', 0.5], ['s29:sitting', 'coin', 0.5]] }),
]
