# Tetsubin Parts 1–2: Media Layout and Toramonten Additions

## Goal

Make each studio's kettle and maker-mark photographs easier to inspect, show the Suzuki Morihisa, Iwachu, and Kamasada production processes in context, and add the useful production details from Toramonten's Nanbu ironware guide without importing its sales or health claims.

## Design

- Keep the existing two-figure gallery markup and change only its scoped `.two-up` layout so figures appear vertically at the full available article width.
- Preserve the order in every studio section: representative kettle first, maker mark second, with each caption directly below its image.
- Embed `https://www.youtube.com/watch?v=kNEEbDtYcaI` in the Suzuki Morihisa section beside the workshop-process discussion and before the maker-mark guidance.
- Embed `https://www.youtube.com/watch?v=o6AuxztRkYM` in the Iwachu section after the production-route comparison and before the practical safety distinction.
- Embed `https://www.youtube.com/watch?v=5DOeuBQnSVw` in the Kamasada section after the paragraph about the workshop's hand operations and before the paragraph about maker marks.
- Reuse the blog's existing responsive `.video-embed` wrapper and iframe attributes for all three videos. Use descriptive titles and do not autoplay.
- In Part 1's making section, briefly explain Toramonten's distinction between `nama-gata` compacted sand moulds and single-use `yaki-gata` fired moulds. Attribute the terminology directly and preserve the article's warning that workshop processes vary.
- In Part 2's Kamasada section, add Toramonten's report that the current workshop uses `yaki-gata`, `yakinuki`, urushi, and charcoal heat. Identify Toramonten as a workshop-linked retailer source rather than treating it as independent historical proof.
- Link the guide where each addition appears and list it in both articles' source sections.

## Verification

- Build the site successfully.
- Confirm all four `.two-up` galleries render as one-column flex layouts.
- Confirm the generated article contains all three YouTube embeds and their accessible titles.
- Confirm both articles link Toramonten and retain their existing historical conclusions.

## Scope

No global gallery behavior or video component changes are included. Toramonten's prices, buying advice, health and nutrition claims, broad four-century tetsubin wording, and repeated material are excluded.
