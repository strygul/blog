# Tea Subcategory Headings Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Center every tea subcategory heading and replace its post count with smaller editorial description text.

**Architecture:** Keep subcategory copy in the existing `TEA_CATEGORIES` configuration and render it through the existing shared `TeaCategoryPage`. The change stays in the two production files that already own category metadata and category-page presentation.

**Tech Stack:** Astro 5, TypeScript, CSS, Node's built-in test runner

## Global Constraints

- Use these descriptions verbatim:
  - Yixing: `Articles on Yixing clay, teapots, makers, seals, and Factory 1 history.`
  - Tetsubins: `Articles on Japanese cast-iron kettles, their history, workshops, and regional traditions.`
  - Other: `Tea notes beyond teaware, from water and brewing to useful resources.`
- Remove the rendered post count.
- Add no component, dependency, route, or content schema.
- Preserve existing edits in `tests/tea-subcategory-pages.test.mjs`.

---

### Task 1: Center and describe subcategory headings

**Files:**
- Modify: `tests/tea-subcategory-pages.test.mjs`
- Modify: `src/consts.ts`
- Modify: `src/components/TeaCategoryPage.astro`

**Interfaces:**
- Consumes: Existing `TEA_CATEGORIES` entries with `slug`, `title`, and `tag`; generated pages under `dist/tea/<slug>/index.html`.
- Produces: `TeaCategory.description: string`; centered `.category-header`; rendered editorial description in place of the post count.

- [ ] **Step 1: Write the failing rendered-page test**

Append this test without changing the existing tests:

```js
test('subcategory headings are centered and use smaller editorial descriptions', () => {
	const descriptions = {
		yixing: 'Articles on Yixing clay, teapots, makers, seals, and Factory 1 history.',
		tetsubins:
			'Articles on Japanese cast-iron kettles, their history, workshops, and regional traditions.',
		other: 'Tea notes beyond teaware, from water and brewing to useful resources.',
	};

	for (const [slug, description] of Object.entries(descriptions)) {
		const html = readPage(`tea/${slug}`);
		const header = html.match(/<div class="category-header"[\s\S]*?<\/div>/)?.[0] ?? '';
		assert.ok(header.includes(description), `${slug} description`);
		assert.doesNotMatch(html, /\d+ posts? in this category/);
	}

	const yixing = readPage('tea/yixing');
	assert.match(yixing, /\.category-header[^{}]*\{[^}]*text-align:center/);
	assert.match(yixing, /\.category-header[^{}]* p[^{}]*\{[^}]*font-size:\.8rem/);
});
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run:

```bash
npm run build && node --test --test-name-pattern="subcategory headings" tests/tea-subcategory-pages.test.mjs
```

Expected: FAIL because the Yixing page still renders the post count instead of the editorial description.

- [ ] **Step 3: Add descriptions to the existing category configuration**

Replace `TEA_CATEGORIES` with:

```ts
export const TEA_CATEGORIES = [
	{
		slug: 'yixing',
		title: 'Yixing',
		tag: 'Yixing',
		description: 'Articles on Yixing clay, teapots, makers, seals, and Factory 1 history.',
	},
	{
		slug: 'tetsubins',
		title: 'Tetsubins',
		tag: 'Tetsubin',
		description:
			'Articles on Japanese cast-iron kettles, their history, workshops, and regional traditions.',
	},
	{
		slug: 'other',
		title: 'Other',
		tag: 'Other',
		description: 'Tea notes beyond teaware, from water and brewing to useful resources.',
	},
] as const;
```

- [ ] **Step 4: Render and style the shared description**

In `TeaCategoryPage.astro`, remove the computed post-count `description`, pass `category.description` to `BaseHead`, render it beneath the `<h1>`, and update the shared styles:

```astro
<BaseHead
	title={`${category.title} — Tea — ${SITE_TITLE}`}
	description={category.description}
	image={posts[0]?.data.heroImage}
/>
```

```css
.category-header {
	margin-bottom: 2rem;
	text-align: center;
}
.category-header h1 {
	margin: 0 0 0.5rem;
}
.category-header p {
	margin: 0;
	color: rgb(var(--gray));
	font-size: 0.8rem;
}
```

```astro
<div class="category-header">
	<h1>{category.title}</h1>
	<p>{category.description}</p>
</div>
```

- [ ] **Step 5: Run focused and full verification**

Run:

```bash
node --test --test-name-pattern="subcategory headings" tests/tea-subcategory-pages.test.mjs
npm test
```

Expected: The focused test passes. The full suite passes unless an already-existing unrelated worktree change remains incomplete; report any such failure without modifying that work.

- [ ] **Step 6: Visually verify responsive layout**

Start the local Astro server and inspect `/tea/yixing/` at desktop and mobile widths. Confirm the title and description are centered, the description is visibly smaller, and the post grid remains unchanged.

- [ ] **Step 7: Commit the implementation**

```bash
git add tests/tea-subcategory-pages.test.mjs src/consts.ts src/components/TeaCategoryPage.astro
git commit -m "fix: center tea subcategory headings"
```
