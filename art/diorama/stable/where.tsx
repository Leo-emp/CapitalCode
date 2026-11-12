// ---------------------------------------------------------------- s25–s41: where the dollar goes (steps one and two).
// A) Step one: Maya's line straight to the coin company is crossed; a big trading firm sends real dollars to the
//    company, the company makes the same number of coins and sends them back; they flow on to Maya's app; the vault
//    under the company fills with the dollars behind her 1,000 coins.
// B) Step two: a desk drawer full of dollars is crossed ("not sitting in a drawer"); the dollars fly to the US
//    government and a Treasury bill comes back. The bill example: $99 goes in today, a calendar turns three months,
//    $100 comes back; the extra $1 glows: interest, about 4% a year. A shield: safe; the bill flips back into cash.
// C) Coins come back: the firm sends coins in, they shrink to nothing (destroyed), dollars go back out; a Treasury
//    bill in the vault turns into cash to pay for it.
// D) What they hold: USDC's backing as one tall block — about 88% short government debt in a fund, the rest cash in
//    banks; Tether's vault with more than $122B of Treasuries.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, fly, win, type Beat } from '../aimoney/common'
import { Calendar } from '../charts'
import { Ground, Office } from '../power/kit2'
import { GovBuilding } from '../fee/kit'
import { CoinHQ, Cross, Dollar, Route, SCoin, TBill, Vault } from './kit'

const GROUND = 920

// # a desk with an open drawer of dollars
const Drawer: React.FC<{ x: number; y: number; o?: number; open?: number }> = ({ x, y, o = 1, open = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-200} y={-260} width={400} height={30} rx={8} fill="#B07A4A" />
    <rect x={-180} y={-230} width={360} height={230} rx={8} fill="#C98F5A" />
    <g transform={`translate(0 ${-150 + 70 * open})`}><rect x={-150} y={-40} width={300} height={90} rx={8} fill="#A86F42" />
      {[-90, 0, 90].map((dx) => <rect key={dx} x={dx - 40} y={-62} width={80} height={36} rx={5} fill="#7FC98F" stroke="#3E8E5A" strokeWidth={3} />)}
      <rect x={-30} y={10} width={60} height={12} rx={6} fill="#5A3A22" /></g>
  </g>
)
// # a shield (safe)
const Shield: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M0 -90 L80 -60 Q80 40 0 90 Q-80 40 -80 -60 Z" fill={P.mint} /><path d="M-30 0 L-8 22 L34 -24" fill="none" stroke="#FFFFFF" strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
  </g>
)

