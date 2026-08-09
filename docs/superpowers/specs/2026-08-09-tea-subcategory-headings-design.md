# Tea Subcategory Headings Design

## Goal

Center the heading on every `/tea/<subcategory>/` page and replace its post-count line with a concise description in smaller, muted text.

## Content

Store each description beside the existing slug, title, and tag in `TEA_CATEGORIES`:

- **Yixing:** “Articles on Yixing clay, teapots, makers, seals, and Factory 1 history.”
- **Tetsubins:** “Articles on Japanese cast-iron kettles, their history, workshops, and regional traditions.”
- **Other:** “Tea notes beyond teaware, from water and brewing to useful resources.”

## Implementation

Add a required `description` field to the three existing category entries. In the shared `TeaCategoryPage`, center the category header, render `category.description` beneath the title, and make the description visibly smaller than the title while retaining the existing muted color. Remove the rendered post count.

No new component, dependency, route, or content schema is needed. The existing category configuration remains the single source of truth, so every generated subcategory page receives the same layout behavior.

## Verification

Add one rendered-HTML regression check that confirms the shared header is centered, the former post-count copy is absent, and each page contains its configured description. Run the focused subcategory checks, the full site test suite, and visually inspect `/tea/yixing/` at desktop and mobile widths.
