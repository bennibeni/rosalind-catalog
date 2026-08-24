#http://rosalind.info/problems/sign/

import itertools


def lettura(filename):
    with open(filename) as f:
         riga = f.readline()
         return int(riga)

def main():
    n = lettura("dataset.txt")
    soluzioni = []
    for p in itertools.permutations(range(1, n + 1)):
        for segni in itertools.product([1, -1], repeat=n):
            soluzioni.append([v * s for v, s in zip(p, segni)])
    print(len(soluzioni))
    for sol in soluzioni:
        print(" ".join(str(x) for x in sol))

if __name__ == "__main__":
    # execute only if run as a script
    main()
