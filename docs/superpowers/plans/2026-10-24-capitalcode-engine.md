# CapitalCode Engine (Phase 2) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** One prompt (`/capitalcode`) turns into a finished, production-grade 8–10 min video pack (plus Shorts), via a bulletproof, resumable pipeline; then a standalone Short pipeline.

**Architecture:** Claude Code is the director (Topic Scout, Researcher, Scriptwriter, Visual Director, Publisher) and writes JSON artefacts into a job folder; a TypeScript CLI (`agent/cli.ts`, run with `tsx`) validates every artefact (gates), voices with Azure, renders with Remotion in resumable chunks, mixes audio, runs QA and packages. The Critic is a separate fresh-context subagent. Every command ends with `RESULT_JSON: {...}`; refusals print `[REFUSED] reason` and exit 1.

**Tech Stack:** TypeScript (strict), tsx, vitest, Remotion 4.0.506 + the art library (`art/`), Azure Speech SDK for JS (`microsoft-cognitiveservices-speech-sdk`), ffmpeg/ffprobe.

**Spec:** `docs/superpowers/specs/2026-10-23-capitalcode-agent-design.md` (§4 pipeline, §5 topics/formats/monetisation/roles, §7 voice, §8 facts, §10 thumbnails, §11 gates, §11b reliability, §12 output).

## Global Constraints

- Voice: Azure `en-US-Andrew:DragonHDLatestNeural`, plain SSML (no prosody), word boundaries; stress +3 dB on ≤ 1 word per 3–4 sentences, never consecutive; final mix −14 LUFS, true peak ≤ −1 dBTP; no music; SFX quiet under the voice.
- Characters only through `art/rig/Actor.tsx`; scenes/props/poses/looks only through `getScene/getProp/getPose/getLook`.
- Long video 8–10 min, 1920×1080 @30 fps; Shorts 1080×1920, 30–60 s, big word-by-word captions.
- Output: `capitalcode/output/long/<Title>_YYYY-MM-DD_HH-MM/`, `capitalcode/output/shorts/<Title>_YYYY-MM-DD_HH-MM/`; jobs in `capitalcode/temp/jobs/<YYYYMMDD-HHMM>_<slug>/`.
- Secrets only from `.env.local` (`AZURE_SPEECH_KEY`, `AZURE_SPEECH_REGION`); never printed.
- Bulletproof: pre-flight before long steps; paid/slow steps cached by content hash; render in chunks, resume from the last good chunk; no step silently skipped.
- Commits as Leo-emp with the Co-Authored-By line; `// #` comment style.

## Review Focus

1. **Cue drift** — plan cues that name words not in `words.json` (numbers spoken as words, punctuation) must be refused at gate-plan with the nearest words, never rendered at frame 0.
2. **Chunk seams** — concatenated chunks must have no duplicated/missing frames and no audio seam (audio is mixed once, separately, over the joined video).
3. **Resume after crash** — re-running `render` after an interruption reuses finished chunks (hash match) and re-renders only missing/invalid ones.
4. **Copy/plagiarism** — scripts reusing long word sequences from source excerpts must be refused (n-gram overlap gate).
5. **Loudness** — final mix within −14 ± 1 LUFS, peak ≤ −1 dBTP, stress gain never pushes peaks over.

---

### Task 1: Jobs, paths, CLI skeleton
**Files:** `agent/paths.ts`, `agent/jobs.ts`, `agent/cli.ts`, `agent/result.ts`; tests `tests/agent/jobs.test.ts`, `tests/agent/cli.test.ts`.
**Produces:** `newJob(topic) → dir`, `loadJob(dir)`, `markStep(dir, step, data)`, `isDone`, `nextStep`, `latestJob()`; `result(obj)` prints `RESULT_JSON:`; `refuse(msg)` exits 1. Steps: `topic, research, facts, script, gate_script, voice, plan, gate_plan, render, gate_video, critic, package, shorts`.
- [ ] Tests first (job dir naming `YYYYMMDD-HHMM_slug`, step order, resume picks first undone step, RESULT_JSON last line) → RED → implement → GREEN → commit.

### Task 2: Artefact schemas + script gate
**Files:** `agent/schema.ts` (hand-written validators: `ScriptDoc`, `FactsDoc`, `PlanDoc`, `MetaDoc`), `agent/gates/script.ts`; tests.
**Script doc:** `{ title, area, format, thesis, chapters: [{ title, sentences: [{ id, text, stress?, facts?: string[] }] }] }`. Gate checks: words in 1,150–1,700 (8–10 min at ~150 wpm, recalibrated after first voice); hook = first two sentences contain a question/stake/number; every digit-bearing sentence lists fact ids that exist; banned phrases ("in this video", "welcome back", "smash that like"…); guardrails (no "you should buy", "guaranteed", price predictions); stress density rule; n-gram (8-word) overlap with `sources/*.txt` ≤ 2%; thesis present; area ∈ topic split; format ∈ six formats.
- [ ] Tests (each rule passes/fails on fixtures) → RED → implement → GREEN → commit.

