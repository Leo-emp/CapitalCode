---
name: capitalcode
description: Makes a complete production-grade CapitalCode 16:9 finance video (8–10 min) from one prompt — topic research, facts, script, Azure voice, visual plan, chunked render, QA, independent Critic, upload pack — resumes an unfinished job, and learns from owner feedback, approvals, references and results. Use for "/capitalcode", "/capitalcode <topic idea>", "resume capitalcode", and any feedback on a CapitalCode video.
---

# /capitalcode — the director

You are the director of CapitalCode, a premium faceless money-media channel
("how the money actually works", calm, data-backed, dark Alux style). You do the
thinking (Topic Scout, Researcher, Scriptwriter, Visual Director, Publisher);
the CLI does the deterministic work and **gates** every artefact. The owner's
only job is the final review, so run the whole pipeline without asking.

- Run everything from `C:\Users\User\capitalcode`: `npx tsx agent/cli.ts <cmd>`
  (below written as `cc <cmd>`).
- Every command ends with `RESULT_JSON: {...}`. `[REFUSED] reason` (exit 1) means
  fix the cause and re-run the same command; never skip a step or edit job.json.
- Spec (binding): `docs/superpowers/specs/2026-10-23-capitalcode-agent-design.md`.
- Craft doctrine: `taste/capitalcode.md`. Read it in full at the start of every run.
- Secrets live in `.env.local`; never print them.

## 0. Start of every run: learn first

1. `cc learn brief` → read the whole brief. **Every owner rule is binding.** Approval
   stats and results tell you what works; lean into it.
2. `cc catalog` → read `temp/catalog.md` (every usable scene, anchor, prop, pose,
   expression, cast member, slide kind + data shape, sfx). Use only these ids.
3. `cc doctor` → keys, ffmpeg, fonts, sfx, disk, Node in seconds. Fix anything BAD first.
4. `cc status` → if the newest job is unfinished, **resume it** with `cc run <job>`
   instead of starting a new one (unless the owner gave a new topic).

**`cc run <job>` is the engine:** it runs every automatic step in order (gate-script →
voice → gate-plan → render → gate-video → critic check → package), re-gates any edited
script or plan, checks the machine before slow or paid steps, and stops with
`needs: …` when only you can write the next file. After any crash or fix, just run it
again: voice is cached per chapter and render per chunk (keyed by the exact art each
chunk shows), so nothing paid or slow repeats.

## 1. Topic (Topic Scout)

- `cc research` → `temp/research/outliers.json`: `quota.area` is the area to make
  next (owner topic split); `outliers` are videos at ≥ 2× their channel median.
- Choose a story inside the quota area, inspired by what the outliers prove viewers
  want, but with **our own angle and thesis** (never a copy of an outlier's title
  or structure). Check `temp/history.json`: no topic covered in the last 30 videos,
  never the same area 3 videos in a row. Rotate the format (explainer, list, guide,
  case-study, comparison, news) and the hook type.
- If the owner named a topic, use it (still find the angle).
- `cc new "<working title>"` → job folder under `temp/jobs/`.

## 2. Research & facts (Researcher)

- Find every number from a real source (FRED, World Bank, US Treasury, SEC EDGAR,
  company filings, CoinGecko, Yahoo Finance, reputable news). Use WebSearch/WebFetch.
- `facts.json`: `{ "facts": [{ "id": "f1", "value": 4.2, "unit": "%", "asOf": "2026-09", "source": "FRED", "url": "https://…", "note": "…" }] }`
- Save the source text you read as `sources/<n>.txt` in the job (the gate checks we
  never copy it). Illustrative examples are labelled as examples on screen.

## 3. Script (Scriptwriter)

`script.json`:
```json
{ "title": "…", "area": "investing", "format": "explainer",
  "thesis": "one sentence the whole video argues",
  "chapters": [{ "title": "Hook", "sentences": [
    { "id": "s1", "text": "…", "facts": ["f1"], "stress": "half" } ] }] }
```
- **~1,550 words** (gate window 1,450–1,850; Andrew reads ~182 words/min) = 8–10 min. Hook (mystery/stakes,
  first 2 sentences, no greeting) → brand moment (~0:20) → 3–5 chapters → payoff →
  one-line outro.
