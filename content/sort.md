# Sorting by Reversals (Rosalind ID: SORT)

Fonte: https://rosalind.info/problems/sort/

Argomenti Rosalind: Combinatorics, Genome Rearrangements

## Descrizione
A differenza di "Reversal Distance" (REAR), che chiede solo il numero minimo di
inversioni, questo problema chiede di fornire anche l'effettiva sequenza minima di
inversioni che trasforma π in γ. Una inversione è codificata dai due indici (1-based)
degli estremi dell'intervallo invertito.

## Given
Due permutazioni π e γ, ciascuna di lunghezza 10.

## Return
La reversal distance d_rev(π, γ), seguita da una collezione di inversioni che ordina π in
γ. Se esistono più collezioni possibili, se ne può restituire una qualsiasi.

## Sample Dataset
```
1 2 3 4 5 6 7 8 9 10
1 8 9 3 2 7 6 5 4 10
```

## Sample Output
```
2
4 9
2 5
```

## Nota implementativa
Lo script usa una BFS bidirezionale (una ricerca in ampiezza che parte contemporaneamente
da π verso γ e da γ verso π, fermandosi quando le due esplorazioni si incontrano), molto
più veloce di una BFS unidirezionale per permutazioni di lunghezza 10, dove la distanza
di reversal può arrivare fino a 9.
