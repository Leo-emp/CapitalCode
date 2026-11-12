// ---------------------------------------------------------------- s6–s21: where the debt comes from — the yearly gap.
// A) Two bars drawn to scale (FY2026, Treasury): MONEY IN $5.4T and MONEY OUT $7.4T. The out bar splits into Social Security,
//    Medicare, defense, interest and everything else as each is named; income taxes light inside the in bar; the 2-trillion
//    gap on top of the in bar glows red: THE DEFICIT.
// B) Kitchen-table size (made-up): a family earns $5,400 a month, its bills come to $7,400, a $2,000 loan fills the gap;
//    a coin shows the 27-cent slice of every government dollar that was borrowed.
// C) The gaps pile up year after year: 2016 $19.8T vs today $40.6T — more than doubled.
// D) Not like a family: the family retires; the government keeps going; it borrows in its own dollars and sets taxes.
import React from 'react'
import { lerp, on, P, pop, Stage, Vignette } from '../kit'
import { Spot } from '../bank/kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win, Coin, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { BankFront } from '../bank/kit'
import { Note } from '../econ/kit'
import { Bill, Capitol, Table, TXT, INK, RED, GREEN, GOLD, BLUE } from './kit'

const GROUND = 930
const U = 80 // px per trillion dollars
const SEGS: [number, string, string][] = [[1.67, 'SOCIAL SECURITY $1.67T', '#4F78AA'], [1.07, 'MEDICARE $1.07T', '#3FA39B'], [0.965, 'DEFENSE $965B', '#8BA0BF'], [1.05, 'INTEREST $1.05T', '#E5634F'], [2.64, 'EVERYTHING ELSE', '#D9C7A5']]

