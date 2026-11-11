# AGENTS.md

## 适用范围

本文件适用于本仓库的所有内容。上一级的 `06_CV/AGENTS.md` 同样适用。两者冲突时，以本文件为准。

## 项目概况

这是 Senkang Forest Hu 的博客，纯静态站点，没有构建步骤。

- 仓库：`dl-m9/blog`，分支 `main`，由 GitHub Pages 发布在 https://dl-m9.github.io/blog/。
- 主页是另一个仓库 `dl-m9/dl-m9.github.io`，位于 `../01_homepage`。论文介绍页留在主页仓库的 `paper-pages/` 下，不要搬到这里。
- `.nojekyll` 必须保留。MoE 那篇文章用到 `_astro/` 文件夹，没有这个文件 Jekyll 会把它丢掉。

## 目录说明

- `index.html`：博客首页。单栏布局，文章按年份分组，带搜索和主题筛选。数据来自 `posts.json`。
- `posts.json`：每篇文章一条，最新的在前。文章列表以它为准。
- `posts/<slug>/`：托管在本站的文章。
- `templates/post/`：文章模板。模板里有一个 `noindex` 标签，新文章必须删掉。
- `assets/post.css` 和 `assets/post.js`：首页和文章共用的样式与行为（配色、顶栏、主题切换、目录、阅读时长、进度条、上一篇和下一篇）。
- `posts/moe-training-handbook-zh/`：预先构建好的 Astro 页面，外面套了模板的页头和页脚。它的布局覆盖写在页内的 `<style id="moe-template-overrides">` 里。不要重新构建，也不要改 `_astro/` 下的文件。
- `README.md`：添加文章的步骤。流程有变化时同步更新。

## 内容规则

- 标题、作者姓名、日期和链接保持原样。不要推测缺失的信息。
- `posts.json` 的字段是 `title`、`summary`、`date`、`category`、`type` 和 `link`。
  - `date` 写成 `Nov. 2026` 或 `May 2026` 这种形式。
  - `category` 是技术主题，决定首页的筛选按钮。有合适的现有分类就复用。
  - `type` 只用 `Article` 或 `Paper Note`。
  - `link`：本站文章写相对仓库根目录的路径，站外文章写完整链接。
- 首页、摘要和类型标签里不要出现 "translation" 这个词。
- 新写的英文正文不要用分号、长破折号和短破折号。
- 不要加 RSS，用户已明确不要。

## 第三方内容

- 别人的文章只有在带有允许转载的许可，或者作者已经同意时，才托管到本站。否则只在 `posts.json` 里加一条指向原文的链接。
- 托管的第三方文章要在页面上保留作者、原文链接和许可说明。不要删除或缩短这些署名。MoE 文章页脚的署名保持现状。
- MoE 文章里注明页面模板来源的那一行，已按用户要求删除。没有要求不要加回去。

## 设计规则

- 首页和文章共用一套外观：IBM Plex Sans 字体、`assets/post.css` 里的配色变量、同一个顶栏。
- 顶栏下边线这类线条横贯整个页面。文字通过 `.frame` 类留在内容宽度内。
- 首页内容宽度是 `780px`，由 `index.html` 里的 `--frame` 设置。文章页用 `--frame: 948px` 和 `--measure: 680px`。
- 明暗两种主题都要正常。主题选择存在 `blog-theme` 这个键下，所有页面共用。
- 保持零依赖。不要为了改内容引入框架、打包工具或构建步骤。

## 工作流程

1. 先运行 `git status`，保留与当前任务无关的用户改动。
2. 添加文章时按 `README.md` 的步骤做。
3. 改完 `posts.json` 后用 `python3 -m json.tool posts.json` 校验。
4. 改布局或设计时，先本地预览，等用户确认后再推送。预览服务是 `../../.claude/launch.json` 里的 `blog`，端口 8002。
5. 小的内容改动在同一轮里提交并推送，除非用户要求先不推。
6. 推送前运行 `git pull --rebase`。不要强制推送。
7. 提交信息里不要加 `Co-Authored-By` 之类的署名行。
8. 推送后用 `gh api repos/dl-m9/blog/pages/builds/latest` 确认部署完成，并检查线上页面。

## 文档语言

- 本文件用简体中文写。以后新建或修改任何 `AGENTS.md`，都用简体中文。

## 沟通

- 用简体中文回复用户，简短直接。
- 最后的回复里写明改了哪些文件、提交哈希，以及做了哪些检查。
