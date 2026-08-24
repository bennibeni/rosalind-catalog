def lettura(filename):
    with open(filename) as f:
        data = []
        for riga in f:
               riga = riga.rstrip("\n")
               data.append(riga)
    return data

def elab(s, t):
    #print("s={} t={}".format(s,t))
    arr = [] 
    l = len(t)
    for i in range(len(s)-l+1):
        #print("i={}".format(i))
        #print("s[i:i+l]={}".format(s[i:i+l]))
        if s[i:i+l] == t:
           arr.append(i+1)
    return arr

def main():
    data = lettura("input.txt")
    n = int(data[0])
    #print("n={}".format(n))
    for i in range(1, 2*n+1, 2):
        s = data[i]
        t = data[i+1]
        arr = elab(s, t)
        if len(arr) > 0:
           msg = str(arr[0])
           for j in range(1, len(arr)):
               msg += " " + str(arr[j])
           print(msg)

if __name__ == "__main__":
    # execute only if run as a script
    main()
