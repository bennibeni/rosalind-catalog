# Partial Permutations (Rosalind ID: PPER)

Fonte: https://rosalind.info/problems/pper/

Argomenti Rosalind: Combinatorics, Genome Rearrangements

## Descrizione
Una permutazione parziale P(n, k) è il numero di modi in cui si possono ordinare k
elementi scelti da un insieme di n, tenendo conto dell'ordine. La formula è
P(n, k) = n! / (n-k)! = n × (n-1) × ... × (n-k+1).

## Given
Interi positivi n e k tali che 100 ≥ n > 0 e 10 ≥ k > 0.

## Return
Il numero totale di permutazioni parziali P(n, k), modulo 1.000.000.

## Sample Dataset
```
21 7
```

## Sample Output
```
51200
```
