import assert from 'node:assert/strict';
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import test from 'node:test';
import { addLastmod } from '../astro.config.mjs';

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

function sitemapEntries() {
	const xml = readPage('sitemap-0.xml');
	return new Map(
		[...xml.matchAll(/<url><loc>([^<]+)<\/loc>(?:<lastmod>([^<]+)<\/lastmod>)?<\/url>/g)].map(
			([, url, lastmod]) => [url, lastmod],
		),
	);
}

test('generic category archives are noindex and absent from the sitemap', () => {
	const categoryRoot = new URL('../dist/categories/', import.meta.url);
	const archives = [
		readPage('categories/index.html'),
		...readdirSync(categoryRoot, { withFileTypes: true })
			.filter((entry) => entry.isDirectory())
			.map((entry) => readPage(`categories/${entry.name}/index.html`)),
	];

	for (const html of archives) {
		assert.match(html, /<meta name="robots" content="noindex, follow">/);
	}

	for (const url of sitemapEntries().keys()) {
		assert.equal(new URL(url).pathname.startsWith('/categories/'), false, url);
	}
});

test('every article sitemap date matches its rendered article metadata', () => {
	const entries = sitemapEntries();
	for (const collection of ['tea', 'god-is-dead', 'ballet']) {
		const contentDirectory = new URL(`../src/content/${collection}/`, import.meta.url);
		for (const filename of readdirSync(contentDirectory).filter((name) => name.endsWith('.md'))) {
			const id = filename.slice(0, -3);
			const html = readPage(`${collection}/${id}/index.html`);
			const expected =
				html.match(/<meta property="article:modified_time" content="([^"]+)">/)?.[1] ??
				html.match(/<meta property="article:published_time" content="([^"]+)">/)?.[1];
			const actual = entries.get(`https://strygul.com/${collection}/${id}/`);

			assert.ok(expected, `${collection}/${id} is missing article date metadata`);
			assert.ok(actual, `${collection}/${id} is missing sitemap lastmod`);
			assert.equal(new Date(actual).toISOString(), expected, `${collection}/${id}`);
		}
	}
});

test('dated hubs publish their newest rendered date as lastmod', () => {
	const entries = sitemapEntries();
	for (const path of ['tea', 'god-is-dead', 'ballet']) {
		const dates = [
			...readPage(`${path}/index.html`).matchAll(/<time datetime="([^"]+)">/g),
		].map(([, date]) => date);
		const newestDate = new Date(Math.max(...dates.map((date) => new Date(date).valueOf()))).toISOString();
		const lastmod = entries.get(`https://strygul.com/${path}/`);

		assert.ok(dates.length, `${path} has no rendered content date`);
		assert.ok(lastmod, `${path} has no sitemap lastmod`);
		assert.equal(new Date(lastmod).toISOString(), newestDate, path);
	}
});

test('sitemap dates choose the newest rendered hub date', () => {
	const fixtureDirectory = new URL('../dist/__sitemap-date-order/', import.meta.url);
	const fixturePage = new URL('index.html', fixtureDirectory);
	const url = 'https://strygul.com/__sitemap-date-order/';

	mkdirSync(fixtureDirectory, { recursive: true });
	writeFileSync(
		fixturePage,
		'<time datetime="2026-08-30T00:00:00.000Z"></time><time datetime="2026-08-31T00:00:00.000Z"></time>',
	);

	try {
		assert.equal(addLastmod({ url }).lastmod, '2026-08-31T00:00:00.000Z');
	} finally {
		rmSync(fixtureDirectory, { recursive: true });
	}
});

test('sitemap dates ignore malformed rendered dates when valid dates remain', () => {
	const fixtureDirectory = new URL('../dist/__sitemap-invalid-date/', import.meta.url);
	const fixturePage = new URL('index.html', fixtureDirectory);
	const url = 'https://strygul.com/__sitemap-invalid-date/';

	mkdirSync(fixtureDirectory, { recursive: true });
	writeFileSync(
		fixturePage,
		'<time datetime="not-a-date"></time><time datetime="2026-08-30T00:00:00.000Z"></time><time datetime="2026-08-31T00:00:00.000Z"></time>',
	);

	try {
		assert.equal(addLastmod({ url }).lastmod, '2026-08-31T00:00:00.000Z');
	} finally {
		rmSync(fixtureDirectory, { recursive: true });
	}
});

test('sitemap dates omit all-malformed rendered dates', () => {
	const fixtureDirectory = new URL('../dist/__sitemap-all-invalid-dates/', import.meta.url);
	const fixturePage = new URL('index.html', fixtureDirectory);
	const item = { url: 'https://strygul.com/__sitemap-all-invalid-dates/' };

	mkdirSync(fixtureDirectory, { recursive: true });
	writeFileSync(fixturePage, '<time datetime="not-a-date"></time><time datetime="still-not-a-date"></time>');

	try {
		assert.deepEqual(addLastmod(item), item);
	} finally {
		rmSync(fixtureDirectory, { recursive: true });
	}
});

test('the undated blog hub omits sitemap lastmod', () => {
	const blog = readPage('blog/index.html');
	const lastmod = sitemapEntries().get('https://strygul.com/blog/');

	assert.doesNotMatch(blog, /<time datetime="[^"]+">/);
	assert.equal(lastmod, undefined);
});
