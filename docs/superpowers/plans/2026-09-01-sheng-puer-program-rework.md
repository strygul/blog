# Sheng Puer Comparative Program Rework Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 24-flight Sheng puer curriculum with a validity-first program of at most 12 sensory flights and exactly three methods labs, backed by a September 2026 purchasing snapshot and consistent public copy.

**Architecture:** Treat the TSV catalog as the offer-level source of truth, with stable `F1`–`F12` and `L1`–`L3` module identifiers and `foundation`/`complete` purchasing paths. Derive basket totals from recommended catalog rows, build the detailed guide from verified selections, and make the public introduction a concise projection of the guide rather than an independent curriculum. Shared Node test helpers enforce the catalog contract and cross-artifact totals.

**Tech Stack:** Astro 5, Markdown content collections, Node.js test runner, JavaScript ES modules, TSV research data, Sharp image assertions.

**Spec:** `docs/superpowers/specs/2026-09-01-sheng-puer-program-rework-design.md`

## Global Constraints

- Twelve sensory flights are a maximum, not a quota; remove a flight if September revalidation finds no credible pair or trio.
- Publish exactly three clearly labelled methods labs and never number them as sensory flights.
- Use identical 100 ml neutral porcelain vessels, 5 g leaf, 100 °C water, one five-second rinse, and 10, 10, 15, 20, 30, and 45 second infusions as the shared defaults.
- Taste blind before revealing identities, repeat on another day, and report an unstable result as inconclusive.
- Every sensory flight must contain Question, Difficulty and path, Suggested teas, Why this set, Hold constant, Observe, Confounders, Allowed conclusion, Cannot establish, Substitution rule, and Cost and reuse sections.
- Distinguish observed facts, vendor claims, practitioner hypotheses, inferences, and unknowns.
- Do not present price, prestige, provenance, tree age, production philosophy, or intended aging as directly tastable attributes.
- Use vendor pages or public storefront data for September 2026 purchasing facts; use TeaDB only for curriculum, history, and vendor discovery.
- The foundation basket contains only offers required for foundation flights; the complete basket is the unique union of foundation, advanced, and capstone-lab purchases.
- Do not include a cheaper substitute that weakens the comparison or a prestige upgrade presented as higher quality.
- Preserve the approved grey preface and uncropped `sheng-flights-hero.png` already present in the worktree.
- Preserve unrelated user changes and stage only the files named by each task.

## File Structure

- Create `tests/helpers/sheng-puer-catalog.mjs` — parse the TSV and calculate basket counts/totals for all tests.
- Modify `tests/sheng-puer-program-sources.test.mjs` — validate catalog schema, module assignments, price arithmetic, guide structure, evidence ceilings, and cross-file basket totals.
- Modify `docs/research/sheng-puer-product-catalog.tsv` — store the September offer snapshot and revised module/path assignments.
- Modify `docs/research/sheng-puer-program-research.md` — retain the audit trail, rejected comparisons, source checks, exchange rate, and selection decisions.
- Modify `docs/research/sheng-puer-educational-program.md` — become the authoritative detailed program, protocol, 12 flights, three labs, baskets, vendor index, glossary, and sources.
- Modify `tests/sheng-puer-series-introduction.test.mjs` — validate the new public roadmap, method, vendor methodology, catalog-derived costs, preface, and hero.
- Modify `src/content/tea/learning-sheng-puer-through-comparative-flights.md` — publish the concise revised roadmap and purchasing explanation.
- Preserve `public/tea/posts/learning-sheng-puer-through-comparative-flights/sheng-flights-hero.png` — include the already-approved hero in the article commit.

---

### Task 1: Revalidate Offers and Establish the Catalog Contract

**Files:**
- Create: `tests/helpers/sheng-puer-catalog.mjs`
- Modify: `tests/sheng-puer-program-sources.test.mjs`
- Modify: `docs/research/sheng-puer-product-catalog.tsv`
- Modify: `docs/research/sheng-puer-program-research.md`

**Interfaces:**
- Consumes: the existing 23-column TSV, vendor URLs already recorded there, and the approved module mapping in the design spec.
- Produces: `readShengPuerCatalog(): { headers: string[], rows: Record<string, string>[] }` and `summarizeBasket(rows, path): { count: number, total: number }`; revised catalog columns `module_ids` and `paths`; verified offer rows used by later tasks.

