# Tetsubin History Part 3 Style Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn Tetsubin History Part 3 into a direct, readable continuation of Parts 1 and 2 with a new hero, four representative kettle pictures, and two useful diagrams.

**Architecture:** Keep the change inside the existing Markdown post and its public asset directory. Reuse the published Morioka image already on `main`, add three clearly sourced workshop pictures, replace the two retained SVGs with simpler diagrams, and remove every unused Part 3 asset from the PR.

**Tech Stack:** Astro content collections, Markdown with embedded HTML figures, static PNG/JPG/SVG assets, GitHub MCP.

## Global Constraints

- Target 2,600–3,000 words.
- Use six substantial narrative sections with `##` headings; `Sources and Image Credits` is an additional closing section.
- Use short sentences, concrete topic sentences, and direct prose.
- Do not include licensing, reuse-permission, cropping, resizing, recompression, evidence-ceiling, or source-class commentary in the published article.
- Keep source links where factual claims and pictures appear.
- Use the supplied pencil drawing as the hero.
- Include one representative kettle picture for Morioka, Mizusawa, Oigen, and Oitomi.
- Keep only two diagrams, with large text, few labels, centered figure formatting, and no horizontal scrolling.

---

### Task 1: Replace and simplify the visual set

**Files:**
- Create: `public/tea/posts/tetsubin-history-3-mizusawa-oshu/hero.png`
- Create: `public/tea/posts/tetsubin-history-3-mizusawa-oshu/mizusawa-tetsubin.jpg`
- Create: `public/tea/posts/tetsubin-history-3-mizusawa-oshu/oigen-tetsubin.jpg`
- Create: `public/tea/posts/tetsubin-history-3-mizusawa-oshu/oitomi-tetsubin.jpg`
- Modify: `public/tea/posts/tetsubin-history-3-mizusawa-oshu/morioka-mizusawa-history.svg`
- Create: `public/tea/posts/tetsubin-history-3-mizusawa-oshu/oigen-oitomi-comparison.svg`
- Delete: the old Part 3 `hero.jpg`, historical comparison JPGs, utility JPGs, `mizusawa-marks.svg`, and all detailed Oigen/Oitomi evidence SVGs after the rewritten article no longer references them.

**Interfaces:**
- Consumes: supplied `/tmp/pasted-image-1.png`; existing Morioka picture `/tea/posts/tetsubin-history-2-morioka/suzuki-tetsubin.jpg`; official Oigen and Oitomi product pages.
- Produces: seven article visuals—hero, four representative kettle pictures, and two diagrams.

- [ ] **Step 1: Add the supplied hero without altering its composition**

Copy `/tmp/pasted-image-1.png` to `public/tea/posts/tetsubin-history-3-mizusawa-oshu/hero.png` and confirm it is a readable PNG.

Run: `file public/tea/posts/tetsubin-history-3-mizusawa-oshu/hero.png`

Expected: PNG image data.

- [ ] **Step 2: Add three representative workshop pictures**

Use a traditional Oigen kettle made in Ōshū for the general Mizusawa image, Oigen's named Dragon fired-mould kettle for the Oigen section, and Oitomi's Ume Maruko kettle for the Oitomi section. Save each as an article-local JPG with the filenames listed above. Reuse the existing Suzuki Hinomaru image for Morioka instead of duplicating it.

- [ ] **Step 3: Replace the regional-history diagram**

Rewrite `morioka-mizusawa-history.svg` as a simple two-column comparison:

```text
Morioka                         Mizusawa / Ōshū
Nambu domain                    Date domain
Tea kettles and art casting     Pots, cauldrons, daily cast goods
17th-century workshop roots     Medieval tradition; firm record later
                 ↓
1959 federation → 1975 national Nambu ironware designation
```

Use a `1200×720` viewBox, minimum 28px body text, no more than twelve text blocks, and no `figure-scroll` dependency.

- [ ] **Step 4: Create the maker comparison diagram**

Create `oigen-oitomi-comparison.svg` as two columns with three rows:

```text
Oigen                           Oitomi
Large integrated manufacturer  Family workshop and retailer
Several production routes      Integrated in-house route plus named outside makers
Published current marks        Kettle marks not fully documented
```

