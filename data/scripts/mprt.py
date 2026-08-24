#http://rosalind.info/problems/mprt/

#pip install regex 
import regex
import requests


def lettura(filename):
    data = []
    with open(filename) as f:
        for riga in f:
            if len(riga) > 1:
                riga = riga.rstrip("\n")
                data.append(riga)
    return data

def get_text(prot):
    accession = prot.split("_")[0]
    url = f"https://rest.uniprot.org/uniprotkb/{accession}.fasta"
    r = requests.get(url)
    if r.status_code == 200:
       text = r.text
       start = text.index("\n")
       text = text[start:].replace("\n", "")
       return text

def find_all(text):
    #[result = [str(m.start()+1) for m in regex.finditer(r"N[^P][ST][^P]", text)]

    p = regex.compile(r"N[^P][ST][^P]")
    result = []
    index = 0
    while True:
       m = p.search(text[index:])
       if m is not None:
          index += m.span()[0] + 1
          result.append(str(index))
       else:
          break   
    return result

data = lettura("dataset.txt")
for prot in data:
    text = get_text(prot)
    result = find_all(text)
    if len(result) > 0:
       print(prot)
       print(" ".join(result))


    