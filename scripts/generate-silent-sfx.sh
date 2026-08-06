#!/bin/bash
# Generate silent SFX placeholders using ffmpeg
# Run this if you don't have real SFX files yet — prevents pipeline crashes
# Replace with real files from pixabay.com/sound-effects for production quality

DIR="$(dirname "$0")/../public/sfx"

for name in whoosh ding click swoosh; do
  if [ ! -f "$DIR/$name.mp3" ]; then
    ffmpeg -f lavfi -i anullsrc=r=44100:cl=mono -t 0.5 -q:a 9 "$DIR/$name.mp3" -y 2>/dev/null
    echo "Created placeholder: $name.mp3"
  else
    echo "Exists: $name.mp3"
  fi
done
