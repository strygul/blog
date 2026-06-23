# Design spec — "The Other 99%: Water, and the Tea You're Not Tasting"

**Date:** 2026-06-23
**Type:** New blog post (tea collection)
**Status:** Approved design → ready for implementation plan
**Working title:** *The Other 99%: Water, and the Tea You're Not Tasting*
**Proposed slug:** `the-other-99-water-for-tea`
**Target file:** `src/content/tea/the-other-99-water-for-tea.md`
**Asset dir:** `public/tea/posts/the-other-99-water-for-tea/`

---

## 1. Purpose & thesis

A comprehensive, heavily-sourced, thesis-driven essay for the blog's tea section, written to the standard of the existing deep-dives (e.g. *Clay Within Clay*): erudite, opinionated, myth-correcting, honest about uncertainty.

**Central thesis (the spine):** A brewed cup is more than 99% water — it is the one ingredient nobody tunes — and **there is no single "best" water, only the deliberate matching of water chemistry to the leaf.** The essay blends three modes: a systematic chemistry deep-dive, a myth-busting argument, and a practical "build your water" payoff. The organizing scientific insight: **alkalinity (bicarbonate), not pH and not "hardness," is the master variable.**

### Framing decisions (locked during brainstorming)
- **Mode:** thesis-driven essay, absorbing (a) systematic chemistry coverage and (b) a practical, evergreen payoff.
- **Tea focus:** anchored in the blog's world — puerh, oolong, gongfu — with a *bridge* section extending the chemistry to green/white/black and Western brewing.
- **Practical depth:** principles + a repeatable DIY remineralization recipe + label-literacy. Region-proof and evergreen (no brand-shootout, no gear list that dates).
- **Length:** comprehensive, ~3,500–5,000 words.
- **Visuals:** custom SVG diagrams authored in-house, matching the existing `figure.figure-center` style. No dependence on stock photos.

