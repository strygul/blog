import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const pilotUrl = new URL(
	'../dist/tea/learning-sheng-puer-through-comparative-flights/index.html',
	import.meta.url,
);

test('the pilot publishes all flights and previews the methods labs', () => {
	assert.ok(existsSync(pilotUrl), 'the pilot page should render');
	const pilot = readFileSync(pilotUrl, 'utf8');

	assert.equal((pilot.match(/aria-controls="flight-\d+-content"/g) ?? []).length, 12);
	assert.equal((pilot.match(/class="flight-coming-soon"/g) ?? []).length, 3);
	assert.doesNotMatch(pilot, /More flights are in the works\./);
});
