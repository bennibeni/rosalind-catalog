#http://rosalind.info/problems/cat/

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

def memoize(f):
    memo = {}
    def helper(x):
        if x not in memo:            
            memo[x] = f(x)
        return memo[x]
    return helper
    
@memoize
def catalan(n):
    if n == 0 or n == 1:
       return 1
    else:
       result = 0
       for k in range(1, n+1):
           result = result + catalan(k-1) * catalan(n-k)
       return result

opp = {"U": "A", "A": "U", "C": "G", "G": "C"}

def validate_base_sequence(base_sequence, RNAflag=True):
    #Return True if the string base_sequence contains only upper- or lowercase T (or U, if RNAflag), C, A, and G characters, otherwise False
    seq = base_sequence.upper()
    return len(seq) == (seq.count('U' if RNAflag else 'T') + seq.count('C') + seq.count('A') + seq.count('G'))

def validate_gc(base_seq):
    #assert validate_base_sequence(base_seq), "argument has invalid characters: '" + base_seq + "'"
    #seq = base_seq.upper()
    return base_seq.count('C') == base_seq.count('G')

def validate_ua(base_seq):
    #assert validate_base_sequence(base_seq), "argument has invalid characters: '" + base_seq + "'"
    #seq = base_seq.upper()
    return base_seq.count('U') == base_seq.count('A')

class Rna:
    def __init__(self, s):
        self.s = s
        self.l = len(s)
    #def countC(self, c):
    #    return sum(1 for x in self.s if x == c)
    def valida(self):
        return validate_gc(self.s) and validate_ua(self.s)
    def get_chunks(self):
        chunks = []
        c = opp[self.s[-1]]
        i = 0
        j = self.s.find(c, i, self.l-1) 
        while j != -1:
          if j%2 == 0:
             chunks.append((self.s[0:j], self.s[j+1:self.l-1])) 
          j = self.s.find(c, j+1, self.l-1) 
        return chunks
def calcola_chunks(chunks):
    tot = 0
    for chunk in chunks:
        r0 = Rna(chunk[0])
        if r0.valida(): 
           r1 = Rna(chunk[1])
           if r1.valida(): 
              result0 = calcola(chunk[0])
              if result0 > 0:
                 result1 = calcola(chunk[1])
                 tot1 = result0 * result1
                 tot = (tot + tot1) % 1000000
    return tot    

@memoize
def calcola(s):
    if len(s) == 0:
       result = 1
    elif len(s) == 2:
       if opp[s[0]] == s[1]:
          result = 1
       else:
          result = 0
    else:
       chunks = Rna(s).get_chunks()
       result = calcola_chunks(chunks)
    return result % 1000000

def main():
    data = lettura("dataset.txt")
    s = data[0] 
    chunks = Rna(s).get_chunks()
    tot = calcola_chunks(chunks)
    print(tot)
    

if __name__ == "__main__":
    # execute only if run as a script
    main()
