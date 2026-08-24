#http://rosalind.info/problems/motz/

import sys

MODULO = 1000000
COMPLEMENTI = {"A": "U", "U": "A", "C": "G", "G": "C"}

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

def conta_matching(s, memo):
    n = len(s)
    if n in (0, 1):
        return 1
    if s in memo:
        return memo[s]
    totale = conta_matching(s[1:], memo)
    for k in range(1, n):
        if COMPLEMENTI.get(s[0]) == s[k]:
            totale += conta_matching(s[1:k], memo) * conta_matching(s[k + 1:], memo)
            totale %= MODULO
    memo[s] = totale
    return totale

def main():
    sys.setrecursionlimit(10000)
    s = lettura("dataset.txt")
    memo = {}
    print(conta_matching(s, memo))

if __name__ == "__main__":
    # execute only if run as a script
    main()
