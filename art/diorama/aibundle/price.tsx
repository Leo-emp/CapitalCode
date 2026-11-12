// ---------------------------------------------------------------- s6–s20: twelve years, one price.
// A) The box lights its four apps as they are named; Nina at her desk writes a letter and keeps a budget.
// B) Two plan cards: Personal (one person, $69.99) and Family (six people, $99.99).
// C) Twelve gold year-blocks at the same height (an up-arrow is crossed out: never went up); January 2025: the end
//    block steps up +$30. D) The tags flip ($99.99 / $129.99), Nina's +43%; month by month: twelve $3 coins = $36.
// E) A renewal date flips the tag; benefits stacked over twelve years; Copilot arrives and wires into every app.
// F) What Copilot does: drafts a letter, shrinks a long email, turns notes into slides; Nina never asked for it.
import React from 'react'
import { lerp, on, P, pop, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Coin, Spark, Spot, SubBox, Tag, XMark } from './kit'
import { Desk, Page, PlanCard, PriceLine } from './kit2'

const GROUND = 930

const Price: React.FC<PieceProps> = ({ f, c }) => {
  const p12c = c('s12:99#3'), year14 = c('s14:year'), ms16 = c('s16:microsoft'), things20 = c('s20:things'), fam12 = c('s12:family'), p12b = c('s12:99#2'), year9 = c('s9:year'), ms10 = c('s10:microsoft'), p99a = c('s14:99'), p99b = c('s14:99#2'), ai20 = c('s20:ai'), reason20 = c('s20:reason'), day17 = c('s17:day'), arrived17 = c('s17:arrived')
  const gives = c('s6:gives'), word6 = c('s6:word'), excel6 = c('s6:excel'), ppt = c('s6:powerpoint'), outlook = c('s6:outlook')
  const follow = c('s7:follow'), nina7 = c('s7:nina'), letters = c('s7:letters'), budget = c('s7:budget')
  const united = c('s8:united'), personal8 = c('s8:personal'), d69 = c('s8:69'), year8 = c('s8:year')
  const family9 = c('s9:family'), six = c('s9:six'), share = c('s9:share'), d99 = c('s9:99')
  const prices10 = c('s10:prices'), not10 = c('s10:not'), once = c('s10:once'), twelve10 = c('s10:twelve'), launched = c('s10:launched')
  const then11 = c('s11:then'), january = c('s11:january'), both = c('s11:both'), d30 = c('s11:30')
  const personal12 = c('s12:personal'), p99 = c('s12:99'), family12 = c('s12:family'), d129 = c('s12:129')
  const nina13 = c('s13:nina'), d43 = c('s13:43'), apps13 = c('s13:apps')
  const people14 = c('s14:people'), month14 = c('s14:month'), d6 = c('s14:6'), d36 = c('s14:36')
  const straight = c('s15:straight'), existing = c('s15:existing'), not15 = c('s15:not'), newp = c('s15:new'), renewal = c('s15:renewal')
  const reflected = c('s16:reflected'), added16 = c('s16:added'), twelve16 = c('s16:twelve')
  const biggest = c('s17:biggest'), copilot17 = c('s17:copilot'), built = c('s17:built'), word17 = c('s17:word'), excel17 = c('s17:excel'), apps17 = c('s17:apps')
  const copilot18 = c('s18:copilot'), draft = c('s18:draft'), sum = c('s18:sum'), email = c('s18:email'), turn = c('s18:turn'), slides = c('s18:slides')
  const nina19 = c('s19:nina'), asked = c('s19:asked')
  const why20 = c('s20:why'), end20 = c('s20:end'), same20 = c('s20:same')

  const A = win(f, gives - 20, united), B = win(f, united - 2, prices10), C = win(f, prices10 - 2, personal12), D = win(f, personal12 - 2, people14),
    D2 = win(f, people14 - 2, existing), E = win(f, existing - 2, copilot18), F = on(f, copilot18 - 2, 8)
  const nina: Beat[] = [[0, 'type', 'smiling', 'idle', 22], [budget, 'type', 'thinking', 'idle', 18]]
  const nina13b: Beat[] = [[0, 'idle', 'neutral'], [d43, 'shock', 'shocked']]
  const nina19b: Beat[] = [[0, 'idle', 'neutral'], [never(c), 'crossNoA', 'worried', 'crossNoB', 14], [why20, 'scratchHead', 'thinking']]

  return (
    <g>
      <Stage id="ab-price" frame={f} />
      <Spot f={f} at={d69} x={640} y={760} rx={200} ry={110} />
      <Spot f={f} at={d99} x={1300} y={760} rx={200} ry={110} />
      <Spot f={f} at={d30} x={1500} y={480} rx={160} ry={200} />
      <Spot f={f} at={d43} x={640} y={760} rx={200} ry={110} />
      <Spot f={f} at={renewal} x={480} y={560} rx={160} ry={160} />
      <Headline f={f} lines={[[gives, 'WORD · EXCEL · POWERPOINT · OUTLOOK', P.ink, 92], [nina7, 'NINA, ONE SUBSCRIBER', P.ink, 104],
        [united, 'UNITED STATES', P.ink, 110], [prices10, 'NO PRICE RISE IN 12 YEARS', P.ink, 104], [january, 'JANUARY 2025: +$30 A YEAR', P.coralInk, 104],
        [personal12, 'THE NEW PRICES', P.ink, 110], [d43, "NINA'S PLAN: +43%", P.coralInk, 110], [people14, 'MONTHLY: $6.99 → $9.99', P.ink, 104],
        [existing, 'AT THE NEXT RENEWAL', P.ink, 110], [reflected, '12 YEARS OF ADDED BENEFITS', P.ink, 100], [biggest, 'AND THE BIG NEW ONE: COPILOT', P.goldInk, 100],
        [copilot18, 'WHAT COPILOT DOES', P.ink, 110], [nina19, 'NINA NEVER ASKED FOR IT', P.ink, 104], [why20, 'WHY END 12 YEARS OF THE SAME PRICE?', P.ink, 92]]} />

      {/* # A) the box's four apps, then Nina at her desk */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <g transform={`translate(${lerp(0, 380, on(f, follow, 20))} 0)`}>
          <SubBox x={960} y={540} s={lerp(1.15, 0.85, on(f, follow, 20))} tiles={on(f, gives - 20, 20)}
            lit={[on(f, word6, 6) * (1 - on(f, excel6, 8)), on(f, excel6, 6) * (1 - on(f, ppt, 8)), on(f, ppt, 6) * (1 - on(f, outlook, 8)), on(f, outlook, 6) * (1 - on(f, follow, 8))]} />
        </g>
        <g opacity={on(f, nina7 - 6, 10)}>
          <Desk x={700} y={GROUND - 214} s={1.05} screen={f >= budget ? 'budget' : 'letter'} fill={f >= budget ? on(f, budget, 30) : on(f, letters, 30)} />
          <Person f={f} who="investorF" beats={nina} x={330} y={GROUND} s={1.05} />
        </g>
      </g>}

      {/* # B) the two plans */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <g opacity={on(f, personal8, 8)}><PlanCard f={f} x={640} y={560} title="PERSONAL" people={1} price="$69.99" priceO={on(f, d69, 8)} /></g>
        <g opacity={on(f, family9, 8)}><PlanCard f={f} x={1300} y={560} title="FAMILY" people={6} shown={on(f, six, 24)} price="$99.99" priceO={on(f, d99, 8)} color={P.teal2} s={1 + 0.04 * on(f, year9, 6) * (1 - on(f, year9 + 14, 8))} /></g>
        <g opacity={on(f, ms10, 8)}>{[640, 1300].map((x) => <rect key={x} x={x - 160} y={680} width={320} height={190} rx={26} fill="none" stroke={P.gold} strokeWidth={6} />)}</g>
        <g opacity={on(f, year8, 8) * (1 - on(f, family9, 8))}><Label x={640} y={GROUND + 70} text="ONE PERSON" size={48} font="Bebas Neue" color={P.ink2} /></g>
        <g opacity={on(f, share, 8)}><Label x={1300} y={GROUND + 90} text="UP TO SIX PEOPLE" size={48} font="Bebas Neue" color={P.ink2} /></g>
      </g>}

      {/* # C) twelve years flat, then the step */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <PriceLine x={300} y={640} w={1100} years={12} p={on(f, prices10, 40)} step={on(f, d30, 16)} label={f >= twelve10 ? '12 YEARS · SAME PRICE' : ''} />
        {/* # "had not gone up": an up-arrow appears, then is crossed out */}
        <g opacity={on(f, not10, 8) * (1 - on(f, then11, 10))} transform="translate(1520 470)">
          <path d="M0 -110 L-60 -20 L-22 -20 L-22 90 L22 90 L22 -20 L60 -20 Z" fill={P.coral} opacity={0.85} />
          <XMark x={0} y={-10} o={on(f, once, 8)} size={70} />
        </g>
        <g opacity={on(f, january, 8)}><Page x={1730} y={360} s={0.72 * pop(f, january)} top="JANUARY" big="2025" /></g>
        <g opacity={on(f, d30, 8)}><Label x={1400} y={330} text="+$30 / YEAR" size={56} font="Bebas Neue" color={P.coralInk} /></g>
        <g opacity={on(f, both, 8)}><Label x={360} y={480} text="PERSONAL + FAMILY" size={44} font="Bebas Neue" color={P.ink2} anchor="start" /></g>
        <g opacity={on(f, launched, 8) * (1 - on(f, then11, 8))}><Label x={300} y={480} text="SINCE LAUNCH" size={44} font="Bebas Neue" color={P.ink2} anchor="start" /></g>
      </g>}

      {/* # D) the tags flip; Nina's 43% */}
      {D > 0 && <g opacity={D}>
        <Ground y={GROUND} />
        <PlanCard f={f} x={640} y={560} s={1 + 0.04 * on(f, p12b, 6) * (1 - on(f, p12b + 14, 8))} title="PERSONAL" people={1} price={f >= p99 ? '$99.99' : '$69.99'} sticker="+43%" stickerO={on(f, d43, 10)} />
        <PlanCard f={f} x={1300} y={560} s={(1 + 0.04 * on(f, fam12, 6) * (1 - on(f, fam12 + 14, 8))) * (1 + 0.04 * on(f, p12c, 6) * (1 - on(f, p12c + 14, 8)))} title="FAMILY" people={6} price={f >= d129 ? '$129.99' : '$99.99'} color={P.teal2} sticker="+30%" stickerO={0} />
        <g opacity={on(f, nina13, 8)}><Person f={f} who="investorF" beats={nina13b} x={260} y={GROUND} s={0.95} /></g>
        <g opacity={on(f, apps13, 8)}><Label x={640} y={GROUND + 90} text="SAME APPS" size={48} font="Bebas Neue" color={P.ink2} /></g>
      </g>}

      {/* # D2) month by month: twelve $3 coins */}
      {D2 > 0 && <g opacity={D2}>
        <Ground y={GROUND} />
        <g opacity={on(f, month14, 8)}>
          <Tag x={560} y={460} text={f >= p99a ? '$9.99' : '$6.99'} sub="A MONTH" s={1.2} color={f >= p99a ? P.gold : '#F3E3B5'} sticker="+$3" stickerO={on(f, p99a, 10)} />
        </g>
        {Array.from({ length: 12 }, (_, k) => { const t = on(f, d6 + 20 + k * 3, 8)
          return <g key={k} opacity={t} transform={`translate(${900 + (k % 6) * 140} ${lerp(560, 640 + Math.floor(k / 6) * 150, t)}) scale(${1 + 0.15 * on(f, p99b + (k % 6) * 2, 6) * (1 - on(f, p99b + (k % 6) * 2 + 12, 8))})`}><Coin x={0} y={0} r={52} t="$3" /></g> })}
        <g opacity={on(f, year14, 8)}><path d={`M880 ${GROUND - 30} L880 ${GROUND - 10} L1620 ${GROUND - 10} L1620 ${GROUND - 30}`} fill="none" stroke={P.coralInk} strokeWidth={6} /></g>
        <g opacity={on(f, d36, 8)}><Label x={1250} y={GROUND + 80} text="12 × $3 = $36 A YEAR" size={64} font="Bebas Neue" color={P.coralInk} /></g>
      </g>}

      {/* # E) renewal, twelve years of benefits, Copilot wired into the apps */}
      {E > 0 && <g opacity={E}>
        <Ground y={GROUND} />
        {f >= built && [[-95, -10, word17], [95, -10, excel17], [-95, 140, apps17], [95, 140, apps17]].map(([tx, ty, at], k) => { const t = on(f, copilot17, 20), x = lerp(1750, 1480, t), y = lerp(260, 380, t)
          return <line key={k} x1={x} y1={y} x2={1060 + tx} y2={560 + ty} stroke="#8A5BD6" strokeWidth={6} strokeDasharray="12 10" opacity={on(f, at, 10) * 0.8} /> })}
        <SubBox x={1060} y={560} s={(1 + 0.06 * on(f, ms16, 6) * (1 - on(f, ms16 + 14, 8)))} />
        <g opacity={on(f, existing, 8) * (1 - on(f, reflected, 10))}>
          <Page x={420} y={540} s={1.1 * pop(f, existing)} top="RENEWAL" big={f >= renewal ? 'NOW' : 'NEXT'} color={P.navy3} />
          <g opacity={on(f, not15, 8) * (1 - on(f, newp, 8))}><Coin x={420} y={270} r={56} t="+30" color={P.coral} /><XMark x={420} y={270} o={on(f, straight, 8)} size={40} /></g>
          <Tag x={1550} y={700} text={f >= renewal ? '$99.99' : '$69.99'} color={f >= renewal ? P.gold : '#F3E3B5'} s={1.1 * (1 + 0.12 * on(f, newp, 8) * (1 - on(f, renewal, 8)))} />
        </g>
        {/* # twelve years of added benefits: small gift boxes stacking beside the box */}
        <g opacity={on(f, reflected, 8) * (1 - on(f, biggest, 10))}>
          {Array.from({ length: 6 }, (_, k) => { const t = on(f, added16 + k * 4, 10)
            return <g key={k} opacity={t} transform={`translate(${420 + (k % 3) * 120} ${GROUND - 60 - Math.floor(k / 3) * 110 - (1 - t) * 60})`}>
              <rect x={-50} y={-50} width={100} height={100} rx={10} fill={[P.sky, P.mint, P.gold][k % 3]} /><rect x={-8} y={-50} width={16} height={100} fill="#FFFFFF" opacity={0.7} /><rect x={-50} y={-8} width={100} height={16} fill="#FFFFFF" opacity={0.7} /></g> })}
          <g opacity={on(f, twelve16, 8)}><Label x={540} y={GROUND + 80} text="12 YEARS OF EXTRAS" size={48} font="Bebas Neue" color={P.ink2} /></g>
        </g>
        {/* # Copilot arrives and wires into the apps */}
        {f >= biggest - 2 && (() => { const t = on(f, copilot17, 20), x = lerp(1750, 1480, t), y = lerp(260, 380, t)
          return <g opacity={on(f, biggest, 8)}>
            {[word17, excel17, apps17].map((at, k) => <circle key={k} cx={[911, 1089, 1000][k]} cy={[551, 551, 680][k]} r={70} fill="#8A5BD6" opacity={0.18 * on(f, at, 8)} />)}
            <circle cx={x} cy={y} r={lerp(60, 160, on(f, day17, 16))} fill="#8A5BD6" opacity={0.25 * on(f, day17, 4) * (1 - on(f, day17, 16))} />
            <Spark x={x} y={y} s={1.3 * lerp(0.6, 1, on(f, arrived17, 10))} f={f} glow={1} />
            <g opacity={on(f, copilot17, 8) * (1 - on(f, built, 10))}><Label x={x} y={y - 110} text="COPILOT" size={56} font="Bebas Neue" color={P.ink} /></g>
          </g> })()}
      </g>}

      {/* # F) what Copilot does, and Nina who never asked */}
      {F > 0 && <g opacity={F}>
        <Ground y={GROUND} />
        <g opacity={1 - on(f, nina19, 10)}>
          <Spark x={960} y={330} s={1.1} f={f} glow={1} />
          {/* # 1: a letter drafts itself */}
          <g opacity={on(f, draft, 8)}><Desk x={420} y={760} s={0.85} screen="letter" fill={on(f, draft, 40)} /><Label x={420} y={GROUND + 70} text="DRAFT A LETTER" size={44} font="Bebas Neue" color={P.ink} /></g>
          {/* # 2: a long email shrinks into a short summary */}
          <g opacity={on(f, sum, 8)} transform="translate(960 640)">
            <rect x={-130} y={-150 + 120 * on(f, email + 6, 20)} width={260} height={lerp(300, 60, on(f, email + 6, 20))} rx={18} fill="#FFFFFF" stroke="#D8CDB8" strokeWidth={4} />
            {Array.from({ length: 8 }, (_, k) => <rect key={k} x={-100} y={-120 + k * 34} width={200} height={14} rx={7} fill="#B9C6DA" opacity={(1 - on(f, email + 6, 14)) * 1} />)}
            <rect x={-100} y={-16 + 0} width={200} height={14} rx={7} fill="#8A5BD6" opacity={on(f, email + 10, 10)} transform="translate(0 0)" />
            <Label x={0} y={250} text="SUM UP AN EMAIL" size={44} font="Bebas Neue" color={P.ink} />
          </g>
          {/* # 3: notes become slides */}
          <g opacity={on(f, turn, 8)}><Desk x={1500} y={760} s={0.85} screen={f >= slides ? 'slides' : 'letter'} fill={f >= slides ? on(f, slides, 20) : 0.4} /><Label x={1500} y={GROUND + 70} text="NOTES → SLIDES" size={44} font="Bebas Neue" color={P.ink} /></g>
        </g>
        {/* # Nina never asked; why end twelve years of one price? */}
        <g opacity={on(f, nina19, 10)}>
          <Person f={f} who="investorF" beats={nina19b} x={520} y={GROUND} s={1.1} />
          <g opacity={on(f, asked, 8)}><Spark x={980} y={420} s={0.9 * (1 + 0.2 * on(f, ai20, 6) * (1 - on(f, reason20, 10)))} f={f} glow={0.6} /><XMark x={980} y={420} o={on(f, asked + 4, 8) * (1 - on(f, why20, 10))} size={60} /></g>
          <g opacity={on(f, things20, 8)}><PriceLine x={1050} y={700} w={600} years={12} p={1} step={on(f, end20, 16)} rise={120} /></g>
          <g opacity={on(f, same20, 8)}><Label x={1380} y={GROUND + 80} text="12 YEARS → +$30" size={52} font="Bebas Neue" color={P.coralInk} /></g>
        </g>
      </g>}
      <Vignette id="ab-price" />
    </g>
  )
}
// # "never" in s19 (its own cue so the crossing gesture lands on it)
const never = (c: (k: string) => number) => c('s19:never')