### Audience
Serious tea/Yixing-teapot collectors and gongfu brewers (the blog's existing readership), plus any tea drinker who arrives via the practical/bridge sections. Assume curiosity and patience; do not assume chemistry background — define every term on first use.

---

## 2. Voice, format & house-style conventions

Match the established tea-post idiom:
- Opening **`<div class="info-box">`** provenance/caveat note (sources, that quantitative figures are ranges, that puerh/oolong matching is experienced *preference* not controlled science, and the myth-vs-evidence stance).
- `### ` section headers (H3), as in existing posts.
- Figures via **`<figure class="figure-center"> … <figcaption>`** with `loading="lazy" decoding="async"`; SVGs referenced by absolute `/tea/posts/<slug>/…` paths (mirrors *Clay Within Clay*).
- **Bold** key terms on first definition; em-dashes; inline citations in prose (journal names + author/year, as in *Clay Within Clay*).
- Chinese terms with characters + pinyin + gloss: 茶經 (*Cha Jing*), 山水上 (mountain water is best), *yan yun* (rock rhyme), *huigan*.
- **Explicit myth-vs-evidence verdicts** woven into the prose, plus a compact verdict table where it earns its place.
- Markdown tables are supported (`table { width:100% }` in `global.css`) and may be used for the target-ranges and myth-vs-evidence summaries. If tables read too bare, add minimal table styling to `src/styles/blog-post.css` (borders/padding/zebra) as part of implementation — do **not** restyle globally.
- Honesty register: where evidence is coffee-derived, contested, or preference-based, **say so inline** rather than dressing it as proven. This is the feature, not a hedge.

Reuse existing CSS classes only; introduce new CSS only if a diagram or table genuinely needs it, scoped to `blog-post.css`.

---

## 3. Structure (section-by-section)

Target ~3,500–5,000 words. Each section notes its job and the key sourced claims it carries (source tags map to §6).

1. **The ingredient nobody weighs** *(hook / stakes)*
   You weigh leaf to 0.1 g, choose the pot, control temperature and time — then brew in whatever's in the tap. The cup is **>99% water by mass**; the dissolved tea solids are a fraction of a percent. Water is not the neutral medium tea arrives in — it is *most of what you drink* and it is chemically **reactive** with the very compounds you're trying to taste. State the thesis: no single best water, only the right match; and most received wisdom is wrong.

2. **The four numbers that matter** *(chemistry primer)*
   TDS, total/general hardness (GH; Ca²⁺+Mg²⁺), carbonate hardness/alkalinity (KH; HCO₃⁻), and pH as **four independent properties** — not one "mineral-ness." The reframe that organizes the essay: **alkalinity (buffering capacity), not pH, is the master variable.** Explain buffering plainly. Temporary vs permanent hardness (sets up "boiling" later). The TDS-meter caveat: a meter reads conductivity ×0.5–0.8, it does not tell you *which* ions. → **Diagram 1.**
   Claims: [S-chem], [S-SCA] for definitions/ranges.

3. **How each ion changes the cup** *(mechanism, ion-by-ion)*
   Calcium (slows extraction, body, drives scum/cream); Magnesium (**flag: coffee-lore, not established for tea**); **Bicarbonate/alkalinity = the villain** (raises pH → autoxidizes catechins to brown pigment, buffers away brightness, darkens liquor); Sodium/chloride (softener sodium = flat); Sulfate (dry/sharp); Iron (inky/metallic, taste threshold **0.3 mg/L**); Chlorine vs chloramine (off-flavors; chloramine needs catalytic carbon). → **Diagram 2.**
   Claims: [S-ion], [S-cat], [S-hard].

4. **The scum on your tea (and the cream)** *(vivid digression + myth-bust)*
   The iridescent surface film = **oxidized polyphenols on a CaCO₃ skin**; forms only when **both** Ca/Mg **and** bicarbonate are present (Spiro & Jaganyi, *Food Chemistry*, 1990s; chemically controlled, Ea ≈ 34 kJ/mol). Lemon clears it by dropping pH **and** chelating calcium. Tea *cream* is a different thing — a caffeine–theaflavin/thearubigin colloid that forms on cooling; "creaming down" is a sign of briskness. Myth-bust: **scum is your water, not dirty tea.** → optional **Diagram 5 (scum equation).**
   Claims: [S-scum], [S-cream], [S-lemon].

5. **What the science actually says about "optimal"** *(peer-reviewed core)*
   The hardness→catechin numbers: 21→338 ppm cut total catechins **2.4×** (EGCG **3.2×**); high TDS reduced major catechins **~84–93%** — and the mechanism is post-extraction **autoxidation at alkaline pH**, not poorer leaching. **The health-vs-taste paradox** (Cornell, *Nutrients* 2019): deionized/bottled gave **~2× the EGCG** of hard tap, yet a 103-person panel **preferred the tap-brewed tea** (less bitter), *p* < 0.001; black tea barely moved (*p* = 0.250). Both extremes are bad; distilled is not "purest = best." Land the thesis with evidence. Brief SCA-standard correction may live here or in §7.
   Claims: [S-hard], [S-cornell], [S-tds], [S-bicarb], [S-SCA].

6. **The lore, interrogated** *(Lu Yu & the romance of water)*
   Lu Yu's *Classic of Tea* (茶經, c. 760), ch. 5: mountain > river > well (山水上，江水中，井水下); prefer slow, "living" water; well water only if actively drawn. **The famous twenty-springs ranking is NOT Lu Yu** — it's Zhang Youxin's *Jiancha Shuiji* (814, a decade after Lu Yu's death); so is the legendary "identified Nanling water blind" anecdote (flag as legend). Qianlong weighing water for "lightness"; snow/rain "heavenly waters." Verdict: the ancients were **empirically right about the variable that matters** (soft, fresh, low-mineral) while explaining it in a pre-chemical vocabulary; the specific spring rankings are romance. Quote the Carpenter (1974) translation — **verify wording against print before publishing.**
   Claims: [S-luyu], [S-zhang], [S-qianlong].

