// Contest 1 - Example A+B (Bioinformatics Contest 2018, fuori dal set
// ufficiale Rosalind) - soluzione JavaScript indipendente, non una
// trascrizione di problem.py: stessa logica (prima riga = numero di casi
// n, poi n righe con due interi "a b", stampa a+b per ciascuna),
// riscritta in modo idiomatico per JS.
//
// Contratto: riceve il contenuto testuale del file di input (per questo
// problema si chiama input.txt, non dataset.txt - gestito dal manifest,
// non da questo modulo), restituisce l'output testuale (stessa forma
// dell'output Python).
export default function solve(datasetText) {
  const righe = datasetText.split("\n").map((r) => r.replace(/\r$/, ""));
  const n = Number(righe[0]?.trim());

  if (!Number.isInteger(n) || n < 0) {
    throw new Error(`Input non valido: attesa una prima riga con un intero, ricevuto "${righe[0]}"`);
  }

  const output = [];
  for (let i = 0; i < n; i++) {
    const parti = (righe[i + 1] ?? "").trim().split(/\s+/);
    if (parti.length !== 2 || parti.some((p) => !/^-?\d+$/.test(p))) {
      throw new Error(`Input non valido alla riga ${i + 2}: attesi due interi "a b"`);
    }
    const [a, b] = parti.map(Number);
    output.push(a + b);
  }

  return output.join("\n") + "\n";
}
