// ---------------------------------------------------------------- s50–s66: does it ever get paid back? Rolling over, the catch, the debt limit.
// A) The Treasury, an old buyer and a new buyer. The old IOU comes due on its date and is paid in full — with cash from a
//    fresh IOU sold to the new buyer (step 1, 2, 3). Weekly auctions. A stack of IOUs keeps its height while pieces swap.
//    A line of buyers queues up: it works while people trust the US.
// B) The catch (made-up): a $100 IOU at 2% costs $2 a year; its replacement at 4% costs $4: same debt, twice the interest.
// C) The debt limit: a dashed ceiling over the debt tower; the tower reaches it; Congress raises it (or suspends it);
//    bills already approved get stamped PAID — the limit doesn't decide spending.
// D) Debt vs the economy: two circles about the same size (debt held by the public ≈ one year of the economy); a
//    magnifying glass moves to the real cost: the interest coin.
import React from 'react'
import { lerp, on, P, pop, Stage, Vignette } from '../kit'
import { Spot } from '../bank/kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win, Coin, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Calendar } from '../charts'
import { Glass } from '../pe/kit'
import { CentralBank, Note } from '../econ/kit'
import { Bill, Blocks, Capitol, Ceiling, IOU, Podium, TXT, INK, RED, GREEN, BLUE, GOLD } from './kit'

const GROUND = 930

