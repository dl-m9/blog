# Blog

Source of https://dl-m9.github.io/blog/, the blog of Senkang Forest Hu.

- `index.html`: the blog index. It lists the posts in `posts.json`.
- `posts.json`: one entry per post, newest first.
- `posts/`: posts hosted on this site.
- `assets/post.css`: shared styles for hosted posts.
- `templates/post/`: the post template.

Each post keeps its own license and credits.

## Add a post

1. Copy `templates/post/` to `posts/<slug>/`.
2. In `posts/<slug>/index.html`, replace every `POST_...` placeholder, write the body and delete the `noindex` meta tag. Put images in the same folder.
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

   `category` is the technical topic and drives the filter buttons on the index. `type` is one of `Article`, `Paper Note` or `Translation`. For a post hosted elsewhere, set `link` to its full URL.

4. Preview with `python3 -m http.server 8002`, then commit and push to `main`.

The MoE handbook under `posts/moe-training-handbook-zh/` is a prebuilt site with its own layout and does not use the template.
