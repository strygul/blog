# Sheng Puer Educational Program Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce a concise internal sheng-puer educational program with 12 core and 12 advanced comparative flights, current worldwide purchase suggestions, and dated euro budgets.

**Architecture:** Keep raw source evaluation and product-price evidence separate from the concise program. A structured TSV catalog is the source of truth for purchasable offers and calculations; a Markdown research notebook records TeaDB guidance, selection decisions, caveats, and rejected candidates; a second Markdown document presents only the finished program that will later define a public post.

**Tech Stack:** Markdown, tab-separated values, TeaDB and vendor web pages, ECB-derived exchange rates, `curl`, `rg`, `awk`, and Git.

**Spec:** `docs/superpowers/specs/2026-08-30-sheng-puer-educational-program-design.md`

## Global Constraints

- Cover sheng puer only: origin, material, season, processing, recipe, producer, age, and storage.
- Exclude water, teaware, brewing experiments, tasting procedures, ripe puer, and home-storage instructions.
- Treat exact teas as suggestions rather than mandatory purchases.
- Source worldwide; report prices in EUR and exclude shipping, tax, and import costs.
- Use TeaDB as the curriculum and vendor compass; use current vendor pages for stock, quantity, storage, and price claims.
- Distinguish documented facts, vendor claims, and practitioner expectations.
- Provide a focused “pay attention to” section and an honest confounder note for every flight.
- Prefer samples; reserve cake-only purchases for advanced recommendations unless the cake is unusually affordable.
- Reuse 14–18 core anchor teas and do not double-count them in cumulative budgets.
- Keep the final internal program concise; place detailed research and rejected candidates in the research notebook.

## File Map

- Create `docs/research/sheng-puer-program-research.md` — TeaDB source map, vendor observations, comparison rationale, evidence/confidence notes, exchange-rate snapshot, and rejection log.
- Create `docs/research/sheng-puer-product-catalog.tsv` — machine-checkable source of truth for current tea offers, prices, tiers, flight assignments, and anchor reuse.
- Create `docs/research/sheng-puer-educational-program.md` — concise final guide containing the shopping basket, 24 flights, budgets, vendor index, glossary, and source notes.
- Do not modify `src/content/tea/`; the public post remains out of scope.

---

### Task 1: Establish the research artifacts and source hierarchy

**Files:**
- Create: `docs/research/sheng-puer-program-research.md`
- Create: `docs/research/sheng-puer-product-catalog.tsv`

**Interfaces:**
- Consumes: the approved design spec and the TeaDB hub pages named below.
- Produces: a research notebook with stable section names and a 23-column TSV catalog used by every later task.

- [ ] **Step 1: Read the approved spec and extract its binding requirements**

Run:

```bash
sed -n '1,260p' docs/superpowers/specs/2026-08-30-sheng-puer-educational-program-design.md
```

Expected: the 12 core flights, 12 advanced flights, flight template, sourcing rules, and acceptance criteria are visible.

- [ ] **Step 2: Create the research notebook scaffold**

Use `apply_patch` to create `docs/research/sheng-puer-program-research.md` with this exact structure:

```markdown
# Sheng puer educational program — research notebook

**Research started:** 2026-08-30
**Purpose:** Evidence, candidate selection, price provenance, and rejected options for the internal educational program.

## Evidence labels

- **Documented:** supported by a manufacturer record, identifiable production, or specific storage provenance.
- **Vendor claim:** stated by the seller but not independently verified.
- **Practitioner expectation:** recurring sensory or historical interpretation from TeaDB or another specialist source.

## TeaDB source map

## Vendor map

## Exchange-rate snapshot

## Candidate and pairing notes

### Flights 1–2: age and broad storage
### Flights 3, 6–7: production models, recipes, and factories
### Flights 4 and 8: introductory terroir
### Flight 5: matched storage
### Flights 9–12: interacting variables and synthesis
### Flights 13–15: advanced terroir
### Flights 16–18: material and processing
### Flights 19–21: advanced recipes and brands
### Flights 22–24: advanced storage and market literacy

## Anchor selection rationale

## Rejected candidates

## Budget calculations

## Research caveats
```

- [ ] **Step 3: Record the TeaDB source hierarchy**

Read and summarize, without long quotations, these pages under `## TeaDB source map`:

