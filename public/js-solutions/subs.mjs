// Finding a Motif in DNA (Rosalind ID: SUBS) - soluzione JavaScript
// indipendente, non una trascrizione di problem.py: stessa logica
// (tutte le posizioni 1-indexed dove t compare in s, sovrapposizioni
// incluse), riscritta in modo idiomatico per JS.
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python).
export default function solve(datasetText) {
  const [s, t] = datasetText.split("\n").map((riga) => riga.trim());

  if (!s || !t) {
    throw new Error(`Input non valido: attese due righe non vuote, ricevuto "${datasetText.trim()}"`);
  }

  const result = [];
  for (let i = 0; i <= s.length - t.length; i++) {
    if (s.slice(i, i + t.length) === t) {
      result.push(i + 1);
    }
  }

  return `${result.join(" ")}\n`;
}
