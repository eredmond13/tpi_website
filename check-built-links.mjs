// Runs after the build. Catches internal links that were written without the
// url filter, which work locally but 404 once the site is served from a
// subfolder. This is easy to miss by eye and impossible to miss here.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const prefix = process.env.PATH_PREFIX || "/";
if (prefix === "/") {
  console.log("link check skipped (no path prefix set)");
  process.exit(0);
}

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith(".html") ? [p] : [];
  });

const problems = [];
for (const file of walk("_site")) {
  const html = readFileSync(file, "utf8");
  for (const m of html.matchAll(/(href|src|data)="(\/[^"]*)"/g)) {
    if (m[2].startsWith(prefix)) continue;
    problems.push(`${file.replace("_site/", "")}  ->  ${m[1]}="${m[2]}"`);
  }
}

// A link can carry the right prefix and still point at a page that was never
// generated, usually because a .md file did not get committed. That 404s
// silently, so check every internal target actually exists on disk.
const dead = [];
const exists = (p) => {
  const rel = p.replace(prefix, "").split(/[?#]/)[0];
  if (!rel || rel.endsWith("/")) return true;
  try { statSync(join("_site", rel)); return true; } catch { return false; }
};

for (const file of walk("_site")) {
  const html = readFileSync(file, "utf8");
  for (const m of html.matchAll(/href="([^"]*\.(?:html|pdf))"/g)) {
    const target = m[1];
    if (!target.startsWith(prefix)) continue;
    if (!exists(target)) dead.push(`${file.replace("_site/", "")}  ->  ${target}`);
  }
}

if (dead.length) {
  console.error(`\n${dead.length} link(s) point at a page or file that does not exist:\n`);
  [...new Set(dead)].forEach((p) => console.error("  " + p));
  console.error("\nUsually a .md file that was not committed. Add the file, then commit again.\n");
  process.exit(1);
}

if (problems.length) {
  console.error(`\n${problems.length} internal link(s) missing the "${prefix}" prefix:\n`);
  [...new Set(problems)].forEach((p) => console.error("  " + p));
  console.error('\nWrap the path in the url filter, like {{ "/people.html" | url }}\n');
  process.exit(1);
}
console.log("link check passed, every internal link is correctly prefixed");
