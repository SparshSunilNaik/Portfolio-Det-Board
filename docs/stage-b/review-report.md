# CASE 000 — Stage B review report

## Outcome

The approved **Case Aperture / Evidence Theatre** direction is integrated into the production React application on the isolated `stage-b/living-evidence-board` branch. The implementation preserves the existing evidence data, board geometry, 72% desktop camera, dossiers, search, filters, minimap, briefing, keyboard controls, and GitHub Pages base path. It has not been pushed, merged into `main`, or deployed.

## Experience architecture

- `CaseIntake` is a session-scoped, keyboard-accessible opening over the existing application. It has immediate enter, briefing, skip, and Escape paths; performs no loading work; and remains dismissible if session storage throws.
- The existing `InvestigationBoard` remains the evidence surface. Selection now opens a non-modal `FindingsLedger`; the complete `Dossier` opens only through an explicit action or direct project URL.
- `FindingsLedger` maps mission, implementation, validation, and evidence-boundary text from the existing typed `Project` records. Related cases are generated from the validated relationship graph.
- `ThreadLayer` labels and traces only relationships connected to the selected evidence. Unrelated relationships are de-emphasized and no continuous animation loop was introduced.
- `MobileEvidenceReel` adds a touch-sized, horizontal, snap-scrolling evidence path while retaining the complete searchable index and desktop board preview.
- The existing `GuidedOverview` remains the only guided tour and now exposes the route: Identity → Experience → Systems → Research → Contact.

## Intake behavior

- Shown once per browser-tab session through `sessionStorage` key `case-000:intake-seen`.
- Direct valid `#project=…` links bypass the intake and open the requested dossier.
- Invalid project hashes do not suppress the intake.
- Entering or skipping writes the session marker when available; storage failures do not block board access.
- Opening or closing dossiers does not replay intake or reset camera state.
- Focus begins on `OPEN CASE FILE`, Tab is contained within the intake, and Escape skips.
- `prefers-reduced-motion` removes the intake trace animation.

## Findings and relationship behavior

- Evidence cards and index/reel entries select findings without forcing a modal.
- The ledger can collapse, close, focus related evidence, and open the complete dossier.
- COBOT → SplitBrain-RAG displays the typed `local inference boundary` relationship and its existing distinction note.
- Search and category state remain active while relationships are focused.
- Relationship motion is limited to one selected path and is disabled under reduced motion.

## Project-specific diagrams

Original SVG system traces were added to full dossiers for:

- Elma Labs / SmartGlass: portable C core, ESP-IDF and host targets, HUD/webcam paths, and CI validation.
- COBOT: bounded repository input, API/scope controls, local assessment generation, faculty review, and traceable results.
- EgoNav VLA: panoramic perception, ego memory, asynchronous reasoning, safety/momentum controls, and bounded motor pulses.
- Polaris: RGB perception, local goal, safety control, MAVSDK/PX4 SITL, telemetry, and yaw-scan recovery.
- 5G Network Slicing: traffic classes, 5G SA lab, Kubernetes MEC, telemetry/QoS, and adaptation.
- Dynamic Pricing: PPO/SAC-DDPG/MASAC comparison through common evaluation criteria.

The diagrams contain no invented measurements. They are labeled as schematics limited to the verified portfolio record.

## Accessibility and performance decisions

- Existing dossier and briefing dialog semantics are retained; intake adds dialog labeling, focus containment, visible focus, skip, and Escape support.
- Ledger controls and relationship navigation are available without hover.
- Mobile controls use at least 42–46 px primary targets; reel cards are substantially larger.
- Motion uses CSS transform/opacity or one SVG stroke trace. There is no WebGL, physics, particle system, video, or requestAnimationFrame render loop.
- A Chrome run under 4× CPU throttling rendered selected COBOT findings within two frames in **39.3 ms**, with zero persistent animations after settling.
- Final production bundle: HTML **1.92 kB**, CSS **39.65 kB** (**10.32 kB gzip**), JavaScript **286.07 kB** (**89.58 kB gzip**).

## Automated verification

Executed from the Stage B worktree:

