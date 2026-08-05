# Tetsubin Series Regional and Workshop Structure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give Parts 1–3 one shared regional map and rewrite Parts 2–3 around clear, consistent workshop profiles in simple language.

**Architecture:** Keep the series as Markdown posts with static media. Add one shared SVG map under a series-level public directory, reuse existing workshop work and mark images, and add only the missing Oigen/Oitomi evidence needed for the Part 3 profiles.

**Tech Stack:** Astro content collections, Markdown with embedded HTML figures, static SVG/JPG/PNG assets, Git, GitHub MCP.

## Global Constraints

- Mark only Morioka, Mizusawa (present-day Ōshū), Yamagata, Kyoto–Ōmi, and Takaoka on the shared map.
- Explain Nambu ironware as a craft name covering Morioka and Mizusawa/Ōshū, not a place.
- Prefer short sentences, common words, and paragraphs focused on one idea.
- Keep workshop sections substantial; do not create many small headings.
- Remove generic identification checklists and repeated closing summaries; keep only workshop-specific pattern, construction, and mark guidance.
- Do not publish licensing, reuse, cropping, resizing, or recompression commentary.
- Do not use `figure-scroll` in Parts 1–3.
- Do not present patterns or seals as stronger evidence than the sources support.

---

### Task 1: Add the shared regional map

**Files:**
- Create: `public/tea/posts/tetsubin-history/japan-regional-centers.svg`

**Interfaces:**
- Consumes: the existing blank Japan map from `Regions and Prefectures of Japan - blank.svg` on Wikimedia Commons.
- Produces: one readable SVG referenced by Parts 1–3.

- [ ] **Step 1: Download the blank SVG**

Download the original SVG from the Commons file page and save it temporarily outside the repository.

Run:

```bash
curl -Ls 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Regions_and_Prefectures_of_Japan_-_blank.svg' -o /tmp/tetsubin-japan-blank.svg
file /tmp/tetsubin-japan-blank.svg
```

Expected: SVG image data.

- [ ] **Step 2: Create the annotated map**

Copy the existing geographic paths into `japan-regional-centers.svg`. Add five large markers and labels: `Morioka`, `Mizusawa (Ōshū)`, `Yamagata`, `Takaoka`, and `Kyoto–Ōmi`. Add a small note joining Morioka and Mizusawa under modern Nambu ironware. Keep the original viewBox and make every label readable when the SVG is rendered at 720px wide.

- [ ] **Step 3: Verify the map**

Render it with the installed `sharp` package and inspect the PNG.

```bash
node -e "require('sharp')('public/tea/posts/tetsubin-history/japan-regional-centers.svg').png().toFile('/tmp/tetsubin-regions.png')"
file /tmp/tetsubin-regions.png
```

Expected: a readable map with five regional labels and no clipped text.

- [ ] **Step 4: Commit the map**

```bash
git add public/tea/posts/tetsubin-history/japan-regional-centers.svg
git commit -m "feat(tea): add shared tetsubin regions map"
```

### Task 2: Simplify the Part 1 regional overview

**Files:**
- Modify: `src/content/tea/tetsubin-history-1-birth-of-the-iron-kettle.md`

**Interfaces:**
- Consumes: `japan-regional-centers.svg` from Task 1.
- Produces: the series-wide geography explanation used by Parts 2–3.

- [ ] **Step 1: Rewrite the regional section**

Keep `## One Country, Several Casting Histories`. Explain each of the five centers in two or three short sentences. State clearly that Morioka and Mizusawa have different histories but now share the Nambu ironware name.

- [ ] **Step 2: Insert the shared map**

Use ordinary centered figure markup and the path `/tea/posts/tetsubin-history/japan-regional-centers.svg`. The caption should say that the five centers anchor the regional articles and that Nambu ironware covers Morioka and Mizusawa/Ōshū.

- [ ] **Step 3: Remove duplicated and process-heavy media commentary**

