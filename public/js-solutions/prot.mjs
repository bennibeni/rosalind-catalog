// Translating RNA into Protein (Rosalind ID: PROT) - soluzione
// JavaScript indipendente, non una trascrizione di problem.py: stessa
// logica (traduce codone per codone finché non incontra uno stop),
// riscritta in modo idiomatico per JS.
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python).
const MAPPA = {
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
  UAA: "STOP", CAA: "Q", AAA: "K", GAA: "E",
  UAG: "STOP", CAG: "Q", AAG: "K", GAG: "E",
  UGU: "C", CGU: "R", AGU: "S", GGU: "G",
  UGC: "C", CGC: "R", AGC: "S", GGC: "G",
  UGA: "STOP", CGA: "R", AGA: "R", GGA: "G",
  UGG: "W", CGG: "R", AGG: "R", GGG: "G",
};

export default function solve(datasetText) {
  const riga = datasetText.split("\n")[0].trim();

  if (!riga) {
    throw new Error("Input non valido: attesa una sequenza di RNA non vuota");
  }

  const arr = [];
  for (let i = 0; i < riga.length; i += 3) {
    const tripletta = riga.slice(i, i + 3);
    const codone = MAPPA[tripletta];
    if (codone === undefined) {
      throw new Error(`Input non valido: codone "${tripletta}" non riconosciuto`);
    }
    if (codone === "STOP") break;
    arr.push(codone);
  }

  return `${arr.join("")}\n`;
}
