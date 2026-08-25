// Contest 2 - Example Finding a Motif in DNA (Bioinformatics Contest
// 2018, fuori dal set ufficiale Rosalind) - soluzione JavaScript
// indipendente, non una trascrizione di problem.py: stessa logica
// (prima riga = numero di casi n, poi n coppie di righe "s" e "t";
// per ciascuna coppia stampa le posizioni 1-indexed dove t compare in
// s, oppure nessuna riga se non compare mai), riscritta in modo
// idiomatico per JS.
//
// Contratto: riceve il contenuto testuale del file di input (per questo
// problema si chiama input.txt, non dataset.txt - gestito dal manifest,
// non da questo modulo), restituisce l'output testuale (stessa forma
// dell'output Python).
function posizioni(s, t) {
  const arr = [];
  const l = t.length;
  for (let i = 0; i <= s.length - l; i++) {
    if (s.slice(i, i + l) === t) arr.push(i + 1);
  }
  return arr;
}

export default function solve(datasetText) {
  const data = datasetText.split("\n").map((r) => r.replace(/\r$/, ""));
  const n = Number(data[0]?.trim());

  if (!Number.isInteger(n) || n < 0) {
    throw new Error(`Input non valido: attesa una prima riga con un intero, ricevuto "${data[0]}"`);
  }

  const righeOutput = [];
  for (let i = 1; i <= 2 * n; i += 2) {
    const s = data[i] ?? "";
    const t = data[i + 1] ?? "";
    const arr = posizioni(s, t);
    if (arr.length > 0) {
      righeOutput.push(arr.join(" "));
    }
  }

  return righeOutput.join("\n") + "\n";
}
