# CapitalCode Agent — Design

Date: 2026-10-23 · Status: draft for owner approval · Owner: Leo-emp

## 1. Intent

CapitalCode is a faceless YouTube channel about finance, investing, crypto,
money, entrepreneurship, AI and tech. The owner wants to **grow it fast** with
**production-grade** videos at **minimum cost**, made by an intelligent agent:
one prompt in Claude Code produces a finished long video, its Shorts, titles,
thumbnails and upload pack, ready for the owner's final review.

The old CapitalCode pipeline (Gemini + GitHub Actions, `src/pipeline/`) never
produced a usable video and is retired. The new system follows the pattern that
works for Luminous Will: **Claude Code is the director and critic, a CLI does the
work**, every step is checkpointed and resumable, and quality gates stop bad
output before the owner sees it.

## 2. Goals, non-goals, anti-goals

**Goals**
- One prompt (`/capitalcode` or `/capitalcode <topic idea>`) → finished video
  pack, no further input until final review.
- Look and pacing in the class of the owner's reference (Alux.com dark style,
  `Downloads/videoplayback (2).mp4`).
- Every animation, number, chart and transition fires **on the word being spoken**.
- Fast growth: outlier-driven topics, strong hook, clickable thumbnails, Shorts
  funnel, learning from analytics.
- Near-zero running cost.

**Non-goals (for now)**
- Automatic YouTube upload (planned long-term; owner uploads manually until the
  YouTube API app is approved).
- Posting to TikTok / Instagram / Facebook (owner posts Shorts manually).
- Background music.
- Burned-in captions on long videos.

**Anti-goals (failure even if it "works")**
- Anything that looks mass-produced or templated (YouTube "inauthentic content"
  policy can remove monetisation). Structure, scenes and thumbnails must vary.
- A character or drawing that "looks weird" (owner rejected the large 3/4-view
  capped character — see §6.2).
- A voice that sounds unnatural or over-directed (owner rejected slowed /
  over-marked readings).
- Invented numbers, personal investment advice, hype ("this coin will 100×"),
  unproven accusations against real people.

## 3. Owner decisions (binding)

| Area | Decision |
|---|---|
| Format | 16:9 long videos, **8–10 min** at launch, growing to 10–12 later |
| Cadence | **3 long videos a week** (Mon/Wed/Fri) + **3–5 Shorts a week** cut from them |
| Style | Dark Alux style: ~50% illustrated scenes, ~50% clean infographic slides, chapter cards ("01 How the price is worked out") |
| Art | **Drawn by Claude in code (SVG/React)** — no AI images, no paid packs. Reusable library |
| Character | Front-facing, round head, glasses, blue jacket with tie, hand-on-chin "thinking" look — the first synced sample (`output/samples/capitalcode_synced_sample.mp4`), now jointed (v5) |
| Scene look | The first sample's brick shop with the night city behind it (detailed, lit, layered) |
| Sync | Animations fire on word timestamps (cue words) |
| Voice | **Azure Speech `en-US-Andrew:DragonHDLatestNeural`**, plain reading (no markup); natural word stress only where a speaker would naturally stress (see §7) |
| Audio | Voice + light sound effects, **no music**, final mix **−14 LUFS**, true peak ≤ −1 dBTP |
| Captions | Long videos: none burned in; upload the exact script as YouTube captions. Shorts: big word-by-word captions |
| Owner role | **Final review only** |
| Topics | Agent chooses across the 6 areas; guardrails in §5 |
| Logo | Owner's metallic champagne "C with rising bars" emblem + serif wordmark (`Downloads/CapitalCode Metallic Finance Emblem.png`), redrawn as animatable vector |
| Accent colour | Logo champagne replaces gold; red/green only for losses/gains |
| Upload | Owner uploads manually for now; agent prepares the pack. Auto-upload later |
| Cost | Voice is the only cost; Azure free tier (500k chars/month) expected to cover it |

## 4. The one-prompt run (pipeline)

Each step writes to `job.json` (step done + outputs) so a run can resume after any
failure. Every CLI command ends with a `RESULT_JSON:` line; refusals exit 1 with a
reason (same contract as Luminous `long_cli.py`).

1. **Topic** — outlier research (§9) + memory of past topics → choose topic,
   angle, working title. Never the same topic area 3 videos in a row; never a
   topic covered in the last 30 videos.
2. **Research & facts** — collect every number from a real source (§8), store
   `facts.json` with value, unit, date, source URL.
