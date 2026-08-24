# Open Reading Frames (Rosalind ID: ORF)

Fonte: https://rosalind.info/problems/orf/

Argomenti Rosalind: Combinatorics

## Descrizione
Una stringa di DNA implica sei possibili reading frame (tre lette direttamente, tre sul
reverse complement). Un Open Reading Frame (ORF) inizia con il codone di start (AUG) e
termina con un codone di stop, senza altri codoni di stop nel mezzo. Ogni ORF corrisponde
a una possibile stringa proteica candidata.

## Given
Una stringa di DNA `s` di lunghezza massima 1 kbp, in formato FASTA.

## Return
Ogni distinta stringa proteica candidata traducibile dagli ORF di `s`. Le stringhe possono
essere restituite in qualsiasi ordine.

## Sample Dataset
```
>Rosalind_99
AGCCATGTAGCTAACTCAGGTTACATGGGGATGACCCCGCGACTTGGATTAGAGTCTCTTTTGGAATAAGCCTGAATGATCCGAGTAGCATCTCAG
```

## Sample Output
```
MLLGSFRLIPKETLIQVAGSSPCNLS
M
MGMTPRLGLESLLE
MTPRLGLESLLE
```
