// ---------------------------------------------------------------- s22–s35: how the government borrows — it sells IOUs.
// A) Not a bank (crossed out): the Treasury prints an IOU — "lend us money now, we pay you back with interest" — on paper,
//    then on a phone screen; an auction podium, bidders raise their hands, the gavel falls.
// B) Three sizes of time as three bars: BILLS up to 1 year, NOTES 2–10 years, BONDS 20 or 30 years.
// C) A made-up $1,000 10-year note at 4%: the buyer hands over $1,000, a $20 coin drops every half-year along a 10-year
//    track until $400 has piled up, then the $1,000 comes back.
// D) Millions of buyers (a crowd of tiny IOUs); a vault labelled SAFE; a TV showing the 10-YEAR YIELD; the average rate
//    on all the debt: 3.6%; then a heap of IOUs with a question mark: who holds them?
import React from 'react'
import { lerp, on, P, pop, Stage, Vignette } from '../kit'
import { Spot } from '../bank/kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win, Coin, Phone, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { BankFront } from '../bank/kit'
import { CentralBank, NoCross, Note, Gauge } from '../econ/kit'
import { IOU, Podium, TV, TXT, INK, RED, GREEN, BLUE, GOLD } from './kit'

const GROUND = 930

const Borrow: React.FC<PieceProps> = ({ f, c }) => {
  const gap22 = c('s22:gap'), bank = c('s22:bank')
  const sells = c('s23:sells'), paper = c('s23:paper'), digital = c('s23:digital'), lend = c('s23:lend'), interest23 = c('s23:interest')
  const auctions = c('s24:auctions'), round = c('s24:round'), buy24 = c('s24:buy')
  const three = c('s25:three'), sizes = c('s25:sizes')
  const bills = c('s26:bills'), notes = c('s26:notes'), bonds = c('s26:bonds')
  const madeup = c('s27:madeup'), d1000 = c('s27:1000'), p4 = c('s27:4')
  const hand = c('s28:hand')
  const two = c('s29:two'), d40 = c('s29:40')
  const back30 = c('s30:back'), d400 = c('s30:400')
  const multiply = c('s31:multiply'), millions = c('s31:millions'), trillions = c('s31:trillions')
  const buy32 = c('s32:buy'), safest = c('s32:safest'), record = c('s32:record')
  const news = c('s33:news'), trade = c('s33:trade')
  const average = c('s34:average'), p36 = c('s34:36')
  const question = c('s35:question'), holding = c('s35:holding')

  const A = win(f, 0, three - 4), B = win(f, three - 4, madeup - 4), Cw = win(f, madeup - 4, multiply - 4), D = on(f, multiply - 4, 10)
  // # C: the note's ten years, two coins a year
  const tStart = two, tEnd = back30 - 4
  const coins = f >= tStart ? Math.min(20, Math.floor(20 * on(f, tStart, Math.max(30, tEnd - tStart)))) : 0
  const handOver = on(f, hand, 24), payBack = on(f, back30, 24)
  const buyer: Beat[] = [[madeup, 'idle', 'smiling'], [hand, 'offer', 'smiling'], [d40, 'receive', 'smiling'], [d400, 'celebrate', 'smiling']]
  return (
    <g>
      <Stage id="nd-borrow" frame={f} />
      <Headline f={f} lines={[[gap22, 'HOW THE GOVERNMENT BORROWS', P.ink, 90], [three, 'THREE SIZES OF TIME', P.ink, 96], [madeup, 'MADE-UP $1,000 NOTE AT 4%', P.ink, 86], [multiply, 'MILLIONS OF BUYERS', P.ink, 96], [average, 'AVERAGE RATE ON ALL THE DEBT', P.ink, 86], [question, 'WHO HOLDS THEM?', P.ink, 100]]} />
      <Ground y={GROUND} />

      {/* # A) IOUs, sold at auction */}
      {A > 0 && <g opacity={A}>
        <g opacity={1 - on(f, sells - 4, 10)}><BankFront x={960} y={GROUND} s={1} name="BANK" /><NoCross x={960} y={600} s={2} o={on(f, bank, 8)} /></g>
        <g opacity={on(f, sells - 4, 10)}>
          <CentralBank x={380} y={GROUND} s={0.75} name="U.S. TREASURY" glow={win(f, sells, paper, 8)} />
          <g opacity={on(f, paper, 8) * (1 - on(f, auctions - 6, 10))}><IOU x={960} y={560} s={1.6} t="IOU" kind={f >= interest23 ? 'BACK + INTEREST' : f >= lend ? 'LEND US $ NOW' : ''} /></g>
          <g opacity={win(f, digital, lend, 6)}><Phone x={1450} y={600} s={1.2}><text y={10} textAnchor="middle" fill={INK} style={TXT(48)}>IOU</text></Phone></g>
          <g opacity={on(f, auctions - 6, 10)}>
            <Podium x={960} y={GROUND} s={1} bang={Math.max(0, Math.sin((f - round) / 4)) * on(f, round, 6)} />
            {[0, 1, 2, 3].map((k) => <g key={k} opacity={on(f, buy24 - 6 + k * 3, 8)}><Person f={f} who={['buyer', 'investorF', 'investor', 'owner'][k]} beats={[[buy24, k % 2 ? 'reachUp' : 'pointUp', 'smiling']]} x={1300 + k * 150} y={GROUND} s={0.55} flip /></g>)}
          </g>
        </g>
      </g>}

      {/* # B) bills, notes, bonds */}
      {B > 0 && <g opacity={B}>
        {([[bills, 'BILLS', 'UP TO 1 YEAR', 1, GREEN], [notes, 'NOTES', '2 TO 10 YEARS', 10, BLUE], [bonds, 'BONDS', '20 OR 30 YEARS', 30, RED]] as [number, string, string, number, string][]).map(([at, t, sub, yrs, col], k) => <g key={k} opacity={on(f, at, 8)}>
          <IOU x={300} y={430 + k * 180} s={0.6} t={t} col={col} />
          <rect x={430} y={410 + k * 180} width={Math.max(20, 1050 * (yrs / 30) * on(f, at, 24))} height={40} rx={20} fill={col} />
          <Label x={440 + Math.max(20, 1050 * (yrs / 30)) + 20} y={442 + k * 180} text={sub} size={46} font="Bebas Neue" color={P.ink} anchor="start" />
        </g>)}
        <g opacity={on(f, sizes, 8) * (1 - on(f, bills, 8))}><Label x={960} y={560} text="SHORT · MEDIUM · LONG" size={80} font="Bebas Neue" color={P.ink} /></g>
      </g>}

      {/* # C) one note, step by step */}
      {Cw > 0 && <g opacity={Cw}>
        <CentralBank x={300} y={GROUND} s={0.6} name="U.S. TREASURY" />
        <Person f={f} who="investorF" beats={buyer} x={1700} y={GROUND} s={0.95} flip />
        <g opacity={on(f, d1000, 8) * (1 - handOver)}><Note x={1560} y={600} t="$1,000" s={0.9} /></g>
        {handOver > 0 && handOver < 1 && <Note x={lerp(1560, 420, handOver)} y={600 - 140 * Math.sin(Math.PI * handOver)} t="$1,000" s={0.9} />}
        <g opacity={on(f, hand + 20, 8)}><IOU x={1540} y={420} s={0.6} t="NOTE" kind="10 YEARS · 4%" /></g>
        {/* the ten-year track */}
        <g opacity={on(f, two - 6, 10)}>
          <line x1={520} y1={820} x2={1400} y2={820} stroke={INK} strokeWidth={6} />
          {Array.from({ length: 11 }, (_, k) => <g key={k}><rect x={518 + k * 88} y={808} width={4} height={24} fill={INK} />{k > 0 && <text x={520 + k * 88} y={870} textAnchor="middle" fill={INK} style={TXT(30)}>{`Y${k}`}</text>}</g>)}
          {Array.from({ length: coins }, (_, k) => <Coin key={k} x={520 + 44 * (k + 1) - 22} y={780 - (k % 2) * 34} s={0.55} text="20" />)}
        </g>
        <g opacity={on(f, d40, 8)}><Label x={960} y={520} text="$40 A YEAR = TWO $20 PAYMENTS" size={56} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, d400, 8)} transform={`translate(960 400) scale(${pop(f, d400, 12)})`}><rect x={-200} y={-50} width={400} height={90} rx={14} fill={GREEN} /><text y={16} textAnchor="middle" fill="#FFFFFF" style={TXT(60)}>EARNED $400</text></g>
        {payBack > 0 && <Note x={lerp(420, 1560, payBack)} y={600 - 140 * Math.sin(Math.PI * payBack)} t="$1,000 BACK" s={0.9} o={payBack < 1 ? 1 : 1 - on(f, back30 + 30, 10)} />}
        <g opacity={on(f, p4, 8) * (1 - on(f, two, 8))}><Label x={960} y={520} text="4% A YEAR" size={70} font="Bebas Neue" color={P.ink} /></g>
      </g>}

      {/* # D) millions of buyers, safest, the yield, the average rate */}
      {D > 0 && <g opacity={D}>
        <g opacity={1 - on(f, buy32 - 6, 10)}>
          {Array.from({ length: 40 }, (_, k) => <g key={k} opacity={on(f, millions + (k % 10) * 2, 6)}><IOU x={260 + (k % 10) * 155} y={420 + Math.floor(k / 10) * 120} s={0.32} t="IOU" r={-6 + (k % 5) * 3} /></g>)}
          <g opacity={on(f, trillions, 8)}><Label x={960} y={GROUND + 60} text="TRILLIONS OF DOLLARS" size={56} font="Bebas Neue" color={P.ink} /></g>
        </g>
        <g opacity={win(f, buy32 - 6, news - 4, 10)}>
          <rect x={560} y={GROUND - 300} width={300} height={300} rx={24} fill="#8BA0BF" stroke="#5C6F8E" strokeWidth={8} /><circle cx={710} cy={GROUND - 160} r={70} fill="#5C6F8E" />
          <g opacity={on(f, safest, 8)}><Label x={710} y={GROUND - 340} text="SAFE" size={80} font="Bebas Neue" color={GREEN} /></g>
          <g opacity={on(f, record, 8)}><Label x={1300} y={560} text="A LONG RECORD" size={64} font="Bebas Neue" color={P.ink} /><Label x={1300} y={630} text="OF PAYING BACK" size={64} font="Bebas Neue" color={P.ink} /></g>
        </g>
        <g opacity={win(f, news - 4, average - 4, 10)}>
          <TV x={960} y={GROUND - 40} s={1.4} t="10-YEAR YIELD" v="%" f={f} />
          <g opacity={on(f, trade, 8)}><Label x={960} y={GROUND + 50} text="THE RATE AS INVESTORS TRADE THEM" size={44} font="Bebas Neue" color={P.ink} /></g>
        </g>
        <g opacity={win(f, average - 4, question - 4, 10)}>
          <Gauge x={800} y={820} s={1.3} v={lerp(0, 0.36, on(f, p36, 24))} />
          <g opacity={on(f, p36, 8)}><Label x={1320} y={700} text="3.6%" size={160} font="Bebas Neue" color={P.ink} /></g>
          <Label x={800} y={GROUND + 50} text="0% TO 10%" size={36} font="Bebas Neue" color={P.ink2} />
        </g>
        <g opacity={on(f, question - 4, 10)}>
          {Array.from({ length: 18 }, (_, k) => <IOU key={k} x={720 + (k % 6) * 90 + (Math.floor(k / 6) % 2) * 40} y={GROUND - 60 - Math.floor(k / 6) * 70} s={0.4} r={-10 + (k % 4) * 6} />)}
          <g opacity={on(f, holding, 8)}><circle cx={1500} cy={560} r={110} fill="#FFFFFF" stroke="#E2D3B4" strokeWidth={8} /><text x={1500} y={600} textAnchor="middle" fill={RED} style={TXT(130)}>?</text></g>
        </g>
      </g>}
      {/* # spots:begin */}
      <g>
        <Spot f={f} at={c("s22:money")} x={960} y={620} rx={230} ry={200} />
        <Spot f={f} at={c("s22:it")} x={960} y={620} rx={230} ry={200} />
        <Spot f={f} at={c("s23:pieces")} x={960} y={620} rx={230} ry={200} />
        <Spot f={f} at={c("s23:say")} x={960} y={620} rx={230} ry={200} />
        <Spot f={f} at={c("s23:we")} x={960} y={620} rx={230} ry={200} />
        <Spot f={f} at={c("s24:treasury")} x={960} y={620} rx={230} ry={200} />
        <Spot f={f} at={c("s25:time")} x={960} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s26:year")} x={960} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s26:10")} x={960} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s26:years#2")} x={960} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s27:how")} x={960} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s27:you")} x={960} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s28:step")} x={960} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s28:dollars")} x={960} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s29:year")} x={960} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s29:of#2")} x={960} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s30:three")} x={960} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s30:years")} x={960} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s30:in")} x={960} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s30:it")} x={960} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s31:dollars")} x={960} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s32:us")} x={960} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s32:widely")} x={960} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s32:to")} x={960} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s32:and")} x={960} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s32:back")} x={960} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s33:treasury")} x={960} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s33:the#3")} x={960} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s33:notes")} x={960} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s34:across")} x={960} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s34:debt")} x={960} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s34:percent")} x={960} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s35:ious")} x={960} y={560} rx={230} ry={200} />
      </g>
      {/* # spots:end */}
      <Vignette id="nd-borrow" />
    </g>
  )
}

