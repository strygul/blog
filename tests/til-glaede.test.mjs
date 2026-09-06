import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const postPath = new URL('../dist/ballet/til-glaede/index.html', import.meta.url);

test('Til Glaæde renders as a Ballet post with its hero image', () => {
	assert.equal(existsSync(postPath), true, 'Til Glaæde page is generated');

	const html = readFileSync(postPath, 'utf8');
	assert.match(html, /<h1[^>]*>Til Glaæde<\/h1>/);
	assert.match(html, /class="hero-image"[^>]*>\s*<img[^>]+src="\/_astro\/hero\.[^"]+\.webp"/);
});

test('Til Glaæde uses Ballet-style sections and inline production photographs', () => {
	const html = readFileSync(postPath, 'utf8');

	for (const heading of ['The naked stage', 'And then came La Sylphide', 'A more earthly Sylph', 'To joy, then']) {
		assert.match(html, new RegExp(`<h2[^>]*>${heading}<\\/h2>`));
	}

	const article = html.match(/<article\b[\s\S]*?<\/article>/)?.[0] ?? '';
	assert.ok((article.match(/<img\b/g) ?? []).length >= 5, 'hero plus four inline production photos');
});

test('Til Glaæde keeps photo captions in the established Ballet post paragraph pattern', () => {
	const html = readFileSync(postPath, 'utf8');

	const inlineCaptions = html.match(/<p><img[^>]*>\s*<em>[^<]*Photo: Camilla Winther\.<\/em><\/p>/g) ?? [];
	assert.equal(inlineCaptions.length, 4, 'each production photograph keeps its caption in the same paragraph');
	assert.doesNotMatch(html, /<p><img[^>]*><\/p>\s*<p><em>[^<]*Photo: Camilla Winther\.<\/em><\/p>/);

	testReviewContext(html);
});

function testReviewContext(html) {
	assert.match(html, /<h2[^>]*>Other reviews<\/h2>/);

	for (const href of [
		'https://alexandermeinertz.dk/heksens-haevn/',
		'https://iscene.dk/2026/09/03/til-glaeden-puster-nyt-liv-i-bournonvillearven/',
		'https://sceneblog.dk/anmeldelse-til-glaeden-den-kongelige-ballet-gamle-scene/',
		'https://kulturinformation.org/ballet-anmeldelse-til-glaeden/',
		'https://www.kulturkupeen.dk/til-glaeden-2026-bournonville-paa-det-kongelige-teater/',
		'https://pov.international/boelgedale-og-boelgetoppe-i-den-kongelige-ballets-fejring-af-bournonville/',
	]) {
		assert.match(html, new RegExp(`href="${href}"`));
	}

	assert.match(html, /<h2 id="related-posts">Related posts<\/h2>/);
	for (const href of ['/ballet/akram-khan-lady-macbeth/', '/ballet/force-of-nature/', '/ballet/koreorama-no-3/']) {
		assert.match(html, new RegExp(`href="${href}"`));
	}
}
