import { AlgorithmDescriptor, Scenario } from "../types/catalog";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) {
    throw new Error(`API ${path} failed with status ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export function fetchAlgorithms(): Promise<AlgorithmDescriptor[]> {
  return apiGet<AlgorithmDescriptor[]>("/api/algorithms");
}

export function fetchScenarios(algorithmId: string): Promise<Scenario[]> {
  return apiGet<Scenario[]>(`/api/algorithms/${algorithmId}/scenarios`);
}
