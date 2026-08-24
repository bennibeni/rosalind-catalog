# Completing a Tree (Rosalind ID: TREE)

Fonte: https://rosalind.info/problems/tree/

Argomenti Rosalind: Phylogeny, Graph Algorithms

## Descrizione
Un albero è un grafo connesso senza cicli. Data una lista di adiacenza corrispondente a
un grafo su n nodi senza cicli (ma non necessariamente connesso), il problema chiede il
numero minimo di archi da aggiungere per trasformare il grafo in un albero (cioè per
renderlo completamente connesso senza introdurre cicli).

## Given
Un intero positivo n (n ≤ 1000) e una lista di adiacenza corrispondente a un grafo su n
nodi che non contiene cicli.

## Return
Il numero minimo di archi che possono essere aggiunti al grafo per produrre un albero.

## Sample Dataset
```
10
1 2
2 8
4 10
5 9
6 10
7 9
```

## Sample Output
```
3
```
