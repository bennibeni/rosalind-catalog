stringa = ""
filename = "dataset.txt"
with open(filename) as f:
    riga = f.readline()
lista = riga.split(" ")
n, k = int(lista[0]), int(lista[1])
rabbits = [1, 0, 0]
for i in range(n-1):
    x = rabbits[0];
    y = rabbits[1];
    z = rabbits[2];
    rabbits[2] = z + y
    rabbits[1] = x
    rabbits[0] = k * (y+z)
print(rabbits[0]+rabbits[1]+rabbits[2])
