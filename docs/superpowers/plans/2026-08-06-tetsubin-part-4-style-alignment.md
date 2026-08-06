# Tetsubin History Part 4 Style Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a simple, visual Part 4 about Yamagata that matches Parts 1–3.

**Architecture:** Add one Markdown post and a small set of static workshop images. Reuse the shared regional map and existing blog gallery styles; add no components, CSS, scripts, diagrams, or dependencies.

**Tech Stack:** Astro content collections, Markdown with embedded HTML figures, static image assets, Git, GitHub MCP.

## Global Constraints

- Use short sentences, common words, and focused paragraphs.
- Use `##` for substantial sections.
- Reuse `/tea/posts/tetsubin-history/japan-regional-centers.svg` and the existing `studio-gallery` markup.
- Do not publish licensing or image-processing commentary.
- Do not add tables, `figure-scroll`, generic identification advice, or new code.
- Do not invent workshop marks.

---

### Task 1: Build the Part 4 article and media

**Files:**
- Create: `src/content/tea/tetsubin-history-4-yamagata.md`
- Create: `public/tea/posts/tetsubin-history-4-yamagata/hero.jpg`
- Create: `public/tea/posts/tetsubin-history-4-yamagata/seikodo-tetsubin-1.jpg`
- Create: `public/tea/posts/tetsubin-history-4-yamagata/seikodo-tetsubin-2.jpg`
- Create: `public/tea/posts/tetsubin-history-4-yamagata/kikuchi-hojudo-tetsubin-1.jpg`
- Create: `public/tea/posts/tetsubin-history-4-yamagata/kikuchi-hojudo-tetsubin-2.jpg`
- Create: `public/tea/posts/tetsubin-history-4-yamagata/chobundo-tetsubin-1.jpg`
- Create: `public/tea/posts/tetsubin-history-4-yamagata/chobundo-tetsubin-2.jpg`

**Interfaces:**
- Consumes: the merged Parts 1–3 structure, shared map, first-party workshop pages, and the Yamagata prefectural craft catalogue.
- Produces: `/tea/tetsubin-history-4-yamagata`.

- [ ] **Step 1: Collect only representative workshop images**

Use first-party Seikodo and Kikuchi Hojudo product pages plus the Yamagata prefectural catalogue for Chobundo. Save two clearly named kettle images per workshop. Use the strongest landscape or square Yamagata-work image as `hero.jpg`; do not add generic comparison photographs or diagram cards.

- [ ] **Step 2: Write the article**

Use this heading order:

```markdown
## Yamagata and Its Casting Tradition
## How Yamagata Makes a Kettle
## Seikodo: Detailed Surfaces and Lost Wax
## Kikuchi Hojudo: Old Foundry, Modern Shapes
## Chobundo: A Postwar Kettle Workshop
## Sources and Image Credits
```

Open with the Part 3 link and shared map. Keep each workshop profile in the order location, history, difference, representative work, pattern clues, then mark guidance. Add one `studio-gallery` containing two full-size linked figures per workshop.

- [ ] **Step 3: Run focused content checks**

```bash
rg -n '^title: "Tetsubin History, Part 4:|^## |japan-regional-centers|studio-gallery|Previous:|Next:' src/content/tea/tetsubin-history-4-yamagata.md
rg -ni 'licen[cs]|reuse permission|cropp|resiz|recompress|figure-scroll|^\|' src/content/tea/tetsubin-history-4-yamagata.md
```

Expected: the required title, six headings, shared map, three galleries, and both navigation links are present; the second command has no matches.

### Task 2: Verify and publish

**Files:**
- Verify: `src/content/tea/tetsubin-history-4-yamagata.md`
- Verify: `public/tea/posts/tetsubin-history-4-yamagata/*`

**Interfaces:**
- Consumes: Task 1 output.
- Produces: a draft PR from `agent/tetsubin-history-part-4` to `main`.

- [ ] **Step 1: Verify media references**

Run a source-to-file check for every local `/tea/posts/` path in Part 4. Expected: every referenced file exists and every raster image has non-zero width and height.

- [ ] **Step 2: Build the site**

```bash
npm run build
test -f dist/tea/tetsubin-history-4-yamagata/index.html
```

Expected: both commands exit 0.

- [ ] **Step 3: Check and publish**

```bash
git diff --check
git status --short
```

Stage only the Part 4 post, its media, this spec, and this plan. Commit, push `agent/tetsubin-history-part-4`, compare it with `main` through GitHub MCP, then create a draft PR through GitHub MCP.
