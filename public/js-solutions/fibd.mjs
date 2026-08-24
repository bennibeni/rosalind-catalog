// Mortal Fibonacci Rabbits (Rosalind ID: FIBD) - soluzione JavaScript
// indipendente, non una trascrizione di problem.py: stessa ricorrenza
// (ogni mese, i conigli di età >= 2 generano una nuova coppia; i conigli
// arrivati a k mesi di vita muoiono), riscritta in modo idiomatico per
// JS.
//
// BigInt, non Number: per n=82, m=18 (il dataset reale di questo
// problema) il risultato è 60994035076020903, che supera
// Number.MAX_SAFE_INTEGER (9007199254740991) di oltre 6 volte. Con
// Number normale il risultato calcolato è 60994035076020920 - SBAGLIATO
// per un errore di arrotondamento in virgola mobile, di soli 17 su 17
// cifre: un tipo di bug che a occhio è impossibile da notare. Questa è
// esattamente la classe di problema per cui Python (interi a precisione
// arbitraria nativa) è più sicuro di JS by default - qui la sicurezza
// va richiesta esplicitamente con BigInt.
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python).
export default function solve(datasetText) {
  const [nStr, kStr] = datasetText.trim().split(/\s+/);
  const n = Number(nStr);
  const k = Number(kStr);

  if (!Number.isFinite(n) || !Number.isFinite(k) || n < 1 || k < 1) {
    throw new Error(`Input non valido: attesi due interi positivi "n m", ricevuto "${datasetText.trim()}"`);
  }

  // rabbits[i] = numero di coppie che hanno esattamente i+1 mesi di età
  // (rabbits[0] = appena nate). Ogni mese: le coppie con età >= 2 mesi
  // generano, poi tutte invecchiano di un mese, poi chi ha raggiunto k
  // mesi muore (esce dall'array).
  let rabbits = [1n];
  for (let month = 0; month < n - 1; month++) {
    let newborns = 0n;
    for (let age = 1; age < rabbits.length; age++) {
      newborns += rabbits[age];
    }
    rabbits.unshift(newborns);
    if (rabbits.length > k) rabbits.length = k; // troncamento = morte per vecchiaia
  }

  const total = rabbits.reduce((sum, count) => sum + count, 0n);
  return `${total}\n`;
}
