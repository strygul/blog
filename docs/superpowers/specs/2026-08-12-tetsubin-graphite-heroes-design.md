# Tetsubin Graphite Heroes Design

## Goal

Rework the four hero images shown on `/tea/tetsubins/` so their drawing style matches the rough coal-and-graphite character of the main `/tea/` hero image. Preserve the rest of the site unchanged.

## Scope

Replace only these existing raster assets:

- `public/tea/posts/tetsubin-history-1-birth-of-the-iron-kettle/hero.png`
- `public/tea/posts/tetsubin-history-2-morioka/hero.png`
- `public/tea/posts/tetsubin-history-3-mizusawa-oshu/hero.png`
- `public/tea/posts/tetsubin-history-4-yamagata/hero.png`

No Astro components, styles, content, frontmatter, routes, image paths, or other assets will change.

## Visual direction

Use `src/assets/tea/main.png` as the style reference. The new images should share its visibly handmade qualities:

- rough, dark coal and graphite marks;
- uneven pencil pressure and imperfect contours;
- loose cross-hatching, smudging, and tonal buildup;
- a natural paper-like white background;
- expressive rendering rather than clean technical illustration.

Use each current Tetsubin History hero as its subject reference. Preserve the kettle's existing silhouette, proportions, viewing angle, handle, spout, lid, surface pattern, ornamental details, and left-right orientation. Do not add text, color, labels, borders, watermarks, or unrelated objects.

## Composition and delivery

Each replacement remains a 1672×941 PNG. Keep the kettle clearly readable at card size, centered with similar margins and visual scale to its current image. The subject may gain loose grounding strokes or subtle paper texture, but the composition must remain uncluttered and must not materially change the kettle design.

The four existing file paths remain stable so the updated artwork automatically appears on the `/tea/tetsubins/` cards, the `/tea/` Tetsubins category card, article pages, and social metadata without code changes.

## Verification

- Confirm that all four replacements are valid 1672×941 PNG files.
- Visually compare them with `src/assets/tea/main.png` and confirm the rough graphite language is recognizably aligned.
- Confirm that the four kettle subjects remain distinct and faithful to their previous hero images.
- Run the production build and existing tests.
- Inspect `/tea/tetsubins/` and at least one Tetsubin History article at desktop and mobile widths.
- Confirm that no tracked files outside the four heroes and this design/implementation documentation changed.
