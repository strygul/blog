# Tetsubin Part 1 Voice Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite Part 1 as a lively, personal investigation while preserving its sourced history.

**Architecture:** Change only the prose in the existing Markdown post. Preserve frontmatter, facts, links, figures, captions, diagrams, heading hierarchy, and asset paths; verify through Astro's existing static build.

**Tech Stack:** Astro content collections, Markdown, HTML figures

## Global Constraints

- First person may describe only the real research journey.
- Do not invent ownership, travel, conversations, handling, tasting, or firsthand tetsubin experience.
- Keep the article's evidence, citations, images, captions, and chronology intact.
- Prefer short paragraphs, concrete images, direct reader address, and decisive transitions.

---

### Task 1: Rewrite and Verify the Article

**Files:**
- Modify: `src/content/tea/tetsubin-history-1-birth-of-the-iron-kettle.md`

**Interfaces:**
- Consumes: the approved voice brief and the post's existing sourced claims
- Produces: the same Astro content entry with revised narrative prose

- [ ] **Step 1: Rewrite the opening and section prose**

Make HOJO the starting point of the investigation, build the narrative around the mismatch between old casting traditions and the younger kettle, and turn each section into a discovery. Keep structured HTML and source links unchanged.

- [ ] **Step 2: Check factual and structural preservation**

Run: `rg -n '^## |href=|src=' src/content/tea/tetsubin-history-1-birth-of-the-iron-kettle.md`

Expected: eight title-case section headings and all existing figure/link targets remain present.

- [ ] **Step 3: Build the site**

Run: `npm run build`

Expected: Astro reports `Complete!` and generates `/tea/tetsubin-history-1-birth-of-the-iron-kettle/index.html`.

- [ ] **Step 4: Review and publish**

Run: `git diff --check` and inspect the article diff for invented experiences, lost claims, or unrelated changes. Commit the prose rewrite, remove the temporary planning documents from the final PR diff, and push the branch.
