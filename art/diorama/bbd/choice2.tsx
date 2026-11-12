// ---------------------------------------------------------------- s20–s22 and s29–s35a (redrawn 2026-10-31): the same street as the sale (sell.tsx).
// MEET: the investor at her shelf of ten certificates ($10M); the bottom one turns blue (paid $1M long ago); she wants $1M to
// live on (a dotted bundle above her); a signpost forks the road: SELL → market, BORROW → bank.
// BORROW: the shelf is whole again and stays home; she walks to the bank, signs the credit line; a chain of light ties her
// shelf to the bank (security); a gauge on the shelf fills 50% → 95%; the bank's board reads SOFR ≈ 3.9% + extra = 6%;
// $1M flows over to her hands, a thin $60K stream flows back each year; the tax office stays dark ($0 tax);
// the two costs pile up at their buildings: $214K tax vs $60K interest; the loan is still owed.
import React from 'react'
import { easeInOut, lerp, on, P, span, Stage, Vignette } from '../kit'
import { Label } from '../charts'
import { makePiece, type PieceProps } from '../registry'
import { type Beat, hand, Headline, Person, Pile, Doc } from '../aimoney/common'
import { TaxOffice } from './kit'
import { BankHall, Cash, LightBridge, onBridge } from './world'
import { House, Stall, Street } from './sell'

// # her shelf of ten certificates (as in the sale), with a basis colour and a glow
export const Shelf: React.FC<{ x: number; y: number; blue?: number; glow?: number; gauge?: number; gaugeO?: number }> = ({ x, y, blue = 0, glow = 0, gauge = 0, gaugeO = 0 }) => (
  <g transform={`translate(${x} ${y})`}>
    {glow > 0 && <rect x={-110} y={-350} width={220} height={350} rx={16} fill={P.gold} opacity={0.25 * glow} />}
    <rect x={-90} y={-330} width={180} height={330} rx={8} fill="#A86F42" />
    {Array.from({ length: 10 }, (_, k) => <g key={k} transform={`translate(0 ${-20 - k * 30})`}><rect x={-75} y={-12} width={150} height={24} rx={5} fill={k === 0 && blue > 0.5 ? '#7FB2E5' : '#F7F1E1'} stroke={k === 0 && blue > 0.5 ? '#3A6EA8' : '#C9B27A'} strokeWidth={2} /><circle cx={60} cy={0} r={6} fill={P.gold} /></g>)}
    {gaugeO > 0 && <g opacity={gaugeO}><rect x={110} y={-330} width={30} height={330} rx={10} fill="#E6D3AE" stroke="#A86F42" strokeWidth={3} /><rect x={110} y={-330 * gauge} width={30} height={330 * gauge} rx={10} fill={P.mint} /></g>}
  </g>
)

