// ---------------------------------------------------------------- s56–s68: step five, hedge funds (navy night = risk).
// A) The private club door. A pot of money behind it — a regular fund's pot sits inside a RULES fence, the hedge
//    fund's pot has none. It borrows (a loan bag joins the pot) for bigger bets (chips stack up), bets on prices
//    falling (a red down-arrow ticket) and uses complicated contracts (a stack of papers). The name: a garden hedge
//    becomes a shield (protecting against losses) — then a storm cloud: many take big risks.
// B) The velvet rope: Sam is stopped by a doorman. ACCREDITED INVESTOR badge: net worth over $1 million not counting
//    the home (house crossed out), or income over $200K for each of the last two years (two calendar pages).
// C) "2 and 20": a sign; a scoop takes 2% every year and a slice of 20% of the profits. $10,000 at 7% for 30 years:
//    coin towers ≈ $74K (index fund) vs ≈ $32K (2 and 20) — less than half. A high-jump bar: to keep up after fees it
//    must earn about 10.6% a year before fees in this example, vs the market's 7%.
// D) Less information (a report with blacked-out lines); a padlock on the pot (money locked up); Sam tugs; wealthy
//    investors in top hats; high fees make it hard to come out ahead.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Doc, Headline, House, Label, Person, Stamp, Stat, win, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Storm } from '../invest/kit'
import { CalPage, NoMark } from '../bank/kit'
import { CoinTower, Tag } from '../money4/kit'
import { Scoop } from '../fee/kit'
import { ClubDoor, Pot, Slice } from './kit'

const GROUND = 930
const K = {
  private56: 's56:private', club: 's56:club',
  hedge57: 's57:hedge', pot57: 's57:pot', private57: 's57:private', allowed: 's57:allowed', more57: 's57:more', regular57: 's57:regular',
  borrow: 's58:borrow', bigger: 's58:bigger', bets: 's58:bets', bet: 's58:bet', prices58: 's58:prices', fall: 's58:fall', complicated: 's58:complicated', contracts: 's58:contracts',
  name: 's59:name', hedging: 's59:hedging', protecting: 's59:protecting', losses: 's59:losses', many59: 's59:many', today: 's59:today', big59: 's59:big', risks: 's59:risks',
  people60: 's60:people', cant60: "s60:can't", usually60: 's60:usually', called60: 's60:called', accredited: 's60:accredited', investor60: 's60:investor',
  means61: 's61:means', net: 's61:net', worth61: 's61:worth', one61: 's61:1', million61: 's61:million', counting: 's61:counting', home: 's61:home', income: 's61:income', k200: 's61:200', thousand61: 's61:thousand', year61: 's61:year', last: 's61:last', two61: 's61:two', years61: 's61:years',
  fees62: 's62:fees', famous: 's62:famous', classic: 's62:classic', two62: 's62:two', twenty62: 's62:twenty',
  k2: 's63:2', percent63: 's63:percent', money63: 's63:money', year63: 's63:year', plus: 's63:plus', k20: 's63:20', profits: 's63:profits',
  remember: 's64:remember', k10000: 's64:10000', seven64: 's64:7', k30: 's64:30', simple64: 's64:simple', twenty64: 's64:twenty', only64: 's64:only', k32: 's64:32', thousand64: 's64:thousand',
  less65: 's65:less', half: 's65:half', k74: 's65:74', cheap: 's65:cheap', index65: 's65:index',
  worth66: 's66:worth', hedge66: 's66:hedge', beat66: 's66:beat', lot: 's66:lot', year66: 's66:year', after66: 's66:after', keep: 's66:keep', fees66: 's66:fees',
  share67: 's67:share', less67: 's67:less', information: 's67:information', regular67: 's67:regular', lock: 's67:lock', up67: 's67:up', money67: 's67:money', cant67: "s67:can't", take: 's67:take', out67: 's67:out', want: 's67:want',
  some68: 's68:some', well: 's68:well', built: 's68:built', wealthy: 's68:wealthy', high: 's68:high', fees68: 's68:fees', hard: 's68:hard', ahead: 's68:ahead',
}
type Key = keyof typeof K

