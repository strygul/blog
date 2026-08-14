# Tea Subcategories Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the flat `/tea/` post list with Yixing, Tetsubins, and Other category cards whose heroes come from each category's newest post, while preserving the existing article cards and URLs inside each category.

**Architecture:** Keep classification in the existing tea-post `category` frontmatter. A shared `TeaCardGrid.astro` owns the existing card markup and responsive styles; `/tea/` supplies category-card data, while a `TeaCategoryPage.astro` supplies post-card data. Extend the existing catch-all tea route to generate the three category pages alongside unchanged article pages.

**Tech Stack:** Astro 5 content collections, Astro assets, TypeScript, Node.js built-in test runner

## Global Constraints

- The three subcategories are Yixing, Tetsubins, and Other, displayed in that order.
- Subcategory URLs are `/tea/yixing/`, `/tea/tetsubins/`, and `/tea/other/`.
- Existing `/tea/<post-id>/` article URLs and article bodies remain unchanged.
- Posts and category heroes are ordered by `pubDate`, newest first.
- Each category card inherits its hero image, date, and `heroImageMaxHeight` from that category's newest post.
- No new dependency is added.

---

### Task 1: Make every tea post's primary group explicit

**Files:**

- Create: `tests/tea-content-groups.test.mjs`
- Modify: `src/content/tea/beginners-guide-to-early-yixing-teapots.md`
- Modify: `src/content/tea/early-teapots-1.md`
- Modify: `src/content/tea/early-teapots-13-xishi-seals-of-the-green-label-period.md`
- Modify: `src/content/tea/early-teapots-1958-1960s-seals.md`
- Modify: `src/content/tea/early-teapots-appreciation-of-early-teapots-with-the-ting-ji-seal.md`
- Modify: `src/content/tea/early-teapots-appreciation-of-the-gao-tang-po.md`
- Modify: `src/content/tea/early-teapots-clay-60s-and-70s.md`
- Modify: `src/content/tea/early-teapots-factory-1-chinese-era-base-seals.md`
- Modify: `src/content/tea/early-teapots-factory-1-green-white-and-laser-labels.md`
- Modify: `src/content/tea/early-teapots-finishing-characteristics-of-early-teapots-pre-1980s.md`
- Modify: `src/content/tea/early-teapots-five-shape-pots.md`
- Modify: `src/content/tea/early-teapots-flat-base-vs-grooved-base.md`
- Modify: `src/content/tea/early-teapots-order-versus-chaos.md`
- Modify: `src/content/tea/early-teapots-the-appreciation-of-xian-piao-series.md`
- Modify: `src/content/tea/early-teapots-the-qing-yin-series.md`
- Modify: `src/content/tea/early-teapots-the-tingji-seal.md`
- Modify: `src/content/tea/early-teapots-understanding-niangao-clay.md`
- Modify: `src/content/tea/f1-seals.md`
- Modify: `src/content/tea/f1-shuiping-shape-evolution.md`
- Modify: `src/content/tea/factory-1-packaging-70s-80s-90s.md`
- Modify: `src/content/tea/factory-1-variety-of-teapots.md`
- Modify: `src/content/tea/green-label-seals-repository.md`
- Modify: `src/content/tea/little-secret-i-heard.md`
- Modify: `src/content/tea/resources.md`
- Modify: `src/content/tea/the-other-99-water-for-tea.md`
- Modify: `src/content/tea/yixing-factory-1-chronicle-part-1.md`
- Modify: `src/content/tea/yixing-factory-1-chronicle-part-2.md`

**Interfaces:**

- Consumes: Existing Markdown frontmatter and its normalized `category: string[]` schema.
- Produces: Exactly one of `Yixing`, `Tetsubin`, or `Other` on every tea post.

- [ ] **Step 1: Write the failing classification test**

Create `tests/tea-content-groups.test.mjs`:

```js
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import test from 'node:test';

const teaDirectory = new URL('../src/content/tea/', import.meta.url);
const groupNames = new Set(['Yixing', 'Tetsubin', 'Other']);
const expectedExceptions = new Map([
	['resources', 'Other'],
	['the-other-99-water-for-tea', 'Other'],
	['tetsubin-history-1-birth-of-the-iron-kettle', 'Tetsubin'],
	['tetsubin-history-2-morioka', 'Tetsubin'],
	['tetsubin-history-3-mizusawa-oshu', 'Tetsubin'],
	['tetsubin-history-4-yamagata', 'Tetsubin'],
]);

function readCategories(file) {
	const frontmatter = readFileSync(file, 'utf8').split('---', 3)[1];
	const lines = frontmatter.split('\n');
	const categoryLine = lines.findIndex((line) => line.startsWith('category:'));
	const inlineCategory = lines[categoryLine].slice('category:'.length).trim();

	if (inlineCategory) return [inlineCategory.replaceAll('"', '')];

	return lines.slice(categoryLine + 1).reduce((categories, line) => {
		if (/^\s+-\s+/.test(line)) {
			categories.push(line.replace(/^\s+-\s+/, '').replaceAll('"', ''));
		}
		return categories;
	}, []);
}

test('every tea post belongs to exactly one tea subcategory', () => {
	for (const filename of readdirSync(teaDirectory).filter((name) => name.endsWith('.md'))) {
		const id = basename(filename, '.md');
		const groups = readCategories(join(teaDirectory.pathname, filename)).filter((category) =>
			groupNames.has(category),
		);
		assert.deepEqual(groups, [expectedExceptions.get(id) ?? 'Yixing'], id);
	}
});
```

