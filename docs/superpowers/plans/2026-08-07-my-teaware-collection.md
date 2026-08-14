# My Teaware Collection Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a fixed-hero My Teaware Collection tea subcategory and publish its first Factory 1 Xi Shi post with the supplied photographs and specifications.

**Architecture:** Keep tea grouping in the existing post `category` frontmatter and extend the existing category configuration with an optional fixed hero. Reuse `TeaCardGrid`, `TeaCategoryPage`, and `BlogPost`; only the new category overrides the dynamic category hero.

**Tech Stack:** Astro 5 content collections, Astro assets, Markdown, Node.js built-in test runner

## Global Constraints

- The category title is `My Teaware Collection` and its URL is `/tea/my-teaware-collection/`.
- The supplied sketch is permanent on both the `/tea/` category card and collection page.
- Individual collection posts keep their own hero images.
- The first post title is `Factory 1 70s Xi Shi, 76ml` and its URL is `/tea/factory-1-70s-xi-shi-76ml/`.
- The publication date is August 7, 2026.
- The body photographs appear once each in numeric order from `xi_shi_01.jpg` through `xi_shi_11.jpg`.
- Existing category hero behavior remains unchanged.
- No new dependency or page template is added.

---

### Task 1: Add the first collection post

**Files:**

- Modify: `tests/tea-content-groups.test.mjs`
- Create: `src/content/tea/factory-1-70s-xi-shi-76ml.md`
- Create: `src/assets/tea/factory-1-70s-xi-shi-76ml/intro.jpg`
- Create: `public/tea/posts/factory-1-70s-xi-shi-76ml/xi_shi_01.jpg` through `xi_shi_11.jpg`

**Interfaces:**

- Consumes: tea frontmatter fields `title`, `description`, `pubDate`, `category`, and `heroImage`.
- Produces: a tea collection entry tagged `My Teaware Collection` with the post ID `factory-1-70s-xi-shi-76ml`.

- [ ] **Step 1: Extend the classification test before adding the post**

Change the group set and exception map in `tests/tea-content-groups.test.mjs`:

```js
const groupNames = new Set(['Yixing', 'Tetsubin', 'Other', 'My Teaware Collection']);
const expectedExceptions = new Map([
	['factory-1-70s-xi-shi-76ml', 'My Teaware Collection'],
	['resources', 'Other'],
	['the-other-99-water-for-tea', 'Other'],
	['tetsubin-history-1-birth-of-the-iron-kettle', 'Tetsubin'],
	['tetsubin-history-2-morioka', 'Tetsubin'],
	['tetsubin-history-3-mizusawa-oshu', 'Tetsubin'],
	['tetsubin-history-4-yamagata', 'Tetsubin'],
]);
```

Add one content test:

```js
test('the first collection post contains its group, facts, and ordered photographs', () => {
	const filename = join(teaDirectory.pathname, 'factory-1-70s-xi-shi-76ml.md');
	const markdown = readFileSync(filename, 'utf8');
	assert.equal(readCategories(filename).includes('My Teaware Collection'), true);
	for (const fact of ['Mid-1970s', 'Hongni', '76 ml', '10 seconds', '7.6 ml/s', '83.3 g']) {
		assert.ok(markdown.includes(fact), fact);
	}

	const positions = Array.from({ length: 11 }, (_, index) =>
		markdown.indexOf(`xi_shi_${String(index + 1).padStart(2, '0')}.jpg`),
	);
	assert.ok(positions.every((position) => position >= 0));
	assert.deepEqual(positions, [...positions].sort((a, b) => a - b));
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```bash
node --test tests/tea-content-groups.test.mjs
```

Expected: the new test fails with `ENOENT` because `factory-1-70s-xi-shi-76ml.md` does not exist.

- [ ] **Step 3: Copy the supplied post assets**

Run:

```bash
mkdir -p src/assets/tea/factory-1-70s-xi-shi-76ml public/tea/posts/factory-1-70s-xi-shi-76ml
cp /home/iev/Documents/xi_shi_collage.jpg src/assets/tea/factory-1-70s-xi-shi-76ml/intro.jpg
cp /home/iev/Documents/xi_shi_{01..11}.jpg public/tea/posts/factory-1-70s-xi-shi-76ml/
```

- [ ] **Step 4: Create the post with the exact facts and ordered photographs**

Create `src/content/tea/factory-1-70s-xi-shi-76ml.md`:

```md
---
title: "Factory 1 70s Xi Shi, 76ml"
pubDate: "2026-08-07"
category:
  - "Tea"
  - "Teapots"
  - "My Teaware Collection"
