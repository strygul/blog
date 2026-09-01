import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import {
	readShengPuerCatalog,
	summarizeBasket,
} from './helpers/sheng-puer-catalog.mjs';

const articleUrl = new URL(
	'../src/content/tea/learning-sheng-puer-through-comparative-flights.md',
	import.meta.url,
);
const renderedArticleUrl = new URL(
	'../dist/tea/learning-sheng-puer-through-comparative-flights/index.html',
	import.meta.url,
);
const heroImageUrl = new URL(
	'../public/tea/posts/learning-sheng-puer-through-comparative-flights/sheng-flights-hero.png',
	import.meta.url,
);

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

const investigatedVendors = [
	'Yunnan Sourcing',
	'King Tea Mall',
	'Farmer Leaf',
	'Bitterleaf Teas',
	'Tea Encounter',
	'Tea Urchin',
	'Crimson Lotus Tea',
	'Essence of Tea',
	'Pu-erh.sk',
	'Liquid Proust',
	'white2tea',
	'Yee On Tea',
	'Bana Tea Company',
	'Teas We Like',
	'The Steeping Room',
	'Quiche Teas/Taishunhe',
	'The Jade Leaf',
	'Hou De',
	'Puerh.uk',
	'Yangqing Hao USA',
	'Teapals',
];

test('sheng puer introduction renders the complete preface in the shared info box', () => {
	const renderedArticle = readFileSync(renderedArticleUrl, 'utf8');
	const infoBoxStart = renderedArticle.indexOf('<div class="info-box">');
	const infoBoxEnd = renderedArticle.indexOf('</div>', infoBoxStart);
	const firstSection = renderedArticle.indexOf(
		'<h2 id="the-program-sensory-flights-and-methods-labs">',
	);

	assert.notEqual(infoBoxStart, -1, 'missing the grey info box');
	assert.notEqual(infoBoxEnd, -1, 'missing the info box closing tag');
	assert.notEqual(firstSection, -1, 'missing the first article section');
	assert.ok(infoBoxEnd < firstSection, 'the info box should contain only the preface');

	const preface = renderedArticle.slice(infoBoxStart, infoBoxEnd);
	assert.match(preface, /Even though I have been drinking tea for as long as I can remember/);
	assert.match(
		preface,
		/The accompanying research includes suitable teas, vendors, and estimated prices\./,
	);
});

test('sheng puer introduction renders its supplied hero image', () => {
	const renderedArticle = readFileSync(renderedArticleUrl, 'utf8');
	const articleStart = renderedArticle.indexOf('<article');
	const heroStart = renderedArticle.indexOf('<div class="hero-image"', articleStart);
	const proseStart = renderedArticle.indexOf('<div class="prose"', articleStart);

	assert.notEqual(articleStart, -1, 'missing the article');
	assert.notEqual(heroStart, -1, 'missing the hero image');
	assert.notEqual(proseStart, -1, 'missing the article prose');
	assert.ok(heroStart < proseStart, 'the hero image should appear above the article prose');

	const hero = renderedArticle.slice(heroStart, proseStart);
	assert.match(hero, /<img src="\/_astro\/sheng-flights-hero\.[^"]+\.webp"/);
	assert.match(hero, /alt="Sheng Puer Flights Pilot"/);
});

test('sheng puer hero keeps the illustration clear of the right canvas edge', async () => {
	const { data, info } = await sharp(fileURLToPath(heroImageUrl))
		.removeAlpha()
		.raw()
		.toBuffer({ resolveWithObject: true });
	let darkPixelCount = 0;

	for (let y = 0; y < info.height; y += 1) {
		for (let x = info.width - 8; x < info.width; x += 1) {
			const offset = (y * info.width + x) * info.channels;
			const brightness = (data[offset] + data[offset + 1] + data[offset + 2]) / 3;
			if (brightness < 230) darkPixelCount += 1;
		}
	}

	assert.equal(darkPixelCount, 0, 'the right edge should contain only background');
});

test('sheng puer introduction presents the retained program and current purchasing caveats', () => {
	const article = readFileSync(articleUrl, 'utf8');

	assert.match(article, /title: "Sheng Puer Flights Pilot"/);
	assert.match(article, /pubDate: "2026-08-31"/);
	assert.match(article, /  - "Other"/);

	for (const heading of [
		'The program: sensory flights and methods labs',
		'How to run a flight',
		'How I chose the teas and vendors',
		'What the program costs',
		'What comes next',
	]) {
		assert.ok(article.includes(`## ${heading}`), `missing heading: ${heading}`);
	}

	const programSection = article.slice(
		article.indexOf('## The program: sensory flights and methods labs'),
		article.indexOf('## How to run a flight'),
	);
	const programSequence = [
		...sensoryFlights.slice(0, 2),
		methodsLabs[0],
		...sensoryFlights.slice(2, 6),
		methodsLabs[1],
		...sensoryFlights.slice(6),
		methodsLabs[2],
	];
	let previousPosition = -1;
	for (const moduleTitle of programSequence) {
		const position = programSection.indexOf(moduleTitle);
		assert.ok(position > previousPosition, `missing or out-of-order module: ${moduleTitle}`);
		previousPosition = position;
	}

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

	assert.match(article, /not (?:an overall |an? )?vendor ranking/i);
	assert.match(
		article,
		/not\s+(?:necessarily\s+)?the\s+(?:best|lowest|cheapest)\s+prices?/i,
	);
	assert.match(article, /shipping, tax, card-conversion spreads, and import costs/i);
	assert.match(article, /September 2026/i);
	assert.match(
		article,
		/checked (?:on )?2026-09-\d{2}/i,
	);

	for (const url of [
		'https://teadb.org/puerh/',
		'https://teadb.org/five-types-raw-puerh/',
		'https://teadb.org/non-mainland-puerh-vendor-guide/',
	]) {
		assert.ok(article.includes(url), `missing TeaDB source: ${url}`);
	}
});

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

test('vendor methodology documents the investigated pool, selection criteria, and limitations', () => {
	const article = readFileSync(articleUrl, 'utf8');
	const vendorSection = article.slice(
		article.indexOf('## How I chose the teas and vendors'),
		article.indexOf('## What the program costs'),
	);
	const normalizedVendorSection = vendorSection.replace(/\s+/g, ' ');

	for (const vendor of investigatedVendors) {
		assert.ok(normalizedVendorSection.includes(vendor), `missing investigated vendor: ${vendor}`);
	}

	assert.match(normalizedVendorSection, /serving Western buyers/i);
	assert.match(normalizedVendorSection, /September 2026/i);
	assert.match(normalizedVendorSection, /comparison validity/i);
	assert.match(normalizedVendorSection, /sample availability/i);
	assert.match(normalizedVendorSection, /current stock/i);
	assert.match(normalizedVendorSection, /documentation/i);
	assert.match(normalizedVendorSection, /reuse across flights/i);
	assert.match(normalizedVendorSection, /order consolidation/i);
	assert.match(normalizedVendorSection, /not (?:an )?(?:endorsement|vendor ranking)/i);
	assert.match(normalizedVendorSection, /vendor claim/i);
});