- [ ] **Step 2: Run the test and verify RED**

Run:

```bash
node --test tests/tea-content-groups.test.mjs
```

Expected: FAIL on `beginners-guide-to-early-yixing-teapots` because its group list is empty instead of `['Yixing']`.

- [ ] **Step 3: Add the missing group tags**

For the Yixing files listed in this task, preserve all current tags and add `"Yixing"`. Convert scalar frontmatter such as:

```yaml
category: "Tea"
```

to:

```yaml
category:
  - "Tea"
  - "Yixing"
```

For existing arrays, append the tag:

```yaml
category:
  - "Tea"
  - "Early Teapots Encyclopedia"
  - "Yixing"
```

Do not edit the four posts already tagged `Yixing` or the four posts already tagged `Tetsubin`. Add `"Other"` to `resources.md` and `the-other-99-water-for-tea.md`, preserving their current tags.

- [ ] **Step 4: Verify classification and Astro content loading**

Run:

```bash
node --test tests/tea-content-groups.test.mjs
npm run build
```

Expected: the Node test reports 1 passing test and Astro exits successfully.

- [ ] **Step 5: Commit the explicit classification**

```bash
git add tests/tea-content-groups.test.mjs src/content/tea
git commit -m "content: group tea posts into sections"
```

---

### Task 2: Render the category hub and subcategory pages

**Files:**

- Create: `tests/tea-subcategory-pages.test.mjs`
- Create: `src/components/TeaCardGrid.astro`
- Create: `src/components/TeaCategoryPage.astro`
- Modify: `src/consts.ts`
- Modify: `src/pages/tea/index.astro`
- Modify: `src/pages/tea/[...slug].astro`

**Interfaces:**

- Consumes: `category: string[]`, `pubDate`, `heroImage`, and optional `heroImageMaxHeight` from tea collection entries.
- Produces: `TEA_CATEGORIES` with `{ slug, title, tag }`; `TeaCardGrid` items with `{ href, title, pubDate, heroImage?, heroImageMaxHeight? }`; three generated category routes.

- [ ] **Step 1: Write the failing generated-page test**

Create `tests/tea-subcategory-pages.test.mjs`:

```js
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import test, { before } from 'node:test';

before(() => execFileSync('npm', ['run', 'build'], { stdio: 'pipe' }));

const readPage = (path) => readFileSync(new URL(`../dist/${path}/index.html`, import.meta.url), 'utf8');

function linkedCard(html, href) {
	const link = `href="${href}"`;
	const linkPosition = html.indexOf(link);
	assert.notEqual(linkPosition, -1, `Missing ${href}`);
	return html.slice(html.lastIndexOf('<a ', linkPosition), html.indexOf('</a>', linkPosition) + 4);
}

const imageSource = (html) => html.match(/<img[^>]+src="([^"]+)"/)?.[1];
const dateTime = (html) => html.match(/<time[^>]+datetime="([^"]+)"/)?.[1];
const firstPostCard = (html) => html.match(/<ul>[\s\S]*?(<a [\s\S]*?<\/a>)/)?.[1];

test('tea index links to the three subcategories in order', () => {
	const html = readPage('tea');
	const links = ['/tea/yixing/', '/tea/tetsubins/', '/tea/other/'];
	const positions = links.map((href) => html.indexOf(`href="${href}"`));
	assert.ok(positions.every((position) => position >= 0));
	assert.deepEqual(positions, [...positions].sort((a, b) => a - b));
});

test('subcategory pages contain only their assigned post groups', () => {
	const yixing = readPage('tea/yixing');
	const tetsubins = readPage('tea/tetsubins');
	const other = readPage('tea/other');

	assert.match(yixing, /href="\/tea\/yixing-factory-1-chronicle-part-2\/"/);
	assert.doesNotMatch(yixing, /href="\/tea\/tetsubin-history-/);
	assert.doesNotMatch(yixing, /href="\/tea\/resources\/"/);

	assert.match(tetsubins, /href="\/tea\/tetsubin-history-4-yamagata\/"/);
	assert.doesNotMatch(tetsubins, /href="\/tea\/yixing-factory-/);

	assert.match(other, /href="\/tea\/resources\/"/);
	assert.match(other, /href="\/tea\/the-other-99-water-for-tea\/"/);
	assert.doesNotMatch(other, /href="\/tea\/tetsubin-history-/);
});

test('each category card inherits the newest post hero and date', () => {
	const index = readPage('tea');

	for (const slug of ['yixing', 'tetsubins', 'other']) {
		const categoryCard = linkedCard(index, `/tea/${slug}/`);
		const postCard = firstPostCard(readPage(`tea/${slug}`));
		assert.ok(postCard, `Missing first post card for ${slug}`);
		assert.equal(imageSource(categoryCard), imageSource(postCard), `${slug} hero`);
		assert.equal(dateTime(categoryCard), dateTime(postCard), `${slug} date`);
	}
});
```

