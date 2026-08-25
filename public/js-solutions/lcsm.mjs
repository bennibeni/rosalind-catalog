// Finding a Shared Motif (Rosalind ID: LCSM) - soluzione JavaScript
// indipendente, non una trascrizione di problem.py: stesso algoritmo
// (ricerca in ampiezza: parte dalla stringa vuota, ad ogni round tiene
// solo le stringhe correnti che sono effettivamente sottostringa di
// TUTTI i record, poi le estende di 1 carattere in tutti i 4 modi
// possibili; si ferma al primo round in cui nessuna estensione
// sopravvive, e la risposta è la prima estensione di quel round privata
// dell'ultimo carattere), riscritta in modo idiomatico per JS.
//
// ATTENZIONE - stesso limite computazionale dell'originale: l'insieme
// dei candidati cresce come 4^L (L = lunghezza del motivo condiviso più
// lungo), quindi su dataset dove il motivo comune è lungo questo
// approccio può diventare molto lento o esaurire la memoria - non è un
// bug della conversione, è una caratteristica (poco efficiente) fedele
// dell'algoritmo originale.
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python).
function parseFasta(testo) {
  const righe = testo.split("\n").map((r) => r.replace(/\r$/, ""));
  const bodies = [];
  let corpo = "";
  let first = true;
  for (const riga of righe) {
    if (riga.startsWith(">")) {
      if (!first) bodies.push(corpo);
      corpo = "";
      first = false;
    } else {
      corpo += riga;
    }
  }
  bodies.push(corpo);
  return bodies;
}

function valid(s, bodies) {
  return bodies.every((body) => body.includes(s));
}

function purge(stack, bodies) {
  return stack.filter((s) => valid(s, bodies));
}

export default function solve(datasetText) {
  const bodies = parseFasta(datasetText);

  if (bodies.length === 0 || bodies.some((b) => !b)) {
    throw new Error("Input non valido: attesi almeno due record FASTA non vuoti");
  }

  let stack = [""];
  while (true) {
    const stack1 = purge(stack, bodies);
    if (stack1.length === 0) {
      return `${stack[0].slice(0, -1)}\n`;
    }
    const stack2 = [];
    for (const s of stack1) {
      for (const l of ["A", "C", "G", "T"]) {
        stack2.push(s + l);
      }
    }
    stack = stack2;
  }
}