```text
https://teadb.org/puerh/
https://teadb.org/five-types-raw-puerh/
https://teadb.org/non-mainland-puerh-vendor-guide/
https://teadb.org/four-reasons-baseline-mid-factory/
https://teadb.org/yiwu-mega-report/
https://teadb.org/bulangish-brutalists-report/
https://teadb.org/in-debt-for-dayi-report/
https://teadb.org/puerh-storage/
https://teadb.org/old-school-new-school-puerh/
https://teadb.org/big-region-small-region/
```

For each page record: publication date, relevant flights, useful tea/vendor names, and whether the information is category guidance, a tasting opinion, or a current purchasing lead.

- [ ] **Step 4: Create the structured offer catalog**

Use `apply_patch` to create `docs/research/sheng-puer-product-catalog.tsv` with this single tab-separated header row:

```text
offer_id	tea_name	year	producer	recipe_or_origin	storage	vendor	country	url	purchase_g	source_currency	source_price	eur_rate	price_eur	eur_per_10g	checked_on	flight_ids	tiers	anchor	confidence	availability	notes	role
```

Field rules:

- `offer_id`: lowercase stable identifier such as `quiche-2008-dayi-8582-801`.
- `flight_ids`: pipe-separated numbers such as `1|6|12`.
- `tiers`: one or more of `essential|standard|advanced`.
- `anchor`: `yes` or `no`.
- `confidence`: `documented`, `vendor_claim`, or `practitioner`.
- `availability`: `in_stock`, `cake_only`, or `unavailable`.
- `role`: `recommended`, `alternative`, or `candidate`.
- Use `unknown` for genuinely undisclosed fields; leave no required field empty.

- [ ] **Step 5: Validate the scaffold and catalog schema**

Run:

```bash
awk -F '\t' 'NR == 1 && NF != 23 { print "header has", NF, "columns"; exit 1 }' docs/research/sheng-puer-product-catalog.tsv
rg -n '^## (TeaDB source map|Vendor map|Exchange-rate snapshot|Candidate and pairing notes|Anchor selection rationale|Rejected candidates|Budget calculations|Research caveats)$' docs/research/sheng-puer-program-research.md
git diff --check
```

Expected: the `awk` command produces no output; `rg` prints all eight H2 sections; `git diff --check` produces no output.

- [ ] **Step 6: Commit the research foundation**

```bash
git add docs/research/sheng-puer-program-research.md docs/research/sheng-puer-product-catalog.tsv
git commit -m "docs: scaffold sheng puer program research"
```

---

### Task 2: Research age and storage candidates

**Files:**
- Modify: `docs/research/sheng-puer-program-research.md`
- Modify: `docs/research/sheng-puer-product-catalog.tsv`

**Interfaces:**
- Consumes: the Task 1 evidence labels and TSV schema.
- Produces: viable current candidates for core Flights 1, 2, 5, 9, 10, and 12, plus advanced Flights 22 and 23.

- [ ] **Step 1: Extract TeaDB’s age and storage guidance**

Read TeaDB’s Five Types article, storage section, traditional-storage links, mid-2000s factory baseline, and relevant storage deep dives. Under the matching research-notebook headings, record:

- the practical distinction between young, semi-aged, and older tea;
- natural warm/humid, cool/dry, and traditional Hong Kong storage;
- TeaDB’s cited benchmark recipes or boutique lineages; and
- which sensory expectations are practitioner observations rather than documented facts.

- [ ] **Step 2: Search specialist inventory for natural-storage examples**

Inspect current listings from Teas We Like, Quiche Teas/Taishunhe, The Jade Leaf, Liquid Proust, Yunnan Sourcing, King Tea Mall, The Steeping Room, Hou De, and Bana Tea. Prioritize:

- recent and 2005–2011 7542 or the closest credible recipe vertical;
- factory teas with explicit Taiwan, Guangdong, Malaysia, or Kunming storage;
- same-production teas available from two storage histories; and
- samples or low-minimum purchases.

Record every serious candidate as one TSV row and add selection notes to the notebook.

- [ ] **Step 3: Search traditional Hong Kong inventory**

Inspect Yee On Tea first, followed by The Steeping Room and Liquid Proust when they resell or source Yee On/traditionally stored tea. Record at least two viable traditional-storage options and one substitution rule based on recipe, age band, and documented airing history.

- [ ] **Step 4: Search boutique lineages with enough history**

