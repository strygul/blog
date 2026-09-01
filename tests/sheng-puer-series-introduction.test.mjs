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
const guideUrl = new URL('../docs/research/sheng-puer-educational-program.md', import.meta.url);
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
	'Lao Man’e bitterness spectrum',
	'Lincang within Lincang',
	'Spring and autumn from one origin',
	'Dayi 7532, 7542, and 8582 suite',
	'Two traditional Hong Kong storage profiles',
];
const flightSlugs = [
	'sheng-puer-flight-1-development-states-within-dayi-7542',
	'sheng-puer-flight-2-one-tea-two-storage-histories',
	'sheng-puer-flight-3-yiwu-and-bulang',
	'sheng-puer-flight-4-xishuangbanna-and-lincang',
	'sheng-puer-flight-5-dayi-7542-and-8582',
	'sheng-puer-flight-6-dayi-and-xiaguan',
	'sheng-puer-flight-7-yiwu-within-yiwu',
	'sheng-puer-flight-8-lao-mane-bitterness-spectrum',
	'sheng-puer-flight-9-lincang-within-lincang',
	'sheng-puer-flight-10-spring-and-autumn-from-one-origin',
	'sheng-puer-flight-11-dayi-7532-7542-and-8582-suite',
	'sheng-puer-flight-12-two-traditional-hong-kong-storage-profiles',
];
const methodsLabs = [
	'Lab A — Storage evidence audit',
	'Lab B — Claims are not flavors',
	'Lab C — Blind value and expectation',
];
const expectedDescription = 'A personal introduction to a comparative tasting program observing how selected sheng puer teas differ across development, storage, regional, recipe, and producer contexts.';

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

const expectedPrefaceParagraphs = [
	'Even though I have been drinking tea for as long as I can remember, I came to conscious tea drinking much later in life—and, somewhat unexpectedly, through wine. Living in a country where tea drinkers are a small minority, I found it difficult to meet like-minded companions. Without a community or a clear path to follow, I had to pursue most of my tea education on my own, as many people in the West probably do: relying on whatever online resources I could find and chaotically buying different teas with no purpose beyond exposing myself to as many of them as possible.',
	'This kind of broad exploration is probably an important—and inevitable—step in the journey of anyone who wants to understand tea as something more than a hot drink consumed after dinner with a slice of cake. It introduces you to the extraordinary diversity of tea and helps you discover your own preferences. But it can take you only so far. At some point, you begin to wonder whether you are still learning anything simply by trying yet another new tea.',
	'Coming to tea through wine made me increasingly aware—not that tea lacked educational traditions, but that I could not find a clear path through them. Wine education offered me a visible framework for comparing regions, vintages, producers, grape varieties, and methods of production. In tea, the knowledge was certainly there, but from the perspective of an independent learner in the West, it often felt scattered across traditions, specialist books, blogs, vendors, and online communities. What I was missing was not information itself, but a practical sequence that could turn that information into purposeful tasting.',
	'I began to find the beginnings of such an approach through blogs and social media, where people recommended paired, horizontal, and vertical tastings. I tried them and learned a great deal. They showed me how much more one can discover by comparing teas with a particular question in mind. Still, as a beginner, I often lacked the knowledge and context needed to choose meaningful comparisons—or to make every tea session and every tea purchase as useful for learning as possible.',
	'Over the years, I accumulated more knowledge, discovered many excellent tea resources, and retained the same thirst for learning and desire to deepen my understanding of tea. Gradually, the idea emerged to create the kind of practical guide I wish I had when I was starting out: a guide that would bring structure to tea exploration without taking away the pleasure of discovery. It is this guide that I would now like to share with anyone who might find it useful, inspiring, or insightful.',
	'Because sheng puer is one of my all-time favourites, it felt like the natural place to begin. The program introduces twelve sensory flights and three methods labs: a sequence for exploring how selected sheng differ while learning what the evidence can—and cannot—support. The accompanying research includes suitable teas, vendors, and estimated prices.',
];

