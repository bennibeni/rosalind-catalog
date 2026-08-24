#http://rosalind.info/problems/rstr/

def lettura(filename):
    with open(filename) as f:
        n, x = f.readline().split()
        s = f.readline().strip()
    return int(n), float(x), s

def main():
    n, x, s = lettura("dataset.txt")
    gc = s.count("G") + s.count("C")
    at = s.count("A") + s.count("T")
    p_s = ((x / 2) ** gc) * (((1 - x) / 2) ** at)
    print(1 - (1 - p_s) ** n)

if __name__ == "__main__":
    # execute only if run as a script
    main()
