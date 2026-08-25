// Partial Permutations (Rosalind ID: PPER) - soluzione JavaScript
// indipendente, non una trascrizione di problem.py: stesso calcolo
// (P(n,k) = n! / (n-k)! mod 1.000.000, tramite prodotto dei k fattori
// consecutivi n-k+1 .. n), riscritta in modo idiomatico per JS.
//
// BigInt: n può arrivare fino a 100 (vincolo Rosalind per questo
// problema), quindi il prodotto intermedio prima del modulo può
// superare Number.MAX_SAFE_INTEGER - stesso motivo già visto in
// fib.mjs/fibd.mjs/sset.mjs.
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python).
const MODULO = 1000000n;

export default function solve(datasetText) {
  const prima_riga = datasetText.split("\n")[0].trim();
  const parti = prima_riga.split(/\s+/);

  if (parti.length !== 2 || parti.some((p) => !/^\d+$/.test(p))) {
    throw new Error(`Input non valido: attesi due interi "n k", ricevuto "${prima_riga}"`);
  }

  const n = Number(parti[0]);
  const k = Number(parti[1]);

  if (k > n) {
    throw new Error(`Input non valido: k (${k}) non può essere maggiore di n (${n})`);
  }

  let risultato = 1n;
  for (let i = n - k + 1; i <= n; i++) {
    risultato = (risultato * BigInt(i)) % MODULO;
  }

  return `${risultato}\n`;
}
