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

  // Arranges newsletter issues into a year-by-month grid, newest year first.
  // Months with no issue come back empty so the gaps stay visible.
  cfg.addFilter("byYearAndMonth", (issues) => {
    const years = {};
    for (const issue of issues) {
      const d = new Date(issue.data.date);
      const y = d.getUTCFullYear();
      years[y] = years[y] || Array.from({ length: 12 }, () => null);
      years[y][d.getUTCMonth()] = issue;
    }
    return Object.keys(years)
      .sort((a, b) => b - a)
      .map((year) => ({ year, months: years[year] }));
  });

  cfg.addFilter("monthName", (i) =>
    ["January","February","March","April","May","June",
     "July","August","September","October","November","December"][i]);

  cfg.addFilter("monthShort", (i) =>
    ["Jan","Feb","Mar","Apr","May","Jun",
     "Jul","Aug","Sep","Oct","Nov","Dec"][i]);

  return {
    pathPrefix,
    dir: { input: ".", includes: "_includes", data: "_data", output: "_site" },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
}
