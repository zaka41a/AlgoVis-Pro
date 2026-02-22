import { useEffect, useMemo, useState } from "react";
import { PageContainer } from "../components/layout/PageContainer";
import { SectionTitle } from "../components/layout/SectionTitle";
import { StepPlayer } from "../components/player/StepPlayer";
import { buildRunForAlgorithm } from "../features/algorithms";
import { fetchAlgorithms, fetchScenarios } from "../services/catalogApi";
import { AlgorithmDescriptor, Scenario } from "../types/catalog";

const fallbackAlgorithms: AlgorithmDescriptor[] = [
  {
    id: "bubble-sort",
    name: "Bubble Sort",
    category: "sorting",
    description: "Simple adjacent-swap sorting algorithm.",
    bestCase: "O(n)",
    averageCase: "O(n^2)",
    worstCase: "O(n^2)",
    spaceComplexity: "O(1)"
  },
  {
    id: "merge-sort",
    name: "Merge Sort",
    category: "sorting",
    description: "Divide-and-conquer sorting by merging sorted halves.",
    bestCase: "O(n log n)",
    averageCase: "O(n log n)",
    worstCase: "O(n log n)",
    spaceComplexity: "O(n)"
  },
  {
    id: "quick-sort",
    name: "Quick Sort",
    category: "sorting",
    description: "Divide-and-conquer sorting based on pivot partitioning.",
    bestCase: "O(n log n)",
    averageCase: "O(n log n)",
    worstCase: "O(n^2)",
    spaceComplexity: "O(log n)"
  },
  {
    id: "kmp-search",
    name: "KMP Search",
    category: "text-search",
    description: "Linear-time pattern search using the LPS table.",
    bestCase: "O(n)",
    averageCase: "O(n + m)",
    worstCase: "O(n + m)",
    spaceComplexity: "O(m)"
  },
  {
    id: "bfs-traversal",
    name: "BFS Traversal",
    category: "graph",
    description: "Breadth-first graph traversal.",
    bestCase: "O(V + E)",
    averageCase: "O(V + E)",
    worstCase: "O(V + E)",
    spaceComplexity: "O(V)"
  },
  {
    id: "dfs-traversal",
    name: "DFS Traversal",
    category: "graph",
    description: "Depth-first graph traversal.",
    bestCase: "O(V + E)",
    averageCase: "O(V + E)",
    worstCase: "O(V + E)",
    spaceComplexity: "O(V)"
  }
];

const fallbackScenarios: Record<string, Scenario[]> = {
  "bubble-sort": [
    { id: "bub-f-1", algorithmId: "bubble-sort", label: "Random Small", values: [9, 3, 7, 1, 6, 2, 8, 4] }
  ],
  "merge-sort": [
    { id: "mer-f-1", algorithmId: "merge-sort", label: "Random Medium", values: [10, 1, 8, 4, 7, 3, 9, 2, 6, 5] }
  ],
  "quick-sort": [
    { id: "qui-f-1", algorithmId: "quick-sort", label: "Random Small", values: [6, 2, 9, 1, 5, 8, 3, 7] }
  ],
  "kmp-search": [
    { id: "kmp-f-1", algorithmId: "kmp-search", label: "Pattern Present", values: [0, 1, 2, 1, 2, 3, 1, 2, 3, 4] }
  ],
  "bfs-traversal": [
    { id: "bfs-f-1", algorithmId: "bfs-traversal", label: "Tree 7 Nodes", values: [1, 2, 3, 4, 5, 6, 7] }
  ],
  "dfs-traversal": [
    { id: "dfs-f-1", algorithmId: "dfs-traversal", label: "Tree 7 Nodes", values: [1, 2, 3, 4, 5, 6, 7] }
  ]
};

