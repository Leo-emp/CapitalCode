// ---------------------------------------------------------------- s46–s54: back to the top — the model makers; OpenAI revenue $3.7B (2024) → ≈ $13B (2025), costs ≈ $34B;
// two reasons: training burns chips for weeks or months before earning, and every answer costs money while most users pay nothing; more use → more compute; money flows
// down the stack; fierce competition (Google, Meta, Anthropic…) pushes spending up; the diggers carry the risk and make no profit so far
import React from 'react'
import { Mini } from '../../rig/Mini'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { beat, type Beat, Calendar, camera, Coin, Col, Gpu, Headline, Label, Layer, Person, Prop, Shovel, win } from './common'

const LAYERS: [string, string, string][] = [['APPS', '#7C6CF0', 'phone'], ['AI MODELS', '#E0705C', 'robot-head'], ['CLOUD', '#2E8FD6', 'cloud'], ['CHIPS', '#2BA36B', 'ai-chip']]

const Diggers: React.FC<PieceProps> = ({ f, c }) => {
  const back = c('s46:back'), models = c('s46:models')
  const openai = c('s47:openai'), tripled = c('s47:tripled'), d13 = c('s47:13')
  const costs = c('s48:costs'), d34 = c('s48:34')
  const why = c('s49:why'), popular = c('s49:popular'), lose49 = c('s49:lose'), two = c('s49:two')
  const training = c('s50:training'), chips = c('s50:chips'), weeks = c('s50:weeks'), months = c('s50:months'), dollar = c('s50:dollar')
  const answer = c('s51:answer'), produce = c('s51:produce'), most = c('s51:most'), free = c('s51:free')
  const more = c('s52:more'), computing = c('s52:computing'), buy = c('s52:buy')
  const flows = c('s53:flows'), down = c('s53:down'), landlords = c('s53:landlords'), sellers = c('s53:sellers')
  const fierce = c('s53a:fierce'), google = c('s53a:google'), meta = c('s53a:meta'), anthropic = c('s53a:anthropic'), racing = c('s53a:racing'), spend = c('s53a:spend')
  const diggers = c('s54:diggers'), risk = c('s54:risk'), profit = c('s54:profit')
  const A = win(f, back, why), B = win(f, why, flows), Cc = win(f, flows, fierce), D = win(f, fierce, diggers), E = on(f, diggers, 10)
  const hero: Beat[] = [[0, 'idle', 'neutral'], [back, 'pointUp', 'neutral'], [tripled, 'fistPump', 'smiling'], [d34, 'shock', 'shocked'], [why, 'scratchHead', 'thinking'], [training, 'countOne', 'neutral'], [months, 'lookFar', 'thinking'],
    [answer, 'phone', 'neutral'], [free, 'shrug', 'neutral'], [more, 'explain', 'worried'], [flows, 'pointDown', 'neutral'], [fierce, 'runA', 'neutral', 'runB', 10], [diggers, 'carryHeavy', 'worried'], [profit, 'despair', 'worried']]
  const S = 17 // # px per $1B
  const ly = (k: number) => 360 + k * 140
  return (
    <g>
      <Stage id="dg" frame={f} tint="teal" />
      <Headline f={f} lines={[[c("s46:companies"), "THE COMPANIES BUILDING…", P.ink, 120], [c("s47:revenue"), "ITS REVENUE…", P.ink, 124], [c("s50:enormous"), "ENORMOUS NUMBERS OF CHIPS", P.ink, 112], [c("s51:second"), "SECOND…", P.ink, 130], [c("s53:earn"), "WHAT IT DOES EARN…", P.ink, 120], [c("s53a:better"), "TO BUILD BETTER MODELS", P.ink, 116], [c("s54:far"), "SO FAR…", P.ink, 130], [back, 'BACK TO THE TOP', P.ink, 130], [models, 'THE AI MODEL MAKERS', P.ink, 124], [openai, 'OPENAI', P.ink, 140], [tripled, 'REVENUE MORE THAN TRIPLED', P.mintInk, 112], [d13, '≈ $13 BILLION IN 2025', P.mintInk, 116],
        [d34, 'COSTS: ≈ $34 BILLION', P.coralInk, 124], [why, 'WHY THE LOSS?', P.ink, 130], [two, 'TWO BIG REASONS', P.ink, 124],
        [training, '1. TRAINING', P.goldInk, 130], [weeks, 'WEEKS OR MONTHS OF CHIPS', P.ink, 116], [dollar, '…BEFORE ONE DOLLAR COMES IN', P.coralInk, 104],
        [answer, '2. EVERY ANSWER COSTS MONEY', P.goldInk, 108], [most, 'MOST PEOPLE USE IT FREE', P.ink, 116], [more, 'MORE USERS = MORE CHIPS TO RENT', P.coralInk, 104],
        [flows, 'THE MONEY FLOWS DOWN', P.ink, 124], [landlords, 'TO THE LANDLORDS…', P.skyInk, 124], [sellers, '…AND THE SHOVEL SELLERS', P.mintInk, 116],
        [fierce, 'FIERCE COMPETITION', P.coralInk, 124], [racing, 'EVERYONE IS RACING', P.ink, 124], [spend, 'SO EVERYONE SPENDS MORE', P.coralInk, 116],
        [diggers, 'THE DIGGERS', P.ink, 140], [risk, 'CARRY THE MOST RISK', P.coralInk, 124], [profit, 'NOT MAKING A PROFIT', P.coralInk, 124]]} />
      <g transform={camera(f, [[d34, 1100, 640, 1.04], [why, 960, 540, 1], [answer, 960, 540, 1], [flows, 960, 540, 1], [fierce, 960, 540, 1], [diggers, 960, 540, 1], [profit, 1200, 640, 1.05]])}>
        {/* # A: the stack (AI models lit), then OpenAI's two years of revenue and its costs */}
        <g opacity={A}>
          <g opacity={1 - on(f, openai, 10)}>{LAYERS.map(([n, col, icon], k) => <Layer key={k} x={1150} y={ly(k)} color={col} name={n} icon={icon} f={f} o={on(f, back + k * 2, 6)} glow={k === 1 ? on(f, models, 8) : 0} dim={k !== 1 ? on(f, models, 8) : 0} />)}</g>
          <g opacity={on(f, openai, 6)}>
            <g transform={`translate(${lerp(1160, 1660, on(f, c('s47:revenue'), 14))} ${lerp(600, 620, on(f, c('s47:revenue'), 14))}) scale(${pop(f, openai) * lerp(1.8, 1, on(f, c('s47:revenue'), 14))})`}><circle r={100} fill={P.card} /><Prop id="robot-head" x={0} y={-4} size={130} f={f} /><Label x={0} y={150} text="OPENAI" size={56} font="Bebas Neue" color={P.ink} /></g>
            <Col x={820} y={960} h={3.7 * S * on(f, tripled, 14)} w={160} color={P.mint} value={f >= tripled ? '$3.7B' : ''} label="2024" o={on(f, tripled, 6)} />
            <Col x={1060} y={960} h={13 * S * on(f, d13, 18)} w={160} color={P.mint} value={f >= d13 ? '$13B' : ''} label="2025" o={on(f, d13, 6)} />
            <Col x={1330} y={960} h={34 * S * on(f, d34, 20)} w={180} color={P.coral} value={f >= d34 ? '$34B' : ''} label={f >= costs ? '2025 COSTS' : ''} o={on(f, costs, 6)} />
            <g opacity={on(f, d13, 6)}><Label x={1660} y={1040} text="AS REPORTED" size={44} font="Bebas Neue" color={P.ink2} /></g>
          </g>
        </g>
        {/* # B: reason 1 — chips working through a calendar before any dollar; reason 2 — a crowd chatting for free, coins leaking per answer */}
        <g opacity={B}>
          <g opacity={on(f, popular, 6) * (1 - on(f, training, 8))} transform={`translate(860 620) scale(${pop(f, popular)})`}><Prop id="robot-head" x={0} y={0} size={160} f={f} /><Label x={0} y={140} text="POPULAR" size={52} font="Bebas Neue" color={P.mintInk} /></g>
          <g opacity={on(f, lose49, 6) * (1 - on(f, training, 8))} transform={`translate(1620 620) scale(${pop(f, lose49)})`}><Prop id="arrow-down" x={0} y={0} size={160} f={f} /><Label x={0} y={140} text="LOSES MONEY" size={52} font="Bebas Neue" color={P.coralInk} /></g>
          <g opacity={on(f, why, 6) * (1 - on(f, training, 8))} transform={`translate(1240 620) scale(${pop(f, why) * 1.3})`}><circle r={100} fill={P.gold} /><Label x={0} y={46} text="?" size={160} font="Bebas Neue" color={P.navy0} /></g>
          <g opacity={on(f, training, 6) * (1 - on(f, answer, 8))}>
            {Array.from({ length: 12 }, (_, k) => <g key={k} opacity={on(f, chips + k, 5)}><Gpu x={820 + (k % 4) * 170} y={440 + Math.floor(k / 4) * 140} s={0.4} glow={Math.max(0.2, Math.sin(f / 5 + k))} /></g>)}
            <g opacity={on(f, weeks, 6)} transform={`translate(1640 520) scale(${pop(f, weeks)})`}><Calendar x={0} y={0} text="" s={1.2} flip={on(f, months, 10)} /><Label x={0} y={150} text={f >= months ? 'MONTHS' : 'WEEKS'} size={60} font="Bebas Neue" color={P.ink} /></g>
            <g opacity={on(f, dollar, 6)} transform={`translate(1640 840) scale(${pop(f, dollar)})`}><rect x={-140} y={-56} width={280} height={112} rx={18} fill={P.card} stroke={P.coralInk} strokeWidth={6} /><Label x={0} y={30} text="$0 IN" size={84} font="Bebas Neue" color={P.coralInk} /></g>
          </g>
          <g opacity={on(f, answer, 6)}>
            {Array.from({ length: 10 }, (_, k) => { const x = 780 + (k % 5) * 200, y = 520 + Math.floor(k / 5) * 270, payer = k === 7
              return <g key={k} opacity={on(f, answer + k, 5)}><Mini look={['hero', 'buyer', 'worker', 'owner', 'investor'][k % 5]} x={x} y={y + 175} scale={0.62} frame={f} seed={k + 210} />
                <g transform={`translate(${x + 40} ${y - 30})`}><rect x={-46} y={-30} width={92} height={60} rx={16} fill={P.white} /><Label x={0} y={14} text={f >= most ? (payer ? '$' : 'FREE') : '…'} size={payer ? 46 : 36} font="Bebas Neue" color={payer ? P.mintInk : P.navy2} /></g>
                {f >= produce && <Coin x={x + 40} y={y - 70 - ((f - produce + k * 7) % 30) * 3} s={0.35} o={1 - ((f - produce + k * 7) % 30) / 30} />}</g> })}
            <g opacity={on(f, computing, 6)} transform={`translate(1780 420) scale(${pop(f, computing)})`}><rect x={-110} y={-110} width={220} height={220} rx={24} fill={P.card} />
              {Array.from({ length: Math.round(on(f, more, 40) * 9) }, (_, k) => <g key={k} transform={`translate(${-60 + (k % 3) * 60} ${-60 + Math.floor(k / 3) * 60})`}><rect x={-22} y={-22} width={44} height={44} rx={6} fill={P.mint} /></g>)}
              <Label x={0} y={160} text={f >= buy ? 'CHIP TIME TO BUY' : 'CHIPS'} size={44} font="Bebas Neue" color={P.ink} /></g>
          </g>
        </g>
        {/* # C: the stack again — coins fall from AI MODELS into CLOUD and CHIPS */}
        <g opacity={Cc}>
          {LAYERS.map(([n, col, icon], k) => <Layer key={k} x={1150} y={ly(k)} color={col} name={n} icon={icon} f={f} glow={k >= 2 ? on(f, k === 2 ? landlords : sellers, 8) : 0} />)}
          {Array.from({ length: 8 }, (_, k) => { const t = ((f - down) / 34 + k / 8) % 1; return f >= down ? <Coin key={k} x={1640 + (k % 2) * 40} y={lerp(ly(1), ly(3), t)} s={0.55} o={Math.sin(t * Math.PI)} /> : null })}
          <g opacity={on(f, flows, 6)} transform="translate(1720 600)"><Prop id="arrow-down" x={0} y={0} size={110} f={f} /></g>
        </g>
        {/* # D: the race — four model makers running, coins spilling behind them */}
        <g opacity={D}>
          {[[google, 'GOOGLE'], [meta, 'META'], [anthropic, 'ANTHROPIC'], [fierce, 'OPENAI']].map(([at, t], k) => { const x = lerp(700, 1500, ((f - fierce) / 200 + k * 0.17) % 1)
            return <g key={k} opacity={on(f, at as number, 6)}><Mini look={['investor', 'buyer', 'worker', 'hero'][k]} x={x} y={640 + k * 130} scale={0.8} frame={f} seed={k + 230} />
              <Label x={x - 110} y={580 + k * 130} text={t as string} size={52} font="Bebas Neue" color={P.ink} anchor="end" />
              {f >= spend && <Coin x={x - 70 - ((f - spend + k * 9) % 24) * 4} y={600 + k * 130} s={0.35} o={1 - ((f - spend + k * 9) % 24) / 24} />}</g> })}
          <g opacity={on(f, racing, 6)} transform="translate(1720 760)"><Prop id="trophy" x={0} y={0} size={150} f={f} /></g>
        </g>
        {/* # E: diggers in the dark, shovels going, a little rain cloud; no profit */}
        <g opacity={E}>
          {[0, 1, 2].map((k) => <g key={k}><Mini look={['hero', 'buyer', 'worker'][k]} x={900 + k * 250} y={1010} scale={1.3} frame={f} seed={k + 250} mood={f >= profit ? 'sad' : 'neutral'} />
            <g transform={`translate(${960 + k * 250} 900) rotate(${-30 + Math.abs(Math.sin(f / 6 + k)) * 24})`}><Shovel x={0} y={0} s={0.4} /></g></g>)}
          <g opacity={on(f, risk, 6)} transform={`translate(1240 470) scale(${pop(f, risk)})`}><Prop id="warning" x={0} y={0} size={150} f={f} /></g>
          <g opacity={on(f, profit, 6)} transform={`translate(1700 640) scale(${pop(f, profit)})`}><rect x={-150} y={-56} width={300} height={112} rx={18} fill={P.card} stroke={P.coralInk} strokeWidth={6} /><Label x={0} y={30} text="$0 PROFIT" size={76} font="Bebas Neue" color={P.coralInk} /></g>
        </g>
        <Person f={f} who="hero" beats={hero} x={300} y={1190} s={1.4} life={2} />
      </g>
      <Vignette id="dg" />
    </g>
  )
}

