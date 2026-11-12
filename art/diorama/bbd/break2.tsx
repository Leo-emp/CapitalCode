// ---------------------------------------------------------------- s59–s70 (redrawn 2026-10-31): her street at night, a storm coming.
// The presenter asks "why doesn't everyone do this?" Her shelf is chained to the bank; the price on the bank's board falls,
// her phone rings (maintenance call); she carries cash over; the bank's calendar counts two, three days; if she can't, the
// banker carries certificates away; lightning. Year ten: her shares become a gold tower ($19.7M) beside the red loan tower
// ($5.6M); lightning halves it ($9.8M) — the loan is more than half — pieces are carted off at the bottom. The rate: a
// thermometer on the bank climbs (SOFR). Size: a neighbour with a tiny shelf (0% / 15%) drips interest to the bank.
// A real example: a proxy filing on the bank's counter; Ellison's Oracle shares padlocked to personal loans.
import React from 'react'
import { easeInOut, lerp, on, P, span, Stage, Vignette } from '../kit'
import { Label } from '../charts'
import { makePiece, type PieceProps } from '../registry'
import { type Beat, hand, Headline, Person, Doc, win } from '../aimoney/common'
import { BankHall, Cash, Ground, LightBridge, Skyline } from './world'
import { House } from './sell'
import { Shelf } from './choice2'

const PX = 26
const Cloud: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><ellipse cx={0} cy={0} rx={160} ry={60} fill="#2E3A52" /><ellipse cx={-90} cy={10} rx={100} ry={50} fill="#2E3A52" /><ellipse cx={100} cy={14} rx={110} ry={48} fill="#2E3A52" /><ellipse cx={20} cy={-40} rx={100} ry={50} fill="#38465F" /></g>
)
const Bolt: React.FC<{ x: number; y: number; o: number }> = ({ x, y, o }) => o > 0.01 ? <path d={`M${x} ${y} L${x - 40} ${y + 140} L${x + 10} ${y + 140} L${x - 30} ${y + 300}`} stroke="#F7E27A" strokeWidth={14} fill="none" strokeLinejoin="round" opacity={o} /> : null

