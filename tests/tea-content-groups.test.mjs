import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import test from 'node:test';

const teaDirectory = new URL('../src/content/tea/', import.meta.url);
const groupNames = new Set(['Yixing', 'Tetsubin', 'Other', 'My Teaware Collection']);
const expectedExceptions = new Map([
	['factory-1-70s-xi-shi-76ml', 'My Teaware Collection'],
	['late-qing-chaozhou-teapot-48ml', 'My Teaware Collection'],
	['pumpkin-teapot', 'My Teaware Collection'],
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

test('every tea post belongs to exactly one tea subcategory', () => {
	for (const filename of readdirSync(teaDirectory).filter((name) => name.endsWith('.md'))) {
		const id = basename(filename, '.md');
		const groups = readCategories(join(teaDirectory.pathname, filename)).filter((category) =>
			groupNames.has(category),
		);
		assert.deepEqual(groups, [expectedExceptions.get(id) ?? 'Yixing'], id);
	}
});
