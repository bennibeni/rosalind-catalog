def lettura(filename):
    with open(filename) as f:
         riga = f.readline().replace("\n", "")
    return riga   

def main():
    riga = lettura("dataset.txt")
    print(riga.replace("T", "U"))

if __name__ == "__main__":
    # execute only if run as a script
    main() 

