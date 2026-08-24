# Genome Assembly as Shortest Superstring (Rosalind ID: LONG)

Fonte: https://rosalind.info/problems/long/

Argomenti Rosalind: Genome Assembly

## Descrizione
Una superstringa per una collezione di stringhe più piccole è una stringa che le contiene
tutte come sottostringhe. Per il principio di parsimonia, la superstringa più corta
possibile funge da candidato cromosoma ricostruito a partire dai reads. Il dataset
garantisce che esista un unico modo di ricostruire il cromosoma incollando i reads che si
sovrappongono per più della metà della loro lunghezza.

## Given
Al massimo 50 stringhe di DNA di lunghezza approssimativamente uguale (non superiore a 1
kbp), in formato FASTA, che rappresentano reads provenienti dallo stesso filamento di un
singolo cromosoma lineare.

## Return
La superstringa più corta contenente tutte le stringhe date (corrispondente al cromosoma
ricostruito).

## Sample Dataset
```
>Rosalind_56
ATTAGACCTG
>Rosalind_57
CCTGCCGGAA
>Rosalind_58
AGACCTGCCG
>Rosalind_59
GCCGGAATAC
```

## Sample Output
```
ATTAGACCTGCCGGAATAC
```