description: "A mid-1970s Factory 1 Xi Shi teapot in hongni, with a 76 ml capacity."
heroImage: "../../assets/tea/factory-1-70s-xi-shi-76ml/intro.jpg"
---

| | |
| --- | --- |
| Factory | Factory 1 |
| Shape | Xi Shi |
| Period | Mid-1970s |
| Clay | Hongni |
| Capacity | 76 ml |
| Pour | 10 seconds (7.6 ml/s) |
| Weight | 83.3 g |

<figure class="full-size">
<img src="/tea/posts/factory-1-70s-xi-shi-76ml/xi_shi_01.jpg" alt="Factory 1 1970s Xi Shi teapot, view 1" loading="lazy" decoding="async" />
</figure>

<figure class="full-size">
<img src="/tea/posts/factory-1-70s-xi-shi-76ml/xi_shi_02.jpg" alt="Factory 1 1970s Xi Shi teapot, view 2" loading="lazy" decoding="async" />
</figure>

<figure class="full-size">
<img src="/tea/posts/factory-1-70s-xi-shi-76ml/xi_shi_03.jpg" alt="Factory 1 1970s Xi Shi teapot, view 3" loading="lazy" decoding="async" />
</figure>

<figure class="full-size">
<img src="/tea/posts/factory-1-70s-xi-shi-76ml/xi_shi_04.jpg" alt="Factory 1 1970s Xi Shi teapot, view 4" loading="lazy" decoding="async" />
</figure>

<figure class="full-size">
<img src="/tea/posts/factory-1-70s-xi-shi-76ml/xi_shi_05.jpg" alt="Factory 1 1970s Xi Shi teapot, view 5" loading="lazy" decoding="async" />
</figure>

<figure class="full-size">
<img src="/tea/posts/factory-1-70s-xi-shi-76ml/xi_shi_06.jpg" alt="Factory 1 1970s Xi Shi teapot, view 6" loading="lazy" decoding="async" />
</figure>

<figure class="full-size">
<img src="/tea/posts/factory-1-70s-xi-shi-76ml/xi_shi_07.jpg" alt="Factory 1 1970s Xi Shi teapot, view 7" loading="lazy" decoding="async" />
</figure>

<figure class="full-size">
<img src="/tea/posts/factory-1-70s-xi-shi-76ml/xi_shi_08.jpg" alt="Factory 1 1970s Xi Shi teapot, view 8" loading="lazy" decoding="async" />
</figure>

<figure class="full-size">
<img src="/tea/posts/factory-1-70s-xi-shi-76ml/xi_shi_09.jpg" alt="Factory 1 1970s Xi Shi teapot, view 9" loading="lazy" decoding="async" />
</figure>

<figure class="full-size">
<img src="/tea/posts/factory-1-70s-xi-shi-76ml/xi_shi_10.jpg" alt="Factory 1 1970s Xi Shi teapot, view 10" loading="lazy" decoding="async" />
</figure>

