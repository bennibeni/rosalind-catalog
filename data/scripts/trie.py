#http://rosalind.info/problems/trie/

def lettura(filename):
    with open(filename) as f:
        pattern = [riga.strip() for riga in f if riga.strip() != ""]
    return pattern

def costruisci_trie(patterns):
    trie = {1: {}}
    contatore = 1
    archi = []
    for pattern in patterns:
        corrente = 1
        for simbolo in pattern:
            if simbolo in trie[corrente]:
                corrente = trie[corrente][simbolo]
            else:
                contatore += 1
                nuovo = contatore
                trie[corrente][simbolo] = nuovo
                trie[nuovo] = {}
                archi.append((corrente, nuovo, simbolo))
                corrente = nuovo
    return archi

def main():
    patterns = lettura("dataset.txt")
    archi = costruisci_trie(patterns)
    for parent, figlio, simbolo in archi:
        print(parent, figlio, simbolo)

if __name__ == "__main__":
    # execute only if run as a script
    main()
