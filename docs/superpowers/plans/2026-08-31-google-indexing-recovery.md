# Google Indexing Recovery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Strengthen crawl discovery, remove redundant archives from the indexable set, and publish accurate sitemap modification dates for strygul.com.

**Architecture:** Keep Astro's existing hubs, related-post component, metadata component, and sitemap integration. Normalize internal links to canonical trailing-slash URLs, mark only generic category archives `noindex, follow`, filter those archives from the sitemap, and derive sitemap dates from metadata already present in generated HTML.

**Tech Stack:** Astro 5, TypeScript/Astro components, `@astrojs/sitemap`, Node.js built-in test runner

**Spec:** `docs/superpowers/specs/2026-08-31-google-indexing-recovery-design.md`

## Global Constraints

- Every unique Tea, Software/AI, and Ballet article remains indexable.
- Generic `/categories/` archives remain usable but receive `noindex, follow` and stay out of the sitemap.
- Tea subcategory hubs remain indexable.
- Sitemap dates come from rendered publication/modification metadata, never build time.
- Add no production dependency and no SEO framework.
- Internal directory links use canonical trailing slashes.
- Confirm with the user immediately before Search Console submissions.
- Backlink outreach remains a separate follow-up workflow.

## File Structure

- `tests/seo-indexing.test.mjs`: build-output checks for hub navigation, canonical internal links, category robots metadata, sitemap filtering, and sitemap dates.
- `tests/internal-post-links.test.mjs`: require canonical trailing slashes on existing related-article links.
- `src/components/Header.astro`: permanent links to each principal site hub.
- `src/components/RelatedPosts.astro`: canonical related-article URLs.
- `src/pages/index.astro`: canonical homepage hub links.
- `src/pages/blog/index.astro`: canonical links from the all-posts hub to each section hub.
- `src/components/BaseHead.astro`: optional `noindex` metadata.
- `src/pages/categories/index.astro`: opt the generic category index out of indexing.
- `src/pages/categories/[...slug].astro`: opt generic category detail archives out of indexing.
- `astro.config.mjs`: category sitemap filter and accurate generated-page date serializer.

---

### Task 1: Canonical permanent navigation

**Files:**
- Create: `tests/seo-indexing.test.mjs`
- Modify: `tests/internal-post-links.test.mjs:26-36`
- Modify: `src/components/Header.astro:8-16`
- Modify: `src/components/RelatedPosts.astro:282-288`
- Modify: `src/pages/index.astro:19-32`
- Modify: `src/pages/blog/index.astro:105-118`

**Interfaces:**
- Consumes: Astro's generated HTML under `dist/` and the existing `HeaderLink` component.
- Produces: Crawlable `<a href>` links to `/tea/`, `/god-is-dead/`, `/ballet/`, `/blog/`, and `/about/`, plus canonical trailing-slash related-article URLs.

- [ ] **Step 1: Add failing generated-navigation checks**

Create `tests/seo-indexing.test.mjs`:

```js
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const readPage = (path) =>
	readFileSync(new URL(`../dist/${path}`, import.meta.url), 'utf8');

test('the global header permanently links every principal hub', () => {
	const header = readPage('tea/index.html').match(/<header>[\s\S]*?<\/header>/)?.[0] ?? '';

	for (const href of ['/', '/tea/', '/god-is-dead/', '/ballet/', '/blog/', '/about/']) {
		assert.match(header, new RegExp(`href="${href}"`), href);
	}
});

test('homepage and all-posts hub use canonical trailing-slash links', () => {
	const homepage = readPage('index.html');
	for (const href of ['/about/', '/tea/', '/god-is-dead/', '/ballet/']) {
		assert.match(homepage, new RegExp(`href="${href}"`), href);
	}

	const allPosts = readPage('blog/index.html');
	for (const href of ['/tea/', '/god-is-dead/', '/ballet/']) {
		assert.match(allPosts, new RegExp(`href="${href}"`), href);
	}
});
```

In `tests/internal-post-links.test.mjs`, make the existing matchers require the trailing slash:

```js
function relatedLinks(html) {
	return [...relatedSection(html).matchAll(/<a href="\/(tea|god-is-dead|ballet)\/([^"#?\/]+)\/">([^<]*)<\/a>/g)];
}

// Inside "every post renders at least two related internal article links":
const internalArticleLinks = section.match(
	new RegExp(`href="/${collection}/[^"#?]+/"`, 'g'),
);
```

- [ ] **Step 2: Run the focused checks and verify they fail**

Run:

```bash
npm run build
node --test tests/internal-post-links.test.mjs tests/seo-indexing.test.mjs
```

Expected: failures identify missing hub links and non-canonical internal URLs.

- [ ] **Step 3: Add permanent canonical links**

Replace the internal link group in `src/components/Header.astro` with:

```astro
<div class="internal-links">
	<HeaderLink href={base}>Home</HeaderLink>
	<HeaderLink href={`${base}tea/`}>Tea</HeaderLink>
	<HeaderLink href={`${base}god-is-dead/`}>Software/AI</HeaderLink>
	<HeaderLink href={`${base}ballet/`}>Ballet</HeaderLink>
	<HeaderLink href={`${base}blog/`}>All Posts</HeaderLink>
	<HeaderLink href={`${base}about/`}>About</HeaderLink>
</div>
```

Render canonical related links in `src/components/RelatedPosts.astro`:

```astro
{relatedPosts.map((post) => <li><a href={`${post.href}/`}>{post.title}</a></li>)}
```

Add trailing slashes to the four links in `src/pages/index.astro`:

```astro
<a href={`${import.meta.env.BASE_URL}about/`}>Intro</a>
<a href={`${import.meta.env.BASE_URL}tea/`}>Let's drink some tea</a>
<a href={`${import.meta.env.BASE_URL}god-is-dead/`}>{PAGE_HOME_LINK_LABELS.godIsDead}</a>
<a href={`${import.meta.env.BASE_URL}ballet/`}>{PAGE_HOME_LINK_LABELS.ballet}</a>
```

Make the section headings in `src/pages/blog/index.astro` canonical without changing article URL construction:

```astro
<a href={`${basePath}/`} class="category-link">{label}</a>
```

- [ ] **Step 4: Run the focused checks and verify they pass**

Run:

```bash
npm run build
node --test tests/internal-post-links.test.mjs tests/seo-indexing.test.mjs
```

Expected: both test files pass.

- [ ] **Step 5: Commit canonical navigation**

```bash
git add tests/seo-indexing.test.mjs tests/internal-post-links.test.mjs src/components/Header.astro src/components/RelatedPosts.astro src/pages/index.astro src/pages/blog/index.astro
git commit -m "fix: use canonical internal navigation"
```

---

### Task 2: Prune generic archives and publish accurate sitemap dates

**Files:**
- Modify: `tests/seo-indexing.test.mjs`
- Modify: `src/components/BaseHead.astro:9-30,47-58`
- Modify: `src/pages/categories/index.astro:27-31`
- Modify: `src/pages/categories/[...slug].astro:48-52`
- Modify: `astro.config.mjs:1-12`

**Interfaces:**
- Consumes: generated canonical pages in `dist/`, article Open Graph timestamps, and rendered `<time datetime>` hub dates.
- Produces: `noindex, follow` on generic category archives and `<lastmod>` values on defensibly dated sitemap entries.

- [ ] **Step 1: Add failing robots and sitemap checks**

Extend the import in `tests/seo-indexing.test.mjs`:

```js
import { readdirSync, readFileSync } from 'node:fs';
```

Append these checks:

```js
function sitemapEntries() {
	const xml = readPage('sitemap-0.xml');
	return new Map(
		[...xml.matchAll(/<url><loc>([^<]+)<\/loc>(?:<lastmod>([^<]+)<\/lastmod>)?<\/url>/g)]
			.map(([, url, lastmod]) => [url, lastmod]),
	);
}

test('generic category archives are noindex and absent from the sitemap', () => {
	const categoryRoot = new URL('../dist/categories/', import.meta.url);
	const archives = [
		readPage('categories/index.html'),
		...readdirSync(categoryRoot, { withFileTypes: true })
			.filter((entry) => entry.isDirectory())
			.map((entry) => readPage(`categories/${entry.name}/index.html`)),
	];

	for (const html of archives) {
		assert.match(html, /<meta name="robots" content="noindex, follow">/);
	}

	for (const url of sitemapEntries().keys()) {
		assert.equal(new URL(url).pathname.startsWith('/categories/'), false, url);
	}
});

