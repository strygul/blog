# Tetsubin History Series Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a six-part, source-led, image-rich tea series covering tetsubin history, five regional traditions, fifteen representative producers, and documented maker-mark identification.

**Architecture:** Each article is one Astro content-collection Markdown file with its own local asset directory. Two shared Markdown ledgers hold claim evidence and image rights/provenance; each post task adds its research and assets before drafting, then leaves a buildable, independently reviewable article. Existing `info-box`, `figure-center`, `image-gallery`, and table styles handle presentation; original comparisons are plain SVG files.

**Tech Stack:** Astro 5.15 content collections, Markdown with embedded HTML, local JPEG/PNG assets, hand-authored SVG, existing `sharp` dependency for image conversion, `npm run build`, and browser-based desktop/mobile visual verification.

## Global Constraints

- Read the approved spec first: `docs/superpowers/specs/2026-07-31-tetsubin-history-series-design.md`.
- Match the voice of `src/content/tea/clay-within-clay-jiani-and-nenni.md`: factual, direct, skeptical, readable, and explicit about uncertainty.
- HOJO is an important source, not the outline or sole evidence base. Cross-check historical, scientific, superlative, and attribution claims.
- Every selected producer gets the same six profile units: chronology, process, visual language, representative objects, maker identification, and evidence-based distinction.
- Target 600–900 words and 6–10 useful images per producer, including at least two documented mark examples when surviving evidence permits.
- Do not manufacture equality by inventing evidence. If secure mark examples or dates are unavailable, say so in the post and ledger.
- Use “stamp” only as reader shorthand; name the actual mark method when known: cast, impressed, engraved, chiseled, lid inscription, box inscription, label, or certificate.
- A mark example must include the complete associated kettle, original characters, reading, location, method, evidence source, date range or “range not established,” and confidence: `documented`, `strongly attributed`, or `uncertain`.
- State that lids, handles, boxes, and certificates can be replacements; a signed lid does not authenticate the body; copied marks exist; unmarked work exists; style alone does not prove origin.
- Use Japanese characters, romanization, and plain-English definitions on first use.
- Borrowed images must be local, credited in captions, linked to the source, and logged in `docs/research/tetsubin-series-images.md`.
- Preserve mark legibility. Do not crop away inscriptions, accession numbers, or identifying construction details.
- Do not claim that a particular iron recipe, porosity, oxidation state, region, or workshop objectively makes better water.
- Do not add dependencies, components, or speculative CSS. Reuse the blog’s existing Markdown and figure patterns.
- Initial draft date for all six posts is `2026-07-31`; all use categories `Tea`, `Teapots`, `Tetsubin`, and `Japanese Craft`.
- Before each commit: run `npm run build`, confirm the route exists under `dist/tea/<slug>/index.html`, and run `git diff --check` on files touched by that task.
- Do not stage or modify the user’s unrelated untracked files.

## File Map

**Shared evidence:**

- Create: `docs/research/tetsubin-series-sources.md` — claim-by-claim evidence matrix.
- Create: `docs/research/tetsubin-series-images.md` — image provenance, rights, and credit ledger.

**Posts and assets:**

- Create: `src/content/tea/tetsubin-history-1-birth-of-the-iron-kettle.md`
- Create: `public/tea/posts/tetsubin-history-1-birth-of-the-iron-kettle/`
- Create: `src/content/tea/tetsubin-history-2-morioka.md`
- Create: `public/tea/posts/tetsubin-history-2-morioka/`
- Create: `src/content/tea/tetsubin-history-3-mizusawa-oshu.md`
- Create: `public/tea/posts/tetsubin-history-3-mizusawa-oshu/`
- Create: `src/content/tea/tetsubin-history-4-yamagata.md`
- Create: `public/tea/posts/tetsubin-history-4-yamagata/`
- Create: `src/content/tea/tetsubin-history-5-kyoto-kansai.md`
- Create: `public/tea/posts/tetsubin-history-5-kyoto-kansai/`
- Create: `src/content/tea/tetsubin-history-6-takaoka.md`
- Create: `public/tea/posts/tetsubin-history-6-takaoka/`

**Existing files:** no modification expected. Modify `src/styles/blog-post.css` only if browser verification proves an existing class cannot render a required comparison accessibly.

## Research and Writing Checks

This is a writing project, so prose does not have unit tests. Each task’s runnable checks are the Astro build, route existence, missing-asset scan, word count, and targeted `rg` audits. The content gate is the exact checklist in the task plus a ledger row for every precise date, succession, named technique, and mark attribution.

The sources ledger uses this schema:

```markdown
| ID | Post | Claim or topic | Source and URL | Source class | Supporting evidence or page | Confidence | Used in section |
| --- | --- | --- | --- | --- | --- | --- | --- |
```

The image ledger uses this schema:

```markdown
| Post | Local filename | Subject / maker | Original URL | Creator / institution | Rights or permission status | Required credit line | Accessed | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
```

Use asset names consistently:

- `<maker>-object-01.jpg`
- `<maker>-process-01.jpg`
- `<maker>-detail-01.jpg`
- `<maker>-mark-01.jpg`
- `<maker>-mark-01-context.jpg`
- `hero.jpg`
- descriptive kebab-case names for original SVGs.

---

### Task 1: Establish the Evidence and Image Ledgers

**Files:**

