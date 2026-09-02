import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const flights = [
	{
		slug: 'sheng-puer-flight-1-development-states-within-dayi-7542',
		offers: [
			'https://kingteamall.com/products/2025-dayi-7542-cake-357g-puerh-sheng-cha-raw-tea',
			'https://kingteamall.com/products/2015-dayi-7542-cake-357g-puerh-sheng-cha-raw-tea',
			'https://kingteamall.com/products/2007-dayi-7542-cake-357g-puerh-sheng-cha-raw-tea-batch-701',
		],
	},
	{
		slug: 'sheng-puer-flight-2-one-tea-two-storage-histories',
		offers: ['https://www.etsy.com/listing/4479672864/2007-shangpin-xizihao-usa-vs-taiwan'],
	},
	{
		slug: 'sheng-puer-flight-3-yiwu-and-bulang',
		offers: [
			'https://yunnansourcing.com/products/2025-yunnan-sourcing-wan-gong-village-wild-arbor-raw-pu-erh-tea-cake',
			'https://yunnansourcing.com/products/2025-yunnan-sourcing-xin-bane-raw-pu-erh-tea-cake',
		],
	},
	{
		slug: 'sheng-puer-flight-4-xishuangbanna-and-lincang',
		offers: [
			'https://yunnansourcing.com/products/2025-yunnan-sourcing-you-le-shan-raw-pu-erh-tea-cake',
			'https://yunnansourcing.com/products/2025-yunnan-sourcing-ba-nuo-village-raw-pu-erh-tea-cake',
		],
	},
	{
		slug: 'sheng-puer-flight-5-dayi-7542-and-8582',
		offers: [
			'https://kingteamall.com/products/2008-dayi-7542-cake-357g-puerh-sheng-cha-raw-tea-batch-903',
			'https://kingteamall.com/products/2008-dayi-8582-cake-357g-puerh-sheng-cha-raw-tea',
		],
	},
	{
		slug: 'sheng-puer-flight-6-dayi-and-xiaguan',
		offers: [
			'https://kingteamall.com/products/2007-dayi-7542-cake-357g-puerh-sheng-cha-raw-tea-batch-701',
			'https://kingteamall.com/products/2007-xiaguan-8653-iron-cake-357g-puerh-raw-tea-sheng-cha',
		],
	},
	{
		slug: 'sheng-puer-flight-7-yiwu-within-yiwu',
		offers: [
			'https://yunnansourcing.com/products/2025-yunnan-sourcing-wan-gong-village-wild-arbor-raw-pu-erh-tea-cake',
			'https://yunnansourcing.com/products/2025-yunnan-sourcing-ge-deng-wild-arbor-raw-pu-erh-tea-cake',
			'https://yunnansourcing.com/products/2025-yunnan-sourcing-yi-bang-wild-arbor-raw-pu-erh-tea-cake',
		],
	},
	{
		slug: 'sheng-puer-flight-8-lao-mane-bitterness-spectrum',
		offers: [
			'https://www.farmer-leaf.com/products/spring-2026-lao-man-e-gushu',
			"https://tea-encounter.com/product/2026-te-laomane-kucha/",
		],
	},
	{
		slug: 'sheng-puer-flight-9-lincang-within-lincang',
		offers: [
			'https://yunnansourcing.com/products/2024-yunnan-sourcing-mo-lie-shan-raw-pu-erh-tea-cake',
			'https://yunnansourcing.com/products/2024-yunnan-sourcing-na-han-village-old-arbor-raw-pu-erh-tea-cake',
		],
	},
	{
		slug: 'sheng-puer-flight-10-spring-and-autumn-from-one-origin',
		offers: [
			'https://yunnansourcing.com/products/2025-yunnan-sourcing-jiu-tai-po-old-arbor-raw-pu-erh-tea-cake',
			'https://yunnansourcing.com/products/2025-yunnan-sourcing-autumn-jiu-tai-po-old-arbor-raw-pu-erh-tea-cake',
		],
	},
	{
		slug: 'sheng-puer-flight-11-dayi-7532-7542-and-8582-suite',
		offers: [
			'https://kingteamall.com/products/2008-dayi-7532-cake-357g-puerh-sheng-cha-raw-tea',
			'https://kingteamall.com/products/2008-dayi-7542-cake-357g-puerh-sheng-cha-raw-tea-batch-903',
			'https://kingteamall.com/products/2008-dayi-8582-cake-357g-puerh-sheng-cha-raw-tea',
		],
	},
	{
		slug: 'sheng-puer-flight-12-two-traditional-hong-kong-storage-profiles',
		offers: [
			'https://yeeonteaco.com/products/2000-7542-menghai-tea-factory-25-years-of-traditional-manufacturing-raw-pu-erh-tea-cake',
			'https://yeeonteaco.com/products/2008-taste-of-hong-kong-raw-pu-erh-teacake-cellar-storage',
		],
	},
];
const flightLabels = [
	'Flight 1 — Development states within Dayi 7542',
	'Flight 2 — One tea, two storage histories',
	'Flight 3 — Yiwu and Bulang',
	'Flight 4 — Xishuangbanna and Lincang',
	'Flight 5 — Dayi 7542 and 8582',
	'Flight 6 — Dayi and Xiaguan',
	'Flight 7 — Yiwu within Yiwu',
	'Flight 8 — Lao Man’e bitterness spectrum',
	'Flight 9 — Lincang within Lincang',
	'Flight 10 — Spring and autumn from one origin',
	'Flight 11 — Dayi 7532, 7542, and 8582 suite',
	'Flight 12 — Two traditional Hong Kong storage profiles',
];
const flightSpecificControls = [
	'three identical neutral porcelain vessels',
	'Do not air, condition, or rest only one portion',
	'Do not brew the tea expected to be stronger more gently',
	'Keep the product pages, map, and expected regional descriptions out of view',
	'Do not use conventional recipe-number leaf-grade interpretations',
	'Do not compensate for compression',
	'Rotate positions between infusions only if',
	'Do not soften the bitter-labelled tea',
	'Review the maps and documentation only after',
	'Give both samples the same resting time after opening',
	'despite the 30 g versus 25 g retail sample sizes',
	'Do not add an extra rinse to one tea',
];
const labs = [
	{
		id: 'lab-a',
		label: 'Lab A — Storage evidence audit',
		detail: 'Storage evidence gains specificity when production matching and handling documentation improve',
	},
	{
		id: 'lab-b',
		label: 'Lab B — Claims are not flavors',
		detail: 'Keep missing disclosure as unknown rather than negative evidence',
	},
	{
		id: 'lab-c',
		label: 'Lab C — Blind value and expectation',
		detail: 'record a sensory score, preference, and estimated value before revealing either identity',
	},
];
const pilot = readFileSync(
	new URL('../dist/tea/learning-sheng-puer-through-comparative-flights/index.html', import.meta.url),
	'utf8',
);

