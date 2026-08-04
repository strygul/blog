# Tetsubin Media and Toramonten Additions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Display every studio's kettle and maker-mark images vertically at full article width, embed three production videos, and add carefully attributed Toramonten production details to Parts 1 and 2.

**Architecture:** Reuse the existing article markup conventions and shared responsive video wrapper. Change only the article-scoped `.two-up` figure sizing, add three standard YouTube iframe blocks, and insert one concise source-backed production note in each article.

**Tech Stack:** Astro content collections, Markdown with inline HTML, shared CSS, npm build verification

## Global Constraints

- Preserve kettle-first, maker-mark-second image order.
- Do not alter gallery behavior outside `.image-gallery.two-up`.
- Reuse `.video-embed`; add no component, script, or dependency.
- Videos must not autoplay and must have descriptive iframe titles.
- Attribute Toramonten where used and exclude its commercial, pricing, health, and broad chronology claims.

---

### Task 1: Stack Studio Images, Embed Videos, and Add Production Notes

**Files:**
- Modify: `src/styles/blog-post.css:23-28`
- Modify: `src/content/tea/tetsubin-history-1-birth-of-the-iron-kettle.md:183-204,227-229`
- Modify: `src/content/tea/tetsubin-history-2-morioka.md:57-70,140-149`

**Interfaces:**
- Consumes: existing `.image-gallery.two-up` gallery markup and `.video-embed` responsive iframe wrapper
- Produces: one-column studio galleries, three accessible responsive YouTube embeds, and two directly attributed production notes

- [ ] **Step 1: Record failing source checks**

Run:

```bash
node -e "const fs=require('node:fs');const css=fs.readFileSync('src/styles/blog-post.css','utf8');const p1=fs.readFileSync('src/content/tea/tetsubin-history-1-birth-of-the-iron-kettle.md','utf8');const p2=fs.readFileSync('src/content/tea/tetsubin-history-2-morioka.md','utf8');if(!css.includes('flex-direction: column')||!css.includes('.image-gallery.two-up > figure img')||!p1.includes('nama-gata')||!p1.includes('toramonten.com/en-eu/blogs/column/nanbu-ironware-tetsubin-guide')||!p2.includes('yakinuki')||!p2.includes('youtube.com/embed/kNEEbDtYcaI')||!p2.includes('youtube.com/embed/o6AuxztRkYM')||!p2.includes('youtube.com/embed/5DOeuBQnSVw'))process.exit(1)"
```

Expected: exits with status 1 because the layout and embeds are not present yet.

- [ ] **Step 2: Make `.two-up` figures full-width**

Replace the current flexible half-width sizing with:

```css
.image-gallery.two-up {
	flex-direction: column;
}

.image-gallery.two-up > figure {
	margin: 0;
	text-align: center;
}

.image-gallery.two-up > figure img {
	width: 100%;
}
```

- [ ] **Step 3: Embed the Suzuki Morihisa video**

Insert this before the paragraph beginning “The published mark evidence”:

```html
<div class="video-embed">
<iframe src="https://www.youtube.com/embed/kNEEbDtYcaI" title="Suzuki Morihisa tetsubin production" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>
```

- [ ] **Step 4: Embed the Iwachu video**

Insert this before the paragraph beginning “This is more than a workshop detail”:

```html
<div class="video-embed">
<iframe src="https://www.youtube.com/embed/o6AuxztRkYM" title="Iwachu ironware production" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>
```

- [ ] **Step 5: Embed the Kamasada video**

Insert this before the paragraph beginning “Retail pages report”:

```html
<div class="video-embed">
<iframe src="https://www.youtube.com/embed/5DOeuBQnSVw" title="Kamasada tetsubin production" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>
```

- [ ] **Step 6: Add the attributed Toramonten production notes**

Add this after “The broad logic is shared; the details are not.” in Part 1:

```markdown
Toramonten's [Nanbu ironware guide](https://toramonten.com/en-eu/blogs/column/nanbu-ironware-tetsubin-guide) gives two useful names for that variation. In its account, *nama-gata* uses compacted sand with a binder for efficient, consistent casting; *yaki-gata* uses a fired clay mould that is broken after one pour, allowing finer control of detail. These are helpful process labels, not grades of authenticity: a workshop's actual materials, firing, finishing, and division of labor still have to be checked.
```

Add the guide to Part 1's core sources with the note that it is used for mould-method terminology rather than commercial or health claims.

Add this after the paragraph comparing the forty and eighty Kamasada operations in Part 2:

```markdown
A [Toramonten production guide](https://toramonten.com/en-eu/blogs/column/nanbu-ironware-tetsubin-guide) adds a useful current-workshop detail: it reports that Kamasada uses *yaki-gata* fired moulds and *yakinuki* (“burn-off”) across its line, then treats the bare-iron interior with urushi and charcoal heat. Toramonten sells Kamasada work, so I treat this as a workshop-linked retailer account of current practice—not proof that every historical Kamasada kettle followed the same process.
```

Add Toramonten's workshop-linked production account to the Kamasada sources in Part 2 and keep its evidence level explicit.

- [ ] **Step 7: Run focused and full verification**

Run the Step 1 command again. Expected: exits with status 0.

Run:

```bash
npm run build
```

Expected: build exits with status 0 and generates the Part 2 article with both embed URLs.

- [ ] **Step 8: Commit the implementation**

```bash
git add src/styles/blog-post.css src/content/tea/tetsubin-history-1-birth-of-the-iron-kettle.md src/content/tea/tetsubin-history-2-morioka.md
git diff --cached --check
git commit -m "edit(tea): improve tetsubin media and production notes"
```
