import itertools
import math


def lettura(filename):
    with open(filename) as f:
         riga = f.readline()
         return int(riga)
         
         
def main():
    n = lettura("dataset.txt")
    print(math.factorial(n))
    for p in itertools.permutations(range(n)):
        print(" ".join([str(i+1) for i in p]))
             
             
if __name__ == "__main__":
    # execute only if run as a script
    main()    