test('all twelve sheng puer flights are integrated into collapsible pilot sections', () => {
	for (const [index, flight] of flights.entries()) {
		const number = index + 1;
		const label = flightLabels[index];
		const panelId = `flight-${number}-content`;
		const button = new RegExp(
			`<button[^>]+aria-expanded="false"[^>]+aria-controls="${panelId}"[^>]*>[\\s\\S]*?${escapeRegExp(label)}[\\s\\S]*?<\\/button>`,
		);

		assert.match(pilot, button, `missing collapsed control for ${label}`);
		assert.match(
			pilot,
			new RegExp(`<div[^>]+id="${panelId}"[^>]+class="[^"]*flight-content[^"]*folded[^"]*"`),
			`missing collapsed panel for ${label}`,
		);

		for (const offer of flight.offers) {
			assert.ok(pilot.includes(`href="${offer}"`), `missing ${offer} in the pilot`);
		}

		const renderedPostUrl = new URL(`../dist/tea/${flight.slug}/index.html`, import.meta.url);
		assert.equal(existsSync(renderedPostUrl), false, `standalone route remains for ${flight.slug}`);
		assert.equal(
			pilot.includes(`href="/tea/${flight.slug}/"`),
			false,
			`pilot still links to ${flight.slug}`,
		);
	}

	assert.equal(
		pilot.match(/10, 10, 15, 20, 30, and 45 seconds/gi)?.length,
		1,
		'the shared infusion schedule should appear once',
	);
});

test('all three methods labs are integrated into collapsible pilot sections', () => {
	for (const { id, label, detail } of labs) {
		const panelId = `${id}-content`;
		assert.match(
			pilot,
			new RegExp(
				`<button[^>]+aria-expanded="false"[^>]+aria-controls="${panelId}"[^>]*>[\\s\\S]*?${escapeRegExp(label)}[\\s\\S]*?<\\/button>`,
			),
			`missing collapsed control for ${label}`,
		);
		assert.match(
			pilot,
			new RegExp(`<div[^>]+id="${panelId}"[^>]+aria-hidden="true"[^>]+inert`),
			`${label} content should begin inert`,
		);
		assert.ok(pilot.includes(detail), `missing full protocol for ${label}`);
	}
});

test('collapsed flight content is hidden from assistive technology and keyboard focus', () => {
	for (let number = 1; number <= 12; number += 1) {
		assert.match(
			pilot,
			new RegExp(`<div[^>]+id="flight-${number}-content"[^>]+aria-hidden="true"[^>]+inert`),
			`Flight ${number} content should begin inert`,
		);
	}
});

test('the integrated pilot has no duplicate element ids', () => {
	const ids = [...pilot.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);

	assert.equal(new Set(ids).size, ids.length);
});

test('flight-specific controls survive protocol deduplication', () => {
	for (const [index, control] of flightSpecificControls.entries()) {
		assert.ok(pilot.includes(control), `missing Flight ${index + 1} control: ${control}`);
	}
});

test('the flight list and expanded guides have the requested visual treatment', () => {
	assert.match(pilot, /<ol class="flight-list">/);
	assert.match(pilot, /\.flight-list\{[^}]*list-style:none/);
	assert.match(pilot, /\.flight-content[^}]*\.unfolded\{[^}]*background:#f4eee5/);
	assert.match(pilot, /\.flight-inner[^}]* h2\{[^}]*font-size:1\.25em/);
	assert.match(
		pilot,
		/\.flight-inner[^}]* \.tea-product-gallery\{[^}]*width:100%[^}]*margin-left:0[^}]*transform:none/,
	);
});

test('all article tables use single collapsed borders', () => {
	const stylesheetHref = pilot.match(/href="(\/_astro\/[^"?]+\.css)"/)?.[1];
	const stylesheet = stylesheetHref
		? readFileSync(new URL(`../dist${stylesheetHref}`, import.meta.url), 'utf8')
		: pilot;

	assert.match(stylesheet, /\.prose table\{[^}]*width:100%[^}]*border-collapse:collapse/);
	assert.doesNotMatch(stylesheet, /\.prose table\{[^}]*display:block/);
});

test('flights and labs are rendered as separate groups', () => {
	assert.match(pilot, /<h3 id="flights">Flights<\/h3>/);
	assert.match(pilot, /<h3 id="methods-labs">Methods Labs<\/h3>/);
	assert.ok(
		pilot.indexOf('aria-controls="flight-12-content"') <
			pilot.indexOf('aria-controls="lab-a-content"'),
		'Lab A should follow all twelve flights',
	);
});
