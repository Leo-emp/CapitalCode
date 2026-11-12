// ---------------------------------------------------------------- s63–s86: step four + payoff (cream).
// A) Why it matters: a shrinking $ in a low-interest jar (prices rise); a retirement income bar — Social Security fills
//    ≈ 40%, the planners' target ≈ 70%, the gap filled by an investing block.
// B) An index fund: a basket holding 500 tiny company buildings; one company crumbles but the basket barely moves;
//    the whole basket still bobs up and down (market swings); a paycheck slices a coin into a workplace plan.
// C) Start early: the stock line from the race chart — by 2000 ≈ $142,000, then about a million more by 2025.
// D) Payoff: four step cards again; savings jar + investment mountain side by side; the closing line.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Bill, Coin, Headline, Label, Person, fly, win } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { DollarBill, StepBadge } from '../bank/kit'
import { Basket } from '../money4/kit'
import { Company, Mountain, RaceChart, cx, cy } from './kit'

const GROUND = 930

const Matters: React.FC<PieceProps> = ({ f, c }) => {
  const inv79 = c('s79:investing'), time82 = c('s82:time'), good82 = c('s82:good'), ret66b = c('s66:retirement#2'), turned80 = c('s80:turned#2'), invest83 = c('s83:investing'), longer85 = c('s85:longer'), most64 = c('s64:most'), every71 = c('s71:everything'), list71b = c('s71:list#2'), inv77 = c('s77:investing'), getting77 = c('s77:getting'), sec65 = c('s65:security'), own65 = c('s65:own'), main68 = c('s68:main'), how86 = c('s86:how'), mayas76 = c("s76:maya's"), stocks76 = c('s76:stocks'), y25_76 = c('s76:25'), added76 = c('s76:added'), stocks81 = c('s81:stocks'), year81 = c('s81:year'), americas66 = c("s66:america's"), retire66 = c('s66:retirement'), y98_80 = c('s80:98'), bills80 = c('s80:bills'), many82 = c('s82:many'), people82 = c('s82:people'), you63 = c('s63:you'), sp500b = c('s70:500#2'), index71 = c('s71:index'), step63 = c('s63:step'), history63 = c('s63:history')
  const prices64 = c('s64:prices'), sits = c('s64:sits'), loses = c('s64:loses'), buy64 = c('s64:buy')
  const second65 = c('s65:second'), enough65 = c('s65:enough')
  const ss66 = c('s66:social'), p40 = c('s66:40'), earnings66 = c('s66:earnings')
  const planners = c('s67:planners'), p70 = c('s67:70'), comfortably = c('s67:comfortably'), gap67 = c('s67:gap')
  const investing68 = c('s68:investing'), filled = c('s68:filled')
  const third69 = c('s69:third'), market69 = c('s69:market'), easier = c('s69:easier')
  const pick = c('s70:pick'), index70 = c('s70:index'), hundreds = c('s70:hundreds'), d500 = c('s70:500')
  const list71 = c('s71:list'), rules = c('s71:rules'), fund71 = c('s71:fund'), follow71 = c('s71:follow')
  const fails = c('s72:fails'), tiny = c('s72:tiny'), diversification = c('s72:diversification')
  const ups73 = c('s73:ups'), market73 = c('s73:market'), danger = c('s73:danger'), one73 = c('s73:one')
  const employers = c('s74:employers'), workplace = c('s74:workplace'), slice74 = c('s74:slice'), paycheck = c('s74:paycheck'), automatically = c('s74:automatically')
  const finally75 = c('s75:finally'), early = c('s75:early')
  const remember76 = c('s76:remember'), y2000 = c('s76:2000'), k142 = c('s76:142000'), million76 = c('s76:million'), building = c('s76:building')
  const step77 = c('s77:step'), quickly = c('s77:quickly'), time77 = c('s77:time'), prices77 = c('s77:prices')
  const back78 = c('s78:back'), y1928 = c('s78:1928')
  const one79 = c('s79:one'), lending79 = c('s79:lending'), owning79 = c('s79:owning')
  const two80 = c('s80:two'), d2600 = c('s80:2600'), million80 = c('s80:million')
  const three81 = c('s81:three'), four81 = c('s81:four'), third81 = c('s81:third')
  const four82 = c('s82:four'), outweighed = c('s82:outweighed'), wealth = c('s82:wealth')
  const safe83 = c('s83:safe'), chance = c('s83:chance'), faster83 = c('s83:faster')
  const both = c('s84:both'), savings84 = c('s84:savings'), investments84 = c('s84:investments'), decades = c('s84:decades')
  const earlier85 = c('s85:earlier'), work85 = c('s85:work')
  const advice = c('s86:advice')

  const AB = third69 - 8, BC = finally75 - 8, CD = back78 - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), Cw = win(f, BC, CD), D = on(f, CD, 10)
  const D1 = 1 - on(f, safe83 - 4, 10), D2 = on(f, safe83 - 4, 10)

  return (
    <g>
      <Stage id="iv-matter" frame={f} />
      {/* # A) prices + the retirement gap */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <g opacity={win(f, you63, prices64 + 4, 6)}><Person f={f} who="investorF" beats={[[you63, 'waveA', 'smiling']]} x={960} y={GROUND} s={1.05} /></g>
        <g opacity={on(f, prices64, 8) * (1 - on(f, second65, 10))}>
          <g transform={`translate(700 ${-10 * pop(f, most64, 12)})`}><rect x={-130} y={540} width={260} height={380} rx={40} fill="#DDEBF7" opacity={0.4} stroke="#A9C4DE" strokeWidth={6} /><rect x={-110} y={500} width={220} height={50} rx={14} fill="#2E5C9A" /><text y={536} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 36px "Bebas Neue"' }}>LOW INTEREST</text>
            <g opacity={on(f, sits, 8)}><DollarBill x={0} y={760} s={lerp(1.3, 0.75, span(f, loses, buy64 + 20))} t="$100" /></g></g>
          <g opacity={on(f, loses, 8)}><Label x={1250} y={640} text="BUYS A LITTLE LESS EACH YEAR" size={52} font="Bebas Neue" color={P.coralInk} /></g>
        </g>
        <g opacity={on(f, second65, 10)}>
          <Person o={on(f, sec65, 8)} f={f} who="owner" beats={[[second65, 'idle', 'neutral'], [own65, 'shrug', 'thinking'], [p40, 'present', 'neutral'], [gap67, 'shrug', 'worried'], [filled, 'thumbsUp', 'smiling']]} x={330} y={GROUND} s={1.05} />
          <g transform="translate(1100 0)">
            <rect x={-170} y={GROUND - 40 - 560} width={340} height={560} rx={16} fill="none" stroke="var(--cc-ink2)" strokeWidth={4} strokeDasharray="14 10" opacity={on(f, p70, 8)} />
            <g opacity={on(f, p70, 8)}><Label x={190} y={GROUND - 40 - 560 + 14} text={f >= comfortably ? '≈ 70%+ TO LIVE COMFORTABLY' : '≈ 70%+'} size={42} font="Bebas Neue" color={P.ink} anchor="start" /></g>
            <rect x={-170} y={GROUND - 40 - 320 * on(f, p40, 14)} width={340} height={320 * on(f, p40, 14)} rx={16} fill="#5B7DB1" stroke="#FFFFFF" strokeWidth={8 * win(f, ret66b, ret66b + 16, 4)} />
            <g opacity={on(f, p40, 8)}><Label x={0} y={GROUND - 200} text="SOCIAL SECURITY ≈ 40%" size={34} font="Bebas Neue" color="#FFFFFF" /></g>
            <g opacity={on(f, investing68, 8)}><rect x={-170} y={GROUND - 40 - 560} width={340} height={240 * on(f, investing68, 16)} rx={16} fill="#2FAE6B" stroke={P.gold} strokeWidth={10 * win(f, main68, main68 + 24, 6)} /><Label x={0} y={GROUND - 40 - 450} text="INVESTING" size={48} font="Bebas Neue" color="#FFFFFF" /></g>
            <g opacity={on(f, gap67, 8) * (1 - on(f, investing68, 8))}><Label x={0} y={GROUND - 40 - 450} text="THE GAP" size={56} font="Bebas Neue" color={P.coralInk} /></g>
            <Label x={0} y={GROUND + 60} text="RETIREMENT INCOME (SHARE OF PAY)" size={38} font="Bebas Neue" color={P.ink2} o={on(f, retire66, 8)} />
            <g opacity={on(f, americas66, 8) * (1 - on(f, p40, 8))} transform="translate(0 620)"><rect x={-130} y={-50} width={260} height={100} rx={12} fill="#FFFFFF" stroke="#5B7DB1" strokeWidth={5} /><text y={14} textAnchor="middle" fill="#2E5C9A" style={{ font: '400 34px "Bebas Neue"' }}>SOCIAL SECURITY</text></g>
          </g>
        </g>
      </g>}

      {/* # B) the index fund */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <g opacity={on(f, pick, 8) * (1 - on(f, index70, 8))}>{[0, 1, 2].map((k) => <Company key={k} x={600 + k * 360} y={GROUND} s={0.6} name={['PICK 1?', 'PICK 2?', 'PICK 3?'][k]} />)}</g>
        <g opacity={on(f, index70, 10)} transform={`translate(860 ${-18 * Math.sin(f / 14) * win(f, ups73, danger, 8) - 14 * pop(f, sp500b, 12)})`}>
          <Basket x={0} y={840} s={2.2} shown={0} />
          {Array.from({ length: 16 }, (_, k) => { const fail = k === 5, ox = -280 + (k % 8) * 80, oy = 640 - Math.floor(k / 8) * 80
            return <g key={k} opacity={on(f, hundreds + k * 2, 4) * (fail ? 1 - on(f, tiny, 12) : 1)} transform={`translate(${ox} ${oy + (fail ? 60 * on(f, fails, 12) : 0)}) scale(0.24)`}><Company x={0} y={0} name="" col={['#5B7DB1', '#7E6BB8', '#4E9A8A', '#C98F5A'][k % 4]} /></g> })}
          <g opacity={on(f, d500, 8)}><Label x={0} y={1000} text="ONE FUND, ≈ 500 COMPANIES" size={46} font="Bebas Neue" color={P.ink} /></g>
        </g>
        <g opacity={on(f, index71, 8) * (1 - on(f, fails, 8))} transform="translate(1560 560)"><rect x={-150} y={-190} width={300} height={380} rx={14} fill="#FFFFFF" stroke="#CDB58C" strokeWidth={4} /><text y={-130} textAnchor="middle" fill="#16294A" style={{ font: '400 44px "Bebas Neue"' }}>{f >= rules ? 'THE INDEX: RULES' : 'THE INDEX'}</text>
          {Array.from({ length: 7 }, (_, k) => <g key={k}><rect x={-110} y={-90 + k * 38} width={22} height={22} rx={4} fill="#2FAE6B" opacity={on(f, Math.min(fund71 + k * 2, every71 + k * 2), 4)} /><rect x={-74} y={-86 + k * 38} width={170 * on(f, list71b, 12)} height={14} rx={6} fill="#7FC495" /><rect x={-74} y={-86 + k * 38} width={170} height={14} rx={6} fill="#D9DFE8" /></g>)}</g>
        <g opacity={on(f, diversification, 8) * (1 - on(f, employers, 8))}><Label x={1560} y={460} text="DIVERSIFICATION" size={56} font="Bebas Neue" color={P.goldInk} /></g>
        <g opacity={on(f, market73, 8) * (1 - on(f, employers, 8))}><Label x={1560} y={560} text="STILL MOVES WITH THE MARKET" size={42} font="Bebas Neue" color={P.ink} /><Label x={1560} y={620} text={f >= one73 ? 'NO ONE-COMPANY BET' : ''} size={42} font="Bebas Neue" color={P.mintInk} /></g>
        <g opacity={on(f, employers, 8)} transform="translate(1560 0)">
          <Bill x={0} y={480} s={0.75} text="PAYCHECK" />
          {f >= slice74 && Array.from({ length: 3 }, (_, k) => { const u = ((f - slice74) / 30 + k / 3) % 1; return <Coin key={k} x={lerp(0, 0, u)} y={lerp(540, 800, u)} s={0.6} o={Math.sin(u * Math.PI)} /> })}
          <rect x={-150} y={800} width={300} height={110} rx={16} fill="#2E5C9A" /><text x={0} y={870} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>{f >= workplace ? 'WORKPLACE PLAN' : 'PLAN'}</text>
          <g opacity={on(f, automatically, 8)}><Label x={0} y={GROUND + 64} text="AUTOMATIC" size={44} font="Bebas Neue" color={P.mintInk} /></g>
        </g>
      </g>}

      {/* # C) start early */}
      {Cw > 0 && <g opacity={Cw}>
        <RaceChart upto={lerp(1960, 2025, span(f, remember76, million76 + 20))} show={[true, false, false, false]} />
        <g opacity={on(f, mayas76, 8)}><circle cx={cx(1927)} cy={cy(100)} r={14 + 6 * win(f, mayas76, mayas76 + 16, 4)} fill="#FFFFFF" /></g>
        <g opacity={on(f, stocks76, 8) * (1 - on(f, k142, 8))}><Label x={720} y={420} text="MAYA'S $100 IN STOCKS" size={44} font="Bebas Neue" color={P.mintInk} /></g>
        <g opacity={on(f, k142, 8)}><circle cx={cx(2000)} cy={cy(142509)} r={14} fill="#2FAE6B" /><Label x={cx(2000)} y={cy(142509) - 30} text="2000: ≈ $142,000" size={44} font="Bebas Neue" color={P.mintInk} /></g>
        <g opacity={on(f, y25_76, 8)} transform={`translate(0 ${-8 * pop(f, added76, 12)})`}><path d={`M${cx(2000) + 40} ${cy(142509)} L${cx(2025) - 20} ${cy(142509)} L${cx(2025) - 20} ${cy(1157009)}`} stroke={P.gold} strokeWidth={6} fill="none" /><Label x={cx(2012)} y={cy(142509) + 60} text="+ ≈ $1 MILLION IN 25 YEARS" size={44} font="Bebas Neue" color={P.goldInk} /></g>
        <g opacity={win(f, inv77, quickly, 6)}><Label x={720} y={360} text="INVESTING IS…" size={46} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, getting77, 8)}><Label x={720} y={360} text={f >= prices77 ? 'NOT QUICK — TIME TO OUTGROW PRICES' : f >= quickly ? 'NOT ABOUT GETTING RICH QUICKLY' : 'NOT ABOUT GETTING RICH…'} size={46} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, early, 8) * (1 - on(f, remember76, 8))}><Label x={720} y={360} text="TIME WORKS BEST WHEN IT STARTS EARLY" size={46} font="Bebas Neue" color={P.goldInk} /></g>
      </g>}

      {/* # D) payoff */}
      {D > 0 && <g opacity={D}>
        <Ground y={GROUND} />
        {D1 > 0 && <g opacity={D1}>
          {([[one79, f >= inv79 ? 'LEND VS OWN' : 'LENDING…'], [two80, f >= million80 ? '$2,600 VS $1.16M' : f >= turned80 ? 'BILLS $2,600 · STOCKS…' : f >= bills80 ? 'BILLS: $2,600' : f >= y98_80 ? '98 YEARS' : 'STEP 2'], [three81, f >= year81 ? '1 YEAR IN 4 DOWN' : f >= stocks81 ? 'STOCKS FELL…' : 'THE CATCH'], [four82, f >= good82 ? 'TIME WINS (SO FAR)' : f >= time82 ? 'GIVEN TIME…' : 'STEP 4']] as [number, string][]).map(([at, t], k) =>
            <StepBadge key={k} x={260 + k * 330} y={600 - 16 * pop(f, at, 14)} n={k + 1} t={t} o={on(f, at, 8)} lit={win(f, at, at + 40, 8)} />)}
          <g opacity={on(f, many82, 8)}>{[0, 1, 2].map((k) => <g key={k} opacity={on(f, k === 0 ? many82 : people82 + (k - 1) * 4, 6)}><Person f={f} who={['buyer', 'worker', 'owner'][k]} beats={[[many82, 'idle', 'smiling'], [people82, 'thumbsUp', 'smiling']]} x={1560 + k * 140} y={GROUND} s={0.55} /></g>)}</g>
          <g opacity={on(f, back78, 8) * (1 - on(f, one79, 8))}><DollarBill x={960} y={560} s={1.4} t="$100" /><Label x={960} y={680} text="1928" size={60} font="Bebas Neue" color={P.ink} o={on(f, y1928, 8)} /></g>
        </g>}
        {D2 > 0 && <g opacity={D2}>
          <g transform="translate(560 0)"><rect x={-150} y={540} width={300} height={380} rx={40} fill="#DDEBF7" opacity={0.4} stroke="#A9C4DE" strokeWidth={6} /><rect x={-130} y={500} width={260} height={50} rx={14} fill="#2E5C9A" /><text y={536} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 38px "Bebas Neue"' }}>SAVINGS</text>
            <g>{[0, 1, 2, 3, 4].map((q) => <ellipse key={q} cx={0} cy={890 - q * 18} rx={80} ry={16} fill="#E9C25A" stroke="#B88A2E" strokeWidth={3} />)}</g>
            <Label x={0} y={GROUND + 60} text={f >= savings84 ? 'THE NEXT FEW YEARS' : 'SAFE'} size={46} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, invest83, 8)}><Mountain x={1360} base={GROUND} h={lerp(160, 460, on(f, faster83, 30) * 0.4 + on(f, longer85, 30) * 0.3 + on(f, work85, 30) * 0.3)} w={560} />
            <Label x={1360} y={GROUND + 60} text={f >= decades ? 'THE NEXT FEW DECADES' : 'INVESTMENTS'} size={46} font="Bebas Neue" color={P.goldInk} /></g>
          <g opacity={on(f, both, 8)}><Label x={960} y={340} text="MOST PEOPLE NEED BOTH" size={60} font="Bebas Neue" color={P.ink} o={1 - on(f, earlier85, 8)} /></g>
          <g opacity={on(f, earlier85, 8)}><Label x={960} y={340} text="START EARLY, GIVE IT TIME" size={60} font="Bebas Neue" color={P.goldInk} /></g>
          <g opacity={on(f, how86, 8)}><Label x={960} y={1010} text={f >= advice ? 'HOW THE MONEY WORKS — NOT INVESTMENT ADVICE' : 'HOW THE MONEY WORKS'} size={36} font="Bebas Neue" color={P.ink2} /></g>
        </g>}
      </g>}
      <Headline f={f} lines={[[step63, 'STEP 4: WHY IT MATTERS FOR YOU', P.ink, 98], [prices64, 'PRICES RISE MOST YEARS', P.ink, 104], [second65, 'SOCIAL SECURITY ISN’T ENOUGH', P.ink, 100], [third69, 'OWN THE WHOLE MARKET', P.ink, 106], [employers, 'AUTOMATIC INVESTING AT WORK', P.ink, 100], [finally75, 'START EARLY', P.ink, 110], [back78, 'BACK TO THE $100 FROM 1928', P.ink, 100], [safe83, 'SAVE FOR SOON, INVEST FOR LATER', P.ink, 98]]} />
      <Vignette id="iv-matter" />
    </g>
  )
}

