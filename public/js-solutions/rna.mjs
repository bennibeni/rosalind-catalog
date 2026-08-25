// Transcribing DNA into RNA (Rosalind ID: RNA) - soluzione JavaScript
// indipendente, non una trascrizione di problem.py: stessa logica
// (sostituire ogni T con U), riscritta in modo idiomatico per JS.
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python).
export default function solve(datasetText) {
  const riga = datasetText.split("\n")[0].trim();

  if (!riga) {
    throw new Error("Input non valido: attesa una stringa di DNA non vuota");
  }

  return `${riga.replaceAll("T", "U")}\n`;
}