- Create: `docs/research/tetsubin-series-sources.md`
- Create: `docs/research/tetsubin-series-images.md`

**Interfaces:**

- Consumes: the approved design spec and all source URLs listed below.
- Produces: the table schemas and evidence rules every post task appends to.

- [ ] **Step 1: Create the research directory and both ledgers**

Create `docs/research/` if absent. Give each ledger a title, the schema above, the access date `2026-07-31`, and these rules: paraphrase evidence rather than copying long passages; record conflicts as separate rows; distinguish institutional, government/association, curator/research, workshop, retailer, and auction sources.

- [ ] **Step 2: Seed the sources ledger with the cross-series sources**

Record these exact starting sources and their roles:

```text
https://researcharchive.calacademy.org/research/anthropology/tetsubin/hist.html
  Role: object history; sencha relationship; tetsubin/chagama distinction; uncertainty around exact origin.

https://kougeihin.jp/craft/0701/
  Role: Nambu designation, techniques, Morioka/Ōshū convergence, 18th-century origin framing.

https://kougeihin.jp/en/craft/0702/
  Role: Yamagata regional history, features, techniques, and official designation.

https://kougeihin.jp/en/craft/0708/
  Role: Takaoka history, distributed production network, lost-wax work, engraving, inlay, and coloring.

https://artsandculture.google.com/story/nambu-tekki-kyoto-women-s-university/UAWBPlRYx2bcKA?hl=en
  Role: curator-supervised Nambu history, objects, design books, moulds, and process photography.

https://www.gov-online.go.jp/eng/publicity/book/hlj/html/202402/202402_02_en.html
  Role: current Nambu overview, Morioka/Ōshū scope, process imagery; treat taste/health statements as attributed claims.

https://artmuseum.princeton.edu/art/collections/objects/135940
  Role: public-domain Ryūbundō object, chronology, inscription, and image.

https://www.britishmuseum.org/collection/object/A_1969-0925-1-a-b
  Role: Ryūbundō-attributed object, gold/silver inlay, lid-signature warning.

https://asia-archive.si.edu/object/FSC-M-30a-b
  Role: CC0 historical tetsubin object and IIIF imagery.

https://www.rca.ac.uk/research-innovation/projects/tetsubin-project/
  Role: institutional research on contemporary Morioka and Kyoto production.

https://hojotea.com/categ_e/tetsubin.htm
https://hojotea.com/item_e/suzuki.htm
https://hojotea.com/item_e/kunzan.htm
https://hojotea.com/item_e/seikodo.htm
  Role: supplied starting point, workshop observations, comparisons, and selected images; not sole authority.
```

- [ ] **Step 3: Record the binding corrections as evidence conflicts**

Add separate ledger rows for these claims and conflicts:

```text
Tetsubin: no secure 16th-century invention date; likely 18th-century emergence associated with sencha.
Chanoyu: formal water vessel is the spoutless chagama; do not call tetsubin its standard kettle.
Nambu: modern designation includes historically separate Morioka and Mizusawa/Ōshū traditions.
Suzuki Morihisa: currently 16th generation; 13th was not a Living National Treasure.
Seikodo: documented starting date 1735, not the vague “1600s.”
Ryūbundō: exact 1764 claim conflicts with museum chronology; present conflict, not false precision.
Kyoto: production did not simply vanish; document Unshikidō revival and qualify continuity.
```

- [ ] **Step 4: Create the empty image ledger with rights vocabulary**

Use only these status values so later audits are mechanical:

```text
public domain
CC0
licensed reuse
permission granted
credit requested / permission unconfirmed
original SVG
```

- [ ] **Step 5: Verify the ledgers are structurally complete**

Run:

```bash
rg -n '^\| ID \| Post|^\| Post \| Local filename|permission unconfirmed|Tetsubin: no secure' docs/research/tetsubin-series-*.md
git diff --check -- docs/research/tetsubin-series-*.md
```

Expected: both table headers, the permission vocabulary, and binding-correction rows are present; no whitespace errors.

- [ ] **Step 6: Commit**

```bash
git add docs/research/tetsubin-series-sources.md docs/research/tetsubin-series-images.md
git commit -m "docs(tea): start tetsubin research and image ledgers"
```

---

### Task 2: Publish Part 1 — The Birth of the Tetsubin

**Files:**

- Create: `src/content/tea/tetsubin-history-1-birth-of-the-iron-kettle.md`
- Create: `public/tea/posts/tetsubin-history-1-birth-of-the-iron-kettle/hero.jpg`
- Create: `public/tea/posts/tetsubin-history-1-birth-of-the-iron-kettle/tetsubin-object-types.svg`
- Create: `public/tea/posts/tetsubin-history-1-birth-of-the-iron-kettle/tetsubin-history-timeline.svg`
- Create: `public/tea/posts/tetsubin-history-1-birth-of-the-iron-kettle/tetsubin-regions-map.svg`
- Create: `public/tea/posts/tetsubin-history-1-birth-of-the-iron-kettle/tetsubin-casting-process.svg`
- Create: additional locally stored photographs in the same directory.
- Modify: `docs/research/tetsubin-series-sources.md`
- Modify: `docs/research/tetsubin-series-images.md`

**Interfaces:**

- Consumes: Task 1 ledgers and source hierarchy.
- Produces: terminology and history used by every regional post; exact next-link target `/tea/tetsubin-history-2-morioka`.

