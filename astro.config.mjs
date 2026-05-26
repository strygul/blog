// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://strygul.com',
	base: '/',
	integrations: [mdx(), sitemap()],
	redirects: {
		'/teapots-for-sale': '/tea/teapots-for-sale',
		'/teapots-for-sale/[...slug]': '/tea/teapots-for-sale/[...slug]',
	},
});
