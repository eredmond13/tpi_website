// PATH_PREFIX lets the same code work in three places:
//   local preview      ->  /
//   GitHub Pages       ->  /BTPIWebsite/
//   a custom domain    ->  /
// The deploy workflow sets it. Nothing here needs editing day to day.
const pathPrefix = process.env.PATH_PREFIX || "/";

export default function (cfg) {
  cfg.addPassthroughCopy("pictures");
  cfg.addPassthroughCopy("files");
  cfg.addPassthroughCopy("styles.css");
  cfg.addPassthroughCopy("script.js");
  cfg.addPassthroughCopy(".nojekyll");

  cfg.addFilter("byOrder", (a) =>
    [...a].sort((x, y) => (x.data.order || 99) - (y.data.order || 99)));

  cfg.addFilter("newest", (a) =>
    [...a].sort((x, y) => new Date(y.data.date) - new Date(x.data.date)));

  cfg.addFilter("limit", (a, n) => a.slice(0, n));

  cfg.addFilter("readableDate", (d) =>
    new Date(d).toLocaleDateString("en-US",
      { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }));

  cfg.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));

  return {
    pathPrefix,
    dir: { input: ".", includes: "_includes", data: "_data", output: "_site" },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
}
