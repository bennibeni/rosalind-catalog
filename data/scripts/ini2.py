filename = "dataset.txt"
with open(filename) as f:
    for riga in f:
        lista = riga.split(" ")
        a, b = int(lista[0]), int(lista[1])
        #print("a: {} b: {}".format(a, b)) 
        print(a*a + b*b)
        break