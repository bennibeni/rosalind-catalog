#http://rosalind.info/problems/kmp/

def lettura(filename):
    with open(filename) as f:
        record = ""
        first = True
        for riga in f:
            riga = riga.rstrip("\n")
            if riga[0] == ">":
                if not first:
                    return record
                first = False
            else:
                record += riga
    return record

def failure_array(s):
    n = len(s)
    fail = [0] * n
    k = 0
    for i in range(1, n):
        while k > 0 and s[k] != s[i]:
            k = fail[k - 1]
        if s[k] == s[i]:
            k += 1
        fail[i] = k
    return fail

def main():
    s = lettura("dataset.txt")
    fail = failure_array(s)
    print(" ".join(str(v) for v in fail))

if __name__ == "__main__":
    # execute only if run as a script
    main()
