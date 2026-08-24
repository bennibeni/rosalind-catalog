filename = "dataset.txt"
with open(filename) as f:
    #k are homozygous dominant for a factor
    #m are heterozygous
    #n are homozygous recessive.
    k, m, n = f.readline().split(" ")

K = "k"
M = "m"
N = "n"

elems = {K: int(k), M: int(m), N: int(n)}
tipi = {"k":["A","A"], "m":["A","B"], "n":["a","a"] }
incroci = [[i, j] for i in [K, M, N] for j in [K, M, N]]

#Possibilita favorevoli
count = 0
#Possibilita totali
tot = 0 
for i in range(len(incroci)):
    first = incroci[i][0]
    second = incroci[i][1]

    #Calcolo le combinazioni (l'ordine non mi interessa) possibili per tutti gli incroci 
    #I due tipi possono essere uguali o diversi e il calcolo cambia
    if first == second:
       multiplier = (elems[first] * (elems[second]-1))/2
    else: 
       multiplier = (elems[first] * elems[second])/2
    
    #An organism only needs to possess one copy of the dominant allele 
    #to display the trait represented by the dominant allele    
    for couple in [[tipi[first][i], tipi[second][j]] for i in [0, 1] for j in [0, 1]]:
        if "A" in couple:
           count += multiplier 
        tot += multiplier  

result = count/tot
#Arrotondamento 
result = int(result * 100000) / 100000
print(result)


     
 