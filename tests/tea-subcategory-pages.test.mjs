import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

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

test('tea index orders subcategories by their newest post date', () => {
	const html = readPage('tea');
	const links = [
		'/tea/my-teaware-collection/',
		'/tea/tetsubins/',
		'/tea/other/',
		'/tea/yixing/',
	];
	const positions = links.map((href) => html.indexOf(`href="${href}"`));
	assert.ok(positions.every((position) => position >= 0));
	assert.deepEqual(positions, [...positions].sort((a, b) => a - b));
});

test('collection category keeps its fixed hero on the index and category page', () => {
	const index = readPage('tea');
	const collection = readPage('tea/my-teaware-collection');
	const post = readPage('tea/factory-1-70s-xi-shi-76ml');
	const chaozhouPost = readPage('tea/late-qing-chaozhou-teapot-48ml');
	const collectionCard = linkedCard(index, '/tea/my-teaware-collection/');
	const postCard = linkedCard(collection, '/tea/factory-1-70s-xi-shi-76ml/');
	const chaozhouCard = linkedCard(collection, '/tea/late-qing-chaozhou-teapot-48ml/');

	assert.equal(sourceImage(collectionCard), sourceImage(collection));
	assert.notEqual(sourceImage(collectionCard), sourceImage(post));
	assert.ok(imageSource(postCard));
	assert.equal(sourceImage(postCard), sourceImage(post));
	assert.ok(imageSource(chaozhouCard));
	assert.equal(sourceImage(chaozhouCard), sourceImage(chaozhouPost));
	assert.match(post, /<div class="hero-image"/);
	assert.match(chaozhouPost, /<div class="hero-image"/);
	assert.match(collection, /href="\/tea\/factory-1-70s-xi-shi-76ml\/"/);
	assert.match(collection, /href="\/tea\/late-qing-chaozhou-teapot-48ml\/"/);
	assert.doesNotMatch(collection, /href="\/tea\/yixing-factory-/);
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

test('tetsubin cards and opened posts use the same original hero image', () => {
	const category = readPage('tea/tetsubins');
	const slugs = [
		'tetsubin-history-1-birth-of-the-iron-kettle',
		'tetsubin-history-2-morioka',
		'tetsubin-history-3-mizusawa-oshu',
		'tetsubin-history-4-yamagata',
		'tetsubin-history-5-kyoto-kansai',
	];

	for (const slug of slugs) {
		const expectedSource = `/tea/posts/${slug}/hero.png`;
		const card = linkedCard(category, `/tea/${slug}/`);
		const post = readPage(`tea/${slug}`);
		assert.equal(imageSource(card), expectedSource, `${slug} card hero`);
		assert.equal(imageSource(post), expectedSource, `${slug} post hero`);
	}
});

test('tetsubin hero backgrounds match the website background', async () => {
	const slugs = [
		'tetsubin-history-1-birth-of-the-iron-kettle',
		'tetsubin-history-2-morioka',
		'tetsubin-history-3-mizusawa-oshu',
		'tetsubin-history-4-yamagata',
		'tetsubin-history-5-kyoto-kansai',
	];
	const websiteBackground = [249, 249, 249];

	for (const slug of slugs) {
		const image = fileURLToPath(new URL(`../public/tea/posts/${slug}/hero.png`, import.meta.url));
		const { data, info } = await sharp(image).removeAlpha().raw().toBuffer({ resolveWithObject: true });
		const borderDepth = 24;

		for (let y = 0; y < info.height; y += 1) {
			for (let x = 0; x < info.width; x += 1) {
				if (
					x >= borderDepth &&
					y >= borderDepth &&
					x < info.width - borderDepth &&
					y < info.height - borderDepth
				) {
					continue;
				}

				const offset = (y * info.width + x) * info.channels;
				const color = Array.from(data.subarray(offset, offset + 3));
				const isLightNeutralPaper = Math.min(...color) >= 235 && Math.max(...color) - Math.min(...color) <= 4;

				if (isLightNeutralPaper) {
					assert.deepEqual(color, websiteBackground, `${slug} background at (${x}, ${y})`);
				}
			}
		}
	}
});

test('each category card inherits the newest post date and dynamic hero', () => {
	const index = readPage('tea');

	for (const slug of ['yixing', 'tetsubins', 'other', 'my-teaware-collection']) {
		const categoryCard = linkedCard(index, `/tea/${slug}/`);
		const postCard = firstPostCard(readPage(`tea/${slug}`));
		assert.ok(postCard, `Missing first post card for ${slug}`);
		if (slug !== 'my-teaware-collection') {
			assert.equal(imageSource(categoryCard), imageSource(postCard), `${slug} hero`);
		}
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
	assert.match(paragraphRule, /font-size:\s*1em/);
});