const Where: React.FC<PieceProps> = ({ f, c }) => {
  const s25 = c('s25'), real25 = c('s25:real'), in25 = c('s25:in')
  const not26 = c('s26:not'), small = c('s26:small'), maya26 = c('s26:maya'), directly = c('s26:directly')
  const firm27 = c('s27:firm'), app27 = c('s27:app'), sends27 = c('s27:sends'), dollars27 = c('s27:dollars'), company27 = c('s27:company'), bank27 = c('s27:bank'), coin27 = c('s27:coin')
  const creates = c('s28:creates'), number28 = c('s28:number'), back28 = c('s28:back')
  const apps29 = c('s29:apps'), maya29 = c("s29:maya's")
  const d1000 = c('s30:1000'), handed = c('s30:handed'), real30 = c('s30:real')
  const step2 = c('s31:step'), leave = c('s31:leave'), drawer = c('s31:drawer')
  const lends = c('s32:lends'), government32 = c('s32:government'), buying = c('s32:buying'), bills32 = c('s32:bills')
  const s33 = c('s33'), short33 = c('s33:short'), loan = c('s33:loan')
  const example = c('s34:example'), d99 = c('s34:99'), today = c('s34:today'), three = c('s34:three'), months = c('s34:months'), pays34 = c('s34:pays'), d100 = c('s34:100')
  const extra = c('s35:extra'), interest35 = c('s35:interest'), year35 = c('s35:year'), d4 = c('s35:4')
  const safest = c('s36:safest'), turns = c('s36:turns'), cash36 = c('s36:cash'), quickly = c('s36:quickly')
  const matters = c('s37:matters'), coins37 = c('s37:coins'), back37 = c('s37:back')
  const firm38 = c('s38:firm'), sends38 = c('s38:sends'), destroys = c('s38:destroys'), pays38 = c('s38:pays'), dollars38 = c('s38:dollars')
  const needs = c('s39:needs'), sells = c('s39:sells'), bills39 = c('s39:bills')
  const big38 = c('s38:big'), us41 = c('s41:us')
  const circle = c('s40:circle'), d88 = c('s40:88'), usdc40 = c('s40:usdc'), fund = c('s40:fund'), debt = c('s40:debt'), rest = c('s40:rest'), banks = c('s40:banks')
  const tether = c('s41:tether'), d122 = c('s41:122'), treasuries = c('s41:treasuries'), y2025 = c('s41:2025')
  // # stretches
  const AB = step2 - 4, BC = matters - 4, CD = circle - 4
  const A = win(f, real25 - 20, AB), B = win(f, AB, BC), C = win(f, BC, CD), D = on(f, CD, 10)
  const B1 = win(f, AB, s33 - 2), B2 = win(f, s33 - 2, safest - 4), B3 = on(f, safest - 4, 10)
  return (
    <g>
      <Stage id="sc-where" frame={f} />
      <Headline f={f} lines={[[s25, 'STEP 1: REAL DOLLARS GO IN', P.ink, 96], [d1000, "$1,000 BEHIND MAYA'S COINS", P.ink, 92], [step2, 'STEP 2: THE DOLLARS ARE LENT OUT', P.ink, 88], [bills32, 'TREASURY BILLS', P.ink, 104], [loan, 'A SHORT LOAN TO THE GOVERNMENT', P.ink, 88], [d99, 'PAY $99 TODAY…', P.ink, 100], [d100, '…GET $100 IN 3 MONTHS', P.ink, 100], [d4, 'ABOUT 4% A YEAR', P.ink, 104], [safest, '', P.ink], [matters, '', P.ink], [destroys, '', P.ink], [d88, 'USDC: ABOUT 88% IN SHORT GOVERNMENT DEBT', P.ink, 80], [d122, 'TETHER: $122 BILLION+ IN TREASURIES', P.ink, 84]]} />

      {/* # A) step one: how the coins get made */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <g transform={`translate(0 ${-14 * pop(f, company27, 12) * (1 - on(f, company27 + 14, 8))})`}><CoinHQ x={1520} y={GROUND} s={0.85} sign="COIN COMPANY" lit={0.6 + 0.4 * on(f, coin27, 8)} /></g>
        {/* # Maya, small on the left; her direct line to the company is crossed */}
        <g opacity={on(f, in25, 8) * (1 - on(f, in25 + 30, 8))}><Dollar x={lerp(1180, 1440, on(f, in25, 20))} y={GROUND - 60} s={0.6} /></g>
        <g opacity={on(f, real25, 8) * (1 - on(f, firm27, 10))}>
          <Person f={f} who="investorF" beats={[[0, 'phone', 'smiling'], [directly, 'shrug', 'neutral']]} x={300} y={GROUND} s={0.7} />
          <Route pts={[[420, GROUND - 260], [1300, GROUND - 260]]} p={on(f, maya26, 18)} />
          <Cross x={860} y={GROUND - 260} o={on(f, directly, 8)} size={52} />
        </g>
        {/* # the big trading firm */}
        <g opacity={on(f, firm27, 10)}>
          <Office x={420} y={GROUND} s={1.0} />
          <Label x={420} y={GROUND + 70} text="BIG TRADING FIRM" size={48} font="Bebas Neue" color={P.ink} />
          <g opacity={on(f, bank27, 8) * (1 - on(f, creates, 8))} transform="translate(660 780)"><rect x={-70} y={-50} width={140} height={100} rx={12} fill={P.card} stroke={P.edge} strokeWidth={3} /><path d="M-50 -10 L0 -40 L50 -10 Z" fill={P.navy3} />{[-30, 0, 30].map((cx) => <rect key={cx} x={cx - 7} y={-6} width={14} height={36} rx={3} fill={P.navy3} />)}</g>
          {/* # dollars go across */}
          {[0, 1, 2].map((k) => { const fl = fly(f, dollars27 + k * 6, [560, 600], [1420, 640], 24, 160); return fl.t < 1 && f >= dollars27 ? <Dollar key={k} x={fl.x} y={fl.y} s={0.6} o={fl.o} /> : null })}
          {/* # coins come back */}
          {[0, 1, 2].map((k) => { const fl = fly(f, back28 - 6 + k * 6, [1420, 520], [560, 480], 24, 160); return fl.t < 1 && f >= back28 - 6 ? <SCoin key={k} x={fl.x} y={fl.y} s={0.7} o={fl.o} /> : null })}
          {/* # the company makes coins: they pop out of the roof sign */}
          {[0, 1, 2].map((k) => <SCoin key={k} x={1380 + k * 100} y={GROUND - 640} s={0.7} o={on(f, creates + k * 4, 6) * (1 - on(f, back28 - 6, 6))} />)}
          <g opacity={on(f, number28, 8) * (1 - on(f, back28 - 6, 6))}><Label x={1480} y={GROUND - 720} text="3 DOLLARS = 3 COINS" size={52} font="Bebas Neue" color={P.ink2} /></g>
        </g>
        {/* # on to Maya's app */}
        <g opacity={on(f, apps29, 10) * (1 - on(f, d1000 - 6, 8))}>
          {[0, 1, 2].map((k) => { const fl = fly(f, apps29 + k * 6, [560, 480], [880, 360], 22, 100); return fl.t < 1 ? <SCoin key={k} x={fl.x} y={fl.y} s={0.6} o={fl.o} /> : null })}
          <g transform="translate(900 380)"><rect x={-70} y={-120} width={140} height={240} rx={22} fill="#0D1424" /><rect x={-60} y={-106} width={120} height={212} rx={14} fill="#F7FAFF" /><SCoin x={0} y={0} s={0.8} /></g>
          <g opacity={on(f, maya29, 8)}><Label x={900} y={560} text="MAYA'S APP" size={46} font="Bebas Neue" color={P.ink} /></g>
        </g>
        {/* # the vault under the company: the real dollars behind her coins */}
        <g opacity={on(f, d1000 - 6, 10)} transform={`translate(0 ${lerp(30, 0, pop(f, d1000 - 6, 14))})`}>
          <Vault x={900} y={GROUND} s={0.8} door={on(f, handed, 14)} fill={lerp(0, 0.5, on(f, real30, 20))} />
          <g opacity={on(f, d1000, 8)}><SCoin x={900} y={GROUND - 470} s={1.0} text="1,000" /></g>
        </g>
      </g>}

      {/* # B) step two: lent to the government */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        {B1 > 0 && <g opacity={B1}>
          <g opacity={1 - on(f, lends, 10)}><Drawer x={760} y={GROUND} open={on(f, leave, 14)} /><Cross x={760} y={GROUND - 230} o={on(f, drawer, 8)} size={60} /></g>
          <Vault x={460} y={GROUND} s={0.75} door={1} fill={0.5} o={on(f, lends, 10)} />
          <g opacity={on(f, government32, 10)}><GovBuilding x={1440} y={GROUND} s={0.95} /><Label x={1440} y={GROUND + 70} text="US GOVERNMENT" size={50} font="Bebas Neue" color={P.ink} /></g>
          {[0, 1, 2].map((k) => { const fl = fly(f, government32 + k * 6, [480, GROUND - 200], [1400, GROUND - 260], 22, 160); return fl.t < 1 && f >= government32 ? <Dollar key={k} x={fl.x} y={fl.y} s={0.6} o={fl.o} /> : null })}
          {(() => { const fl = fly(f, bills32 - 4, [1400, GROUND - 300], [800, 440], 20, 120); return <TBill x={fl.x} y={fl.y} s={lerp(0.6, 1.1, fl.t)} o={on(f, bills32 - 4, 6)} /> })()}
        </g>}
        {B2 > 0 && <g opacity={B2}>
          <GovBuilding x={1440} y={GROUND} s={0.95} />
          <TBill x={lerp(800, 960, on(f, s33, 14))} y={lerp(440, 300, on(f, s33, 14))} s={1.1} o={1 - on(f, example, 10)} />
          <g opacity={on(f, short33, 8) * (1 - on(f, example, 10))}><Label x={960} y={470} text="SHORT LOAN" size={56} font="Bebas Neue" color={P.ink2} /></g>
          {/* # the example: $99 in today, $100 back in three months */}
          <g opacity={on(f, example, 10)}>
            <g opacity={on(f, d99, 8)}>{(() => { const fl = fly(f, today, [420, 620], [1360, GROUND - 260], 26, 180); return <g><Dollar x={fl.x} y={fl.y} s={1.0} text="$99" o={1 - on(f, today + 26, 4)} /></g> })()}
              <Person f={f} who="hero" beats={[[0, 'idle', 'neutral'], [pays34 - 30, 'offer', 'smiling'], [d100, 'receive', 'smiling'], [extra, 'point', 'smiling']]} x={300} y={GROUND} s={0.8} />
              <g opacity={on(f, d99, 8) * (1 - on(f, today + 24, 6))}><Label x={300} y={GROUND + 70} text="TODAY" size={48} font="Bebas Neue" color={P.ink2} /></g></g>
            <g opacity={on(f, three, 8)}><Calendar x={960} y={360} text={f < months ? '1' : f < months + 12 ? '2' : '3'} s={1.1} flip={((f - three) % 12) / 12} /><Label x={960} y={500} text="MONTHS" size={44} font="Bebas Neue" color={P.ink2} /></g>
            {(() => { const fl = fly(f, pays34, [1360, GROUND - 260], [560, 620], 24, 180); return f >= pays34 ? <Dollar x={fl.x} y={fl.y} s={1.0} text="$100" /> : null })()}
            {/* # the extra dollar glows: that's the interest */}
            <g opacity={on(f, year35, 8)}>{[0, 1, 2, 3].map((k) => <g key={k} opacity={on(f, year35 + k * 4, 6)}><circle cx={1220 + k * 90} cy={320} r={30} fill={P.gold} /><text x={1220 + k * 90} y={332} textAnchor="middle" fill={P.goldD} style={{ font: '400 32px "Bebas Neue"' }}>$1</text></g>)}<Label x={1355} y={395} text="4 × 3 MONTHS" size={40} font="Bebas Neue" color={P.ink2} /></g>
            <g opacity={on(f, extra, 8)}><circle cx={560} cy={620} r={150} fill={P.gold} opacity={0.22} /><Label x={560} y={790} text="+$1 INTEREST" size={60} font="Bebas Neue" color={P.goldInk} /></g>
          </g>
        </g>}
        {B3 > 0 && <g opacity={B3}>
          <GovBuilding x={1440} y={GROUND} s={0.95} />
          <TBill x={760} y={560} s={1.4} o={1 - on(f, cash36, 10)} />
          <g opacity={on(f, safest, 8) * (1 - on(f, turns, 8))}><Shield x={760} y={330} s={1.1} /></g>
          <g opacity={on(f, cash36, 8)} transform={`translate(760 560) scale(${lerp(0.4, 1, on(f, cash36, 12))})`}><Dollar x={0} y={0} s={1.6} /></g>
          <g opacity={on(f, quickly, 8)}><Label x={760} y={GROUND - 120} text="BACK TO CASH, FAST" size={52} font="Bebas Neue" color={P.ink2} /></g>
        </g>}
      </g>}

      {/* # C) coins come back: destroyed, dollars paid out; a bill is sold for the cash */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <g transform={`translate(0 ${-16 * pop(f, big38, 12) * (1 - on(f, big38 + 14, 8))})`}><Office x={300} y={GROUND} s={0.9} /></g><Label x={300} y={GROUND + 70} text="BIG TRADING FIRM" size={48} font="Bebas Neue" color={P.ink} />
        <CoinHQ x={1520} y={GROUND} s={0.85} sign="COIN COMPANY" />
        <Vault x={960} y={GROUND} s={0.6} door={1} fill={0.5} tbills={0.66} o={on(f, needs, 10)} />
        {[0, 1, 2].map((k) => { const fl = fly(f, coins37 + k * 6, [420, 420], [1300, 400], 26, 60)
          const sq = 1 - on(f, destroys + k * 4, 10)
          return f >= coins37 ? <g key={k}>{fl.t < 1 ? <SCoin x={fl.x} y={fl.y} s={0.7} o={fl.o} /> : <SCoin x={1220 + k * 80} y={400} s={0.7 * sq} o={sq} />}</g> : null })}
        <g opacity={on(f, destroys, 6) * (1 - on(f, pays38, 10))}>{[0, 1, 2, 3, 4, 5].map((k) => { const a = k * Math.PI / 3, r = 40 + 60 * on(f, destroys, 14); return <circle key={k} cx={1300 + Math.cos(a) * r} cy={400 + Math.sin(a) * r} r={8} fill={P.gold} /> })}</g>
        {[0, 1, 2].map((k) => { const fl = fly(f, dollars38 - 8 + k * 6, [1300, 470], [420, 470], 26, 50); return fl.t < 1 && f >= dollars38 - 8 ? <Dollar key={k} x={fl.x} y={fl.y} s={0.6} o={fl.o} /> : null })}
        {/* # a Treasury bill rises out of the vault and turns into cash */}
        <g opacity={on(f, sells, 8)}>
          <TBill x={960} y={lerp(GROUND - 180, 560, on(f, sells, 16))} s={0.7} o={1 - on(f, bills39 + 10, 8)} />
          <g opacity={on(f, bills39 + 10, 8)}><Dollar x={960} y={560} s={1.0} /></g>
        </g>
      </g>}

      {/* # D) what the two biggest hold */}
      {D > 0 && <g opacity={D}>
        <Ground y={GROUND} />
        {/* # USDC: one block of backing; on "88" the big lower part becomes Treasury-bill paper and slides into the government-debt
        // # fund (a box by a small government building); the small top part slides to a bank as cash. Cleared before Tether. */}
        <g opacity={on(f, circle, 10) * (1 - on(f, tether - 6, 10))}>
          {(() => { const H = 520, x = 760, sp = on(f, d88, 18), go = on(f, fund, 20), gc = on(f, rest, 20)
            const big = H * 0.88, small = H * 0.12
            return <g>
              <SCoin x={x} y={GROUND - H - 90} s={1.2} text="USDC" spin={f >= usdc40 ? Math.max(0, 1 - span(f, usdc40, usdc40 + 16)) : 0} />
              {/* # the big part: green money that turns into bill paper, then slides right into the fund */}
              <g transform={`translate(${lerp(0, 560, go)} 0)`}>
                <rect x={x - 160} y={GROUND - big} width={320} height={big - 8} rx={16} fill={sp > 0.5 ? '#F4EBD6' : '#7FC98F'} stroke={sp > 0.5 ? '#B9A57A' : '#3E8E5A'} strokeWidth={5} />
                {sp > 0.5 && Array.from({ length: 4 }, (_, k) => <g key={k}><circle cx={x - 70 + (k % 2) * 140} cy={GROUND - 80 - Math.floor(k / 2) * 130} r={30} fill={P.gold} /><circle cx={x - 70 + (k % 2) * 140} cy={GROUND - 80 - Math.floor(k / 2) * 130} r={20} fill="none" stroke={P.goldD} strokeWidth={4} /></g>)}
                <g opacity={on(f, d88, 8)}><text x={x} y={GROUND - big + 100} textAnchor="middle" fill="#5A4426" style={{ font: '400 76px "Bebas Neue"' }}>≈ 88%</text></g>
              </g>
              {/* # the small part: cash, sliding left to a bank */}
              <g transform={`translate(${lerp(0, -420, gc)} ${lerp(0, H - small - 8, gc)})`}>
                <rect x={x - 160} y={GROUND - H} width={320} height={small - 8} rx={12} fill="#7FC98F" stroke="#3E8E5A" strokeWidth={5} />
              </g>
              {/* # where they go */}
              <g opacity={on(f, fund, 10)}><GovBuilding x={1720} y={GROUND} s={0.45} /><rect x={1140} y={GROUND - big - 70} width={360} height={58} rx={14} fill={P.navy3} /><text x={1320} y={GROUND - big - 28} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>{f >= debt ? 'GOVERNMENT DEBT FUND' : 'A FUND'}</text></g>
              <g opacity={on(f, rest, 10)}><g transform="translate(200 0)"><rect x={-120} y={GROUND - 150} width={240} height={150} rx={8} fill="#E8EEF5" /><path d={`M-140 ${GROUND - 150} L0 ${GROUND - 220} L140 ${GROUND - 150} Z`} fill="#C9D3E1" /></g>
                <Label x={340} y={GROUND - 250} text={f >= banks ? 'CASH IN BANKS' : 'CASH'} size={48} font="Bebas Neue" color={P.ink} /></g>
            </g> })()}
        </g>
        {/* # Tether: a vault full of Treasury bills */}
        <g opacity={on(f, tether, 10)} transform={`translate(${lerp(0, 0, 0)} 0)`}>
          <Vault x={1500} y={GROUND} s={0.85} door={on(f, d122, 16)} fill={on(f, d122, 30) * 0.95} tbills={1} />
          <SCoin x={1500} y={GROUND - 470} s={1.2} text="USDT" color="#26A17B" />
          <g opacity={on(f, us41, 8)}><rect x={1620} y={500} width={160} height={56} rx={14} fill={P.navy3} /><text x={1700} y={540} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>US</text></g>
          <g opacity={on(f, treasuries, 8)}><Label x={1500} y={GROUND + 70} text="$122B+ US TREASURIES" size={50} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, y2025, 8)}><Label x={1500} y={GROUND + 120} text="END OF 2025" size={40} font="Bebas Neue" color={P.ink2} /></g>
        </g>
      </g>}
      <Vignette id="sc-where" />
    </g>
  )
}

