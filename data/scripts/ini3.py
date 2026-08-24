filename = "dataset.txt"
current = 0
stringa = ""
a, b, c, d = 0, 0, 0, 0
with open(filename) as f:
    for riga in f:
        if current == 0:
           stringa = riga
           current += 1
        elif current == 1:
           lista = riga.split(" ")
           a, b, c, d = int(lista[0]), int(lista[1]), int(lista[2]), int(lista[3])
           current += 1
        elif current == 2:
           break   
#print(stringa)
#print(a, b, c, d)
output = f"{stringa[a:b+1]} {stringa[c:d+1]}"
print(output)