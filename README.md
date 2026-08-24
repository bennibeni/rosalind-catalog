# Catalogo Rosalind

App Next.js (App Router) che mostra ogni `enunciato.md` del progetto
`rosalind.info` come pagina individuale, catalogata per argomento
ufficiale Rosalind.

> **Nota sulla privacy**: questo repository include `data/` (dataset
> personali, output registrato in `run_log.txt`, script Python). A
> differenza della configurazione di default di questo progetto (dove
> `data/` è ignorato da git), qui è stato **deliberatamente incluso e
> reso pubblico** — chiunque cloni o visiti il sito deployato può vedere
> questi contenuti. Se in futuro vuoi tornarci privato, rimuovi `data/`
> dal repository e ripristina le righe corrispondenti in `.gitignore`
> (vedi cronologia git).

## Avvio

```bash
npm install
npm run dev
```

Apri http://localhost:3000

## Build di produzione

```bash
npm run build
npm run start
```

## Struttura

- `content/*.md` — i 54 file `enunciato.md` (52 problemi Rosalind reali +
  2 esercizi del Bioinformatics Contest 2018), rinominati con lo slug
  dell'ID Rosalind (es. `orf.md`) o uno slug derivato dal titolo per i
  problemi senza ID (Python Village, contest esterno).
- `lib/problems.js` — legge e interpreta ogni file markdown (titolo, ID,
  fonte, argomenti, corpo), espone `getAllProblems()`,
  `getProblemBySlug()`, `getProblemsGroupedByTopic()`.
- `lib/barcode.js` — genera il "codice a barre molecolare" deterministico
  (elemento visivo distintivo dell'app) a partire dallo slug di ogni
  problema.
- `app/page.js` — home.
- `app/problemi/page.js` — catalogo, raggruppato per argomento.
- `app/problemi/[slug]/page.js` — pagina di dettaglio di un singolo
  problema, con rendering Markdown completo (react-markdown + remark-gfm).

## "La mia esecuzione" (input + output)

Ogni pagina di dettaglio può mostrare, sotto l'enunciato ufficiale, una
sezione con **il tuo dataset reale** (`dataset.txt`) e **il tuo output
reale** (dall'ultima esecuzione di `run_all_rosalind.ps1`), uno sopra
l'altro — l'output da solo non è verificabile senza sapere quale input
l'ha prodotto.

Per collegare entrambi in un colpo solo (se `rosalind.info` e
`rosalind-catalog` sono cartelle sorelle, es. entrambe su Desktop):

```bash
npm run sync
```

Oppure separatamente:

```bash
npm run sync-log        # copia run_log.txt -> data/run_log.txt
npm run sync-datasets   # copia ogni dataset.txt -> data/datasets/<slug>.txt
```

Con un percorso esplicito, se le cartelle non sono sorelle:

```bash
npm run sync-log -- "C:\percorso\a\rosalind.info\run_log.txt"
npm run sync-datasets -- "C:\percorso\a\rosalind.info"
```

I dataset di grandi dimensioni (es. "Introduction to Set Operations",
~198 KB) vengono mostrati troncati nella pagina, con il conteggio totale
dei caratteri indicato esplicitamente.

Nota: in **build di produzione** (`npm run build`), input e output
vengono letti al momento della build e "congelati" nell'HTML statico —
dopo ogni nuovo run serve rifare `npm run sync` seguito da
`npm run build`. In **sviluppo** (`npm run dev`) vengono riletti a ogni
navigazione, basta ricaricare la pagina dopo la sincronizzazione.

Se non hai ancora collegato né l'uno né l'altro, la sezione mostra un
promemoria — l'enunciato del problema resta comunque sempre visibile.

## "Esegui nel browser" (Pyodide)

Dentro "La mia esecuzione", ogni problema (tranne "Finding a Protein
Motif", che richiede una libreria di rete non disponibile in un runtime
Python nel browser) ha un pulsante **"Esegui ora"** che rilancia il vero
`problem.py`, invariato, dentro **Pyodide** — un interprete CPython
reale compilato in WebAssembly. Non è una trascrizione JavaScript: è lo
stesso script, stesso motore Python, eseguito lato client invece che via
PowerShell — zero rischio che le due versioni divergano nel tempo.

Al primo click Pyodide viene scaricato dalla CDN ufficiale
(`cdn.jsdelivr.net/pyodide`, richiede connessione a internet, qualche
decina di MB la prima volta, poi cachato dal browser). Gli eventuali
file scritti dallo script (es. la cache di "Reversal Distance",
l'output di "Working with Files") restano nel filesystem virtuale di
Pyodide — non toccano mai il disco reale.

**"Reversal Distance" è disattivato apposta**: la rigenerazione della
sua cache interna, verificata, non completa nemmeno in 10 minuti sotto
WebAssembly (contro ~4 minuti nativi) — per quel problema resta preferibile
`.\run_all_rosalind.ps1`.

Per abilitare questa sezione:

```bash
npm run sync-scripts
```

(incluso automaticamente in `npm run sync`, insieme a `sync-log` e
`sync-datasets`)

## Aggiungere un nuovo problema

```bash
npm run add-problem -- "Nome Esatto Cartella"
npm run sync
npm run build
```

`add-problem` legge `enunciato.md` dalla cartella indicata (assume che
`rosalind.info` sia una cartella sorella, come per gli altri script di
sync — altrimenti passa il percorso come secondo argomento), lo copia in
`content/<slug>.md`, e registra la cartella in `lib/folderToSlug.json`
— quest'ultimo passo è quello facile da dimenticare se lo fai a mano:
senza di esso "La mia esecuzione" (input/output/esecuzione nel browser)
non troverà mai i dati di quel problema, anche se l'enunciato appare
regolarmente nel catalogo.

`npm run sync` dopo `add-problem` collega dataset, output registrato
(se già presente in `run_log.txt`) e script Python del nuovo problema.

<details>
<summary>Farlo a mano, senza <code>add-problem</code></summary>

1. Copia `enunciato.md` in `content/<slug>.md` (usa l'ID Rosalind in
   minuscolo come slug, es. `content/newp.md`).
2. Aggiungi una riga in `lib/folderToSlug.json`:
   `"Nome Esatto Cartella": "slug"` (la chiave deve combaciare
   esattamente col nome della cartella dentro `rosalind.info`, così
   com'è scritto negli header di `run_log.txt`).
3. `npm run sync` e poi `npm run build`.

</details>

