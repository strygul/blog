import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const pilotPath = '/tea/learning-sheng-puer-through-comparative-flights/';
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const productPhotoFigures = (post) =>
	post.match(/<figure class="tea-product-photo">[\s\S]*?<\/figure>/g) ?? [];
const productImageSourceForOffer = (post, offer) => {
	const figure = productPhotoFigures(post).find((candidate) =>
		candidate.includes(`href="${offer}"`),
	);

	return figure?.match(/<img src="(\/tea\/[^\"]+)"/)?.[1];
};
const flights = [
	{
		slug: 'sheng-puer-flight-1-development-states-within-dayi-7542',
		title: 'Sheng Puer Flight 1: Development States Within Dayi 7542',
		offers: [
			'https://kingteamall.com/products/2025-dayi-7542-cake-357g-puerh-sheng-cha-raw-tea',
			'https://kingteamall.com/products/2015-dayi-7542-cake-357g-puerh-sheng-cha-raw-tea',
			'https://kingteamall.com/products/2007-dayi-7542-cake-357g-puerh-sheng-cha-raw-tea-batch-701',
		],
	},
	{
		slug: 'sheng-puer-flight-2-one-tea-two-storage-histories',
		title: 'Sheng Puer Flight 2: One Tea, Two Storage Histories',
		offers: ['https://www.etsy.com/listing/4479672864/2007-shangpin-xizihao-usa-vs-taiwan'],
	},
	{
		slug: 'sheng-puer-flight-3-yiwu-and-bulang',
		title: 'Sheng Puer Flight 3: Yiwu and Bulang',
		offers: [
			'https://yunnansourcing.com/products/2025-yunnan-sourcing-wan-gong-village-wild-arbor-raw-pu-erh-tea-cake',
			'https://yunnansourcing.com/products/2025-yunnan-sourcing-xin-bane-raw-pu-erh-tea-cake',
		],
	},
	{
		slug: 'sheng-puer-flight-4-xishuangbanna-and-lincang',
		title: 'Sheng Puer Flight 4: Xishuangbanna and Lincang',
		offers: [
			'https://yunnansourcing.com/products/2025-yunnan-sourcing-you-le-shan-raw-pu-erh-tea-cake',
			'https://yunnansourcing.com/products/2025-yunnan-sourcing-ba-nuo-village-raw-pu-erh-tea-cake',
		],
	},
	{
		slug: 'sheng-puer-flight-5-dayi-7542-and-8582',
		title: 'Sheng Puer Flight 5: Dayi 7542 and 8582',
		offers: [
			'https://kingteamall.com/products/2008-dayi-7542-cake-357g-puerh-sheng-cha-raw-tea-batch-903',
			'https://kingteamall.com/products/2008-dayi-8582-cake-357g-puerh-sheng-cha-raw-tea',
		],
	},
	{
		slug: 'sheng-puer-flight-6-dayi-and-xiaguan',
		title: 'Sheng Puer Flight 6: Dayi and Xiaguan',
		offers: [
			'https://kingteamall.com/products/2007-dayi-7542-cake-357g-puerh-sheng-cha-raw-tea-batch-701',
			'https://kingteamall.com/products/2007-xiaguan-8653-iron-cake-357g-puerh-raw-tea-sheng-cha',
		],
	},
	{
		slug: 'sheng-puer-flight-7-yiwu-within-yiwu',
		title: 'Sheng Puer Flight 7: Yiwu Within Yiwu',
		offers: [
			'https://yunnansourcing.com/products/2025-yunnan-sourcing-wan-gong-village-wild-arbor-raw-pu-erh-tea-cake',
			'https://yunnansourcing.com/products/2025-yunnan-sourcing-ge-deng-wild-arbor-raw-pu-erh-tea-cake',
			'https://yunnansourcing.com/products/2025-yunnan-sourcing-yi-bang-wild-arbor-raw-pu-erh-tea-cake',
		],
	},
	{
		slug: 'sheng-puer-flight-8-lao-mane-bitterness-spectrum',
		title: 'Sheng Puer Flight 8: Lao Man’e Bitterness Spectrum',
		offers: [
			'https://www.farmer-leaf.com/products/spring-2026-lao-man-e-gushu',
			"https://tea-encounter.com/product/2026-te-laomane-kucha/",
		],
	},
	{
		slug: 'sheng-puer-flight-9-lincang-within-lincang',
		title: 'Sheng Puer Flight 9: Lincang Within Lincang',
		offers: [
			'https://yunnansourcing.com/products/2024-yunnan-sourcing-mo-lie-shan-raw-pu-erh-tea-cake',
			'https://yunnansourcing.com/products/2024-yunnan-sourcing-na-han-village-old-arbor-raw-pu-erh-tea-cake',
		],
	},
	{
		slug: 'sheng-puer-flight-10-spring-and-autumn-from-one-origin',
		title: 'Sheng Puer Flight 10: Spring and Autumn From One Origin',
		offers: [
			'https://yunnansourcing.com/products/2025-yunnan-sourcing-jiu-tai-po-old-arbor-raw-pu-erh-tea-cake',
			'https://yunnansourcing.com/products/2025-yunnan-sourcing-autumn-jiu-tai-po-old-arbor-raw-pu-erh-tea-cake',
		],
	},
	{
		slug: 'sheng-puer-flight-11-dayi-7532-7542-and-8582-suite',
		title: 'Sheng Puer Flight 11: Dayi 7532, 7542, and 8582 Suite',
		offers: [
			'https://kingteamall.com/products/2008-dayi-7532-cake-357g-puerh-sheng-cha-raw-tea',
			'https://kingteamall.com/products/2008-dayi-7542-cake-357g-puerh-sheng-cha-raw-tea-batch-903',
			'https://kingteamall.com/products/2008-dayi-8582-cake-357g-puerh-sheng-cha-raw-tea',
		],
	},
	{
		slug: 'sheng-puer-flight-12-two-traditional-hong-kong-storage-profiles',
		title: 'Sheng Puer Flight 12: Two Traditional Hong Kong Storage Profiles',
		offers: [
			'https://yeeonteaco.com/products/2000-7542-menghai-tea-factory-25-years-of-traditional-manufacturing-raw-pu-erh-tea-cake',
			'https://yeeonteaco.com/products/2008-taste-of-hong-kong-raw-pu-erh-teacake-cellar-storage',
		],
	},
];