- [ ] **Step 1: Build the Part 1 claim pack in the sources ledger**

Record evidence for: definitions of *chagama*, *tedorikama*, tetsubin, and enamelled iron kyūsu; sencha’s 17th-century arrival and 18th-century spread; uncertainty around the first tetsubin; the late Edo/Meiji transition; each region’s casting history versus its tetsubin history; common casting sequence. Treat Koizumi Nizaemon’s circa-1750 invention as a regional tradition unless a contemporaneous record is found.

- [ ] **Step 2: Acquire and log 12–18 informative images**

Use at minimum: one Smithsonian CC0 object; the Princeton public-domain Ryūbundō object; one British Museum object; two Kyoto Women’s University/Iwate Museum of Art historical or process images; one government/association process photograph; one properly licensed historical sencha or hearth image. Log rights and credits before embedding. Use an institutional download or IIIF endpoint, not screenshots of web pages.

- [ ] **Step 3: Author the four SVGs**

Use `viewBox="0 0 1200 700"`, a paper background `#faf8f4`, ink `#2b2b2b`, rust accent `#8b4a32`, muted blue `#496b78`, and the blog’s serif/sans font stack.

Required content:

```text
tetsubin-object-types.svg
  Four labelled silhouettes: chagama; tedorikama; tetsubin; enamelled iron kyūsu.
  Show spout, overhead handle, interior coating, and intended use.

tetsubin-history-timeline.svg
  Two horizontal tracks: “regional casting traditions” and “tetsubin as an object.”
  Mark 12th-century Mizusawa tradition, 17th-century Morioka/Yamagata/Takaoka developments,
  18th-century tetsubin emergence, late Edo/Meiji art-kettle expansion, wartime disruption,
  1975 designations, and present revivals without implying exact invention dates.

tetsubin-regions-map.svg
  Label Morioka, Mizusawa/Ōshū, Yamagata, Kyoto/Ōmi, and Takaoka.
  Include a small legend: original/early center; modern umbrella; historical art-metal center; reinterpretation center.

tetsubin-casting-process.svg
  Design → outer mould → core/nakago → spout mould → casting → mould removal → finishing → handle/lid.
  Flag that mould type, coloring, and rust treatment differ by region/workshop.
```

- [ ] **Step 4: Create the post with this exact frontmatter and section order**

```markdown
---
title: "The Tetsubin Is Younger Than You Think"
pubDate: "2026-07-31"
category:
  - "Tea"
  - "Teapots"
  - "Tetsubin"
  - "Japanese Craft"
description: "The iron-casting traditions are ancient. The familiar Japanese iron kettle is not. A sourced history of how sencha, household life, and regional foundries created the tetsubin."
heroImage: "../../../public/tea/posts/tetsubin-history-1-birth-of-the-iron-kettle/hero.jpg"
---

<div class="info-box">
This series began with four HOJO articles, but the dates and origin stories have been checked against museum catalogues, Japanese government and craft-association records, official workshop histories, and curator-supervised research. Where those sources disagree, I show the disagreement rather than forcing an exact answer. The borrowed photographs are credited in their captions; the maps and diagrams are my own.
</div>

### A kettle with an older shadow

### Four objects that should not share one name

### Sencha and the portable iron kettle

### From household tool to Meiji art object

### One country, several casting histories

### How a tetsubin is made

### How to read the rest of this series

### Sources and image credits
```

- [ ] **Step 5: Draft 2,500–3,500 words and embed every core visual**

Open with the age/history mismatch. Define objects before narrating chronology. Separate evidence from “is said to” tradition. Make the regional map the bridge to Part 2. End with the identification rules and a next link:

```markdown
Next: [Morioka: The Domain Kettle Becomes Nambu Ironware](/tea/tetsubin-history-2-morioka)
```

- [ ] **Step 6: Run the factual and asset audit**

```bash
rg -n 'sixteenth century|16th century|Living National Treasure|standard.*chanoyu|HOJO|is said|uncertain|chagama|kyūsu|sencha' src/content/tea/tetsubin-history-1-birth-of-the-iron-kettle.md
rg -o 'src="[^"]+"' src/content/tea/tetsubin-history-1-birth-of-the-iron-kettle.md
find public/tea/posts/tetsubin-history-1-birth-of-the-iron-kettle -type f -maxdepth 1 -print
wc -w src/content/tea/tetsubin-history-1-birth-of-the-iron-kettle.md
```

Expected: problematic phrases appear only in explicit corrections; every referenced asset exists; word count is in range.

- [ ] **Step 7: Build and verify the route**

```bash
npm run build
test -f dist/tea/tetsubin-history-1-birth-of-the-iron-kettle/index.html
git diff --check -- src/content/tea/tetsubin-history-1-birth-of-the-iron-kettle.md docs/research/tetsubin-series-*.md
```

- [ ] **Step 8: Commit**

```bash
git add src/content/tea/tetsubin-history-1-birth-of-the-iron-kettle.md public/tea/posts/tetsubin-history-1-birth-of-the-iron-kettle docs/research/tetsubin-series-sources.md docs/research/tetsubin-series-images.md
git commit -m "feat(tea): publish tetsubin history series part 1"
```

---

### Task 3: Publish Part 2 — Morioka

**Files:**

