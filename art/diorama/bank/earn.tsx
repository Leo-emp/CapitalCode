// ---------------------------------------------------------------- s21–s38: step two, how a bank earns.
// A) The bank in the middle of a street: Nora (a saver) on the left gets one small interest coin; Leo (a borrower)
//    on the right pays bigger coins in.
// B) Two plates: SAVINGS 0.38% — a $1,000 brick earns one small coin ($3.80); HOME LOAN ≈ 7.2% — a $1,000 brick
//    earns a coin stack ($71); a credit card ≈ 21% slides in. "The gap" bracket between the two piles.
// C) Real banks earn less: three bites leave the loan pile (deposits that cost more, loans never paid back, staff,
//    branches and apps) — the pile shrinks but stays above the savings coin.
// D) Thousands of banks in a row, trillions of dollars; the gaps add up into a profit mountain ($90 billion, April–June
//    2026, about 4,200 banks). Three pipes feed it: the big INTEREST GAP pipe with an engine, thinner FEES, TRADING.
// E) Bonds: the banker files money into a GOVERNMENT BOND; a bond = a loan to a government or a company, at a fixed
//    rate for years (calendar pages tick); a gold bookmark "remember this".
// F) Recap: savers → bank → borrowers; the bank keeps the difference.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, Headline, House, Label, Person, fly, hand, win, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { BankFront, BondCert, CalPage, CashBrick, Spot, Street } from './kit'

const GROUND = 930

// # a plate (a counter top) a pile sits on
const Plate: React.FC<{ x: number; y: number; t: string; col: string; o?: number }> = ({ x, y, t, col, o = 1 }) => (
  <g opacity={o} transform={`translate(${x} ${y})`}><rect x={-230} y={0} width={460} height={30} rx={12} fill={col} /><rect x={-200} y={30} width={400} height={18} rx={8} fill="#00000022" />
    <text y={100} textAnchor="middle" fill="var(--cc-ink, #16294A)" style={{ font: '400 54px "Bebas Neue"' }}>{t}</text></g>
)
// # a stack of n coins (rises as n grows)
const CoinStack: React.FC<{ x: number; y: number; n: number; o?: number }> = ({ x, y, n, o = 1 }) => (
  <g opacity={o}>{Array.from({ length: Math.max(0, Math.round(n)) }, (_, k) => <g key={k}><ellipse cx={x} cy={y - k * 18} rx={52} ry={16} fill={P.gold} stroke={P.goldD} strokeWidth={3} /></g>)}</g>
)
// # a credit card
const Card: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number }> = ({ x, y, s = 1, o = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}><rect x={-110} y={-70} width={220} height={140} rx={16} fill="#5B4BB7" /><rect x={-110} y={-36} width={220} height={26} fill="#2E2470" />
    <rect x={-84} y={8} width={44} height={32} rx={6} fill="#E9C25A" /><text x={80} y={50} textAnchor="end" fill="#FFFFFF" style={{ font: '400 30px "Bebas Neue"' }}>CREDIT</text></g>
)

