import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const catalogUrl = new URL('../docs/research/sheng-puer-product-catalog.tsv', import.meta.url);
const guideUrl = new URL('../docs/research/sheng-puer-educational-program.md', import.meta.url);

test('the 2000 Yee On 7532 stays outside the three-age 7542 sequence', () => {
	const catalog = readFileSync(catalogUrl, 'utf8');
	const row = catalog
		.split('\n')
		.find((line) => line.startsWith('yeeon-2000-7532-trad-hk-10g\t'));

	assert.ok(row, 'missing 2000 Yee On 7532 catalog row');
	assert.equal(row.split('\t')[16], '10|23');
});

test('the Flight 14 guide heading uses the public Lao Man’e spelling', () => {
	const guide = readFileSync(guideUrl, 'utf8');

	assert.match(guide, /^### Flight 14: The Lao Man’e bitterness spectrum$/m);
	assert.doesNotMatch(guide, /^### Flight 14: The Lao Man'e bitterness spectrum$/m);
});
