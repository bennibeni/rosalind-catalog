// Sorting by Reversals (Rosalind ID: SORT) - soluzione JavaScript
// indipendente, non una trascrizione di problem.py: stesso algoritmo
// (BFS bidirezionale sul grafo delle permutazioni generato dai
// reversal, che sfrutta il fatto che un reversal è la propria
// inversa per ricostruire il percorso concatenando le due metà),
// riscritta in modo idiomatico per JS.
//
// Le permutazioni sono tenute come array di interi per le operazioni,
// e come stringa "a,b,c,..." per le chiavi delle Map (equivalente delle
// tuple Python, che sono hashable direttamente).
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python).
function inverti(perm, i, j) {
  const nuovo = perm.slice();
  for (let a = i, b = j; a < b; a++, b--) {
    const tmp = nuovo[a];
    nuovo[a] = nuovo[b];
    nuovo[b] = tmp;
  }
  return nuovo;
}

function chiave(perm) {
  return perm.join(",");
}

function bfsBidirezionale(inizio, fine) {
  const n = inizio.length;
  const mosse = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) mosse.push([i, j]);
  }

  const chiaveInizio = chiave(inizio);
  const chiaveFine = chiave(fine);

  if (chiaveInizio === chiaveFine) return [];

  // genitore_*: chiave permutazione -> chiave permutazione genitore (o
  // null per la radice). mossa_*: chiave permutazione -> [i, j] usata
  // per raggiungerla dal genitore.
  const genitoreAvanti = new Map([[chiaveInizio, null]]);
  const mossaAvanti = new Map();
  let fronteAvanti = [inizio];

  const genitoreIndietro = new Map([[chiaveFine, null]]);
  const mossaIndietro = new Map();
  let fronteIndietro = [fine];

  let incontro = null;

  while (incontro === null) {
    if (fronteAvanti.length <= fronteIndietro.length) {
      const nuovoFronte = [];
      outer: for (const perm of fronteAvanti) {
        const kPerm = chiave(perm);
        for (const [i, j] of mosse) {
          const nuovo = inverti(perm, i, j);
          const kNuovo = chiave(nuovo);
          if (!genitoreAvanti.has(kNuovo)) {
            genitoreAvanti.set(kNuovo, kPerm);
            mossaAvanti.set(kNuovo, [i, j]);
            if (genitoreIndietro.has(kNuovo)) {
              incontro = kNuovo;
              break outer;
            }
            nuovoFronte.push(nuovo);
          }
        }
      }
      fronteAvanti = nuovoFronte;
    } else {
      const nuovoFronte = [];
      outer: for (const perm of fronteIndietro) {
        const kPerm = chiave(perm);
        for (const [i, j] of mosse) {
          const nuovo = inverti(perm, i, j);
          const kNuovo = chiave(nuovo);
          if (!genitoreIndietro.has(kNuovo)) {
            genitoreIndietro.set(kNuovo, kPerm);
            mossaIndietro.set(kNuovo, [i, j]);
            if (genitoreAvanti.has(kNuovo)) {
              incontro = kNuovo;
              break outer;
            }
            nuovoFronte.push(nuovo);
          }
        }
      }
      fronteIndietro = nuovoFronte;
    }
  }

  // Ricostruisce il percorso: inizio -> incontro.
  const percorsoAvanti = [];
  let corrente = incontro;
  while (genitoreAvanti.get(corrente) !== null) {
    percorsoAvanti.push(mossaAvanti.get(corrente));
    corrente = genitoreAvanti.get(corrente);
  }
  percorsoAvanti.reverse();

  // Ricostruisce il percorso: incontro -> fine (il reversal è la
  // propria inversa, quindi si può riusare la stessa mossa).
  const percorsoIndietro = [];
  corrente = incontro;
  while (genitoreIndietro.get(corrente) !== null) {
    percorsoIndietro.push(mossaIndietro.get(corrente));
    corrente = genitoreIndietro.get(corrente);
  }

  return [...percorsoAvanti, ...percorsoIndietro];
}

function lettura(datasetText) {
  const righe = datasetText
    .split("\n")
    .map((r) => r.trim())
    .filter((r) => r !== "")
    .map((r) => r.split(/\s+/).map(Number));

  return { pi: righe[0], gamma: righe[1] };
}

export default function solve(datasetText) {
  const { pi, gamma } = lettura(datasetText);

  if (!pi || !gamma || pi.length !== gamma.length) {
    throw new Error("Input non valido: attese due permutazioni della stessa lunghezza");
  }

  const mosse = bfsBidirezionale(pi, gamma);

  const righeOutput = [String(mosse.length)];
  for (const [i, j] of mosse) {
    righeOutput.push(`${i + 1} ${j + 1}`);
  }

  return `${righeOutput.join("\n")}\n`;
}
