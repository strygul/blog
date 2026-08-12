# Tetsubin Graphite Heroes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the four Tetsubin History hero images with faithful redraws in the rough coal-and-graphite style of the main `/tea/` hero.

**Architecture:** This is an asset-only change. Each current Tetsubin hero supplies the subject and composition reference, while `src/assets/tea/main.png` supplies the rendering-style reference; the built-in image-generation tool creates one replacement at a time. Each selected result is normalized to the existing 1672×941 PNG contract and written to the existing path, so every current page and metadata consumer updates without code changes.

**Tech Stack:** Built-in image generation, local image inspection, Sharp 0.34.3, Astro 5.15.3, Node test runner.

## Global Constraints

- Modify only the four existing `hero.png` assets listed below plus implementation documentation.
- Preserve each kettle's silhouette, proportions, viewing angle, handle, spout, lid, surface pattern, ornamental details, and left-right orientation.
- Match `src/assets/tea/main.png`: rough dark coal/graphite, uneven pressure, imperfect contours, loose cross-hatching, smudging, tonal buildup, and natural paper-white ground.
- Keep each replacement at exactly 1672×941 pixels in PNG format.
- Keep the kettle centered, clearly readable at card size, and at approximately the same scale and margins as the current hero.
- Do not add text, color, labels, borders, watermarks, people, extra teaware, or unrelated objects.
- Do not change Astro components, CSS, content, frontmatter, routes, or image paths.
- Use the built-in image-generation path; do not use the CLI fallback.
- Replacing the four current assets is authorized by the approved design. Git history remains the recovery path for the originals.

## File map

- Reference only: `src/assets/tea/main.png` — establishes the graphite style.
- Modify: `public/tea/posts/tetsubin-history-1-birth-of-the-iron-kettle/hero.png` — Part 1 kettle.
- Modify: `public/tea/posts/tetsubin-history-2-morioka/hero.png` — Part 2 kettle.
- Modify: `public/tea/posts/tetsubin-history-3-mizusawa-oshu/hero.png` — Part 3 kettle.
- Modify: `public/tea/posts/tetsubin-history-4-yamagata/hero.png` — Part 4 kettle.
- Temporary, untracked: `tmp/imagegen/tetsubin-part-{1,2,3,4}-generated.png` — selected generated sources before normalization.

---

### Task 1: Redraw the Part 1 hero

**Files:**
- Reference: `src/assets/tea/main.png`
- Modify: `public/tea/posts/tetsubin-history-1-birth-of-the-iron-kettle/hero.png`
- Temporary: `tmp/imagegen/tetsubin-part-1-generated.png`

**Interfaces:**
- Consumes: the current Part 1 hero as the subject/composition reference and `src/assets/tea/main.png` as the style reference.
- Produces: a valid 1672×941 Part 1 `hero.png` at the unchanged public path.

- [ ] **Step 1: Inspect both input images at original detail**

Use the local image viewer on:

```text
public/tea/posts/tetsubin-history-1-birth-of-the-iron-kettle/hero.png
src/assets/tea/main.png
```

Confirm the Part 1 subject is the wide arare-patterned kettle with a high rounded handle, left-facing spout, circular lid, and floral lid knob.

- [ ] **Step 2: Generate a style-transfer replacement**

Use the built-in image-generation tool with both local paths as references and this prompt:

```text
Use case: style-transfer
Asset type: 16:9 website article hero image
Input images: Image 1 is the edit target and exact kettle/composition reference; Image 2 is the rendering-style reference.
Primary request: Redraw the kettle from Image 1 in the rough coal-and-graphite drawing language of Image 2.
Subject: Preserve the Part 1 kettle's wide rounded body, dense arare surface, left-facing spout, high rounded handle, circular patterned lid, floral lid knob, proportions, viewing angle, and left-right orientation.
Style/medium: Dark handmade graphite and charcoal on natural paper-white ground; uneven pressure, imperfect contours, loose cross-hatching, smudged tonal buildup, and visible hand-worked texture. It should feel expressive and materially drawn, not like clean product line art.
Composition/framing: Wide 16:9 landscape; center the full kettle with generous safe margins for a later center crop; keep its visual scale close to Image 1; allow only loose grounding strokes beneath it.
Constraints: Change only the drawing medium and surface treatment. Preserve the subject identity and composition. No text, color, labels, border, watermark, people, additional objects, or cropped handle/spout.
Avoid: polished technical illustration, vector-clean contours, photorealism, gray gradient backdrop, decorative scene elements.
```

- [ ] **Step 3: Save and normalize the selected result**

Copy the returned artifact to `tmp/imagegen/tetsubin-part-1-generated.png`, then run:

