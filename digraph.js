export class Digraph {
  constructor() {
    this.adjacencyList = new Map(); 
    this.numberOfEdges = 0;
  }

  addNode(name) {
    if (!this.adjacencyList.has(name)) {
      this.adjacencyList.set(name, []);
    }
  }

  getAllNodes() {
    return Array.from(this.adjacencyList.keys());
  }

  addExpense(from, weight) {
    const numberOfNodes = this.getNumberOfNodes();
    if (numberOfNodes <= 1) {
      return;
    }

    const share = weight / (numberOfNodes); 

    for (const node of this.getAllNodes()) {
      if (node === from) continue;
      this.addEdge(node, from, share);
    }
}

  addEdge(from, to, weight = 1) {
    this.addNode(from);
    this.addNode(to);
    this.adjacencyList.get(from).push({ to, weight });
    this.numberOfEdges++;
  }

  adjacentNodes(node) {
    return this.adjacencyList.get(node) || [];
  }

  getNumberOfNodes() {
    return this.adjacencyList.size;
  }

  getNumberOfEdges() {
    return this.numberOfEdges;
  }

  printNodes() {
    for (const [node, edges] of this.adjacencyList) {
      const connections = edges.map(e => `(${e.to}, weight=${e.weight})`).join(', ');
      console.log(`${node} -> ${connections}`);
    }
  }
  

  getNodeBalances() {
    const balance = new Map();
  
    for (const node of this.adjacencyList.keys()) {
      balance.set(node, 0);
    }
  
    for (const [from, edges] of this.adjacencyList) {
      for (const { to, weight } of edges) {
        balance.set(from, balance.get(from) - weight);
        balance.set(to, balance.get(to) + weight);
      }
    }
  
    return balance;
  }  

  getTransaction() {
    const balances = this.getNodeBalances();
    const result = [];
  
    const creditors = [];
    const debtors = [];
  
    for (const [node, amount] of balances) {
      if (amount > 0) creditors.push({ node, amount });
      else if (amount < 0) debtors.push({ node, amount: -amount });
    }
  
    let i = 0, j = 0;
  
    while (i < creditors.length && j < debtors.length) {
      const give = Math.min(creditors[i].amount, debtors[j].amount);
      result.push(`${debtors[j].node} pays ${give} to ${creditors[i].node}`);
      creditors[i].amount -= give;
      debtors[j].amount -= give;
      if (creditors[i].amount === 0) i++;
      if (debtors[j].amount === 0) j++;
    }
    return result;
  }
  
}