const Gap: React.FC<PieceProps> = ({ f, c }) => {
  const gap6 = c('s6:gap'), collected = c('s7:collected'), d54 = c('s7:54'), taxes = c('s7:taxes')
  const spent = c('s8:spent'), d74 = c('s8:74'), everything = c('s8:everything')
  const ss = c('s9:social'), medicare = c('s9:medicare'), defense = c('s9:defense'), interest = c('s9:interest')
  const income = c('s10:income'), d285 = c('s10:285')
  const short = c('s11:short'), deficit = c('s11:deficit')
  const kitchen = c('s12:kitchentable'), family = c('s12:family'), d5400 = c('s12:5400'), d7400 = c('s12:7400')
  const borrow = c('s13:borrow'), d2000 = c('s13:2000'), every = c('s13:every')
  const gov14 = c('s14:government'), p27 = c('s14:27'), dollar = c('s14:dollar')
  const gaps = c('s15:gaps'), year = c('s15:year'), piled = c('s15:piled')
  const y2016 = c('s16:2016'), d198 = c('s16:198')
  const today = c('s17:today'), d40 = c('s17:40'), doubled = c('s17:doubled')
  const country = c('s18:country'), family18 = c('s18:family')
  const retires = c('s19:retires'), retire = c('s19:retire'), going = c('s19:going'), trust = c('s19:trust')
  const currency = c('s20:currency'), taxes20 = c('s20:taxes'), neither = c('s20:neither')
  const free = c('s21:free'), rules = c('s21:rules')

  const A = win(f, 0, kitchen - 4), B = win(f, kitchen - 4, gaps - 4), Cw = win(f, gaps - 4, country - 4), D = on(f, country - 4, 10)
  const segAt = [ss, medicare, defense, interest, interest + 30]
  let acc = 0
  const famB: Beat[] = [[kitchen, 'idle', 'neutral'], [d7400, 'shock', 'worried'], [borrow, 'phone', 'thinking']]
  return (
    <g>
      <Stage id="nd-gap" frame={f} />
      <Headline f={f} lines={[[gap6, 'FISCAL YEAR 2026, TO SCALE', P.ink, 80], [kitchen, 'MADE-UP FAMILY, KITCHEN-TABLE SIZE', P.ink, 80], [gaps, 'THE GAPS PILE UP', P.ink, 96], [country, 'NOT QUITE LIKE A FAMILY', P.ink, 96]]} />
      <Ground y={GROUND} />

      {/* # A) money in vs money out */}
      {A > 0 && <g opacity={A}>
        <g opacity={on(f, collected, 8)}>
          <rect x={420} y={GROUND - 5.4 * U * on(f, d54, 24)} width={260} height={5.4 * U * on(f, d54, 24)} rx={10} fill={GREEN} />
          <rect x={420} y={GROUND - 2.85 * U * on(f, d54, 24)} width={260} height={2.85 * U * on(f, d54, 24)} rx={10} fill="#23935F" opacity={on(f, income, 10)} />
          <Label x={550} y={GROUND + 60} text="MONEY IN" size={54} font="Bebas Neue" color={GREEN} />
          <g opacity={on(f, d54, 8)}><Label x={550} y={GROUND - 5.4 * U + 64} text="$5.4T" size={64} font="Bebas Neue" color="#FFFFFF" /></g>
          <g opacity={on(f, d285, 8)}><Label x={400} y={GROUND - 1.4 * U} text="INCOME TAXES $2.85T" size={40} font="Bebas Neue" color={P.ink} anchor="end" /></g>
          <g opacity={on(f, taxes, 8) * (1 - on(f, income, 8))}><Label x={400} y={GROUND - 2.7 * U} text="MOSTLY TAXES" size={40} font="Bebas Neue" color={P.ink2} anchor="end" /></g>
        </g>
        <g opacity={on(f, spent, 8)}>
          {SEGS.map(([v, t, col], k) => { const y0 = acc; acc += v; const h = v * U * on(f, d74, 24); const lit = on(f, segAt[k], 8); return <g key={k}>
            <rect x={1000} y={GROUND - (y0 * U * on(f, d74, 24)) - h} width={260} height={h} fill={lit > 0.5 ? col : '#E5A99E'} stroke="#FFFFFF" strokeWidth={3} />
            <g opacity={lit * (k < 4 ? 1 : on(f, everything, 8))}><Label x={1290} y={GROUND - (y0 + v / 2) * U + 14} text={t} size={40} font="Bebas Neue" color={P.ink} anchor="start" /></g>
          </g> })}
          <Label x={1130} y={GROUND + 60} text="MONEY OUT" size={54} font="Bebas Neue" color={RED} />
          <g opacity={on(f, d74, 8)}><Label x={1130} y={GROUND - 7.4 * U - 24} text="$7.4T" size={64} font="Bebas Neue" color={P.ink} /></g>
        </g>
        {/* the gap */}
        <g opacity={on(f, short, 8)}>
          <rect x={420} y={GROUND - 7.4 * U} width={260} height={2.0 * U} rx={10} fill="none" stroke={RED} strokeWidth={6} strokeDasharray="16 10" />
          <rect x={420} y={GROUND - 7.4 * U} width={260} height={2.0 * U} rx={10} fill={RED} opacity={0.18 + 0.1 * Math.sin(f / 6)} />
          <Label x={550} y={GROUND - 6.4 * U + 18} text="$2T SHORT" size={52} font="Bebas Neue" color={RED} />
        </g>
        <g opacity={on(f, deficit, 8)} transform={`translate(780 ${GROUND - 6.4 * U}) scale(${pop(f, deficit, 12)})`}><rect x={-10} y={-44} width={200} height={80} rx={12} fill={RED} /><text x={90} y={14} textAnchor="middle" fill="#FFFFFF" style={TXT(54)}>DEFICIT</text></g>
      </g>}

      {/* # B) the made-up family */}
      {B > 0 && <g opacity={B}>
        <Table x={760} y={GROUND} s={1.1} />
        <Person f={f} who="worker" beats={famB} x={420} y={GROUND} s={0.95} />
        <Person f={f} who="investorF" beats={famB} x={1100} y={GROUND} s={0.95} flip />
        <g opacity={on(f, d5400, 8)}><Note x={640} y={700} t="+$5,400" s={0.9} r={-4} /></g>
        <g opacity={on(f, d7400, 8)}>{[0, 1, 2].map((k) => <Bill key={k} x={860 + k * 30} y={710 - k * 16} s={0.8} r={6 - k * 4} t={k === 2 ? '-$7,400' : 'BILL'} />)}</g>
        <g opacity={on(f, borrow - 6, 10)}><BankFront x={1600} y={GROUND} s={0.7} name="LENDER" /></g>
        <g opacity={on(f, d2000, 8)}><Note x={lerp(1500, 1300, on(f, d2000, 24))} y={lerp(640, 720, on(f, d2000, 24))} t="+$2,000" s={0.8} /></g>
        <g opacity={on(f, every, 8)}><Label x={760} y={340} text="EVERY SINGLE MONTH" size={60} font="Bebas Neue" color={RED} /></g>
        <g opacity={on(f, gov14, 8)} transform="translate(1660 330)">
          <circle r={110} fill={GOLD} stroke="#B88A2E" strokeWidth={8} />
          <path d={`M0 0 L0 -110 A110 110 0 0 1 ${110 * Math.sin(0.27 * 2 * Math.PI * on(f, p27, 20))} ${-110 * Math.cos(0.27 * 2 * Math.PI * on(f, p27, 20))} Z`} fill={RED} />
          <g opacity={on(f, p27, 8)}><text x={-140} y={20} textAnchor="end" fill={RED} style={TXT(70)}>27¢</text></g>
          <g opacity={on(f, dollar, 8)}><text x={0} y={160} textAnchor="middle" fill={INK} style={TXT(40)}>OF EVERY $1 SPENT</text><text x={0} y={205} textAnchor="middle" fill={INK} style={TXT(40)}>WAS BORROWED</text></g>
        </g>
      </g>}

      {/* # C) piled up: 2016 vs today */}
      {Cw > 0 && <g opacity={Cw}>
        <g opacity={1 - on(f, y2016 - 4, 10)}>
          {Array.from({ length: 10 }, (_, k) => <g key={k} opacity={on(f, year + k * 3, 6)} transform={`translate(0 ${-30 * (1 - on(f, year + k * 3, 10))})`}><rect x={760} y={GROUND - (k + 1) * 46} width={400} height={40} rx={6} fill={RED} opacity={0.8} /><text x={960} y={GROUND - k * 46 - 14} textAnchor="middle" fill="#FFFFFF" style={TXT(30)}>A YEAR'S GAP</text></g>)}
          <g opacity={on(f, piled, 8)}><Label x={960} y={380} text="= THE DEBT" size={80} font="Bebas Neue" color={P.ink} /></g>
        </g>
        <g opacity={on(f, y2016 - 4, 10)}>
          <rect x={560} y={GROUND - 19.8 * 14 * on(f, d198, 24)} width={260} height={19.8 * 14 * on(f, d198, 24)} rx={10} fill="#E5A99E" />
          <rect x={1100} y={GROUND - 40.6 * 14 * on(f, d40, 24)} width={260} height={40.6 * 14 * on(f, d40, 24)} rx={10} fill={RED} />
          <g opacity={on(f, d198, 8)}><Label x={690} y={GROUND - 19.8 * 14 - 24} text="$19.8T" size={64} font="Bebas Neue" color={P.ink} /></g>
          <Label x={690} y={GROUND + 60} text="LATE 2016" size={50} font="Bebas Neue" color={P.ink2} />
          <g opacity={on(f, today, 8)}><Label x={1230} y={GROUND + 60} text="TODAY" size={50} font="Bebas Neue" color={P.ink2} /></g>
          <g opacity={on(f, d40, 8)}><Label x={1230} y={GROUND - 40.6 * 14 - 24} text="$40.6T" size={64} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, doubled, 8)} transform={`translate(1560 ${GROUND - 420}) scale(${pop(f, doubled, 12)})`}><circle r={90} fill={RED} /><text y={30} textAnchor="middle" fill="#FFFFFF" style={TXT(90)}>2×+</text></g>
        </g>
      </g>}

      {/* # D) a country is not a family */}
      {D > 0 && <g opacity={D}>
        <rect x={956} y={360} width={8} height={GROUND - 360} rx={4} fill={P.ink2} opacity={0.3} />
        <g opacity={on(f, family18, 8)}>
          <Person f={f} who="owner" beats={[[family18, 'idle', 'smiling'], [retires, 'relax', 'smiling']]} x={420} y={GROUND} s={0.9} />
          <g opacity={on(f, retires, 8)}><Label x={420} y={330} text="PAY IT OFF BY RETIREMENT" size={46} font="Bebas Neue" color={P.ink} /></g>
        </g>
        <g opacity={on(f, retire, 8)}>
          <Capitol x={1440} y={GROUND} s={0.7} glow={win(f, going, currency, 8)} />
          <g opacity={on(f, going, 8)}><Label x={1440} y={330} text="KEEPS GOING" size={56} font="Bebas Neue" color={GREEN} /></g>
          <g opacity={on(f, trust, 8) * (1 - on(f, currency, 8))}><Label x={1440} y={400} text="BORROWS WHILE LENDERS TRUST IT" size={40} font="Bebas Neue" color={P.ink} /></g>
        </g>
        <g opacity={on(f, currency, 8)}><g transform="translate(1250 460)"><circle r={60} fill={GREEN} /><text y={26} textAnchor="middle" fill="#FFFFFF" style={TXT(80)}>$</text></g><Label x={1250} y={560} text="ITS OWN DOLLARS" size={40} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, taxes20, 8)}><Bill x={1640} y={470} s={0.8} t="TAXES" col={BLUE} /><Label x={1640} y={580} text="SETS ITS TAXES" size={40} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, neither, 8)}><Label x={420} y={420} text="A FAMILY CAN'T" size={50} font="Bebas Neue" color={RED} /></g>
        <g opacity={on(f, free, 8) * (1 - on(f, rules, 8))}><Label x={960} y={300} text="NOT FREE" size={70} font="Bebas Neue" color={RED} /></g>
        <g opacity={on(f, rules, 8)}><Label x={960} y={300} text="DIFFERENT RULES" size={70} font="Bebas Neue" color={P.ink} /></g>
      </g>}
      {/* # spots:begin */}
      <g>
        <Spot f={f} at={c("s6:gap")} x={800} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s7:budget")} x={800} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s7:trillion")} x={800} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s8:on")} x={800} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s8:security")} x={800} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s8:defense")} x={800} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s9:the")} x={800} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s9:about")} x={800} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s9:trillion")} x={800} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s9:107")} x={800} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s9:trillion#2")} x={800} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s9:billion")} x={800} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s9:105")} x={800} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s10:on")} x={800} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s10:source")} x={800} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s10:trillion")} x={800} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s11:74")} x={800} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s11:collect")} x={800} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s11:and")} x={800} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s11:shortfall")} x={800} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s12:picture")} x={760} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s12:dollars")} x={760} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s13:to")} x={760} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s13:the")} x={760} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s13:month")} x={760} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s14:paid")} x={760} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s15:is")} x={960} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s16:ten")} x={960} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s16:the")} x={960} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s16:trillion")} x={960} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s17:it#2")} x={960} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s17:decade")} x={960} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s19:usually")} x={960} y={640} rx={230} ry={200} />
        <Spot f={f} at={c("s19:debts")} x={960} y={640} rx={230} ry={200} />
        <Spot f={f} at={c("s19:government")} x={960} y={640} rx={230} ry={200} />
        <Spot f={f} at={c("s19:borrowing")} x={960} y={640} rx={230} ry={200} />
        <Spot f={f} at={c("s20:also")} x={960} y={640} rx={230} ry={200} />
        <Spot f={f} at={c("s20:dollars")} x={960} y={640} rx={230} ry={200} />
        <Spot f={f} at={c("s20:a")} x={960} y={640} rx={230} ry={200} />
        <Spot f={f} at={c("s21:that")} x={960} y={640} rx={230} ry={200} />
        <Spot f={f} at={c("s21:to")} x={960} y={640} rx={230} ry={200} />
        <Spot f={f} at={c("s21:know")} x={960} y={640} rx={230} ry={200} />
        <Spot f={f} at={c("s21:happens")} x={960} y={640} rx={230} ry={200} />
      </g>
      {/* # spots:end */}
      <Vignette id="nd-gap" />
    </g>
  )
}