const Earn: React.FC<PieceProps> = ({ f, c }) => {
  const makes = c('s21:makes'), money21 = c('s21:money')
  const basic = c('s22:basic'), pays22 = c('s22:pays'), little = c('s22:little'), keep22 = c('s22:keep'), charges = c('s22:charges'), more22 = c('s22:more'), borrow = c('s22:borrow')
  const real23 = c('s23:real'), numbers23 = c('s23:numbers')
  const october = c('s24:october'), savings24 = c('s24:savings'), p0 = c('s24:0'), p8 = c('s24:8'), year24 = c('s24:year')
  const k1000a = c('s25:1000'), d3 = c('s25:3'), cents = c('s25:cents')
  const year25 = c('s25:year'), look26 = c('s26:look'), gap35 = c('s35:gap'), banks35 = c('s35:banks'), put36 = c('s36:put'), money36 = c('s36:money')
  const borrowers = c('s26:borrowers'), paying26 = c('s26:paying')
  const home27 = c('s27:home'), loan27 = c('s27:loan'), p7 = c('s27:7'), p2 = c('s27:2')
  const k1000b = c('s28:1000'), d71 = c('s28:71'), first28 = c('s28:first')
  const credit = c('s29:credit'), cards = c('s29:cards'), p21 = c('s29:21')
  const few30 = c('s30:few'), one30 = c('s30:one'), collects = c('s30:collects'), other30 = c('s30:other'), gap30 = c('s30:gap'), heart = c('s30:heart'), business = c('s30:business')
  const real31 = c('s31:real'), less31 = c('s31:less'), example31 = c('s31:example')
  const z32 = c('s32:0'), pct32 = c('s32:percent'), deposits32 = c('s32:deposits'), cost32 = c('s32:cost'), loans32 = c('s32:loans'), never32 = c('s32:never'), staff = c('s32:staff'), branches = c('s32:branches'), apps = c('s32:apps')
  const thousands = c('s33:thousands'), trillions = c('s33:trillions'), adds = c('s33:adds')
  const months34 = c('s34:months'), april = c('s34:april'), june = c('s34:june'), k4200 = c('s34:4200'), insured = c('s34:insured'), d90 = c('s34:90'), profit34 = c('s34:profit')
  const comes35 = c('s35:comes'), fees = c('s35:fees'), trading = c('s35:trading'), engine = c('s35:engine')
  const dont36 = c("s36:don't"), loans36 = c('s36:loans'), safer = c('s36:safer'), government36 = c('s36:government'), bonds36 = c('s36:bonds')
  const bond37 = c('s37:bond'), government37 = c('s37:government'), company = c('s37:company'), fixed = c('s37:fixed'), years37 = c('s37:years'), remember = c('s37:remember'), four37 = c('s37:four')
  const step38 = c('s38:step'), borrows38 = c('s38:borrows'), savers38 = c('s38:savers'), lends38 = c('s38:lends'), higher38 = c('s38:higher'), keeps38 = c('s38:keeps'), difference38 = c('s38:difference')

  const AB = real23 - 8, BC = real31 - 8, CD = thousands - 8, DE = dont36 - 8, EF = step38 - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), Cw = win(f, BC, CD), D = win(f, CD, DE), E = win(f, DE, EF), F = on(f, EF, 10)

  // # B/C) the loan pile: grows to 8 coins on "71", then three bites take it down to 4
  const bites = on(f, cost32, 12) + on(f, never32, 12) + on(f, staff, 12)
  const loanPile = 8 * on(f, d71, 18) - 1.3 * bites

  return (
    <g>
      <Stage id="bk-earn" frame={f} />
      <Headline f={f} lines={[[makes, 'HOW A BANK MAKES MONEY', P.ink, 106], [pays22, 'PAY SAVERS A LITTLE…', P.ink, 104], [charges, '…CHARGE BORROWERS MORE', P.ink, 104], [real23, 'REAL NUMBERS', P.ink, 110], [gap30, 'THE GAP = THE BUSINESS', P.ink, 106], [real31, 'REAL BANKS EARN LESS', P.coralInk, 106], [thousands, 'BUT IT ADDS UP', P.ink, 110], [comes35, 'THE GAP IS THE ENGINE', P.ink, 106], [dont36, 'BANKS ALSO BUY BONDS', P.ink, 106], [step38, 'KEEP THE DIFFERENCE', P.ink, 110]]} />

      {/* # A) savers get a little, borrowers pay more */}
      {A > 0 && <g opacity={A}>
        <Street f={f} ground={GROUND} trees={[60, 1860]} lamps={[]} o={0.75} />
        <Ground y={GROUND} />
        <BankFront x={960} y={GROUND} s={1.1} open={0.5} glow={on(f, money21, 12)} />
        <Person f={f} who="investorF" beats={[[0, 'idle', 'smiling'], [keep22, 'present', 'smiling'], [little, 'receive', 'smiling']]} x={300} y={GROUND} s={1.05} />
        <Person f={f} who="buyer" beats={[[0, 'idle', 'neutral'], [charges, 'offer', 'worried'], [borrow, 'emptyPockets', 'worried']]} x={1640} y={GROUND} s={1.05} flip />
        <g opacity={on(f, keep22, 8)}><Label x={300} y={1010} text="SAVER" size={48} font="Bebas Neue" color={P.mintInk} /></g>
        <g opacity={on(f, borrow, 8)}><Label x={1640} y={1010} text="BORROWER" size={48} font="Bebas Neue" color={P.coralInk} /></g>
        {/* one small coin to the saver on "little"; a stream of big coins from the borrower on "more" */}
        {(() => { const fl = fly(f, little, [800, 640], [380, 620], 20, 120); return fl.t > 0 && fl.t < 1 ? <Coin x={fl.x} y={fl.y} s={0.6} /> : null })()}
        {f >= more22 && Array.from({ length: 4 }, (_, k) => { const fl = fly(f, more22 + k * 6, [1560, 620], [1120, 640], 18, 120); return fl.t < 1 ? <Coin key={k} x={fl.x} y={fl.y} s={1.1} o={fl.o} /> : null })}
      </g>}

      {/* # B/C) the two plates and the gap; then the bites */}
      {(B > 0 || Cw > 0) && <g opacity={Math.max(B, Cw)}>
        <Ground y={GROUND} />
        {/* left: savings */}
        <g opacity={on(f, real23 + 4, 10)} transform={`translate(480 760) scale(${1.4 + 0.08 * win(f, z32, z32 + 24, 6)}) translate(-480 -760)`}>
          <Plate x={480} y={720} t={f >= p8 ? 'SAVINGS ≈ 0.38%' : f >= savings24 ? 'SAVINGS' : 'SAVERS GET'} col={P.mint} />
          <g opacity={on(f, k1000a, 8)}><CashBrick x={400} y={718} s={1.5} /><Label x={400} y={640} text="$1,000" size={44} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, d3, 8)} transform={`translate(0 ${-14 * pop(f, d3, 12) - 14 * pop(f, year25, 12)})`}><Coin x={570} y={680} s={0.55} /><Label x={570} y={630} text={f >= cents ? '$3.80 A YEAR' : '$3…'} size={40} font="Bebas Neue" color={P.goldInk} /></g>
          <g opacity={on(f, october, 8) * (1 - on(f, d3, 8))}><Label x={480} y={560} text="OCTOBER 2026" size={44} font="Bebas Neue" color={P.ink2} /></g>
        </g>
        {/* right: home loan + credit card */}
        <g opacity={on(f, numbers23, 10)} transform="translate(1440 760) scale(1.4) translate(-1440 -760)">
          <g transform={`translate(0 ${-10 * pop(f, look26, 12)})`}><Plate x={1440} y={720} t={f >= p2 ? 'HOME LOAN ≈ 7.2%' : f >= p7 ? 'HOME LOAN ≈ 7…' : f >= home27 ? 'HOME LOAN' : 'BORROWERS PAY'} col={P.coral} /></g>
          <g opacity={on(f, home27, 8) * (1 - on(f, k1000b, 8))}><House x={1440} y={718} s={0.75} /></g>
          <g opacity={on(f, k1000b, 8)}><CashBrick x={1320} y={718} s={1.5} /><Label x={1320} y={640} text="$1,000" size={44} font="Bebas Neue" color={P.ink} /></g>
          <CoinStack x={1530} y={705} n={loanPile} />
          <g opacity={on(f, d71, 8) * (1 - on(f, credit, 8))}><Label x={1530} y={705 - 18 * 8 - 40} text="≈ $71 IN YEAR ONE" size={40} font="Bebas Neue" color={P.goldInk} /></g>
          <g opacity={on(f, credit, 8) * (1 - on(f, few30, 8))} transform={`translate(${lerp(1900, 1610, on(f, credit, 14))} 470)`}><Card x={0} y={0} s={0.9} r={-8} />
            <g opacity={on(f, p21, 8)}><Label x={0} y={120} text="CARDS ≈ 21%" size={46} font="Bebas Neue" color={P.coralInk} /></g></g>
        </g>
        {/* the gap */}
        <g opacity={on(f, gap30, 10) * (1 - on(f, thousands - 10, 8))}>
          <line x1={620} y1={600} x2={1500} y2={760 + (705 - 18 * Math.max(0, loanPile) - 760) * 1.4} stroke={P.goldD} strokeWidth={6} strokeDasharray="14 10" />
          <g opacity={1 - on(f, real31, 8)} transform={`translate(1000 ${420 - 12 * pop(f, gap30, 12)})`}><rect x={-120} y={-44} width={240} height={88} rx={44} fill={P.gold} /><text y={18} textAnchor="middle" fill="#16294A" style={{ font: '400 52px "Bebas Neue"' }}>THE GAP</text></g>
        </g>
        <Spot f={f} at={few30} x={500} y={680} rx={200} ry={140} /><Spot f={f} at={collects} x={1500} y={600} rx={220} ry={200} />
        {/* the three bites (C) */}
        {([[pct32, 'SOME DEPOSITS PAY MORE', [470, 560]], [cost32, 'DEPOSITS THAT COST MORE', [380, 560]], [never32, 'LOANS NEVER PAID BACK', [1100, 1020]], [staff, 'STAFF, BRANCHES, APPS', [1840, 560]]] as [number, string, [number, number]][]).map(([at, t, to], k) => {
          const fl = fly(f, at, [1530, 560], to, 22, 160)
          return <g key={k}>{fl.t > 0 && fl.t < 1 && <Coin x={fl.x} y={fl.y} s={0.9} />}
            <g opacity={win(f, at, at + 60, 8)}><Label x={960} y={330} text={t} size={58} font="Bebas Neue" color={P.coralInk} /></g></g>
        })}
        <g opacity={on(f, branches, 8) * (1 - on(f, thousands - 10, 8))}><BankFront x={1800} y={GROUND} s={0.3} /></g>
      </g>}

      {/* # D) thousands of banks; the profit mountain; the three pipes */}
      {D > 0 && <g opacity={D}>
        <Ground y={GROUND} />
        {Array.from({ length: 9 }, (_, k) => { const mid = k >= 2 && k <= 6; return <g key={k} opacity={on(f, thousands + k * 2, 6) * (1 - on(f, mid ? adds : comes35, 10))}><BankFront x={160 + k * 200} y={GROUND} s={0.3} /></g> })}
        <g opacity={on(f, trillions, 8) * (1 - on(f, months34, 10))}>{Array.from({ length: 12 }, (_, k) => <CashBrick key={k} x={620 + (k % 6) * 140} y={GROUND - 10 - Math.floor(k / 6) * 48} s={1.4} />)}</g>
        {/* the mountain of profit */}
        <g opacity={on(f, adds, 10)}>
          <path d={`M${960 - 360} 930 Q960 ${930 - 520 * on(f, adds, 30) - 80 * on(f, d90, 20)} ${960 + 360} 930 Z`} fill={P.gold} stroke={P.goldD} strokeWidth={6} />
          {Array.from({ length: 10 }, (_, k) => <circle key={k} cx={760 + (k % 5) * 100} cy={880 - Math.floor(k / 5) * 90} r={22} fill={P.goldD} opacity={0.5 * on(f, adds, 30)} />)}
        </g>
        <g opacity={on(f, april, 8)} transform={`translate(330 ${520 - 12 * pop(f, april, 12)})`}><CalPage x={0} y={0} s={0.95} m={f >= june ? 'APR–JUN' : 'APRIL'} d={f >= c('s34:2026') ? '2026' : ''} /></g>
        <g opacity={on(f, k4200, 8) * (1 - on(f, comes35, 10))}><Label x={1590} y={560} text="≈ 4,200 BANKS" size={54} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, d90, 8)} transform={`translate(960 ${360 - 14 * pop(f, d90, 12)})`}><rect x={-240} y={-50} width={480} height={100} rx={18} fill="#16294A" /><text y={20} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 58px "Bebas Neue"' }}>{f >= profit34 ? '≈ $90 BILLION PROFIT' : '≈ $90 BILLION'}</text></g>
        {/* the pipes feeding it */}
        <g opacity={on(f, comes35, 10)}>
          <rect x={1260} y={640 - 8 * win(f, gap35, gap35 + 20, 6)} width={560} height={70 + 16 * win(f, gap35, gap35 + 20, 6)} rx={35} fill={f >= gap35 && f < gap35 + 20 ? P.gold : "#8A97AA"} /><Label x={1560} y={620} text="INTEREST GAP" size={48} font="Bebas Neue" color={P.ink} />
          <g opacity={win(f, banks35, fees + 4, 6)}><BankFront x={1560} y={900} s={0.22} /></g>
          <g opacity={on(f, fees, 8)}><rect x={1300} y={800} width={520} height={30} rx={15} fill="#A9B4C2" /><Label x={1560} y={790} text="FEES" size={42} font="Bebas Neue" color={P.ink2} /></g>
          <g opacity={on(f, trading, 8)}><rect x={60} y={760} width={480} height={30} rx={15} fill="#A9B4C2" /><Label x={300} y={750} text="TRADING" size={42} font="Bebas Neue" color={P.ink2} /></g>
          <g opacity={on(f, engine, 8)} transform={`translate(1700 675) rotate(${f * 4})`}>{[0, 45, 90, 135].map((a) => <rect key={a} x={-10} y={-56} width={20} height={112} rx={6} fill={P.goldD} transform={`rotate(${a})`} />)}<circle r={34} fill={P.gold} /></g>
          {Array.from({ length: 4 }, (_, k) => { const t = ((f - comes35) / 40 + k / 4) % 1; return <Coin key={k} x={lerp(1780, 1280, t)} y={675} s={0.6} /> })}
        </g>
      </g>}

      {/* # E) bonds */}
      {E > 0 && <g opacity={E}>
        <rect x={-100} y={GROUND} width={2120} height={300} fill="#CDBB98" /><rect x={-100} y={GROUND} width={2120} height={10} fill="#B7A47F" />
        <Person f={f} who="investor" beats={[[DE, 'idle', 'neutral'], [loans36, 'present', 'neutral'], [put36, 'carry', 'smiling'], [bonds36, 'present', 'smiling'], [remember, 'pointUp', 'smiling']]} x={420} y={GROUND} s={1.1} />
        <g opacity={on(f, put36, 8) * (1 - on(f, bonds36, 8))}><CashBrick x={480} y={600 - 12 * pop(f, money36, 12)} s={1.3} /></g>
        <g opacity={on(f, loans36, 8) * (1 - on(f, safer, 8))}><Label x={700} y={520} text="LOANS…" size={56} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, government36, 8)} transform={`translate(${lerp(860, 960, on(f, bond37, 14))} ${560 - 14 * pop(f, bonds36, 12)})`}>
          <BondCert x={0} y={0} s={1.9} t={f >= bond37 ? 'BOND' : 'GOVERNMENT BOND'} tag={f >= fixed ? 'FIXED %' : undefined} tagO={on(f, fixed, 8)} />
          <g opacity={on(f, remember, 8)} transform="translate(220 -190)"><path d="M0 0 L50 0 L50 90 L25 70 L0 90 Z" fill={P.gold} stroke={P.goldD} strokeWidth={3} /></g>
        </g>
        {/* who the loan goes to */}
        <g opacity={on(f, government37, 8)} transform="translate(1440 540) scale(1.4)">
          <path d="M-110 30 L0 -50 L110 30 Z" fill="#E2D8C2" /><rect x={-100} y={30} width={200} height={140} fill="#EFE6D2" />{[-70, -25, 25, 70].map((x) => <rect key={x} x={x - 8} y={40} width={16} height={120} fill="#FFFFFF" />)}
          <circle cx={0} cy={-70} r={30} fill="#E2D8C2" /><Label x={0} y={220} text="GOVERNMENT" size={42} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, company, 8)} transform="translate(1760 540) scale(1.4)"><rect x={-70} y={-40} width={140} height={210} rx={8} fill="#7E8FA8" />{Array.from({ length: 8 }, (_, k) => <rect key={k} x={-50 + (k % 2) * 60} y={-20 + Math.floor(k / 2) * 46} width={40} height={28} rx={4} fill="#BFE3FF" />)}
          <Label x={0} y={220} text="COMPANY" size={42} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, years37, 8) * (1 - on(f, remember, 8))}>{[0, 1, 2].map((k) => <g key={k} opacity={on(f, years37 + k * 6, 6)}><CalPage x={760 + k * 130} y={860} s={0.55} m="YEAR" d={String(k + 1)} col="#2E5C9A" /></g>)}</g>
        <g opacity={on(f, four37, 8)}><Label x={1000} y={860} text="REMEMBER THIS: STEP 4" size={50} font="Bebas Neue" color={P.goldInk} /></g>
      </g>}

      {/* # F) recap: borrow cheaply from savers, lend higher, keep the difference */}
      {F > 0 && <g opacity={F}>
        <Street f={f} ground={GROUND} trees={[1880]} lamps={[]} o={0.7} />
        <Ground y={GROUND} />
        <Person f={f} who="investorF" beats={[[EF, 'idle', 'smiling'], [savers38, 'offer', 'smiling']]} x={260} y={GROUND} s={1.0} />
        <BankFront x={960} y={GROUND} s={0.95} open={0.6} glow={on(f, keeps38, 10)} />
        <Person f={f} who="buyer" beats={[[EF, 'idle', 'neutral'], [lends38, 'receive', 'smiling'], [higher38, 'offer', 'neutral']]} x={1660} y={GROUND} s={1.0} flip />
        {f >= borrows38 && Array.from({ length: 3 }, (_, k) => { const fl = fly(f, borrows38 + k * 5, [380, 640], [780, 640], 16, 80); return fl.t < 1 ? <Coin key={k} x={fl.x} y={fl.y} s={0.7} o={fl.o} /> : null })}
        {f >= lends38 && Array.from({ length: 3 }, (_, k) => { const fl = fly(f, lends38 + k * 5, [1140, 640], [1560, 640], 16, 80); return fl.t < 1 ? <Coin key={k} x={fl.x} y={fl.y} s={0.7} o={fl.o} /> : null })}
        <g opacity={on(f, difference38, 8)} transform={`translate(1360 ${915 - 12 * pop(f, difference38, 12)})`}><CoinStack x={0} y={0} n={6} /><Label x={0} y={-150} text="THE DIFFERENCE" size={50} font="Bebas Neue" color={P.goldInk} /></g>
      </g>}
      <Vignette id="bk-earn" />
    </g>
  )
}