```bash
mkdir -p tmp/imagegen
node --input-type=module -e "import sharp from 'sharp'; await sharp('tmp/imagegen/tetsubin-part-1-generated.png').resize(1672, 941, { fit: 'cover', position: 'centre' }).png().toFile('public/tea/posts/tetsubin-history-1-birth-of-the-iron-kettle/hero.png')"
```

- [ ] **Step 4: Verify subject fidelity, style, and dimensions**

Inspect the replacement beside both references. Reject and regenerate with one targeted prompt correction if the spout/handle is cropped, the silhouette changes materially, ornamentation disappears, or the marks remain clean and mechanical.

Run:

```bash
node --input-type=module -e "import sharp from 'sharp'; const m=await sharp('public/tea/posts/tetsubin-history-1-birth-of-the-iron-kettle/hero.png').metadata(); if(m.format!=='png'||m.width!==1672||m.height!==941) process.exit(1); console.log(m.format,m.width,m.height)"
```

Expected: `png 1672 941`.

- [ ] **Step 5: Commit Part 1**

```bash
git add public/tea/posts/tetsubin-history-1-birth-of-the-iron-kettle/hero.png
git commit -m "art(tea): redraw tetsubin part 1 hero in graphite"
```

### Task 2: Redraw the Part 2 hero

**Files:**
- Reference: `src/assets/tea/main.png`
- Modify: `public/tea/posts/tetsubin-history-2-morioka/hero.png`
- Temporary: `tmp/imagegen/tetsubin-part-2-generated.png`

**Interfaces:**
- Consumes: the current Part 2 hero as the subject/composition reference and `src/assets/tea/main.png` as the style reference.
- Produces: a valid 1672×941 Part 2 `hero.png` at the unchanged public path.

- [ ] **Step 1: Inspect both input images at original detail**

Confirm the Part 2 subject is the broad, low kettle with a high rounded handle, long left-facing spout, banded body, wave ornament, textured lower body, and floral lid knob.

- [ ] **Step 2: Generate a style-transfer replacement**

Use the built-in image-generation tool with the Part 2 hero as Image 1 and `src/assets/tea/main.png` as Image 2:

```text
Use case: style-transfer
Asset type: 16:9 website article hero image
Input images: Image 1 is the edit target and exact kettle/composition reference; Image 2 is the rendering-style reference.
Primary request: Redraw the kettle from Image 1 in the rough coal-and-graphite drawing language of Image 2.
Subject: Preserve the Part 2 kettle's broad low body, long left-facing spout, high rounded handle, circular lid, floral lid knob, horizontal bands, wave ornament, textured lower body, proportions, viewing angle, and left-right orientation.
Style/medium: Dark handmade graphite and charcoal on natural paper-white ground; uneven pressure, imperfect contours, loose cross-hatching, smudged tonal buildup, and visible hand-worked texture. It should feel expressive and materially drawn, not like clean product line art.
Composition/framing: Wide 16:9 landscape; center the full kettle with generous safe margins for a later center crop; keep its visual scale close to Image 1; allow only loose grounding strokes beneath it.
Constraints: Change only the drawing medium and surface treatment. Preserve the subject identity and composition. No text, color, labels, border, watermark, people, additional objects, or cropped handle/spout.
Avoid: polished technical illustration, vector-clean contours, photorealism, gray gradient backdrop, decorative scene elements.
```

- [ ] **Step 3: Save and normalize the selected result**

Copy the returned artifact to `tmp/imagegen/tetsubin-part-2-generated.png`, then run:

```bash
node --input-type=module -e "import sharp from 'sharp'; await sharp('tmp/imagegen/tetsubin-part-2-generated.png').resize(1672, 941, { fit: 'cover', position: 'centre' }).png().toFile('public/tea/posts/tetsubin-history-2-morioka/hero.png')"
```

- [ ] **Step 4: Verify subject fidelity, style, and dimensions**

Inspect the replacement beside both references. Reject and regenerate with one targeted correction if the broad low profile, wave band, lid, spout, or handle drifts.

```bash
node --input-type=module -e "import sharp from 'sharp'; const m=await sharp('public/tea/posts/tetsubin-history-2-morioka/hero.png').metadata(); if(m.format!=='png'||m.width!==1672||m.height!==941) process.exit(1); console.log(m.format,m.width,m.height)"
```

Expected: `png 1672 941`.

- [ ] **Step 5: Commit Part 2**

```bash
git add public/tea/posts/tetsubin-history-2-morioka/hero.png
git commit -m "art(tea): redraw tetsubin part 2 hero in graphite"
```

### Task 3: Redraw the Part 3 hero

**Files:**
- Reference: `src/assets/tea/main.png`
- Modify: `public/tea/posts/tetsubin-history-3-mizusawa-oshu/hero.png`
- Temporary: `tmp/imagegen/tetsubin-part-3-generated.png`

