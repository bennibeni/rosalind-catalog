// Counting Phylogenetic Ancestors (Rosalind ID: INOD) - soluzione
// JavaScript indipendente, non una trascrizione di problem.py: stessa
// logica (un albero binario non radicato con n foglie ha esattamente
// n-2 nodi interni), riscritta in modo idiomatico per JS.
//
// Nota sul formato: problem.py usa print("", n-2), che con il
// separatore di default di print (uno spazio) produce uno spazio
// iniziale prima del numero. Lo riproduco identico per coerenza con
// l'output atteso da Rosalind/dal confronto testuale.
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python).
export default function solve(datasetText) {
  const riga = datasetText.split("\n")[0].trim();

  if (!/^\d+$/.test(riga)) {
    throw new Error(`Input non valido: atteso un intero, ricevuto "${riga}"`);
  }

  const n = Number(riga);
  return ` ${n - 2}\n`;
}
