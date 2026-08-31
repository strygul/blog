# Sheng Puer Comparative Flights: Series Introduction Design

**Date:** 2026-08-31
**Status:** Approved in conversation

## Purpose

Create the first public-facing post in the sheng puer comparative-flight series. The post will introduce the author's motivation, explain the educational idea, reveal the program roadmap, and state how teas, vendors, and prices were selected. It will not contain a complete flight; the next post will begin with Flights 1 and 2.

The voice should remain personal, reflective, and exploratory. The author is sharing a practical structure developed through self-education, not presenting a definitive or authoritative curriculum.

## Location and format

Create one Markdown post in `src/content/tea/` using the existing tea collection frontmatter and house style. Use the working title **“Learning Sheng Puer Through Comparative Flights.”** Do not add a hero image in this task.

## Article structure

1. **Personal preface:** Use the approved preface about coming to conscious tea drinking through wine, learning independently, tasting widely, and eventually reaching the limits of unguided exploration.
2. **Why comparative flights:** Define a flight as a purposeful comparison organized around a question. Make clear that these are educational orientations rather than controlled experiments and that several variables may remain confounded.
3. **The program roadmap:** Present all 12 core flight titles in sequence. Introduce the 12 advanced flights more compactly, while still naming the subjects they cover. Detailed tea recommendations remain in later posts.
4. **How teas and vendors were selected:** Explain TeaDB's role as a discovery and interpretive compass and current vendor pages as the source for product format, availability, price, and seller claims. Describe the selection criteria and the roles of the chosen vendors.
5. **Budget paths:** Present the checked EUR totals for the essential, standard, advanced-core, elective-only addition, and advanced all-in paths. State the price-check date and exclude shipping, tax, card conversion spreads, and import costs.
6. **What comes next:** End by introducing the next article on youth/transformation and storage.

## Vendor-selection explanation

The post must distinguish a flight-specific shortlist from a vendor guide:

- Yunnan Sourcing supplies closely matched contemporary regional, seasonal, and construction comparisons.
- King Tea Mall supplies sample-scale Dayi and Xiaguan factory and recipe references.
- Liquid Proust supplies unusual Xizi Hao storage and boutique-lineage samples.
- Yee On Tea supplies explicitly traditional Hong Kong storage examples.
- Farmer Leaf, Tea Encounter, white2tea, Teas We Like, and Bana Tea Company appear in advanced flights or as specialized alternatives.

Mention that the research also considered Tea Urchin, Essence of Tea, Crimson Lotus Tea, The Jade Leaf, Quiche Teas/Taishunhe, Pu-erh.sk, Puerh.uk, Hou De, Teapals, Yangqing Hao USA, and other TeaDB leads. Their omission from the selected offers is not a quality judgment. Typical reasons were the lack of a well-matched current comparison, absent sample sizes, insufficient product or storage detail, unavailable stock, or inability to verify the exact live offer.

State plainly that:

- the selected vendors are not an overall ranking;
- the listed prices are verified snapshots, not proven worldwide minima;
- educational fit, sample availability, documentation, anchor reuse, and order consolidation were considered alongside price;
- delivered cost varies by destination.

## Roadmap and budget facts

Use the 24 flight titles and the following totals from the verified internal program:

- Essential core: €166.80 for 17 offers
- Standard core: €229.07 for 18 offers
- Advanced core: €237.66 for 18 offers
- Elective-only additions: €122.69 for 14 offers
- Advanced all-in union: €360.35 for 32 offers

The advanced all-in figure is the union of advanced-core and elective-only offers and must not be presented as another core tier.

## Sources and claims

Link to TeaDB's Pu'erh hub, “The Five Types of Raw Pu'erh You Should Try,” and the 2025 Non Mainland Pu'erh Vendor Guide. Attribute product identity, origin, tree age, batch, and storage descriptions to vendors where applicable. Avoid turning TeaDB tasting observations into guaranteed outcomes or its historical price references into current purchasing facts.

## Verification

- Confirm frontmatter validates against the tea collection schema.
- Confirm all internal and external Markdown links are well formed.
- Run the repository test suite, which includes the Astro production build.
- Check the finished article for unsupported “best,” “cheapest,” controlled-comparison, and vendor-ranking claims.
