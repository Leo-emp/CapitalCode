# CapitalCode taste — the craft doctrine

The stable "how we make videos" file. Owner rules learned over time live in
`taste/learning.json` (read them with `npx tsx agent/cli.ts learn brief`); when the
two disagree, the newer owner rule wins.

## Brand
- One premium money-media brand: **how the money actually works**. Calm, precise,
  data-backed, a little wry. Never hype, never fear-mongering, never "guru".
- **Night flat** (living film, owner 2026-10-24): a lit deep-navy night (never near-black,
  25–30% mean brightness, gate 20–35%) with bright solid objects (champagne, sky blue, coral,
  teal); a deep-teal second world for ~30% of shots. Champagne accent from the logo; red/green
  only for losses/gains. Inter / Bebas Neue / JetBrains Mono, subtle grain, soft vignette.
- Our own: colours and characters. Kurzgesagt is the bar for editing, never a look to copy
  (no bird, no copied layouts).
- **Cream is the main world** (owner 2026-10-31: "I like cream background color more"): the warm
  cream world is used a bit more often than navy/teal (≈60/40). Navy/teal for risk, warnings and
  contrast. This overrides the night-flat brightness range above for cream scenes.
- **No zoom-ins or zoom-outs at all** (owner 2026-10-31). Motion comes only from the drawing
  transforming on the spoken words; never fix a gate failure with camera moves.
- **No pile-up** (owner 2026-10-31): on each new idea the old objects/labels leave or transform;
  only what is being said now stays on screen (3–4 objects); labels vanish when their line ends.

## Story
- Every video argues **one thesis** a smart friend would find surprising, and proves
  it with our own calculation, comparison or chart. Facts serve the argument.
- Hook in the first 15 s: a stake, a mystery or a number that does not seem to add up.
  The viewer must want the answer. No greeting, no "in this video".
- Open loops: each chapter ends on a question the next chapter answers.
- Concrete beats abstract: one named example, one person, one number per idea.
- Payoff: answer the hook, state the takeaway in one sentence, one-line outro.
- Spoken English: short sentences, one idea each, words a 15-year-old knows.
  Explain every term the first time it appears.

## Voice
- Azure Andrew HD, plain reading. Stress is rare and natural (contrast, payoff,
  shocking number). No music. SFX quiet under the voice. Final mix −14 LUFS.

## Visuals
- **THE STYLE (owner, binding, repeated 2026-10-25 and 2026-10-31):** Kurzgesagt *Banking
  Explained*-style **continuous transforming illustration**. Each beat is ONE drawing that
  fills the frame and changes on the words: it splits, pours, grows, stacks, burns, collapses,
  multiplies, morphs into the next idea. Spec: `docs/superpowers/specs/2026-10-25-capitalcode-diorama-style-design.md`.
- **BANNED (the failure pattern the owner has rejected twice):**
  - **Stickers:** a separate small object or label popping in for each spoken word, piling up
    in the same frame. A pop-in is fine with limits (owner 2026-10-31): only when relevant, only
    where it fits naturally in the drawing, never covering anything. Density comes mainly from the
    SAME drawing changing.
  - **The always-on presenter:** a host standing on the left of every scene by default. Show him
    where he is relevant and fits naturally (owner 2026-10-31); the rest of the time the
    illustration and the story's characters own the frame.
  - **Covering:** anything that lands on top of another object, a label or a person. New
    things enter from somewhere in the scene (slide in, grow out of, fall into) into free space.
  - **Loose labels:** a label floats on its own. Every label is attached to the part it names.
- **Fixing a gate failure** (density, change-every): make the drawing transform more (split it,
  move it, push the camera into the part being named). Never pass a gate by adding pop-ups.
- **New look = sample first:** a video whose drawings are new code gets ONE scene built and a
  ~30 s clip shown to the owner before the other scenes are drawn.
- **A living animated film:** every line shown as it is said — characters act (walk, take,
  hand over, feel), objects do things, the camera goes to what is named and flies into the
  next shot (zoom-into). The picture changes about every 1–1.5 s (gate: ≤ 1.5 s) through
  transformation of the same drawing. Text (slides, slams, kinetic words) ≤ 25% of runtime.
- Shots held long (median 6–14 s) but never still: the engine adds blinks, breathing,
  talk gestures and camera drift; the plan adds the meaningful events.
- **Everything lands on the word**: a number appears as it is said, a prop as it is
  named, a pose change on the emotional word.
- Slides: small heading top-left with a short accent rule, lots of empty space, one
  idea per slide, numbers in accent colours, source line at the bottom.
- Characters: the approved front-facing HD cast only (mini cast for crowds), consistent
  looks, expressions that change with the line and melt from one into the next.
- Variety: rotate scenes, chart types, framings, times of day and colour moods; a
  video must never look like a template of the last one.

## Thumbnails and titles
- One big emotional subject (~40–50% of frame) + 2–4 huge words that add tension +
  one stake element (big red/green number, crash arrow, fire, cracked object).
- Must read at phone size (~168×94 px). Logo emblem in the same corner every time.
- Titles: curiosity + clarity, ≤ 70 chars; never clickbait the video can't pay off.

## The Critic's bar (score 1–10 each; pass ≥ 8 overall, nothing below 6)
| Check | A 9 looks like |
|---|---|
| hook | You need to know the answer by 0:10 |
| thesis | One clear, non-obvious point, argued end to end |
| accuracy | Every number matches facts.json; no advice, no hype |
| originality | Own structure and examples; could not be a reworded article |
| visuals | Polished, varied, on brand; text crisp and readable |
| sync | Every visual lands on its word; every line is shown |
| life | Characters act and feel, the camera travels to what is named; nothing frozen |
| pacing | No dead air, no shot that overstays, energy varies by section |
| audio | Clear voice, natural read, SFX support not distract |

## Never
- Personal investment advice, price predictions as fact, get-rich hype, unproven
  accusations, third-party logos outside factual news, real people's likeness by
  default, copied source sentences, AI images or stock footage.
