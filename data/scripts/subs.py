filename = "dataset.txt"
with open(filename) as f:
    s = f.readline().rstrip("\n")
    t = f.readline().rstrip("\n")

match = lambda x: s[x:x+len(t)] == t

result = [str(i+1) for i in range(len(s)) if match(i)]
print(" ".join(result))
