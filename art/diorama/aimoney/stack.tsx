// ---------------------------------------------------------------- s13–s19: a question typed into a chatbot travels to a data center; thousands of chips write the
// answer word by word; chips, electricity and buildings each belong to someone who wants paying; the money flows down a stack: apps → AI models → cloud → chips
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { beat, type Beat, camera, Coin, DataCenter, Gpu, hand, Headline, Label, Layer, Person, Phone, Prop, win } from './common'

const LAYERS: [name: string, color: string, icon: string][] = [['APPS', '#7C6CF0', 'phone'], ['AI MODELS', '#E0705C', 'robot-head'], ['CLOUD', '#2E8FD6', 'cloud'], ['CHIPS', '#2BA36B', 'ai-chip']]

const Stack: React.FC<PieceProps> = ({ f, c }) => {
  const picture = c('s13:picture'), type = c('s13:type'), question = c('s13:question'), chatbot = c('s13:chatbot')
  const travels = c('s14:travels'), building = c('s14:building'), data = c('s14:data')
  const inside = c('s15:inside'), thousands = c('s15:thousands'), together = c('s15:together'), answer = c('s15:answer'), word = c('s15:word')
  const chips16 = c('s16:chips'), electricity = c('s16:electricity'), buildings = c('s16:buildings'), belongs = c('s16:belongs'), paid = c('s16:paid')
  const money17 = c('s17:money'), layers = c('s17:layers'), stack = c('s17:stack')
  const top = c('s18:top'), apps = c('s18:apps'), below = c('s18:below'), build = c('s18:build'), models = c('s18:models')
  const cloud = c('s18a:cloud'), rent = c('s18a:rent'), bottom18 = c('s18a:bottom'), chips18 = c('s18a:chips')
  const enters = c('s19:enters'), every = c('s19:every'), cut = c('s19:cut'), start = c('s19:start'), bottom = c('s19:bottom')
  const A = win(f, picture, chips16), B = win(f, chips16, layers), Cc = on(f, layers, 10)
  const hero: Beat[] = [[0, 'idle', 'neutral'], [type, 'phone', 'smiling'], [travels, 'lookFar', 'thinking'], [answer, 'phone', 'smiling'], [chips16, 'countOne', 'neutral'], [belongs, 'explain', 'neutral'],
    [money17, 'pointDown', 'neutral'], [top, 'pointUp', 'neutral'], [bottom18, 'pointDown', 'neutral'], [enters, 'present', 'smiling'], [bottom, 'pointDown', 'smiling']]
  const hp = hand(f, hero, 330, 1190, 1.4)
  const zoomIn = on(f, inside, 16) * (1 - on(f, chips16, 10))
  // # layer k appears on its own word
  const layerAt = [apps, models, cloud, chips18]
  const ly = (k: number) => 380 + k * 140
  return (
    <g>
      <Stage id="sk" frame={f} />
      <Headline f={f} lines={[[c("s18a:centers"), "CLOUD: RENTS OUT DATA CENTERS", P.skyInk, 104], [picture, 'ONE QUESTION', P.ink, 130], [chatbot, 'TO AN AI CHATBOT', P.ink, 124], [building, 'A HUGE BUILDING…', P.ink, 124], [data, 'A DATA CENTER', P.skyInk, 130],
        [thousands, 'THOUSANDS OF CHIPS', P.ink, 124], [word, 'WRITING WORD BY WORD', P.mintInk, 116], [chips16, 'CHIPS', P.ink, 130], [electricity, 'ELECTRICITY', P.goldInk, 130], [buildings, 'BUILDINGS', P.ink, 130],
        [belongs, 'EACH HAS AN OWNER', P.ink, 124], [paid, 'WHO WANTS TO BE PAID', P.goldInk, 120], [layers, 'MONEY FLOWS DOWN IN LAYERS', P.ink, 110],
        [enters, 'MONEY ENTERS AT THE TOP', P.mintInk, 112], [cut, 'EVERY LAYER TAKES A CUT', P.goldInk, 112], [start, 'START AT THE BOTTOM', P.ink, 120]]} />
      <g transform={camera(f, [[inside, 1360, 700, 1.12], [chips16, 960, 540, 1], [money17, 960, 540, 1], [bottom, 1100, 700, 1.06]])}>
        {/* # A: the question flies from the phone to the data center; inside, a field of chips lights up in a wave */}
        <g opacity={A}>
          <g opacity={on(f, question, 6) * (1 - on(f, inside, 6))} transform={(() => { const t = easeInOut(span(f, travels, travels + 40)); return `translate(${lerp(hp.x + 260, 1400, t)} ${lerp(hp.y - 200, 560, t) - Math.sin(t * Math.PI) * 160}) scale(${lerp(1, 0.7, t)})` })()}>
            <rect x={-130} y={-70} width={260} height={120} rx={30} fill={P.white} stroke={P.skyInk} strokeWidth={6} /><path d="M-60 50 L-90 90 L-20 50 Z" fill={P.white} /><Label x={0} y={18} text="?" size={80} font="Bebas Neue" color={P.navy1} /></g>
          <g opacity={on(f, type, 6) * (1 - on(f, travels, 8))} transform={`translate(1240 600) scale(${pop(f, type)})`}><rect x={-330} y={-170} width={660} height={340} rx={30} fill={P.white} stroke={P.skyInk} strokeWidth={6} /><rect x={-330} y={-170} width={660} height={60} rx={30} fill={P.skyD} /><Label x={-300} y={-126} text="AI CHATBOT" size={44} font="Bebas Neue" color="#FFFFFF" anchor="start" />
            <rect x={-290} y={-40} width={520 * span(f, type, question)} height={36} rx={18} fill="#C9D3E1" /><rect x={-290} y={20} width={300 * span(f, question - 4, question + 10)} height={36} rx={18} fill="#C9D3E1" /><Label x={260} y={130} text={f >= question ? 'SEND ➤' : ''} size={48} font="Bebas Neue" color={P.skyInk} anchor="end" /></g>
          <DataCenter x={1400} y={900} s={1.1} o={on(f, building, 8) * (1 - zoomIn)} f={f} label={f >= data ? 'DATA CENTER' : ''} />
          <g opacity={zoomIn}>
            <rect x={1000} y={420} width={800} height={560} rx={24} fill="#1A2336" />
            {Array.from({ length: 24 }, (_, k) => { const col = k % 6, row = Math.floor(k / 6), wave = Math.max(0, Math.sin((f - together) / 5 - col * 0.7 - row * 0.4))
              return <g key={k} opacity={on(f, thousands + k * 0.6, 4)}><Gpu x={1100 + col * 120} y={500 + row * 120} s={0.3} glow={f >= together ? wave : 0.2} /></g> })}
          </g>
          {f >= answer && <Phone x={hp.x + 200} y={Math.max(460, hp.y - 160)} s={1.1} r={6} o={on(f, answer, 6) * (1 - on(f, chips16, 6))}>
            {Array.from({ length: 5 }, (_, k) => <rect key={k} x={-64} y={-110 + k * 40} width={(k === 4 ? 70 : 128) * on(f, word + k * 5, 6)} height={20} rx={10} fill={P.skyD} />)}</Phone>}
        </g>
        {/* # B: chips, electricity, buildings — and each one's owner holding out a hand for coins */}
        <g opacity={B}>
          {[[chips16, 'ai-chip', 'CHIPS'], [electricity, 'lightning', 'POWER'], [buildings, 'warehouse-boxes', 'BUILDINGS']].map(([at, id, t], k) => <g key={k} opacity={on(f, at as number, 6)} transform={`translate(${900 + k * 330} 600) scale(${pop(f, at as number)})`}>
            <circle r={120} fill={P.card} /><Prop id={id as string} x={0} y={-6} size={150} f={f} /><Label x={0} y={180} text={t as string} size={56} font="Bebas Neue" color={P.ink} />
            <g opacity={on(f, belongs + k * 4, 6)} transform="translate(100 -110)"><circle r={40} fill={P.gold} /><Label x={0} y={16} text="$" size={48} font="Bebas Neue" color={P.navy0} /></g></g>)}
          {Array.from({ length: 6 }, (_, k) => { const t = easeInOut(span(f, paid + k * 3, paid + k * 3 + 18)); return <Coin key={k} x={lerp(500, 900 + (k % 3) * 330, t)} y={lerp(860, 520, t) - Math.sin(t * Math.PI) * 120} s={0.6} o={on(f, paid + k * 3, 3) * (1 - span(f, paid + k * 3 + 16, paid + k * 3 + 20))} /> })}
        </g>
        {/* # C: the stack — four layers arrive on their words; money drops in at the top and each layer takes its cut */}
        <g opacity={Cc}>
          {LAYERS.map(([name, col, icon], k) => <g key={k} transform={`scale(1) translate(${(1 - on(f, layerAt[k], 10)) * 0} 0)`}>
            <Layer x={1150} y={ly(k)} color={f >= layerAt[k] ? col : '#A3AEBF'} name={f >= layerAt[k] ? name : ''} icon={f >= layerAt[k] ? icon : undefined} f={f} o={on(f, layers + k * 4, 8)} glow={k === 1 && f < models ? on(f, below, 6) : k === 3 ? on(f, start, 10) : 0} dim={f >= start && k < 3 ? on(f, start, 10) : 0} /></g>)}
          {/* # the layer names appear on their words; before that the slabs are blank placeholders on "stack" */}
          
          <g opacity={on(f, build, 6) * (1 - on(f, cloud, 8))} transform={`translate(1600 ${ly(1)}) scale(${pop(f, build)})`}><Prop id="robot-head" x={0} y={0} size={90} f={f} /></g>
          <g opacity={on(f, rent, 6) * (1 - on(f, enters, 8))}><Label x={1560} y={ly(2) - 6} text="RENT OUT" size={46} font="Bebas Neue" color={P.ink2} anchor="start" /><Label x={1560} y={ly(2) + 40} text="DATA CENTERS" size={46} font="Bebas Neue" color={P.ink2} anchor="start" /></g>
          <g opacity={on(f, enters, 6)}>
            {(() => { const t = span(f, enters, every + 20), y = lerp(250, ly(3) + 40, t)
              return <g><Coin x={1630} y={y} s={1.3 - 0.5 * t} />{[0, 1, 2, 3].map((k) => f >= cut - 20 + k * 6 && <g key={k} transform={`translate(${1630 - 100 * on(f, cut - 20 + k * 6, 10)} ${ly(k)})`}><Coin x={0} y={0} s={0.5} /></g>)}</g> })()}
          </g>
        </g>
        <Person f={f} who="hero" beats={hero} x={330} y={1190} s={1.4} life={2} />
      </g>
      <Vignette id="sk" />
    </g>
  )
}