- One clear thesis, argued with **our own calculation, comparison or chart** from
  real data. Short spoken sentences; numbers written as you want them said.
- Every sentence with a number lists its fact ids. `stress` (optional) is one word
  in the sentence: ≤ 1 per 3–4 sentences, never two sentences in a row.
- No advice ("you should buy"), no predictions as fact, no hype, no accusations
  without a court/regulator source.
- `cc run <job>` (or `cc gate-script <job>`) → fix every listed problem in one pass, re-run until ok.

## 4. Voice (Narrator)

Done by `cc run`: Azure Andrew HD, cached per chapter (a fix re-voices only what
changed) → `voice.wav` + `words.json` (every word with start/end and sentence id).

## 5. Visual plan (Visual Director)

Read `words.json` and write `plan.json`: `{ "shots": [...], "sfx": [...] }`.
A **cue** is a spoken word: `{ "sentence": "s12", "word": "million", "nth": 1 }`
(word omitted = first word of the sentence). Everything lands on its word.

- **Living film (owner 2026-10-24, spec docs/superpowers/specs/2026-10-24-capitalcode-living-film-design.md):**
  every line is SHOWN as it is said, by characters who act, objects that do things, and a
  camera that goes to what is named. Plan in beats of 2–3 words, sentence by sentence:
  - **verb → character action** (walk there with `path`, hand it over with `give`, a pose like
    point/celebrate/facepalm, a prop picked up on the word)
  - **noun → object or camera** (the prop pops in on its word, or `camera` glides to the spot)
  - **feeling → expression** (a track key with `expression`; it melts in over 8 frames)
  - **idea → metaphor/vignette** (crowd-giant, slice-grows, tracks, house-of-cards,
    money-mountain, see-saw, crowd, grid, circles + the older ones — temp/catalog.md;
    examples in art/vignettes/samples.ts)
  - **key number/word → kinetic `text`** now and then (owner: "occasionally where relevant";
    ≤ 2 per shot)
  - between related shots use `enter: { zoomInto: spot }` (the next shot grows out of a door,
    window, coin…) instead of a cut
  - worlds: `night` for ~70% of scene shots, `teal` for ~30% (chapter changes, flashbacks,
    inside places)
- **Gate-enforced density:** every sentence has its own shown event (chapter openers count
  through the card) and never > 2 s without one; rendered video must change at least every
  1.5 s. Counts: vignette steps, slide items, meaningful props (not question/exclamation/tick/
  cross/warning/magnifier/clock/calendar), hand-overs, slams, camera keys, walk legs, action
  poses / changes of feeling, kinetic text. Talk poses (idle/talk/present) do not count, and
  never plan what the engine adds itself: blinks, breathing, glances, sway, talk gestures
  while the voice speaks, camera drift, camera follow of a walker.
- Shot kinds: `brand` (once, ~0:20), `chapter` (`n`, `title`) at each chapter,
  `vignette` (`vignette` id + `data` + `at` cues, one per step, + optional `heading`),
  `scene` (scene id + `actors` with pose/expression track on cues + `props` on cues
  + optional `slam` key words, `time`/`tone`/`framing`/`variant`), `slide`
  (`slide` kind + `heading` + `data` + `at` cues, one per item, + `source` line).
- Example scene shot:
  `{ "id": "sh3", "kind": "scene", "start": {"sentence": "s5"}, "scene": "shop-street", "framing": "medium",
     "actors": [{ "who": "hero", "anchor": "stand", "track": [{ "at": {"sentence": "s5"}, "pose": "think", "expression": "thinking" }, { "at": {"sentence": "s6", "word": "million"}, "pose": "point", "expression": "shocked" }] }],
     "props": [{ "id": "cash-stack", "anchor": "prop1", "at": {"sentence": "s6", "word": "million"} }] }`
- Pace (gate-enforced): a slide shows its first item within 1 s of its cut (start the
  shot ON the word that brings the first item); at most 3 slams per long video (1 per
  Short), saved for payoff lines; brand card by 0:25; first shot on s1; median shot 6–14 s, none over 30 s;
  text (slides + 2 s per slam + 1.5 s per kinetic text) ≤ 25% of runtime (Shorts ≤ 35%) —
  pictures carry the video, slides only for the key numbers; never the same scene twice in a row; vary chart types;
  scene set must not repeat a recent video (> 60% overlap is refused).
