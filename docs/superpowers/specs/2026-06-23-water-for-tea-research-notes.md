# Research notes — "The importance of water for tea"

**Date:** 2026-06-23 · Companion to `2026-06-23-water-for-tea-design.md`
Consolidated from six parallel research agents (web search + source-fetching). Peer-reviewed sources first; community/preference sources labeled. **Verification flags are binding** (see end). Figures marked *(abstract/secondary)* came from abstracts or secondary summaries because the primary PDF was paywalled — re-verify before quoting exact numbers.

---

## 1. Water chemistry fundamentals

- **TDS** = total dissolved solids, mg/L (= ppm for dilute water). Consumer "TDS meters" actually measure **electrical conductivity × a factor of 0.5–0.8** — they cannot tell you *which* ions, miss non-ionic solids (silica, organics), and the factor choice alone swings the reading ~20–40%. TDS is an ionic-strength proxy, not a composition assay. (Hanna Instruments; USGS)
- **General hardness (GH)** = Ca²⁺ + Mg²⁺, reported as mg/L CaCO₃. Conversion from molar mass: **Ca × 2.5, Mg × 4.1** (100.1/40.1 = 2.5; 100.1/24.3 = 4.12). Units: 1 °dH = 17.8 mg/L CaCO₃; 1 gpg ≈ 17.1; 1 °f = 10. USGS classes: soft <60, moderately hard 61–120, hard 121–180, very hard >180 mg/L CaCO₃ (boundaries vary by authority).
- **Carbonate hardness / alkalinity (KH)** = HCO₃⁻/CO₃²⁻, the **acid-neutralizing buffering capacity**, also as mg/L CaCO₃. **Alkalinity, not pH, governs buffering** — high alkalinity resists pH change and blunts a brew's perceived brightness/acidity; low alkalinity lets brightness through.
- **pH alone is a weak descriptor:** two waters at pH 7 behave completely differently if one is distilled (no buffer) and one is alkaline mineral water. Buffering peaks near carbonate pKa (~6.3, ~10.3).
- **Temporary vs permanent hardness:** temporary = Ca/Mg + bicarbonate, removed by boiling (Ca(HCO₃)₂ → CaCO₃↓ + CO₂↑ + H₂O = limescale). Permanent = Ca/Mg + sulfate/chloride/nitrate, **stays dissolved on boiling**. Hach rule: carbonate hardness = the smaller of (total hardness, alkalinity); excess hardness is permanent.
- **Typical TDS:** tap ~100–500 ppm (very location-dependent); spring ~50+ ; bottled mineral ~250–650; **RO ~1–30 ppm** (92–99% rejection); distilled <10; DI ~0.
- **Example bottled waters (label mg/L):** Evian Ca≈80, Mg≈26, HCO₃≈360 → GH≈307 (very hard, high alkalinity). Volvic Ca≈12, Mg≈8, HCO₃≈74 → GH≈63 (soft). Fiji silica≈93 (silica underweighted by EC meters).
- **SCA coffee standard (the benchmark tea borrows):** TDS target **150** (75–250), calcium hardness ~17–85, total alkalinity **~40** as CaCO₃, sodium ~10, pH **~7.0** (6.5–7.5), chlorine 0. Deliberately *low* alkalinity relative to hardness.

**Myths:** "TDS meter = mineral content" (no — conductivity proxy); "TDS/hardness/pH are the same" (no — independent properties); "pH is the key number" (no — alkalinity is); "boiling softens water" (only temporary hardness); "more minerals = better tea" (unsupported).

Sources: Hanna Instruments (EC↔TDS); USGS *Hardness of Water*; Hach *Water Hardness*; ScienceDirect/Orenda on alkalinity & buffering; Chem LibreTexts (carbonate decomposition); Lenntech (temporary hardness); SCAA 2009 Water Standard. *Not retrieved:* Barista Hustle (paywall 402), PMC8267898 bottled-water ranges (CAPTCHA), *Water for Coffee* (Colonna-Dashwood & Hendon, 2015 — book).