export const AI_STACK = makePiece('ai-stack', 'Long: a chatbot question goes to a data center, thousands of chips write the answer; chips, power and buildings all have owners; the AI money stack — apps, models, cloud, chips', { mood: 'light', Component: Stack,
  beats: ["s13:picture", "s13:type", "s13:question", "s13:chatbot", "s14:travels", "s14:building", "s14:data", "s15:inside", "s15:thousands", "s15:together", "s15:answer", "s15:word", "s16:chips", "s16:electricity", "s16:buildings", "s16:belongs", "s16:paid", "s17:money", "s17:layers", "s17:stack", "s18:top", "s18:apps", "s18:below", "s18:build", "s18:models", "s18a:cloud", "s18a:rent", "s18a:bottom", "s18a:chips", "s19:enters", "s19:every", "s19:cut", "s19:start", "s19:bottom", "s18a:centers"],
  sfx: [['s13:question', 'pop', 0.4], ['s14:travels', 'whoosh', 0.4], ['s15:together', 'riser', 0.3], ['s16:paid', 'coin', 0.4], ['s18:apps', 'pop', 0.4], ['s18:models', 'pop', 0.4], ['s18a:cloud', 'pop', 0.4], ['s18a:chips', 'pop', 0.4], ['s19:cut', 'coin', 0.5], ['s19:bottom', 'swish', 0.4]] })
