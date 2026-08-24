from collections import defaultdict


class Contatore:
    def __init__(self):
        self.__totale = 0

    def add(self):
        self.__totale += 1

    def saytotale(self):
        return self.__totale


def lettura(filename):
    data = []
    with open(filename) as f:
        record = ""
        first = True
        for riga in f:
            riga = riga.rstrip("\n")
            if riga[0] == ">":
                if not first:
                    data.append(record)
                record = ""
                first = False
            else:
                record += riga
    data.append(record)
    return data


def columns(matrix):
    for i in range(len(matrix[0])):
        col = [row[i] for row in matrix]
        yield col


def max_symbol(matrix):
    cols = columns(matrix)
    for col in cols:
        symbol_count = defaultdict(Contatore)
        for symbol in col:
            symbol_count[symbol].add()
        yield max(symbol_count.keys(), key=(lambda k: symbol_count[k].saytotale()))


def main():
    matrix = lettura("dataset.txt")
    print(''.join(max_symbol(matrix)))


if __name__ == "__main__":
    # execute only if run as a script
    main()
