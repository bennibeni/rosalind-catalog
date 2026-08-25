// Consensus and Profile (Rosalind ID: CONS) - soluzione JavaScript
// indipendente, non una trascrizione di problem.py: stessa logica
// (parsing FASTA multi-record, poi per ogni colonna della matrice
// prende il simbolo più frequente), riscritta in modo idiomatico per
// JS.
//
// Nota: problem.py stampa SOLO la stringa di consenso, non la matrice
// di profilo (righe "A:", "C:", "G:", "T:") che il problema Rosalind
// CONS richiederebbe per intero - qui è riprodotto fedelmente lo stesso
// comportamento parziale, per coerenza con l'output reale registrato.
//
// Nota sui pareggi: in caso di parità tra due simboli nella stessa
// colonna, Python sceglie il primo trovato secondo l'ordine di
// inserimento del dict (cioè il primo simbolo incontrato scorrendo la
// colonna); qui uso una Map, che preserva lo stesso ordine di
// inserimento, per garantire lo stesso risultato nei pareggi.
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

function maxSymbol(matrix) {
  const nCol = matrix[0].length;
  const risultato = [];
  for (let i = 0; i < nCol; i++) {
    const symbolCount = new Map();
    for (const row of matrix) {
      const symbol = row[i];
      symbolCount.set(symbol, (symbolCount.get(symbol) ?? 0) + 1);
    }
    let bestSymbol = null;
    let bestCount = -1;
    for (const [symbol, count] of symbolCount) {
      if (count > bestCount) {
        bestCount = count;
        bestSymbol = symbol;
      }
    }
    risultato.push(bestSymbol);
  }
  return risultato;
}

export default function solve(datasetText) {
  const matrix = parseFasta(datasetText);

  if (matrix.length === 0 || matrix.some((r) => r.length !== matrix[0].length)) {
    throw new Error("Input non valido: attesi record FASTA della stessa lunghezza");
  }

  return `${maxSymbol(matrix).join("")}\n`;
}
