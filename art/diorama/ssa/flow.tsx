// ---------------------------------------------------------------- s16–s30: step two, where the money goes.
// A) Rosa's capsule tube runs straight across the hall into a row of mailboxes whose flags pop up: RETIREES · DISABLED
//    WORKERS · FAMILIES — 71 MILLION PEOPLE. B) 1940, in sepia: one mailbox, the first check $22.54 · JAN 1940; PAID IN ≈ 3
//    YEARS · COLLECTED ≈ $22,889, fed by a line of later workers. C) two tubes, stacked: TODAY'S WORKERS → TODAY'S RETIREES and
//    TOMORROW'S WORKERS → ROSA. D) the vault: surplus capsules turn into BOND envelopes (≈$2.56 TRILLION), then 2025: an IN
//    bar ($1,449.3B) shorter than an OUT bar ($1,609.5B) to scale, and bonds leave the vault to fill the ≈$160B gap.
//    E) the ratio: 2.6 workers (two and a 60% ghost) behind one retiree in 2025; 1.9 by 2075.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { PostWorld, Vig, Stamp, Tube, Capsule, Envelope, Mailbox, Vault, Life, FLOOR, TXT, CREAM, INK, RED, NAVY, BRASS, BRASS2, GREEN, GOLD, DEEPT, PLUM, WOOD2 } from './kit'

