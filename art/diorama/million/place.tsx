// ---------------------------------------------------------------- s8–s22: choice one, where the million goes (cream).
// A) Leo with a money bag; three numbered pedestals rise (three places).
// B) Place one, cash: the US Treasury counter; Leo's bag flies to the window, a 3-MONTHS calendar, the bag comes back
//    with a coin of interest, a loop arrow spins (over and over); the tag TREASURY BILLS hangs on the counter.
// C) Place two, bonds: a big bond certificate on a 10-year track; a coupon drops on every year mark; its price tag
//    wobbles up and down; two small wave lines: bonds (gentle) vs stocks (wild).
// D) Place three, stocks: a glass fund box holding a tiny city; "500 companies"; buildings grow and drop payout coins,
//    Leo's slice grows; then they slump and the slice shrinks.
// E) 1996 → 2025: three columns rise (cash 2M, bonds 3.1M, stocks 18.7M); then a close-up: cash 2.0M vs prices 2.1M;
//    back to the three with a gap bracket; Leo looks up at the stocks column (why not all in stocks?).
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win, fly, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { BondCert, CalPage, Street } from '../bank/kit'
import { bump, BondTrack, CityBox, MoneyBag, Treasury } from './kit'

const GROUND = 930

const Place: React.FC<PieceProps> = ({ f, c }) => {
  const first = c('s8:first'), where8 = c('s8:where'), money8 = c('s8:money')
  const simple9 = c('s9:simple'), three9 = c('s9:three'), places9 = c('s9:places'), choose9 = c('s9:choose')
  const cash10 = c('s10:cash'), lends10 = c('s10:lends'), months10 = c('s10:months'), back10 = c('s10:back'), interest10 = c('s10:interest'), again10 = c('s10:again'), over10 = c('s10:over'), bills10 = c('s10:bills')
  const bonds11 = c('s11:bonds'), lends11 = c('s11:lends'), ten11 = c('s11:ten'), interest11 = c('s11:interest'), along11 = c('s11:along')
  const price12 = c('s12:price'), up12 = c('s12:up'), down12 = c('s12:down'), paid12 = c('s12:paid'), less12 = c('s12:less'), stocks12 = c('s12:stocks')
  const stocks13 = c('s13:stocks'), slice13 = c('s13:slice'), c500 = c('s13:500'), companies13 = c('s13:companies'), fund13 = c('s13:fund'), sp13 = c('s13:sp')
  const grow14 = c('s14:grow'), profits14 = c('s14:profits'), slice14 = c('s14:slice'), struggle14 = c('s14:struggle'), shrinks14 = c('s14:shrinks')
  const leo15 = c('s15:leo'), million15 = c('s15:million'), how15 = c('s15:how'), y1996 = c('s15:1996'), checked15 = c('s15:checked'), y2025 = c('s15:2025'), later15 = c('s15:later')
  const cash16 = c('s16:cash'), m2 = c('s16:2'), bonds17 = c('s17:bonds'), m31 = c('s17:3'), stocks18 = c('s18:stocks'), payouts18 = c('s18:payouts'), m187 = c('s18:18')
  const prices19 = c('s19:prices'), things19 = c('s19:things'), cost19 = c('s19:cost'), p21 = c('s19:2'), y2025b = c('s19:2025'), y1996b = c('s19:1996')
  const pile20 = c('s20:pile'), doubled20 = c('s20:doubled'), yet20 = c('s20:yet'), less20 = c('s20:less'), start20 = c('s20:start')
  const fees21 = c('s21:fees'), gap21 = c('s21:gap'), enormous = c('s21:enormous')
  const why22 = c('s22:why'), everyone22 = c('s22:everyone'), whole22 = c('s22:whole'), stocks22 = c('s22:stocks')

  const AB = cash10 - 8, BC = bonds11 - 8, CD = stocks13 - 8, DE = how15 - 8, EF = prices19 - 8, FG = fees21 - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), Cc = win(f, BC, CD), D = win(f, CD, DE), E = win(f, DE, EF), F = win(f, EF, FG), G = on(f, FG, 10)

  // # A) Leo + three pedestals
  const aBeats: Beat[] = [[0, 'idle', 'thinking'], [first, 'hold', 'thinking'], [where8, 'scratchHead', 'thinking'], [simple9, 'countOne', 'smiling'], [three9, 'present', 'smiling']]
  // # B) the bag's trip to the Treasury window and back
  const winX = 1180, winY = GROUND - 230
  const go = fly(f, lends10, [560, GROUND - 260], [winX, winY], 22, 160)
  const back = fly(f, back10, [winX, winY], [560, GROUND - 260], 22, 160)
  const bBeats: Beat[] = [[0, 'idle', 'smiling'], [cash10, 'hold', 'smiling'], [lends10, 'offer', 'smiling'], [months10, 'think', 'thinking'], [back10, 'receive', 'smiling'], [interest10, 'thumbsUp', 'smiling'], [again10, 'offer', 'smiling'], [over10, 'receive', 'smiling'], [bills10, 'present', 'smiling']]
  const loopO = win(f, again10, bills10 + 30, 8)
  // # C) bond coupons along the track; price tag wobble
  const trackT = span(f, ten11, along11 + 30)
  const wob = on(f, up12, 6) * (1 - on(f, down12, 6)) * -1 + on(f, down12, 6) * (1 - on(f, paid12, 10))
  // # D) the city: grow, then slump
  const grow = on(f, grow14, 20) * (1 - on(f, struggle14, 16)), slump = on(f, struggle14, 18)
  const sliceS = 1 + 0.45 * grow - 0.35 * slump
  // # E) the race 1996 → 2025: 30 px per million
  const PX = 30
  const hCash = 2.0 * PX * on(f, m2, 24) + 1 * PX, hBond = 3.1 * PX * on(f, m31, 24) + 1 * PX, hStock = 18.7 * PX * on(f, m187, 40) + 1 * PX
  const yr = Math.round(lerp(1996, 2025, span(f, y1996, y2025)))
  // # F) close-up: 200 px per million
  const Q = 200
  const gBeats: Beat[] = [[FG, 'idle', 'neutral'], [gap21, 'point', 'shocked'], [why22, 'think', 'thinking'], [whole22, 'scratchHead', 'thinking']]

  const Columns = ({ o = 1, cash = hCash, bond = hBond, stock = hStock, vals = [f >= m2, f >= m31, f >= m187], start = 1 }: { o?: number; cash?: number; bond?: number; stock?: number; vals?: boolean[]; start?: number }) => (
    <g opacity={o}>
      {([[560, cash, '#7FC495', 'CASH', '≈ $2M', cash16, vals[0]], [960, bond, '#6FA8DC', 'BONDS', '≈ $3.1M', bonds17, vals[1]], [1360, stock, P.gold, 'STOCKS', '≈ $18.7M', stocks18, vals[2]]] as [number, number, string, string, string, number, boolean][]).map(([x, h, col, name, val, at, show], k) =>
        <g key={k} opacity={on(f, at, 8)}>
          <rect x={x - 110} y={GROUND - h} width={220} height={h} rx={12} fill={col} />
          <Label x={x} y={GROUND + 62} text={name} size={56} font="Bebas Neue" color={P.ink} />
          {show && <Label x={x} y={GROUND - h - 26} text={val} size={68} font="Bebas Neue" color={P.ink} o={on(f, k === 0 ? m2 : k === 1 ? m31 : m187, 8)} />}
        </g>)}
      <line x1={420} y1={GROUND - PX} x2={1500} y2={GROUND - PX} stroke={P.ink2} strokeWidth={4} strokeDasharray="10 10" opacity={0.6} />
      <Label x={1600} y={GROUND - PX + 14} text="START: $1M" size={46} font="Bebas Neue" color={P.ink2} o={start} />
    </g>
  )

  return (
    <g>
      <Stage id="m-place" frame={f} />
      <Street f={f} ground={GROUND} o={0.4} trees={[110, 1830]} lamps={[]} />
      <Ground y={GROUND} />

      {/* # A) three places */}
      {A > 0 && <g opacity={A}>
        <Person f={f} who="investor" beats={aBeats} x={300} y={GROUND} s={1.1} />
        <MoneyBag x={300 + 150} y={GROUND - 18 * bump(f, [money8])} s={1.1} t="$1M" />
        {[0, 1, 2].map((k) => { const at = [three9, places9, choose9][k]; return <g key={k} opacity={on(f, at, 8)} transform={`translate(${820 + k * 380} ${GROUND - 30 * pop(f, at, 14)})`}>
          <ellipse cx={0} cy={0} rx={150} ry={28} fill="#C9B48E" /><rect x={-150} y={-60} width={300} height={60} fill="#D9C7A6" /><ellipse cx={0} cy={-60} rx={150} ry={28} fill="#E8DABF" />
          <circle cy={-230} r={80} fill="#2E5C9A" /><text y={-200} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 96px "Bebas Neue"' }}>{k + 1}</text></g> })}
      </g>}

      {/* # B) cash: the Treasury counter */}
      {B > 0 && <g opacity={B}>
        <Treasury x={1220} y={GROUND} s={1.15} glow={Math.max(win(f, cash10, lends10, 8), win(f, c('s10:short'), bills10 + 10, 6))} />
        <Person f={f} who="investor" beats={bBeats} x={420} y={GROUND} s={1.1} />
        {go.o > 0 && f < back10 && <MoneyBag x={go.x} y={go.y + 60} s={0.8} t="$" o={f < months10 + 10 ? 1 : 0.0} />}
        {f >= back10 && <g transform={`translate(${back.x} ${back.y + 60})`}><MoneyBag x={0} y={0} s={0.8} t="$" />
          <g opacity={on(f, interest10, 8)} transform={`translate(70 -60) scale(${pop(f, interest10, 12)})`}><circle r={30} fill={P.gold} stroke={P.goldD} strokeWidth={4} /><text y={10} textAnchor="middle" fill="#7A5A1E" style={{ font: '400 32px "Bebas Neue"' }}>+$</text></g></g>}
        <g opacity={on(f, months10, 8) * (1 - on(f, again10, 8))} transform={`translate(1660 ${380 - 10 * pop(f, months10, 12)})`}><CalPage x={0} y={0} s={0.9} m="LOAN FOR" d="3 MO" col="#2E5C9A" /></g>
        {loopO > 0 && <g opacity={loopO} transform={`translate(800 ${GROUND - 470}) rotate(${(f - again10) * 4})`}>
          <path d="M-90 0 A90 90 0 1 1 0 90" fill="none" stroke={P.goldD} strokeWidth={16} strokeLinecap="round" /><path d="M-20 70 L10 92 L-14 118 Z" fill={P.goldD} /></g>}
        <g opacity={on(f, bills10, 8)} transform={`translate(1220 ${GROUND - 600 - 8 * pop(f, bills10, 12)})`}><rect x={-230} y={-44} width={460} height={76} rx={16} fill="#2E5C9A" /><text y={14} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 54px "Bebas Neue"' }}>TREASURY BILLS</text></g>
      </g>}

      {/* # C) bonds: a certificate on a 10-year track */}
      {Cc > 0 && <g opacity={Cc}>
        <g transform={`translate(${960} ${470 - 14 * pop(f, bonds11, 14)}) rotate(${4 * wob})`}><BondCert x={0} y={0} s={1.6} t="US BOND" /></g>
        <g opacity={on(f, lends11, 10)}><BondTrack x={960} y={GROUND - 130} w={1100} t={trackT} /></g>
        {/* price tag hanging off the certificate */}
        <g opacity={on(f, price12, 8) * (1 - on(f, less12, 8))} transform={`translate(1290 ${430 + 40 * wob})`}>
          <path d="M-20 -40 L150 -40 L150 40 L-20 40 L-56 0 Z" fill={wob < -0.2 ? '#3DDC97' : wob > 0.2 ? '#F06B5B' : '#F4C95D'} stroke="#B88A2E" strokeWidth={4} />
          <text x={65} y={18} textAnchor="middle" fill="#16294A" style={{ font: '400 54px "Bebas Neue"' }}>{wob < -0.2 ? 'UP' : wob > 0.2 ? 'DOWN' : 'PRICE'}</text></g>
        {/* bonds vs stocks: two wave lines */}
        <g opacity={on(f, less12, 10)} transform="translate(1500 330)">
          <rect x={-190} y={-110} width={380} height={300} rx={20} fill={P.card} />
          <path d={Array.from({ length: 30 }, (_, k) => `${k ? 'L' : 'M'}${-160 + k * 11} ${-30 + 14 * Math.sin(k / 2 + f / 10)}`).join(' ')} stroke="#2E5C9A" strokeWidth={8} fill="none" />
          <text x={0} y={30} textAnchor="middle" fill="#2E5C9A" style={{ font: '400 44px "Bebas Neue"' }}>BONDS</text>
          <g opacity={on(f, stocks12, 8)}><path d={Array.from({ length: 30 }, (_, k) => `${k ? 'L' : 'M'}${-160 + k * 11} ${100 + 42 * Math.sin(k / 1.3 + f / 8)}`).join(' ')} stroke="#B4821C" strokeWidth={8} fill="none" />
            <text x={0} y={178} textAnchor="middle" fill="#B4821C" style={{ font: '400 44px "Bebas Neue"' }}>STOCKS</text></g>
        </g>
      </g>}

      {/* # D) stocks: the city in a glass box */}
      {D > 0 && <g opacity={D}>
        <CityBox x={1120} y={GROUND} s={1.35} f={f} grow={grow} slump={slump} label={f >= c('s13:index') ? 'S&P 500 INDEX FUND' : f >= sp13 ? 'S&P 500 FUND' : f >= fund13 ? 'A FUND' : 'STOCKS'} />
        <g opacity={on(f, c500, 8) * (1 - on(f, grow14, 8))} transform={`translate(1120 ${GROUND + 62})`}><Label x={0} y={0} text={f >= companies13 ? '500 LARGE US COMPANIES' : '500'} size={56} font="Bebas Neue" color={P.ink} /></g>
        {/* payout coins rising from the roofs */}
        {[0, 1, 2, 3, 4].map((k) => { const t = ((f - profits14) / 40 + k / 5) % 1; return f > profits14 && f < struggle14 ? <circle key={k} cx={850 + k * 130} cy={GROUND - 520 - 120 * t} r={20} fill={P.gold} stroke={P.goldD} strokeWidth={4} opacity={1 - t} /> : null })}
        {/* Leo's slice: a gold wedge */}
        <g opacity={on(f, slice13, 8)} transform={`translate(400 ${GROUND - 300}) scale(${sliceS})`}>
          <path d="M0 0 L120 -60 A134 134 0 0 1 120 60 Z" fill={P.gold} stroke={P.goldD} strokeWidth={5} transform="translate(-60 0)" />
        </g>
        <g opacity={on(f, slice13, 8)}><Label x={400} y={GROUND - 130} text="LEO'S SLICE" size={54} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, slice14, 8) * (1 - on(f, struggle14, 8))}><Label x={400} y={GROUND - 460} text="▲" size={70} color={P.mintInk} /></g>
        <g opacity={on(f, shrinks14, 8)}><Label x={400} y={GROUND - 460} text="▼" size={70} color={P.coralInk} /></g>
      </g>}

      {/* # E) the 30-year race */}
      {E > 0 && <g opacity={E}>
        <g opacity={on(f, y1996, 8)} transform={`translate(1700 ${360 - 10 * pop(f, y1996, 12) - 10 * pop(f, y2025, 12)})`}><CalPage x={0} y={0} s={0.95} m={f >= y2025 ? '30 YEARS' : 'START'} d={String(yr)} col="#2E5C9A" /></g>
        <g opacity={on(f, leo15, 8) * (1 - on(f, cash16, 8))}><MoneyBag x={960} y={GROUND - 20 * pop(f, million15, 12) - 20 * pop(f, checked15, 12)} s={1.4} t="$1M" /></g>
        <Columns />
        {/* payouts put back in: coins dropping into the stock column */}
        {[0, 1, 2].map((k) => { const t = ((f - payouts18) / 24 + k / 3) % 1; return f > payouts18 && f < m187 + 40 ? <circle key={k} cx={1360} cy={GROUND - hStock - 120 + 110 * t} r={18} fill={P.gold} stroke={P.goldD} strokeWidth={4} opacity={1 - t} /> : null })}
      </g>}

      {/* # F) close-up: cash 2.0M vs prices 2.1M */}
      {F > 0 && <g opacity={F}>
        <g transform="translate(700 0)"><rect x={-130} y={GROUND - Q * 2.0 * on(f, prices19, 16)} width={260} height={Q * 2.0 * on(f, prices19, 16)} rx={14} fill="#7FC495" />
          <Label x={0} y={GROUND + 62} text="CASH PILE" size={56} font="Bebas Neue" color={P.ink} /><Label x={0} y={GROUND - Q * 2 - 26} text="$2.0M" size={68} font="Bebas Neue" color={P.ink} /></g>
        <g transform="translate(1220 0)" opacity={on(f, c('s19:years'), 8)}>
          <rect x={-130} y={GROUND - Q * lerp(1, 2.1, on(f, p21, 24))} width={260} height={Q * lerp(1, 2.1, on(f, p21, 24))} rx={14} fill="#F7B8AE" />
          {/* a price tag riding on top */}
          <g transform={`translate(0 ${GROUND - Q * lerp(1, 2.1, on(f, p21, 24)) - 70})`}><path d="M-110 -40 L80 -40 L80 40 L-110 40 L-140 0 Z" fill="#F4C95D" stroke="#B88A2E" strokeWidth={4} />
            <text x={-10} y={18} textAnchor="middle" fill="#16294A" style={{ font: '400 56px "Bebas Neue"' }}>{f >= p21 ? '$2.1M' : '$1M'}</text></g>
          <g opacity={on(f, y1996b, 8) * (1 - on(f, p21, 8))}><Label x={0} y={GROUND - 50} text="IN 1996" size={52} font="Bebas Neue" color="#FFFFFF" /></g>
          <Label x={0} y={GROUND + 62} text={f >= cost19 ? 'SAME THINGS' : 'PRICES'} size={56} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, less20, 10)}><line x1={540} y1={GROUND - Q * 2.0} x2={1380} y2={GROUND - Q * 2.0} stroke={P.coral} strokeWidth={6} strokeDasharray="16 10" />
          <Label x={1520} y={GROUND - Q * 2.05 + 14} text="A BIT SHORT" size={52} font="Bebas Neue" color={P.coralInk} /></g>
        <g opacity={on(f, y2025b, 8) * (1 - on(f, less20, 8))} transform={`translate(1560 ${400 - 10 * pop(f, y2025b, 12)})`}><CalPage x={0} y={0} s={0.85} m="1996 →" d="2025" col="#2E5C9A" /></g>
        <g opacity={win(f, pile20, doubled20, 4)}><ellipse cx={700} cy={GROUND - Q} rx={190} ry={260} fill={P.gold} opacity={0.12} /></g>
        <g opacity={win(f, doubled20, yet20 + 20, 6)}><Label x={420} y={GROUND - Q * 1.2} text="×2" size={90} font="Bebas Neue" color={P.mintInk} /></g>
        <g opacity={on(f, start20, 8)}><Label x={700} y={GROUND - Q * 1.0} text="BUYS LESS" size={52} font="Bebas Neue" color="#16294A" /></g>
      </g>}

      {/* # G) back to the three, the gap, the question */}
      {G > 0 && <g opacity={G}>
        <Columns cash={3 * PX} bond={4.1 * PX} stock={19.7 * PX} vals={[true, true, true]} start={1 - on(f, why22, 8)} />
        <g opacity={on(f, gap21, 10)}><path d={`M700 ${GROUND - 3 * PX} L760 ${GROUND - 3 * PX} L760 ${GROUND - 19.7 * PX} L1230 ${GROUND - 19.7 * PX}`} stroke={P.coral} strokeWidth={6} fill="none" strokeDasharray="14 10" />
          <Label x={640} y={GROUND - 12 * PX} text={f >= enormous ? 'HUGE GAP' : 'GAP'} size={64} font="Bebas Neue" color={P.coralInk} /></g>
        <g opacity={on(f, why22, 10)}><Person f={f} who="investor" beats={gBeats} x={1700} y={GROUND} s={1.0} />
          <g opacity={on(f, whole22, 8)} transform={`translate(1600 ${GROUND - 620}) scale(${pop(f, whole22, 12)})`}><circle r={54} fill="#FFFFFF" stroke="#CDB58C" strokeWidth={4} /><text y={22} textAnchor="middle" fill="#16294A" style={{ font: '400 70px "Bebas Neue"' }}>?</text></g></g>
        <g opacity={on(f, stocks22, 8)}><ellipse cx={1360} cy={GROUND - 300} rx={170} ry={360} fill={P.gold} opacity={0.15} /></g>
      </g>}

      <Headline f={f} lines={[[where8, 'WHERE DOES THE MILLION GO?', P.ink, 100], [cash10, 'PLACE 1: CASH', P.ink, 104], [bonds11, 'PLACE 2: BONDS', P.ink, 104], [stocks13, 'PLACE 3: STOCKS', P.ink, 104], [how15, '$1M FROM 1996 TO 2025', P.ink, 100], [prices19, 'BUT PRICES ROSE TOO', P.coralInk, 100], [fees21, 'BEFORE FEES AND TAXES', P.ink, 96], [why22, 'WHY NOT ALL IN STOCKS?', P.ink, 100]]} />
      <Vignette id="m-place" />
    </g>
  )
}