const Roll: React.FC<PieceProps> = ({ f, c }) => {
  const single = c('s50:single'), full = c('s50:full'), date = c('s50:date')
  const trick = c('s51:trick'), sells = c('s51:sells'), newW = c('s51:new')
  const one = c('s52:one'), due = c('s52:due'), two = c('s52:two'), fresh = c('s52:fresh'), three = c('s52:three'), cash = c('s52:cash')
  const week = c('s53:week'), auctions = c('s53:auctions'), replace = c('s53:replace')
  const rolling = c('s54:rolling'), pile = c('s54:pile'), replaced = c('s54:replaced')
  const trust = c('s55:trust'), lining = c('s55:lining')
  const catchW = c('s56:catch'), rate56 = c('s56:rate')
  const madeup = c('s57:madeup'), d100 = c('s57:100'), d2 = c('s57:2#2')
  const due58 = c('s58:due'), new58 = c('s58:new'), d4 = c('s58:4#2')
  const twice = c('s59:twice')
  const rule = c('s60:rule'), limit = c('s60:limit')
  const congress = c('s61:congress'), cap = c('s61:cap')
  const reaches = c('s62:reaches'), raise = c('s62:raise'), suspend = c('s62:suspend'), bills62 = c('s62:bills')
  const spent = c('s63:spent'), paid63 = c('s63:paid')
  const zero = c('s64:zero'), faster = c('s64:faster'), economy64 = c('s64:economy')
  const public65 = c('s65:public'), economy65 = c('s65:economy')
  const real = c('s66:real'), pile66 = c('s66:pile'), interest66 = c('s66:interest')

  const A = win(f, 0, catchW - 4), B = win(f, catchW - 4, rule - 4), Cw = win(f, rule - 4, zero - 4), D = on(f, zero - 4, 10)
  // # A: the three steps
  const sold = on(f, fresh, 24), toOld = on(f, cash, 24)
  // # A: stack that keeps its height while pieces swap
  const cyc = ((f - rolling) / 24) % 1
  // # C: the tower and its ceiling
  const tower = lerp(30, 42, on(f, reaches - 20, 30))
  const ceilY = GROUND - 42 * 14 - 10 - 120 * on(f, raise, 24)
  return (
    <g>
      <Stage id="nd-roll" frame={f} />
      <Headline f={f} lines={[[single, 'EVERY IOU IS PAID BACK…', P.ink, 96], [trick, '…WITH A NEW IOU', P.ink, 96], [rolling, 'ROLLING OVER THE DEBT', P.ink, 96], [catchW, 'THE CATCH', P.ink, 100], [madeup, 'MADE-UP EXAMPLE', P.ink, 86], [rule, 'THE DEBT LIMIT', P.ink, 100], [zero, 'DEBT VS THE ECONOMY', P.ink, 96]]} />
      <Ground y={GROUND} />

      {/* # A) paid back, with new IOUs */}
      {A > 0 && <g opacity={A}>
        <g opacity={1 - on(f, rolling - 6, 10)}>
          <CentralBank x={960} y={GROUND} s={0.7} name="U.S. TREASURY" glow={win(f, sells, one, 6)} />
          <Person f={f} who="investor" beats={[[single, 'idle', 'neutral'], [full, 'receive', 'smiling'], [cash, 'receive', 'smiling'], [cash + 24, 'thumbsUp', 'smiling']]} x={330} y={GROUND} s={0.9} />
          <g opacity={on(f, newW, 8)}><Person f={f} who="investorF" beats={[[newW, 'idle', 'smiling'], [fresh, 'offer', 'smiling']]} x={1600} y={GROUND} s={0.9} flip /><Label x={1600} y={GROUND + 60} text="NEW BUYER" size={44} font="Bebas Neue" color={GREEN} /></g>
          <Label x={330} y={GROUND + 60} text="OLD BUYER" size={44} font="Bebas Neue" color={P.ink2} />
          <g opacity={on(f, single, 8) * (1 - on(f, due - 4, 8))}><IOU x={560} y={520} s={0.7} t="IOU" /><g opacity={on(f, date, 8)}><Calendar x={720} y={400} text="DUE" s={0.8} /></g><g opacity={on(f, full, 8)}><Label x={560} y={420} text="PAID IN FULL" size={44} font="Bebas Neue" color={GREEN} /></g></g>
          {/* step 1: the old 5-year note comes due */}
          <g opacity={on(f, due - 4, 8) * (1 - toOld)}><IOU x={560} y={520} s={0.7} t="5-YEAR" kind="DUE" col={RED} /></g>
          {/* step 2: a fresh note sold to the new buyer, cash to the Treasury */}
          <g opacity={on(f, fresh, 8)}><IOU x={lerp(1100, 1450, sold)} y={lerp(560, 520, sold) - 120 * Math.sin(Math.PI * sold)} s={0.6} t="NEW" col={GREEN} /></g>
          <g opacity={on(f, fresh + 10, 8) * (1 - on(f, cash, 6))}><Note x={lerp(1450, 1060, on(f, fresh + 10, 24))} y={640} t="CASH" s={0.7} /></g>
          {/* step 3: that cash pays the old buyer */}
          {toOld > 0 && <Note x={lerp(860, 420, toOld)} y={640 - 120 * Math.sin(Math.PI * toOld)} t="CASH" s={0.7} />}
          {([[one, 'STEP 1'], [two, 'STEP 2'], [three, 'STEP 3']] as [number, string][]).map(([at, t], k) => <g key={k} opacity={win(f, at, [two, three, week][k], 6)}><Label x={960} y={330} text={t} size={70} font="Bebas Neue" color={P.ink} /></g>)}
          <g opacity={on(f, week, 8)}><Podium x={620} y={GROUND} s={0.5} bang={Math.max(0, Math.sin((f - auctions) / 4)) * on(f, auctions, 6)} /><Calendar x={620} y={560} text="WEEKLY" s={0.9} /></g>
          <g opacity={on(f, replace, 8)}><Label x={960} y={330} text="NEW BILLS REPLACE OLD BILLS" size={56} font="Bebas Neue" color={P.ink} /></g>
        </g>
        <g opacity={on(f, rolling - 6, 10)}>
          {Array.from({ length: 8 }, (_, k) => { const leave = k === 0 ? cyc : 0; return <g key={k} transform={`translate(${-500 * leave} ${-k * 70 - 70 * cyc * (k > 0 ? 1 : 0)})`} opacity={k === 0 ? 1 - cyc : 1}><IOU x={960} y={GROUND - 60} s={0.5} t="IOU" r={(k % 2) * 4 - 2} /></g> })}
          <g opacity={cyc}><IOU x={960 + 400 * (1 - cyc)} y={GROUND - 60 - 8 * 70 + 70 * cyc - 70} s={0.5} t="NEW" col={GREEN} /></g>
          <g opacity={on(f, pile, 8)}><Label x={500} y={560} text="THE PILE STAYS" size={60} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, replaced, 8)}><Label x={1440} y={560} text="EVERY PIECE IS REPLACED" size={52} font="Bebas Neue" color={GREEN} /></g>
          <g opacity={on(f, lining, 8)}>{[0, 1, 2, 3, 4].map((k) => <Person key={k} f={f} who={['buyer', 'investorF', 'worker', 'owner', 'investor'][k]} beats={[[lining, 'idle', 'smiling']]} x={1300 + k * 110} y={GROUND} s={0.45} flip />)}</g>
          <g opacity={on(f, trust, 8)}><Label x={500} y={640} text="WHILE LENDERS TRUST IT" size={44} font="Bebas Neue" color={P.ink2} /></g>
        </g>
      </g>}

      {/* # B) same debt, twice the interest */}
      {B > 0 && <g opacity={B}>
        <g opacity={on(f, d100, 8)}><IOU x={560} y={560} s={1.2} t="$100" kind="OLD · 2%" col={BLUE} /></g>
        <g opacity={on(f, d2, 8)} transform={`translate(560 ${780 - 20 * (1 - pop(f, d2, 12))})`}><Coin x={0} y={0} s={1.6} text="$2" /><text y={90} textAnchor="middle" fill={INK} style={TXT(40)}>A YEAR</text></g>
        <g opacity={on(f, new58, 8)}><IOU x={1360} y={560} s={1.2} t="$100" kind="NEW · 4%" col={RED} /></g>
        <g opacity={on(f, d4, 8)} transform={`translate(1360 ${780 - 20 * (1 - pop(f, d4, 12))})`}><Coin x={-50} y={0} s={1.6} text="$2" /><Coin x={50} y={0} s={1.6} text="$2" /><text y={90} textAnchor="middle" fill={INK} style={TXT(40)}>$4 A YEAR</text></g>
        <g opacity={on(f, due58, 8)}><path d="M720 560 L1180 560" stroke={P.ink2} strokeWidth={6} strokeDasharray="14 10" /><path d="M1180 540 l30 20 l-30 20 z" fill={P.ink2} /></g>
        <g opacity={on(f, twice, 8)} transform={`translate(960 360) scale(${pop(f, twice, 14)})`}><circle r={90} fill={RED} /><text y={30} textAnchor="middle" fill="#FFFFFF" style={TXT(90)}>2×</text></g>
        <g opacity={on(f, rate56, 8) * (1 - on(f, d100, 8))}><Label x={960} y={560} text="NEW IOU = TODAY'S RATE" size={70} font="Bebas Neue" color={P.ink} /></g>
      </g>}

      {/* # C) the debt limit */}
      {Cw > 0 && <g opacity={Cw}>
        <Blocks x={700} y={GROUND} n={tower} w={300} h={12} col="#E5A99E" />
        <g opacity={on(f, limit, 8) * (1 - on(f, suspend, 12))}><Ceiling x1={480} x2={1000} y={ceilY} /></g>
        <g opacity={on(f, congress, 8)}><Capitol x={1460} y={GROUND} s={0.7} glow={win(f, raise, suspend + 20, 8)} /><Label x={1460} y={GROUND + 60} text="CONGRESS" size={44} font="Bebas Neue" color={P.ink2} /></g>
        <g opacity={on(f, cap, 8) * (1 - on(f, reaches, 8))}><Label x={1460} y={330} text="A LEGAL CAP ON BORROWING" size={50} font="Bebas Neue" color={RED} /></g>
        <g opacity={win(f, raise, suspend, 6)}><Label x={1460} y={330} text="RAISE IT…" size={64} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={win(f, suspend, bills62, 6)}><Label x={1460} y={330} text="…OR SUSPEND IT" size={64} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, bills62, 8)}>{[0, 1, 2].map((k) => <g key={k} transform={`translate(${1220 + k * 240} 430)`}><Bill x={0} y={0} s={0.8} r={-4 + k * 4} t="APPROVED" col={BLUE} /><g opacity={on(f, paid63 + k * 4, 6)} transform="rotate(-12)"><rect x={-70} y={-30} width={140} height={60} rx={8} fill="none" stroke={GREEN} strokeWidth={6} /><text y={16} textAnchor="middle" fill={GREEN} style={TXT(44)}>PAID</text></g></g>)}</g>
        <g opacity={on(f, spent, 8)}><Label x={700} y={290} text="DOESN'T SET SPENDING" size={50} font="Bebas Neue" color={P.ink} /></g>
      </g>}

      {/* # D) debt vs the economy; the real cost is interest */}
      {D > 0 && <g opacity={D}>
        <g opacity={1 - on(f, real - 4, 10)}>
          <g opacity={on(f, economy64, 8)}><circle cx={640} cy={600} r={250 * on(f, economy64, 20)} fill={GREEN} opacity={0.85} /><Label x={640} y={610} text="THE ECONOMY" size={60} font="Bebas Neue" color="#FFFFFF" /><Label x={640} y={680} text="ONE YEAR" size={44} font="Bebas Neue" color="#FFFFFF" /></g>
          <g opacity={on(f, public65, 8)}><circle cx={1280} cy={600} r={250 * on(f, public65, 20)} fill={RED} opacity={0.85} /><Label x={1280} y={610} text="DEBT HELD" size={60} font="Bebas Neue" color="#FFFFFF" /><Label x={1280} y={680} text="BY THE PUBLIC" size={44} font="Bebas Neue" color="#FFFFFF" /></g>
          <g opacity={on(f, economy65, 8)}><Label x={960} y={930 + 60} text="ROUGHLY THE SAME SIZE" size={50} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, faster, 8) * (1 - on(f, public65, 8))}><Label x={960} y={330} text="WHICH GROWS FASTER?" size={70} font="Bebas Neue" color={P.ink} /></g>
        </g>
        <g opacity={on(f, real - 4, 10)}>
          <Blocks x={600} y={GROUND} n={40} w={260} h={12} col="#E5A99E" />
          <g opacity={on(f, pile66, 8)}><Label x={600} y={GROUND + 60} text="NOT THE PILE" size={50} font="Bebas Neue" color={P.ink2} /></g>
          <g opacity={on(f, interest66, 8)} transform={`translate(1300 600) scale(${pop(f, interest66, 14)})`}><Coin x={0} y={0} s={4} text="%" /></g>
          <g opacity={on(f, interest66, 8)}><Glass x={lerp(1700, 1400, on(f, interest66, 20))} y={560} s={0.9} /><Label x={1300} y={GROUND + 60} text="THE INTEREST" size={60} font="Bebas Neue" color={RED} /></g>
        </g>
      </g>}
      {/* # spots:begin */}
      <g>
        <Spot f={f} at={c("s50:get")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s51:back")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s51:the#3")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s52:5year")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s52:buyers")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s52:buyer")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s53:and")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s53:due")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s54:even")} x={960} y={700} rx={200} ry={230} />
        <Spot f={f} at={c("s54:inside")} x={960} y={700} rx={200} ry={230} />
        <Spot f={f} at={c("s55:that")} x={960} y={700} rx={200} ry={230} />
        <Spot f={f} at={c("s55:pay")} x={960} y={700} rx={200} ry={230} />
        <Spot f={f} at={c("s56:but")} x={960} y={620} rx={230} ry={200} />
        <Spot f={f} at={c("s56:iou")} x={960} y={620} rx={230} ry={200} />
        <Spot f={f} at={c("s57:example")} x={960} y={620} rx={230} ry={200} />
        <Spot f={f} at={c("s57:when")} x={960} y={620} rx={230} ry={200} />
        <Spot f={f} at={c("s57:year")} x={960} y={620} rx={230} ry={200} />
        <Spot f={f} at={c("s58:if")} x={960} y={620} rx={230} ry={200} />
        <Spot f={f} at={c("s58:4")} x={960} y={620} rx={230} ry={200} />
        <Spot f={f} at={c("s58:100#2")} x={960} y={620} rx={230} ry={200} />
        <Spot f={f} at={c("s59:same")} x={960} y={620} rx={230} ry={200} />
        <Spot f={f} at={c("s59:just")} x={960} y={620} rx={230} ry={200} />
        <Spot f={f} at={c("s59:rate")} x={960} y={620} rx={230} ry={200} />
        <Spot f={f} at={c("s60:machine")} x={700} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s61:can")} x={700} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s61:total")} x={700} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s62:cap")} x={700} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s62:treasury")} x={700} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s62:borrow")} x={700} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s62:owes")} x={700} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s63:doesn't")} x={700} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s63:decides")} x={700} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s63:already")} x={700} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s64:debt")} x={960} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s64:matters")} x={960} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s64:it#2")} x={960} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s65:now")} x={960} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s65:big")} x={960} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s65:year")} x={960} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s66:up")} x={960} y={600} rx={230} ry={230} />
      </g>
      {/* # spots:end */}
      <Vignette id="nd-roll" />
    </g>
  )
}