test('every article sitemap date matches its rendered article metadata', () => {
	const entries = sitemapEntries();
	for (const collection of ['tea', 'god-is-dead', 'ballet']) {
		const contentDirectory = new URL(`../src/content/${collection}/`, import.meta.url);
		for (const filename of readdirSync(contentDirectory).filter((name) => name.endsWith('.md'))) {
			const id = filename.slice(0, -3);
			const html = readPage(`${collection}/${id}/index.html`);
			const expected =
				html.match(/<meta property="article:modified_time" content="([^"]+)">/)?.[1] ??
				html.match(/<meta property="article:published_time" content="([^"]+)">/)?.[1];
			const actual = entries.get(`https://strygul.com/${collection}/${id}/`);

			assert.ok(expected, `${collection}/${id} is missing article date metadata`);
			assert.ok(actual, `${collection}/${id} is missing sitemap lastmod`);
			assert.equal(new Date(actual).toISOString(), expected, `${collection}/${id}`);
		}
	}
});

test('dated hubs publish their newest rendered date as lastmod', () => {
	const entries = sitemapEntries();
	for (const path of ['blog', 'tea', 'god-is-dead', 'ballet']) {
		const newestDate = readPage(`${path}/index.html`).match(/<time datetime="([^"]+)">/)?.[1];
		const lastmod = entries.get(`https://strygul.com/${path}/`);

		assert.ok(newestDate, `${path} has no rendered content date`);
		assert.ok(lastmod, `${path} has no sitemap lastmod`);
		assert.equal(new Date(lastmod).toISOString(), newestDate, path);
	}
});
```

- [ ] **Step 2: Run the focused check and verify it fails**

Run:

```bash
npm run build
node --test tests/seo-indexing.test.mjs
```

Expected: category archives lack `noindex`, remain in the sitemap, and article URLs lack `<lastmod>`.

- [ ] **Step 3: Add the optional noindex metadata**

Add the property to `BaseHead.astro`:

```ts
interface Props {
	title: string;
	description: string;
	image?: ImageMetadata;
	noindex?: boolean;
	/** Absolute URL for og:image / twitter:image. Overrides `image` when set. */
	ogImageUrl?: string;
	article?: {
		publishedTime: Date;
		modifiedTime?: Date;
	};
}
```

Include it in the existing props destructure:

```ts
const {
	title,
	description,
	image = FallbackImage,
	noindex = false,
	ogImageUrl: ogImageUrlProp,
	article,
} = Astro.props;
```

Render the directive after the generator metadata:

```astro
{noindex && <meta name="robots" content="noindex, follow" />}
```

Pass `noindex` to `BaseHead` in both category route files:

```astro
<BaseHead
	title={`Categories — ${SITE_TITLE}`}
	description={PAGE_DESCRIPTIONS.categoriesIndex}
	noindex
/>
```

```astro
<BaseHead title={`${category} — ${SITE_TITLE}`} description={categoryDescription} noindex />
```

- [ ] **Step 4: Filter archives and derive sitemap dates from generated pages**

Replace `astro.config.mjs` with:

```js
// @ts-check

import { existsSync, readFileSync } from 'node:fs';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

const outputDirectory = new URL('./dist/', import.meta.url);

/** @param {import('@astrojs/sitemap').SitemapItem} item */
function addLastmod(item) {
	const pathname = new URL(item.url).pathname;
	const page = new URL(pathname === '/' ? 'index.html' : `.${pathname}index.html`, outputDirectory);
	if (!existsSync(page)) return item;

	const html = readFileSync(page, 'utf8');
	const lastmod =
		html.match(/<meta property="article:modified_time" content="([^"]+)">/)?.[1] ??
		html.match(/<meta property="article:published_time" content="([^"]+)">/)?.[1] ??
		html.match(/<time datetime="([^"]+)">/)?.[1];

	return lastmod ? { ...item, lastmod } : item;
}

