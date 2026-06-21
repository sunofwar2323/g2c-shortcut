export interface Service {
  id: number;
  name: string;
  category: string;
  agency: string;
  url: string;
  description: string;
  topRank: number | null;
  estimatedTime?: string;
  icon?: string;
}

export interface CategoryInfo {
  id: string;
  name: string;
  description: string;
  categoryKey: string;
}

export interface ScenarioPrompt {
  id: string;
  label: string;
  query: string;
  serviceIds: number[];
}

export interface SearchSuggestion {
  query: string;
  serviceIds: number[];
}