### Task 3: Voice (Azure) + timings + stress + loudness
**Files:** `agent/voice.ts`, `agent/audio.ts`; tests.
**Produces:** `voiceJob(dir)`: per-chapter SSML synthesis (cache `voice/ch_<hash>.wav` + words), concat with 0.6 s gaps between chapters, global `words.json` with sentence ids, stress gain via ffmpeg `volume` enable windows, loudness to −14 LUFS (measure→gain→limiter, re-measure), `voice.wav`. Synth function injectable for tests.
- [ ] Tests (word offsets across chapters, sentence-id mapping, cache hit skips synth, stress windows, loudness loop with ffmpeg on a generated tone) → RED → implement → GREEN → commit.

### Task 4: Visual plan + plan gate + timeline
**Files:** `agent/gates/plan.ts`, `agent/timeline.ts`; tests.
**Plan doc:** `{ shots: [{ id, start: {sentence, word?, nth?}, kind: 'scene'|'slide'|'chapter'|'brand'|'slam', ... }] }` — scene shots: `scene, time, tone, framing, actors: [{who, anchor, track: [{word|sentence, pose, expression?}]}], props: [{id, anchor, cue}]`; slides: `{ slide: 'equation'|'number'|'bars'|'line'|'flow'|'timeline'|'compare'|'map'|'quote'|'stacked', heading, data, cues }`; `sfx: [{ cue, name }]`.
Gate: every cue resolves (cueFrame) else refuse with nearest words; all ids resolve; shots cover the whole voice; no same scene twice in a row; slide share 35–65%; shot length median 6–14 s (reference pace); variety vs last 10 jobs (scenes + chart types).
**Timeline:** pure `buildTimeline(plan, words) → [{ shot, from, to }]` with frames; SFX list in seconds.
- [ ] Tests → RED → implement → GREEN → commit.

### Task 5: Episode composition
**Files:** `art/episode/Episode.tsx` (+ registration), shot renderers using scenes/Actor/props/infographics/KeywordSlam/ChapterCard/LogoReveal, transitions (8-frame zoom-through/whoosh), GrainOverlay. Input props = timeline + words + plan.
- [ ] Render stills of 6 representative shots from a fixture plan; review by eye; commit.

### Task 6: Chunked resumable render + audio mix + mux
**Files:** `agent/render.ts`; tests.
Chunks of ≤ 900 frames aligned to shot boundaries; each chunk rendered muted (`--frames=a-b`), validated (ffprobe frame count), cached by hash(chunk timeline + art version); concat (stream copy) → `video.mp4`; audio = voice + SFX (adelay/amix) → −14 LUFS → mux → `final.mp4`. Pre-flight: render 1 still per shot first.
- [ ] Tests (chunk splitting, hash reuse after simulated crash, concat list, frame-count validation) → RED → implement → GREEN; integration render of a 20-s fixture → commit.

### Task 7: Video QA gate + critic pack
**Files:** `agent/gates/video.ts`; tests.
Checks: duration = voice ± 0.5 s; −14 ± 1 LUFS; peak ≤ −1 dBTP; flicker scan (per-frame luma diff spikes away from shot boundaries → flag); frame sheets every 10 s → `qa/sheet_NN.jpg` for the Critic.
- [ ] Tests → commit.

### Task 8: Packaging
**Files:** `agent/package.ts`; tests. `metadata.json` (Claude: 3 titles, description, tags, 3 thumbnail specs) → render 3 thumbnails (Thumb composition) → captions.srt from words → sources.txt from facts → review_note.md → copy final → `output/long/<Title>_date_time/`.
- [ ] Tests → commit.

### Task 9: Research helpers
**Files:** `agent/research.ts`; tests. Topic-mix quota from history (investing 30, personal finance 25, AI&tech 20, business 20, crypto 5); outlier scan of watch-list channels via YouTube RSS (views ≥ 2× channel median) → `research/outliers.json`.
- [ ] Tests (quota math, outlier math on fixture XML) → commit.

### Task 10: Skill + taste file
**Files:** `.claude/skills/capitalcode/SKILL.md`, `taste/capitalcode.md`: the director workflow, roles, rubric for the Critic, guardrails, monetisation rules.

### Task 11: First long video (production run, ~8 min)
Run the whole pipeline end to end; fix anything that breaks at its root (with tests); critic pass; deliver pack.

### Task 12: Shorts system + first Short
**Files:** `art/episode/Short.tsx` (1080×1920, big word-by-word captions, hook in first second, reframed shots), `agent/shorts.ts` (cut-downs from a long job + standalone 30–60 s short jobs), tests; then generate one Short.
