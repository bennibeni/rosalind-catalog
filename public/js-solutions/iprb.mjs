// Mendel's First Law (Rosalind ID: IPRB) - soluzione JavaScript
// indipendente, non una trascrizione di problem.py: stessa logica
// (per ogni possibile coppia di tipi genotipici k/m/n, calcola il
// "peso" delle coppie di individui che la generano e conta quante delle
// 4 combinazioni gametiche risultanti portano almeno un allele
// dominante "A"), riscritta in modo idiomatico per JS.
//
// Nota sull'arrotondamento: come altrove, int(x*1e5)/1e5 in Python è un
// troncamento (non un round), riprodotto qui con Math.trunc.
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python).
const TIPI = { k: ["A", "A"], m: ["A", "B"], n: ["a", "a"] };
const CHIAVI = ["k", "m", "n"];

function formatta(v) {
  return Number.isInteger(v) ? v.toFixed(1) : String(v);
}

export default function solve(datasetText) {
  const parti = datasetText.split("\n")[0].trim().split(/\s+/);

  if (parti.length !== 3 || parti.some((p) => !/^\d+$/.test(p))) {
    throw new Error(`Input non valido: attesi tre interi "k m n", ricevuto "${parti.join(" ")}"`);
  }

  const [k, m, n] = parti.map(Number);
  const elems = { k, m, n };

  let count = 0;
  let tot = 0;

  for (const first of CHIAVI) {
    for (const second of CHIAVI) {
      const multiplier =
        first === second
          ? (elems[first] * (elems[second] - 1)) / 2
          : (elems[first] * elems[second]) / 2;

      for (let i = 0; i <= 1; i++) {
        for (let j = 0; j <= 1; j++) {
          const coppia = [TIPI[first][i], TIPI[second][j]];
          if (coppia.includes("A")) count += multiplier;
          tot += multiplier;
        }
      }
    }
  }

  const result = count / tot;
  const troncato = Math.trunc(result * 100000) / 100000;

  return `${formatta(troncato)}\n`;
}
