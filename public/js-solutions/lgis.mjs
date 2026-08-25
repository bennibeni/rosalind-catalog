// Longest Increasing Subsequence (Rosalind ID: LGIS) - soluzione
// JavaScript indipendente, non una trascrizione di problem.py: stesso
// algoritmo DP O(n^2) (per ogni coppia i<j con n[j] "successivo"
// rispetto a n[i] secondo il comparatore scelto, estende la catena più
// lunga terminante in i), eseguito due volte - una per la sottosequenza
// crescente, una per quella decrescente - riscritta in modo idiomatico
// per JS.
//
// Nota sul formato: come in inod.mjs/tree.mjs, problem.py fa
// print("", " ".join(sol)), che con il separatore di default di print
// produce uno SPAZIO INIZIALE prima della sequenza - riprodotto
// identico.
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python).
function gt(x, y) {
  return x > y;
}

function lt(x, y) {
  return y > x;
}

function lettura(datasetText) {
  const righe = datasetText.split("\n").map((r) => r.replace(/\r$/, ""));
  const n = righe[1].trim().split(/\s+/);
  return n;
}

function risolviCatena(n, valori, func) {
  const len = n.length;
  const arr = Array.from({ length: len }, () => [0, 0]);
  let maxDistance = 0;
  let maxDistanceI = 0;

  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (func(valori[j], valori[i])) {
        const oldDistance = arr[i][0];
        const newDistance = arr[j][0];
        if (newDistance < oldDistance + 1) {
          arr[j][0] = oldDistance + 1;
          arr[j][1] = i;
          if (oldDistance + 1 > maxDistance) {
            maxDistance = oldDistance + 1;
            maxDistanceI = j;
          }
        }
      }
    }
  }

  let prev = maxDistanceI;
  const sol = [];
  while (true) {
    sol.unshift(n[prev]);
    if (arr[prev][0] === 0) break;
    prev = arr[prev][1];
  }
  return sol;
}

export default function solve(datasetText) {
  const n = lettura(datasetText);

  if (n.length === 0 || n.some((x) => !/^-?\d+$/.test(x))) {
    throw new Error("Input non valido: attesa una sequenza di interi");
  }

  const valori = n.map(Number);
  const funcs = [gt, lt];

  const righeOutput = funcs.map((func) => ` ${risolviCatena(n, valori, func).join(" ")}`);

  return `${righeOutput.join("\n")}\n`;
}
