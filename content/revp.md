# Locating Restriction Sites (Rosalind ID: REVP)

Fonte: https://rosalind.info/problems/revp/

Argomenti Rosalind: String Algorithms

## Descrizione
Una stringa di DNA è un "reverse palindrome" se è uguale al proprio reverse complement
(es. GCATGC). Questi siti sono bersagli tipici degli enzimi di restrizione batterici.

## Given
Una stringa di DNA di lunghezza massima 1 kbp, in formato FASTA.

## Return
La posizione e la lunghezza di ogni reverse palindrome nella stringa avente lunghezza tra
4 e 12. Le coppie possono essere restituite in qualsiasi ordine.

## Sample Dataset
```
>Rosalind_24
TCAATGCATGCGGGTCTATATGCAT
```

## Sample Output
```
4 6
5 4
6 6
7 4
17 4
18 4
20 6
21 4
```
