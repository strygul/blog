import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const readPage = (path) =>
	readFileSync(new URL(`../dist/${path}`, import.meta.url), 'utf8');

test('the global header permanently links every principal hub', () => {
	const header = readPage('tea/index.html').match(/<header>[\s\S]*?<\/header>/)?.[0] ?? '';

	for (const href of ['/', '/tea/', '/god-is-dead/', '/ballet/', '/blog/', '/about/']) {
		assert.match(header, new RegExp(`href="${href}"`), href);
	}
});

test('homepage and all-posts hub use canonical trailing-slash links', () => {
	const homepage = readPage('index.html');
	for (const href of ['/about/', '/tea/', '/god-is-dead/', '/ballet/']) {
		assert.match(homepage, new RegExp(`href="${href}"`), href);
	}

	const allPosts = readPage('blog/index.html');
	for (const href of ['/tea/', '/god-is-dead/', '/ballet/']) {
		assert.match(allPosts, new RegExp(`href="${href}"`), href);
	}
});
