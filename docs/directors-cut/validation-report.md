# CASE 000 — Director's Cut validation report

## Outcome

**Birthday release candidate verified for production integration.**

The Director's Cut is implemented on `directors-cut/living-atmosphere`, derived from the released Stage C commit `8b4252fd6b64662a9129f7e6dfb5234bcb6f4e64`. Production `main` was not changed.

## Visitor experience

- The Audio Archive gives visitors an optional soundtrack without interrupting exploration. It starts paused, downloads no MP3 until interaction, reports actual media state, and continues through board selections and dossier transitions.
- Evidence now explains its graph context at the moment of interest. Hover or keyboard focus emphasizes only direct relationships; selection reveals the verified relationship label without making the whole board animate.
- The Findings Ledger reads as a compact investigator's working document through numbered sections, classification cues, project identifiers, technology tags, and clearer related-case links. Its facts remain data-derived and unchanged.
- Pointer-responsive lighting adds restrained depth by writing clamped CSS variables directly to the viewport. It does not generate continuous React renders and is disabled by reduced-motion preference.
- Dossiers use a short controlled reveal rather than permanent motion. Reduced motion removes the reveal and waveform animation.

## Audio asset

`public/audio/investigation-theme.mp3`

- Owner-supplied personal piano recording by Sparsh Sunil Naik
- MP3, 44.1 kHz, stereo, 192 kbps
- Duration: 161.471565 seconds
- Size: 3,877,126 bytes
- HTTP preview response: `200 audio/mpeg`

Replacement instructions are in `docs/audio-archive.md`.

## Automated verification

All checks passed from the isolated worktree:

- `npm run lint` — TypeScript passed
- `npm test` — 54/54 Vitest tests passed
- `npm run build` — production Vite build passed
- `git diff --check` — passed (Git emitted only Windows line-ending notices)
- `ffprobe` — confirmed MP3 codec, 44.1 kHz stereo, 161.471565-second duration

Tests cover playback success and rejection, pause state, mute, volume clamping and persistence, seeking, track end, invalid media, no autoplay persistence, reduced-motion waveform behavior, persistent shell mounting, compact player defaults, evidence annotations, relationship highlighting, ledger presentation, and the preserved initial camera.

## Real-browser verification

Chrome was driven through the DevTools Protocol using actual pointer gestures against the production preview.

Verified at 1440×900, 1366×768, 390×844, and 375×667:

- Initial media state was paused, with no `src` and no MP3 request.
- An explicit click started playback; status changed to `PLAYING` only after media playback succeeded.
- The browser reported the recording's real 161.471565-second duration and displayed `02:41` while time advanced.
- Pause stopped progress; seek, mute, unmute, and volume controls changed the media element's actual values.
- Volume and mute persisted; no playback/autoplay instruction was stored.
- Playback continued while opening a selected finding and its complete dossier; exactly one audio element remained mounted.
- Track completion reported `ARCHIVE COMPLETE` and stopped waveform motion.
- A missing source reported `SIGNAL ERROR` and did not claim playback.
- Reduced-motion playback had no active waveform or running page animations.
- Hovering COBOT highlighted its one direct thread; selecting it exposed `LOCAL INFERENCE BOUNDARY` and the matching ledger.
- No runtime exceptions or horizontal viewport overflow were observed.
- The dock did not overlap the minimap, zoom controls, navigation, intake CTA, or mobile reel. It starts collapsed at 1366×768 and compact mobile sizes.

Safari was not available in the Windows validation environment. Promise rejection, media errors, user-gesture loading, and native range controls are handled, but a physical Safari pass remains recommended before release.

## Camera investigation

The approved default remains exactly:

```ts
{ x: -690, y: -395, scale: 0.72 }
```

Every fresh browser run rendered `translate3d(-690px, -395px, 0px) scale(0.72)` and displayed 72%. The lower percentage was reproducible only after invoking Fit Board (26% at 1440×900), so no camera correction was made. The reported 18% screenshot is not evidence of a default regression.

## Performance observations

Compared with the released Stage C build:

| Asset | Stage C raw | Director's Cut raw | Change |
| --- | ---: | ---: | ---: |
| JavaScript | 287,505 B | 296,264 B | +8,759 B |
| CSS | 40,849 B | 49,104 B | +8,255 B |
| JS gzip measurement | 89,200 B | 91,826 B | +2,626 B |
| CSS gzip measurement | 10,420 B | 12,163 B | +1,743 B |

The owner recording adds 3,877,126 bytes but is requested only after the visitor opens or plays the archive. The visualizer uses 20 CSS bars and runs only during successful playback. No canvas loop, particle system, or pointer-driven React state loop was introduced.

## Screenshots

- `screenshots/1440-intake.png`
- `screenshots/1440-audio-idle.png`
- `screenshots/1440-audio-playing.png`
- `screenshots/1440-evidence-hover.png`
- `screenshots/1440-ledger-audio.png`
- `screenshots/1366-audio-board.png`
- `screenshots/390-audio-collapsed.png`
- `screenshots/390-audio-expanded.png`
- `screenshots/375-audio-collapsed.png`

## Implementation commits

- `0d1ed8a` — persistent Audio Archive and original demo soundtrack
- `a19fa24` — living evidence interactions and Findings Ledger storytelling
- `0c6df39` — playback error hardening, compact layouts, and final validation tests
- `13c7881` — tactical board locator refinement

## Remaining limitations

- Safari and physical iOS device playback were not available for direct validation.
- The 3.88 MB MP3 is a static public asset and is not streamed adaptively; lazy loading prevents it from blocking initial rendering.
