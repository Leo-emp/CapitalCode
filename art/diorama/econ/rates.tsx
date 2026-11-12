// ---------------------------------------------------------------- s73–s93: idea four — interest rates, step by step.
// A) A bank lends a $100 note to a person; a year passes; she brings back $100 plus a $5 coin: the interest.
// B) A savings jar: $1,000 → $1,050. Then two tags: borrowing cost up (red), saving reward up (green).
// C) The Federal Reserve and its big rate dial. Step 1: two banks pass coins overnight; the dial turns from almost 0 (Mar 2022) to
//    above 5% (Jul 2023).
// D) Step 2: a bank passes it on — home, car and business loans get % tags. The mortgage on a house goes 2.65% → 7.79%;
//    two monthly bills on a $300,000 loan: about $1,200 vs about $2,160.
// E) Step 3: rows of new homes, cars and machines thin out. Step 4: a seller tries to push his price tag up but it won't move;
//    the inflation gauge falls from 9.1% to 3% (June 2023); a full container ship sails in (supply chains healing).
// F) The catch: a customer's coin goes to a café, the café pays its worker — every dollar is someone's income. Spending drops,
//    the café dims, the worker walks off.
// G) March 2020: the dial drops to almost zero; then the balance: cool prices without freezing the economy.
import React from 'react'
import { lerp, on, P, pop, Stage, Vignette } from '../kit'
import { Spot } from '../bank/kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win, House, Car, Coin, Jar, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Calendar } from '../charts'
import { BankFront } from '../bank/kit'
import { Factory } from '../power/kit2'
import { Arrow, BoxShip, Cafe, CentralBank, Gauge, Germ, Note, RateDial, Tag, TXT, GREEN, RED } from './kit'

const GROUND = 930
const W = '#FFFFFF'