test('all twelve sheng puer flights are published as executable standalone guides', () => {
	for (const flight of flights) {
		const renderedPostUrl = new URL(`../dist/tea/${flight.slug}/index.html`, import.meta.url);
		assert.ok(existsSync(renderedPostUrl), `missing rendered route for ${flight.slug}`);

		const post = readFileSync(renderedPostUrl, 'utf8');
		assert.match(
			post,
			new RegExp(`<h1[^>]*>${escapeRegExp(flight.title)}</h1>`),
			`wrong title for ${flight.slug}`,
		);
		assert.ok(post.includes(`href="${pilotPath}"`), `missing pilot link in ${flight.slug}`);

		for (const offer of flight.offers) {
			assert.ok(post.includes(`href="${offer}"`), `missing ${offer} in ${flight.slug}`);
		}

		const productPhotos = productPhotoFigures(post);
		assert.equal(
			productPhotos.length,
			flight.offers.length,
			`expected one sourced product photo per offer in ${flight.slug}`,
		);

		for (const offer of flight.offers) {
			const imageSource = productImageSourceForOffer(post, offer);
			assert.ok(
				imageSource,
				`missing local product image sourced from ${offer} in ${flight.slug}`,
			);
			assert.ok(
				existsSync(new URL(`../dist${imageSource}`, import.meta.url)),
				`missing built product image ${imageSource} in ${flight.slug}`,
			);
		}

		assert.match(post, /5 g/i, `missing leaf dose in ${flight.slug}`);
		assert.match(post, /100 ml/i, `missing vessel volume in ${flight.slug}`);
		assert.match(post, /10, 10, 15, 20, 30, and 45 seconds/i, `missing infusion schedule in ${flight.slug}`);
		assert.match(post, /repeat.+(?:another|different) day/is, `missing repeat rule in ${flight.slug}`);
		assert.match(post, /inconclusive/i, `missing inconclusive outcome in ${flight.slug}`);
		assert.match(post, /What the Result Can Support/i, `missing supported conclusion in ${flight.slug}`);
		assert.match(post, /cannot establish/i, `missing evidence limit in ${flight.slug}`);
	}
});

test('repeated offers reuse one product image across flights', () => {
	const imageSourceByOffer = new Map();

	for (const flight of flights) {
		const renderedPostUrl = new URL(`../dist/tea/${flight.slug}/index.html`, import.meta.url);
		const post = readFileSync(renderedPostUrl, 'utf8');

		for (const offer of flight.offers) {
			const imageSource = productImageSourceForOffer(post, offer);
			assert.ok(imageSource, `missing product image sourced from ${offer} in ${flight.slug}`);

			if (imageSourceByOffer.has(offer)) {
				assert.equal(
					imageSource,
					imageSourceByOffer.get(offer),
					`expected ${offer} to reuse one product image across flights`,
				);
			} else {
				imageSourceByOffer.set(offer, imageSource);
			}
		}
	}
});
