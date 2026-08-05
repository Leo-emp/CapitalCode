// # Candlestick chart — OHLC financial chart
import { useCurrentFrame, spring, useVideoConfig } from 'remotion'
import { colors } from '../design/colors'
import { fonts, fontSize, type AspectMode } from '../design/fonts'
import { springs, durations } from '../design/animations'
import { safeZoneStyle, truncate } from '../design/safe-zones'
import { gradientBg } from '../design/backgrounds'

export interface CandlestickChartProps {
  title: string
  candles?: Array<{ open: number; high: number; low: number; close: number; label?: string }>
  aspect?: AspectMode
}

export const CandlestickChart: React.FC<CandlestickChartProps> = ({ title, candles = [], aspect = 'landscape' }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const chartW = aspect === 'landscape' ? 1100 : 700
  const chartH = aspect === 'landscape' ? 450 : 380
  const allVals = candles.flatMap((c) => [c.high, c.low])
  const maxV = Math.max(...allVals, 1)
  const minV = Math.min(...allVals, 0)
  const range = maxV - minV || 1

  const toY = (v: number) => chartH - ((v - minV) / range) * chartH
  const candleW = Math.min(40, chartW / Math.max(candles.length, 1) - 8)

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={gradientBg()} />
      <div style={safeZoneStyle}>
        <div style={{ fontFamily: fonts.headline.family, fontSize: fontSize('headline', 'subheading', aspect), color: colors.text.primary, textTransform: 'uppercase', marginBottom: 32 }}>{truncate(title, 50)}</div>
        <svg width={chartW} height={chartH} viewBox={`0 0 ${chartW} ${chartH}`}>
          {candles.slice(0, 20).map((c, i) => {
            const progress = spring({ frame: frame - i * 1, fps, config: springs.snappy })
            const isBullish = c.close >= c.open
            const col = isBullish ? colors.semantic.positive : colors.semantic.negative
            const x = (i / Math.max(candles.length - 1, 1)) * (chartW - candleW) + candleW / 2
            const bodyTop = toY(Math.max(c.open, c.close))
            const bodyBottom = toY(Math.min(c.open, c.close))
            const bodyH = Math.max(bodyBottom - bodyTop, 1)
            return (
              <g key={i} opacity={progress}>
                {/* # Wick */}
                <line x1={x} x2={x} y1={toY(c.high)} y2={toY(c.low)} stroke={col} strokeWidth={1.5} />
                {/* # Body */}
                <rect x={x - candleW / 2} y={bodyTop} width={candleW} height={bodyH} fill={isBullish ? col : col} rx={2} />
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}