| Check | Result |
| --- | --- |
| `npm run lint` (`tsc -b --pretty false`) | Passed |
| `npm test` | Passed — 43/43 tests |
| `npm run build` | Passed |
| `git diff --check` | Passed; only expected Windows LF/CRLF notices |

New tests cover intake session behavior, enter/skip, unavailable storage, reduced-motion detection, source-derived findings, typed relationship highlighting, search/filter compatibility, mobile reel completeness, six diagram mappings, dossier semantics, and guided-briefing integration. Existing tests continue to verify the exact default camera `{ x: -690, y: -395, scale: .72 }`.

## Browser visual verification

Chrome **157.0.8103.78** was run against the local production preview at all required viewport sizes.

| Viewport | Verified |
| --- | --- |
| 1440×900 | Intake, exact 72% initial camera, board, COBOT ledger, relationship label, no control overlap, no page overflow |
| 1366×768 | Exact 72% initial camera, compact navigator, ledger spacing, no page overflow |
| 390×844 | Intake, evidence reel, complete 19-item index/reel, COBOT findings, touch sizing, no horizontal overflow |
| 375×667 | Compact mobile findings, complete index/reel, no horizontal overflow |

Additional functional browser checks passed for direct dossier linking, initial dossier focus, search (`Ollama` → COBOT, SplitBrain-RAG, PETER), ledger-to-dossier transition, COBOT diagram rendering, Escape handling, guided briefing, intake persistence after reload, and absence of runtime exceptions.

### Captures

- [`desktop-1440-intake.png`](screenshots/desktop-1440-intake.png)
- [`desktop-1440-board.png`](screenshots/desktop-1440-board.png)
- [`laptop-1366-board.png`](screenshots/laptop-1366-board.png)
- [`mobile-390-intake.png`](screenshots/mobile-390-intake.png)
- [`mobile-390-board.png`](screenshots/mobile-390-board.png)
- [`mobile-375-board.png`](screenshots/mobile-375-board.png)

## Commits

- `5d6d7bc` — experience shell and cinematic intake
- `a5c316b` — findings ledger and living relationships
- `64e5e75` — mobile reel and verified system traces
- `8ab4987` — tests, accessibility/performance polish, and screenshots

All commits use `SparshSunilNaik <ssn7406n@gmail.com>` as author and committer and contain no generated-by or co-author trailers.

## Changed implementation files

- `src/App.tsx`
- `src/components/board/ThreadLayer.tsx`
- `src/components/dossiers/Dossier.tsx`
- `src/components/dossiers/GuidedOverview.tsx`
- `src/components/dossiers/ProjectDiagram.tsx`
- `src/components/findings/FindingsLedger.tsx`
- `src/components/intake/CaseIntake.tsx`
- `src/components/navigation/MobileEvidenceReel.tsx`
- `src/components/navigation/Navigator.tsx`
- `src/lib/caseIntake.ts`
- `src/lib/findings.ts`
- `src/lib/portfolio.test.ts`
- `src/styles/index.css`

## Remaining limitations

- Browser verification used Chrome desktop/headless emulation; physical iOS/Android and assistive-technology device testing remain recommended before production deployment.
- Mobile technical diagrams intentionally scroll horizontally inside dossiers to preserve legible labels.
- The implementation cannot validate private repositories or physical SmartGlass hardware beyond the boundaries already recorded in the portfolio data.
- Google Fonts remain an existing external dependency; the experience still falls back to local font categories if unavailable.

## Production integration after owner approval

1. Review this branch and the six committed captures locally.
2. Confirm `main` still points to the intended production baseline and update the branch from `main` only if production has advanced.
3. Merge `stage-b/living-evidence-board` into `main` without rewriting history.
4. Re-run `npm ci`, `npm run lint`, `npm test`, and `npm run build` on the merged commit.
5. Run the local production preview and repeat the four viewport smoke checks.
6. Push `main` only after explicit deployment approval; then verify the GitHub Pages workflow and public URL.

No changes to `sparshsunilnaik.tech`, DNS, `THE-WEB`, or the current public deployment are part of Stage B.
