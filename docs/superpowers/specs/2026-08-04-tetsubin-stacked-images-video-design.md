# Tetsubin Part 2: Stacked Images and Workshop Videos

## Goal

Make each studio's kettle and maker-mark photographs easier to inspect, and show the Suzuki Morihisa and Kamasada production processes in context.

## Design

- Keep the existing two-figure gallery markup and change only its scoped `.two-up` layout so figures appear vertically at the full available article width.
- Preserve the order in every studio section: representative kettle first, maker mark second, with each caption directly below its image.
- Embed `https://www.youtube.com/watch?v=kNEEbDtYcaI` in the Suzuki Morihisa section beside the workshop-process discussion and before the maker-mark guidance.
- Embed `https://www.youtube.com/watch?v=5DOeuBQnSVw` in the Kamasada section after the paragraph about the workshop's hand operations and before the paragraph about maker marks.
- Reuse the blog's existing responsive `.video-embed` wrapper and iframe attributes for both videos. Use descriptive titles and do not autoplay.

## Verification

- Build the site successfully.
- Confirm all four `.two-up` galleries render as one-column flex layouts.
- Confirm the generated article contains both YouTube embeds and their accessible titles.

## Scope

No global gallery behavior, article copy beyond the embed placement, or video component changes are included.
