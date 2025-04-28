import { Digraph } from './digraph.js';

const graph = new Digraph();
graph.addNode("A");
graph.addNode("B");
graph.addNode("C");

graph.addExpense("A", 15);
graph.addExpense("B", 6);
graph.addEdge("A", "B", 0.5);

graph.printNodes();

console.log("getNodeBalances:", graph.getNodeBalances());
console.log("Transactions:", graph.getTransaction());
