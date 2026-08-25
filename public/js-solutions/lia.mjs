// Independent Alleles (Rosalind ID: LIA) - soluzione JavaScript
// indipendente, non una trascrizione di problem.py: stessa logica
// (probabilità che almeno m individui su N=2^k alla generazione k siano
// di genotipo AaBb, sommando la distribuzione binomiale con p=1/4),
// riscritta in modo idiomatico per JS.
//
// Differenza implementativa: problem.py costruisce l'intero triangolo
// di Tartaglia riga per riga (ricorsivo) solo per ottenere i coefficienti
// binomiali C(N, i); qui li calcolo direttamente con la formula
// moltiplicativa iterativa, matematicamente equivalente ma senza
// costruire una struttura intermedia O(N^2) né rischiare limiti di
// ricorsione per N grande (N = 2^k può arrivare a 128).
//
// Nota sull'arrotondamento e sul formato numero: stesse considerazioni
// già fatte in prob.mjs/prtm.mjs (round-half-to-even di Python contro
// Math.round di JS, e ".0" finale per un risultato intero).
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python).
function binomiale(n, i) {
  // C(n, i) tramite formula moltiplicativa, per evitare overflow di
  // fattoriali diretti su n fino a ~128.
  if (i < 0 || i > n) return 0;
  let risultato = 1;
  const k = Math.min(i, n - i);
  for (let j = 0; j < k; j++) {
    risultato = (risultato * (n - j)) / (j + 1);
  }
  return risultato;
}

function arrotonda(x) {
  return Math.round(x * 1000) / 1000;
}

function formatta(v) {
  return Number.isInteger(v) ? v.toFixed(1) : String(v);
}

function formula(kGenerazioni, m) {
  const N = 2 ** kGenerazioni;
  const a = 3 / 4;
  const b = 1 / 4;
  let tot = 0;
  for (let i = m; i <= N; i++) {
    tot += a ** (N - i) * b ** i * binomiale(N, i);
  }
  return tot;
}

export default function solve(datasetText) {
  const parti = datasetText.split("\n")[0].trim().split(/\s+/);

  if (parti.length !== 2 || parti.some((p) => !/^\d+$/.test(p))) {
    throw new Error(`Input non valido: attesi due interi "k m", ricevuto "${parti.join(" ")}"`);
  }

  const [kGenerazioni, m] = parti.map(Number);
  const result = formula(kGenerazioni, m);

  return `${formatta(arrotonda(result))}\n`;
}
