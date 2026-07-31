# Task 8 final QA report

## Result

Final QA passed at clean tracked HEAD `e07a0c1bb546d79e77637a099a8aecd254c0c7df`.

- `npm run build`: exit 0; Astro built 66 pages. The pre-existing missing `src/content/blog/` collection warning remains. This run also observed the known transient duplicate-ID warning while another Astro development watcher was active; the built Part 1 route and all six route files passed.
- Six-route loop from the brief: `routes=6/6`.
- `git diff --check`: exit 0.
- Local asset audit: 125 embedded root-relative assets, 0 missing.
- Raster/ledger audit: 34 local rasters, each matched exactly one Part-specific image-ledger row; 0 missing or extra rows.
- Caption audit: 29 embedded non-original raster figures; all 29 include creator/institution, a direct source/object URL distinct from any licence URL, rights status, and modification status. The strengthened audit failed on 6 licence-only captions before the fix and passed with 0 failures afterward.
- Evidence audit: the brief's exact `rg` expression returned 221 matching lines. Every exact-date, succession, invention/origin, superlative, and authentication statement was reviewed against the complete source ledger; none remained unmatched or overclaimed.
- Producer equality: all 15 producers have chronology, process, visual language, representative-object or explicit object-evidence ceiling, identification, and evidence-based distinction coverage.
- Mark audit: all 15 identification entries record characters/reading, technique, location, range/context, evidence, and confidence, or explicitly say the reliable field is unknown.
- Navigation: exact previous/next chain passes; Part 6 links back to Part 1.
- Atlas: all 15 `#identifying-*` fragments resolve in built HTML (`atlas_fragments=15 failures=0`).

## Final corrective pass

The bounded final-review fix wave was applied on top of `e07a0c1` and freshly verified on 2026-08-01:

- Part 1's four 1200px text diagrams now use the existing `figure-scroll` pattern with `tabindex="0"`, `role="region"`, and useful `aria-label` values. The built Part 1 HTML contains all four wrappers; no stylesheet change was needed.
- Part 5 metadata no longer implies a documented lost-wax route. Part 6 metadata and its opening evidence box distinguish current brands, production roles, and the documented Ginshodo *utsushi* from historical workshop provenance; the unsupported blanket recasting and “specialist subcontractor” claims were removed.
- `wc -w` now reports Part 4 `4496`, Part 5 `4498`, and Part 6 `4415`. Only repeated regional and attribution guidance outside the equal producer profiles was shortened.
- Parts 4 and 6 use the exact Part 5 navigation title, “Kyoto and Kansai: When the Iron Kettle Became Art Metal.”
- The image-ledger status column now uses only `original SVG`, `public domain`, `licensed reuse`, `permission granted`, and `credit requested / permission unconfirmed`. CC0 and Open Access details remain in credits/notes; the Part 5 candidate row is explicitly unpublished and permission-unconfirmed; the Part 4 filename is exactly `hero.jpg`.
- Fresh verification: `npm run build` exit 0 with 66 pages; routes `6/6`; `git diff --check` exit 0; 34 local rasters match 34 Part-specific ledger rows with 0 failures; 19 permission-unconfirmed rows all say `— (not published)`; 0 noncanonical statuses.

## Concrete fixes verified

- `oitomi-attribution-check.svg`: centered the top question within its teal card; native 1200 × 600 rerender confirms no overflow.
- `oitomi-mark-evidence.svg`: removed literal Markdown asterisks around `Oitomi`; native 1200 × 660 rerender confirms the label is clean.
- Part 1: added the image ledger's `Resized only` disclosure to all 11 externally sourced body-image captions.
- Part 1: linked three Cleveland captions to their exact object records and three Wikimedia captions to their exact Commons file pages; creator/institution, licence, and modification disclosures remain intact.
- The concurrent replacement-image pass also corrected duplicate comparison-photo use and its six affected caption/ledger entries before final QA.

The direct-source caption fix is committed separately as `e07a0c1 fix(tea): link part one image sources`. Earlier scoped fixes are in `a35b263` and `b1f176e`. This report remains deliberately uncommitted.

## Visual verification

All 96 embedded SVGs were rendered with Sharp at their declared native dimensions and inspected in 14 contact sheets, with the series atlas, Takaoka mark panel, and both deferred Oitomi files also inspected individually at native size. No remaining clipping, overflow, literal Markdown, or illegible mark labels were found.

The in-app Browser was unavailable: the documented runtime setup returned `Browser is not available: iab`, bootstrap troubleshooting showed `agent.browsers.list()` as `[]`. The fallback used the local Google Chrome engine against `npm run dev -- --host 127.0.0.1`, at 1440 × 900 and 390 × 844 for every route. Five vertically distributed viewport captures per route/mode were inspected (60 captures, 12 contact sheets). DOM results:

| Part | Desktop width / broken images | Mobile width / broken images |
| --- | --- | --- |
| 1 | 1440 / 0 | 390 / 0 |
| 2 | 1440 / 0 | 390 / 0 |
| 3 | 1440 / 0 | 390 / 0 |
| 4 | 1440 / 0 | 390 / 0 |
| 5 | 1440 / 0 | 390 / 0 |
| 6 | 1440 / 0 | 390 / 0 |

For every view, `documentElement.scrollWidth` equalled the viewport width. Heroes, body width, Japanese text, captions, galleries, tables, SVG labels, focusable horizontal diagram regions, mark text, and series navigation rendered as intended. Detailed SVGs and tables stay legible through their labelled, keyboard-focusable horizontal scroll containers rather than widening the mobile document.

## Rights and link audits

The published six-page HTML contains 117 distinct external `href` URLs. Results:

- Search-results URLs: 0.
- Plain HTTP: only `http://www.seiko-do.com/`. Its HTTPS variants fail hostname validation, so no working HTTPS replacement is available.
- Direct curl status summary: 92 returned 200, 6 returned 403, 9 returned 429, 6 returned 404, and 4 returned 000.
- The six 404s are the not-yet-deployed `strygul.com/tea/tetsubin-history-*` canonical URLs, not source links; all six local built routes pass.
- Three Miyaz/Shobee pages fail TLS validation and the Met *Japanese Bamboo Art* PDF did not complete from this environment (000). The pages remain cited from their direct URLs; their claims were cross-checked in the source ledger.
- The 403/429 responses are access controls/rate limits on direct institutional records, not redirects to search results. No published source URL returned a confirmed 404/410.

## `credit requested / permission unconfirmed` candidates

None of these 18 candidates is published, copied, embedded, or traced:

1. Part 1 — Iwachu / Yasuhiro Ohkawa / Kyoto Women's University: Nambu Tekki Casting photograph.
2. Part 1 — Suzuki Shuzendo / Yasuhiro Ohkawa / Kyoto Women's University: design/pattern-book photograph.
3. Part 1 — Iwachu / Government Public Relations Online: mould-mixing and molten-iron photographs.
4. Part 2 — Suzuki Morihisa / HOJO / Kinari: workshop, product, and mark photographs.
5. Part 2 — Kunzan / HOJO / Fukuskei: workshop, product, and mark photographs.
6. Part 2 — Iwachu: workshop/process, product, and current-mark photographs.
7. Part 2 — Cotogoto / *Kurashi to Oshare no Henshūshitsu*: Kamasada whole-object, detail, process, and mark photographs.
8. Part 2 — supplying workshops / Yasuhiro Ohkawa / Kyoto Women's University: Nambu visual-history photographs.
9. Part 2 — Iwachu / Government Public Relations Online: Government Nambu-feature photographs.
10. Part 2 — Hiroshi Horie / Iwate University: academic `盛久` mark figures.
11. Part 3 — Oigen: history, factory, product, process, and mark photographs.
12. Part 3 — Oitomi and named contributing workshops: history, factory, product, process, artisan, and possible-mark photographs.
13. Part 3 — Iwate Prefectural Museum: Sanwa cooking-stove image.
14. Part 3 — Iwate Tourism Association and credited photographers: Mizusawa/Ōshū ironware photographs.
15. Part 4 — Seikodo / Yamagata export portal / HOJO: workshop, product, process, fitting, and mark photographs.
16. Part 4 — Jeremy Sutton-Hibbert / Kikuchi Hojudo: workshop, product, process, and mark photographs.
17. Part 4 — Chobundo / Yamagata export portal: workshop, product, process, and mark photographs.
18. Part 6 — Koryo Kinjudo, Ginshodo, Shobee/Miyazu, Takaoka Tetsubin, and catalogue/process images.

The Part 5 permission-unconfirmed candidate row is also unpublished; the separate Met hero row is documented as public domain.

## Commands and final state

Commands used include the brief's build, route, evidence, and diff checks; Part-aware Node audits for local assets, raster/ledger equality, captions, navigation, and atlas fragments; native Sharp SVG renders; Chrome DevTools Protocol viewport/DOM checks; and parallel `curl -L` checks of built-page external URLs. The final caption regression audit explicitly excludes `creativecommons.org/licenses/` and `creativecommons.org/publicdomain/` URLs when deciding whether a caption has a source link (`6` failures before; `0` after; `29` captions checked).

Final `git status --short` contains only preserved pre-existing untracked material:

```text
?? .superpowers/
?? docs/superpowers/plans/2026-07-17-agent-research-prompt-post.md
?? docs/superpowers/specs/2026-07-17-agent-research-prompt-design.md
?? src/content/god-is-dead/prompt-engineering-is-not-dead.md
```

The development server and temporary browser session were stopped after QA.
