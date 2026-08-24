def lettura(filename):
    with open(filename) as f:
        dati = f.readline().rstrip("\n").split(" ")
    return dati

def main():
    dati = lettura("dataset.txt")

    #AA-AA
    #AA-Aa
    #AA-aa
    #Aa-Aa
    #Aa-aa
    #aa-aa
    evts = [4, 4, 4, 3, 2, 0]

    tot = 0
    for i in range(len(evts)):
        tot += evts[i] * int(dati[i]) * 1/2
    print(tot)

if __name__ == "__main__":
    # execute only if run as a script
    main()