---

## 2. Ion-by-ion effects on extraction & taste

1. **Hardness sharply suppresses green-tea catechins:** 21→338 ppm CaCO₃ cut total catechins **~2.4×** (164.6→67.5 mg/cup); EGCG **3.2×**, EGC **3.1×**. Trihydroxyl catechins (EGC/EGCG) hardest hit; EC/ECG stable. (*Molecules* 2021, PMC8229914)
2. **Bicarbonate/alkalinity is the dominant degrader — not the cations per se.** NaHCO₃ solution gave the most browning and fastest catechin decay; browning starts once pH > ~6.3 / hardness > ~42 ppm. Mechanism: **alkaline pH accelerates non-enzymatic autoxidation/polymerization** of catechins → brown pigment. Absent in soft/DI water. (*Molecules* 2021)
3. **Calcium** lowers extraction by complexing leaf pectin and bridging polyphenols; **promotes tea cream and scum**. (multiple)
4. **Cornell paradox:** hard tap (Ca 53.6, Mg 9.5, Na 20.9) gave **~half the EGCG** of bottled/DI — yet panel rated tap green tea **less bitter, sweeter, better liked** (all p<0.001). **Black tea: minimal sensory difference by water** (already oxidized). (*Nutrients* 2019, PMC6356489)
5. **Bicarbonate darkens liquor** by shifting the pH-sensitive thearubigin equilibrium (alkali → darker; acid/lemon → lighter). Theaflavins are pH-insensitive. (*The Conversation*; *Molecules* 2021)
6. **Why alkalinity is the worst factor:** raises pH, buffers/neutralizes the acids the brew extracts (flattens brightness), *and* catalyzes catechin browning. Coffee panels: high-bicarbonate water = "flat, chalky, muddled, muted acidity," lowest sweetness.
7. **Magnesium — coffee-lore, NOT established for tea.** "Mg extracts more/brighter" is from coffee (Hendon/Colonna-Dashwood DFT, *JAFC* 2014) and partly hobbyist; a coffee scientist flags it as lab-unconfirmed. Tea-direct astringency assay ranks cation potency **Al³⁺ > K⁺ > Mg²⁺ > Ca²⁺** — Mg only moderate/weak. (PMC11049597)
8. **Sodium/chloride:** low NaCl suppresses bitterness, lifts perceived sweetness; but ion-exchange softener **swaps Ca/Mg → Na⁺** (flat extraction) and **doesn't remove alkalinity** → bad for brewing.
9. **Sulfate** reads dry/sharp/bitter above ~80 (CaSO₄) –160 (Na₂SO₄) mg/L; gypsum bitter/astringent, Epsom bitter/drying.
10. **Iron** ruins tea: galloyl groups chelate Fe → dark blue-black tannin–iron complex (~550 nm), metallic/harsh. Taste/stain threshold **0.3 mg/L** (EPA secondary / WHO).
11. **Chlorine vs chloramine:** free chlorine off-gasses / activated carbon removes it; **chloramine is persistent — needs catalytic carbon** (decomposes it) or long contact.
12. **Tea SCUM** = oxidized polyphenols on a thin **CaCO₃** film; forms only with **both** Ca/Mg **and** HCO₃⁻ (Ca²⁺ + 2HCO₃⁻ ⇌ CaCO₃ + CO₂ + H₂O). Chemically controlled (Ea ≈ 34 kJ/mol, no stirring effect), O₂-driven at the surface. Lemon suppresses (lowers pH + chelates Ca); more leaves / acid suppress. (Spiro & Jaganyi, *Food Chemistry* Parts 10–13, 1990s; Compound Interest secondary)
13. **Tea CREAM** ≠ scum: a **caffeine + theaflavin/thearubigin colloid** forming as black tea *cools*; theaflavin nucleates ~3 nm clusters; calcium promotes creaming; "creaming down" = sign of strength/briskness.

