# Introduction to Set Operations (Rosalind ID: SETO)

Fonte: https://rosalind.info/problems/seto/

Argomenti Rosalind: Set Theory

## Descrizione
Operazioni insiemistiche di base: unione (A∪B, elementi in almeno uno dei due insiemi),
intersezione (A∩B, elementi in entrambi), differenza (A−B, elementi in A ma non in B, non
commutativa) e complemento rispetto a un universo U (A^c = U − A).

## Given
Un intero positivo n (n ≤ 20.000) e due sottoinsiemi A e B di {1, 2, ..., n}.

## Return
Sei insiemi: A∪B, A∩B, A−B, B−A, A^c e B^c (i complementi sono presi rispetto a
{1, 2, ..., n}).

## Sample Dataset
```
10
{1, 2, 3, 4, 5}
{2, 8, 5, 10}
```

## Sample Output
```
{1, 2, 3, 4, 5, 8, 10}
{2, 5}
{1, 3, 4}
{8, 10}
{6, 7, 8, 9, 10}
{1, 3, 4, 6, 7, 9}
```

## Nota
L'ordine degli elementi dentro le parentesi graffe non è rilevante per la correttezza
(un insieme non è ordinato); nello script gli elementi sono stampati in ordine numerico
crescente per chiarezza, anche se il sample output della pagina Rosalind li mostra in un
ordine diverso (non essendo gli insiemi strutture ordinate).
