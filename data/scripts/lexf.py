from itertools import product


def lettura(filename):
    with open(filename) as f:
         s = f.readline().replace(" ","").replace("\n","")
         k = f.readline().replace(" ","")
         return (s, int(k))
         
         
def main():
    s, k  = lettura("dataset.txt")
    for p in product(s, repeat = k):
        print("".join(p)) 
             
             
if __name__ == "__main__":
    # execute only if run as a script
    main()    