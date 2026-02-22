import { AlgorithmRun } from "../../types/execution";
import { buildBubbleSortRun } from "./bubbleSort";
import { buildMergeSortRun } from "./mergeSort";
import { buildQuickSortRun } from "./quickSort";
import { buildKmpRun } from "./kmpSearch";
import { buildBfsRun } from "./bfsTraversal";
import { buildDfsRun } from "./dfsTraversal";

export function buildRunForAlgorithm(algorithmId: string, input: number[]): AlgorithmRun {
  switch (algorithmId) {
    case "merge-sort":
      return buildMergeSortRun(input);
    case "quick-sort":
      return buildQuickSortRun(input);
    case "kmp-search":
      return buildKmpRun(input);
    case "bfs-traversal":
      return buildBfsRun(input);
    case "dfs-traversal":
      return buildDfsRun(input);
    case "bubble-sort":
    default:
      return buildBubbleSortRun(input);
  }
}
