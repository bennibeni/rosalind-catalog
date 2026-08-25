// Calculating Protein Mass (Rosalind ID: PRTM) - soluzione JavaScript
// indipendente, non una trascrizione di problem.py: stessa logica
// (somma delle masse monoisotopiche di ciascun amminoacido della
// proteina, arrotondata a 3 decimali), riscritta in modo idiomatico per
// JS.
//
// Nota sull'arrotondamento e sul formato numero: stesse considerazioni
// già fatte in prob.mjs (round-half-to-even di Python contro
// Math.round di JS, e ".0" finale per un risultato intero).
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python).
const MASS_TABLE = {
  A: 71.03711, C: 103.00919, D: 115.02694, E: 129.04259, F: 147.06841,
  G: 57.02146, H: 137.05891, I: 113.08406, K: 128.09496, L: 113.08406,
  M: 131.04049, N: 114.04293, P: 97.05276, Q: 128.05858, R: 156.10111,
  S: 87.03203, T: 101.04768, V: 99.06841, W: 186.07931, Y: 163.06333,
};

function arrotonda(x) {
  return Math.round(x * 1000) / 1000;
}

function formatta(v) {
  return Number.isInteger(v) ? v.toFixed(1) : String(v);
}

export default function solve(datasetText) {
  const prot = datasetText.split("\n")[0].trim();

  if (!prot) {
    throw new Error("Input non valido: attesa una sequenza proteica non vuota");
  }

  let tot = 0;
  for (const char of prot) {
    const massa = MASS_TABLE[char];
    if (massa === undefined) {
      throw new Error(`Input non valido: carattere "${char}" non è un amminoacido riconosciuto`);
    }
    tot += massa;
  }

  return `${formatta(arrotonda(tot))}\n`;
}