**Key flags:** Mg-for-tea is the weakest claim (coffee-derived, contested even in coffee). "Calcium kills flavor" is misleading — it kills *catechins/clarity* and can *reduce* bitterness (sometimes desirable). Black tea is far less water-sensitive than green.

Sources (peer-reviewed): *Molecules* 2021 (PMC8229914); *Nutrients* 2019 (PMC6356489); Spiro & Jaganyi *Food Chemistry* (1994, Parts 10/11); EGCG–mucin PMC11049597; tea-cream *Food Hydrocolloids* 1998 / *JAFC* 2005 / *Food Research Int.* 2022; tannin–Fe *Int. J. Biol. Macromol.* 2023; Hendon et al. *JAFC* 2014. Secondary: Compound Interest (scum). *Inaccessible (403):* Spiro abstracts; "Water Hardness & Free Residual Chlorine on Black Tea Brew" (ResearchGate 310490123).

---

## 3. The peer-reviewed science on "optimal"

- **Hardness → catechin loss** quantified (as §2.1). Mechanism is post-extraction autoxidation, not poor leaching. (*Molecules* 2021)
- **TDS numbers:** low-TDS water (0.59–13 ppm, pH 6.0–6.9) gave higher soluble solids, catechins, L-theanine; high-TDS (315–338 ppm, pH 7.65–8.05) reduced major catechins **~84–93%** with undesirable color on storage. *(Murugesh et al., J. Food Process Eng. 2017 — abstract)*
- **Cornell:** DI/bottled ≈ **2× EGCG** vs tap, but tap green tea **preferred**; black tea EGCG unaffected (p=0.250). (*Nutrients* 2019)
- **Bicarbonate thresholds by tea type:** low HCO₃⁻ (≤ ~22 mg/L) boosted aroma & cut bitterness; high (≥ ~40 mg/L) dimmed brightness/aroma. High bicarbonate **harmed green tea but somewhat benefited black/dark teas**. → keep KH/alkalinity **< ~20 mg/L for green**. *(Foods 2025, 15(11):1958 — abstract; verify thresholds)*
- **Calcium** drives tea cream, turbidity, sediment, dull/cloudy lower-brightness liquor; magnetized/low-mineral water gave highest phenolics & acceptability. (*Heliyon* 2022, PMC9932355)
- **Mineral-dissolution study:** "water with a neutral pH and lower mineral content is more conducive to brew green tea" (best: natural drinking water pH 6–7); mineral water gave lowest volatiles; trace Ca/Fe at low levels can *aid* aroma (peak ~pH 6.5). (PMC10192933)
- **Susceptibility ranking: green > oolong > black.** Moderately-mineralized natural/spring water best for oolong aroma; high TDS (>~140 ppm) lowered aroma acceptability. (*Food Chemistry* series, 2023–24; Tieguanyin PMC10792187 — abstract)

**Supported "optimal" (tea):** pH ~6.0–7.0 (strong); **alkalinity/KH low: <~20–40 mg/L HCO₃⁻**, lower for green/light (strong); TDS ~30–150 ppm, green at low end (mixed — chemistry favors low, sensory wants a non-zero floor); calcium low <~40–50 mg/L (moderate); magnesium no firm tea optimum (weak). **Bottom line: soft–moderate, low-alkalinity, slightly-acidic-to-neutral pH, low calcium.**

**Myths:** "distilled is best" (max extraction but tastes flat; sensory panels prefer light minerals); "both extremes bad" (supported — hard-water harm better-documented than soft-water harm); "SCA coffee numbers fit tea" (no — SCA alkalinity 40–70 is *at/above* the green-tea dulling threshold; too hard/alkaline for green); "there's an authoritative tea water standard" (largely myth — the 50–150 ppm figure is Tea Association of the USA / David Beeman practitioner guidance, not a trial).