export const M_PLACE = makePiece('m-place', 'Choice one, where the million goes: three numbered pedestals; cash = Leo lends a bag to the US Treasury window for 3 months and gets it back with an interest coin, over and over (Treasury bills); bonds = a 10-year bond certificate on a track dropping coupons, a price tag wobbling up and down, a gentle bond wave vs a wild stock wave; stocks = a glass S&P 500 fund box with a tiny city of companies that grow and pay coins, then slump, Leo’s slice grows and shrinks; 1996-2025 race: cash 2M, bonds 3.1M, stocks 18.7M columns; close-up cash 2.0M vs prices 2.1M (buys a bit less); a huge gap; why not all in stocks?', {
  mood: 'light', Component: Place,
  beats: ["s8:first", "s8:where", "s8:money", "s9:simple", "s9:three", "s9:places", "s9:choose", "s10:cash", "s10:lends", "s10:months", "s10:back", "s10:interest", "s10:again", "s10:over", "s10:bills", "s11:bonds", "s11:lends", "s11:ten", "s11:along", "s12:price", "s12:up", "s12:down", "s12:paid", "s12:less", "s12:stocks", "s13:stocks", "s13:slice", "s13:500", "s13:companies", "s13:fund", "s13:sp", "s14:grow", "s14:profits", "s14:slice", "s14:struggle", "s14:shrinks", "s15:leo", "s15:million", "s15:how", "s15:1996", "s15:checked", "s15:2025", "s16:cash", "s16:2", "s17:bonds", "s17:3", "s18:stocks", "s18:payouts", "s18:18", "s19:prices", "s19:cost", "s19:2", "s19:2025", "s19:1996", "s20:pile", "s20:doubled", "s20:yet", "s20:less", "s20:start", "s21:fees", "s21:gap", "s21:enormous", "s22:why", "s22:whole", "s22:stocks", "s10:short", "s13:index", "s19:years"],
  sfx: [['s10:lends', 'whoosh', 0.12], ['s10:back', 'coin', 0.15], ['s13:500', 'pop', 0.15], ['s16:2', 'pop', 0.12], ['s17:3', 'pop', 0.12], ['s18:18', 'riser', 0.15], ['s21:enormous', 'thud', 0.15]] })
