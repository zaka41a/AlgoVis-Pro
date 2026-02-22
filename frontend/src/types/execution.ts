export interface ExecutionStep {
  index: number;
  array: number[];
  mode?: "bars" | "cells";
  labels?: string[];
  comparing?: [number, number];
  swapping?: [number, number];
  sorted: number[];
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