Inspect Chenyuan Hao, Yangqing Hao, Bi Yun Hao, Xizi Hao, and Wistaria offers through Puerh.uk, The Jade Leaf, Teas We Like, Yangqing Hao USA, Teapals, and other current distributors. Seek one young/semi-aged lineage comparison that can be purchased without relying on an unverifiable private-market cake.

- [ ] **Step 5: Validate catalog rows added for these flights**

Run:

```bash
awk -F '\t' 'NF != 23 { print "bad row", NR, "has", NF, "columns"; bad=1 } END { exit bad }' docs/research/sheng-puer-product-catalog.tsv
awk -F '\t' 'NR > 1 && $17 ~ /(^|\|)(1|2|5|9|10|12|22|23)(\||$)/ { for (i=1; i<=21; i++) if ($i=="") { print "missing field", i, "on row", NR; bad=1 } if ($23=="") { print "missing role on row", NR; bad=1 } } END { exit bad }' docs/research/sheng-puer-product-catalog.tsv
cut -f1 docs/research/sheng-puer-product-catalog.tsv | tail -n +2 | sort | uniq -d
```

Expected: all three commands produce no errors; the duplicate-ID command prints nothing.

- [ ] **Step 6: Commit the age/storage research**

```bash
git add docs/research/sheng-puer-program-research.md docs/research/sheng-puer-product-catalog.tsv
git commit -m "research: catalog sheng puer age and storage options"
```

---

### Task 3: Research terroir, material, and processing candidates

**Files:**
- Modify: `docs/research/sheng-puer-program-research.md`
- Modify: `docs/research/sheng-puer-product-catalog.tsv`

**Interfaces:**
- Consumes: the shared research notebook and product catalog.
- Produces: matched current candidates for core Flights 4, 8, and 11 and advanced Flights 13–18 and 24.

- [ ] **Step 1: Map TeaDB’s regional guidance to the flight questions**

Read TeaDB’s Yunnan overview; Yiwu/eastern Xishuangbanna, Menghai/western Xishuangbanna, Lincang, and Simao primers; Big Region/Small Region/Tree Age; the current Yiwu and Bulang reports; and Old School/New School Puer. Record expected tendencies as practitioner observations, not geographic laws.

- [ ] **Step 2: Find matched Yiwu/Bulang and Xishuangbanna/Lincang pairs**

Inspect current productions from Farmer Leaf, Yunnan Sourcing, Essence of Tea, Bitterleaf, Tea Encounter, Pu-erh.sk, Tea Urchin, Crimson Lotus, and other TeaDB-identified producers. Prefer same-producer, same-year pairs at similar prices. Record the strongest candidates, sample sizes, and product claims in the catalog.

- [ ] **Step 3: Find advanced subregional comparisons**

For Flights 13–15, seek:

- two or three Yiwu villages/subregions from one producer and harvest;
- Lao Man’e or explicitly bitter Bulang material against a sweeter Bulang counterpart; and
- Mengku-side against Bangdong/Xigui-side Lincang material.

If exact matching is unavailable, record the closest current pair plus a substitution rule in the research notebook.

- [ ] **Step 4: Find material and processing comparisons**

For Flights 16–18, prioritize vendor pages that explicitly sell:

- spring and autumn material from one origin and producer;
- traditional aging-oriented and modern fragrance-forward processing from comparable material; and
- plantation and old-arbor-labelled teas from one area.

Record every tree-age statement as `vendor_claim` unless independent documentation exists.

- [ ] **Step 5: Find blend/single-origin and reputation/value pairs**

For Flights 11 and 24, identify one producer offering both a blend and a single-origin tea in the same year/tier, and one famous-area tea with credible neighboring material at a materially lower €/10 g. Record why the cheaper tea is educationally comparable without implying equivalence.

- [ ] **Step 6: Validate and commit the terroir/material research**

Run:

```bash
awk -F '\t' 'NF != 23 { print "bad row", NR, "has", NF, "columns"; bad=1 } END { exit bad }' docs/research/sheng-puer-product-catalog.tsv
cut -f1 docs/research/sheng-puer-product-catalog.tsv | tail -n +2 | sort | uniq -d
git diff --check
```

Expected: no malformed rows, duplicate IDs, or whitespace errors.

Then commit:

