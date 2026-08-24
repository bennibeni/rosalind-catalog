#http://rosalind.info/problems/tran/

PURINE = {"A", "G"}
PYRIMIDINE = {"C", "T"}

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

def is_transition(a, b):
    return (a in PURINE and b in PURINE) or (a in PYRIMIDINE and b in PYRIMIDINE)

def main():
    seqs = lettura("dataset.txt")
    s1, s2 = seqs[0], seqs[1]
    transizioni = 0
    trasversioni = 0
    for i in range(len(s1)):
        if s1[i] != s2[i]:
            if is_transition(s1[i], s2[i]):
                transizioni += 1
            else:
                trasversioni += 1
    print(transizioni / trasversioni)

if __name__ == "__main__":
    # execute only if run as a script
    main()
