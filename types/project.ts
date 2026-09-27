export type ProjectStatus =
  | "planning"
  | "building"
  | "testing"
  | "active"
  | "completed"
  | "archived";

export type ProjectCategory =
  | "ai-ml"
  | "full-stack"
  | "research"
  | "startup"
  | "healthcare"
  | "cybersecurity"
  | "other";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface ProjectTimelineEvent {
  label: string;
  date: string;
  description: string;
}

export interface ProjectLinks {
  github?: string;
  liveDemo?: string;
  document?: string;
}

export interface ProjectImages {
  cover?: string;
  gallery: string[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  category: ProjectCategory;
  categories: ProjectCategory[];
  status: ProjectStatus;
  progress: number;
  technologies: string[];
  problem: string;
  solution: string;
  whyItMatters: string;
  features: ProjectFeature[];
  implementation: string;
  results: string;
  challenges: string;
  futureImprovements: string;
  metrics: ProjectMetric[];
  timeline: ProjectTimelineEvent[];
  links: ProjectLinks;
  images: ProjectImages;
  architectureId: string | null;
  useCaseId: string | null;
  relatedProjectSlugs: string[];
  tags: string[];
  featured: boolean;
  updatedAt: string;
}
