// ---------------------------------------------------------------- s80–s87: the payoff (cream).
// A) Nora with her $1,000 on her phone; the four steps line up and light one by one, each with its picture:
//    the PROMISE ticket, a small coin vs a coin stack (the gap), screen money with a plus, the insurance shield.
// B) "Not really a vault" (a crossed vault) — "a promise machine": promises go in at the top, gears turn, and out come
//    loans, new money and profit, each on its word.
// C) The whole thing works on trust: a calm street, people coming a few at a time, the bank's door open.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, Headline, Label, Person, win } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Mini } from '../../rig/Mini'
import { BankFront, BankPhone, DollarBill, NoMark, Shield, StepBadge, Street, Ticket, Vault } from './kit'

const GROUND = 930
const LOOKS = ['buyer', 'investorF', 'worker', 'owner', 'investor']

const Payoff: React.FC<PieceProps> = ({ f, c }) => {
  const back80 = c('s80:back'), noras = c("s80:nora's"), k1000 = c('s80:1000')
  const deposit81 = c('s81:deposit'), turned81 = c('s81:turned'), owes81 = c('s81:owes'), exact81 = c('s81:exact'), money83 = c('s83:money'), one83 = c('s83:one')
  const step81 = c('s81:step'), promise81 = c('s81:promise'), box81 = c('s81:box')
  const step82 = c('s82:step'), little = c('s82:little'), more82 = c('s82:more'), gap82 = c('s82:gap')
  const step83 = c('s83:step'), lends = c('s83:lends'), creates = c('s83:creates'), ten83 = c('s83:ten'), cash83 = c('s83:cash')
  const step84 = c('s84:step'), cant84 = c("s84:can't"), insurance84 = c('s84:insurance'), behind84 = c('s84:behind')
  const together = c('s85:together'), vault85 = c('s85:vault'), promise85 = c('s85:promise'), machine = c('s85:machine')
  const turns = c('s86:turns'), promises86 = c('s86:promises'), loans86 = c('s86:loans'), new86 = c('s86:new'), money86 = c('s86:money'), gap86 = c('s86:gap'), profit86 = c('s86:profit')
  const whole = c('s87:whole'), simple87 = c('s87:simple'), trust = c('s87:trust'), dont87 = c("s87:don't"), all87 = c('s87:all'), time87 = c('s87:time')

  const AB = together - 6, BC = whole - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  const steps: [number, string][] = [[step81, 'A PROMISE'], [step82, 'THE GAP'], [step83, 'NEW MONEY'], [step84, 'INSURANCE']]

  return (
    <g>
      <Stage id="bk-pay" frame={f} />
      <Headline f={f} lines={[[back80, "BACK TO NORA'S $1,000", P.ink, 104], [step81, 'THE FOUR STEPS', P.ink, 110], [together, 'NOT A VAULT…', P.coralInk, 110], [promise85, '…A PROMISE MACHINE', P.ink, 110], [whole, 'IT ALL RUNS ON TRUST', P.ink, 110]]} />

      {/* # A) Nora and the four steps */}
      {A > 0 && <g opacity={A}>
        <Street f={f} ground={GROUND} trees={[1880]} lamps={[]} o={0.6} />
        <Ground y={GROUND} />
        <Person f={f} who="investorF" beats={[[0, 'idle', 'smiling'], [noras, 'phone', 'smiling'], [step81, 'present', 'smiling'], [step84, 'thumbsUp', 'smiling']]} x={200} y={GROUND} s={1.05} />
        <g opacity={on(f, noras, 8) * (1 - on(f, step81, 10))}><BankPhone x={560} y={560} s={0.9} amount={f >= k1000 ? '$1,000' : '$…'} /></g>
        {steps.map(([at, t], k) => <StepBadge key={k} x={640 + k * 360} y={640 - 16 * pop(f, at, 14)} n={k + 1} t={t} o={on(f, at, 8)} lit={win(f, at, at + 40, 8)}>
          {k === 0 && <g><g opacity={win(f, deposit81, turned81 + 10, 6)}><DollarBill x={0} y={0} s={0.85} t="$1,000" /></g><g opacity={on(f, turned81 + 4, 8)} transform={`translate(0 ${-12 * pop(f, owes81, 12)})`}><Ticket x={0} y={0} s={0.85} t="PROMISE" glow={win(f, promise81, promise81 + 30) + win(f, owes81, owes81 + 30)} /></g>
            <g opacity={win(f, exact81, box81 + 34, 6)} transform="translate(0 -110)"><rect x={-44} y={-28} width={88} height={56} rx={6} fill="#8E5B3A" /><NoMark x={0} y={0} o={on(f, box81 - 2, 6)} r={44} /></g></g>}
          {k === 1 && <g><Coin x={-60} y={30} s={0.5} o={on(f, little, 8)} />{[0, 1, 2, 3, 4].map((q) => <ellipse key={q} cx={40} cy={44 - q * 16} rx={40} ry={12} fill={P.gold} stroke={P.goldD} strokeWidth={3} opacity={on(f, more82, 8)} />)}
            <g opacity={on(f, gap82, 8)}><line x1={-40} y1={-20} x2={10} y2={-40} stroke={P.goldD} strokeWidth={4} strokeDasharray="8 6" /></g></g>}
          {k === 2 && <g><g transform={`scale(${1 + 0.12 * win(f, money83, money83 + 20, 6)})`}><DollarBill x={0} y={10} s={0.95} digital={on(f, creates, 8)} /></g><text x={0} y={-60} textAnchor="middle" fill="#1E9A63" opacity={on(f, creates, 8)} style={{ font: '400 64px "Bebas Neue"' }}>+</text>
            <g opacity={on(f, one83, 8)}><Label x={0} y={-100} text={f >= cash83 ? '1 IN 10 IS CASH' : f >= ten83 ? '1 IN 10…' : '1…'} size={40} font="Bebas Neue" color={P.ink} /></g></g>}
          {k === 3 && <Shield x={0} y={0} s={0.5} t="$" sub="" glow={on(f, behind84, 10)} />}
        </StepBadge>)}
      </g>}

      {/* # B) not a vault — a promise machine */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <g opacity={1 - on(f, promise85, 10)}><Vault x={960} y={560} s={0.9} open={0} f={f} /><NoMark x={960} y={560} o={on(f, vault85, 8)} r={140} /></g>
        <g opacity={on(f, promise85, 10)}>
          {/* the machine body */}
          <g transform={`translate(800 0) scale(${0.95 + 0.05 * on(f, machine, 12)})`} style={{ transformOrigin: '0px 600px' }}>
            <rect x={-260} y={330} width={520} height={500} rx={30} fill="#2E5C9A" /><rect x={-230} y={360} width={460} height={440} rx={20} fill="#3E73B8" />
            <rect x={-120} y={300} width={240} height={50} rx={12} fill="#16294A" /><text x={0} y={336} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 34px "Bebas Neue"' }}>PROMISES IN</text>
            {[[-90, 520, 80], [70, 600, 100], [-40, 700, 60]].map(([gx, gy, gr], k) => <g key={k} transform={`translate(${gx} ${gy}) rotate(${(k % 2 ? -1 : 1) * f * 3})`}>
              {Array.from({ length: 8 }, (_, q) => <rect key={q} x={-12} y={-gr - 14} width={24} height={28} rx={4} fill={P.gold} transform={`rotate(${q * 45})`} />)}<circle r={gr} fill={P.gold} /><circle r={gr * 0.4} fill="#B88A2E" /></g>)}
            <rect x={-200} y={830} width={400} height={100} fill="#16294A" />
          </g>
          {/* promise tickets drop in at the top */}
          {f >= turns && [0, 1, 2].map((k) => { const t = ((f - turns) / 36 + k / 3) % 1; return <Ticket key={k} x={800} y={lerp(200, 262, t)} s={0.55} t="PROMISE" o={1 - t} /> })}
          {/* outputs to the right, each on its word */}
          <g opacity={on(f, loans86, 8)} transform={`translate(1360 ${400 - 10 * pop(f, loans86, 12)})`}><rect x={-80} y={-90} width={160} height={180} rx={8} fill="#FFFFFF" stroke="#CDB58C" strokeWidth={4} />
            <text y={-40} textAnchor="middle" fill="#16294A" style={{ font: '400 44px "Bebas Neue"' }}>LOANS</text>{[0, 1, 2].map((k) => <rect key={k} x={-50} y={-10 + k * 24} width={100} height={9} rx={4} fill="#E3D3AE" />)}</g>
          <g opacity={on(f, money86, 8)} transform={`translate(1360 ${620 - 10 * pop(f, money86, 12)})`}><DollarBill x={0} y={0} s={1.3} digital={1} /><Label x={0} y={90} text="NEW MONEY" size={42} font="Bebas Neue" color={P.skyInk} /></g>
          <g opacity={on(f, profit86, 8)} transform={`translate(1640 ${880 - 10 * pop(f, profit86, 12)})`}>{[0, 1, 2, 3, 4].map((q) => <ellipse key={q} cx={0} cy={-q * 22} rx={60} ry={18} fill={P.gold} stroke={P.goldD} strokeWidth={3} />)}<Label x={0} y={-140} text="PROFIT" size={46} font="Bebas Neue" color={P.goldInk} /></g>
          <g opacity={on(f, gap86, 8) * (1 - on(f, profit86, 8))}><Label x={1640} y={760} text="THE GAP…" size={46} font="Bebas Neue" color={P.goldInk} /></g>
          {/* chutes from the machine to the outputs */}
          {[[1060, 420, 1270, 400, loans86], [1060, 620, 1240, 620, money86], [1060, 800, 1560, 860, profit86]].map(([x1, y1, x2, y2, at], k) => <line key={k} x1={x1} y1={y1} x2={x1 + (x2 - x1) * on(f, at, 10)} y2={y1 + (y2 - y1) * on(f, at, 10)} stroke="#8A97AA" strokeWidth={14} strokeLinecap="round" />)}
        </g>
      </g>}

      {/* # C) trust */}
      {C > 0 && <g opacity={C}>
        <Street f={f} ground={GROUND} trees={[80, 1860]} lamps={[620]} />
        <Ground y={GROUND} />
        <BankFront x={1250} y={GROUND} s={1.15} open={0.7} glow={on(f, trust, 12)} />
        {/* most people stay calm across the street; a few walk up one at a time */}
        {Array.from({ length: 5 }, (_, k) => <g key={k} opacity={on(f, simple87 + k * 2, 6)}><Mini look={LOOKS[k]} x={140 + k * 100} y={GROUND} scale={0.8} frame={f} seed={k + 61} mood="happy" /></g>)}
        {[0, 1].map((k) => { const at = dont87 + k * 20, x = lerp(700, 1080, span(f, at, at + 40)); return <g key={k} opacity={on(f, at, 6)}><Mini look={LOOKS[(k + 2) % 5]} x={x} y={GROUND} scale={0.8} frame={f} seed={k + 71} mood="happy" /></g> })}
        <g opacity={on(f, trust, 8)} transform={`translate(1250 ${300 - 12 * pop(f, trust, 12)})`}><Ticket x={0} y={0} s={1.1} t="TRUST" glow={1} /></g>
        <g opacity={on(f, all87, 8)}><Label x={420} y={540} text="NOT ALL AT ONCE" size={54} font="Bebas Neue" color={P.ink} /></g>
      </g>}
      <Vignette id="bk-pay" />
    </g>
  )
}

