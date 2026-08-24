data = []
filename = "dataset.txt"
with open(filename) as f:
    first = True
    record = {}
    for riga in f:
           riga = riga.rstrip("\n")
           if riga[0] == ">":
              riga = riga[1:] 
              if not first:
                 data.append(record)
              first = False
              record = {"header":riga}
           else:
              if not "body" in record:
                 record["body"] = riga
              else:
                 record["body"] += riga
    data.append(record)          
winner = 0
for i in range(len(data)):
    record = data[i]["body"]
    cg = 0
    for j in range(len(record)):
       if record[j]=="C" or record[j]=="G":
          cg += 1
    percent = 100 * (cg / len(record))
    data[i]["percent"] = percent
    if percent > data[winner]["percent"]:
    	  winner = i
print(data[winner]["header"])
percent = data[winner]["percent"]
percent = int(percent * 1000000) / 1000000
print(percent)
percent = (str(percent)+"000000")[:-5]
print(percent)
