import fs from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "content");

// Official Rosalind topic taxonomy (from rosalind.info/problems/topics/),
// used only to fix a sensible display order for the catalog sections -
// the topics themselves are read per-problem from each enunciato.md's own
// "Argomenti Rosalind:" line, never hardcoded per-problem here.
const TOPIC_ORDER = [
  "String Algorithms",
  "Combinatorics",
  "Dynamic Programming",
  "Genome Rearrangements",
  "Heredity",
  "Probability",
  "Phylogeny",
  "Graph Algorithms",
  "Genome Assembly",
  "Alignment",
  "Set Theory",
  "Computational Mass Spectrometry",
  "Proteomics",
  "File Formats",
];

const UNCLASSIFIED_LABEL = "Non classificato";
const PYTHON_VILLAGE_LABEL = "Python Village";
const EXTERNAL_LABEL = "Fuori dal set ufficiale";

function parseFrontMatter(raw, slug) {
  // Every enunciato.md follows the same hand-authored shape (see
  // pattern-architecture.md-style documentation in the source project):
  //   # Title (Rosalind ID: XXX)          <- or "(Bioinformatics Contest 2018)"
  //   Fonte: <url> [(Python Village)]
  //   Argomenti Rosalind: A, B, C          <- or "non classificato. <note>"
  //   ## Descrizione / ## Given / ## Return / ## Sample Dataset / ...
  const titleMatch = raw.match(/^#\s+(.+?)\s*$/m);
  const rawTitle = titleMatch ? titleMatch[1] : slug;

  const idMatch = rawTitle.match(/\(Rosalind ID:\s*([A-Za-z0-9]+)(?:[^)]*)?\)/);
  const rosalindId = idMatch ? idMatch[1].toUpperCase() : null;
  const title = rawTitle.replace(/\s*\(.*\)\s*$/, "").trim();

  const isExternalContest = /Bioinformatics Contest 2018/.test(rawTitle);

  const fonteMatch = raw.match(/^Fonte:\s*(\S+)?.*$/m);
  const sourceUrl = fonteMatch && fonteMatch[1] && fonteMatch[1].startsWith("http")
    ? fonteMatch[1]
    : null;
  const isPythonVillage = /\(Python Village\)/.test(raw);

  const topicsMatch = raw.match(/^Argomenti Rosalind:\s*(.+)$/m);
  let topics = [];
  let unclassifiedNote = null;
  if (topicsMatch) {
    const value = topicsMatch[1].trim();
    if (value.startsWith("non classificato")) {
      unclassifiedNote = value.replace(/^non classificato\.?\s*/, "");
    } else {
      topics = value.split(",").map((t) => t.trim()).filter(Boolean);
    }
  }

  // Body: everything from the first "## " section onward - the header
  // block above (title/Fonte/Argomenti) is parsed into structured fields
  // and rendered by the page's own header UI instead, so it isn't
  // duplicated inside the markdown body.
  const bodyStart = raw.search(/^##\s/m);
  const body = bodyStart >= 0 ? raw.slice(bodyStart) : raw;

  return {
    slug,
    title,
    rosalindId,
    sourceUrl,
    isPythonVillage,
    isExternalContest,
    topics,
    unclassifiedNote,
    body,
  };
}

let _cache = null;

export function getAllProblems() {
  if (_cache) return _cache;
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  const problems = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
    return parseFrontMatter(raw, slug);
  });
  // Stable order: Rosalind ID alphabetically when present, else title.
  problems.sort((a, b) => (a.rosalindId ?? a.title).localeCompare(b.rosalindId ?? b.title));
  _cache = problems;
  return problems;
}

export function getProblemBySlug(slug) {
  return getAllProblems().find((p) => p.slug === slug) ?? null;
}

// Groups problems by topic for the catalog index. A problem with multiple
// topics (common - e.g. Motzkin Numbers is Combinatorics + String
// Algorithms + Dynamic Programming) appears once under EACH of its
// topics, since the catalog's job is browsing by topic, not a strict
// partition.
export function getProblemsGroupedByTopic() {
  const problems = getAllProblems();
  const groups = new Map();

  function addTo(label, problem) {
    if (!groups.has(label)) groups.set(label, []);
    groups.get(label).push(problem);
  }

  for (const p of problems) {
    if (p.isExternalContest) {
      addTo(EXTERNAL_LABEL, p);
    } else if (p.isPythonVillage) {
      addTo(PYTHON_VILLAGE_LABEL, p);
    } else if (p.topics.length > 0) {
      for (const topic of p.topics) addTo(topic, p);
    } else {
      addTo(UNCLASSIFIED_LABEL, p);
    }
  }

  const orderIndex = (label) => {
    const i = TOPIC_ORDER.indexOf(label);
    return i === -1 ? TOPIC_ORDER.length : i;
  };

  return [...groups.entries()]
    .sort((a, b) => orderIndex(a[0]) - orderIndex(b[0]) || a[0].localeCompare(b[0]))
    .map(([topic, items]) => ({ topic, problems: items }));
}
