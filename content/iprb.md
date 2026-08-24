# Mendel's First Law (Rosalind ID: IPRB)

Fonte: https://rosalind.info/problems/iprb/

Argomenti Rosalind: Heredity, Probability

## Descrizione
Data una popolazione composta da individui omozigoti dominanti, eterozigoti e omozigoti
recessivi per un dato fattore, il problema chiede la probabilità che l'incrocio casuale di
due organismi produca un discendente che possieda almeno un allele dominante (e quindi
mostri il fenotipo dominante).

## Given
Tre interi positivi k, m, n che rappresentano una popolazione di k+m+n organismi:
k individui omozigoti dominanti, m eterozigoti, n omozigoti recessivi.

## Return
La probabilità che due organismi scelti casualmente per l'accoppiamento producano un
individuo con almeno un allele dominante. Si assume che ogni coppia di organismi possa
accoppiarsi.

## Sample Dataset
```
2 2 2
```

## Sample Output
```
0.78333
```
