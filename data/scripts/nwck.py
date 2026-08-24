#http://rosalind.info/problems/nwck/

from collections import defaultdict, deque


def parse_newick(s):
    """Costruisce un albero da una stringa in formato Newick (senza lunghezze di ramo).
    Restituisce la lista di adiacenza (non orientata) e un dizionario nome -> id nodo."""
    s = s.strip()
    s = s.removesuffix(";")
    adiacenza = defaultdict(list)
    nomi = {}
    pos = [0]
    contatore = [0]

    def nuovo_nodo():
        contatore[0] += 1
        return contatore[0]

    def parse_clade():
        nodo = nuovo_nodo()
        if pos[0] < len(s) and s[pos[0]] == "(":
            pos[0] += 1
            while True:
                figlio = parse_clade()
                adiacenza[nodo].append(figlio)
                adiacenza[figlio].append(nodo)
                if s[pos[0]] == ",":
                    pos[0] += 1
                    continue
                elif s[pos[0]] == ")":
                    pos[0] += 1
                    break
        inizio_nome = pos[0]
        while pos[0] < len(s) and s[pos[0]] not in ",()":
            pos[0] += 1
        nome = s[inizio_nome:pos[0]]
        if nome:
            nomi[nome] = nodo
        return nodo

    parse_clade()
    return adiacenza, nomi

def distanza(adiacenza, nomi, x, y):
    partenza = nomi[x]
    arrivo = nomi[y]
    visitati = {partenza: 0}
    coda = deque([partenza])
    while coda:
        corrente = coda.popleft()
        if corrente == arrivo:
            return visitati[corrente]
        for vicino in adiacenza[corrente]:
            if vicino not in visitati:
                visitati[vicino] = visitati[corrente] + 1
                coda.append(vicino)
    return None

def lettura(filename):
    with open(filename) as f:
        righe = [r.strip() for r in f if r.strip() != ""]
    blocchi = []
    for i in range(0, len(righe), 2):
        albero = righe[i]
        x, y = righe[i + 1].split()
        blocchi.append((albero, x, y))
    return blocchi

def main():
    blocchi = lettura("dataset.txt")
    risultati = []
    for albero, x, y in blocchi:
        adiacenza, nomi = parse_newick(albero)
        risultati.append(str(distanza(adiacenza, nomi, x, y)))
    print(" ".join(risultati))

if __name__ == "__main__":
    # execute only if run as a script
    main()
