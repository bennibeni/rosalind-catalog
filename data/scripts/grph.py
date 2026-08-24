def match3(s, t):
    return t[:3] == s[-3:]

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

def main():
    arr = lettura("dataset.txt")

    for i in range(len(arr)):
        for j in range(len(arr)):
            if i != j and match3(arr[i][1], arr[j][1]):
               print(f"{arr[i][0]} {arr[j][0]}")


if __name__ == "__main__":
    # execute only if run as a script
    main()