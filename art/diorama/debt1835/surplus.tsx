// ============================================================
// db-surplus (s43–s58, dark): too much money. A) the Treasury at night with
// surplus sacks +$18M (1835) and +$20M (1836); a June 1836 law; $5M stays,
// the rest splits into four numbered payments for the states.  B) a state bank:
// government coins pour in, paper notes fly out to a land buyer; the plots' price
// tag climbs; close-up of a banknote and its promise (gold or silver on demand);
// the vault holds far fewer coins than the notes out; two customers are paid.
// C) the road west: a gold-or-silver-only order at the land office; a coin wagon
// rolls west from the eastern banks; sacks hop bank to bank; New York's vault drains.
// ============================================================
import React from 'react'
import { Label } from '../charts'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece } from '../registry'
import { Mini } from '../../rig/Mini'
import { type Beat, fly, Headline, Person, win } from '../aimoney/common'
import { Bank, bump, C, Capitol, Coin, Defs, LandOffice, Note, Plots, Sack, Scroll, Street, Treasury, Wagon , Backdrop } from './kit'

const GROUND = 880
const Surplus: React.FC<{ f: number; c: (k: string) => number }> = ({ f, c }) => {
  const collected = c('s43:collected'), d18 = c('s43:18'), spent43 = c('s43:spent')
  const extra44 = c('s44:extra'), d20 = c('s44:20')
  const where45 = c('s45:where'), go45 = c('s45:go'), left45 = c('s45:left')
  const june = c('s46:june'), congress46 = c('s46:congress'), states46 = c('s46:states')
  const above = c('s47:above'), d5 = c('s47:5'), shared = c('s47:shared'), four = c('s47:four'), payments = c('s47:payments')
  const boom = c('s48:boom'), wilder = c('s48:wilder')
  const moved = c('s49:moved'), stateb = c('s49:state'), lent = c('s49:lent'), freely = c('s49:freely')
  const lending50 = c('s50:lending'), people50 = c('s50:people'), buying = c('s50:buying'), higher = c('s50:higher'), price50 = c('s50:price')
  const catch51 = c('s51:catch'), paper = c('s51:paper'), banknotes = c('s51:banknotes')
  const banknote52 = c('s52:banknote'), promised = c('s52:promised'), swap = c('s52:swap'), gold52 = c('s52:gold'), silver52 = c('s52:silver'), demand = c('s52:demand')
  const keep53 = c('s53:keep'), enough = c('s53:enough'), everyone = c('s53:everyone'), lends53 = c('s53:lends')
  const works54 = c('s54:works'), few = c('s54:few'), ask = c('s54:ask')
  const july = c('s55:july'), ordered = c('s55:ordered'), buyers = c('s55:buyers'), gold55 = c('s55:gold')
  const travel = c('s56:travel'), west56 = c('s56:west'), east = c('s56:east')
  const moving = c('s57:moving'), bank57 = c('s57:bank'), bank57b = c('s57:bank#2')
  const study = c('s58:study'), drained = c('s58:drained'), york = c('s58:york'), silver58 = c('s58:silver')
  const A = win(f, c('s43') - 20, boom), B = win(f, boom, july), D = on(f, july, 8)
  const clerk: Beat[] = [[0, 'idle', 'smiling'], [d18, 'present', 'smiling'], [where45, 'scratchHead', 'thinking'], [june, 'idle', 'neutral']]
  const spec: Beat[] = [[0, 'idle', 'smug'], [lending50, 'receive', 'smug'], [higher, 'pointUp', 'smug']]
  // # bank vault level: fills with government money (s49), then shows how little is kept vs notes out (s53)
  const vault = lerp(lerp(0.2, 0.9, on(f, moved, 30)), 0.3, on(f, keep53, 20))
  return (
    <g>
      <Defs />
      <Stage id="db-surplus" frame={f} />
      <Headline f={f} lines={[[d18, '1835: +$18 MILLION EXTRA', C.glow, 100], [d20, '1836: +$20 MILLION EXTRA', C.glow, 100], [where45, 'WHERE DOES IT GO?', P.ink, 110], [c('s46:1836'), 'JUNE 1836: GIVE IT TO THE STATES', P.ink, 92], [four, 'FOUR PAYMENTS', P.ink, 110],
        [boom, 'THE LAND BOOM', C.glow, 110], [catch51, 'PAPER BANKNOTES', P.ink, 110], [banknote52, 'A NOTE = A PROMISE OF COINS', P.ink, 96], [keep53, 'BUT FEW COINS IN THE VAULT', C.coral, 100],
        [c('s55:1836'), 'JULY 1836', C.glow, 110], [gold55, 'LAND: GOLD OR SILVER ONLY', C.glow, 100], [travel, 'COINS HEAD WEST', P.ink, 110], [study, 'NEW YORK VAULTS DRAINED', C.coral, 104]]} />

      {/* # A) the overflowing Treasury, the law, the four payments */}
      {A > 0 && <g opacity={A}>
        <Backdrop kind="night" f={f} />
        <Street y={GROUND} dark />
        <Treasury x={560} y={GROUND} s={0.85 * bump(f, spent43, 0.04) * bump(f, c('s44:extra'), 0.05) * bump(f, c('s44:in'), 0.04)} dark door={on(f, collected, 10)} />
        <g opacity={on(f, collected, 8) * (1 - on(f, above, 8))}><Person f={f} who="owner" beats={clerk} x={930} y={GROUND} s={0.85} /></g>
        <g opacity={on(f, d18, 8) * (1 - on(f, above, 8))}><Sack x={1180} y={GROUND} s={1.0 * pop(f, d18)} label="+$18M" /></g>
        <g opacity={on(f, d20, 8) * (1 - on(f, above, 8))}><Sack x={1400} y={GROUND} s={1.05 * pop(f, d20) * bump(f, go45, 0.06) * bump(f, c('s45:debt'), 0.06)} label="+$20M" /></g>
        <g opacity={on(f, june, 8) * (1 - on(f, above, 8))}><Scroll x={1660} y={545} s={0.9 * pop(f, june) * bump(f, states46, 0.06)} title="TO THE STATES" /></g>
        <g opacity={on(f, congress46, 8) * (1 - on(f, above, 8))}><Capitol x={1660} y={GROUND} s={0.55} /></g>
        {/* # $5M stays; the rest splits into four numbered payments */}
        <g opacity={on(f, d5, 8)}><Sack x={930} y={GROUND} s={0.9 * pop(f, d5)} label="$5M" /><Label x={930} y={GROUND + 60} text="STAYS" size={40} font="Bebas Neue" color={C.glow} /></g>
        {[0, 1, 2, 3].map((k) => { const t = easeInOut(span(f, shared + k * 4, shared + k * 4 + 16))
          return <g key={k} opacity={on(f, shared + k * 4, 6)}><Sack x={lerp(930, 1180 + k * 200, t)} y={GROUND} s={0.85} label={String(k + 1)} />
            <g opacity={on(f, payments, 8)}><Label x={1180 + k * 200} y={GROUND + 60} text={['JAN', 'APR', 'JUL', 'OCT'][k]} size={40} font="Bebas Neue" color={C.glow} /></g></g> })}
      </g>}

      {/* # B) the state bank, notes for land, the promise, the thin vault */}
      {B > 0 && <g opacity={B}>
        <Backdrop kind="night" f={f} />
        <Street y={GROUND} dark />
        <Bank x={440} y={GROUND} s={1.15 * bump(f, stateb, 0.04) * bump(f, enough, 0.05)} fill={vault} name="STATE BANK" />
        {f >= moved && f < moved + 40 && [0, 1, 2].map((k) => { const fl = fly(f, moved + k * 6, [140, 260], [380, 720], 18, 60); return fl.t < 1 ? <Coin key={k} x={fl.x} y={fl.y} r={22} o={fl.o} /> : null })}
        <g opacity={on(f, boom, 8) * (1 - on(f, catch51, 8))}>
          <Plots x={1450} y={760} s={1.05 * bump(f, wilder, 0.05) * bump(f, c('s50:sell'), 0.05)} sold={on(f, boom, 30)} />
          {/* # the price tag on the plots climbs */}
          <g transform={`translate(1450 ${lerp(600, 520, on(f, higher, 16))})`}><rect x={-120} y={-40} width={240} height={70} rx={12} fill={C.parch} stroke={C.goldD} strokeWidth={5} />
            <Label x={0} y={14} text={f >= price50 ? 'PRICE ▲▲' : 'PRICE ▲'} size={44} font="Bebas Neue" color={C.brick} /></g>
        </g>
        {/* # notes fly from the bank to the land buyer */}
        <g opacity={on(f, people50, 8) * (1 - on(f, catch51, 8))}><Person f={f} who="investor" beats={spec} x={1000} y={GROUND} s={0.9} /></g>
        {f >= lent && f < catch51 && [0, 1].map((k) => { const t0 = lent + k * 10 + Math.floor((f - lent) / 30) * 30, fl = fly(f, t0, [620, 560], [1130, 640], 18, 80); return fl.t < 1 ? <Note key={k} x={fl.x} y={fl.y} s={0.45} o={fl.o} r={-10} /> : null })}
        {/* # the banknote close-up and its promise */}
        <g opacity={on(f, paper, 8) * (1 - on(f, keep53, 8))}>
          <Note x={1200} y={520} s={1.7 * pop(f, paper) * bump(f, banknote52, 0.05) * bump(f, c('s52:worth'), 0.05)} v="$10" />
          <g opacity={on(f, swap, 8)}><path d="M1200 690 L1200 760" stroke={C.glow} strokeWidth={8} /><path d="M1180 744 L1200 774 L1220 744" fill="none" stroke={C.glow} strokeWidth={8} /></g>
          <g opacity={on(f, gold52, 8)}><Coin x={1130} y={830} r={40} /></g>
          <g opacity={on(f, silver52, 8)}><Coin x={1270} y={830} r={40} silver /></g>
          <g opacity={on(f, demand, 8)}><Label x={1560} y={540} text="ON DEMAND" size={52} font="Bebas Neue" color={C.glow} /></g>
        </g>
        {/* # notes out vs coins kept: six notes in a row against the thin vault */}
        <g opacity={on(f, everyone, 8) * (1 - on(f, works54, 8))}>{Array.from({ length: 6 }, (_, k) => <g key={k} opacity={on(f, everyone + k * 3, 6)}><Note x={900 + (k % 3) * 250} y={480 + Math.floor(k / 3) * 150} s={0.6} /></g>)}
          <g opacity={on(f, lends53, 8)}><Label x={1150} y={760} text="NOTES OUT  ≫  COINS KEPT" size={52} font="Bebas Neue" color={C.coral} /></g></g>
        {/* # a few customers ask: each gets coins */}
        <g opacity={on(f, few, 8)}>{[0, 1].map((k) => <g key={k} opacity={on(f, few + k * 6, 6)}><Mini look={['buyer', 'worker'][k]} x={760 + k * 140} y={GROUND} scale={0.85} frame={f} seed={k + 40} mood={f >= ask + 10 ? 'happy' : 'neutral'} /></g>)}
          {f >= ask && f < ask + 24 && (() => { const fl = fly(f, ask, [520, 700], [760, 640], 18, 60); return <Coin x={fl.x} y={fl.y} r={20} o={fl.o} /> })()}
          {f >= c('s54:time') && f < c('s54:time') + 24 && (() => { const fl = fly(f, c('s54:time'), [520, 700], [900, 640], 18, 60); return <Coin x={fl.x} y={fl.y} r={20} o={fl.o} /> })()}
          <g opacity={on(f, ask + 18, 8)}><Label x={830} y={GROUND + 60} text="A FEW AT A TIME: FINE" size={44} font="Bebas Neue" color={C.mint} /></g></g>
      </g>}

      {/* # D) the road west: the order, the wagon, bank to bank, New York drained */}
      {D > 0 && <g opacity={D}>
        <Backdrop kind="night" f={f} />
        <Street y={GROUND} dark />
        <LandOffice x={300} y={GROUND} s={0.9} busy={on(f, buyers, 10)} />
        <g opacity={on(f, ordered, 8) * (1 - on(f, travel, 8))}><Scroll x={720} y={600} s={0.9 * pop(f, ordered)} title="GOLD OR SILVER ONLY" />
          <g opacity={on(f, gold55, 8)}><Coin x={660} y={700} r={30} /><Coin x={780} y={700} r={30} silver /></g></g>
        {/* # the second bank arrives only when money starts moving bank to bank (after the wagon has passed) */}
        <g opacity={on(f, moving, 10)}><Bank x={1250} y={GROUND} s={0.8 * pop(f, moving) * bump(f, bank57, 0.05)} fill={0.55} name="STATE BANK" /></g>
        <Bank x={1690} y={GROUND} s={0.9 * bump(f, york, 0.05) * bump(f, east, 0.04) * bump(f, c('s57:treasury'), 0.04) * bump(f, c('s58:together'), 0.05)} fill={lerp(lerp(0.9, 0.6, on(f, travel, 30)), 0.05, on(f, drained, 30))} name="NEW YORK BANK" />
        <g opacity={on(f, west56, 8)}><Label x={300} y={GROUND + 60} text="◀ WEST" size={44} font="Bebas Neue" color={C.glow} /></g>
        <g opacity={on(f, east, 8)}><Label x={1690} y={GROUND + 60} text="EAST ▶" size={44} font="Bebas Neue" color={C.glow} /></g>
        {/* # the coin wagon rolls from the eastern banks to the land office */}
        <g opacity={on(f, c('s56:now'), 8) * (1 - on(f, moving, 8))}><Wagon x={lerp(1300, 760, easeInOut(span(f, travel, travel + 70)))} y={GROUND} s={0.9} f={f} /></g>
        {/* # government money hops from bank to bank */}
        {f >= bank57 && f < study && [0, 1].map((k) => { const t0 = bank57 + k * 14 + Math.floor((f - bank57) / 36) * 36, fl = fly(f, t0, k ? [1250, 620] : [1690, 600], k ? [1690, 600] : [1250, 620], 20, 120)
          return fl.t < 1 ? <Sack key={k} x={fl.x} y={fl.y + 80} s={0.45} o={fl.o} /> : null })}
        <g opacity={on(f, drained, 8)}><Label x={1690} y={575} text="VAULT EMPTYING" size={48} font="Bebas Neue" color={C.coral} /></g>
        <g opacity={on(f, silver58, 8)}><Coin x={1600} y={500} r={24} o={0.5} /><Coin x={1780} y={500} r={24} silver o={0.5} /></g>
      </g>}
      <Vignette id="db-surplus" />
    </g>
  )
}