export const ND_ROLL = makePiece('nd-roll', 'Rolling over: the U.S. Treasury between an old buyer and a new buyer — the old IOU comes due and is paid in full with cash from a fresh IOU sold to the new buyer, in three steps; a weekly auction podium; a stack of IOUs that keeps its height while the bottom one slides out and a new one lands on top, with buyers lining up; the catch (made-up): a $100 IOU at 2% costs $2 a year, its replacement at 4% costs $4 — 2×; the debt limit as a dashed red ceiling over the debt tower, Congress raises it or suspends it, approved bills get stamped PAID; two circles about the same size — the economy and debt held by the public; a magnifying glass moves from the pile to a big interest coin.', {
  mood: 'light', Component: Roll,
  beats: ["s50:single", "s50:full", "s50:date", "s51:trick", "s51:sells", "s51:new", "s52:one", "s52:due", "s52:two", "s52:fresh", "s52:three", "s52:cash", "s53:week", "s53:auctions", "s53:replace", "s54:rolling", "s54:pile", "s54:replaced", "s55:trust", "s55:lining", "s56:catch", "s56:rate", "s57:madeup", "s57:100", "s57:2#2", "s58:due", "s58:new", "s58:4#2", "s59:twice", "s60:rule", "s60:limit", "s61:congress", "s61:cap", "s62:reaches", "s62:raise", "s62:suspend", "s62:bills", "s63:spent", "s63:paid", "s64:zero", "s64:faster", "s64:economy", "s65:public", "s65:economy", "s66:real", "s66:pile", "s66:interest", "s50:get", "s51:back", "s51:the#3", "s52:5year", "s52:buyers", "s52:buyer", "s53:and", "s53:due", "s54:even", "s54:inside", "s55:that", "s55:pay", "s56:but", "s56:iou", "s57:example", "s57:when", "s57:year", "s58:if", "s58:4", "s58:100#2", "s59:same", "s59:just", "s59:rate", "s60:machine", "s61:can", "s61:total", "s62:cap", "s62:treasury", "s62:borrow", "s62:owes", "s63:doesn't", "s63:decides", "s63:already", "s64:debt", "s64:matters", "s64:it#2", "s65:now", "s65:big", "s65:year", "s66:up"],
  sfx: [['s52:fresh', 'swish', 0.1], ['s52:cash', 'coin', 0.1], ['s59:twice', 'impact', 0.12], ['s62:reaches', 'thud', 0.12], ['s66:interest', 'ding', 0.12]] })
