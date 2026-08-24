def lettura(filename):
    arr = []    
    with open(filename) as f:
        a, b = "", ""
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

def valid(s, records):
    result = True
    for record in records:
        if record[1].find(s) == -1:
           result = False
           break
    return result

def purge(stack, records):
    stack1 = []
    for s in stack:
        if valid(s, records): 
           stack1.append(s)  
    return stack1

def iteration(stack, records):
    stack1 = purge(stack, records)
    if len(stack1) == 0:
       print(stack[0][0:-1])
       return
    stack2 = []
    length = len(stack1) 
    for i in range(length):
        for l in ["A","C","G","T"]:
            stack2.append(stack1[i]+l)
    return stack2
   
def main():
    records = lettura("dataset.txt")
    #for record in records:
    #	   print(record[1])
    
    stack0 = [""]
    while True:
        stack1 = iteration(stack0, records)
        if stack1 is None:
           break
        stack0 = stack1
            
if __name__ == "__main__":
    # execute only if run as a script
    main()
