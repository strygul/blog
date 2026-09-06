import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const sourcePost = new URL('../src/content/ballet/til-glaede.md', import.meta.url);
const generatedPost = new URL('../dist/ballet/til-glaede/index.html', import.meta.url);
const assetNames = [
	'hero.jpg',
	'august-2-high-res.jpg',
	'jockey-dans.jpg',
	'madge.jpg',
	'sylphide-high-res.jpg',
];

test('production includes the Til Glaæde Ballet post and its required assets', () => {
	assert.equal(existsSync(sourcePost), true, 'the published Ballet source exists');
	assert.match(readFileSync(sourcePost, 'utf8'), /^title: "Til Glaæde"$/m);

	for (const assetName of assetNames) {
		assert.equal(
			existsSync(new URL(`../public/ballet/til-glaede/${assetName}`, import.meta.url)),
			true,
			`${assetName} exists`,
		);
	}

	assert.equal(existsSync(generatedPost), true, 'the production route is generated');
	assert.match(readFileSync(generatedPost, 'utf8'), /<h1[^>]*>Til Glaæde<\/h1>/);
});
