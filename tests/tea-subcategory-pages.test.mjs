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
const dateTime = (html) => html.match(/<time[^>]+datetime="([^"]+)"/)?.[1];
const firstPostCard = (html) => html.match(/<ul[^>]*>[\s\S]*?(<a [\s\S]*?<\/a>)/)?.[1];

test('tea index links to the three subcategories in order', () => {
	const html = readPage('tea');
	const links = ['/tea/yixing/', '/tea/tetsubins/', '/tea/other/'];
	const positions = links.map((href) => html.indexOf(`href="${href}"`));
	assert.ok(positions.every((position) => position >= 0));
	assert.deepEqual(positions, [...positions].sort((a, b) => a - b));
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
