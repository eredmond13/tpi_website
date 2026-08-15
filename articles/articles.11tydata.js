// Anything in this folder is an article. Its category decides whether it
// belongs to News or Publications, which sets the highlighted nav item and
// the "back to" link at the foot of the page.
const PUBLICATION_CATEGORIES = ["Report", "Op-ed", "Policy brief", "Policy infographic"];

const isInterview = (data) => data.category === "Interview";

const isPublication = (data) =>
  PUBLICATION_CATEGORIES.includes(data.category);

export default {
  layout: "article.njk",
  tags: "article",
  permalink: "/articles/{{ page.fileSlug }}.html",
  eleventyComputed: {
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
