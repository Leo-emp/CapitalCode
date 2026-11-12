// # the three big tanks used by the Maya chapters (fill, raise): 10%, 12%, 22% on three rising brick steps, a copper
// # overflow pipe between them, coin labels above each tank's plaque, a dashed bracket line at the top of the 12% tank,
// # and the tax chest on the ground at the right.
import React from 'react'
import { on, pop } from '../kit'
import { Tank, Pipe, Stream, Coin, Chest, BracketLine, TXT, INK, BRASS, BRASS2, BRICK, BRICK2, RATE_COL, PAPER } from './kit'

export const WX = [400, 820, 1240], WY = [940, 900, 860], WW = 300, WH = 430
export const WTOP = (k: number) => WY[k] - WH
// # the water surface of tank k at level lv
export const WSURF = (k: number, lv: number) => WY[k] - WH + 18 + (WH - 36) * (1 - lv)

export const Steps3: React.FC = () => (
  <g>
    <rect x={-40} y={940} width={2000} height={200} fill="#5C362C" />
    {[0, 1, 2].map((k) => { const x = WX[k] - 210, y = WY[k]; return <g key={k}>
      <rect x={x} y={y} width={420} height={1100 - y} fill={k % 2 ? BRICK : '#83503F'} />
      <rect x={x} y={y} width={420} height={14} fill="#A66B55" />
      {Array.from({ length: 7 }, (_, r) => <line key={r} x1={x} x2={x + 420} y1={y + 40 + r * 28} y2={y + 40 + r * 28} stroke={BRICK2} strokeWidth={2} opacity={0.6} />)}
    </g> })}
  </g>
)

// # a coin pile with its amount on a little paper tag (sits on the brick step left of each tank's plaque)
export const CoinTag: React.FC<{ x: number; y: number; t: string; o?: number; s?: number; col?: string }> = ({ x, y, t, o = 1, s = 1, col = PAPER }) => o <= 0.001 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {[0, 1, 2].map((k) => <Coin key={k} x={-40 + k * 40} y={-30 - (k === 1 ? 16 : 0)} s={0.8} />)}
    <rect x={-90} y={-130} width={180} height={56} rx={10} fill={col} stroke={BRASS2} strokeWidth={3} />
    <text y={-89} textAnchor="middle" fill={INK} style={TXT(44)}>{t}</text>
  </g>
)

// # an amount written on the water itself
export const WaterTag: React.FC<{ k: number; lv: number; t: string; o?: number }> = ({ k, lv, t, o = 1 }) => o <= 0.001 ? null : (
  <g opacity={o}><text x={WX[k]} y={(WSURF(k, lv) + WY[k] - 18) / 2 + 22} textAnchor="middle" fill="#FFFFFF" style={TXT(64)}>{t}</text></g>
)

export const Works: React.FC<{ f: number; lv: number[]; lit?: number[]; o?: number[]; caps?: string[]; capO?: number; capLit?: number[]; ghost?: boolean; col?: string[] }> = ({ f, lv, lit = [0, 0, 0], o = [1, 1, 1], caps = ['$0–12,400', '$12,400–50,400', '$50,400–105,700'], capO = 1, capLit = [0, 0, 0], col = RATE_COL }) => (
  <g>
    {[0, 1, 2].map((k) => <g key={k} opacity={o[k]}><Tank x={WX[k]} y={WY[k]} w={WW} h={WH} level={lv[k]} rate={['10%', '12%', '22%'][k]} col={col[k]} f={f} lit={lit[k]} cap={caps[k]} capO={capO} capBelow capLit={capLit[k]} /></g>)}
  </g>
)

// # overflow pipe from tank k (top right) into tank k+1 (pouring from above); `flow` 0–1 shows the falling water
export const Overflow: React.FC<{ k: number; f: number; o?: number; flow?: number; lvNext: number }> = ({ k, f, o = 1, flow = 0, lvNext }) => (
  <g opacity={o}>
    <Pipe pts={[[WX[k] + WW / 2 - 6, WTOP(k) + 30], [WX[k] + 210, WTOP(k) + 30], [WX[k] + 210, WTOP(k + 1) - 40], [WX[k + 1] - 70, WTOP(k + 1) - 40]]} w={22} />
    <Stream x={WX[k + 1] - 70} y0={WTOP(k + 1) - 30} y1={WSURF(k + 1, lvNext) + 10} f={f} w={18} o={flow} />
  </g>
)

export { Chest, BracketLine, on, pop, BRASS }
