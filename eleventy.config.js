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

  // Flattens every community update across all newsletters into one list,
  // so the press page builds itself from the issues rather than being
  // maintained separately.
  cfg.addFilter("pressItems", (issues) => {
    const out = [];
    for (const issue of issues) {
      for (const section of issue.data.sections || []) {
        for (const u of section.updates || []) {
          out.push({
            who: u.who,
            what: u.what,
            date: issue.data.date,
            issueTitle: issue.data.title,
            issueUrl: issue.url,
          });
        }
      }
    }
    return out.sort((a, b) => new Date(b.date) - new Date(a.date));
  });

  cfg.addFilter("groupByYear", (items) => {
    const years = {};
    for (const it of items) {
      const y = new Date(it.date).getUTCFullYear();
      (years[y] = years[y] || []).push(it);
    }
    return Object.keys(years).sort((a, b) => b - a).map((year) => ({ year, items: years[year] }));
  });

  cfg.addFilter("monthName", (i) =>
    ["January","February","March","April","May","June",
     "July","August","September","October","November","December"][i]);

  // Turns a name written in a newsletter into a link to that person's
  // profile, when a matching profile exists. Handles titles (Dr., LTC),
  // shortened first names (Greg for Gregory), and "A and B" pairs.
  const normalise = (s) =>
    s
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/\b(dr|prof|professor|ltc|col|lt|mr|mrs|ms)\.?\s+/gi, "")
      .replace(/[^a-z\s]/gi, "")
      .trim().toLowerCase();

  cfg.addFilter("linkPeople", function (who, people) {
    if (!who || !people) return who;

    const index = people.map((p) => {
      const full = normalise(p.data.name);
      const parts = full.split(/\s+/);
      return { slug: p.fileSlug, full, first: parts[0], last: parts[parts.length - 1] };
    });

    const match = (name) => {
      const n = normalise(name);
      const parts = n.split(/\s+/);
      const last = parts[parts.length - 1];
      const first = parts[0];
      let hit = index.find((p) => p.full === n);
      if (hit) return hit;
      // same surname, and one first name starts with the other
      const sameLast = index.filter((p) => p.last === last);
      if (sameLast.length === 1) {
        const p = sameLast[0];
        if (p.first.startsWith(first) || first.startsWith(p.first)) return p;
      }
      return null;
    };

    return who
      .split(/\s+and\s+/i)
      .map((name) => {
        const hit = match(name);
        return hit ? `<a href="${pathPrefix}people.html#${hit.slug}">${name}</a>` : name;
      })
      .join(" and ");
  });

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