const BEATS = ['s81:deposit', 's81:turned', 's81:owes', 's81:exact', 's83:money', 's83:one', 's80:back', "s80:nora's", 's80:1000', 's81:step', 's81:promise', 's81:box', 's82:step', 's82:little', 's82:more', 's82:gap', 's83:step', 's83:lends', 's83:creates', 's83:ten', 's83:cash', 's84:step', "s84:can't", 's84:insurance', 's84:behind', 's85:together', 's85:vault', 's85:promise', 's85:machine', 's86:turns', 's86:promises', 's86:loans', 's86:new', 's86:money', 's86:gap', 's86:profit', 's87:whole', 's87:simple', 's87:trust', "s87:don't", 's87:all', 's87:time']
export const BK_PAYOFF = makePiece('bk-payoff', 'Banking payoff: Nora with her $1,000; four step badges light up with their pictures (promise ticket, small coin vs coin stack, screen money with a plus and 1 in 10 is cash, the insurance shield); a crossed vault becomes a promise machine — promise tickets drop in, gears turn, and out come loans, new money and profit; a calm street where people come a few at a time and TRUST glows over the bank', {
  mood: 'light', Component: Payoff, beats: BEATS,
  sfx: [['s81:step', 'pop', 0.2], ['s85:machine', 'pop', 0.25], ['s86:profit', 'coin', 0.2], ['s87:trust', 'pop', 0.2]] })
