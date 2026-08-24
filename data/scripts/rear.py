#http://rosalind.info/problems/rear/

def lettura(filename):
    dati = []
    with open(filename) as f:
       for riga in f:
         riga = riga.replace("\n", "")
         if len(riga) > 0:
            lista = riga.split(" ") 
            dati.append(lista)
    return dati 



def print_table(nodes, rules, cache):
    news = []
    for v in nodes:
        row = []
        for rule in rules:
            w = transform(v, rule)
            if not w in cache:
               cache.add(w)
               news.append(w)
            row.append(w)
        #print(v, row)
    return news

stringify = lambda x: ('').join([str(i) for i in range(x)])
 
def f_adiacents(v):
    z = [v]
    for i in range(len(v)):
       for j in range(i+1, len(v)):
         w = ""
         for k in range(len(v)):
           if k<i or k>j:
            w += v[k]
           else:
            w += v[j-k+i]
         z.append(w)
    return z

def transform(v, rule):
    return ''.join([v[int(i)] for i in rule]) 

def path_score(sets, end): 
    #print(len(sets), start, end)
    for i in range(len(sets)):
        if end in sets[i]:
           return i

def trans(a, b):
    n = len(a)
    return (stringify(n), "".join([str(b.index(x)) for x in a]))	

def main_write():
 with open('sets10.txt', 'w') as the_file:
    n = 10
    unit = stringify(n)
    maxloops = 100
    rules = f_adiacents(unit)
    sets = []
    news = [unit]
    loops = 1
    cache = set()
    while len(news) > 0 and loops < maxloops:
       sets.append(news)
       news = print_table(news, rules, cache)
       the_file.write(str(news))
       the_file.write("\n")
       loops += 1
    return sets    

def main_read():
 n = 10
 unit = stringify(n)
 sets = [unit]
 try:
    with open('sets10.txt', 'r') as the_file:
        sets.extend(the_file)
        return sets 
 except FileNotFoundError:
    return main_write()

def main():
    sets = main_read() 
    f = lambda a: ('').join([str(int(x)-1) for x in a])
    dati = lettura("dataset.txt")
    solution = []
    for index in range(0, len(dati), 2):
        start =  f(dati[index+0])
        end = f(dati[index+1])
        #print(start, end)
        start, end = trans(start, end)
        #print(start, end)
        #print()
        score = path_score(sets, end)
        solution.append(str(score))
    print(" ".join(solution))

if __name__ == "__main__":
    # execute only if run as a script
    #start_time = time.time()
    main() 
    #end_time = time.time()
    #print(round(end_time - start_time, 2))    