7. **Build your water** *(practical payoff — evergreen, region-proof)*
   The hierarchy of intervention: **diagnose** your water (local report / read a bottle label) → **carbon filter** for chlorine/chloramine → what **boiling** does and doesn't (temporary hardness only; re-boil fear is mostly myth) → the **reset button: RO/distilled** as a blank canvas → **remineralize.** Provide at least one fully specified, repeatable recipe (Epsom-salt + baking-soda concentrate landing ~82 ppm hardness / ~41 ppm alkalinity; and the no-scale **potassium-bicarbonate "RPavlis" water**); mention Third Wave Water as a sachet option. **Why softeners (sodium) are bad.** **How to read a bottled-water label:** "dry residue at 180 °C" = TDS proxy; hardness ≈ Ca×2.5 + Mg×4.1; alkalinity ≈ HCO₃×0.82; what good (modest Ca+Mg, **low bicarbonate**, low sodium, residue ~50–150) vs bad looks like. SCA numbers as a starting point — **but too alkaline for green tea.** → **Diagram 4 (recipe card)** + **Diagram 6 / table (reading a label).**
   Claims: [S-prac], [S-recipe], [S-label], [S-SCA].

8. **Matching water to your tea** *(gongfu payoff, anchored in puerh/oolong)*
   Honest framing first: the real axes are **alkalinity** (keep low for anything aroma-forward) and **whether minerals are balanced** — not "soft vs hard" as monoliths. Correct the big myth: **"soft water tames bitterness" is the wrong mechanism** — *pure* water over-extracts bitter catechins; minerals *reduce* their extraction. Then per tea:
   - **Young sheng:** the bright-vs-thick debate, stated fairly (contested, legitimate).
   - **Aged sheng / shou:** some bicarbonate + silica for body, "bready" tertiary notes (consensus, preference-grade).
   - **Yancha / roasted oolong:** mineral water and *yan yun* — strong consensus *preference*, **mechanism unproven** (flag).
   - **Dancong:** soft/clean/low-alkalinity to protect aromatics.
   - **Bridge:** green/white (low-alkalinity, **balanced not zero** minerals; temperature is the bigger lever) and black (least water-sensitive; the classic hard-water-dulls-and-scums effect; Yorkshire Tea ships separate hard/soft blends).
   - **Gongfu context:** high leaf:water ratio → avoid pure water (over-extracts); low-alkalinity, low-to-moderate TDS with some balanced minerals.
   → **Diagram 3 (the "water landscape": alkalinity × hardness, tea types placed + target zone)** — the centerpiece visual.
   Claims: [S-match], [S-cornell], [S-hard], [S-yorkshire].

9. **Coda: no perfect water, only deliberate water**
   Tie back to the thesis. The point isn't a legendary spring or a magic number; it's knowing your water, controlling the one variable that matters most (alkalinity), and matching deliberately. The ancients chased named springs; you have reverse osmosis and a 0.01 g scale. Short, resonant.

10. **Sources & further reading**
   Inline citations throughout (journal + author/year, house style), plus a curated end list grouped by peer-reviewed / classical text / community. Mark community and preference-grade sources as such.

---

## 4. Visuals (authored SVG)

All authored in-house as SVG, referenced from `public/tea/posts/the-other-99-water-for-tea/`, wrapped in `figure.figure-center` with descriptive `alt` + `figcaption`. Style to match existing diagrams (clean, restrained palette, legible at mobile width).

**Core set (4):**
1. **Anatomy of brewing water** — the four independent numbers (TDS, GH, KH, pH) and what each governs; visually separates "hardness" from "alkalinity."
2. **Ion → taste map** — each ion (Ca, Mg, HCO₃⁻, Na, SO₄²⁻, Fe, Cl) with its sensory/chemical effect; bicarbonate flagged as the villain; magnesium flagged "coffee-lore."
3. **The water landscape (centerpiece)** — 2-D map, x = hardness/TDS, y = alkalinity, with zones (bright / flat-dull / thin / scummy) and the target region; tea types placed (green & dancong low-low; yancha & aged puerh toward more minerality). Visualizes "no single best, only a target region."
4. **Build-your-water recipe card** — RO/distilled base + dosing → resulting GH/KH; the two recipes summarized.

**Optional (author if time allows):**
5. **Scum reaction** — Ca²⁺ + 2 HCO₃⁻ ⇌ CaCO₃ + CO₂ + H₂O, polyphenols depositing on the film; lemon breaking it.
6. **Annotated label** — a sample bottled-water mineral panel with the "read this / compute that" call-outs (may be a styled table instead).

