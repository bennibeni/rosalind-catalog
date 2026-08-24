# Finding a Protein Motif (Rosalind ID: MPRT)

Fonte: https://rosalind.info/problems/mprt/

Argomenti Rosalind: File Formats, Proteomics

## Descrizione
Un motivo proteico può essere rappresentato con una notazione abbreviata: [XY] significa
"X oppure Y", {X} significa "qualsiasi amminoacido tranne X". Il motivo di
N-glicosilazione è scritto come N{P}[ST]{P}. Le sequenze proteiche vanno recuperate dal
database UniProt a partire dagli ID forniti.

## Given
Al massimo 15 ID di accesso UniProt.

## Return
Per ogni proteina che possiede il motivo di N-glicosilazione, l'ID di accesso seguito
dall'elenco delle posizioni nella stringa proteica in cui il motivo è stato trovato.

## Sample Dataset
```
A2Z669
B5ZC00
P07204_TRBM_HUMAN
P20840_SAG1_YEAST
```

## Sample Output
```
B5ZC00
85 118 142 306 395
P07204_TRBM_HUMAN
47 115 116 382 409
P20840_SAG1_YEAST
79 109 135 248 306 348 364 402 485 501 614
```

## Nota tecnica (aggiornamento rispetto alla pagina originale)
La pagina Rosalind fa riferimento al vecchio endpoint
`http://www.uniprot.org/uniprot/{id}.fasta`, ormai deprecato. Lo script in questa cartella
è stato aggiornato per usare il nuovo endpoint REST:
`https://rest.uniprot.org/uniprotkb/{accession}.fasta`, estraendo solo la parte prima
dell'eventuale underscore dall'ID (es. "P07204" da "P07204_TRBM_HUMAN"), perché il nuovo
endpoint accetta solo l'accession pura.
