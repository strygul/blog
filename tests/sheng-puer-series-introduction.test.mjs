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
	"The Lao Man’e bitterness spectrum",
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
	assert.doesNotMatch(article, /^heroImageSrc:/m);

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

	const coreRoadmap = article.slice(
		article.indexOf('## The twelve core flights'),
		article.indexOf('## Beyond the core: twelve advanced flights'),
	);
	const advancedRoadmap = article.slice(
		article.indexOf('## Beyond the core: twelve advanced flights'),
		article.indexOf('## How I chose the teas and vendors'),
	);

	for (const [roadmap, flights] of [
		[coreRoadmap, coreFlights],
		[advancedRoadmap, advancedFlights],
	]) {
		let previousPosition = -1;
		for (const flight of flights) {
			const position = roadmap.indexOf(flight);
			assert.ok(position > previousPosition, `missing or out-of-order flight: ${flight}`);
			previousPosition = position;
		}
	}

	for (const role of [
		'Yunnan Sourcing for closely matched contemporary comparisons',
		'King Tea Mall for sample-scale Dayi and Xiaguan references',
		'Liquid Proust for unusual storage and Xizi Hao lineage samples',
		'Yee On for explicitly traditional Hong Kong storage examples',
	]) {
		assert.ok(article.includes(role), `missing core vendor role: ${role}`);
	}

	for (const row of [
		'| Essential core | 17 | €166.80 |',
		'| Standard core | 18 | €229.07 |',
		'| Advanced core | 18 | €237.66 |',
		'| Elective-only additions | 14 | €122.69 |',
		'| Advanced all-in union | 32 | €360.35 |',
	]) {
		assert.ok(article.includes(row), `missing or incorrect budget row: ${row}`);
	}
	assert.match(
		article,
		/The all-in figure is the union of advanced-core and elective-only purchases, not another core tier\./,
	);

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
