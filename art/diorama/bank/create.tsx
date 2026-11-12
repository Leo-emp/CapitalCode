// ---------------------------------------------------------------- s39–s58: step three, money from a loan (navy mood).
// A) The way it's often taught: Nora's $1,000 walks along a track from her, through the bank, to a borrower. The Bank of
//    England (a columned central bank) appears with its 2014 report, and a clean cross lands on the track.
// B) Leo wants a $20,000 car. The vault stays shut (cross on the counted-out pile). The bank's computer types two lines:
//    LEO'S ACCOUNT +$20,000 and LEO OWES $20,000; "new money" sparkles; Nora's $1,000 row is unchanged (tick).
// C) Leo pays the car dealer: a glowing bill flies from Leo to the dealer, into the dealer's bank, then hops along
//    accounts. When Leo pays the loan back, both ledger lines are struck out and fade — the money is deleted.
// D) Why so little is cash: a UK bar 97% deposits / 3% cash; a US tower of ten blocks, one block of cash ($2.4T of
//    $23.4T) and nine blocks of screen money.
// E) Can a bank type money forever? No: a borrower who can repay, a CAPITAL cushion under the bank, and the central
//    bank's interest-rate dial.
// F) Recap: LEND → money appears (+), REPAY → money disappears (−).
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Car, Headline, Label, Person, Tick, fly, win, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { BankFront, CashBrick, DollarBill, Ledger, NoMark, Spot, Vault, type Row } from './kit'

const GROUND = 930
const SKY = '#5BCBFF', MINT = '#3DDC97', CORAL = '#F06B5B'

// # the central bank: a wide columned building with a dome
const CentralBank: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={360} ry={22} fill="#000" opacity={0.25} />
    <rect x={-340} y={-40} width={680} height={40} rx={4} fill="#B9AE98" /><rect x={-300} y={-330} width={600} height={290} fill="#E8DFCB" />
    {Array.from({ length: 8 }, (_, k) => <rect key={k} x={-270 + k * 74} y={-310} width={34} height={262} fill="#FFFFFF" />)}
    <rect x={-320} y={-360} width={640} height={36} fill="#D6CBB3" /><path d="M-120 -360 Q0 -480 120 -360 Z" fill="#D6CBB3" /><rect x={-8} y={-500} width={16} height={60} fill="#B9AE98" />
  </g>
)