```bash
git add docs/research/sheng-puer-program-research.md docs/research/sheng-puer-product-catalog.tsv
git commit -m "research: catalog sheng puer terroir and material options"
```

---

### Task 4: Research recipes, factories, and boutique philosophies

**Files:**
- Modify: `docs/research/sheng-puer-program-research.md`
- Modify: `docs/research/sheng-puer-product-catalog.tsv`

**Interfaces:**
- Consumes: the shared research artifacts and TeaDB source hierarchy.
- Produces: current candidates for core Flights 3, 6, and 7 and advanced Flights 19–21.

- [ ] **Step 1: Extract TeaDB’s factory and recipe guidance**

Read TeaDB’s factory rundown, Western Brands Are Very Different from Big Factory Tea, Four Reasons to Get a Baseline in Mid-00s Factory Puer, 2026 Dayi report, Xiaguan reports, and price/recipe analysis. Record:

- the historical roles of 7532, 7542, 8582, and Xiaguan 8653;
- batch/year variability;
- compression and smoke as possible Xiaguan signatures; and
- the limits of inferring leaf grade or quality from recipe numbers alone.

- [ ] **Step 2: Find matched Dayi recipe candidates**

Inspect Quiche Teas/Taishunhe, The Jade Leaf, Teas We Like, King Tea Mall, Yunnan Sourcing, Liquid Proust, The Steeping Room, and Hou De. Seek 7542 and 8582 from the same year or narrow era and comparable storage, then seek 7532 from that era for Flight 19. Record batch numbers where the listing provides them.

- [ ] **Step 3: Find a credible Menghai/Xiaguan pair**

Seek 7542 and 8653 or equivalent productions with similar age and storage. Record compression form, batch, cake weight, and storage separately so the final guide can name the confounders.

- [ ] **Step 4: Find a current factory/boutique orientation pair**

Choose a recent factory blend and recent boutique production of similar minimum purchase price. The pair must be available now, understandable to a beginner, and reusable elsewhere in the core basket.

- [ ] **Step 5: Map boutique philosophies to purchasable examples**

For Flight 21, identify current teas representing:

- a Taiwanese boutique with a multi-year lineage;
- a Western-facing blender that does not depend on precise terroir disclosure; and
- an origin-focused producer that discloses region and harvest.

Explain the production philosophy using verifiable producer/vendor descriptions and TeaDB context; do not turn the comparison into a vendor ranking.

- [ ] **Step 6: Validate and commit the recipe/brand research**

Run the 23-column and duplicate-ID checks from Task 3, then:

```bash
git diff --check
git add docs/research/sheng-puer-program-research.md docs/research/sheng-puer-product-catalog.tsv
git commit -m "research: catalog sheng puer recipes and producers"
```

Expected: validation passes and the commit contains only research artifacts.

---

### Task 5: Normalize prices and select the reusable shopping baskets

**Files:**
- Modify: `docs/research/sheng-puer-program-research.md`
- Modify: `docs/research/sheng-puer-product-catalog.tsv`

**Interfaces:**
- Consumes: candidate rows from Tasks 2–4.
- Produces: fully priced `recommended` and `alternative` offers, 14–18 selected core anchors, three tier baskets, and reproducible totals.

- [ ] **Step 1: Record one exchange-rate snapshot**

Use the European Central Bank reference-rate source for supported currencies. For currencies absent from ECB data, use one clearly named mid-market source and record its URL. Under `## Exchange-rate snapshot`, record:

- check date;
- each source currency used in the catalog;
- the rate as `1 source-currency unit = N EUR`; and
- source URL.

Use one snapshot for the entire catalog.

- [ ] **Step 2: Complete all numeric price fields**

For each current offer:

```text
price_eur = source_price × eur_rate
eur_per_10g = price_eur ÷ purchase_g × 10
```

Round `eur_rate` to at least four decimal places and the two EUR fields to two decimals. Enter the actual check date returned by `date +%F` in `checked_on`.

- [ ] **Step 3: Select exact recommendations and alternatives**

Change `role` from `candidate` to `recommended` or `alternative` only after confirming the product page is live and the listing supports the recorded quantity and price. Every core flight must have:

- one viable essential or standard comparison;
- one advanced upgrade where the market offers a genuinely better lesson; and
- a substitution rule in the notebook.

Allow advanced flights to use cake-only offers, but state that cost plainly.

- [ ] **Step 4: Select 14–18 reusable core anchors**

