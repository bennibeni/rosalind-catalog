// Constructing a Trie from a Collection of Patterns (Rosalind ID:
// TRIE) - soluzione JavaScript indipendente, non una trascrizione di
// problem.py: stessa logica (costruzione incrementale del trie, un
// nodo per ogni prefisso nuovo, elencando ogni arco come
// "genitore figlio simbolo"), riscritta in modo idiomatico per JS.
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python).
function lettura(datasetText) {
  return datasetText
    .split("\n")
    .map((r) => r.trim())
    .filter((riga) => riga !== "");
}

function costruisciTrie(patterns) {
  const trie = new Map([[1, new Map()]]);
  let contatore = 1;
  const archi = [];

  for (const pattern of patterns) {
    let corrente = 1;
    for (const simbolo of pattern) {
      const nodoCorrente = trie.get(corrente);
      if (nodoCorrente.has(simbolo)) {
        corrente = nodoCorrente.get(simbolo);
      } else {
        contatore += 1;
        const nuovo = contatore;
        nodoCorrente.set(simbolo, nuovo);
        trie.set(nuovo, new Map());
        archi.push([corrente, nuovo, simbolo]);
        corrente = nuovo;
      }
    }
  }

  return archi;
}

export default function solve(datasetText) {
  const patterns = lettura(datasetText);

  if (patterns.length === 0) {
    throw new Error("Input non valido: nessun pattern trovato");
  }

  const archi = costruisciTrie(patterns);
  const righeOutput = archi.map(([parent, figlio, simbolo]) => `${parent} ${figlio} ${simbolo}`);

  return righeOutput.join("\n") + "\n";
}
