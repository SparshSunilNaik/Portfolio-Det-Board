# QA checklist

Run before release:

```bash
npm ci
npm run lint
npm test
npm run build
npm run preview -- --host 127.0.0.1
```

Manual checks:

- Desktop: initial identity dossier, drag, cursor-centered wheel zoom, project open/close, Escape, search, filters, guided briefing, external links.
- Experience: filter Professional Experience, search Entropy or Software Engineering Intern, open E-001 and E-001/A, and verify the `ENGINEERED_AT` related-evidence navigation.
- COBOT: search COBOT or adaptive viva, filter Agents & RAG, open R-03, verify its private-link disclosure and local-inference relationship to SplitBrain-RAG.
- Identity: verify the angular spider in the header, favicon, and social card; confirm superseded identity assets do not ship.
- Leadership: verify all public copy uses Former President — Data Science Club without implying an ongoing term.
- Terminal evidence: confirm Sage, SplitBrain-RAG, and GPU Scheduler use classified midnight blue with no phosphor-green accents.
- Touch/mobile: readable index, category filters, project bottom sheet, pinch zoom in canvas header.
- Keyboard: `/` focuses search, `G` opens briefing, Enter/Space opens evidence, Escape closes overlays.
- Reduced motion: no essential information relies on animation.
- Pages path: built asset URLs begin with `/Portfolio-Det-Board/`.

Automated tests cover graph integrity, unique IDs, relationship endpoints, baseline project presence, metadata/link formats, search/filtering, coordinate conversion, zoom bounds, fit, focus positioning, COBOT integrity/rendering, former-leadership wording, excluded unconfirmed employment, and spider-asset references.
