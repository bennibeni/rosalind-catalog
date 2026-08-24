# Introduction to Random Strings (Rosalind ID: PROB)

Fonte: https://rosalind.info/problems/prob/

Argomenti Rosalind: Probability

## Descrizione
Una stringa casuale viene costruita scegliendo ogni simbolo successivo in base a una
frequenza simbolica fissata, derivata dal GC-content: se il GC-content è x, la
probabilità di ciascun simbolo 'C'/'G' è x/2, mentre la probabilità di ciascun simbolo
'A'/'T' è (1-x)/2. Il problema chiede la probabilità (in scala logaritmica in base 10)
che una stringa casuale con un dato GC-content corrisponda esattamente a una stringa data.

## Given
Una stringa di DNA `s` di lunghezza massima 100 bp e un array A contenente al massimo 20
numeri tra 0 e 1 (valori di GC-content).

## Return
Un array B della stessa lunghezza di A, in cui B[k] rappresenta il logaritmo in base 10
della probabilità che una stringa casuale costruita con il GC-content A[k] corrisponda
esattamente a `s`.

## Sample Dataset
```
ACGATACAA
0.129 0.287 0.423 0.476 0.641 0.742 0.783
```

## Sample Output
```
-5.737 -5.217 -5.263 -5.360 -5.958 -6.628 -7.009
```
