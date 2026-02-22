import { AlgorithmRun, ExecutionStep } from "../../types/execution";

function toText(values: number[]): string {
  return values.map((v) => String.fromCharCode(65 + (Math.abs(v) % 26))).join("");
}

function choosePattern(text: string): string {
  if (text.length < 3) return text;
  const start = Math.min(1, text.length - 3);
  return text.slice(start, start + 3);
}

export function buildKmpRun(input: number[]): AlgorithmRun {
  const text = toText(input);
  const pattern = choosePattern(text);
  const steps: ExecutionStep[] = [];

  const lps = new Array(pattern.length).fill(0);
  let len = 0;
  let i = 1;

  steps.push({
    index: 0,
    array: text.split("").map((_, idx) => idx),
    labels: text.split(""),
    mode: "cells",
    sorted: [],
    line: 1,
    explanation: `Text: ${text}, pattern: ${pattern}.`
  });

  while (i < pattern.length) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else if (len !== 0) {
      len = lps[len - 1];
    } else {
      lps[i] = 0;
      i++;
    }
  }

  let ti = 0;
  let pj = 0;
  const matched = new Set<number>();

  while (ti < text.length) {
    steps.push({
      index: steps.length,
      array: text.split("").map((_, idx) => idx),
      labels: text.split(""),
      mode: "cells",
      comparing: [ti, ti],
      sorted: [...matched],
      line: 5,
      explanation: `Comparing text[${ti}] = ${text[ti]} with pattern[${pj}] = ${pattern[pj]}.`
    });

    if (text[ti] === pattern[pj]) {
      matched.add(ti);
      ti++;
      pj++;

      if (pj === pattern.length) {
        steps.push({
          index: steps.length,
          array: text.split("").map((_, idx) => idx),
          labels: text.split(""),
          mode: "cells",
          sorted: [...matched],
          line: 8,
          explanation: `Pattern found at index ${ti - pj}.`
        });
        pj = lps[pj - 1];
      }
    } else if (pj !== 0) {
      pj = lps[pj - 1];
    } else {
      ti++;
    }
  }

  steps.push({
    index: steps.length,
    array: text.split("").map((_, idx) => idx),
    labels: text.split(""),
    mode: "cells",
    sorted: [...matched],
    line: 9,
    explanation: "KMP search finished."
  });

  return {
    algorithmId: "kmp-search",
    algorithmName: "KMP Search",
    complexity: {
      best: "O(n)",
      average: "O(n + m)",
      worst: "O(n + m)",
      space: "O(m)"
    },
    pseudocode: [
      "buildLPS(pattern)",
      "i = 0, j = 0",
      "while i < text.length",
      "  if text[i] == pattern[j], i++, j++",
      "  if j == pattern.length => match",
      "  else if mismatch and j > 0 => j = lps[j-1]",
      "  else if mismatch => i++",
      "continue until end"
    ],
    steps
  };
}
