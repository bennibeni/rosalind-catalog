# Reversal Distance (Rosalind ID: REAR)

Fonte: https://rosalind.info/problems/rear/

Argomenti Rosalind: Combinatorics, Genome Rearrangements

## Descrizione

Una reversal (inversione) di una permutazione crea una nuova permutazione invertendo un
intervallo della permutazione stessa. La reversal distance tra due permutazioni π e σ è
il numero minimo di reversal necessarie per trasformare π in σ (permutazioni della stessa
lunghezza).

## Given

Una collezione di al massimo 5 coppie di permutazioni, tutte di lunghezza 10.

## Return

La reversal distance tra ogni coppia di permutazioni.

## Sample Dataset

```
1 2 3 4 5 6 7 8 9 10
3 1 5 2 7 4 9 6 10 8

3 10 8 2 5 4 7 1 6 9
5 2 3 1 7 4 10 8 6 9

8 6 7 9 4 1 3 10 2 5
8 2 7 6 9 1 5 3 10 4

3 9 10 4 1 8 6 7 5 2
2 9 8 5 1 7 3 4 6 10

1 2 3 4 5 6 7 8 9 10
1 2 3 4 5 6 7 8 9 10
```

## Sample Output

```
9 4 5 7 0
```

## Nota

Lo script Python tenta di precalcolare via BFS i livelli di distanza per tutte le
permutazioni di 10 elementi (salvandoli in una cache locale, `sets10.txt`, per evitare
di rifare il calcolo ad ogni esecuzione) - ma quel calcolo è così pesante che il file di
cache non viene generato in tempi ragionevoli, né in locale né tanto meno nel browser
(Pyodide/WebAssembly). La soluzione JavaScript di questo catalogo risolve lo stesso
problema con un Web Worker, senza bisogno di cache persistente: richiede qualche minuto
ma completa senza bloccare la pagina.
