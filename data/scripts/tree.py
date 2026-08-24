#http://rosalind.info/problems/tree/

#10
#1 2
#2 8
#4 10
#5 9
#6 10
#7 9

def lettura(filename):
    dati = []
    with open(filename) as f:
         n = int(f.readline().replace("\n", ""))
         for riga in f:
             #dati.append(list(map(int, riga.replace("\n", "").split(" "))))
             dati.append(riga.replace("\n", "").split(" "))
    return n, dati        

#http://www.bogotobogo.com/python/python_graph_data_structures.php
        
class Vertex:
    def __init__(self, node):
        self.id = node
        self.adjacent = {}

    def __str__(self):
        return str(self.id) + ' adjacent: ' + str([x.id for x in self.adjacent])

    def add_neighbor(self, neighbor, weight=0):
        self.adjacent[neighbor] = weight

    def get_connections(self):
        return self.adjacent.keys()  

    def get_id(self):
        return self.id

    def get_weight(self, neighbor):
        return self.adjacent[neighbor]

class Graph:
    def __init__(self):
        self.vert_dict = {}
        self.num_vertices = 0

    def __iter__(self):
        return iter(self.vert_dict.values())

    def add_vertex(self, node):
        self.num_vertices = self.num_vertices + 1
        new_vertex = Vertex(node)
        self.vert_dict[node] = new_vertex
        return new_vertex

    def get_vertex(self, n):
        if n in self.vert_dict:
            return self.vert_dict[n]
        else:
            return None

    def add_edge(self, frm, to, cost = 0):
        if frm not in self.vert_dict:
            self.add_vertex(frm)
        if to not in self.vert_dict:
            self.add_vertex(to)

        self.vert_dict[frm].add_neighbor(self.vert_dict[to], cost)
        self.vert_dict[to].add_neighbor(self.vert_dict[frm], cost)

    def get_vertices(self):
        return self.vert_dict.keys()
         
def main():
    n, dati = lettura("dataset.txt")
    #print(dati)
    #[['1', '2'], ['2', '8'], ['4', '10'], ['5', '9'], ['6', '10'], ['7', '9']]
    
    g = Graph()

    for i in range(n):
        g.add_vertex(str(i+1))

    for pair in dati:
        g.add_edge(pair[0], pair[1])  

    #for v in g:
        #for w in v.get_connections():
            #vid = v.get_id()
            #wid = w.get_id()
            #print(vid, wid)

        #1 2
        #2 1
        #2 8
        #4 10
        #5 9
        #6 10
        #7 9
        #8 2
        #9 5
        #9 7
        #10 4
        #10 6

    sets = []
    for v in g:
        setv = {v.get_id()} | {x.id for x in v.adjacent}
        found = False 
        for i in range(len(sets)):
            if len(setv & sets[i]) > 0:
               sets[i] = sets[i] | setv
               found = True
               break
        if not found:     
           sets.append(setv)             
    
    #print(sets)
    print("", len(sets)-1)
    # 3
            
if __name__ == "__main__":
    # execute only if run as a script
    main() 
  