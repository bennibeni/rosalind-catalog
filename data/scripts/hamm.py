filename = "dataset.txt"
with open(filename) as f:
    a = f.readline()
    b = f.readline()
tot = 0
for i in range(len(a)):
    if a[i] != b[i]:
    	  tot += 1
print(tot)
