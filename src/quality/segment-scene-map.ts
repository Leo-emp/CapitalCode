// # Deterministic mapping from script segment types to allowed Remotion scene components
// # Each segment type has a curated list of visuals that make editorial sense

// # All valid scene component names the pipeline can render
export type SceneComponent =
  | 'BigStatReveal'
  | 'KineticTitle'
  | 'TextOverlay'
  | 'FlowDiagram'
  | 'ProcessSteps'
  | 'LineChartDraw'
  | 'BarChartGrow'
  | 'AreaChartFill'
  | 'CandlestickChart'
  | 'CounterAnimation'
  | 'BarChartRace'
  | 'StackedBar'
  | 'WaterfallChart'
  | 'QuoteCard'
  | 'ComparisonSplit'
  | 'BeforeAfter'
  | 'GaugeChart'
  | 'TimelineSequence'
  | 'IconGrid'
  | 'CallToAction'
  | 'WorldMap'

// # All segment types the script generator can produce
export type SegmentType = keyof typeof SEGMENT_SCENE_MAP

// # Which scene components are valid for each segment type
// # Hook → dramatic stat or bold title
// # Context → explanatory text, diagrams, process breakdowns
// # Data → any chart or counter animation
// # Insight → text-heavy: overlay, quote, kinetic title
// # Comparison → side-by-side or racing charts
// # Counter → stat-focused: text, big stat, quote
// # Prediction → forward-looking charts and timelines
// # Implication → structural visuals: icons, processes, flows
// # CTA → always the call-to-action component
export const SEGMENT_SCENE_MAP = {
  hook:        ['BigStatReveal', 'KineticTitle'],
  context:     ['TextOverlay', 'FlowDiagram', 'ProcessSteps', 'WorldMap'],
  data:        ['LineChartDraw', 'BarChartGrow', 'AreaChartFill', 'CandlestickChart',
                'CounterAnimation', 'BarChartRace', 'StackedBar', 'WaterfallChart', 'WorldMap'],
  insight:     ['TextOverlay', 'QuoteCard', 'KineticTitle'],
  comparison:  ['ComparisonSplit', 'BarChartRace', 'BeforeAfter', 'StackedBar', 'WorldMap'],
  counter:     ['TextOverlay', 'BigStatReveal', 'QuoteCard'],
  prediction:  ['LineChartDraw', 'GaugeChart', 'TimelineSequence', 'AreaChartFill'],
  implication: ['IconGrid', 'ProcessSteps', 'FlowDiagram', 'WorldMap'],
  cta:         ['CallToAction'],
} as const satisfies Record<string, readonly SceneComponent[]>

// # Maximum allowed consecutive uses of the same scene type
const MAX_CONSECUTIVE = 2

// # Pick the best scene component for a segment, enforcing variety
// # segmentType — which segment this is (hook, data, etc.)
// # recentScenes — the last N scene types used (newest last)
// # Returns a scene component name that's allowed for this segment type
// #   and avoids 3+ consecutive uses of the same component
export function pickSceneType(
  segmentType: string,
  recentScenes: string[] = []
): SceneComponent {
  // # Look up allowed components for this segment type
  const allowed = SEGMENT_SCENE_MAP[segmentType as SegmentType]

  // # Unknown segment type → fall back to TextOverlay (safe default)
  if (!allowed) {
    return 'TextOverlay'
  }

  // # Only one option (e.g. cta) → no choice to make
  if (allowed.length === 1) {
    return allowed[0]
  }

  // # Check what the last MAX_CONSECUTIVE scenes were
  const tail = recentScenes.slice(-MAX_CONSECUTIVE)

  // # If all recent scenes are the same type, we must pick something different
  const allSame = tail.length === MAX_CONSECUTIVE && tail.every((s) => s === tail[0])

  if (allSame) {
    // # Filter out the repeated type
    const filtered = allowed.filter((s) => s !== tail[0])

    // # If filtering leaves options, pick the first alternative
    // # If everything was filtered (shouldn't happen with our map), fall back to first allowed
    return filtered.length > 0 ? filtered[0] : allowed[0]
  }

  // # No variety constraint triggered — pick the first allowed component
  // # (Deterministic: the AI Director upstream handles creative variety,
  // #  this layer just enforces hard constraints)
  return allowed[0]
}

// # Check whether a scene type is valid for a given segment type
export function isValidSceneForSegment(
  sceneType: string,
  segmentType: string
): boolean {
  const allowed = SEGMENT_SCENE_MAP[segmentType as SegmentType]

  // # Unknown segment type → nothing is valid
  if (!allowed) return false

  return (allowed as readonly string[]).includes(sceneType)
}
