// Finding a Spliced Motif (Rosalind ID: SSEQ) - soluzione JavaScript
// indipendente, non una trascrizione di problem.py: stessa logica
// (parsing FASTA multi-record, poi ricerca greedy delle posizioni in s
// dove t compare come sottosequenza), riscritta in modo idiomatico per
// JS.
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

export default function solve(datasetText) {
  const seqs = parseFasta(datasetText);
  const [s, t] = seqs;

  if (!s || !t) {
    throw new Error("Input non valido: attesi almeno due record FASTA");
  }

  const posizioni = [];
  let j = 0;
  for (let i = 0; i < s.length && j < t.length; i++) {
    if (s[i] === t[j]) {
      posizioni.push(i + 1);
      j++;
    }
  }

  return `${posizioni.join(" ")}\n`;
}
