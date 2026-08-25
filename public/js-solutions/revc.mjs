// Complementing a Strand of DNA (Rosalind ID: REVC) - soluzione
// JavaScript indipendente, non una trascrizione di problem.py: stessa
// logica (complemento inverso: A<->T, C<->G, poi ordine invertito),
// riscritta in modo idiomatico per JS.
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python).
const COMPLEMENT = { A: "T", T: "A", C: "G", G: "C" };

export default function solve(datasetText) {
  const riga = datasetText.split("\n")[0].trim();

  if (!riga) {
    throw new Error("Input non valido: attesa una stringa di DNA non vuota");
  }

  let stringa = "";
  for (let i = riga.length - 1; i >= 0; i--) {
    const base = riga[i];
    const comp = COMPLEMENT[base];
    if (!comp) {
      throw new Error(`Input non valido: carattere "${base}" non è un nucleotide (A, C, G, T)`);
    }
    stringa += comp;
  }

  return `${stringa}\n`;
}
