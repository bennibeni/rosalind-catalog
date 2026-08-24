# Perfect Matchings and RNA Secondary Structures (Rosalind ID: PMCH)

Fonte: https://rosalind.info/problems/pmch/

Argomenti Rosalind: Combinatorics, String Algorithms, Dynamic Programming

## Descrizione
In una stringa di RNA, adenina si accoppia con uracile e citosina con guanina. Un
"matching perfetto" nel grafo di bonding (dove ogni simbolo è un nodo) rappresenta una
possibile struttura secondaria dell'RNA in cui ogni nucleotide è accoppiato. Se K_n è il
grafo completo su 2n nodi, il numero di matching perfetti p_n soddisfa la ricorrenza
p_n = (2n-1) × p_(n-1), con soluzione chiusa p_n = (2n-1)(2n-3)...(3)(1).

## Given
Una stringa di RNA di lunghezza massima 80 bp, con lo stesso numero di occorrenze di 'A'
e 'U' e lo stesso numero di occorrenze di 'C' e 'G'.

## Return
Il numero totale di possibili matching perfetti degli archi di base-pairing nel grafo di
bonding della stringa.

## Sample Dataset
```
>Rosalind_23
AGCUAGUCAU
```

## Sample Output
```
12
```
