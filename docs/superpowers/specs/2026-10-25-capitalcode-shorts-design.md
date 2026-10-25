# CapitalCode Shorts — made from scratch, in the diorama style

Date: 2026-10-25 · Status: draft for owner approval

## Why

The owner wants Shorts to be their own videos: their own script, their own narration, their own
render. They are never re-cut from the long video. They use the same look as the long video: one
continuous illustration that transforms and acts out the words (Kurzgesagt-style), with our cast,
our navy/teal colours, sound effects and big charts for numbers
(see `2026-10-25-capitalcode-diorama-style-design.md`).

## What the owner decided

- A Short has its own pipeline: script → narration → illustrations → render → checks → package.
- Length: **2–3 minutes**.
- Style: the same continuous-illustration style as the long video, polished and coherent, mixing light (cream/beige) and dark (navy) moods.
- Never sliced out of the long video.

## Goals

- One command flow makes a finished vertical Short, the same way a long video is made.
- The picture is drawn for a phone (1080×1920) from the start, not a 16:9 picture squeezed in.
- Understandable with the sound off: the pictures carry the idea, and captions back them up.
- The first 2 seconds hook: the most striking picture and number of the Short.

## Non-goals

- Cutting clips out of a long video (the old `cc shorts` re-cut command is removed).
- Auto-posting (the owner posts by hand, as before).
- Under-60-second clips.

## Anti-goals (failure even if it works)

- A widescreen picture with bars or a box in the middle of a phone screen.
- Rooms with a presenter and stickers (the rejected v4 look).
- Walls of text. Text appears only for key numbers, as in the long video.

## How it works

### The job

A Short is a job of kind `short` (`cc new "<topic>" --short`). It runs through the same steps as a
long job: script, gate-script, voice, plan, gate-plan, render, gate-video, critic, package.
`--from <long job>` copies that job's `facts.json` and sources, so a Short can be a spin-off of a
long video's research without reusing any of its footage. A Short can also be fully standalone with
its own research.

### Script

- 2:00–2:58, kept under 3:00 so YouTube treats it as a Short. At Andrew HD's ~182 words/min that
  is **360–530 words** (target about 430, ≈2:20).
- One idea per Short, told as a small story: hook (a number or a surprise), tension, payoff, a
  closing line that loops back to the opening.
- Every figure comes from `facts.json` with a source, the same as long videos.

### Narration

The same Azure Andrew HD voice, the same cache and the same `words.json` timing.

### Illustrations

- Pieces get a canvas: `wide` (1920×1080, the long video) or `tall` (1080×1920, Shorts). Pieces
  for a Short are drawn on the tall canvas, full-bleed, filling the phone screen.
- The same building kit: Stage, buildings, towers, fund box, bills, hands, our characters, charts
  (bars, line, donut, dot grid, coin stacks), drawn transitions and sound effects on the words.
  The kit takes the canvas size, so every part works on both canvases.
- Compositions are stacked top-to-bottom for a phone: the main action in the middle, big numbers
  above it, captions below it.
- Safe areas are kept clear of anything important: the top 220 px, the bottom 420 px (the YouTube
  buttons and title) and the right 140 px.
- The same rules as the long video: something changes at least every 1.5 s, the picture never
  sits still for more than 2 s, every sentence is illustrated, and text is at most 25% of runtime
  (captions are not counted).

### Captions

Big word-by-word captions, 1–3 words at a time, with the spoken word highlighted in champagne.
They sit in a band just above the bottom safe area and never cover the main action.

### Ending

The last sentence lands on a picture that echoes the opening (so a replay feels natural), then a
2-second CapitalCode brand lockup.

### Checks

- gate-script: 360–530 words, and the other script rules of long videos.
- gate-plan: pieces only, every piece `tall`, all cues spoken, density rules.
- gate-video: duration matches the voice and is ≤ 178 s, plus loudness, flicker and a Critic pack.

### Output

`output/shorts/<Title>_<date>/short.mp4`, plus title, description, hashtags and a cover frame
(`captions_for_posting.txt`).

## The first test

Three Shorts on the index-fund topic, each a different angle, using the long job's sourced facts.
Candidates:
1. "10 companies get 38 cents of every dollar you put in."
2. "Investors in 2000 thought the same thing."
3. "4% of stocks made all of the market's gains."

## My calls (owner can change)

- Captions stay on (sound-off viewing), styled to the brand.
- No "watch the full video" card, since a Short can stand alone.
- The old re-cut code (`agent/shorts.ts` clip picking and slicing, the `cc shorts` command, the
  reframe in `Short.tsx`) is removed.
- Render cost: about 4,200 frames per Short, roughly 15–25 minutes each with 2 workers.

## Left to the builder

Exact piece designs per Short; caption font size within the band; the brand lockup animation.
