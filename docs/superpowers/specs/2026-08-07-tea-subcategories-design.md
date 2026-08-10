# Tea Subcategories Design

## Goal

Reorganize `/tea/` into three editorial subcategories—Yixing, Tetsubins, and Other—without changing article content, article URLs, or the existing post-card presentation.

## Content classification

Use the existing `category` frontmatter field as the source of truth:

- Posts tagged `Tetsubin` belong to Tetsubins.
- The existing `resources` and `the-other-99-water-for-tea` posts belong to Other and receive an `Other` tag.
- Every remaining non-Tetsubin post belongs to Yixing and receives a `Yixing` tag where needed.

Each tea post belongs to exactly one of these three `/tea` subcategories. Existing secondary tags remain unchanged. New posts must include exactly one of `Yixing`, `Tetsubin`, or `Other`.

## Pages and URLs

The `/tea/` introduction remains unchanged. Its post list is replaced by three category cards in this order:

1. Yixing
2. Tetsubins
3. Other

The cards link to:

- `/tea/yixing/`
- `/tea/tetsubins/`
- `/tea/other/`

Existing article URLs under `/tea/<post-id>/` remain unchanged.

## Dynamic category cards

Tea posts are sorted by publication date, newest first. Each category card derives its hero image, displayed date, and hero-image sizing settings from the first post in that category. Publishing a newer post therefore updates the category card automatically.

The category card title is the subcategory name. Its layout and responsive behavior match the current `/tea/` post cards.

## Subcategory pages

Each subcategory page filters tea posts by its configured tag and sorts them newest first. It renders the same post cards, hero images, dates, links, desktop grid, featured-first-card treatment, and mobile layout currently used by `/tea/`.

Unknown `/tea/<category>/` paths are not generated. Empty categories are not expected because all three categories contain existing posts.

## Verification

Automated checks will verify:

- the site builds successfully;
- `/tea/` contains links to all three subcategories;
- each subcategory page contains only its assigned posts;
- category cards use the newest post in each group for their dynamic hero and date;
- existing article routes still build.
