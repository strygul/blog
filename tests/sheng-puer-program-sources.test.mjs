import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { readShengPuerCatalog, summarizeBasket } from './helpers/sheng-puer-catalog.mjs';

const guideUrl = new URL('../docs/research/sheng-puer-educational-program.md', import.meta.url);

const expectedHeaders = [
	'offer_id', 'tea_name', 'year', 'producer', 'recipe_or_origin', 'storage',
	'vendor', 'country', 'url', 'purchase_g', 'source_currency', 'source_price',
	'eur_rate', 'price_eur', 'eur_per_10g', 'checked_on', 'module_ids', 'paths',
	'anchor', 'confidence', 'availability', 'notes', 'role',
];

test('the catalog uses the revised module and purchasing-path schema', () => {
	const { headers, rows } = readShengPuerCatalog();
	assert.deepEqual(headers, expectedHeaders);
	assert.equal(new Set(rows.map((row) => row.offer_id)).size, rows.length);

	for (const row of rows.filter((entry) => entry.role === 'recommended')) {
		assert.match(row.checked_on, /^2026-09-\d{2}$/);
		assert.equal(row.availability, 'in_stock');
		assert.match(row.paths, /^(foundation\|complete|complete)$/);
		for (const moduleId of row.module_ids.split('|')) {
			assert.match(moduleId, /^(F(?:[1-9]|1[0-2])|L[1-3])$/);
		}
	}
});

test('catalog EUR calculations and cumulative paths are internally consistent', () => {
	const { rows } = readShengPuerCatalog();
	for (const row of rows) {
		const converted = Number(row.source_price) * Number(row.eur_rate);
		const normalized = (Number(row.price_eur) / Number(row.purchase_g)) * 10;
		assert.ok(Math.abs(converted - Number(row.price_eur)) <= 0.02, `${row.offer_id}: EUR conversion`);
		assert.ok(Math.abs(normalized - Number(row.eur_per_10g)) <= 0.02, `${row.offer_id}: EUR/10 g`);
	}

	const foundation = summarizeBasket(rows, 'foundation');
	const complete = summarizeBasket(rows, 'complete');
	assert.ok(foundation.count > 0);
	assert.ok(complete.count >= foundation.count);
	assert.ok(complete.total >= foundation.total);
});

test('the Flight 14 guide heading uses the public Lao Man’e spelling', () => {
	const guide = readFileSync(guideUrl, 'utf8');

	assert.match(guide, /^### Flight 14: The Lao Man’e bitterness spectrum$/m);
	assert.doesNotMatch(guide, /^### Flight 14: The Lao Man'e bitterness spectrum$/m);
});