Mark `anchor=yes` for the recommended offers reused across core flights. Under `## Anchor selection rationale`, explain each anchor’s role and list its flight IDs. Avoid selecting separate offers when the same purchased sample can perform both roles.

- [ ] **Step 5: Assign mutually understandable budget tiers**

Set `tiers` so each path can be purchased independently:

- `essential`: lowest-cost credible core basket;
- `standard`: stronger provenance/matching without collector pricing;
- `advanced`: historically significant or more tightly controlled examples.

An offer may belong to more than one path using pipe-separated values. Do not include both a recommendation and its alternative in the same path total.

- [ ] **Step 6: Verify conversion math, anchor count, and path totals**

Run:

```bash
awk -F '\t' 'NR>1 { p=$12*$13; q=$14/$10*10; if (p-$14>0.02 || $14-p>0.02) print "EUR mismatch row", NR; if (q-$15>0.02 || $15-q>0.02) print "per-10g mismatch row", NR }' docs/research/sheng-puer-product-catalog.tsv
awk -F '\t' 'NR>1 && $19=="yes" && $23=="recommended" { seen[$1]=1 } END { for (x in seen) n++; print n }' docs/research/sheng-puer-product-catalog.tsv
for tier in essential standard advanced; do awk -F '\t' -v t="$tier" 'NR>1 && $23=="recommended" && $18 ~ ("(^|\\|)" t "(\\||$)") { sum+=$14 } END { printf "%s\t%.2f EUR\n", t, sum }' docs/research/sheng-puer-product-catalog.tsv; done
```

Expected: no mismatch lines; anchor count is between 14 and 18; each tier prints one reproducible total.

- [ ] **Step 7: Record totals and commit the selected catalog**

Copy the three totals into `## Budget calculations`, explain that shipping/tax/import are excluded, and record order-consolidation opportunities by vendor.

Then commit:

```bash
git add docs/research/sheng-puer-program-research.md docs/research/sheng-puer-product-catalog.tsv
git commit -m "research: select and price sheng puer learning baskets"
```

---

### Task 6: Draft the usage map, shopping basket, and core Flights 1–4

**Files:**
- Create: `docs/research/sheng-puer-educational-program.md`

**Interfaces:**
- Consumes: selected offers and rationale from Tasks 2–5.
- Produces: the concise guide’s introduction, complete anchor table, and seven required subsections for each of Flights 1–4.

- [ ] **Step 1: Create the guide header and usage map**

Use `apply_patch` to create the file with:

```markdown
# Learning sheng puer through comparative flights

**Internal program:** source document for a future post
**Price convention:** EUR; shipping, tax, and import costs excluded

## How to use this program

## Core shopping basket

## Part I — Learn the coordinates
```

Between the internal-program and price-convention lines, add a `**Prices checked:**` line whose value exactly matches the shared `checked_on` date in the selected catalog rows.

- [ ] **Step 2: Write the concise usage map**

Explain in no more than 180 words: 12 sequential core flights, optional advanced flights, suggested rather than mandatory teas, anchor reuse, three budgets, current-price volatility, and the absence of brewing instructions.

- [ ] **Step 3: Add the complete anchor shopping table**

Use these columns:

```text
Anchor | Tea and year | Vendor | Minimum quantity | Price | €/10 g | Used in flights | Tier(s)
```

Include only `anchor=yes`, `role=recommended` offers. Link tea names directly to current product pages.

- [ ] **Step 4: Write Flights 1–4 from the selected catalog**

For each flight use exactly:

```markdown
### Flight N: Title

[One-paragraph comparison and lesson.]

#### Why this flight
#### Suggested teas
#### Why these teas
#### Pay attention to
#### Limitations
#### Alternatives
#### Budget
```

Keep each flight concise. Explain what is special about each recommended tea, include linked vendor/quantity/current EUR price, and derive alternatives and limitations from the research notebook.

- [ ] **Step 5: Validate the first four flight records**

Run:

```bash
for n in 1 2 3 4; do rg -q "^### Flight $n:" docs/research/sheng-puer-educational-program.md || exit 1; done
test "$(rg -c '^#### (Why this flight|Suggested teas|Why these teas|Pay attention to|Limitations|Alternatives|Budget)$' docs/research/sheng-puer-educational-program.md)" -eq 28
rg -n 'TBD|TODO|coming soon|fill in|placeholder|\[[^]]*use the' docs/research/sheng-puer-educational-program.md
git diff --check
```

