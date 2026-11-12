// ---------------------------------------------------------------- s1–s9: the hook.
// A) Night street: the Hilton tower on the right; a Blackstone dealmaker on the left hands over the price — a
//    $26 BILLION tag swings onto the hotel. Eleven calendar pages flip by; a gold column of profit rises ($14B).
// B) The $26 billion becomes one tall column; it splits: a small gold part (funds + partners ≈ $6.5B) and a big
//    blue part (BORROWED). The dealmaker waves "no" (not his money); the blue part's chain locks onto Hilton itself.
// C) The hotel slides left; a toy store rises on the right with the same lock. BANKRUPT. Opposite endings: the hotel
//    glows with a green arrow, the store goes dark with a red one. Then four step badges.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { Spot } from '../bank/kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win, Tick, Stamp, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { NoMark, StepBadge, Street } from '../bank/kit'
import { CoinColumn } from '../power/kit2'
import { Chain, DEBT, DEBT_D, EQ, EQ_D, Envelope, FundVault, Hotel, Lock, MiniShop, MoneyColumn, PriceTag, ToyStore, YearStrip } from './kit'

const GROUND = 930

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const y2007 = c('s1:2007'), firm1 = c('s1:firm'), blackstone1 = c('s1:blackstone'), bought = c('s1:bought'), hilton1 = c('s1:hilton'), d26 = c('s1:26'), billion1 = c('s1:billion')
  const eleven = c('s2:eleven'), later = c('s2:later'), sold2 = c('s2:sold'), shares2 = c('s2:shares'), made2 = c('s2:made'), d14 = c('s2:14'), profit2 = c('s2:profit')
  const strange = c('s3:strange'), most3 = c('s3:most'), d26b = c('s3:26'), not3 = c('s3:not'), money3 = c('s3:money')
  const only4 = c('s4:only'), d65 = c('s4:65'), funds4 = c('s4:funds'), partners4 = c('s4:partners'), rest4 = c('s4:rest'), borrowed4 = c('s4:borrowed')
  const loan5 = c('s5:loan'), not5 = c('s5:not'), blackstone5 = c('s5:blackstone'), put5b = c('s5:put#2'), hilton5 = c('s5:hilton'), itself5 = c('s5:itself')
  const two6 = c('s6:two'), three6 = c('s6:three'), firms6 = c('s6:firms'), move6 = c('s6:move'), buy6 = c('s6:buy'), toys6 = c('s6:toys')
  const deal7 = c('s7:deal'), bankruptcy = c('s7:bankruptcy')
  const same8 = c('s8:same'), playbook = c('s8:playbook'), opposite = c('s8:opposite'), endings = c('s8:endings'), how8 = c('s8:how'), equity8 = c('s8:equity'), who8 = c('s8:who'), paid8 = c('s8:paid'), right8 = c('s8:right'), wrong8 = c('s8:wrong')
  const walk9 = c("s9:let's"), four9 = c('s9:four'), simple9 = c('s9:simple'), steps9 = c('s9:steps')

  const AB = strange - 8, BC = two6 - 10, CD = walk9 - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), Cw = win(f, BC, CD), D = on(f, CD, 10)

  // # the dealmaker (A + B): hands over the price, celebrates the profit, then waves "no"
  const dealer: Beat[] = [[0, 'idle', 'neutral'], [firm1, 'present', 'neutral'], [bought, 'offer', 'smiling'], [eleven, 'idle', 'neutral'], [d14, 'celebrate', 'smiling'], [AB, 'idle', 'neutral'], [most3, 'holdChest', 'smug'], [not3, 'crossNoA', 'neutral', 'crossNoB', 10], [only4, 'point', 'neutral'], [borrowed4, 'present', 'neutral'], [not5, 'crossNoA', 'neutral', 'crossNoB', 10], [hilton5, 'point', 'smug']]

  // # the money column (B): 26 units, then split into 6.5 equity + 19.5 borrowed
  const split = on(f, d65, 16)
  const U = 17

  return (
    <g>
      <Stage id="pe-hook" frame={f} />
      <Headline f={f} lines={[[y2007, '2007', P.ink, 110], [bought, 'BLACKSTONE BUYS HILTON', P.ink, 100], [eleven, 'ELEVEN YEARS LATER…', P.ink, 100], [strange, 'WHOSE MONEY WAS IT?', P.ink, 104], [loan5, 'WHO OWES THE LOAN?', P.ink, 104], [two6, 'SAME MOVE: TOYS R US', P.ink, 100], [opposite, 'OPPOSITE ENDINGS', P.ink, 104], [how8, 'HOW DOES PRIVATE EQUITY WORK?', P.ink, 96], [four9, '4 SIMPLE STEPS', P.ink, 110]]} />

      {/* # A + B share the street and the hotel */}
      {(A > 0 || B > 0) && <g opacity={Math.max(A, B)}>
        <Street f={f} ground={GROUND} trees={[1840]} lamps={[1080]} o={0.7} />
        <Ground y={GROUND} dark />
        <g transform={`translate(${lerp(1500, 1520, B)} 0)`}><Hotel x={0} y={GROUND} s={0.86} lit={0.6 + 0.4 * on(f, hilton1, 14)} /></g>
        <Person f={f} who="investor" beats={dealer} x={300} y={GROUND} s={1.08} />
        <g opacity={on(f, blackstone1, 8) * (1 - on(f, bought, 8))}><Label x={300} y={1010} text="BLACKSTONE" size={46} font="Bebas Neue" color={P.ink} /></g>
      </g>}

      {/* # A) the price tag swings onto the hotel; eleven years; the profit column */}
      {A > 0 && <g opacity={A}>
        {/* the tag travels from the dealer's hand to hang on the hotel's left side */}
        {(() => { const t = on(f, bought, 20), x = lerp(470, 1110, t), y = lerp(640, 560, t) - Math.sin(t * Math.PI) * 120
          return <g opacity={on(f, bought, 6) * (1 - on(f, eleven, 10))}><PriceTag x={x} y={y} t={f >= d26 ? (f >= billion1 ? '$26 BILLION' : '$26…') : 'SOLD'} r={-6 + 4 * Math.sin(f / 14)} w={300} /></g> })()}
        <g opacity={on(f, eleven, 6) * (1 - on(f, made2, 10))}><YearStrip x={860} y={330} n={11} shown={lerp(0, 11, span(f, eleven, later + 12))} label={(i) => String(2008 + i).slice(2)} gap={66} /></g>
        <g opacity={on(f, sold2, 8) * (1 - on(f, made2, 8))}>{[0, 1, 2].map((k) => { const t = span(f, sold2 + k * 5, sold2 + k * 5 + 18); return t > 0 && t < 1 ? <g key={k} transform={`translate(${lerp(1360, 1000, t)} ${lerp(700, 640, t) - Math.sin(t * Math.PI) * 80})`}><rect x={-46} y={-30} width={92} height={60} rx={6} fill="#FFFDF5" stroke="#CDB58C" strokeWidth={3} /><Label x={0} y={14} text="SHARE" size={30} font="Bebas Neue" color="#2E5C9A" /></g> : null })}</g>
        <g opacity={on(f, made2, 8)}>
          <CoinColumn x={760} y={GROUND - 10} h={lerp(0, 360, on(f, made2, 30))} w={170} />
          <g opacity={on(f, d14, 8)} transform={`translate(760 ${GROUND - 420 - 12 * pop(f, d14, 12)})`}><rect x={-190} y={-50} width={380} height={96} rx={18} fill={P.card} /><Label x={0} y={18} text={f >= profit2 ? '≈ $14B PROFIT' : '≈ $14B'} size={60} font="Bebas Neue" color={P.goldInk} /></g>
        </g>
      </g>}

      {/* # B) one column of $26 billion splits into what was invested and what was borrowed; the loan is locked onto Hilton */}
      {B > 0 && <g opacity={B}>
        <g opacity={on(f, d26b, 10)}>
          <MoneyColumn x={820} y={GROUND - 20} w={230} unit={U} grow={on(f, d26b, 20)} labelSide="in" size={50}
            segs={[{ v: 6.5, col: EQ, colD: EQ_D, dx: -200 * split, label: f >= d65 ? '≈ $6.5B' : '', lo: on(f, d65, 8) },
              { v: 19.5, col: DEBT, colD: DEBT_D, dx: 230 * split, dy: 6.5 * U * on(f, rest4, 16), label: f >= borrowed4 ? 'BORROWED' : '', lo: on(f, borrowed4, 8) }]} />
          <g opacity={(1 - split)}><Label x={820} y={GROUND - 26 * U - 60} text="$26 BILLION" size={60} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, funds4, 8)}><Label x={620} y={GROUND - 6.5 * U - 70} text={f >= partners4 ? 'FUNDS + PARTNERS' : 'FUNDS'} size={46} font="Bebas Neue" color={P.goldInk} /></g>
        </g>
        {/* "not put on Blackstone": a short dashed chain towards the dealer, crossed out */}
        <g opacity={win(f, not5, put5b, 8)}>
          <path d="M935 600 Q700 520 460 560" fill="none" stroke="#8A97AA" strokeWidth={6} strokeDasharray="14 12" />
          <NoMark x={690} y={540} o={on(f, blackstone5, 8)} r={56} />
        </g>
        {/* "put on Hilton itself": the chain runs from the blue part to the hotel and a lock snaps shut */}
        <Chain a={[1165, 640]} b={[1365, 640]} t={on(f, put5b, 16)} o={on(f, put5b, 4)} />
        <g opacity={on(f, hilton5, 6)} transform={`translate(0 ${-14 * pop(f, hilton5, 12)})`}><Lock x={1380} y={630} s={1.15} /></g>
        <g opacity={on(f, itself5, 8)}><Label x={1520} y={1020} text="HILTON OWES IT" size={46} font="Bebas Neue" color={P.coralInk} /></g>
      </g>}

      {/* # C) two deals side by side: Hilton and Toys R Us */}
      {Cw > 0 && <g opacity={Cw}>
        <Ground y={GROUND} dark />
        {(() => { const up = on(f, opposite, 14), dn = on(f, bankruptcy, 14)
          return <>
            <g transform={`translate(470 ${-20 * up})`}><Hotel x={0} y={GROUND + 20 * up} s={0.9} lit={0.6 + 0.4 * up} /></g>
            <g opacity={on(f, toys6, 10)} transform={`translate(1360 ${GROUND + 40 * (1 - on(f, toys6, 14))})`}><ToyStore x={0} y={0} s={0.92} dark={dn} f={f} /></g>
            {/* the three firms (small figures) walk in on "three firms" */}
            {[0, 1, 2].map((k) => { const who = ['owner', 'buyer', 'investorF'][k]
              return <g key={k} opacity={on(f, three6 + k * 4, 8) * (1 - on(f, deal7, 10))}><Person f={f} who={who} beats={[[0, 'idle', 'neutral'], [firms6, 'present', 'smiling'], [buy6, 'point', 'smiling']]} x={720 + k * 95} y={GROUND} s={0.56} /></g> })}
            {/* the same lock hangs on both */}
            <g opacity={1}><Lock x={275} y={740} s={0.9} /><Chain a={[300, 740]} b={[330, 740]} t={1} /></g>
            <g opacity={on(f, toys6 + 4, 8)} transform={`translate(0 ${-14 * pop(f, toys6 + 4, 12)})`}><Lock x={1755} y={740} s={0.9} /></g>
            <Stamp x={1360} y={800} text="BANKRUPT" f={f} at={bankruptcy} size={84} />
            {/* opposite endings: arrows */}
            <g opacity={up}><path d={`M300 ${520 - 40 * up} l0 -120 l-40 40 M300 ${400 - 40 * up} l40 40`} stroke="#3DDC97" strokeWidth={18} fill="none" strokeLinecap="round" /></g>
            <g opacity={on(f, endings, 12)}><path d={`M1730 ${380 + 30 * on(f, endings, 14)} l0 120 l-40 -40 M1730 ${500 + 30 * on(f, endings, 14)} l40 -40`} stroke="#F06B5B" strokeWidth={18} fill="none" strokeLinecap="round" /></g>
            {/* "who gets paid when it goes right, or wrong" */}
            <Tick x={470} y={250} o={on(f, right8, 8)} r={46} />
            <Tick x={1360} y={420} o={on(f, wrong8, 8)} r={46} ok={false} />
            <g opacity={win(f, who8, walk9, 8)}>{[0, 1, 2].map((k) => <g key={k} transform={`translate(${860 + (k - 1) * 70} ${420 - 18 * pop(f, paid8 + k * 3, 12)})`}><circle r={30} fill={P.gold} stroke={P.goldD} strokeWidth={4} /><Label x={0} y={14} text="$" size={38} font="Bebas Neue" color="#16294A" /></g>)}
              <Label x={860} y={520} text="WHO GETS PAID?" size={52} font="Bebas Neue" color={P.goldInk} /></g>
            <g opacity={win(f, equity8, who8, 8)}><Label x={860} y={520} text="?" size={160} font="Bebas Neue" color={P.goldInk} /></g>
          </> })()}
      </g>}

      {/* # D) the four steps, each with its own small picture */}
      {D > 0 && <g opacity={D}>
        <Ground y={GROUND} dark />
        {([[four9, 1, 'THE FUND'], [four9 + 5, 2, 'THE BUYOUT'], [simple9, 3, 'GROW + SELL'], [steps9, 4, 'GET PAID']] as [number, number, string][]).map(([at, n, t], k) => (
          <g key={n} opacity={on(f, at, 8)} transform={`translate(0 ${16 * (1 - pop(f, at, 12))})`}>
            <StepBadge x={330 + k * 420} y={720} n={n} t={t} lit={win(f, at, at + 24, 6)}>
              {n === 1 && <FundVault x={0} y={60} s={0.78} fill={0.6} label="FUND" />}
              {n === 2 && <g><MiniShop x={-30} y={60} s={1.5} /><Lock x={120} y={-20} s={1.1} /></g>}
              {n === 3 && <g><MiniShop x={-80} y={60} s={1.0} /><MiniShop x={80} y={60} s={1.3} /></g>}
              {n === 4 && <g><Envelope x={-50} y={-10} s={1.4} t="" /><g transform="translate(100 10)"><circle r={50} fill={P.gold} stroke={P.goldD} strokeWidth={4} /></g></g>}
            </StepBadge>
          </g>))}
      </g>}
      {/* # spots:begin */}
      <g>
        <Spot f={f} at={c("s2:years")} x={860} y={330} rx={330} ry={70} />
        <Spot f={f} at={c("s3:money")} x={820} y={700} rx={170} ry={260} />
        <Spot f={f} at={c("s3:all")} x={820} y={700} rx={170} ry={260} />
        <Spot f={f} at={c("s6:years")} x={470} y={640} rx={160} ry={280} />
        <Spot f={f} at={c("s6:hilton")} x={470} y={640} rx={160} ry={280} />
        <Spot f={f} at={c("s6:used")} x={820} y={820} rx={160} ry={140} />
        <Spot f={f} at={c("s6:same")} x={820} y={820} rx={160} ry={140} />
        <Spot f={f} at={c("s8:so")} x={860} y={520} rx={150} ry={120} />
      </g>
      {/* # spots:end */}
      <Vignette id="pe-hook" />
    </g>
  )
}

