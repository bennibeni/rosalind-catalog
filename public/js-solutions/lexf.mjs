// Enumerating k-mers Lexicographically (Rosalind ID: LEXF) - soluzione
// JavaScript indipendente, non una trascrizione di problem.py: stessa
// logica (prodotto cartesiano dell'alfabeto dato, ripetuto k volte,
// nell'ordine dei simboli così come appaiono nell'input), riscritta in
// modo idiomatico per JS.
//
// L'ordine di generazione (ricorsione che, ad ogni livello, scorre i
// simboli nell'ordine dato) riproduce esattamente quello di
// itertools.product(s, repeat=k): l'ultimo carattere varia più
// velocemente, il primo più lentamente.
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python).
function* prodotto(simboli, k) {
  if (k === 0) {
    yield "";
    return;
  }
  for (const s of simboli) {
    for (const resto of prodotto(simboli, k - 1)) {
      yield s + resto;
    }
  }
}

export default function solve(datasetText) {
  const righe = datasetText.split("\n");
  const simboli = (righe[0] ?? "").trim().split(/\s+/).filter(Boolean);
  const k = Number((righe[1] ?? "").trim());

  if (simboli.length === 0 || !Number.isInteger(k) || k < 1) {
    throw new Error("Input non valido: attesi un alfabeto di simboli e un intero k >= 1");
  }

  const risultati = [];
  for (const p of prodotto(simboli, k)) {
    risultati.push(p);
  }

  return risultati.join("\n") + "\n";
}
