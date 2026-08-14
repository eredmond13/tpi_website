// Fails the build if an article points at an image or PDF that is not there.
// Runs automatically before every build.
import { readdirSync, readFileSync, existsSync } from "node:fs";

const problems = [];
const dirs = ["articles", "people", "publications"];

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

if (problems.length) {
  console.error("\nMissing files referenced by content:\n");
  problems.forEach((p) => console.error("  " + p));
  console.error("\nFix the path, or add the missing file, then commit again.\n");
  process.exit(1);
}
console.log("content check passed, every image and PDF exists");