const BEATS = ['s79:investing', 's82:time', 's82:good', 's66:retirement#2', 's80:turned#2', 's83:investing', 's85:longer', 's64:most', 's71:everything', 's71:list#2', 's77:investing', 's77:getting', 's65:security', 's65:own', 's68:main', 's86:how', "s76:maya's", 's76:stocks', 's76:25', 's76:added', 's81:stocks', 's81:year', "s66:america's", 's66:retirement', 's80:98', 's80:bills', 's82:many', 's82:people', 's63:you', 's70:500#2', 's71:index', 's63:step', 's63:history', 's64:prices', 's64:sits', 's64:loses', 's64:buy', 's65:second', 's65:enough', 's66:social', 's66:40', 's66:earnings', 's67:planners', 's67:70', 's67:comfortably', 's67:gap', 's68:investing', 's68:filled', 's69:third', 's69:market', 's69:easier', 's70:pick', 's70:index', 's70:hundreds', 's70:500', 's71:list', 's71:rules', 's71:fund', 's71:follow', 's72:fails', 's72:tiny', 's72:diversification', 's73:ups', 's73:market', 's73:danger', 's73:one', 's74:employers', 's74:workplace', 's74:slice', 's74:paycheck', 's74:automatically', 's75:finally', 's75:early', 's76:remember', 's76:2000', 's76:142000', 's76:million', 's76:building', 's77:step', 's77:quickly', 's77:time', 's77:prices', 's78:back', 's78:1928', 's79:one', 's79:lending', 's79:owning', 's80:two', 's80:2600', 's80:million', 's81:three', 's81:four', 's81:third', 's82:four', 's82:outweighed', 's82:wealth', 's83:safe', 's83:chance', 's83:faster', 's84:both', 's84:savings', 's84:investments', 's84:decades', 's85:earlier', 's85:work', 's86:advice']
export const IV_MATTERS = makePiece('iv-matters', 'Investing step four and payoff: a $100 bill shrinking in a low-interest jar (prices rise most years); a retirement income bar — Social Security fills about 40%, planners say about 70%+, the gap filled by an investing block; three company picks become one basket holding dozens of tiny company buildings, one fails and drops out, the basket still bobs with the market; an index list of rules; a paycheck drips coins into a workplace plan automatically; the stock line from the race chart — about $142,000 in 2000 then about $1 million more by 2025; four recap badges; savings jar for the next few years beside an investment mountain for the next few decades; not investment advice', {
  mood: 'light', Component: Matters, beats: BEATS,
  sfx: [['s66:40', 'pop', 0.2], ['s70:500', 'pop', 0.2], ['s72:fails', 'thud', 0.15], ['s76:million', 'pop', 0.2]] })
