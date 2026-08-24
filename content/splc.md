# RNA Splicing (Rosalind ID: SPLC)

Fonte: https://rosalind.info/problems/splc/

Argomenti Rosalind: String Algorithms

## Descrizione
Dopo aver identificato esoni e introni in una stringa di RNA, basta eliminare gli introni
e concatenare gli esoni per ottenere la stringa pronta per la traduzione.

## Given
Una stringa di DNA `s` (lunghezza massima 1 kbp) e una collezione di sottostringhe di `s`
che fungono da introni. Tutte le stringhe sono fornite in formato FASTA.

## Return
La stringa proteica risultante dalla trascrizione e traduzione degli esoni di `s`.
(Nota: per il dataset fornito esiste una sola soluzione.)

## Sample Dataset
```
>Rosalind_10
ATGGTCTACATAGCTGACAAACAGCACGTAGCAATCGGTCGAATCTCGAGAGGCATATGGTCACATGATCGGTCGAGCGTGTTTCAAAGTTTGCGCCTAG
>Rosalind_12
ATCGGTCGAA
>Rosalind_15
ATCGGTCGAGCGTGT
```

## Sample Output
```
MVYIADKQHVASREAYGHMFKVCA
```
