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
