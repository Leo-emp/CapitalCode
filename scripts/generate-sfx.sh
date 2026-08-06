#!/bin/bash
# # Generate synthetic SFX using ffmpeg — placeholder audio for each sound type
# # Run this once after installing ffmpeg: bash scripts/generate-sfx.sh

SFX_DIR="public/sfx"
mkdir -p "$SFX_DIR"

echo "Generating SFX placeholders..."

# # Whoosh — rising pink noise sweep (0.5s)
ffmpeg -f lavfi -i "anoisesrc=d=0.5:c=pink:a=0.3" \
  -af "afade=t=in:d=0.1,afade=t=out:st=0.3:d=0.2,highpass=f=2000,lowpass=f=8000" \
  -y "$SFX_DIR/whoosh.mp3" 2>/dev/null

# # Subtle whoosh — softer version (0.3s)
ffmpeg -f lavfi -i "anoisesrc=d=0.3:c=pink:a=0.15" \
  -af "afade=t=in:d=0.05,afade=t=out:st=0.15:d=0.15,highpass=f=3000" \
  -y "$SFX_DIR/subtle_whoosh.mp3" 2>/dev/null

# # Impact — low thump (0.3s)
ffmpeg -f lavfi -i "sine=frequency=80:duration=0.3" \
  -af "afade=t=out:st=0.05:d=0.25,volume=0.6" \
  -y "$SFX_DIR/impact.mp3" 2>/dev/null

# # Riser — ascending tone (1.5s)
ffmpeg -f lavfi -i "sine=frequency=200:duration=1.5" \
  -af "vibrato=f=5:d=0.5,afade=t=in:d=0.3,afade=t=out:st=1.2:d=0.3" \
  -y "$SFX_DIR/riser.mp3" 2>/dev/null

# # Tick — short click (0.1s)
ffmpeg -f lavfi -i "sine=frequency=4000:duration=0.1" \
  -af "afade=t=out:st=0.02:d=0.08,volume=0.4" \
  -y "$SFX_DIR/tick.mp3" 2>/dev/null

# # Bass hit — deep punch (0.4s)
ffmpeg -f lavfi -i "sine=frequency=60:duration=0.4" \
  -af "afade=t=out:st=0.05:d=0.35,volume=0.7" \
  -y "$SFX_DIR/bass_hit.mp3" 2>/dev/null

echo "Done! SFX files in $SFX_DIR:"
ls -la "$SFX_DIR"/*.mp3
