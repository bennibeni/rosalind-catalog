#http://rosalind.info/problems/sset/

MODULO = 1000000

def lettura(filename):
    with open(filename) as f:
        riga = f.readline()
    return int(riga)

def main():
    n = lettura("dataset.txt")
    print(pow(2, n, MODULO))

if __name__ == "__main__":
    # execute only if run as a script
    main()