export function App() {
  const [algorithms, setAlgorithms] = useState<AlgorithmDescriptor[]>(fallbackAlgorithms);
  const [selectedAlgorithmId, setSelectedAlgorithmId] = useState("bubble-sort");
  const [scenarios, setScenarios] = useState<Scenario[]>(fallbackScenarios["bubble-sort"]);
  const [selectedScenarioId, setSelectedScenarioId] = useState(fallbackScenarios["bubble-sort"][0].id);

  useEffect(() => {
    let alive = true;
    fetchAlgorithms()
      .then((data) => {
        if (!alive || data.length === 0) return;
        setAlgorithms(data);
        setSelectedAlgorithmId(data[0].id);
      })
      .catch(() => undefined);

    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    let alive = true;
    fetchScenarios(selectedAlgorithmId)
      .then((data) => {
        if (!alive) return;
        if (data.length > 0) {
          setScenarios(data);
          setSelectedScenarioId(data[0].id);
          return;
        }
        const fallback = fallbackScenarios[selectedAlgorithmId] ?? [];
        setScenarios(fallback);
        setSelectedScenarioId(fallback[0]?.id ?? "");
      })
      .catch(() => {
        const fallback = fallbackScenarios[selectedAlgorithmId] ?? [];
        setScenarios(fallback);
        setSelectedScenarioId(fallback[0]?.id ?? "");
      });

    return () => {
      alive = false;
    };
  }, [selectedAlgorithmId]);

  const selectedAlgorithm = useMemo(
    () => algorithms.find((item) => item.id === selectedAlgorithmId) ?? algorithms[0],
    [algorithms, selectedAlgorithmId]
  );

  const selectedScenario = useMemo(
    () => scenarios.find((item) => item.id === selectedScenarioId) ?? scenarios[0],
    [scenarios, selectedScenarioId]
  );

  const run = useMemo(() => {
    const values = selectedScenario?.values ?? [9, 3, 7, 1, 6, 2, 8, 4];
    return buildRunForAlgorithm(selectedAlgorithm?.id ?? "bubble-sort", values);
  }, [selectedAlgorithm, selectedScenario]);

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text-main)]">
      <PageContainer>
        <header className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold tracking-tight">AlgoVis Pro</p>
            <p className="text-xs text-[var(--text-muted)]">Interactive Algorithm Studio</p>
          </div>
        </header>

        <section className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="glass-panel rounded-2xl p-6 sm:p-8">
            <p className="eyebrow">Algorithm Playground</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Learn Algorithms Step by Step</h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--text-soft)] sm:text-base">
              A clean and interactive playground for sorting, text search, and graph traversal with clear visual states,
              synchronized pseudocode, and practical complexity insights.
            </p>
          </div>

          <aside className="glass-panel rounded-2xl p-6">
            <p className="eyebrow">Quick Snapshot</p>
            <div className="mt-4 space-y-3">
              <div className="quick-line">
                <span>Algorithms</span>
                <strong>{algorithms.length}</strong>
              </div>
              <div className="quick-line">
                <span>Selected</span>
                <strong>{selectedAlgorithm?.name}</strong>
              </div>
              <div className="quick-line">
                <span>Scenario</span>
                <strong>{selectedScenario?.label}</strong>
              </div>
              <div className="quick-line">
                <span>Worst Case</span>
                <strong>{selectedAlgorithm?.worstCase}</strong>
              </div>
            </div>
          </aside>
        </section>

        <section id="demo-lab" className="mt-8">
          <SectionTitle eyebrow="Live Demo" title={run.algorithmName} />
          <div className="mt-4 grid gap-3 rounded-2xl border border-[var(--line)] bg-white p-4 md:grid-cols-2">
            <label className="text-sm text-[var(--text-soft)]" htmlFor="algorithm-select">
              Algorithm
              <select
                id="algorithm-select"
                className="select-field"
                value={selectedAlgorithmId}
                onChange={(e) => setSelectedAlgorithmId(e.target.value)}
              >
                {algorithms.map((algorithm) => (
                  <option key={algorithm.id} value={algorithm.id}>
                    {algorithm.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm text-[var(--text-soft)]" htmlFor="scenario-select">
              Scenario
              <select
                id="scenario-select"
                className="select-field"
                value={selectedScenarioId}
                onChange={(e) => setSelectedScenarioId(e.target.value)}
              >
                {scenarios.map((scenario) => (
                  <option key={scenario.id} value={scenario.id}>
                    {scenario.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-3 rounded-xl border border-[var(--line)] bg-white p-3 text-xs text-[var(--text-soft)]">
            {selectedAlgorithm?.description} | Best {selectedAlgorithm?.bestCase} | Avg {selectedAlgorithm?.averageCase} |
            Worst {selectedAlgorithm?.worstCase}
          </div>

          <StepPlayer key={`${selectedAlgorithmId}-${selectedScenarioId}`} run={run} />
        </section>
      </PageContainer>
    </main>
  );
}
