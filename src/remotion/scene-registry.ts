// # Scene registry — maps scene type strings to React components
// # Used by MasterComposition to dynamically render scenes from AI Director output
import type React from 'react'
import { BigStatReveal } from './scenes/BigStatReveal'
import { KineticTitle } from './scenes/KineticTitle'
import { TextOverlay } from './scenes/TextOverlay'
import { LineChartDraw } from './scenes/LineChartDraw'
import { BarChartGrow } from './scenes/BarChartGrow'
import { AreaChartFill } from './scenes/AreaChartFill'
import { CounterAnimation } from './scenes/CounterAnimation'
import { ComparisonSplit } from './scenes/ComparisonSplit'
import { QuoteCard } from './scenes/QuoteCard'
import { IconGrid } from './scenes/IconGrid'
import { ProcessSteps } from './scenes/ProcessSteps'
import { FlowDiagram } from './scenes/FlowDiagram'
import { TimelineSequence } from './scenes/TimelineSequence'
import { GaugeChart } from './scenes/GaugeChart'
import { BarChartRace } from './scenes/BarChartRace'
import { StackedBar } from './scenes/StackedBar'
import { WaterfallChart } from './scenes/WaterfallChart'
import { CandlestickChart } from './scenes/CandlestickChart'
import { BeforeAfter } from './scenes/BeforeAfter'
import { CallToAction } from './scenes/CallToAction'
import { HormoziCaption } from './scenes/HormoziCaption'
import { WorldMap } from './scenes/WorldMap'

// # String key → component mapping for dynamic rendering
// # Keys must match SceneComponent type from segment-scene-map.ts
export const SCENE_REGISTRY: Record<string, React.FC<any>> = {
  BigStatReveal,
  KineticTitle,
  TextOverlay,
  LineChartDraw,
  BarChartGrow,
  AreaChartFill,
  CounterAnimation,
  ComparisonSplit,
  QuoteCard,
  IconGrid,
  ProcessSteps,
  FlowDiagram,
  TimelineSequence,
  GaugeChart,
  BarChartRace,
  StackedBar,
  WaterfallChart,
  CandlestickChart,
  BeforeAfter,
  CallToAction,
  HormoziCaption,
  WorldMap,
}
