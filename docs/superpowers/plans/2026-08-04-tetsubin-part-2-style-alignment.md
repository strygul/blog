# Tetsubin Part 2 Style Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite Part 2 of the tetsubin series so it is simple, engaging, and stylistically continuous with Part 1.

**Architecture:** This is a single-file editorial change. Rebuild the existing Markdown article around a narrative progression, retain only the evidence and media that support that progression, and verify it through text checks and the existing Astro build.

**Tech Stack:** Astro content collections, Markdown, inline HTML, npm.

## Global Constraints

- Do not introduce new historical claims or dependencies.
- Preserve accurate source links, image credits, licences, accessible image markup, and previous/next navigation.
- Use Part 1's `##` heading hierarchy, first-person explanatory voice, readable paragraphs, and restrained use of evidence notes.
- Leave unused image and diagram assets in place.

---

### Task 1: Rebuild the Morioka Article

**Files:**
- Modify: `src/content/tea/tetsubin-history-2-morioka.md:1-300`
- Reference: `src/content/tea/tetsubin-history-1-birth-of-the-iron-kettle.md`
- Verify: `package.json`

**Interfaces:**
- Consumes: Astro's existing Markdown/frontmatter format and the article's current local media paths.
- Produces: One renderable Part 2 article with the same URL and frontmatter contract.

- [ ] **Step 1: Record the current article structure**

Run:

```bash
rg -n '^(##|###)|<div class="info-box">|^\|' src/content/tea/tetsubin-history-2-morioka.md
```

Expected: dossier-style `###` headings, repeated information boxes, and multiple tables appear in the baseline.

- [ ] **Step 2: Replace the body with a narrative structure**

Keep the existing frontmatter and rebuild the body in this order:

1. A short series note explaining the source standard once.
2. `## Morioka and the Problem of an Old Name` — connect Part 1's distinction between old casting and the younger tetsubin to Morioka's 1625/1641 date conflict and circa-1750 tradition.
3. `## How Morioka Makes a Kettle` — explain the mould, core, casting, oxide treatment, lacquer, handle, and lid in plain language; retain one useful process illustration.
4. `## Suzuki Morihisa: The Domain Lineage` — tell the hereditary workshop story, correct the honorific claim carefully, and describe its present visual range and `盛久` mark without a matrix.
5. `## Kunzan: A Branch Becomes Its Own Workshop` — emphasize the 1937 founding, Suzuki apprenticeship, in-house work, range of forms, and uncertain mark evidence.
6. `## Iwachu: Craft at Industrial Scale` — explain the conflicting foundation dates, separate traditional kettles from enamelled teapots, and describe the current `岩鋳`/`IWACHU` marks without using them as dating evidence.
7. `## Kamasada: One Maker, One Kettle` — explain the Miya family roots, wartime interruption, 1954 rebuilding, integrated handwork, modern design, and mark limits.
8. `## What the Four Workshops Teach Us` — compare the makers in prose, give a short practical identification sequence, and explain why no single texture or mark proves attribution.
9. `## Sources and Image Credits` — retain a compact source list, image/licence statement, and navigation links.

Remove repeated open-evidence boxes, evidence ceilings, duplicated warning language, per-maker mark tables, and comparison tables. Keep uncertainty beside the fact it qualifies.

- [ ] **Step 3: Check style and structure**

Run:

```bash
rg -n '^###|<div class="info-box">|Evidence ceiling|^\|' src/content/tea/tetsubin-history-2-morioka.md
rg -n '^## ' src/content/tea/tetsubin-history-2-morioka.md
```

Expected: the first command finds no dossier-only structure; the second shows the planned `##` narrative sections.

- [ ] **Step 4: Check local media references**

Run:

```bash
for path in $(rg -o 'src="/[^"]+' src/content/tea/tetsubin-history-2-morioka.md | cut -d'"' -f2); do test -f "public$path" || exit 1; done
```

Expected: exit status 0 with no missing local media.

- [ ] **Step 5: Build the site**

Run:

```bash
npm run build
```

Expected: Astro completes successfully and generates the Part 2 route.

- [ ] **Step 6: Review the final diff and commit**

Run:

```bash
git diff --check
git diff --stat
git diff -- src/content/tea/tetsubin-history-2-morioka.md
git status --short
```

Expected: no whitespace errors; only the intended article rewrite and already-known unrelated untracked files are present.

Commit only the article:

```bash
git add src/content/tea/tetsubin-history-2-morioka.md
git commit -m "edit(tea): align tetsubin part 2 with blog style"
```
