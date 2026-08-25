// Creating a Distance Matrix (Rosalind ID: PDST) - soluzione JavaScript
// indipendente, non una trascrizione di problem.py: stessa logica
// (parsing FASTA multi-record, poi matrice n x n delle p-distanze tra
// ogni coppia di sequenze, ciascuna formattata a 5 decimali), riscritta
// in modo idiomatico per JS.
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

function pDistance(s1, s2) {
  let diff = 0;
  const n = Math.min(s1.length, s2.length);
  for (let i = 0; i < n; i++) {
    if (s1[i] !== s2[i]) diff++;
  }
  return diff / s1.length;
}

export default function solve(datasetText) {
  const seqs = parseFasta(datasetText);

  if (seqs.length === 0) {
    throw new Error("Input non valido: nessun record FASTA trovato");
  }

  const n = seqs.length;
  const righeOutput = [];
  for (let i = 0; i < n; i++) {
    const riga = [];
    for (let j = 0; j < n; j++) {
      riga.push(pDistance(seqs[i], seqs[j]).toFixed(5));
    }
    righeOutput.push(riga.join(" "));
  }

  return righeOutput.join("\n") + "\n";
}
