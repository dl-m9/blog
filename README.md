# Blog

Source of https://dl-m9.github.io/blog/, the blog of Senkang Forest Hu.

- `index.html`: the blog index. It lists the posts in `posts.json`, with search and topic filters.
- `posts.json`: one entry per post, newest first.
- `posts/`: posts hosted on this site.
- `assets/post.css` and `assets/post.js`: shared styles and behaviour for hosted posts.
- `templates/post/`: the post template.

Each post keeps its own license and credits.

## Add a post

1. Copy `templates/post/` to `posts/<slug>/`.
2. In `posts/<slug>/index.html`, replace every `POST_...` placeholder, write the body and delete the `noindex` meta tag. Put images in the same folder.
   - The page has a sticky header with a theme switch, a title block, a row of post details, a table of contents and a centred text column.
   - The table of contents, reading time, progress bar and newer/older links are filled in by `assets/post.js`. Every `h2` and `h3` in the body becomes a contents entry.
   - Add the class `wide` to a figure or a `table-wrap` to let it grow past the text column on large screens.
   - The lead image under the title is optional. Uncomment the `hero-figure` block to use it.
3. Add an entry to `posts.json`, in date order:

   ```json
   {
     "title": "Post title",
     "summary": "One sentence.",
     "date": "Nov. 2026",
     "category": "Agentic RL",
     "type": "Article",
     "link": "posts/<slug>/"
   }
   ```

   `category` is the technical topic and drives the filter buttons on the index. `type` is `Article` or `Paper Note`. For a post hosted elsewhere, set `link` to its full URL.

4. Preview with `python3 -m http.server 8002`, then commit and push to `main`.

The MoE handbook under `posts/moe-training-handbook-zh/` is a prebuilt site with its own layout and does not use the template.

The Smol Training Playbook has two local editions:

- `posts/smol-training-playbook-en/`: the complete English original, with its original code, formulas, figures, author list and CC BY 4.0 notice. The static assets and chart datasets are stored with the post. External dataset viewers still load from their original services. `SOURCE.md` records the upstream revision and hosting changes.
- `posts/smol-training-playbook-zh/`: the Simplified Chinese edition. The opening chapters keep the existing prose, and the remaining chapters are now complete. The roadmap links to local chapter anchors. Code, formulas, bibliography titles and interactive chart labels retain their original form.

The Chinese page embeds isolated local figure documents from the English edition's `figures/` directory. `figures.js` and `figures/frame.js` synchronize height and the shared blog theme. Keep both editions together when moving or updating them.

When updating a mirrored article, check the actual asset deployment paths and verify that CSV/JSON responses parse correctly. A missing path on the original Space may return the HTML homepage with HTTP 200. Recheck text coverage, preserved code/formulas, local links and charts before publishing.
