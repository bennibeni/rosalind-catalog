#from secrets import randbelow

# t substring of s
def match(s, t):
    if s.find(t) != -1:
       #print("match {} {} = {}".format(s, t, s)) 
       return s

#k suffix of s that matches a length k prefix of t
def match1(s, t, k):
    if t[:k] == s[-k:]:
       #print("match1 {} {} = {} ({})".format(s, t, s+t[k:], k))
       return s+t[k:]

#k prefix of s that matches a length k suffix of t
def match2(s, t, k):
    if s[:k] == t[-k:]:
       #print("match2 {} {} = {} ({})".format(s, t, t[:-k]+s, k))
       return t[:-k]+s

def bestmatch1(s, t, da, a):
    ok = None
    for k in range(da, a-1, -1):
       ok = match1(s, t, k)
       if ok is not None:
          break
    return ok

def bestmatch2(s, t, da, a):
    ok = None
    for k in range(da, a-1, -1):
       ok = match2(s, t, k)
       if ok is not None:
          break
    return ok

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

def cond(sol, curr):
    if sol == "":
        return curr
    #if randbelow(10) == 0:
    #   return sol + curr
    sol1 = match(sol, curr)
    if sol1 is not None:
       return sol1
    sol1 = bestmatch1(sol, curr, len(curr), len(curr)//2+2)
    if sol1 is not None:
       return sol1
    sol1 = bestmatch2(sol, curr, len(curr), len(curr)//2+2)
    if sol1 is not None:
       return sol1

def main():
    arr = lettura("dataset.txt")
    arr1 = [ rec[1] for rec in arr  ]
    tot = 0
    sol = ""
    i = 0
    loops = 1
    maxloops = 100
    used = [False] * len(arr1)
    while tot < len(arr1) and loops < maxloops:
          curr = arr1[i]
          if not used[i]:
             sol1 = cond(sol, curr)
             if sol1 is not None:
                sol = sol1
                used[i] = True
                tot += 1
          i += 1
          if i == len(arr1):
             loops += 1
             i = 0
    print(sol)         
             
             
if __name__ == "__main__":
    # execute only if run as a script

#k suffix of s that matches a length k prefix of t
    #x = match1("ATTAGACCTG", "AGACCTGCCG", 7)
    #print(x)

#k prefix of s that matches a length k suffix of t
    #x = match2("AGACCTGCCG", "ATTAGACCTG", 7)
    #print(x)

    main()