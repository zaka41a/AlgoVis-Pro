import { AlgorithmRun, ExecutionStep } from "../../types/execution";

export function buildBfsRun(input: number[]): AlgorithmRun {
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
  const queue: number[] = [0];
  visited.add(0);
  const steps: ExecutionStep[] = [];

  steps.push({
    index: 0,
    array: nodes,
    labels,
    mode: "cells",
    sorted: [0],
    line: 1,
    explanation: "Initialize BFS with root node N0."
  });

  while (queue.length > 0) {
    const current = queue.shift()!;
    steps.push({
      index: steps.length,
      array: nodes,
      labels,
      mode: "cells",
      comparing: [current, current],
      sorted: [...visited],
      line: 3,
      explanation: `Dequeued N${current} from the queue.`
    });

    for (const neighbor of graph.get(current) ?? []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
        steps.push({
          index: steps.length,
          array: nodes,
          labels,
          mode: "cells",
          comparing: [neighbor, neighbor],
          sorted: [...visited],
          line: 5,
          explanation: `Visited N${neighbor}, added to queue.`
        });
      }
    }
  }

  steps.push({
    index: steps.length,
    array: nodes,
    labels,
    mode: "cells",
    sorted: [...visited],
    line: 6,
    explanation: "BFS traversal finished."
  });

  return {
    algorithmId: "bfs-traversal",
    algorithmName: "BFS Traversal",
    complexity: {
      best: "O(V + E)",
      average: "O(V + E)",
      worst: "O(V + E)",
      space: "O(V)"
    },
    pseudocode: [
      "enqueue(start)",
      "mark start visited",
      "while queue not empty",
      "  node = dequeue()",
      "  for each unvisited neighbor",
      "    mark visited and enqueue"
    ],
    steps
  };
}