Sources: *Molecules* 2021 (PMC8229914, full text); *Nutrients* 2019 (PMC6356489, full); *Heliyon* 2022 (PMC9932355, full); J. Food Composition & Analysis 2023 (PMC10192933, full); Hendon et al. *JAFC* 2014 (full). Abstract-only: Murugesh JFPE 2017; *Foods* 2025; Tieguanyin/*Food Chemistry* 2023–24. Practitioner: SCAA standard; Tea Assoc. USA / Beeman.

---

## 4. Lore & history

- **Lu Yu, *The Classic of Tea* (茶經 / Cha Jing), c. 760–762 CE, ch. 5 ("Boiling"):** water hierarchy **山水上，江水中，井水下** — "mountain water best, river water middling, well water worst." Prefer slow/"living" spring water over stone; avoid violent cascades; well water only if actively drawn. Standard English: **Francis Ross Carpenter, 1974** (Little, Brown). Carpenter's vivid phrasings ("milk-pure springs," "as if nature were rinsing its mouth") are interpretive — **verify against print before quoting verbatim.**
- **Key correction:** the famous **ranking of twenty named springs is NOT in the Cha Jing** — it's **Zhang Youxin's *Jiancha Shuiji* (煎茶水記), 814 CE**, written ~a decade after Lu Yu died (804); it merely *attributes* a list to him. Conflating the two is the single commonest error in popular tea writing.
- **The Nanling/Zhongling water anecdote** (Lu Yu detecting adulteration *within one vessel*) is **hagiographic legend**, not history.
- Competing rankings disagree (Zhongling #7 for Zhang vs #1 "first spring under heaven" for Liu Bochu; Qianlong reassigned #1 to Beijing's Jade Spring) — itself a sign the rankings are literary/political, not empirical.
- **Literati "living waters":** Su Shi carried tea to Huishan spring; "second spring under heaven" (Zhao Mengfu inscription). **Heavenly waters** (rain by season, "snow-broth," dew) prized = soft, mineral-poor.
- **Qianlong** had a silver flask made to **weigh** waters, reasoning lighter = purer; declared Jade Spring lightest. Direction correct (lower TDS = lighter ≈ better tea), claimed precision not credible.

**How it holds up:** mountain spring best — **vindicated** (high-elevation water has little rock contact → soft, low-bicarbonate); living/flowing water — **partly** (freshness/hygiene sound; aeration effect minor); well water worst — **partly** (groundwater *often* hard); "sweet/light/soft" prized — **vindicated** (maps onto low-mineral/low-alkalinity); named-spring rankings — **romance**; snow/rain excellent — **partly** (naturally soft, but modern pollution caveat). Verdict: the ancients were empirically right about the *variable* (hardness/alkalinity) in a pre-chemical vocabulary; specific rankings + mystical "energy" framing are romance.

Sources: Wikipedia *The Classic of Tea* / *Report on Water for Brewing Tea* / *Tea classics*; Carpenter 1974 (catalog); Gwong Zau Kung Fu & Path of Cha (quote reproductions — verify); Baidu Baike (twenty springs); Owyoung *CHA DAO* (Qianlong); peer-reviewed chemistry (PMC6356489/8229914/10411494) for the modern verdict.

---

## 5. Practical methods (evergreen, region-proof)

- **Boiling** removes only **temporary (carbonate) hardness** (precipitates CaCO₃ limescale) + dissolved CO₂ + free chlorine. **Not** permanent hardness, broad TDS, or **chloramine**.
- **"Never re-boil / dissolved-oxygen" rule = mostly myth** (McGill OSS: re-boil safety fear "nonsense"; O₂ redissolves on cooling; any taste change = concentrated minerals from evaporation).
- **Activated carbon** removes chlorine/chloramine(catalytic)/organics, **not minerals**. **Brita**-type pitchers' small resin trims *some* hardness, not broad TDS. **RO** strips ~90–99% → 10–25 ppm (a *blank canvas*). **Distilled/DI** ~0 → flat, lifeless alone. **Sodium softeners are BAD** (swap Ca/Mg→Na, keep alkalinity, add salt → flat).
- **Targets table:**

  | Parameter | SCA (coffee) | Tea (hobbyist consensus) | Confidence |
  |---|---|---|---|
  | TDS | ~150 (75–250) | 50–150 ppm; ~20–50 delicate/green | High coffee / Low tea |
  | Hardness (GH) | 50–175 (sweet 50–85) | ~17–68 ppm; <10 thin, >120 flat | Med–High / Low |
  | Alkalinity (KH) | ~40 (≤40 pref, ≤70) | **low** — high KH flattens tea | High / Med |
  | pH | ~7 (6.5–7.5) | ~7 (green lower, black higher) | High / Low |

  (World Brewers Cup water ≈ 51 hardness / 40 alkalinity — a real-world expert default. LSI > ~0.7 predicts severe scale.)

- **DIY remineralization (from RO/distilled, weigh by mass with a 0.01 g scale):**
  - **Recipe A (SCA-style, concentrate):** hardness conc. = 2.5 g Epsom (MgSO₄·7H₂O)/L; buffer conc. = 1.7 g baking soda (NaHCO₃)/L; final = 877 g distilled + 41 g hardness + 82 g buffer → **~82 ppm hardness, ~41 ppm alkalinity**. Simple version: per 1 gal distilled add **0.75 g Epsom + 0.25 g baking soda**.
  - **Recipe B (RPavlis, no-scale buffer):** **0.1 g potassium bicarbonate (KHCO₃)/L** (via concentrate: 10 g/100 mL, then 10 mL/L). ~0 hardness, alkalinity-only buffer, **forms no limescale**; potassium > sodium (no salty/flat note).
  - **Recipe C (sachet):** Third Wave Water "Classic" = MgSO₄ + Ca citrate + NaCl, ~150 ppm TDS / ~40 alkalinity, 1 sachet/gal. **For delicate tea, halve doses** (coffee-tuned).
- **Reading a label (mg/L):** "**dry residue at 180 °C**" = TDS proxy (aim ~50–150); **Ca, Mg** → hardness/extraction; **bicarbonate (HCO₃)** → alkalinity (the "flatten" number — want **low**); **sodium** low; sulfate/chloride/nitrate modest. Math: **hardness ≈ Ca×2.5 + Mg×4.1**; **alkalinity ≈ HCO₃×0.82.** Good tea water: modest Ca+Mg, low bicarbonate, low sodium, residue ~50–150. Bad: high bicarbonate/sodium/very high residue (San Pellegrino, Evian-hard, Vittel) → flat/scaly; or near-zero everything → flat unless built up.

**Myths:** "always fresh water/never re-boil" (mostly myth); "boiling softens" (half-true); "boiling removes chlorine" (free yes, chloramine no); "softened water fine" (false); "Brita fixes hard water" (mostly false); "RO/distilled is best" (false as-is); "more minerals = better" (false).

Sources: Wikipedia *Hard water*; Lenntech; McGill OSS (re-boil); Fresh Water Systems (chloramine); SCA/Third Wave Water; Barista Institute / Whole Latte Love (recipes); GrindScience (label math); *Molecules* 2021 (soft-favors-green). Tea TDS targets = hobbyist/industry, not peer-reviewed.

---

## 6. Matching teas to water (anchored in puerh/oolong/gongfu)

**Framing:** the real axes are **alkalinity** (keep low for anything aroma-forward) and **whether minerals are balanced** — not "soft vs hard" monoliths. **Correct the central myth:** "soft water tames bitterness" is the *wrong mechanism* — *pure* water **over-extracts** bitter catechins; minerals **reduce** catechin extraction. Soft water's real effect = brighter aroma + thinner body.

- **Young sheng puerh — contested (legitimate split).** (a) low-TDS/low-alkalinity (~30–80 ppm) for aromatic clarity & qi-forward brightness; (b) some minerality for body/roundness. Chemistry says minerals *reduce* bitterness (not soft water); but high alkalinity dulls the prized top notes. MarshalN leans "a bit more minerals → softer, rounder, fuller."
- **Aged sheng / shou — consensus: some minerality helps.** Ca-Mg-bicarbonate + **silica (~20–34 ppm)** give "rich, oily texture," "bready/yeasty" tertiary notes; lost with very low-TDS water. Body, not aroma, is the goal here.
- **Yancha / roasted oolong — strong consensus *preference*, mechanism unproven.** Mineral/bicarbonate-leaning water said to complement *yan yun* (rock rhyme). **No controlled evidence** minerals enhance yan yun specifically — believe the preference, doubt the mechanism.
- **Dancong — soft/clean/low-alkalinity** to protect high aromatics. Debate: RO (to cut bitterness) vs light spring water (controls bitterness *and* keeps complexity — chemistry favors not going fully pure).
- **Green & white — low-alkalinity, modest *balanced* minerals (NOT zero), low temperature** (temp is the bigger lever — selectively favors theanine sweetness over catechin bitterness). Hands-on test: remineralized purified water (Dasani) beat both heavy springs (Evian/Fiji "flat, dull") and near-pure (Smartwater "sour, bitter, astringent").
- **Black/red — low alkalinity for briskness/color; least water-sensitive.** Hard water darkens/dulls/scums (theaflavins degrade under alkali); Yorkshire Tea ships **separate hard/soft-water blends**. But flavor-liking impact smaller than green.
- **Gongfu context:** high leaf:water ratio + many short steeps → **avoid pure water** (over-extracts → thin/sour/harsh); mineral water yields more flavor per steep but fewer steeps; mouthfeel/silica more perceptible at high ratios. Net target: **low-alkalinity, low-to-moderate TDS with some balanced minerals** — almost never RO/distilled or heavy alkaline spring.

**Real debates:** soft-tames-bitterness (wrong mechanism); young sheng bright vs thick; dancong RO vs light spring; yancha minerality real or aesthetic; "spring/bottled beats tap" (overstated — composition > "spring" label); how soft is too soft ("zero buffering/zero balanced minerals" is the problem, not low TDS — e.g. very-low-TDS Sant'Anna ~22 ppm performs well on aged sheng).

**Named example waters (region/era-bound, NOT prescriptions):** Sant'Anna (IT ~22), Lauretana (IT ~14), Volvic (FR, everyday benchmark), Vittel/Evian (harder; Evian "over the threshold" for delicate tea), Iceland Spring, Suntory (JP), Saratoga / Poland Spring Origin (US), Dasani (remineralized — won a green-tea blind test), Nongfu Spring (CN default for yancha/oolong). DIY: distilled/RO + NaHCO₃ (texture/sweetness) / Epsom MgSO₄ / CaCl₂ — target profile bicarbonate-dominant, low sodium, TDS <~80, medium-high silica.

**Honesty flags:** the strong *chemistry* is on green/black/scum; puerh/oolong/yancha claims are **experienced preference**, not controlled studies — don't dress as proven.

Sources (community/preference unless noted): MarshalN *A Tea Addict's Journal*; TeaCurious bottled-water tests; Tea Secrets (bicarbonate/silica granularity); The Rhyming Leaf (remineralization); TeaChat forums; Path of Cha (yan yun); Yorkshire Tea (commercial evidence). Peer-reviewed: *Nutrients* 2019 (PMC6356489); *Molecules* 2021 (PMC8229914); Spiro scum; *Physics of Fluids* 2021 (film vs hardness); alldayieat (temp selectivity).

---

## Binding verification flags (carry into the prose)
1. **Magnesium "brightness"** — coffee-derived, not established for tea. Present as hypothesis.
2. **Puerh/oolong/yancha matching** — experienced preference, not controlled science. Surface the debates.
3. **Abstract/secondary figures** (Murugesh ~84–93%, *Foods* 2025 ~22/40 mg/L thresholds, Spiro Ea 34 kJ/mol) — phrase as "reported," avoid false precision, re-verify before quoting.
4. **Carpenter Lu Yu quote** — verify against the print 1974 edition before publishing verbatim.
5. **">99% water"** — keep the framing defensible; a brewed cup's solids are a fraction of a percent.
6. **Tea TDS/hardness targets** are hobbyist/industry consensus, not peer-reviewed — label as such.
