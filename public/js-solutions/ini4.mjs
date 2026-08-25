// ini4 - esercizio introduttivo "Python Village": dati due interi a e b
// (a <= b) sulla stessa riga, somma tutti gli interi dispari nell'
// intervallo [a, b]. Soluzione JavaScript indipendente, non una
// trascrizione di problem.py, riscritta in modo idiomatico per JS.
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python).
export default function solve(datasetText) {
  const prima_riga = datasetText.split("\n")[0].trim();
  const parti = prima_riga.split(/\s+/);

  if (parti.length !== 2 || parti.some((p) => !/^-?\d+$/.test(p))) {
    throw new Error(`Input non valido: attesi due interi "a b", ricevuto "${prima_riga}"`);
  }

  const [a, b] = parti.map(Number);

  let tot = 0;
  for (let n = a; n <= b; n++) {
    if (n % 2 !== 0) tot += n;
  }

  return `${tot}\n`;
}
