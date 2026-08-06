// # Animated SVG world map — country highlights, data labels, flow arrows
// # Used for: GDP comparisons, trade flows, sanctions maps, currency movements
// # Purely SVG-based — no external TopoJSON dependency

import React from 'react'
import { useCurrentFrame, spring, interpolate, useVideoConfig } from 'remotion'
import { colors } from '../design/colors'
import { fonts, fontSize, type AspectMode } from '../design/fonts'
import { springs, durations } from '../design/animations'
import { safeZoneStyle, truncate } from '../design/safe-zones'
import { gradientBg } from '../design/backgrounds'

export interface WorldMapProps {
  highlightCountries: Array<{
    code: string        // # ISO 3166-1 alpha-2 (US, GB, CN, etc.)
    color?: string      // # Override dot color, default gold
    label?: string      // # Country name or short label
    value?: string      // # Data value shown below dot
  }>
  flows?: Array<{
    from: string        // # Source country code
    to: string          // # Destination country code
    label?: string      // # Flow label (e.g. "$2.3B")
  }>
  zoomRegion?: 'world' | 'north-america' | 'europe' | 'asia' | 'africa'
  title: string
  aspect?: AspectMode
}

// # Simplified country centroids (x,y on a 1000×600 SVG viewBox)
// # Positioned to approximate Mercator projection — good enough for data viz
export const COUNTRY_CENTROIDS: Record<string, { x: number; y: number }> = {
  US: { x: 220, y: 250 }, CA: { x: 230, y: 180 }, MX: { x: 200, y: 310 },
  BR: { x: 340, y: 400 }, AR: { x: 310, y: 480 }, GB: { x: 470, y: 195 },
  FR: { x: 485, y: 230 }, DE: { x: 505, y: 210 }, IT: { x: 510, y: 250 },
  ES: { x: 470, y: 255 }, RU: { x: 650, y: 170 }, CN: { x: 760, y: 270 },
  JP: { x: 850, y: 260 }, IN: { x: 710, y: 310 }, AU: { x: 830, y: 470 },
  KR: { x: 830, y: 260 }, SA: { x: 580, y: 310 }, AE: { x: 610, y: 310 },
  ZA: { x: 540, y: 470 }, NG: { x: 500, y: 360 }, EG: { x: 545, y: 290 },
  TR: { x: 555, y: 240 }, TH: { x: 750, y: 330 }, SG: { x: 760, y: 365 },
  ID: { x: 790, y: 380 }, VN: { x: 770, y: 320 }, PH: { x: 810, y: 330 },
  MY: { x: 760, y: 355 }, CH: { x: 500, y: 220 }, SE: { x: 515, y: 165 },
  NO: { x: 505, y: 155 }, NL: { x: 490, y: 200 }, PL: { x: 525, y: 200 },
}

// # Get centroid for a country code — falls back to center of map
export function getCountryCentroid(code: string): { x: number; y: number } {
  return COUNTRY_CENTROIDS[code] ?? { x: 500, y: 300 }
}

// # Build a curved SVG path between two country centroids
// # Uses a quadratic Bezier curve with control point above the midpoint
export function buildFlowPath(fromCode: string, toCode: string): string {
  const from = getCountryCentroid(fromCode)
  const to = getCountryCentroid(toCode)
  // # Control point: horizontally centered, vertically above both points
  const cpX = (from.x + to.x) / 2
  const cpY = Math.min(from.y, to.y) - 50
  return `M ${from.x} ${from.y} Q ${cpX} ${cpY} ${to.x} ${to.y}`
}

// # Zoom viewBox per region
const ZOOM_REGIONS: Record<string, string> = {
  world: '0 0 1000 600',
  'north-america': '80 120 400 300',
  europe: '400 120 250 200',
  asia: '600 150 350 300',
  africa: '420 250 250 300',
}

