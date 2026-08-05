// # Visual descriptions of all scene types available to the AI Director
// # Each entry explains what the scene looks like rendered, what props it accepts,
// # and which script segment types it pairs best with.
// #
// # Design system constants referenced throughout:
// #   Background: #0A1628 (navy)   Accent: #D4A853 (gold)
// #   Positive: #2ECC71            Negative: #E74C3C
// #   Headlines: Bebas Neue        Body: Inter        Data: JetBrains Mono
// #   Springs: smooth (damping 200, stiffness 100), snappy (damping 20, stiffness 200)
// #   FPS: 30

export const SCENE_DESCRIPTIONS: string = `

===== 1. BigStatReveal =====
What it looks like:
  Dark navy background with subtle radial gradient. A large number (JetBrains
  Mono, 96-120px) counts up from zero to the target value using a smooth spring
  animation. Gold accent glow radiates behind the number. Below: a label line
  in Inter 28px (white) and a sublabel in Inter 22px (muted gray). Optional
  gold particle burst on counter completion. The entire composition is centered
  vertically and horizontally.

Props:
  stat_value (string) — formatted display value, e.g. "$1.8T"
  stat_label (string) — what the number represents
  stat_sublabel (string) — source context or time period
  accent_color (hex) — glow and particle color, default #D4A853
  number_font, number_size, label_font, label_size
  animate_counter (bool) — whether to count up or snap in
  counter_start, counter_end (number) — raw numeric range
  counter_format (string) — d3-format pattern, e.g. "$,.1T"
  glow_intensity (0-1) — radial glow strength behind number
  particle_count (int) — burst particles on completion
  comparison_text (string, optional) — "More than X's GDP"
  background_gradient (string[]) — two-stop gradient

Best used for: hook segments, dramatic data reveals, any single-number emphasis.


===== 2. KineticTitle =====
What it looks like:
  Full-screen title card. The headline (Bebas Neue, uppercase, 72-96px) slides
  in from the left with snappy spring animation. Each word can stagger by 3
  frames. A thin gold underline (2px) draws across the bottom of the headline
  after all words land. Optional subtitle fades in below (Inter, 28px, muted
  gray). Background is solid #0A1628 or a slow-moving gradient.

Props:
  title (string) — the headline text
  title_font, title_size, title_color
  subtitle (string, optional)
  subtitle_font, subtitle_size, subtitle_color
  underline_color (hex) — default #D4A853
  underline_width (px)
  word_stagger_frames (int) — delay between each word
  entry_direction ("left" | "right" | "bottom")
  entry_spring — spring config override
  background (hex or gradient)

Best used for: video intros, section headers, topic introductions.


===== 3. TextOverlay =====
What it looks like:
  Navy background. A headline in Bebas Neue (48-72px, white, uppercase) sits
  at the top third. Below it, body lines appear one at a time with a staggered
  slide-right or fade-up animation. Each line is Inter 22-28px, muted gray.
  Specific words within lines can be highlighted in gold or semantic colors
  (positive green, negative red). Lines maintain generous spacing (1.6x line
  height). The composition works in both 16:9 and 9:16.

Props:
  headline (string)
  headline_font, headline_size, headline_color
  body_lines (string[]) — each line appears sequentially
  body_font, body_size, body_color
  highlight_words (string[]) — words to color differently
  highlight_color (hex)
  stagger_delay_frames (int) — gap between each line appearing
  line_entry_animation ("slide_right" | "fade_up" | "typewriter")
  background (hex)

Best used for: context, insight, counter, implication segments — any narration
  that needs visual text reinforcement without chart data.


===== 4. LineChartDraw =====
What it looks like:
  A clean line chart draws itself from left to right with smooth spring
  animation. Axes appear first (fade in, Inter labels), then lines trace their
  paths with a visible drawing effect. Multiple series use the chart palette
  (#D4A853, #3498DB, #2ECC71, #E74C3C). Data points can show dots on hover
  frames. Optional spread fill between two series (semi-transparent gold).
  Annotations (JetBrains Mono, 24px) callout key values. Grid lines are
  subtle (#1B2838).

Props:
  title (string), title_font, title_size
  x_axis_label, y_axis_label
  series (array) — each with id, label, color, data_points, line_width
  spread_fill (object, optional) — fills area between two series
  annotation (object, optional) — text callout at a specific data point
  grid_color, axis_color
  draw_speed ("smooth" | "fast" | "dramatic")
  draw_spring — spring config for the drawing animation
  background (hex)

Best used for: data segments showing trends over time — rate changes, price
  history, growth curves, multi-year comparisons.


===== 5. BarChartGrow =====
What it looks like:
  Horizontal or vertical bars grow from zero to their target height/width
  using smooth spring. Bars are rounded (4px radius) with the chart palette.
  Each bar staggers by 3 frames. Labels sit at the bar base (Inter, 22px) and
  values appear at the bar tip (JetBrains Mono, bold). Optional value labels
  count up as the bar grows. Background is navy with subtle grid lines.

Props:
  title (string), title_font, title_size
  orientation ("vertical" | "horizontal")
  bars (array) — each with label, value, color, formatted_value
  bar_width (px), bar_gap (px), bar_radius (px)
  stagger_delay_frames (int)
  animate_values (bool) — counter animation on value labels
  value_font, value_size, label_font, label_size
  grid_color, background (hex)
  grow_spring — spring config for bar growth

Best used for: data segments comparing discrete categories — revenue by source,
  market share, rankings, single-period comparisons.


===== 6. AreaChartFill =====
What it looks like:
  Similar to LineChartDraw but the area below each line fills with a
  semi-transparent gradient (top color at 30% opacity, fading to 5% at the
  baseline). The fill animation follows the line draw, creating a "painting
  downward" effect. Supports stacked areas where multiple series layer on top
  of each other. Crisp axis labels in Inter, values in JetBrains Mono.

Props:
  title (string), title_font, title_size
  x_axis_label, y_axis_label
  series (array) — each with id, label, color, data_points, fill_opacity
  stacked (bool) — whether series stack or overlap
  draw_speed ("smooth" | "fast")
  draw_spring — spring config
  grid_color, axis_color, background (hex)

Best used for: data segments showing volume/magnitude over time — total deposits,
  cumulative spending, market cap growth, anything where area conveys scale.


===== 7. CounterAnimation =====
What it looks like:
  A large number (JetBrains Mono, 72-96px) counts from a start value to an
  end value with smooth easing. The number is centered on screen with a title
  above (Bebas Neue, 48px) and optional subtitle below (Inter, 20px, muted).
  Color transitions can occur at milestone values (e.g., shifts from gold to
  red as the number climbs past a threshold). Tick SFX cues sync to the
  counter speed. Background is dark navy with optional gradient shift.

Props:
  title (string), title_font, title_size
  counter_start, counter_end (number)
  counter_format (string) — formatting pattern
  counter_font, counter_size, counter_color
  counter_duration_frames (int)
  milestones (array, optional) — value thresholds that change color or trigger labels
  subtitle (string, optional), subtitle_font, subtitle_size, subtitle_color
  background_gradient (string[])

Best used for: implication and data segments where a single number's growth tells
  the story — compound interest, cost accumulation, loss totals.


===== 8. ComparisonSplit =====
What it looks like:
  Screen splits vertically (16:9) or horizontally (9:16) into two halves.
  Left/top side uses one accent color, right/bottom uses another. Each half
  contains a label (Bebas Neue, 48px), a key value (JetBrains Mono, 64px),
  and 2-3 supporting stats (Inter, 22px). A thin divider line (gold, 2px)
  separates the halves. Both sides animate in simultaneously from opposite
  edges with snappy spring. Optional "VS" badge at the center intersection.

Props:
  left_label, right_label (string)
  left_value, right_value (string)
  left_color, right_color (hex)
  left_stats, right_stats (array of {label, value})
  divider_color (hex), divider_width (px)
  show_vs_badge (bool)
  vs_badge_color (hex)
  entry_spring — spring config
  label_font, label_size, value_font, value_size, stat_font, stat_size
  background (hex)

Best used for: comparison segments — competitor vs. competitor, before vs. after,
  old approach vs. new approach.


===== 9. QuoteCard =====
What it looks like:
  A centered card (rounded corners, 12px, subtle border in gold) floats on the
  navy background. Inside: large quote text in Inter italic (32px, white) with
  a gold opening quotation mark (120px, 15% opacity) as a decorative element
  behind the text. Attribution line below (Inter, 18px, muted gray, prefixed
  with em dash). Optional debunk/verdict text that appears after a delay — the
  debunk in a contrasting color (red), the verdict in gold Bebas Neue. Card
  has a subtle drop shadow and can pulse gently on the verdict reveal.

Props:
  quote_text (string), quote_font, quote_size, quote_color, quote_style
  attribution (string), attribution_color
  debunk_text (string, optional) — contrasting fact
  debunk_delay_frames, debunk_color, debunk_font, debunk_size
  verdict_text (string, optional) — final punchline
  verdict_font, verdict_size, verdict_color, verdict_delay_frames
  card_bg (hex), card_border_color, card_border_width
  background (hex)

Best used for: insight and counter segments — presenting a claim then debunking
  it, showing expert quotes, contrasting official narrative vs. reality.


===== 10. IconGrid =====
What it looks like:
  A grid of icons (3x3 or 4x3) where each cell contains an icon (SVG or emoji,
  48px), a label (Inter, 18px), and an optional value (JetBrains Mono, 22px).
  Icons appear with staggered scale-up animation (snappy spring). Active/
  highlighted cells have a gold border glow. Inactive cells are dimmed (40%
  opacity). Title sits above the grid in Bebas Neue. Works well in both
  aspect ratios with responsive column counts.

Props:
  title (string), title_font, title_size
  items (array) — each with icon, label, value (optional), highlighted (bool)
  columns (int) — grid columns, adapts to aspect ratio
  icon_size (px), label_font, label_size, value_font, value_size
  highlight_color (hex) — border glow for active items
  dim_opacity (0-1) — opacity for non-highlighted items
  stagger_delay_frames (int)
  entry_animation ("scale_up" | "fade")
  background (hex)

Best used for: context and data segments showing multiple related items —
  feature lists, category breakdowns, multi-factor analysis.


===== 11. ProcessSteps =====
What it looks like:
  A horizontal (landscape) or vertical (portrait) sequence of 3-6 numbered
  steps connected by dotted lines. Each step is a rounded rectangle with a
  number badge (gold circle, Bebas Neue), a title (Inter bold, 22px), and a
  brief description (Inter, 18px, muted). Steps reveal sequentially with
  slide animations. The connecting line draws between steps as each appears.
  Active step has a gold border; completed steps dim slightly.

Props:
  title (string), title_font, title_size
  steps (array) — each with number, title, description
  step_bg (hex), step_border_color, step_active_color
  connector_style ("dotted" | "solid" | "arrow")
  connector_color (hex)
  stagger_delay_frames (int)
  direction ("horizontal" | "vertical") — adapts to aspect ratio
  number_font, number_size, step_title_font, step_title_size
  description_font, description_size
  background (hex)

Best used for: context and implication segments — explaining how a process works,
  showing cause-and-effect chains, step-by-step breakdowns.


===== 12. FlowDiagram =====
What it looks like:
  Nodes (rounded rectangles, navy fill with gold border) connected by animated
  arrows. Nodes contain short labels (Inter, 20px, white). Arrows draw
  themselves between nodes with smooth spring animation. Can show branching
  paths (decision trees) or linear flows. Flow direction is left-to-right
  (landscape) or top-to-bottom (portrait). Nodes can have value badges
  (JetBrains Mono, small gold text) showing dollar amounts or percentages.

Props:
  title (string), title_font, title_size
  nodes (array) — each with id, label, value (optional), position
  edges (array) — each with from, to, label (optional), color
  node_bg, node_border_color, node_text_color
  node_font, node_size
  arrow_color, arrow_width, arrow_animation ("draw" | "fade")
  value_font, value_size, value_color
  layout ("left_to_right" | "top_to_bottom")
  draw_spring — spring config for arrow animation
  background (hex)

Best used for: context segments — money flow, organizational structures,
  decision trees, "how X works" explanations.


===== 13. TimelineSequence =====
What it looks like:
  A horizontal timeline (landscape) or vertical timeline (portrait) with dated
  event markers. A thin line (gold, 2px) runs the length of the timeline.
  Events are circular markers on the line, each with a date label (JetBrains
  Mono, 18px) and description (Inter, 20px). Events appear sequentially with
  the line drawing between them. Current/highlighted event has a pulsing gold
  glow. Past events are solid, future events are outlined.

Props:
  title (string), title_font, title_size
  events (array) — each with date, label, description, highlighted (bool)
  line_color (hex), marker_color, marker_size
  date_font, date_size, label_font, label_size
  highlight_glow_color, highlight_glow_intensity
  direction ("horizontal" | "vertical")
  stagger_delay_frames (int)
  draw_spring — spring config for line drawing
  background (hex)

Best used for: context and prediction segments — historical timelines, policy
  change sequences, projected future events, company milestones.


===== 14. GaugeChart =====
What it looks like:
  A semi-circular gauge (180-degree arc) with a needle that sweeps from left
  to right using smooth spring animation. The arc has color segments (green
  on the left through gold in the middle to red on the right, or custom
  ranges). The needle is thin (3px, white) with a circular base. Current
  value displays in large JetBrains Mono (48px) below the gauge center.
  Label and description in Inter below the value. Background is navy.

Props:
  title (string), title_font, title_size
  value (number), min_value, max_value
  value_format (string) — display format
  value_font, value_size
  label (string), label_font, label_size
  ranges (array) — each with min, max, color, label
  needle_color, needle_width
  arc_width (px) — thickness of the gauge arc
  sweep_spring — spring config for needle animation
  background (hex)

Best used for: data segments showing a single metric on a scale — risk scores,
  pricing power, sentiment, performance ratings.


===== 15. BarChartRace =====
What it looks like:
  Animated horizontal bar chart where bars re-sort themselves over time
  (like a "bar chart race"). Each frame updates bar positions and lengths
  smoothly. Bars are color-coded per item from the chart palette. Labels
  sit inside or beside the bars (Inter, 20px). Current period label shows
  prominently (JetBrains Mono, 48px, gold). Values count up at bar tips.
  Smooth spring transitions as bars swap positions.

Props:
  title (string), title_font, title_size
  time_periods (array) — each with period_label and item_values
  items (array) — each with id, label, color
  bar_height (px), bar_gap (px), bar_radius (px)
  max_visible_bars (int) — how many bars shown at once
  period_font, period_size, period_color
  label_font, label_size, value_font, value_size
  transition_frames (int) — frames per period transition
  transition_spring — spring config
  background (hex)

Best used for: data segments showing competitive rankings over time — market
  share shifts, revenue rankings, country GDP comparisons.


===== 16. StackedBar =====
What it looks like:
  Vertical or horizontal bars divided into colored segments stacking on top of
  each other. Each segment grows from the previous one's endpoint with smooth
  spring animation. A legend (Inter, 18px) maps colors to categories. Segment
  values can appear as labels inside the bar (JetBrains Mono, 16px, white if
  segment is large enough). Total value sits above/beside each bar. Grid lines
  are subtle (#1B2838).

Props:
  title (string), title_font, title_size
  orientation ("vertical" | "horizontal")
  bars (array) — each with label, segments (array of {category, value, color})
  bar_width (px), bar_gap (px), bar_radius (px)
  show_segment_labels (bool) — values inside segments
  show_totals (bool) — total above each bar
  legend_position ("top" | "bottom" | "right")
  legend_font, legend_size
  segment_label_font, segment_label_size
  stagger_delay_frames (int)
  grow_spring — spring config
  grid_color, background (hex)

Best used for: data segments showing composition — revenue breakdown, budget
  allocation, portfolio mix, where each category's contribution matters.


===== 17. WaterfallChart =====
What it looks like:
  A series of floating bars connected by thin lines showing how a starting
  value changes through additions and subtractions to reach a final value.
  Positive changes are green (#2ECC71), negative changes are red (#E74C3C),
  totals are gold (#D4A853). Bars grow from their connection point with
  smooth spring. Each bar has a value label (JetBrains Mono, 20px) and
  category label below (Inter, 18px). Connector lines are dashed, subtle gray.

Props:
  title (string), title_font, title_size
  items (array) — each with label, value, type ("increase" | "decrease" | "total")
  bar_width (px), bar_gap (px), bar_radius (px)
  increase_color, decrease_color, total_color
  connector_style ("dashed" | "solid"), connector_color
  value_font, value_size, label_font, label_size
  show_running_total (bool)
  stagger_delay_frames (int)
  grow_spring — spring config
  background (hex)

Best used for: data segments showing how a total builds up or breaks down —
  revenue bridges, cost structures, profit waterfall, P&L decomposition.


===== 18. CandlestickChart =====
What it looks like:
  Financial candlestick chart with green (bullish) and red (bearish) candles.
  Each candle has a body (filled rectangle) and wicks (thin lines extending
  above and below). Candles appear left to right with staggered timing. Axes
  show dates (x) and prices (y) in JetBrains Mono. Optional volume bars at
  the bottom (small, semi-transparent). Moving average lines can overlay.
  Grid is subtle, background is navy.

Props:
  title (string), title_font, title_size
  candles (array) — each with date, open, high, low, close, volume (optional)
  bullish_color, bearish_color
  candle_width (px), wick_width (px)
  show_volume (bool), volume_height_pct (0-1)
  moving_averages (array, optional) — each with period, color, line_width
  x_axis_font, x_axis_size, y_axis_font, y_axis_size
  grid_color, background (hex)
  stagger_delay_frames (int)
  entry_animation ("grow_up" | "fade")

Best used for: data segments about stock prices, market movements, crypto
  analysis — any time OHLC (open/high/low/close) data is relevant.


===== 19. BeforeAfter =====
What it looks like:
  A split-screen wipe transition. The "before" state occupies the full screen
  initially (left or top half). A gold divider line (3px, with a draggable
  handle circle) sweeps across to reveal the "after" state. Each side has a
  label badge ("BEFORE" / "AFTER" in Bebas Neue, 24px, inside a pill-shaped
  container). Both sides can contain text, numbers, or simple graphics. The
  wipe animation uses smooth spring for a satisfying reveal.

Props:
  before_label, after_label (string)
  before_content (object) — headline, stats, color scheme
  after_content (object) — headline, stats, color scheme
  divider_color (hex), divider_width (px)
  wipe_direction ("left_to_right" | "top_to_bottom")
  wipe_start_frame (int) — when the reveal begins
  wipe_duration_frames (int)
  wipe_spring — spring config
  label_font, label_size
  content_font, content_size
  background (hex)

Best used for: comparison and implication segments — policy changes, rate
  shifts, market transformations, lifestyle cost comparisons.


===== 20. CallToAction =====
What it looks like:
  Clean end card with a bold headline (Bebas Neue, 56px, gold) centered on
  screen. Below: a subtext line (Inter, 22px, muted gray). An icon (bell,
  arrow, or play button, 48px, gold) pulses gently using snappy spring on
  loop. Channel name (@CapitalCode) sits below in Inter 20px white. Optional
  gold border glow frames the entire composition. Background is the standard
  navy gradient. The composition is intentionally minimal — no clutter, just
  the clear action.

Props:
  headline (string), headline_font, headline_size, headline_color
  subtext (string), subtext_font, subtext_size, subtext_color
  action_type ("subscribe" | "follow" | "like" | "link")
  icon ("bell" | "arrow_right" | "play" | "link"), icon_color, icon_size
  icon_animation ("pulse" | "bounce" | "none")
  pulse_spring — spring config for icon animation
  channel_name (string), channel_font, channel_size, channel_color
  background_gradient (string[])
  border_glow_color, border_glow_intensity (0-1)

Best used for: cta segments only — the final scene of every video. Keep it
  short (5-10 seconds), clean, and direct.


===== 21. HormoziCaption =====
What it looks like:
  Full-screen word-by-word caption overlay inspired by Alex Hormozi's short-form
  style. One or two words display at a time in the center of the screen, large
  (Bebas Neue, 64-84px, white) with a subtle dark backdrop blur for readability
  over any background. Key words (numbers, emphasis) flash in gold (#D4A853) or
  semantic colors. Words swap with a fast snap animation (snappy spring). Each
  word's timing syncs to the voiceover's word timestamps from the pacing engine.
  No sentence structure visible — purely kinetic, one word at a time.

Props:
  words (array) — each with text, start_frame, end_frame, color, size
  default_font, default_size, default_color
  emphasis_color (hex) — color for emphasis words
  stat_color (hex) — color for numbers and data
  backdrop_blur (px) — blur intensity behind text
  backdrop_opacity (0-1) — darkness of the backdrop
  position ("center" | "lower_third" | "upper_third")
  snap_spring — spring config for word transitions
  max_words_visible (int) — 1 or 2 words at a time

Best used for: short-form content (TikTok, Reels, Shorts) as a caption layer
  that runs on top of other scenes. Syncs with pacing engine word timestamps.
  Pairs with any background scene. Not used for long-form.
`