- [ ] **Step 1: Add a reusable TSV parser and basket calculator**

Create `tests/helpers/sheng-puer-catalog.mjs` with:

```js
import { readFileSync } from 'node:fs';

export const catalogUrl = new URL(
	'../../docs/research/sheng-puer-product-catalog.tsv',
	import.meta.url,
);

export function readShengPuerCatalog() {
	const lines = readFileSync(catalogUrl, 'utf8').trimEnd().split('\n');
	const headers = lines[0].split('\t');
	const rows = lines.slice(1).map((line, index) => {
		const values = line.split('\t');
		if (values.length !== headers.length) {
			throw new Error(`catalog row ${index + 2} has ${values.length} columns; expected ${headers.length}`);
		}
		return Object.fromEntries(headers.map((header, column) => [header, values[column]]));
	});
	return { headers, rows };
}

export function summarizeBasket(rows, path) {
	const selected = rows.filter(
		(row) =>
			row.role === 'recommended' &&
			row.availability === 'in_stock' &&
			row.paths.split('|').includes(path),
	);
	return {
		count: selected.length,
		total: Number(selected.reduce((sum, row) => sum + Number(row.price_eur), 0).toFixed(2)),
	};
}
```

- [ ] **Step 2: Replace obsolete source tests with the revised catalog contract**

In `tests/sheng-puer-program-sources.test.mjs`, retain the Node imports and `guideUrl`, delete the local `catalogUrl` constant because the helper owns it, and replace the two old flight-number tests with imports from the helper plus these assertions:

```js
import { readShengPuerCatalog, summarizeBasket } from './helpers/sheng-puer-catalog.mjs';

const expectedHeaders = [
	'offer_id', 'tea_name', 'year', 'producer', 'recipe_or_origin', 'storage',
	'vendor', 'country', 'url', 'purchase_g', 'source_currency', 'source_price',
	'eur_rate', 'price_eur', 'eur_per_10g', 'checked_on', 'module_ids', 'paths',
	'anchor', 'confidence', 'availability', 'notes', 'role',
];

test('the catalog uses the revised module and purchasing-path schema', () => {
	const { headers, rows } = readShengPuerCatalog();
	assert.deepEqual(headers, expectedHeaders);
	assert.equal(new Set(rows.map((row) => row.offer_id)).size, rows.length);

	for (const row of rows.filter((entry) => entry.role === 'recommended')) {
		assert.match(row.checked_on, /^2026-09-\d{2}$/);
		assert.equal(row.availability, 'in_stock');
		assert.match(row.paths, /^(foundation\|complete|complete)$/);
		for (const moduleId of row.module_ids.split('|')) {
			assert.match(moduleId, /^(F(?:[1-9]|1[0-2])|L[1-3])$/);
		}
	}
});

test('catalog EUR calculations and cumulative paths are internally consistent', () => {
	const { rows } = readShengPuerCatalog();
	for (const row of rows) {
		const converted = Number(row.source_price) * Number(row.eur_rate);
		const normalized = (Number(row.price_eur) / Number(row.purchase_g)) * 10;
		assert.ok(Math.abs(converted - Number(row.price_eur)) <= 0.02, `${row.offer_id}: EUR conversion`);
		assert.ok(Math.abs(normalized - Number(row.eur_per_10g)) <= 0.02, `${row.offer_id}: EUR/10 g`);
	}

	const foundation = summarizeBasket(rows, 'foundation');
	const complete = summarizeBasket(rows, 'complete');
	assert.ok(foundation.count > 0);
	assert.ok(complete.count >= foundation.count);
	assert.ok(complete.total >= foundation.total);
});
```

- [ ] **Step 3: Run the focused tests and confirm the old schema fails**

Run:

```bash
node --test tests/sheng-puer-program-sources.test.mjs
```

Expected: FAIL because the existing TSV still has `flight_ids`/`tiers`, recommended rows have August dates, and the old role assignments do not use `F*`/`L*` IDs.

- [ ] **Step 4: Revalidate the candidate set against primary storefronts**

Read the full design spec first. Check the live vendor page or public storefront state for every initial sensory/capstone candidate below. Record the observed native price, smallest adequate portion, availability, page wording, and check date in a new `## September 2026 validity-first revalidation` section of `docs/research/sheng-puer-program-research.md`.

