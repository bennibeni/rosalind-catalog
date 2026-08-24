import fs from "node:fs";
import path from "node:path";
import folderToSlug from "../lib/folderToSlug.json" with { type: "json" };

// Companion to sync-log.mjs: copies every dataset.txt from the sibling
// rosalind.info project into data/datasets/<slug>.txt, using the same
// folder -> slug mapping used for content/ and run_log.txt. This is the
// real, personal input that produced "Il mio output" - without it, an
// output on its own can't be checked against what actually produced it.
const defaultRoot = path.join(process.cwd(), "..", "rosalind.info");
const root = process.argv[2] ?? defaultRoot;

if (!fs.existsSync(root)) {
  console.error(`Non trovato: ${root}`);
  console.error("Uso: npm run sync-datasets -- <percorso completo a rosalind.info>");
  process.exit(1);
}

const destDir = path.join(process.cwd(), "data", "datasets");
fs.mkdirSync(destDir, { recursive: true });

// See sync-scripts.mjs: folderToSlug.json keys use backslash separators
// (to match run_log.txt's Windows-style headers), which path.join only
// honors natively on win32 - splitting on both slash styles keeps this
// correct on macOS/Linux too.
function resolveFolderPath(root, folderKey) {
  return path.join(root, ...folderKey.split(/[\\/]/));
}

let copied = 0;
let missing = [];
for (const [folder, slug] of Object.entries(folderToSlug)) {
  const source = path.join(resolveFolderPath(root, folder), "dataset.txt");
  if (!fs.existsSync(source)) {
    missing.push(folder);
    continue;
  }
  fs.copyFileSync(source, path.join(destDir, `${slug}.txt`));
  copied++;
}

console.log(`Copiati ${copied} dataset.txt in ${destDir}`);
if (missing.length > 0) {
  console.log(`Senza dataset.txt (${missing.length}, normale per gli esercizi del contest esterno):`);
  for (const f of missing) console.log(`  - ${f}`);
}
