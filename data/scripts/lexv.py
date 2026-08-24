#http://rosalind.info/problems/lexv/

def lettura(filename):
    with open(filename) as f:
        alfabeto = f.readline().split()
        n = int(f.readline())
    return alfabeto, n

def genera(alfabeto, n, prefisso, risultati):
    if prefisso != "":
        risultati.append(prefisso)
    if len(prefisso) < n:
        for simbolo in alfabeto:
            genera(alfabeto, n, prefisso + simbolo, risultati)

def main():
    alfabeto, n = lettura("dataset.txt")
    risultati = []
    genera(alfabeto, n, "", risultati)
    for s in risultati:
        print(s)

if __name__ == "__main__":
    # execute only if run as a script
    main()