Expected: the first two commands pass; the red-flag search and `git diff --check` print nothing.

- [ ] **Step 6: Commit Part I**

```bash
git add docs/research/sheng-puer-educational-program.md
git commit -m "docs: draft foundational sheng puer flights"
```

---

### Task 7: Draft core Flights 5–8

**Files:**
- Modify: `docs/research/sheng-puer-educational-program.md`

**Interfaces:**
- Consumes: selected offers for the controlled-storage, recipe, factory, and regional flights.
- Produces: Part II with complete Flights 5–8 in the same seven-subsection format.

- [ ] **Step 1: Add the Part II heading**

Insert after Flight 4:

```markdown
## Part II — Separate the variables
```

- [ ] **Step 2: Write Flight 5 as the stricter counterpart to Flight 2**

Use the same-production/two-storage pair. State exactly what identifiers match and what warehouse variables remain unknown. If the exact pair is not currently purchasable, present the best documented pair as the recommendation and label the ideal pair as an unavailable exemplar.

- [ ] **Step 3: Write Flights 6–8**

Use selected offers for 7542/8582, Menghai/Xiaguan, and Xishuangbanna/Lincang. Reuse anchor prices rather than presenting them as new purchases. Keep historical recipe explanations factual and regional tendencies explicitly practitioner-grade.

- [ ] **Step 4: Validate eight complete flights**

Run:

```bash
for n in 5 6 7 8; do rg -q "^### Flight $n:" docs/research/sheng-puer-educational-program.md || exit 1; done
test "$(rg -c '^#### (Why this flight|Suggested teas|Why these teas|Pay attention to|Limitations|Alternatives|Budget)$' docs/research/sheng-puer-educational-program.md)" -eq 56
git diff --check
```

Expected: all checks pass with no whitespace errors.

- [ ] **Step 5: Commit Part II**

```bash
git add docs/research/sheng-puer-educational-program.md
git commit -m "docs: add controlled sheng puer comparison flights"
```

---

### Task 8: Draft core Flights 9–12 and core budget summary

**Files:**
- Modify: `docs/research/sheng-puer-educational-program.md`

**Interfaces:**
- Consumes: selected boutique-lineage, storage, blend, and vertical offers plus Task 5 totals.
- Produces: the completed 12-flight core and a non-duplicative cost summary.

- [ ] **Step 1: Add the Part III heading**

```markdown
## Part III — Understand interactions
```

- [ ] **Step 2: Write Flights 9–11**

Complete boutique lineage through time, natural humid vs traditional Hong Kong storage, and blend vs single origin. Explain why each tea is distinctive while keeping uncertain origin/storage statements attached to their evidence labels.

- [ ] **Step 3: Write the three-age vertical**

Use selected young, mid-aged, and older versions of one recipe or lineage. Explicitly list which samples were already purchased for earlier flights and show only the incremental spend in the Flight 12 budget.

- [ ] **Step 4: Add the core budget summary**

Create:

```markdown
## Core budget summary
```

Show essential, standard, and advanced basket totals from Task 5; the number of unique offers in each basket; the major vendor-consolidation options; and the exclusion of shipping, taxes, and import fees.

- [ ] **Step 5: Validate the complete core**

Run:

```bash
for n in $(seq 1 12); do rg -q "^### Flight $n:" docs/research/sheng-puer-educational-program.md || exit 1; done
test "$(rg -c '^#### (Why this flight|Suggested teas|Why these teas|Pay attention to|Limitations|Alternatives|Budget)$' docs/research/sheng-puer-educational-program.md)" -eq 84
rg -q '^## Core budget summary$' docs/research/sheng-puer-educational-program.md
git diff --check
```

Expected: all commands pass.

- [ ] **Step 6: Commit the completed core**

```bash
git add docs/research/sheng-puer-educational-program.md
git commit -m "docs: complete core sheng puer curriculum"
```

---

### Task 9: Draft advanced Flights 13–18

**Files:**
- Modify: `docs/research/sheng-puer-educational-program.md`

**Interfaces:**
- Consumes: advanced terroir, material, and processing selections from Task 3.
- Produces: six complete elective flights with difficulty and cost labels.

- [ ] **Step 1: Add the advanced-program introduction**

