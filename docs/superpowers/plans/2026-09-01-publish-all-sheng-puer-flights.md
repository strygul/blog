# Publish All Sheng Puer Flights Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish standalone, executable guides for Sheng Puer Flights 2–12 and connect all twelve flight posts into the pilot article and related-post navigation.

**Architecture:** Each flight is an Astro content-collection Markdown post that reuses the series hero and a consistent blind/repeatable tasting structure. The pilot remains the series index. Integration tests inspect the built HTML so missing routes, broken series links, absent vendor offers, or loss of the shared protocol are caught at the public-page boundary.

**Tech Stack:** Astro 5 content collections, Markdown, Node's built-in test runner, Sharp-backed Astro image pipeline.

**Spec:** `docs/research/sheng-puer-educational-program.md`

## Global Constraints

- Publish Flights 2–12; do not create separate posts for Labs A–C.
- Use the exact public flight titles from `docs/research/sheng-puer-educational-program.md`.
- Preserve vendor claims, observed storefront facts, confounders, allowed conclusions, and prohibited conclusions without inventing tasting results.
- Use 5 g per 100 ml, 100 °C water, a five-second rinse, and 10, 10, 15, 20, 30, and 45 second infusions for every controlled flight.
- Require a blind first session and a differently coded repeat on another day; an unstable contrast is inconclusive.
- Reuse `public/tea/posts/learning-sheng-puer-through-comparative-flights/sheng-flights-hero.png`.
- Assign every new post to the `Other` tea subcategory.

---

### Task 1: Define the public series contract

**Files:**
- Create: `tests/sheng-puer-flights.test.mjs`

**Interfaces:**
- Consumes: built pages under `dist/tea/<flight-slug>/index.html`.
- Produces: a route/title/vendor/protocol contract for all twelve flight posts.

- [ ] **Step 1: Write the failing integration test**

Create a literal table for Flights 1–12 containing each slug, exact title, and selected vendor URL fragments. For every entry, assert that the rendered route exists, the H1 is exact, the pilot link is present, every selected offer is linked, the shared ratio and infusion schedule appear, the repeat rule appears, and the post distinguishes supported from unsupported conclusions.

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npm run build && node --test tests/sheng-puer-flights.test.mjs`

Expected: FAIL because the rendered routes for Flights 2–12 do not exist.

- [ ] **Step 3: Keep the existing Flight 1 test**

Retain `tests/sheng-puer-flight-1.test.mjs` as the narrower regression test for the first published guide.

### Task 2: Publish Flights 2–12

**Files:**
- Create: `src/content/tea/sheng-puer-flight-2-one-tea-two-storage-histories.md`
- Create: `src/content/tea/sheng-puer-flight-3-yiwu-and-bulang.md`
- Create: `src/content/tea/sheng-puer-flight-4-xishuangbanna-and-lincang.md`
- Create: `src/content/tea/sheng-puer-flight-5-dayi-7542-and-8582.md`
- Create: `src/content/tea/sheng-puer-flight-6-dayi-and-xiaguan.md`
- Create: `src/content/tea/sheng-puer-flight-7-yiwu-within-yiwu.md`
- Create: `src/content/tea/sheng-puer-flight-8-lao-mane-bitterness-spectrum.md`
- Create: `src/content/tea/sheng-puer-flight-9-lincang-within-lincang.md`
- Create: `src/content/tea/sheng-puer-flight-10-spring-and-autumn-from-one-origin.md`
- Create: `src/content/tea/sheng-puer-flight-11-dayi-7532-7542-and-8582-suite.md`
- Create: `src/content/tea/sheng-puer-flight-12-two-traditional-hong-kong-storage-profiles.md`

**Interfaces:**
- Consumes: the exact flight-specific facts and evidence limits in `docs/research/sheng-puer-educational-program.md`.
- Produces: eleven public content entries using the slugs asserted in Task 1.

- [ ] **Step 1: Add exact frontmatter**

For each file, use its exact `Sheng Puer Flight N: <guide title>` title, `2026-09-01` publication date, Tea/Tea Education/Sheng Puer/Other categories, a neutral description, and the shared hero path.

- [ ] **Step 2: Add the flight-specific introduction and teas**

Link back to `/tea/learning-sheng-puer-through-comparative-flights/`, state the narrow question and evidence ceiling, and reproduce the selected tea offers, portion sizes, checked prices, documented facts, vendor claims, and practical total without adding sensory predictions.

- [ ] **Step 3: Add the executable protocol**

Include equipment, neutral coding, the shared brewing schedule, flight-specific controls, randomized positions, fixed pouring order, descriptive dimensions, a two- or three-code tasting sheet as appropriate, reveal timing, and the differently coded repeat session.

- [ ] **Step 4: Add interpretation limits and substitutions**

State the allowed conclusion, what the flight cannot establish, the precise substitution rule, and purchasing/reuse implications from the guide.

- [ ] **Step 5: Build and run the focused test to verify GREEN**

Run: `npm run build && node --test tests/sheng-puer-flights.test.mjs`

Expected: PASS for all twelve routes.

### Task 3: Connect and classify the complete series

**Files:**
- Modify: `src/content/tea/learning-sheng-puer-through-comparative-flights.md`
- Modify: `src/components/RelatedPosts.astro`
- Modify: `tests/tea-content-groups.test.mjs`
- Modify: `tests/tea-subcategory-pages.test.mjs`
- Modify: `tests/sheng-puer-series-introduction.test.mjs`

**Interfaces:**
- Consumes: the twelve published route slugs from Tasks 1–2.
- Produces: index links, previous/next/overview navigation, and `Other` category membership for the entire series.

- [ ] **Step 1: Extend the failing public-index assertions**

Assert that all twelve route links appear in numerical order in the pilot article and that all twelve rendered posts appear on the `Other` category page.

- [ ] **Step 2: Run the affected tests and verify RED**

Run: `npm run build && node --test tests/sheng-puer-series-introduction.test.mjs tests/tea-content-groups.test.mjs tests/tea-subcategory-pages.test.mjs`

Expected: FAIL because the overview, exception map, category assertions, and related navigation do not yet cover Flights 2–12.

- [ ] **Step 3: Add overview links and related navigation**

Link every flight summary to its standalone guide. Give each flight at least the pilot plus the adjacent flight(s), with water/resources used only at the ends where a third useful link is needed.

- [ ] **Step 4: Register every new post in the Other category expectation**

Add all eleven new IDs to the category exception map and assert their public links on the rendered Other page while retaining Flight 1 as the first same-date card.

- [ ] **Step 5: Run affected tests to verify GREEN**

Run: `npm run build && node --test tests/sheng-puer-series-introduction.test.mjs tests/tea-content-groups.test.mjs tests/tea-subcategory-pages.test.mjs`

Expected: PASS.

### Task 4: Verify the complete publication

**Files:**
- Review: all files changed by Tasks 1–3.

**Interfaces:**
- Consumes: the complete built site and test suite.
- Produces: a verified, uncommitted implementation ready for editorial review.

- [ ] **Step 1: Run formatting validation**

Run: `git diff --check`

Expected: exit 0 with no whitespace errors.

- [ ] **Step 2: Run the full suite**

Run: `npm test`

Expected: all tests pass and every route builds. The repository's pre-existing empty `src/content/blog/` and Vite unused-import warnings may still appear.

- [ ] **Step 3: Review the rendered series contract**

Confirm the build reports twelve flight routes, each exact title is present, all offer links are live in rendered HTML, and the overview and related-post tests pass without invented results.
