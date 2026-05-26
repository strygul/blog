import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const [blogPosts, teaPosts, teapotsForSalePosts, godIsDeadPosts, balletPosts] = await Promise.all([
		getCollection('blog'),
		getCollection('tea'),
		getCollection('teapots-for-sale'),
		getCollection('god-is-dead'),
		getCollection('ballet'),
	]);

	const items = [
		...blogPosts.map((p) => ({ ...p.data, link: `/blog/${p.id}/` })),
		...teaPosts.map((p) => ({ ...p.data, link: `/tea/${p.id}/` })),
		...teapotsForSalePosts.map((p) => ({ ...p.data, link: `/tea/teapots-for-sale/${p.id}/` })),
		...godIsDeadPosts.map((p) => ({ ...p.data, link: `/god-is-dead/${p.id}/` })),
		...balletPosts.map((p) => ({ ...p.data, link: `/ballet/${p.id}/` })),
	].sort((a, b) => new Date(b.pubDate).valueOf() - new Date(a.pubDate).valueOf());

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items,
	});
}
