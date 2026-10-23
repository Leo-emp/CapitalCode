#!/usr/bin/env bash
# ============================================================
# CODE-GENERATED SOUND EFFECTS for CapitalCode (free, no licences).
# Every effect ends in a limiter at 0.85 (≈ -1.4 dBFS) so nothing
# clips under the voice. Output: public/sfx/cc/<name>.wav
# Usage: bash scripts/make-sfx.sh
# ============================================================
set -euo pipefail
OUT="$(dirname "$0")/../public/sfx/cc"
mkdir -p "$OUT"
LIM="alimiter=limit=0.85:level=false"
ff() { ffmpeg -v error -y "$@"; }

# Whoosh: pink noise swelling in and out (scene transitions)
ff -f lavfi -i "anoisesrc=d=0.7:c=pink:a=0.6" -af "highpass=f=300,lowpass=f=5000,afade=t=in:d=0.45:curve=exp,afade=t=out:st=0.45:d=0.25,volume=1.4,$LIM" "$OUT/whoosh.wav"
# Swish: short bright air (elements popping in)
ff -f lavfi -i "anoisesrc=d=0.18:c=white:a=0.5" -af "bandpass=f=2500:w=1500,afade=t=out:d=0.18:curve=exp,$LIM" "$OUT/swish.wav"
# Tick: tiny click (counters, chart points)
ff -f lavfi -i "sine=f=1800:d=0.035" -af "afade=t=out:d=0.035,volume=0.5,$LIM" "$OUT/tick.wav"
# Pop: falling blip (props appearing)
ff -f lavfi -i "aevalsrc='0.7*sin(2*PI*(900-5000*t)*t)*exp(-t*40)':d=0.12" -af "lowpass=f=3000,$LIM" "$OUT/pop.wav"
# Impact: low boom + crunch (key number lands)
ff -f lavfi -i "sine=f=55:d=1.2" -f lavfi -i "anoisesrc=d=0.25:c=brown:a=0.9" -filter_complex "[0]afade=t=out:d=1.2:curve=exp,volume=2.2[a];[1]lowpass=f=900,afade=t=out:d=0.25[b];[a][b]amix=inputs=2:normalize=0,$LIM" "$OUT/impact.wav"
# Riser: rising tone + noise building tension (before a reveal)
ff -f lavfi -i "aevalsrc='0.35*sin(2*PI*(180+520*t*t)*t)':d=1.6" -f lavfi -i "anoisesrc=d=1.6:c=white:a=0.25" -filter_complex "[0]afade=t=in:d=1.4:curve=exp[a];[1]highpass=f=2000,afade=t=in:d=1.5:curve=exp[b];[a][b]amix=inputs=2:normalize=0,afade=t=out:st=1.5:d=0.1,$LIM" "$OUT/riser.wav"
# Cash: two bright bell tones (money moments)
ff -f lavfi -i "aevalsrc='0.45*sin(2*PI*2093*t)*exp(-t*9)+0.45*gt(t,0.09)*sin(2*PI*2637*(t-0.09))*exp(-(t-0.09)*7)':d=0.7" -af "$LIM" "$OUT/cash.wav"
# Glitch: gated noise bursts, crushed (tech / crash moments)
ff -f lavfi -i "anoisesrc=d=0.3:c=white:a=0.6" -af "volume='if(lt(mod(t*37\,1)\,0.45)\,1\,0)':eval=frame,acrusher=bits=6:mode=log:aa=1,bandpass=f=1800:w=2400,$LIM" "$OUT/glitch.wav"
# Thud: short low knock (things landing, stamps)
ff -f lavfi -i "aevalsrc='0.9*sin(2*PI*80*t)*exp(-t*18)':d=0.35" -af "lowpass=f=400,$LIM" "$OUT/thud.wav"
# Ding: clean bell (a good outcome, a tick appears)
ff -f lavfi -i "aevalsrc='0.5*sin(2*PI*1318*t)*exp(-t*4)+0.18*sin(2*PI*2637*t)*exp(-t*6)':d=1.2" -af "$LIM" "$OUT/ding.wav"

echo "SFX written to $OUT"