- Create: `src/content/tea/tetsubin-history-2-morioka.md`
- Create: `public/tea/posts/tetsubin-history-2-morioka/hero.jpg`
- Create: `public/tea/posts/tetsubin-history-2-morioka/morioka-workshops-comparison.svg`
- Create: `public/tea/posts/tetsubin-history-2-morioka/morioka-marks.svg`
- Create: producer images following the global naming convention.
- Modify: both research ledgers.

**Interfaces:**

- Consumes: Part 1 terminology and exact previous-link target.
- Produces: equal profiles for Suzuki Morihisa, Kunzan, Iwachu, and Kamasada; next-link target `/tea/tetsubin-history-3-mizusawa-oshu`.

- [ ] **Step 1: Add the Morioka evidence pack**

Use and log: Nambu Tekki Association; Traditional Crafts Aoyama Square; Kyoto Women’s University/Iwate Museum of Art visual history; Government of Japan Nambu features; official Suzuki Morihisa history and current 16th-generation page; official Kunzan history at `https://nanbu93.jp/pages/company`; official Iwachu material; official Kamasada material; supplied HOJO Suzuki and Kunzan pages. Independently verify the 1625/1641 Suzuki-family date conflict and describe it rather than silently choosing one.

- [ ] **Step 2: Acquire and log 6–10 images for each producer**

For each of four producers collect: complete kettle portrait; workshop/process image; distinctive surface or construction detail; handle/lid/spout detail; two mark images with their complete-kettle context. Prefer official workshop, museum, government, or curator-supervised sources; use HOJO where its workshop access adds unique evidence.

- [ ] **Step 3: Author both SVGs**

```text
morioka-workshops-comparison.svg
  Four columns with one representative silhouette each.
  Rows: lineage; mould/work organization; typical surface language; lid/handle tendency; documented current status.
  Avoid quality rankings and “best” labels.

morioka-marks.svg
  Best-documented mark for each producer.
  Show characters, romanization, location, method, date/generation range, and confidence.
  Add: “Mark alone is not authentication.”
```

- [ ] **Step 4: Create the exact scaffold**

```markdown
---
title: "Morioka: The Domain Kettle Becomes Nambu Ironware"
pubDate: "2026-07-31"
category: ["Tea", "Teapots", "Tetsubin", "Japanese Craft"]
description: "Four Morioka workshops show how domain-sponsored tea-kettle casting became Nambu ironware: Suzuki Morihisa, Kunzan, Iwachu, and Kamasada."
heroImage: "../../../public/tea/posts/tetsubin-history-2-morioka/hero.jpg"
---

<div class="info-box">HOJO's workshop visits provide useful observations and photographs for Suzuki Morihisa and Kunzan. I have checked the family histories, official titles, present workshop leadership, regional chronology, and production methods against workshop, association, government, museum, and curator-supervised sources. Exact dates and marks are described only as firmly as that evidence allows.</div>

### The domain behind the iron
### The Morioka method
### Suzuki Morihisa
### Identifying Suzuki Morihisa
### Kunzan
### Identifying Kunzan
### Iwachu
### Identifying Iwachu
### Kamasada
### Identifying Kamasada
### Four workshops, one regional name
### Sources and image credits
```

- [ ] **Step 5: Draft 3,500–4,500 words with equal profiles**

Give each producer 600–900 words excluding its mark section; keep the same six profile units. Correct HOJO’s outdated Suzuki generation and honorific. Treat taste claims as attributed observations, not facts. Add navigation:

```markdown
Previous: [The Tetsubin Is Younger Than You Think](/tea/tetsubin-history-1-birth-of-the-iron-kettle)

Next: [Mizusawa: The Other History Inside the Nambu Name](/tea/tetsubin-history-3-mizusawa-oshu)
```

- [ ] **Step 6: Audit equality, marks, and claims**

Confirm each producer has all six profile units, 6–10 images, two mark/context pairs or an explicit evidence-limit note, and comparable word count. Run:

```bash
rg -n '^### (Suzuki Morihisa|Kunzan|Iwachu|Kamasada|Identifying)' src/content/tea/tetsubin-history-2-morioka.md
rg -n '15th generation|Living National Treasure|best|superior|taste of water' src/content/tea/tetsubin-history-2-morioka.md
wc -w src/content/tea/tetsubin-history-2-morioka.md
npm run build
test -f dist/tea/tetsubin-history-2-morioka/index.html
git diff --check -- src/content/tea/tetsubin-history-2-morioka.md docs/research/tetsubin-series-*.md
```

- [ ] **Step 7: Commit**

```bash
git add src/content/tea/tetsubin-history-2-morioka.md public/tea/posts/tetsubin-history-2-morioka docs/research/tetsubin-series-sources.md docs/research/tetsubin-series-images.md
git commit -m "feat(tea): publish tetsubin history series part 2"
```

---

### Task 4: Publish Part 3 — Mizusawa/Ōshū

**Files:**

- Create: `src/content/tea/tetsubin-history-3-mizusawa-oshu.md`
- Create: `public/tea/posts/tetsubin-history-3-mizusawa-oshu/hero.jpg`
- Create: `public/tea/posts/tetsubin-history-3-mizusawa-oshu/morioka-mizusawa-history.svg`
- Create: `public/tea/posts/tetsubin-history-3-mizusawa-oshu/mizusawa-marks.svg`
- Create: Oigen and Oitomi images.
- Modify: both research ledgers.