Create:

```markdown
## Advanced elective flights

These are independent modules rather than a second required sequence. Each flight states its expected difficulty and purchase tier.

**Module: Terroir within terroir**
```

- [ ] **Step 2: Write Flights 13–15**

Cover Yiwu subregions, the Bulang bitterness spectrum, and Lincang subdivisions. State the claimed origins precisely, identify the claim source, and avoid treating vendor-labelled village material as independently authenticated.

- [ ] **Step 3: Add the material/processing module and write Flights 16–18**

Add:

```markdown
**Module: Material and processing**
```

Then write spring/autumn, aging-oriented/fragrance-forward processing, and plantation/old-arbor-claim flights. Treat Flight 18 as evidence literacy as well as sensory comparison.

- [ ] **Step 4: Validate Flights 13–18**

Run:

```bash
for n in $(seq 13 18); do rg -q "^### Flight $n:" docs/research/sheng-puer-educational-program.md || exit 1; done
test "$(rg -c '^#### (Why this flight|Suggested teas|Why these teas|Pay attention to|Limitations|Alternatives|Budget)$' docs/research/sheng-puer-educational-program.md)" -eq 126
git diff --check
```

Expected: all checks pass.

- [ ] **Step 5: Commit the first advanced modules**

```bash
git add docs/research/sheng-puer-educational-program.md
git commit -m "docs: add advanced sheng puer terroir flights"
```

---

### Task 10: Draft advanced Flights 19–24

**Files:**
- Modify: `docs/research/sheng-puer-educational-program.md`

**Interfaces:**
- Consumes: advanced factory, brand, storage, and market selections from Tasks 2 and 4.
- Produces: the remaining six complete electives and their module summaries.

- [ ] **Step 1: Add the recipes/factories/brands module and write Flights 19–21**

Add:

```markdown
**Module: Recipes, factories, and brands**
```

Write the Dayi recipe suite, Xiaguan recipes/forms, and boutique-philosophy flights. A three-tea flight is allowed for the Dayi suite and boutique-philosophy comparison.

- [ ] **Step 2: Add the storage/market module and write Flights 22–24**

Add:

```markdown
**Module: Storage and market literacy**
```

Write the storage-city triangle, traditional Hong Kong intensity/airing, and reputation/value flights. If a three-city same-production set cannot be bought concurrently, state the purchasable pair first and preserve the triangle as the substitution target.

- [ ] **Step 3: Validate all 24 flight records**

Run:

```bash
for n in $(seq 1 24); do rg -q "^### Flight $n:" docs/research/sheng-puer-educational-program.md || exit 1; done
test "$(rg -c '^#### (Why this flight|Suggested teas|Why these teas|Pay attention to|Limitations|Alternatives|Budget)$' docs/research/sheng-puer-educational-program.md)" -eq 168
rg -n 'TBD|TODO|coming soon|fill in|placeholder' docs/research/sheng-puer-educational-program.md
git diff --check
```

Expected: heading/count checks pass; the red-flag search and whitespace check print nothing.

- [ ] **Step 4: Commit the completed advanced program**

```bash
git add docs/research/sheng-puer-educational-program.md
git commit -m "docs: complete advanced sheng puer flights"
```

---

### Task 11: Add reference sections and perform final verification

**Files:**
- Modify: `docs/research/sheng-puer-educational-program.md`
- Modify: `docs/research/sheng-puer-program-research.md`
- Modify: `docs/research/sheng-puer-product-catalog.tsv`

**Interfaces:**
- Consumes: the complete catalog, notebook, core, and advanced drafts.
- Produces: the final concise internal program with verified links, arithmetic, source confidence, and no unresolved research markers.

- [ ] **Step 1: Add the vendor index by specialty**

Create `## Vendor index` in the final guide. Group only vendors actually used by the program under young/boutique, semi-aged/aged, traditional Hong Kong, and factory/dry-storage specialties. For each vendor state location, sample availability, and why it appears in this program; avoid overall rankings.

- [ ] **Step 2: Add the minimal beginner glossary**

Create `## Minimal glossary` and define only terms used by the guide, including sheng, maocha, recipe code, batch, factory, boutique, natural storage, traditional storage, gushu/old arbor, huigan, and any Chinese regional term left untranslated.

- [ ] **Step 3: Add sources and confidence notes**