Use a `1200×640` viewBox, minimum 28px body text, and no evidence badges, source ladders, decision trees, or tiny footnotes.

- [ ] **Step 5: Verify visual scope**

Run: `rg -o '/tea/posts/[^)" ]+' src/content/tea/tetsubin-history-3-mizusawa-oshu.md | sort -u`

Expected after Task 2: exactly the four kettle pictures and two diagrams referenced in the article body; the hero is referenced from front matter.

### Task 2: Rewrite the article as a direct narrative

**Files:**
- Modify: `src/content/tea/tetsubin-history-3-mizusawa-oshu.md`

**Interfaces:**
- Consumes: the verified historical claims and source links in the current article; the seven visuals from Task 1.
- Produces: a 2,600–3,000-word Part 3 post using the same structure and voice as Parts 1 and 2.

- [ ] **Step 1: Align front matter and opening**

Use multiline categories, `hero.png`, and this title and description:

```yaml
title: "Tetsubin History, Part 3: Mizusawa and Ōshū"
description: "Mizusawa grew from a practical casting town into the second great center of Nambu ironware. Oigen and Oitomi show how that tradition still changes."
```

Open with two plain paragraphs linking Part 2 to Mizusawa. Do not use an info box.

- [ ] **Step 2: Build six substantial sections**

Use these exact headings:

```markdown
## Mizusawa Before the Nambu Name
## A Casting Town Built on Everyday Work
## How Two Traditions Became Nambu Ironware
## Oigen: Craft Inside a Modern Factory
## Oitomi: Workshop, Shop, and Maker
## How to Read a Mizusawa Kettle
## Sources and Image Credits
```

Keep the twelfth-century claim qualified in one sentence, explain Date-versus-Nambu patronage once, and remove repeated warnings.

- [ ] **Step 3: Place the four kettle pictures and two diagrams**

Use ordinary `<figure class="figure-center">` markup. Put the Morioka and Mizusawa pictures around the regional comparison, the Oigen and Oitomi pictures in their maker sections, and each diagram immediately after the prose it summarizes. Captions must name the object, explain its relevance in one sentence, and link the source.

- [ ] **Step 4: Remove dossier language**

Run:

```bash
rg -n 'evidence ceiling|source class|reuse permission|license|licence|cropp|recompress|Open the evidence|zero verified|documented device families' src/content/tea/tetsubin-history-3-mizusawa-oshu.md
```

Expected: no matches.

- [ ] **Step 5: Verify readable structure**

Run:

```bash
wc -w src/content/tea/tetsubin-history-3-mizusawa-oshu.md
rg -n '^### ' src/content/tea/tetsubin-history-3-mizusawa-oshu.md
rg -n '^## ' src/content/tea/tetsubin-history-3-mizusawa-oshu.md
```

Expected: 2,600–3,000 words, no `###` headings, and the seven `##` headings listed above.

### Task 3: Remove dead assets, validate, and update the draft PR

**Files:**
- Delete: every file under `public/tea/posts/tetsubin-history-3-mizusawa-oshu/` not referenced by the final post or front matter.
- Modify: draft PR #43 metadata only if its summary no longer matches the final visual scope.

**Interfaces:**
- Consumes: final article and assets from Tasks 1–2.
- Produces: a clean, buildable PR containing no unused Part 3 media.

- [ ] **Step 1: Confirm deleted assets are unreferenced**

For each removal candidate, run `rg -n '<filename>' src public docs` and delete only when there is no final article reference.

- [ ] **Step 2: Run the content build**

Run: `npm run build`

Expected: exit 0 and a generated `dist/tea/tetsubin-history-3-mizusawa-oshu/index.html`.

- [ ] **Step 3: Run final static checks**

```bash
test -f dist/tea/tetsubin-history-3-mizusawa-oshu/index.html
git diff --check
```

Expected: both commands exit 0.

- [ ] **Step 4: Commit through GitHub MCP**

Create one commit on `agent/tetsubin-history-part-3` named `edit(tea): simplify tetsubin history part 3`, update the branch ref without force, and verify the MCP comparison against `main` contains only Part 3, `AGENTS.md`, and the approved spec/plan files.

- [ ] **Step 5: Verify the draft PR**

Confirm PR #43 remains open and draft, lists the intended final filenames, and points at the new head commit.
