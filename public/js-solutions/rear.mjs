// Reversal Distance (Rosalind ID: REAR) - soluzione JavaScript
// indipendente, non una trascrizione di problem.py.
//
// Il calcolo vero e proprio (BFS sull'intero grafo delle permutazioni
// di 10 elementi, 3.628.800 nodi) gira in rear.worker.js, un Web
// Worker su un thread separato - vedi i commenti lì per l'algoritmo
// completo e le note di correttezza. Farlo girare sul thread
// principale (come nella prima versione di questo file) bloccava la
// UI della pagina finché il calcolo non finiva; su un worker la pagina
// resta reattiva, anche se il calcolo stesso richiede comunque lo
// stesso tempo (da decine di secondi a qualche minuto, a seconda
// dell'hardware).
//
// Compatibilità: rear.worker.js è un worker "classico" (non un ES
// module worker), per il supporto più ampio possibile tra browser.
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python).

// Worker persistente a livello di modulo: se l'utente preme "Esegui
// ora" più volte nella stessa sessione di pagina, si riusa lo stesso
// worker (che ha già la sua cache interna del BFS) invece di crearne
// uno nuovo ogni volta.
let _worker = null;

function getWorker() {
  if (!_worker) {
    _worker = new Worker(new URL("./rear.worker.js", import.meta.url));
  }
  return _worker;
}

export default function solve(datasetText) {
  return new Promise((resolve, reject) => {
    const worker = getWorker();

    function onMessage(evento) {
      worker.removeEventListener("message", onMessage);
      worker.removeEventListener("error", onError);
      const { ok, result, error } = evento.data;
      if (ok) resolve(result);
      else reject(new Error(error));
    }

    function onError(err) {
      worker.removeEventListener("message", onMessage);
      worker.removeEventListener("error", onError);
      reject(new Error(err?.message ?? "Errore nel Web Worker"));
    }

    worker.addEventListener("message", onMessage);
    worker.addEventListener("error", onError);
    worker.postMessage(datasetText);
  });
}