Remove the Morioka display photo from the regional section. Remove the sentence about workshop photo reuse permission from `How a Tetsubin Is Made`. Remove `How to Read the Rest of This Series`, including its generic checklist and repeated conclusion. Keep useful source links and historical claims.

- [ ] **Step 4: Run focused checks**

```bash
rg -n 'japan-regional-centers|Morioka|Mizusawa|Yamagata|Takaoka|Kyoto' src/content/tea/tetsubin-history-1-birth-of-the-iron-kettle.md
rg -ni 'licen[cs]|reuse|cropp|resiz|recompress|figure-scroll' src/content/tea/tetsubin-history-1-birth-of-the-iron-kettle.md
```

Expected: all five centers and the shared map are present; the second command has no matches.

- [ ] **Step 5: Commit Part 1**

```bash
git add src/content/tea/tetsubin-history-1-birth-of-the-iron-kettle.md
git commit -m "edit(tea): clarify tetsubin regional centers"
```

### Task 3: Align the Part 2 workshop profiles

**Files:**
- Modify: `src/content/tea/tetsubin-history-2-morioka.md`

**Interfaces:**
- Consumes: the shared map and existing Suzuki, Kunzan, Iwachu, and Kamasada work and mark images.
- Produces: four consistent Morioka workshop profiles.

- [ ] **Step 1: Tighten the opening and regional history**

Open with a plain link to Part 1, introduce Morioka, and insert the shared map. Keep the conflicting 1625/1641 dates in one short paragraph. Keep `How Morioka Makes a Kettle`, but shorten the process explanation to the facts needed for later identification.

- [ ] **Step 2: Rewrite the four workshop sections**

Keep these `##` headings:

```markdown
## Suzuki Morihisa: The Domain Lineage
## Kunzan: A Branch Becomes Its Own Workshop
## Iwachu: Craft at Industrial Scale
## Kamasada: One Maker, One Kettle
```

Within each section, order the prose as location, short history, distinctive work, pattern or construction clues, then seal. Keep the existing work-and-mark studio gallery immediately after the related explanation.

- [ ] **Step 3: Simplify identification language and captions**

State what each documented seal reads and where it is usually found. Where evidence is incomplete, use one plain sentence. Remove licensing and image-processing language from all captions.

- [ ] **Step 4: Keep only useful supporting material**

Keep videos only when they directly show the workshop or its process. Remove `What the Four Workshops Show`; the workshop profiles already make those comparisons.

- [ ] **Step 5: Run focused checks**

```bash
rg -n '^## |japan-regional-centers|studio-gallery' src/content/tea/tetsubin-history-2-morioka.md
rg -ni 'licen[cs]|reuse|cropp|resiz|recompress|figure-scroll' src/content/tea/tetsubin-history-2-morioka.md
```

Expected: map plus four workshop sections and four studio galleries; no banned process language.

- [ ] **Step 6: Commit Part 2**

```bash
git add src/content/tea/tetsubin-history-2-morioka.md
git commit -m "edit(tea): align Morioka workshop profiles"
```

### Task 4: Rebuild Part 3 around Mizusawa workshops

**Files:**
- Modify: `src/content/tea/tetsubin-history-3-mizusawa-oshu.md`
- Create only if supported: `public/tea/posts/tetsubin-history-3-mizusawa-oshu/oigen-mark.jpg`
- Create only if supported: `public/tea/posts/tetsubin-history-3-mizusawa-oshu/oitomi-work-2.jpg`
- Create only if supported: `public/tea/posts/tetsubin-history-3-mizusawa-oshu/oitomi-mark.jpg`

**Interfaces:**
- Consumes: the shared map, existing Oigen/Oitomi work images, and official workshop pages.
- Produces: two consistent Mizusawa workshop profiles without duplicated Morioka coverage.

- [ ] **Step 1: Research only the missing visual evidence**

Check official Oigen and Oitomi product/history pages for one clear Oigen kettle mark, a second representative Oitomi work, and an Oitomi kettle mark. Add an image only when the page clearly connects it to the workshop and object. If Oitomi does not publish a dependable kettle mark, do not add one.

