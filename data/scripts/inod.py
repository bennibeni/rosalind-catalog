def lettura(filename):
    with open(filename) as f:
         riga = f.readline()
         return int(riga)
         
         
def main():
    n = lettura("dataset.txt")
    print("", n-2)
             
             
if __name__ == "__main__":
    # execute only if run as a script
    main() 
  