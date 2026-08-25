// Enumerating Oriented Gene Orderings (Rosalind ID: SIGN) - soluzione
// JavaScript indipendente, non una trascrizione di problem.py: stessa
// logica (tutte le permutazioni di 1..n, ciascuna combinata con tutti i
// 2^n possibili segni), riscritta in modo idiomatico per JS.
//
// L'ordine di generazione riproduce esattamente quello di
// itertools.permutations(range(1, n+1)) (ordine lessicografico
// sull'iterabile ordinato) e di itertools.product([1, -1], repeat=n)
// (l'ultima posizione varia più velocemente).
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python).
function* permutazioni(elementi) {
  if (elementi.length === 0) {
    yield [];
    return;
  }
  for (let i = 0; i < elementi.length; i++) {
    const resto = [...elementi.slice(0, i), ...elementi.slice(i + 1)];
    for (const p of permutazioni(resto)) {
      yield [elementi[i], ...p];
    }
  }
}

function* combinazioniSegni(n) {
  if (n === 0) {
    yield [];
    return;
  }
  for (const segno of [1, -1]) {
    for (const resto of combinazioniSegni(n - 1)) {
      yield [segno, ...resto];
    }
  }
}

export default function solve(datasetText) {
  const riga = datasetText.split("\n")[0].trim();

  if (!/^\d+$/.test(riga)) {
    throw new Error(`Input non valido: atteso un intero, ricevuto "${riga}"`);
  }

  const n = Number(riga);
  const elementi = Array.from({ length: n }, (_, i) => i + 1);

  const soluzioni = [];
  for (const p of permutazioni(elementi)) {
    for (const segni of combinazioniSegni(n)) {
      soluzioni.push(p.map((v, i) => v * segni[i]));
    }
  }

  const righe = [String(soluzioni.length)];
  for (const sol of soluzioni) {
    righe.push(sol.join(" "));
  }

  return righe.join("\n") + "\n";
}
