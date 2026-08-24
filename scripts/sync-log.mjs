import fs from "node:fs";
import path from "node:path";

// Convenience copy: run_all_rosalind.ps1 writes run_log.txt inside the
// sibling `rosalind.info` project folder (see the PowerShell workflow),
// not inside `rosalind-catalog`. This script copies it here so the app
// can read it. Default assumes the two folders sit side by side (e.g.
// both under Desktop) - pass an explicit path as the first argument to
// override.
const defaultSource = path.join(process.cwd(), "..", "rosalind.info", "run_log.txt");
const source = process.argv[2] ?? defaultSource;
const destDir = path.join(process.cwd(), "data");
const dest = path.join(destDir, "run_log.txt");

if (!fs.existsSync(source)) {
  console.error(`Non trovato: ${source}`);
  console.error("Uso: npm run sync-log -- <percorso completo a run_log.txt>");
  process.exit(1);
}

fs.mkdirSync(destDir, { recursive: true });
fs.copyFileSync(source, dest);
console.log(`Copiato: ${source} -> ${dest}`);
