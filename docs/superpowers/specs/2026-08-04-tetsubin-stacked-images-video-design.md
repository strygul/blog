# Tetsubin Parts 1–2: Media Layout and Toramonten Additions

## Goal

Make each studio's kettle and maker-mark photographs easier to inspect, show the Suzuki Morihisa, Iwachu, and Kamasada production processes in context, and add the useful production details from Toramonten's Nanbu ironware guide without importing its sales or health claims.

## Design

- Give the four studio pairs a dedicated `.studio-gallery` class instead of `.two-up`. The Tea-wide `f1-seals.css` stylesheet assigns `.two-up` figures a 50% maximum width and must not control this article's vertical galleries.
- Let `.studio-gallery` break out of the 720px prose column to a centered maximum width of 1100px, while retaining a one-rem viewport gutter on smaller screens.
- Expand each image to the gallery width. Keep captions centered within a 720px maximum width for readable line lengths.
- Wrap every studio kettle and maker-mark image in a self-link that opens the original local file in a new tab, with `rel="noopener noreferrer"` and a descriptive accessibility label.
- Preserve the order in every studio section: representative kettle first, maker mark second, with each caption directly below its image.
- Replace the Suzuki Morihisa video `kNEEbDtYcaI`, whose owner disables external playback, with `https://www.youtube.com/watch?v=B_3B5q2kBgk`, which the official workshop site recommends and YouTube reports as embeddable. Keep it beside the workshop-process discussion and before the maker-mark guidance.
- Embed `https://www.youtube.com/watch?v=o6AuxztRkYM` in the Iwachu section after the production-route comparison and before the practical safety distinction.
- Embed `https://www.youtube.com/watch?v=5DOeuBQnSVw` in the Kamasada section after the paragraph about the workshop's hand operations and before the paragraph about maker marks.
- Reuse the blog's existing responsive `.video-embed` wrapper and iframe attributes for all three videos. Use descriptive titles and do not autoplay.
- Introduce each video with a concise paragraph identifying its publisher and what the viewer will see.
- In Part 1's making section, briefly explain Toramonten's distinction between `nama-gata` compacted sand moulds and single-use `yaki-gata` fired moulds. Attribute the terminology directly and preserve the article's warning that workshop processes vary.
- In Part 2's Kamasada section, add Toramonten's report that the current workshop uses `yaki-gata`, `yakinuki`, urushi, and charcoal heat. Identify Toramonten as a workshop-linked retailer source rather than treating it as independent historical proof.
- Link the guide where each addition appears and list it in both articles' source sections.

## Verification

- Build the site successfully.
- Confirm all four `.studio-gallery` galleries render as centered one-column layouts up to 1100px wide and retain mobile gutters.
- Confirm the generated article contains all three YouTube embeds and their accessible titles.
- Confirm all eight studio images link to their original files in new tabs.
- Confirm YouTube reports `playableInEmbed: true` for the replacement Suzuki video.
- Confirm both articles link Toramonten and retain their existing historical conclusions.

## Scope

No global gallery behavior or video component changes are included. Toramonten's prices, buying advice, health and nutrition claims, broad four-century tetsubin wording, and repeated material are excluded.