export const PE_HOOK = makePiece('pe-hook', 'Private equity hook: Blackstone buys the Hilton tower for $26 billion (a tag swings onto it), eleven calendar years flip, a $14B profit column rises; the $26B column splits into ≈$6.5B of funds and partners and a big BORROWED part, the dealmaker waves no, the borrowed part is chained and locked onto Hilton; Toys R Us gets the same lock and a BANKRUPT stamp; opposite endings (green arrow, red arrow), who gets paid; four step badges with pictures', {
  mood: 'dark', Component: Hook,
  beats: ["s1:firm", "s1:blackstone", "s1:bought", "s1:hilton", "s1:26", "s1:billion", "s2:eleven", "s2:later", "s2:sold", "s2:made", "s2:14", "s2:profit", "s3:strange", "s3:most", "s3:26", "s3:not", "s4:only", "s4:65", "s4:funds", "s4:partners", "s4:rest", "s4:borrowed", "s5:not", "s5:blackstone", "s5:put#2", "s5:hilton", "s5:itself", "s6:two", "s6:three", "s6:firms", "s6:buy", "s6:toys", "s7:deal", "s7:bankruptcy", "s8:playbook", "s8:opposite", "s8:endings", "s8:equity", "s8:who", "s8:paid", "s8:right", "s8:wrong", "s9:let's", "s9:four", "s9:simple", "s9:steps", "s2:years", "s3:money", "s3:all", "s6:years", "s6:hilton", "s6:used", "s6:same", "s8:so"],
  sfx: [['s1:bought', 'swish', 0.2], ['s2:14', 'coin', 0.25], ['s4:65', 'whoosh', 0.2], ['s5:hilton', 'click', 0.3], ['s7:bankruptcy', 'thud', 0.3], ['s9:four', 'pop', 0.2]] })
