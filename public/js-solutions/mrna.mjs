// Inferring mRNA from Protein (Rosalind ID: MRNA) - soluzione
// JavaScript indipendente, non una trascrizione di problem.py: stessa
// logica (per ogni amminoacido, conta quanti codoni lo codificano;
// moltiplica questi conteggi per ogni carattere della proteina, più uno
// per il codone di stop finale, il tutto mod 1.000.000), riscritta in
// modo idiomatico per JS.
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python).
const TABLE = {
  UUU: "F", CUU: "L", AUU: "I", GUU: "V",
  UUC: "F", CUC: "L", AUC: "I", GUC: "V",
  UUA: "L", CUA: "L", AUA: "I", GUA: "V",
  UUG: "L", CUG: "L", AUG: "M", GUG: "V",
  UCU: "S", CCU: "P", ACU: "T", GCU: "A",
  UCC: "S", CCC: "P", ACC: "T", GCC: "A",
  UCA: "S", CCA: "P", ACA: "T", GCA: "A",
  UCG: "S", CCG: "P", ACG: "T", GCG: "A",
  UAU: "Y", CAU: "H", AAU: "N", GAU: "D",
  UAC: "Y", CAC: "H", AAC: "N", GAC: "D",
  UAA: "Stop", CAA: "Q", AAA: "K", GAA: "E",
  UAG: "Stop", CAG: "Q", AAG: "K", GAG: "E",
  UGU: "C", CGU: "R", AGU: "S", GGU: "G",
  UGC: "C", CGC: "R", AGC: "S", GGC: "G",
  UGA: "Stop", CGA: "R", AGA: "R", GGA: "G",
  UGG: "W", CGG: "R", AGG: "R", GGG: "G",
};

const MODULO = 1000000;

export default function solve(datasetText) {
  const s = datasetText.split("\n")[0].trim();

  if (!s) {
    throw new Error("Input non valido: attesa una sequenza proteica non vuota");
  }

  const scores = {};
  for (const value of Object.values(TABLE)) {
    scores[value] = (scores[value] || 0) + 1;
  }

  let tot = scores["Stop"];
  for (const c of s) {
    const count = scores[c];
    if (count === undefined) {
      throw new Error(`Input non valido: carattere "${c}" non è un amminoacido riconosciuto`);
    }
    tot = (tot * count) % MODULO;
  }

  return `${tot}\n`;
}
