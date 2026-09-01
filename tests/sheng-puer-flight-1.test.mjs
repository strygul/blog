import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const renderedPostUrl = new URL(
	'../dist/tea/sheng-puer-flight-1-development-states-within-dayi-7542/index.html',
	import.meta.url,
);

test('the first sheng puer flight is published as an executable standalone post', () => {
	assert.ok(existsSync(renderedPostUrl), 'missing the rendered Flight 1 post');

	const post = readFileSync(renderedPostUrl, 'utf8');
	assert.match(
		post,
		/<h1[^>]*>Sheng Puer Flight 1: Development States Within Dayi 7542<\/h1>/,
	);
	assert.match(post, /href="\/tea\/learning-sheng-puer-through-comparative-flights\/?"/);

	for (const offerPath of [
		'2025-dayi-7542-cake-357g-puerh-sheng-cha-raw-tea',
		'2015-dayi-7542-cake-357g-puerh-sheng-cha-raw-tea',
		'2007-dayi-7542-cake-357g-puerh-sheng-cha-raw-tea-batch-701',
	]) {
		assert.match(post, new RegExp(`href="https://kingteamall\\.com/products/${offerPath}"`));
	}

	assert.match(post, /5 g of each tea/i);
	assert.match(post, /100 ml/);
	assert.match(post, /10, 10, 15, 20, 30, and 45 seconds/);
	assert.match(post, /repeat.+different day/is);
	assert.match(post, /inconclusive/i);
	assert.match(post, /cannot establish.+age-only effect/is);
});
