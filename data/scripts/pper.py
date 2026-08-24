#http://rosalind.info/problems/pper/

MODULO = 1000000

def lettura(filename):
    with open(filename) as f:
        n, k = f.readline().split()
    return int(n), int(k)

def main():
    n, k = lettura("dataset.txt")
    risultato = 1
    for i in range(n - k + 1, n + 1):
        risultato = (risultato * i) % MODULO
    print(risultato)

if __name__ == "__main__":
    # execute only if run as a script
    main()
