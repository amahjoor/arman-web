# Personal Website

Repo for my personal website at [mahjoor.com](https://mahjoor.com). Simple HTML/CSS/JS with blog posts.

## Add a Blog Post

1. Create `.md` file in `posts-md/`:
```
title: My Post
date: November 4, 2025
status: done
---
Write content in **markdown**. Tables, links, formatting supported.

| Column 1 | Column 2 |
|----------|----------|
| Data     | More     |

Set status to `draft` to skip generating HTML.
```

2. Run: `node script.js`

3. Commit everything

## Folders

- `posts-txt/` - Edit these (.md files)
- `posts-html/` - Auto-generated, don't edit
- `template.html` - Change design here

