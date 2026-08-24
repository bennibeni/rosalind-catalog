# Computing GC Content (Rosalind ID: GC)

Fonte: https://rosalind.info/problems/gc/

Argomenti Rosalind: String Algorithms

Nota: sulla pagina ufficiale Rosalind, il titolo del problema è "Computing GC Content",
ma la sezione introduttiva si intitola "Identifying Unknown DNA Quickly" — probabile
origine del nome scelto per questa cartella.

## Descrizione
Il contenuto GC (GC-content) di una stringa di DNA è la percentuale di simboli che sono
'C' o 'G'. Le stringhe vengono fornite in formato FASTA (introdotte da una riga che
inizia con '>' seguita da un'etichetta, es. "Rosalind_xxxx").

## Given
Al massimo 10 stringhe di DNA in formato FASTA (di lunghezza massima 1 kbp ciascuna).

## Return
L'ID della stringa con il GC-content più alto, seguito dal valore del GC-content di
quella stringa (errore assoluto ammesso: 0.001).

## Sample Dataset
```
>Rosalind_6404
CCTGCGGAAGATCGGCACTAGAATAGCCAGAACCGTTTCTCTGAGGCTTCCGGCCTTCCC
TCCCACTAATAATTCTGAGG
>Rosalind_5959
CCATCGGTAGCGCATCCTTAGTCCAATTAAGTCCCTATCCAGGCGCTCCGCCGAAGGTCT
ATATCCATTTGTCAGCAGACACGC
>Rosalind_0808
CCACCCTCGTGGTATGGCTAGGCATTCAGGAACCGGAGAACGCTTCAGACCAGCCCGGAC
TGGGAACCTGCGGGCAGTAGGTGGAAT
```

## Sample Output
```
Rosalind_0808
60.919540
```
