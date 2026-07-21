# Tetsubin 101 Research and Article Design

## Objective

Research and later draft a durable introduction to tetsubin for advanced gongfu tea practitioners. The article will explain the object, its history and construction, how to evaluate and use it, and what evidence supports claims about its effect on water and tea.

The work will not invent personal experience. It will preserve the blog's established voice through direct explanations, concrete observations, careful skepticism, and conclusions that distinguish useful signals from absolute rules.

## Audience and Reader Outcome

The reader already understands gongfu brewing, extraction, heat management, teaware, and the importance of water. The article will not repeat basic tea instruction.

After reading, the reader should be able to:

- Distinguish a traditional unlined tetsubin from an enameled cast-iron teapot and other iron vessels.
- Understand the broad historical and craft context of tetsubin.
- Recognize the principal parts and production stages of a tetsubin.
- Evaluate construction, condition, and fitness for use without relying on labels such as “old,” “Japanese,” or “handmade.”
- Separate demonstrated water effects from plausible mechanisms, subjective reports, and unsupported claims.
- Prepare, heat, dry, descale, and maintain a tetsubin safely.
- Use a compact buying framework without relying on time-sensitive product recommendations.

## Editorial Approach

The article will use an object-first field-guide structure. This gives “Tetsubin 101” a durable reference shape while reserving substantial depth for water and gongfu use.

Working title: **Tetsubin 101: An Introduction for Gongfu Tea Practitioners**

Proposed narrative:

1. **What a Tetsubin Is** — Define the object and distinguish it from an enameled cast-iron teapot.
2. **How Tetsubin Developed** — Give a concise history and introduce the relevant production traditions without turning the article into a collector chronology.
3. **How One Is Made** — Explain anatomy, molds, casting, surface treatment, interior finishing, handle and lid construction, and handmade versus industrial production.
4. **How to Read a Tetsubin** — Discuss workmanship, condition, decorative vocabulary, signatures, repairs, age claims, and suitability for use.
5. **What It May Do to Water** — Connect reliable measurements and chemistry to extraction while separating evidence from interpretation.
6. **Using One at the Gongfu Table** — Cover water choice, heat sources, first preparation, daily operation, drying, rust, scale, and long-term care.
7. **A Compact Buying Framework** — Cover intended use, capacity, weight, condition, interior, handle, lid, provenance, warning signs, and broad quality tiers.
8. **What a Tetsubin Cannot Fix** — Explain the limits of the tool and avoid presenting it as a cure for poor water or tea.

Small myth checks may appear within these sections, but the article will not use a myth-by-myth structure.

## Research Method

Research will follow this source hierarchy:

1. Japanese museums, cultural institutions, craft associations, and government heritage sources for terminology, history, and regional traditions.
2. Established tetsubin workshops and makers for documented production methods, identified as trade sources rather than neutral authorities.
3. Peer-reviewed studies and authoritative technical sources for iron release, corrosion, water chemistry, and food-contact safety.
4. Auction catalogues and specialist references only when useful for historical examples, signatures, and market terminology.
5. Practitioner reports for taste and brewing observations, always labeled as subjective.

Japanese-language material may be translated for research. Important terminology and contested statements will be checked across more than one source where suitable independent sources exist.

Each important claim will be tracked with:

- Claim text
- Source and direct link
- Evidence type
- Confidence level
- Caveats or conflicting evidence
- Decision on how, or whether, it belongs in the article

## Evidence Categories

Claims about water and brewing will be classified as:

- **Demonstrated:** supported by direct measurements or established chemistry.
- **Plausible:** consistent with available evidence but not sufficiently tested in tetsubin brewing.
- **Reported:** recurring sensory observations from practitioners that remain subjective.
- **Unsupported:** claims that should be challenged or omitted.

The post will not claim that tetsubin water treats iron deficiency or offers medical benefits. Safety advice will remain conservative and will distinguish cosmetic surface change, normal scale, active corrosion, and damage where the evidence permits.

## Deliverables and Review Gates

All work will remain on the `codex/tetsubin-101` branch unless the user directs otherwise.

### Stage 1: Research

- A sourced research dossier containing terminology, history, construction, water science, care, buying guidance, disputed claims, and the claim matrix.
- A detailed article outline that states the purpose and supporting evidence for every section.
- An image plan recording each subject, intended article location, source, rights status, caption direction, and factual purpose.

The user will review this stage before drafting begins.

### Stage 2: Draft

- `src/content/tea/tetsubin-101.md`
- Accurate frontmatter, title case, description, categories, source treatment, captions, and accessible alternative text.
- Supporting image assets whose use has been approved and whose rights status is documented.
- A successful Astro production build and link check.

## Visual Direction

The user selected an object-study direction centered on form, texture, anatomy, construction, and condition. The image set should aim to include:

- An annotated anatomy plate.
- Macro studies of the surface, interior, rust, scale, handle attachment, and lid.
- A clear comparison between an unlined tetsubin and an enameled cast-iron teapot.
- One casting or mold-making image.
- One atmospheric image of a tetsubin in gongfu use.

Real, rights-cleared photography is required when an image functions as evidence. Technical diagrams and comparisons must be factually grounded. The user will choose the hero image; the research and draft will leave that decision open rather than generating or selecting a final hero.

## Voice and Style

The primary style references are the author's recent tea posts, especially:

- `src/content/tea/akela-missed-his-kill.md`
- `src/content/tea/little-secret-i-heard.md`
- `src/content/tea/beginners-guide-to-early-yixing-teapots.md`
- `src/content/tea/early-teapots-order-versus-chaos.md`

The draft should use plain but technically precise language, explain how conclusions are reached, and avoid overstating uncertain evidence. Research-led passages must not imply that the author personally performed experiments or used a tetsubin.

All titles and headings must follow `.cursor/rules/post-titles.mdc`, and metadata and images must follow `.cursor/rules/seo.mdc`.

## Verification

Before the research stage is considered complete:

- Every material factual claim must have a traceable source.
- Conflicting accounts must be recorded rather than silently resolved.
- Trade claims must not be presented as independent scientific evidence.
- Source language, publication type, and relevant limitations must be clear.
- Image rights must be recorded; an attractive image without acceptable reuse terms is only a lead, not an asset.
- The outline must match the approved scope and avoid drifting into a catalogue of makers or current products.

Before the draft stage is considered complete:

- Citations must support the exact nearby claims.
- Source wording must be paraphrased independently and checked against accidental copying.
- The article must preserve the distinction between demonstrated, plausible, reported, and unsupported claims.
- Headings, frontmatter, images, captions, alt text, and internal links must follow repository conventions.
- `npm run build` must succeed.

## Out of Scope

- A comprehensive catalogue of makers, signatures, regional schools, or historical models.
- Current product rankings or named purchase recommendations.
- Medical or nutritional advice.
- Invented first-person testing or ownership experience.
- Choosing the final hero image for the user.
