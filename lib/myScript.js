import fs from "node:fs";
import path from "node:path";

const SCRIPTS_DIR = path.join(process.cwd(), "data", "scripts");
const MANIFEST_PATH = path.join(SCRIPTS_DIR, "manifest.json");

let _manifestCache;

function getManifest() {
  if (_manifestCache !== undefined) return _manifestCache;
  if (!fs.existsSync(MANIFEST_PATH)) {
    _manifestCache = null;
    return null;
  }
  _manifestCache = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf-8"));
  return _manifestCache;
}

// Returns the exact Python source and the FULL (never truncated) input
// content needed to actually execute it - deliberately independent from
// lib/myInput.js, whose truncation is a display-only concern and would
// silently corrupt a real execution if reused here.
export function getMyScriptForSlug(slug) {
  const scriptPath = path.join(SCRIPTS_DIR, `${slug}.py`);
  if (!fs.existsSync(scriptPath)) return null;

  const source = fs.readFileSync(scriptPath, "utf-8");
  const manifest = getManifest();
  const entry = manifest?.[slug] ?? {};

  const inputFilename = entry.inputFilename ?? null;
  const inputPath = inputFilename ? path.join(SCRIPTS_DIR, `${slug}.input`) : null;
  const inputContent =
    inputPath && fs.existsSync(inputPath) ? fs.readFileSync(inputPath, "utf-8") : null;

  return {
    source,
    inputFilename,
    inputContent,
    notRunnableReason: entry.notRunnableReason ?? null,
  };
}

export function myScriptsDirExists() {
  return fs.existsSync(SCRIPTS_DIR);
}
