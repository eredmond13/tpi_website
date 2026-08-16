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
  // Photos in the homepage highlight band, and where they point.
try {
  for (const shot of JSON.parse(readFileSync("_data/highlights.json", "utf8"))) {
    const img = (shot.image || "").replace(/^\//, "");
    if (!img) { problems.push(`_data/highlights.json  ->  an entry has no image`); continue; }
    if (!existsSync(img)) {
      problems.push(`_data/highlights.json  ->  image: ${shot.image}  (file not found)`);
    }
    if (!shot.caption) problems.push(`_data/highlights.json  ->  ${shot.image} has no caption`);
    if (!shot.alt) problems.push(`_data/highlights.json  ->  ${shot.image} has no alt description`);
  }
} catch (e) {
  if (e.code !== "ENOENT") problems.push(`_data/highlights.json  ->  ${e.message}`);
}

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

// Every hub named on an article must be a real hub, or the article quietly
// appears on no hub page at all.
const HUBS = JSON.parse(readFileSync("_data/hubs.json", "utf8")).map((h) => h.slug);

// Photos in the homepage highlight band, and where they point.
try {
  for (const shot of JSON.parse(readFileSync("_data/highlights.json", "utf8"))) {
    const img = (shot.image || "").replace(/^\//, "");
    if (!img) { problems.push(`_data/highlights.json  ->  an entry has no image`); continue; }
    if (!existsSync(img)) {
      problems.push(`_data/highlights.json  ->  image: ${shot.image}  (file not found)`);
    }
    if (!shot.caption) problems.push(`_data/highlights.json  ->  ${shot.image} has no caption`);
    if (!shot.alt) problems.push(`_data/highlights.json  ->  ${shot.image} has no alt description`);
  }
} catch (e) {
  if (e.code !== "ENOENT") problems.push(`_data/highlights.json  ->  ${e.message}`);
}

for (const f of readdirSync("people").filter((n) => n.endsWith(".md"))) {
  const text = readFileSync(`people/${f}`, "utf8");
  for (const key of ["hubs", "hubLead"]) {
    const m = text.match(new RegExp(`^${key}:\\s*\\[([^\\]]*)\\]`, "m"));
    if (!m) continue;
    for (const raw of m[1].split(",")) {
      const slug = raw.trim().replace(/^["']|["']$/g, "");
      if (slug && !HUBS.includes(slug)) {
        problems.push(`people/${f}  ->  ${key}: "${slug}" is not a hub. Use one of: ${HUBS.join(", ")}`);
      }
    }
  }
  const leadOnly = text.match(/^hubLead:\s*\[([^\]]*)\]/m);
  const inHubs = text.match(/^hubs:\s*\[([^\]]*)\]/m);
  if (leadOnly && !inHubs) {
    problems.push(`people/${f}  ->  has hubLead but no hubs line. A lead must also be listed in hubs.`);
  }
}

try {
  for (const f of readdirSync("articles").filter((n) => n.endsWith(".md"))) {
    const text = readFileSync(`articles/${f}`, "utf8");
    const hm = text.match(/^hubs:\s*\[([^\]]*)\]/m);
    if (hm) {
      for (const raw of hm[1].split(",")) {
        const slug = raw.trim().replace(/^["']|["']$/g, "");
        if (slug && !HUBS.includes(slug)) {
          problems.push(`articles/${f}  ->  hubs: "${slug}" is not a hub. Use one of: ${HUBS.join(", ")}`);
        }
      }
    }
  }
} catch {}

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
