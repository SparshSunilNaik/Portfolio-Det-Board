# CASE 000 audio archive

The Birthday Director's Cut uses the owner-supplied piano recording at:

`public/audio/investigation-theme.mp3`

Metadata:

- Title: `Investigation Theme`
- Artist / performer: `Sparsh Sunil Naik`
- Classification: `Original Piano Performance`
- Description: `A personal piano recording by Sparsh Sunil Naik.`
- Format: MP3, stereo, 44.1 kHz, 192 kbps
- Duration: approximately 2 minutes 41 seconds

The deployed asset is a byte-for-byte copy of the recording supplied by the portfolio owner. The player reads its displayed duration from the browser's decoded audio metadata.

## Replace the track

1. Obtain an owner-approved MP3 recording.
2. Replace `public/audio/investigation-theme.mp3` without transcoding when the supplied file is already a valid MP3, or update `source` in `src/data/audio.ts`.
3. Update the title, artist, classification, and description in `src/data/audio.ts`.
4. Run `ffprobe` to verify codec, duration, sample rate, and channel count.
5. Run `npm run lint`, `npm test`, and `npm run build`.
6. Test play, pause, seek, mute, volume, error handling, and mobile playback through an explicit browser gesture.

The audio element is mounted once at the application-shell level. Track replacement must not add autoplay or persist a request to resume playback automatically.