3. **Script** — 8–10 min (~1,250–1,500 words at Andrew's pace, measured in
   calibration). Structure: hook (mystery/stakes in the first 15 s, no
   "welcome back"), brand card (~0:20), 3–5 chapters, payoff, one-line outro.
   Each sentence carries **cue tags** for visuals and at most one **stress word**
   where natural. Fact references link to `facts.json` ids.
4. **Script gate (free)** — length window, hook present in the first 2 sentences,
   every number has a fact id, banned-phrase list, guardrails (§5), stress-word
   density (§7), repetition vs recent videos.
5. **Voice** — Azure TTS with word boundaries → `voice.wav` + `words.json`;
   stress gain + loudness (§7). Cache per paragraph (hash of text + voice) so a
   fix re-voices only what changed.
6. **Visual plan** — map every sentence to a shot: illustrated scene (+ character
   pose track + props) or infographic slide (+ build steps), each element bound to
   a cue word. Transitions on sentence/chapter boundaries. Variety rules (no
   scene reused twice in a row; vary chart types).
7. **New art check** — if the plan needs a scene/prop not in the library, the
   agent draws it in the house style, renders a still, self-reviews it against the
   style sheet, and flags it as **new art** in the review notes (owner sees it
   with the final video).
8. **Render** — Remotion, 1920×1080, 30 fps.
9. **Video gates** — sync check (every cue element visible within ±2 frames of
   its word), loudness/peak, reference profile vs the Alux reference (§11),
   frame sheet self-review by Claude (nothing broken, cropped or unreadable).
10. **Packaging** — 3 titles, 3 thumbnails (§10), description (summary, chapters,
    sources, "educational, not financial advice"), tags, caption file (script).
11. **Shorts** — 3–5 vertical 1080×1920 cuts from the strongest moments, each
    re-composed for vertical (not a crop of the 16:9 frame) with burned captions
    and a pointer to the full video.
