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
- Touch/mobile: readable index, category filters, project bottom sheet, pinch zoom in canvas header.
- Keyboard: `/` focuses search, `G` opens briefing, Enter/Space opens evidence, Escape closes overlays.
- Reduced motion: no essential information relies on animation.
- Pages path: built asset URLs begin with `/Portfolio-Det-Board/`.

Automated tests cover graph integrity, unique IDs, relationship endpoints, baseline project presence, metadata/link formats, search/filtering, coordinate conversion, zoom bounds, fit, and focus positioning.
