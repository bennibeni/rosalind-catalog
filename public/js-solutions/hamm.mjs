// Counting Point Mutations (Rosalind ID: HAMM) - soluzione JavaScript
// indipendente, non una trascrizione di problem.py: stessa logica
// (distanza di Hamming tra due stringhe di uguale lunghezza), riscritta
// in modo idiomatico per JS.
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python).
export default function solve(datasetText) {
  const [a, b] = datasetText.split("\n").map((riga) => riga.trim());

  if (!a || !b) {
    throw new Error(
      `Input non valido: attese due righe non vuote, ricevuto "${datasetText.trim()}"`
    );
  }
  if (a.length !== b.length) {
    throw new Error(
      `Input non valido: le due stringhe devono avere la stessa lunghezza (${a.length} vs ${b.length})`
    );
  }

  let tot = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) tot++;
  }

  return `${tot}\n`;
}
