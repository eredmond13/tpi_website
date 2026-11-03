# Cornell Brooks Tech Policy Institute

The Cornell Brooks Tech Policy Institute (TPI) website shares the institute's
research, people, publications, news, interviews, and courses.

**Visit the live website: [techpolicy-tpi.org](https://techpolicy-tpi.org)**

## About this project

This is a static website built with [Eleventy](https://www.11ty.dev/). Website
content is stored in Markdown and JSON files in this repository; there is no
separate database.

- `articles/` contains news, events, interviews, publications, and Signals.
- `people/` contains team profiles.
- `newsletters/` contains archived newsletter issues.
- `_data/` contains site-wide settings, research hub descriptions, and homepage
  highlights.
- `files/` and `pictures/` contain downloadable PDFs and images.

The site builds and deploys to GitHub Pages through GitHub Actions when changes
are pushed to `main`.

## Working locally

Requires Node.js. Install dependencies with `npm ci`, then run:

```sh
npm start
```

To check links and build the site:

```sh
npm run build
```

See [WEBSITE-GUIDE.md](WEBSITE-GUIDE.md) and [PUBLISHING-GUIDE.md](PUBLISHING-GUIDE.md)
for editing and publishing instructions.