const BEATS = ["s12:99#3", "s14:year", "s16:microsoft", "s20:things", "s12:family", "s12:99#2", "s9:year", "s10:microsoft", "s14:99", "s14:99#2", "s20:ai", "s20:reason", "s17:day", "s17:arrived", "s6:gives", "s6:word", "s6:excel", "s6:powerpoint", "s6:outlook", "s7:follow", "s7:nina", "s7:letters", "s7:budget", "s8:united", "s8:personal", "s8:69", "s8:year", "s9:family", "s9:six", "s9:share", "s9:99", "s10:prices", "s10:not", "s10:once", "s10:twelve", "s10:launched", "s11:then", "s11:january", "s11:both", "s11:30", "s12:personal", "s12:99", "s12:129", "s13:nina", "s13:43", "s13:apps", "s14:people", "s14:month", "s14:6", "s14:36", "s15:straight", "s15:existing", "s15:not", "s15:new", "s15:renewal", "s16:reflected", "s16:added", "s16:twelve", "s17:biggest", "s17:copilot", "s17:built", "s17:word", "s17:excel", "s17:apps", "s18:copilot", "s18:draft", "s18:sum", "s18:email", "s18:turn", "s18:slides", "s19:nina", "s19:asked", "s20:why", "s20:end", "s20:same", "s19:never"]
export const AB_PRICE = makePiece('ab-price', 'AI bundle ch1: box lights Word/Excel/PowerPoint/Outlook; Nina at her desk (letter, budget); Personal $69.99 and Family (six people) $99.99 cards; twelve flat gold year-blocks, crossed up-arrow, Jan 2025 step +$30; tags flip to $99.99/$129.99, +43%; twelve $3 coins = $36; renewal date flips the tag; gift boxes of 12 years of extras; Copilot wires into every app; Copilot drafts a letter, shrinks an email, turns notes into slides; Nina never asked (cross)', {
  mood: 'light', Component: Price, beats: BEATS,
  sfx: [['s8:69', 'pop', 0.2], ['s11:30', 'thud', 0.25], ['s12:99', 'pop', 0.2], ['s14:36', 'coin', 0.25], ['s15:renewal', 'click', 0.2], ['s17:copilot', 'chime', 0.2], ['s19:asked', 'softpop', 0.2]] })
