# Independent Alleles (Rosalind ID: LIA)

Fonte: https://rosalind.info/problems/lia/

Argomenti Rosalind: Heredity, Probability

## Descrizione
Basato sulla seconda legge di Mendel (legge dell'assortimento indipendente): partendo da
Tom, che alla generazione 0 ha genotipo Aa Bb, ogni organismo si accoppia sempre con un
partner Aa Bb. Il problema chiede la probabilità che almeno N organismi Aa Bb siano
presenti alla k-esima generazione dell'albero genealogico di Tom (senza contare i partner
Aa Bb ad ogni livello).

## Given
Due interi positivi k (k ≤ 7) e N (N ≤ 2^k).

## Return
La probabilità che almeno N organismi Aa Bb appartengano alla k-esima generazione
dell'albero genealogico di Tom, assumendo che valga la seconda legge di Mendel.

## Sample Dataset
```
2 1
```

## Sample Output
```
0.684
```
