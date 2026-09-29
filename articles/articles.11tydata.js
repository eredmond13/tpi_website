// Anything in this folder is an article. Its category decides whether it
// belongs to News or Publications, which sets the highlighted nav item and
// the "back to" link at the foot of the page.
import { readdirSync, readFileSync } from "node:fs";

const PUBLICATION_CATEGORIES = ["Report", "Op-ed", "Policy brief", "Policy infographic"];

// A photo named after the article is picked up automatically, so adding one is
// just a matter of dropping the file in with the right name. An explicit
// "image:" line in the article always wins.
const PHOTO_DIRS = ["pictures/news", "pictures/publications", "pictures/signals"];

// Author lookup. A piece's author line is matched against the people files so
// the role shows beside the name and links to that person's profile. Nothing
// to keep in step by hand, and an outside author simply falls through.
const PEOPLE = {};
try {
  for (const f of readdirSync("people")) {
    if (!f.endsWith(".md")) continue;
    const text = readFileSync(`people/${f}`, "utf8");
    const name = (text.match(/^name:\s*"?([^"\n]+)"?/m) || [])[1];
    const role = (text.match(/^role:\s*"?([^"\n]+)"?/m) || [])[1];
    if (!name) continue;
    const key = name.trim().replace(/^(Dr\.|Prof\.|Mr\.|Ms\.|Mrs\.|Lt\. Col\.|Maj\.|Col\.|Gen\.)\s+/i, "").toLowerCase();
    PEOPLE[key] = { slug: f.replace(/\.md$/, ""), role: role ? role.trim() : "" };
  }
} catch {}

const lookupAuthor = (name) =>
  name ? PEOPLE[name.trim().replace(/^(Dr\.|Prof\.|Mr\.|Ms\.|Mrs\.|Lt\. Col\.|Maj\.|Col\.|Gen\.)\s+/i, "").toLowerCase()] : undefined;

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

// Signals sit under Publications in the menu but have their own listing. A
// piece is either a short note, the default, or a longer column.
const isSignal = (data) => data.category === "Signals";
const isColumn = (data) => data.format === "column";

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
    authorRole: (data) => data.authorRole || (lookupAuthor(data.author) || {}).role || "",
    authorSlug: (data) => (lookupAuthor(data.author) || {}).slug || "",
    // A column says so above its headline. A note simply says Signals.
    kicker: (data) =>
      isSignal(data) ? (isColumn(data) ? "Signals · Column" : "Signals")
      : data.category,
    navId:     (data) =>
      isSignal(data) ? "signals"
      : isPublication(data) ? "publications"
      : "news",
    backHref:  (data) =>
      isSignal(data) ? "/signals.html"
      : isPublication(data) ? "/publications.html"
      : isInterview(data) ? "/interviews.html"
      : "/news.html",
    backLabel: (data) =>
      isSignal(data) ? "All Signals"
      : isPublication(data) ? "All publications"
      : isInterview(data) ? "All interviews"
      : "All news",
  },
};
