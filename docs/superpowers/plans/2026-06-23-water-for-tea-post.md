# "The Other 99%" — Water-for-Tea Post Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a comprehensive, heavily-sourced, thesis-driven tea-section essay ("The Other 99%: Water, and the Tea You're Not Tasting") with four authored SVG diagrams and a hero image, matching the blog's existing deep-dive voice.

**Architecture:** A single Astro content-collection Markdown file in `src/content/tea/`, plus static SVG diagram assets and one rasterized hero PNG under `public/tea/posts/<slug>/`. The tea index and post route are generated automatically from the collection — no page wiring needed. Prose is drafted section-by-section against a fixed evidence base; diagrams are authored as standalone SVGs and embedded via `figure.figure-center`.

**Tech Stack:** Astro 5.15 content collections (`glob` loader + Zod schema), Markdown with embedded HTML, hand-authored SVG, `sharp` (already a dependency) for hero rasterization. Verification via `npm run build`.

**Source-of-truth documents (read before every task):**
- Spec: `docs/superpowers/specs/2026-06-23-water-for-tea-design.md`
- Research notes (all facts, numbers, citations): `docs/superpowers/specs/2026-06-23-water-for-tea-research-notes.md`
- Voice reference (the bar to match): `src/content/tea/clay-within-clay-jiani-and-nenni.md`

**Note on "tests" for a writing project:** prose tasks cannot be unit-tested. The per-task verification gate is: (1) `npm run build` succeeds, and (2) the task's **content checklist** (mandatory facts, numbers, citations, verdicts, word target, figure embed) is satisfied. The writer composes the actual prose in the blog's voice during execution — the plan fixes *what must be true*, not the exact sentences. SVG/hero tasks have concrete commands and full markup.

## Global Constraints

Copied verbatim from the spec; every task implicitly includes these.

