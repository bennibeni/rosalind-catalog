// Worker dedicato al calcolo pesante di REAR (Rosalind ID: REAR) -
// vedi il commento in rear.mjs per il contesto completo. Girare questo
// BFS su un thread separato evita di bloccare la UI della pagina
// mentre esplora il grafo delle permutazioni di 10 elementi.
//
// Worker "classico" (non modulo), per la massima compatibilità tra
// browser - non usa import/export, solo self.onmessage.
const N = 10;

// Cache a livello di worker: se lo stesso worker riceve più richieste
// nella stessa sessione di pagina, il BFS pesante gira una sola volta.
let _distanzeCache = null;

function calcolaDistanze() {
  const identita = Array.from({ length: N }, (_, i) => i);
  const chiaveIdentita = identita.join("");

  const distanze = new Map([[chiaveIdentita, 0]]);
  const coda = [identita];
  let head = 0;

  while (head < coda.length) {
    const v = coda[head++];
    const dv = distanze.get(v.join(""));
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const w = v.slice();
        for (let a = i, b = j; a < b; a++, b--) {
          const tmp = w[a];
          w[a] = w[b];
          w[b] = tmp;
        }
        const chiave = w.join("");
        if (!distanze.has(chiave)) {
          distanze.set(chiave, dv + 1);
          coda.push(w);
        }
      }
    }
  }

  return distanze;
}

function trans(a, b) {
  return [...a].map((x) => String(b.indexOf(x))).join("");
}

function lettura(datasetText) {
  return datasetText
    .split("\n")
    .map((r) => r.replace(/\r$/, ""))
    .filter((r) => r.length > 0)
    .map((riga) => riga.split(/\s+/));
}

function f(riga) {
  return riga.map((x) => String(Number(x) - 1)).join("");
}

self.onmessage = (evento) => {
  try {
    const datasetText = evento.data;
    const dati = lettura(datasetText);

    if (dati.length === 0 || dati.length % 2 !== 0) {
      throw new Error(
        "Input non valido: attese coppie di righe (permutazione iniziale, finale)",
      );
    }

    if (!_distanzeCache) {
      _distanzeCache = calcolaDistanze();
    }
    const distanze = _distanzeCache;

    const solution = [];
    for (let index = 0; index < dati.length; index += 2) {
      const start = f(dati[index]);
      const end = f(dati[index + 1]);
      const target = trans(start, end);
      const score = distanze.get(target);
      solution.push(score === undefined ? "None" : String(score));
    }

    self.postMessage({ ok: true, result: `${solution.join(" ")}\n` });
  } catch (err) {
    self.postMessage({ ok: false, error: err?.message ?? String(err) });
  }
};
