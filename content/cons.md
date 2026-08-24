# Consensus and Profile (Rosalind ID: CONS)

Fonte: https://rosalind.info/problems/cons/

Argomenti Rosalind: String Algorithms

## Descrizione
Data una collezione di stringhe di DNA della stessa lunghezza n, la matrice di profilo è
una matrice 4×n dove ogni riga (A, C, G, T) conta quante volte quel simbolo compare in
ciascuna posizione tra tutte le stringhe. La stringa di consenso si ottiene prendendo, per
ogni posizione, il simbolo più frequente secondo la matrice di profilo.

## Given
Una collezione di al massimo 10 stringhe di DNA della stessa lunghezza (al massimo 1 kbp)
in formato FASTA.

## Return
Una stringa di consenso e la matrice di profilo per la collezione (se esistono più
stringhe di consenso possibili, se ne può restituire una qualsiasi).

## Sample Dataset
```
>Rosalind_1
ATCCAGCT
>Rosalind_2
GGGCAACT
>Rosalind_3
ATGGATCT
>Rosalind_4
AAGCAACC
>Rosalind_5
TTGGAACT
>Rosalind_6
ATGCCATT
>Rosalind_7
ATGGCACT
```

## Sample Output
```
ATGCAACT
A: 5 1 0 0 5 5 0 0
C: 0 0 1 4 2 0 6 1
G: 1 1 6 3 0 1 0 0
T: 1 5 0 0 0 1 1 6
```
