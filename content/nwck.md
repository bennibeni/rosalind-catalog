# Distances in Trees (Rosalind ID: NWCK)

Fonte: https://rosalind.info/problems/nwck/

Argomenti Rosalind: Phylogeny

## Descrizione
Il formato Newick rappresenta un albero filogenetico come stringa annidata di parentesi
(es. "(dog,cat);" rappresenta un albero con radice non nominata e due foglie, dog e cat,
collegate direttamente alla radice). La distanza tra due nodi in un albero è il numero di
archi sull'unico cammino che li collega (poiché un albero non ha cicli, questo cammino è
sempre unico).

## Given
Una collezione di n (n ≤ 40) alberi in formato Newick (senza lunghezze di ramo), ciascuno
con al massimo 200 nodi; ogni albero Tk è seguito da una coppia di nodi xk e yk in Tk.

## Return
Una collezione di n interi positivi, in cui il k-esimo intero rappresenta la distanza tra
xk e yk in Tk.

## Sample Dataset
```
(cat)dog;
dog cat

(dog,cat);
dog cat
```

## Sample Output
```
1 2
```