const Flow: React.FC<PieceProps> = ({ f, c }) => {
  const surprise = c('s16:surprise'), saved = c('s16:saved')
  const soon = c('s17:soon'), out = c('s17:out'), now = c('s17:now')
  const d71 = c('s18:71'), retirees = c('s18:retirees'), disabled = c('s18:disabled'), families = c('s18:families')
  const start = c('s19:start'), first = c('s19:first'), y1940 = c('s19:1940'), d22 = c('s19:22')
  const three = c('s20:three'), d100 = c('s20:100'), d22889 = c('s20:22889')
  const workers21 = c('s21:workers'), today21 = c('s21:today')
  const savings = c('s22:savings'), promise = c('s22:promise'), todays = c("s22:today's"), later = c('s22:later'), after = c('s22:after')
  const decades = c('s23:decades'), extra = c('s23:extra'), trust = c('s23:trust')
  const y2025 = c('s24:2025'), d256 = c('s24:256')
  const cash = c('s25:cash'), bonds = c('s25:bonds'), treasury = c('s25:treasury')
  const paid = c('s26:paid'), d1609 = c('s26:16095'), took = c('s26:took'), d1449 = c('s26:14493')
  const d160 = c('s27:160'), gap = c('s27:gap')
  const why = c('s28:why'), fewer = c('s28:fewer'), d26 = c('s28:26')
  const y2075 = c('s29:2075'), d19 = c('s29:19'), drawing = c('s29:drawing')
  const back = c('s30:back'), three30 = c('s30:three')

  const A = 1 - on(f, start - 10, 8), B = win(f, start - 2, savings - 2, 8), Cc = win(f, savings - 2, decades - 2, 8), D = win(f, decades - 2, why - 2, 8), E = on(f, why - 2, 8)
  const D1 = 1 - on(f, paid - 10, 8), D2 = on(f, paid - 2, 8)
  const rosa: Beat[] = [[surprise, 'offer', 'smiling'], [saved, 'shrug', 'thinking'], [out, 'point', 'neutral']]
  const W = (v: number) => v / 1609.5 * 1100                  // bar scale: 1,609.5 billion = 1,100 px

  return (
    <g>
      <PostWorld f={f} id="ss-flow" tone={f >= start && f < savings ? 'warm' : 'day'} />
      {/* # A) straight to today's mailboxes */}
      {A > 0.001 && <g opacity={A}>
        <Person f={f} who="investorF" beats={rosa} x={240} y={FLOOR + 60} s={0.72} />
        <Tube pts={[[360, 620], [700, 620], [700, 520], [1820, 520]]} f={f} flow={on(f, soon, 8)} n={6} rate={2} />
        {[0, 1, 2, 3, 4].map((k) => <g key={k} opacity={on(f, out + k * 3, 8)}><Mailbox x={900 + k * 220} y={FLOOR} s={0.85} flag={on(f, now + k * 4, 10)} /></g>)}
        <g opacity={on(f, saved, 8) * (1 - on(f, out, 8))}><Stamp x={960} y={330} t="NOT SAVED FOR ROSA" size={56} col={RED} tc={CREAM} /></g>
        <g opacity={on(f, d71, 8)} transform={`translate(1340 330) scale(${pop(f, d71, 12)})`}><Stamp x={0} y={0} t="71 MILLION PEOPLE" size={60} col={GREEN} tc={CREAM} /></g>
        {[[retirees, 'RETIREES', 900], [disabled, 'DISABLED WORKERS', 1340], [families, 'FAMILIES', 1780]].map(([at, t, x], k) => <g key={k} opacity={on(f, at as number, 8)}><Stamp x={x as number} y={980} t={t as string} size={36} col={CREAM} /></g>)}
      </g>}
      {/* # B) 1940: the first check */}
      {B > 0.001 && <g opacity={B}>
        <rect x={-40} y={-40} width={2000} height={1160} fill="#C9A26A" opacity={0.25} />
        <Mailbox x={1200} y={FLOOR} s={1.2} flag={on(f, first, 10)} t="1940" />
        <g opacity={on(f, first, 8)}><Envelope x={lerp(1500, 1260, on(f, first, 20))} y={lerp(340, FLOOR - 300, on(f, first, 20))} s={1.2} t={f >= d22 ? '$22.54' : ''} /></g>
        <g opacity={on(f, y1940, 8)}><Stamp x={1200} y={330} t={f >= d22 ? 'FIRST CHECK · JAN 1940 · $22.54' : 'FIRST CHECK · JAN 1940'} size={48} col={GOLD} /></g>
        <g opacity={on(f, three, 8)}><Stamp x={560} y={430} t="PAID IN ≈ 3 YEARS" size={46} col={CREAM} /></g>
        <g opacity={on(f, d22889, 8)}><Stamp x={560} y={560} t={f >= d100 ? 'LIVED TO 100 · COLLECTED ≈ $22,889' : 'LIVED TO 100'} size={40} col={GREEN} tc={CREAM} /></g>
        <g opacity={on(f, workers21, 8)}>
          {[0, 1, 2].map((k) => <Person key={k} f={f} who={['worker', 'buyer', 'investor'][k]} beats={[[workers21, 'offer', 'smiling']]} x={240 + k * 160} y={FLOOR + 60} s={0.5} />)}
          <Tube pts={[[620, 700], [1000, 700], [1000, 640], [1130, 640]]} f={f} flow={1} n={4} rate={1.5} w={30} />
        </g>
        <g opacity={on(f, today21, 8)}><Stamp x={560} y={330} t="PAID BY LATER WORKERS" size={44} col={NAVY} tc={CREAM} /></g>
      </g>}
      {/* # C) a promise between generations */}
      {Cc > 0.001 && <g opacity={Cc}>
        <g opacity={on(f, savings, 8)}><Stamp x={960} y={330} t={f >= promise ? 'A PROMISE BETWEEN GENERATIONS' : 'NOT A SAVINGS ACCOUNT'} size={52} col={f >= promise ? GREEN : RED} tc={CREAM} /></g>
        <g opacity={on(f, todays, 8)}>
          <Person f={f} who="investorF" beats={[[todays, 'offer', 'smiling']]} x={320} y={640} s={0.42} />
          <Tube pts={[[420, 520], [1460, 520]]} f={f} flow={1} n={5} rate={1.5} w={30} />
          <Person f={f} who="buyer" beats={[[todays, 'receive', 'smiling']]} x={1580} y={640} s={0.42} flip />
          <text x={940} y={480} textAnchor="middle" fill={INK} style={TXT(40)}>TODAY’S WORKERS → TODAY’S RETIREES</text>
        </g>
        <g opacity={on(f, later, 8)}>
          <Person f={f} who="worker" beats={[[later, 'offer', 'smiling']]} x={320} y={FLOOR + 60} s={0.42} />
          <Tube pts={[[420, 760], [1460, 760]]} f={f} flow={on(f, after, 8)} n={5} rate={1.5} w={30} />
          <Person f={f} who="investorF" beats={[[later, 'receive', 'smiling']]} x={1580} y={FLOOR + 60} s={0.42} flip />
          <text x={940} y={720} textAnchor="middle" fill={INK} style={TXT(40)}>LATER: TOMORROW’S WORKERS → ROSA</text>
        </g>
      </g>}
      {/* # D) the vault, then 2025's gap */}
      {D > 0.001 && <g opacity={D}>
        <g opacity={D1}>
          <Vault x={1300} y={560} s={1.1} fill={0.4 + 0.6 * on(f, extra, 40)} open={1} />
          <Tube pts={[[300, 560], [1000, 560]]} f={f} flow={on(f, extra, 8)} n={4} rate={1.5} />
          <g opacity={on(f, decades, 8)}><Stamp x={560} y={430} t="MORE IN THAN OUT" size={46} col={GREEN} tc={CREAM} /></g>
          <g opacity={on(f, trust, 8)}><Stamp x={1300} y={240} t="TRUST FUNDS" size={50} col={NAVY} tc={CREAM} /></g>
          <g opacity={on(f, d256, 8)}><Stamp x={560} y={760} t="END 2025: ≈ $2.56 TRILLION" size={44} col={GOLD} /></g>
          <g opacity={on(f, bonds, 8)}><Stamp x={560} y={330} t={f >= treasury ? 'GOVERNMENT BONDS, REPAID BY THE TREASURY' : 'GOVERNMENT BONDS, NOT CASH'} size={38} col={CREAM} /></g>
        </g>
        <g opacity={D2}>
          <g opacity={on(f, paid, 8)}><rect x={300} y={480} width={W(1609.5) * on(f, d1609, 20)} height={80} rx={12} fill={RED} /><text x={320} y={460} fill={INK} style={TXT(44)}>{f >= d1609 ? 'OUT · 2025 · $1,609.5B' : 'OUT · 2025'}</text></g>
          <g opacity={on(f, took, 8)}><rect x={300} y={680} width={W(1449.3) * on(f, d1449, 20)} height={80} rx={12} fill={GREEN} /><text x={320} y={660} fill={INK} style={TXT(44)}>{f >= d1449 ? 'IN · 2025 · $1,449.3B' : 'IN · 2025'}</text></g>
          <g opacity={on(f, d160, 8)}><rect x={300 + W(1449.3)} y={680} width={W(160.2)} height={80} rx={12} fill="none" stroke={GOLD} strokeWidth={8} strokeDasharray="18 10" /><Stamp x={300 + W(1449.3) + W(160.2) / 2} y={860} t="GAP ≈ $160B" size={44} col={GOLD} /></g>
          <g opacity={on(f, gap, 8)}><Vault x={1660} y={620} s={0.45} fill={0.85 - 0.1 * on(f, gap, 30)} open={1} />{[0, 1].map((k) => { const p = ((f - gap + k * 15) % 30) / 30; return <Envelope key={k} x={lerp(1560, 300 + W(1449.3) + W(160.2) / 2, p)} y={lerp(560, 700, p)} s={0.5} /> })}</g>
        </g>
      </g>}
      {/* # E) fewer workers per beneficiary */}
      {E > 0.001 && <g opacity={E}>
        <Person f={f} who="buyer" beats={[[why, 'idle', 'neutral'], [y2075, 'shrug', 'worried']]} x={1500} y={FLOOR + 60} s={0.7} flip />
        <g opacity={on(f, fewer, 8)}>
          {[0, 1, 2].map((k) => { const share = f < y2075 ? [1, 1, 0.6][k] : [1, 0.9, 0][k]
            return <g key={k} opacity={on(f, fewer + k * 4, 8) * (share > 0 ? 1 : 1 - on(f, y2075, 10))}><g opacity={0.25 + 0.75 * share}><Person f={f} who={['worker', 'investorF', 'investor'][k]} beats={[[fewer, 'offer', 'smiling']]} x={420 + k * 260} y={FLOOR + 60} s={0.66} /></g></g> })}
          <Tube pts={[[540, 470], [1360, 470]]} f={f} flow={1} n={4} rate={1} w={30} />
        </g>
        <g opacity={on(f, d26, 8)}><Stamp x={680} y={330} t={f >= d19 ? '2075: ≈ 1.9 WORKERS EACH' : '2025: ≈ 2.6 WORKERS EACH'} size={50} col={f >= d19 ? RED : GREEN} tc={CREAM} /></g>
        <g opacity={on(f, back, 8)}><Stamp x={1500} y={330} t="WHAT WILL ROSA GET?" size={46} col={NAVY} tc={CREAM} /></g>
      </g>}
      {/* # life:begin */}
      <g>
        <Life f={f} at={after} x={1460} y={760} kind="glint" />
        <Life f={f} at={cash} x={1300} y={560} kind="glint" />
        <Life f={f} at={drawing} x={1500} y={600} kind="glint" />
        <Life f={f} at={three30} x={1500} y={400} kind="spark" />
        <Life f={f} at={c("s17:people")} x={1340} y={600} kind="glint" />
        <Life f={f} at={c("s19:it's")} x={1200} y={600} kind="glint" />
        <Life f={f} at={c("s20:she")} x={1200} y={600} kind="glint" />
        <Life f={f} at={c("s21:her#2")} x={1200} y={600} kind="glint" />
        <Life f={f} at={c("s22:security")} x={940} y={520} kind="glint" />
        <Life f={f} at={c("s22:retirees")} x={940} y={520} kind="glint" />
        <Life f={f} at={c("s22:paid")} x={940} y={520} kind="glint" />
        <Life f={f} at={c("s23:than")} x={1300} y={560} kind="glint" />
        <Life f={f} at={c("s23:and")} x={1300} y={560} kind="glint" />
        <Life f={f} at={c("s24:2025")} x={1300} y={560} kind="glint" />
        <Life f={f} at={c("s25:it's")} x={1300} y={560} kind="glint" />
        <Life f={f} at={c("s25:needs")} x={1300} y={560} kind="glint" />
        <Life f={f} at={c("s26:but")} x={800} y={600} kind="glint" />
        <Life f={f} at={c("s25:back")} x={1300} y={560} kind="glint" />
        <Life f={f} at={c("s27:out")} x={800} y={600} kind="glint" />
        <Life f={f} at={c("s27:more")} x={800} y={600} kind="glint" />
        <Life f={f} at={c("s27:funds")} x={800} y={600} kind="glint" />
        <Life f={f} at={c("s28:in")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s28:retiree")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s28:getting")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s29:for")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s30:what")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s30:turn")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s16:money")} x={600} y={620} kind="glint" />
      </g>
      {/* # life:end */}
      <Vig id="ss-flow" />
      <Headline f={f} lines={[[surprise, 'WHERE THE MONEY GOES', INK, 92], [start, 'THE VERY FIRST CHECK', INK, 92], [savings, 'NOT A SAVINGS ACCOUNT', INK, 92], [decades, 'THE TRUST FUNDS', INK, 92], [why, 'FEWER WORKERS PER RETIREE', INK, 88]]} />
    </g>
  )
}