export const AI_DIGGERS = makePiece('ai-diggers', 'Long: model makers — OpenAI revenue $3.7B → ≈ $13B, costs ≈ $34B (reported); training before revenue, every answer costs, most users free; money flows down; competition; no profit so far', { mood: 'dark', Component: Diggers,
  beats: ["s46:back", "s46:models", "s47:openai", "s47:tripled", "s47:13", "s48:costs", "s48:34", "s49:why", "s49:popular", "s49:lose", "s49:two", "s50:training", "s50:chips", "s50:weeks", "s50:months", "s50:dollar", "s51:answer", "s51:produce", "s51:most", "s51:free", "s52:more", "s52:computing", "s52:buy", "s53:flows", "s53:down", "s53:landlords", "s53:sellers", "s53a:fierce", "s53a:google", "s53a:meta", "s53a:anthropic", "s53a:racing", "s53a:spend", "s54:diggers", "s54:risk", "s54:profit", "s46:companies", "s47:revenue", "s50:enormous", "s51:second", "s53:earn", "s53a:better", "s54:far"],
  sfx: [['s47:13', 'pop', 0.4], ['s48:34', 'thud', 0.5], ['s49:why', 'riser', 0.3], ['s50:dollar', 'crack', 0.4], ['s51:free', 'pop', 0.4], ['s53:down', 'coin', 0.5], ['s53a:racing', 'whoosh', 0.4], ['s54:profit', 'thud', 0.5]] })
