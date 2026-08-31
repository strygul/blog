# Google Indexing Recovery Design

## Problem

Google Search Console reports 65 URLs as **Discovered — currently not indexed**, all with no crawl date. The submitted sitemap succeeds and exposes 69 URLs, robots permit search crawling, HTTPS is valid, and Search Console reports no manual actions or security issues. It records no external links.

The site already has useful section hubs, an all-posts archive, and contextual related-post links. The remaining on-site weaknesses are weak permanent navigation, redundant generic category archives, and a sitemap without modification dates.

## Goals

- Keep every unique Tea, Software/AI, and Ballet article indexable.
- Give crawlers short, permanent paths to every important section and article.
- Remove duplicate or thin generic category archives from the indexable URL set.
- Provide truthful sitemap modification dates without maintaining duplicate metadata.
- Deploy the changes, verify the live site, and request indexing only for high-value entry points.
- Prepare legitimate backlink outreach separately; never buy or automate links.

## Non-goals

- Guarantee indexing or rankings; Google makes those decisions.
- Rewrite articles solely to increase word count.
- Add an SEO framework, crawler, or new dependency.
- Noindex unique short visual-reference articles.
- Send outreach messages without the author's final approval.

## Site Structure

The global header will link to Home, Tea, Software/AI, Ballet, All Posts, and About. Existing section hubs remain the primary landing pages. The All Posts page remains the complete article directory, and the existing `RelatedPosts` component continues to provide contextual sibling links.

The generic `/categories/` and `/categories/*` pages duplicate the stronger section hubs and include several one-post archives. They will remain usable for visitors but receive `noindex, follow` and be excluded from the sitemap. Tea subcategory hubs such as `/tea/yixing/` and `/tea/tetsubins/` remain indexable because they contain editorial descriptions and useful grouped navigation.

## Sitemap Dates

The existing Astro sitemap integration remains in place. Its serializer will inspect each generated HTML page:

- Article URLs use `article:modified_time` when present, otherwise `article:published_time`.
- Hub pages that visibly list dated content use their newest rendered `<time datetime>` value.
- Pages without a defensible modification date omit `<lastmod>`.

This uses metadata the site already renders, avoids another content parser or date registry, and ensures dates describe significant published content rather than build time.

## Indexing Metadata

`BaseHead.astro` will accept an optional `noindex` property and emit `<meta name="robots" content="noindex, follow">` only when requested. Both generic category routes will opt in. Canonical tags, robots.txt, article metadata, and structured data remain unchanged.

## Verification

One small build-level test will verify mechanical output, not rankings:

- Permanent navigation links to every principal hub.
- Generic category pages render `noindex, follow`.
- Generic category URLs do not appear in the sitemap.
- Article sitemap entries contain a `<lastmod>` matching the generated article metadata.

The existing related-post tests already prove that every article has at least two contextual article links and that their targets exist. The complete `npm test` command must pass.

After deployment, live checks will confirm redirect chains, robots.txt, canonical tags, navigation, and sitemap output.

## Search Console Rollout

After the deployment is live:

1. Recheck the sitemap and the previous `/tea` redirect error.
2. Start validation for the obsolete redirect error if the live redirect remains healthy.
3. Request indexing for only the homepage, principal section hubs, and a small set of cornerstone articles.
4. Let Google discover the remaining articles through the strengthened navigation and existing contextual links.
5. Monitor the Page Indexing report over the following weeks; repeated URL submissions are not useful.

Any Search Console action that submits or validates URLs will be confirmed with the user immediately before it is performed.

## Backlink Outreach

Backlink acquisition is a separate follow-up because it requires external coordination. Research will identify a short list of relevant tea, pottery, museum, history, or culture sites for which a specific article is genuinely useful. Outreach will be individualized and transparent. Drafts and targets will be presented for approval before any message is sent.

