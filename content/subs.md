# Finding a Motif in DNA (Rosalind ID: SUBS)

Fonte: https://rosalind.info/problems/subs/

Argomenti Rosalind: String Algorithms

## Descrizione
Data una stringa `t`, essa è una sottostringa di `s` se è contenuta come sequenza
contigua di simboli in `s`. Il problema chiede di trovare tutte le posizioni (locations)
in cui `t` compare come sottostringa di `s`, usando l'indicizzazione 1-based (a differenza
di Python, che usa 0-based).

## Given
Due stringhe di DNA `s` e `t` (ciascuna di lunghezza massima 1 kbp).

## Return
Tutte le posizioni (1-based) in cui `t` compare come sottostringa di `s`.

## Sample Dataset
```
GATATATGCATATACTT
ATAT
```

## Sample Output
```
2 4 10
```
