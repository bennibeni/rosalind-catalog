// Catalan Numbers and RNA Secondary Structures (Rosalind ID: CAT) -
// soluzione JavaScript indipendente, non una trascrizione di
// problem.py: stessa logica (conta le strutture secondarie non-crossing
// con accoppiamento Watson-Crick rigoroso A-U/G-C, ricorsivamente,
// spezzando la sequenza in coppia con l'ultimo carattere e tutto ciò
// che sta "dentro"/"fuori" a quella coppia), riscritta in modo
// idiomatico per JS.
//
// Nota: problem.py definisce anche una funzione catalan() memoizzata,
// ma non viene mai chiamata da main() - è codice morto nell'originale,
// quindi non è stata portata qui.
//
// Nota implementativa: problem.py enumera le posizioni del carattere
// complementare tramite ripetute chiamate a str.find(); qui, con lo
// stesso risultato, uso una singola scansione lineare da 0 a l-2 (dato
// che find() veniva comunque usato solo per elencare TUTTE le posizioni
// in ordine crescente, non per una ricerca "furba").
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python).
const MODULO = 1000000;
const OPP = { U: "A", A: "U", C: "G", G: "C" };

function validateGC(s) {
  let c = 0;
  let g = 0;
  for (const ch of s) {
    if (ch === "C") c++;
    else if (ch === "G") g++;
  }
  return c === g;
}

function validateUA(s) {
  let u = 0;
  let a = 0;
  for (const ch of s) {
    if (ch === "U") u++;
    else if (ch === "A") a++;
  }
  return u === a;
}

function valida(s) {
  return validateGC(s) && validateUA(s);
}

// Per la sequenza s, elenca tutte le coppie (chunk0, chunk1) candidate:
// per ogni posizione j pari (0-indexed) dove compare il complemento
// dell'ultimo carattere, chunk0 = s[0..j), chunk1 = s[j+1..l-1).
function getChunks(s) {
  const l = s.length;
  const c = OPP[s[l - 1]];
  const chunks = [];
  for (let j = 0; j < l - 1; j++) {
    if (s[j] === c && j % 2 === 0) {
      chunks.push([s.slice(0, j), s.slice(j + 1, l - 1)]);
    }
  }
  return chunks;
}

const memo = new Map();

function calcola(s) {
  if (memo.has(s)) return memo.get(s);

  let result;
  if (s.length === 0) {
    result = 1;
  } else if (s.length === 2) {
    result = OPP[s[0]] === s[1] ? 1 : 0;
  } else {
    result = calcolaChunks(getChunks(s));
  }
  result = result % MODULO;

  memo.set(s, result);
  return result;
}

function calcolaChunks(chunks) {
  let tot = 0;
  for (const [chunk0, chunk1] of chunks) {
    if (valida(chunk0)) {
      if (valida(chunk1)) {
        const result0 = calcola(chunk0);
        if (result0 > 0) {
          const result1 = calcola(chunk1);
          const tot1 = result0 * result1;
          tot = (tot + tot1) % MODULO;
        }
      }
    }
  }
  return tot;
}

function primaSequenzaFasta(testo) {
  const righe = testo.split("\n").map((r) => r.replace(/\r$/, ""));
  let record = "";
  let first = true;
  for (const riga of righe) {
    if (riga.startsWith(">")) {
      if (!first) return record;
      first = false;
    } else {
      record += riga;
    }
  }
  return record;
}

export default function solve(datasetText) {
  const s = primaSequenzaFasta(datasetText);

  if (!s) {
    throw new Error("Input non valido: nessuna sequenza FASTA trovata");
  }

  const tot = calcolaChunks(getChunks(s));
  return `${tot}\n`;
}
