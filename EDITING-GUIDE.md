# Editing the TPI website

Everything you normally change is plain text. You do not need to know HTML.

## The eight main pages

Same names Sarah used, same meaning.

| File | Page |
|---|---|
| `index.html` | Homepage |
| `about.html` | About |
| `people.html` | People and team |
| `research.html` | Research Hubs |
| `projects.html` | Projects |
| `publications.html` | Publications |
| `events.html` | Events and Courses |
| `news.html` | News and Policy |

## Making a change on GitHub

1. Open the repository and sign in.
2. Click the file you want to change.
3. Click the pencil icon near the top right.
4. Edit the text.
5. Click **Commit changes** and write a short description.
6. Wait about a minute. The site rebuilds and publishes itself.

Step 6 is the only thing that is new. Under the **Actions** tab you will see a
green tick when it has published. A red X means something needs fixing, and
the live site keeps showing the previous version until it is sorted.

## Adding a news article

Create one new file in the `articles` folder. Name it with dashes and end it
with `.md`, for example `arctic-security-simulation.md`.

```
---
title: TPI simulation tests Arctic technology and security risks
date: 2026-08-14
category: News
author: Fiona Neibart
summary: One or two sentences that appear in the news list.
image: /assets/news/arctic.jpg
imageAlt: Description of the photo for screen readers
---

Write the article here. Leave a blank line between paragraphs.

## A subheading if you want one

More text. Add a [link like this](https://example.com).
```

That is all. The article page, the entry on `news.html`, and the homepage list
all update by themselves. There is no second place to edit.

`author`, `image`, and `imageAlt` can be left out if you do not have them.

## Adding a short post with a PDF

This is the common case. A hundred words on the page, then the Canva PDF.

1. Put the PDF in the `files` folder, named in lowercase with dashes, for
   example `arctic-security-brief.pdf`.
2. Put the photo you want to use in `assets/news/`.
3. Create a matching file in `articles`, for example `arctic-security-brief.md`.

```
---
title: Arctic Security and Emerging Technology
date: 2026-08-14
category: Policy brief
author: Paul Lushenko
summary: One or two sentences for the news list.
image: /assets/news/arctic-workshop.jpg
imageAlt: Researchers around a table at the Svalbard workshop
pdf: /files/arctic-security-brief.pdf
pdfPages: 18
pdfSize: 2.4 MB
---

Two or three short paragraphs of context here. This is what people read
before they decide whether to open the document.
```

The page shows the photo, your text, then Open and Download links with the
PDF inline underneath on desktop.

`image` is the photo used on the page and in the news list. It is a normal
editorial photo, not a picture of the PDF.

`author`, `pdfPages`, and `pdfSize` can all be left out. The page sizes tell
people what they are about to open, which is a courtesy on a slow connection.

### Keeping PDFs a sensible size

Canva exports are often larger than they need to be. Under 25 MB is
comfortable. GitHub refuses anything over 100 MB outright. For something large
like an annual report, upload it to Cornell Box and put the Box address on the
`pdf` line instead of a local path. Everything else works the same.

### If you mistype a file name

The build checks every image and PDF before publishing. If one is missing you
get a message naming the file and the line, and the live site keeps showing
the previous version until you fix it.

## Adding a person

Create a file in the `people` folder, for example `jane-doe.md`.

```
---
name: Jane Doe
role: Research Fellow
photo: /pictures/JaneDoe.png
order: 5
---

Her biography goes here.
```

`order` controls where she appears. Lower numbers come first.

## Writing text

This is Markdown. The whole vocabulary you need:

```
## A heading

A normal paragraph. Leave a blank line between paragraphs.

**bold** and *italic*

- a bullet
- another bullet

[link text](https://example.com)
```

Nothing needs closing. There is no `</p>` to worry about.

## The block between the --- lines

This is the one part that must be exact. Label, colon, space, value, one per
line. If a title contains a colon, wrap the whole value in quotes:

```
title: "Standards: a new front"
```

Most build failures come from a mistake here.

## Files you should not need to touch

- `_includes/base.njk` — the header and footer, defined once for every page
- `_data/site.json` — navigation menu and footer links
- `styles.css` — all colours, fonts, and layout
- `script.js` — menus, search, and animation
- `eleventy.config.js` — build settings

To add or rename a menu item, edit the `nav` section of `_data/site.json`.
That is the only place the menu exists.

## Large files

Keep PDFs under about 25 MB in the `files` folder. GitHub refuses anything
over 100 MB. For anything larger, upload it to Cornell Box and link to it.

## Previewing on your own computer

Install Node.js once, then in the project folder:

```
npm install
npm start
```

Open the address it prints. The page reloads as you save.
