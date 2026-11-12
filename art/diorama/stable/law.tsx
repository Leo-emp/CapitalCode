// ---------------------------------------------------------------- s77–s86: why holders get nothing (navy: the rule).
// A) An interest coin starts from the coin company toward Maya ("why not just give holders the interest?"); a barrier
//    drops between them ("not allowed"). A calendar: July 2025; the GENIUS Act scroll unrolls and is stamped LAW; its
//    rule as a picture: coin → holder, crossed.
// B) Without the rule: two coin companies hang interest signs like a bank's savings rate. Banks push for the line; a
//    bank worries as savings coins fly out of its doors toward stablecoins. Banks and crypto companies in a tug of war
//    over an app's reward coins.
// C) Maya's dollar still earns: the interest coin rises, comes to the barrier and turns back to the company. By law,
//    it doesn't go to Maya.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, Stamp, win, type Beat } from '../aimoney/common'
import { Calendar } from '../charts'
import { Ground, Scroll } from '../power/kit2'
import { GovBuilding } from '../fee/kit'
import { CoinHQ, Cross, Dollar, SCoin } from './kit'

const GROUND = 920
const Gold: React.FC<{ x: number; y: number; r?: number; o?: number }> = ({ x, y, r = 16, o = 1 }) => <g opacity={o} transform={`translate(${x} ${y})`}><circle r={r} fill={P.gold} /><circle r={r * 0.7} fill="none" stroke={P.goldD} strokeWidth={3} /></g>
// # a striped barrier arm that drops down
const Barrier: React.FC<{ x: number; y: number; t: number; o?: number }> = ({ x, y, t, o = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-14} y={-260} width={28} height={260} rx={8} fill="#8A97AA" />
    <g transform={`rotate(${lerp(-80, 0, t)} 0 -240)`}><rect x={0} y={-256} width={320} height={32} rx={14} fill="#FFFFFF" />
      {[0, 1, 2, 3].map((k) => <rect key={k} x={20 + k * 80} y={-256} width={40} height={32} fill={P.coral} />)}</g>
  </g>
)
const BankB: React.FC<{ x: number; y: number; s?: number; o?: number; sign?: string }> = ({ x, y, s = 1, o = 1, sign = 'BANK' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={190} ry={14} fill="#000" opacity={0.2} />
    <rect x={-170} y={-30} width={340} height={30} rx={4} fill="#C9D3E1" />
    {[-120, -40, 40, 120].map((cx) => <rect key={cx} x={cx - 20} y={-220} width={40} height={190} rx={6} fill="#E8EEF5" />)}
    <rect x={-170} y={-250} width={340} height={30} rx={4} fill="#C9D3E1" /><path d="M-190 -250 L0 -340 L190 -250 Z" fill="#E8EEF5" />
    <text x={0} y={-272} textAnchor="middle" fill={P.navy2} style={{ font: '400 36px "Bebas Neue"', letterSpacing: 4 }}>{sign}</text>
  </g>
)
// # a hanging rate sign
const RateSign: React.FC<{ x: number; y: number; text: string; o?: number; swing?: number }> = ({ x, y, text, o = 1, swing = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${swing})`} opacity={o}>
    <line x1={-50} y1={-60} x2={-50} y2={0} stroke="#8A97AA" strokeWidth={4} /><line x1={50} y1={-60} x2={50} y2={0} stroke="#8A97AA" strokeWidth={4} />
    <rect x={-90} y={0} width={180} height={80} rx={14} fill={P.gold} /><text x={0} y={58} textAnchor="middle" fill={P.navy0} style={{ font: '400 50px "Bebas Neue"' }}>{text}</text>
  </g>
)

const Law: React.FC<PieceProps> = ({ f, c }) => {
  const why = c('s77:why'), give = c('s77:give'), holders77 = c('s77:holders'), interest77 = c('s77:interest')
  const us78 = c('s78:us'), isnt = c("s78:isn't"), allowed = c('s78:allowed')
  const july = c('s79:july'), genius = c('s79:genius'), act = c('s79:act'), law79 = c('s79:law'), first = c('s79:first'), stable79 = c('s79:stablecoins')
  const says = c('s80:says'), not80 = c('s80:not'), pay80 = c('s80:pay'), holding = c('s80:holding')
  const without = c('s81:without'), compete = c('s81:compete'), sharing = c('s81:sharing'), banks81 = c('s81:banks'), savings81 = c('s81:savings')
  const banks82 = c('s82:banks'), pushed = c('s82:pushed'), line = c('s82:line')
  const worry = c('s83:worry'), stable83 = c('s83:stablecoins'), int83 = c('s83:interest'), paid83 = c('s83:paid'), move = c('s83:move'), accounts = c('s83:accounts')
  const fighting = c('s84:fighting'), crypto84 = c('s84:crypto'), apps84 = c('s84:apps'), rewards = c('s84:rewards')
  const interest85 = c('s85:interest'), disappear = c('s85:disappear')
  const law86 = c('s86:law'), go86 = c('s86:go'), maya86 = c('s86:maya')
  const AB = without - 4, BC = interest85 - 4
  const A = win(f, why - 20, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  const B1 = win(f, AB, banks82 - 4), B2 = win(f, banks82 - 4, fighting - 4), B3 = on(f, fighting - 4, 10)
  return (
    <g>
      <Stage id="sc-law" frame={f} />
      <Headline f={f} lines={[[why, 'WHY NOT GIVE HOLDERS THE INTEREST?', P.ink, 88], [allowed, "IN THE US: NOT ALLOWED", P.coralInk, 100], [july, 'JULY 2025', P.ink, 104], [act, 'THE GENIUS ACT', P.ink, 108], [holding, 'NO INTEREST JUST FOR HOLDING', P.ink, 96], [without, 'WITHOUT THAT RULE…', P.ink, 100], [banks82, '', P.ink], [worry, '', P.ink], [fighting, 'STILL FIGHTING OVER REWARDS', P.ink, 96], [disappear, '', P.ink], [law86, "BY LAW: NOT TO MAYA", P.coralInk, 104]]} />

      {/* # A) the barrier, the law */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <Person f={f} who="investorF" beats={[[0, 'idle', 'neutral'], [give, 'receive', 'smiling'], [allowed, 'shrug', 'worried']]} x={300} y={GROUND} s={0.8} o={1 - on(f, july, 10)} />
        <g opacity={1 - on(f, july, 10)}>
          <CoinHQ x={1560} y={GROUND} s={0.75} sign="COIN COMPANY" />
          <Gold x={lerp(1420, lerp(1000, 1080, on(f, allowed, 10)), on(f, give, 16))} y={560} r={30} o={on(f, give, 8)} />
          <Barrier x={820} y={GROUND} t={on(f, isnt, 12)} o={on(f, us78, 8)} />
        </g>
        {/* # July 2025: the act unrolls and is stamped */}
        <g opacity={on(f, july, 10)}>
          <Calendar x={420} y={400} text="JULY" s={1.1} /><Label x={420} y={540} text="2025" size={56} font="Bebas Neue" color={P.ink} />
          <GovBuilding x={420} y={GROUND} s={0.6} />
          <Scroll x={1100} y={540} s={1.5} open={on(f, genius, 20)} />
          <g opacity={on(f, act, 8)}><Label x={1100} y={420} text="GENIUS ACT" size={60} font="Bebas Neue" color={P.navy2} /></g>
          <Stamp x={1100} y={620} text="LAW" f={f} at={law79} size={70} />
          <g opacity={on(f, first, 8) * (1 - on(f, says, 8))} transform="translate(1360 380) rotate(10)"><circle r={56} fill={P.gold} /><text y={16} textAnchor="middle" fill={P.navy0} style={{ font: '400 46px "Bebas Neue"' }}>1ST</text></g>
          <g opacity={on(f, stable79, 8) * (1 - on(f, says, 8))}><SCoin x={840} y={380} s={1.0} spin={Math.max(0, 1 - span(f, stable79, stable79 + 14))} /></g>
          {/* # the rule as a picture: a coin to the holder, crossed */}
          <g opacity={on(f, says, 10)}>
            <rect x={760} y={760} width={680} height={110} rx={20} fill={P.card} />
            <SCoin x={850} y={815} s={0.6} /><path d="M910 815 L1240 815 M1210 790 L1240 815 L1210 840" fill="none" stroke={P.ink2} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
            <Gold x={1060} y={815} r={24} o={on(f, pay80, 8)} />
            <g opacity={on(f, pay80, 8)}><Label x={1340} y={835} text="HOLDER" size={46} font="Bebas Neue" color={P.ink} /></g>
            <Cross x={1060} y={815} o={on(f, not80, 8)} size={40} />
          </g>
        </g>
      </g>}

      {/* # B) without the rule; banks; the tug of war */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        {B1 > 0 && <g opacity={B1}>
          <CoinHQ x={420} y={GROUND} s={0.7} sign="COIN CO. A" o={on(f, compete, 8)} />
          <CoinHQ x={860} y={GROUND} s={0.7} sign="COIN CO. B" o={on(f, compete + 4, 8)} />
          <RateSign x={420} y={300} text="4%" o={on(f, sharing, 8)} swing={Math.sin((f - sharing) / 8) * 4} />
          <RateSign x={860} y={300} text="4.5%" o={on(f, sharing + 6, 8)} swing={Math.sin((f - sharing) / 7) * 4} />
          <g opacity={on(f, banks81, 10)}><BankB x={1450} y={GROUND} s={0.95} /><RateSign x={1450} y={300} text="SAVINGS" o={on(f, savings81, 8)} swing={Math.sin((f - savings81) / 9) * 3} /></g>
        </g>}
        {B2 > 0 && <g opacity={B2}>
          <BankB x={560} y={GROUND} s={1.1} />
          <Person f={f} who="owner" beats={[[0, 'idle', 'neutral'], [pushed, 'push', 'angry'], [worry, 'nervous', 'worried']]} x={1000} y={GROUND} s={0.85} />
          <g opacity={on(f, line, 8) * (1 - on(f, worry, 8))}><rect x={1160} y={GROUND - 300} width={70} height={300} rx={10} fill={P.coral} /><Label x={1195} y={GROUND + 70} text="THE RULE" size={46} font="Bebas Neue" color="#1B2A4A" /></g>
          {/* # savings coins flying out of the bank toward stablecoins */}
          <g opacity={on(f, stable83, 8)}><SCoin x={1640} y={GROUND - 220} s={1.4} /></g>
          <g opacity={on(f, int83, 8)}><RateSign x={1640} y={GROUND - 420} text="4%?" swing={Math.sin((f - int83) / 8) * 4} /></g>
          <g opacity={on(f, move, 8)}>
            {Array.from({ length: 4 }, (_, k) => { const t = ((f - move + k * 9) % 36) / 36; return <Gold key={k} x={lerp(640, 1580, t)} y={GROUND - 200 - Math.sin(t * Math.PI) * 160} r={22} o={Math.min(1, t * 5) * (1 - Math.max(0, t - 0.85) * 6)} /> })}
          </g>
          <g opacity={on(f, accounts, 8)}><Label x={560} y={GROUND + 70} text="BANK ACCOUNTS" size={48} font="Bebas Neue" color="#1B2A4A" /></g>
        </g>}
        {B3 > 0 && <g opacity={B3}>
          {/* # tug of war: banks vs crypto companies, over the rewards */}
          {(() => { const sway = Math.sin((f - fighting) / 10) * 30
            return <g>
              <Person f={f} who="owner" beats={[[0, 'pull', 'angry']]} x={420 + sway} y={GROUND} s={0.85} flip />
              <Person f={f} who="investor" beats={[[0, 'pull', 'angry']]} x={1500 + sway} y={GROUND} s={0.85} />
              <path d={`M${560 + sway} ${GROUND - 300} L${1360 + sway} ${GROUND - 300}`} stroke="#B07A4A" strokeWidth={14} strokeLinecap="round" />
              <Label x={420} y={GROUND + 70} text="BANKS" size={50} font="Bebas Neue" color="#1B2A4A" />
              <g opacity={on(f, crypto84, 8)}><Label x={1500} y={GROUND + 70} text="CRYPTO COMPANIES" size={50} font="Bebas Neue" color="#1B2A4A" /></g>
              <g opacity={on(f, apps84, 8)} transform={`translate(${960 + sway} ${GROUND - 420})`}><rect x={-50} y={-90} width={100} height={170} rx={16} fill="#0D1424" /><rect x={-42} y={-80} width={84} height={150} rx={10} fill="#F7FAFF" /><Gold x={0} y={-10} r={26} o={on(f, rewards, 8)} /></g>
            </g> })()}
        </g>}
      </g>}

      {/* # C) Maya's dollar still earns; the coin turns back at the barrier */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <Person f={f} who="investorF" beats={[[0, 'idle', 'neutral'], [law86, 'shrug', 'neutral']]} x={300} y={GROUND} s={0.8} />
        <Dollar x={1250} y={GROUND - 120} s={1.0} />
        <CoinHQ x={1620} y={GROUND} s={0.7} sign="COIN COMPANY" />
        <Barrier x={760} y={GROUND} t={1} />
        {(() => { const up = on(f, interest85, 16), turn = on(f, go86, 18)
          return <Gold x={lerp(lerp(1250, 900, on(f, disappear, 16)), 1620, turn)} y={lerp(GROUND - 200, 520, up) - Math.sin(turn * Math.PI) * 120} r={30} o={on(f, interest85, 8)} /> })()}
        <g opacity={on(f, maya86, 8)}><Label x={300} y={GROUND + 70} text="MAYA: $0" size={52} font="Bebas Neue" color={P.coralInk} /></g>
      </g>}
      <Vignette id="sc-law" />
    </g>
  )
}

const BEATS = ['s77:why', 's77:give', 's78:us', "s78:isn't", 's78:allowed', 's79:july', 's79:genius', 's79:act', 's79:law', 's79:first', 's79:stablecoins', 's80:says', 's80:not', 's80:pay', 's80:holding', 's81:without', 's81:compete', 's81:sharing', 's81:banks', 's81:savings', 's82:banks', 's82:pushed', 's82:line', 's83:worry', 's83:stablecoins', 's83:interest', 's83:move', 's83:accounts', 's84:fighting', 's84:crypto', 's84:apps', 's84:rewards', 's85:interest', 's85:disappear', 's86:law', 's86:go', 's86:maya']
export const SC_LAW = makePiece('sc-law', 'Stablecoin long ch6 (navy): an interest coin heads to Maya and a barrier drops; July 2025 the GENIUS Act becomes law: no interest to holders just for holding; without it coin companies would hang rate signs like banks; banks push for the rule, worried savings would fly out; banks and crypto companies in a tug of war over rewards; Maya\'s interest coin turns back at the barrier', {
  mood: 'dark', Component: Law, beats: BEATS,
  sfx: [["s78:isn't", 'thud', 0.25], ['s79:law', 'thud', 0.35], ['s80:not', 'swish', 0.2], ['s81:sharing', 'pop', 0.2], ['s83:move', 'whoosh', 0.2], ['s84:fighting', 'swish', 0.2], ['s86:go', 'swish', 0.2]] })
