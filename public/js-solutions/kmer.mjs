// k-Mer Composition (Rosalind ID: KMER) - soluzione JavaScript
// indipendente, non una trascrizione di problem.py: stessa logica
// (parsing FASTA, conteggio di tutti i 4-mer nella sequenza, poi
// output nell'ordine lessicografico dei 4^4 possibili 4-mer
// sull'alfabeto ACGT), riscritta in modo idiomatico per JS.
//
// L'ordine dei k-mer riproduce quello di
// itertools.product("ACGT", repeat=4): l'ultima posizione varia più
// velocemente, esattamente come in lexf.mjs.
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python).
const K = 4;
const ALFABETO = "ACGT";

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

function contaKmer(s, k) {
  const conteggi = new Map();
  for (let i = 0; i <= s.length - k; i++) {
    const kmer = s.slice(i, i + k);
    conteggi.set(kmer, (conteggi.get(kmer) ?? 0) + 1);
  }
  return conteggi;
}

function* prodotto(simboli, k) {
  if (k === 0) {
    yield "";
    return;
  }
  for (const s of simboli) {
    for (const resto of prodotto(simboli, k - 1)) {
      yield s + resto;
    }
  }
}

export default function solve(datasetText) {
  const seqs = parseFasta(datasetText);
  const s = seqs[0] ?? "";

  if (!s) {
    throw new Error("Input non valido: nessuna sequenza FASTA trovata");
  }

  const conteggi = contaKmer(s, K);
  const risultato = [];
  for (const kmer of prodotto(ALFABETO, K)) {
    risultato.push(conteggi.get(kmer) ?? 0);
  }

  return `${risultato.join(" ")}\n`;
}
