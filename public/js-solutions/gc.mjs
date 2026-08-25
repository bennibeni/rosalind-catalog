// Computing GC Content (Rosalind ID: GC) - soluzione JavaScript
// indipendente, non una trascrizione di problem.py: stessa logica
// (parsing FASTA multi-record, trova il record con GC-content più alto,
// stampa header + percentuale), riscritta in modo idiomatico per JS.
//
// ATTENZIONE - bug riprodotto intenzionalmente: la terza riga di
// output di problem.py usa il trucco
//   (str(percent) + "000000")[:-5]
// per forzare 6 cifre decimali. Funziona SOLO se str(percent) ha
// esattamente 5 decimali; altrimenti produce MENO di 6 decimali (es.
// "52.50" invece di "52.500000", verificato sul dataset reale di Ben).
// Qui è riprodotto fedelmente - non corretto - perché il confronto
// "Corrisponde all'output registrato" in questa pagina si basa
// sull'output REALE salvato in run_log.txt (che contiene lo stesso
// bug), non su un ipotetico output "giusto": correggerlo qui avrebbe
// rotto quel confronto.
//
// Contratto: riceve il contenuto testuale di dataset.txt, restituisce
// l'output testuale (stessa forma dell'output Python, bug compreso).
function parseFasta(testo) {
  const righe = testo.split("\n").map((r) => r.replace(/\r$/, ""));
  const data = [];
  let record = null;
  for (const riga of righe) {
    if (riga.startsWith(">")) {
      if (record) data.push(record);
      record = { header: riga.slice(1), body: "" };
    } else if (record) {
      record.body += riga;
    }
  }
  if (record) data.push(record);
  return data;
}

export default function solve(datasetText) {
  const data = parseFasta(datasetText);

  if (data.length === 0) {
    throw new Error("Input non valido: nessun record FASTA trovato");
  }

  const percents = [];
  let winner = 0;
  for (let i = 0; i < data.length; i++) {
    const body = data[i].body;
    let cg = 0;
    for (const ch of body) {
      if (ch === "C" || ch === "G") cg++;
    }
    const percent = (100 * cg) / body.length;
    percents.push(percent);
    if (percent > percents[winner]) winner = i;
  }

  const truncato = Math.trunc(percents[winner] * 1000000) / 1000000;
  const paddato = `${truncato}000000`.slice(0, -5);

  return `${data[winner].header}\n${truncato}\n${paddato}\n`;
}
