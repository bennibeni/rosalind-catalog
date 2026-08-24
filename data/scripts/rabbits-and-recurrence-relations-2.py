def fibonacci(n, k):
    if n > 2:
       return fibonacci(n-1, k) + k * fibonacci(n-2, k)
    return 1   

def main():
    filename = "dataset.txt"
    with open(filename) as f:
        riga = f.readline()

    n, k = riga.split(" ")
    print(fibonacci(int(n), int(k)))

if __name__ == "__main__":
    main()
