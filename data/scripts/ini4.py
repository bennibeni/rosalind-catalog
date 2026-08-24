filename = "dataset.txt"
a, b = 0, 0
with open(filename) as f:
    for riga in f:
           lista = riga.split(" ") 
           a, b = int(lista[0]), int(lista[1])
           break   
tot = 0
for n in range(a, b+1):
	   if n%2 == 1:
	   	  tot+=n
print(tot)	   	  