export default defineConfig({
	site: 'https://strygul.com',
	base: '/',
	integrations: [
		mdx(),
		sitemap({
			filter: (page) => !new URL(page).pathname.startsWith('/categories/'),
			serialize: addLastmod,
		}),
	],
});
```

- [ ] **Step 5: Run the focused checks and verify they pass**

Run:

```bash
npm run build
node --test tests/seo-indexing.test.mjs
```

Expected: all SEO output checks pass.

- [ ] **Step 6: Commit indexing metadata and sitemap output**

```bash
git add tests/seo-indexing.test.mjs src/components/BaseHead.astro src/pages/categories/index.astro 'src/pages/categories/[...slug].astro' astro.config.mjs
git commit -m "fix: improve crawl indexing signals"
```

---

### Task 3: Full verification and deployment

**Files:**
- Verify: all files changed in Tasks 1-2
- Verify: generated `dist/sitemap-0.xml`

**Interfaces:**
- Consumes: the complete committed implementation and the repository's GitHub Pages workflow.
- Produces: a passing production build deployed from `main` with verified live crawl metadata.

- [ ] **Step 1: Run the complete project test command**

```bash
npm test
```

Expected: build succeeds and every Node test passes.

- [ ] **Step 2: Check the final diff and worktree**

```bash
git diff --check
git status --short
git log -4 --oneline
```

Expected: no whitespace errors, no uncommitted implementation files, and the two implementation commits appear after the specification commits.

- [ ] **Step 3: Push the verified main branch**

```bash
git push origin main
```

Expected: push succeeds and triggers `.github/workflows/deploy.yml`.

- [ ] **Step 4: Wait for the Pages deployment**

Use the connected GitHub tools first, as required by `AGENTS.md`, to inspect the workflow triggered by the pushed commit and wait until it succeeds. Use `gh run watch` only if no connected GitHub capability is available.

Expected: both build and deploy jobs complete successfully.

- [ ] **Step 5: Verify live crawl output**

Fetch these URLs individually:

```bash
curl -fsS https://strygul.com/
curl -fsS https://strygul.com/categories/
curl -fsS https://strygul.com/sitemap-0.xml
curl -fsSIL --max-redirs 10 https://strygul.com/tea
```

Verify:

- The live header contains canonical links for all principal hubs.
- `/categories/` contains `noindex, follow`.
- No `/categories/` URL occurs in the sitemap.
- Article and dated-hub sitemap entries contain `<lastmod>`.
- `/tea` redirects once to `/tea/`, which returns `200`.

---

### Task 4: Search Console rollout

**Files:**
- No repository files change.

**Interfaces:**
- Consumes: the successful live deployment and the existing verified `sc-domain:strygul.com` Search Console property.
- Produces: a validation request for the obsolete redirect error and selective indexing requests for high-value entry points.

- [ ] **Step 1: Reinspect Search Console read-only**

Confirm the sitemap still reports success and inspect the live status of the previous `/tea` redirect error. Do not resubmit the existing sitemap URL; Google already reads it automatically.

- [ ] **Step 2: Ask for action-time confirmation**

Ask the user to approve these external Search Console submissions:

- Validate the previous redirect error.
- Request indexing for:
  - `https://strygul.com/`
  - `https://strygul.com/blog/`
  - `https://strygul.com/tea/`
  - `https://strygul.com/tea/yixing/`
  - `https://strygul.com/tea/tetsubins/`
  - `https://strygul.com/god-is-dead/`
  - `https://strygul.com/ballet/`
  - `https://strygul.com/tea/beginners-guide-to-early-yixing-teapots/`
  - `https://strygul.com/tea/f1-seals/`
  - `https://strygul.com/tea/tetsubin-history-1-birth-of-the-iron-kettle/`

- [ ] **Step 3: Submit only after confirmation**

Use URL Inspection for the listed URLs once each and start validation for the redirect issue. Record any quota, live-test, or eligibility message exactly; do not repeat requests that succeeded.

- [ ] **Step 4: Report the monitoring baseline**

Report the Page Indexing totals, sitemap status, submission results, and the expectation that recrawling can take days to weeks. Then begin the separately scoped backlink-prospect workflow.
