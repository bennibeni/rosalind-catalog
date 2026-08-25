// Ordering Strings of Varying Length Lexicographically (Rosalind ID:
// LEXV) - soluzione JavaScript indipendente, non una trascrizione di
// problem.py: stessa logica (tutte le stringhe non vuote di lunghezza
// <= n costruibili con l'alfabeto dato, nell'ordine "lessicografico"
// definito dall'ordine dei simboli in input, dove ogni stringa precede
// le proprie estensioni), riscritta in modo idiomatico per JS.
//
// L'ordine è ottenuto per costruzione: la ricorsione visita ogni nodo
// (stringa) prima di esplorarne le estensioni - lo stesso pre-order
// depth-first di genera() in problem.py.
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python).
function genera(alfabeto, n, prefisso, risultati) {
  if (prefisso !== "") {
    risultati.push(prefisso);
  }
  if (prefisso.length < n) {
    for (const simbolo of alfabeto) {
      genera(alfabeto, n, prefisso + simbolo, risultati);
    }
  }
}

export default function solve(datasetText) {
  const righe = datasetText.split("\n");
  const alfabeto = (righe[0] ?? "").trim().split(/\s+/).filter(Boolean);
  const n = Number((righe[1] ?? "").trim());

  if (alfabeto.length === 0 || !Number.isInteger(n) || n < 1) {
    throw new Error("Input non valido: attesi un alfabeto di simboli e un intero n >= 1");
  }

  const risultati = [];
  genera(alfabeto, n, "", risultati);

  return risultati.join("\n") + "\n";
}
