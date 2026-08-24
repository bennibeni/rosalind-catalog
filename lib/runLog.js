import fs from "node:fs";
import path from "node:path";
import folderToSlug from "./folderToSlug.json" with { type: "json" };

const LOG_PATH = path.join(process.cwd(), "data", "run_log.txt");

// Header format written by run_all_rosalind.ps1:
//   === <folder path, backslash-separated, relative to rosalind.info> [STATUS] ===
// followed by the script's stdout, up to the next header or EOF.
const HEADER_RE = /^=== (.+?) \[([A-Za-z ]+)\] ===\r?$/;

function stripBom(text) {
  return text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;
}

function parseRunLog(raw) {
  const lines = stripBom(raw).split(/\r?\n/);
  let runAt = null;
  const entries = new Map(); // folderName -> { status, output }

  let currentFolder = null;
  let currentStatus = null;
  let buffer = [];

  const flush = () => {
    if (currentFolder != null) {
      entries.set(currentFolder, {
        status: currentStatus,
        output: buffer.join("\n").replace(/\s+$/, ""),
      });
    }
    buffer = [];
  };

  for (const line of lines) {
    if (runAt == null) {
      const m = line.match(/^Rosalind batch run - (.+)$/);
      if (m) {
        runAt = m[1].trim();
        continue;
      }
    }
    const headerMatch = line.match(HEADER_RE);
    if (headerMatch) {
      flush();
      currentFolder = headerMatch[1];
      currentStatus = headerMatch[2].trim();
      continue;
    }
    if (currentFolder != null) {
      buffer.push(line);
    }
  }
  flush();

  return { runAt, entries };
}

let _cache = null;

// Returns null if data/run_log.txt hasn't been placed in the project yet
// (e.g. a fresh clone, or the clean-room build check) - this must never
// throw, since the log is optional user-generated data, not part of the
// shipped content.
export function getRunLog() {
  if (_cache !== undefined && _cache !== null) return _cache;
  if (!fs.existsSync(LOG_PATH)) {
    _cache = null;
    return null;
  }
  const raw = fs.readFileSync(LOG_PATH, "utf-8");
  _cache = parseRunLog(raw);
  return _cache;
}

// Looks up "my output" for a given catalog slug by reversing the same
// folder -> slug mapping used when content/*.md was generated from
// rosalind.info (see lib/folderToSlug.json).
export function getMyOutputForSlug(slug) {
  const log = getRunLog();
  if (!log) return null;
  const folder = Object.keys(folderToSlug).find((f) => folderToSlug[f] === slug);
  if (!folder) return null;
  const entry = log.entries.get(folder);
  if (!entry) return null;
  return { ...entry, runAt: log.runAt };
}
