# Finding a Shared Motif (Rosalind ID: LCSM)

Fonte: https://rosalind.info/problems/lcsm/

Argomenti Rosalind: String Algorithms

## Descrizione
Una sottostringa comune di una collezione di stringhe è una sottostringa presente in ogni
membro della collezione. Si cerca la sottostringa comune più lunga (longest common
substring) tra tutte quelle presenti; la soluzione non è necessariamente unica.

## Given
Una collezione di k (k ≤ 100) stringhe di DNA di lunghezza massima 1 kbp ciascuna, in
formato FASTA.

## Return
Una sottostringa comune più lunga della collezione (se esistono più soluzioni, se ne può
restituire una qualsiasi).

## Sample Dataset
```
>Rosalind_1
GATTACA
>Rosalind_2
TAGACCA
>Rosalind_3
ATACA
```

## Sample Output
```
AC
```