// # small props drawn here: poker chips, a padlock, a top hat, a hedge bush, a shield
const Chips: React.FC<{ x: number; y: number; n: number; o?: number }> = ({ x, y, n, o = 1 }) => (
  <g opacity={o}>{Array.from({ length: Math.max(0, Math.round(n)) }, (_, k) => <g key={k}><ellipse cx={x} cy={y - k * 14} rx={46} ry={14} fill={k % 2 ? '#D9483A' : '#F2E6CC'} stroke="#16294A" strokeWidth={3} /></g>)}</g>
)
const Lock: React.FC<{ x: number; y: number; s?: number; o?: number; shut?: number }> = ({ x, y, s = 1, o = 1, shut = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d={`M-40 ${-10 - 30 * (1 - shut)} L-40 -50 Q-40 -100 0 -100 Q40 -100 40 -50 L40 -10`} fill="none" stroke="#C9A13A" strokeWidth={16} transform={`translate(0 ${-30 * (1 - shut)})`} />
    <rect x={-60} y={-20} width={120} height={100} rx={14} fill="#E9C25A" /><circle cx={0} cy={22} r={12} fill="#16294A" /><rect x={-5} y={22} width={10} height={30} fill="#16294A" />
  </g>
)
const TopHat: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}><rect x={-40} y={-80} width={80} height={80} rx={6} fill="#120F1C" /><rect x={-60} y={-8} width={120} height={14} rx={7} fill="#120F1C" /><rect x={-40} y={-22} width={80} height={12} fill="#B0233A" /></g>
)
const Bush: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>{[-90, -30, 30, 90].map((cx, k) => <circle key={k} cx={cx} cy={-60 - (k % 2) * 30} r={70} fill={k % 2 ? '#1E9A63' : '#167A4F'} />)}<rect x={-160} y={-40} width={320} height={40} rx={10} fill="#167A4F" /></g>
)
const ShieldIcon: React.FC<{ x: number; y: number; s?: number; o?: number; crack?: number }> = ({ x, y, s = 1, o = 1, crack = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M0 -130 L110 -90 Q110 40 0 110 Q-110 40 -110 -90 Z" fill="#2A8FD0" stroke="#F2E6CC" strokeWidth={8} />
    <path d="M-40 0 L-10 30 L50 -40" fill="none" stroke="#F2E6CC" strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" opacity={1 - crack} />
    {crack > 0 && <path d="M0 -130 L-20 -60 L20 -10 L-10 50 L10 110" fill="none" stroke="#0E1B33" strokeWidth={10} opacity={crack} />}
  </g>
)

const Hedge: React.FC<PieceProps> = ({ f, c }) => {
  const q = Object.fromEntries(Object.entries(K).map(([k, v]) => [k, c(v)])) as Record<Key, number>
  const AB = q.people60 - 8, BC = q.fees62 - 8, CD = q.share67 - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), Cc = win(f, BC, CD), D = on(f, CD, 10)
  const name = on(f, q.name, 12)
  const sam: Beat[] = [[AB, 'walkA', 'smiling', 'walkB'], [q.cant60, 'stop', 'shocked'], [q.accredited, 'scratchHead', 'thinking'], [q.home, 'idle', 'neutral'], [q.years61, 'shrug', 'worried'],
    [CD, 'idle', 'neutral'], [q.lock, 'pull', 'angry'], [q.want, 'despair', 'worried']]
  const guard: Beat[] = [[AB, 'idle', 'neutral'], [q.cant60, 'crossNoA', 'neutral', 'crossNoB'], [q.accredited, 'armsCrossed', 'smug']]
  const scoop2 = Math.max(win(f, q.k2, q.k2 + 40, 8), win(f, q.year63, q.year63 + 30, 8))
  return (
    <g>
      <Stage id="fd-hedge" frame={f} />
      {/* # A) a private pot that may do much more */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <g opacity={1 - on(f, q.hedge57, 12)}><ClubDoor x={960} y={GROUND} s={0.95} sign="HEDGE FUND" /></g>
        <g opacity={on(f, q.hedge57, 12) * (1 - name)}>
          {/* regular fund inside a rules fence */}
          <g opacity={on(f, q.regular57, 8)}>
            <Pot x={330} y={GROUND} s={0.55} fill={0.6} label="REGULAR FUND" col="#2A8FD0" />
            {[-1, 1].map((d) => <rect key={d} x={330 + d * 190 - 6} y={GROUND - 220} width={12} height={220} fill="#C2B9B1" />)}
            <rect x={140} y={GROUND - 200} width={380} height={12} fill="#C2B9B1" /><rect x={140} y={GROUND - 110} width={380} height={12} fill="#C2B9B1" />
            <Label x={330} y={GROUND - 250} text="MANY RULES" size={42} font="Bebas Neue" color={P.ink2} />
          </g>
          <g transform={`translate(0 ${-12 * pop(f, q.pot57, 14)})`}><Pot x={960} y={GROUND} s={0.85} fill={0.7 + 0.2 * on(f, q.borrow, 12)} label="HEDGE FUND" col="#5A1E2E" glow={win(f, q.private57, q.more57 + 20)} /></g>
          <g opacity={on(f, q.allowed, 8)}><Label x={960} y={GROUND + 60} text={f >= q.more57 ? 'PRIVATE — ALLOWED TO DO MUCH MORE' : 'PRIVATE…'} size={46} font="Bebas Neue" color="#16294A" /></g>
          <g opacity={on(f, q.borrow, 10)} transform={`translate(${lerp(1500, 1250, on(f, q.borrow, 20))} 600)`}><Doc x={0} y={0} s={0.55} title="LOAN" lines={2} /><Label x={0} y={-130} text="BORROWED" size={38} font="Bebas Neue" color={P.coralInk} /></g>
          <g opacity={on(f, q.bigger, 8)}><Chips x={1560} y={GROUND - 20} n={4 + 10 * span(f, q.bigger, q.bets + 20)} /><Label x={1560} y={GROUND + 60} text="BIGGER BETS" size={40} font="Bebas Neue" color="#16294A" /></g>
          <g opacity={on(f, q.bet, 8)} transform={`translate(600 ${430 - 10 * pop(f, q.fall, 12)})`}><rect x={-150} y={-60} width={300} height={110} rx={16} fill="#F6B1A8" /><path d="M-100 -30 L-40 30 L0 -5 L80 40" fill="none" stroke="#D9483A" strokeWidth={10} strokeLinecap="round" /><Label x={0} y={100} text="BET PRICES FALL" size={40} font="Bebas Neue" color={P.coralInk} /></g>
          <g opacity={on(f, q.complicated, 8)}>{[0, 1, 2].map((k) => <Doc key={k} x={1340 + k * 26} y={320 + k * 18} s={0.5} r={-6 + 6 * k} title="CONTRACT" lines={4} />)}</g>
        </g>
        {/* the name: hedge → shield → storm */}
        <g opacity={name}>
          <Bush x={560} y={GROUND} s={1.0} o={on(f, q.hedging, 8)} />
          <g opacity={on(f, q.hedging, 8)}><Label x={560} y={GROUND + 60} text="HEDGING" size={50} font="Bebas Neue" color="#16294A" /></g>
          <ShieldIcon x={1240} y={600} s={1.3 + 0.08 * win(f, q.protecting, q.losses + 20)} o={on(f, q.protecting, 10)} crack={on(f, q.risks, 14)} />
          <g opacity={on(f, q.losses, 8) * (1 - on(f, q.many59, 8))}><Label x={1240} y={GROUND + 60} text="PROTECTING AGAINST LOSSES" size={46} font="Bebas Neue" color="#16294A" /></g>
          <g opacity={on(f, q.many59, 10)}><Storm x={1240} y={330} s={1.0} strike={win(f, q.risks, q.risks + 24, 4)} /><Label x={1240} y={GROUND + 60} text="BUT MANY TAKE BIG RISKS" size={46} font="Bebas Neue" color="#B0233A" /></g>
        </g>
      </g>}
      {/* # B) who may join */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <ClubDoor x={1640} y={GROUND} s={0.8} sign="HEDGE FUND" />
        <Person f={f} who="owner" beats={guard} x={1300} y={GROUND} s={0.95} flip />
        <Person f={f} who="investor" beats={sam} x={lerp(700, 1040, on(f, q.people60, 30))} y={GROUND} s={0.95} />
        <g opacity={on(f, q.accredited, 10)} transform={`translate(960 ${330 - 10 * pop(f, q.investor60, 12)})`}><rect x={-300} y={-60} width={600} height={110} rx={20} fill="#E9C25A" /><Label x={0} y={18} text="ACCREDITED INVESTORS ONLY" size={54} font="Bebas Neue" color="#16294A" /></g>
        <g opacity={on(f, q.net, 10)}>
          <Tag x={120} y={470} t={f >= q.million61 ? 'NET WORTH > $1 MILLION' : 'NET WORTH…'} r={-4} col="#9FD8B4" />
          <g opacity={on(f, q.counting, 8)} transform="translate(200 620)"><House x={0} y={0} s={0.5} /><NoMark x={0} y={-40} o={on(f, q.home, 8)} r={70} /><Label x={130} y={-20} text="NOT COUNTING YOUR HOME" size={34} anchor="start" font="Bebas Neue" color={P.ink2} /></g>
        </g>
        <g opacity={on(f, q.income, 10)}>
          <Label x={200} y={730} text="OR" size={54} font="Bebas Neue" color={P.ink} />
          <Tag x={120} y={800} t={f >= q.thousand61 ? 'INCOME > $200K A YEAR' : 'INCOME…'} r={3} col="#F4C95D" />
          {[0, 1].map((k) => <g key={k} opacity={on(f, k ? q.years61 : q.two61, 8)}><CalPage x={720 + k * 150} y={790} s={0.55} m={k ? 'LAST YEAR' : 'YEAR BEFORE'} d="✓" /></g>)}
        </g>
      </g>}
      {/* # C) 2 and 20 */}
      {Cc > 0 && <g opacity={Cc}>
        <Ground y={GROUND} />
        <g opacity={1 - on(f, q.remember, 12)}>
          <g opacity={on(f, q.two62, 10)} transform={`translate(960 ${360 - 12 * pop(f, q.twenty62, 12)})`}><rect x={-280} y={-80} width={560} height={150} rx={26} fill="#E9C25A" /><Label x={0} y={30} text="2 AND 20" size={110} font="Bebas Neue" color="#16294A" /></g>
          <Pot x={600} y={GROUND} s={0.8} fill={0.75 - 0.1 * on(f, q.k2, 20)} label="YOUR MONEY" col="#5A1E2E" />
          <g transform={`translate(${880 - 50 * scoop2} ${560 + 80 * scoop2}) rotate(${-25 * scoop2})`} opacity={on(f, q.k2, 8)}><Scoop x={0} y={0} s={0.9} full={scoop2} /></g>
          <g opacity={on(f, q.percent63, 8)}><Label x={600} y={GROUND + 60} text={f >= q.year63 ? '2% OF YOUR MONEY, EVERY YEAR' : '2% OF YOUR MONEY'} size={46} font="Bebas Neue" color="#16294A" /></g>
          <g opacity={on(f, q.plus, 10)}><Slice x={1420} y={620} s={1.4} frac={0.2 * on(f, q.k20, 16)} /><Label x={1420} y={GROUND + 60} text="+ 20% OF ANY PROFITS" size={46} font="Bebas Neue" color="#16294A" o={on(f, q.profits, 8)} /></g>
        </g>
        <g opacity={on(f, q.remember, 12) * (1 - on(f, q.worth66, 12))}>
          <Tag x={360} y={360} t="$10,000 · 7% · 30 YEARS" r={-3} />
          <g opacity={on(f, q.k74, 8)}><CoinTower x={760} y={GROUND - 30} n={18.6 * on(f, q.k74, 20)} w={170} /><Label x={760} y={GROUND - 30 - 16 * 18.6 - 50} text="≈ $74K" size={60} font="Bebas Neue" color={P.goldInk} /><Label x={760} y={GROUND + 60} text="CHEAP INDEX FUND" size={42} font="Bebas Neue" color="#16294A" /></g>
          <g opacity={on(f, q.simple64, 8)}><CoinTower x={1200} y={GROUND - 30} n={8.1 * on(f, q.k32, 20)} w={170} red /><Label x={1200} y={GROUND - 30 - 16 * 8.1 - 50} text={f >= q.k32 ? '≈ $32K' : '…'} size={60} font="Bebas Neue" color={P.coralInk} /><Label x={1200} y={GROUND + 60} text="2 AND 20" size={42} font="Bebas Neue" color="#16294A" /></g>
          <g opacity={on(f, q.less65, 10)} transform={`translate(1560 ${520 - 10 * pop(f, q.half, 12)})`}><Tag x={0} y={0} t="LESS THAN HALF" r={6} col="#F6B1A8" /></g>
        </g>
        {/* the hurdle */}
        <g opacity={on(f, q.worth66, 12)}>
          {([[620, 7, 'THE MARKET (EXAMPLE)', '#2A8FD0'], [1300, 10.6, 'HEDGE FUND NEEDS, BEFORE FEES', '#D9483A']] as [number, number, string, string][]).map(([x, v, t, col], k) => {
            const h = 40 * v * on(f, k ? q.beat66 : q.worth66, 24)
            return <g key={k}><rect x={x - 110} y={GROUND - 30 - h} width={220} height={h} rx={10} fill={col} /><Label x={x} y={GROUND - 60 - h} text={`≈ ${v}% A YEAR`} size={56} font="Bebas Neue" color={P.ink} o={on(f, k ? q.lot : q.worth66, 8)} /><Label x={x} y={GROUND + 60} text={t} size={40} font="Bebas Neue" color="#16294A" /></g> })}
          <g opacity={on(f, q.keep, 8)}><Label x={960} y={290} text="JUST TO KEEP UP WITH THE INDEX FUND AFTER FEES" size={44} font="Bebas Neue" color={P.coralInk} /></g>
        </g>
      </g>}
      {/* # D) less information, locked money, built for the wealthy */}
      {D > 0 && <g opacity={D}>
        <Ground y={GROUND} />
        <g opacity={1 - on(f, q.some68, 12)}>
          <g opacity={on(f, q.share67, 8)} transform="translate(330 560)"><rect x={-150} y={-200} width={300} height={380} rx={14} fill={P.paper} />
            <Label x={0} y={-150} text="FUND REPORT" size={40} font="Bebas Neue" color="#16294A" />{[0, 1, 2, 3, 4].map((k) => <rect key={k} x={-110} y={-110 + k * 56} width={220} height={26} rx={6} fill={k % 2 || f < q.information ? '#C2B9B1' : '#16294A'} />)}
            <Label x={0} y={240} text="LESS INFORMATION" size={42} font="Bebas Neue" color={P.ink} /></g>
          <Pot x={1100} y={GROUND} s={0.8} fill={0.75} label="HEDGE FUND" col="#5A1E2E" />
          <Lock x={1100} y={640} s={1.1} o={on(f, q.lock, 10)} shut={on(f, q.up67, 10)} />
          <Person f={f} who="investor" beats={sam} x={1520} y={GROUND} s={0.95} flip />
          <g opacity={on(f, q.cant67, 8)}><Label x={1300} y={GROUND + 60} text="CAN'T ALWAYS TAKE IT OUT" size={46} font="Bebas Neue" color="#B0233A" /></g>
        </g>
        <g opacity={on(f, q.some68, 12)}>
          <g opacity={on(f, q.well, 8)}><Stat x={480} y={420} big="SOME DO VERY WELL" w={620} color={P.mintInk} /></g>
          {[0, 1, 2].map((k) => <g key={k} opacity={on(f, q.wealthy + k * 5, 8)}><Person f={f} who={['owner', 'investorF', 'hero'][k]} beats={[[q.wealthy, 'confident', 'smug']]} x={1200 + k * 230} y={GROUND} s={0.8} /><TopHat x={1200 + k * 230} y={GROUND - 395 + 10 * k} s={0.8} /></g>)}
          <g opacity={on(f, q.wealthy, 8)}><Label x={1430} y={GROUND + 60} text="BUILT FOR WEALTHY INVESTORS" size={44} font="Bebas Neue" color="#16294A" /></g>
          {f >= q.hard - 4 && <Stamp x={520} y={700} text="HIGH FEES = HARD TO WIN" f={f} at={q.hard} size={60} />}
        </g>
      </g>}
      <Headline f={f} lines={[[q.private56, 'THE PRIVATE CLUB', P.ink, 110], [q.borrow, 'BORROW · BET · CONTRACTS', P.ink, 100], [q.name, 'WHY “HEDGE”?', P.ink, 108],
        [q.people60, 'MOST PEOPLE CAN’T BUY IN', P.ink, 104], [q.fees62, 'THE FAMOUS FEE', P.ink, 108], [q.remember, 'WHAT 2 AND 20 COSTS', P.coralInk, 104], [q.worth66, 'A HIGH BAR TO CLEAR', P.ink, 106],
        [q.share67, 'LESS INFO, LOCKED MONEY', P.ink, 104], [q.some68, 'WHO THEY’RE BUILT FOR', P.ink, 104]]} />
      <Vignette id="fd-hedge" />
    </g>
  )
}

export const FD_HEDGE = makePiece('fd-hedge', 'Hedge funds (night): a velvet-rope private door; a regular fund pot inside a RULES fence vs a free maroon hedge-fund pot that takes a LOAN, stacks poker chips (bigger bets), a falling-price ticket and contract papers; a garden hedge, a shield that cracks under storm clouds; a doorman stops Sam — ACCREDITED INVESTORS ONLY: net worth over $1 million not counting the home, or income over $200K for two years; a gold 2 AND 20 sign, a scoop taking 2% a year and a 20% slice of profits; coin towers ≈$74K vs ≈$32K, LESS THAN HALF; bars 7% vs ≈10.6% needed before fees; a report with blacked-out lines, a padlock on the pot, Sam pulling; top-hatted wealthy investors and a HIGH FEES = HARD TO WIN stamp', {
  mood: 'dark', Component: Hedge, beats: Object.values(K),
  sfx: [['s56:club', 'thud', 0.2], ['s58:bets', 'coin', 0.2], ['s59:risks', 'crack', 0.25], ['s60:accredited', 'pop', 0.2], ['s62:twenty', 'impact', 0.25], ['s64:32', 'thud', 0.2], ['s67:lock', 'click', 0.25], ['s68:hard', 'thud', 0.2]] })