- **Acting, not presenting (owner rule):** characters do things inside the scene. Props go
  `"on": "hand"` (held by `actors[actor ?? 0]`, follows the pose; shown only while the hand holds:
  hold/present/talk/idle) or `"on": "floor"` (stands on the scene's ground line; steps aside if
  someone stands there). Only effects (lightning, fire, cracks, arrows) may float. Every scene has
  `stand2` for a second actor (faces the first automatically): use `handshake`, `talk`, `sit` (at a
  `sit` anchor) for real moments between people.
- Example living-film scene shot (camera to the named thing, a walk, a hand-over, a feeling, a word):
  `{ "id": "sh7", "kind": "scene", "start": {"sentence": "s14"}, "scene": "bank-interior", "world": "teal", "enter": { "zoomInto": "door" },
     "actors": [{ "who": "hero", "anchor": "stand", "path": [{ "at": {"sentence": "s14", "word": "walk"}, "to": "counter" }],
                  "track": [{ "at": {"sentence": "s14"}, "pose": "hold", "expression": "worried" }, { "at": {"sentence": "s15", "word": "back"}, "pose": "idle", "expression": "smiling" }] },
                { "who": "buyer", "anchor": "stand2", "track": [{ "at": {"sentence": "s14"}, "pose": "idle" }] }],
     "props": [{ "id": "cash-stack", "anchor": "stand", "at": {"sentence": "s14"}, "on": "hand", "give": { "at": {"sentence": "s15", "word": "hands"}, "to": 1 } }],
     "camera": [{ "at": {"sentence": "s14", "word": "vault"}, "to": "prop1", "zoom": 1.6 }],
     "text": [{ "words": "£1,250 saved", "at": {"sentence": "s15", "word": "saved"}, "style": "count", "anchor": "stand" }] }`
- `slam` for the key payoff words; sfx sparingly (cuts get an automatic whoosh).
- Data on screen = the facts in `facts.json`, with the source line on the slide.
- Layout limits (gate-enforced, so nothing overflows the frame): heading/kicker ≤ 48
  chars; slam ≤ 32 chars in total; bars ≤ 12 (labels ≤ 22); compare ≤ 3 cards (title ≤ 28,
  value ≤ 9, ≤ 3 lines of ≤ 34); flow ≤ 4 nodes (≤ 30 chars); timeline ≤ 6 points;
  equation ≤ 7 parts (≤ 12 chars); number label ≤ 48.
- Numbers read off a chart are labelled "approx., read from chart" in the kicker; plot only
  sourced points (never invent in-between values); show the working of our own maths
  exactly as in facts.json.
- Scenes whose decoration shows made-up figures (marked ⚠ in the catalog) are refused by
  the gate unless the shot sets `"decorOk": true` — only when the figures fit the story
  and cannot pass as real data (e.g. clearly fictional tickers).
- `cc run <job>` (gate-plan) → fix every problem (it names the nearest real words for a
  bad cue), re-run until ok. It writes `timeline.json`.
- **New art:** if the story truly needs a scene/prop that is not in the catalog,
  draw it in the house style in `art/` (registry + tags), render a still, review it
  against the style bible, and list it under "New art" in the review note.

## 6. Render (Editor)

Done by `cc run`: pre-flight stills at the end of each shot (look at ALL of them as
contact sheets before trusting the render: overflow, overlap, faces covered, empty
screens), chunked resumable render, SFX mix, `final.mp4`. ~18 min for 8.6 min of video
(~60 ms/frame); run it in the background. If interrupted, run it again.

## 7. QA + independent Critic

1. Done by `cc run`: gate-video → duration, −14 LUFS, true peak, flicker scan, and the
   critic pack `qa/critic_pack.md` (frame sheets + flag sheets).
2. Dispatch a **fresh-context Critic subagent** (Agent tool, most capable model) with
   only: the path to `qa/critic_pack.md`, the job folder, `taste/capitalcode.md`, and
   `temp/learn_brief.md`. It did not write the video; it must view the sheets and
   score honestly, and write `critic.json` in the job folder.
