// ---------------------------------------------------------------- s46–s56: step five, how it gets pushed back down (the control room).
// A) A big lever labelled FEDERAL FUNDS RATE between two little banks that pass a coin overnight (moon icon).
//    The Fed official pulls it up; three pipes run from it to a house (mortgage), a car (loan) and a card; each one's rate
//    tag rises; fewer houses and cars sell (they fade, SOLD signs drop off), a factory's smoke slows.
// B) Back on the island: some bonus coins are taken off the stall counter; the price board stops climbing (calm).
// C) The real numbers: a timeline MARCH 2022 → JULY 2023; the lever climbs 0.25 % → 5.5 %; beside it a thermometer of
//    yearly inflation falls 9.1 % → about 3 %.
// D) Careful: a staircase of prices — 2022's high steps STAY; the new steps are just shorter (rising more slowly);
//    a down arrow is crossed (prices did not go back down); the cart is still expensive.
// E) The dial is slow: an hourglass (months) and a HIRING sign that dims; then SEPTEMBER 2026: +3.7 %, and the lever
//    clicks up again.
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { BB, Bill, Car, Card, Cart, Coin, FedRoom, House, K, Label, Lever, Mango, No, Pile, Stall, Tag } from './kit'

const G = 930

const Fight: React.FC<PieceProps> = ({ f, c }) => {
  const main46 = c('s46:main'), dial46 = c('s46:dial'), interest46 = c('s46:interest'), federal46 = c('s46:federal'), funds46 = c('s46:funds'), banks46 = c('s46:banks'), each46 = c('s46:each'), overnight46 = c('s46:overnight'), loans46 = c('s46:loans')
  const raises47 = c('s47:raises'), rates47 = c('s47:rates'), follow47 = c('s47:follow'), mortgages47 = c('s47:mortgages'), car47 = c('s47:car'), credit47 = c('s47:credit'), cost47 = c('s47:cost')
  const borrow48 = c('s48:borrow'), less48 = c('s48:less'), fewer48 = c('s48:fewer'), houses48 = c('s48:houses'), cars48 = c('s48:cars'), slowdown48 = c('s48:slowdown'), spreads48 = c('s48:spreads'), factories48 = c('s48:factories'), shops48 = c('s48:shops')
  const island49 = c('s49:island'), taking49 = c('s49:taking'), bonus49 = c('s49:bonus'), table49 = c('s49:table'), less49 = c('s49:less'), chasing49 = c('s49:chasing'), calm49 = c('s49:calm')
  const what56 = c('s56:what'), own56 = c('s56:own'), supply48 = c('s48:supply'), rate50 = c('s50:rate'), mean52 = c('s52:mean'), happened50 = c('s50:happened'), march50 = c('s50:march'), top50 = c('s50:top'), n025 = c('s50:025'), july50 = c('s50:july'), y2023 = c('s50:2023'), n55 = c('s50:55')
  const june51 = c('s51:june'), yearly51 = c('s51:yearly'), fallen51 = c('s51:fallen'), n91 = c('s51:91'), n3 = c('s51:3')
  const careful52 = c('s52:careful'), lower52 = c('s52:lower'), back52 = c('s52:back'), down52 = c('s52:down'), rising52 = c('s52:rising'), slowly52 = c('s52:slowly'), higher52 = c('s52:higher'), stayed52 = c('s52:stayed')
  const expensive53 = c('s53:expensive'), news53 = c('s53:news'), falling53 = c('s53:falling'), cart53 = c('s53:cart'), pricier53 = c('s53:pricier'), never53 = c('s53:never'), cheaper53 = c('s53:cheaper')
  const slow54 = c('s54:slow'), cost54 = c('s54:cost'), months54 = c('s54:months'), work54 = c('s54:work'), slowing54 = c('s54:slowing'), hiring54 = c('s54:hiring')
  const job55 = c('s55:job'), finished55 = c('s55:finished'), september55 = c('s55:september'), n37 = c('s55:37'), raised55 = c('s55:raised'), again55 = c('s55:again')
  const brings56 = c('s56:brings'), matters56 = c('s56:matters'), money56 = c('s56:money')

  const AB = island49 - 4, BC = happened50 - 4, CD = careful52 - 4, DE = slow54 - 4
  const A = win(f, 0, AB), B = win(f, AB - 8, BC), Cc = win(f, BC - 8, CD), D = win(f, CD - 8, DE), E = on(f, DE - 8, 10)

  // # A) lever, pipes, things that cost more
  const leverA = f < raises47 ? 0.25 : lerp(0.25, 4.5, span(f, raises47, follow47 + 10))
  const oBeats: Beat[] = [[0, 'explain', 'neutral'], [dial46, 'point', 'neutral'], [banks46, 'present', 'neutral'], [raises47, 'pull', 'neutral'], [cost47, 'point', 'neutral'], [borrow48, 'explain', 'neutral'], [spreads48, 'think', 'thinking']]
  const sell = 1 - 0.6 * on(f, fewer48, 12) - 0.25 * on(f, supply48, 12)
  // # C) the lever and the thermometer
  const leverC = f < july50 ? 0.25 : lerp(0.25, 5.5, span(f, july50, n55 + 10))
  const infl = f < fallen51 ? 9.1 : lerp(9.1, 3, span(f, fallen51, n3 + 10))
  const cBeats: Beat[] = [[BC, 'idle', 'neutral'], [march50, 'point', 'neutral'], [top50, 'pointUp', 'neutral'], [july50, 'pull', 'neutral'], [n55, 'pointUp', 'neutral'], [fallen51, 'relief', 'smiling'], [n3, 'thumbsUp', 'smiling']]
  // # D) the staircase: high steps stay
  const STEP = [100, 100.6, 106.1, 115.7, 119.1, 122.7, 125.9] // # real: CPI-U each June, 2019 = 100 (facts f_june)
  const shownD = f < higher52 ? 4 + Math.floor(3 * span(f, rising52, slowly52 + 10)) : 7
  // # E)
  const sand = span(f, months54, work54 + 30)
  const leverE = f < raised55 ? 3.75 : lerp(3.75, 4, span(f, raised55, again55 + 8))

  return (
    <g>
      <FedRoom id="in-f" f={f} tint={B > 0.5 ? 'calm' : 'calm'} floor={G} />
      {/* # A) the dial and what it reaches */}
      {A > 0 && <g opacity={A}>
        <Person f={f} who="investorF" beats={oBeats} x={300} y={G + 20} s={0.95} />
        <g opacity={on(f, dial46 - 4, 10)}><Lever x={640} y={G - 120} s={0.9} value={leverA} text={f >= raises47 ? 'RATE ↑' : '0.25%'} /></g>
        <g opacity={on(f, federal46, 8) * (1 - on(f, raises47, 8))}><Label x={640} y={G + 60} text="FEDERAL FUNDS RATE" size={40} /></g>
        {/* two banks passing a coin overnight */}
        <g opacity={win(f, banks46, raises47, 8)}>
          {[1200, 1640].map((x, k) => <g key={k} transform={`translate(${x} ${G})`}><rect x={-140} y={-260} width={280} height={260} fill={K.cream} /><path d="M-170 -260 L0 -350 L170 -260 Z" fill={K.plum} />{[0, 1, 2, 3].map((j) => <rect key={j} x={-110 + j * 64} y={-230} width={30} height={210} fill={K.lilac} />)}<Label x={0} y={60} text="BANK" size={38} /></g>)}
          {f >= each46 && (() => { const t = span(f, each46, overnight46 + 20); return <Coin x={lerp(1260, 1580, t)} y={560 - 120 * Math.sin(Math.PI * t)} s={1} /> })()}
          <g opacity={on(f, overnight46, 8)} transform="translate(1420 260)"><circle r={50} fill={K.sun} /><circle cx={22} cy={-14} r={46} fill={K.lilac} /><Label x={0} y={110} text="OVERNIGHT LOANS" size={36} /></g>
        </g>
        {/* the pipes to a house, a car, a card */}
        <g opacity={on(f, rates47 - 4, 10)}>
          {[[1150, mortgages47, 'MORTGAGE'], [1450, car47, 'CAR LOAN'], [1750, credit47, 'CARD']].map(([x, at, label], k) => { const o = on(f, at as number, 8), up = on(f, (at as number) + 6, 10)
            return <g key={k} opacity={o}>
              <path d={`M720 ${G - 200} C900 ${G - 420} ${(x as number) - 200} 200 ${x} 300`} fill="none" stroke={K.lilacD} strokeWidth={14} strokeLinecap="round" opacity={0.8} />
              <circle r={10} fill={K.coral} transform={`translate(${lerp(720, x as number, ((f / 30) + k / 3) % 1)} ${lerp(G - 200, 300, ((f / 30) + k / 3) % 1)})`} />
              <g opacity={k === 0 ? sell : k === 1 ? sell : 1}>
                {k === 0 && <House x={x as number} y={G - 30} s={0.85} c={K.coral} />}
                {k === 1 && <Car x={x as number} y={G - 30} s={0.85} f={0} />}
                {k === 2 && <Card x={x as number} y={G - 140} s={0.95} r={-6} />}
              </g>
              <Tag x={x as number} y={330 - 10 * pop(f, (at as number) + 6, 12)} s={0.85} text={up > 0.5 ? 'RATE ↑' : 'RATE'} color={up > 0.5 ? K.coral : K.sun} />
              <Label x={x as number} y={G + 60} text={label as string} size={36} />
            </g> })}
        </g>
        <g opacity={on(f, borrow48, 8)}><Label x={1450} y={170} text={f >= less48 ? 'BORROW & SPEND LESS' : 'BORROW…'} size={44} fill={K.ink} ink={K.paper} /></g>
        <g opacity={on(f, fewer48, 8)}>{[1150, 1450].map((x, k) => <No key={k} x={x} y={G - 150} r={70} o={on(f, k ? cars48 : houses48, 8) * 0.9} />)}</g>
        <g opacity={on(f, slowdown48, 8)}><Label x={1450} y={250} text={f >= shops48 ? 'SPREADS TO FACTORIES & SHOPS' : 'A SLOWDOWN'} size={38} /></g>
      </g>}
      {/* # B) the island again: bonus money off the table */}
      {B > 0 && <g opacity={B}>
        <rect x={-200} y={-200} width={2400} height={1500} fill="#BFE6F5" />
        <rect x={-200} y={560} width={2400} height={500} fill={K.sea} opacity={0.8} />
        <path d={`M-200 ${G} Q960 ${G - 60} 2200 ${G - 30} L2200 1300 L-200 1300 Z`} fill={K.sand} />
        <Stall x={960} y={G} s={1} price={f >= calm49 ? '$3 → $3' : '$3'} priceColor={f >= calm49 ? K.green : K.coral}><Pile x={0} y={-150} s={1.05} full={1} /></Stall>
        {Array.from({ length: 10 }, (_, k) => { const t = span(f, taking49 + k * 2, taking49 + k * 2 + 16), stay = k < 5
          return <Coin key={k} x={stay ? 780 + (k % 5) * 80 : lerp(780 + (k % 5) * 80, -100, t)} y={stay ? G - 180 : lerp(G - 240, 200, t)} s={0.8} /> })}
        <g opacity={on(f, bonus49, 8)}><Label x={960} y={260} text="BONUS MONEY OFF THE TABLE" size={46} /></g>
        <g opacity={on(f, chasing49, 8)}><Label x={960} y={340} text={f >= calm49 ? 'PRICES CALM DOWN' : 'LESS MONEY, SAME MANGOES'} size={46} fill={f >= calm49 ? K.green : K.paper} ink={f >= calm49 ? K.paper : K.ink} /></g>
        <g opacity={on(f, island49, 8) * (1 - on(f, bonus49, 8))}><Mango x={960} y={300} s={1.6} /></g>
      </g>}
      {/* # C) what happened: 0.25 → 5.5 %, 9.1 → 3 % */}
      {Cc > 0 && <g opacity={Cc}>
        <Person f={f} who="investorF" beats={cBeats} x={300} y={G + 20} s={0.95} />
        <g opacity={win(f, rate50, n025 + 10, 6)}><circle cx={720} cy={G - 420} r={80} fill={K.sun} opacity={0.35} /></g>
        <Lever x={720} y={G - 120} s={0.95} value={leverC} text={f >= n55 ? '5.5%' : f >= n025 ? '0.25%' : ''} />
        <g transform="translate(720 0)"><Label x={0} y={G + 60} text={f >= y2023 ? 'JULY 2023' : f >= march50 ? 'MARCH 2022' : 'FED RATE (TOP)'} size={40} /></g>
        <g opacity={on(f, june51 - 4, 10)} transform={`translate(1350 ${G - 60})`}>
          <rect x={-40} y={-520} width={80} height={520} rx={40} fill={K.paper} stroke={K.ink} strokeWidth={6} /><circle cy={20} r={70} fill={K.red} stroke={K.ink} strokeWidth={6} />
          <rect x={-22} y={-50 * infl - 10} width={44} height={50 * infl + 20} rx={22} fill={K.red} />
          <g transform={`translate(180 ${-50 * infl})`}><rect x={-100} y={-40} width={200} height={80} rx={16} fill={K.ink} /><text y={22} textAnchor="middle" fill={K.sun} style={BB(58)} transform={`scale(${1 + 0.15 * pop(f, n91, 14)})`}>{f >= n3 ? '≈ 3%' : '9.1%'}</text></g>
          <Label x={0} y={120} text={f >= yearly51 ? 'YEARLY INFLATION, JUNE 2023' : 'JUNE 2023'} size={36} />
        </g>
      </g>}
      {/* # D) prices stay high (real CPI-U each June, 2019 = 100) */}
      {D > 0 && <g opacity={D}>
        {STEP.slice(0, shownD).map((v, k) => { const h = 80 + (v - 100) * 16, x = 360 + k * 170, after = k >= 4
          return <g key={k}><rect x={x - 70} y={G - h} width={140} height={h} rx={10} fill={after ? K.sun : K.coral} /><rect x={x - 70} y={G - h} width={140} height={16} rx={8} fill="#FFFFFF" opacity={0.4} />
            <text x={x} y={G + 50} textAnchor="middle" fill={K.ink} style={BB(36)}>{['2019', '2020', '2021', '2022', '2023', '2024', '2025'][k]}</text></g> })}
        <Label x={860} y={G + 110} text="US PRICES EACH JUNE (CPI, 2019 = 100)" size={34} />
        <g opacity={win(f, back52, rising52, 6)} transform="translate(1500 380)"><path d="M0 -90 L0 70 M-50 20 L0 72 L50 20" fill="none" stroke={K.sea} strokeWidth={18} strokeLinecap="round" /></g>
        <No x={1500} y={380} r={110} o={win(f, down52, rising52 + 10, 6)} />
        <g opacity={win(f, lower52, back52, 6)}><Label x={1300} y={300} text={f >= mean52 ? 'LOWER INFLATION ≠ LOWER PRICES' : 'LOWER INFLATION…'} size={42} /></g>
        <g opacity={on(f, slowly52, 8) * (1 - on(f, expensive53, 8))}><Label x={1300} y={300} text="STILL RISING — JUST SLOWER" size={42} /></g>
        <g opacity={on(f, stayed52, 8) * (1 - on(f, expensive53, 8))}><Label x={940} y={200} text="2022 PRICES STAYED" size={44} fill={K.coral} ink={K.paper} /></g>
        <g opacity={on(f, cart53 - 6, 10)}><Cart x={1640} y={G - 560 + 0 * pop(f, cart53, 12)} s={0.7} f={f} /></g>
        <g opacity={on(f, news53, 8)}><Label x={1100} y={200} text={f >= falling53 ? '“INFLATION IS FALLING”' : 'THE NEWS SAYS…'} size={44} /></g>
        <g opacity={on(f, never53, 8)}><Label x={1640} y={G - 440} text={f >= cheaper53 ? 'NEVER CHEAPER' : 'PRICIER, SLOWER'} size={38} fill={K.coral} ink={K.paper} /></g>
        <g opacity={on(f, pricier53, 8) * (1 - on(f, never53, 8))}><Label x={1640} y={G - 440} text="PRICIER, SLOWER" size={38} /></g>
      </g>}
      {/* # E) slow, costly, never finished */}
      {E > 0 && <g opacity={E}>
        <Person f={f} who="investorF" beats={[[DE, 'think', 'thinking'], [hiring54, 'nervous', 'worried'], [september55, 'point', 'neutral'], [raised55, 'pull', 'neutral'], [matters56, 'pointUp', 'neutral'], [money56, 'explain', 'smiling']]} x={300} y={G + 20} s={0.95} />
        <g opacity={win(f, slow54, september55, 8)}>
          {/* hourglass */}
          <g transform="translate(860 520)" opacity={on(f, months54 - 4, 8)}><rect x={-110} y={-210} width={220} height={24} rx={8} fill={K.woodD} /><rect x={-110} y={186} width={220} height={24} rx={8} fill={K.woodD} />
            <path d="M-90 -186 L90 -186 L10 0 L90 186 L-90 186 L-10 0 Z" fill="#E8F6F8" opacity={0.8} stroke="#9CC6CF" strokeWidth={5} />
            <path d={`M${-80 + 70 * sand} ${-170 + 160 * sand} L${80 - 70 * sand} ${-170 + 160 * sand} L0 -10 Z`} fill={K.sand} /><path d={`M-80 180 L80 180 L${80 - 70 * (1 - sand)} ${180 - 150 * sand} L${-80 + 70 * (1 - sand)} ${180 - 150 * sand} Z`} fill={K.sand} />
            <Label x={0} y={290} text="MONTHS TO WORK" size={38} /></g>
          {/* hiring sign dims */}
          <g transform="translate(1400 460)" opacity={on(f, slowing54 - 4, 8)}><rect x={-200} y={-90} width={400} height={180} rx={20} fill={K.ink} /><text y={30} textAnchor="middle" fill={K.sun} opacity={1 - 0.7 * on(f, hiring54, 12)} style={BB(90)}>HIRING</text>
            <Label x={0} y={170} text="CAN SLOW HIRING" size={38} fill={K.coral} ink={K.paper} o={on(f, hiring54, 8)} /></g>
          <g opacity={on(f, cost54, 8) * (1 - on(f, months54, 8))}><Label x={1100} y={300} text="SLOW, AND IT HAS A COST" size={46} /></g>
        </g>
        <g opacity={on(f, september55 - 4, 10) * (1 - on(f, brings56, 10))}>
          <Lever x={760} y={G - 120} s={0.95} value={leverE} text={f >= again55 ? '4%' : '3.75%'} />
          <Tag x={1350} y={480 - 10 * pop(f, n37, 12)} s={1.6} text={f >= n37 ? '+3.7%' : '…'} color={K.coral} />
          <Label x={1350} y={620} text="SEPTEMBER 2026, YEAR ON YEAR" size={38} />
          <Label x={760} y={G + 60} text={f >= raised55 ? 'RAISED AGAIN' : 'FED RATE (TOP)'} size={40} fill={f >= raised55 ? K.coral : K.paper} ink={f >= raised55 ? K.paper : K.ink} />
        </g>
        <g opacity={on(f, matters56, 10)}><Bill x={1150} y={480 - 10 * pop(f, money56, 14) - 8 * pop(f, what56, 14)} s={1.1} r={4 * pop(f, own56, 14)} glow={on(f, money56, 10)} /></g>
        <g opacity={on(f, job55, 8) * (1 - on(f, september55 - 4, 8))}><Label x={1100} y={300} text={f >= finished55 ? 'NEVER FINISHED' : 'THE JOB…'} size={52} /></g>
      </g>}
      <Headline f={f} lines={[[main46, 'STEP 5: THE MAIN DIAL', K.ink, 96], [island49, 'BACK ON THE ISLAND', K.ink, 96], [happened50, 'WHAT HAPPENED', K.ink, 100], [careful52, 'PRICES DID NOT FALL', K.coralD, 96], [slow54, 'SLOW, WITH A COST', K.ink, 96], [brings56, 'AND YOUR MONEY?', K.ink, 100]]} />
    </g>
  )
}

