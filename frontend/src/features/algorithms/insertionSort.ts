import { AlgorithmRun, ExecutionStep } from "../../types/execution";

function clone(values: number[]): number[] {
  return [...values];
}

export function buildInsertionSortRun(input: number[]): AlgorithmRun {
  const arr = clone(input);
  const steps: ExecutionStep[] = [];
  const sorted = new Set<number>([0]);

  steps.push({
    index: 0,
    array: clone(arr),
    sorted: [0],
    line: 0,
    explanation: "Initial array state. First element is trivially sorted."
  });

  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];

    steps.push({
      index: steps.length,
      array: clone(arr),
      comparing: [i, i],
      sorted: [...sorted],
      line: 1,
      explanation: `Picking key = ${key} at position ${i}.`
    });

    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      steps.push({
        index: steps.length,
        array: clone(arr),
        comparing: [j, j + 1],
        sorted: [...sorted],
        line: 3,
        explanation: `${arr[j]} > ${key}: shifting ${arr[j]} one position right.`
      });

      arr[j + 1] = arr[j];

      steps.push({
        index: steps.length,
        array: clone(arr),
        swapping: [j, j + 1],
        sorted: [...sorted],
        line: 4,
        explanation: `Shifted ${arr[j + 1]} to position ${j + 1}.`
      });

      j--;
    }

    arr[j + 1] = key;
    sorted.add(i);

    steps.push({
      index: steps.length,
      array: clone(arr),
      sorted: [...sorted],
      line: 5,
      explanation: `Inserted ${key} at position ${j + 1}. Sorted portion: 0–${i}.`
    });
  }

  steps.push({
    index: steps.length,
    array: clone(arr),
    sorted: arr.map((_, idx) => idx),
    line: 6,
    explanation: "Sorting complete: the array is fully ordered."
  });

  return {
    algorithmId: "insertion-sort",
    algorithmName: "Insertion Sort",
    complexity: {
      best: "O(n)",
      average: "O(n^2)",
      worst: "O(n^2)",
      space: "O(1)"
    },
    pseudocode: [
      "for i from 1 to n-1",             // 0
      "  key = arr[i]",                  // 1
      "  j = i - 1",                     // 2
      "  while j >= 0 and arr[j] > key", // 3
      "    arr[j+1] = arr[j], j--",      // 4
      "  arr[j+1] = key",                // 5
      "end"                              // 6
    ],
    steps
  };
}