| Module | Initial candidates to recheck | Required decision |
|---|---|---|
| F1 | `ktm-2025-dayi-7542-2501-25g`, `ktm-2015-dayi-7542-1501-30g`, `ktm-2007-dayi-7542-701-25g` | Keep all three only as development states, never an age-only control. |
| F2 | `lp-2007-xzh-shangpin-storage-pair-32g` | Require both labelled storage portions in one purchasable set. |
| F3 | `ys-2025-wangong-wild-arbor-25g`, `ys-2025-xin-bane-25g` | Preserve seller, year, sample format, and broad style contrast. |
| F4 | `ys-2025-youle-shan-25g`, `ys-2025-ba-nuo-25g` | Preserve seller, year, season framing, format, and broad-region contrast. |
| F5 | `ktm-2008-dayi-7542-batch-ambiguous-25g`, `ktm-2008-dayi-8582-801-25g` | Retain only as a same-year recipe orientation; keep 7542 batch ambiguity explicit. |
| F6 | `ktm-2007-dayi-7542-701-25g`, `ktm-2007-xiaguan-8653-25g` | Use the two same-year examples; do not require the 2005 T8653 purchase. |
| F7 | F3 Wangong reuse plus `ys-2025-gedeng-wild-arbor-25g`, `ys-2025-yibang-wild-arbor-25g` | Keep no more than three same-vendor/year Yiwu-labelled examples. |
| F8 | `fl-2026-lao-man-e-gushu-sweet-20g`, `teaenc-2026-lao-man-e-kucha-20g`; recheck `fl-2026-lao-man-e-bitter-tree-20g` first | Prefer the same-producer Farmer Leaf pair if the bitter tea is available; otherwise retain the cross-vendor pair only with a lower inference ceiling. |
| F9 | `ys-2024-mo-lie-shan-25g`, `ys-2024-na-han-village-25g` | Preserve seller, year, sample format, and Mengku/Bangdong framing. |
| F10 | `ys-2025-jiu-tai-po-spring-25g`, `ys-2025-jiu-tai-po-autumn-25g` | Require both seasons from the same named origin, producer, and year. |
| F11 | F5 pair plus `ktm-2008-dayi-7532-801-30g` | Keep the three-recipe suite while naming batch/storage mismatch. |
| F12 | `yeeon-2000-7542-trad-hk-10g`, `yeeon-2008-taste-hk-trad-cellar-25g` | Compare whole traditional-storage profiles, not intensity or airing. |
| L3 | `ys-2025-bingdao-laozhai-10g`, `ys-2025-mo-lie-shan-25g` | Require a purchasable pair; the lab measures blind/informed score change only. |

For L1, recheck documentation—but do not add a purchase—for `ys-aged-storage-comparison-150g` and the two Yee On pages. For L2, retain relevant product-page evidence from removed Flights 3, 9, 11, 17, 18, 20, and 21 as `reference` or `rejected`, never as recommended basket rows.

If a candidate fails its required decision, apply the substitution ladder in the spec. If no substitute meets it, remove the sensory module and record the reason. Do not infer stock from a successful HTTP status. For Etsy, document the visible indexed/storefront evidence and any 403 limitation exactly as before.

- [ ] **Step 5: Record the September exchange-rate source**

Use the latest European Central Bank reference rate dated on or before the storefront check. Add the exact ECB date and source URL to the research notebook. Convert with:

```text
price_eur = source_price × EUR-per-source-currency rate
eur_per_10g = price_eur ÷ purchase_g × 10
```

Round displayed offer values to two decimals. Preserve more precision in `eur_rate`. Do not convert EUR rows through another currency.

- [ ] **Step 6: Migrate and update the catalog**

Change only these header names:

```text
flight_ids → module_ids
tiers → paths
```

Use the stable assignment below for candidates that pass revalidation:

```text
F1 development states
F2 matched storage
L1 storage evidence audit
F3 Yiwu and Bulang
F4 Xishuangbanna and Lincang
F5 7542 and 8582
F6 Dayi and Xiaguan
L2 claims are not flavors
F7 Yiwu within Yiwu
F8 Lao Man'e bitterness spectrum
F9 Lincang within Lincang
F10 spring and autumn
F11 Dayi recipe suite
F12 traditional Hong Kong profiles
L3 blind value and expectation
```

