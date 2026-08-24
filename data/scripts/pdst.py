#http://rosalind.info/problems/pdst/

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

def p_distance(s1, s2):
    diff = sum(1 for a, b in zip(s1, s2) if a != b)
    return diff / len(s1)

def main():
    seqs = lettura("dataset.txt")
    n = len(seqs)
    for i in range(n):
        riga = [p_distance(seqs[i], seqs[j]) for j in range(n)]
        print(" ".join(f"{v:.5f}" for v in riga))

if __name__ == "__main__":
    # execute only if run as a script
    main()
