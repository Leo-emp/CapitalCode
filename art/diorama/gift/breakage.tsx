// ---------------------------------------------------------------- s46–s63: present 3, money never spent (breakage).
// Your coffee card: drinks go out and the balance falls from 44 to 3.70; it slides into a drawer that shuts;
// calendar pages fly (months, years) and dust settles. The shop's book still shows WE OWE 3.70 — a dashed cup with
// a cross. Then millions of cards: small leftovers, a lost card, an unopened present — BREAKAGE. Past years of cards
// stack into bars; from them the company knows the share never spent. A made-up example: a 100 bar split 98 + 2;
// as the 98 flows into SALES, the 2 follows on top as breakage. Starbucks: 208 million counted as sales, about
// 570 thousand a day (our calculation), no cup handed over. A slice goes to a government building. Last, a row of
// shops, a restaurant, a cinema and an online store, each with its own unspent cards.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { type Beat, Coin, Headline, Person, Tick, hand, win } from '../aimoney/common'
import { Calendar } from '../charts'
import { Cup, Drawers, GiftCard, GovBuilding, Ledger, Present, Storefront } from './kit'

const COLORS = ['#2FA36B', '#3A6EA8', '#C94A3E', '#E9A23B']
const Breakage: React.FC<PieceProps> = ({ f, c }) => {
  const back = c('s46:back'), b44 = c('s46:44')
  const few47 = c('s47:few'), drinks47 = c('s47:drinks'), down = c('s47:down'), b3 = c('s47:3')
  const that48 = c('s48:that'), enough = c('s48:enough'), want = c('s48:want'), goes = c('s48:goes'), drawer = c('s48:drawer')
  const months = c('s49:months'), years49 = c('s49:years'), forget = c('s49:forget')
  const three50 = c('s50:3'), still = c('s50:still'), owes = c('s50:owes'), never50 = c('s50:never'), make = c('s50:make'), anything50 = c('s50:anything')
  const picture = c('s51:picture')
  const millions = c('s51:millions'), left = c('s51:left'), lost = c('s51:lost'), present51 = c('s51:present'), used = c('s51:used')
  const call = c('s52:call'), breakage = c('s52:breakage'), spent52 = c('s52:spent')
  const company53 = c('s53:company'), clever = c('s53:clever'), wait = c('s53:wait'), forgotten = c('s53:forgotten')
  const past = c('s54:past'), knows = c('s54:knows'), roughly = c('s54:roughly'), spent54 = c('s54:spent')
  const expects55 = c('s55:expects'), customers55 = c('s55:customers'), cards55 = c('s55:cards'), each55 = c('s55:each'), counts55 = c('s55:counts'), matching = c('s55:matching'), share = c('s55:share'), spent55 = c('s55:spent')
  const cards56 = c('s56:cards'), example = c('s56:example'), madeup = c('s56:madeup'), expects56 = c('s56:expects'), two56 = c('s56:2'), h100 = c('s56:100'), spent56 = c('s56:spent')
  const customers57 = c('s57:customers'), cards57 = c('s57:cards'), counts57 = c('s57:counts'), spend57 = c('s57:spend'), n98 = c('s57:98'), sales57 = c('s57:sales'), plus = c('s57:plus'), brk57 = c('s57:breakage'), top = c('s57:top')
  const past58 = c('s58:past'), real = c('s58:real'), own = c('s58:own'), worked = c('s58:worked')
  const y2024 = c('s59:2024'), fy = c('s59:financial'), counted59 = c('s59:counted'), m208 = c('s59:208'), sales59 = c('s59:sales')
  const year60 = c('s60:year'), calc = c('s60:calculation'), k570 = c('s60:570'), day60 = c('s60:day')
  const k570b = c('s61:570'), day61 = c('s61:day'), drink61 = c('s61:drink'), cup61 = c('s61:cup'), handed61 = c('s61:handed')
  const eventually = c('s62:eventually'), catch62 = c('s62:catch'), unspent = c('s62:unspent'), government = c('s62:government'), allows = c('s62:allows'), estimate = c('s62:estimate')
  const same63 = c('s63:same'), some63 = c('s63:some'), sell63 = c('s63:sell'), every63 = c('s63:every'), one63 = c('s63:one'), shops = c('s63:shops'), restaurants = c('s63:restaurants'), cinemas = c('s63:cinemas'), online = c('s63:online'), faces = c('s63:faces'), fully = c('s63:fully')
  const A = win(f, 0, still - 2), A2 = win(f, still - 2, picture - 2), B = win(f, picture - 2, clever - 2), C1 = win(f, clever - 2, example - 2), C2 = win(f, example - 2, fy - 2), D = win(f, fy - 2, catch62 - 2), E = win(f, catch62 - 2, one63 - 2), F = on(f, one63 - 2, 10)
  const you: Beat[] = [[0, 'hold', 'smiling'], [few47, 'receive', 'smiling'], [enough, 'think', 'thinking'], [want, 'shrug', 'thinking'], [goes, 'reachDown', 'neutral'], [months, 'idle', 'neutral']]
  const hp = hand(f, you, 420, 1000, 0.95)
  const bal = f < few47 ? 44 : f < b3 ? Math.max(3.7, 44 - 40.3 * easeInOut(span(f, few47, b3))) : 3.7
  const balT = `$${bal.toFixed(2).replace(/\.00$/, '')}`
  const intoDrawer = easeInOut(span(f, goes, drawer + 6))
  return (
    <g>
      <Stage id="gc-brk" frame={f} />
      <Headline f={f} lines={[[back, 'YOUR COFFEE CARD', P.ink, 100], [b3, '$3.70 LEFT', P.goldInk, 110], [drawer, 'INTO A DRAWER', P.ink, 104], [months, 'MONTHS. THEN YEARS.', P.ink, 104], [still, 'THE SHOP STILL OWES IT', P.ink, 100],
        [millions, 'MILLIONS OF CARDS', P.ink, 104], [breakage, 'BREAKAGE', P.goldInk, 130], [clever, 'NO NEED TO WAIT', P.ink, 104], [knows, 'IT KNOWS ROUGHLY HOW MUCH', P.ink, 96], [matching, 'A MATCHING SHARE COUNTED AS SALES', P.goldInk, 88],
        [example, 'EXAMPLE · MADE-UP NUMBERS', P.ink2, 96], [n98, '98 SPENT → 98 + 2 IN SALES', P.goldInk, 100], [real, 'REAL COMPANIES: THEIR OWN NUMBERS', P.ink, 92],
        [m208, '$208 MILLION OF BREAKAGE', P.goldInk, 110], [k570, '≈ $570,000 A DAY', P.goldInk, 116], [catch62, 'ONE CATCH', P.ink, 104], [one63, 'NOT JUST ONE COMPANY', P.ink, 104]]} />
      {/* # A: drinks go out, the balance falls to 3.70, the card goes into a drawer; months and years pass */}
      {A > 0 && <g opacity={A}>
        <Person f={f} who="hero" beats={you} x={420} y={1000} s={0.95} o={1 - on(f, months - 6, 10)} />
        <g opacity={1 - intoDrawer}><GiftCard x={hp.x + 50} y={hp.y - 40} s={0.4} r={-8} amount={balT} /></g>
        {[0, 1, 2, 3, 4].map((k) => { const at = few47 + k * 8, t = easeInOut(span(f, at, at + 14)); return <g key={k} opacity={on(f, at, 4) * (1 - on(f, at + 20, 6)) * (1 - on(f, enough - 4, 6))}><Cup x={lerp(1400, hp.x + 150, t)} y={lerp(860, hp.y + 60, t)} s={0.5} steam={1} f={f} /></g> })}
        <g opacity={on(f, down, 8) * (1 - on(f, goes, 8))} transform={`translate(1100 560) scale(${pop(f, b3)})`}><GiftCard x={0} y={0} s={1.1} r={-4} amount={balT} /></g>
        <g opacity={on(f, that48, 8) * (1 - on(f, goes, 8))}><Cup x={1500} y={900} s={1} ghost /><text x={1500} y={960} textAnchor="middle" fill={P.ink2} style={{ font: '400 44px "Bebas Neue"' }}>$5 DRINK</text></g>
        <g opacity={on(f, goes - 6, 10)}>
          <Drawers x={1120} y={1000} s={1.15} open={on(f, goes - 6, 12) * (1 - on(f, drawer + 10, 12))} dust={on(f, forget, 20)}>
            <GiftCard x={0} y={0} s={0.42} r={-4} amount="$3.70" />
          </Drawers>
          {(() => { const t = intoDrawer; return <g opacity={on(f, goes, 4) * (1 - on(f, drawer + 6, 4))}><GiftCard x={lerp(hp.x + 50, 1120, t)} y={lerp(hp.y - 40, 620, t) - Math.sin(t * Math.PI) * 100} s={0.4} r={-8} amount="$3.70" /></g> })()}
        </g>
        {[0, 1, 2, 3, 4, 5].map((k) => { const at = months + k * 6, t = span(f, at, at + 24); return <g key={k} opacity={on(f, at, 4) * (1 - t)}><Calendar x={lerp(420, 260 - k * 20, t)} y={lerp(560, 320, t)} text={k < 3 ? ['JAN', 'MAR', 'JUN'][k] : ['2025', '2026', '2027'][k - 3]} s={0.9} /></g> })}
        <g opacity={on(f, years49, 8)}><Calendar x={420} y={560} text="YRS" s={1.2} /></g>
      </g>}
      {/* # A2: the shop's book still owes 3.70; it never has to make anything for it */}
      {A2 > 0 && <g opacity={A2}>
        <Ledger x={760} y={560} s={1.1 * (1 + 0.05 * Math.sin(Math.PI * span(f, three50, three50 + 12)))} owes="$3.70" sales="" hiOwes={on(f, owes, 10)} />
        <g opacity={on(f, never50, 8) * (1 - 0.5 * on(f, anything50, 10))}><Cup x={1460} y={760} s={1.2} ghost /><Tick x={1460} y={520} o={on(f, make, 8)} r={50} ok={false} /></g>
      </g>}
      {/* # B: millions of cards — leftovers, a lost one, an unopened present — BREAKAGE */}
      {B > 0 && <g opacity={B}>
        {Array.from({ length: 36 }, (_, k) => { const col = k % 9, row = Math.floor(k / 9); const amt = ['$2', '$0.40', '$7', '$1.15', '$3', '$0.80'][k % 6]; return <g key={k} opacity={on(f, picture + k * 0.8, 6) * (k === 13 || k === 22 ? 1 - on(f, lost, 8) : 1)}><GiftCard x={300 + col * 165} y={360 + row * 150} s={0.4} r={(k % 5 - 2) * 6} color={COLORS[k % 4]} amount={on(f, left, 8) > 0.5 ? amt : undefined} crack={on(f, breakage + (k % 9) * 1.5, 8) * 0.8} /></g> })}
        <g opacity={on(f, lost, 8)}><GiftCard x={1640} y={1000 + 40 * Math.sin(f / 20)} s={0.4} r={30} color="#C94A3E" /><text x={1640} y={920} textAnchor="middle" fill={P.ink2} style={{ font: '400 44px "Bebas Neue"' }}>LOST</text></g>
        <g opacity={on(f, present51, 8)} transform={`translate(260 1010) scale(${0.5 * pop(f, present51)})`}><Present x={0} y={0} color="#2FA36B" /></g>
        <g opacity={on(f, used, 8)}><text x={260} y={860} textAnchor="middle" fill={P.ink2} style={{ font: '400 44px "Bebas Neue"' }}>NEVER USED</text></g>
        <g opacity={on(f, spent52, 8)}><text x={960} y={1010} textAnchor="middle" fill={P.ink} style={{ font: '400 56px "Bebas Neue"', letterSpacing: 2 }}>CARD MONEY NEVER SPENT</text></g>
      </g>}
      {/* # C1: past years of cards become bars; the company knows roughly the share never spent */}
      {C1 > 0 && <g opacity={C1}>
        <g opacity={on(f, clever, 8) * (1 - on(f, past, 8))}><g transform={`rotate(${6 * Math.sin(Math.PI * span(f, wait, wait + 12))} 960 560)`}><Calendar x={960} y={560} text="YRS?" s={1.8} /></g><Tick x={1110} y={430} o={on(f, forgotten, 8)} r={50} ok={false} /></g>
        {[0, 1, 2, 3].map((k) => { const h = 300 + k * 30; return <g key={k} opacity={on(f, past + k * 4, 8)}>
          <rect x={520 + k * 240} y={900 - h * on(f, past + k * 4, 16)} width={160} height={h * on(f, past + k * 4, 16)} rx={14} fill="#3A6EA8" />
          <rect x={520 + k * 240} y={900 - h * on(f, past + k * 4, 16)} width={160} height={22 * on(f, roughly, 10)} rx={8} fill={P.gold} />
          <text x={600 + k * 240} y={960} textAnchor="middle" fill={P.ink2} style={{ font: '400 44px "Bebas Neue"' }}>{['2020', '2021', '2022', '2023'][k]}</text>
        </g> })}
        <g opacity={on(f, spent54, 8) * (1 - on(f, each55, 8))}><text x={1500} y={460} textAnchor="middle" fill={P.goldInk} style={{ font: '400 52px "Bebas Neue"' }}>GOLD = NEVER SPENT</text></g>
        {/* # as cards are spent, a matching sliver joins sales */}
        <g opacity={on(f, each55, 8)}>
          <rect x={1460} y={560} width={260} height={340} rx={20} fill={P.card} />
          <g opacity={on(f, cards55, 8)}><GiftCard x={1800} y={760} s={0.3} r={-8} /></g>
          <g opacity={on(f, expects55, 8)}><text x={1590} y={960} textAnchor="middle" fill={P.goldInk} style={{ font: '400 40px "Bebas Neue"' }}>GOLD = EXPECTED NEVER SPENT</text></g><text x={1590} y={540} textAnchor="middle" fill={P.ink} style={{ font: '400 52px "Bebas Neue"' }}>SALES</text>
          {Array.from({ length: Math.round(8 * span(f, customers55, spent55)) }, (_, k) => <g key={k}><rect x={1480} y={870 - k * 38} width={180} height={30} rx={6} fill="#3A6EA8" /><rect x={1664} y={870 - k * 38} width={36} height={30} rx={6} fill={P.gold} opacity={on(f, share, 8)} /></g>)}
        </g>
      </g>}
      {/* # C2: the made-up example — 100 = 98 + 2; the 98 flows into sales and the 2 rides on top as breakage */}
      {C2 > 0 && <g opacity={C2}>
        <g opacity={on(f, h100, 8) * (1 - on(f, real, 10))}>
          <rect x={300} y={420} width={1320} height={130} rx={22} fill={P.card} />
          <rect x={300} y={420} width={1293.6 * (1 - easeInOut(span(f, cards57, n98 + 10)))} height={130} rx={22} fill="#3A6EA8" />
          <rect x={1593.6 - (1593.6 - 300) * 0 + 0} y={420} width={26.4 * (1 - on(f, plus, 12))} height={130} rx={6} fill={P.gold} opacity={on(f, two56, 8)} />
          <text x={960} y={510} textAnchor="middle" fill="#FFFFFF" opacity={1 - on(f, spend57, 8)} style={{ font: '400 72px "Bebas Neue"' }}>$100 LOADED ON CARDS</text>
          {[0, 1, 2, 3, 4].map((k) => <g key={k} opacity={on(f, cards56 + k * 2, 6) * (1 - on(f, cards57, 8))}><GiftCard x={420 + k * 260} y={340} s={0.22} r={(k - 2) * 6} /></g>)}
          <g opacity={on(f, two56, 8)}><text x={1660} y={400} textAnchor="middle" fill={P.goldInk} style={{ font: '400 56px "Bebas Neue"' }}>$2 NEVER SPENT</text></g>
        </g>
        <g opacity={on(f, customers57, 8)}><text x={300} y={620} fill={P.ink2} style={{ font: '400 46px "Bebas Neue"', letterSpacing: 2 }}>CUSTOMERS SPEND $98</text></g>
        <g opacity={on(f, counts57, 8)}>
          <rect x={700} y={660} width={520} height={340} rx={24} fill={P.card} /><text x={960} y={640} textAnchor="middle" fill={P.ink} style={{ font: '400 56px "Bebas Neue"' }}>SALES</text>
          <rect x={740} y={980 - 250 * on(f, n98, 20)} width={440} height={250 * on(f, n98, 20)} rx={14} fill="#3A6EA8" />
          <text x={960} y={960 - 110 * on(f, n98, 20)} textAnchor="middle" fill="#FFFFFF" opacity={on(f, sales57, 8)} style={{ font: '400 72px "Bebas Neue"' }}>$98</text>
          {(() => { const t = easeInOut(span(f, plus, brk57)); return <g opacity={on(f, plus, 6)}><rect x={lerp(1593, 740, t)} y={lerp(420, 980 - 250 - 50, t)} width={lerp(26, 440, t)} height={lerp(130, 46, t)} rx={8} fill={P.gold} /></g> })()}
          <g opacity={on(f, brk57, 8)}><text x={1450} y={720} textAnchor="middle" fill={P.goldInk} style={{ font: '400 58px "Bebas Neue"' }}>+ $2 BREAKAGE</text></g>
          <g opacity={on(f, top, 8)}><path d="M1300 720 L1200 700" stroke={P.goldInk} strokeWidth={6} strokeLinecap="round" /></g>
        </g>
        <g opacity={on(f, own, 8)}>{[0, 1, 2].map((k) => <g key={k} transform={`translate(${380 + k * 70} ${800 + k * 30})`}><GiftCard x={0} y={0} s={0.3} r={(k - 1) * 8} color={COLORS[k]} /></g>)}<g opacity={on(f, past58, 8)}><rect x={330} y={700} width={240} height={40} rx={10} fill={P.gold} opacity={0.5} /></g><text x={450} y={950} textAnchor="middle" fill={P.ink2} opacity={on(f, worked, 8)} style={{ font: '400 44px "Bebas Neue"' }}>THEIR OWN PAST CARDS</text></g>
      </g>}
      {/* # D: Starbucks — 208 million counted as sales; about 570 thousand a day; no cup handed over */}
      {D > 0 && <g opacity={D}>
        <g opacity={1 - on(f, k570 - 4, 10)}>
          <g opacity={on(f, y2024, 8)}><text x={1500} y={560} textAnchor="middle" fill={P.ink2} style={{ font: '400 60px "Bebas Neue"' }}>FY 2024</text></g>
          {Array.from({ length: Math.round(24 * span(f, counted59, m208 + 10)) }, (_, k) => <Coin key={k} x={760 + (k % 6) * 80 - Math.floor(k / 6) * 10} y={880 - Math.floor(k / 6) * 60} s={1.1} />)}
          <g opacity={on(f, sales59, 8)}><text x={960} y={1010} textAnchor="middle" fill={P.ink} style={{ font: '400 52px "Bebas Neue"', letterSpacing: 2 }}>COUNTED AS SALES · FISCAL 2024</text></g>
        </g>
        <g opacity={on(f, k570 - 4, 10)}>
          <g transform={`translate(700 600) scale(${1 + 0.06 * Math.sin(Math.PI * span(f, year60, year60 + 10))})`}><Calendar x={0} y={0} text="1 DAY" s={2} /></g>
          <g opacity={on(f, k570b, 8)}><text x={1190} y={520} textAnchor="middle" fill={P.goldInk} style={{ font: '400 80px "Bebas Neue"' }}>$570K</text></g>
          {Array.from({ length: 6 }, (_, k) => <Coin key={k} x={1100 + (k % 3) * 90} y={700 - Math.floor(k / 3) * 70} s={1.2} o={on(f, day60 + k * 2, 6)} />)}
          <g opacity={on(f, calc, 8)}><text x={960} y={1000} textAnchor="middle" fill={P.ink2} style={{ font: '400 46px "Bebas Neue"', letterSpacing: 2 }}>OUR CALCULATION: $208M ÷ 364 DAYS</text></g>
          <g opacity={on(f, drink61, 8)}><Cup x={1560} y={760} s={1} ghost /><Tick x={1560} y={540} o={on(f, cup61, 8)} r={46} ok={false} /></g>
        </g>
      </g>}
      {/* # E: in some places a slice goes to the government; Starbucks allows for it */}
      {E > 0 && <g opacity={E}>
        <GovBuilding x={1400} y={900} s={1.1} o={on(f, eventually, 10)} />
        <g opacity={on(f, unspent, 8)}>{[0, 1, 2].map((k) => <GiftCard key={k} x={520 + k * 40} y={760 - k * 30} s={0.5} r={(k - 1) * 8} color={COLORS[k]} />)}</g>
        {[0, 1, 2].map((k) => { const t = easeInOut(span(f, government + k * 6, government + k * 6 + 20)); return <g key={k} opacity={on(f, government + k * 6, 4)}><Coin x={lerp(560, 1300 + k * 70, t)} y={lerp(640, 760, t) - Math.sin(t * Math.PI) * 160} s={1} /></g> })}
        <g opacity={on(f, allows, 8)}><text x={560} y={460} textAnchor="middle" fill={P.ink} style={{ font: '400 56px "Bebas Neue"' }}>ALLOWED FOR IN</text><text x={560} y={530} textAnchor="middle" fill={P.goldInk} style={{ font: '400 56px "Bebas Neue"' }}>THE ESTIMATE</text></g>
        <g opacity={on(f, estimate, 8)}><Tick x={820} y={480} o={on(f, estimate, 8)} r={34} /></g>
      </g>}
      {/* # F: shops, a restaurant, a cinema, an online store — each with unspent cards */}
      {F > 0 && <g opacity={F}>
        {[['SHOP', '#3A6EA8', shops], ['RESTAURANT', '#C94A3E', restaurants], ['CINEMA', '#7A4FB0', cinemas], ['ONLINE', '#2FA36B', online]].map(([sign, col, at], k) => (
          <g key={k} opacity={on(f, (at as number) - 2, 8)} transform={`translate(${330 + k * 420} 960) scale(${0.85 * pop(f, (at as number) - 2) * (1 + 0.05 * Math.sin(Math.PI * span(f, same63 + k * 2, same63 + k * 2 + 10)))})`}><Storefront x={0} y={0} sign={sign as string} color={col as string} card={on(f, sell63 + k * 3, 8)} /></g>
        ))}
        {[0, 1, 2, 3].map((k) => <g key={k} opacity={on(f, every63 + k * 2, 8)}><ellipse cx={330 + k * 420} cy={680} rx={90} ry={60} fill={P.gold} opacity={0.2} /></g>)}
        {[0, 1, 2, 3].map((k) => <g key={k} opacity={on(f, some63 + k * 2, 8)}><GiftCard x={330 + k * 420 - 47} y={806} s={0.31} r={-6} crack={1} /></g>)}
        <g opacity={on(f, fully, 8)}><text x={960} y={1050} textAnchor="middle" fill={P.ink} style={{ font: '400 50px "Bebas Neue"', letterSpacing: 2 }}>SOME CARDS ARE NEVER FULLY SPENT</text></g>
      </g>}
      <Vignette id="gc-brk" />
    </g>
  )
}

