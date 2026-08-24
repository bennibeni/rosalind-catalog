import fs from "node:fs";
import path from "node:path";

const DATASETS_DIR = path.join(process.cwd(), "data", "datasets");
const TRUNCATE_AT = 12000; // characters shown before truncating for display

export function getMyInputForSlug(slug) {
  const filePath = path.join(DATASETS_DIR, `${slug}.txt`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const totalChars = raw.length;
  const truncated = totalChars > TRUNCATE_AT;
  const content = truncated ? raw.slice(0, TRUNCATE_AT) : raw;

  return { content, truncated, totalChars };
}

export function myDatasetsDirExists() {
  return fs.existsSync(DATASETS_DIR);
}
