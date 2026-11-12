// ---------------------------------------------------------------- s81–s90: the rules.
// A timeline slides in with a 1982 marker. Before 1982: a company tower buys a pile of its own shares and a big
// accusing finger points at it while a price arrow shoots up. In 1982 the SEC's building rises, then a harbour: a boat
// sails into the calm bay and the lighthouse lights (the safe harbour). A day's trading bar splits into four and one
// quarter turns gold; a clock's last minutes turn red with a cross. From 2023: a dollar note loses a 1-cent coin to a
// tax jar; a big profit bar with a hair-thin sliver for the tax; the analyst shrugs as the buyback arrow keeps going;
// Apple's ring with a new $110B pile.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, Doc, Headline, Person, Pile, Tick, win } from '../aimoney/common'
import { Building } from '../kit'
import { Calendar } from '../charts'
import { GovBuilding, Note } from '../gift/kit'
import { Clock, Harbour, Ring, Share } from './kit'

const Rules: React.FC<PieceProps> = ({ f, c }) => {
  const common = c('s81:common')
  const before = c('s82:before'), bought82 = c('s82:bought'), accused = c('s82:accused'), price82 = c('s82:price')
  const regulator = c('s83:regulator'), safe = c('s83:safe'), rule83 = c('s83:rule')
  const follows = c('s84:follows'), protected84 = c('s84:protected')
  const quarter = c('s85:quarter'), day85 = c('s85:day'), s85 = c('s85'), buy85 = c('s85:buy')
  const last = c('s86:last'), closes = c('s86:closes')
  const tax87 = c('s87:tax'), cent = c('s87:cent'), dollar87 = c('s87:dollar'), s87 = c('s87')
  const cut88 = c('s88:cut'), half88 = c('s88:half')
  const analyst = c('s89:analyst'), manageable = c('s89:manageable'), slowed = c('s89:slowed')
  const apple90 = c('s90:apple'), n110 = c('s90:110'), may90 = c('s90:may'), plans90 = c('s90:plans'), shares90 = c('s90:shares')
  const A = win(f, 0, regulator), B = win(f, regulator - 4, s85), C = win(f, s85 - 4, s87), D = win(f, s87 - 4, apple90), E = on(f, apple90 - 4, 8)
  const shoot = easeInOut(span(f, price82, price82 + 16))
  // # gap fillers (plan gate round 4): one relevant movement in each remaining pause
  const h1 = c('s87:spent'), h2 = c('s88:companies'), h3 = c('s88:that')
  const g1 = c('s82:american'), g2 = c('s82:sure'), g3 = c('s83:market'), g4 = c('s87:america'), g5 = c('s88:tax'), g6 = c('s88:less')
  return (
    <g>
      <Stage id="bb-rules" frame={f} />
      <Headline f={f} lines={[[common, 'NOT ALWAYS THIS COMMON', P.ink, 104], [before, 'BEFORE 1982: A LEGAL RISK', P.ink, 104], [regulator, '1982: THE SEC’S SAFE HARBOR', P.goldInk, 104], [protected84, 'FOLLOW THE RULE = PROTECTED', P.ink, 100],
        [quarter, 'MAX ABOUT 1/4 OF A DAY’S TRADING', P.ink, 96], [last, 'NOT IN THE LAST MINUTES', P.ink, 104], [tax87, 'FROM 2023: A 1% TAX', P.goldInk, 110], [cut88, '2024: PROFITS CUT BY UNDER 0.5%', P.ink, 96],
        [manageable, '“A MANAGEABLE COST”', P.ink, 104], [apple90, 'APPLE, MAY 2024: UP TO $110B MORE', P.goldInk, 96]]} />
      {/* # A: timeline + the accusing finger */}
      {A > 0 && <g opacity={A}>
        <g transform={`translate(${lerp(-1200, 0, easeInOut(span(f, common, common + 16)))} 0)`} opacity={1 - on(f, bought82, 8)}>
          <rect x={200} y={600} width={1520} height={14} rx={7} fill={P.ink2} />
          {[[400, '1970'], [960, '1982'], [1520, '2024']].map(([x, y], k) => <g key={k}><circle cx={x as number} cy={607} r={k === 1 ? 30 : 18} fill={k === 1 ? P.gold : P.ink2} /><text x={x as number} y={700} textAnchor="middle" fill={P.ink} style={{ font: '400 64px "Bebas Neue"' }}>{y as string}</text></g>)}
          {Array.from({ length: 8 }, (_, k) => <rect key={k} x={1000 + k * 64} y={600 - (k + 1) * 34} width={44} height={(k + 1) * 34} rx={6} fill={P.gold} opacity={0.75} />)}
        </g>
        <g opacity={on(f, before, 6)}>
          <g transform={`translate(240 0)`}><Calendar x={0} y={420} text="1981" s={1} /></g>
          <Ring x={760} y={860} s={0.8} name="COMPANY" />
          {Array.from({ length: 6 }, (_, k) => <g key={k} opacity={on(f, bought82 + k * 2, 5)}><Share x={760 + (k % 3) * 60 - 60} y={700 - Math.floor(k / 3) * 60} s={0.45} r={-8 + k * 4} /></g>)}
          {/* # the price arrow shoots up */}
          <g opacity={on(f, price82, 6)}><path d={`M1080 900 L${lerp(1080, 1400, shoot)} ${lerp(900, 420, shoot)}`} stroke={P.mintInk} strokeWidth={18} strokeLinecap="round" /><circle cx={lerp(1080, 1400, shoot)} cy={lerp(900, 420, shoot)} r={22} fill={P.mintInk} /></g>
          {/* # a big pointing finger */}
          <g opacity={on(f, accused, 6)} transform={`translate(${lerp(2100, 1560, easeInOut(span(f, accused, accused + 12)))} 620)`}>
            <rect x={0} y={-50} width={420} height={110} rx={50} fill="#F2C9A0" /><rect x={-170} y={-24} width={200} height={50} rx={25} fill="#F2C9A0" /><rect x={300} y={-70} width={300} height={150} rx={30} fill="#2B8FE0" />
          </g>
        </g>
      </g>}
      {/* # B: the SEC building, then the harbour: a boat sails in, the light comes on */}
      {B > 0 && <g opacity={B}>
        <g opacity={1 - on(f, safe, 8)} transform={`translate(960 ${lerp(1200, 860, easeInOut(span(f, regulator, regulator + 14)))}) scale(1.4)`}><GovBuilding x={0} y={0} /><text x={0} y={-330} textAnchor="middle" fill={P.ink} style={{ font: '400 60px "Bebas Neue"', letterSpacing: 6 }}>SEC</text></g>
        <g opacity={on(f, safe, 8)}>
          <Harbour x={960} y={760} s={1.25} f={f} boat={easeInOut(span(f, rule83, follows + 20))} light={on(f, protected84, 10)} />
          <g opacity={on(f, follows, 6)}><text x={330} y={430} fill={P.ink} style={{ font: '400 56px "Bebas Neue"' }}>BUYBACK</text></g>
          <Tick x={1600} y={360} o={on(f, protected84 + 6, 6)} r={50} />
        </g>
      </g>}
      {/* # C: a day's trading in four; one quarter gold; then a clock's last minutes in red */}
      {C > 0 && <g opacity={C}>
        <g opacity={1 - on(f, last, 8)}>
          <rect x={360} y={480} width={1200} height={200} rx={24} fill={P.card} stroke={P.ink2} strokeWidth={3} />
          {[0, 1, 2, 3].map((k) => <rect key={k} x={370 + k * 297.5} y={490} width={287.5 * on(f, buy85 + k * 3, 8)} height={180} rx={18} fill={k === 0 && f > quarter ? P.gold : '#9FB4D6'} />)}
          <text x={515} y={610} textAnchor="middle" fill="#0E1B33" opacity={on(f, quarter + 4, 6)} style={{ font: '400 90px "Bebas Neue"' }}>25%</text>
          <text x={960} y={800} textAnchor="middle" fill={P.ink} opacity={on(f, day85, 6)} style={{ font: '400 64px "Bebas Neue"' }}>ONE NORMAL DAY OF TRADING IN ITS SHARES</text>
        </g>
        <g opacity={on(f, last, 6)} transform={`translate(960 620) scale(${pop(f, last) * 1.5})`}><Clock x={0} y={0} t={easeInOut(span(f, last, closes + 20))} warn={on(f, closes, 8)} /></g>
        <g opacity={on(f, closes, 6)}><path d="M1300 420 L1500 620 M1500 420 L1300 620" stroke={P.coral} strokeWidth={26} strokeLinecap="round" /></g>
      </g>}
      {/* # D: a dollar loses one cent to the tax; a big profit bar with a sliver; the analyst shrugs */}
      {D > 0 && <g opacity={D}>
        <g opacity={1 - on(f, cut88, 8)}>
          <g transform={`translate(760 600) scale(${pop(f, s87) * 1.9})`}><Note x={0} y={0} text="$1" /></g>
          {(() => { const t = easeInOut(span(f, cent, cent + 18)); return <g opacity={on(f, cent, 4)}><Coin x={lerp(840, 1360, t)} y={lerp(600, 760, t) - Math.sin(t * Math.PI) * 160} s={0.9} text="1¢" /></g> })()}
          <g opacity={on(f, dollar87, 6)} transform="translate(1360 820)"><rect x={-110} y={-120} width={220} height={150} rx={30} fill="#DDEBF7" opacity={0.5} stroke="#A9C4DE" strokeWidth={6} /><text x={0} y={-140} textAnchor="middle" fill={P.ink} style={{ font: '400 56px "Bebas Neue"' }}>TAX</text></g>
        </g>
        <g opacity={on(f, cut88, 6) * (1 - on(f, analyst, 8))}>
          <rect x={300} y={520} width={1320} height={160} rx={24} fill={P.mint} />
          <rect x={1620 - Math.max(6, 1320 * 0.0044)} y={520} width={Math.max(6, 1320 * 0.0044)} height={160} fill={P.coral} opacity={on(f, half88, 6)} />
          <text x={960} y={630} textAnchor="middle" fill="#0E1B33" style={{ font: '400 80px "Bebas Neue"' }}>PROFITS</text>
          <g opacity={on(f, half88, 6)}><path d="M1610 700 L1610 780" stroke={P.coralInk} strokeWidth={6} /><text x={1610} y={850} textAnchor="middle" fill={P.coralInk} style={{ font: '400 60px "Bebas Neue"' }}>0.44% TAX</text></g>
        </g>
        <g opacity={on(f, analyst, 6)}>
          <Person f={f} who="investor" beats={[[0, 'idle', 'neutral'], [manageable, 'shrug', 'smug'], [slowed, 'point', 'neutral']]} x={520} y={1000} s={0.95} />
          <g opacity={on(f, slowed, 6)}>{Array.from({ length: 5 }, (_, k) => { const x = ((f - slowed) * 14 + k * 260) % 1300; return <Share key={k} x={900 + x} y={600 - Math.sin(x / 200) * 40} s={0.5} /> })}<path d="M880 760 L1760 760" stroke={P.goldInk} strokeWidth={12} strokeLinecap="round" /><path d="M1760 736 l40 24 l-40 24 Z" fill={P.goldInk} /></g>
        </g>
      </g>}
      {/* # E: Apple's ring with a new $110B pile */}
      {E > 0 && <g opacity={E}>
        <g transform={`translate(0 ${lerp(300, 0, easeInOut(span(f, apple90, apple90 + 14)))})`}><Ring x={620} y={800} s={1} /></g>
        <g opacity={on(f, may90, 6) * (1 - on(f, n110, 6))} transform={`translate(1400 520) scale(${pop(f, may90)})`}><Calendar x={0} y={0} text="MAY 24" s={1.2} /></g>
        <g opacity={on(f, plans90, 6) * (1 - on(f, n110, 6))} transform={`translate(1700 640) scale(${pop(f, plans90) * 0.7})`}><Doc x={0} y={0} title="PLAN" /></g>
        <circle cx={1400} cy={820} r={260 + 12 * Math.sin((f - shares90) / 4)} fill="none" stroke={P.goldInk} strokeWidth={10} opacity={on(f, shares90, 6)} />
        <Pile x={1400} y={940} n={Math.round(33 * easeInOut(span(f, n110, n110 + 24)))} s={1.4} />
        <g opacity={on(f, n110, 6)}><text x={1400} y={500} textAnchor="middle" fill={P.goldInk} style={{ font: '400 130px "Bebas Neue"' }}>$110B</text></g>
      </g>}
      {/* # gap fillers */}
      {A > 0 && <g opacity={A}>
        <g opacity={on(f, g1, 6) * (1 - on(f, before + 200, 6))} transform={`translate(760 ${lerp(1100, 960, on(f, g1, 12))})`}><rect x={-150} y={-30} width={300} height={30} rx={8} fill={P.ink2} opacity={0.5} /></g>
        <g opacity={on(f, g2, 6) * (1 - on(f, accused, 6))} transform={`translate(760 380) scale(${pop(f, g2)})`}><text x={0} y={0} textAnchor="middle" fill={P.coralInk} style={{ font: '400 160px "Bebas Neue"' }}>?</text></g>
      </g>}
      {B > 0 && <g opacity={B * on(f, g3, 6) * (1 - on(f, safe, 6))}><rect x={560} y={940} width={800} height={14} rx={7} fill={P.ink2} /></g>}
      {D > 0 && <g opacity={D}>
        <g opacity={on(f, g4, 6) * (1 - on(f, cut88, 6))} transform={`translate(1620 ${lerp(860, 760, on(f, g4, 12))}) scale(0.7)`}><GovBuilding x={0} y={0} /></g>
        <g opacity={on(f, g5, 6) * (1 - on(f, cut88, 6))}><rect x={1270} y={720} width={180} height={90 * on(f, g5, 12)} rx={12} fill={P.gold} transform="translate(0 -40)" /></g>
        <g opacity={on(f, g6, 6) * (1 - on(f, analyst, 6))} transform="translate(1610 600)"><circle r={80} fill="none" stroke={P.ink} strokeWidth={12} /><path d="M56 56 L110 110" stroke={P.ink} strokeWidth={16} strokeLinecap="round" /></g>
      </g>}
      {D > 0 && <g opacity={D * on(f, h1, 6) * (1 - on(f, cut88, 6))}>{[0, 1, 2].map((k) => <Coin key={k} x={1300 + k * 40} y={lerp(560, 760, easeInOut(span(f, h1 + k * 4, h1 + k * 4 + 12)))} s={0.5} text="1¢" />)}</g>}
      {D > 0 && <g opacity={D * on(f, h3, 6) * (1 - on(f, cut88, 6))}><rect x={1250} y={680} width={220} height={150} rx={30} fill="none" stroke={P.goldInk} strokeWidth={8} /></g>}
      {D > 0 && <g opacity={D * on(f, h2, 6) * (1 - on(f, analyst, 6))}><g transform={`translate(420 380) scale(${pop(f, h2)})`}><rect x={-170} y={-50} width={340} height={100} rx={18} fill={P.card} /><text x={0} y={20} textAnchor="middle" fill={P.ink} style={{ font: "400 56px \"Bebas Neue\"" }}>500 COMPANIES</text></g></g>}
      <Vignette id="bb-rules" />
    </g>
  )
}

