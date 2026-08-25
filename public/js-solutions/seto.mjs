// Introduction to Set Operations (Rosalind ID: SETO) - soluzione
// JavaScript indipendente, non una trascrizione di problem.py: stessa
// logica (unione, intersezione, differenze e complementi rispetto
// all'universo {1..n} di due insiemi A e B), riscritta in modo
// idiomatico per JS.
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python).
function formatta(insieme) {
  const ordinato = [...insieme].sort((a, b) => a - b);
  return "{" + ordinato.join(", ") + "}";
}

function parseInsieme(riga) {
  const pulita = riga.trim().replace(/^\{/, "").replace(/\}$/, "");
  return new Set(pulita.split(",").map((x) => Number(x.trim())));
}

export default function solve(datasetText) {
  const righe = datasetText.split("\n");
  const n = Number(righe[0]?.trim());

  if (!Number.isInteger(n) || n < 0 || righe.length < 3) {
    throw new Error("Input non valido: attese tre righe (n, insieme A, insieme B)");
  }

  const a = parseInsieme(righe[1]);
  const b = parseInsieme(righe[2]);
  const universo = new Set(Array.from({ length: n }, (_, i) => i + 1));

  const unione = new Set([...a, ...b]);
  const intersezione = new Set([...a].filter((x) => b.has(x)));
  const aMenoB = new Set([...a].filter((x) => !b.has(x)));
  const bMenoA = new Set([...b].filter((x) => !a.has(x)));
  const complA = new Set([...universo].filter((x) => !a.has(x)));
  const complB = new Set([...universo].filter((x) => !b.has(x)));

  return (
    [unione, intersezione, aMenoB, bMenoA, complA, complB]
      .map(formatta)
      .join("\n") + "\n"
  );
}
