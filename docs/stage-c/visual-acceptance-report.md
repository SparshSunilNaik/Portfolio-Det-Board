# CASE 000 — Stage C visual acceptance

## Recommendation

**READY TO DEPLOY**, subject to the owner’s separate merge and deployment approval.

Stage B now delivers a substantial experiential improvement over production without replacing the proven board. The cinematic intake, contextual findings, selected relationship story, mobile reel, and technical diagrams form one coherent investigation system. The remaining weaknesses are non-blocking and are documented below.

No merge, push, production deployment, DNS change, or `THE-WEB` change was performed.

## Visual comparison

| Area | Production | Accepted Stage B |
| --- | --- | --- |
| First impression | Opens at maximum board density with no authored first beat | Opens with a strong editorial case intake, spider identity, portrait, owner name, restrained thread, and immediate actions |
| Personal identity | Strong central dossier, but discovered alongside all controls | Identity is established before exploration and remains the visual anchor after entry |
| Project storytelling | Full details live behind visually similar long dossiers | Findings provide a concise mission/implementation/validation/boundary preview; six dossiers add distinct system diagrams |
| Relationships | Atmospheric threads with limited explanatory value | Selected typed relationships brighten once and are explained in both the graph label and ledger |
| Recruiter path | Briefing is available from the board | Briefing is available from intake and board, with an explicit Identity → Experience → Systems → Research → Contact route |
| Mobile | Functional board preview followed by a vertical index | Authored introduction, swipe-revealing evidence reel, complete index, findings bottom sheet, and full dossiers |

The Stage A intent is visibly present: wide editorial typography, midnight/parchment/crimson materials, a staged opening, selective relationship motion, concise findings, and an intentional mobile evidence path. Stage B is deliberately less rigid than the prototype’s three-column theatre because it preserves the production camera, board geometry, minimap, filters, and complete evidence surface.

## Critical findings and corrections

The acceptance pass found and corrected five concrete defects:

1. **Modal focus loss:** Closing a dossier left focus on `<body>`, and the guided briefing did not receive focus. A shared modal-focus hook now focuses dialogs, traps Tab navigation, restores the invoking control, and falls back to the application focus root.
2. **Mobile identity omission:** The mobile intake hid the subject card and therefore omitted the owner’s name. It now presents `SPARSH SUNIL NAIK` and the verified engineering scope above the opening headline.
3. **Mobile header collision:** The redundant mobile index toggle passed beneath the fixed brand header and exposed a stray evidence count. It is now removed on mobile; the reel itself displays the filtered file count and the complete index remains directly below.
4. **Ledger evidence duplication:** COBOT repeated a validation statement as its evidence boundary. Boundary mapping now prioritizes qualifying results beyond the validation preview and excludes duplicates.
5. **Readability and transition:** Ledger body text was too small, and intake disappeared as a hard cut. Ledger copy is larger, and normal entry uses a 220 ms opacity/scale dissolve. Skip remains immediate, and reduced-motion entry remains an immediate cut.

The mobile intake now locks underlying document scroll, eliminating the visible page scrollbar during the modal opening.

## Integration assessment

- **Intake → theatre:** The short dissolve exposes the already-mounted board rather than loading a second interface. Camera state remains untouched.
- **Selection → findings:** The selected physical evidence remains visible while the compact ledger appears in the existing right rail. At 1440×900 and 1366×768, it does not overlap the navigator.
- **Findings → dossier:** The explicit dossier action preserves context and now restores focus to that action when the modal closes.
- **Briefing → exploration:** The existing briefing remains the sole guided journey and uses the same parchment, crimson, typography, evidence data, and dossier transitions.
- **Board dominance:** On desktop, the board retains roughly three quarters of the viewport and remains the primary composition. No permanent left rail or compressed replacement canvas was introduced.

## Key screenshots

