// Introduction to Random Strings (Rosalind ID: PROB) - soluzione
// JavaScript indipendente, non una trascrizione di problem.py: stessa
// logica (per ciascun GC-content candidato, calcola il logaritmo in
// base 10 della probabilità di generare la stringa data, arrotondato a
// 3 decimali), riscritta in modo idiomatico per JS.
//
// Nota sull'arrotondamento: problem.py usa round(x*1000)/1000, e il
// round() nativo di Python arrotonda "al pari" nei casi di parità esatta
// (banker's rounding), mentre Math.round di JS arrotonda sempre verso
// l'alto. La differenza si manifesta solo per un valore esattamente a
// metà tra due millesimi (x*1000 con parte decimale = 0.5 esatto), un
// caso di misura nulla con numeri log10 in virgola mobile - non
// rilevante in pratica per questo problema.
//
// Nota sul formato numero: come in iev.mjs, un valore intero va
// stampato con ".0" finale per coincidere con print() di un float
// Python.
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python).
function arrotonda(x) {
  const v = Math.round(x * 1000) / 1000;
  // Normalizza -0 a 0 (Python: round(-0.0001*1000)/1000 può dare -0.0,
  // che print() mostra come "-0.0" - comportamento identico, quindi qui
  // NON normalizziamo -0, lo lasciamo passare così com'è per fedeltà.
  return v;
}

function formatta(v) {
  return Number.isInteger(v) ? v.toFixed(1) : String(v);
}

export default function solve(datasetText) {
  const righe = datasetText.split("\n");
  const s = (righe[0] ?? "").trim();
  const A = (righe[1] ?? "").trim().split(/\s+/).map(Number);

  if (!s || A.length === 0 || A.some((a) => Number.isNaN(a))) {
    throw new Error("Input non valido: attese una stringa di DNA e una lista di GC-content");
  }

  const result = A.map((a) => {
    let tot = 0;
    for (const c of s) {
      tot += Math.log10(c === "C" || c === "G" ? a / 2 : (1 - a) / 2);
    }
    return formatta(arrotonda(tot));
  });

  return `${result.join(" ")}\n`;
}