12. **Hand-off** — upload pack in the output folder (§12) + a short review note
    (what's new, any warnings). Owner reviews, picks thumbnail, uploads.

## 5. Topic mix and formats (owner, 2026-10-23)

| Topic | Share of videos |
|---|---|
| Investing (stocks, ETFs, dividends) | 30% |
| Personal finance (saving, debt, tax, side income) | 25% |
| AI & tech, framed around money | 20% |
| Business & entrepreneurship | 20% |
| Crypto | 5% |

The agent keeps a rolling count over the last 20 videos and picks the topic
area furthest below its share (outlier research then chooses the story inside
that area). Formats: about **70% evergreen** (explainers, lists, step-by-step
guides, comparisons, breakdowns/case studies) and **30% trending** (news
reactions, market moves, new AI tools); news reactions kept to a minimum.

## 5b. Topic guardrails

- No personal investment advice; no "buy/sell X"; no price predictions stated as
  fact. Every description includes "Educational content, not financial advice."
- No get-rich-quick hype.
- Real people and companies: facts with sources only; no accusation of crime
  unless confirmed by a court or regulator.
- Every on-screen number has a source in `facts.json` and the description.

## 6. Visual system

### 6.1 Look
Dark Alux style measured from the reference: very dark frames (mean brightness
≈ 11%), shots held long (median ≈ 12 s) with constant small motion inside each
shot, ~50/50 illustration vs infographic. Our own identity: champagne accent from
the logo, Inter / Bebas Neue / JetBrains Mono, subtle grain, vignette.

### 6.2 Characters
- Base: the owner-approved front-facing hero (round head, glasses, blue jacket,
  champagne tie) with joints — shoulders, elbows, wrists, head (v5 rig,
  `spike/AluxSync.tsx` `Man` / `ManPose`).
- Add: **facial expressions** (neutral, thinking, shocked, worried, smiling,
  smug, angry) — needed for thumbnails; 10–15 poses (idle, think, point, shrug,
  present, type, walk cycle, celebrate, facepalm, arms crossed, hold object).
- 2–3 supporting characters built on the same rig with different looks (buyer,
  investor, worker/owner).
- **Front-facing only.** Side or 3/4 views are out unless the owner approves a
  sample first. (`spike/Rig.tsx` is the **rejected** 3/4-view rig — do not build
  on it; the approved rig is `Man`/`ManPose` in `spike/AluxSync.tsx`.)
- **Full body.** The v5 rig has jointed arms and head with static legs; add hips
  and knees in the same front-facing style so the walk cycle, celebrate and
  sitting poses work. Scenes provide anchor points for standing, sitting and
  behind-counter framing.

### 6.3 Scene library (starter, ~30)
Shop street at night (owner-approved reference scene), office, bank, trading
desk, city skyline, home/living room, factory, warehouse, meeting room, server
room, construction site, courtroom, stock exchange floor, phone screen, laptop
screen, newspaper desk, vault, airport, port/containers, crypto mining room,
startup garage, mansion, supermarket, parliament, map backdrop, plus empty-void
variants for thumbnails. Each scene: layered (back/mid/front) for parallax, with
named anchor points for characters and props, and built-in ambient motion.

### 6.4 Prop library (starter, ~60)
Cash, coins, gold bars, credit card, contract, piggy bank, house, car, chart
board, rising/crashing arrow, fire, smoke, cracks, lock, shield, Bitcoin and
generic crypto coins (no third-party logos unless factual news), AI chip, robot,
server rack, factory chimney, shipping container, magnifier, clock, calendar,
warning sign, etc. Each with an entry animation and an idle motion.

### 6.5 Infographic kit
Big number build (counting), × / → equation build, bar / line / area / stacked
charts (draw-on), flow diagram, timeline, comparison cards, map highlight, quote
card, chapter card, kinetic key-word slam. Matches the reference: small heading
top-left with a short accent rule, generous empty space, numbers in accent
colours.

### 6.6 Motion rules
Springs with slight overshoot; nothing static for more than ~2 s; camera drift
and push-ins; impact moments get flash + small shake + sound; transitions fast
(≤ 8 frames) on sentence/chapter boundaries.

### 6.7 Style bible gate
Phase 1 ends with a single style sheet (characters × expressions × poses, scene
thumbnails, props, infographic samples, thumbnail samples, logo animation). The
owner approves it before the engine is built on top.

## 7. Voice & audio

- Azure `en-US-Andrew:DragonHDLatestNeural`, SSML with **no prosody markup**
  (owner: natural first). Word timings from Azure word-boundary events —
  **measured 2026-10-23: the HD voice returns word boundaries on the F0 tier**
  (all 49 words of the test line). If a run ever returns missing or rough
  timings, fall back to free forced alignment of the same audio; never switch
  the voice without the owner.
- **Natural stress only**: on a contrast word, a payoff word or a shocking
  number; at most ~1 stressed word per 3–4 sentences, never in consecutive
  sentences; many sentences have none. Applied in the mix as +3 dB on the word
  with 30 ms ramps (HD voices follow SSML emphasis inconsistently — measured).
- Loudness: voice and final mix normalised to **−14 LUFS** (gain + limiter,
  measure-and-correct), true peak ≤ −1 dBTP. Measured in the sample: −14.1 LUFS,
  peak −1.2 dB, LRA 3.0.
- Sound effects: whoosh/tick/impact/swish set (code-generated now; may be
  upgraded with free-licence SFX), quiet under the voice.
- Fallback voice: ElevenLabs "Peter - Engaging and Informative"
  (`xjSY1jlib9TWNUuScrNW`) if Azure becomes unavailable.

## 8. Data & facts

Free sources first: FRED, World Bank, US Treasury, SEC EDGAR, Yahoo Finance,
CoinGecko, company filings and reputable news. `facts.json` stores value, unit,
as-of date, source URL and the sentence id that uses it. The script gate refuses a
number without a fact id. Illustrative examples must be labelled as such on screen.

## 9. Growth system

- **Outlier research**: watch list of big channels in the six areas; read recent
  uploads + views (YouTube RSS feeds are free and need no key; YouTube Data API
  when a key exists); flag videos at ≥ 2× their channel median; generate our own
  angle, never a copy.
- **Hook**: mystery/stakes inside the first 15 s.
- **Packaging test**: 3 thumbnails + 3 titles; owner uses YouTube Test & Compare.
- **Shorts funnel**: 3–5 per week.
- **Learning loop** (when analytics access exists): read retention curves and
  thumbnail test results; adjust script/visual/packaging rules in a taste file.
- **Variety** to avoid the mass-produced look.

## 10. Thumbnails

From the study of 65 thumbnails across 13 big channels (2026-10-23):
- One big emotional subject (~40–50% of frame): our character with a clear
  expression, or one stake object.
- 2–4 huge condensed words that **add** tension (question / unfinished thought),
  never repeating the title.
- One stake element when it fits: big number (red/green), fire, crash arrow,
  cracked object.
- High contrast, rim glow, dark base; also test a bright variant.
- Small logo emblem in the same corner every time.
- **Phone-size gate**: each thumbnail is checked shrunk to ~168×94 px; words must
  remain readable and the subject recognisable.
- 3 genuinely different concepts per video. Rendered 1280×720 (and 1920×1080).
- Real people's likeness: avoided by default; only in clearly factual news
  stories.

## 11. Quality gates (summary)

| Gate | Checks |
|---|---|
| Script | length, hook, facts linked, guardrails, stress density, no repeats |
| Voice | every script word aligned; duration in window; −14 LUFS; peak ≤ −1 dBTP |
| Visual plan | every sentence has a shot; cues exist in `words.json`; variety rules |
| New art | still rendered and self-reviewed against the style bible; flagged to owner |
| Render | sync ±2 frames; frame-sheet review; no cropped/overlapping text |
| Reference | shot length, brightness, illustration/infographic ratio within the reference profile band |
| Thumbnails | phone-size readability, 3 distinct concepts |

## 12. Output & hand-off

All output lives in CapitalCode's own folder (owner rule: separate output folder
per agent), named Title + date + time:

```
capitalcode/output/
  long/<Title>_YYYY-MM-DD_HH-MM/
    <Title>_YYYY-MM-DD_HH-MM_long.mp4
    thumb_1.jpg thumb_2.jpg thumb_3.jpg
    titles.txt description.txt captions.srt sources.txt review_note.md
  shorts/<Title>_YYYY-MM-DD_HH-MM/
    short_1.mp4 … short_5.mp4 + captions_for_posting.txt
  samples/   (design samples)
```

Jobs (working files) live in `capitalcode/temp/jobs/<YYYYMMDD-HHMM>_<slug>/`.

## 13. Cost

| Item | Cost |
|---|---|
| Azure TTS (≈ 9k chars × 13 videos ≈ 120k chars/month) | $0 within the 500k free tier (HD inclusion to be confirmed on the Metrics page; if billed, roughly a few $/month — confirm in the Azure calculator) |
| Footage, art, rendering, data | $0 |
| Claude Code | owner's existing subscription |

## 14. Architecture

- Lives in the `capitalcode` repo, **TypeScript** (Remotion is TypeScript): an
  agent CLI (e.g. `cc_cli.ts` run with `tsx`) + `agent/` modules + `remotion/`
  library (characters, scenes, props, infographics, thumbnails) + a Claude Code
  skill `/capitalcode` and a taste file.
- Claude Code writes the script, visual plan and self-reviews; the CLI does
  deterministic work (data fetch, TTS, alignment, gates, rendering, packaging).
- Secrets in `capitalcode/.env.local` (git-ignored): `AZURE_SPEECH_KEY`,
  `AZURE_SPEECH_REGION`; never printed or committed.
- `capitalcode` is a git repo (work branch `feat/capitalcode-agent`). The old
  Gemini/GitHub Actions pipeline is retired but **not deleted**: the existing
  Next.js dashboard, Drizzle DB, uploaders and Vercel config stay untouched and
  the new agent is built beside them (`agent/` + new Remotion library). Removing
  the old app is a later decision for the owner. Useful parts (data-source list,
  `src/remotion` design tokens/transitions) may be reused.

## 15. Build order

1. **Phase 1 — Art foundation / style bible**: logo vector + animation; hero with
   expressions and poses; 2–3 supporting characters; ~30 scenes; ~60 props;
   infographic kit; thumbnail kit. Owner approves the style sheet.
2. **Phase 2 — Engine**: jobs/resume, topic research, facts, script gate, Azure
   voice + stress + loudness, visual planner, renderer, gates, packaging, Shorts.
3. **Phase 3 — Calibration**: 2–3 full unposted videos; tune pace, density,
   gates; measure real render time.
4. **Launch**: Mon/Wed/Fri + Shorts, with a buffer of ready videos.
5. **Later**: YouTube auto-upload + scheduling, analytics learning loop.

## 16. Left to the builder

Exact file layout, CLI command names, the cue-tag syntax, data-source client
details, SFX choices, the scene/prop list beyond the starter set, and render
settings — within the rules above.

## 17. Calls made by Claude (owner may override)

- TypeScript CLI inside the `capitalcode` repo (because Remotion is TypeScript).
- Old pipeline retired rather than adapted.
- Script length ~1,250–1,500 words for 8–10 min (to be confirmed by measuring
  Andrew's pace in calibration).
- Sync tolerance ±2 frames; transition length ≤ 8 frames.
- Outlier threshold ≥ 2× channel median; YouTube RSS as the default free source.
- Real people's likeness avoided by default in thumbnails/illustrations.
- New art is drawn by the agent mid-run and flagged in the review note rather
  than stopping the run (owner chose final review only).
- Full-body rig (add hips/knees to the approved front-facing character).
- Forced alignment as the timing fallback for the HD voice.
- Old Next.js app kept untouched; new agent built beside it.