const BEATS = ['s25:year', 's26:look', 's35:gap', 's35:banks', 's36:put', 's36:money', 's21:makes', 's21:money', 's22:basic', 's22:pays', 's22:little', 's22:keep', 's22:charges', 's22:more', 's22:borrow', 's23:real', 's23:numbers', 's24:october', 's24:savings', 's24:0', 's24:8', 's24:year', 's25:1000', 's25:3', 's25:cents', 's26:borrowers', 's26:paying', 's27:home', 's27:loan', 's27:7', 's27:2', 's28:1000', 's28:71', 's28:first', 's29:credit', 's29:cards', 's29:21', 's30:few', 's30:one', 's30:collects', 's30:other', 's30:gap', 's30:heart', 's30:business', 's31:real', 's31:less', 's31:example', 's32:deposits', 's32:cost', 's32:0', 's32:percent', 's32:loans', 's32:never', 's32:staff', 's32:branches', 's32:apps', 's33:thousands', 's33:trillions', 's33:adds', 's34:months', 's34:april', 's34:june', 's34:2026', 's34:4200', 's34:insured', 's34:90', 's34:profit', 's35:comes', 's35:fees', 's35:trading', 's35:engine', "s36:don't", 's36:loans', 's36:safer', 's36:government', 's36:bonds', 's37:bond', 's37:government', 's37:company', 's37:fixed', 's37:years', 's37:remember', 's37:four', 's38:step', 's38:borrows', 's38:savers', 's38:lends', 's38:higher', 's38:keeps', 's38:difference']
export const BK_EARN = makePiece('bk-earn', 'Banking step two: the bank pays a saver one small interest coin and a borrower pays bigger coins in; plates compare savings 0.38% ($3.80 a year on $1,000) with a home loan about 7.2% (about $71 in year one) and credit cards about 21%, a gap between the piles; three bites (costlier deposits, unpaid loans, staff/branches/apps) shrink the loan pile; thousands of banks and trillions of dollars add up to a gold mountain, about $90 billion profit in April–June 2026 across about 4,200 banks, fed by a big interest-gap pipe with an engine and thinner fees and trading pipes; the banker buys a government bond (a fixed-rate loan to a government or company for years) with a remember-this bookmark; recap savers → bank → borrowers, the bank keeps the difference', {
  mood: 'light', Component: Earn, beats: BEATS,
  sfx: [['s22:little', 'coin', 0.2], ['s25:3', 'coin', 0.2], ['s28:71', 'coin', 0.25], ['s30:gap', 'pop', 0.2], ['s34:90', 'pop', 0.25], ['s36:bonds', 'pop', 0.2]] })
