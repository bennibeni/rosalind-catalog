# Matching Random Motifs (Rosalind ID: RSTR)

Fonte: https://rosalind.info/problems/rstr/

Argomenti Rosalind: Probability

## Descrizione
Estensione di "Introduction to Random Strings" (PROB): data una stringa `s` e un
GC-content `x`, si calcola prima la probabilità p_s che una singola stringa casuale
costruita con GC-content x corrisponda esattamente a `s` (usando la stessa formula di
PROB: probabilità x/2 per ciascun simbolo C/G, (1-x)/2 per ciascun simbolo A/T).
Poi, generando N stringhe casuali indipendenti, la probabilità che almeno una di esse
corrisponda a `s` è 1 - (1 - p_s)^N (complementare della probabilità che nessuna
corrisponda).

## Given
Un intero positivo N ≤ 100.000, un numero x tra 0 e 1, e una stringa di DNA `s` di
lunghezza massima 10 bp.

## Return
La probabilità che, costruendo N stringhe di DNA casuali della stessa lunghezza di `s`
con GC-content x, almeno una di esse sia uguale a `s` (le stringhe casuali possono
ripetersi).

## Sample Dataset
```
90000 0.6
ATAGCCGA
```

## Sample Output
```
0.689
```