const Create: React.FC<PieceProps> = ({ f, c }) => {
  const part = c('s39:part'), surprises = c('s39:surprises')
  const think40 = c('s40:think'), takes = c('s40:takes'), noras = c("s40:nora's"), hands40 = c('s40:hands'), borrower40 = c('s40:borrower')
  const taught = c('s41:taught'), england41 = c('s41:england'), central41 = c('s41:central'), explained = c('s41:explained'), y2014 = c('s41:2014'), doesnt41 = c("s41:doesn't"), way41 = c('s41:way')
  const actually = c('s42:actually'), loan42 = c('s42:loan')
  const leo43 = c('s43:leo'), borrows43 = c('s43:borrows'), k20a = c('s43:20000'), car43 = c('s43:car')
  const doesnt44 = c("s44:doesn't"), vault44 = c('s44:vault'), count44 = c('s44:count'), k20b = c('s44:20000'), peoples = c("s44:people's")
  const types = c('s45:types'), k20c = c('s45:20000'), account45 = c('s45:account'), moment = c('s45:moment'), writes = c('s45:writes'), owes45 = c('s45:owes'), k20d = c('s45:20000#2')
  const brand46 = c('s46:brand'), money46 = c('s46:money'), exist46 = c('s46:exist'), nobody46 = c('s46:nobody'), down46 = c('s46:down')
  const meant = c('s47:meant'), loan47 = c('s47:loan'), deposit47 = c('s47:deposit'), match47 = c('s47:match')
  const pays48 = c('s48:pays'), dealer48 = c('s48:dealer'), moves48 = c('s48:moves'), dealers = c("s48:dealer's"), keeps48 = c('s48:keeps'), account48 = c('s48:account'), account48b = c('s48:account#2'), things = c('s48:things')
  const pays49 = c('s49:pays'), back49 = c('s49:back'), disappears49 = c('s49:disappears'), repaying = c('s49:repaying'), deletes = c('s49:deletes'), created49 = c('s49:created')
  const little50 = c('s50:little'), cash50 = c('s50:cash')
  const britain = c('s51:britain'), p97 = c('s51:97'), deposits51 = c('s51:deposits')
  const america52 = c('s52:america'), september = c('s52:september'), d23 = c('s52:23'), trillion52 = c('s52:trillion'), everyday = c('s52:everyday'), cash52 = c('s52:cash'), savings52 = c('s52:savings')
  const d2 = c('s53:2'), notes = c('s53:notes'), coins53 = c('s53:coins')
  const one54 = c('s54:one'), ten54 = c('s54:ten'), rest54 = c('s54:rest'), numbers54 = c('s54:numbers'), records = c('s54:records')
  const type55 = c('s55:type'), forever = c('s55:forever'), no55 = c('s55:no')
  const borrowers56 = c('s56:borrowers'), back56 = c('s56:back'), loses = c('s56:loses'), rules56 = c('s56:rules'), capital = c('s56:capital'), losses56 = c('s56:losses')
  const central57 = c('s57:central'), key57 = c('s57:key'), rate57 = c('s57:rate'), borrowing57 = c('s57:borrowing'), shapes = c('s57:shapes'), borrow57 = c('s57:borrow')
  const step58 = c('s58:step'), pass58 = c('s58:pass'), lend58 = c('s58:lend'), create58 = c('s58:create'), repaid = c('s58:repaid'), disappears58 = c('s58:disappears')

  const AB = actually - 8, BC = pays48 - 8, CD = little50 - 8, DE = type55 - 8, EF = step58 - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), Cw = win(f, BC, CD), D = win(f, CD, DE), E = win(f, DE, EF), F = on(f, EF, 10)

  // # B) the ledger rows
  const rowsB: Row[] = [
    ["LEO'S ACCOUNT   +$20,000", MINT, span(f, types, account45 + 10)],
    ['LEO OWES THE BANK   $20,000', CORAL, span(f, writes, k20d + 20)],
    ["NORA'S ACCOUNT   $1,000", '#C2B9B1', on(f, nobody46, 6)],
  ]
  const ledgerB = on(f, types, 10)
  // # C) the repay ledger: both lines struck out and gone
  const gone = span(f, deletes, deletes + 30)
  const rowsC: Row[] = [["LEO'S ACCOUNT   +$20,000", MINT, 1, gone], ['LEO OWES THE BANK   $20,000', CORAL, 1, gone]]

  return (
    <g>
      <Stage id="bk-create" frame={f} />
      <Headline f={f} lines={[[part, 'THE SURPRISING PART', P.ink, 106], [think40, 'WHAT MOST PEOPLE THINK', P.ink, 104], [doesnt41, "IT DOESN'T WORK THAT WAY", P.coralInk, 104], [actually, 'WHAT ACTUALLY HAPPENS', P.ink, 106], [brand46, 'BRAND-NEW MONEY', P.mintInk, 110], [meant, 'NEW LOAN = NEW DEPOSIT', P.ink, 106], [pays48, 'THE MONEY MOVES ON', P.ink, 106], [pays49, 'REPAYING DELETES MONEY', P.coralInk, 104], [little50, 'WHY SO LITTLE IS CASH', P.ink, 106], [type55, 'TYPE MONEY FOREVER?', P.ink, 106], [no55, 'NO: THREE LIMITS', P.coralInk, 106], [step58, 'LEND = CREATE · REPAY = DELETE', P.ink, 100]]} />

      {/* # A) the textbook picture, and the Bank of England saying no */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} dark />
        <g opacity={1 - on(f, england41 - 4, 12)}>
          <Person f={f} who="investorF" beats={[[0, 'idle', 'smiling'], [takes, 'offer', 'smiling']]} x={260} y={GROUND} s={1.05} />
          <BankFront x={960} y={GROUND} s={0.9} open={0.6} />
          <Person f={f} who="buyer" beats={[[0, 'idle', 'neutral'], [borrower40, 'receive', 'smiling']]} x={1660} y={GROUND} s={1.05} flip />
          {/* the track her money is supposed to take */}
          <g opacity={on(f, takes, 8)}><path d="M380 640 Q960 380 1540 640" fill="none" stroke={P.goldInk} strokeWidth={6} strokeDasharray="16 12" /></g>
          {f >= c('s40:1000') && (() => { const t = span(f, c('s40:1000'), borrower40 + 6), x = lerp(380, 1540, t), y = 640 - Math.sin(t * Math.PI) * 260 * 0.75 - 20; return <DollarBill x={x} y={y} s={0.9} r={-6} t="$1,000" /> })()}
          <g opacity={on(f, taught, 8)}><Label x={960} y={300} text="HOW IT'S OFTEN TAUGHT" size={54} font="Bebas Neue" color={P.ink2} /></g>
        </g>
        <g opacity={on(f, england41 - 4, 12)}>
          <CentralBank x={760} y={GROUND} s={1.05} />
          <g opacity={on(f, central41, 8)}><Label x={760} y={GROUND + 70} text="BANK OF ENGLAND (CENTRAL BANK)" size={44} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, explained, 8)} transform={`translate(1450 ${600 - 12 * pop(f, y2014, 12)})`}>
            <rect x={-130} y={-170} width={260} height={340} rx={10} fill="#F2E6CC" /><text y={-110} textAnchor="middle" fill="#16294A" style={{ font: '400 46px "Bebas Neue"' }}>REPORT</text>
            {[0, 1, 2, 3, 4].map((k) => <rect key={k} x={-90} y={-70 + k * 30} width={180} height={10} rx={5} fill="#D6CBB3" />)}
            <g opacity={on(f, y2014, 8)}><text y={130} textAnchor="middle" fill="#C94A3E" style={{ font: '400 60px "Bebas Neue"' }}>2014</text></g></g>
          <g opacity={on(f, doesnt41, 8)} transform="translate(1450 330)"><path d="M-120 0 Q0 -90 120 0" fill="none" stroke={P.goldInk} strokeWidth={6} strokeDasharray="14 10" /><NoMark x={0} y={-40} o={on(f, really(c), 8)} r={70} /></g>
        </g>
      </g>}

      {/* # B) Leo's loan: no vault, just typing */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} dark />
        <Person f={f} who="buyer" beats={[[AB, 'idle', 'neutral'], [borrows43, 'present', 'smiling'], [car43, 'point', 'smiling'], [types, 'idle', 'smiling'], [brand46, 'celebrate', 'smiling'], [match47, 'thumbsUp', 'smiling']]} x={250} y={GROUND} s={1.05} />
        {/* the car he wants, and the vault that stays shut */}
        <g opacity={(on(f, leo43, 10)) * (1 - ledgerB)}>
          <g opacity={on(f, car43, 10)}><Car x={780} y={GROUND} s={0.85} color="#3DDC97" /></g>
          <g opacity={on(f, k20a, 8)} transform={`translate(780 ${560 - 12 * pop(f, k20a, 12)})`}><rect x={-110} y={-40} width={220} height={80} rx={14} fill="#F2E6CC" /><text y={20} textAnchor="middle" fill="#16294A" style={{ font: '400 56px "Bebas Neue"' }}>$20,000</text></g>
          <g opacity={on(f, vault44, 10)}><Vault x={1480} y={600} s={0.75} open={0} f={f} /><NoMark x={1480} y={600} o={on(f, vault44 + 6, 8)} r={120} /></g>
          <g opacity={on(f, count44, 8)} transform="translate(1480 870)">{[0, 1, 2, 3].map((k) => <CashBrick key={k} x={-150 + k * 100} y={0} s={1.1} />)}<g opacity={on(f, peoples, 8)}><Label x={0} y={56} text="OTHER PEOPLE'S MONEY" size={40} font="Bebas Neue" color={P.ink2} /></g></g>
        </g>
        {/* the bank's computer and the banker typing */}
        <g opacity={ledgerB}>
          <Ledger x={1000} y={520} s={1.0} rows={rowsB} f={f} title="THE BANK'S COMPUTER" />
          <Person f={f} who="investor" beats={[[types, 'type', 'neutral'], [brand46, 'present', 'smiling']]} x={1800} y={GROUND} s={0.95} flip />
          {/* new money sparkle on row one */}
          <g opacity={win(f, brand46, exist46 + 20, 8)}>{Array.from({ length: 6 }, (_, k) => <circle key={k} cx={1090 + k * 44} cy={300 - 26 * Math.abs(Math.sin(f / 8 + k))} r={8} fill={MINT} />)}
            <Label x={900} y={300} text="NEW MONEY" size={48} font="Bebas Neue" color={P.mintInk} /></g>
          <g opacity={on(f, down46, 8)}><Tick x={1430} y={598} o={1} r={26} /></g>
          {/* loan = deposit bracket */}
          <g opacity={on(f, deposit47, 8)}><path d="M1360 440 Q1400 440 1400 480 L1400 534 Q1400 574 1360 574" fill="none" stroke={P.goldInk} strokeWidth={6} /><Label x={1420} y={520} text="A MATCHING PAIR" size={42} font="Bebas Neue" color={P.goldInk} anchor="start" /></g>
        </g>
      </g>}

      {/* # C) the money moves on; repaying deletes it */}
      {Cw > 0 && <g opacity={Cw}>
        <Ground y={GROUND} dark />
        <g opacity={1 - on(f, pays49 - 4, 12)}>
          <BankFront x={180} y={GROUND} s={0.42} name="LEO'S BANK" />
          <Person f={f} who="buyer" beats={[[BC, 'idle', 'smiling'], [pays48, 'offer', 'smiling']]} x={470} y={GROUND} s={1.0} />
          <Car x={960} y={GROUND} s={0.7} color="#3DDC97" />
          <Person f={f} who="worker" beats={[[BC, 'idle', 'smiling'], [dealer48, 'receive', 'smiling'], [moves48, 'thumbsUp', 'smiling']]} x={1440} y={GROUND} s={1.0} flip />
          <g opacity={on(f, dealers, 8)}><BankFront x={1760} y={GROUND} s={0.42} name="DEALER'S BANK" /></g>
          {/* the glowing bill: Leo → dealer → dealer's bank → hops along accounts */}
          {f >= pays48 && (() => {
            const a = fly(f, pays48, [560, 600], [1350, 600], 22, 160), b = fly(f, dealers, [1350, 600], [1760, 760], 16, 80)
            const p = f < dealers ? a : b
            return f < keeps48 ? <DollarBill x={p.x} y={p.y} s={0.8} digital={1} /> : null })()}
          <g opacity={on(f, keeps48, 8)}>{[0, 1, 2].map((k) => { const x = 700 + k * 260; return <g key={k} opacity={on(f, lerp(keeps48, things, k / 2), 6)}><rect x={x - 80} y={330} width={160} height={90} rx={14} fill="#16294A" stroke={SKY} strokeWidth={3} /><text x={x} y={388} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 34px "Bebas Neue"' }}>ACCOUNT</text></g> })}
            {(() => { const t = span(f, keeps48, things + 10), k = Math.min(1, Math.floor(t * 2)), u = t * 2 - k, x = lerp(700 + k * 260, 700 + (k + 1) * 260, u), y = 316 - Math.sin(u * Math.PI) * 50; return <DollarBill x={x} y={y} s={0.6} digital={1} /> })()}</g>
        </g>
        <g opacity={on(f, pays49 - 4, 12)}>
          <Person f={f} who="buyer" beats={[[pays49, 'offer', 'smiling'], [back49, 'thumbsUp', 'smiling'], [disappears49, 'shrug', 'shocked']]} x={250} y={GROUND} s={1.05} />
          <Ledger x={1060} y={540} s={1.0} rows={rowsC} f={f} title="THE BANK'S COMPUTER" />
          <g opacity={on(f, back49, 8)} transform={`translate(1060 ${280 - 12 * pop(f, back49, 12)})`}><rect x={-150} y={-40} width={300} height={80} rx={40} fill={MINT} /><text y={18} textAnchor="middle" fill="#0E1B33" style={{ font: '400 52px "Bebas Neue"' }}>LOAN REPAID</text></g>
          <g opacity={on(f, created49, 8)}><Label x={1060} y={860} text="LENDING CREATED IT · REPAYING DELETED IT" size={46} font="Bebas Neue" color={P.ink} /></g>
        </g>
      </g>}

      {/* # D) UK bar and US tower */}
      {D > 0 && <g opacity={D}>
        <Ground y={GROUND} dark />
        <g opacity={on(f, britain, 10)} transform="translate(480 0)">
          <rect x={-120} y={300} width={240} height={580} rx={14} fill="#16294A" stroke={SKY} strokeWidth={4} />
          <rect x={-116} y={304} width={232} height={572 * 0.97 * on(f, p97, 20)} rx={10} fill={SKY} opacity={0.75} />
          <rect x={-116} y={876 - 572 * 0.03} width={232} height={572 * 0.03} fill={MINT} />
          <g opacity={on(f, p97, 8)}><Label x={0} y={600} text="97%" size={80} font="Bebas Neue" color="#FFFFFF" /><Label x={0} y={660} text="BANK DEPOSITS" size={38} font="Bebas Neue" color="#FFFFFF" /></g>
          <Label x={0} y={260} text="BRITAIN (2014)" size={48} font="Bebas Neue" color={P.ink} />
        </g>
        <g opacity={on(f, america52, 10)} transform="translate(1300 0)">
          <Label x={0} y={260} text={f >= september ? 'AMERICA (SEPT 2026)' : 'AMERICA'} size={48} font="Bebas Neue" color={P.ink} />
          {Array.from({ length: 10 }, (_, k) => { const cashBlock = k === 0, at = lerp(d23, trillion52 + 10, k / 9)
            return <g key={k} opacity={on(f, at, 6)} transform={`translate(0 ${880 - k * 56 - 26})`}>
              <rect x={-150} y={-24} width={300} height={50} rx={8} fill={cashBlock && f >= d2 ? '#7FC495' : '#16294A'} stroke={cashBlock && f >= d2 ? '#4E9A68' : SKY} strokeWidth={3} />
              {!(cashBlock && f >= d2) && Array.from({ length: 8 }, (_, q) => <rect key={q} x={-130 + q * 33} y={-12} width={24} height={22} rx={3} fill={SKY} opacity={0.35 + 0.3 * Math.abs(Math.sin(f / 14 + k + q)) * on(f, numbers54, 8)} />)}
              {cashBlock && f >= d2 && <text y={14} textAnchor="middle" fill="#2F6E45" style={{ font: '400 36px "Bebas Neue"' }}>NOTES & COINS</text>}</g> })}
          <g opacity={on(f, d23, 8)}><Label x={190} y={420} text={f >= trillion52 ? '$23.4 TRILLION' : '$23.4…'} size={50} font="Bebas Neue" color={P.ink} anchor="start" /><Label x={190} y={470} text="EVERYDAY MONEY" size={36} font="Bebas Neue" color={P.ink2} anchor="start" o={on(f, everyday, 8)} /></g>
          <g opacity={on(f, d2, 8)}><Label x={190} y={866} text={f >= trillion52 ? '$2.4 TRILLION CASH' : '$2.4…'} size={46} font="Bebas Neue" color={P.mintInk} anchor="start" /></g>
          <g opacity={on(f, one54, 8)}><rect x={-166} y={828} width={332} height={68} rx={12} fill="none" stroke={P.goldInk} strokeWidth={6} /><Label x={-190} y={876} text="1 IN 10" size={50} font="Bebas Neue" color={P.goldInk} anchor="end" /></g>
        </g>
        <Spot f={f} at={coins53} x={1300} y={860} rx={200} ry={80} />
      </g>}

      {/* # E) three limits */}
      {E > 0 && <g opacity={E}>
        <Ground y={GROUND} dark />
        <g opacity={1 - on(f, borrowers56, 10)}>
          <Person f={f} who="investor" beats={[[DE, 'type', 'smug'], [no55, 'stop', 'neutral']]} x={760} y={GROUND} s={1.05} />
          {Array.from({ length: 6 }, (_, k) => { const t = ((f - type55) / 40 + k / 6) % 1; return f >= type55 ? <DollarBill key={k} x={900 + t * 600} y={560 - t * 220} s={0.6} digital={1} o={1 - t} /> : null })}
          <NoMark x={1200} y={460} o={on(f, no55, 8)} r={110} />
        </g>
        <g opacity={on(f, borrowers56, 10)}>
          <Person f={f} who="buyer" beats={[[borrowers56, 'idle', 'smiling'], [back56, 'offer', 'smiling'], [loses, 'emptyPockets', 'worried']]} x={330} y={GROUND} s={1.0} />
          <Label x={330} y={GROUND + 60} text="BORROWERS WHO REPAY" size={40} font="Bebas Neue" color={P.ink} />
          <g opacity={on(f, rules56, 10)}><BankFront x={960} y={GROUND - 70} s={0.62} /><rect x={760} y={GROUND - 70} width={400} height={70} rx={10} fill={P.gold} /><text x={960} y={GROUND - 22} textAnchor="middle" fill="#16294A" opacity={on(f, capital, 8)} style={{ font: '400 46px "Bebas Neue"' }}>CAPITAL CUSHION</text></g>
          <g opacity={on(f, central57, 10)} transform="translate(1560 600)">
            <circle r={150} fill="#16294A" stroke={P.gold} strokeWidth={8} />
            {Array.from({ length: 9 }, (_, k) => { const a = (-120 + k * 30) * Math.PI / 180; return <line key={k} x1={Math.sin(a) * 118} y1={-Math.cos(a) * 118} x2={Math.sin(a) * 138} y2={-Math.cos(a) * 138} stroke="#C2B9B1" strokeWidth={4} /> })}
            <g transform={`rotate(${-60 + 80 * on(f, rate57, 20) - 40 * on(f, shapes, 20)})`}><rect x={-6} y={-112} width={12} height={112} rx={6} fill={P.coral} /></g><circle r={18} fill={P.gold} />
            <Label x={0} y={210} text={f >= rate57 ? 'KEY INTEREST RATE' : 'CENTRAL BANK'} size={44} font="Bebas Neue" color={P.ink} />
          </g>
        </g>
      </g>}

      {/* # F) recap: lend creates, repay deletes */}
      {F > 0 && <g opacity={F}>
        <Ground y={GROUND} dark />
        <BankFront x={960} y={GROUND} s={0.95} open={0.5} />
        <g opacity={on(f, lend58, 8)} transform={`translate(400 ${560 - 14 * pop(f, create58, 12)})`}><DollarBill x={0} y={0} s={1.7} digital={1} /><text x={0} y={-80} textAnchor="middle" fill={MINT} style={{ font: '400 90px "Bebas Neue"' }}>+</text><Label x={0} y={120} text="LEND: MONEY APPEARS" size={54} font="Bebas Neue" color={P.mintInk} /></g>
        <g opacity={on(f, repaid, 8) * (1 - 0.6 * on(f, disappears58, 20))} transform="translate(1520 560)"><DollarBill x={0} y={0} s={1.7} digital={1} o={1 - 0.7 * on(f, disappears58, 20)} /><text x={0} y={-80} textAnchor="middle" fill={CORAL} style={{ font: '400 90px "Bebas Neue"' }}>−</text><Label x={0} y={120} text="REPAY: MONEY GOES" size={54} font="Bebas Neue" color={P.coralInk} /></g>
        
      </g>}
      <Vignette id="bk-create" />
    </g>
  )
}
// # the cross on the old picture lands on "really"
const really = (c: PieceProps['c']) => c('s41:really')

const BEATS = ['s39:part', 's39:surprises', 's40:think', 's40:takes', "s40:nora's", 's40:hands', 's40:borrower', 's41:taught', 's41:england', 's41:central', 's41:explained', 's41:2014', "s41:doesn't", 's41:really', 's42:actually', 's42:loan', 's43:leo', 's43:borrows', 's43:20000', 's43:car', "s44:doesn't", 's44:vault', 's44:count', "s44:people's", 's45:types', 's45:20000', 's45:account', 's45:moment', 's45:writes', 's45:owes', 's45:20000#2', 's46:brand', 's46:money', 's46:exist', 's46:nobody', 's46:down', 's47:meant', 's47:loan', 's47:deposit', 's47:match', 's48:pays', 's48:dealer', 's48:moves', "s48:dealer's", 's48:keeps', 's48:account', 's48:account#2', 's48:things', 's49:pays', 's49:back', 's49:disappears', 's49:repaying', 's49:deletes', 's49:created', 's50:little', 's50:cash', 's51:britain', 's51:97', 's51:deposits', 's52:america', 's52:september', 's52:23', 's52:trillion', 's52:everyday', 's52:cash', 's52:savings', 's53:2', 's53:notes', 's53:coins', 's54:one', 's54:ten', 's54:rest', 's54:numbers', 's54:records', 's55:type', 's55:forever', 's55:no', 's56:borrowers', 's56:back', 's56:loses', 's56:rules', 's56:capital', 's56:losses', 's57:central', 's57:key', 's57:rate', 's57:borrowing', 's57:shapes', 's57:borrow', 's58:step', 's58:pass', 's58:lend', 's58:create', 's58:repaid', 's58:disappears']
export const BK_CREATE = makePiece('bk-create', 'Banking step three (navy): the textbook picture of Nora’s $1,000 travelling through the bank to a borrower, then the Bank of England and its 2014 report cross it out; Leo wants a $20,000 car, the vault stays shut, the bank’s computer types LEO’S ACCOUNT +$20,000 and LEO OWES THE BANK $20,000 (new money, Nora’s row unchanged, a matching pair); Leo pays the car dealer and the screen money hops from bank to bank; the loan is repaid and both lines are struck out; Britain 97% deposits bar and a US tower of ten blocks with one block of notes and coins ($2.4T of $23.4T); three limits: borrowers who repay, a capital cushion, the central bank’s rate dial; recap lend = money appears, repay = money goes', {
  mood: 'dark', Component: Create, beats: BEATS,
  sfx: [["s41:doesn't", 'thud', 0.2], ['s45:types', 'pop', 0.15], ['s46:brand', 'pop', 0.25], ['s49:deletes', 'thud', 0.2], ['s51:97', 'pop', 0.2], ['s55:no', 'thud', 0.2]] })
