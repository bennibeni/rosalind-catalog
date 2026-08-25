// Finding a Protein Motif (Rosalind ID: MPRT) - soluzione JavaScript
// indipendente, non una trascrizione di problem.py: stessa logica (per
// ogni accession UniProt, scarica la sequenza FASTA e cerca tutte le
// occorrenze - anche sovrapposte - del motivo N-glicosilazione
// N{P}[ST]{P}), riscritta in modo idiomatico per JS.
//
// Due differenze tecniche rispetto all'originale:
// 1. fetch() al posto di requests - stessa richiesta HTTP, ma nel
//    browser dipende dal supporto CORS di rest.uniprot.org. Se
//    l'endpoint blocca richieste cross-origin, questa soluzione fallirà
//    con un errore di rete (non è un bug della logica, è un limite
//    dell'ambiente browser rispetto a un client Python locale).
// 2. Ricerca di match sovrapposti: problem.py cerca "a mano" scorrendo
//    l'indice di 1 posizione alla volta dopo ogni match; qui uso una
//    regex con lookahead (?=...) e flag globale, che trova le stesse
//    posizioni sovrapposte in un solo passaggio - risultato identico,
//    tecnica diversa.
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python).
const MOTIVO = /(?=N[^P][ST][^P])/g;

function lettura(datasetText) {
  return datasetText
    .split("\n")
    .map((r) => r.replace(/\r$/, ""))
    .filter((riga) => riga.length > 0);
}

async function getText(prot) {
  const accession = prot.split("_")[0];
  const url = `https://rest.uniprot.org/uniprotkb/${accession}.fasta`;
  const r = await fetch(url);
  if (!r.ok) return null;
  const text = await r.text();
  const start = text.indexOf("\n");
  return text.slice(start).replace(/\n/g, "");
}

function findAll(text) {
  if (!text) return [];
  const result = [];
  for (const m of text.matchAll(MOTIVO)) {
    result.push(String(m.index + 1));
  }
  return result;
}

export default async function solve(datasetText) {
  const data = lettura(datasetText);

  if (data.length === 0) {
    throw new Error("Input non valido: nessuna accession UniProt trovata");
  }

  const righeOutput = [];
  for (const prot of data) {
    const text = await getText(prot);
    const result = findAll(text);
    if (result.length > 0) {
      righeOutput.push(prot);
      righeOutput.push(result.join(" "));
    }
  }

  return righeOutput.join("\n") + "\n";
}
