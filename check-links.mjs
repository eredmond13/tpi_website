// Fails the build if an article points at an image or PDF that is not there.
// Runs automatically before every build.
import { readdirSync, readFileSync, existsSync } from "node:fs";

const problems = [];
const dirs = ["articles", "people"];

for (const dir of dirs) {
  let files = [];
  try { files = readdirSync(dir).filter((f) => f.endsWith(".md")); } catch { continue; }
  for (const f of files) {
    const text = readFileSync(`${dir}/${f}`, "utf8");
    for (const key of ["image", "pdf", "photo"]) {
      const m = text.match(new RegExp(`^${key}:\\s*(\\S+)`, "m"));
      if (!m) continue;
      const val = m[1].replace(/^["']|["']$/g, "");
      if (val.startsWith("http")) continue;
      if (!existsSync(val.replace(/^\//, ""))) {
        problems.push(`${dir}/${f}  ->  ${key}: ${val}  (file not found)`);
      }
    }
  }
}

// A person's "group" must match one of the sections on people.html.
// A typo would otherwise make them silently vanish from the site.
const VALID_GROUPS = [
  "Leadership", "Staff", "Senior Fellows",
  "Fellows", "Junior Fellows", "Alumni",
];

try {
  for (const f of readdirSync("people").filter((n) => n.endsWith(".md"))) {
    const text = readFileSync(`people/${f}`, "utf8");
    const m = text.match(/^group:\s*"?([^"\n]+)"?/m);
    if (!m) {
      problems.push(`people/${f}  ->  no "group:" line (add one of: ${VALID_GROUPS.join(", ")})`);
    } else if (!VALID_GROUPS.includes(m[1].trim())) {
      problems.push(`people/${f}  ->  group: "${m[1].trim()}" is not a section. Use one of: ${VALID_GROUPS.join(", ")}`);
    }
  }
} catch {}

// An article's "category" decides whether it lands on News or Publications.
// A typo would otherwise send it silently to the wrong page.
const VALID_CATEGORIES = [
  "News", "Policy analysis", "Event", "Interview",
  "Report", "Op-ed", "Policy brief", "Policy infographic",
];

try {
  for (const f of readdirSync("articles").filter((n) => n.endsWith(".md"))) {
    const text = readFileSync(`articles/${f}`, "utf8");
    const m = text.match(/^category:\s*"?([^"\n]+)"?/m);
    if (!m) {
      problems.push(`articles/${f}  ->  no "category:" line (use one of: ${VALID_CATEGORIES.join(", ")})`);
    } else if (!VALID_CATEGORIES.includes(m[1].trim())) {
      problems.push(`articles/${f}  ->  category: "${m[1].trim()}" is not valid. Use one of: ${VALID_CATEGORIES.join(", ")}`);
    }
  }
} catch {}

if (problems.length) {
  console.error("\nMissing files referenced by content:\n");
  problems.forEach((p) => console.error("  " + p));
  console.error("\nFix the path, or add the missing file, then commit again.\n");
  process.exit(1);
}
console.log("content check passed, every image and PDF exists");
