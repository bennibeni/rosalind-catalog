// Counting DNA Nucleotides (Rosalind ID: DNA) - soluzione JavaScript
// indipendente, non una trascrizione di problem.py: stessa logica di
// conteggio (un contatore per simbolo), riscritta in modo idiomatico
// per JS.
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python).
export default function solve(datasetText) {
  const riga = datasetText.split("\n")[0].trim();

  const counts = {};
  for (const base of riga) {
    counts[base] = (counts[base] || 0) + 1;
  }

  const missing = ["A", "C", "G", "T"].filter((base) => !(base in counts));
  if (riga.length === 0 || missing.length > 0) {
    throw new Error(
      `Input non valido: attesa una stringa di DNA con almeno una occorrenza di A, C, G, T, ricevuto "${riga}"`
    );
  }

  return `${counts["A"]} ${counts["C"]} ${counts["G"]} ${counts["T"]}\n`;
}
