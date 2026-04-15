// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "Iev's Blog";
export const SITE_DESCRIPTION =
	'Personal blog by Iev Strygul: software engineering, tea and Yixing teapots, and life in Copenhagen.';
export const SITE_AUTHOR = 'Iev Strygul';

export const PAGE_DESCRIPTIONS = {
	blogIndex:
		'Archive of blog posts: writing, tech, and longer-form notes from Iev Strygul.',
	teaIndex:
		'Articles on Chinese tea, Yixing zisha, factory-era teapots, seals, and clay—by a collector in Copenhagen.',
	teapotsForSaleIndex:
		'Authentic Yixing teapots offered for sale: descriptions, photos, and buying details from a private collector.',
	godIsDeadIndex:
		'Essays on software engineering, artificial intelligence, and what changes when craft, judgment, and meaning meet automation.',
	categoriesIndex: 'Browse posts by category: tea, teapots, software, and other topics from Iev Strygul’s blog.',
} as const;

/** Home (`/`): sentence-case link text. Article titles stay Title Case in frontmatter. */
export const PAGE_HOME_LINK_LABELS = {
	godIsDead: 'God is dead: notes on how software engineering and AI have killed him',
} as const;

/** Section index `<title>` stem and main hub `<h1>` (Title Case, like article titles). */
export const PAGE_INDEX_TITLES = {
	godIsDead: 'God Is Dead: Notes on How Software Engineering and AI Have Killed Him',
} as const;

/** Section hub subtitle under `<h1>` — sentence case (not article `<title>`). */
export const PAGE_INDEX_SUBTITLES = {
	godIsDead: 'Notes on how software engineering and AI have killed him.',
} as const;
