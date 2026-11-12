// ---------------------------------------------------------------- s10–s21: step one, the fund.
// A) The firm's tower on the left; an empty FUND vault appears in the middle; three big investors walk in on the right
//    and sign promises; ten calendar pages = a fund that lasts about ten years.
// B) Who they are: six pedestals fill one by one (school = teachers' pensions, fire helmet, umbrella = insurers,
//    university, family house, globe = countries). Then four coin stacks: one in four is pension money.
// C) The two partners: limited partners (left) bring the money but a cross stops them picking; the general partner
//    (right) picks a company card and shakes on the deal; the vault fills, he adds a thin 1–5% slice; the money only
//    flows when a company is found.
// D) A giant business: rows of fund vaults (≈ 25,000), a money mountain (more than $7 trillion); they buy companies.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette, Pedestal } from '../kit'
import { Spot } from '../bank/kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win, fly, Coin, Doc, type Beat } from '../aimoney/common'
import { Ground, CoinColumn, Office, Factory } from '../power/kit2'
import { NoMark } from '../bank/kit'
import { EQ, EQ_D, FirmHQ, FundVault, InvIcon, MiniShop, PriceTag, YearStrip, type Inv } from './kit'

const GROUND = 930

// # a company card on the general partner's board (a small picture of the business)
const CompanyCard: React.FC<{ x: number; y: number; kind: 0 | 1 | 2; o?: number; lit?: number; s?: number }> = ({ x, y, kind, o = 1, lit = 0, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-110} y={-80} width={220} height={160} rx={16} fill="var(--cc-paper, #FFFFFF)" stroke={lit > 0 ? P.gold : '#CDB58C'} strokeWidth={lit > 0 ? 8 : 3} />
    <g transform="translate(0 60) scale(0.62)">{kind === 0 ? <MiniShop x={0} y={0} s={1.1} /> : kind === 1 ? <Factory x={0} y={0} s={0.55} /> : <Office x={0} y={0} s={0.42} />}</g>
  </g>
)

