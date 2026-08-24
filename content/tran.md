# Transitions and Transversions (Rosalind ID: TRAN)

Fonte: https://rosalind.info/problems/tran/

Argomenti Rosalind: Alignment

## Descrizione
Una mutazione puntiforme può essere una transizione (sostituzione di una purina con
un'altra purina, A↔G, oppure di una pirimidina con un'altra pirimidina, C↔T) o una
transversione (scambio tra purina e pirimidina). Le transizioni sono più comuni delle
transversioni perché richiedono un cambiamento chimico meno drastico. Il rapporto
transizioni/transversioni è una statistica utile per identificare DNA codificante.

## Given
Due stringhe di DNA `s1` e `s2` di uguale lunghezza (al massimo 1 kbp ciascuna), in
formato FASTA.

## Return
Il rapporto transizioni/transversioni R(s1, s2).

## Sample Dataset
```
>Rosalind_0209
GCAACGCACAACGAAAACCCTTAGGGACTGGATTATTTCGTGATCGTTGTAGTTATTGGA
AGTACGGGCATCAACCCAGTT
>Rosalind_2200
TTATCTGACAAAGAAAGCCGTCAACGGCTGGATAATTTCGCGATCGTGCTGGTTACTGGC
GGTACGAGTGTTCCTTTGGGT
```

## Sample Output
```
1.21428571429
```
