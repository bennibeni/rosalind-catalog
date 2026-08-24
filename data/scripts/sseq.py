#http://rosalind.info/problems/sseq/

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

def main():
    seqs = lettura("dataset.txt")
    s, t = seqs[0], seqs[1]
    posizioni = []
    j = 0
    for i in range(len(s)):
        if j < len(t) and s[i] == t[j]:
            posizioni.append(i + 1)
            j += 1
    print(" ".join(str(p) for p in posizioni))

if __name__ == "__main__":
    # execute only if run as a script
    main()
