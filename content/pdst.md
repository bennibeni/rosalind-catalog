# Creating a Distance Matrix (Rosalind ID: PDST)

Fonte: https://rosalind.info/problems/pdst/

Argomenti Rosalind: Phylogeny, Alignment

## Descrizione
Per due stringhe della stessa lunghezza, la p-distance è la loro distanza di Hamming
(HAMM) divisa per la lunghezza della stringa — cioè la proporzione di posizioni in cui
differiscono. Il problema chiede la matrice n×n delle p-distance tra ogni coppia di
stringhe date.

## Given
Una collezione di n (n ≤ 10) stringhe di DNA di uguale lunghezza (al massimo 1 kbp), in
formato FASTA.

## Return
La matrice D corrispondente alla p-distance dp calcolata su tutte le coppie delle
stringhe date.

## Sample Dataset
```
>Rosalind_9499
TTTCCATTTA
>Rosalind_0942
GATTCATTTC
>Rosalind_6568
TTTCCATTTT
>Rosalind_1833
GTTCCATTTA
```

## Sample Output
```
0.00000 0.40000 0.10000 0.10000
0.40000 0.00000 0.40000 0.30000
0.10000 0.40000 0.00000 0.20000
0.10000 0.30000 0.20000 0.00000
```