**Interfaces:**

- Consumes: Part 1’s regional map and Part 2’s Morioka terminology.
- Produces: equal Oigen and Oitomi profiles; next-link target `/tea/tetsubin-history-4-yamagata`.

- [ ] **Step 1: Add the Mizusawa evidence pack**

Use and log: official Iwate tourism history; Ōshū City Traditional Industry Hall/Nambu Ironware Museum; government Nambu overview; Traditional Crafts Aoyama Square; Kyoto Women’s University/Iwate Museum of Art; official Oigen history/process; official Oitomi history/process. Verify separately: 12th-century/Hiraizumi tradition; Date-domain role; Meiji technical exchange; Showa-era umbrella use of “Nambu”; 1975 designation.

- [ ] **Step 2: Acquire and log 6–10 images for each producer**

Use the same object/process/detail/mark/context coverage as Task 3. Add at least two regional historical or museum images showing utilitarian casting rather than only modern product photography.

- [ ] **Step 3: Author both SVGs**

```text
morioka-mizusawa-history.svg
  Parallel timelines, not a winner/older-is-better comparison.
  Mizusawa: Hiraizumi/Ōshū tradition → Date-domain utilitarian casting → Meiji exchange → Nambu umbrella.
  Morioka: 17th-century Nambu patronage → tea kettles → 18th-century tetsubin → institute/revival → Nambu umbrella.

mizusawa-marks.svg
  Oigen and Oitomi documented marks using the global mark fields and warning.
```

- [ ] **Step 4: Create the exact scaffold**

```markdown
---
title: "Mizusawa: The Other History Inside the Nambu Name"
pubDate: "2026-07-31"
category: ["Tea", "Teapots", "Tetsubin", "Japanese Craft"]
description: "Mizusawa's casting history predates the Nambu name attached to it. Oigen and Oitomi show how this practical lineage differs from—and converged with—Morioka."
heroImage: "../../../public/tea/posts/tetsubin-history-3-mizusawa-oshu/hero.jpg"
---

<div class="info-box">Mizusawa is often folded into a single four-hundred-year story of “Nambu ironware.” This post keeps its older Ōshū casting history separate from Morioka's domain-sponsored tea-kettle tradition, using municipal, museum, association, government, and workshop sources. Maker marks are shown with complete attributed objects because the name on one detachable part is not enough.</div>

### Older than the name it now carries
### Under the Date domain
### When Morioka and Mizusawa became Nambu
### Oigen
### Identifying Oigen
### Oitomi
### Identifying Oitomi
### What remains different
### Sources and image credits
```

- [ ] **Step 5: Draft 3,000–4,000 words**

Give Oigen and Oitomi equal 600–900-word profiles. Do not let the regional history become a preface to Morioka; explain Mizusawa on its own terms. Add exact previous/next navigation to Parts 2 and 4.

- [ ] **Step 6: Audit and build**

```bash
rg -n '^### (Oigen|Oitomi|Identifying)' src/content/tea/tetsubin-history-3-mizusawa-oshu.md
rg -n 'older|Nambu|Morioka|Date domain|documented|uncertain' src/content/tea/tetsubin-history-3-mizusawa-oshu.md
wc -w src/content/tea/tetsubin-history-3-mizusawa-oshu.md
npm run build
test -f dist/tea/tetsubin-history-3-mizusawa-oshu/index.html
git diff --check -- src/content/tea/tetsubin-history-3-mizusawa-oshu.md docs/research/tetsubin-series-*.md
```

- [ ] **Step 7: Commit**

```bash
git add src/content/tea/tetsubin-history-3-mizusawa-oshu.md public/tea/posts/tetsubin-history-3-mizusawa-oshu docs/research/tetsubin-series-sources.md docs/research/tetsubin-series-images.md
git commit -m "feat(tea): publish tetsubin history series part 3"
```

---

### Task 5: Publish Part 4 — Yamagata

**Files:**

- Create: `src/content/tea/tetsubin-history-4-yamagata.md`
- Create: `public/tea/posts/tetsubin-history-4-yamagata/hero.jpg`
- Create: `public/tea/posts/tetsubin-history-4-yamagata/yamagata-workshops-comparison.svg`
- Create: `public/tea/posts/tetsubin-history-4-yamagata/yamagata-marks.svg`
- Create: Seikodo, Kikuchi Hojudo, and Chobundo images.
- Modify: both research ledgers.

**Interfaces:**

- Consumes: Part 1 terminology and regional framework.
- Produces: equal profiles for three Yamagata producers; next-link target `/tea/tetsubin-history-5-kyoto-kansai`.

- [ ] **Step 1: Add the Yamagata evidence pack**

Use and log: Traditional Crafts Aoyama Square; Tohoku METI craft record; official Yamagata craft/export portal; official Seikodo site and portal entry; Government of Japan Kikuchi Hojudo feature; Yamagata foundry association; official Chobundo entry; supplied HOJO Seikodo page. Separate the region’s circa-900-year casting tradition from producer and tetsubin dates. Preserve Seikodo’s documented 1735 start, Kikuchi Hojudo’s documented 1604 foundry record, and Chobundo’s 1952 founding without implying all made the same product from day one.

- [ ] **Step 2: Acquire and log 6–10 images for each producer**

