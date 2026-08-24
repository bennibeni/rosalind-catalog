# Motzkin Numbers and RNA Secondary Structures (Rosalind ID: MOTZ)

Fonte: https://rosalind.info/problems/motz/

Argomenti Rosalind: Combinatorics, String Algorithms, Dynamic Programming

## Descrizione
Estensione di "Catalan Numbers and RNA Secondary Structures" (CAT): qui, invece di
richiedere un matching *perfetto* (ogni nucleotide accoppiato), si contano tutti i
possibili matching noncrossing (anche parziali, incluso il matching vuoto) degli archi
di base-pairing nel grafo di bonding di una stringa di RNA. Questi numeri sono i numeri
di Motzkin. La ricorrenza: per una stringa s di lunghezza n, si considera il primo
simbolo, che può non essere accoppiato (contributo M(s[1:])), oppure accoppiato con il
simbolo in posizione k se sono complementari (contributo M(s[1:k]) × M(s[k+1:]) per ogni
k valido), sommando tutti i contributi.

## Given
Una stringa di RNA `s` di lunghezza massima 300 bp.

## Return
Il numero totale di matching noncrossing (non necessariamente perfetti) degli archi di
base-pairing nel grafo di bonding di `s`, modulo 1.000.000.

## Sample Dataset
```
>Rosalind_57
AUAU
```

## Sample Output
```
7
```
