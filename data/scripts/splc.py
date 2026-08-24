#http://rosalind.info/problems/splc/

table = {"UUU": "F","CUU": "L","AUU": "I","GUU": "V","UUC": "F","CUC": "L","AUC": "I","GUC": "V","UUA": "L","CUA": "L","AUA": "I","GUA": "V","UUG": "L","CUG": "L","AUG": "M","GUG": "V","UCU": "S","CCU": "P","ACU": "T","GCU": "A","UCC": "S","CCC": "P","ACC": "T","GCC": "A","UCA": "S","CCA": "P","ACA": "T","GCA": "A","UCG": "S","CCG": "P","ACG": "T","GCG": "A","UAU": "Y","CAU": "H","AAU": "N","GAU": "D","UAC": "Y","CAC": "H","AAC": "N","GAC": "D","UAA": "Stop","CAA": "Q","AAA": "K","GAA": "E","UAG": "Stop","CAG": "Q","AAG": "K","GAG": "E","UGU": "C","CGU": "R","AGU": "S","GGU": "G","UGC": "C","CGC": "R","AGC": "S","GGC": "G","UGA": "Stop","CGA": "R","AGA": "R","GGA": "G","UGG": "W","CGG": "R","AGG": "R","GGG": "G"}
g = lambda s, i: table[s[i:i+3]]

def getMRNA(s):
   arr = [g(s, i) for i in range(0, len(s), 3) if g(s, i)!="Stop"]
   return "".join(arr) 

def getRNA(s):
   return s.replace('T', 'U')  

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
    data = lettura("dataset.txt")
    dna = data.pop(0)
    for s in data:
        dna = dna.replace(s, "")
    rna = getRNA(dna)    
    mrna = getMRNA(rna)
    print(mrna)    

if __name__ == "__main__":
    # execute only if run as a script
    main()