const BEATS = ['s62:eventually', 's53:company', 's48:that', 's50:3', 's55:expects', 's56:cards', 's58:past', 's59:2024', 's63:same', 's63:some', 's55:customers', 's55:cards', 's60:year', 's61:570', 's50:anything', 's51:picture', 's57:customers', 's57:cards', 's57:counts', 's63:sell', 's63:every', 's46:back', 's46:44', 's47:few', 's47:drinks', 's47:down', 's47:3', 's48:enough', 's48:want', 's48:goes', 's48:drawer', 's49:months', 's49:years', 's49:forget', 's50:still', 's50:owes', 's50:never', 's50:make',
  's51:millions', 's51:left', 's51:lost', 's51:present', 's51:used', 's52:call', 's52:breakage', 's52:spent', 's53:clever', 's53:wait', 's53:forgotten', 's54:past', 's54:knows', 's54:roughly', 's54:spent',
  's55:each', 's55:counts', 's55:matching', 's55:share', 's55:spent', 's56:example', 's56:madeup', 's56:expects', 's56:2', 's56:100', 's56:spent', 's57:spend', 's57:98', 's57:sales', 's57:plus', 's57:breakage', 's57:top',
  's58:real', 's58:own', 's58:worked', 's59:financial', 's59:counted', 's59:208', 's59:sales', 's60:calculation', 's60:570', 's60:day', 's61:day', 's61:drink', 's61:cup', 's61:handed',
  's62:catch', 's62:unspent', 's62:government', 's62:allows', 's62:estimate', 's63:one', 's63:shops', 's63:restaurants', 's63:cinemas', 's63:online', 's63:faces', 's63:fully']
export const GC_BREAKAGE = makePiece('gc-breakage', 'Gift cards long: your card falls to 3.70 and goes into a drawer, years pass, the shop still owes it; millions of leftover cards = BREAKAGE; past years become bars with a gold never-spent top; a made-up 100 = 98 + 2 example where the 2 joins sales; Starbucks 208 million, about 570 thousand a day; a slice to the government; shops, restaurants, cinemas, online stores', {
  mood: 'dark', Component: Breakage, beats: BEATS,
  sfx: [['s47:3', 'ding', 0.3], ['s48:drawer', 'thump', 0.35], ['s49:months', 'swish', 0.3], ['s52:breakage', 'crack', 0.35], ['s57:plus', 'coin', 0.35], ['s59:208', 'chime', 0.35], ['s60:570', 'coin', 0.35], ['s62:government', 'swish', 0.3], ['s63:shops', 'pop', 0.3]] })
