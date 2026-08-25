// ini5 - esercizio introduttivo "Python Village": stampa le righe di
// indice dispari (0-indexed) del file di input. Soluzione JavaScript
// indipendente, non una trascrizione di problem.py, riscritta in modo
// idiomatico per JS.
//
// Nota: problem.py scrive anche le stesse righe su un file locale
// fileOut.txt, ma quell'effetto collaterale non fa parte dell'output
// atteso da Rosalind (che valuta solo lo stdout) - qui viene omesso
// perché il contratto di questa funzione è "testo in, testo out".
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python, cioè dello stdout).
export default function solve(datasetText) {
  const righe = datasetText.split("\n");

  const output = righe
    .filter((_, i) => i % 2 === 1)
    .map((riga) => riga.replace(/\r?\n?$/, ""));

  return output.join("\n") + "\n";
}
