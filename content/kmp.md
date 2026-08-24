# Speeding Up Motif Finding (Rosalind ID: KMP)

Fonte: https://rosalind.info/problems/kmp/

Argomenti Rosalind: String Algorithms

## Descrizione
Il "failure array" (o funzione dei prefissi) è la struttura alla base dell'algoritmo di
Knuth-Morris-Pratt (KMP), che velocizza la ricerca di motivi in una stringa. Per una
stringa `s` di lunghezza n, il failure array P è un array di n interi in cui P[k]
rappresenta la lunghezza del più lungo prefisso proprio di s[0:k+1] che è anche
suffisso di s[0:k+1].

## Given
Una stringa di DNA `s` (di lunghezza massima 100 kbp) in formato FASTA.

## Return
Il failure array di `s`.

## Sample Dataset
```
>Rosalind_87
CAGCATGGTATCACAGCAGAG
```

## Sample Output
```
0 0 0 1 2 0 0 0 0 0 0 1 2 1 2 3 4 5 3 0 0
```
