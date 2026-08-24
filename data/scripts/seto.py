#http://rosalind.info/problems/seto/

def lettura(filename):
    with open(filename) as f:
        n = int(f.readline())
        a = {int(x) for x in f.readline().strip("{}\n").split(",")}
        b = {int(x) for x in f.readline().strip("{}\n").split(",")}
    return n, a, b

def formatta(insieme):
    return "{" + ", ".join(str(x) for x in sorted(insieme)) + "}"

def main():
    n, a, b = lettura("dataset.txt")
    universo = set(range(1, n + 1))
    print(formatta(a | b))
    print(formatta(a & b))
    print(formatta(a - b))
    print(formatta(b - a))
    print(formatta(universo - a))
    print(formatta(universo - b))

if __name__ == "__main__":
    # execute only if run as a script
    main()
