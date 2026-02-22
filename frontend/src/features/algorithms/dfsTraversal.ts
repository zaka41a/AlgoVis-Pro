import { AlgorithmRun, ExecutionStep } from "../../types/execution";

export function buildDfsRun(input: number[]): AlgorithmRun {
  const nodeCount = Math.min(Math.max(input.length, 6), 10);
  const nodes = Array.from({ length: nodeCount }, (_, i) => i);
  const labels = nodes.map((i) => `N${i}`);

  const graph = new Map<number, number[]>();
  for (let i = 0; i < nodeCount; i++) {
    const children: number[] = [];
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if (left < nodeCount) children.push(left);
    if (right < nodeCount) children.push(right);
    graph.set(i, children);
  }

  const visited = new Set<number>();
  const steps: ExecutionStep[] = [];

  function dfs(node: number) {
    visited.add(node);
    steps.push({
      index: steps.length,
      array: nodes,
      labels,
      mode: "cells",
      comparing: [node, node],
      sorted: [...visited],
      line: 3,
      explanation: `Visiting N${node} in depth-first order.`
    });

    for (const neighbor of graph.get(node) ?? []) {
      if (!visited.has(neighbor)) {
        steps.push({
          index: steps.length,
          array: nodes,
          labels,
          mode: "cells",
          comparing: [neighbor, neighbor],
          sorted: [...visited],
          line: 4,
          explanation: `Recursing into N${neighbor}.`
        });
        dfs(neighbor);
      }
    }
  }

  steps.push({
    index: 0,
    array: nodes,
    labels,
    mode: "cells",
    sorted: [],
    line: 1,
    explanation: "Initialize DFS from N0."
  });

  dfs(0);

  steps.push({
    index: steps.length,
    array: nodes,
    labels,
    mode: "cells",
    sorted: [...visited],
    line: 5,
    explanation: "DFS traversal finished."
  });

  return {
    algorithmId: "dfs-traversal",
    algorithmName: "DFS Traversal",
    complexity: {
      best: "O(V + E)",
      average: "O(V + E)",
      worst: "O(V + E)",
      space: "O(V)"
    },
    pseudocode: [
      "dfs(node)",
      "mark node visited",
      "for each neighbor",
      "  if unvisited => dfs(neighbor)",
      "return"
    ],
    steps
  };
}
