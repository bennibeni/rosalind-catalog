#http://rosalind.info/problems/sort/

def lettura(filename):
    with open(filename) as f:
        righe = [r.split() for r in f if r.strip() != ""]
    pi = tuple(int(x) for x in righe[0])
    gamma = tuple(int(x) for x in righe[1])
    return pi, gamma

def inverti(perm, i, j):
    return perm[:i] + perm[i:j + 1][::-1] + perm[j + 1:]

def bfs_bidirezionale(inizio, fine):
    n = len(inizio)
    mosse = [(i, j) for i in range(n) for j in range(i + 1, n)]

    genitore_avanti = {inizio: None}
    mossa_avanti = {}
    fronte_avanti = [inizio]

    genitore_indietro = {fine: None}
    mossa_indietro = {}
    fronte_indietro = [fine]

    if inizio == fine:
        return []

    incontro = None
    while incontro is None:
        if len(fronte_avanti) <= len(fronte_indietro):
            nuovo_fronte = []
            for perm in fronte_avanti:
                for (i, j) in mosse:
                    nuovo = inverti(perm, i, j)
                    if nuovo not in genitore_avanti:
                        genitore_avanti[nuovo] = perm
                        mossa_avanti[nuovo] = (i, j)
                        if nuovo in genitore_indietro:
                            incontro = nuovo
                            break
                        nuovo_fronte.append(nuovo)
                if incontro is not None:
                    break
            fronte_avanti = nuovo_fronte
        else:
            nuovo_fronte = []
            for perm in fronte_indietro:
                for (i, j) in mosse:
                    nuovo = inverti(perm, i, j)
                    if nuovo not in genitore_indietro:
                        genitore_indietro[nuovo] = perm
                        mossa_indietro[nuovo] = (i, j)
                        if nuovo in genitore_avanti:
                            incontro = nuovo
                            break
                        nuovo_fronte.append(nuovo)
                if incontro is not None:
                    break
            fronte_indietro = nuovo_fronte

    # ricostruisci il percorso: inizio -> incontro
    percorso_avanti = []
    corrente = incontro
    while genitore_avanti[corrente] is not None:
        percorso_avanti.append(mossa_avanti[corrente])
        corrente = genitore_avanti[corrente]
    percorso_avanti.reverse()

    # ricostruisci il percorso: incontro -> fine
    percorso_indietro = []
    corrente = incontro
    while genitore_indietro[corrente] is not None:
        percorso_indietro.append(mossa_indietro[corrente])
        corrente = genitore_indietro[corrente]

    return percorso_avanti + percorso_indietro

def main():
    pi, gamma = lettura("dataset.txt")
    mosse = bfs_bidirezionale(pi, gamma)
    print(len(mosse))
    for i, j in mosse:
        print(i + 1, j + 1)

if __name__ == "__main__":
    # execute only if run as a script
    main()
