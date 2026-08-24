# Overlap Graphs (Rosalind ID: GRPH)

Fonte: https://rosalind.info/problems/grph/

Argomenti Rosalind: Graph Algorithms

## Descrizione
Per una collezione di stringhe e un intero positivo k, il grafo di overlap O_k è un grafo
diretto in cui ogni stringa è un nodo, e la stringa s è collegata alla stringa t con un
arco diretto quando un suffisso di lunghezza k di s coincide con un prefisso di lunghezza
k di t (con s ≠ t, per evitare cappi diretti).

## Given
Una collezione di stringhe di DNA in formato FASTA, di lunghezza totale al massimo 10 kbp.

## Return
La lista di adiacenza corrispondente a O_3 (k=3). Gli archi possono essere restituiti in
qualsiasi ordine.

## Sample Dataset
```
>Rosalind_0498
AAATAAA
>Rosalind_2391
AAATTTT
>Rosalind_2323
TTTTCCC
>Rosalind_0442
AAATCCC
>Rosalind_5013
GGGTGGG
```

## Sample Output
```
Rosalind_0498 Rosalind_2391
Rosalind_0498 Rosalind_0442
Rosalind_2391 Rosalind_2323
```