const BEATS = ["s43:collected", "s43:18", "s43:spent", "s44:20", "s45:where", "s45:go", "s46:june", "s46:congress", "s46:states", "s47:above", "s47:5", "s47:shared", "s47:four", "s47:payments", "s48:boom", "s48:wilder", "s49:moved", "s49:state", "s49:lent", "s49:freely", "s50:lending", "s50:people", "s50:buying", "s50:higher", "s50:price", "s51:catch", "s51:paper", "s51:banknotes", "s52:banknote", "s52:promised", "s52:swap", "s52:gold", "s52:silver", "s52:demand", "s53:keep", "s53:enough", "s53:everyone", "s53:lends", "s54:works", "s54:few", "s54:ask", "s55:july", "s55:ordered", "s55:buyers", "s55:gold", "s56:travel", "s56:west", "s56:east", "s57:moving", "s57:bank", "s58:study", "s58:drained", "s58:york", "s58:silver", "s43", "s44:extra", "s44:in", "s45:debt", "s50:sell", "s52:worth", "s54:time", "s57:treasury", "s58:together", "s56:now"]
export const DB_SURPLUS = makePiece('db-surplus', 'Debt 1835 ch3 (night): Treasury with +$18M/+$20M surplus sacks, clerk wonders where it goes, June 1836 law to the states, $5M stays and four numbered payments; state bank fills with government coins and lends notes to a land buyer, plot price climbs; banknote close-up = promise of gold/silver on demand; notes out vs few coins kept; a few customers paid; gold-or-silver-only order at the land office; coin wagon rolls west; sacks hop bank to bank; New York vault drains', {
  mood: 'dark', Component: Surplus, beats: BEATS,
  sfx: [['s43:18', 'coin', 0.2], ['s47:four', 'pop', 0.2], ['s51:paper', 'whoosh', 0.2], ['s56:travel', 'whoosh', 0.2]],
})
