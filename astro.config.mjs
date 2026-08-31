// @ts-check

import { existsSync, readFileSync } from 'node:fs';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

const outputDirectory = new URL('./dist/', import.meta.url);

/** @param {import('@astrojs/sitemap').SitemapItem} item */
export function addLastmod(item) {
	const pathname = new URL(item.url).pathname;
	const page = new URL(pathname === '/' ? 'index.html' : `.${pathname}index.html`, outputDirectory);
	if (!existsSync(page)) return item;

	const html = readFileSync(page, 'utf8');
	const articleLastmod =
		html.match(/<meta property="article:modified_time" content="([^"]+)">/)?.[1] ??
		html.match(/<meta property="article:published_time" content="([^"]+)">/)?.[1];
	const dates = [...html.matchAll(/<time datetime="([^"]+)">/g)]
		.map(([, date]) => new Date(date).valueOf())
		.filter(Number.isFinite);
	const lastmod =
		articleLastmod ??
		(dates.length ? new Date(Math.max(...dates)).toISOString() : undefined);

	return lastmod ? { ...item, lastmod } : item;
}

export default defineConfig({
	site: 'https://strygul.com',
	base: '/',
	integrations: [
		mdx(),
		sitemap({
			filter: (page) => !new URL(page).pathname.startsWith('/categories/'),
			serialize: addLastmod,
		}),
	],
});
