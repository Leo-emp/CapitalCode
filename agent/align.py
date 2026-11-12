# ============================================================
# ALIGN — listen to the finished voiceover and report when each
# word is REALLY spoken (faster-whisper, word timestamps).
# Azure's own word events drift up to ~1 s early in fast lists of
# names, so the pictures would show a name before it is said.
# Usage: python agent/align.py <voice.wav>
# Prints one JSON array: [{"w": "Pfizer", "s": 23.82, "e": 24.29}, ...]
# ============================================================
import json
import subprocess
import sys

import numpy as np

from faster_whisper import WhisperModel

wav = sys.argv[1]
# # no script prompt: with one, the model can "hear" script lines that were not spoken yet (measured: it
# # invented the first 30 s of a Short). Plain listening + our sequence alignment is safer.

# # small English model on the CPU, int8 so it stays light on memory (~0.5 GB)
model = WhisperModel("small.en", device="cpu", compute_type="int8")
# # decode with ffmpeg (16 kHz mono float) — faster-whisper's own PyAV reader breaks on this Python
pcm = subprocess.run(["ffmpeg", "-v", "error", "-i", wav, "-f", "f32le", "-ac", "1", "-ar", "16000", "-"], capture_output=True, check=True).stdout
audio = np.frombuffer(pcm, dtype=np.float32)
segments, _ = model.transcribe(audio, word_timestamps=True, beam_size=5, vad_filter=False, condition_on_previous_text=False)

out = []
for seg in segments:
    for w in seg.words or []:
        out.append({"w": w.word.strip(), "s": round(w.start, 3), "e": round(w.end, 3)})
print(json.dumps(out))
