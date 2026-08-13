# Tetsubin Graphite Heroes Design

## Goal

Rework the four hero images shown on `/tea/tetsubins/` so their drawing style matches the rough coal-and-graphite character shared by the main `/tea/` hero and the `/tea/my-teaware-collection/` hero. Preserve the rest of the site unchanged.

## Scope

Replace only these existing raster assets:

- `public/tea/posts/tetsubin-history-1-birth-of-the-iron-kettle/hero.png`
- `public/tea/posts/tetsubin-history-2-morioka/hero.png`
- `public/tea/posts/tetsubin-history-3-mizusawa-oshu/hero.png`
- `public/tea/posts/tetsubin-history-4-yamagata/hero.png`

No Astro components, styles, content, frontmatter, routes, image paths, or other assets will change.

## Visual direction

Use both of these existing assets as authoritative style references:

- `src/assets/tea/main.png`
- `src/assets/tea/my-teaware-collection/hero.png`

The new images should share their visibly handmade qualities:

- rough, dark coal and graphite marks;
- uneven pencil pressure and imperfect contours;
- loose overlapping strokes, broad shading, smudging, and tonal buildup;
- simplified descriptive detail rather than finely outlined decoration;
- irregular edges and visible construction marks;
- a natural paper-like white background;
- expressive observational-sketch rendering rather than clean technical illustration, etching, or engraving.

Use each current Tetsubin History hero as its subject reference. Preserve the kettle's existing silhouette, proportions, viewing angle, handle, spout, lid, recognizable surface pattern, regional ornament, and left-right orientation. Ornament may be expressed more loosely, but it must remain identifiable. Do not add text, color, labels, borders, watermarks, or unrelated objects.

All four images must look like one artist drew them in one sitting with the same paper and graphite tools. Match the two reference heroes' approximate line looseness, shadow depth, highlight softness, mark scale, paper tone, and imperfect hand-drawn character. Avoid crisp vector-like outlines, uniform stippling, polished product-render symmetry, dense micro-detail, and the appearance of an antique engraving.

## Composition and delivery

Each replacement remains a 1672×941 PNG. Keep the single kettle clearly readable at card size, centered with similar margins and visual scale to its current image. Use loose grounding strokes and the same near-white paper field seen in the references, but keep the composition uncluttered and do not materially change the kettle design.

The four existing file paths remain stable so the updated artwork automatically appears on the `/tea/tetsubins/` cards, the `/tea/` Tetsubins category card, article pages, and social metadata without code changes.

## Verification

- Confirm that all four replacements are valid 1672×941 PNG files.
- Visually compare them side by side with both reference heroes and confirm that line looseness, graphite density, tonal range, smudging, paper tone, and level of simplification are recognizably aligned.
- Reject any result that reads as a precise engraving even if all four Tetsubin images match one another.
- Confirm that the four kettle subjects remain distinct and faithful to their previous hero images.
- Run the production build and existing tests.
- Inspect `/tea/tetsubins/` and at least one Tetsubin History article at desktop and mobile widths.
- Confirm that no tracked files outside the four heroes and this design/implementation documentation changed.
