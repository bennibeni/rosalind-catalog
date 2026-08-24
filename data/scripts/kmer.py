#http://rosalind.info/problems/kmer/

from itertools import product

K = 4
ALFABETO = "ACGT"

def lettura(filename):
    data = []
    with open(filename) as f:
        record = ""
        first = True
        for riga in f:
            riga = riga.rstrip("\n")
            if riga[0] == ">":
                if not first:
                    data.append(record)
                record = ""
                first = False
            else:
                record += riga
    data.append(record)
    return data

def conta_kmer(s, k):
    conteggi = {}
    for i in range(len(s) - k + 1):
        kmer = s[i:i + k]
        conteggi[kmer] = conteggi.get(kmer, 0) + 1
    return conteggi

def main():
    seqs = lettura("dataset.txt")
    s = seqs[0]
    conteggi = conta_kmer(s, K)
    kmers_ordinati = ["".join(t) for t in product(ALFABETO, repeat=K)]
    risultato = [str(conteggi.get(kmer, 0)) for kmer in kmers_ordinati]
    print(" ".join(risultato))

if __name__ == "__main__":
    # execute only if run as a script
    main()