// ---------------------------------------------------------------- MEET (s20–s22)
const Meet: React.FC<PieceProps> = ({ f, c }) => {
  // # word reaction: the named object swells briefly (0→1→0 over 14 frames) on its word
  const sw = (ks: string[], x: number, y: number, amt = 0.12) => { const v = Math.max(...ks.map((k) => { const t = f - c(k); return t >= 0 && t < 14 ? Math.sin(Math.PI * t / 14) : 0 })); return `translate(${x} ${y}) scale(${1 + amt * v}) translate(${-x} ${-y})` }
  const s20 = c('s20'), example = c('s20:example'), d10 = c('s21:10'), shares = c('s21:shares'), bought = c('s21:bought'), d1 = c('s21:1')
  const year = c('s22:year'), live = c('s22:live'), two = c('s22:two')
  const inv0: Beat[] = []; const inv: Beat[] = [[0, 'idle', 'smiling'], [s20, 'present', 'smiling'], [d10, 'holdChest', 'smiling'], [bought, 'think', 'thinking'], [live, 'scratchHead', 'thinking'], [two, 'point', 'neutral']]
  return (
    <g>
      <Stage id="bm" frame={f} />
      <g>
        <Street f={f} />
        <House x={250} y={880} />
        <Shelf x={530} y={880} blue={on(f, d1, 8)} glow={on(f, d10, 10) * (1 - on(f, live, 10))} />
        <Stall x={1040} y={880} />
        <TaxOffice x={1610} y={880} s={0.95} />
        {/* # labels stuck to the shelf: $10M on top; "paid $1M" at the blue bottom certificate */}
        <g opacity={on(f, shares, 8)}><Label x={530} y={520} text="$10M" size={70} font="Bebas Neue" color={P.goldInk} /></g>
        <g opacity={on(f, d1, 8)}><Label x={530} y={940} text="PAID $1M" size={46} font="Bebas Neue" color={P.skyInk} /></g>
        <g opacity={on(f, example, 8) * (1 - on(f, c('s22:two'), 8))} transform={`translate(690 330) scale(${1 + 0.2 * Math.max(...['s20:real', 's20:person'].map((k) => { const t = f - c(k); return t >= 0 && t < 14 ? Math.sin(Math.PI * t / 14) : 0 }))})`}><rect x={-100} y={-30} width={200} height={60} rx={30} fill={P.sky} /><Label x={0} y={16} text="EXAMPLE" size={42} font="Bebas Neue" color={P.navy0} /></g>
        {/* # what she wants: a dotted $1M bundle above her house ("to live on") */}
        <g opacity={on(f, live, 10) * (1 - on(f, two, 10))} transform="translate(340 410)"><rect x={-140} y={-60} width={280} height={120} rx={14} fill="none" stroke={P.mintInk} strokeWidth={5} strokeDasharray="14 10" /><Label x={0} y={20} text="$1M" size={64} font="Bebas Neue" color={P.mintInk} /></g>
        {/* # the signpost at the fork: SELL → market, BORROW → bank */}
        <g opacity={on(f, two, 10)} transform={`translate(820 880) scale(${lerp(0.6, 1, on(f, two, 14))})`}>
          <rect x={-8} y={-420} width={16} height={420} fill="#7A4E2D" />
          <path d="M8 -410 L170 -410 L210 -375 L170 -340 L8 -340 Z" fill={P.coral} /><Label x={100} y={-360} text="SELL" size={46} font="Bebas Neue" color="#FFF" />
          <path d="M-8 -330 L-170 -330 L-210 -295 L-170 -260 L-8 -260 Z" fill={P.mint} transform="scale(-1 1)" /><Label x={100} y={-280} text="BORROW" size={44} font="Bebas Neue" color={P.navy0} />
        </g>
        <Person f={f} who="investorF" beats={inv} x={690} y={1000} s={0.95} />
      </g>
      <Headline f={f} lines={[[d10, '$10M OF SHARES', P.goldInk, 120], [live, 'SHE WANTS $1M TO LIVE ON', P.ink, 104], [two, 'TWO WAYS', P.ink, 124]]} />
      <Vignette id="bm" />
    </g>
  )
}