**Hero image:** author an SVG hero (a clean conceptual image, e.g. the water-landscape motif or a stylized "drop = the cup") as the default. `heroImage` is optional in the schema; leave it easy to swap for a photo the author supplies later. Set `heroImageMaxHeight` if needed to match other posts.

---

## 5. Frontmatter (draft)

```yaml
---
title: "The Other 99%: Water, and the Tea You're Not Tasting"
pubDate: "2026-06-23"
category:
  - "Tea"
  - "Tea Science"
  - "Brewing"
  - "Water"
description: "A brewed cup is more than 99% water, yet it's the one ingredient nobody tunes. A deep, sourced look at the chemistry — and why there's no single 'best' water, only the right match."
heroImage: "../../../public/tea/posts/the-other-99-water-for-tea/hero-water-landscape.svg"
---
```
(Schema: `src/content.config.ts` `tea` collection — title, description, pubDate required; category normalized to array; heroImage optional. Confirm pubDate is acceptable; update if publishing later.)

---

## 6. Evidence base & sources

Peer-reviewed first; community/preference sources labeled as such. Verification flags below are **binding** — honor them in the prose.

**Peer-reviewed (primary):**
- [S-hard] *Effect of Water Hardness on Catechin and Caffeine Content in Green Tea Infusions*, **Molecules** 26(12):3485, 2021. PMC8229914. — hardness→catechin loss; bicarbonate-driven autoxidation/browning; pH thresholds.
- [S-cornell] Franks et al., *The Influence of Water Composition on Flavor and Nutrient Extraction in Green and Black Tea*, **Nutrients** 11(1):80, 2019. PMC6356489. — DI/bottled ≈ 2× EGCG vs tap; **panel preferred tap green tea**; black tea insensitive.
- [S-tds] Murugesh et al., *Influence of water quality on … green tea infusion*, **J. Food Process Engineering** 40, 2017. — explicit TDS/pH numbers; ~84–93% catechin loss at high TDS *(some figures from abstract — verify)*.
- [S-bicarb] *Effects of Bicarbonate Ions in Tea Brewing Water …*, **Foods** 15(11):1958, 2025/26. MDPI. — tea-type-specific bicarbonate thresholds (~22 / ~40 mg/L HCO₃⁻) *(from abstract — verify exact thresholds)*.
- [S-scum] Spiro & Jaganyi, *Kinetics and equilibria of tea infusion, Parts 10–13*, **Food Chemistry**, 1990s. — scum = oxidized polyphenols on CaCO₃; needs Ca/Mg + bicarbonate; Ea ≈ 34 kJ/mol *(abstracts paywalled — corroborated via Compound Interest secondary)*.
- [S-cream] Tea-cream colloid papers (*Food Hydrocolloids* 1998; *J. Agric. Food Chem.* 2005; *Food Research International* 2022). — caffeine–theaflavin/thearubigin colloid; calcium promotes creaming.
- [S-cat] *EGCG–mucin turbidity / metal cations*, PMC11049597. — astringency-bridge potency Al³⁺>K⁺>Mg²⁺>Ca²⁺; Mg/Ca weak (undercuts Mg-for-tea hype).
- [S-mineral] *The types of brewing water affect tea infusion flavor …*, J. Food Composition & Analysis, 2023. PMC10192933. — neutral, low-mineral water best for green; trace cations can aid aroma at low levels.
- [S-coffee] Hendon, Colonna-Dashwood & Colonna-Dashwood, *The Role of Dissolved Cations in Coffee Extraction*, **J. Agric. Food Chem.** 62:4947, 2014. — Mg/Ca/bicarbonate mechanism (coffee; use carefully for tea).
- [S-film] *Tea film formation in artificial tap water*, PMC10411494; *Black tea interfacial rheology & CaCO₃*, **Physics of Fluids** 33:092105, 2021. — film needs Ca/Mg + bicarbonate; scales with hardness.