test('sheng puer introduction renders the complete preface in the shared info box', () => {
	const renderedArticle = readFileSync(renderedArticleUrl, 'utf8');
	const infoBoxStart = renderedArticle.indexOf('<div class="info-box">');
	const infoBoxEnd = renderedArticle.indexOf('</div>', infoBoxStart);
	const firstSection = renderedArticle.indexOf(
		'<h2 id="flights-overview">',
	);

	assert.notEqual(infoBoxStart, -1, 'missing the grey info box');
	assert.notEqual(infoBoxEnd, -1, 'missing the info box closing tag');
	assert.notEqual(firstSection, -1, 'missing the first article section');
	assert.ok(infoBoxEnd < firstSection, 'the info box should contain only the preface');

	const preface = renderedArticle.slice(infoBoxStart, infoBoxEnd);
	const renderedPrefaceParagraphs = [...preface.matchAll(/<p>(.*?)<\/p>/gs)].map((match) =>
		match[1].replace(/\s+/g, ' ').trim(),
	);
	assert.deepEqual(renderedPrefaceParagraphs, expectedPrefaceParagraphs);
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

test('sheng puer introduction uses neutral observational metadata', () => {
	const article = readFileSync(articleUrl, 'utf8');
	const description = article.match(/^description: "(.+)"$/m)?.[1];

	assert.equal(description, expectedDescription);
	assert.doesNotMatch(description, /\bshap(?:e|ed|es|ing)\b/i);
});

test('public sensory-flight titles exactly match the authoritative guide', () => {
	const guide = readFileSync(guideUrl, 'utf8');
	const guideFlightTitles = [...guide.matchAll(/^### Flight \d+: (.+)$/gm)]
		.map((match) => match[1]);

	assert.deepEqual(sensoryFlights, guideFlightTitles);
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

test('rendered sheng puer hero edge exactly matches the page background', async () => {
	const pageBackground = [249, 249, 249];
	const edgeWidth = 8;
	const renderedArticle = readFileSync(renderedArticleUrl, 'utf8');
	const renderedHeroSrc = renderedArticle.match(
		/<div class="hero-image"[^>]*>\s*<img src="([^"]+)"/,
	)?.[1];
	assert.ok(renderedHeroSrc, 'missing rendered hero source');
	const renderedHeroUrl = new URL(renderedHeroSrc.slice(1), new URL('../dist/', import.meta.url));
	const { data, info } = await sharp(fileURLToPath(renderedHeroUrl))
		.removeAlpha()
		.raw()
		.toBuffer({ resolveWithObject: true });
	let mismatchedPixelCount = 0;

	const matchesPageBackground = (x, y) => {
		const offset = (y * info.width + x) * info.channels;
		return pageBackground.every((channel, index) => data[offset + index] === channel);
	};

	for (let y = 0; y < info.height; y += 1) {
		for (let x = 0; x < info.width; x += 1) {
			const isEdge = x < edgeWidth || x >= info.width - edgeWidth
				|| y < edgeWidth || y >= info.height - edgeWidth;
			if (isEdge && !matchesPageBackground(x, y)) mismatchedPixelCount += 1;
		}
	}

	assert.equal(
		mismatchedPixelCount,
		0,
		'the hero edge should blend seamlessly into the #F9F9F9 page',
	);
});

test('sheng puer introduction presents the retained program and current purchasing caveats', () => {
	const article = readFileSync(articleUrl, 'utf8');

	assert.match(article, /title: "Sheng Puer Flights Pilot"/);
	assert.match(article, /pubDate: "2026-08-31"/);
	assert.match(article, /  - "Other"/);

	for (const heading of [
		'Flights Overview',
		'How to Run a Flight',
		'How I Chose the Teas and Vendors',
		'What the program costs',
	]) {
		assert.ok(article.includes(`## ${heading}`), `missing heading: ${heading}`);
	}

	const programSection = article.slice(
		article.indexOf('## Flights Overview'),
		article.indexOf('## How to Run a Flight'),
	);
	const programSequence = [
		...sensoryFlights.slice(0, 2),
		methodsLabs[0],
		...sensoryFlights.slice(2, 6),
		methodsLabs[1],
		...sensoryFlights.slice(6),
		methodsLabs[2],
	];
	const roadmapItems = programSection.match(/^\d+\. \*\*(?:Flight \d+|Lab [ABC]) — .+?\*\*/gm) ?? [];
	assert.equal(roadmapItems.length, 15, 'the roadmap should contain exactly 15 labelled modules');
	assert.equal(
		roadmapItems.filter((item) => /\*\*Flight \d+ —/.test(item)).length,
		12,
		'the roadmap should visibly label exactly 12 flights',
	);
	assert.deepEqual(
		roadmapItems.filter((item) => /\*\*Lab [ABC] —/.test(item)).map((item) => item.match(/Lab [ABC]/)[0]),
		['Lab A', 'Lab B', 'Lab C'],
	);
	assert.deepEqual(
		roadmapItems
			.filter((item) => /\*\*Flight \d+ —/.test(item))
			.map((item) => item.match(/\*\*Flight \d+ — (.+?)\*\*/)[1]),
		sensoryFlights,
	);
	let previousPosition = -1;
	for (const moduleTitle of programSequence) {
		const position = programSection.indexOf(moduleTitle);
		assert.ok(position > previousPosition, `missing or out-of-order module: ${moduleTitle}`);
		previousPosition = position;
	}

	const renderedArticle = readFileSync(renderedArticleUrl, 'utf8');
	let previousLinkPosition = -1;
	for (const slug of flightSlugs) {
		const href = `href="/tea/${slug}/"`;
		const position = renderedArticle.indexOf(href);
		assert.ok(position > previousLinkPosition, `missing or out-of-order flight link: ${slug}`);
		previousLinkPosition = position;
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
	assert.match(article, /five-second rinse/i);
	assert.match(article, /10, 10, 15, 20, 30, and 45 seconds/);
	assert.match(article, /blind/i);
	assert.match(article, /reveal/i);
	assert.match(article, /another day/i);
	assert.match(article, /inconclusive/i);
	assert.match(article, /selected teas/i);
	assert.match(article, /cannot (?:prove|authenticate|establish)/i);
	assert.match(
		article,
		/price, prestige, provenance, tree age,\s+production philosophy, and intended aging are not directly tastable/i,
	);
});

test('vendor methodology documents the investigated pool, selection criteria, and limitations', () => {
	const article = readFileSync(articleUrl, 'utf8');
	const vendorSection = article.slice(
		article.indexOf('## How I Chose the Teas and Vendors'),
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
	assert.match(normalizedVendorSection, /Liquid Proust.{0,120}matched.{0,80}storage/i);
	assert.match(normalizedVendorSection, /Farmer Leaf and Tea Encounter.{0,80}Lao Man’e/i);
	assert.match(normalizedVendorSection, /research pool/i);
	assert.doesNotMatch(normalizedVendorSection, /lineage samples/i);
	assert.doesNotMatch(normalizedVendorSection, /remain useful alternatives/i);

	const selectionMethod = normalizedVendorSection.slice(
		normalizedVendorSection.indexOf('Comparison validity'),
		normalizedVendorSection.indexOf('Current stock'),
	);
	let previousCriterionPosition = -1;
	for (const criterion of [
		'comparison validity',
		'documentation',
		'sample availability',
		'reuse across flights',
		'order consolidation',
		'normalized and total price',
	]) {
		const position = selectionMethod.toLowerCase().indexOf(criterion);
		assert.ok(position > previousCriterionPosition, `missing or out-of-order criterion: ${criterion}`);
		previousCriterionPosition = position;
	}
});