Include complete kettles, thin-wall/cast-surface details, process or workshop scenes, lids/handles/inlay details, and two mark/context pairs per producer when documented. Include regional Dōmachi or historical casting imagery so the post is not three product profiles floating without place.

- [ ] **Step 3: Author both SVGs**

```text
yamagata-workshops-comparison.svg
  Three equal columns: Seikodo, Kikuchi Hojudo, Chobundo.
  Rows: documented start; tetsubin relationship; mould/process; surface language; lid/handle; current status.

yamagata-marks.svg
  Best-documented mark per producer with global mark fields and warning.
```

- [ ] **Step 4: Create the exact scaffold**

```markdown
---
title: "Yamagata: Thin Walls, Precise Surfaces, and Three Living Traditions"
pubDate: "2026-07-31"
category: ["Tea", "Teapots", "Tetsubin", "Japanese Craft"]
description: "Seikodo, Kikuchi Hojudo, and Chobundo reveal the range inside Yamagata casting: thin walls, exact silhouettes, pictorial surfaces, and different ways of carrying history forward."
heroImage: "../../../public/tea/posts/tetsubin-history-4-yamagata/hero.jpg"
---

<div class="info-box">Yamagata's casting history is much older than any one workshop—and older than the tetsubin itself. The chronology here is built from official Yamagata craft records, government and association histories, workshop records, museum material, and HOJO's Seikodo visit. Foundry dates do not automatically become tetsubin dates; I keep the two apart.</div>

### Nine centuries of casting, not nine centuries of tetsubin
### The Yamagata method
### Seikodo
### Identifying Seikodo
### Kikuchi Hojudo
### Identifying Kikuchi Hojudo
### Chobundo
### Identifying Chobundo
### Three workshops, three continuities
### Sources and image credits
```

- [ ] **Step 5: Draft 3,500–4,500 words with equal profiles**

Treat “Kyoto influence” as a claim requiring concrete evidence in technique, training, or design, not a visual hunch. Explain dry mould and lost wax only where each producer’s documentation supports it. Add exact previous/next navigation.

- [ ] **Step 6: Audit and build**

```bash
rg -n '^### (Seikodo|Kikuchi Hojudo|Chobundo|Identifying)' src/content/tea/tetsubin-history-4-yamagata.md
rg -n '1600s|1735|1604|1952|nine centuries|Kyoto influence|best|taste' src/content/tea/tetsubin-history-4-yamagata.md
wc -w src/content/tea/tetsubin-history-4-yamagata.md
npm run build
test -f dist/tea/tetsubin-history-4-yamagata/index.html
git diff --check -- src/content/tea/tetsubin-history-4-yamagata.md docs/research/tetsubin-series-*.md
```

- [ ] **Step 7: Commit**

```bash
git add src/content/tea/tetsubin-history-4-yamagata.md public/tea/posts/tetsubin-history-4-yamagata docs/research/tetsubin-series-sources.md docs/research/tetsubin-series-images.md
git commit -m "feat(tea): publish tetsubin history series part 4"
```

---

### Task 6: Publish Part 5 — Kyoto and Kansai

**Files:**

- Create: `src/content/tea/tetsubin-history-5-kyoto-kansai.md`
- Create: `public/tea/posts/tetsubin-history-5-kyoto-kansai/hero.jpg`
- Create: `public/tea/posts/tetsubin-history-5-kyoto-kansai/kyoto-lineages.svg`
- Create: `public/tea/posts/tetsubin-history-5-kyoto-kansai/kyoto-marks.svg`
- Create: Ryūbundō, Kibundō, and Unshikidō images.
- Modify: both research ledgers.

**Interfaces:**

- Consumes: Part 1’s object distinction and Part 4’s carefully evidenced Kyoto/Yamagata contact.
- Produces: equal historical/current profiles; next-link target `/tea/tetsubin-history-6-takaoka`.

- [ ] **Step 1: Add the Kyoto/Kansai evidence pack**

Use and log: Princeton Ryūbundō object; British Museum object and lid warning; Smithsonian objects; institutional/museum records for Kibundō; Royal College of Art Tetsubin Project; official Unshikidō material; government Kyoto inlay history; supplied HOJO Kyoto overview. Record 1764 as a disputed/repeated date, Princeton’s founder life dates and active chronology, Ryūbundō’s 1958 endpoint, Kibundō’s Ōmi/Shiga relationship, wartime disruption, and evidence for the modern Unshikidō revival.

- [ ] **Step 2: Acquire and log 6–10 images for each producer**

For historical workshops, use museum or securely catalogued objects rather than anonymous marketplace listings. Include whole kettle, bronze lid, relief or burnished field, gold/silver inlay, mark, and mark-context views. For Unshikidō include current workshop/process and finished examples. If a catalogue mark is not securely tied to the body, label it uncertain.

- [ ] **Step 3: Author both SVGs**

```text
kyoto-lineages.svg
  Kyoto metalwork/chagama context → Ryūbundō → Kibundō/Ōmi relationship.
  Separate historical closure line from Unshikidō revival line.
  Do not draw an unproven direct succession arrow.

kyoto-marks.svg
  Documented Ryūbundō, Kibundō, and Unshikidō marks.
  Make the lid/body distinction visually explicit.
```

- [ ] **Step 4: Create the exact scaffold**