Create `## Sources and confidence`. Link TeaDB’s puer hub, Five Types article, 2025 vendor guide, and the focused reports actually used. Explain the three evidence labels and state that product availability/prices came from vendor pages on the shared check date.

- [ ] **Step 4: Recheck every current product URL**

Extract current product links from the `recommended` and `alternative` catalog rows and request each page. If a link fails or the offer is sold out, change it to `unavailable`, replace the recommendation from an already researched alternative, update affected budgets, and record the change in `## Rejected candidates`.

Run the link inventory command first:

```bash
awk -F '\t' 'NR>1 && ($23=="recommended" || $23=="alternative") { print $9 }' docs/research/sheng-puer-product-catalog.tsv | sort -u
```

Then perform the HTTP check:

```bash
awk -F '\t' 'NR>1 && ($23=="recommended" || $23=="alternative") { print $9 }' docs/research/sheng-puer-product-catalog.tsv | sort -u | while IFS= read -r url; do curl -L --fail --silent --show-error --max-time 30 --range 0-0 "$url" >/dev/null || printf 'CHECK\t%s\n' "$url"; done
```

Expected: the inventory command prints a deduplicated URL list; the HTTP check prints nothing. Open each page afterward to confirm that “in stock,” quantity, and displayed price still match the catalog, because a successful HTTP response does not prove availability.

- [ ] **Step 5: Re-run catalog and budget validation**

Run:

```bash
awk -F '\t' 'NF != 23 { print "bad row", NR, "has", NF, "columns"; bad=1 } END { exit bad }' docs/research/sheng-puer-product-catalog.tsv
cut -f1 docs/research/sheng-puer-product-catalog.tsv | tail -n +2 | sort | uniq -d
awk -F '\t' 'NR>1 { p=$12*$13; q=$14/$10*10; if (p-$14>0.02 || $14-p>0.02) print "EUR mismatch row", NR; if (q-$15>0.02 || $15-q>0.02) print "per-10g mismatch row", NR }' docs/research/sheng-puer-product-catalog.tsv
for tier in essential standard advanced; do awk -F '\t' -v t="$tier" 'NR>1 && $23=="recommended" && $18 ~ ("(^|\\|)" t "(\\||$)") { sum+=$14 } END { printf "%s\t%.2f EUR\n", t, sum }' docs/research/sheng-puer-product-catalog.tsv; done
```

Expected: no malformed rows, duplicate IDs, or arithmetic mismatches; totals match the final guide.

- [ ] **Step 6: Audit the final guide against the spec**

Run:

```bash
test "$(rg -c '^### Flight ([1-9]|1[0-9]|2[0-4]):' docs/research/sheng-puer-educational-program.md)" -eq 24
test "$(rg -c '^#### (Why this flight|Suggested teas|Why these teas|Pay attention to|Limitations|Alternatives|Budget)$' docs/research/sheng-puer-educational-program.md)" -eq 168
rg -n 'TBD|TODO|coming soon|fill in|placeholder|price unknown|link needed' docs/research/sheng-puer-educational-program.md docs/research/sheng-puer-program-research.md
rg -n '^## (How to use this program|Core shopping basket|Core budget summary|Advanced elective flights|Vendor index|Minimal glossary|Sources and confidence)$' docs/research/sheng-puer-educational-program.md
git diff --check
```

Expected: both count checks pass; the red-flag search and whitespace check print nothing; all seven required H2 sections are present.

- [ ] **Step 7: Run repository verification**

```bash
npm test
npm run build
```

Expected: all existing tests pass and Astro completes the production build successfully.

- [ ] **Step 8: Perform a concise editorial pass**

Remove duplicated vendor descriptions, generic tasting advice, post-like narrative, and research detail that belongs in the notebook. Confirm every suggested tea still answers four questions directly: what it is, why it is useful, what is special about it, and what to notice.

- [ ] **Step 9: Commit the verified internal program**

```bash
git add docs/research/sheng-puer-educational-program.md docs/research/sheng-puer-program-research.md docs/research/sheng-puer-product-catalog.tsv
git commit -m "docs: finalize sheng puer educational program"
```

- [ ] **Step 10: Confirm a clean worktree and report the result**

```bash
git status --short
git log -1 --oneline
```

Expected: `git status --short` prints nothing and the latest commit is `docs: finalize sheng puer educational program`.
