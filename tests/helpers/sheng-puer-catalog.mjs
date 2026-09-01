import { readFileSync } from 'node:fs';

export const catalogUrl = new URL(
	'../../docs/research/sheng-puer-product-catalog.tsv',
	import.meta.url,
);

export function readShengPuerCatalog() {
	const lines = readFileSync(catalogUrl, 'utf8').trimEnd().split('\n');
	const headers = lines[0].split('\t');
	const rows = lines.slice(1).map((line, index) => {
		const values = line.split('\t');
		if (values.length !== headers.length) {
			throw new Error(`catalog row ${index + 2} has ${values.length} columns; expected ${headers.length}`);
		}
		return Object.fromEntries(headers.map((header, column) => [header, values[column]]));
	});
	return { headers, rows };
}

export function summarizeBasket(rows, path) {
	const selected = rows.filter(
		(row) =>
			row.role === 'recommended' &&
			row.availability === 'in_stock' &&
			row.paths.split('|').includes(path),
	);
	return {
		count: selected.length,
		total: Number(selected.reduce((sum, row) => sum + Number(row.price_eur), 0).toFixed(2)),
	};
}
