import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { readShengPuerCatalog, summarizeBasket } from './helpers/sheng-puer-catalog.mjs';

const guideUrl = new URL('../docs/research/sheng-puer-educational-program.md', import.meta.url);
const researchUrl = new URL('../docs/research/sheng-puer-program-research.md', import.meta.url);
const prefaceUrl = new URL('../docs/research/sheng-puer-article-preface.md', import.meta.url);
const augustDesignUrl = new URL(
	'../docs/superpowers/specs/2026-08-31-sheng-puer-series-introduction-design.md',
	import.meta.url,
);
const augustPlanUrl = new URL(
	'../docs/superpowers/plans/2026-08-31-sheng-puer-series-introduction.md',
	import.meta.url,
);

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

test('the September notebook evidence index records every recommended offer', () => {
	const notebook = readFileSync(researchUrl, 'utf8');
	const septemberSection = notebook.slice(
		notebook.indexOf('## September 2026 validity-first revalidation'),
		notebook.indexOf('\n## Superseded August research archive'),
	);
	const evidenceLines = septemberSection.split('\n');
	const { rows } = readShengPuerCatalog();

	for (const row of rows.filter((entry) => entry.role === 'recommended')) {
		const evidenceLine = evidenceLines.find((line) => line.includes(`](${row.url})`));
		assert.ok(evidenceLine, `September evidence missing URL for ${row.offer_id}`);
		for (const value of [
			row.checked_on,
			`${row.source_currency} ${row.source_price}`,
			`${row.purchase_g} g`,
			row.availability,
			row.confidence,
		]) {
			assert.ok(evidenceLine.includes(value), `${row.offer_id}: evidence missing ${value}`);
		}
	}
});

test('the current notebook excludes legacy mappings and visibly scopes the August archive', () => {
	const notebook = readFileSync(researchUrl, 'utf8');
	const archiveHeading = '## Superseded August research archive';
	const archiveStart = notebook.indexOf(archiveHeading);
	const caveatsStart = notebook.indexOf('\n## Research caveats');
	assert.notEqual(archiveStart, -1, 'missing superseded archive boundary');
	assert.ok(caveatsStart > archiveStart, 'archive must end before current research caveats');

	const currentNotebook = notebook.slice(0, archiveStart);
	const augustArchive = notebook.slice(archiveStart, caveatsStart);
	assert.doesNotMatch(
		currentNotebook,
		/(?:\b1[–-]24\b|\bFlights? (?:1[3-9]|2[0-4])\b|\bFlights? 13[–-]24\b)/,
	);
	assert.doesNotMatch(
		currentNotebook,
		/(?:2026-08-30.{0,160}(?:in stock|inventory|offer facts|purchasable)|(?:in stock|inventory|offer facts|purchasable).{0,160}2026-08-30)/is,
	);
	assert.match(
		augustArchive,
		/audit history only.+superseded by the September 2026 revalidation.+must not be read as current/is,
	);
	assert.deepEqual(
		[...augustArchive.matchAll(/^## (.+)$/gm)].map((match) => match[1]),
		['Superseded August research archive'],
	);
	assert.match(augustArchive, /\b1[–-]24\b/);
	assert.match(augustArchive, /\bFlights 13[–-]15\b/);
	assert.match(augustArchive, /offer facts.+2026-08-30/is);
});

test('the branch-wide obsolete-language audit covers the preface and August introduction artifacts', () => {
	const preface = readFileSync(prefaceUrl, 'utf8');
	assert.match(preface, /twelve sensory flights and three methods labs/i);
	assert.match(preface, /selected (?:sheng|teas).+evidence can.+cannot.+support/is);
	assert.doesNotMatch(preface, /twelve basic.+twelve advanced|24[ -]flight/is);

	for (const [name, url, replacementLinks] of [
		[
			'August design',
			augustDesignUrl,
			[
				'2026-09-01-sheng-puer-program-rework-design.md',
				'../plans/2026-09-01-sheng-puer-program-rework.md',
			],
		],
		[
			'August plan',
			augustPlanUrl,
			[
				'2026-09-01-sheng-puer-program-rework.md',
				'../specs/2026-09-01-sheng-puer-program-rework-design.md',
			],
		],
	]) {
		const document = readFileSync(url, 'utf8');
		assert.match(document, /Superseded/, `${name}: missing superseded status or banner`);
		assert.match(document, /former 24-flight/i, `${name}: missing legacy scope`);
		for (const link of replacementLinks) {
			assert.ok(document.includes(`](${link})`), `${name}: missing current replacement ${link}`);
		}
	}
});

test('the Flight 8 guide heading uses the public Lao Man’e spelling', () => {
	const guide = readFileSync(guideUrl, 'utf8');

	assert.match(guide, /^### Flight 8: Lao Man’e bitterness spectrum$/m);
	assert.doesNotMatch(guide, /^### Flight 8: Lao Man'e bitterness spectrum$/m);
});

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
