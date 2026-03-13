export interface ExecutionStep {
  index: number;
  array: number[];
  /** "bars" = bar chart (sorting), "cells" = flat grid, "tree" = D3 tree (BFS/DFS) */
  mode?: "bars" | "cells" | "tree";
  labels?: string[];
  comparing?: [number, number];
  swapping?: [number, number];
  sorted: number[];
  /** Zero-based index into AlgorithmRun.pseudocode[] */
  line: number;
  explanation: string;
}

export interface AlgorithmRun {
  algorithmId: string;
  algorithmName: string;
  complexity: {
    best: string;
    average: string;
    worst: string;
    space: string;
  };
  pseudocode: string[];
  steps: ExecutionStep[];
}
