// Anything in this folder is an article. Its category decides whether it
// belongs to News or Publications, which sets the highlighted nav item and
// the "back to" link at the foot of the page.
import { readdirSync } from "node:fs";

const PUBLICATION_CATEGORIES = ["Report", "Op-ed", "Policy brief", "Policy infographic"];

// A photo named after the article is picked up automatically, so adding one is
// just a matter of dropping the file in with the right name. An explicit
// "image:" line in the article always wins.
const PHOTO_DIRS = ["pictures/news", "pictures/publications"];

const byName = {};
for (const dir of PHOTO_DIRS) {
  let files = [];
  try { files = readdirSync(dir); } catch { continue; }
  for (const f of files) {
    if (!/\.(jpe?g|png|webp|avif)$/i.test(f)) continue;
    const slug = f.replace(/\.[a-z0-9]+$/i, "");
    if (!(slug in byName)) byName[slug] = `/${dir}/${f}`;
  }
}

const isInterview = (data) => data.category === "Interview";

const isPublication = (data) =>
  PUBLICATION_CATEGORIES.includes(data.category);

export default {
  layout: "article.njk",
  tags: "article",
  permalink: "/articles/{{ page.fileSlug }}.html",
  eleventyComputed: {
    // An interview's photo lives with the transcript. Its short announcement in
    // the news feed is a separate file, so it borrows the same photo rather
    // than needing a second copy or a second edit.
    image: (data) => {
      if (data.image) return data.image;
      if (byName[data.page.fileSlug]) return byName[data.page.fileSlug];
      if (data.interviewLink) {
        const slug = data.interviewLink.split("/").pop().replace(/\.html$/, "");
        if (byName[slug]) return byName[slug];
      }
      return undefined;
    },
    imageAlt: (data) => data.imageAlt || data.title,
    navId:     (data) => (isPublication(data) ? "publications" : "news"),
    backHref:  (data) =>
      isPublication(data) ? "/publications.html"
      : isInterview(data) ? "/interviews.html"
      : "/news.html",
    backLabel: (data) =>
      isPublication(data) ? "All publications"
      : isInterview(data) ? "All interviews"
      : "All news",
  },
};
