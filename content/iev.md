# Calculating Expected Offspring (Rosalind ID: IEV)

Fonte: https://rosalind.info/problems/iev/

Argomenti Rosalind: Heredity, Probability

## Descrizione
Il valore atteso di una variabile casuale X è E(X) = somma su k di k × Pr(X=k). Il
problema chiede di calcolare il numero atteso di discendenti con fenotipo dominante nella
generazione successiva, data una popolazione di coppie con genotipi noti, assumendo che
ogni coppia abbia esattamente due discendenti.

## Given
Sei interi non negativi, ciascuno non superiore a 20.000, che rappresentano il numero di
coppie con ciascuna delle seguenti combinazioni genotipiche: AA-AA, AA-Aa, AA-aa, Aa-Aa,
Aa-aa, aa-aa.

## Return
Il numero atteso di discendenti con fenotipo dominante nella generazione successiva,
assumendo che ogni coppia abbia esattamente due discendenti.

## Sample Dataset
```
1 0 0 1 0 1
```

## Sample Output
```
3.5
```
