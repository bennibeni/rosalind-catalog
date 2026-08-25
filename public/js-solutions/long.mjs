// Genome Assembly as Shortest Superstring (Rosalind ID: LONG) -
// soluzione JavaScript indipendente, non una trascrizione di
// problem.py: stesso algoritmo greedy multi-passata (prova a fondere
// ogni frammento non ancora usato nella soluzione accumulata via
// contenimento diretto o sovrapposizione suffisso/prefisso, ripetendo
// finché tutti i frammenti sono usati o si superano 100 passate),
// riscritta in modo idiomatico per JS.
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python).

// t sottostringa di s.
function match(s, t) {
  return s.includes(t) ? s : null;
}

// k = suffisso di s che combacia con un prefisso di lunghezza k di t.
function match1(s, t, k) {
  if (t.slice(0, k) === s.slice(-k)) return s + t.slice(k);
  return null;
}

// k = prefisso di s che combacia con un suffisso di lunghezza k di t.
function match2(s, t, k) {
  if (s.slice(0, k) === t.slice(-k)) return t.slice(0, -k) + s;
  return null;
}

function bestmatch1(s, t, da, a) {
  for (let k = da; k >= a; k--) {
    const ok = match1(s, t, k);
    if (ok !== null) return ok;
  }
  return null;
}

function bestmatch2(s, t, da, a) {
  for (let k = da; k >= a; k--) {
    const ok = match2(s, t, k);
    if (ok !== null) return ok;
  }
  return null;
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

function cond(sol, curr) {
  if (sol === "") return curr;

  let sol1 = match(sol, curr);
  if (sol1 !== null) return sol1;

  sol1 = bestmatch1(sol, curr, curr.length, Math.floor(curr.length / 2) + 2);
  if (sol1 !== null) return sol1;

  sol1 = bestmatch2(sol, curr, curr.length, Math.floor(curr.length / 2) + 2);
  if (sol1 !== null) return sol1;

  return null;
}

export default function solve(datasetText) {
  const arr1 = parseFasta(datasetText);

  if (arr1.length === 0) {
    throw new Error("Input non valido: nessun record FASTA trovato");
  }

  let tot = 0;
  let sol = "";
  let i = 0;
  let loops = 1;
  const maxloops = 100;
  const used = new Array(arr1.length).fill(false);

  while (tot < arr1.length && loops < maxloops) {
    const curr = arr1[i];
    if (!used[i]) {
      const sol1 = cond(sol, curr);
      if (sol1 !== null) {
        sol = sol1;
        used[i] = true;
        tot += 1;
      }
    }
    i += 1;
    if (i === arr1.length) {
      loops += 1;
      i = 0;
    }
  }

  return `${sol}\n`;
}
