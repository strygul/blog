# Sheng Puer Series Introduction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish the introductory roadmap for the sheng puer comparative-flight series, including the approved personal preface, all 24 flight themes, vendor-selection methodology, and verified EUR budget paths.

**Architecture:** Add one Markdown article to the existing `tea` content collection and integrate it with the existing `Other` tea subcategory and related-post system. Add a focused Node content-contract test so later edits cannot silently drop the roadmap, budget figures, TeaDB sources, or vendor-selection caveats.

**Tech Stack:** Astro 5 content collections, Markdown, TypeScript/Astro components, Node.js built-in test runner

**Spec:** `docs/superpowers/specs/2026-08-31-sheng-puer-series-introduction-design.md`

## Global Constraints

- Keep the voice personal, reflective, and exploratory; do not present the program as a definitive curriculum.
- Use the working title “Learning Sheng Puer Through Comparative Flights.”
- Do not add a hero image in this task.
- Reveal the 12 core flight titles and the subjects of all 12 advanced flights, but do not include a complete flight.
- Present vendors as a flight-specific shortlist, not a ranking, endorsement hierarchy, or proof of the lowest prices.
- Treat TeaDB as the discovery and interpretation compass; use the checked vendor pages for product formats, stock, prices, and vendor claims.
- Use the 2026-08-30 price snapshot and exclude shipping, tax, card-conversion spreads, and import costs.
- The advanced all-in total is a union of advanced-core and elective-only offers, not another core tier.

---

## File Structure

- Create `src/content/tea/learning-sheng-puer-through-comparative-flights.md`: the public series introduction.
- Create `tests/sheng-puer-series-introduction.test.mjs`: content contract for required headings, roadmap, budget facts, vendor caveats, and TeaDB sources.
- Modify `src/components/RelatedPosts.astro`: give the new article at least two existing related tea posts.
- Modify `tests/tea-content-groups.test.mjs`: explicitly assign the new non-Yixing article to the existing `Other` tea subcategory.
- Modify `tests/tea-subcategory-pages.test.mjs`: update the `Other` category's newest-post expectations for the new image-less article.

### Task 1: Publish and integrate the series introduction

**Files:**
- Create: `src/content/tea/learning-sheng-puer-through-comparative-flights.md`
- Create: `tests/sheng-puer-series-introduction.test.mjs`
- Modify: `src/components/RelatedPosts.astro`
- Modify: `tests/tea-content-groups.test.mjs`
- Modify: `tests/tea-subcategory-pages.test.mjs`
- Reference: `docs/research/sheng-puer-article-preface.md`
- Reference: `docs/research/sheng-puer-educational-program.md`
- Reference: `docs/research/sheng-puer-program-research.md`

**Interfaces:**
- Consumes: the existing `tea` content schema in `src/content.config.ts`, `RelatedPosts`' path-to-paths record, and the approved research documents.
- Produces: the route `/tea/learning-sheng-puer-through-comparative-flights/`, an `Other` subcategory card, and a Node content contract for the article.

- [ ] **Step 1: Write the failing content-contract test**

Create `tests/sheng-puer-series-introduction.test.mjs`:

```js
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const articleUrl = new URL(
	'../src/content/tea/learning-sheng-puer-through-comparative-flights.md',
	import.meta.url,
);

const coreFlights = [
	'Youth and transformation',
	'Storage changes the clock',
	'Factory and boutique',
	'Yiwu and Bulang',
	'One tea, two storages',
	'7542 and 8582',
	'Menghai and Xiaguan',
	'Xishuangbanna and Lincang',
	'Boutique lineage through time',
	'Humid-labelled and traditional Hong Kong storage',
	'Blend and single-area origin',
	'Three-age 7542 sequence',
];

const advancedFlights = [
	'Yiwu within Yiwu',
	'The Lao Man’e bitterness spectrum',
	'Mengku-side and Bangdong-side Lincang',
	'Spring and autumn from one named origin',
	'Age-oriented and aroma-preserving construction',
	'Natural-garden and ancient-garden claims',
	'The Dayi 7532, 7542, and 8582 suite',
	'Xiaguan recipe and compression forms',
	'Three boutique disclosure philosophies',
	'From a purchasable pair to a storage-city triangle',
	'Traditional Hong Kong intensity and airing evidence',
	'Reputation, adjacency, and normalized value',
];

test('sheng puer introduction preserves its roadmap and purchasing caveats', () => {
	const article = readFileSync(articleUrl, 'utf8');

	assert.match(article, /title: "Learning Sheng Puer Through Comparative Flights"/);
	assert.match(article, /pubDate: "2026-08-31"/);
	assert.match(article, /  - "Other"/);
	assert.doesNotMatch(article, /^heroImage:/m);

	for (const heading of [
		'Why comparative flights',
		'The twelve core flights',
		'Beyond the core',
		'How I chose the teas and vendors',
		'What the program costs',
		'What comes next',
	]) {
		assert.ok(article.includes(heading), `missing heading: ${heading}`);
	}

	for (const flight of [...coreFlights, ...advancedFlights]) {
		assert.ok(article.includes(flight), `missing flight: ${flight}`);
	}

	for (const vendor of [
		'Yunnan Sourcing',
		'King Tea Mall',
		'Liquid Proust',
		'Yee On',
		'Farmer Leaf',
		'Tea Encounter',
		'white2tea',
		'Teas We Like',
		'Bana Tea Company',
	]) {
		assert.ok(article.includes(vendor), `missing selected vendor: ${vendor}`);
	}

	for (const amount of ['€166.80', '€229.07', '€237.66', '€122.69', '€360.35']) {
		assert.ok(article.includes(amount), `missing budget: ${amount}`);
	}

	assert.match(article, /not (?:an overall )?vendor ranking/i);
	assert.match(article, /not (?:necessarily )?the (?:best|lowest|cheapest) prices?/i);
	assert.match(article, /shipping, tax, card-conversion spreads, and import costs/i);
	assert.match(article, /Prices? (?:and availability )?(?:were )?checked (?:on )?2026-08-30/i);

	for (const url of [
		'https://teadb.org/puerh/',
		'https://teadb.org/five-types-raw-puerh/',
		'https://teadb.org/non-mainland-puerh-vendor-guide/',
	]) {
		assert.ok(article.includes(url), `missing TeaDB source: ${url}`);
	}
});
```