**Interfaces:**
- Consumes: the current Part 3 hero as the subject/composition reference and `src/assets/tea/main.png` as the style reference.
- Produces: a valid 1672×941 Part 3 `hero.png` at the unchanged public path.

- [ ] **Step 1: Inspect both input images at original detail**

Confirm the Part 3 subject is the taller domed arare kettle with a left-facing spout, high rounded handle, arare lid, floral lid knob, and repeating arch ornament around the lower band.

- [ ] **Step 2: Generate a style-transfer replacement**

Use the built-in image-generation tool with the Part 3 hero as Image 1 and `src/assets/tea/main.png` as Image 2:

```text
Use case: style-transfer
Asset type: 16:9 website article hero image
Input images: Image 1 is the edit target and exact kettle/composition reference; Image 2 is the rendering-style reference.
Primary request: Redraw the kettle from Image 1 in the rough coal-and-graphite drawing language of Image 2.
Subject: Preserve the Part 3 kettle's tall domed arare body, left-facing spout, high rounded handle, arare lid, floral lid knob, repeating arch ornament around the lower band, proportions, viewing angle, and left-right orientation.
Style/medium: Dark handmade graphite and charcoal on natural paper-white ground; uneven pressure, imperfect contours, loose cross-hatching, smudged tonal buildup, and visible hand-worked texture. It should feel expressive and materially drawn, not like clean product line art.
Composition/framing: Wide 16:9 landscape; center the full kettle with generous safe margins for a later center crop; keep its visual scale close to Image 1; allow only loose grounding strokes beneath it.
Constraints: Change only the drawing medium and surface treatment. Preserve the subject identity and composition. No text, color, labels, border, watermark, people, additional objects, or cropped handle/spout.
Avoid: polished technical illustration, vector-clean contours, photorealism, gray gradient backdrop, decorative scene elements.
```

- [ ] **Step 3: Save and normalize the selected result**

Copy the returned artifact to `tmp/imagegen/tetsubin-part-3-generated.png`, then run:

```bash
node --input-type=module -e "import sharp from 'sharp'; await sharp('tmp/imagegen/tetsubin-part-3-generated.png').resize(1672, 941, { fit: 'cover', position: 'centre' }).png().toFile('public/tea/posts/tetsubin-history-3-mizusawa-oshu/hero.png')"
```

- [ ] **Step 4: Verify subject fidelity, style, and dimensions**

Inspect the replacement beside both references. Reject and regenerate with one targeted correction if the domed proportions, repeating lower ornament, lid, spout, or handle drifts.

```bash
node --input-type=module -e "import sharp from 'sharp'; const m=await sharp('public/tea/posts/tetsubin-history-3-mizusawa-oshu/hero.png').metadata(); if(m.format!=='png'||m.width!==1672||m.height!==941) process.exit(1); console.log(m.format,m.width,m.height)"
```

Expected: `png 1672 941`.

- [ ] **Step 5: Commit Part 3**

```bash
git add public/tea/posts/tetsubin-history-3-mizusawa-oshu/hero.png
git commit -m "art(tea): redraw tetsubin part 3 hero in graphite"
```

### Task 4: Redraw the Part 4 hero

**Files:**
- Reference: `src/assets/tea/main.png`
- Modify: `public/tea/posts/tetsubin-history-4-yamagata/hero.png`
- Temporary: `tmp/imagegen/tetsubin-part-4-generated.png`

**Interfaces:**
- Consumes: the current Part 4 hero as the subject/composition reference and `src/assets/tea/main.png` as the style reference.
- Produces: a valid 1672×941 Part 4 `hero.png` at the unchanged public path.

- [ ] **Step 1: Inspect both input images at original detail**

Confirm the Part 4 subject is the upright kettle with a tall rounded handle, upturned left-facing spout, domed arare body, elaborate lid, floral lid knob, and scrolling lower ornament.

- [ ] **Step 2: Generate a style-transfer replacement**

Use the built-in image-generation tool with the Part 4 hero as Image 1 and `src/assets/tea/main.png` as Image 2:

```text
Use case: style-transfer
Asset type: 16:9 website article hero image
Input images: Image 1 is the edit target and exact kettle/composition reference; Image 2 is the rendering-style reference.
Primary request: Redraw the kettle from Image 1 in the rough coal-and-graphite drawing language of Image 2.
Subject: Preserve the Part 4 kettle's upright proportions, tall rounded handle, upturned left-facing spout, domed arare body, elaborate lid, floral lid knob, scrolling lower ornament, viewing angle, and left-right orientation.
Style/medium: Dark handmade graphite and charcoal on natural paper-white ground; uneven pressure, imperfect contours, loose cross-hatching, smudged tonal buildup, and visible hand-worked texture. It should feel expressive and materially drawn, not like clean product line art.
Composition/framing: Wide 16:9 landscape; center the full kettle with generous safe margins for a later center crop; keep its visual scale close to Image 1; allow only loose grounding strokes beneath it.
Constraints: Change only the drawing medium and surface treatment. Preserve the subject identity and composition. No text, color, labels, border, watermark, people, additional objects, or cropped handle/spout.
Avoid: polished technical illustration, vector-clean contours, photorealism, gray gradient backdrop, decorative scene elements.
```