const BEATS = ["s28:number", "s35:year", "s38:big", "s41:us", 's25:real', 's25:in', 's26:small', 's26:maya', 's26:directly', 's27:firm', 's27:sends', 's27:dollars', 's27:bank', 's27:company', 's27:coin', 's28:creates', 's28:back', 's29:apps', "s29:maya's", 's30:1000', 's30:handed', 's30:real', 's31:step', 's31:leave', 's31:drawer', 's32:lends', 's32:government', 's32:bills', 's33', 's33:short', 's34:example', 's34:99', 's34:today', 's34:three', 's34:months', 's34:pays', 's34:100', 's35:extra', 's35:interest', 's35:4', 's36:safest', 's36:turns', 's36:cash', 's36:quickly', 's37:matters', 's37:coins', 's38:sends', 's38:destroys', 's38:pays', 's38:dollars', 's39:needs', 's39:sells', 's39:bills', 's40:circle', 's40:88', 's40:usdc', 's40:fund', 's40:debt', 's40:rest', 's41:tether', 's41:122', 's41:treasuries', 's41:2025']
export const SC_WHERE = makePiece('sc-where', 'Stablecoin long ch2: step one — a big firm sends real dollars, the company makes coins and sends them back, they reach Maya\'s app, $1,000 sits in the vault; step two — not in a drawer: dollars lent to the US government for Treasury bills ($99 today → $100 in 3 months, +$1 interest, ~4% a year), safe and back to cash fast; coins coming back are destroyed and dollars paid out; USDC ~88% in a government-debt fund, rest cash; Tether $122B+ in Treasuries', {
  mood: 'light', Component: Where, beats: BEATS,
  sfx: [['s27:dollars', 'whoosh', 0.25], ['s28:creates', 'pop', 0.25], ['s31:drawer', 'swish', 0.2], ['s32:government', 'whoosh', 0.25], ['s34:100', 'cash', 0.3], ['s35:interest', 'ding', 0.25], ['s38:destroys', 'pop', 0.25], ['s41:122', 'thud', 0.3]] })