```markdown
---
title: "Kyoto and Kansai: When the Iron Kettle Became Art Metal"
pubDate: "2026-07-31"
category: ["Tea", "Teapots", "Tetsubin", "Japanese Craft"]
description: "Ryūbundō, Kibundō, and Unshikidō trace the Kyoto/Kansai kettle from lost-wax art metal and silver inlay through closure, imitation, and modern revival."
heroImage: "../../../public/tea/posts/tetsubin-history-5-kyoto-kansai/hero.jpg"
---

<div class="info-box">Kyoto iron kettles are unusually vulnerable to copied dates, swapped signed lids, and confident auction attributions. This post gives museum records priority, uses workshop and institutional research for the modern revival, and labels disputed dates and uncertain marks openly. Decoration is evidence to examine, not proof of origin.</div>

### Kyoto before the tetsubin
### A kettle becomes art metal
### Ryūbundō
### Identifying Ryūbundō
### Kibundō
### Identifying Kibundō
### Unshikidō
### Identifying Unshikidō
### Closure is not the same as extinction
### Sources and image credits
```

- [ ] **Step 5: Draft 3,500–4,500 words with equal profiles**

Keep decorative vocabulary precise: lost wax, relief, burnishing, bronze lid, engraving, inlay. Explain that elaborate decoration is neither automatic proof of Kyoto origin nor quality. Add exact previous/next navigation.

- [ ] **Step 6: Audit and build**

```bash
rg -n '^### (Ryūbundō|Kibundō|Unshikidō|Identifying)' src/content/tea/tetsubin-history-5-kyoto-kansai.md
rg -n '1764|1958|lid|body|extinct|no.*workshop|lost.wax|inlay|uncertain' src/content/tea/tetsubin-history-5-kyoto-kansai.md
wc -w src/content/tea/tetsubin-history-5-kyoto-kansai.md
npm run build
test -f dist/tea/tetsubin-history-5-kyoto-kansai/index.html
git diff --check -- src/content/tea/tetsubin-history-5-kyoto-kansai.md docs/research/tetsubin-series-*.md
```

- [ ] **Step 7: Commit**

```bash
git add src/content/tea/tetsubin-history-5-kyoto-kansai.md public/tea/posts/tetsubin-history-5-kyoto-kansai docs/research/tetsubin-series-sources.md docs/research/tetsubin-series-images.md
git commit -m "feat(tea): publish tetsubin history series part 5"
```

---

### Task 7: Publish Part 6 — Takaoka and the Series Mark Atlas

**Files:**

- Create: `src/content/tea/tetsubin-history-6-takaoka.md`
- Create: `public/tea/posts/tetsubin-history-6-takaoka/hero.jpg`
- Create: `public/tea/posts/tetsubin-history-6-takaoka/takaoka-production-network.svg`
- Create: `public/tea/posts/tetsubin-history-6-takaoka/takaoka-marks.svg`
- Create: `public/tea/posts/tetsubin-history-6-takaoka/series-marks-atlas.svg`
- Create: Koryo Kinjudo, Ginshodo, and Shobee images.
- Modify: both research ledgers.

**Interfaces:**

- Consumes: all prior producer mark findings.
- Produces: equal Takaoka profiles, cross-series mark atlas, and closing navigation to Part 1.

- [ ] **Step 1: Add the Takaoka evidence pack**

Use and log: Traditional Crafts Aoyama Square Takaoka entry; Takaoka City Design & Craft Center; official Takaoka Tetsubin brand pages for Koryo Kinjudo, Ginshodo, and Shobee; producer-owned pages where available; Kiryudo only for documented *utsushi* examples and current sales context. Verify the 1611 casting history, the region’s distributed specialization, relevant mould techniques, and which named producer performs versus commissions each production stage.

- [ ] **Step 2: Acquire and log 6–10 images for each producer**

Show complete kettle, casting/prototype work, engraving or inlay, coloring/finish, Kyoto-style *utsushi* relationship, and two mark/context pairs per producer when documented. Do not use a retailer’s product title as proof of historical Ryūbundō authorship.

- [ ] **Step 3: Author three SVGs**

```text
takaoka-production-network.svg
  Model → mould → casting → finishing → polishing → engraving/inlay → coloring → assembly.
  Show that different specialists may perform different stages.

takaoka-marks.svg
  Best-documented mark per selected producer with global mark fields and warning.

series-marks-atlas.svg
  One documented mark per producer across all six posts.
  Group by region, not rank.
  Include: maker; characters; mark location; method; broad date/generation; confidence.
  Add links in the surrounding caption/prose to each producer’s identification section.
```

- [ ] **Step 4: Create the exact scaffold**

```markdown
---
title: "Takaoka: Recasting the Kyoto Kettle"
pubDate: "2026-07-31"
category: ["Tea", "Teapots", "Tetsubin", "Japanese Craft"]
description: "Koryo Kinjudo, Ginshodo, and Shobee show how Takaoka's specialized metalworking network recasts Kyoto-style tetsubin for the present."
heroImage: "../../../public/tea/posts/tetsubin-history-6-takaoka/hero.jpg"
---

<div class="info-box">Takaoka's present iron kettles draw on a four-hundred-year metalworking network and often quote older Kyoto forms. The sources here distinguish a historical workshop, a modern brand, a specialist subcontractor, and an <em>utsushi</em> reproduction instead of treating those labels as interchangeable. Every mark is tied to a complete documented object where the evidence permits.</div>

### A metalworking city before it was a kettle centre
### The workshop is a network
### Koryo Kinjudo
### Identifying Koryo Kinjudo
### Ginshodo
### Identifying Ginshodo
### Shobee
### Identifying Shobee
### Utsushi, revival, or a new regional tradition?
### A field guide to the makers in this series
### Sources and image credits
```

