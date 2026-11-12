// ---------------------------------------------------------------- s1–s7: the hook.
// A) Nora walks down a town street to a bank holding a 100 dollar bill. A thought bubble shows what most people
//    picture: an open vault and a box with her name on it. "That box doesn't exist" → a clean cross on the box.
// B) Ten big dollar bills in two rows: nine turn into glowing screen money ("9 in 10 dollars aren't cash"). A banker
//    signs a loan, and sparkles fly from the loan into the screen money ("created by banks, every time they lend").
// C) Nora holds up her paycheck; four step badges (with a small picture each) light up one by one.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Bill, Coin, Headline, Label, Person, fly, hand, win, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { BankFront, DollarBill, NoMark, Shield, Spot, StepBadge, Street, Ticket, Vault } from './kit'

const GROUND = 930

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const put = c('s1:put'), money1 = c('s1:money'), bank1 = c('s1:bank')
  const picture = c('s2:picture'), vault2 = c('s2:vault'), cash2 = c('s2:cash'), box2 = c('s2:box'), name2 = c('s2:name')
  const exist = c('s3:exist'), sitting = c('s3:sitting'), box3b = c('s3:box#2'), all3 = c('s3:all'), goes1 = c('s1:goes')
  const everyday4 = c('s4:everyday'), nine = c('s4:nine'), ten = c('s4:ten'), cash4 = c('s4:cash'), numbers4 = c('s4:numbers')
  const many5 = c('s5:many'), created = c('s5:created'), banks5 = c('s5:banks'), loan5 = c('s5:loan')
  const really6 = c('s6:really'), why6 = c('s6:why'), work6 = c('s6:work')
  const follow7 = c('s7:follow'), paycheck = c('s7:paycheck'), four7 = c('s7:four'), simple7 = c('s7:simple'), steps7 = c('s7:steps')

  const AB = nine - 8, BC = really6 - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), C = on(f, BC, 10)

  // # A) Nora walks from the left towards the bank, then stops and wonders
  const walkT = span(f, 6, bank1 + 10)
  const noraX = lerp(200, 520, walkT)
  const noraBeats: Beat[] = [[0, 'walkA', 'smiling', 'walkB', 14], [bank1 + 10, 'think', 'thinking'], [exist, 'shrug', 'shocked'], [sitting, 'scratchHead', 'thinking']]
  const hp = hand(f, noraBeats, noraX, GROUND, 1.1)
  const bubble = on(f, picture, 10) * (1 - on(f, all3, 10))

  // # B) which of the ten bills have turned digital (nine of them, one by one from "nine" to "numbers")
  const CASHK = 5
  const order = (k: number) => (k < CASHK ? k : k - 1)
  const flipAt = (k: number) => lerp(nine, numbers4, order(k) / 8)
  const turned = (k: number) => k === CASHK ? 0 : on(f, flipAt(k), 8)

  // # C) Nora holds the paycheck in her hand
  const cBeats: Beat[] = [[BC, 'idle', 'thinking'], [why6, 'shrug', 'thinking'], [follow7, 'holdUp', 'smiling'], [four7, 'present', 'smiling']]
  const cp = hand(f, cBeats, 230, GROUND, 1.1)

  return (
    <g>
      <Stage id="bk-hook" frame={f} />
      <Headline f={f} lines={[[put, 'WHERE DOES YOUR MONEY GO?', P.ink, 104], [exist, "THAT BOX DOESN'T EXIST", P.coralInk, 104], [ten, "≈ 9 IN 10 DOLLARS ARE NOT CASH", P.ink, 96], [created, 'BANKS CREATE MONEY WHEN THEY LEND', P.ink, 92], [really6, 'WHAT IS A BANK REALLY DOING?', P.ink, 100], [four7, '4 SIMPLE STEPS', P.ink, 110]]} />

      {/* # A) the walk to the bank and the imagined vault box */}
      {A > 0 && <g opacity={A}>
        <Street f={f} ground={GROUND} trees={[60, 1860]} lamps={[880]} />
        <Ground y={GROUND} />
        <BankFront x={1430} y={GROUND} s={1.25} open={on(f, bank1, 16)} glow={on(f, bank1, 16)} />
        <Person f={f} who="investorF" beats={noraBeats} x={noraX} y={GROUND} s={1.1} />
        <g opacity={win(f, goes1, picture + 6, 8)}><path d={`M${noraX + 120} 560 Q${(noraX + 1430) / 2} 380 1400 700`} fill="none" stroke={P.goldInk} strokeWidth={6} strokeDasharray="16 12" /></g>
        <g opacity={on(f, money1, 8) * (1 - on(f, picture, 10))}><DollarBill x={hp.x + 26} y={hp.y} s={0.7} r={-8} t="$100" /></g>
        {/* the thought bubble: an open vault, a box with her name */}
        {bubble > 0 && <g opacity={bubble} transform={`translate(${noraX + 400} 400) scale(${0.9 + 0.1 * pop(f, picture, 14)})`}>
          <circle cx={-250} cy={240} r={16} fill="#FFFFFF" /><circle cx={-205} cy={190} r={26} fill="#FFFFFF" />
          <ellipse cx={30} cy={0} rx={360} ry={220} fill="#FFFFFF" stroke="#E2D8C2" strokeWidth={4} />
          <g opacity={on(f, vault2, 8)}><Vault x={-60} y={10} s={0.5} open={0.6 * on(f, vault2 + 4, 16)} fill={0.4} f={f} /></g>
          <g opacity={on(f, box2, 8)} transform={`translate(210 ${70 - 10 * pop(f, box2, 12)})`}>
            <rect x={-90} y={-60} width={180} height={110} rx={8} fill="#8E5B3A" /><rect x={-90} y={-60} width={180} height={26} rx={6} fill="#A9744E" />
            <g opacity={on(f, cash2, 8)}><DollarBill x={0} y={-74} s={0.62} r={-6} t="$100" /></g>
            <g opacity={on(f, name2, 8)}><rect x={-62} y={-14} width={124} height={40} rx={6} fill="#FFFFFF" /><text y={16} textAnchor="middle" fill="#16294A" style={{ font: '400 34px "Bebas Neue"' }}>NORA</text></g>
          </g>
          <g transform={`translate(${6 * Math.sin(f / 2) * win(f, box3b, box3b + 14, 4)} 0)`}><NoMark x={210} y={30} o={on(f, exist - 2, 8)} r={100} /></g>
        </g>}
      </g>}

      {/* # B) nine in ten dollars are screen money; banks create it when they lend */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <g transform={`translate(${lerp(0, -220, on(f, many5, 16))} 0)`}>
          {Array.from({ length: 10 }, (_, k) => { const col = k % 5, row = Math.floor(k / 5), at = lerp(nine - 14, nine, k / 9)
            return <g key={k} opacity={on(f, at, 6)} transform={`translate(${470 + col * 250} ${410 + row * 170 - 12 * pop(f, k === CASHK ? cash4 : flipAt(k), 12) - 16 * win(f, everyday4 + k * 2, everyday4 + k * 2 + 14, 6)})`}>
              <DollarBill x={0} y={0} s={1.25} digital={turned(k)} /></g> })}
          <g opacity={on(f, cash4, 8)}><Label x={470} y={700} text="CASH" size={48} font="Bebas Neue" color={P.mintInk} /></g>
          <g opacity={on(f, numbers4, 8)}><Label x={1095} y={330} text="NUMBERS IN BANKS' COMPUTERS" size={48} font="Bebas Neue" color={P.skyInk} /></g>
          <g opacity={on(f, ten, 8) * (1 - on(f, cash4, 8))}><Label x={970} y={700} text="10 DOLLARS" size={48} font="Bebas Neue" color={P.ink} /></g>
        </g>
        {/* the banker and the loan, from "many" */}
        <g opacity={on(f, many5, 12)}>
          <Person f={f} who="investor" beats={[[many5, 'idle', 'neutral'], [created, 'signA', 'smiling', 'signB', 14], [loan5, 'present', 'smug']]} x={1730} y={GROUND} s={1.05} flip />
          <g opacity={on(f, many5 + 16, 8)} transform={`translate(1490 ${660 - 10 * pop(f, loan5, 12)})`}><rect x={-80} y={-100} width={160} height={200} rx={8} fill="#FFFFFF" stroke="#CDB58C" strokeWidth={4} />
            <text y={-46} textAnchor="middle" fill="#16294A" style={{ font: '400 46px "Bebas Neue"' }}>LOAN</text>{[0, 1, 2].map((k) => <rect key={k} x={-52} y={-16 + k * 24} width={104} height={9} rx={4} fill="#E3D3AE" />)}
            <path d="M-50 70 q12 -20 24 0 t24 0 t24 0" fill="none" stroke="#2A8FD0" strokeWidth={4} strokeDasharray="120" strokeDashoffset={120 * (1 - on(f, created, 20))} /></g>
          {/* sparkles from the loan into the screen money */}
          {f >= banks5 && Array.from({ length: 6 }, (_, k) => { const fl = fly(f, banks5 + k * 5, [1490, 600], [lerp(500, 1230, k / 5), 480], 18, 90); return fl.t < 1 ? <circle key={k} cx={fl.x} cy={fl.y} r={13} fill={P.sky} opacity={fl.o} /> : null })}
        </g>
      </g>}

      {/* # C) Nora's paycheck and the four steps */}
      {C > 0 && <g opacity={C}>
        <Street f={f} ground={GROUND} trees={[1880]} lamps={[]} o={0.7} />
        <Ground y={GROUND} />
        <Person f={f} who="investorF" beats={cBeats} x={230} y={GROUND} s={1.1} />
        <g opacity={on(f, paycheck, 8)} transform={`translate(${cp.x + 40} ${cp.y - 10 * pop(f, paycheck, 12)})`}><Bill x={0} y={0} s={0.62} r={-6} text="PAYCHECK" /></g>
        <g opacity={on(f, work6, 8) * (1 - on(f, four7, 8))}><BankFront x={1130} y={GROUND} s={0.95} open={0.3} /></g>
        {([[four7, 'YOUR DEPOSIT'], [lerp(four7, simple7, 0.5), 'HOW BANKS EARN'], [simple7, 'NEW MONEY'], [steps7, 'IF ALL ASK AT ONCE']] as [number, string][]).map(([at, t], k) =>
          <StepBadge key={k} x={680 + k * 345} y={640 - 16 * pop(f, at, 14)} n={k + 1} t={t} o={on(f, at, 8)} lit={win(f, at, at + 24, 6)}>
            {k === 0 && <Ticket x={0} y={0} s={0.8} t="IOU" />}
            {k === 1 && <g><Coin x={-36} y={10} s={0.9} /><Coin x={0} y={-14} s={0.9} /><Coin x={36} y={10} s={0.9} /></g>}
            {k === 2 && <DollarBill x={0} y={0} s={0.9} digital={1} />}
            {k === 3 && <Shield x={0} y={0} s={0.42} t="$" sub="" />}
          </StepBadge>)}
      </g>}
      <Spot f={f} at={nine} x={980} y={480} rx={230} ry={140} />
      <Vignette id="bk-hook" />
    </g>
  )
}

const BEATS = ['s4:everyday', 's1:put', 's1:money', 's1:bank', 's1:goes', 's3:box#2', 's3:all', 's2:picture', 's2:vault', 's2:cash', 's2:box', 's2:name', 's3:exist', 's3:sitting', 's4:nine', 's4:ten', 's4:cash', 's4:numbers', 's5:many', 's5:created', 's5:banks', 's5:loan', 's6:really', 's6:why', 's6:work', 's7:follow', 's7:paycheck', 's7:four', 's7:simple', 's7:steps']
export const BK_HOOK = makePiece('bk-hook', 'Banking long hook: Nora walks down a street to a bank with a 100 dollar bill and pictures an open vault with a box with her name on it; that box does not exist (crossed); ten dollar bills, nine turn into glowing screen money (about 9 in 10 dollars are not cash); a banker signs a loan and sparkles fly into the screen money; Nora holds up her paycheck and four numbered steps light up', {
  mood: 'light', Component: Hook, beats: BEATS,
  sfx: [['s1:bank', 'pop', 0.2], ['s3:exist', 'thud', 0.25], ['s4:nine', 'pop', 0.2], ['s5:loan', 'pop', 0.2], ['s7:four', 'pop', 0.25]] })