// ---------------------------------------------------------------- BORROW (s29–s35a)
const Borrow: React.FC<PieceProps> = ({ f, c }) => {
  // # word reaction: the named object swells briefly (0→1→0 over 14 frames) on its word
  const sw = (ks: string[], x: number, y: number, amt = 0.12) => { const v = Math.max(...ks.map((k) => { const t = f - c(k); return t >= 0 && t < 14 ? Math.sin(Math.PI * t / 14) : 0 })); return `translate(${x} ${y}) scale(${1 + amt * v}) translate(${-x} ${-y})` }
  const two = c('s29:two'), every = c('s29:every'), borrows = c('s29:borrows'), banks = c('s30:banks'), line = c('s30:line'), stay = c('s30:stay'), security = c('s30:security')
  const finra = c('s31:finra'), d50 = c('s31:50'), d95 = c('s31:95'), interest = c('s32:interest'), sofr = c('s32:sofr'), d39 = c('s32:39'), extra = c('s32:extra'), lender = c('s32:lender')
  const d6 = c('s33:6'), loan = c('s33:loan'), d60 = c('s33:60000'), year33 = c('s33:year'), not34 = c('s34:not'), no34 = c('s34:no'), borrowed = c('s34:borrowed')
  const t214 = c('s35:214000'), t60 = c('s35:60000'), cheaper = c('s35:cheaper'), million = c('s35a:million'), paid = c('s35a:paid'), day = c('s35a:day'), how = c('s35a:how'), clever = c('s35a:cleverest')
  const BANK: [number, number] = [1350, 880], TAX = 1700
  // # she walks from her shelf to the bank's door on "borrows"
  const walk = easeInOut(span(f, borrows, borrows + 30))
  const ix = lerp(700, 800, walk)
  const inv: Beat[] = [[0, 'idle', 'smiling'], [every, 'holdChest', 'smiling'], [borrows, 'walkA', 'neutral', 'walkB', 10], [borrows + 30, 'idle', 'smiling'], [banks, 'handshake', 'smiling'],
    [line, 'signA', 'neutral', 'signB', 12], [stay, 'present', 'smiling'], [d50, 'think', 'thinking'], [loan, 'receive', 'smiling'], [d60, 'offer', 'neutral'], [no34, 'fistPump', 'smiling'],
    [t214, 'think', 'thinking'], [cheaper, 'thumbsUp', 'smiling'], [paid, 'carry', 'neutral'], [clever, 'pointUp', 'smiling']]
  const hp = hand(f, inv, ix, 1000, 0.95)
  const banker: Beat[] = [[0, 'idle', 'neutral'], [banks, 'handshake', 'smiling'], [line, 'present', 'smiling'], [interest, 'explain', 'neutral'], [loan, 'offer', 'smiling'], [d60, 'receive', 'smiling']]
  const BR: [number, number] = [1130, 700]
  const bridge = easeInOut(span(f, line, line + 16))
  const cashU = easeInOut(span(f, loan, loan + 22))
  const board = (t: string, at: number, y: number, color: string) => <Label x={BANK[0]} y={y} text={t} size={46} font="Bebas Neue" color={color} o={on(f, at, 8)} />
  return (
    <g>
      <Stage id="bb" frame={f} />
      <g>
        <Street f={f} />
        <House x={250} y={880} />
        <Shelf x={530} y={880} blue={1} glow={on(f, every, 10) * (1 - on(f, borrows, 10)) + on(f, stay, 10) * (1 - on(f, d50, 10))} gauge={lerp(0.5, 0.95, on(f, d95, 16))} gaugeO={on(f, d50, 8) * (1 - on(f, interest, 10))} />
        <g opacity={on(f, d50, 8) * (1 - on(f, interest, 10))} transform={sw(['s31:value', 's31:depending', 's31:hold'], 710, 600, 0.3)}><Label x={710} y={880 - 330 * lerp(0.5, 0.95, on(f, d95, 16)) + 14} text={f >= d95 ? '95%' : '50%'} size={44} font="Bebas Neue" color={P.mintInk} /></g>
        <g transform={sw(['s30:loan', 's30:brokers', 's30:sell', 's31:according', 's31:regulator'], BANK[0], BANK[1], 0.08)}><BankHall x={BANK[0]} y={BANK[1]} s={0.8} lit={on(f, banks, 10)} /></g>
        <TaxOffice x={TAX} y={880} s={0.8} shut={on(f, no34, 8)} />
        {/* # the regulator's plaque on the bank */}
        <g opacity={on(f, finra, 8) * (1 - on(f, interest, 8))} transform={`translate(${BANK[0]} 540)`}><rect x={-90} y={-26} width={180} height={52} rx={10} fill={P.sky} /><Label x={0} y={16} text="FINRA" size={40} font="Bebas Neue" color={P.navy0} /></g>
        {/* # the bank's rate board above its door: SOFR ≈ 3.9% + extra = 6% */}
        <g opacity={on(f, interest, 8) * (1 - on(f, loan + 20, 8))}>
          <rect x={BANK[0] - 170} y={470} width={340} height={200} rx={14} fill="#1B2233" />
          {board('SOFR', sofr, 520, P.white)}{board('≈ 3.9%', d39, 570, P.sky)}{board('+ BANK EXTRA', extra, 620, P.ink2)}
          {f >= d6 && <rect x={BANK[0] - 170} y={470} width={340} height={200} rx={14} fill="#1B2233" />}{board('= 6% (EXAMPLE)', d6, 585, P.gold)}
        </g>
        {/* # the credit line: a bridge of light from the bank to her hands; a chain of light from her shelf to the bank (security) */}
        <LightBridge a={BR} b={[hp.x, hp.y]} t={bridge} o={on(f, line, 6)} lift={70} />
        <LightBridge a={[620, 700]} b={[BANK[0] - 160, 700]} t={easeInOut(span(f, security, security + 16))} o={on(f, security, 6)} color={P.sky} lift={60} />
        <g opacity={on(f, security, 8)} transform="translate(530 520)"><rect x={-30} y={-6} width={60} height={50} rx={8} fill={P.gold} /><path d="M-18 -6 L-18 -28 A18 18 0 0 1 18 -28 L18 -6" stroke={P.gold} strokeWidth={9} fill="none" /></g>
        <g opacity={on(f, stay, 8) * (1 - on(f, d50, 8))}><Label x={530} y={470} text="STILL HERS" size={44} font="Bebas Neue" color={P.mintInk} /></g>
        {/* # she signs the line on "line" */}
        {f >= line && f < line + 70 && <g transform={`translate(${hp.x + 50} ${hp.y - 10}) scale(0.3)`}><Doc x={0} y={0} title="CREDIT" /></g>}
        {/* # $1M crosses the bridge into her hands; each "year" a thin $60K stream flows back */}
        {cashU > 0 && cashU < 1 && <Cash {...onBridge(BR, [hp.x, hp.y], cashU, 70)} s={1} />}
        {f >= loan + 22 && f < paid + 40 && <Cash x={hp.x} y={hp.y} s={0.9} />}
        <g opacity={on(f, loan, 8) * (1 - on(f, not34, 8))}><Label x={hp.x} y={520} text="$1M LOAN" size={50} font="Bebas Neue" color={P.goldInk} /></g>
        {[0, 1, 2, 3, 4].map((k) => { const u = span(f, d60 + k * 7, d60 + 26 + k * 7); return u > 0 && u < 1 ? <circle key={k} {...(() => { const p = onBridge([hp.x, hp.y], BR, u, 70); return { cx: p.x, cy: p.y } })()} r={11} fill={P.gold} stroke={P.goldD} strokeWidth={3} /> : null })}
        <g opacity={on(f, d60, 8) * (1 - on(f, not34, 8))}><Label x={BANK[0]} y={540} text={f >= year33 ? '$60K A YEAR' : '$60K'} size={46} font="Bebas Neue" color={P.coralInk} /></g>
        <g opacity={on(f, borrowed, 8) * (1 - on(f, t214, 8))}><Label x={TAX} y={640} text="$0 TAX" size={56} font="Bebas Neue" color={P.mintInk} /></g>
        {/* # the two costs pile up where they are paid: $214K at the tax office (if she sold), $60K at the bank (if she borrows) */}
        <g opacity={on(f, t214, 8) * (1 - on(f, paid, 10))}><Pile x={TAX} y={1000} n={on(f, t214, 18) * 15} s={0.8} /><Label x={TAX - 80} y={560} text="SELL: $214K TAX" size={46} font="Bebas Neue" color={P.coralInk} /></g>
        <g transform={sw(['s35:interest', 's35:year', 's35:borrowing', 's35:cheaper'], BANK[0], 780, 0.15)}><g opacity={on(f, t60, 8) * (1 - on(f, paid, 10))}><Pile x={BANK[0]} y={1000} n={on(f, t60, 18) * 4} s={0.8} /><Label x={BANK[0]} y={560} text="BORROW: $60K" size={46} font="Bebas Neue" color={P.mintInk} /></g></g>
        <g opacity={on(f, cheaper, 8) * (1 - on(f, paid, 10))} transform={`translate(${BANK[0]} 490)`}><circle r={30} fill={P.mint} /><path d="M-13 0 l9 10 l18 -20" stroke="#FFF" strokeWidth={7} fill="none" strokeLinecap="round" /></g>
        {/* # still owed: a thread from the cash in her hands back to the bank; an hourglass in the bank's window; a key for "how" */}
        <LightBridge a={[hp.x, hp.y]} b={BR} t={1} o={on(f, paid, 8) * 0.6} color={P.coral} lift={70} />
        <g opacity={on(f, million, 8)}><Label x={hp.x} y={455} text="$1M OWED" size={44} font="Bebas Neue" color={P.coralInk} o={on(f, paid, 8)} /></g>
        <g opacity={on(f, day, 8)} transform={`translate(${BANK[0]} 790)`}><rect x={-22} y={-34} width={44} height={8} rx={3} fill="#7A4E2D" /><rect x={-22} y={26} width={44} height={8} rx={3} fill="#7A4E2D" /><path d="M-16 -26 L16 -26 L0 0 L16 26 L-16 26 L0 0 Z" fill={P.gold} opacity={0.8} /></g>
        <g opacity={on(f, how, 8)} transform={`translate(${hp.x + 120} ${hp.y - 120}) rotate(-20)`}><circle r={22} fill="none" stroke={P.gold} strokeWidth={9} /><rect x={18} y={-5} width={60} height={10} fill={P.gold} /><rect x={60} y={5} width={8} height={14} fill={P.gold} /><circle r={40} fill={P.gold} opacity={0.15 * on(f, clever, 8)} /></g>
        <Person f={f} who="buyer" beats={banker} x={1060} y={1000} s={0.85} o={on(f, banks, 8)} flip />
        <Person f={f} who="investorF" beats={inv} x={ix} y={1000} s={0.95} />
      </g>
      <Headline f={f} lines={[[two, 'WAY TWO: BORROW', P.mintInk, 124], [d50, 'BORROW 50%…', P.ink, 116], [d95, 'BORROW 50–95%', P.ink, 116], [d6, 'EXAMPLE RATE 6%', P.ink, 116], [no34, 'NO INCOME TAX', P.mintInk, 124],
        [t214, '$214K TAX', P.coralInk, 120], [t60, '$214K TAX OR $60K INTEREST', P.ink, 100], [paid, 'STILL OWED', P.goldInk, 124]]} />
      <Vignette id="bb" />
    </g>
  )
}

