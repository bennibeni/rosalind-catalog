// Matching Random Motifs (Rosalind ID: RSTR) - soluzione JavaScript
// indipendente, non una trascrizione di problem.py: stessa formula
// (probabilità che almeno una di n stringhe casuali di GC-content x
// coincida con la stringa data s), riscritta in modo idiomatico per JS.
//
// Nota sulla formattazione del numero: sia Python (repr/print di un
// float) sia JS (Number.prototype.toString) usano un algoritmo "shortest
// round-trip", quindi per la maggior parte dei valori il testo prodotto
// coincide cifra per cifra. L'unico caso limite è la notazione
// esponenziale per numeri molto piccoli/grandi, dove i due linguaggi
// formattano l'esponente in modo leggermente diverso (es. "1e-07" in
// Python contro "1e-7" in JS) - improbabile con i vincoli tipici di
// questo problema, ma da tenere a mente in caso di dataset estremi.
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python).
export default function solve(datasetText) {
  const righe = datasetText.split("\n");
  const prima = (righe[0] ?? "").trim().split(/\s+/);
  const s = (righe[1] ?? "").trim();

  if (prima.length !== 2 || !s) {
    throw new Error("Input non valido: attese due righe, \"n x\" e una stringa di DNA");
  }

  const n = Number(prima[0]);
  const x = Number(prima[1]);

  let gc = 0;
  let at = 0;
  for (const c of s) {
    if (c === "G" || c === "C") gc++;
    else if (c === "A" || c === "T") at++;
  }

  const p_s = (x / 2) ** gc * ((1 - x) / 2) ** at;
  const risultato = 1 - (1 - p_s) ** n;

  return `${risultato}\n`;
}