export const ND_GAP = makePiece('nd-gap', 'Where the debt comes from: two bars drawn to scale — money in $5.4T (income taxes $2.85T lit inside) and money out $7.4T split into Social Security $1.67T, Medicare $1.07T, defense $965B, interest $1.05T and everything else — with the $2T gap on top of the in bar glowing red as the DEFICIT; a made-up family at a kitchen table earning $5,400 against $7,400 of bills, a lender adding $2,000 every month; a gold coin with a 27-cent red slice borrowed; red blocks of yearly gaps piling up into the debt; bars of $19.8T in late 2016 vs $40.6T today, more than doubled; a family that pays off debt by retirement vs a domed capitol that keeps going, borrows in its own dollars and sets its taxes.', {
  mood: 'light', Component: Gap,
  beats: ["s7:collected", "s7:54", "s7:taxes", "s8:spent", "s8:74", "s8:everything", "s9:social", "s9:medicare", "s9:defense", "s9:interest", "s10:income", "s10:285", "s11:short", "s11:deficit", "s12:kitchentable", "s12:family", "s12:5400", "s12:7400", "s13:borrow", "s13:2000", "s13:every", "s14:government", "s14:27", "s14:dollar", "s15:gaps", "s15:year", "s15:piled", "s16:2016", "s16:198", "s17:today", "s17:40", "s17:doubled", "s18:country", "s18:family", "s19:retires", "s19:retire", "s19:going", "s19:trust", "s20:currency", "s20:taxes", "s20:neither", "s21:free", "s21:rules", "s6:gap", "s7:budget", "s7:trillion", "s8:on", "s8:security", "s8:defense", "s9:the", "s9:about", "s9:trillion", "s9:107", "s9:trillion#2", "s9:billion", "s9:105", "s10:on", "s10:source", "s10:trillion", "s11:74", "s11:collect", "s11:and", "s11:shortfall", "s12:picture", "s12:dollars", "s13:to", "s13:the", "s13:month", "s14:paid", "s15:is", "s16:ten", "s16:the", "s16:trillion", "s17:it#2", "s17:decade", "s19:usually", "s19:debts", "s19:government", "s19:borrowing", "s20:also", "s20:dollars", "s20:a", "s21:that", "s21:to", "s21:know", "s21:happens"],
  sfx: [['s7:54', 'pop', 0.1], ['s8:74', 'pop', 0.1], ['s11:deficit', 'thud', 0.15], ['s13:2000', 'swish', 0.1], ['s17:doubled', 'impact', 0.12]] })
