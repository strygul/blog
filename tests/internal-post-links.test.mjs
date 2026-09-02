import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { basename } from 'node:path';
import test from 'node:test';

const collections = ['tea', 'god-is-dead', 'ballet'];

function postIds(collection) {
	const directory = new URL(`../src/content/${collection}/`, import.meta.url);
	return readdirSync(directory)
		.filter((filename) => filename.endsWith('.md'))
		.map((filename) => basename(filename, '.md'));
}

function readPost(collection, id) {
	return readFileSync(
		new URL(`../dist/${collection}/${id}/index.html`, import.meta.url),
		'utf8',
	);
}

function relatedSection(html) {
	return html.split('<h2 id="related-posts">Related posts</h2>')[1] ?? '';
}

function relatedLinks(html) {
	return [...relatedSection(html).matchAll(/<a href="\/(tea|god-is-dead|ballet)\/([^"#?\/]+)\/">([^<]*)<\/a>/g)];
}

test('every post renders at least two related internal article links', () => {
	for (const collection of collections) {
		for (const id of postIds(collection)) {
			const html = readPost(collection, id);
			const section = relatedSection(html);
			const internalArticleLinks = section.match(
				new RegExp(`href="/${collection}/[^"#?]+/"`, 'g'),
			);

			assert.ok(section, `${collection}/${id} is missing its Related posts section`);
			assert.ok(
				(internalArticleLinks?.length ?? 0) >= 2,
				`${collection}/${id} has fewer than two related article links`,
			);
		}
	}
});

test('every internal article link points to a published post', () => {
	const publishedPaths = new Set(
		collections.flatMap((collection) =>
			postIds(collection).map((id) => `/${collection}/${id}`),
		),
	);

	for (const collection of collections) {
		for (const id of postIds(collection)) {
			const html = readPost(collection, id);
			const links = relatedLinks(html);

			for (const link of links) {
				assert.ok(
					publishedPaths.has(`/${link[1]}/${link[2]}`),
					`${collection}/${id} links to missing article ${link[0]}`,
				);
			}
		}
	}
});

test('related link labels use the target posts’ current titles', () => {
	for (const collection of collections) {
		for (const id of postIds(collection)) {
			for (const link of relatedLinks(readPost(collection, id))) {
				const target = readPost(link[1], link[2]);
				const targetTitle = target.match(/<h1[^>]*>([^<]+)<\/h1>/)?.[1];

				assert.ok(link[3], `${collection}/${id} has an empty related link label`);
				assert.equal(link[3], targetTitle, `${collection}/${id} has a stale label for ${link[0]}`);
			}
		}
	}
});
