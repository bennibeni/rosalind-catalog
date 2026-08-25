// Rabbits and Recurrence Relations - soluzione JavaScript indipendente,
// non una trascrizione di problem.py: stessa ricorrenza (ogni coppia
// adulta genera k nuove coppie ogni mese, F(n) = F(n-1) + k*F(n-2)),
// riscritta in modo idiomatico per JS (iterativa invece che ricorsiva,
// per evitare la ricorsione non ottimizzata dell'originale su n grandi).
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python).
export default function solve(datasetText) {
  const prima_riga = datasetText.split("\n")[0].trim();
  const parti = prima_riga.split(/\s+/);

  if (parti.length !== 2 || parti.some((p) => !/^\d+$/.test(p))) {
    throw new Error(`Input non valido: attesi due interi "n k", ricevuto "${prima_riga}"`);
  }

  const [n, k] = parti.map(Number);

  if (n <= 2) return "1\n";

  let prev2 = 1n; // fibonacci(1, k)
  let prev1 = 1n; // fibonacci(2, k)
  const kBig = BigInt(k);
  for (let i = 3; i <= n; i++) {
    const curr = prev1 + kBig * prev2;
    prev2 = prev1;
    prev1 = curr;
  }

  return `${prev1}\n`;
}
