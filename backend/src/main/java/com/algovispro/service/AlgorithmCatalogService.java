package com.algovispro.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.algovispro.dto.AlgorithmDescriptorDto;
import com.algovispro.dto.ScenarioDto;

@Service
public class AlgorithmCatalogService {

    public List<AlgorithmDescriptorDto> algorithms() {
        return List.of(
                new AlgorithmDescriptorDto(
                        "bubble-sort",
                        "Bubble Sort",
                        "sorting",
                        "Sorting by repeated adjacent comparisons and swaps.",
                        "O(n)",
                        "O(n^2)",
                        "O(n^2)",
                        "O(1)"),
                new AlgorithmDescriptorDto(
                        "merge-sort",
                        "Merge Sort",
                        "sorting",
                        "Divide-and-conquer sorting based on merging sorted subarrays.",
                        "O(n log n)",
                        "O(n log n)",
                        "O(n log n)",
                        "O(n)"),
                new AlgorithmDescriptorDto(
                        "quick-sort",
                        "Quick Sort",
                        "sorting",
                        "Divide-and-conquer sorting based on pivot partitioning.",
                        "O(n log n)",
                        "O(n log n)",
                        "O(n^2)",
                        "O(log n)"),
                new AlgorithmDescriptorDto(
                        "kmp-search",
                        "KMP Search",
                        "text-search",
                        "Linear-time pattern search using the LPS table.",
                        "O(n)",
                        "O(n + m)",
                        "O(n + m)",
                        "O(m)"),
                new AlgorithmDescriptorDto(
                        "bfs-traversal",
                        "BFS Traversal",
                        "graph",
                        "Breadth-first graph traversal.",
                        "O(V + E)",
                        "O(V + E)",
                        "O(V + E)",
                        "O(V)"),
                new AlgorithmDescriptorDto(
                        "dfs-traversal",
                        "DFS Traversal",
                        "graph",
                        "Depth-first graph traversal.",
                        "O(V + E)",
                        "O(V + E)",
                        "O(V + E)",
                        "O(V)"));
    }

    public List<ScenarioDto> scenariosByAlgorithm(String algorithmId) {
        return switch (algorithmId) {
            case "bubble-sort" -> List.of(
                    new ScenarioDto("bub-1", "bubble-sort", "Random Small", List.of(9, 3, 7, 1, 6, 2, 8, 4)),
                    new ScenarioDto("bub-2", "bubble-sort", "Nearly Sorted", List.of(1, 2, 3, 5, 4, 6, 7, 8)),
                    new ScenarioDto("bub-3", "bubble-sort", "Reverse", List.of(8, 7, 6, 5, 4, 3, 2, 1)));
            case "merge-sort" -> List.of(
                    new ScenarioDto("mer-1", "merge-sort", "Random Medium", List.of(10, 1, 8, 4, 7, 3, 9, 2, 6, 5)),
                    new ScenarioDto("mer-2", "merge-sort", "Duplicates", List.of(4, 2, 4, 1, 3, 2, 5, 1)),
                    new ScenarioDto("mer-3", "merge-sort", "Negative", List.of(3, -1, 7, 0, -5, 2, 4, -2)));
            case "quick-sort" -> List.of(
                    new ScenarioDto("qui-1", "quick-sort", "Random Small", List.of(6, 2, 9, 1, 5, 8, 3, 7)),
                    new ScenarioDto("qui-2", "quick-sort", "Few Unique", List.of(5, 3, 5, 2, 5, 1, 4, 3)),
                    new ScenarioDto("qui-3", "quick-sort", "Sorted", List.of(1, 2, 3, 4, 5, 6, 7, 8)));
            case "kmp-search" -> List.of(
                    new ScenarioDto("kmp-1", "kmp-search", "Pattern Present", List.of(0, 1, 2, 1, 2, 3, 1, 2, 3, 4)),
                    new ScenarioDto("kmp-2", "kmp-search", "Repeating Text", List.of(0, 1, 0, 1, 0, 1, 2, 0, 1)),
                    new ScenarioDto("kmp-3", "kmp-search", "Mixed Letters", List.of(7, 4, 11, 11, 14, 7, 4, 11)));
            case "bfs-traversal" -> List.of(
                    new ScenarioDto("bfs-1", "bfs-traversal", "Tree 7 Nodes", List.of(1, 2, 3, 4, 5, 6, 7)),
                    new ScenarioDto("bfs-2", "bfs-traversal", "Tree 8 Nodes", List.of(2, 9, 1, 4, 7, 3, 8, 5)),
                    new ScenarioDto("bfs-3", "bfs-traversal", "Tree 10 Nodes", List.of(5, 1, 8, 2, 9, 3, 7, 4, 6, 0)));
            case "dfs-traversal" -> List.of(
                    new ScenarioDto("dfs-1", "dfs-traversal", "Tree 7 Nodes", List.of(1, 2, 3, 4, 5, 6, 7)),
                    new ScenarioDto("dfs-2", "dfs-traversal", "Tree 8 Nodes", List.of(9, 8, 7, 6, 5, 4, 3, 2)),
                    new ScenarioDto("dfs-3", "dfs-traversal", "Tree 10 Nodes", List.of(3, 1, 4, 1, 5, 9, 2, 6, 5, 3)));
            default -> List.of();
        };
    }
}
