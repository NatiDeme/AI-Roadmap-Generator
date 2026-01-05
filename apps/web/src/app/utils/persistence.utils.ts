
export interface Resource {
  label: string;
  url: string;
}

export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  estimatedHours: number;
  resources: Resource[];
}

export interface Roadmap {
  goal: string;
  targetRole: string;
  difficulty: string;
  totalEstimatedWeeks: number;
  steps: RoadmapStep[];
}

const LATEST_ROADMAP_STORAGE_KEY = 'latest-roadmap';

function parseJson<T>(value: string): T | null {
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function saveLatestRoadmap(roadmap: Roadmap): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(LATEST_ROADMAP_STORAGE_KEY, JSON.stringify(roadmap));
}

function loadLatestRoadmap(): Roadmap | null {
  if (!isBrowser()) return null;
  const raw = window.localStorage.getItem(LATEST_ROADMAP_STORAGE_KEY);
  if (!raw) return null;
  return parseJson<Roadmap>(raw);
}

function clearLatestRoadmap(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(LATEST_ROADMAP_STORAGE_KEY);
}

function saveRoadmapToLocalStorage(roadmap: Roadmap): void {
  saveLatestRoadmap(roadmap);
}

function getRoadmapFromLocalStorage(): Roadmap | null {
  return loadLatestRoadmap();
}

export {
  saveLatestRoadmap,
  loadLatestRoadmap,
  clearLatestRoadmap,
  saveRoadmapToLocalStorage,
  getRoadmapFromLocalStorage,
};