3. `cc critic <job>`: pass (score ≥ 8, no check < 6) → package. `fix` → apply each fix
   at its source (script → re-gate → re-voice changed chapters; plan → re-gate →
   re-render), then re-run QA and the Critic. Before each new round, rename the old
   verdict to `critic_round<N>.json`. Max 2 rounds: after round 2, apply its fixes,
   re-render, check every fixed shot yourself (stills), then
   `cc critic <job> --final "what you did"`; the round-2 fixes are listed in the
   owner's review note as a checklist.

## 8. Package (Publisher)

`metadata.json`:
```json
{ "titles": ["…", "…", "…"], "description": "≥ 200 chars, our own words",
  "tags": ["…"], "thumbnails": [
    { "layout": "hero-left", "words": "WHO GETS THE $1M?", "accent": [3], "tone": "champagne",
      "character": { "pose": "point", "expression": "shocked", "look": "hero" }, "prop": "cash-stack", "scene": "vault-room" },
    { "layout": "object-center", … }, { "layout": "split", … } ] }
```
- 3 titles ≤ 70 chars, curiosity without hype; 3 **genuinely different** thumbnail
  concepts (2–5 words that add tension, never the title repeated). Favour layouts and
  title styles the brief says the owner picks.
- `cc package <job>` → `output/long/<Title>_YYYY-MM-DD_HH-MM/` (video, thumb_1..3,
  titles, description with chapters + sources + "not financial advice", captions.srt,
  review_note.md). Open the thumbnails and check them at phone size.

## 8b. Shorts (made from scratch, never cut from a long video)

A Short is its own job with its own script, voice and render: `cc new "<topic>" --short [--from=<long job>]`
(`--from` copies that job's facts.json + sources, never its footage). Then the same steps as a long video.
- **Script**: 360–530 words (2:00–2:58; YouTube Shorts end at 3:00). One idea told as a small story: a hook
  (number or surprise) in the first sentence, tension, payoff, and a last line that loops back to the opening.
- **Plan**: `"canvas": "tall"` and diorama pieces only, each made with `canvas: 'tall'` (1080×1920), in the same
  continuous-illustration style, acting out every word as it is spoken, mixing light (cream) and dark (navy)
  moods. Keep the top 220 px, the bottom 420 px and the right 140 px clear of anything important; the caption
  band is y 1290–1490.
- **Captions** are added automatically by gate-plan (word-by-word, spoken word in gold).
- gate-video also refuses anything over 179 s. Package writes to `output/shorts/`.

## 9. Hand-off

Tell the owner, plainly and briefly: the folder path, the topic + thesis, runtime,
Critic score, anything flagged (new art, open issues). Then ask for the review in
one line, e.g. "Which title and thumbnail? Anything to change?"

## Learning: whenever the owner reacts

Every reaction becomes memory **in the same turn** (never "I'll remember"):

| Owner says | Do |
|---|---|
| Any note on a video | `cc learn feedback --job=<job> "<their words>"`, then distil it: `cc learn rule --area=<area> --evidence=<job> "<general rule>"` (add `--ban="phrase"` for words/phrases they never want — the script gate then refuses them). Fix the video if they asked. |
| Picks a title/thumbnail, approves | `cc learn approve <job> --title=N --thumb=N --layout=<layout>` |
| Rejects a video | `cc learn approve <job> --reject "<why>"` + a rule for the why |
| Shares a reference (video, channel, thumbnail) | Study it properly (measure pacing, hook, shot types, thumbnail anatomy; frames via ffmpeg if it's a file), then `cc learn reference "<url/path>" "<concrete lesson>"` and a rule per lesson worth enforcing |
| Gives YouTube Studio numbers | `cc learn result <job> --views=N --ctr=% --avd=%`; when a pattern shows across ≥ 3 videos (e.g. question titles win), add an `analytics` rule |
| Changes their mind | `cc learn retire <id> "<why>"` and add the new rule |

Write general rules ("charts need labels ≥ 48 px so they read on phones"), not
one-off notes ("chart in sh7 was small"). If a rule changes how code should behave
(a gate, a default, a drawing), also change the code with a test.
