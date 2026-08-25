// Rabbits and Recurrence Relations (slug: fib) - soluzione JavaScript
// indipendente, non una trascrizione di problem.py: stessa logica a
// macchina a stati (tre "età" di coppie: appena nate, di un mese, di
// due mesi o più - le adulte generano k nuove coppie ogni mese),
// riscritta in modo idiomatico per JS.
//
// BigInt per sicurezza: n può essere abbastanza grande da far superare
// a k^(n/2) il limite di Number.MAX_SAFE_INTEGER, stesso discorso già
// fatto per fibd.mjs/rabbits-and-recurrence-relations-2.mjs.
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python).
export default function solve(datasetText) {
  const prima_riga = datasetText.split("\n")[0].trim();
  const parti = prima_riga.split(/\s+/);

  if (parti.length !== 2 || parti.some((p) => !/^\d+$/.test(p))) {
    throw new Error(`Input non valido: attesi due interi "n k", ricevuto "${prima_riga}"`);
  }

  const n = Number(parti[0]);
  const k = BigInt(parti[1]);

  let rabbits = [1n, 0n, 0n];
  for (let i = 0; i < n - 1; i++) {
    const [x, y, z] = rabbits;
    rabbits = [k * (y + z), x, z + y];
  }

  return `${rabbits[0] + rabbits[1] + rabbits[2]}\n`;
}