const Rates: React.FC<PieceProps> = ({ f, c }) => {
  const interest = c('s73:interest'), borrowing = c('s73:borrowing'), money73 = c('s73:money')
  const borrow = c('s74:borrow'), year74 = c('s74:year'), back = c('s74:back'), p105 = c('s74:105'), extra = c('s74:extra'), interest74 = c('s74:interest')
  const savers = c('s75:savers'), p1000 = c('s75:1000'), savings = c('s75:savings'), p1050 = c('s75:1050'), paying = c('s75:paying'), year75 = c('s75:year')
  const rates76 = c('s76:rates'), borrowing76 = c('s76:borrowing'), saving76 = c('s76:saving')
  const price77 = c('s77:price'), borrow77 = c('s77:borrow'), changes77 = c('s77:changes'), buy77 = c('s77:buy'), rewarding = c('s76:rewarding'), expensive76 = c('s76:expensive')
  const central = c('s78:central'), step78 = c('s78:step'), uses = c('s78:uses'), expensive81 = c('s81:expensive'), fallen = c('s86:fallen')
  const one = c('s79:one'), raises = c('s79:raises'), banks79 = c('s79:banks'), overnight = c('s79:overnight')
  const raising = c('s80:raising'), y2022 = c('s80:2022'), pandemic92 = c('s92:pandemic'), y2020 = c('s92:2020')
  const march22 = c('s80:march'), zero = c('s80:zero'), july = c('s80:july'), above = c('s80:above'), p5 = c('s80:5')
  const two = c('s81:two'), pass = c('s81:pass'), homes = c('s81:homes'), cars = c('s81:cars'), businesses = c('s81:businesses')
  const mortgage = c('s82:mortgage'), p265 = c('s82:265'), jan21 = c('s82:january'), oct23 = c('s82:october'), p779 = c('s82:779')
  const p300k = c('s83:300000'), p1200 = c('s83:1200'), month83 = c('s83:month'), p2160 = c('s83:2160')
  const three = c('s84:three'), less84 = c('s84:less'), homes84 = c('s84:homes'), cars84 = c('s84:cars'), machines = c('s84:machines')
  const four = c('s85:four'), fewer85 = c('s85:fewer'), raise85 = c('s85:raise'), cools = c('s85:cools')
  const june23 = c('s86:june'), p3 = c('s86:3')
  const higher = c('s87:higher'), supply87 = c('s87:supply'), healing = c('s87:healing'), tool = c('s87:tool')
  const catch88 = c('s88:catch'), slower = c('s88:slower'), hiring = c('s88:hiring')
  const every89 = c('s89:every'), spend89 = c('s89:spend'), income = c('s89:income')
  const spend90 = c('s90:spend'), earns = c('s90:earns'), workers = c('s90:workers')
  const trouble = c('s91:trouble'), opposite = c('s91:opposite')
  const march20 = c('s92:march'), cut92 = c('s92:cut'), zero92 = c('s92:zero'), cheap = c('s92:cheap'), moving = c('s92:moving')
  const balance = c('s93:balance'), cool93 = c('s93:cool'), freezing = c('s93:freezing'), economy = c('s93:economy')

  const A = win(f, 0, savers - 4), B = win(f, savers - 4, central - 4), Cw = win(f, central - 4, two - 4), D = win(f, two - 4, three - 4)
  const E = win(f, three - 4, catch88 - 4), F = win(f, catch88 - 4, trouble - 4), G = on(f, trouble - 4, 10)

  // # A: the loan's journey
  const out = on(f, borrow, 24), ret = on(f, back, 24)
  // # C: dial value (0–6% → 0–1)
  const dialC = f >= july ? lerp(0.25 / 6, 5.25 / 6, on(f, july, 40)) : f >= march22 ? lerp(0.02, 0.25 / 6, on(f, march22, 20)) : 0.02
  const passT = (f - banks79) / 24
  // # D: mortgage
  const mort = f >= p779 - 6 ? '7.79%' : f >= p265 ? '2.65%' : ''
  // # E: gauge 9.1 → 3.0 (0–10% scale)
  const gaugeV = lerp(0.91, 0.3, on(f, fallen, 40))
  // # G: dial back to zero, then wobbling into balance
  const dialG = f >= balance ? 0.45 + 0.25 * Math.sin((f - balance) / 9) * (1 - on(f, economy, 40)) : lerp(5.25 / 6, 0.02, on(f, cut92, 30))

  const borrower: Beat[] = [[0, 'idle', 'neutral'], [borrow, 'receive', 'smiling'], [borrow + 24, 'hold', 'smiling'], [back, 'offer', 'neutral'], [extra, 'point', 'thinking']]
  return (
    <g>
      <Stage id="ec-rates" frame={f} tint="teal" />
      <Headline f={f} lines={[[interest, 'THE PRICE OF BORROWING', W, 96], [savers, 'AND THE REWARD FOR SAVING', W, 90], [central, 'HOW A CENTRAL BANK USES IT', W, 86], [one, 'STEP 1: THE KEY RATE GOES UP', W, 86], [two, 'STEP 2: BANKS PASS IT ON', W, 90], [p300k, '$300,000 HOME LOAN, 30 YEARS', W, 80], [three, 'STEP 3: LESS BORROWING, LESS SPENDING', W, 80], [four, 'STEP 4: INFLATION COOLS', W, 90], [catch88, 'THE CATCH', W, 100], [trouble, 'WHEN THE ECONOMY IS IN TROUBLE', W, 86], [balance, 'THE BALANCE', P.gold, 100]]} />
      <Ground y={GROUND} dark />

      {/* # A) borrow $100, pay back $105 */}
      {A > 0 && <g opacity={A}>
        <BankFront x={460} y={GROUND} s={1} name="BANK" open={on(f, borrow - 10, 14)} />
        <Person f={f} who="investorF" beats={borrower} x={1400} y={GROUND} s={1} flip />
        <g opacity={on(f, borrow, 6) * (1 - ret)}><Note x={lerp(560, 1260, out)} y={lerp(640, 600, out) - 140 * Math.sin(Math.PI * out)} t="$100" s={0.9} /></g>
        <g opacity={on(f, year74, 8) * (1 - on(f, back, 8))}><Calendar x={960} y={420} text="1 YEAR" s={1.2} flip={on(f, year74, 20)} /></g>
        <g opacity={ret * (1 - on(f, savers - 10, 8))}>
          <Note x={lerp(1260, 600, ret)} y={lerp(600, 640, ret) - 140 * Math.sin(Math.PI * ret)} t="$100" s={0.9} />
          <g opacity={on(f, p105 - 6, 8)}><Coin x={lerp(1290, 700, on(f, p105, 24))} y={lerp(520, 520, 0) - 120 * Math.sin(Math.PI * on(f, p105, 24))} s={1.5} text="5" /></g>
        </g>
        <g opacity={on(f, p105, 8)}><Label x={960} y={320} text="$100 + $5 = $105" size={70} font="Bebas Neue" color={W} /></g>
        <g opacity={on(f, interest74, 8)}><rect x={810} y={370} width={300} height={70} rx={14} fill={P.gold} /><text x={960} y={420} textAnchor="middle" fill={P.ink} style={TXT(50)}>$5 = INTEREST</text></g>
      </g>}

      {/* # B) savers, and the seesaw of a rate rise */}
      {B > 0 && <g opacity={B}>
        <g opacity={1 - on(f, rates76 - 6, 10)}>
          <Jar x={700} y={GROUND} s={1.5} fill={0.45 + 0.2 * on(f, p1050, 20)} label={f >= p1050 ? '$1,050' : '$1,000'} />
          <g opacity={on(f, p1050 - 10, 6) * (1 - on(f, p1050 + 14, 6))}><Coin x={700} y={lerp(400, 480, on(f, p1050 - 10, 22))} s={1.3} text="50" /></g>
          <g opacity={on(f, savings, 8)}><Label x={1440} y={560} text="SAVINGS ACCOUNT" size={66} font="Bebas Neue" color={W} /><Label x={1440} y={650} text="PAYING 5% A YEAR" size={56} font="Bebas Neue" color={GREEN} o={on(f, paying, 8)} /></g>
          <g opacity={win(f, year75, p1050 + 10, 6)}><Calendar x={700} y={300} text="1 YEAR" s={0.9} flip={on(f, year75, 16)} /></g>
          <Person f={f} who="worker" beats={[[savers, 'present', 'smiling'], [p1050, 'celebrate', 'smiling']]} x={1040} y={GROUND} s={0.6} />
        </g>
        <g opacity={on(f, rates76 - 6, 10)}>
          <g opacity={on(f, borrowing76, 8)}><Tag x={560} y={lerp(640, 520, on(f, borrowing76, 20)) - 20 * on(f, expensive76, 10) + 20 * on(f, price77, 10)} t="BORROWING" s={1.1} col={RED} ink={W} /><Arrow x={560} y={760} dir="up" col={RED} s={0.9} /></g>
          <g opacity={on(f, saving76, 8)}><Tag x={1360} y={lerp(640, 520, on(f, saving76, 20)) - 20 * on(f, rewarding, 10) + 20 * on(f, price77, 10)} t="SAVING" s={1.1 + 0.1 * win(f, rewarding, buy77, 6)} col={GREEN} ink={W} /><Arrow x={1360} y={760} dir="up" col={GREEN} s={0.9} /></g>
          <g opacity={on(f, rates76, 8)}><Label x={960} y={400} text="RATES UP" size={80} font="Bebas Neue" color={P.gold} /></g>
          <g opacity={on(f, changes77, 8)}>{[0, 1, 2, 3].map((k) => <g key={k} opacity={k < 2 ? 1 - on(f, borrow77 + 6, 16) : 1}><Person f={f} who={['buyer', 'investor', 'owner', 'investorF'][k]} beats={[[borrow77, k < 2 ? 'walkA' : 'idle', k < 2 ? 'worried' : 'thinking', k < 2 ? 'walkB' : undefined, 10]]} x={760 + k * 130 - (k < 2 ? 200 * on(f, borrow77 + 6, 20) : 0)} y={GROUND} s={0.45} /></g>)}</g>
        </g>
      </g>}

      {/* # C) step 1: the Fed's dial */}
      {Cw > 0 && <g opacity={Cw}>
        <CentralBank x={520} y={GROUND} s={0.95 * (1 + 0.04 * win(f, uses, one, 6))} glow={Math.max(on(f, raises, 20), win(f, uses, one, 6))} />
        <g opacity={win(f, raising, july, 8)}><circle cx={1380} cy={420} r={190} fill={P.gold} opacity={0.2} /></g>
        <RateDial x={1380} y={420} s={1.0} v={dialC} t={f >= p5 ? 'ABOVE 5%' : f >= march22 ? 'FROM ALMOST 0' : 'KEY RATE'} />
        <g opacity={win(f, banks79 - 4, march22, 8)}>
          <BankFront x={1140} y={GROUND} s={0.38} name="BANK A" /><BankFront x={1620} y={GROUND} s={0.38} name="BANK B" />
          {passT > 0 && <Coin x={lerp(1200, 1560, (Math.sin(passT * Math.PI) + 1) / 2)} y={860 - 60 * Math.abs(Math.cos(passT * Math.PI))} s={1.1} />}
          <g opacity={on(f, overnight, 8)}><Label x={1380} y={1000} text="OVERNIGHT LOANS" size={46} font="Bebas Neue" color={W} /></g>
        </g>
        <g opacity={on(f, march22, 8)}><Calendar x={1760} y={300} text={f >= july ? '2023' : '2022'} s={1} flip={Math.max(on(f, july, 16), win(f, y2022, y2022 + 16, 4))} /></g>
      </g>}

      {/* # D) step 2: loans get dearer; the mortgage */}
      {D > 0 && <g opacity={D}>
        <g opacity={1 - on(f, mortgage - 6, 10)}>
          <BankFront x={330} y={GROUND} s={0.8} name="BANK" glow={on(f, pass, 20)} />
          {([[homes, 840, <g key="h" transform="scale(0.7)"><House x={0} y={0} /></g>], [cars, 1260, <g key="c" transform="scale(0.9)"><Car x={0} y={0} /></g>], [businesses, 1560, null]] as [number, number, React.ReactNode][]).slice(0, 2).map(([at, x, pic], k) => <g key={k} opacity={on(f, at, 8)}>
            <g transform={`translate(${x} ${GROUND})`}>{pic}</g><Tag x={x} y={lerp(560, 500, on(f, at, 16)) - 30 * win(f, expensive81, mortgage, 5)} t="% UP" s={0.9 * (1 + 0.12 * win(f, expensive81, mortgage, 5))} col={RED} ink={W} />
          </g>)}
          <g opacity={on(f, businesses, 8)}><Factory x={1660} y={GROUND} s={0.62} f={f} /><Tag x={1660} y={lerp(560, 500, on(f, businesses, 16))} t="% UP" s={0.9} col={RED} ink={W} /></g>
        </g>
        <g opacity={on(f, mortgage - 6, 10) * (1 - on(f, p300k - 6, 10))}>
          <g transform="translate(700 930)"><House x={0} y={0} big={1} /></g>
          <g opacity={on(f, p265, 8)}><Tag x={1300} y={540} t={mort} s={1.5} col={f >= p779 - 6 ? RED : GREEN} ink={W} /></g>
          <g opacity={on(f, jan21, 8)}><Calendar x={1300} y={760} text={f >= oct23 ? '2023' : '2021'} s={1.1} flip={on(f, oct23, 16)} /><Label x={1300} y={880} text={f >= oct23 ? 'OCTOBER' : 'JANUARY'} size={44} font="Bebas Neue" color={W} /></g>
          <Label x={1300} y={380} text="30-YEAR MORTGAGE RATE" size={50} font="Bebas Neue" color={W} o={on(f, mortgage, 8)} />
        </g>
        <g opacity={on(f, p300k - 6, 10)}>
          {([[p1200, 640, 1209, GREEN, 'ABOUT $1,200', 'AT 2.65%'], [p2160, 1280, 2158, RED, 'ABOUT $2,160', 'AT 7.79%']] as [number, number, number, string, string, string][]).map(([at, x, v, col, t, sub], k) => {
            const h = v * 0.22 * on(f, at, 24)
            return <g key={k} opacity={on(f, at, 8)}>
              <rect x={x - 120} y={GROUND - h} width={240} height={h} rx={14} fill={col} />
              <text x={x} y={GROUND - h - 70} textAnchor="middle" fill={W} style={TXT(70)}>{t}</text>
              <text x={x} y={GROUND - h - 20} textAnchor="middle" fill={W} opacity={0.8} style={TXT(42)}>{sub}</text>
            </g>
          })}
          <g opacity={on(f, month83, 8)}><Label x={960} y={980} text="A MONTH (PRINCIPAL + INTEREST)" size={34} font="Inter" color={W} o={0.8} /></g>
        </g>
      </g>}

      {/* # E) steps 3 and 4 */}
      {E > 0 && <g opacity={E}>
        <g opacity={1 - on(f, four - 6, 10)}>
          {([[homes84, 0], [cars84, 1], [machines, 2]] as [number, number][]).map(([at, row], r) => <g key={r}>
            {[0, 1, 2, 3].map((k) => { const gone = k >= 2 ? on(f, at, 18) : 0; return <g key={k} opacity={on(f, three, 8) * (1 - gone)} transform={`translate(${420 + k * 360 + 120 * gone} ${400 + r * 210})`}>
              {row === 0 && <g transform="scale(0.42)"><House x={0} y={0} /></g>}{row === 1 && <g transform="scale(0.55)"><Car x={0} y={0} /></g>}{row === 2 && <g transform="scale(0.32)"><Factory x={0} y={0} f={f} /></g>}
            </g> })}
          </g>)}
          <g opacity={on(f, less84, 8)}><Arrow x={1760} y={560} dir="down" col={RED} s={1} /></g>
        </g>
        <g opacity={on(f, four - 6, 10) * (1 - on(f, june23 - 6, 10))}>
          <Person f={f} who="owner" beats={[[four, 'idle', 'neutral'], [raise85, 'push', 'worried'], [cools, 'shrug', 'neutral']]} x={560} y={GROUND} s={1} />
          <g transform={`translate(860 ${560 - 20 * Math.max(0, Math.sin((f - raise85) / 5)) * win(f, raise85, cools, 6)})`}><Tag x={0} y={0} t="PRICE" s={1.1} col={P.gold} r={0} /></g>
          <g opacity={on(f, fewer85, 8)}>{[0, 1].map((k) => <Person key={k} f={f} who={['buyer', 'investorF'][k]} beats={[[fewer85, 'idle', 'thinking']]} x={1360 + k * 170} y={GROUND} s={0.7} flip />)}</g>
          <g opacity={on(f, cools, 8)}><Label x={1440} y={420} text="INFLATION COOLS" size={70} font="Bebas Neue" color={GREEN} /></g>
        </g>
        <g opacity={on(f, june23 - 6, 10)}>
          <Gauge x={700} y={820} s={1.2} v={gaugeV} t={f >= p3 ? '3%' : '9.1%'} />
          <g opacity={on(f, june23, 8)}><Calendar x={700} y={300} text="2023" s={1} /><Label x={850} y={320} text="JUNE" size={44} font="Bebas Neue" color={W} /></g>
          <g opacity={on(f, supply87, 8)}><BoxShip x={lerp(2200, 1460, on(f, supply87, 50))} y={GROUND - 30} s={0.85} f={f} boxes={8} /></g>
          <g opacity={on(f, healing, 8)}><Label x={1460} y={560} text="SUPPLY CHAINS HEALING" size={54} font="Bebas Neue" color={W} /></g>
          <g opacity={on(f, higher, 8) * (1 - on(f, supply87, 8))}><Label x={1460} y={560} text="NOT ONLY RATES" size={54} font="Bebas Neue" color={W} /></g>
          <g opacity={on(f, tool, 8)}><Label x={1460} y={400} text="RATES: THE MAIN TOOL" size={60} font="Bebas Neue" color={P.gold} /></g>
        </g>
      </g>}

      {/* # F) the catch: spending is someone's income */}
      {F > 0 && <g opacity={F}>
        <Cafe x={960} y={GROUND} s={1.05} lit={1 - 0.8 * on(f, earns, 20)} />
        <Person f={f} who="buyer" beats={[[catch88, 'idle', 'neutral'], [spend89, 'offer', 'smiling'], [spend90, 'walkA', 'neutral', 'walkB', 10]]} x={420 - 300 * on(f, spend90, 30)} y={GROUND} s={0.95} flip={on(f, spend90, 30) > 0.01} />
        <Person f={f} who="worker" beats={[[catch88, 'idle', 'smiling'], [income, 'receive', 'smiling'], [workers, 'walkA', 'worried', 'walkB', 10]]} x={1500 + 400 * on(f, workers, 40)} y={GROUND} s={0.95} flip />
        {f >= spend89 && f < spend90 + 20 && <Coin x={lerp(500, 820, on(f, spend89, 20))} y={600 - 80 * Math.sin(Math.PI * on(f, spend89, 20))} s={1.3} o={1 - on(f, income - 4, 6)} />}
        {f >= income && <Coin x={lerp(1100, 1420, on(f, income, 20))} y={600 - 80 * Math.sin(Math.PI * on(f, income, 20))} s={1.3} o={1 - on(f, spend90, 8)} />}
        <g opacity={on(f, slower, 8) * (1 - on(f, every89, 8))}><Label x={960} y={340} text="SLOWER SPENDING, SLOWER HIRING" size={56} font="Bebas Neue" color={W} /></g>
        <g opacity={on(f, income, 8)}><Label x={960} y={340} text="YOUR SPENDING = SOMEONE'S INCOME" size={56} font="Bebas Neue" color={P.gold} /></g>
      </g>}

      {/* # G) cut to almost zero in 2020, then the balance */}
      {G > 0 && <g opacity={G}>
        <RateDial x={960} y={560} s={1.25} v={dialG} t={f >= balance ? '' : f >= zero92 ? 'ALMOST 0%' : 'KEY RATE'} />
        <g opacity={on(f, march20, 8) * (1 - on(f, balance, 8))}><Calendar x={420} y={470} text="2020" s={1.1} flip={win(f, y2020, y2020 + 16, 4)} /><Label x={420} y={600} text="MARCH" size={44} font="Bebas Neue" color={W} /></g>
        <g opacity={on(f, pandemic92, 8) * (1 - on(f, cheap, 8))}><Germ x={420} y={780} s={1.1} f={f} /></g>
        <g opacity={on(f, cheap, 8) * (1 - on(f, balance, 8))}><Label x={1500} y={470} text="CHEAP BORROWING" size={56} font="Bebas Neue" color={GREEN} />{[0, 1, 2].map((k) => <Coin key={k} x={1380 + k * 120} y={600 + 10 * Math.sin((f + k * 8) / 6)} s={1.1} o={on(f, moving + k * 3, 6)} />)}</g>
        <g opacity={on(f, cool93, 8)}><Label x={400} y={560} text="TOO LOW" size={60} font="Bebas Neue" color={RED} /><Label x={400} y={630} text="PRICES RUN AWAY" size={46} font="Bebas Neue" color={W} /></g>
        <g opacity={on(f, freezing, 8)}><Label x={1520} y={560} text="TOO HIGH" size={60} font="Bebas Neue" color={RED} /><Label x={1520} y={630} text="THE ECONOMY FREEZES" size={46} font="Bebas Neue" color={W} /></g>
      </g>}
      {/* # spots:begin */}
      <g>
        <Spot f={f} at={c("s74:100")} x={960} y={620} rx={230} ry={200} />
        <Spot f={f} at={c("s75:put")} x={900} y={720} rx={230} ry={200} />
        <Spot f={f} at={c("s75:and")} x={900} y={720} rx={230} ry={200} />
        <Spot f={f} at={c("s77:case")} x={900} y={720} rx={230} ry={200} />
        <Spot f={f} at={c("s78:step#2")} x={1380} y={540} rx={200} ry={200} />
        <Spot f={f} at={c("s82:the")} x={1000} y={660} rx={230} ry={200} />
        <Spot f={f} at={c("s82:2021")} x={1000} y={660} rx={230} ry={200} />
        <Spot f={f} at={c("s82:percent#2")} x={1000} y={660} rx={230} ry={200} />
        <Spot f={f} at={c("s83:loan")} x={960} y={720} rx={230} ry={200} />
        <Spot f={f} at={c("s83:2160")} x={960} y={720} rx={230} ry={200} />
        <Spot f={f} at={c("s84:step")} x={960} y={620} rx={230} ry={200} />
        <Spot f={f} at={c("s84:and")} x={960} y={620} rx={230} ry={200} />
        <Spot f={f} at={c("s85:easily")} x={860} y={620} rx={230} ry={200} />
        <Spot f={f} at={c("s86:us")} x={900} y={660} rx={230} ry={200} />
        <Spot f={f} at={c("s87:reason")} x={900} y={660} rx={230} ry={200} />
        <Spot f={f} at={c("s87:but")} x={900} y={660} rx={230} ry={200} />
        <Spot f={f} at={c("s87:has")} x={900} y={660} rx={230} ry={200} />
        <Spot f={f} at={c("s90:caf")} x={960} y={720} rx={230} ry={200} />
        <Spot f={f} at={c("s90:and")} x={960} y={720} rx={230} ry={200} />
        <Spot f={f} at={c("s91:and")} x={960} y={560} rx={200} ry={200} />
        <Spot f={f} at={c("s93:to")} x={960} y={560} rx={200} ry={200} />
      </g>
      {/* # spots:end */}
      <Vignette id="ec-rates" />
    </g>
  )
}

