// Perfect Matchings and RNA Secondary Structures (Rosalind ID: PMCH) -
// soluzione JavaScript indipendente, non una trascrizione di
// problem.py: stessa logica (il numero di perfect matching è
// numA! * numC!, dato che ogni A deve accoppiarsi con una U e ogni C
// con una G), riscritta in modo idiomatico per JS.
//
// Due correzioni rispetto all'originale:
// 1. fact(0): problem.py definisce fact(x) con caso base solo x==1,
//    quindi fact(0) andrebbe in ricorsione infinita (bug latente, mai
//    innescato sui dataset reali perché un matching perfetto richiede
//    numA==numU e numC==numG entrambi positivi, ma comunque non lo
//    riproduco: qui fact(0) = 1, matematicamente corretto).
// 2. BigInt: con sequenze fino a qualche centinaio di basi, numA! può
//    superare abbondantemente Number.MAX_SAFE_INTEGER.
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python).
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

function fact(n) {
  let tot = 1n;
  for (let i = 2n; i <= BigInt(n); i++) tot *= i;
  return tot;
}

export default function solve(datasetText) {
  const data = parseFasta(datasetText);
  const s = data[0] ?? "";

  if (!s) {
    throw new Error("Input non valido: nessuna sequenza FASTA trovata");
  }

  let numA = 0;
  let numC = 0;
  for (const l of s) {
    if (l === "A") numA++;
    else if (l === "C") numC++;
  }

  return `${fact(numA) * fact(numC)}\n`;
}
