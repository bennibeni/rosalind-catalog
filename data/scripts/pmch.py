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
    
def fact(x):
    if x == 1:
        return 1
    else:
        return x * fact(x-1)

def main():
    data = lettura("dataset.txt")
    s = data[0] 
    numA = 0
    numU = 0
    numC = 0
    numG = 0

    for l in s:
        if l == 'A':  
         numA += 1
        elif l == 'U':  
         numU += 1 
        elif l == 'C':  
         numC += 1 
        elif l == 'G':  
         numG += 1 

    print(fact(numA) * fact(numC))

if __name__ == "__main__":
    # execute only if run as a script
    main()