export const ND_BORROW = makePiece('nd-borrow', 'How the government borrows: a bank crossed out; the U.S. Treasury issues an IOU (lend us money now, we pay you back with interest), shown on paper and on a phone; an auction podium where bidders raise their hands and the gavel falls; three IOUs with time bars — bills up to 1 year, notes 2 to 10 years, bonds 20 or 30 years; a made-up $1,000 10-year note at 4%: the buyer hands $1,000 to the Treasury, $20 coins drop twice a year along a 10-year track, EARNED $400, and the $1,000 comes back; a field of tiny IOUs (millions of buyers, trillions of dollars); a vault labelled SAFE with a long record of paying back; a TV showing the 10-year yield; a gauge at 3.6%, the average rate on all the debt; a heap of IOUs and a question mark — who holds them?', {
  mood: 'light', Component: Borrow,
  beats: ["s22:bank", "s23:sells", "s23:paper", "s23:digital", "s23:lend", "s23:interest", "s24:auctions", "s24:round", "s24:buy", "s25:three", "s25:sizes", "s26:bills", "s26:notes", "s26:bonds", "s27:madeup", "s27:1000", "s27:4", "s28:hand", "s29:two", "s29:40", "s30:back", "s30:400", "s31:multiply", "s31:millions", "s31:trillions", "s32:buy", "s32:safest", "s32:record", "s33:news", "s33:trade", "s34:average", "s34:36", "s35:question", "s35:holding", "s22:money", "s22:it", "s23:pieces", "s23:say", "s23:we", "s24:treasury", "s25:time", "s26:year", "s26:10", "s26:years#2", "s27:how", "s27:you", "s28:step", "s28:dollars", "s29:year", "s29:of#2", "s30:three", "s30:years", "s30:in", "s30:it", "s31:dollars", "s32:us", "s32:widely", "s32:to", "s32:and", "s32:back", "s33:treasury", "s33:the#3", "s33:notes", "s34:across", "s34:debt", "s34:percent", "s35:ious"],
  sfx: [['s23:paper', 'pop', 0.1], ['s24:round', 'thump', 0.12], ['s28:hand', 'swish', 0.1], ['s30:400', 'chime', 0.12], ['s34:36', 'ding', 0.1]] })
