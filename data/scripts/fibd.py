def fibonacci(n, k=0):
   rabbits = [1]
   for i in range(n-1):
       rabbits.insert(0, 0)    
       rabbits[0] = sum(r for r in rabbits[2: i+2]) 
       rabbits = rabbits[: k]    
   #print(n, k, rabbits)
   return sum(rabbits)

def main():
   filename = "dataset.txt"
   with open(filename) as f:
        riga = f.readline()
   lista = riga.split(" ")
   n, k = int(lista[0]), int(lista[1])
   count = fibonacci(n, k)
   print(count)    

if __name__ == "__main__":
    # execute only if run as a script
    main()

   
   