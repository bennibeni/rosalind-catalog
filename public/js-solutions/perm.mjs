// Enumerating Gene Orders (Rosalind ID: PERM) - soluzione JavaScript
// indipendente, non una trascrizione di problem.py: stessa logica
// (n!, poi tutte le permutazioni di 1..n in ordine lessicografico),
// riscritta in modo idiomatico per JS.
//
// L'ordine lessicografico è ottenuto per costruzione: ad ogni passo si
// sceglie il prossimo elemento libero in ordine crescente, esattamente
// come fa itertools.permutations(range(n)) quando l'iterabile di
// partenza è già ordinato.
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python).
function factorial(n) {
  let tot = 1;
  for (let i = 2; i <= n; i++) tot *= i;
  return tot;
}

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

export default function solve(datasetText) {
  const riga = datasetText.split("\n")[0].trim();

  if (!/^\d+$/.test(riga)) {
    throw new Error(`Input non valido: atteso un intero, ricevuto "${riga}"`);
  }

  const n = Number(riga);
  const elementi = Array.from({ length: n }, (_, i) => i + 1);

  const righe = [String(factorial(n))];
  for (const p of permutazioni(elementi)) {
    righe.push(p.join(" "));
  }

  return righe.join("\n") + "\n";
}
