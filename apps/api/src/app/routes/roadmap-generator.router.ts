import { Request, Response } from 'express';
import { generateRoadmap } from '../services/roadmap-generator.services';

interface Resource {
  label: string;
  url: string;
}

interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  estimatedHours: number;
  resources: Resource[];
}

interface LearningRoadmap {
  goal: string;
  targetRole: string;
  difficulty: string;
  totalEstimatedWeeks: number;
  steps: RoadmapStep[];
}

interface RoadmapRequest {
  goal: string;
  currentSkill: string;
  hoursPerWeek: number;
  [key: string]: unknown;
}

interface RoadmapResponse {
  roadmap: LearningRoadmap;
}

interface ErrorResponse {
  message: string;
}

async function generateRoadmapHandler(
  req: Request<unknown, unknown, RoadmapRequest>,
  res: Response<RoadmapResponse | ErrorResponse>
) {
  try {
    const roadmap = await generateRoadmap(req.body);
    return res.status(200).json({ roadmap });
  } catch (error) {
    console.error('Error generating roadmap:', error);
    return res.status(500).json({ message: 'Failed to generate roadmap' });
  }
}

export { generateRoadmapHandler };