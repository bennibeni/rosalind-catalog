// Distances in Trees (Rosalind ID: NWCK) - soluzione JavaScript
// indipendente, non una trascrizione di problem.py: stessa logica
// (parser ricorsivo discendente per il formato Newick senza lunghezze
// di ramo, costruzione della lista di adiacenza, poi BFS per la
// distanza tra due foglie nominate), riscritta in modo idiomatico per
// JS.
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python).
function parseNewick(sInput) {
  let s = sInput.trim();
  if (s.endsWith(";")) s = s.slice(0, -1);

  const adiacenza = new Map();
  const nomi = new Map();
  const pos = { v: 0 };
  const contatore = { v: 0 };

  function getAdiacenza(nodo) {
    if (!adiacenza.has(nodo)) adiacenza.set(nodo, []);
    return adiacenza.get(nodo);
  }

  function nuovoNodo() {
    contatore.v += 1;
    return contatore.v;
  }

  function parseClade() {
    const nodo = nuovoNodo();
    if (pos.v < s.length && s[pos.v] === "(") {
      pos.v += 1;
      while (true) {
        const figlio = parseClade();
        getAdiacenza(nodo).push(figlio);
        getAdiacenza(figlio).push(nodo);
        if (s[pos.v] === ",") {
          pos.v += 1;
          continue;
        } else if (s[pos.v] === ")") {
          pos.v += 1;
          break;
        }
      }
    }
    const inizioNome = pos.v;
    while (pos.v < s.length && !",()".includes(s[pos.v])) {
      pos.v += 1;
    }
    const nome = s.slice(inizioNome, pos.v);
    if (nome) nomi.set(nome, nodo);
    return nodo;
  }

  parseClade();
  return { adiacenza, nomi };
}

function distanza(adiacenza, nomi, x, y) {
  const partenza = nomi.get(x);
  const arrivo = nomi.get(y);
  const visitati = new Map([[partenza, 0]]);
  const coda = [partenza];
  let head = 0;
  while (head < coda.length) {
    const corrente = coda[head++];
    if (corrente === arrivo) return visitati.get(corrente);
    for (const vicino of adiacenza.get(corrente) ?? []) {
      if (!visitati.has(vicino)) {
        visitati.set(vicino, visitati.get(corrente) + 1);
        coda.push(vicino);
      }
    }
  }
  return null;
}

function lettura(datasetText) {
  const righe = datasetText
    .split("\n")
    .map((r) => r.trim())
    .filter((r) => r !== "");

  const blocchi = [];
  for (let i = 0; i < righe.length; i += 2) {
    const albero = righe[i];
    const [x, y] = righe[i + 1].split(/\s+/);
    blocchi.push([albero, x, y]);
  }
  return blocchi;
}

export default function solve(datasetText) {
  const blocchi = lettura(datasetText);

  if (blocchi.length === 0) {
    throw new Error("Input non valido: nessun blocco albero/coppia trovato");
  }

  const risultati = [];
  for (const [albero, x, y] of blocchi) {
    const { adiacenza, nomi } = parseNewick(albero);
    risultati.push(String(distanza(adiacenza, nomi, x, y)));
  }

  return `${risultati.join(" ")}\n`;
}
