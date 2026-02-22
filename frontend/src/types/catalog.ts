export interface AlgorithmDescriptor {
  id: string;
  name: string;
  category: string;
  description: string;
  bestCase: string;
  averageCase: string;
  worstCase: string;
  spaceComplexity: string;
}

export interface Scenario {
  id: string;
  algorithmId: string;
  label: string;
  values: number[];
}