const Fund: React.FC<PieceProps> = ({ f, c }) => {
  const private10 = c('s10:private'), raises = c('s10:raises'), fund10 = c('s10:fund')
  const big11 = c('s11:big'), investors11 = c('s11:investors'), promise = c('s11:promise'), money11 = c('s11:money'), lasts = c('s11:lasts'), ten11 = c('s11:ten'), years11 = c('s11:years')
  const who12 = c('s12:who'), pension12 = c('s12:pension'), teachers = c('s12:teachers'), firefighters = c('s12:firefighters')
  const insurance = c('s13:insurance'), university = c('s13:university'), wealthy = c('s13:wealthy'), countries = c('s13:countries')
  const biggest14 = c('s14:biggest'), one14 = c('s14:one'), four14 = c('s14:four'), pension14 = c('s14:pension')
  const limited = c('s15:limited'), most15 = c('s15:most'), dont15 = c("s15:don't"), pick15 = c('s15:pick')
  const general = c('s16:general'), picks16 = c('s16:picks'), runs = c('s16:runs'), deals16 = c('s16:deals')
  const small17 = c('s17:small'), slice = c('s17:slice'), p1 = c('s17:1'), p5 = c('s17:5')
  const doesnt18 = c("s18:doesn't"), once = c('s18:once'), send = c('s18:send'), finds = c('s18:finds'), company18 = c('s18:company'), buy18 = c('s18:buy')
  const today = c('s19:today'), giant = c('s19:giant'), business19 = c('s19:business')
  const reporting = c('s20:reporting'), k25 = c('s20:25000'), trillion = c('s20:trillion')
  const what21 = c('s21:what'), buys21 = c('s21:buys'), whole21 = c('s21:whole'), companies21 = c('s21:companies')

  const AB = who12 - 8, BC = limited - 8, CD = today - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), Cw = win(f, BC, CD), D = on(f, CD, 10)

  // # C) the vault fills from the LPs on "most of the money", empties on "doesn't arrive all at once", refills when a company is found
  const vFill = 0.85 * on(f, most15, 30) + 0.08 * on(f, slice, 14) - 0.93 * on(f, doesnt18, 14) + 0.6 * on(f, finds, 30)

  const signer: Beat[] = [[0, 'idle', 'neutral'], [big11, 'present', 'smiling'], [promise, 'signA', 'smiling', 'signB', 12], [lasts, 'idle', 'smiling']]
  const gp: Beat[] = [[BC, 'idle', 'neutral'], [general, 'present', 'smiling'], [picks16, 'point', 'thinking'], [runs, 'handshake', 'smiling'], [small17, 'idle', 'neutral'], [slice, 'offer', 'smiling'], [doesnt18, 'explain', 'neutral'], [finds, 'pointUp', 'smiling']]
  const lp: Beat[] = [[BC, 'idle', 'neutral'], [limited, 'present', 'smiling'], [most15, 'offer', 'smiling'], [pick15, 'point', 'neutral'], [pick15 + 18, 'shrug', 'neutral'], [general, 'idle', 'neutral'], [send, 'offer', 'smiling']]

  const pedestals: [Inv, number, string][] = [['pension', pension12, 'PENSIONS'], ['fire', firefighters, 'FIREFIGHTERS'], ['insure', insurance, 'INSURERS'], ['uni', university, 'UNIVERSITIES'], ['family', wealthy, 'FAMILIES'], ['country', c('s13:funds'), 'COUNTRIES']]

  return (
    <g>
      <Stage id="pe-fund" frame={f} />
      <Headline f={f} lines={[[raises, 'A FIRM RAISES A FUND', P.ink, 104], [ten11, '≈ 10 YEARS', P.ink, 110], [who12, 'WHO PUTS IN THE MONEY?', P.ink, 104], [one14, '≈ 1 IN 4 DOLLARS: PENSIONS', P.ink, 98], [limited, 'LIMITED PARTNERS', P.ink, 104], [general, 'GENERAL PARTNER', P.ink, 104], [doesnt18, 'MONEY ARRIVES DEAL BY DEAL', P.ink, 98], [giant, 'A GIANT BUSINESS', P.ink, 106], [what21, 'IT BUYS WHOLE COMPANIES', P.ink, 104]]} />
      <Ground y={GROUND} />

      {/* # A) firm, empty fund, investors promising money for about ten years */}
      {A > 0 && <g opacity={A}>
        <g transform={`translate(0 ${30 * (1 - on(f, private10, 14))})`} opacity={on(f, private10, 10)}><FirmHQ x={330} y={GROUND} s={0.92} /></g>
        <g opacity={on(f, fund10, 10)} transform={`translate(0 ${-10 * pop(f, fund10, 12)})`}><FundVault x={900} y={GROUND} s={0.95} fill={0.25 * on(f, money11, 20)} /></g>
        {/* coins from the firm's door to the vault on "raises" */}
        {[0, 1, 2].map((k) => { const fl = fly(f, money11 + k * 6, [1440 + k * 150, 640], [900, 560], 18, 120); return fl.t > 0 && fl.t < 1 ? <Coin key={k} x={fl.x} y={fl.y} s={0.7} /> : null })}
        {(['investor', 'investorF', 'owner'] as const).map((who, k) => (
          <g key={who} opacity={on(f, big11 + k * 5, 8)} transform={`translate(${40 * (1 - on(f, big11 + k * 5, 14))} 0)`}>
            <Person f={f} who={who} beats={signer} x={1380 + k * 170} y={GROUND} s={0.86} />
            <g opacity={on(f, promise + k * 4, 8)}><Doc x={1380 + k * 170 + 70} y={770} s={0.3} title="PROMISE" /></g>
          </g>))}
        <g opacity={on(f, ten11, 6)}><YearStrip x={900} y={300} n={10} shown={lerp(0, 10, span(f, ten11, years11 + 14))} gap={74} label={(i) => `Y${i + 1}`} /></g>
      </g>}

      {/* # B) who the investors are, then one dollar in four */}
      {B > 0 && <g opacity={B}>
        {pedestals.map(([kind, at, name], k) => {
          const x = 250 + k * 284, leave = on(f, biggest14, 14)
          return <g key={kind}>
            <g opacity={on(f, who12 + k * 3, 8) * (1 - leave)}><Pedestal x={x} y={760} r={110} color={P.navy4} /></g>
            <g opacity={on(f, at, 8) * (1 - leave)} transform={`translate(0 ${18 * (1 - pop(f, at, 12)) + 60 * leave})`}>
            <InvIcon kind={kind} x={x} y={740} s={1.45} />
            <Label x={x} y={880} text={name} size={44} font="Bebas Neue" color={P.ink} />
            {kind === 'pension' && <g opacity={on(f, teachers, 8)}><Label x={x} y={500} text="TEACHERS" size={44} font="Bebas Neue" color={P.coralInk} /></g>}
          </g></g>
        })}
        {/* the four coin stacks, one of them pension money */}
        <g opacity={on(f, one14, 10)}>
          {[0, 1, 2, 3].map((k) => { const lit = k === 0 ? on(f, pension14, 10) : 0
            return <g key={k} transform={`translate(0 ${-30 * lit})`}>
              <CoinColumn x={560 + k * 270} y={GROUND - 30} h={lerp(0, 260, on(f, one14 + k * 3, 16))} w={170} color={k === 0 ? EQ : '#C9B79A'} />
              {k === 0 && <g opacity={lit}><InvIcon kind="pension" x={560} y={GROUND - 330} s={1.0} /><Label x={560} y={GROUND + 60} text="PENSION PLANS" size={46} font="Bebas Neue" color={P.goldInk} /></g>}
            </g> })}
          <g opacity={on(f, four14, 8)}><Label x={1100} y={GROUND + 60} text="EVERYONE ELSE" size={46} font="Bebas Neue" color={P.ink2} /></g>
        </g>
      </g>}

      {/* # C) limited partners, the general partner, the vault, the company cards */}
      {Cw > 0 && <g opacity={Cw}>
        <FundVault x={900} y={GROUND} s={0.82} fill={Math.max(0, vFill)} />
        {/* the GP's thin slice on top of the vault, labelled */}
        {(() => { const fl = fly(f, slice, [1290, 640], [900, 590], 18, 120); return fl.t > 0 && fl.t < 1 ? <Coin x={fl.x} y={fl.y} s={0.6} /> : null })()}
        <g opacity={win(f, slice + 12, doesnt18, 8)}><Label x={900} y={560} text={f >= p5 ? 'FIRM: 1–5%' : f >= p1 ? 'FIRM: 1…' : 'FIRM'} size={50} font="Bebas Neue" color={P.goldInk} /></g>
        {/* LPs */}
        {(['investorF', 'investor'] as const).map((who, k) => <Person key={who} f={f} who={who} beats={lp} x={240 + k * 190} y={GROUND} s={0.88} />)}
        <g opacity={on(f, limited, 8)}><Label x={335} y={1010} text="LIMITED PARTNERS" size={46} font="Bebas Neue" color={P.ink} /></g>
        {/* the LPs' money pours in (most of it) and later only when a company is found */}
        {[0, 1, 2, 3].map((k) => { const fl = fly(f, most15 + k * 5, [380, 600], [900, 580], 18, 140); return fl.t > 0 && fl.t < 1 ? <Coin key={k} x={fl.x} y={fl.y} s={0.75} /> : null })}
        {[0, 1, 2].map((k) => { const fl = fly(f, buy18 + k * 5, [380, 600], [900, 580], 18, 140); return fl.t > 0 && fl.t < 1 ? <Coin key={`b${k}`} x={fl.x} y={fl.y} s={0.75} /> : null })}
        {/* "they don't pick what to buy": the LP reaches for a card, then a clean cross */}
        <g opacity={win(f, pick15 - 4, general, 8)}><CompanyCard x={620} y={420} kind={0} s={0.9} /><NoMark x={620} y={420} o={on(f, pick15 + 6, 8)} r={70} /></g>
        {/* GP + his board of company cards */}
        <g opacity={on(f, general, 8)}>
          <Person f={f} who="hero" beats={gp} x={1360} y={GROUND} s={0.95} />
          <Label x={1360} y={1010} text="GENERAL PARTNER" size={46} font="Bebas Neue" color={P.ink} />
          {[0, 1, 2].map((k) => { const lit = k === 1 ? win(f, picks16, small17, 6) + on(f, company18, 8) : 0
            return <CompanyCard key={k} x={1700} y={340 + k * 210} kind={k as 0 | 1 | 2} lit={lit} s={0.9 + 0.08 * lit} o={on(f, picks16 - 6 + k * 3, 8)} /> })}
          <g opacity={on(f, buy18, 8)}><PriceTag x={1580} y={560} t="BUY" s={0.8} w={180} /></g>
        </g>
        {/* "doesn't arrive all at once": dashed promised level stays, the gold drains */}
        <g opacity={win(f, doesnt18, finds, 8)}><rect x={900 - 156} y={GROUND - 270} width={312} height={6} rx={3} fill={P.goldInk} opacity={0.7} /><Label x={900} y={GROUND - 290} text="PROMISED" size={44} font="Bebas Neue" color={P.goldInk} /></g>
      </g>}

      {/* # D) a giant business */}
      {D > 0 && <g opacity={D}>
        {/* the money mountain behind */}
        <g opacity={on(f, trillion, 12)}><path d={`M300 ${GROUND} Q960 ${GROUND - 560 * on(f, trillion, 30)} 1620 ${GROUND} Z`} fill={EQ} stroke={EQ_D} strokeWidth={6} opacity={0.9} /></g>
        {/* rows of fund vaults */}
        {Array.from({ length: 21 }, (_, k) => { const r = Math.floor(k / 7), col = k % 7, at = giant + k * 2
          const leave = on(f, what21, 14)
          return <g key={k} opacity={on(f, at, 8) * (1 - leave) * (k === 10 ? 1 : 1 - 0.4 * on(f, trillion, 12))}><FundVault x={330 + col * 210} y={480 + r * 190} s={0.32} fill={0.6} label="FUND" /></g> })}
        <g opacity={win(f, k25, what21, 8)}><rect x={760} y={210} width={400} height={92} rx={18} fill={P.card} /><Label x={960} y={276} text={f >= trillion ? '$7 TRILLION+' : '≈ 25,000 FUNDS'} size={64} font="Bebas Neue" color={P.goldInk} /></g>
        <g opacity={win(f, reporting, k25, 8)}><Label x={960} y={276} text="REPORTED TO US REGULATORS" size={54} font="Bebas Neue" color={P.ink} /></g>
        {/* companies bought */}
        {[0, 1, 2].map((k) => { const at = buys21 + k * 6, x = 480 + k * 480
          return <g key={k} opacity={on(f, at, 8)} transform={`translate(0 ${20 * (1 - pop(f, at, 12))})`}>
            {k === 0 ? <MiniShop x={x} y={GROUND} s={2.0} /> : k === 1 ? <Factory x={x} y={GROUND} s={1.1} /> : <Office x={x} y={GROUND} s={0.95} />}
            <g opacity={on(f, whole21 + k * 6, 8)}><PriceTag x={x + 20} y={GROUND - 480} t="SOLD" s={0.9} w={190} r={-8} /></g>
          </g> })}
      </g>}
      {/* # spots:begin */}
      <g>
        <Spot f={f} at={c("s11:asks")} x={1550} y={720} rx={230} ry={220} />
        <Spot f={f} at={c("s11:each")} x={1550} y={720} rx={230} ry={220} />
        <Spot f={f} at={c("s12:these")} x={960} y={700} rx={220} ry={160} />
        <Spot f={f} at={c("s13:investment")} x={1670} y={740} rx={140} ry={130} />
        <Spot f={f} at={c("s14:private")} x={960} y={760} rx={220} ry={160} />
        <Spot f={f} at={c("s15:called")} x={335} y={720} rx={200} ry={220} />
        <Spot f={f} at={c("s16:called")} x={1360} y={720} rx={160} ry={220} />
        <Spot f={f} at={c("s17:usually")} x={1360} y={720} rx={160} ry={220} />
        <Spot f={f} at={c("s17:puts")} x={900} y={780} rx={200} ry={160} />
        <Spot f={f} at={c("s18:share")} x={335} y={720} rx={200} ry={220} />
        <Spot f={f} at={c("s18:when")} x={1700} y={550} rx={150} ry={200} />
        <Spot f={f} at={c("s19:this")} x={960} y={620} rx={230} ry={200} />
        <Spot f={f} at={c("s20:number")} x={960} y={620} rx={230} ry={200} />
        <Spot f={f} at={c("s20:dollars")} x={960} y={800} rx={230} ry={140} />
        <Spot f={f} at={c("s21:does")} x={960} y={800} rx={230} ry={140} />
        <Spot f={f} at={c("s21:money")} x={960} y={800} rx={230} ry={140} />
      </g>
      {/* # spots:end */}
      <Vignette id="pe-fund" />
    </g>
  )
}

