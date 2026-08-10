import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import test from 'node:test';

const teaDirectory = new URL('../src/content/tea/', import.meta.url);
const groupNames = new Set(['Yixing', 'Tetsubin', 'Other', 'My Teaware Collection']);
const expectedExceptions = new Map([
	['factory-1-70s-xi-shi-76ml', 'My Teaware Collection'],
	['resources', 'Other'],
	['the-other-99-water-for-tea', 'Other'],
	['tetsubin-history-1-birth-of-the-iron-kettle', 'Tetsubin'],
	['tetsubin-history-2-morioka', 'Tetsubin'],
	['tetsubin-history-3-mizusawa-oshu', 'Tetsubin'],
	['tetsubin-history-4-yamagata', 'Tetsubin'],
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
	assert.equal(readCategories(filename).includes('My Teaware Collection'), true);
	for (const fact of ['Mid-1970s', 'Hongni', '76 ml', '10 seconds', '7.6 ml/s', '83.3 g']) {
		assert.ok(markdown.includes(fact), fact);
	}

	const positions = Array.from({ length: 11 }, (_, index) =>
		markdown.indexOf(`xi_shi_${String(index + 1).padStart(2, '0')}.jpg`),
	);
	assert.ok(positions.every((position) => position >= 0));
	assert.deepEqual(positions, [...positions].sort((a, b) => a - b));
	assert.equal(
		markdown.match(/<figure class="full-size">\s*<img src="\/tea\/posts\/factory-1-70s-xi-shi-76ml\/xi_shi_\d{2}\.jpg"/g)?.length,
		11,
	);
	assert.deepEqual(
		readFileSync(new URL('../src/assets/tea/factory-1-70s-xi-shi-76ml/intro.jpg', import.meta.url)),
		readFileSync(new URL('../public/tea/posts/factory-1-70s-xi-shi-76ml/xi_shi_01.jpg', import.meta.url)),
	);
});
