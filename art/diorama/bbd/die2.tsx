// ---------------------------------------------------------------- s49–s58 (redrawn 2026-10-31): her street at sunset, ten years on.
// The hourglass on her porch runs out; her shelf of shares slides across to her children. The price tag on the shelf
// ("paid $1M") flips to its value on the day she died ($19.7M) and climbs a step — the step-up. The $10 → $100 example
// plays on one certificate in her child's hands. The $18.7M gain is never taxed as a gain; three certificates go to the bank
// and the loan block vanishes (little or no gain). Estate tax: a measuring post with a $15M line — her estate column
// ($19.7M − $5.6M loan = $14.1M) settles under it; a bigger neighbour pokes above (that part up to 40%; a locked trust chest).
// Buy · borrow · die: three signs along the street light up.
import React from 'react'
import { easeInOut, lerp, on, P, span, Stage, Vignette } from '../kit'
import { Label } from '../charts'
import { makePiece, type PieceProps } from '../registry'
import { type Beat, hand, Headline, Person, win } from '../aimoney/common'
import { Cert, FlipTag, TaxOffice } from './kit'
import { BankHall, Mansion } from './world'
import { House, Street } from './sell'
import { Shelf } from './choice2'
import { Mini } from '../../rig/Mini'

const PX = 26 // # pixels per $1M on the estate columns
const Die: React.FC<PieceProps> = ({ f, c }) => {
  // # word reaction: the named object swells briefly (0→1→0 over 14 frames) on its word
  const sw = (ks: string[], x: number, y: number, amt = 0.12) => { const v = Math.max(...ks.map((k) => { const t = f - c(k); return t >= 0 && t < 14 ? Math.sin(Math.PI * t / 14) : 0 })); return `translate(${x} ${y}) scale(${1 + amt * v}) translate(${-x} ${-y})` }
  const start = c('s49:and'), strangest = c('s49:strangest'), investor = c('s50:investor'), dies = c('s50:dies'), end = c('s50:end'), shares50 = c('s50:shares'), children = c('s50:children')
  const law = c('s51:law'), inherited = c('s51:inherited'), newP = c('s51:new'), value = c('s51:value'), died = c('s51:died'), stepup = c('s52:stepup'), basis = c('s52:basis')
  const mother = c('s52a:mother'), m10 = c('s52a:10'), m100 = c('s52a:100'), starting = c('s52a:starting'), sellA = c('s52a:sell'), noGain = c('s52a:no')
  const her = c('s53:her'), d197 = c('s53:197'), d187 = c('s53:187'), never = c('s53:never'), capital = c('s53:capital'), kids53 = c('s53:children')
  const sells = c('s54:sells'), loan = c('s54:loan'), reset = c('s54:reset'), little = c('s54:little')
  const estate = c('s55:estate'), today = c('s55:today'), d15 = c('s55:15'), debts = c('s55:debts'), d141 = c('s56:141'), line56 = c('s56:line'), no56 = c('s56:no')
  const bigger = c('s57:bigger'), d40 = c('s57:40'), trusts = c('s57:trusts'), buy = c('s58:buy'), borrow = c('s58:borrow'), die = c('s58:die'), prof = c('s58:professor'), mcc = c('s58:mccaffery')
  const HOUSE = 330, SHELF0 = 720, KIDS = 1080, BANK = 1420, POST = 1180, TAXX = 1760
  const shelfX = lerp(SHELF0, 840, easeInOut(span(f, shares50, shares50 + 30)))
  const STREET = win(f, start, mother, 12) + win(f, her, estate, 12), EXAMPLE = win(f, mother, her, 12), ESTATE = win(f, estate, buy, 12), SIGNS = on(f, buy, 12)
  const kid: Beat[] = [[0, 'idle', 'neutral'], [shares50, 'receive', 'neutral'], [children, 'hug', 'smiling'], [newP, 'think', 'thinking'], [stepup, 'pointUp', 'smiling'],
    [m10, 'hold', 'neutral'], [m100, 'hold', 'smiling'], [sellA, 'offer', 'neutral'], [noGain, 'thumbsUp', 'smiling'], [d187, 'shock', 'shocked'], [never, 'celebrate', 'smiling'], [sells, 'offer', 'neutral'], [little, 'relief', 'smiling']]
  const kh = hand(f, kid, KIDS, 1000, 0.85)
  const tagY = lerp(480, 400, on(f, stepup, 16))
  return (
    <g>
      <Stage id="bd2" frame={f} />
      <g>
        <rect x={-300} y={-300} width={2520} height={1400} fill="#F2B37A" opacity={0.18} />
        <Street f={f} />
        <House x={HOUSE} y={880} />
        <BankHall x={BANK} y={880} s={0.7} o={STREET + SIGNS * 0} />
        <TaxOffice x={TAXX} y={880} s={0.55} shut={on(f, never, 8) * (1 - on(f, estate, 8))} />
        {/* # STREET: the porch hourglass runs out at the end of year 10; the shelf slides to her children */}
        <g opacity={STREET}>
          <g transform={`translate(${HOUSE + 120} 830)`} opacity={on(f, start, 8)}><rect x={-26} y={-60} width={52} height={10} rx={4} fill="#7A4E2D" /><rect x={-26} y={50} width={52} height={10} rx={4} fill="#7A4E2D" />
            <path d={`M-20 -50 L20 -50 L0 0 Z`} fill={P.gold} opacity={1 - on(f, dies, 30)} /><path d={`M-20 50 L20 50 L0 ${lerp(48, 6, on(f, dies, 30))} Z`} fill={P.gold} /><path d="M-20 -50 L20 -50 L0 0 L20 50 L-20 50 L0 0 Z" fill="none" stroke="#7A4E2D" strokeWidth={4} /></g>
          <g opacity={on(f, end, 8) * (1 - on(f, newP, 8))}><Label x={HOUSE} y={420} text="END OF YEAR 10" size={44} font="Bebas Neue" color={P.ink2} /></g>
          <Person f={f} who="investorF" beats={[[0, 'idle', 'smiling'], [investor, 'present', 'smiling']]} x={HOUSE + 250} y={1000} s={0.85} o={on(f, start, 8) * (1 - on(f, dies + 10, 24))} />
          <Shelf x={shelfX} y={880} blue={1} glow={on(f, children, 10) * (1 - on(f, newP, 10))} />
          {/* # the shelf's price tag: "paid $1M" → its value on the day she died → it climbs a step */}
          <g opacity={on(f, inherited, 8)} transform={sw(['s53:cost', 's53:worth'], shelfX, tagY, 0.2)}><FlipTag x={shelfX} y={tagY} s={0.65} a="PAID $1M" b={f >= d197 ? '$19.7M' : 'NEW PRICE'} t={span(f, value, value + 12)} /></g>
          <g opacity={on(f, stepup, 8) * (1 - on(f, mother, 8))} transform={`translate(${shelfX - 260} 880)`}>{[0, 1, 2].map((k) => <rect key={k} x={k * 50} y={-(k + 1) * 60} width={50} height={(k + 1) * 60} fill={P.gold} opacity={0.5 + 0.15 * k} />)}</g>
          <g opacity={on(f, died, 8) * (1 - on(f, stepup, 8))}><Label x={shelfX} y={360} text="THE DAY SHE DIED" size={40} font="Bebas Neue" color={P.ink2} /></g>
          {/* # after the example: cost $1M, value $19.7M, the gain $18.7M (a gold band); the tax office shows $0 */}
          <g opacity={on(f, d187, 8) * (1 - on(f, sells, 8))} transform={sw(['s53:gain'], shelfX - 110, 720, 0.12)}><rect x={shelfX - 110} y={540} width={14} height={340} rx={6} fill={P.gold} /><Label x={shelfX - 200} y={720} text="$18.7M GAIN" size={44} font="Bebas Neue" color={P.goldInk} /></g>
          <g opacity={on(f, capital, 8) * (1 - on(f, estate, 8))} transform={sw(['s53:not', 's53:not#2'], TAXX - 70, 620, 0.25)}><Label x={TAXX - 70} y={620} text="TAX: $0" size={46} font="Bebas Neue" color={P.mintInk} /></g>
          {/* # three certificates slide to the bank; the loan block there vanishes; "gain ≈ $0" */}
          <g opacity={on(f, her, 8) * (1 - on(f, estate, 8))}><rect x={BANK - 90} y={500} width={180} height={70} rx={10} fill={P.coral} opacity={1 - on(f, loan + 10, 10)} /><Label x={BANK} y={548} text="LOAN $5.6M" size={40} font="Bebas Neue" color="#FFF" o={1 - on(f, loan + 10, 10)} /></g>
          {f >= sells && f < sells + 40 && [0, 1, 2].map((k) => <g key={k} transform={`translate(${lerp(shelfX, BANK, easeInOut(span(f, sells + k * 4, sells + 24 + k * 4)))} ${lerp(600 + k * 30, 560, easeInOut(span(f, sells + k * 4, sells + 24 + k * 4)))})`} opacity={1 - span(f, sells + 26 + k * 4, sells + 34 + k * 4)}><rect x={-60} y={-12} width={120} height={24} rx={5} fill="#F7F1E1" stroke="#C9B27A" strokeWidth={2} /></g>)}
          <g opacity={on(f, little, 8) * (1 - on(f, estate, 8))} transform={sw(['s54:gain', 's54:left', 's54:sale'], BANK, 460, 0.2)}><Label x={BANK} y={460} text="LOAN REPAID · GAIN ≈ $0" size={40} font="Bebas Neue" color={P.mintInk} /></g>
          <g opacity={on(f, children, 8)}><Person f={f} who="owner" beats={kid} x={KIDS} y={1000} s={0.85} />
            {[0, 1].map((k) => <Mini key={k} look={k ? 'buyer' : 'worker'} x={KIDS + 170 + k * 110} y={1000} scale={0.9} frame={f} seed={k + 7} mood="happy" />)}</g>
          <g opacity={on(f, kids53, 8) * (1 - on(f, sells, 8))}></g>
        </g>
        {/* # EXAMPLE: one certificate in the child's hands — $10 → worth $100 when the mother died → new start $100 → sold for $100: no gain */}
        <g opacity={EXAMPLE}>
          <Person f={f} who="owner" beats={kid} x={KIDS - 240} y={1000} s={0.9} />
          <Cert x={KIDS + 60} y={600} s={1.1} />
          <g opacity={on(f, m10, 8)}><FlipTag x={KIDS + 60} y={430} s={0.75} a="$10" b="$100" t={span(f, m100, m100 + 12)} /></g>
          <g opacity={on(f, starting, 8)}><Label x={KIDS + 60} y={760} text="NEW START: $100" size={50} font="Bebas Neue" color={P.goldInk} /></g>
          <g opacity={on(f, sellA, 8)}><Label x={KIDS + 380} y={600} text="SOLD: $100" size={50} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, noGain, 8)}><Label x={KIDS + 380} y={680} text="GAIN: $0" size={56} font="Bebas Neue" color={P.mintInk} /></g>
        </g>
        {/* # ESTATE: a measuring post with a $15M line; her estate column 19.7 → minus the 5.6 loan → 14.1, under the line; a bigger neighbour above it */}
        <g opacity={ESTATE}>
          <g transform={sw(['s55:federal', 's55:starts', 's57:line'], POST + 220, 880 - 15 * PX, 0.06)}><rect x={POST - 140} y={880 - 15 * PX - 3} width={720} height={6} fill={P.ink} opacity={on(f, d15, 8)} /></g>
          <g opacity={on(f, d15, 8)}><Label x={POST - 200} y={880 - 15 * PX + 12} text="$15M" size={50} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, today, 8) * (1 - on(f, d15, 8))}><Label x={POST + 330} y={420} text="TODAY'S LINE" size={44} font="Bebas Neue" color={P.ink2} /></g>
          <g transform={sw(['s55:taken', 's55:first', 's56:loan', 's56:estate'], POST, 880, 0.08)}><rect x={POST - 70} y={880 - lerp(19.7, 14.1, on(f, debts, 20)) * PX} width={140} height={lerp(19.7, 14.1, on(f, debts, 20)) * PX} rx={10} fill={P.gold} /></g>
          <rect x={POST - 70} y={880 - 19.7 * PX} width={140} height={5.6 * PX} rx={10} fill={P.coral} opacity={on(f, debts, 6) * (1 - on(f, debts + 14, 8))} />
          <g opacity={on(f, d141, 8)}><Label x={POST} y={880 - 14.1 * PX + 60} text="$14.1M" size={50} font="Bebas Neue" color={P.navy0} /></g>
          <g opacity={on(f, line56, 8)} transform={`translate(${POST} ${880 - 15 * PX - 60})`}><circle r={30} fill={P.mint} /><path d="M-13 0 l9 10 l18 -20" stroke="#FFF" strokeWidth={7} fill="none" strokeLinecap="round" /></g>
          <g opacity={on(f, no56, 8)} transform={sw(['s56:estate', 's56:due', 's56:example'], TAXX - 70, 620, 0.25)}><Label x={TAXX - 70} y={620} text="TAX: $0" size={46} font="Bebas Neue" color={P.mintInk} /></g>
          <g opacity={on(f, bigger, 8)}>
            <g transform={sw(['s57:fortunes', 's57:face', 's57:estate'], POST + 330, 940, 0.35)}><Label x={POST + 330} y={940} text="A BIGGER FORTUNE" size={36} font="Bebas Neue" color={P.ink2} /></g>
            <rect x={POST + 260} y={880 - on(f, bigger, 20) * 24 * PX} width={140} height={on(f, bigger, 20) * 24 * PX} rx={10} fill={P.gold} opacity={0.9} />
            <rect x={POST + 260} y={880 - 24 * PX} width={140} height={9 * PX} rx={10} fill={P.coral} opacity={on(f, d40, 10)} />
            <g transform={sw(['s57:rich', 's57:why'], POST + 330, 880 - 19.5 * PX, 0.3)}><g opacity={on(f, d40, 8)}><Label x={POST + 330} y={880 - 19.5 * PX + 16} text="UP TO 40%" size={38} font="Bebas Neue" color="#FFF" /></g></g>
          </g>
          <g opacity={on(f, trusts, 8)} transform={`translate(${POST - 560} 860)`}><rect x={-60} y={-60} width={120} height={80} rx={10} fill="#8A5A34" /><rect x={-60} y={-60} width={120} height={24} rx={10} fill="#A86F42" /><rect x={-14} y={-40} width={28} height={30} rx={4} fill={P.gold} /><Label x={0} y={70} text="TRUSTS" size={36} font="Bebas Neue" color={P.ink2} /></g>
          <Person f={f} who="owner" beats={[[0, 'idle', 'neutral'], [d15, 'explain', 'thinking'], [no56, 'relief', 'smiling']]} x={POST - 330} y={1000} s={0.85} />
        </g>
        {/* # SIGNS: buy (a market bag at the stall), borrow (the bank glows), die (the porch hourglass) */}
        <g opacity={SIGNS}>
          {[[680, buy, 'BUY', P.gold], [1040, borrow, 'BORROW', P.mint], [1400, die, 'DIE', P.coral]].map(([x, at, t, col]) => <g key={t as string} opacity={on(f, at as number, 8)} transform={`translate(${x} 360) scale(${lerp(0.7, 1, on(f, at as number, 12))})`}>
            <rect x={-110} y={-44} width={220} height={88} rx={16} fill={col as string} /><Label x={0} y={22} text={t as string} size={62} font="Bebas Neue" color={P.navy0} /><rect x={-6} y={44} width={12} height={476} fill="#7A4E2D" />
            {t === 'BUY' && <g transform="translate(0 520) scale(1.5)">{[0, 1, 2, 3, 4].map((k) => <rect key={k} x={-75} y={-24 - k * 30} width={150} height={24} rx={5} fill="#F7F1E1" stroke="#C9B27A" strokeWidth={2} />)}</g>}
            {t === 'BORROW' && <g transform="translate(0 520)"><BankHall x={0} y={0} s={0.6} /></g>}
            {t === 'DIE' && <g transform="translate(0 440) scale(2.2)"><rect x={-26} y={-60} width={52} height={10} rx={4} fill="#7A4E2D" /><rect x={-26} y={50} width={52} height={10} rx={4} fill="#7A4E2D" /><path d="M-20 50 L20 50 L0 6 Z" fill={P.gold} /><path d="M-20 -50 L20 -50 L0 0 L20 50 L-20 50 L0 0 Z" fill="none" stroke="#7A4E2D" strokeWidth={4} /></g>}</g>)}
          <g opacity={on(f, prof, 8)}><Label x={960} y={960} text={f >= mcc ? 'NICKNAME BY PROF. EDWARD McCAFFERY' : 'A TAX PROFESSOR'} size={44} font="Bebas Neue" color={P.ink} /></g>
        </g>
      </g>
      <Headline f={f} lines={[[strangest, 'THE LAST STEP', P.ink, 124], [children, 'TO HER CHILDREN', P.ink, 120], [newP, 'A NEW STARTING PRICE', P.goldInk, 112], [stepup, 'STEP-UP IN BASIS', P.goldInk, 120],
        [m10, 'EXAMPLE: A $10 SHARE', P.ink, 108], [her, 'HER SHARES', P.ink, 124], [d187, '≈ $18.7M GAIN', P.goldInk, 124], [never, 'NEVER TAXED AS A GAIN', P.mintInk, 108], [estate, 'ESTATE TAX?', P.ink, 130],
        [no56, 'NONE IN OUR EXAMPLE', P.mintInk, 112], [bigger, 'BIGGER FORTUNES', P.ink, 120], [d40, 'ABOVE THE LINE: UP TO 40%', P.coralInk, 100], [buy, 'BUY · BORROW · DIE', P.goldInk, 130]]} />
      <Vignette id="bd2" />
    </g>
  )
}