const BEATS = ['s88:that', 's87:spent', 's88:companies', 's82:american', 's82:sure', 's83:market', 's87:america', 's88:tax', 's88:less', 's81:common', 's82:before', 's82:bought', 's82:accused', 's82:price', 's83:regulator', 's83:safe', 's83:rule', 's84:follows', 's84:protected', 's85', 's85:buy', 's85:quarter', 's85:day', 's86:last', 's86:closes',
  's87', 's87:tax', 's87:cent', 's87:dollar', 's88:cut', 's88:half', 's89:analyst', 's89:manageable', 's89:slowed', 's90:apple', 's90:may', 's90:plans', 's90:110', 's90:shares']
export const BB_RULES = makePiece('bb-rules', 'Buybacks long: a timeline with a 1982 marker; before 1982 a tower buys its own shares while a big finger points and a price arrow shoots up; the SEC building rises; a harbour where a boat sails in and the lighthouse lights; a day of trading split in four with one gold quarter; a clock with red last minutes and a cross; a 1-cent coin leaves a dollar for a tax jar; a profit bar with a thin 0.44% sliver; the analyst shrugs as shares keep flowing; Apple ring with a $110B pile', {
  mood: 'light', Component: Rules, beats: BEATS,
  sfx: [['s82:accused', 'thud', 0.3], ['s83:safe', 'swish', 0.3], ['s84:protected', 'chime', 0.3], ['s86:closes', 'click', 0.3], ['s87:cent', 'coin', 0.35], ['s90:110', 'coin', 0.3]] })