For recommended F1–F6 rows, set `paths` to `foundation|complete`. For recommended F7–F12 and L3-only rows, set it to `complete`. Give reference, alternative, candidate, rejected, or unavailable rows an empty `paths` cell so they never enter a basket. Set `anchor=yes` only when one purchased offer is reused by more than one sensory flight or the capstone lab.

Update `checked_on`, source price, EUR rate, EUR price, normalized price, availability, evidence confidence, notes, and role from the live audit. Remove obsolete flight-number and three-tier language from every catalog note. Preserve rejected rows when their decision trail remains useful.

- [ ] **Step 7: Run the catalog tests and inspect derived baskets**

Run:

```bash
node --test tests/sheng-puer-program-sources.test.mjs
```

Expected: PASS for schema, IDs, September dates, arithmetic, and cumulative paths.

Then run:

```bash
node --input-type=module -e "import {readShengPuerCatalog,summarizeBasket} from './tests/helpers/sheng-puer-catalog.mjs'; const {rows}=readShengPuerCatalog(); console.log({foundation:summarizeBasket(rows,'foundation'),complete:summarizeBasket(rows,'complete')})"
```

Expected: two nonzero summaries, with the complete count and total greater than or equal to the foundation values. Copy these derived values into the research notebook's calculation section; do not type totals from the old guide.

- [ ] **Step 8: Commit the verified data contract and research snapshot**

```bash
git add tests/helpers/sheng-puer-catalog.mjs tests/sheng-puer-program-sources.test.mjs docs/research/sheng-puer-product-catalog.tsv docs/research/sheng-puer-program-research.md
git commit -m "research: revalidate validity-first sheng puer catalog"
```

### Task 2: Rewrite the Authoritative Detailed Program

**Files:**
- Modify: `tests/sheng-puer-program-sources.test.mjs`
- Modify: `docs/research/sheng-puer-educational-program.md`

**Interfaces:**
- Consumes: the Task 1 catalog rows, `readShengPuerCatalog()`, `summarizeBasket()`, and the final retained module set documented in the research notebook.
- Produces: the authoritative guide structure and wording from which the public article is summarized.

- [ ] **Step 1: Add failing guide-structure tests**

Keep the file's existing `guideUrl`, then extend `tests/sheng-puer-program-sources.test.mjs` with these constants, helpers, and tests:

```js
const requiredFlightSections = [
	'Question',
	'Difficulty and path',
	'Suggested teas',
	'Why this set',
	'Hold constant',
	'Observe',
	'Confounders',
	'Allowed conclusion',
	'Cannot establish',
	'Substitution rule',
	'Cost and reuse',
];
const bannedStandaloneTitles = [
	'Factory and boutique',
	'Boutique lineage through time',
	'Blend and single-area origin',
	'Age-oriented and aroma-preserving construction',
	'Natural-garden and ancient-garden claims',
	'Xiaguan recipe and compression forms',
	'Three boutique disclosure philosophies',
	'From a purchasable pair to a storage-city triangle',
	'Reputation, adjacency, and normalized value',
];

function markdownSections(markdown, pattern) {
	return [...markdown.matchAll(pattern)].map((match, index, matches) => ({
		title: match[1],
		body: markdown.slice(match.index, matches[index + 1]?.index ?? markdown.length),
	}));
}

function escapeRegExp(value) {
	return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

test('the detailed guide contains no more than twelve complete sensory flights', () => {
	const guide = readFileSync(guideUrl, 'utf8');
	const flights = markdownSections(guide, /^### Flight \d+: (.+)$/gm);
	assert.ok(flights.length > 0 && flights.length <= 12);
	for (const flight of flights) {
		for (const section of requiredFlightSections) {
			assert.ok(flight.body.includes(`#### ${section}`), `${flight.title}: missing ${section}`);
		}
	}
	for (const title of bannedStandaloneTitles) {
		assert.doesNotMatch(guide, new RegExp(`^### Flight \\d+: ${escapeRegExp(title)}$`, 'm'));
	}
});

