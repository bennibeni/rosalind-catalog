// ini3 - esercizio introduttivo "Python Village": data una stringa e
// quattro interi a b c d, restituisce le due sottostringhe [a, b] e
// [c, d] (indici inclusivi, 0-based) separate da uno spazio. Soluzione
// JavaScript indipendente, non una trascrizione di problem.py, riscritta
// in modo idiomatico per JS.
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python).
export default function solve(datasetText) {
  const righe = datasetText.split("\n");
  const stringa = righe[0]?.replace(/\r$/, "") ?? "";
  const parti = (righe[1] ?? "").trim().split(/\s+/);

  if (!stringa || parti.length !== 4 || parti.some((p) => !/^\d+$/.test(p))) {
    throw new Error("Input non valido: attese una stringa e quattro interi a b c d");
  }

  const [a, b, c, d] = parti.map(Number);
  return `${stringa.slice(a, b + 1)} ${stringa.slice(c, d + 1)}\n`;
}