<figure class="full-size">
<img src="/tea/posts/factory-1-70s-xi-shi-76ml/xi_shi_11.jpg" alt="Factory 1 1970s Xi Shi teapot, view 11" loading="lazy" decoding="async" />
</figure>
```

- [ ] **Step 5: Verify the content test and Astro content loading**

Run:

```bash
node --test tests/tea-content-groups.test.mjs
npm run build
```

Expected: both commands exit successfully; Astro generates `/tea/factory-1-70s-xi-shi-76ml/`.

- [ ] **Step 6: Commit the first collection post**

```bash
git add tests/tea-content-groups.test.mjs src/content/tea/factory-1-70s-xi-shi-76ml.md src/assets/tea/factory-1-70s-xi-shi-76ml public/tea/posts/factory-1-70s-xi-shi-76ml
git commit -m "content: add Factory 1 Xi Shi collection post"
```

---

### Task 2: Add the fixed-hero collection category

**Files:**

- Modify: `tests/tea-subcategory-pages.test.mjs`
- Modify: `src/consts.ts`
- Modify: `src/pages/tea/index.astro`
- Modify: `src/components/TeaCategoryPage.astro`
- Create: `src/assets/tea/my-teaware-collection/hero.png`

**Interfaces:**

- Consumes: the `factory-1-70s-xi-shi-76ml` tea entry from Task 1 and the existing `TeaCategory` configuration.
- Produces: a `TeaCategory` item with `fixedHero: ImageMetadata | undefined`, plus `/tea/my-teaware-collection/`.

- [ ] **Step 1: Add failing generated-page coverage**

Change the ordered links in the first test in `tests/tea-subcategory-pages.test.mjs`:

```js
const links = [
	'/tea/yixing/',
	'/tea/tetsubins/',
	'/tea/other/',
	'/tea/my-teaware-collection/',
];
```

Add this test:

```js
test('collection category keeps its fixed hero on the index and category page', () => {
	const index = readPage('tea');
	const collection = readPage('tea/my-teaware-collection');
	const post = readPage('tea/factory-1-70s-xi-shi-76ml');
	const collectionCard = linkedCard(index, '/tea/my-teaware-collection/');

	assert.equal(imageSource(collectionCard), imageSource(collection));
	assert.notEqual(imageSource(collectionCard), imageSource(post));
	assert.match(collection, /href="\/tea\/factory-1-70s-xi-shi-76ml\/"/);
	assert.doesNotMatch(collection, /href="\/tea\/yixing-factory-/);
});
```

Keep the existing dynamic-hero test limited to `yixing`, `tetsubins`, and `other`.

- [ ] **Step 2: Run the generated-page test and verify RED**

Run:

```bash
node --test tests/tea-subcategory-pages.test.mjs
```

Expected: the ordered-link assertion fails because `/tea/my-teaware-collection/` is not configured.

- [ ] **Step 3: Copy the permanent hero and define the category**

Run:

```bash
mkdir -p src/assets/tea/my-teaware-collection
cp /tmp/pasted-image-6.png src/assets/tea/my-teaware-collection/hero.png
```

In `src/consts.ts`, import it and add `fixedHero` explicitly to each item so the union has one stable property:

```ts
import teawareCollectionHero from './assets/tea/my-teaware-collection/hero.png';

export const TEA_CATEGORIES = [
	{ slug: 'yixing', title: 'Yixing', tag: 'Yixing', fixedHero: undefined },
	{ slug: 'tetsubins', title: 'Tetsubins', tag: 'Tetsubin', fixedHero: undefined },
	{ slug: 'other', title: 'Other', tag: 'Other', fixedHero: undefined },
	{
		slug: 'my-teaware-collection',
		title: 'My Teaware Collection',
		tag: 'My Teaware Collection',
		fixedHero: teawareCollectionHero,
	},
] as const;
```

- [ ] **Step 4: Use the fixed hero on the tea index**

In `src/pages/tea/index.astro`, preserve the latest post date and sizing but prefer the configured hero:

```ts
heroImage: category.fixedHero ?? latestPost.data.heroImage,
heroImageMaxHeight: category.fixedHero ? undefined : latestPost.data.heroImageMaxHeight,
```

- [ ] **Step 5: Render the fixed hero on the category page**

Import `Image` in `src/components/TeaCategoryPage.astro` and render this before `.category-header`:

```astro
{
	category.fixedHero && (
		<div class="category-hero">
			<Image
				width={1020}
				height={510}
				src={category.fixedHero}
				alt={category.title}
				loading="eager"
				fetchpriority="high"
			/>
		</div>
	)
}
```

Add only the matching existing post-hero presentation:

```css
.category-hero img {
	display: block;
	width: 100%;
	margin: 0 auto 2rem;
	border-radius: 12px;
}
```

Also pass `category.fixedHero ?? posts[0]?.data.heroImage` to `BaseHead`.

- [ ] **Step 6: Verify the focused tests and complete suite**

Run:

```bash
node --test tests/tea-subcategory-pages.test.mjs
npm test
```

Expected: all tests and the Astro build exit successfully.

- [ ] **Step 7: Check the rendered pages**

Run the local Astro server and inspect `/tea/`, `/tea/my-teaware-collection/`, and `/tea/factory-1-70s-xi-shi-76ml/` at desktop and mobile widths. Confirm that the sketch appears on the category card and category page, the collage appears on the post, the category contains only the Xi Shi post, and all body photos retain their aspect ratio without horizontal overflow.

- [ ] **Step 8: Commit the category behavior**

```bash
git add tests/tea-subcategory-pages.test.mjs src/consts.ts src/pages/tea/index.astro src/components/TeaCategoryPage.astro src/assets/tea/my-teaware-collection/hero.png
git commit -m "feat: add teaware collection category"
```
