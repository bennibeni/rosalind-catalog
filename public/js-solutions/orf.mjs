// Open Reading Frames (Rosalind ID: ORF) - soluzione JavaScript
// indipendente, non una trascrizione di problem.py: stessa logica
// (traduce ciascuno dei 3 frame di lettura in avanti e dei 3 sul
// complemento inverso, marcando ogni "AUG" come possibile inizio e ogni
// stop come fine, poi estrae tutte le sottosequenze proteiche valide -
// una per ogni AUG interno fino al primo stop successivo - deduplicando
// i risultati), riscritta in modo idiomatico per JS.
//
// I due decoratori Python (RNA2PRT, get_chunks) sono qui semplici
// funzioni in pipeline, non un'astrazione a decoratori - stesso
// comportamento, resa più diretta in JS.
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python).
const MAPPA = {
  UUU: "F", UUC: "F", UUA: "L", UUG: "L",
  UCU: "S", UCC: "S", UCA: "S", UCG: "S",
  UAU: "Y", UAC: "Y", UAA: "STOP", UAG: "STOP",
  UGU: "C", UGC: "C", UGA: "STOP", UGG: "W",
  CUU: "L", CUC: "L", CUA: "L", CUG: "L",
  CCU: "P", CCC: "P", CCA: "P", CCG: "P",
  CAU: "H", CAC: "H", CAA: "Q", CAG: "Q",
  CGU: "R", CGC: "R", CGA: "R", CGG: "R",
  AUU: "I", AUC: "I", AUA: "I", AUG: "M",
  ACU: "T", ACC: "T", ACA: "T", ACG: "T",
  AAU: "N", AAC: "N", AAA: "K", AAG: "K",
  AGU: "S", AGC: "S", AGA: "R", AGG: "R",
  GUU: "V", GUC: "V", GUA: "V", GUG: "V",
  GCU: "A", GCC: "A", GCA: "A", GCG: "A",
  GAU: "D", GAC: "D", GAA: "E", GAG: "E",
  GGU: "G", GGC: "G", GGA: "G", GGG: "G",
};
const START = "AUG";

// Traduce l'RNA in una stringa "marcata": '<' + M prima di ogni AUG
// (possibile inizio ORF), '>' al posto di ogni stop, '?' per codoni
// sconosciuti (es. lunghezza non multipla di 3 all'ultima terna).
function rna2prt(rna) {
  let stringa = "";
  let terna = "";
  let t = 0;
  for (const ch of rna) {
    terna += ch;
    t = (t + 1) % 3;
    if (t === 0) {
      if (!(terna in MAPPA)) stringa += "?";
      else if (terna === START) stringa += `<${MAPPA[terna]}`;
      else if (MAPPA[terna] === "STOP") stringa += ">";
      else stringa += MAPPA[terna];
      terna = "";
    }
  }
  return stringa;
}

// Per ogni '<' nella stringa marcata, estrae il chunk fino al primo '>'
// successivo (se esiste) - un chunk per OGNI AUG interno, non solo il
// primo, così un frame con AUG multipli produce un ORF candidato per
// ciascuno.
function getChunks(prt) {
  const chunks = [];
  for (let i = 0; i < prt.length; i++) {
    if (prt[i] === "<") {
      const j = prt.indexOf(">", i + 1);
      if (j !== -1) chunks.push(prt.slice(i, j));
    }
  }
  return chunks;
}

function dna2prt(sequenceDna) {
  const rna = sequenceDna.replaceAll("T", "U");
  return getChunks(rna2prt(rna));
}

const COMPLEMENT = { A: "T", T: "A", C: "G", G: "C" };
function reverseDNA(dna) {
  let s = "";
  for (let i = dna.length - 1; i >= 0; i--) {
    s += COMPLEMENT[dna[i]] ?? dna[i];
  }
  return s;
}

function parseFasta(testo) {
  const righe = testo.split("\n").map((r) => r.replace(/\r$/, ""));
  const bodies = [];
  let corpo = "";
  let first = true;
  for (const riga of righe) {
    if (riga.startsWith(">")) {
      if (!first) bodies.push(corpo);
      corpo = "";
      first = false;
    } else {
      corpo += riga;
    }
  }
  bodies.push(corpo);
  return bodies;
}

function step(soluzioni, dna) {
  for (const i of [0, 1, 2]) {
    const sequence = dna.slice(i);
    const chunks = dna2prt(sequence);
    for (const chunk of chunks) {
      const current = chunk.replaceAll("<", "").replaceAll(">", "");
      if (!soluzioni.includes(current)) soluzioni.push(current);
    }
  }
  return soluzioni;
}

export default function solve(datasetText) {
  const records = parseFasta(datasetText);
  const dna = records[0];

  if (!dna) {
    throw new Error("Input non valido: nessuna sequenza FASTA trovata");
  }

  const soluzioni = [];
  step(soluzioni, dna);
  step(soluzioni, reverseDNA(dna));

  return `${soluzioni.join("\n")}\n`;
}
