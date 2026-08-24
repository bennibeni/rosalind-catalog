from functools import reduce
from operator import add

arrotonda = lambda x: round(x * 1000) / 1000


def tartaglia(n):
    def item_to_add(x):
        if x == 0:
            return riga1[x]
        elif x == n - 1:
            return riga1[x - 1]
        else:
            return riga1[x - 1] + riga1[x]

    if n == 1:
        return [1]
    else:
        riga1 = tartaglia(n - 1)
        riga = []
        for i in range(n):
            riga.append(item_to_add(i))
        return riga

def formula(k, m):
    n = pow(2, k)
    a = 3/4
    b = 1/4
    riga = tartaglia(n + 1)
    tot=0
    l = lambda i: pow(a, n - i) * pow(b, i) * riga[i]
    tot = reduce(add, map(l, range(m, n + 1)))
    return tot

def lettura(file):
    with open(file) as f:
        riga = f.readline().rstrip("\n")
    return riga.split(" ")


def main():
    n, k = lettura("dataset.txt")
    result = formula(int(n), int(k))
    print(arrotonda(result))


if __name__ == "__main__":
    # execute only if run as a script
    main()
