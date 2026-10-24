# CapitalCode "Living Film" Rebuild — Design

Date: 2026-10-24 · Owner: Leo-emp · Status: for owner approval
Builds on: `2026-10-23-capitalcode-agent-design.md` (engine, gates, voice, packaging stay as they are).

## 1. Intent — why

The owner watched the first long video (three versions) and the first three Shorts and is **not satisfied with
the quality of either**. The reference the owner likes is Kurzgesagt, "Banking Explained – Money and Credit"
(`Downloads/Banking Explained – Money and Credit_1080p.mp4`). What the owner named, in their words:

- "it illustrate almost every word the voiceover says"
- "every illustrations we show must be related and synced to the voiceover line its speaking in real time"
- characters "animated rather than fixed … walking, hand gestures, taking something, showing emotions, expressions"
- "camera motion, like in the video i showed u"
- what must stay **ours**: "colors and characters"

Measured on the reference vs our latest video: something new appears on screen every **0.8 s** vs **4.8 s**;
≈ 0 hard cuts in 5 min (continuous camera); almost no on-screen text; brightness ≈ 65% (pastel) vs our 14%.

The goal: CapitalCode videos that feel like a **living animated film** — every line shown, in sync, by
characters who act, objects that do things, and a camera that travels — in CapitalCode's own colours and cast.

## 2. Decisions the owner made

| Area | Decision |
|---|---|
| Direction | Kurzgesagt-quality editing and animation, made ours (owner, 2026-10-24) |
| Ours | Colours and characters |
| Colour world | **A "Night flat"** as the main world: lit night, deep navy (not black), rich solid bright objects (champagne, sky blue, coral, teal); **deep teal** as the second world |
| Night share | Mostly lit night, about **70/30** with dusk / teal interiors / occasional day for variety (chapters, flashbacks) |
| Characters | The approved HD cast is kept (same looks, front-facing rule) and **animated**: walking, flowing gestures, taking/giving things, emotions that change, blinking/breathing |
| Camera | Moves like the reference: pans/tracking, zoom-into an object that becomes the next scene, parallax depth, constant gentle drift |
| Sync | **Binding:** every illustration relates to the words being spoken and appears as they are said |
| Process | No style test first — straight to the full rebuild (owner) |
| Style bible | Kept and upgraded; current pages archived for comparison |

## 3. Goals, non-goals, anti-goals

**Goals**
- A new visual element (character action, object event, or camera move to a new subject) about **every 1 s**
  on average, each tied to the word it shows (target measured by `changeEvery` ≤ 1.5 s; reference 0.8 s).
- Characters that are never frozen: idle life (breathing, blinks, small weight shifts) plus actions on cues.
- A camera that is never perfectly still and that **goes to what is being talked about**.
- Text slides only for the key numbers: **≤ 25% of runtime** (today ≈ 45%).
- Long video and Shorts both upgraded (Shorts inherit everything; they are cut from the long timeline).
- Remake "Your Index Fund Is Less Diversified Than You Think" in the new style as the proof video.

