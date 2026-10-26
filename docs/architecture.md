# Architecture

CASE 000 is a static React/TypeScript application built by Vite. Project copy and graph edges live in `src/data/projects.ts`; rendering does not own portfolio facts.

The desktop board uses one 4000×3100 coordinate space transformed by a camera `{x, y, scale}`. Pointer capture drives panning, two active pointers drive pinch zoom, and wheel zoom preserves the board coordinate under the cursor. SVG paths connect evidence centers. Search/filtering dims non-matches instead of destroying spatial context.

On screens below 760px the canvas becomes a fixed visual header and the navigator becomes a full, readable project index. Dossiers remain bottom-sheet-like overlays. This avoids requiring mobile visitors to read tiny evidence on a desktop canvas.

Key modules:

- `src/data/`: evidence, technologies, status, provenance, and relationships.
- `src/components/board/`: camera surface, evidence materials, identity dossier, SVG threads.
- `src/components/dossiers/`: detailed project file and recruiter briefing.
- `src/components/navigation/`: search, filters, focus index, minimap, viewport controls.
- `src/lib/`: pure search, graph validation, and coordinate transforms.

No runtime API, analytics, cookies, or personal resume file is shipped.