- [ ] **Step 3: Save and normalize the selected result**

Copy the returned artifact to `tmp/imagegen/tetsubin-part-4-generated.png`, then run:

```bash
node --input-type=module -e "import sharp from 'sharp'; await sharp('tmp/imagegen/tetsubin-part-4-generated.png').resize(1672, 941, { fit: 'cover', position: 'centre' }).png().toFile('public/tea/posts/tetsubin-history-4-yamagata/hero.png')"
```

- [ ] **Step 4: Verify subject fidelity, style, and dimensions**

Inspect the replacement beside both references. Reject and regenerate with one targeted correction if the upright silhouette, scrolling lower band, elaborate lid, spout, or handle drifts.

```bash
node --input-type=module -e "import sharp from 'sharp'; const m=await sharp('public/tea/posts/tetsubin-history-4-yamagata/hero.png').metadata(); if(m.format!=='png'||m.width!==1672||m.height!==941) process.exit(1); console.log(m.format,m.width,m.height)"
```

Expected: `png 1672 941`.

- [ ] **Step 5: Commit Part 4**

```bash
git add public/tea/posts/tetsubin-history-4-yamagata/hero.png
git commit -m "art(tea): redraw tetsubin part 4 hero in graphite"
```

### Task 5: Validate the complete asset set and rendered pages

**Files:**
- Verify: all four Tetsubin History `hero.png` files.
- Verify unchanged: application source, content, frontmatter, routes, and styles.

**Interfaces:**
- Consumes: the four normalized hero assets from Tasks 1–4.
- Produces: a verified production build and visual confirmation of both card and article contexts.

- [ ] **Step 1: Validate all four image contracts together**

Run:

```bash
node --input-type=module -e "import sharp from 'sharp'; const files=['public/tea/posts/tetsubin-history-1-birth-of-the-iron-kettle/hero.png','public/tea/posts/tetsubin-history-2-morioka/hero.png','public/tea/posts/tetsubin-history-3-mizusawa-oshu/hero.png','public/tea/posts/tetsubin-history-4-yamagata/hero.png']; for (const f of files) { const m=await sharp(f).metadata(); if(m.format!=='png'||m.width!==1672||m.height!==941) throw new Error(f+' '+JSON.stringify(m)); console.log(f,m.format,m.width,m.height); }"
```

Expected: four lines ending in `png 1672 941`.

- [ ] **Step 2: Run the complete automated verification suite**

```bash
npm test
```

Expected: the Astro production build succeeds and every Node test passes.

- [ ] **Step 3: Start the local site for visual QA**

```bash
npm run dev -- --host 127.0.0.1
```

Keep the process running while completing Step 4.

- [ ] **Step 4: Inspect rendered pages at desktop and mobile widths**

Use the in-app browser workflow to inspect:

```text
http://127.0.0.1:4321/tea/tetsubins/
http://127.0.0.1:4321/tea/tetsubin-history-1-birth-of-the-iron-kettle/
```

At approximately 1440px and 390px viewport widths, confirm:

- every Tetsubins card image renders with the new graphite artwork;
- the featured Part 4 card is sharp, centered, and uncropped;
- the two-column and mobile single-column card layouts are unchanged;
- the Part 1 article hero is sharp, centered, and uncropped;
- titles, dates, descriptions, spacing, and navigation are unchanged.

- [ ] **Step 5: Confirm change scope**

```bash
git status --short
git diff --name-only HEAD~4..HEAD
```

Expected: the four hero paths are the only implementation files changed after the already committed design and plan documentation. `tmp/imagegen/` remains untracked or ignored and is not staged.

- [ ] **Step 6: Record the final prompts and paths in the handoff**

Report that built-in image generation was used, link the four final workspace paths, and include the four prompt specs from Tasks 1–4. Do not claim completion unless the metadata checks, `npm test`, and visual QA all pass.

## Plan self-review

- Spec coverage: Tasks 1–4 cover each authorized asset, visual invariants, style matching, file path stability, dimensions, and format. Task 5 covers automated and visual verification plus change-scope enforcement.
- Placeholder scan: the plan contains no deferred implementation instructions; the runtime-generated source path is captured to a fixed temporary destination immediately after each tool call.
- Interface consistency: every task consumes the same style reference and its own current hero, produces the same 1672×941 PNG contract, and retains the exact path already consumed by Astro.
