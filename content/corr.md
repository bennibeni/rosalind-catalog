# Error Correction in Reads (Rosalind ID: CORR)

Fonte: https://rosalind.info/problems/corr/

Argomenti Rosalind: Genome Assembly

## Descrizione
Le macchine di sequenziamento producono errori: il tipo più comune è un singolo
nucleotide interpretato in modo errato. Per ogni read s nel dataset: o è corretto e
compare almeno due volte (eventualmente come reverse complement), oppure è errato,
compare esattamente una volta, e ha distanza di Hamming 1 rispetto a esattamente un read
corretto (o al suo reverse complement).

## Given
Una collezione di fino a 1000 reads di uguale lunghezza (al massimo 50 bp) in formato
FASTA. Alcuni di questi reads contengono un errore su un singolo nucleotide.

## Return
Un elenco di tutte le correzioni nella forma "[read vecchio]->[read nuovo]". Ogni
correzione deve essere una singola sostituzione di simbolo; le correzioni possono essere
restituite in qualsiasi ordine.

## Sample Dataset
```
>Rosalind_52
TCATC
>Rosalind_44
TTCAT
>Rosalind_68
TCATC
>Rosalind_28
TGAAA
>Rosalind_95
GAGGA
>Rosalind_66
TTTCA
>Rosalind_33
ATCAA
>Rosalind_21
TTGAT
>Rosalind_18
TTTCC
```

## Sample Output
```
TTCAT->TTGAT
GAGGA->GATGA
TTTCC->TTTCA
```