const Break: React.FC<PieceProps> = ({ f, c }) => {
  // # word reaction: the named object swells briefly (0→1→0 over 14 frames) on its word
  const sw = (ks: string[], x: number, y: number, amt = 0.12) => { const v = Math.max(...ks.map((k) => { const t = f - c(k); return t >= 0 && t < 14 ? Math.sin(Math.PI * t / 14) : 0 })); return `translate(${x} ${y}) scale(${1 + amt * v}) translate(${-x} ${-y})` }
  const s59 = c('s59'), shares59 = c('s59:shares'), first = c('s60:first'), backed = c('s60:backed'), falls = c('s60:falls'), lender = c('s60:lender'), call = c('s60:call')
  const add = c('s61:add'), pay = c('s61:pay'), two = c('s61:two'), three = c('s61:three'), cant = c("s62:can't"), sell62 = c('s62:sell'), warning = c('s62:warning')
  const picture = c('s63:picture'), ten = c('s63:ten'), halve = c('s63:halve'), d197 = c('s64:197'), d98 = c('s64:98'), d56 = c('s64:56'), half = c('s65:half'), selling = c('s65:selling'), bottom = c('s65:bottom')
  const second = c('s66:second'), rise = c('s66:rise'), sofr = c('s66:sofr'), expensive = c('s66:expensive')
  const third = c('s67:third'), size = c('s67:size'), d0 = c('s67:0'), d15 = c('s67:15'), little = c('s67:little'), interest = c('s67:interest'), very = c('s68:very')
  const oracle = c("s69:oracle's"), filing = c('s69:filing'), ellison = c('s69:ellison'), pledged = c('s69:pledged'), loans = c('s69:loans'), board = c("s70:oracle's"), repay = c('s70:repay'), without = c('s70:without')
  const HOUSE = 260, SHELF = 560, BANK = 1360, TW = 780
  const CALLW = win(f, shares59, picture, 12), TOWERS = win(f, picture, second, 12), RATE = win(f, second, third, 12), SIZE = win(f, third, oracle, 12), REAL = on(f, oracle, 12)
  // # she: by her shelf; walks over with cash on "add"; back on "can't"
  const walk = easeInOut(span(f, add, add + 24)) * (1 - easeInOut(span(f, cant, cant + 20)))
  const ix = lerp(760, 1080, walk)
  const inv: Beat[] = [[0, 'idle', 'neutral'], [backed, 'present', 'neutral'], [falls, 'nervous', 'worried'], [call, 'phone', 'worried'], [add, 'carry', 'worried'], [pay, 'offer', 'worried'],
    [cant, 'emptyPockets', 'worried'], [sell62, 'despair', 'worried'], [warning, 'shock', 'shocked'], [picture, 'idle', 'neutral'], [halve, 'shock', 'shocked'], [d98, 'despair', 'worried'], [half, 'facepalm', 'worried'], [bottom, 'slump', 'worried']]
  const hp = hand(f, inv, ix, 1000, 0.9)
  const banker: Beat[] = [[0, 'idle', 'neutral'], [lender, 'present', 'neutral'], [call, 'phone', 'angry'], [pay, 'receive', 'neutral'], [sell62, 'carry', 'neutral'], [selling, 'carry', 'neutral']]
  const price = lerp(1, 0.45, easeInOut(span(f, falls, falls + 30)))
  const gold = lerp(19.7, 9.84, easeInOut(span(f, halve, halve + 24)))
  const flash = (at: number) => on(f, at, 3) * (1 - span(f, at + 3, at + 14))
  const temp = on(f, rise, 30)
  return (
    <g>
      <Stage id="bk2" frame={f} />
      <g>
        <Skyline f={f} dim={0.3} />
        <Ground />
        <Cloud x={500} y={330} s={1} o={on(f, falls, 20)} /><Cloud x={1200} y={300} s={1.1} o={on(f, falls, 20)} /><Cloud x={1700} y={340} s={0.9} o={on(f, falls, 20)} />
        <rect x={-300} y={-300} width={2520} height={1500} fill="#F7E27A" opacity={0.18 * (flash(warning) + flash(halve))} />
        <House x={HOUSE} y={880} />
        <g transform={sw(['s65:lender'], BANK, 880, 0.08)}><BankHall x={BANK} y={880} s={0.85} lit={0.3} /></g>
        {/* # the presenter asks the question, then steps out */}
        <g opacity={on(f, s59, 8) * (1 - on(f, first, 12))}><Person f={f} who="hero" beats={[[0, 'present', 'thinking'], [shares59, 'scratchHead', 'thinking']]} x={1730} y={1190} s={1.0} life={2} /></g>
        {/* # CALL: shelf chained to the bank; the board's price falls; phone rings; cash carried over; days counted; certificates carted away */}
        <g opacity={CALLW + on(f, s59, 8) * (1 - on(f, shares59, 8))}>
          <Shelf x={SHELF} y={880} blue={1} />
          {/* # the shelf empties as the banker carts certificates away */}
          {f >= sell62 && <rect x={SHELF - 85} y={880 - 330} width={170} height={on(f, sell62, 30) * 120} fill="#A86F42" />}
          <LightBridge a={[SHELF + 90, 760]} b={[BANK - 200, 760]} t={1} o={on(f, backed, 8)} color={P.sky} lift={40} />
          <g transform={`translate(${BANK} 470)`} opacity={on(f, backed, 8)}>
            <rect x={-170} y={-80} width={340} height={160} rx={14} fill="#1B2233" />
            <path d={`M-140 ${-40} L-60 ${-40 + 0 * price} L20 ${lerp(-40, 30, 1 - price)} L140 ${lerp(-40, 60, 1 - price)}`} stroke={price < 0.9 ? P.coral : P.mint} strokeWidth={8} fill="none" strokeLinecap="round" />
            <Label x={0} y={-48} text="HER SHARES" size={30} font="Bebas Neue" color={P.ink2} />
          </g>
          <g opacity={on(f, call, 6) * (1 - on(f, add, 8))}>{[0, 1, 2].map((k) => <circle key={k} cx={hp.x} cy={hp.y - 40} r={30 + k * 18 + ((f - call) % 20)} fill="none" stroke={P.coral} strokeWidth={4} opacity={0.5 - k * 0.15} />)}</g>
          {f >= add && f < pay + 30 && <Cash x={hp.x} y={hp.y} s={0.8} />}
          {[0, 1, 2].map((k) => { const at = k === 0 ? two : k === 1 ? two + 8 : three; return <g key={k} opacity={on(f, at, 6) * (1 - on(f, picture, 8))} transform={`translate(${BANK - 120 + k * 120} 330)`}><rect x={-44} y={-40} width={88} height={80} rx={8} fill={P.white} /><rect x={-44} y={-40} width={88} height={22} rx={8} fill={P.coral} /><Label x={0} y={30} text={`DAY ${k + 1}`} size={30} font="Bebas Neue" color={P.navy0} /></g> })}
          {[0, 1, 2].map((k) => { const u = easeInOut(span(f, sell62 + k * 8, sell62 + 30 + k * 8)); return u > 0 && u < 1 ? <rect key={k} x={lerp(SHELF, BANK - 160, u) - 60} y={lerp(600 + k * 30, 640, u)} width={120} height={24} rx={5} fill="#F7F1E1" stroke="#C9B27A" strokeWidth={2} /> : null })}
          <Bolt x={1650} y={260} o={flash(warning)} />
          <Person f={f} who="buyer" beats={banker} x={BANK - 260} y={1000} s={0.85} o={on(f, lender, 8)} flip />
          <Person f={f} who="investorF" beats={inv} x={ix} y={1000} s={0.9} />
        </g>
        {/* # TOWERS: year 10 — her shares as a gold tower ($19.7M) next to the red loan tower ($5.6M); lightning halves it; the loan is more than half; pieces carted off */}
        <g opacity={TOWERS}>
          <g opacity={on(f, ten, 8)} transform={`translate(${TW} 300)`}><rect x={-60} y={-44} width={120} height={88} rx={10} fill={P.white} /><rect x={-60} y={-44} width={120} height={26} rx={10} fill={P.coral} /><Label x={0} y={34} text="YEAR 10" size={34} font="Bebas Neue" color={P.navy0} /></g>
          <rect x={TW - 90} y={880 - gold * PX} width={180} height={gold * PX} rx={12} fill={P.gold} />
          {f >= halve && <path d={`M${TW - 60} ${880 - gold * PX + 10} L${TW - 10} ${880 - gold * PX + 70} L${TW - 40} ${880 - gold * PX + 120} L${TW + 20} ${880 - gold * PX + 190}`} stroke="#0E1B33" strokeWidth={8} fill="none" opacity={on(f, halve, 10)} />}
          <Bolt x={TW + 40} y={230} o={flash(halve)} />
          <g opacity={on(f, d197, 8)}><Label x={TW} y={880 - gold * PX - 24} text={f >= d98 ? '$9.8M' : '$19.7M'} size={56} font="Bebas Neue" color={P.ink} /></g>
          <g transform={sw(['s65:everything', 's65:start'], TW + 255, 880, 0.12)}><g opacity={on(f, d56, 8)}><rect x={TW + 180} y={880 - on(f, d56, 16) * 5.59 * PX} width={150} height={on(f, d56, 16) * 5.59 * PX} rx={12} fill={P.coral} /><Label x={TW + 255} y={880 - 5.59 * PX - 24} text="$5.6M LOAN" size={46} font="Bebas Neue" color={P.coralInk} /></g></g>
          <g opacity={on(f, half, 8)}><path d={`M${TW - 140} ${880 - 4.92 * PX} L${TW + 360} ${880 - 4.92 * PX}`} stroke={P.ink} strokeWidth={5} strokeDasharray="14 10" /><Label x={TW - 200} y={880 - 4.92 * PX + 14} text="HALF" size={44} font="Bebas Neue" color={P.ink} /></g>
          {[0, 1, 2].map((k) => { const u = easeInOut(span(f, selling + k * 6, selling + 26 + k * 6)); return u > 0 && u < 1 ? <rect key={k} x={lerp(TW, BANK, u) - 50} y={lerp(880 - gold * PX, 620, u)} width={100} height={30} rx={6} fill={P.gold} /> : null })}
          <Person f={f} who="investorF" beats={inv} x={TW - 220} y={1000} s={0.85} />
        </g>
        {/* # RATE: a thermometer on the bank's wall climbs; SOFR on the bank's sign; the loan bill thickens */}
        <g opacity={RATE}>
          <g transform={`translate(${BANK + 260} 860)`}><rect x={-26} y={-360} width={52} height={360} rx={26} fill="#E9EEF5" /><rect x={-14} y={-340 * lerp(0.35, 0.9, temp)} width={28} height={340 * lerp(0.35, 0.9, temp)} rx={14} fill={P.coral} /><circle cy={10} r={40} fill={P.coral} /></g>
          <g opacity={on(f, sofr, 8)} transform={`translate(${BANK} 470)`}><rect x={-130} y={-46} width={260} height={92} rx={14} fill="#1B2233" /><Label x={0} y={18} text="SOFR ↑" size={60} font="Bebas Neue" color={P.coral} /></g>
          <g opacity={on(f, expensive, 8)}><Doc x={BANK - 380} y={700} s={lerp(0.5, 0.62, on(f, expensive, 16))} title="LOAN" /><Label x={BANK - 380} y={520} text="COSTS MORE" size={44} font="Bebas Neue" color={P.coralInk} /></g>
        </g>
        {/* # SIZE: a neighbour's tiny shelf (0% or 15% on gains) — little to save, interest still drips to the bank; then the giant tower of the very rich */}
        <g opacity={SIZE}>
          <g transform={`translate(${860} 880) scale(0.5)`}><rect x={-90} y={-120} width={180} height={120} rx={8} fill="#A86F42" />{[0, 1, 2].map((k) => <rect key={k} x={-75} y={-32 - k * 30} width={150} height={24} rx={5} fill="#F7F1E1" />)}</g>
          <g opacity={on(f, d0, 8)}><Label x={790} y={720} text="0%" size={56} font="Bebas Neue" color={P.mintInk} /></g>
          <g opacity={on(f, d15, 8)}><Label x={940} y={720} text="15%" size={56} font="Bebas Neue" color={P.skyInk} /></g>
          <g opacity={on(f, little, 8)} transform={sw(['s67:tax', 's67:save', 's67:charges'], 860, 640, 0.25)}><circle cx={860} cy={640} r={16} fill={P.gold} /><Label x={860} y={600} text="LITTLE TO SAVE" size={36} font="Bebas Neue" color={P.ink2} /></g>
          {[0, 1, 2, 3].map((k) => { const u = span(f, interest + k * 9, interest + 30 + k * 9); return u > 0 && u < 1 ? <circle key={k} cx={lerp(920, BANK - 200, u)} cy={lerp(820, 760, u) - Math.sin(u * Math.PI) * 60} r={10} fill={P.gold} /> : null })}
          <Person f={f} who="worker" beats={[[0, 'idle', 'neutral'], [d0, 'countOne', 'neutral'], [little, 'emptyPockets', 'worried'], [interest, 'shrug', 'neutral']]} x={600} y={1000} s={0.85} />
          <g opacity={on(f, c('s68:plan'), 10)} transform={sw(['s68:mostly', 's68:used'], 1085, 880, 0.15)}><rect x={1010} y={880 - Math.max(on(f, c('s68:plan'), 24) * 160, on(f, very, 24) * 560)} width={150} height={Math.max(on(f, c('s68:plan'), 24) * 160, on(f, very, 24) * 560)} rx={14} fill={P.gold} />
            <path d={`M${1015} ${880 - 560} l25 -50 l25 30 l25 -50 l25 50 l25 -30 l25 50 Z`} fill={P.gold} opacity={on(f, very + 16, 8)} /></g>
        </g>
        {/* # REAL: the proxy filing on the bank's counter; Ellison's Oracle shares as a tall stack, padlocked by a chain to personal loans; the board: repay without selling */}
        <g opacity={REAL}>
          <g opacity={on(f, oracle, 8)} transform={sw(['s69:example', 's69:says', 's69:cofounder'], 560, 720, 0.15)}><Doc x={560} y={720} s={0.55} title="PROXY" /><Label x={560} y={580} text="ORACLE FILING" size={44} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, ellison, 8)} transform={sw(['s70:selling', 's70:pledged', 's70:shares'], TW, 880, 0.06)}><rect x={TW - 70} y={880 - 520} width={140} height={520} rx={12} fill="#F7F1E1" stroke="#C9B27A" strokeWidth={4} />{Array.from({ length: 12 }, (_, k) => <rect key={k} x={TW - 56} y={880 - 30 - k * 42} width={112} height={26} rx={5} fill="#EDE3C8" />)}<Label x={TW} y={300} text="ELLISON'S ORACLE SHARES" size={42} font="Bebas Neue" color={P.ink} /></g>
          <LightBridge a={[TW + 70, 600]} b={[BANK - 160, 640]} t={easeInOut(span(f, pledged, pledged + 16))} o={on(f, pledged, 6)} color={P.sky} lift={50} />
          <g opacity={on(f, pledged, 8)} transform={`translate(${TW} 600)`}><rect x={-34} y={-6} width={68} height={56} rx={10} fill={P.gold} /><path d="M-20 -6 L-20 -30 A20 20 0 0 1 20 -30 L20 -6" stroke={P.gold} strokeWidth={10} fill="none" /></g>
          <g opacity={on(f, loans, 8)}><Label x={(TW + BANK) / 2 + 20} y={560} text="PERSONAL LOANS" size={44} font="Bebas Neue" color={P.skyInk} /></g>
          <g opacity={on(f, board, 8)} transform={`translate(${BANK} 470)`}><rect x={-200} y={-46} width={400} height={92} rx={14} fill="#1B2233" /><Label x={0} y={18} text={f >= without ? 'REPAY WITHOUT SELLING' : f >= repay ? 'CAN REPAY…' : "ORACLE'S BOARD"} size={42} font="Bebas Neue" color={P.mint} /></g>
        </g>
      </g>
      <Headline f={f} lines={[[shares59, 'WHY NOT EVERYONE?', P.ink, 124], [call, 'A MAINTENANCE CALL', P.coralInk, 112], [three, '2–3 DAYS', P.coralInk, 130], [sell62, 'FORCED SALE', P.coralInk, 130],
        [picture, 'YEAR 10', P.ink, 130], [halve, 'SHARES HALVE', P.coralInk, 124], [half, 'LOAN > HALF', P.coralInk, 130], [rise, 'THE RATE CAN RISE', P.ink, 120], [size, 'IT NEEDS SIZE', P.ink, 124], [oracle, 'A REAL EXAMPLE', P.goldInk, 120]]} />
      <Vignette id="bk2" />
    </g>
  )
}

