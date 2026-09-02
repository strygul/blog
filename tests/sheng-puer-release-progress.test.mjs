import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const pilotUrl = new URL(
	'../dist/tea/learning-sheng-puer-through-comparative-flights/index.html',
	import.meta.url,
);

test('the pilot publishes nine flights and previews the remaining modules', () => {
	assert.ok(existsSync(pilotUrl), 'the pilot page should render');
	const pilot = readFileSync(pilotUrl, 'utf8');

	assert.equal((pilot.match(/aria-controls="flight-\d+-content"/g) ?? []).length, 9);
	assert.equal((pilot.match(/class="flight-coming-soon"/g) ?? []).length, 6);
	assert.match(pilot, /More flights are in the works\./);
});