- [ ] **Step 2: Run the generated-page test and verify RED**

Run:

```bash
node --test tests/tea-subcategory-pages.test.mjs
```

Expected: FAIL with `ENOENT` for `dist/tea/yixing/index.html` because the category routes do not exist.

- [ ] **Step 3: Define the shared category configuration**

Append to `src/consts.ts`:

```ts
export const TEA_CATEGORIES = [
	{ slug: 'yixing', title: 'Yixing', tag: 'Yixing' },
	{ slug: 'tetsubins', title: 'Tetsubins', tag: 'Tetsubin' },
	{ slug: 'other', title: 'Other', tag: 'Other' },
] as const;

export type TeaCategory = (typeof TEA_CATEGORIES)[number];
```

- [ ] **Step 4: Extract the existing card grid without changing its presentation**

Create `src/components/TeaCardGrid.astro`. Move the current `/tea/` `<ul>` card markup and all `ul`, `li`, `.title`, `.date`, hover, capped-image, and mobile CSS rules into it. Use this exact data boundary:

```astro
---
import { Image } from 'astro:assets';
import type { CollectionEntry } from 'astro:content';
import FormattedDate from './FormattedDate.astro';

type TeaPostData = CollectionEntry<'tea'>['data'];

export interface TeaCardItem {
	href: string;
	title: string;
	pubDate: Date;
	heroImage?: TeaPostData['heroImage'];
	heroImageMaxHeight?: number;
}

interface Props {
	items: TeaCardItem[];
}

const { items } = Astro.props;
---

<ul>
	{
		items.map((item) => (
			<li>
				<a href={item.href}>
					{item.heroImage && (
						<Image
							width={720}
							height={360}
							src={item.heroImage}
							alt=""
							class:list={[item.heroImageMaxHeight != null && 'post-list-hero--capped']}
							style={item.heroImageMaxHeight != null ? {
								maxHeight: `${item.heroImageMaxHeight}px`,
								maxWidth: '100%',
								width: 'auto',
								height: 'auto',
								objectFit: 'contain',
							} : undefined}
						/>
					)}
					<h5 class="title">{item.title}</h5>
					<p class="date"><FormattedDate date={item.pubDate} /></p>
				</a>
			</li>
		))
	}
</ul>
```

Copy the current card CSS verbatim below this markup so both callers retain the exact desktop and mobile behavior.

- [ ] **Step 5: Build the reusable category page**

Create `src/components/TeaCategoryPage.astro` with a normal document shell (`BaseHead`, `Header`, `main`, `Footer`), a heading and post count, and the shared grid:

```astro
---
import type { CollectionEntry } from 'astro:content';
import type { TeaCategory } from '../consts';
import { SITE_TITLE } from '../consts';
import BaseHead from './BaseHead.astro';
import Footer from './Footer.astro';
import Header from './Header.astro';
import TeaCardGrid from './TeaCardGrid.astro';

interface Props {
	category: TeaCategory;
	posts: CollectionEntry<'tea'>[];
}

const { category, posts } = Astro.props;
const base = import.meta.env.BASE_URL;
const description = `${posts.length} tea article${posts.length === 1 ? '' : 's'} about ${category.title}.`;
---

<!doctype html>
<html lang="en">
	<head>
		<BaseHead title={`${category.title} — Tea — ${SITE_TITLE}`} description={description} image={posts[0]?.data.heroImage} />
		<style>
			main { width: 960px; }
			.category-header { margin-bottom: 2rem; }
			.category-header h1 { margin: 0 0 0.5rem; }
			.category-header p { margin: 0; color: rgb(var(--gray)); }
		</style>
	</head>
	<body>
		<Header />
		<main>
			<section>
				<div class="category-header">
					<h1>{category.title}</h1>
					<p>{posts.length} post{posts.length !== 1 ? 's' : ''} in this category</p>
				</div>
				<TeaCardGrid items={posts.map((post) => ({
					href: `${base}tea/${post.id}/`,
					title: post.data.title,
					pubDate: post.data.pubDate,
					heroImage: post.data.heroImage,
					heroImageMaxHeight: post.data.heroImageMaxHeight,
				}))} />
			</section>
		</main>
		<Footer />
	</body>
</html>
```

