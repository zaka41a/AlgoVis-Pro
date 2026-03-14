import { describe, expect, it } from "vitest";
import { buildBubbleSortRun } from "../bubbleSort";
import { buildInsertionSortRun } from "../insertionSort";
import { buildMergeSortRun } from "../mergeSort";
import { buildQuickSortRun } from "../quickSort";
import { buildKmpRun } from "../kmpSearch";
import { buildBfsRun } from "../bfsTraversal";
import { buildDfsRun } from "../dfsTraversal";

function sorted(values: number[]): number[] {
  return [...values].sort((a, b) => a - b);
}

function last<T>(items: T[]): T | undefined {
  return items[items.length - 1];
}

describe("sorting algorithms", () => {
  const input = [9, 3, 7, 1, 6, 2, 8, 4];

  it("bubble sort finishes with sorted array", () => {
    const run = buildBubbleSortRun(input);
    expect(run.algorithmId).toBe("bubble-sort");
    expect(run.steps.length).toBeGreaterThan(1);
    expect(last(run.steps)?.array).toEqual(sorted(input));
  });

  it("insertion sort finishes with sorted array", () => {
    const run = buildInsertionSortRun(input);
    expect(run.algorithmId).toBe("insertion-sort");
    expect(run.steps.length).toBeGreaterThan(1);
    expect(last(run.steps)?.array).toEqual(sorted(input));
  });

  it("insertion sort step lines are valid pseudocode indices", () => {
    const run = buildInsertionSortRun(input);
    for (const step of run.steps) {
      expect(step.line).toBeGreaterThanOrEqual(0);
      expect(step.line).toBeLessThan(run.pseudocode.length);
    }
  });

  it("merge sort finishes with sorted array", () => {
    const run = buildMergeSortRun(input);
    expect(run.algorithmId).toBe("merge-sort");
    expect(run.steps.length).toBeGreaterThan(1);
    expect(last(run.steps)?.array).toEqual(sorted(input));
  });

  it("quick sort finishes with sorted array", () => {
    const run = buildQuickSortRun(input);
    expect(run.algorithmId).toBe("quick-sort");
    expect(run.steps.length).toBeGreaterThan(1);
    expect(last(run.steps)?.array).toEqual(sorted(input));
  });
});

describe("non-sorting algorithms", () => {
  it("kmp run uses cells mode with labels", () => {
    const run = buildKmpRun([0, 1, 2, 1, 2, 3, 1, 2, 3, 4]);
    expect(run.algorithmId).toBe("kmp-search");
    expect(run.steps.length).toBeGreaterThan(2);
    expect(run.steps[0].mode).toBe("cells");
    expect(run.steps[0].labels?.length).toBe(run.steps[0].array.length);
  });

  it("bfs run visits all nodes and uses tree mode", () => {
    const input = [5, 1, 8, 2, 9, 3, 7, 4, 6, 0];
    const run = buildBfsRun(input);
    const final = last(run.steps);

    expect(run.algorithmId).toBe("bfs-traversal");
    expect(final).toBeDefined();
    expect(final?.sorted.length).toBe(final?.array.length);
    expect(run.steps[0].mode).toBe("tree");
  });

  it("dfs run visits all nodes and uses tree mode", () => {
    const input = [5, 1, 8, 2, 9, 3, 7, 4, 6, 0];
    const run = buildDfsRun(input);
    const final = last(run.steps);

    expect(run.algorithmId).toBe("dfs-traversal");
    expect(final).toBeDefined();
    expect(final?.sorted.length).toBe(final?.array.length);
    expect(run.steps[0].mode).toBe("tree");
  });
});
