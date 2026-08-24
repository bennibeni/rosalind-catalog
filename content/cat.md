# Catalan Numbers and RNA Secondary Structures (Rosalind ID: CAT)

Fonte: https://rosalind.info/problems/cat/

Argomenti Rosalind: Combinatorics, String Algorithms, Dynamic Programming

## Descrizione
Un matching è "noncrossing" se nessuno dei suoi archi si incrocia (assumendo i nodi
disposti su un cerchio). Un matching noncrossing degli archi di base-pairing nel grafo di
bonding di una stringa di RNA corrisponde a una struttura secondaria priva di
"pseudoknot". Il numero di matching perfetti noncrossing nel grafo completo K_2n sono i
numeri di Catalano, con ricorrenza c_n = somma su k di c_(k-1) × c_(n-k).

## Given
Una stringa di RNA `s` con lo stesso numero di occorrenze di 'A' e 'U' e lo stesso numero
di occorrenze di 'C' e 'G'. Lunghezza massima 300 bp.

## Return
Il numero totale di matching perfetti noncrossing degli archi di base-pairing nel grafo
di bonding di `s`, modulo 1.000.000.

## Sample Dataset
```
>Rosalind_57
AUAU
```

## Sample Output
```
2
```
