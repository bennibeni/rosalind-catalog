// Speeding Up Motif Finding (Rosalind ID: KMP) - soluzione JavaScript
// indipendente, non una trascrizione di problem.py: stessa logica
// (parsing del primo record FASTA, poi calcolo del failure array alla
// Knuth-Morris-Pratt), riscritta in modo idiomatico per JS.
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python).

// Estrae la sequenza del primo record FASTA (il file può contenerne
// altri dopo, ma qui ci interessa solo il primo).
function primaSequenzaFasta(testo) {
  const righe = testo.split("\n").map((r) => r.replace(/\r$/, ""));
  let record = "";
  let first = true;
  for (const riga of righe) {
    if (riga.startsWith(">")) {
      if (!first) break;
      first = false;
    } else {
      record += riga;
    }
  }
  return record;
}

function failureArray(s) {
  const n = s.length;
  const fail = new Array(n).fill(0);
  let k = 0;
  for (let i = 1; i < n; i++) {
    while (k > 0 && s[k] !== s[i]) {
      k = fail[k - 1];
    }
    if (s[k] === s[i]) {
      k += 1;
    }
    fail[i] = k;
  }
  return fail;
}

export default function solve(datasetText) {
  const s = primaSequenzaFasta(datasetText);

  if (!s) {
    throw new Error("Input non valido: nessuna sequenza FASTA trovata");
  }

  const fail = failureArray(s);
  return `${fail.join(" ")}\n`;
}