const BEATS: string[] = ['s69:example', 's69:says', 's69:cofounder', 's67:tax', 's67:save', 's67:charges', 's70:selling', 's70:pledged', 's70:shares', 's68:plan', 's68:mostly', 's68:used', 's65:everything', 's65:start', 's65:lender', 's64:197', 's64:98', 's64:56', 's70:repay', 's59', 's59:shares', 's60:first', 's60:backed', 's60:falls', 's60:lender', 's60:call', 's61:add', 's61:pay', 's61:two', 's61:three', "s62:can't", 's62:sell', 's62:warning',
  's63:picture', 's63:ten', 's63:halve', 's64:197', 's64:98', 's64:56', 's65:half', 's65:selling', 's65:bottom', 's66:second', 's66:rise', 's66:sofr', 's66:expensive',
  's67:third', 's67:size', 's67:0', 's67:15', 's67:little', 's67:interest', 's68:very', "s69:oracle's", 's69:filing', 's69:ellison', 's69:pledged', 's69:loans', "s70:oracle's", 's70:repay', 's70:without']
export const BB2_BREAK = makePiece('bb2-break', 'Long (redrawn): her street at night in a storm — chained shelf, falling price, maintenance call, 2–3 days, forced sale; year-10 tower halves ($19.7M → $9.8M vs $5.6M loan); rate rises; needs size; Oracle proxy', {
  mood: 'dark', Component: Break, beats: BEATS,
  sfx: [['s60:call', 'tick', 0.5], ['s62:warning', 'crack', 0.4], ['s63:halve', 'crack', 0.5], ['s65:bottom', 'thud', 0.4], ['s66:rise', 'riser', 0.3], ['s69:pledged', 'click', 0.4]] })
