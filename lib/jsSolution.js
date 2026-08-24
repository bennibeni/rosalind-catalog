import fs from "node:fs";
import path from "node:path";

// Unlike data/scripts/ (Python, synced from an external project and
// gitignored-or-not depending on privacy choices), JS solutions are
// first-class, hand-written source code that lives in the repo like
// content/*.md - so they live in public/js-solutions/, served directly
// as static assets and dynamically importable client-side by URL,
// exactly like any other public file.
const JS_SOLUTIONS_DIR = path.join(process.cwd(), "public", "js-solutions");

export function getJsSolutionForSlug(slug) {
  const filePath = path.join(JS_SOLUTIONS_DIR, `${slug}.mjs`);
  if (!fs.existsSync(filePath)) return null;

  return {
    source: fs.readFileSync(filePath, "utf-8"),
    modulePath: `/js-solutions/${slug}.mjs`,
  };
}
