# Finding a Spliced Motif (Rosalind ID: SSEQ)

Fonte: https://rosalind.info/problems/sseq/

Argomenti Rosalind: String Algorithms

## Descrizione
Una sottosequenza (a differenza di una sottostringa) non richiede che i simboli siano
contigui: basta che compaiano nello stesso ordine, anche con altri simboli intermezzati.
Il problema chiede di trovare una collezione di posizioni in `s` tali che i simboli di
`t` vi compaiano come sottosequenza.

## Given
Due stringhe di DNA `s` e `t` (ciascuna di lunghezza massima 1 kbp), in formato FASTA.

## Return
Una collezione di indici (1-based) di `s` in cui i simboli di `t` compaiono come
sottosequenza di `s`. Se esistono più soluzioni, se ne può restituire una qualsiasi.

## Sample Dataset
```
>Rosalind_14
ACGTACGTGACG
>Rosalind_18
GTA
```

## Sample Output
```
3 4 5
```
