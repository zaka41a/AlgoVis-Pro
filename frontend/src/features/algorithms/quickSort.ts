import { AlgorithmRun, ExecutionStep } from "../../types/execution";

function clone(values: number[]): number[] {
  return [...values];
}

export function buildQuickSortRun(input: number[]): AlgorithmRun {
  const arr = clone(input);
  const steps: ExecutionStep[] = [];
  const sorted = new Set<number>();

  function pushStep(line: number, explanation: string, comparing?: [number, number], swapping?: [number, number]) {
    steps.push({
      index: steps.length,
      array: clone(arr),
      sorted: [...sorted],
      line,
      explanation,
      comparing,
      swapping
    });
  }

  function swap(i: number, j: number) {
    const t = arr[i];
    arr[i] = arr[j];
    arr[j] = t;
    pushStep(6, `Swapping positions ${i} and ${j}.`, undefined, [i, j]);
  }

  function partition(low: number, high: number): number {
    const pivot = arr[high];
    let i = low - 1;

    pushStep(3, `Chosen pivot: ${pivot} (index ${high}).`);

    for (let j = low; j < high; j++) {
      pushStep(4, `Comparing ${arr[j]} with pivot ${pivot}.`, [j, high]);
      if (arr[j] <= pivot) {
        i++;
        if (i !== j) swap(i, j);
      }
    }

    swap(i + 1, high);
    return i + 1;
  }

  function quickSort(low: number, high: number) {
    if (low < high) {
      const pi = partition(low, high);
      sorted.add(pi);
      pushStep(7, `Pivot placed at final position ${pi}.`);
      quickSort(low, pi - 1);
      quickSort(pi + 1, high);
    } else if (low === high) {
      sorted.add(low);
      pushStep(2, `Single element at position ${low}, already sorted.`);
    }
  }

  pushStep(1, "Initial array state.");
  quickSort(0, arr.length - 1);
  for (let idx = 0; idx < arr.length; idx++) sorted.add(idx);
  steps.push({
    index: steps.length,
    array: clone(arr),
    sorted: [...sorted],
    line: 8,
    explanation: "Sorting complete: the array is fully ordered."
  });

  return {
    algorithmId: "quick-sort",
    algorithmName: "Quick Sort",
    complexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n^2)",
      space: "O(log n)"
    },
    pseudocode: [
      "quickSort(low, high)",
      "if low < high",
      "  pivot = arr[high]",
      "  partition around pivot",
      "  place pivot at correct index",
      "  quickSort(low, pivotIndex-1)",
      "  quickSort(pivotIndex+1, high)",
      "end"
    ],
    steps
  };
}
