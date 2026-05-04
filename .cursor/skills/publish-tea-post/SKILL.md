---
name: publish-tea-post
description: Use when adding or changing content in src/content/tea, matching Early Teapots series layout, or when a tea post shows locally but not on the deployed site
---

# Publish a tea post (strygul-blog)

## Overview

Tea posts are Astro content collection entries. The **slug** is the file path under `src/content/tea/` without extension (e.g. `early-teapots-the-qing-yin-series.md` → `/tea/early-teapots-the-qing-yin-series/`). Listing order on `/tea/` is **newest `pubDate` first**. **Local files do not appear on the live site** until they are **committed, pushed, merged to the branch that production builds, and deployed**.

## When to use

- New `.md` / `.mdx` under `src/content/tea/`
- Hero images, `public/tea/posts/...` assets, or frontmatter updates for tea
- “I don’t see my post on strygul.com” after editing only on disk or a feature branch

## Frontmatter (required)

Schema: `src/content.config.ts` → `tea` collection.

| Field        | Rule |
|-------------|------|
| `title`     | Unique, descriptive; article titles use Title Case in frontmatter. |
| `description` | Unique per post; used for meta and JSON-LD—clear prose, not keyword stuffing. |
| `pubDate`   | `YYYY-MM-DD` string; drives sort order on the tea index. |
| `category`  | String or array of strings (e.g. `Tea`, `Early Teapots Encyclopedia`, `Teapots`). |
| `heroImage` | Optional; `image()` import path. Common pattern: `../../../public/tea/posts/<slug>/intro.png`. |
| `heroImageMaxHeight` | Optional; number, caps list hero height. |

**SEO:** Follow repo rule `.cursor/rules/seo.mdc`—unique title and description, sensible hero for OG when the post has a primary visual.

## “Early Teapots” series

If the post is part of the *Early Teapots II* excerpt series, include the **standard info-box** (Dr. Lu Chi Lin, Facebook group link, credit line) as in existing series posts—see e.g. `src/content/tea/early-teapots-order-versus-chaos.md` or `early-teapots-the-appreciation-of-xian-piao-series.md`. Add a **Source:** line (book chapter, Facebook post URL, or both) when applicable.

Categories should include **Early Teapots Encyclopedia** (and **Teapots** when matching sibling posts).

## Images

- Put shareable / article images under `public/tea/posts/<post-slug>/` and reference with root-relative paths in markdown: `/tea/posts/<post-slug>/file.png`.
- `heroImage` in frontmatter must point at a file that exists so Astro can resolve the import.

## Verification

```bash
npm run build
```

Fix any content schema or image resolution errors before considering the post done.

## Go-live (production)

1. `git add` the new or changed `src/content/tea/...` and any `public/tea/...` files.
2. **Commit** on a branch, **push**, open PR, **merge to `main`** (or whatever branch triggers deploy).
3. Wait for the hosting **deploy** to finish; then confirm on `https://strygul.com/tea/`.

Untracked or unmerged work **will not** appear on the public site.

## Common mistakes

| Mistake | Fix |
|--------|-----|
| Post only on local disk or untracked | Add, commit, push, merge, deploy. |
| Hero path breaks build | Use existing `public/...` file or add the asset; path must match `content.config` `image()`. |
| Duplicate or vague `description` | Make it unique and specific; check other tea frontmatter. |
| Wrong series tone | For Early Teapots, reuse the info-box + source pattern from a recent series post. |

## Quick reference

- **Index:** `src/pages/tea/index.astro` — all `tea` collection entries, sorted by `pubDate` descending.
- **Layout:** `src/pages/tea/[...slug].astro` — `BlogPost` layout, `BlogPosting` JSON-LD from frontmatter.
- **Styles:** `src/styles/tea-post.css` for tea body classes (e.g. `info-box`).
