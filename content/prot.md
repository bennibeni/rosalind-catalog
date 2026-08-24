# Translating RNA into Protein (Rosalind ID: PROT)

Fonte: https://rosalind.info/problems/prot/

Argomenti Rosalind: non classificato. La pagina ufficiale Rosalind non assegna un Topic a questo problema (è uno dei problemi fondazionali più antichi, precedenti all'introduzione sistematica dei Topics).

## Descrizione
Le proteine sono catene di amminoacidi, codificati a partire da tripletti di nucleotidi
dell'RNA detti codoni (64 combinazioni possibili). Il codone di start AUG codifica per la
metionina e segnala l'inizio della traduzione; i tre codoni di stop (UAA, UAG, UGA) non
codificano alcun amminoacido e terminano la traduzione.

## Given
Una stringa di RNA `s` corrispondente a un filamento di mRNA (lunghezza massima 10 kbp).

## Return
La stringa proteica codificata da `s`.

## Sample Dataset
```
AUGGCCAUGGCGCCCAGAACUGAGAUCAAUAGUACCCGUAUUAACGGGUGA
```

## Sample Output
```
MAMAPRTEINSTRING
```
