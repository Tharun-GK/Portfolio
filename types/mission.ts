export type MissionStatus = "planned" | "in-progress" | "blocked" | "complete";

export interface Mission {
  id: string;
  title: string;
  summary: string;
  status: MissionStatus;
  progress: number;
  relatedProjectSlug?: string;
  relatedResearchId?: string;
  focus: string;
}
