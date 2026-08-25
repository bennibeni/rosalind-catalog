// Transitions and Transversions (Rosalind ID: TRAN) - soluzione
// JavaScript indipendente, non una trascrizione di problem.py: stessa
// logica (rapporto transizioni/trasversioni tra due sequenze allineate
// della stessa lunghezza), riscritta in modo idiomatico per JS.
//
// Nota sul formato numero: come in iev.mjs, un risultato intero va
// stampato con ".0" finale per coincidere con print() di un float
// Python; altrimenti la rappresentazione "shortest round-trip" di JS
// (Number.prototype.toString) coincide di norma con quella di Python.
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python).
const PURINE = new Set(["A", "G"]);
const PYRIMIDINE = new Set(["C", "T"]);

function parseFasta(testo) {
  const righe = testo.split("\n").map((r) => r.replace(/\r$/, ""));
  const data = [];
  let record = "";
  let first = true;
  for (const riga of righe) {
    if (riga.startsWith(">")) {
      if (!first) data.push(record);
      record = "";
      first = false;
    } else {
      record += riga;
    }
  }
  data.push(record);
  return data;
}

function isTransition(a, b) {
  return (PURINE.has(a) && PURINE.has(b)) || (PYRIMIDINE.has(a) && PYRIMIDINE.has(b));
}

function formatta(v) {
  return Number.isInteger(v) ? v.toFixed(1) : String(v);
}

export default function solve(datasetText) {
  const seqs = parseFasta(datasetText);
  const [s1, s2] = seqs;

  if (!s1 || !s2 || s1.length !== s2.length) {
    throw new Error("Input non valido: attesi due record FASTA della stessa lunghezza");
  }

  let transizioni = 0;
  let trasversioni = 0;
  for (let i = 0; i < s1.length; i++) {
    if (s1[i] !== s2[i]) {
      if (isTransition(s1[i], s2[i])) transizioni++;
      else trasversioni++;
    }
  }

  if (trasversioni === 0) {
    throw new Error("Input non valido: nessuna trasversione trovata (divisione per zero)");
  }

  return `${formatta(transizioni / trasversioni)}\n`;
}
