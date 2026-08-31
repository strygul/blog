import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import test from 'node:test';

const teaDirectory = new URL('../src/content/tea/', import.meta.url);
const groupNames = new Set(['Yixing', 'Tetsubin', 'Other', 'My Teaware Collection']);
const collectionDetailLabels = [
	'Made by',
	'Origin',
	'Period',
	'Clay',
	'Shape',
	'Handle mark',
	'Base seal',
	'Base inscription',
	'Capacity',
	'Pour',
	'Weight',
];
const expectedExceptions = new Map([
	['factory-1-70s-xi-shi-76ml', 'My Teaware Collection'],
	['late-qing-chaozhou-teapot-48ml', 'My Teaware Collection'],
	['learning-sheng-puer-through-comparative-flights', 'Other'],
	['resources', 'Other'],
	['the-other-99-water-for-tea', 'Other'],
	['tetsubin-history-1-birth-of-the-iron-kettle', 'Tetsubin'],
	['tetsubin-history-2-morioka', 'Tetsubin'],
	['tetsubin-history-3-mizusawa-oshu', 'Tetsubin'],
	['tetsubin-history-4-yamagata', 'Tetsubin'],
	['tetsubin-history-5-kyoto-kansai', 'Tetsubin'],
	['tetsubin-history-6-takaoka', 'Tetsubin'],
]);

function readCategories(file) {
	const frontmatter = readFileSync(file, 'utf8').split('---', 3)[1];
	const lines = frontmatter.split('\n');
	const categoryLine = lines.findIndex((line) => line.startsWith('category:'));
	const inlineCategory = lines[categoryLine].slice('category:'.length).trim();

	if (inlineCategory) return [inlineCategory.replaceAll('"', '')];

	return lines.slice(categoryLine + 1).reduce((categories, line) => {
		if (/^\s+-\s+/.test(line)) {
			categories.push(line.replace(/^\s+-\s+/, '').replaceAll('"', ''));
		}
		return categories;
	}, []);
}

function readCollectionDetailLabels(markdown) {
	const details = markdown.match(/<p class="collection-details">([\s\S]*?)<\/p>/)?.[1] ?? '';
	return [...details.matchAll(/<b>([^<]+):<\/b>/g)].map((match) => match[1]);
}

test('every tea post belongs to exactly one tea subcategory', () => {
	for (const filename of readdirSync(teaDirectory).filter((name) => name.endsWith('.md'))) {
		const id = basename(filename, '.md');
		const groups = readCategories(join(teaDirectory.pathname, filename)).filter((category) =>
			groupNames.has(category),
		);
		assert.deepEqual(groups, [expectedExceptions.get(id) ?? 'Yixing'], id);
	}
});

test('the first collection post contains its group, facts, and ordered photographs', () => {
	const filename = join(teaDirectory.pathname, 'factory-1-70s-xi-shi-76ml.md');
	const markdown = readFileSync(filename, 'utf8');
	const visibleText = markdown.replace(/<[^>]+>/g, '');
	assert.equal(readCategories(filename).includes('My Teaware Collection'), true);
	assert.deepEqual(readCollectionDetailLabels(markdown), collectionDetailLabels);
	for (const fact of [
		'Made by: Factory 1',
		'Origin: Yixing, Jiangsu',
		'Period: Mid-1970s',
		'Clay: Hongni',
		'Shape: Xi Shi',
		'Handle mark: None',
		'Base inscription: None',
		'Capacity: 76 ml',
		'Pour: 10 seconds (7.6 ml/s)',
		'Weight: 83.3 g',
		'Base seal: Zhong Guo YiXing (中國宜興) 7:3',
	]) {
		assert.ok(visibleText.includes(fact), fact);
	}
	assert.match(
		markdown,
		/href="\/tea\/f1-seals\/#:~:text=Another%20variation%20of%20the%20%E2%80%9CZhong%20Guo%20Yixing%E2%80%9D,approximately%207%3A3\."/,
	);
	assert.doesNotMatch(markdown, /^\|/m);
	assert.match(markdown, /<div class="collection-photos">/);
	assert.match(
		readFileSync(new URL('../src/styles/blog-post.css', import.meta.url), 'utf8'),
		/\.collection-photos\s*\{[^}]*width:\s*min\(1020px, calc\(100vw - 2em\)\)/s,
	);

	const positions = Array.from({ length: 11 }, (_, index) =>
		markdown.indexOf(`xi_shi_${String(index + 1).padStart(2, '0')}.jpg`),
	);
	assert.ok(positions.every((position) => position >= 0));
	assert.deepEqual(positions, [...positions].sort((a, b) => a - b));
	assert.equal(
		markdown.match(/<figure class="full-size">\s*<img src="\/tea\/posts\/factory-1-70s-xi-shi-76ml\/xi_shi_\d{2}\.jpg"/g)?.length,
		11,
	);
	assert.notDeepEqual(
		readFileSync(new URL('../src/assets/tea/factory-1-70s-xi-shi-76ml/intro.png', import.meta.url)),
		readFileSync(new URL('../public/tea/posts/factory-1-70s-xi-shi-76ml/xi_shi_01.jpg', import.meta.url)),
	);
});

test('the Deji-marked Chaozhou collection post contains facts and ordered photographs', () => {
	const filename = join(teaDirectory.pathname, 'late-qing-chaozhou-teapot-48ml.md');
	const markdown = readFileSync(filename, 'utf8');
	const visibleText = markdown.replace(/<[^>]+>/g, '');
	assert.equal(readCategories(filename).includes('My Teaware Collection'), true);
	assert.deepEqual(readCollectionDetailLabels(markdown), collectionDetailLabels);
	for (const fact of [
		'Made by: Unknown',
		'Origin: Chaozhou/Fengxi',
		'Period: Late Qing–Republic period (tentative)',
		'Clay: Chaozhou red clay',
		'Shape: Low pear form',
		'Capacity: 48 ml',
		'Pour: 20 seconds (2.4 ml/s)',
		'Weight: 46.06 g',
		'Handle mark: Deji (德記)',
		'Base seal: None',
		'Base inscription: Tian Qi Wan Lai Qiu (天氣晚來秋); Mengchen (孟臣)',
	]) {
		assert.ok(visibleText.includes(fact), fact);
	}
	assert.match(visibleText, /Wang Wei’s .*Autumn Evening in the Mountains/);
	assert.match(visibleText, /traditional signature rather than proof of authorship/);
	assert.doesNotMatch(markdown, /^\|/m);
	assert.match(markdown, /<div class="collection-photos">/);

	const positions = Array.from({ length: 15 }, (_, index) =>
		markdown.indexOf(`chaozhou_${String(index + 1).padStart(2, '0')}.png`),
	);
	assert.ok(positions.every((position) => position >= 0));
	assert.deepEqual(positions, [...positions].sort((a, b) => a - b));
	assert.equal(
		markdown.match(/<figure class="full-size">\s*<img src="\/tea\/posts\/late-qing-chaozhou-teapot-48ml\/chaozhou_\d{2}\.png"/g)?.length,
		15,
	);
	assert.notDeepEqual(
		readFileSync(new URL('../src/assets/tea/late-qing-chaozhou-teapot-48ml/intro.png', import.meta.url)),
		readFileSync(new URL('../public/tea/posts/late-qing-chaozhou-teapot-48ml/chaozhou_01.png', import.meta.url)),
	);
});