- **Slug / paths:** post = `src/content/tea/the-other-99-water-for-tea.md`; assets = `public/tea/posts/the-other-99-water-for-tea/`; in-body asset URLs = `/tea/posts/the-other-99-water-for-tea/<name>`.
- **Length:** comprehensive, ~3,500–5,000 words total.
- **Voice:** erudite, opinionated, myth-correcting, honest about uncertainty — match `clay-within-clay-jiani-and-nenni.md`. `### ` (H3) section headers; **bold** key terms on first use; em-dashes; inline citations in prose (journal + author/year); Chinese terms with characters + pinyin + gloss.
- **Figures:** `<figure class="figure-center"> <img … loading="lazy" decoding="async" /> <figcaption>…</figcaption> </figure>`. Reuse existing global CSS classes (`info-box`, `figure-center`). New CSS only if a table needs it — scoped to `src/styles/blog-post.css`, never global restyle.
- **Thesis (carry throughout):** water is >99% of the cup; there is no single "best" water, only the right match; **alkalinity (bicarbonate) is the master variable.**
- **Tea focus:** anchored in puerh/oolong/gongfu, with a bridge to green/white/black.
- **Practical section:** evergreen and region-proof — targets + ≥1 fully specified repeatable DIY recipe + label-reading. **No brand-by-brand shootout, no gear list.**
- **BINDING honesty flags (must appear/honored in the prose):**
  1. Magnesium's "brightness" is coffee-derived, **not** established for tea — present as hypothesis.
  2. Puerh/oolong/yancha matching is experienced **preference**, not controlled science — surface the debates.
  3. Abstract/secondary figures (Murugesh ~84–93%, *Foods* 2025 ~22/40 mg/L, Spiro Ea 34 kJ/mol) — phrase as "reported," no false precision.
  4. The Lu Yu / Carpenter quotation must be **verified against the print 1974 edition** before publishing verbatim; if unverifiable, paraphrase and say so.
  5. Keep ">99% water" defensible (a brewed cup's solids are a fraction of a percent).
  6. Tea TDS/hardness targets are hobbyist/industry consensus, not peer-reviewed — label as such.
- **Frontmatter schema (`tea` collection, `src/content.config.ts`):** `title` (string), `description` (string), `pubDate` (date), optional `updatedDate`, `category` (string or string[]), optional `heroImage` (image()), optional `heroImageMaxHeight` (positive number).
- **Diagram asset filenames (the interface between drafting and diagram tasks — use these exact names):**
  - `anatomy-of-water.svg` (Diagram 1, §2)
  - `ion-taste-map.svg` (Diagram 2, §3)
  - `water-landscape.svg` (Diagram 3, §8 — centerpiece)
  - `build-your-water.svg` (Diagram 4, §7)
  - `tea-scum-reaction.svg` (Diagram 5, §4 — optional)
  - `hero-water-landscape.svg` (hero source) → `hero-water-landscape.png` (referenced by frontmatter)
- **Shared diagram style tokens (use consistently across all SVGs):** ink `#2b2b2b`; water-blue accent `#3a7ca5`; villain-red `#c0492b`; soft-green `#5b8c5a`; muted-gray `#8a8a8a`; paper `#faf8f4`; font `font-family="Georgia, 'Times New Roman', serif"` for titles, sans (`-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`) for data labels; thin (1–1.5px) strokes; rounded corners (`rx="6"`).

---

### Task 1: Scaffold — asset dir, frontmatter, info-box, section skeleton

**Files:**
- Create: `src/content/tea/the-other-99-water-for-tea.md`
- Create (dir): `public/tea/posts/the-other-99-water-for-tea/`

**Interfaces:**
- Produces: the post file with valid frontmatter and all ten `### ` section headers; the asset directory. Later drafting tasks fill sections; diagram tasks drop SVGs into the asset dir.

- [ ] **Step 1: Create the asset directory**

```bash
mkdir -p public/tea/posts/the-other-99-water-for-tea
```

- [ ] **Step 2: Create the post with frontmatter, info-box, and section skeleton**

Write `src/content/tea/the-other-99-water-for-tea.md` with exactly this scaffold (sections empty for now except the info-box):

```markdown
---
title: "The Other 99%: Water, and the Tea You're Not Tasting"
pubDate: "2026-06-23"
category:
  - "Tea"
  - "Tea Science"
  - "Brewing"
  - "Water"
description: "A brewed cup is more than 99% water, yet it's the one ingredient nobody tunes. A deep, sourced look at the chemistry — and why there's no single 'best' water, only the right match."
heroImage: "../../../public/tea/posts/the-other-99-water-for-tea/hero-water-landscape.png"
---

<div class="info-box">
This piece synthesises peer-reviewed food chemistry alongside the lived experience of the tea community, and tries hard to keep the two apart. Where a claim rests on controlled studies I say so; where it rests on the taste of experienced drinkers — most of the puerh-and-oolong matching below — I say that too. Quantitative figures (TDS, hardness, alkalinity, mg/L) are typical ranges repeated across the literature and the trade, not constants; treat them as orders of magnitude. The diagrams are my own. One caveat up front: magnesium's reputation as a flavour-brightener is borrowed from coffee science and is not established for tea — I flag it where it appears.
</div>

### The ingredient nobody weighs

### The four numbers that matter

### How each ion changes the cup

### The scum on your tea

### What the science actually says about "best"

### The romance of water: Lu Yu, interrogated

### Build your water

### Matching water to your tea

### There is no perfect water, only deliberate water

### Sources & further reading
```

- [ ] **Step 3: Verify the build accepts the frontmatter**

Run: `npm run build`
Expected: build completes with **no schema error** for `the-other-99-water-for-tea`. (A warning about the missing hero PNG is expected at this stage and is resolved in Task 14; if the build *fails* because the hero file is absent, temporarily comment out the `heroImage:` line, confirm the rest builds, then restore it — do not leave it commented.)

- [ ] **Step 4: Verify the post route is generated**

Run: `ls dist/tea/the-other-99-water-for-tea/index.html`
Expected: file exists (confirms the collection picked up the post and the tea route generated it).

- [ ] **Step 5: Commit**

```bash
git add src/content/tea/the-other-99-water-for-tea.md
git commit -m "feat(tea): scaffold water-for-tea post (frontmatter + section skeleton)"
```

---

### Task 2: Draft §1–2 — the hook and the chemistry primer

**Files:**
- Modify: `src/content/tea/the-other-99-water-for-tea.md` (sections "The ingredient nobody weighs", "The four numbers that matter")

**Interfaces:**
- Consumes: research notes §1 (chemistry fundamentals).
- Produces: §2 ends with the figure embed for `anatomy-of-water.svg` (Diagram 1, authored in Task 9).

**Content checklist (all mandatory):**
- **§1 "The ingredient nobody weighs" (~400–550 words):** open on the irony — you weigh leaf to 0.1 g, choose the pot, control temperature and time, then brew in whatever's in the tap. State that a brewed cup is **>99% water by mass** (dissolved solids are a fraction of a percent — honesty flag #5). Frame water as chemically **reactive** with the compounds you're trying to taste, not a neutral medium. End by planting the thesis explicitly: **no single best water, only the right match; most received wisdom is wrong; the master variable is alkalinity.**
- **§2 "The four numbers that matter" (~650–800 words):** define, each on first use in **bold**, the four **independent** properties:
  - **TDS** (total dissolved solids, mg/L = ppm); the meter caveat — a "TDS meter" reads **conductivity × a 0.5–0.8 factor**, so it can't tell you *which* ions and the factor alone swings the number ~20–40% (Hanna Instruments).
  - **Hardness / GH** (Ca²⁺ + Mg²⁺, as mg/L CaCO₃; USGS soft <60 / hard >180).
  - **Alkalinity / KH** (bicarbonate HCO₃⁻; the **buffering capacity**).
  - **pH**, and the key reframe: **alkalinity, not pH, is the master variable** — two waters at pH 7 behave oppositely if one is distilled and one alkaline.
  - **Temporary vs permanent hardness** (carbonate vs sulfate/chloride) — flag this sets up "boiling" later: Ca(HCO₃)₂ → CaCO₃↓ + CO₂↑ + H₂O.
- Cite USGS, Hanna Instruments, Hach in-prose, house style.
- End §2 with this figure embed (the SVG arrives in Task 9):

```html
<figure class="figure-center">
  <img src="/tea/posts/the-other-99-water-for-tea/anatomy-of-water.svg" alt="Diagram separating the four independent properties of brewing water — TDS (total dissolved load), hardness/GH (calcium and magnesium), alkalinity/KH (bicarbonate buffering), and pH — showing that they vary independently" loading="lazy" decoding="async" />
  <figcaption>The four numbers are <em>independent</em>. A water can be high-TDS yet soft, or soft yet highly alkaline. The one that decides your cup is alkalinity.</figcaption>
</figure>
```

- [ ] **Step 1:** Re-read research notes §1 and the spec §3 (sections 1–2). Draft both sections into the file, honoring the checklist and voice.
- [ ] **Step 2: Build check** — Run: `npm run build`; Expected: PASS (no schema/compile error).
- [ ] **Step 3: Self-check** — confirm: ">99%" present and defensible; alkalinity named as master variable; four terms bold-defined; TDS-meter caveat present; figure embed present with exact `anatomy-of-water.svg` path.
- [ ] **Step 4: Word-count sanity** — Run: `wc -w src/content/tea/the-other-99-water-for-tea.md`; Expected: rising toward target (≈1,100–1,400 words so far including info-box).
- [ ] **Step 5: Commit**

```bash
git add src/content/tea/the-other-99-water-for-tea.md
git commit -m "feat(tea): draft hook and water-chemistry primer (water post §1–2)"
```

---

### Task 3: Draft §3–4 — ion-by-ion mechanism, and the scum

**Files:**
- Modify: `src/content/tea/the-other-99-water-for-tea.md` (sections "How each ion changes the cup", "The scum on your tea")

**Interfaces:**
- Consumes: research notes §2 (ion-by-ion) and the scum/cream material.
- Produces: §3 ends with the embed for `ion-taste-map.svg` (Task 10); §4 optionally embeds `tea-scum-reaction.svg` (Task 13).

**Content checklist (all mandatory):**
- **§3 "How each ion changes the cup" (~750–900 words):** walk the ions, each effect with mechanism:
  - **Calcium** — slows extraction (complexes leaf pectin, bridges polyphenols), adds body, drives scum/cream.
  - **Magnesium** — **honesty flag #1:** the "brighter/more extraction" story is **coffee-lore (Hendon et al., *J. Agric. Food Chem.* 2014), not established for tea**; a tea astringency assay ranks Mg²⁺ only moderate (Al³⁺ > K⁺ > Mg²⁺ > Ca²⁺). Present as hypothesis.
  - **Bicarbonate / alkalinity = the villain** — raises pH, which **autoxidises catechins (EGC/EGCG) into brown pigment** (degradation *after* extraction, the key mechanism), buffers away brightness, darkens liquor (thearubigin pH shift). This is the spine of the whole essay.
  - **Sodium / chloride** — low NaCl can suppress bitterness; softener sodium = flat.
  - **Sulfate** — dry/sharp above ~80–160 mg/L.
  - **Iron** — galloyl–Fe complex → inky/metallic; taste threshold **0.3 mg/L**.
  - **Chlorine vs chloramine** — free chlorine off-gasses / carbon; **chloramine persists, needs catalytic carbon**.
  - Cite *Molecules* 2021 (PMC8229914), *Nutrients* 2019 (PMC6356489), PMC11049597 in-prose.
- End §3 with:

```html
<figure class="figure-center">
  <img src="/tea/posts/the-other-99-water-for-tea/ion-taste-map.svg" alt="A map of each dissolved ion and what it does to tea: calcium (body, scum), magnesium (coffee-lore, unproven for tea), bicarbonate flagged as the villain (dull, dark, flat), sodium, sulfate, iron (inky, metallic) and chlorine (off-flavours)" loading="lazy" decoding="async" />
  <figcaption>Every ion pulls the cup somewhere. Bicarbonate pulls it nowhere good — and magnesium's halo is borrowed from coffee.</figcaption>
</figure>
```

- **§4 "The scum on your tea" (~450–600 words):** the iridescent film = **oxidised polyphenols on a CaCO₃ skin**, forming only when **both** Ca/Mg **and** bicarbonate are present (Spiro & Jaganyi, *Food Chemistry*, 1990s; chemically controlled, **reported** Ea ≈ 34 kJ/mol — honesty flag #3). Why **lemon** clears it: drops pH *and* chelates calcium. Distinguish **tea cream** (a caffeine–theaflavin/thearubigin colloid that forms as black tea *cools*; "creaming down" = a sign of briskness). Myth-bust: **scum is your water, not dirty tea.** Optionally embed `tea-scum-reaction.svg` here (figure block parallel to above; if Task 13 is skipped, omit the figure).

- [ ] **Step 1:** Re-read research notes §2. Draft §3 and §4 per checklist.
- [ ] **Step 2: Build check** — Run: `npm run build`; Expected: PASS.
- [ ] **Step 3: Self-check** — bicarbonate explicitly named "the villain" with the autoxidation mechanism; magnesium flagged as coffee-lore (flag #1); iron 0.3 mg/L; chloramine/catalytic-carbon point; scum = water-not-dirt myth-bust; ion-map figure embed present.
- [ ] **Step 4: Commit**

```bash
git add src/content/tea/the-other-99-water-for-tea.md
git commit -m "feat(tea): draft ion-by-ion mechanism and the scum (water post §3–4)"
```

---

### Task 4: Draft §5 — what the science actually says about "best"

**Files:**
- Modify: `src/content/tea/the-other-99-water-for-tea.md` (section "What the science actually says about \"best\"")

**Interfaces:**
- Consumes: research notes §3 (peer-reviewed optimal-water science) and §1 (SCA numbers).

**Content checklist (~700–850 words, all mandatory):**
- The hardness→catechin result: 21→338 ppm cut total green-tea catechins **~2.4×** (EGCG **3.2×**); high TDS reduced major catechins by a **reported ~84–93%** (Murugesh 2017 — phrase as reported, flag #3). Mechanism restated: alkaline-pH autoxidation, not poorer leaching.
- **The health-vs-taste paradox (the thesis's keystone):** deionised/bottled gave **~2× the EGCG** of hard tap, yet a 103-person panel **preferred the tap-brewed green tea** (less bitter), *p* < 0.001; **black tea barely moved** (*p* = 0.250) (Franks et al., *Nutrients* 2019). The healthiest brew is not the best-tasting one.
- **Both extremes are bad:** hard/high-alkalinity = dull, dark, scummy, catechin-destroying (well documented); very soft/zero-mineral = maximal extraction but thin/flat and dispreferred in panels. Distilled is **not** "purest = best."
- The bicarbonate thresholds by tea type (low ≤ ~22 mg/L good; high ≥ ~40 mg/L dulls; worse for green than black) — *Foods* 2025, **reported** (flag #3).
- **The SCA detour:** give the coffee numbers (TDS ~150, hardness 50–175, alkalinity ~40, pH ~7) and the correction — the SCA **alkalinity target is at/above the level shown to dull green tea**, so don't transfer it directly; the oft-quoted "50–150 ppm TDS for tea" is **practitioner consensus (Tea Association of the USA / Beeman), not a trial** (flag #6).
- Land the thesis: the science supports a *target region* (soft–moderate, low alkalinity, pH ~6.5–7, low calcium), **not a single best**.

- [ ] **Step 1:** Re-read research notes §3. Draft §5 per checklist.
- [ ] **Step 2: Build check** — Run: `npm run build`; Expected: PASS.
- [ ] **Step 3: Self-check** — the Cornell paradox present with numbers + *p*-values; "reported" hedging on §3-flagged figures; SCA-too-alkaline-for-green correction; "target region not single best" lands.
- [ ] **Step 4: Commit**

```bash
git add src/content/tea/the-other-99-water-for-tea.md
git commit -m "feat(tea): draft the peer-reviewed 'optimal water' core (water post §5)"
```

---

### Task 5: Draft §6 — the romance of water: Lu Yu, interrogated

**Files:**
- Modify: `src/content/tea/the-other-99-water-for-tea.md` (section "The romance of water: Lu Yu, interrogated")

**Interfaces:**
- Consumes: research notes §4 (lore & history).

**Content checklist (~650–800 words, all mandatory):**
- Lu Yu's *Classic of Tea* (茶經 / *Cha Jing*, c. 760, ch. 5): the hierarchy 山水上，江水中，井水下 — **mountain > river > well**; prefer slow "living" spring water; well water only if actively drawn.
- **The correction (myth-bust):** the famous **twenty-springs ranking is NOT Lu Yu** — it is **Zhang Youxin's *Jiancha Shuiji* (煎茶水記, 814)**, a decade after Lu Yu's death (804); the "identified Nanling water blind" anecdote is **legend** (flag it). Note competing rankings disagree (Zhongling #7 vs #1) — a sign they're literary, not empirical.
- **Qianlong** weighing water in a silver flask for "lightness" (right direction — lower TDS *is* lighter — implausible precision). Snow/rain "heavenly waters" = naturally soft (with a modern-pollution asterisk).
- **Verdict:** the ancients were **empirically right about the variable that matters** (soft, fresh, low-mineral) in a pre-chemical vocabulary of "lightness/sweetness"; the specific spring rankings are romance.
- **Honesty flag #4:** if quoting Carpenter (1974) verbatim, mark it as needing print verification; if not verified, **paraphrase** Lu Yu and state the translation is interpretive. Do not publish an unverified verbatim quote.

- [ ] **Step 1:** Re-read research notes §4. Draft §6 per checklist.
- [ ] **Step 2: Build check** — Run: `npm run build`; Expected: PASS.
- [ ] **Step 3: Self-check** — Zhang-Youxin misattribution correction present; Nanling flagged as legend; Carpenter quote either verified-or-paraphrased (flag #4); the "right variable, pre-chemical vocabulary" verdict lands.
- [ ] **Step 4: Commit**

```bash
git add src/content/tea/the-other-99-water-for-tea.md
git commit -m "feat(tea): draft the Lu Yu / water-lore section (water post §6)"
```

---

### Task 6: Draft §7 — build your water (practical payoff)

**Files:**
- Modify: `src/content/tea/the-other-99-water-for-tea.md` (section "Build your water")

**Interfaces:**
- Consumes: research notes §5 (practical methods).
- Produces: §7 ends with the embed for `build-your-water.svg` (Task 12); may include a Markdown table (targets and/or label-reading).

**Content checklist (~750–950 words, all mandatory):**
- **Hierarchy of intervention:** (1) **diagnose** your water (local report / read a bottle label); (2) **carbon filter** removes chlorine/chloramine/organics but **not minerals**; (3) what **boiling** does (precipitates temporary/carbonate hardness as limescale, off-gasses CO₂/free chlorine) and **doesn't** (permanent hardness, broad TDS, chloramine) — and that the "never re-boil / dead oxygen" rule is **mostly myth** (McGill OSS); (4) the **reset button: RO/distilled** = a blank canvas (flat alone); (5) **why sodium softeners are bad** (swap Ca/Mg→Na, keep alkalinity, add salt).
- **A targets table** (label as: coffee numbers solid, tea numbers hobbyist — flag #6):

```markdown
| Parameter | SCA (coffee) | Tea (hobbyist consensus) |
| --- | --- | --- |
| TDS | ~150 ppm (75–250) | 50–150 ppm; ~20–50 for delicate/green |
| Hardness (GH) | 50–175 mg/L CaCO₃ | ~17–68 mg/L; <10 thin, >120 flat |
| Alkalinity (KH) | ~40 mg/L (≤40 preferred) | low — high KH flattens tea |
| pH | ~7 (6.5–7.5) | ~7 (green a touch lower, black higher) |
```

- **≥1 fully specified, repeatable DIY recipe (mandatory).** Include both, weighed by mass (0.01 g scale):
  - **Recipe A (SCA-style):** per **1 gallon (3.78 L) distilled/RO add 0.75 g Epsom salt (MgSO₄·7H₂O) + 0.25 g baking soda (NaHCO₃)** → lands ~SCA range. (Precise concentrate version: 2.5 g Epsom/L and 1.7 g baking soda/L stock; final = 877 g distilled + 41 g hardness stock + 82 g buffer stock → ~82 ppm hardness / ~41 ppm alkalinity.)
  - **Recipe B (no-scale buffer, "RPavlis"):** **0.1 g potassium bicarbonate (KHCO₃) per 1 L** distilled — alkalinity-only, **forms no limescale**, potassium over sodium. For delicate tea, halve coffee-tuned doses.
- **How to read a bottled-water label:** "**dry residue at 180 °C**" = TDS proxy (aim ~50–150); **hardness ≈ Ca×2.5 + Mg×4.1**; **alkalinity ≈ HCO₃×0.82**; want **low bicarbonate**, low sodium. Good vs bad in one line each. (No brand shootout — principle only.)
- End §7 with:

```html
<figure class="figure-center">
  <img src="/tea/posts/the-other-99-water-for-tea/build-your-water.svg" alt="A build-your-water recipe card: start from RO or distilled water as a blank canvas, then add Epsom salt and baking soda (SCA-style) or potassium bicarbonate (no-scale), with the resulting hardness and alkalinity numbers" loading="lazy" decoding="async" />
  <figcaption>From a blank canvas you can build any water you want — and repeat it exactly, which no bottled spring lets you do.</figcaption>
</figure>
```

- [ ] **Step 1:** Re-read research notes §5. Draft §7 per checklist, including the table and both recipes.
- [ ] **Step 2: Build check** — Run: `npm run build`; Expected: PASS (confirms the Markdown table renders without breaking MDX).
- [ ] **Step 3: Visual table check** — Run: `npm run dev` (Ctrl-C after), open `http://localhost:4321/tea/the-other-99-water-for-tea/`, confirm the table is legible. If it renders unstyled/cramped, add minimal scoped table CSS to `src/styles/blog-post.css` (e.g. `.prose table td, .prose table th { border:1px solid rgb(var(--gray-light)); padding:.4em .6em; } .prose table th { text-align:left; }`) — do not touch global table rules.
- [ ] **Step 4: Self-check** — both recipes fully specified with quantities + resulting numbers; label math present; targets table labelled coffee-vs-tea-consensus (flag #6); no brand recommendations; build-your-water figure embed present.
- [ ] **Step 5: Commit**

```bash
git add src/content/tea/the-other-99-water-for-tea.md src/styles/blog-post.css
git commit -m "feat(tea): draft the practical build-your-water section (water post §7)"
```

---

### Task 7: Draft §8 — matching water to your tea (gongfu payoff)

**Files:**
- Modify: `src/content/tea/the-other-99-water-for-tea.md` (section "Matching water to your tea")

**Interfaces:**
- Consumes: research notes §6 (matching).
- Produces: §8 ends with the embed for `water-landscape.svg` (Task 11, the centerpiece).

**Content checklist (~800–950 words, all mandatory):**
- **Framing first:** the real axes are **alkalinity** (keep low for anything aroma-forward) and **whether minerals are balanced** — not "soft vs hard" as monoliths.
- **Correct the central myth:** "soft water tames bitterness" is the **wrong mechanism** — *pure* water **over-extracts** bitter catechins; minerals **reduce** their extraction. Soft water's real effect is brighter aroma + thinner body.
- Per tea (each tagged with its confidence — **honesty flag #2: these are experienced preference, not controlled science**):
  - **Young sheng puerh** — contested, legitimate split: bright/aromatic (soft, low-alkalinity) vs thick/round (some minerality). State both fairly.
  - **Aged sheng / shou** — consensus: some bicarbonate + **silica** for body, "bready" tertiary notes; not aroma-led.
  - **Yancha / roasted oolong** — strong consensus *preference* for mineral water and *yan yun*; **mechanism unproven** — believe the preference, doubt the mechanism.
  - **Dancong** — soft/clean/low-alkalinity to protect high aromatics.
  - **Bridge — green/white:** low-alkalinity, **balanced not zero** minerals; **temperature is the bigger lever** (favours theanine sweetness over catechin bitterness). **Black:** least water-sensitive; hard water darkens/dulls/scums (theaflavins degrade under alkali); Yorkshire Tea ships separate hard/soft blends.
  - **Gongfu context:** high leaf:water ratio + short steeps → **avoid pure water** (over-extracts → thin/sour); some balanced minerals help mouthfeel; low alkalinity throughout.
- Cite *Nutrients* 2019, *Molecules* 2021, MarshalN, Yorkshire Tea in-prose (mark community sources as such).
- End §8 with:

```html
<figure class="figure-center">
  <img src="/tea/posts/the-other-99-water-for-tea/water-landscape.svg" alt="The water landscape: a map with hardness/TDS on one axis and alkalinity on the other, showing a 'target region' of soft-to-moderate, low-alkalinity water, with tea types placed — green and dancong toward soft and clean, aged puerh and yancha toward more minerality — and the failure zones (flat, dull, thin, scummy) at the edges" loading="lazy" decoding="async" />
  <figcaption>There is no point on this map marked "best" — only a region that works, and where on it each tea prefers to sit.</figcaption>
</figure>
```

- [ ] **Step 1:** Re-read research notes §6. Draft §8 per checklist.
- [ ] **Step 2: Build check** — Run: `npm run build`; Expected: PASS.
- [ ] **Step 3: Self-check** — "soft tames bitterness" myth corrected; every per-tea claim tagged preference/contested where due (flag #2); yancha mechanism flagged unproven; green/white temperature-is-bigger-lever; landscape figure embed present.
- [ ] **Step 4: Commit**

```bash
git add src/content/tea/the-other-99-water-for-tea.md
git commit -m "feat(tea): draft the tea-to-water matching section (water post §8)"
```

---

### Task 8: Draft §9–10 — coda and sources

**Files:**
- Modify: `src/content/tea/the-other-99-water-for-tea.md` (sections "There is no perfect water…", "Sources & further reading")

**Interfaces:**
- Consumes: the source list in research notes (all six §) and the spec §6.

**Content checklist (all mandatory):**
- **§9 Coda (~200–300 words):** tie back to the thesis — not a legendary spring or a magic number, but knowing your water, controlling the one variable that matters most (alkalinity), and matching deliberately. Closing image: the ancients chased named springs; you have reverse osmosis and a 0.01 g scale. Short, resonant.
- **§10 Sources & further reading:** a curated list, grouped **Peer-reviewed**, **Classical texts**, **Community & practitioner** (mark the last group as preference-grade). Include at minimum: *Molecules* 2021 (PMC8229914); *Nutrients* 2019 (PMC6356489); Spiro & Jaganyi, *Food Chemistry* (tea scum); Hendon, Colonna-Dashwood & Colonna-Dashwood, *J. Agric. Food Chem.* 2014 (coffee cations); *Foods* 2025 (bicarbonate); Lu Yu, *The Classic of Tea* (trans. Carpenter 1974); Zhang Youxin, *Jiancha Shuiji* (814); SCA water standard; MarshalN, *A Tea Addict's Journal*; Yorkshire Tea. Use real URLs from the research notes where present; format as Markdown links.

- [ ] **Step 1:** Draft §9 and §10 per checklist.
- [ ] **Step 2: Build check** — Run: `npm run build`; Expected: PASS.
- [ ] **Step 3: Word-count gate** — Run: `wc -w src/content/tea/the-other-99-water-for-tea.md`; Expected: **≥ 3,500** words. If short, expand the thinnest sections (note which) before committing.
- [ ] **Step 4: Commit**

```bash
git add src/content/tea/the-other-99-water-for-tea.md
git commit -m "feat(tea): draft coda and sources (water post §9–10)"
```

---

### Task 9: Author Diagram 1 — `anatomy-of-water.svg`

**Files:**
- Create: `public/tea/posts/the-other-99-water-for-tea/anatomy-of-water.svg`

**Interfaces:**
- Consumes: the figure embed added in Task 2 (path must match exactly).

**Spec:** four labelled "gauge" cards in a row (or 2×2), each a rounded rect using the style tokens, showing the property name, its symbol/unit, and a one-line "what it governs". Card 3 (Alkalinity/KH) is visually emphasised (water-blue fill / bold) as the master variable. Title across the top: "What's actually in your water". Use this complete starter SVG and refine spacing as needed:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 360" role="img" aria-label="The four independent properties of brewing water">
  <rect width="820" height="360" fill="#faf8f4"/>
  <text x="410" y="40" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="24" fill="#2b2b2b">What's actually in your water</text>
  <text x="410" y="66" text-anchor="middle" font-family="-apple-system, 'Segoe UI', sans-serif" font-size="13" fill="#8a8a8a">four independent numbers — they do not move together</text>
  <!-- Card: TDS -->
  <g font-family="-apple-system, 'Segoe UI', sans-serif">
    <rect x="30" y="95" width="180" height="220" rx="6" fill="#ffffff" stroke="#8a8a8a" stroke-width="1"/>
    <text x="120" y="130" text-anchor="middle" font-size="18" fill="#2b2b2b" font-weight="bold">TDS</text>
    <text x="120" y="152" text-anchor="middle" font-size="12" fill="#8a8a8a">total dissolved solids</text>
    <text x="120" y="178" text-anchor="middle" font-size="13" fill="#3a7ca5">mg/L (ppm)</text>
    <text x="120" y="225" text-anchor="middle" font-size="12" fill="#2b2b2b">how much is</text>
    <text x="120" y="242" text-anchor="middle" font-size="12" fill="#2b2b2b">dissolved in total</text>
    <text x="120" y="290" text-anchor="middle" font-size="11" fill="#8a8a8a">(a conductivity proxy,</text>
    <text x="120" y="305" text-anchor="middle" font-size="11" fill="#8a8a8a">not a composition)</text>
  </g>
  <!-- Card: Hardness GH -->
  <g font-family="-apple-system, 'Segoe UI', sans-serif">
    <rect x="220" y="95" width="180" height="220" rx="6" fill="#ffffff" stroke="#8a8a8a" stroke-width="1"/>
    <text x="310" y="130" text-anchor="middle" font-size="18" fill="#2b2b2b" font-weight="bold">Hardness · GH</text>
    <text x="310" y="152" text-anchor="middle" font-size="12" fill="#8a8a8a">Ca²⁺ + Mg²⁺</text>
    <text x="310" y="178" text-anchor="middle" font-size="13" fill="#3a7ca5">mg/L as CaCO₃</text>
    <text x="310" y="225" text-anchor="middle" font-size="12" fill="#2b2b2b">body, extraction,</text>
    <text x="310" y="242" text-anchor="middle" font-size="12" fill="#2b2b2b">scum &amp; cream</text>
  </g>
  <!-- Card: Alkalinity KH (emphasised) -->
  <g font-family="-apple-system, 'Segoe UI', sans-serif">
    <rect x="410" y="85" width="180" height="240" rx="6" fill="#e7f0f5" stroke="#3a7ca5" stroke-width="2"/>
    <text x="500" y="124" text-anchor="middle" font-size="18" fill="#1f4e63" font-weight="bold">Alkalinity · KH</text>
    <text x="500" y="146" text-anchor="middle" font-size="12" fill="#3a7ca5">bicarbonate HCO₃⁻</text>
    <text x="500" y="172" text-anchor="middle" font-size="13" fill="#1f4e63">buffering capacity</text>
    <text x="500" y="220" text-anchor="middle" font-size="12" fill="#2b2b2b">the master variable —</text>
    <text x="500" y="237" text-anchor="middle" font-size="12" fill="#2b2b2b">dulls, darkens, flattens</text>
    <text x="500" y="300" text-anchor="middle" font-size="11" fill="#c0492b">this is the one that</text>
    <text x="500" y="315" text-anchor="middle" font-size="11" fill="#c0492b">decides your cup</text>
  </g>
  <!-- Card: pH -->
  <g font-family="-apple-system, 'Segoe UI', sans-serif">
    <rect x="600" y="95" width="190" height="220" rx="6" fill="#ffffff" stroke="#8a8a8a" stroke-width="1"/>
    <text x="695" y="130" text-anchor="middle" font-size="18" fill="#2b2b2b" font-weight="bold">pH</text>
    <text x="695" y="152" text-anchor="middle" font-size="12" fill="#8a8a8a">acidity / alkalinity now</text>
    <text x="695" y="178" text-anchor="middle" font-size="13" fill="#3a7ca5">0–14</text>
    <text x="695" y="225" text-anchor="middle" font-size="12" fill="#2b2b2b">a weak descriptor:</text>
    <text x="695" y="242" text-anchor="middle" font-size="12" fill="#2b2b2b">two pH-7 waters can</text>
    <text x="695" y="259" text-anchor="middle" font-size="12" fill="#2b2b2b">behave oppositely</text>
  </g>
</svg>
```

- [ ] **Step 1:** Create the file with the SVG above (adjust label spacing if any text overflows its card).
- [ ] **Step 2: Validate the SVG parses** — Run:

```bash
node -e "require('sharp')('public/tea/posts/the-other-99-water-for-tea/anatomy-of-water.svg').metadata().then(m=>console.log('ok',m.format,m.width+'x'+m.height)).catch(e=>{console.error(e.message);process.exit(1)})"
```

Expected: `ok svg 820x360`.

- [ ] **Step 3: Confirm the embed path matches** — Run: `grep -c "anatomy-of-water.svg" src/content/tea/the-other-99-water-for-tea.md`; Expected: `1`.
- [ ] **Step 4: Build** — Run: `npm run build`; Expected: PASS (asset copied to `dist/`).
- [ ] **Step 5: Commit**

```bash
git add public/tea/posts/the-other-99-water-for-tea/anatomy-of-water.svg
git commit -m "feat(tea): add anatomy-of-water diagram (water post Diagram 1)"
```

---

### Task 10: Author Diagram 2 — `ion-taste-map.svg`

**Files:**
- Create: `public/tea/posts/the-other-99-water-for-tea/ion-taste-map.svg`

**Spec:** a vertical list of ion rows; each row = ion symbol/name (left), an arrow, and its effect (right). Colour-code the verdict: bicarbonate row in villain-red, magnesium row gray with a "(coffee-lore — unproven for tea)" tag, the rest in ink/blue. Title: "What each ion does to the cup". Rows: **Ca²⁺** → body, slows extraction, scum; **Mg²⁺** → *coffee-lore: brightness — unproven for tea*; **HCO₃⁻ (bicarbonate)** → **the villain: dull, dark, flat**; **Na⁺** → low = less bitter; softener Na = flat; **SO₄²⁻** → dry, sharp; **Fe** → inky, metallic (≥0.3 mg/L); **Cl/chloramine** → off-flavours (chloramine needs catalytic carbon). Author it from this structure (one `<g>` per row, ~38px row height, starting y≈90), reusing the style tokens; emphasise the bicarbonate row with a light red fill `#f6e3df` and red text `#c0492b`. Provide complete `<text>`/`<rect>`/`<line>` markup for all seven rows.

- [ ] **Step 1:** Create the file (complete SVG, seven rows, bicarbonate row emphasised, magnesium tagged coffee-lore).
- [ ] **Step 2: Validate** — Run:

```bash
node -e "require('sharp')('public/tea/posts/the-other-99-water-for-tea/ion-taste-map.svg').metadata().then(m=>console.log('ok',m.format)).catch(e=>{console.error(e.message);process.exit(1)})"
```

Expected: `ok svg`.

- [ ] **Step 3: Embed path** — Run: `grep -c "ion-taste-map.svg" src/content/tea/the-other-99-water-for-tea.md`; Expected: `1`.
- [ ] **Step 4: Build** — Run: `npm run build`; Expected: PASS.
- [ ] **Step 5: Commit**

```bash
git add public/tea/posts/the-other-99-water-for-tea/ion-taste-map.svg
git commit -m "feat(tea): add ion-to-taste map diagram (water post Diagram 2)"
```

---

### Task 11: Author Diagram 3 — `water-landscape.svg` (centerpiece)

**Files:**
- Create: `public/tea/posts/the-other-99-water-for-tea/water-landscape.svg`

**Spec (the most important visual):** a 2-D plot. **X-axis = hardness / TDS** (soft → mineral-rich); **Y-axis = alkalinity** (low → high). Draw axes with arrows and labels. Shade a **"target region"** band: low alkalinity, low-to-moderate hardness (use a soft-green translucent fill `#5b8c5a` at ~0.15 opacity). Label the failure corners: top (high alkalinity) = "dull · dark · flat · scummy" (red); far-left bottom (near-zero) = "thin · flat"; far-right bottom = "heavy · over-bodied". Place tea labels as small dots+text **inside/near the target region**, positioned per the matching section: **green / dancong / white** toward low-hardness + low-alkalinity (lower-left of the target band); **young sheng** centre; **aged puerh / shou / yancha** toward the higher-hardness, still-low-alkalinity (right of the band). Title: "The water landscape — there is no point marked 'best'". Caption-style subtext under the title: "keep alkalinity low; choose where on the hardness axis your tea likes to sit". Build it at `viewBox="0 0 820 520"` with the style tokens. Provide complete markup: background, axes (`<line>` + arrowhead `<polygon>`), axis titles, the target-region `<rect>`/`<path>`, three corner labels, and ~6 tea markers (`<circle r="4">` + `<text>`).

- [ ] **Step 1:** Create the file (complete SVG per spec; ensure tea labels don't overlap — nudge positions).
- [ ] **Step 2: Validate** — Run:

```bash
node -e "require('sharp')('public/tea/posts/the-other-99-water-for-tea/water-landscape.svg').metadata().then(m=>console.log('ok',m.format,m.width+'x'+m.height)).catch(e=>{console.error(e.message);process.exit(1)})"
```

Expected: `ok svg 820x520`.

- [ ] **Step 3: Embed path** — Run: `grep -c "water-landscape.svg" src/content/tea/the-other-99-water-for-tea.md`; Expected: `1` (the §8 figure; the hero PNG in Task 14 is a separate file).
- [ ] **Step 4: Build** — Run: `npm run build`; Expected: PASS.
- [ ] **Step 5: Visual check** — Run `npm run dev`, open the post, confirm the landscape reads clearly at desktop and ~375px mobile width; fix overlaps if any. Ctrl-C.
- [ ] **Step 6: Commit**

```bash
git add public/tea/posts/the-other-99-water-for-tea/water-landscape.svg
git commit -m "feat(tea): add the water-landscape centerpiece diagram (water post Diagram 3)"
```

---

### Task 12: Author Diagram 4 — `build-your-water.svg`

**Files:**
- Create: `public/tea/posts/the-other-99-water-for-tea/build-your-water.svg`

**Spec:** a "recipe card" flow. Left: a beaker labelled **"RO / distilled — blank canvas (~0 ppm)"**. An arrow **"+ minerals"** to two stacked recipe boxes on the right:
- **Box A — "SCA-style" :** "per 1 gal: 0.75 g Epsom salt (MgSO₄) + 0.25 g baking soda (NaHCO₃)" → result chip "~150 ppm TDS · ~40 alkalinity".
- **Box B — "No-scale" :** "0.1 g potassium bicarbonate (KHCO₃) per 1 L" → result chip "buffer only · no limescale".
Footer line: "weigh by mass · halve doses for delicate tea". Title: "Build your water from a blank canvas". `viewBox="0 0 820 420"`, style tokens, beaker as simple `<path>`, arrows as `<line>`+`<polygon>`. Provide complete markup.

- [ ] **Step 1:** Create the file (complete SVG per spec; numbers must exactly match §7's recipes).
- [ ] **Step 2: Validate** — Run:

```bash
node -e "require('sharp')('public/tea/posts/the-other-99-water-for-tea/build-your-water.svg').metadata().then(m=>console.log('ok',m.format)).catch(e=>{console.error(e.message);process.exit(1)})"
```

Expected: `ok svg`.

- [ ] **Step 3: Cross-check numbers** — confirm the grams in the SVG match §7 exactly (0.75 g Epsom / 0.25 g baking soda / 0.1 g KHCO₃). Run: `grep -n "0.75 g\|0.25 g\|0.1 g" src/content/tea/the-other-99-water-for-tea.md`; Expected: those quantities present in the prose.
- [ ] **Step 4: Embed path** — Run: `grep -c "build-your-water.svg" src/content/tea/the-other-99-water-for-tea.md`; Expected: `1`.
- [ ] **Step 5: Build** — Run: `npm run build`; Expected: PASS.
- [ ] **Step 6: Commit**

```bash
git add public/tea/posts/the-other-99-water-for-tea/build-your-water.svg
git commit -m "feat(tea): add build-your-water recipe diagram (water post Diagram 4)"
```

---

### Task 13 (OPTIONAL): Author Diagram 5 — `tea-scum-reaction.svg`

**Files:**
- Create: `public/tea/posts/the-other-99-water-for-tea/tea-scum-reaction.svg`
- Modify: `src/content/tea/the-other-99-water-for-tea.md` (add the figure embed in §4 if not already present)

**Spec:** a small reaction diagram: **Ca²⁺ + 2 HCO₃⁻ ⇌ CaCO₃ + CO₂ + H₂O**, with "+ oxidised polyphenols → iridescent film" beneath, and a side note "lemon → drops pH + chelates Ca²⁺ → no film". `viewBox="0 0 820 260"`, style tokens. Only do this task if Tasks 1–12 are complete and there's appetite for a fifth diagram; otherwise skip (the post stands without it).

- [ ] **Step 1:** Create the SVG and add/confirm the §4 figure embed (mirror the figure block pattern; alt text describing the scum reaction).
- [ ] **Step 2: Validate** — Run:

```bash
node -e "require('sharp')('public/tea/posts/the-other-99-water-for-tea/tea-scum-reaction.svg').metadata().then(m=>console.log('ok',m.format)).catch(e=>{console.error(e.message);process.exit(1)})"
```

Expected: `ok svg`.

- [ ] **Step 3: Build** — Run: `npm run build`; Expected: PASS.
- [ ] **Step 4: Commit**

```bash
git add public/tea/posts/the-other-99-water-for-tea/tea-scum-reaction.svg src/content/tea/the-other-99-water-for-tea.md
git commit -m "feat(tea): add tea-scum reaction diagram (water post Diagram 5)"
```

---

### Task 14: Author the hero — SVG source + rasterized PNG

**Files:**
- Create: `public/tea/posts/the-other-99-water-for-tea/hero-water-landscape.svg`
- Create: `public/tea/posts/the-other-99-water-for-tea/hero-water-landscape.png`

**Interfaces:**
- Consumes: the `heroImage` path set in Task 1's frontmatter (`…/hero-water-landscape.png`).
- **Why PNG:** the layout renders the hero through Astro's `<Image>` component (`src/layouts/BlogPost.astro:162`, `width={1020} height={510}`), which runs sharp — SVG through that pipeline is unreliable, so the hero must be a raster like every existing hero. We author an SVG for crispness, then rasterize.

**Spec for `hero-water-landscape.svg`:** a clean 2:1 conceptual banner (`viewBox="0 0 1020 510"`): a stylised teacup or water drop whose fill is labelled, subtly, "the other 99%", over a faint version of the water-landscape grid; title text "The Other 99%". Restful, uses style tokens, legible at small sizes. (Keep it simpler than the in-body diagrams — it's decorative.)

- [ ] **Step 1:** Create `hero-water-landscape.svg` per spec (viewBox 1020×510).
- [ ] **Step 2: Validate the SVG** — Run:

```bash
node -e "require('sharp')('public/tea/posts/the-other-99-water-for-tea/hero-water-landscape.svg').metadata().then(m=>console.log('ok',m.format)).catch(e=>{console.error(e.message);process.exit(1)})"
```

Expected: `ok svg`.

- [ ] **Step 3: Rasterize to PNG at 2× (2040×1020) on a white background** — Run:

```bash
node -e "require('sharp')('public/tea/posts/the-other-99-water-for-tea/hero-water-landscape.svg').resize(2040,1020,{fit:'contain',background:'#faf8f4'}).png().toFile('public/tea/posts/the-other-99-water-for-tea/hero-water-landscape.png').then(i=>console.log('wrote',i.width+'x'+i.height)).catch(e=>{console.error(e.message);process.exit(1)})"
```

Expected: `wrote 2040x1020`.

- [ ] **Step 4: Build (exercises the hero image pipeline)** — Run: `npm run build`; Expected: PASS with **no image/hero error** and no "missing heroImage" warning.
- [ ] **Step 5: Visual check** — Run `npm run dev`, open the post and the tea index (`/tea/`), confirm the hero renders in both the article header and the post-list card. Ctrl-C.
- [ ] **Step 6: Commit**

```bash
git add public/tea/posts/the-other-99-water-for-tea/hero-water-landscape.svg public/tea/posts/the-other-99-water-for-tea/hero-water-landscape.png
git commit -m "feat(tea): add hero image (svg source + rasterized png) for water post"
```

---

### Task 15: Final QA pass — acceptance criteria, voice, build

**Files:**
- Modify (as needed): `src/content/tea/the-other-99-water-for-tea.md`

**Run the spec's acceptance checklist. Fix inline, then commit any edits.**

- [ ] **Step 1: Word count** — Run: `wc -w src/content/tea/the-other-99-water-for-tea.md`; Expected: **3,500–5,000**. Trim or expand to land in range.
- [ ] **Step 2: Honesty-flag audit** — confirm in the prose: magnesium tagged coffee-lore (flag #1); puerh/oolong matching tagged preference/contested (#2); "reported" hedging on Murugesh/Foods/Spiro figures (#3); Lu Yu quote verified-or-paraphrased (#4); ">99%" defensible (#5); tea targets labelled hobbyist (#6). Grep aids:

```bash
grep -niE "coffee|preference|reported|>?99%|hobbyist|consensus" src/content/tea/the-other-99-water-for-tea.md | head -40
```

- [ ] **Step 3: Citations present** — confirm in-prose citations exist for the core peer-reviewed claims. Run: `grep -niE "Molecules|Nutrients|Food Chemistry|Spiro|Hendon|Foods|Lu Yu|Zhang Youxin" src/content/tea/the-other-99-water-for-tea.md | head`; Expected: multiple hits, plus a populated "Sources & further reading" section.
- [ ] **Step 4: Figures wired** — Run:

```bash
for f in anatomy-of-water ion-taste-map water-landscape build-your-water; do echo -n "$f: "; grep -c "$f.svg" src/content/tea/the-other-99-water-for-tea.md; done
ls public/tea/posts/the-other-99-water-for-tea/
```

Expected: each diagram referenced ≥1 and its file present; `hero-water-landscape.png` present.

- [ ] **Step 5: Clean production build** — Run: `npm run build`; Expected: PASS, zero errors. Then `ls dist/tea/the-other-99-water-for-tea/index.html` exists.
- [ ] **Step 6: Voice spot-check** — read the rendered post (`npm run dev`) start to finish against `clay-within-clay-jiani-and-nenni.md`: H3 sections, bold first-use terms, info-box, figure captions, em-dash cadence, honest-uncertainty register. Adjust any section that reads off-voice.
- [ ] **Step 7: Commit any QA edits**

```bash
git add -A
git commit -m "polish(tea): final QA pass on water-for-tea post (voice, citations, build)"
```

---

## Self-Review (completed during planning)

**Spec coverage:** Every spec section maps to a task — §1–10 of the outline → Tasks 2–8; the four core diagrams → Tasks 9–12; optional scum diagram → Task 13; hero (with the SVG-vs-`<Image>` risk resolved by rasterizing) → Task 14; frontmatter/info-box/CSS reuse → Task 1 & 6; acceptance criteria + binding honesty flags → Task 15. The "no manual index" finding means no page-wiring task is needed (verified: `src/pages/tea/index.astro` enumerates the collection).

**Placeholder scan:** No "TBD/handle appropriately". Recipes, target tables, figure embeds, frontmatter, info-box, and Diagram 1 are given in full; Diagrams 2–5 and the hero have concrete specs + exact labels/dimensions/colors + a complete starter for D1 and validation/commit commands. Prose tasks use content checklists (the correct artifact for a writing task) rather than ghost-written paragraphs, with `npm run build` + checklist as the gate — stated explicitly in the preamble.

**Type/path consistency:** Asset filenames are fixed once in Global Constraints and reused verbatim in every embed and diagram task; recipe quantities (0.75 g / 0.25 g / 0.1 g) are cross-checked between §7 (Task 6) and Diagram 4 (Task 12); the hero path in frontmatter (Task 1) matches the PNG produced in Task 14.
