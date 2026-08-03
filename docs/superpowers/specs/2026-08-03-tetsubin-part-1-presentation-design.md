# Tetsubin part 1 presentation adjustments

## Scope

Bring the first tetsubin post into the tea collection’s existing conventions without adding components, dependencies, or a tag schema.

## Changes

- Keep `Tea`, `Teapots`, `Tetsubin`, and `Japanese Craft` as the post’s categories; these are the site’s existing tag mechanism.
- Replace the generic HOJO mention in the opening note with links to the general, Suzuki Morihisa, Kunzan, and Seikodo articles. State that they inspired this series and that its historical claims were independently checked.
- Add a short closing signpost: this is the first of six posts, followed by Morioka, Mizusawa and Ōshū, Yamagata, Kyoto and Kansai, and Takaoka.
- Keep SVG diagrams inside the normal article width. Each diagram becomes a keyboard-accessible link to its SVG asset, opening in a new tab for full-size inspection.
- Delete the added horizontal-scrolling figure CSS; the existing centered-figure rule is sufficient once the SVG is no longer forced to 1200px wide.

## Verification

Run `npm run build`, confirm the part-1 route is generated, and inspect the staged diff for only the post and existing stylesheet.
