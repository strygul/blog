import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const readPage = (path) =>
	readFileSync(new URL(`../dist/${path}/index.html`, import.meta.url), 'utf8');

function linkedCard(html, href) {
	const link = `href="${href}"`;
	const linkPosition = html.indexOf(link);
	assert.notEqual(linkPosition, -1, `Missing ${href}`);
	return html.slice(html.lastIndexOf('<a ', linkPosition), html.indexOf('</a>', linkPosition) + 4);
}

const imageSource = (html) => html.match(/<img[^>]+src="([^"]+)"/)?.[1];
const sourceImage = (html) => imageSource(html)?.replace(/_[^/]+(?=\.[^.]+$)/, '');
const dateTime = (html) => html.match(/<time[^>]+datetime="([^"]+)"/)?.[1];
const firstPostCard = (html) => html.match(/<ul[^>]*>[\s\S]*?(<a [\s\S]*?<\/a>)/)?.[1];

test('tea index links to the four subcategories in order', () => {
	const html = readPage('tea');
	const links = [
		'/tea/yixing/',
		'/tea/tetsubins/',
		'/tea/other/',
		'/tea/my-teaware-collection/',
	];
	const positions = links.map((href) => html.indexOf(`href="${href}"`));
	assert.ok(positions.every((position) => position >= 0));
	assert.deepEqual(positions, [...positions].sort((a, b) => a - b));
});

test('collection category keeps its fixed hero on the index and category page', () => {
	const index = readPage('tea');
	const collection = readPage('tea/my-teaware-collection');
	const post = readPage('tea/factory-1-70s-xi-shi-76ml');
	const collectionCard = linkedCard(index, '/tea/my-teaware-collection/');

	assert.equal(sourceImage(collectionCard), sourceImage(collection));
	assert.notEqual(sourceImage(collectionCard), sourceImage(post));
	assert.match(collection, /href="\/tea\/factory-1-70s-xi-shi-76ml\/"/);
	assert.doesNotMatch(collection, /href="\/tea\/yixing-factory-/);
	assert.match(collection, /One of the legendary “Five Shapes”/);
	for (const fact of ['Mid-1970s', 'Hongni', '76 ml', '10 seconds', '7.6 ml\/s', '83.3 g']) {
		assert.match(collection, new RegExp(fact));
	}
	const photos = Array.from({ length: 11 }, (_, index) =>
		collection.indexOf(`xi_shi_${String(index + 1).padStart(2, '0')}.jpg`),
	);
	assert.ok(photos.every((position) => position >= 0));
	assert.deepEqual(photos, [...photos].sort((a, b) => a - b));
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

test('subcategory headings are centered and use editorial descriptions at body size', () => {
	const descriptions = {
		yixing: 'Articles on Yixing clay, teapots, makers, seals, and Factory 1 history.',
		tetsubins:
			'Articles on Japanese cast-iron kettles, their history, workshops, and regional traditions.',
		other: 'Tea notes beyond teaware, from water and brewing to useful resources.',
		'my-teaware-collection': 'My personal collection of teaware',
	};

	for (const [slug, description] of Object.entries(descriptions)) {
		const html = readPage(`tea/${slug}`);
		const header = html.match(/<div class="category-header"[\s\S]*?<\/div>/)?.[0] ?? '';
		assert.ok(header.includes(description), `${slug} description`);
		assert.doesNotMatch(html, /\d+ posts? in this category/);
	}

	const yixing = readPage('tea/yixing');
	assert.match(yixing, /\.category-header[^{}]*\{[^}]*text-align:center/);
	const paragraphRule =
		yixing.match(/\.category-header[^{}]* p[^{}]*\{([^}]*)\}/)?.[1] ?? '';
	assert.doesNotMatch(paragraphRule, /font-size:/);
});
