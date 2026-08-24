# Rabbits and Recurrence Relations - 2 (Rosalind ID: FIB — stesso problema della cartella "Rabbits and Recurrence Relations")

Fonte: https://rosalind.info/problems/fib/

Argomenti Rosalind: Combinatorics, Dynamic Programming

## Nota importante
Questa cartella risolve esattamente lo stesso problema Rosalind (FIB) della cartella
"Rabbits and Recurrence Relations". Il `dataset.txt` qui presente ("5 3") coincide con il
Sample Dataset ufficiale del problema, quindi questa è verosimilmente una seconda copia /
un tentativo di test con il dataset di esempio, non un problema Rosalind distinto.

## Descrizione
Basato sul classico esercizio di Fibonacci sulla riproduzione dei conigli: si parte con
una coppia di conigli neonati, che raggiungono l'età riproduttiva dopo un mese; ogni mese
ogni coppia in età riproduttiva genera k nuove coppie di conigli (invece di una sola come
nella sequenza di Fibonacci classica), e i conigli non muoiono mai.

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
