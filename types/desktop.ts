import type { ProjectStatus } from "@/types/project";

export interface DesktopProjectCard {
  slug: string;
  title: string;
  shortDescription: string;
  status: ProjectStatus;
}

export interface DesktopPayload {
  name: string;
  role: string;
  positioning: string;
  summary: string;
  projects: DesktopProjectCard[];
}
