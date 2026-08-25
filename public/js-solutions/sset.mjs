// Counting Subsets (Rosalind ID: SSET) - soluzione JavaScript
// indipendente, non una trascrizione di problem.py: stessa
// logica (2^n mod 1.000.000, il numero di sottoinsiemi di un insieme di
// n elementi, modulo 1 milione), riscritta in modo idiomatico per JS.
//
// BigInt per l'esponenziazione modulare: n può arrivare fino a 1000 (il
// vincolo di Rosalind per questo problema), quindi il calcolo va fatto
// per moltiplicazioni successive modulo 1.000.000, non con Math.pow
// (che perderebbe precisione ben prima di arrivare a 2^1000).
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python).
const MODULO = 1000000n;

function powMod(base, exp, mod) {
  let result = 1n;
  base %= mod;
  while (exp > 0n) {
    if (exp % 2n === 1n) result = (result * base) % mod;
    exp /= 2n;
    base = (base * base) % mod;
  }
  return result;
}

export default function solve(datasetText) {
  const riga = datasetText.split("\n")[0].trim();

  if (!/^\d+$/.test(riga)) {
    throw new Error(`Input non valido: atteso un intero non negativo, ricevuto "${riga}"`);
  }

  const n = BigInt(riga);
  return `${powMod(2n, n, MODULO)}\n`;
}
