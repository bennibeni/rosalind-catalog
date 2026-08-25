// Motzkin Numbers and RNA Secondary Structures (Rosalind ID: MOTZ) -
// soluzione JavaScript indipendente, non una trascrizione di
// problem.py: stessa logica (ricorsione con memoizzazione sul numero di
// possibili strutture secondarie non-crossing, mod 1.000.000),
// riscritta in modo idiomatico per JS.
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python).
const MODULO = 1000000;
const COMPLEMENTI = { A: "U", U: "A", C: "G", G: "C" };

function primaSequenzaFasta(testo) {
  const righe = testo.split("\n").map((r) => r.replace(/\r$/, ""));
  let record = "";
  let first = true;
  for (const riga of righe) {
    if (riga.startsWith(">")) {
      if (!first) return record;
      first = false;
    } else {
      record += riga;
    }
  }
  return record;
}

function contaMatching(s, memo) {
  const n = s.length;
  if (n === 0 || n === 1) return 1;
  if (memo.has(s)) return memo.get(s);

  let totale = contaMatching(s.slice(1), memo);
  for (let k = 1; k < n; k++) {
    if (COMPLEMENTI[s[0]] === s[k]) {
      totale += contaMatching(s.slice(1, k), memo) * contaMatching(s.slice(k + 1), memo);
      totale %= MODULO;
    }
  }
  memo.set(s, totale);
  return totale;
}

export default function solve(datasetText) {
  const s = primaSequenzaFasta(datasetText);

  if (!s) {
    throw new Error("Input non valido: nessuna sequenza FASTA trovata");
  }

  const memo = new Map();
  return `${contaMatching(s, memo)}\n`;
}
