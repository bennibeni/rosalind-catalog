stringa = ""
filename = "dataset.txt"
with open(filename) as f:
    riga = f.readline()
for i in range(len(riga)):
    key = riga[len(riga)-1-i]
    if key == 'G':
       key = 'C'
    elif key == 'C':
       key = 'G'
    elif key == 'T':
       key = 'A'
    elif key == 'A':
       key = 'T'
    stringa+=key
print(stringa)
