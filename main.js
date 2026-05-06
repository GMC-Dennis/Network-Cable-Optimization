class DisjointSet {
  constructor(n) {
    this.parent = Array(n).fill(0).map((_, i) => i);
    this.rank = Array(n).fill(0);
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); 
    }
    return this.parent[x];
  }

  union(a, b) {
    let rootA = this.find(a);
    let rootB = this.find(b);

    if (rootA === rootB) return false;

    if (this.rank[rootA] < this.rank[rootB]) {
      this.parent[rootA] = rootB;
    } else if (this.rank[rootA] > this.rank[rootB]) {
      this.parent[rootB] = rootA;
    } else {
      this.parent[rootB] = rootA;
      this.rank[rootA]++;
    }

    return true;
  }
}


function kruskalMST(vertices, edges) {
  edges.sort((a, b) => a.w - b.w);

  const ds = new DisjointSet(vertices);
  const mst = [];
  let totalCost = 0;

  for (let edge of edges) {
    if (ds.union(edge.u, edge.v)) {
      mst.push(edge);
      totalCost += edge.w;
    }
  }

  return { mst, totalCost };
}

function addEdge(edges, u, v, w) {
  edges.push({ u, v, w });
}


// EXAMPLE USAGE (OFFICE NETWORK)

const V = 6;

const edges = [];

addEdge(edges, 0, 1, 4);
addEdge(edges, 0, 2, 4);
addEdge(edges, 1, 2, 2);
addEdge(edges, 1, 3, 5);
addEdge(edges, 2, 3, 8);
addEdge(edges, 2, 4, 10);
addEdge(edges, 3, 4, 2);
addEdge(edges, 3, 5, 6);
addEdge(edges, 4, 5, 3);


const result = kruskalMST(V, edges);


console.log("Selected Connections (MST):");
result.mst.forEach(e => {
  console.log(`Computer ${e.u} ↔ ${e.v} | Cost: ${e.w}`);
});

console.log("\nTotal Cost:", result.totalCost);