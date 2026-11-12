// ============================================================
// db-today (s80–s92, dark): the debt today. A) a night government office and a
// $40.6T column; it splits into $32.7T owed to outside lenders (people, banks,
// pension funds, other countries — small drawn icons on the column) and $7.9T
// owed to the government's own funds (Social Security vault); then a row of
// people with one tag: about $118,800 per person.  B) the interest: the $100
// bond drips a coin; the FY2026 interest column ($1.05T) beside defense ($965B,
// shield); a day page and a $2.9B sack; FY2025 ($970B) replaces defense.
// C) why it grows: an old 2% bond is paid by selling a new bond; at 5% the new
// one drips more coins every year (illustrative rates, labelled EXAMPLE).
// ============================================================
import React from 'react'
import { Label } from '../charts'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece } from '../registry'
import { Mini } from '../../rig/Mini'
import { fly, Headline, win } from '../aimoney/common'
import { Bond, BondPile, bump, C, Coin, CoinStack, Column, Defs, OfficeNight, Sack, Shield, Street, Treasury, YearPage , Backdrop } from './kit'

const GROUND = 880
// # tiny holder icons (drawn for this scene): a person, a bank, a pension umbrella, a globe
const Holder: React.FC<{ x: number; y: number; kind: number; o: number; label: string }> = ({ x, y, kind, o, label }) => (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${0.6 + 0.4 * o})`}>
    <circle r={52} fill="#22345A" stroke={C.glow} strokeWidth={4} />
    {kind === 0 && <g><circle cy={-16} r={14} fill={C.glow} /><path d="M-22 26 C-22 4 22 4 22 26 Z" fill={C.glow} /></g>}
    {kind === 1 && <g><path d="M-30 -8 L0 -28 L30 -8 Z" fill={C.glow} />{[-20, 0, 20].map((bx) => <rect key={bx} x={bx - 4} y={-6} width={8} height={26} fill={C.glow} />)}<rect x={-32} y={20} width={64} height={8} fill={C.glow} /></g>}
    {kind === 2 && <g><path d="M-30 0 C-30 -36 30 -36 30 0 Z" fill={C.glow} /><path d="M0 0 L0 26 C0 34 -12 34 -12 26" stroke={C.glow} strokeWidth={5} fill="none" /></g>}
    {kind === 3 && <g><circle r={30} fill="none" stroke={C.glow} strokeWidth={5} /><ellipse rx={14} ry={30} fill="none" stroke={C.glow} strokeWidth={4} /><path d="M-30 0 L30 0" stroke={C.glow} strokeWidth={4} /></g>}
    <Label x={0} y={84} text={label} size={30} font="Bebas Neue" color={C.glow} />
  </g>
)

const Today: React.FC<{ f: number; c: (k: string) => number }> = ({ f, c }) => {
  const today80 = c('s80:today'), october = c('s81:october'), owed81 = c('s81:owed'), d406 = c('s81:406')
  const d327 = c('s82:327'), outside82 = c('s82:outside'), people82 = c('s82:people'), banks82 = c('s82:banks'), pension = c('s82:pension'), countries = c('s82:countries')
  const d79 = c('s83:79'), own83 = c('s83:own'), social = c('s83:social')
  const split = c('s84:split'), evenly = c('s84:evenly'), d118 = c('s84:118800'), person84 = c('s84:person')
  const bond85 = c('s85:bond'), costs85 = c('s85:costs'), interest85 = c('s85:interest')
  const year86 = c('s86:year'), paid86 = c('s86:paid'), minus = c('s86:minus'), earned = c('s86:earned'), d105 = c('s86:105')
  const more87 = c('s87:more'), defense = c('s87:defense'), d965 = c('s87:965')
  const works88 = c('s88:works'), d29 = c('s88:29'), day88 = c('s88:day')
  const earlier = c('s89:earlier'), d970 = c('s89:970')
  const grows90 = c('s90:grows'), grows90b = c('s90:grows#2'), higher90 = c('s90:higher'), rates90 = c('s90:rates')
  const old91 = c('s91:old'), due91 = c('s91:due'), pays91 = c('s91:pays'), selling91 = c('s91:selling'), new91 = c('s91:new')
  const rates92 = c('s92:rates'), higher92 = c('s92:higher'), sold92 = c('s92:sold'), costs92 = c('s92:costs'), every92 = c('s92:every')
  const A = win(f, c('s80') - 20, bond85), B = win(f, bond85, grows90), D = on(f, grows90, 8)
  // # column heights: 12 px per trillion
  const PX = 12.5, sp = easeInOut(span(f, d327, d327 + 20))
  return (
    <g>
      <Defs />
      <Stage id="db-today" frame={f} />
      <Headline f={f} lines={[[today80, 'TODAY', C.glow, 130], [c('s81:2026'), 'OCTOBER 29, 2026', C.glow, 110], [d406, 'OCTOBER 2026: $40.6 TRILLION', C.glow, 96], [d327, 'WHO IS OWED?', P.ink, 110], [split, 'PER PERSON', P.ink, 120],
        [bond85, 'ALL OF IT COSTS INTEREST', P.ink, 104], [year86, 'THE INTEREST BILL', C.coral, 110], [d105, 'FY2026 INTEREST: ≈ $1.05 TRILLION', C.coral, 92], [more87, 'MORE THAN DEFENSE', C.coral, 110], [d29, '≈ $2.9 BILLION A DAY', C.glow, 104], [earlier, 'A YEAR EARLIER', P.ink, 110], [d970, 'A YEAR EARLIER: ≈ $970 BILLION', P.ink, 92],
        [grows90, 'WHY THE BILL GROWS', P.ink, 110], [old91, 'OLD BONDS ARE REPLACED BY NEW ONES', P.ink, 88], [rates92, 'HIGHER RATES = MORE INTEREST', C.coral, 96]]} />

      {/* # A) the $40.6T column, who is owed, per person */}
      {A > 0 && <g opacity={A}>
        <Backdrop kind="night" f={f} />
        <Street y={GROUND} dark />
        <g opacity={1 - on(f, split, 10)}>
          <OfficeNight x={400} y={GROUND} s={0.85 * bump(f, owed81, 0.04) * bump(f, c('s81:us'), 0.05)} f={f} />
          {/* # one column of 40.6T that splits: 32.7T stays, 7.9T slides right */}
          <g transform={`translate(${lerp(0, -80, sp)} 0)`}><Column x={1000} y={GROUND - 10} h={on(f, d406, 24) * lerp(40.6, 32.7, sp) * PX * bump(f, c('s82:outside'), 0.04) * bump(f, c('s82:lenders'), 0.03)} w={220} color="#4A6FA5" /></g>
          <g opacity={on(f, d406, 8) * (1 - on(f, d327, 8))}><Label x={1000} y={GROUND + 64} text="$40.6 TRILLION" size={60} font="Bebas Neue" color={C.glow} /></g>
          <g opacity={on(f, d327, 8)}><Label x={920} y={GROUND + 64} text="$32.7T: OUTSIDE LENDERS" size={48} font="Bebas Neue" color={C.glow} /></g>
          <g opacity={on(f, d327, 6)} transform={`translate(${lerp(1000, 1500, sp)} 0)`}><Column x={0} y={GROUND - 10} h={7.9 * PX * on(f, d327, 6) * bump(f, c('s83:funds'), 0.12) * bump(f, c('s83:owed'), 0.1) * bump(f, c('s83:one'), 0.1)} w={220} color={C.forestL} /></g>
          <g opacity={on(f, d79, 8)}><Label x={1500} y={GROUND + 64} text="$7.9T: ITS OWN FUNDS" size={48} font="Bebas Neue" color={C.glow} /></g>
          <g opacity={on(f, social, 8)}><g transform={`translate(1500 ${GROUND - 10 - 7.9 * PX - 120}) scale(${pop(f, social)})`}><rect x={-120} y={-70} width={240} height={140} rx={16} fill="#2E4066" stroke={C.glow} strokeWidth={4} /><Label x={0} y={-10} text="SOCIAL" size={40} font="Bebas Neue" color={C.glow} /><Label x={0} y={32} text="SECURITY" size={40} font="Bebas Neue" color={C.glow} /></g></g>
          {/* # the holders of the outside part, in a row above its column */}
          {[[people82, 'PEOPLE'], [banks82, 'BANKS'], [pension, 'PENSION FUNDS'], [countries, 'OTHER COUNTRIES']].map(([at, l], k) => <Holder key={k} x={560 + k * 200} y={300} kind={k} o={on(f, at as number, 8) * (1 - on(f, d79, 8))} label={l as string} />)}
        </g>
        {/* # per person: a row of people, one tag */}
        <g opacity={on(f, split, 10)}>{Array.from({ length: 7 }, (_, k) => <g key={k} opacity={on(f, evenly + k * 2, 6)}><Mini look={['hero', 'buyer', 'investor', 'owner', 'worker', 'buyer', 'investor'][k]} x={480 + k * 160} y={GROUND} scale={0.9 * bump(f, c('s84:country') + k, 0.05)} frame={f} seed={k + 90} mood={f >= person84 ? 'sad' : 'neutral'} /></g>)}
          <g opacity={on(f, d118, 8)} transform={`translate(960 ${GROUND - 300}) scale(${pop(f, d118)})`}><rect x={-200} y={-50} width={400} height={96} rx={16} fill={C.parch} stroke={C.goldD} strokeWidth={5} /><Label x={0} y={18} text="≈ $118,800 EACH" size={56} font="Bebas Neue" color={C.brick} /></g></g>
      </g>}

      {/* # B) interest: the bond drips, the FY2026 bill vs defense, per day, a year earlier */}
      {B > 0 && <g opacity={B}>
        <Backdrop kind="night" f={f} />
        <Street y={GROUND} dark />
        <g opacity={1 - on(f, year86, 10)}><Bond x={960} y={500} s={1.75 * pop(f, bond85)} amount="$100" />
          {f >= interest85 && [0, 1].map((k) => { const t0 = interest85 + k * 14, fl = fly(f, t0, [960, 620], [960, 820], 16, -10); return fl.t < 1 ? <Coin key={k} x={fl.x} y={fl.y} r={24} o={fl.o} /> : null })}
          <g opacity={on(f, costs85, 8)}><CoinStack x={960} y={GROUND - 10} n={Math.round(on(f, costs85, 20) * 4)} w={90} /></g></g>
        <g opacity={on(f, year86, 8)}>
          <g opacity={on(f, c('s86:interest'), 8)}><rect x={530} y={GROUND - 14} width={220} height={14} rx={6} fill={C.coral} /></g>
          <Column x={640} y={GROUND - 10} h={on(f, paid86, 24) * 220 + on(f, d105, 20) * 230} w={200} color={C.coral} />
          <g opacity={on(f, d105, 8)}><Label x={640} y={GROUND + 64} text="INTEREST ≈ $1.05T" size={48} font="Bebas Neue" color={C.coral} /></g>
          {/* # paid to others (coins out) minus earned (a few coins back) */}
          {f >= paid86 && f < more87 && [0, 1].map((k) => { const fl = fly(f, paid86 + k * 8, [640, 420], [380, 500], 18, 60); return fl.t < 1 ? <Coin key={k} x={fl.x} y={fl.y} r={20} o={fl.o} /> : null })}
          {f >= earned && f < more87 && (() => { const fl = fly(f, earned, [380, 520], [600, 440], 18, 60); return fl.t < 1 ? <Coin x={fl.x} y={fl.y} r={16} o={fl.o} silver /> : null })()}
          <g opacity={on(f, minus, 8) * (1 - on(f, more87, 8))}><Label x={380} y={620} text="PAID − EARNED" size={40} font="Bebas Neue" color={C.glow} /></g>
        </g>
        <g opacity={on(f, defense, 8) * (1 - on(f, earlier, 8))}><Column x={1000} y={GROUND - 10} h={on(f, d965, 20) * 385 * bump(f, c('s88:works'), 0.04)} w={200} color="#4A6FA5" />
          <Shield x={1000} y={GROUND - 10 - 385 - 150} s={0.8 * pop(f, defense)} />
          <g opacity={on(f, d965, 8)}><Label x={1000} y={GROUND + 64} text="DEFENSE ≈ $965B" size={48} font="Bebas Neue" color={C.glow} /></g></g>
        <g opacity={on(f, d29, 8)}><Sack x={1520} y={GROUND} s={1.1 * pop(f, d29)} label="$2.9B" /><YearPage x={1520} y={480} s={0.75 * pop(f, day88)} year="1 DAY" top="EVERY" o={on(f, day88, 8)} /></g>
        <g opacity={on(f, earlier + 8, 8)}><Column x={1000} y={GROUND - 10} h={on(f, d970, 20) * 388} w={200} color="#C77A6E" />
          <g opacity={on(f, d970, 8)}><Label x={1000} y={GROUND + 64} text="FY2025 ≈ $970B" size={48} font="Bebas Neue" color={C.glow} /></g></g>
      </g>}

      {/* # D) why the bill grows: bigger debt; old bond replaced by a new one at a higher rate */}
      {D > 0 && <g opacity={D}>
        <Backdrop kind="night" f={f} />
        <Street y={GROUND} dark />
        <Treasury x={420} y={GROUND} s={0.72 * bump(f, c('s91:how'), 0.05)} dark door={on(f, pays91, 10)} />
        <g opacity={1 - on(f, old91, 10)}>
          <g transform={`translate(1000 ${GROUND}) scale(${bump(f, grows90b, 0.06)})`}><BondPile x={0} y={0} n={Math.round(lerp(10, 16, on(f, grows90b, 20)))} /></g>
          <g opacity={on(f, rates90, 8)} transform={`translate(1500 ${GROUND - 200}) scale(${pop(f, rates90)})`}><rect x={-30} y={-200} width={60} height={260} rx={30} fill="#22345A" stroke={C.glow} strokeWidth={4} /><rect x={-18} y={-180 + (1 - on(f, rates90, 24)) * 140} width={36} height={220 - (1 - on(f, rates90, 24)) * 140} rx={18} fill={C.coral} />
            <Label x={0} y={120} text="RATES ▲" size={44} font="Bebas Neue" color={C.coral} /></g>
          <g opacity={on(f, higher90, 8)}><Label x={1000} y={GROUND + 64} text="BIGGER DEBT" size={48} font="Bebas Neue" color={C.glow} /></g>
        </g>
        {/* # the old bond comes due and is stamped PAID; a new bond is printed and sold */}
        <g opacity={on(f, old91 + 8, 8)}>
          <Bond x={900} y={520} s={0.95 * pop(f, old91 + 8)} amount="OLD" paid={on(f, pays91, 8)} />
          <g opacity={on(f, due91, 8) * (1 - on(f, pays91, 8))}><Label x={900} y={680} text="DUE TODAY" size={44} font="Bebas Neue" color={C.coral} /></g>
          <g opacity={on(f, new91, 8)}><Bond x={1400} y={520} s={0.95 * pop(f, new91)} amount="NEW" tint="#FFF6E0" /></g>
          {f >= selling91 && f < selling91 + 26 && (() => { const fl = fly(f, selling91, [1400, 600], [600, 640], 22, 100); return <Coin x={fl.x} y={fl.y} r={26} o={fl.o} /> })()}
          {/* # rates on the bonds and the coins each pays per year (EXAMPLE) */}
          <g opacity={on(f, rates92, 8)}><Label x={900} y={420} text="2% (EXAMPLE)" size={44} font="Bebas Neue" color={C.glow} />
            <CoinStack x={900} y={GROUND - 10} n={Math.round(on(f, sold92, 16) * 2)} w={90} /></g>
          <g opacity={on(f, higher92, 8)}><Label x={1400} y={420} text="5% (EXAMPLE)" size={44} font="Bebas Neue" color={C.coral} />
            <CoinStack x={1400} y={GROUND - 10} n={Math.round(on(f, costs92, 16) * 5)} w={90} /></g>
          <g opacity={on(f, every92, 8)}><Label x={1150} y={GROUND + 64} text="INTEREST PER YEAR" size={44} font="Bebas Neue" color={C.glow} /></g>
        </g>
      </g>}
      <Vignette id="db-today" />
    </g>
  )
}

const BEATS = ["s81:october", "s81:owed", "s81:406", "s82:327", "s82:people", "s82:banks", "s82:pension", "s82:countries", "s83:79", "s83:social", "s84:split", "s84:evenly", "s84:118800", "s84:person", "s85:bond", "s85:costs", "s85:interest", "s86:year", "s86:paid", "s86:minus", "s86:earned", "s86:105", "s87:more", "s87:defense", "s87:965", "s88:29", "s88:day", "s89:earlier", "s89:970", "s90:grows", "s90:grows#2", "s90:higher", "s90:rates", "s91:old", "s91:due", "s91:pays", "s91:selling", "s91:new", "s92:rates", "s92:higher", "s92:sold", "s92:costs", "s92:every", "s80", "s81:us", "s82:outside", "s82:lenders", "s83:funds", "s83:owed", "s83:one", "s84:country", "s86:interest", "s88:works", "s91:how"]
export const DB_TODAY = makePiece('db-today', 'Debt 1835 ch6 (night): night office and $40.6T column splitting into $32.7T outside lenders (people, banks, pension funds, other countries icons) and $7.9T own funds (Social Security); seven people, ≈$118,800 each; $100 bond drips interest; FY2026 interest column ≈$1.05T (paid − earned) vs defense ≈$965B (shield); $2.9B a day sack; FY2025 ≈$970B; bigger debt + rates thermometer; old bond paid by selling a new one; 2% vs 5% example coin stacks per year', {
  mood: 'dark', Component: Today, beats: BEATS,
  sfx: [['s81:406', 'whoosh', 0.2], ['s84:118800', 'pop', 0.2], ['s87:defense', 'thud', 0.2], ['s91:selling', 'coin', 0.2]],
})