export const SS_FLOW = makePiece('ss-flow', 'Step two: Rosa\'s capsule tube runs straight across the post office into a row of five navy mailboxes whose red flags pop up (NOT SAVED FOR ROSA · 71 MILLION PEOPLE · RETIREES, DISABLED WORKERS, FAMILIES); in warm sepia, one big 1940 mailbox receives an envelope $22.54 (FIRST CHECK · JAN 1940 · $22.54, PAID IN ≈ 3 YEARS, LIVED TO 100 · COLLECTED ≈ $22,889) fed by a tube from three later workers (PAID BY LATER WORKERS); two stacked tubes — TODAY\'S WORKERS → TODAY\'S RETIREES and LATER: TOMORROW\'S WORKERS → ROSA (A PROMISE BETWEEN GENERATIONS); a round steel vault fills with BOND envelopes (MORE IN THAN OUT · TRUST FUNDS · END 2025: ≈ $2.56 TRILLION · GOVERNMENT BONDS, REPAID BY THE TREASURY); then a red OUT · 2025 · $1,609.5B bar and a shorter green IN · 2025 · $1,449.3B bar to scale with the dashed GAP ≈ $160B filled by bond envelopes leaving the vault; finally three workers (the third a faint 60% ghost) send capsules to one retiree — 2025: ≈ 2.6 WORKERS EACH — then the ghost vanishes and the second fades a little: 2075: ≈ 1.9 WORKERS EACH; WHAT WILL ROSA GET?', {
  mood: 'light', Component: Flow,
  beats: ["s16:surprise", "s16:saved", "s17:soon", "s17:out", "s17:now", "s18:71", "s18:retirees", "s18:disabled", "s18:families", "s19:start", "s19:first", "s19:1940", "s19:22", "s20:three", "s20:100", "s20:22889", "s21:workers", "s21:today", "s22:savings", "s22:promise", "s22:today's", "s22:later", "s22:after", "s23:decades", "s23:extra", "s23:trust", "s24:256", "s25:cash", "s25:bonds", "s25:treasury", "s26:paid", "s26:16095", "s26:took", "s26:14493", "s27:160", "s27:gap", "s28:why", "s28:fewer", "s28:26", "s29:2075", "s29:19", "s29:drawing", "s30:back", "s30:three", "s17:people", "s19:it's", "s20:she", "s21:her#2", "s22:security", "s22:retirees", "s22:paid", "s23:than", "s23:and", "s24:2025", "s25:it's", "s25:needs", "s26:but", "s25:back", "s27:out", "s27:more", "s27:funds", "s28:in", "s28:retiree", "s28:getting", "s29:for", "s30:what", "s30:turn", "s16:money"],
  sfx: [['s18:71', 'pop', 0.08], ['s19:22', 'chime', 0.08], ['s27:160', 'thud', 0.1], ['s29:19', 'thud', 0.08]] })