- [ ] **Step 6: Generate category routes beside the existing article routes**

Modify `src/pages/tea/[...slug].astro` so `getStaticPaths()` returns the existing article paths plus one path per `TEA_CATEGORIES` entry. Filter tags case-insensitively and sort each category newest first:

```ts
export async function getStaticPaths() {
	const posts = await getCollection('tea');
	const articlePaths = posts.map((post) => ({
		params: { slug: post.id },
		props: { post },
	}));
	const categoryPaths = TEA_CATEGORIES.map((category) => ({
		params: { slug: category.slug },
		props: {
			category,
			posts: posts
				.filter((post) => post.data.category.some((tag) => tag.toLowerCase() === category.tag.toLowerCase()))
				.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()),
		},
	}));

	return [...articlePaths, ...categoryPaths];
}
```

Use optional props to choose the current article renderer or the category renderer without changing `BlogPost`:

```astro
---
import type { CollectionEntry } from 'astro:content';
import { getCollection, render } from 'astro:content';
import TeaCategoryPage from '../../components/TeaCategoryPage.astro';
import { TEA_CATEGORIES, type TeaCategory } from '../../consts';
import BlogPost from '../../layouts/BlogPost.astro';

interface Props {
	post?: CollectionEntry<'tea'>;
	category?: TeaCategory;
	posts?: CollectionEntry<'tea'>[];
}

const { post, category, posts = [] } = Astro.props;
const Content = post ? (await render(post)).Content : undefined;
---

{
	post && Content ? (
		<BlogPost {...post.data}><Content /></BlogPost>
	) : category ? (
		<TeaCategoryPage category={category} posts={posts} />
	) : null
}
```

- [ ] **Step 7: Replace the `/tea/` post list with dynamic category cards**

In `src/pages/tea/index.astro`, keep the introduction unchanged. Import `TEA_CATEGORIES` and `TeaCardGrid`, retain the single newest-first sort, and derive each card with `find`:

```ts
const categoryCards = TEA_CATEGORIES.map((category) => {
	const latestPost = posts.find((post) =>
		post.data.category.some((tag) => tag.toLowerCase() === category.tag.toLowerCase()),
	);
	if (!latestPost) throw new Error(`Tea category "${category.title}" has no posts`);

	return {
		href: `${base}tea/${category.slug}/`,
		title: category.title,
		pubDate: latestPost.data.pubDate,
		heroImage: latestPost.data.heroImage,
		heroImageMaxHeight: latestPost.data.heroImageMaxHeight,
	};
});
```

Replace the existing `<ul>` with `<TeaCardGrid items={categoryCards} />` and remove the card CSS now owned by `TeaCardGrid.astro`. Keep `main { width: 960px; }` and all introduction markup/styles.

- [ ] **Step 8: Verify GREEN and all site output**

Run:

```bash
node --test tests/tea-content-groups.test.mjs tests/tea-subcategory-pages.test.mjs
npm run build
```

Expected: 4 passing Node tests and a successful Astro build with article pages plus `/tea/yixing/`, `/tea/tetsubins/`, and `/tea/other/`.

- [ ] **Step 9: Commit the page reorganization**

```bash
git add tests/tea-subcategory-pages.test.mjs src/components/TeaCardGrid.astro src/components/TeaCategoryPage.astro src/consts.ts src/pages/tea/index.astro 'src/pages/tea/[...slug].astro'
git commit -m "feat: organize tea posts into sections"
```

---

### Task 3: Final regression and scope check

**Files:**

- Verify only; no planned modifications.

**Interfaces:**

- Consumes: Completed content tags and generated tea pages.
- Produces: Evidence that the approved behavior works without unrelated changes.

- [ ] **Step 1: Run the complete available verification**

```bash
node --test tests/*.test.mjs
npm run build
git diff --check HEAD~2..HEAD
```

Expected: all tests pass, Astro builds without warnings or errors, and `git diff --check` prints nothing.

- [ ] **Step 2: Inspect the scoped diff**

```bash
git status --short
git diff --stat HEAD~2..HEAD
git diff --name-only HEAD~2..HEAD
```

Expected: only the two tests, the two tea components, `src/consts.ts`, the two tea route files, and the specified tea frontmatter files appear in the implementation commits. Pre-existing untracked files remain unmodified and uncommitted.