- [ ] **Step 2: Rewrite the opening and regional history**

Explain that Mizusawa is now part of Ōshū. Insert the shared map. Reduce Morioka to one short comparison paragraph and a Part 2 link. Remove the Suzuki/Morioka kettle figure. Keep only the Mizusawa history needed to explain its practical casting tradition and the later Nambu umbrella.

- [ ] **Step 3: Rewrite the Oigen profile**

Order the section as location, short history, factory-and-craft difference, representative works, pattern/construction clues, then published marks. Use a studio gallery for the existing Yachigusa and Dragon images, plus a mark image only if Task 4 Step 1 finds one.

- [ ] **Step 4: Rewrite the Oitomi profile**

Order the section as location, short history, family-workshop-and-retailer difference, representative works, pattern/construction clues, then seals. After the process paragraph, embed Oitomi's official production video at `https://www.youtube.com/embed/DsquAxKLeqg` using the existing centered video figure and a short caption below it. Use a studio gallery with the current Ume Maruko image and one additional work if supported. If no dependable kettle seal is published, say so in one sentence.

- [ ] **Step 5: Remove redundant Part 3 diagrams**

Remove `morioka-mizusawa-history.svg` and `oigen-oitomi-comparison.svg` references because the shared map and workshop prose now carry those points. Delete the files only after confirming no article references them.

- [ ] **Step 6: Remove the generic identification conclusion**

Remove `How to Identify a Mizusawa Tetsubin` in full. The Oigen and Oitomi profiles already contain the useful workshop-specific pattern and mark guidance.

- [ ] **Step 7: Run focused checks**

```bash
rg -n '^## |japan-regional-centers|studio-gallery' src/content/tea/tetsubin-history-3-mizusawa-oshu.md
rg -n 'suzuki-tetsubin|morioka-mizusawa-history|oigen-oitomi-comparison' src/content/tea/tetsubin-history-3-mizusawa-oshu.md
rg -ni 'licen[cs]|reuse|cropp|resiz|recompress|figure-scroll' src/content/tea/tetsubin-history-3-mizusawa-oshu.md
```

Expected: map plus Oigen and Oitomi profiles; no Morioka work image, redundant diagram, or banned process language.

- [ ] **Step 8: Commit Part 3**

```bash
git add src/content/tea/tetsubin-history-3-mizusawa-oshu.md public/tea/posts/tetsubin-history-3-mizusawa-oshu
git commit -m "edit(tea): focus Mizusawa workshop profiles"
```

### Task 5: Verify and update PR #43

**Files:**
- Verify: all files changed in Tasks 1–4.
- Modify: PR #43 description if its summary no longer matches the scope.

**Interfaces:**
- Consumes: final Parts 1–3 and their media.
- Produces: a buildable, reviewable draft PR.

- [ ] **Step 1: Check shared structure and assets**

```bash
for post in src/content/tea/tetsubin-history-{1-birth-of-the-iron-kettle,2-morioka,3-mizusawa-oshu}.md; do rg -q 'japan-regional-centers.svg' "$post" || exit 1; done
rg -n 'src="/tea/posts/' src/content/tea/tetsubin-history-{1-birth-of-the-iron-kettle,2-morioka,3-mizusawa-oshu}.md
```

Expected: all posts reference the same map and every local image path resolves.

- [ ] **Step 2: Build from a clean generated-content state**

```bash
npm run build
```

Expected: exit 0 and routes for all three posts.

- [ ] **Step 3: Run final static checks**

```bash
test -f dist/tea/tetsubin-history-1-birth-of-the-iron-kettle/index.html
test -f dist/tea/tetsubin-history-2-morioka/index.html
test -f dist/tea/tetsubin-history-3-mizusawa-oshu/index.html
git diff --check
```

Expected: all commands exit 0.

- [ ] **Step 4: Push and verify through GitHub MCP first**

Push the committed branch, update PR #43's title/body if needed, and verify the MCP comparison against `main` contains only the intended series, media, instructions, spec, and plan files.