export const IN_FIGHT = makePiece('in-fight', "Step five, how inflation is pushed down: a big lever labelled federal funds rate, two banks passing a coin overnight; the Fed official pulls it up and three pipes carry the higher rate to a house (mortgage), a car (car loan) and a card, their rate tags rise, fewer houses and cars sell (crossed) and the slowdown spreads; back on the island, bonus coins slide off the stall's table and the price board calms; the real numbers: the lever climbs from 0.25 percent in March 2022 to 5.5 percent in July 2023 while a thermometer of yearly inflation falls from 9.1 to about 3 percent; a staircase of prices from 2019 to 2025 where the high 2022 steps stay and the newer steps are just shorter, a down arrow is crossed, the cart never got cheaper; an hourglass (months to work) and a HIRING sign that dims; September 2026: +3.7 percent and the lever clicks up again", {
  mood: 'light', Component: Fight,
  beats: ["s46:dial", "s46:federal", "s46:banks", "s46:each", "s46:overnight", "s47:raises", "s47:rates", "s47:follow", "s47:mortgages", "s47:car", "s47:credit", "s47:cost", "s48:borrow", "s48:less", "s48:fewer", "s48:houses", "s48:cars", "s48:slowdown", "s48:spreads", "s48:shops", "s49:island", "s49:taking", "s49:bonus", "s49:chasing", "s49:calm", "s56:what", "s56:own", "s48:supply", "s50:rate", "s52:mean", "s50:happened", "s50:march", "s50:top", "s50:025", "s50:july", "s50:2023", "s50:55", "s51:june", "s51:yearly", "s51:fallen", "s51:91", "s51:3", "s52:careful", "s52:lower", "s52:back", "s52:down", "s52:rising", "s52:slowly", "s52:higher", "s52:stayed", "s53:expensive", "s53:news", "s53:falling", "s53:cart", "s53:pricier", "s53:never", "s53:cheaper", "s54:slow", "s54:cost", "s54:months", "s54:work", "s54:slowing", "s54:hiring", "s55:job", "s55:finished", "s55:september", "s55:37", "s55:raised", "s55:again", "s56:brings", "s56:matters", "s56:money"],
  sfx: [['s47:raises', 'click', 0.1], ['s50:55', 'tick', 0.1], ['s52:down', 'crack', 0.1], ['s55:raised', 'click', 0.1]] })
