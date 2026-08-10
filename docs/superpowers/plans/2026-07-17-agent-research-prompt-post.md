# Agent Research Prompt Post Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a source-linked `god-is-dead` post about research-agent orchestration.

**Architecture:** Add one Markdown content entry using the existing `god-is-dead` collection. The post is self-contained and needs no site code or assets; Astro validates frontmatter and renders it through the existing collection route.

**Tech Stack:** Astro content collections, Markdown, npm build.

## Global Constraints

- Create only one post; add no components, styles, assets, or dependencies.
- Attribute the proof claim to the published prompt/document.
- Say "up to 64 agents" and "at least eight hours"; do not repeat the supplied one-hour claim.
- Use direct first-person prose with light sectioning and a source link to the full prompt.

---

### Task 1: Draft the research-agent post

**Files:**
- Create: `src/content/god-is-dead/prompt-engineering-is-not-dead.md`
- Test: `npm run build`

**Interfaces:**
- Consumes: `godIsDead` schema in `src/content.config.ts`, which requires `title`, `description`, `pubDate`, and `category`.
- Produces: A Markdown entry available at `/god-is-dead/prompt-engineering-is-not-dead/`.

- [x] **Step 1: Add the frontmatter and article**

```markdown
---
title: "Prompt Engineering Is Not Dead"
pubDate: "2026-07-17"
category: "AI"
description: "For difficult agentic work, prompt engineering is process design."
---
```

Write the article beneath this frontmatter. Open personally, use a short practical list for the orchestration lessons, close by arguing that hard prompting is process design, and link to the supplied OpenAI PDF.

- [x] **Step 2: Build the site**

Run: `npm run build`

Expected: exit code 0 and Astro reports the production build completed.

- [ ] **Step 3: Commit**

```bash
git add src/content/god-is-dead/prompt-engineering-is-not-dead.md docs/superpowers/plans/2026-07-17-agent-research-prompt-post.md
git commit -m "feat: add agent research prompt post"
```
