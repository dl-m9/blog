# AGENTS.md

## Scope

These instructions apply to everything in this repository. The parent `06_CV/AGENTS.md` also applies. When rules conflict, this file takes precedence.

## Project Overview

This is the blog of Senkang Forest Hu, a static site with no build step.

- Repository: `dl-m9/blog`, branch `main`, served by GitHub Pages at https://dl-m9.github.io/blog/.
- The homepage is a separate repository, `dl-m9/dl-m9.github.io`, at `../01_homepage`. Paper project pages stay there under `paper-pages/`. Do not move them here.
- `.nojekyll` must stay. The MoE post uses an `_astro/` folder that Jekyll would drop.

## Directory Map

- `index.html`: the blog index. Single column, posts grouped by year, with search and topic filters. It reads `posts.json`.
- `posts.json`: one entry per post, newest first. This is the source of truth for the post list.
- `posts/<slug>/`: posts hosted on this site.
- `templates/post/`: the post template. It keeps a `noindex` meta tag that each new post must delete.
- `assets/post.css` and `assets/post.js`: styles and behaviour shared by the index and the posts (colours, header bar, theme switch, table of contents, reading time, progress bar, newer and older links).
- `posts/moe-training-handbook-zh/`: a prebuilt Astro page wrapped in the template header and footer. Its layout overrides live in the inline `<style id="moe-template-overrides">` block. Do not rebuild it or edit files under `_astro/`.
- `README.md`: steps for adding a post. Keep it in sync when the workflow changes.

## Content Rules

- Preserve exact titles, author names, dates and URLs. Do not infer missing facts.
- `posts.json` fields are `title`, `summary`, `date`, `category`, `type` and `link`.
  - `date` uses the form `Nov. 2026` or `May 2026`.
  - `category` is the technical topic and drives the filter buttons. Reuse an existing category when one fits.
  - `type` is `Article` or `Paper Note`.
  - `link` is a path relative to the repository root for hosted posts, or a full URL for posts hosted elsewhere.
- Do not use the word "translation" in the index, in summaries or in type labels.
- Do not use semicolons, em dashes or en dashes in newly written prose.
- Do not add an RSS feed. The user declined it.

## Third-Party Content

- Host someone else's article here only when it carries a license that allows it, or the authors have given permission. Otherwise add a `posts.json` entry that links to the original.
- A hosted third-party post keeps its authors, source link and license notice on the page. Do not remove or shorten these credits. The credit line in the MoE post footer stays as it is.
- The line crediting the research article template was removed from the MoE post at the user's request. Do not add it back unless asked.

## Design Rules

- The index and the posts share one look: IBM Plex Sans, the colour tokens in `assets/post.css`, and the same header bar.
- Lines such as the header border span the page. Text stays inside the content width through the `.frame` class.
- The index content width is `780px`, set by `--frame` in `index.html`. Posts use `--frame: 948px` and `--measure: 680px`.
- Both light and dark themes must work. The theme choice is stored under the `blog-theme` key and is shared by all pages.
- Keep the site dependency free. Do not add frameworks, bundlers or a build step for a content change.

## Workflow

1. Run `git status` first and preserve unrelated user changes.
2. To add a post, follow `README.md`.
3. Validate `posts.json` after editing it with `python3 -m json.tool posts.json`.
4. For a layout or design change, preview locally and wait for the user's approval before pushing. The preview server is the `blog` entry in `../../.claude/launch.json`, on port 8002.
5. For a small content change, commit and push in the same turn unless the user asks to hold it.
6. Run `git pull --rebase` before pushing. Never force-push.
7. Do not add `Co-Authored-By` or other attribution lines to commit messages.
8. After a push, confirm the deploy with `gh api repos/dl-m9/blog/pages/builds/latest` and check the live page.

## Communication

- Reply to the user in simplified Chinese, short and direct.
- In the final response, name the files changed, the commit hash and which checks were completed.