test('the detailed guide has three methods labs and the shared blind repeatable protocol', () => {
	const guide = readFileSync(guideUrl, 'utf8');
	assert.deepEqual(
		[...guide.matchAll(/^### Lab [A-C]: (.+)$/gm)].map((match) => match[1]),
		['Storage evidence audit', 'Claims are not flavors', 'Blind value and expectation'],
	);
	assert.match(guide, /5 g.+100 ml/is);
	assert.match(guide, /100 °C/);
	assert.match(guide, /10, 10, 15, 20, 30, and 45 seconds/);
	assert.match(guide, /blind.+reveal/is);
	assert.match(guide, /repeat.+different day/is);
	assert.match(guide, /inconclusive/i);
});
```

- [ ] **Step 2: Add cross-artifact basket and selected-offer tests**

Add:

```js
test('the guide publishes catalog-derived baskets and names every recommended offer', () => {
	const guide = readFileSync(guideUrl, 'utf8');
	const { rows } = readShengPuerCatalog();
	for (const path of ['foundation', 'complete']) {
		const summary = summarizeBasket(rows, path);
		const label = path === 'foundation' ? 'Foundation basket' : 'Complete program';
		assert.ok(guide.includes(`| ${label} | ${summary.count} | €${summary.total.toFixed(2)} |`));
	}
	for (const row of rows.filter((entry) => entry.role === 'recommended')) {
		assert.ok(guide.includes(row.url), `guide missing ${row.offer_id}`);
	}
});
```

- [ ] **Step 3: Run the focused tests and verify they fail on the 24-flight guide**

Run:

```bash
node --test tests/sheng-puer-program-sources.test.mjs
```

Expected: FAIL because the guide has 24 old flight headings, no lab headings, no complete shared protocol, old section names, and old three-tier totals.

- [ ] **Step 4: Replace the guide introduction, protocol, and basket model**

Rewrite the top of `docs/research/sheng-puer-educational-program.md` in this order:

```text
# Learning sheng puer through comparative flights
## Purpose and evidence standard
## How to run every sensory flight
## Program sequence
## Shopping baskets
```

In the protocol, publish all exact global brewing defaults. Explain blind coding, identity reveal, a second session on another day, and the rule for an inconclusive result. Say that a parameter changed for only one tea ends the controlled side-by-side phase. Define the evidence labels `observed`, `vendor claim`, `practitioner hypothesis`, `inference`, and `unknown`.

In `## Program sequence`, list the interleaved order from the approved design. Use `Lab A`, `Lab B`, and `Lab C` so labs never consume sensory flight numbers. Generate the two basket rows with:

```bash
node --input-type=module -e "import {readShengPuerCatalog,summarizeBasket} from './tests/helpers/sheng-puer-catalog.mjs'; const {rows}=readShengPuerCatalog(); for (const [path,label] of [['foundation','Foundation basket'],['complete','Complete program']]) { const value=summarizeBasket(rows,path); console.log('| '+label+' | '+value.count+' | €'+value.total.toFixed(2)+' |') }"
```

Under `## Shopping baskets`, add the header `| Path | Unique purchases | Estimated tea cost |`, its Markdown separator, and the exact two output lines from the command. State that L1 and L2 add no required purchases, the complete total includes L3, each offer is counted once, and shipping/tax/card spread/import costs are excluded.

- [ ] **Step 5: Rewrite every retained sensory flight with the required template**

Use sequential `### Flight N:` headings for the retained modules in F1–F12 order. Under each heading, use every `####` heading in `requiredFlightSections` exactly once and in the specified order.

The allowed conclusion and prohibited inference for each target are:

| ID | Title | Allowed conclusion | Cannot establish |
|---|---|---|---|
| F1 | Development states within Dayi 7542 | How the three selected productions differ across stated development histories. | An age-only effect or a universal 7542 aging trajectory. |
| F2 | One tea, two storage histories | A plausible storage-associated difference within the seller's matched commercial set. | Measured humidity/temperature effects, exact custody, or universal city profiles. |
| F3 | Yiwu and Bulang | How the selected, closely matched Yiwu- and Bulang-labelled teas differ. | A sensory law for either region or authentication of origin/tree age. |
| F4 | Xishuangbanna and Lincang | How the selected examples differ under one session protocol. | A complete Xishuangbanna/Lincang typology. |
| F5 | Dayi 7542 and 8582 | How the two selected same-year recipe samples differ. | Recipe alone as the cause, especially with the 7542 batch ambiguity. |
| F6 | Dayi and Xiaguan | How the selected same-year factory examples differ. | Factory essence, quality ranking, or producer authentication by taste. |
| F7 | Yiwu within Yiwu | Variation among the selected same-vendor/year subregional labels. | Fixed subregional signatures or verified origin. |
| F8 | Lao Man'e bitterness spectrum | Differences in bitterness onset, intensity, texture, recovery, and returning sweetness among the selected teas. | Varietal/tree-age authentication or a single cause for bitterness. |
| F9 | Lincang within Lincang | How the selected Mengku- and Bangdong-side examples differ. | A general sensory boundary inside Lincang. |
| F10 | Spring and autumn from one origin | A plausible season-associated contrast in the matched commercial pair. | Season as the sole cause or a universal spring/autumn rule. |
| F11 | Dayi 7532, 7542, and 8582 suite | Orientation to differences among the selected recipe samples. | A batch-controlled recipe experiment. |
| F12 | Two traditional Hong Kong storage profiles | How two complete, vendor-described traditional-storage expressions differ. | A single storage-intensity or airing effect. |

Use the final Task 1 candidates; if a flight was removed under the quality gate, close the numbering gap and document the omission in the notebook, not as a purchasable guide module. Keep observation prompts neutral: describe dimensions to record, not flavors the reader is expected to find.

- [ ] **Step 6: Replace removed flights with three methods labs**

Give every lab these subheadings:

```text
#### Question
#### Materials
#### Procedure
#### Record
#### Supported conclusion
#### Cannot establish
#### Cost and reuse
```

For Lab A, compare four evidence forms: F2's matched commercial pair, the Yunnan Sourcing multi-tea storage sampler page, city/climate storage labels, and the Yee On warehouse descriptions. The result is an evidence-strength table; do not require the sampler or Yee On teas for this lab.

For Lab B, classify claims from existing selected and reference pages into production model, blend/single-area, tree age/garden, processing, compression, intended aging, and disclosure philosophy. The lab may compare cups but may only conclude how documentation and experience relate; it adds no purchase.

For Lab C, require a randomized blind round with sensory score, preference, and estimated value; reveal name and price; then repeat the evaluation and record score changes. State that only the participant's expectation response is measured. Use the verified L3 pair and include it in the complete basket.

- [ ] **Step 7: Rebuild the closing reference sections**

After the modules, retain and update:

```text
## Vendor index
## Minimal glossary
## Sources and confidence
```

The vendor index describes specialties represented by selected offers, not overall rankings. The sources section states the exact September storefront check date and ECB rate date, preserves TeaDB's role as a compass rather than inventory source, and explains the Etsy verification limitation. Remove old core/elective inventory counts and all claims that the program deliberately provides no brewing procedure.

- [ ] **Step 8: Run guide and catalog tests**

Run:

```bash
node --test tests/sheng-puer-program-sources.test.mjs
```

Expected: PASS. Also run:

```bash
rg -n "Advanced elective flights|Essential core|Standard core|Advanced core|Flight (1[3-9]|2[0-4]):" docs/research/sheng-puer-educational-program.md
```

Expected: no matches.

- [ ] **Step 9: Commit the authoritative curriculum**

```bash
git add tests/sheng-puer-program-sources.test.mjs docs/research/sheng-puer-educational-program.md
git commit -m "docs: rebuild sheng puer curriculum around valid comparisons"
```

### Task 3: Rewrite the Public Introduction and Its Regression Tests

**Files:**
- Modify: `tests/sheng-puer-series-introduction.test.mjs`
- Modify: `src/content/tea/learning-sheng-puer-through-comparative-flights.md`
- Add: `public/tea/posts/learning-sheng-puer-through-comparative-flights/sheng-flights-hero.png`

**Interfaces:**
- Consumes: the Task 1 catalog helper/totals and the Task 2 guide's final sequence and methodology.
- Produces: the rendered `/tea/learning-sheng-puer-through-comparative-flights/` introduction and regression coverage for all user-visible requirements.

- [ ] **Step 1: Replace old roadmap constants and import the shared basket helper**

In `tests/sheng-puer-series-introduction.test.mjs`, import:

```js
import {
	readShengPuerCatalog,
	summarizeBasket,
} from './helpers/sheng-puer-catalog.mjs';
```

Replace `coreFlights` and `advancedFlights` with:

```js
const sensoryFlights = [
	'Development states within Dayi 7542',
	'One tea, two storage histories',
	'Yiwu and Bulang',
	'Xishuangbanna and Lincang',
	'Dayi 7542 and 8582',
	'Dayi and Xiaguan',
	'Yiwu within Yiwu',
	"The Lao Man’e bitterness spectrum",
	'Lincang within Lincang',
	'Spring and autumn from one origin',
	'The Dayi 7532, 7542, and 8582 suite',
	'Two traditional Hong Kong storage profiles',
];
const methodsLabs = [
	'Storage evidence audit',
	'Claims are not flavors',
	'Blind value and expectation',
];
```

If Task 1 removed a flight under the quality gate, remove only that exact title from `sensoryFlights`; never add a replacement title without a validated guide module.

- [ ] **Step 2: Rewrite the public roadmap and cost assertions before the article**

Replace the old roadmap/budget test with assertions for these headings:

```js
for (const heading of [
	'The program: sensory flights and methods labs',
	'How to run a flight',
	'How I chose the teas and vendors',
	'What the program costs',
	'What comes next',
]) {
	assert.ok(article.includes(`## ${heading}`), `missing heading: ${heading}`);
}
```

Assert every `sensoryFlights` and `methodsLabs` title appears in order inside the program section. Add:

```js
const { rows } = readShengPuerCatalog();
for (const path of ['foundation', 'complete']) {
	const summary = summarizeBasket(rows, path);
	const label = path === 'foundation' ? 'Foundation basket' : 'Complete program';
	assert.ok(
		article.includes(`| ${label} | ${summary.count} | €${summary.total.toFixed(2)} |`),
		`missing or incorrect ${label} row`,
	);
}
assert.doesNotMatch(article, /Essential core|Standard core|Advanced core|24 flights/i);
```

Change the check-date expectations from August wording to `/September 2026/i` and `/checked (?:on )?2026-09-\d{2}/i`. Preserve the full investigated-vendor list and the existing assertions for Western buyers, documentation, sample availability, current stock, reuse, consolidation, non-endorsement, and vendor claims.

- [ ] **Step 3: Add public protocol and evidence-ceiling assertions**

Add:

```js
test('the public introduction explains the comparison and evidence protocol', () => {
	const article = readFileSync(articleUrl, 'utf8');
	assert.match(article, /5 g.+100 ml/is);
	assert.match(article, /100 °C/);
	assert.match(article, /blind/i);
	assert.match(article, /reveal/i);
	assert.match(article, /another day/i);
	assert.match(article, /inconclusive/i);
	assert.match(article, /selected teas/i);
	assert.match(article, /cannot (?:prove|authenticate|establish)/i);
	assert.match(article, /price.+not.+(?:flavo|taste)/is);
});
```

Update the preface boundary test to locate the new first `<h2>` ID instead of `the-twelve-core-flights`. Leave the full preface content assertions, hero-render assertion, and right-edge Sharp test intact.

- [ ] **Step 4: Run the public regression test and verify it fails**

Run:

```bash
npm run build
node --test tests/sheng-puer-series-introduction.test.mjs
```

Expected: FAIL on old headings, 24-flight titles, old budget rows, August wording, and absent protocol copy. The preface and hero tests should continue to pass.

- [ ] **Step 5: Rewrite the public introduction**

Preserve the frontmatter title, category, hero path, hero alt, grey `<div class="info-box">`, and both existing preface paragraphs. Replace the body after the info box with these sections:

```text
## The program: sensory flights and methods labs
## How to run a flight
## How I chose the teas and vendors
## What the program costs
## What comes next
```

The program section presents the interleaved sequence and visibly marks each item as `Flight` or `Methods lab`. Explain that the first six sensory flights form the foundation and the later flights deepen them, while the methods labs study evidence and expectation rather than pretending those ideas have unique tastes.

The protocol section summarizes the exact parameters, blind-first reveal, neutral observations, repeat session, inconclusive rule, and inference ceiling. It should be concise enough for an introduction and link readers conceptually to the detailed research rather than reproducing all flight templates.

The vendor section must say that, as of September 2026, prices and available teas were investigated across the existing named pool of verified, established, or community-recommended vendors serving Western buyers. Preserve the full 21-vendor list already tested. Explain selection priority in this order: comparison validity, documentation, practical samples, reuse, order consolidation, then normalized and total price. Preserve the non-ranking, non-endorsement, omission, vendor-claim, and changing-stock caveats.

The cost table contains only the two Task 1 derived rows. Explain that the complete program is the unique union, L1/L2 require no extra tea, L3 is included, each offer is counted once, and checkout costs are excluded.

End by saying the next post begins with development states within 7542 and the matched-storage comparison. Do not promise publication of a removed or unverified module.

- [ ] **Step 6: Run focused and full automated verification**

Run:

```bash
npm run build
node --test tests/sheng-puer-program-sources.test.mjs tests/sheng-puer-series-introduction.test.mjs
npm test
```

Expected: every command exits 0. The focused run must pass the catalog/guide and public-introduction suites; `npm test` must complete the Astro build and all repository tests.

- [ ] **Step 7: Inspect the rendered post at desktop and narrow widths**

Start the site with:

```bash
npm run dev -- --host 127.0.0.1
```

Open `http://localhost:4321/tea/learning-sheng-puer-through-comparative-flights/` in the in-app browser. Inspect at approximately 1440 px and 390 px viewport widths. Confirm:

- the entire right-hand plate is visible and separated from the image edge;
- the image background blends with the page as closely as the approved asset allows;
- the grey preface contains only the preface;
- the retained-module roadmap is legible and labs are visually distinguishable in text;
- the two-row basket table does not overflow;
- no 24-flight or old three-tier language is visible.

Stop the development server after inspection.

- [ ] **Step 8: Check the final diff and commit the public rewrite**

Run:

```bash
git diff --check
git status --short
```

Expected: no whitespace errors. The status may include the article, its test, and the already-approved hero directory; it must not include unrelated files.

Commit:

```bash
git add src/content/tea/learning-sheng-puer-through-comparative-flights.md tests/sheng-puer-series-introduction.test.mjs public/tea/posts/learning-sheng-puer-through-comparative-flights/sheng-flights-hero.png
git commit -m "feat: publish validity-first sheng puer program"
```

### Task 4: Final Cross-Artifact Audit

**Files:**
- Verify: `docs/research/sheng-puer-product-catalog.tsv`
- Verify: `docs/research/sheng-puer-program-research.md`
- Verify: `docs/research/sheng-puer-educational-program.md`
- Verify: `src/content/tea/learning-sheng-puer-through-comparative-flights.md`
- Verify: `tests/sheng-puer-program-sources.test.mjs`
- Verify: `tests/sheng-puer-series-introduction.test.mjs`

**Interfaces:**
- Consumes: all committed outputs from Tasks 1–3.
- Produces: evidence that the specification is fully implemented without stale 24-flight language, inconsistent totals, or uncommitted task files.

- [ ] **Step 1: Scan for obsolete public and research claims**

Run:

```bash
rg -n "Twelve Core Flights|twelve advanced|24 flights|Essential core|Standard core|Advanced core|elective-only|deliberately gives no brewing" docs/research/sheng-puer-educational-program.md docs/research/sheng-puer-program-research.md src/content/tea/learning-sheng-puer-through-comparative-flights.md tests/sheng-puer-*.test.mjs
```

Expected: no normative/current-program matches. Historical discussion in the research notebook is allowed only when explicitly labelled as the superseded program or a rejected comparison.

- [ ] **Step 2: Verify all selected offer URLs and dates have evidence records**

Extract every `recommended` catalog row and confirm its URL, September check date, native price, size, availability evidence, and confidence label appear in the September revalidation section of the notebook. Any failed or ambiguous source must be downgraded and removed from both paths before proceeding.

Run:

```bash
awk -F '\t' 'NR == 1 || $23 == "recommended" { print $1, $9, $16, $21 }' docs/research/sheng-puer-product-catalog.tsv
```

Expected: the header followed only by recommended rows with September dates and `in_stock` status.

- [ ] **Step 3: Run final repository verification**

Run:

```bash
git diff --check
npm test
git status --short
```

Expected: no whitespace errors, the Astro build and all tests pass, and no Task 1–3 implementation file remains uncommitted. The plan document itself may remain uncommitted until this task's final checkpoint.

- [ ] **Step 4: Commit the implementation plan and any audit-only correction**

If the audit required a correction, rerun the affected focused test and `npm test` before staging it. Then commit the plan and only verified audit changes:

```bash
git add docs/superpowers/plans/2026-09-01-sheng-puer-program-rework.md
git commit -m "docs: add sheng puer rework implementation plan"
```

Expected: the plan is committed separately; `git status --short` is empty for all files within this feature's scope.
