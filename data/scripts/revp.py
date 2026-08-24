def reverseDNA(dna):
    s = ""
    for i in range(len(dna)):
        key = dna[len(dna)-1-i]
        if key == 'G':
           key = 'C'
        elif key == 'C':
           key = 'G'
        elif key == 'T':
           key = 'A'
        elif key == 'A':
           key = 'T'
        s+=key
    return s

def lettura(filename):
    arr = []    
    with open(filename) as f:
        a = None
        b = ""
        for riga in f: 
            if riga[0] == ">":
               if b != "":
                  arr.append([a, b])
                  b = ""
               a = riga[1:-1]
            else:
               if b == "": 
                  b = riga.rstrip("\n") 
               else:
                  b += riga.rstrip("\n") 
        arr.append([a, b])       
    return arr[0][1]

def main():
    dna = lettura("dataset.txt")
    l1 = 4
    l2 = 12
    for i in range(len(dna)-l1+1):
        for j in range(l1, l2+1):
            x = dna[i:i+j] 
            if j > len(x):
                break
            y = reverseDNA(x)
            if x == y:
               print(i+1, j)	
             
if __name__ == "__main__":
    # execute only if run as a script
    main() 