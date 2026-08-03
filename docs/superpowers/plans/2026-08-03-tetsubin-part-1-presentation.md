# Tetsubin Part 1 Presentation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the first tetsubin article match the tea collection’s conventions and make its diagrams legible on all viewports.

**Architecture:** Keep the existing Markdown article and `figure-center` style. Linked SVG files provide the native full-size view, so no viewer component, JavaScript, or schema field is needed.

**Tech Stack:** Astro content collections, Markdown/HTML, CSS, `npm run build`.

## Global Constraints

- Keep `Tea`, `Teapots`, `Tetsubin`, and `Japanese Craft` as the post’s existing category tags.
- Link the four HOJO source articles and describe them as the series inspiration, not as sole evidence.
- Announce the remaining five regional posts without linking unpublished routes.
- Preserve ordinary article-width diagrams and use new-tab SVG links for full-size inspection.
- Do not add dependencies, components, JavaScript, or a tag schema.

---

### Task 1: Amend the post and remove unneeded graph CSS

**Files:**
- Modify: `src/content/tea/tetsubin-history-1-birth-of-the-iron-kettle.md`
- Modify: `src/styles/blog-post.css`

**Interfaces:**
- Consumes: Existing `category` frontmatter and `figure-center` styling.
- Produces: Four linked HOJO references, a six-part-series note, and normal-width SVG diagrams linked with `target="_blank" rel="noopener noreferrer"`.

- [ ] **Step 1: Replace the opening information box**

Write one paragraph that links these four sources:

```html
<a href="https://hojotea.com/categ_e/tetsubin.htm">HOJO's general tetsubin article</a>,
<a href="https://hojotea.com/item_e/suzuki.htm">Suzuki Morihisa</a>,
<a href="https://hojotea.com/item_e/kunzan.htm">Kunzan</a>, and
<a href="https://hojotea.com/item_e/seikodo.htm">Seikodo</a>
```

- [ ] **Step 2: Wrap each of the four SVG images in a new-tab link**

Use this exact markup shape for each SVG:

```html
<a href="/tea/posts/tetsubin-history-1-birth-of-the-iron-kettle/tetsubin-object-types.svg" target="_blank" rel="noopener noreferrer" aria-label="Open the comparison of four Japanese iron vessel types diagram full size in a new tab">
  <img src="/tea/posts/tetsubin-history-1-birth-of-the-iron-kettle/tetsubin-object-types.svg" alt="Diagram comparing chagama, tedorikama, tetsubin, and enamelled iron kyusu" loading="lazy" decoding="async" />
</a>
```

- [ ] **Step 3: Add the six-part series signpost**

Append one concise paragraph after the final section, naming Morioka; Mizusawa and Ōshū; Yamagata; Kyoto and Kansai; and Takaoka as the upcoming posts.

- [ ] **Step 4: Delete the `figure-scroll` CSS rules**

Remove the `figure.figure-scroll`, descendant image/caption, and focus-visible blocks from `src/styles/blog-post.css`.

- [ ] **Step 5: Verify**

Run:

```bash
npm run build
test -f dist/tea/tetsubin-history-1-birth-of-the-iron-kettle/index.html
git diff --check
git diff -- src/content/tea/tetsubin-history-1-birth-of-the-iron-kettle.md src/styles/blog-post.css
```

Expected: exit status 0; article route exists; no whitespace errors; no `figure-scroll` rules remain.

- [ ] **Step 6: Commit and push**

```bash
git add src/content/tea/tetsubin-history-1-birth-of-the-iron-kettle.md src/styles/blog-post.css
git commit -m "fix(tea): polish tetsubin history part 1"
git push
```