- [ ] **Step 2: Run the new test and verify that it fails because the article does not exist**

Run:

```bash
node --test tests/sheng-puer-series-introduction.test.mjs
```

Expected: FAIL with `ENOENT` for `learning-sheng-puer-through-comparative-flights.md`.

- [ ] **Step 3: Create the article with valid tea frontmatter**

Create `src/content/tea/learning-sheng-puer-through-comparative-flights.md` with this frontmatter:

```yaml
---
title: "Learning Sheng Puer Through Comparative Flights"
pubDate: "2026-08-31"
category:
  - "Tea"
  - "Tea Education"
  - "Sheng Puer"
  - "Other"
description: "A personal introduction to a comparative tasting program for learning how age, storage, terroir, recipes, and producers shape sheng puer."
---
```

Do not add `heroImage`, `heroImageSrc`, or an uncreated internal link.

- [ ] **Step 4: Write the personal opening from the approved preface**

Copy the prose from `docs/research/sheng-puer-article-preface.md`, but omit its Markdown title because the page layout renders the frontmatter title. Preserve the corrected distinction that tea has educational traditions, while an independent Western learner may struggle to find a visible, practical sequence through them.

End the opening by introducing 12 basic flights and 12 advanced flights and stating that the research includes suitable teas, vendors, and estimated prices.

- [ ] **Step 5: Explain what a comparative flight can and cannot teach**

Add `## Why comparative flights` and explain:

- broad tasting builds familiarity but can lose direction;
- a flight begins with a question and places two or more teas beside one another;
- attention is directed to age, storage, terroir, recipe, producer, construction, or market framing;
- these are practical orientations, not controlled experiments;
- year, batch, material, processing, compression, storage, and sampling history may remain confounded;
- the named teas are suggestions, and a substitute should preserve the lesson before the label.

Do not add brewing, water, teaware, or session instructions.

- [ ] **Step 6: Present the full roadmap without writing a complete flight**

Add `## The twelve core flights` with a numbered list containing the exact 12 core titles from the test. Give each title one sentence stating the question it introduces, using `docs/research/sheng-puer-educational-program.md` as the source.

Add `## Beyond the core: twelve advanced flights` with a numbered list continuing from 13 through 24 and using the exact advanced titles from the test. Give each title no more than one sentence. Make clear that these are optional electives rather than a second required course.

Do not include the full “Suggested teas,” “Pay attention to,” “Alternatives,” or per-flight budget blocks in this introductory post.

- [ ] **Step 7: Explain the vendor-selection methodology and vendor roles**

Add `## How I chose the teas and vendors` and cover these exact distinctions:

1. Link [TeaDB's Pu'erh hub](https://teadb.org/puerh/), [The Five Types of Raw Pu'erh You Should Try](https://teadb.org/five-types-raw-puerh/), and the [2025 Non Mainland Pu'erh Vendor Guide](https://teadb.org/non-mainland-puerh-vendor-guide/). Describe them as the compass for categories, hypotheses, and vendor discovery—not the source of current prices or guaranteed tasting outcomes.
2. State that current product pages supplied portion size, availability, price, and vendor-stated product/storage facts.
3. Explain the core roles: Yunnan Sourcing for closely matched contemporary comparisons; King Tea Mall for sample-scale Dayi and Xiaguan references; Liquid Proust for unusual storage and Xizi Hao lineage samples; Yee On for explicitly traditional Hong Kong storage examples.
4. Explain that Farmer Leaf, Tea Encounter, white2tea, Teas We Like, and Bana Tea Company enter advanced comparisons or alternatives.
5. Mention that Tea Urchin, Essence of Tea, Crimson Lotus Tea, The Jade Leaf, Quiche Teas/Taishunhe, Pu-erh.sk, Puerh.uk, Hou De, Teapals, Yangqing Hao USA, and other TeaDB leads were also investigated. Their absence from the final offers is not a quality judgment; reasons included unmatched current comparisons, unavailable samples or stock, incomplete product/storage detail, or an offer that could not be verified precisely.
6. State that the shortlist is not an overall vendor ranking and that the prices are not necessarily the lowest prices worldwide. Educational fit, sample access, documentation, reuse across flights, and fewer separate orders were considered alongside price.

Keep all origin, tree-age, batch, and storage language visibly attached to vendor claims where relevant.

- [ ] **Step 8: Add the checked budget table and closing**

Add `## What the program costs` with this table:

```markdown
| Path | Purchases | Estimated tea cost |
|---|---:|---:|
| Essential core | 17 | €166.80 |
| Standard core | 18 | €229.07 |
| Advanced core | 18 | €237.66 |
| Elective-only additions | 14 | €122.69 |
| Advanced all-in union | 32 | €360.35 |
```

Immediately explain that the all-in figure is the union of advanced-core and elective-only purchases, not another core tier. Include the exact sentence pattern required by the test: `Prices and availability were checked on 2026-08-30.` State that shipping, tax, card-conversion spreads, and import costs are excluded and can change the practical choice by destination.

Add `## What comes next`. Say that the next post begins with Flight 1, youth and transformation, and Flight 2, storage changes the clock. Do not link to that future article until it exists.

- [ ] **Step 9: Integrate the post with existing category and related-post behavior**

In `src/components/RelatedPosts.astro`, add:

```ts
	'/tea/learning-sheng-puer-through-comparative-flights': [
		'/tea/the-other-99-water-for-tea',
		'/tea/resources',
		'/tea/tetsubin-history-1-birth-of-the-iron-kettle',
	],
```

In `tests/tea-content-groups.test.mjs`, add this entry to `expectedExceptions`:

```js
	['learning-sheng-puer-through-comparative-flights', 'Other'],
```

In the first test of `tests/tea-subcategory-pages.test.mjs`, replace the resource-based `Other` card expectations with the new post:

```js
	const otherCard = linkedCard(html, '/tea/other/');
	const shengPuerCard = linkedCard(
		readPage('tea/other'),
		'/tea/learning-sheng-puer-through-comparative-flights/',
	);
	assert.equal(sourceImage(otherCard), sourceImage(shengPuerCard));
	assert.equal(dateTime(otherCard), '2026-08-31T00:00:00.000Z');
```

In `subcategory pages contain only their assigned post groups`, add:

```js
	assert.match(
		other,
		/href="\/tea\/learning-sheng-puer-through-comparative-flights\/"/,
	);
```

In `subcategory post cards use the most recent edit date`, replace the resource-card assertions with:

```js
	const shengPuerCard = linkedCard(
		other,
		'/tea/learning-sheng-puer-through-comparative-flights/',
	);

	assert.equal(firstPostCard(other), shengPuerCard);
	assert.equal(dateTime(shengPuerCard), '2026-08-31T00:00:00.000Z');
```

- [ ] **Step 10: Run the focused content test**

Run:

```bash
node --test tests/sheng-puer-series-introduction.test.mjs
```

Expected: 1 test passes.

- [ ] **Step 11: Run the full production build and test suite**

Run:

```bash
npm test
```

Expected: the Astro production build succeeds; all Node tests pass; the output includes the new `/tea/learning-sheng-puer-through-comparative-flights/` route. Existing warnings about the absent `src/content/blog/` collection or unused Astro/Vite imports may remain, but no new warning class should be introduced.

- [ ] **Step 12: Audit the final wording and diff**

Run:

```bash
rg -n -i 'best price|cheapest|controlled experiment|vendor ranking|guarantee' src/content/tea/learning-sheng-puer-through-comparative-flights.md
git diff --check
git diff -- src/content/tea/learning-sheng-puer-through-comparative-flights.md src/components/RelatedPosts.astro tests/sheng-puer-series-introduction.test.mjs tests/tea-content-groups.test.mjs tests/tea-subcategory-pages.test.mjs
```

Expected: each flagged phrase is either negated or carefully qualified; `git diff --check` prints nothing; the diff contains only the article and its required integration/test changes.

- [ ] **Step 13: Commit the article and integration**

```bash
git add src/content/tea/learning-sheng-puer-through-comparative-flights.md src/components/RelatedPosts.astro tests/sheng-puer-series-introduction.test.mjs tests/tea-content-groups.test.mjs tests/tea-subcategory-pages.test.mjs docs/research/sheng-puer-article-preface.md
git commit -m "feat: introduce sheng puer comparative flights"
```
