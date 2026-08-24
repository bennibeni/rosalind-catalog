mappa = {"UUU":"F", "UUC":"F", "UUA":"L", "UUG":"L",
    "UCU":"S", "UCC":"S", "UCA":"S", "UCG":"S",
    "UAU":"Y", "UAC":"Y", "UAA":"STOP", "UAG":"STOP",
    "UGU":"C", "UGC":"C", "UGA":"STOP", "UGG":"W",
    "CUU":"L", "CUC":"L", "CUA":"L", "CUG":"L",
    "CCU":"P", "CCC":"P", "CCA":"P", "CCG":"P",
    "CAU":"H", "CAC":"H", "CAA":"Q", "CAG":"Q",
    "CGU":"R", "CGC":"R", "CGA":"R", "CGG":"R",
    "AUU":"I", "AUC":"I", "AUA":"I", "AUG":"M",
    "ACU":"T", "ACC":"T", "ACA":"T", "ACG":"T",
    "AAU":"N", "AAC":"N", "AAA":"K", "AAG":"K",
    "AGU":"S", "AGC":"S", "AGA":"R", "AGG":"R",
    "GUU":"V", "GUC":"V", "GUA":"V", "GUG":"V",
    "GCU":"A", "GCC":"A", "GCA":"A", "GCG":"A",
    "GAU":"D", "GAC":"D", "GAA":"E", "GAG":"E",
    "GGU":"G", "GGC":"G", "GGA":"G", "GGG":"G"}

START = "AUG"

FIRST = "<"
LAST = ">" 

def RNA2PRT(inputFunc):
    def RNA2PRT(*args):
        record = inputFunc(*args) 
        stringa = ""   
        terna = ""     
        t=0
        for i in range(len(record)):
            terna += record[i]
            t = (t + 1)%3 
            if t == 0:
               if terna not in mappa:
                  stringa += "?"
               elif terna == START:
                  stringa += "<"+mappa[terna]
               elif mappa[terna].upper() == "STOP":
                  stringa += ">"
               else :
                  stringa += mappa[terna]
               terna = ""
        return stringa
    return RNA2PRT

def get_chunks(inputFunc):
    def get_chunks(*args):
        prt = inputFunc(*args)  
        chunks = []
        for i in range(len(prt)):
            if prt[i]==FIRST:
               j = prt.find(LAST, i+1)
               if j !=-1:
                  chunks.append(prt[i:j])
        return chunks
    return get_chunks

@get_chunks
@RNA2PRT
def DNA2PRT(record):
    return record.replace('T', 'U')

def lettura(filename):
    data = []
    with open(filename) as f:
        header = None
        body = ""   
        for riga in f:
               riga = riga.rstrip("\n")
               if riga[0] == ">":
                  if header is None:   
                     header = riga[1:]
                  else:
                     data.append({"header": header, "body": body})
                     header = riga
                     body = ""
               else:             
                  body += riga
        data.append({"header": header, "body": body})
    return data


def reverseDNA(dna):
    s = ""
    for i in range(len(dna)):
        key = dna[len(dna)-1-i]
        if key == 'G':
           key = 'C'
        elif key == 'C':
           key = 'G'
        elif key == 'T':
           key = 'A'
        elif key == 'A':
           key = 'T'
        s+=key
    return s


def step(soluzioni, dna):
    for i in [0, 1, 2]:
        sequence = dna[i:]
        chunks = DNA2PRT(sequence)
        for j in range(len(chunks)):
            current = chunks[j].replace(FIRST, '').replace(LAST, '') 
            if current not in soluzioni:
               soluzioni.append(current)
    return soluzioni               

def main():
    soluzioni = []
    records = lettura("dataset.txt")
    record = records[0]   
    dna = record["body"]
    step(soluzioni, dna)
    dna = reverseDNA(dna)    
    step(soluzioni, dna)
    for sol in soluzioni:
        print(sol)

if __name__ == "__main__":
    # execute only if run as a script
    main()