export const PE_FUND = makePiece('pe-fund', 'Step one, the fund: the firm tower and an empty FUND vault; three investors sign promises; ten calendar years; six pedestals of investor types (school for teachers\' pensions, fire helmet, umbrella insurers, university, family house, globe countries); four coin stacks, one in four is pension money; limited partners pour money in but a cross stops them picking; the general partner picks a company card, shakes on deals, adds a thin 1–5% slice; the vault drains to a PROMISED line and fills only when a company is found; rows of fund vaults (≈25,000), a $7 trillion+ money mountain; a shop, factory and office each get a SOLD tag', {
  mood: 'light', Component: Fund,
  beats: ["s10:private", "s10:raises", "s10:fund", "s11:big", "s11:promise", "s11:money", "s11:lasts", "s11:ten", "s11:years", "s12:who", "s12:pension", "s12:teachers", "s12:firefighters", "s13:insurance", "s13:university", "s13:wealthy", "s13:countries", "s14:biggest", "s14:one", "s14:four", "s14:pension", "s15:limited", "s15:most", "s15:pick", "s16:general", "s16:picks", "s16:runs", "s17:small", "s17:slice", "s17:1", "s17:5", "s18:doesn't", "s18:once", "s18:send", "s18:finds", "s18:company", "s18:buy", "s19:today", "s19:giant", "s20:reporting", "s20:25000", "s20:trillion", "s21:what", "s21:buys", "s21:whole", "s13:funds", "s11:asks", "s11:each", "s12:these", "s13:investment", "s14:private", "s15:called", "s16:called", "s17:usually", "s17:puts", "s18:share", "s18:when", "s19:this", "s20:number", "s20:dollars", "s21:does", "s21:money"],
  sfx: [['s10:fund', 'pop', 0.2], ['s11:promise', 'click', 0.2], ['s14:pension', 'coin', 0.2], ['s15:pick', 'thud', 0.15], ['s17:slice', 'coin', 0.2], ['s20:trillion', 'riser', 0.15], ['s21:buys', 'pop', 0.2]] })