export const WorldMap: React.FC<WorldMapProps> = ({
  highlightCountries,
  flows = [],
  zoomRegion = 'world',
  title,
  aspect = 'landscape',
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // # Title fade in over first 15 frames
  const titleOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' })

  const viewBox = ZOOM_REGIONS[zoomRegion] ?? ZOOM_REGIONS.world

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* # Dark gradient background */}
      <div style={gradientBg()} />

      <div style={safeZoneStyle}>
        {/* # Scene title */}
        <div style={{
          fontFamily: fonts.headline.family,
          fontSize: fontSize('headline', 'subheading', aspect),
          color: colors.text.primary,
          textTransform: 'uppercase',
          marginBottom: 24,
          opacity: titleOpacity,
        }}>
          {truncate(title, 50)}
        </div>

        {/* # SVG map container */}
        <svg
          viewBox={viewBox}
          width={aspect === 'landscape' ? 1200 : 700}
          height={aspect === 'landscape' ? 500 : 400}
          style={{ overflow: 'visible' }}
        >
          {/* # Map grid — subtle reference lines */}
          <rect x={0} y={0} width={1000} height={600}
            fill="none" stroke={colors.bg.tertiary} strokeWidth={1} rx={8} />
          {[200, 400, 600, 800].map((x) => (
            <line key={`vl${x}`} x1={x} y1={0} x2={x} y2={600}
              stroke={colors.bg.tertiary} strokeWidth={0.5} />
          ))}
          {[150, 300, 450].map((y) => (
            <line key={`hl${y}`} x1={0} y1={y} x2={1000} y2={y}
              stroke={colors.bg.tertiary} strokeWidth={0.5} />
          ))}

          {/* # Country highlight dots — staggered spring animation */}
          {highlightCountries.map((country, i) => {
            const pos = getCountryCentroid(country.code)
            // # Each country pops in with a staggered delay
            const delay = i * durations.staggerDelay
            const scale = spring({ frame: frame - delay - 10, fps, config: springs.snappy })
            const dotColor = country.color ?? colors.accent.gold

            return (
              <g key={country.code}>
                {/* # Outer glow ring */}
                <circle cx={pos.x} cy={pos.y} r={20 * scale}
                  fill={dotColor} opacity={0.2} />
                {/* # Solid inner dot */}
                <circle cx={pos.x} cy={pos.y} r={8 * scale}
                  fill={dotColor} />
                {/* # Country label above dot */}
                {country.label && (
                  <text x={pos.x} y={pos.y - 25}
                    textAnchor="middle" fill={colors.text.primary}
                    fontSize={14} fontFamily={fonts.body.family}
                    opacity={scale}>
                    {country.label}
                  </text>
                )}
                {/* # Data value below dot */}
                {country.value && (
                  <text x={pos.x} y={pos.y + 25}
                    textAnchor="middle" fill={dotColor}
                    fontSize={16} fontFamily={fonts.data.family}
                    fontWeight={700} opacity={scale}>
                    {country.value}
                  </text>
                )}
              </g>
            )
          })}

          {/* # Flow arrows between countries — animated stroke draw */}
          {flows.map((flow, i) => {
            const pathD = buildFlowPath(flow.from, flow.to)
            // # Staggered draw animation
            const drawProgress = interpolate(
              frame,
              [20 + i * 10, 50 + i * 10],
              [0, 1],
              { extrapolateRight: 'clamp' }
            )
            return (
              <g key={`flow-${i}`}>
                {/* # Curved path with animated stroke */}
                <path d={pathD} fill="none"
                  stroke={colors.accent.gold} strokeWidth={2}
                  strokeDasharray={500}
                  strokeDashoffset={500 * (1 - drawProgress)}
                  opacity={0.8} />
                {/* # Flow label at destination */}
                {drawProgress > 0.9 && flow.label && (
                  <text x={getCountryCentroid(flow.to).x}
                    y={getCountryCentroid(flow.to).y - 35}
                    textAnchor="middle" fill={colors.accent.goldLight}
                    fontSize={12} fontFamily={fonts.body.family}>
                    {flow.label}
                  </text>
                )}
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}
