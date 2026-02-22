import { AlgorithmRun, ExecutionStep } from "../../types/execution";

function clone(values: number[]): number[] {
  return [...values];
}

export function buildMergeSortRun(input: number[]): AlgorithmRun {
  const arr = clone(input);
  const steps: ExecutionStep[] = [];

  function pushStep(line: number, explanation: string, comparing?: [number, number], swapping?: [number, number]) {
    steps.push({
      index: steps.length,
      array: clone(arr),
      sorted: [],
      line,
      explanation,
      comparing,
      swapping
    });
  }

  function merge(left: number, mid: number, right: number) {
    const leftPart = arr.slice(left, mid + 1);
    const rightPart = arr.slice(mid + 1, right + 1);

    let i = 0;
    let j = 0;
    let k = left;

    pushStep(4, `Merging segments [${left}, ${mid}] and [${mid + 1}, ${right}].`);

    while (i < leftPart.length && j < rightPart.length) {
      pushStep(5, `Comparing ${leftPart[i]} and ${rightPart[j]}.`, [left + i, mid + 1 + j]);
      if (leftPart[i] <= rightPart[j]) {
        arr[k] = leftPart[i];
        pushStep(6, `Writing ${leftPart[i]} at position ${k}.`, undefined, [k, k]);
        i++;
      } else {
        arr[k] = rightPart[j];
        pushStep(7, `Writing ${rightPart[j]} at position ${k}.`, undefined, [k, k]);
        j++;
      }
      k++;
    }

    while (i < leftPart.length) {
      arr[k] = leftPart[i];
      pushStep(8, `Copying remaining left value ${leftPart[i]} to position ${k}.`, undefined, [k, k]);
      i++;
      k++;
    }

    while (j < rightPart.length) {
      arr[k] = rightPart[j];
      pushStep(9, `Copying remaining right value ${rightPart[j]} to position ${k}.`, undefined, [k, k]);
      j++;
      k++;
    }
  }

  function mergeSort(left: number, right: number) {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);
    pushStep(2, `Splitting into [${left}, ${mid}] and [${mid + 1}, ${right}].`);
    mergeSort(left, mid);
    mergeSort(mid + 1, right);
    merge(left, mid, right);
  }

  pushStep(1, "Initial array state.");
  mergeSort(0, arr.length - 1);
  steps.push({
    index: steps.length,
    array: clone(arr),
    sorted: arr.map((_, idx) => idx),
    line: 10,
    explanation: "Sorting complete: the array is fully ordered."
  });

  return {
    algorithmId: "merge-sort",
    algorithmName: "Merge Sort",
    complexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
      space: "O(n)"
    },
    pseudocode: [
      "mergeSort(left, right)",
      "if left < right",
      "  mid = floor((left+right)/2)",
      "  mergeSort(left, mid)",
      "  mergeSort(mid+1, right)",
      "  merge(left, mid, right)",
      "compare left[i] and right[j]",
      "write smallest into arr[k]",
      "copy remaining values",
      "end"
    ],
    steps
  };
}
