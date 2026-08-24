# Ordering Strings of Varying Length Lexicographically (Rosalind ID: LEXV)

Fonte: https://rosalind.info/problems/lexv/

Argomenti Rosalind: String Algorithms

## Descrizione
Estensione di "Enumerating k-mers Lexicographically" (LEXF): qui si vogliono ordinare
lessicograficamente stringhe di lunghezza *variabile* (non tutte della stessa lunghezza),
come avviene naturalmente in un dizionario (es. "APPLE" precede "APPLET", che precede
"ARTS"). A differenza di LEXF, qui l'ordine dell'alfabeto è quello con cui i simboli
vengono forniti in input, non l'ordine alfabetico standard.

## Given
Una permutazione di al massimo 12 simboli che definisce un alfabeto ordinato A, e un
intero positivo n (n ≤ 4).

## Return
Tutte le stringhe di lunghezza al massimo n formate dall'alfabeto A, ordinate
lessicograficamente (secondo l'ordine dei simboli così come dati in input).

## Sample Dataset
```
D N A
3
```

## Sample Output
```
D
DD
DDD
DDN
DDA
DN
DND
DNN
DNA
DA
DAD
DAN
DAA
N
ND
NDD
NDN
NDA
NN
NND
NNN
NNA
NA
NAD
NAN
NAA
A
AD
ADD
ADN
ADA
AN
AND
ANN
ANA
AA
AAD
AAN
AAA
```
