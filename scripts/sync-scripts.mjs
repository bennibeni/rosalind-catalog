import fs from "node:fs";
import path from "node:path";
import folderToSlug from "../lib/folderToSlug.json" with { type: "json" };

// Copies problem.py (+ whatever local input file it actually reads -
// usually dataset.txt, "input.txt" for the two external contest
// exercises) into data/scripts/, for the "Esegui nel browser" feature
// (Pyodide - a real CPython runtime compiled to WebAssembly, running the
// unmodified script client-side).
const defaultRoot = path.join(process.cwd(), "..", "rosalind.info");
const root = process.argv[2] ?? defaultRoot;

if (!fs.existsSync(root)) {
  console.error(`Non trovato: ${root}`);
  console.error("Uso: npm run sync-scripts -- <percorso completo a rosalind.info>");
  process.exit(1);
}

const destDir = path.join(process.cwd(), "data", "scripts");
fs.mkdirSync(destDir, { recursive: true });

// folderToSlug.json keys are stored with backslash separators (to match
// run_all_rosalind.ps1's Windows-style "=== folder\subfolder [OK] ==="
// headers in run_log.txt). path.join only treats backslash as a
// separator on win32 - on macOS/Linux it's just a literal character, so
// splitting on both slash styles here keeps this script correct
// regardless of which OS runs it.
function resolveFolderPath(root, folderKey) {
  return path.join(root, ...folderKey.split(/[\\/]/));
}

// Pyodide ships the full CPython stdlib, so re/itertools/functools/
// operator/math/json/collections/os/sys all work with zero setup.
// A script that imports anything outside that (third-party packages
// requiring micropip, or code that makes a live network request) can't
// run reliably client-side - flagged here instead of failing silently
// with a confusing ImportError or a CORS-blocked fetch in the browser.
const UNSUPPORTED_IMPORT_RE = /^\s*(import|from)\s+(regex|requests|numpy|scipy|pandas)\b/m;

// Alcuni script sono tecnicamente eseguibili sotto Pyodide (nessun
// import non supportato) ma impraticabili nel browser per ragioni di
// performance pura, non rilevabili da un semplice controllo sugli
// import - qui documentate esplicitamente per slug, così il motivo
// sopravvive ad ogni "npm run sync-scripts" invece di essere
// sovrascritto a null. Aggiungere qui SOLO dopo aver verificato di
// persona che l'esecuzione non completa in tempi ragionevoli.
const REASON_OVERRIDE = {
  rear: 'BFS esaustivo su tutte le permutazioni di 10 elementi (3.628.800 nodi): non completa in tempi ragionevoli sotto Pyodide/WebAssembly. Usa la soluzione JavaScript qui sotto, che esegue lo stesso calcolo in un Web Worker (qualche minuto, ma senza bloccare la pagina).',
};

const manifest = {};
let copied = 0;
let flagged = [];

for (const [folder, slug] of Object.entries(folderToSlug)) {
  const folderPath = resolveFolderPath(root, folder);
  const scriptPath = path.join(folderPath, "problem.py");
  if (!fs.existsSync(scriptPath)) continue;

  const source = fs.readFileSync(scriptPath, "utf-8");
  fs.writeFileSync(path.join(destDir, `${slug}.py`), source);

  let inputFilename = null;
  for (const candidate of ["dataset.txt", "input.txt"]) {
    if (fs.existsSync(path.join(folderPath, candidate))) {
      inputFilename = candidate;
      break;
    }
  }
  if (inputFilename) {
    fs.copyFileSync(
      path.join(folderPath, inputFilename),
      path.join(destDir, `${slug}.input`),
    );
  }

  const unsupportedMatch = source.match(UNSUPPORTED_IMPORT_RE);
  const notRunnableReason =
    REASON_OVERRIDE[slug] ??
    (unsupportedMatch
      ? `Usa "${unsupportedMatch[2]}", non disponibile (o inaffidabile per rete/CORS) in un runtime Python nel browser.`
      : null);

  manifest[slug] = { inputFilename, notRunnableReason };
  copied++;
  if (notRunnableReason) flagged.push(`${slug}: ${notRunnableReason}`);
}

fs.writeFileSync(path.join(destDir, "manifest.json"), JSON.stringify(manifest, null, 2));

console.log(`Copiati ${copied} script Python (+ input rilevato) in ${destDir}`);
if (flagged.length > 0) {
  console.log(`Non eseguibili nel browser (${flagged.length}):`);
  for (const f of flagged) console.log(`  - ${f}`);
}
