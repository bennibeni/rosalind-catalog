#http://rosalind.info/problems/corr/

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
    return arr

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

def makeDiz(arr):
    diz = {}
    for i in range(len(arr)):
        dnas = [arr[i][1], reverseDNA(arr[i][1])]
        key = min(dnas)
        diz[key] = {"input":arr[i][1], "pair": set(dnas), "tot": 0}
    for i in range(len(arr)):
        dnas = [arr[i][1], reverseDNA(arr[i][1])]
        key = min(dnas)
        diz[key]["tot"] += 1
    #print(diz)    
    return diz    

def count(x, y):
    assert (len(x) == len(y)), "len("+x+") != len("+y+")"
    return sum(1 for i in range(len(x)) if x[i] != y[i])

def subdiz(diz, cond):
    return [diz[key] for key in diz if cond(key)]

def dizko(diz):
    def condok(key):
        return diz[key]["tot"] == 1
    return subdiz(diz, condok)

def dizok(diz):
    def condko(key):
        return diz[key]["tot"] > 1
    return subdiz(diz, condko)

#def match(keyok, keyko):
#    matches = None
#    for ko in keyko["pair"]:
#        if matches is None:
#           for ok in keyok["pair"]:
#               c = count(ok, ko)
#               if c == 1:
#                  matches = keyok["input"] + "->" + ko
#                  break
#                  #print(keyok, keyko, matches)           
#    return matches  

def find_dnas(ok, dnas, input_seq):
    for keyok in ok:
        msg = None
        for dnaok in keyok["pair"]:
            if msg is None:  
               c = count(input_seq, dnaok)
               if c == 1:
                  msg = input_seq + "->" + dnaok
                  break           
        if msg is not None:  
           print(msg)
          
def elab(diz):
    ko = dizko(diz)
    ok = dizok(diz)
    for keyko in ko:
        dnas = keyko["pair"]
        input_seq = keyko["input"] 
        find_dnas(ok, dnas, input_seq)

def main():
    arr = lettura("dataset.txt")
    diz = makeDiz(arr)
    #print(diz)
    elab(diz)


if __name__ == "__main__":
    # execute only if run as a script
    main()
