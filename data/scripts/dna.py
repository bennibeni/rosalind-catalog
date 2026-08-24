counts = {}
filename = "dataset.txt"
with open(filename) as f:
    riga = f.readline()
for i in range(len(riga)):
    key = riga[i]
    if key in counts:
       counts[key]+=1
    else:   
       counts[key]=1
print("{} {} {} {}".format( counts['A'], counts['C'], counts['G'], counts['T'] ))
