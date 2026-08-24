import fs from "node:fs";
import path from "node:path";

// One-shot onboarding for a newly solved problem: copies its
// enunciato.md into content/, and registers it in folderToSlug.json so
// npm run sync (log/datasets/scripts) can find it afterward. Without the
// folderToSlug.json entry, a new problem would show up in the catalog
// fine (content/ parsing doesn't need it) but "La mia esecuzione" would
// silently never find its data - this closes that gap in one step.
//
// Uso:
//   npm run add-problem -- "Nome Esatto Cartella"
//   npm run add-problem -- "Nome Esatto Cartella" "C:\percorso\a\rosalind.info"
const folderName = process.argv[2];
if (!folderName) {
  console.error('Uso: npm run add-problem -- "Nome Esatto Cartella" [percorso a rosalind.info]');
  process.exit(1);
}

const defaultRoot = path.join(process.cwd(), "..", "rosalind.info");
const root = process.argv[3] ?? defaultRoot;
const folderPath = path.join(root, folderName);

if (!fs.existsSync(folderPath)) {
  console.error(`Non trovata: ${folderPath}`);
  process.exit(1);
}

const enunciatoPath = path.join(folderPath, "enunciato.md");
if (!fs.existsSync(enunciatoPath)) {
  console.error(`Nessun enunciato.md in: ${folderPath}`);
  process.exit(1);
}

const content = fs.readFileSync(enunciatoPath, "utf-8");

// Stessa logica di slug usata per la migrazione iniziale (vedi
// lib/folderToSlug.json): preferisce il Rosalind ID se presente nel
// titolo, altrimenti deriva lo slug dal nome della cartella.
function slugifyFallback(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const idMatch = content.match(/^#\s+.+?\s*\(Rosalind ID:\s*([A-Za-z0-9]+)\)\s*$/m);
const slug = idMatch ? idMatch[1].toLowerCase() : slugifyFallback(folderName);

const contentDir = path.join(process.cwd(), "content");
const destPath = path.join(contentDir, `${slug}.md`);
if (fs.existsSync(destPath)) {
  console.error(`content/${slug}.md esiste già - problema già integrato?`);
  process.exit(1);
}

fs.copyFileSync(enunciatoPath, destPath);

const manifestPath = path.join(process.cwd(), "lib", "folderToSlug.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
if (folderName in manifest) {
  console.error(`"${folderName}" è già presente in folderToSlug.json (slug: ${manifest[folderName]})`);
  process.exit(1);
}
manifest[folderName] = slug;
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n", "utf-8");

console.log(`Aggiunto: content/${slug}.md`);
console.log(`Registrato in folderToSlug.json: "${folderName}" -> "${slug}"`);
console.log("");
console.log("Prossimo passo: npm run sync   (per collegare dataset/output/script di questo problema)");
console.log("Poi: npm run build   (o ricarica npm run dev)");
