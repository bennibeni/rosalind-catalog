import math

arrotonda = lambda x: round(x * 1000) / 1000

def lettura(filename):
    with open(filename) as f:
         riga = f.readline()
         s = riga.replace("\n", "")
         riga = f.readline()
         A = riga.replace("\n", "").split()
         return s, A 

def elab(s, A):
    result = [] 
    for k in range(len(A)):
        a = float(A[k])
        tot = 0
        for i in range(len(s)):
            if s[i]=="C" or s[i]=="G":
               tot += math.log10(a/2)
            else:
               tot += math.log10((1-a)/2)
        result.append(str(arrotonda(tot)))
    return result

def main():
    s, A = lettura("dataset.txt")
    result = elab(s, A)
    print(" ".join(result))

if __name__ == "__main__":
    # execute only if run as a script
    main()

