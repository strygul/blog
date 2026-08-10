# Finish My Teaware Collection Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Match tea subcategory descriptions to the `/tea/` body size, add the permanent-hero My Teaware Collection subcategory, and finish its first post with the owner's edited commentary.

**Architecture:** Reuse `TEA_CATEGORIES`, `TeaCardGrid`, and `TeaCategoryPage`; add only one optional fixed-hero field to the existing category records. The first post and its eleven source photographs already exist, so this plan changes only the remaining typography, route configuration, permanent hero, and prose.

**Tech Stack:** Astro 5, TypeScript, CSS, Markdown, Node's built-in test runner

## Global Constraints

- The collection title is `My Teaware Collection`.
- The collection URL is `/tea/my-teaware-collection/`.
- The collection description is exactly `My personal collection of teaware`.
- Use the supplied 1536×1024 teapot sketch permanently on the `/tea/` card and collection page.
- Keep the existing post hero and all eleven existing post photographs unchanged.
- Preserve dynamic newest-post heroes for Yixing, Tetsubins, and Other.
- Subcategory descriptions inherit the same 20px desktop and 18px mobile body sizes as the `/tea/` introduction.
- Add no dependency, route template, or component.

---

### Task 1: Match subcategory description typography

**Files:**
- Modify: `tests/tea-subcategory-pages.test.mjs`
- Modify: `src/components/TeaCategoryPage.astro`

**Interfaces:**
- Consumes: The global `body` font sizes in `src/styles/global.css`.
- Produces: A centered `.category-header p` that inherits the same responsive body size as `/tea/`.

- [ ] **Step 1: Change the focused regression test first**

Replace the existing `0.8rem` assertion at the end of `subcategory headings are centered and use smaller editorial descriptions` with:

```js
const paragraphRule =
	yixing.match(/\.category-header[^{}]* p[^{}]*\{([^}]*)\}/)?.[1] ?? '';
assert.doesNotMatch(paragraphRule, /font-size:/);
```

Rename the test to:

```js
test('subcategory headings are centered and use editorial descriptions at body size', () => {
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```bash
npm run build && node --test-name-pattern="subcategory headings" tests/tea-subcategory-pages.test.mjs
```

Expected: FAIL because the generated `.category-header p` rule still contains `font-size:.8rem`.

- [ ] **Step 3: Remove the local size override**

Delete only this declaration from `.category-header p` in `TeaCategoryPage.astro`:

```css
font-size: 0.8rem;
```

- [ ] **Step 4: Run the focused test and verify GREEN**

Run:

```bash
npm run build && node --test-name-pattern="subcategory headings" tests/tea-subcategory-pages.test.mjs
```

Expected: PASS with one matching test and no failures.

- [ ] **Step 5: Commit only the typography change**

Stage `TeaCategoryPage.astro` and only the typography-test hunk from the test file, leaving the existing collection-test hunks unstaged:

```bash
git add src/components/TeaCategoryPage.astro
git add -p tests/tea-subcategory-pages.test.mjs
git commit -m "fix: match tea description text size"
```

---

### Task 2: Add the collection category and permanent hero

**Files:**
- Modify: `tests/tea-subcategory-pages.test.mjs`
- Modify: `src/consts.ts`
- Modify: `src/pages/tea/index.astro`
- Modify: `src/components/TeaCategoryPage.astro`
- Create: `src/assets/tea/my-teaware-collection/hero.png`

**Interfaces:**
- Consumes: The existing post tagged `My Teaware Collection`; `TeaCategory` records; `/tmp/my-teaware-collection-hero.png` downloaded from the supplied public ChatGPT image share.
- Produces: `TeaCategory.fixedHero`; a fourth `/tea/` card; `/tea/my-teaware-collection/`; the same fixed hero on the card, page, and page metadata.

- [ ] **Step 1: Complete the failing page expectations**

The uncommitted test file already expects the fourth ordered link, fixed hero, collection post, and category-only filtering. Add the collection description to the existing `descriptions` object:

```js
'my-teaware-collection': 'My personal collection of teaware',
```

- [ ] **Step 2: Run the generated-page checks and verify RED**

Run:

```bash
npm run build && node tests/tea-subcategory-pages.test.mjs
```

Expected: FAIL because `/tea/` lacks the fourth link and `dist/tea/my-teaware-collection/index.html` does not exist.

- [ ] **Step 3: Save the supplied permanent hero**

Run:

```bash
mkdir -p src/assets/tea/my-teaware-collection
cp /tmp/my-teaware-collection-hero.png src/assets/tea/my-teaware-collection/hero.png
```

- [ ] **Step 4: Extend the category records**

At the top of `src/consts.ts`, import the hero:

```ts
import teawareCollectionHero from './assets/tea/my-teaware-collection/hero.png';
```

Add `fixedHero: undefined` to Yixing, Tetsubins, and Other. Append this record after Other:

```ts
{
	slug: 'my-teaware-collection',
	title: 'My Teaware Collection',
	tag: 'My Teaware Collection',
	description: 'My personal collection of teaware',
	fixedHero: teawareCollectionHero,
},
```

- [ ] **Step 5: Prefer fixed heroes on the tea index**

In `src/pages/tea/index.astro`, change the two hero fields returned by `categoryCards` to:

```ts
heroImage: category.fixedHero ?? latestPost.data.heroImage,
heroImageMaxHeight: category.fixedHero ? undefined : latestPost.data.heroImageMaxHeight,
```

- [ ] **Step 6: Render the permanent hero on the category page**

Import `Image` in `TeaCategoryPage.astro`:

```astro
import { Image } from 'astro:assets';
```

Use the fixed hero for metadata when present:

```astro
image={category.fixedHero ?? posts[0]?.data.heroImage}
```

Add the hero style:

```css
.category-hero img {
	display: block;
	width: 100%;
	margin: 0 auto 2rem;
	border-radius: 12px;
}
```

Render the decorative hero immediately before `.category-header`:

```astro
{
	category.fixedHero && (
		<div class="category-hero">
			<Image src={category.fixedHero} alt="" loading="eager" fetchpriority="high" />
		</div>
	)
}
```

- [ ] **Step 7: Run the page checks and verify GREEN**

Run:

```bash
npm run build && node tests/tea-subcategory-pages.test.mjs
```

Expected: all five subtests pass, including the fixed-hero and inherited-size checks.

---

### Task 3: Add the edited owner commentary

**Files:**
- Modify: `src/content/tea/factory-1-70s-xi-shi-76ml.md`

**Interfaces:**
- Consumes: The existing facts table and ordered photo figures.
- Produces: Three owner-commentary paragraphs between the table and first photograph.

- [ ] **Step 1: Insert the edited prose**

Immediately after the facts table and before the first `<figure>`, add:

```md
One of the legendary “Five Shapes” that every serious Factory 1 or Yixing collector is supposed to own. I haven’t had the chance to use it yet, but I already appreciate it immensely.

I love its simple yet elegant form. I also think the silver-rim repair only adds to its character.

If you look closely, there is also a seal under the lid. I have no idea what it means 🫣. I assume it simply says “Xi Shi,” since writing shape names on lids was common practice during Factory 1’s early period. But I can’t read it, so I don’t know for sure. I’m still investigating.
```

- [ ] **Step 2: Run focused content and page checks**

Run:

```bash
node --test tests/tea-content-groups.test.mjs
npm run build
node tests/tea-subcategory-pages.test.mjs
```

Expected: the content-group checks, build, and all five page subtests pass.

- [ ] **Step 3: Check responsive rendering**

Inspect `/tea/`, `/tea/my-teaware-collection/`, and `/tea/factory-1-70s-xi-shi-76ml/` at desktop and mobile widths. Confirm the sketch is uncropped, the description uses body size, the prose precedes the photos, and no image overflows horizontally.

- [ ] **Step 4: Commit the collection**

```bash
git add tests/tea-subcategory-pages.test.mjs src/consts.ts src/pages/tea/index.astro src/components/TeaCategoryPage.astro src/content/tea/factory-1-70s-xi-shi-76ml.md src/assets/tea/my-teaware-collection/hero.png
git commit -m "feat: add teaware collection category"
```

- [ ] **Step 5: Run the full suite**

Run:

```bash
npm test
```

Expected: both test files pass and the Astro build completes successfully.
