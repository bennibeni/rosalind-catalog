// Error Correction in Reads (Rosalind ID: CORR) - soluzione JavaScript
// indipendente, non una trascrizione di problem.py: stessa logica
// (raggruppa le read per forma canonica - il minimo lessicografico tra
// la read e il suo complemento inverso - separa quelle viste una sola
// volta, "sbagliate", da quelle viste più volte, "corrette", poi per
// ogni read sbagliata cerca una read corretta a distanza di Hamming 1,
// in una qualunque delle due orientazioni), riscritta in modo
// idiomatico per JS.
//
// Nota sull'ordine di inserimento: come il dict di Python, la Map di JS
// preserva l'ordine di inserimento delle chiavi - necessario qui perché
// "input" viene sovrascritto ad ogni read duplicata con la stessa forma
// canonica (rimane solo l'ULTIMA read testuale vista con quella forma),
// e l'ordine di iterazione finale su "ko"/"ok" deve coincidere con
// quello di problem.py per un output identico riga per riga.
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python).
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
  const arr = [];
  let corpo = "";
  let first = true;
  for (const riga of righe) {
    if (riga.startsWith(">")) {
      if (!first) arr.push(corpo);
      corpo = "";
      first = false;
    } else {
      corpo += riga;
    }
  }
  arr.push(corpo);
  return arr;
}

function makeDiz(arr) {
  const diz = new Map();
  for (const seq of arr) {
    const revcomp = reverseDNA(seq);
    const key = seq < revcomp ? seq : revcomp;
    diz.set(key, { input: seq, pair: new Set([seq, revcomp]), tot: 0 });
  }
  for (const seq of arr) {
    const revcomp = reverseDNA(seq);
    const key = seq < revcomp ? seq : revcomp;
    diz.get(key).tot += 1;
  }
  return diz;
}

function count(x, y) {
  if (x.length !== y.length) {
    throw new Error(`Input non valido: len(${x}) != len(${y})`);
  }
  let tot = 0;
  for (let i = 0; i < x.length; i++) {
    if (x[i] !== y[i]) tot++;
  }
  return tot;
}

function dizko(diz) {
  return [...diz.values()].filter((v) => v.tot === 1);
}

function dizok(diz) {
  return [...diz.values()].filter((v) => v.tot > 1);
}

function findDnas(ok, inputSeq, righeOutput) {
  for (const keyok of ok) {
    let msg = null;
    for (const dnaok of keyok.pair) {
      if (msg === null) {
        const c = count(inputSeq, dnaok);
        if (c === 1) {
          msg = `${inputSeq}->${dnaok}`;
          break;
        }
      }
    }
    if (msg !== null) righeOutput.push(msg);
  }
}

export default function solve(datasetText) {
  const arr = parseFasta(datasetText);

  if (arr.length === 0) {
    throw new Error("Input non valido: nessun record FASTA trovato");
  }

  const diz = makeDiz(arr);
  const ko = dizko(diz);
  const ok = dizok(diz);

  const righeOutput = [];
  for (const keyko of ko) {
    findDnas(ok, keyko.input, righeOutput);
  }

  return `${righeOutput.join("\n")}\n`;
}