**Non-goals**
- No AI images, stock footage or pastel Kurzgesagt look. Everything stays code-drawn (React/SVG + Remotion).
- No voice or script-engine changes (Azure Andrew, script gate, facts all stay).
- No 3/4 or side-view characters (front-facing rule from the original spec stays; walking is a front-facing
  walk with a sideways travel, as today's `walkA/walkB` keys suggest).

**Anti-goals (failure even if it "works")**
- Looking like a Kurzgesagt imitation (pastel cream worlds, their bird mascot, their typography, their layouts copied).
- Motion for its own sake: a moving thing that is not about the current words.
- Black, muddy frames (our first video: 6.9% brightness).
- Characters that look broken when they move (limbs detaching, jitter, faces sliding).
- Renders that are killed or crash (memory safeguards stay; no per-frame SVG filters).

## 4. The look — "Night flat" world

- Background: deep navy gradients with glow (moon, windows, street lamps), never near-black;
  target video brightness **≈ 25–30%** (gate band raised from 11–22% to 20–35%).
- Objects and buildings: **solid flat fills** with simple shading (one light side, one shadow side), soft
  ambient shadows on the ground, no thin-line-only drawings.
- Palette (from today's tokens, extended): navy family (bg), champagne (brand, gold), sky blue (hero, data),
  coral (danger/loss), teal (calm/second world), green only for gains, red only for losses.
- Second world "deep teal": same objects, teal-blue light — used for ~30% of shots (chapter changes, flashbacks,
  "inside" places like vaults and machines).
- Logo emblem, champagne accent, Bebas/Inter fonts unchanged.

## 5. Characters — animated cast

Same five looks (hero, buyer, investor, owner, worker) on the HD rig, plus **mini cast** (the same looks drawn
small) for crowds on round pedestals.

Behaviour the rig must support:
- **Idle life (always on):** breathing, blink every few seconds, small head turns, weight shifts.
- **Locomotion:** walk on a path between scene positions (enter, cross, leave), with walk cycle, arm swing, bounce.
- **Gestures:** flowing talk gestures between keyed poses (open hands, point, count on fingers, shrug,
  hand on chin), blended — never a snap.
- **Handling objects:** pick up, hold, put down, **hand over to another character**; the object follows the hand.
- **Emotion:** expressions keyed to words and **blended** (worried → relieved); body follows (slump, celebrate).
- **Crowds:** many mini characters on pedestals, each with a coin stack sized to its share; small staggered motion.

## 6. Camera

Each scene is a **wide world canvas** (larger than 1920×1080) with layers (back / mid / front) for parallax.
A per-shot camera track, keyed to cue words:
- **pan / track** to a subject when it is named, or along with a walking character
- **push-in / pull-out** on emphasis
- **zoom-into**: the camera flies into an object (a vault door, a window, a coin) and the next shot grows out
  of it — the default way to move between related shots (replaces most cuts)
- **drift**: slow constant float so no frame is ever still
- eased motion only (no linear moves), parallax by layer depth

## 7. Showing every line — the sync rule

- Every visual event (character action, object event, camera move, slide item) is cued to the **word** it shows.
- Density: aim for one event per 2–3 spoken words; the plan gate refuses gaps over **2 s** (today 6 s) and
  sentences without their own event (today 10% allowed → **0%**, except chapter-card openers).
- Relevance stays the director's job (skill + taste + Critic), with an automatic check that every event lands
  within **±0.2 s** of its word.
- `changeEvery` (measured on the render) is reported and gated at ≤ 1.5 s.

## 8. Metaphor library

New animated pieces for money ideas, each data-driven and cue-stepped like today's vignettes:
house of cards (fragile, collapses), money mountain (grows/burns), bank on balloons (floating on hope, pops),
springs (bouncing back), furnace/vault machine, ladder/stairs, tug-of-war, see-saw, funnel, magnet,
snowball, leaking bucket, plus today's vignettes restyled (money-flow, pie, baskets, scale, bubble,
leaderboard, lottery, loop) and the backlog (crowd-vs-giant, era skyline, 30-vs-5-year tracks, growing slice).
New layouts: **split-screen grids** (4–6 panels filling in), **circles** holding scenes.

## 9. What stays

Engine (`run`, `doctor`, caching, memory safeguards, Critic loop, learning memory, packaging, Shorts pipeline),
voice, script gate, facts, research. Plans written against the old shot kinds keep working until the director
moves to the new ones.

## 10. Style bible v2

Rebuilt pages: colour worlds (night flat + teal), animated cast sheet (walk frames, gesture strip, expression
blends, handing-over sequence), camera moves, metaphor library, vignettes, crowds/grids/circles.
Current pages move to `output/style-bible/archive/`.

## 11. Proof

1. Remake the index-fund video (same script and voice) in the new style; Critic + owner review side by side
   with v1/v3.
2. Re-cut its Shorts with the new style.

## 12. Calls made by Claude (owner may override)

1. **What counts as a "visual event"** for the density rules (§7): only events that **show the words** — an
   object doing something, a metaphor/vignette step, a slide item, a character action tied to a verb or
   emotion of the line, the camera moving **to the thing just named**. Idle life (breathing, blinks), generic
   talk gestures, constant drift and a pan that only follows a walker do **not** count. Reason: the owner's
   rule is that every illustration relates to the line being spoken.
2. **Who writes the events:** the director writes only the meaningful events in `plan.json`; the engine adds
   idle life, talk gestures during speech, camera drift and camera-follow automatically. Keeps plans
   writable (~150–250 cued events per 9-min video, not 500+).
3. **Checkpoints:** no stop for approval (owner: "go straight to full rebuild"), but each finished wave
   produces style-bible v2 pages the owner can look at any time; the internal Critic reviews the rig and
   the look before the proof remake.
4. **Scope of "rebuild done" (proof video):** wave 1 = palette + restyle of all existing scenes, props,
   vignettes and slides in place; animated rig (idle life, walk, gestures, hand-over, expression blends);
   camera (pan, push, zoom-into, drift, parallax); crowds on pedestals, grids, circles; and the metaphors
   the index-fund script needs (≈ 8). Remaining metaphors in later waves, built as new scripts need them.
5. **Old shot kinds** are restyled **in place**: every plan renders in the new look. The v1/v3 videos already
   packaged stay as the comparison.
6. **Text share (≤ 25%)** counts `slide` shots and slam shots. Vignette headings stay but are optional and
   one short line; labels on objects are allowed (short).
7. **Render budget:** ≤ 60 min per long video on this PC (16 cores, ~15 GB), within the memory safeguards;
   heavy static layers may be pre-rendered/cached per shot to stay inside it.

## 13. Left to the builder

Exact rig mechanics (IK vs keyed joints), canvas sizes, easing curves, how zoom-into is composed technically,
the order of building metaphors, and test strategy — within the rules above. Render time may grow; memory
safeguards and chunk caching must hold.
