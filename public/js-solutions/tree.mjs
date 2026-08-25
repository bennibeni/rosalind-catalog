// Completing a Tree (Rosalind ID: TREE) - soluzione JavaScript
// indipendente, non una trascrizione di problem.py: stessa logica per
// contare le componenti connesse, riscritta in modo idiomatico per JS.
//
// ATTENZIONE - bug riprodotto intenzionalmente: per ogni vertice v,
// problem.py unisce l'insieme {v} ∪ vicini(v) al PRIMO insieme già
// esistente con cui interseca, senza controllare se dovrebbe unirsi
// anche ad altri insiemi già creati in precedenza. Su certe topologie
// (es. un vertice "ponte" che collega due gruppi già registrati come
// insiemi separati) questo può produrre più componenti di quelle
// realmente connesse, sovrastimando gli archi mancanti - un vero e
// proprio bug rispetto a un union-find corretto. Qui è riprodotto
// fedelmente - non corretto - perché il confronto "Corrisponde
// all'output registrato" si basa sull'output REALE già salvato in
// run_log.txt (che contiene lo stesso comportamento).
//
// Nota sul formato: come in inod.mjs, problem.py fa
// print("", len(sets)-1), che con il separatore di default di print
// produce uno SPAZIO INIZIALE prima del numero - riprodotto identico.
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python).
function lettura(datasetText) {
  const righe = datasetText.split("\n").map((r) => r.replace(/\r$/, ""));
  const n = Number(righe[0]);
  const dati = righe
    .slice(1)
    .filter((r) => r !== "")
    .map((r) => r.split(" "));
  return { n, dati };
}

export default function solve(datasetText) {
  const { n, dati } = lettura(datasetText);

  if (!Number.isInteger(n) || n < 1) {
    throw new Error("Input non valido: attesa una prima riga con il numero di vertici");
  }

  // Adiacenza simmetrica, come Graph.add_edge in problem.py.
  const adiacenza = new Map();
  for (let i = 1; i <= n; i++) adiacenza.set(String(i), new Set());
  for (const [a, b] of dati) {
    if (!adiacenza.has(a)) adiacenza.set(a, new Set());
    if (!adiacenza.has(b)) adiacenza.set(b, new Set());
    adiacenza.get(a).add(b);
    adiacenza.get(b).add(a);
  }

  const sets = [];
  for (let i = 1; i <= n; i++) {
    const id = String(i);
    const setv = new Set([id, ...adiacenza.get(id)]);

    let found = false;
    for (let k = 0; k < sets.length; k++) {
      const intersecano = [...setv].some((x) => sets[k].has(x));
      if (intersecano) {
        for (const x of setv) sets[k].add(x);
        found = true;
        break;
      }
    }
    if (!found) sets.push(setv);
  }

  return ` ${sets.length - 1}\n`;
}
