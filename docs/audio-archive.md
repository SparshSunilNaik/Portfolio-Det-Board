# CASE 000 audio archive

The Director's Cut includes an original 48-second instrumental demo at:

`public/audio/case-000-demo.mp3`

Metadata:

- Title: `Investigation Theme`
- Artist: `CASE 000`
- Status: `Demo Soundtrack`
- Format: MP3, stereo, 44.1 kHz, 96 kbps

The demo was synthesized locally from layered sine oscillators and periodic amplitude envelopes. It contains no samples, vocals, downloaded music, or referenced melody.

## Replace the track

1. Export the final owner-approved soundtrack as MP3.
2. Replace `public/audio/case-000-demo.mp3` without changing the filename, or update `source` in `src/data/audio.ts`.
3. Update the title, artist, status, and fallback duration in `src/data/audio.ts`.
4. Run `ffprobe` to verify codec, duration, sample rate, and channel count.
5. Run `npm run lint`, `npm test`, and `npm run build`.
6. Test play, pause, seek, mute, volume, error handling, and mobile playback through an explicit browser gesture.

The audio element is mounted once at the application-shell level. Track replacement must not add autoplay or persist a request to resume playback automatically.