export const BB2_MEET = makePiece('bb2-meet', 'Long (redrawn): the street — her shelf of 10 certificates ($10M, 1 blue = paid $1M); she wants $1M; signpost SELL / BORROW', {
  mood: 'light', Component: Meet, beats: ['s20:real', 's20:person', 's20:this', 's20:example', 's21:10', 's21:shares', 's21:bought', 's21:1', 's22:year', 's22:live', 's22:two'],
  sfx: [['s21:10', 'chime', 0.4], ['s22:two', 'click', 0.4]] })
export const BB2_BORROW = makePiece('bb2-borrow', 'Long (redrawn): the street — shelf stays home, chained to the bank; credit line signed; 50–95%; SOFR 3.9% + extra = 6%; $1M in, $60K/yr back; $0 tax; $214K vs $60K; still owed', {
  mood: 'light', Component: Borrow,
  beats: ['s32:lender', 's30:brokers', 's30:sell', 's30:loan', 's31:according', 's31:regulator', 's35:interest', 's35:year', 's35:borrowing', 's35:cheaper', 's31:value', 's31:depending', 's31:hold', 's29:two', 's29:every', 's29:borrows', 's30:banks', 's30:line', 's30:stay', 's30:security', 's31:finra', 's31:50', 's31:95', 's32:interest', 's32:sofr', 's32:39', 's32:extra',
    's33:6', 's33:loan', 's33:60000', 's33:year', 's34:not', 's34:no', 's34:borrowed', 's35:214000', 's35:60000', 's35:cheaper', 's35a:million', 's35a:paid', 's35a:day', 's35a:how', 's35a:cleverest'],
  sfx: [['s30:line', 'click', 0.4], ['s33:loan', 'cash', 0.5], ['s34:no', 'ding', 0.4], ['s35:cheaper', 'ding', 0.4], ['s35a:cleverest', 'chime', 0.4]] })
