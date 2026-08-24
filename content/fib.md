# Rabbits and Recurrence Relations (Rosalind ID: FIB)

Fonte: https://rosalind.info/problems/fib/

Argomenti Rosalind: Combinatorics, Dynamic Programming

## Descrizione
Basato sul classico esercizio di Fibonacci sulla riproduzione dei conigli: si parte con
una coppia di conigli neonati, che raggiungono l'età riproduttiva dopo un mese; ogni mese
ogni coppia in età riproduttiva genera k nuove coppie di conigli (invece di una sola come
nella sequenza di Fibonacci classica), e i conigli non muoiono mai. Il problema introduce
la tecnica della programmazione dinamica: costruire la soluzione per n a partire dalle
soluzioni per valori più piccoli.

## Given
Due interi positivi n ≤ 40 e k ≤ 5.

## Return
Il numero totale di coppie di conigli presenti dopo n mesi, partendo da 1 coppia, dove
ogni coppia in età riproduttiva genera una cucciolata di k coppie (anziché 1 sola).

## Sample Dataset
```
5 3
```

## Sample Output
```
19
```

## Nota
Nella cartella è presente anche "Rabbits and Recurrence Relations - 2": è lo stesso
identico problema (FIB), non un problema diverso — il `dataset.txt` di quella cartella
coincide esattamente con il Sample Dataset qui sopra ("5 3"), quindi è con ogni probabilità
un doppione/tentativo di prova con il dataset di esempio, non un secondo problema ufficiale
di Rosalind.
