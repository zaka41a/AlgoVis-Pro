import { AlgorithmRun, ExecutionStep } from "../../types/execution";

function cloneArray(arr: number[]): number[] {
  return [...arr];
}

export function buildBubbleSortRun(input: number[]): AlgorithmRun {
  const arr = cloneArray(input);
  const steps: ExecutionStep[] = [];
  const sorted = new Set<number>();

  steps.push({
    index: 0,
    array: cloneArray(arr),
    sorted: [],
    line: 1,
    explanation: "Initial array state."
  });

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      steps.push({
        index: steps.length,
        array: cloneArray(arr),
        comparing: [j, j + 1],
        sorted: [...sorted],
        line: 3,
        explanation: `Comparing elements at positions ${j} and ${j + 1}.`
      });

      if (arr[j] > arr[j + 1]) {
        const left = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = left;
        steps.push({
          index: steps.length,
          array: cloneArray(arr),
          swapping: [j, j + 1],
          sorted: [...sorted],
          line: 4,
          explanation: `Swap executed: ${arr[j]} moves before ${arr[j + 1]}.`
        });
      }
    }

    sorted.add(arr.length - 1 - i);
    steps.push({
      index: steps.length,
      array: cloneArray(arr),
      sorted: [...sorted],
      line: 6,
      explanation: `Element at position ${arr.length - 1 - i} is now fixed.`
    });
  }

  sorted.add(0);
  steps.push({
    index: steps.length,
    array: cloneArray(arr),
    sorted: [...sorted],
    line: 7,
    explanation: "Sorting complete: the array is fully ordered."
  });

  return {
    algorithmId: "bubble-sort",
    algorithmName: "Bubble Sort",
    complexity: {
      best: "O(n)",
      average: "O(n^2)",
      worst: "O(n^2)",
      space: "O(1)"
    },
    pseudocode: [
      "for i from 0 to n-2",
      "  for j from 0 to n-i-2",
      "    if arr[j] > arr[j+1]",
      "      swap(arr[j], arr[j+1])",
      "  mark arr[n-i-1] as sorted",
      "end"
    ],
    steps
  };
}
