import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveRoadmapToLocalStorage } from "../utils/persistence.utils";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3333';

const GENERATE_ROADMAP_MUTATION_KEY = ['generate-roadmap'] as const;
const LATEST_ROADMAP_QUERY_KEY = ['latest-roadmap'] as const;

type GenerateRoadmapPayload = {
  goal: string;
  currentSkill: string;
  hoursPerWeek: number;
};

function useGenerateRoadmap() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: GENERATE_ROADMAP_MUTATION_KEY,
    mutationFn: async (data: GenerateRoadmapPayload) => {
      const response = await axios.post(BASE_URL + '/generate-roadmap', data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(LATEST_ROADMAP_QUERY_KEY, data);
      saveRoadmapToLocalStorage(data);
    },
  });
}

export { useGenerateRoadmap };
export type { GenerateRoadmapPayload };
export { GENERATE_ROADMAP_MUTATION_KEY, LATEST_ROADMAP_QUERY_KEY };