- [ ] **Step 5: Draft 3,500–4,500 words with equal profiles**

Explain why Takaoka is neither an original Ryūbundō continuation nor merely “fake Kyoto.” Distinguish homage/reproduction (*utsushi*), technical continuity, brand attribution, and historical workshop provenance. End with the mark atlas, a concise multi-factor identification method, and series navigation back to Part 1.

- [ ] **Step 6: Audit and build**

```bash
rg -n '^### (Koryo Kinjudo|Ginshodo|Shobee|Identifying)' src/content/tea/tetsubin-history-6-takaoka.md
rg -n 'fake|authentic|Ryūbundō|utsushi|network|mark alone|uncertain' src/content/tea/tetsubin-history-6-takaoka.md
wc -w src/content/tea/tetsubin-history-6-takaoka.md
npm run build
test -f dist/tea/tetsubin-history-6-takaoka/index.html
git diff --check -- src/content/tea/tetsubin-history-6-takaoka.md docs/research/tetsubin-series-*.md
```

- [ ] **Step 7: Commit**

```bash
git add src/content/tea/tetsubin-history-6-takaoka.md public/tea/posts/tetsubin-history-6-takaoka docs/research/tetsubin-series-sources.md docs/research/tetsubin-series-images.md
git commit -m "feat(tea): publish tetsubin history series part 6"
```

---

### Task 8: Cross-Series Editorial, Rights, Link, and Visual Verification

**Files:**

- Modify: all six tetsubin post files only where verification finds a concrete issue.
- Modify: both ledgers only where verification finds missing or inconsistent entries.
- Modify: `src/styles/blog-post.css` only if an accessibility/layout defect cannot be fixed in Markdown markup.

**Interfaces:**

- Consumes: all six built posts and both complete ledgers.
- Produces: publication-ready series with no missing assets, unsupported exact claims, broken navigation, or unreadable layouts.

- [ ] **Step 1: Run the full build and route check**

```bash
npm run build
for slug in \
  tetsubin-history-1-birth-of-the-iron-kettle \
  tetsubin-history-2-morioka \
  tetsubin-history-3-mizusawa-oshu \
  tetsubin-history-4-yamagata \
  tetsubin-history-5-kyoto-kansai \
  tetsubin-history-6-takaoka; do
  test -f "dist/tea/$slug/index.html" || exit 1
done
```

Expected: Astro build passes and all six routes exist.

- [ ] **Step 2: Run the missing local-asset audit**

For each post, extract root-relative `/tea/posts/...` sources and confirm each maps to a file under `public/`. Resolve every miss before continuing.

```bash
for post in src/content/tea/tetsubin-history-*.md; do
  rg -o 'src="/tea/posts/[^"]+' "$post" | cut -d'"' -f2
done
```

- [ ] **Step 3: Audit evidence coverage**

Search all posts for exact years, superlatives, succession language, and attribution verbs. For each result, point to a ledger row; delete, qualify, or source anything unmatched.

```bash
rg -n '\b(1[0-9]{3}|20[0-9]{2})\b|first|oldest|only|invented|founded|generation|National Treasure|authentic|definitely|proves' src/content/tea/tetsubin-history-*.md
```

- [ ] **Step 4: Audit producer equality and identification coverage**

Confirm all fifteen selected producers have chronology, process, visual language, representative object, identification, and distinction coverage. Confirm every mark example has characters, reading, location, method, range, evidence, confidence, and context image—or an explicit statement that reliable evidence was unavailable.

- [ ] **Step 5: Audit image rights and credits**

Compare every local raster file with one image-ledger row. Confirm every non-original figure caption includes creator/institution and a source link. Produce a final list of `credit requested / permission unconfirmed` images for the author; do not silently describe them as licensed.

- [ ] **Step 6: Run link and navigation checks**

Confirm every post links to the correct previous/next article and that Part 6 links back to Part 1. Confirm source URLs use HTTPS where available and no source link points at a search-results page.

- [ ] **Step 7: Render and inspect every post at desktop and mobile widths**

Start the site:

```bash
npm run dev -- --host 127.0.0.1
```

Use the in-app browser control skill to inspect all six routes at approximately 1440 px and 390 px widths. Check hero crop, body width, Japanese text, captions, gallery wrapping, tables, SVG labels, mark legibility, and navigation. Fix only observed defects, then rebuild.

- [ ] **Step 8: Final mechanical checks**

```bash
git diff --check
npm run build
git status --short
```

Expected: no whitespace errors; build passes; only intended tetsubin files plus pre-existing unrelated user files appear.

- [ ] **Step 9: Commit final fixes**

```bash
git add src/content/tea/tetsubin-history-*.md public/tea/posts/tetsubin-history-* docs/research/tetsubin-series-sources.md docs/research/tetsubin-series-images.md src/styles/blog-post.css
git commit -m "fix(tea): finalize tetsubin series sources and presentation"
```

If `src/styles/blog-post.css` did not change, omit it from `git add`. If verification finds no changes after Task 7, skip this commit rather than creating an empty one.
