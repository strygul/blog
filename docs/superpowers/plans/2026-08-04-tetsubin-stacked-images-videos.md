# Tetsubin Media and Toramonten Additions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Display every studio's kettle and maker-mark images vertically at up to 1100px wide, embed three playable production videos, and add carefully attributed Toramonten production details to Parts 1 and 2.

**Architecture:** Reuse the existing article markup conventions and shared responsive video wrapper. Let only `.two-up` galleries break out of the 720px prose column, keep captions readable, use embeddable YouTube videos, and retain the two concise source-backed production notes.

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

### Task 2: Correct Gallery Width and Suzuki Playback

**Files:**
- Modify: `src/styles/blog-post.css:23-38`
- Modify: `src/content/tea/tetsubin-history-2-morioka.md:69-71`

**Interfaces:**
- Consumes: the existing vertical `.image-gallery.two-up` layout and `.video-embed` wrapper
- Produces: centered galleries up to 1100px wide, readable captions, and an embeddable Suzuki Morihisa video

- [ ] **Step 1: Run the failing corrective check**

```bash
node -e "const fs=require('node:fs');const css=fs.readFileSync('src/styles/blog-post.css','utf8');const md=fs.readFileSync('src/content/tea/tetsubin-history-2-morioka.md','utf8');if(!css.includes('width: min(1100px, calc(100vw - 2rem))')||!css.includes('transform: translateX(-50%)')||!css.includes('.image-gallery.two-up figcaption')||!md.includes('youtube.com/embed/B_3B5q2kBgk')||md.includes('youtube.com/embed/kNEEbDtYcaI'))process.exit(1)"
```

Expected: exits with status 1 because the gallery is still limited by the prose column and the blocked Suzuki video ID remains.

- [ ] **Step 2: Let the gallery break out of the prose column**

Extend the existing layout rules to:

```css
.image-gallery.two-up {
	flex-direction: column;
	width: min(1100px, calc(100vw - 2rem));
	margin-left: 50%;
	transform: translateX(-50%);
}

.image-gallery.two-up > figure {
	margin: 0;
	text-align: center;
}

.image-gallery.two-up > figure img {
	width: 100%;
}

.image-gallery.two-up figcaption {
	max-width: 720px;
	margin-inline: auto;
}
```

- [ ] **Step 3: Replace the blocked Suzuki video**

Replace only the Suzuki iframe with:

```html
<iframe src="https://www.youtube.com/embed/B_3B5q2kBgk" title="Suzuki Morihisa Studio — Pen magazine feature" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
```

- [ ] **Step 4: Run corrective and build verification**

Run the Step 1 command again. Expected: exits with status 0.

Run:

```bash
npm run build -- --silent
```

Expected: exits with status 0 and the generated Part 2 page contains `B_3B5q2kBgk` but not `kNEEbDtYcaI`.

- [ ] **Step 5: Commit the correction**

```bash
git add src/styles/blog-post.css src/content/tea/tetsubin-history-2-morioka.md
git diff --cached --check
git commit -m "fix(tea): enlarge studio galleries and replace blocked video"
```

### Task 3: Isolate Studio Galleries and Improve Media Context

**Files:**
- Modify: `src/styles/blog-post.css:23-47`
- Modify: `src/content/tea/tetsubin-history-2-morioka.md`

**Interfaces:**
- Consumes: four vertical studio galleries and the Tea-wide `public/css/f1-seals.css`
- Produces: a dedicated `.studio-gallery` layout unaffected by `.two-up` half-width rules, eight full-size image links, and three video descriptions

- [ ] **Step 1: Run the failing override check**

```bash
node -e "const fs=require('node:fs');const css=fs.readFileSync('src/styles/blog-post.css','utf8');const md=fs.readFileSync('src/content/tea/tetsubin-history-2-morioka.md','utf8');if((md.match(/image-gallery studio-gallery/g)||[]).length!==4||(md.match(/image-gallery two-up/g)||[]).length!==0||(md.match(/target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Open the .* image full size in a new tab\"/g)||[]).length!==8||(md.match(/Watch:/g)||[]).length!==3||!css.includes('.image-gallery.studio-gallery'))process.exit(1)"
```

Expected: exits with status 1 because all four studio galleries still use the Tea-wide `.two-up` class.

- [ ] **Step 2: Rename and fully size the studio layout**

Change the four article wrappers from `image-gallery two-up` to `image-gallery studio-gallery`. Rename the matching shared CSS selectors and explicitly set `display: flex`, `align-items: stretch`, `width: 100%`, and `max-width: none` on the gallery figures so `f1-seals.css` cannot restore its grid previews or intrinsic image widths. Wrap all eight images in descriptive self-links using `target="_blank"` and `rel="noopener noreferrer"`.

Add these descriptions directly before their matching embeds:

```markdown
**Watch:** Pen magazine visits the sixteenth Suzuki Morihisa and looks at how the studio brings a contemporary expression to four centuries of casting tradition.

**Watch:** Tierra Zen offers a visual overview of how Iwachu ironware is made, from mould work and casting to finishing.

**Watch:** Toramonten's 35-minute documentary follows a Kamasada tetsubin through mould making, casting, and finishing.
```

- [ ] **Step 3: Verify and publish**

Run the Step 1 check, `npm run build -- --silent`, and generated-HTML checks for four `studio-gallery` wrappers, eight new-tab image links, and three video descriptions. Commit the fix, open a focused follow-up PR, squash-merge it to `main`, wait for the Pages deployment, and verify the public HTML contains the studio class and 1100px rule.
