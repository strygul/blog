import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const pilotUrl = new URL(
	'../dist/tea/learning-sheng-puer-through-comparative-flights/index.html',
	import.meta.url,
);

test('the pilot publishes three flights and previews the remaining modules', () => {
	assert.ok(existsSync(pilotUrl), 'the pilot page should render');
	const pilot = readFileSync(pilotUrl, 'utf8');

	assert.equal((pilot.match(/aria-controls="flight-\d+-content"/g) ?? []).length, 3);
	assert.equal((pilot.match(/class="flight-coming-soon"/g) ?? []).length, 12);
	assert.match(pilot, /More flights are in the works\./);
});

test('each published tea row shows its numeric purchase price', () => {
	assert.ok(existsSync(pilotUrl), 'the pilot page should render');
	const pilot = readFileSync(pilotUrl, 'utf8');

	assert.doesNotMatch(pilot, /<td[^>]*>included<\/td>/i);
	assert.equal(
		(pilot.match(/<td[^>]*>USD 15\.00 \/ €12\.94 for both<\/td>/g) ?? []).length,
		2,
	);
});
