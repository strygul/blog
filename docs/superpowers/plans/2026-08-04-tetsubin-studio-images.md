# Tetsubin Studio Images Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add one representative kettle and one identifying maker-mark image for each of the four studios in Tetsubin History Part 2.

**Architecture:** Download credited source images into the existing post media directory and replace each studio's current single figure with the blog's existing two-up gallery markup. Add one scoped figure-sizing rule because the shared gallery currently sizes only direct image children. Keep identification language conservative and record source/permission status in captions and the image-credits note.

**Tech Stack:** Astro content Markdown, HTML figures, existing blog CSS, local static images.

## Global Constraints

- Do not add dependencies. Limit CSS to one shared `.image-gallery.two-up > figure` rule.
- Credit and link every image source.
- Label workshop, publication, and retailer evidence accurately.
- Treat marks as identification clues, not proof of authenticity or age.
- Note when reuse permission is unconfirmed.

---

### Task 1: Collect and validate eight source images

**Files:**
- Create: `public/tea/posts/tetsubin-history-2-morioka/suzuki-tetsubin.jpg`
- Create: `public/tea/posts/tetsubin-history-2-morioka/suzuki-mark.jpg`
- Create: `public/tea/posts/tetsubin-history-2-morioka/kunzan-tetsubin.jpg`
- Create: `public/tea/posts/tetsubin-history-2-morioka/kunzan-mark.jpg`
- Create: `public/tea/posts/tetsubin-history-2-morioka/iwachu-tetsubin.jpg`
- Create: `public/tea/posts/tetsubin-history-2-morioka/iwachu-mark.png`
- Create: `public/tea/posts/tetsubin-history-2-morioka/kamasada-tetsubin.jpg`
- Create: `public/tea/posts/tetsubin-history-2-morioka/kamasada-mark.jpg`

**Interfaces:**
- Consumes: official workshop, publication, or retailer pages named in the design.
- Produces: eight browser-readable local image files with recorded source URLs.

- [x] **Step 1: Resolve the original image URLs from each source page**

Use these resolved sources:

- Suzuki kettle: official Hinomaru product page; mark: Horie 2019, fig. 7.
- Kunzan kettle: official Natsume Sakura 1.8 L product page; mark: dealer photograph explicitly captioned `薫山の銘`.
- Iwachu kettle: official model 11001 product page; mark: official authenticity page.
- Kamasada kettle and mark: an owner's photographed Akinomi kettle and its `南部 釜定` body mark.

- [x] **Step 2: Download one kettle and one mark image per studio**

Save files with the exact maker-purpose naming pattern above. Do not hotlink.

- [x] **Step 3: Validate the files**

Run:

```bash
file public/tea/posts/tetsubin-history-2-morioka/{suzuki,kunzan,iwachu,kamasada}-{tetsubin,mark}.*
```

Expected: eight valid JPEG, PNG, WebP, or SVG images; no HTML error pages.

### Task 2: Add the studio image pairs

**Files:**
- Modify: `src/content/tea/tetsubin-history-2-morioka.md`
- Modify: `src/styles/blog-post.css`

**Interfaces:**
- Consumes: the eight local images from Task 1 and the existing `.image-gallery` styles.
- Produces: four accessible two-up galleries and an updated image-rights note.

- [x] **Step 1: Replace each studio's existing figure**

Use this existing repository pattern:

```html
<div class="image-gallery two-up" role="group" aria-label="Suzuki Morihisa tetsubin and maker marks">
  <figure class="full-size">
    <img src="/tea/posts/tetsubin-history-2-morioka/suzuki-tetsubin.jpg" alt="Suzuki Morihisa Hinomaru tetsubin" loading="lazy" decoding="async" />
    <figcaption>The small <em>Hinomaru</em> tetsubin, designed by the thirteenth Suzuki Morihisa. Photo: <a href="https://suzukimorihisa.com/en/products/%E6%97%A5%E3%81%AE%E4%B8%B8%E5%BD%A2%E9%89%84%E7%93%B6-%E5%B0%8F">Suzuki Morihisa Studio</a>.</figcaption>
  </figure>
  <figure class="full-size">
    <img src="/tea/posts/tetsubin-history-2-morioka/suzuki-mark.jpg" alt="Published Suzuki Morihisa marks reading Morihisa" loading="lazy" decoding="async" />
    <figcaption>Published <code>盛久</code> marks associated with the thirteenth head (left) and fourteenth (right). Source: <a href="https://www.jstage.jst.go.jp/article/sfj/70/5/70_255/_pdf/-char/ja">Horie 2019, fig. 7</a>. A match is a clue, not proof.</figcaption>
  </figure>
</div>

<div class="image-gallery two-up" role="group" aria-label="Kunzan tetsubin and maker mark">
  <figure class="full-size">
    <img src="/tea/posts/tetsubin-history-2-morioka/kunzan-tetsubin.jpg" alt="Kunzan Natsume-form tetsubin with cherry-blossom decoration" loading="lazy" decoding="async" />
    <figcaption>The 1.8-litre <em>Natsume Sakura</em> tetsubin. Photo: <a href="https://nanbu93.jp/products/natsume-gata-sakura-1-8l">Kunzan</a>.</figcaption>
  </figure>
  <figure class="full-size">
    <img src="/tea/posts/tetsubin-history-2-morioka/kunzan-mark.jpg" alt="Seller-attributed Kunzan body mark beneath a tetsubin" loading="lazy" decoding="async" />
    <figcaption><a href="https://hurumono.net/2024/04/03/buy-tetsubinn/">An antique dealer</a> identifies the square body stamp as <code>薫山</code>. The dealer's historical account conflicts with workshop sources, so this is seller attribution, not independent authentication.</figcaption>
  </figure>
</div>

<div class="image-gallery two-up" role="group" aria-label="Iwachu tetsubin and maker stamp">
  <figure class="full-size">
    <img src="/tea/posts/tetsubin-history-2-morioka/iwachu-tetsubin.jpg" alt="Iwachu 23-type Nambu-form arare tetsubin" loading="lazy" decoding="async" />
    <figcaption>Iwachu's model 11001, a 23-type Nambu-form arare tetsubin. Photo: <a href="https://iwachu.co.jp/en/products/11001">Iwachu</a>.</figcaption>
  </figure>
  <figure class="full-size">
    <img src="/tea/posts/tetsubin-history-2-morioka/iwachu-mark.png" alt="Official Iwachu rectangular stamp reading Iwachu in Japanese" loading="lazy" decoding="async" />
    <figcaption>One current official <code>岩鋳</code> stamp. Iwachu presents it as a quality mark but does not supply a dating sequence. Photo: <a href="https://iwachu.co.jp/en/pages/about-us">Iwachu authenticity page</a>.</figcaption>
  </figure>
</div>

<div class="image-gallery two-up" role="group" aria-label="Kamasada tetsubin and maker mark">
  <figure class="full-size">
    <img src="/tea/posts/tetsubin-history-2-morioka/kamasada-tetsubin.jpg" alt="Kamasada Akinomi large-arare tetsubin photographed from the front" loading="lazy" decoding="async" />
    <figcaption>An owner's Kamasada <em>Akinomi</em> large-arare tetsubin. Photo: <a href="https://fishingandcoffee.com/?p=7370">FISH&amp;CO.</a></figcaption>
  </figure>
  <figure class="full-size">
    <img src="/tea/posts/tetsubin-history-2-morioka/kamasada-mark.jpg" alt="Kamasada body mark below the spout reading Nambu Kamasada" loading="lazy" decoding="async" />
    <figcaption>The same kettle below the spout, where the raised mark reads <code>南部 釜定</code>—<em>Nambu Kamasada</em>. Photo: <a href="https://fishingandcoffee.com/?p=7370">FISH&amp;CO.</a></figcaption>
  </figure>
</div>
```

- [x] **Step 2: Equalize the captioned gallery columns**

Add this shared rule:

```css
.image-gallery.two-up > figure {
	flex: 1 1 18rem;
	min-width: 16rem;
	margin: 0;
	text-align: center;
}
```

- [x] **Step 3: Update the image-credit paragraph**

Replace the claim that unlicensed images were not reproduced with a concise disclosure that identified copyrighted images are credited and reproduced for editorial identification, with reuse permission unconfirmed where stated.

- [x] **Step 4: Check local references and formatting**

Run:

```bash
rg -n "-(tetsubin|mark)\." src/content/tea/tetsubin-history-2-morioka.md
git diff --check
```

Expected: eight local image references and no whitespace errors.

### Task 3: Build and publish the branch

**Files:**
- Verify: all files created or modified in Tasks 1-2.

**Interfaces:**
- Consumes: completed article and images.
- Produces: a passing build and an updated remote draft PR.

- [x] **Step 1: Run the production build**

```bash
npm run build
```

Expected: exit code 0.

- [ ] **Step 2: Review the final diff and commit**

```bash
git diff --check
git status --short
git add src/content/tea/tetsubin-history-2-morioka.md src/styles/blog-post.css public/tea/posts/tetsubin-history-2-morioka docs/superpowers/plans/2026-08-04-tetsubin-studio-images.md docs/superpowers/specs/2026-08-04-tetsubin-studio-images-design.md
git commit -m "edit(tea): add tetsubin studio identification images"
```

- [ ] **Step 3: Push the existing branch**

```bash
git push
```

Expected: the open draft PR updates successfully.
