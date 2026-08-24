# Introduction to Pattern Matching (Rosalind ID: TRIE)

Fonte: https://rosalind.info/problems/trie/

Argomenti Rosalind: String Algorithms, Graph Algorithms

## Descrizione
Un trie è un albero radicato costruito da una collezione di stringhe: per ogni simbolo
iniziale unico tra le stringhe si forma un arco dalla radice a un nuovo nodo, etichettato
con quel simbolo; il processo si ripete scendendo di livello in livello. Se nessuna
stringa della collezione è prefisso di un'altra, ogni cammino dalla radice a una foglia
compita esattamente una delle stringhe originali.

## Given
Una lista di al massimo 100 stringhe di DNA di lunghezza massima 100 bp, nessuna delle
quali è prefisso di un'altra.

## Return
La lista di adiacenza corrispondente al trie T per questi pattern. Se T ha n nodi, la
radice è etichettata 1 e i restanti nodi con gli interi da 2 a n (in qualsiasi ordine).
Ogni arco è codificato da una tripla: nodo padre, nodo figlio, simbolo che etichetta
l'arco.

## Sample Dataset
```
ATAGA
ATC
GAT
```

## Sample Output
```
1 2 A
2 3 T
3 4 A
4 5 G
5 6 A
3 7 C
1 8 G
8 9 A
9 10 T
```
