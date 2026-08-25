import fs from "node:fs";
import path from "node:path";

// Unlike data/scripts/ (Python, synced from an external project and
// gitignored-or-not depending on privacy choices), JS solutions are
// first-class, hand-written source code that lives in the repo like
// content/*.md - so they live in public/js-solutions/, served directly
// as static assets and dynamically importable client-side by URL,
// exactly like any other public file.
const JS_SOLUTIONS_DIR = path.join(process.cwd(), "public", "js-solutions");

// Note opzionali per problemi dove la soluzione JS ha un comportamento
// degno di attenzione a runtime (non un difetto - solo qualcosa da far
// sapere a chi preme "Esegui ora"). Tenute qui, non nel sorgente .mjs,
// perché sono informazioni per l'interfaccia, non per chi legge il
// codice.
const NOTE_PER_SLUG = {
  rear: "Qui il JS è l'unica opzione praticabile nel browser, ma richiede una elaborazione molto lunga.",
};

export function getJsSolutionForSlug(slug) {
  const filePath = path.join(JS_SOLUTIONS_DIR, `${slug}.mjs`);
  if (!fs.existsSync(filePath)) return null;

  return {
    source: fs.readFileSync(filePath, "utf-8"),
    modulePath: `/js-solutions/${slug}.mjs`,
    note: NOTE_PER_SLUG[slug] ?? null,
  };
}