export const EC_RATES = makePiece('ec-rates', 'Interest rates step by step: a bank lends a $100 note, a year passes, she brings back $100 plus a $5 coin — $5 = INTEREST; a savings jar grows from $1,000 to $1,050; RATES UP raises a red BORROWING tag and a green SAVING tag while two borrowers walk away; the Federal Reserve and its big rate dial turning from almost 0 (Mar 2022) to above 5% (Jul 2023) while two banks pass a coin overnight; a bank passes it on to a house and a car with % tags; a mortgage tag on a house goes 2.65% → 7.79%; two bars on a $300,000 loan — about $1,200 vs about $2,160 a month; rows of homes, cars and factories thin out; a seller pushes on a price tag that will not rise, INFLATION COOLS; the gauge falls 9.1% → 3% (June 2023) as a full container ship sails in; a customer pays a café, the café pays its worker; spending drops, the café dims, the worker leaves; the dial drops to almost zero in March 2020 with coins moving again; the dial wobbles into balance between TOO LOW and TOO HIGH.', {
  mood: 'dark', Component: Rates,
  beats: ["s73:interest", "s73:borrowing", "s74:borrow", "s74:year", "s74:back", "s74:105", "s74:extra", "s74:interest", "s75:savers", "s75:savings", "s75:1050", "s75:paying", "s75:year", "s76:rates", "s76:borrowing", "s76:saving", "s77:price", "s77:borrow", "s77:changes", "s77:buy", "s76:rewarding", "s76:expensive", "s78:central", "s78:uses", "s81:expensive", "s86:fallen", "s79:one", "s79:raises", "s79:banks", "s79:overnight", "s80:raising", "s80:2022", "s92:pandemic", "s92:2020", "s80:march", "s80:zero", "s80:july", "s80:above", "s80:5", "s81:two", "s81:pass", "s81:homes", "s81:cars", "s81:businesses", "s82:mortgage", "s82:265", "s82:january", "s82:october", "s82:779", "s83:300000", "s83:1200", "s83:month", "s83:2160", "s84:three", "s84:less", "s84:homes", "s84:cars", "s84:machines", "s85:four", "s85:fewer", "s85:raise", "s85:cools", "s86:june", "s86:3", "s87:higher", "s87:supply", "s87:healing", "s87:tool", "s88:catch", "s88:slower", "s88:hiring", "s89:every", "s89:spend", "s89:income", "s90:spend", "s90:earns", "s90:workers", "s91:trouble", "s91:opposite", "s92:march", "s92:cut", "s92:zero", "s92:cheap", "s92:moving", "s93:balance", "s93:cool", "s93:freezing", "s93:economy", "s74:100", "s75:put", "s75:and", "s77:case", "s78:step#2", "s82:the", "s82:2021", "s82:percent#2", "s83:loan", "s84:step", "s84:and", "s85:easily", "s86:us", "s87:reason", "s87:but", "s87:has", "s90:caf", "s90:and", "s91:and", "s93:to"],
  sfx: [['s74:borrow', 'swish', 0.12], ['s74:105', 'coin', 0.15], ['s75:1050', 'coin', 0.15], ['s80:5', 'riser', 0.12], ['s82:779', 'ding', 0.15], ['s86:3', 'chime', 0.15], ['s90:workers', 'swish', 0.1], ['s92:zero', 'thud', 0.12]] })
