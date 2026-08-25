// Locating Restriction Sites (Rosalind ID: REVP) - soluzione JavaScript
// indipendente, non una trascrizione di problem.py: stessa logica
// (parsing FASTA, poi ricerca di tutte le sottostringhe di lunghezza
// 4..12 che sono palindromi inversi, cioè uguali al proprio complemento
// inverso), riscritta in modo idiomatico per JS.
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python).
const COMPLEMENT = { A: "T", T: "A", C: "G", G: "C" };

function reverseComplement(dna) {
  let s = "";
  for (let i = dna.length - 1; i >= 0; i--) {
    s += COMPLEMENT[dna[i]] ?? dna[i];
  }
  return s;
}

// Estrae la sequenza del primo record FASTA (unico dataset atteso qui).
function primaSequenzaFasta(testo) {
  const righe = testo.split("\n").map((r) => r.replace(/\r$/, ""));
  let sequenza = "";
  let trovatoHeader = false;
  for (const riga of righe) {
    if (riga.startsWith(">")) {
      if (trovatoHeader) break; // secondo record: fermati, ci serve solo il primo
      trovatoHeader = true;
    } else if (trovatoHeader) {
      sequenza += riga;
    }
  }
  return sequenza;
}

export default function solve(datasetText) {
  const dna = primaSequenzaFasta(datasetText);

  if (!dna) {
    throw new Error("Input non valido: nessuna sequenza FASTA trovata");
  }

  const l1 = 4;
  const l2 = 12;
  const righeOutput = [];

  for (let i = 0; i <= dna.length - l1; i++) {
    for (let j = l1; j <= l2; j++) {
      const x = dna.slice(i, i + j);
      if (j > x.length) break;
      const y = reverseComplement(x);
      if (x === y) {
        righeOutput.push(`${i + 1} ${j}`);
      }
    }
  }

  return righeOutput.join("\n") + "\n";
}