const BEATS: string[] = ['s53:cost', 's53:worth', 's57:fortunes', 's57:face', 's57:estate', 's53:gain', 's53:not', 's53:not#2', 's54:gain', 's54:left', 's54:sale', 's56:estate', 's56:due', 's56:example', 's55:taken', 's55:first', 's56:loan', 's56:estate', 's55:federal', 's55:starts', 's57:line', 's57:rich', 's57:why', 's52a:10', 's52a:starting', 's52a:sell', 's51:law', 's54:reset', 's49:and', 's49:strangest', 's50:investor', 's50:dies', 's50:end', 's50:shares', 's50:children', 's51:inherited', 's51:new', 's51:value', 's51:died', 's52:stepup',
  's52a:mother', 's52a:10', 's52a:100', 's52a:starting', 's52a:sell', 's52a:no', 's53:her', 's53:197', 's53:187', 's53:never', 's53:capital', 's53:children', 's54:sells', 's54:loan', 's54:little',
  's55:estate', 's55:today', 's55:15', 's55:debts', 's56:141', 's56:line', 's56:no', 's57:bigger', 's57:40', 's57:trusts', 's58:buy', 's58:borrow', 's58:die', 's58:professor', 's58:mccaffery']
export const BB2_DIE = makePiece('bb2-die', 'Long (redrawn): her street at sunset — shelf passes to her children, tag flips $1M → $19.7M (step-up), $10→$100 example, loan repaid, $15M estate line ($14.1M under), up to 40% above; buy · borrow · die', {
  mood: 'light', Component: Die, beats: BEATS,
  sfx: [['s51:value', 'swish', 0.4], ['s52:stepup', 'chime', 0.5], ['s52a:no', 'ding', 0.4], ['s53:187', 'impact', 0.5], ['s56:no', 'ding', 0.4], ['s58:die', 'thud', 0.4]] })
