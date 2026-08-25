// Calculating Expected Offspring (Rosalind ID: IEV) - soluzione
// JavaScript indipendente, non una trascrizione di problem.py: stessa
// logica (numero atteso di figli dominanti per ciascuna delle 6 coppie
// genotipiche, sommato su 2 figli per coppia), riscritta in modo
// idiomatico per JS.
//
// Nota sul formato numero: come l'originale Python, il risultato è
// sempre un multiplo di 0.5 (esatto in virgola mobile binaria), quindi
// per riprodurre l'output di print() - "N.0" per un intero, "N.5" per
// un valore frazionario - basta un controllo su Number.isInteger.
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python).
const EVTS = [4, 4, 4, 3, 2, 0];

export default function solve(datasetText) {
  const dati = datasetText.split("\n")[0].trim().split(/\s+/);

  if (dati.length !== 6 || dati.some((d) => !/^\d+$/.test(d))) {
    throw new Error(`Input non valido: attesi 6 interi, ricevuto "${dati.join(" ")}"`);
  }

  let tot = 0;
  for (let i = 0; i < EVTS.length; i++) {
    tot += EVTS[i] * Number(dati[i]) * 0.5;
  }

  const testo = Number.isInteger(tot) ? tot.toFixed(1) : String(tot);
  return `${testo}\n`;
}