**Classical text / history:**
- [S-luyu] Lu Yu, *The Classic of Tea* (茶經, c. 760), ch. 5; trans. **Francis Ross Carpenter, 1974**. — mountain>river>well; living-water principle. *(Verify quote against print.)*
- [S-zhang] Zhang Youxin, *Jiancha Shuiji* (煎茶水記, 814) — the twenty-springs ranking + Nanling anecdote; **not** Lu Yu (key correction).
- [S-qianlong] Owyoung, *CHA DAO* (2007) — Qianlong's silver-flask "lightest water" account (anecdote traditional).

**Practical / community (label as such):**
- [S-SCA] SCA / SCAA Water for Brewing Specialty Coffee standard — TDS 150 (75–250), hardness 50–175, alkalinity ~40 (≤40 pref), pH ~7. *(coffee standard; too alkaline for green tea.)*
- [S-recipe] SCA-style remineralization recipes (Barista Institute / Whole Latte Love); RPavlis potassium-bicarbonate water; Third Wave Water official composition.
- [S-label] GrindScience label math: hardness ≈ Ca×2.5 + Mg×4.1 (GrindScience rounds Mg to 4.2; both derive from molar mass 100.1/24.3 ≈ 4.12); alkalinity ≈ HCO₃×0.82; "dry residue at 180 °C" = TDS proxy.
- [S-prac] Boiling/filtration/softener chemistry (Wikipedia *Hard water*; McGill OSS on re-boiling; Fresh Water Systems on chloramine).
- [S-match] MarshalN (*A Tea Addict's Journal*); TeaCurious bottled-water tests; Tea Secrets (bicarbonate/silica granularity); The Rhyming Leaf (remineralization). **All experienced preference, not controlled studies.**
- [S-yorkshire] Yorkshire Tea, *A Proper Brew: How Hard Can That Be?* — separate hard/soft-water blends (commercial evidence hardness matters).
- [S-ion]/[S-chem] water-chemistry references (USGS hardness; Hach; Hanna on EC↔TDS).

### Binding honesty flags
1. **Magnesium's "brightness"** is coffee-derived and not established for tea — present as a coffee hypothesis, not tea fact.
2. **Puerh/oolong/yancha matching** is experienced preference, not controlled science — never dress as proven; surface the real debates.
3. Some quantitative figures (Murugesh %, Foods 2025 thresholds, Spiro Ea) come from abstracts/secondary sources — phrase as "reported" and avoid false precision; re-verify before quoting exact numbers.
4. **Verify the Carpenter Lu Yu quotation against the print edition** before publishing verbatim.
5. **>99% water** framing: a brewed cup's dissolved solids are a fraction of a percent — keep the number defensible ("more than 99%").

---

## 7. File & asset layout

- Post: `src/content/tea/the-other-99-water-for-tea.md`
- Assets: `public/tea/posts/the-other-99-water-for-tea/` (hero + diagram SVGs)
- SVGs referenced as `/tea/posts/the-other-99-water-for-tea/<name>.svg`
- Reuse `info-box`, `figure-center` (global/blog-post CSS). New CSS only if a table/diagram needs it, scoped to `blog-post.css`.
- `create_post.py` exists as a scaffolder but is interactive; the post will be authored directly to match the established frontmatter exactly.

---

## 8. Acceptance criteria

- [ ] ~3,500–5,000 words, all 10 sections present, thesis carried throughout.
- [ ] Anchored in puerh/oolong/gongfu with a working green/white/black bridge.
- [ ] Every technical term defined on first use; alkalinity established as the master variable.
- [ ] Practical section lets a reader actually *do* something: targets, ≥1 fully specified repeatable recipe, label-reading with the mental math.
- [ ] Myth-vs-evidence verdicts explicit; all five binding honesty flags respected.
- [ ] 4 core SVG diagrams authored and rendering via `figure-center`; hero present (SVG default, swappable).
- [ ] Inline citations in house style + end source list; classical quote verified against print.
- [ ] Frontmatter validates against the `tea` collection schema; `npm run build` succeeds.
- [ ] Reads in the blog's established voice (compare against *Clay Within Clay*).

## 9. Out of scope
- Brand-by-brand bottled-water shootout; specific gear/equipment recommendations (kept evergreen instead).
- Health/antioxidant advice beyond the taste-vs-catechin trade-off needed for the argument.
- Water for matcha whisking, cold brew, or non-tea infusions (could be a future post).
