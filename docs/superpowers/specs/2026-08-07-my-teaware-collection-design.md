# My Teaware Collection Design

## Goal

Add a fourth tea subcategory, **My Teaware Collection**, that presents the owner's teaware. Unlike the existing tea subcategories, its category card and category page always use the supplied teapot-sketch hero instead of inheriting the newest post's hero.

## Pages and content

Add the category at `/tea/my-teaware-collection/` after the existing Yixing, Tetsubins, and Other cards. It uses the existing tea category page and post-card grid, with the permanent sketch displayed above the category title and post count in the same hero style used by normal posts.

The first collection post is published on August 7, 2026 at `/tea/factory-1-70s-xi-shi-76ml/` with:

- title: `Factory 1 70s Xi Shi, 76ml`
- category tag: `My Teaware Collection`
- post hero: `xi_shi_collage.jpg`
- details: Factory 1 Xi Shi; mid-1970s; hongni; 76 ml; 10-second pour at 7.6 ml/s; 83.3 g
- body images: `xi_shi_01.jpg` through `xi_shi_11.jpg`, in numeric order

The collection's permanent hero applies only to the category card and category page. Individual collection posts retain their own hero images.

## Implementation

Extend the existing `TEA_CATEGORIES` item shape with an optional fixed hero and add the new category there. The tea index uses that fixed hero when present and otherwise preserves its current newest-post behavior. `TeaCategoryPage` renders the fixed hero above its existing header when present. No separate page template or new dependency is needed.

Copy the sketch and post photographs into the repository's existing tea asset locations. Reuse `TeaCardGrid`, `BlogPost`, Astro's `Image`, and current post-body image styles.

## Verification

Automated checks verify that:

- the fourth category link appears after the existing three;
- its `/tea/` card always uses the fixed sketch rather than the first post hero;
- its category page shows the same fixed sketch and links only to collection posts;
- the first post contains the supplied specifications and all eleven ordered body images;
- existing categories retain their dynamic newest-post heroes;
- the full Astro build and test suite pass.

The rendered tea index, collection page, and first post are checked at desktop and mobile widths.