- [Production baseline — 1440×900](screenshots/production-1440-board.png)
- [Case Intake — 1440×900](screenshots/stage-b-1440-intake.png)
- [Evidence Theatre after entry — 1440×900](screenshots/stage-b-1440-theatre.png)
- [COBOT selected with Findings Ledger — 1440×900](screenshots/stage-b-1440-ledger.png)
- [COBOT technical dossier — 1440×900](screenshots/stage-b-1440-cobot-dossier.png)
- [EgoNav technical dossier — 1440×900](screenshots/stage-b-1440-egonav-dossier.png)
- [Guided recruiter briefing — 1440×900](screenshots/stage-b-1440-briefing.png)
- [Mobile intake — 390×844](screenshots/stage-b-390-intake.png)
- [Mobile evidence reel and complete index — 390×844](screenshots/stage-b-390-reel.png)

## Accessibility and interaction verification

Actual Chrome 157 production-preview checks confirmed:

- `OPEN CASE FILE` receives initial focus.
- Normal entry visibly transitions for 220 ms, then focus moves to the application shell.
- Escape and `SKIP INTRO` remain immediate.
- The briefing receives dialog focus, wraps Tab from its last control to `Close briefing`, and restores focus to `START GUIDED BRIEFING`.
- Closing a project dossier restores focus to `OPEN COMPLETE DOSSIER`.
- Reduced-motion entry removes intake immediately with zero running animations.
- Returning in the same tab does not replay intake.
- Direct project links still bypass intake.
- Portrait and all reviewed SVG diagrams render without runtime errors.
- No focus trap, horizontal page overflow, clipped primary action, or continuous animation was found.

The exact desktop board camera remains:

```ts
{ x: -690, y: -395, scale: 0.72 }
```

## Responsive verification

| Viewport | Result |
| --- | --- |
| 1440×900 | No navigator/ledger overlap; exact 72% camera; all key states visually inspected |
| 1366×768 | Compact controls and ledger retain a 13 px separation; exact 72% camera |
| 390×844 | Mobile identity, reel, index, findings, and intake scroll lock verified; no horizontal overflow |
| 375×667 | Compact findings and complete mobile path remain usable; no horizontal overflow |

## Performance observations

- No WebGL, video, particles, physics, or persistent animation loop is present.
- Intake motion uses one opacity/transform transition; relationship motion uses one selected SVG stroke trace.
- Under 4× Chrome CPU throttling, COBOT findings rendered within two frames in **35.9 ms**; running animations after settling: **0**.
- Final production assets: HTML **1.92 kB**, CSS **40.84 kB** (**10.53 kB gzip**), JavaScript **287.50 kB** (**90.00 kB gzip**).
- Compared with the production baseline build, Stage B adds approximately **6.68 kB gzip** across CSS and JavaScript, well below the Stage A budget.

## Verification results

| Check | Result |
| --- | --- |
| `npm run lint` | Passed |
| `npm test` | Passed — 43/43 tests |
| `npm run build` | Passed |
| `git diff --check` | Passed; Windows line-ending notices only |
| Browser runtime exceptions | None |

Tests were tightened to verify that mobile identity remains in the intake markup and evidence-boundary findings do not repeat validation entries.

## Remaining visual weaknesses

- The unselected theatre remains intentionally close to production; the largest visual differentiation occurs at intake, selection, mobile reel, and dossier depth rather than through a wholesale board redesign.
- The production board is dense by design. The findings panel improves scanning but still requires internal scrolling for detailed projects.
- Typed relationship labels can be partially obscured by physical evidence at some camera positions; the same relationship remains fully readable in the ledger.
- Mobile dossiers preserve diagram label legibility through contained horizontal scrolling rather than shrinking diagrams into unreadable thumbnails.
- Physical iOS/Android, screen-reader, and keyboard testing outside Chrome emulation is still recommended as a final operational smoke check.

These limitations do not undermine the approved direction or block deployment. The experience is visually coherent, substantially more memorable than production, evidence-bounded, and recruiter-usable.
