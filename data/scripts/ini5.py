filename = "dataset.txt"
fileOut = "fileOut.txt"
with open(filename) as f:
    testo = list(f)
with open(fileOut, "w") as f:
    for i in range(len(testo)):
        if i%2==1:
           print(testo[i].rstrip("\n"))
           f.write(testo[i])	
