// RNA Splicing (Rosalind ID: SPLC) - soluzione JavaScript indipendente,
// non una trascrizione di problem.py: stessa logica (rimuove tutti gli
// introni dalla sequenza di DNA, trascrive in RNA, poi traduce filtrando
// via ogni codone di stop), riscritta in modo idiomatico per JS.
//
// Nota sul filtraggio degli stop: a differenza di prot.py (che si
// FERMA al primo stop incontrato), qui - fedelmente all'originale -
// vengono semplicemente SCARTATI tutti i codoni "Stop" ovunque
// compaiano nella sequenza, senza fermare la traduzione. È il
// comportamento reale di splc.py, non un bug introdotto qui.
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

function getMRNA(s) {
  const arr = [];
  for (let i = 0; i < s.length; i += 3) {
    const codone = TABLE[s.slice(i, i + 3)];
    if (codone !== "Stop") arr.push(codone);
  }
  return arr.join("");
}

function getRNA(s) {
  return s.replaceAll("T", "U");
}

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
  const data = parseFasta(datasetText);

  if (data.length < 2) {
    throw new Error("Input non valido: attesi almeno un DNA e un introne come record FASTA");
  }

  let dna = data[0];
  for (let i = 1; i < data.length; i++) {
    dna = dna.split(data[i]).join("");
  }

  const rna = getRNA(dna);
  const mrna = getMRNA(rna);

  return `${mrna}\n`;
}
