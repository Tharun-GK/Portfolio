export type ExperienceKind =
  | "internship"
  | "project"
  | "hackathon"
  | "exhibition"
  | "conference"
  | "startup"
  | "education";

export interface ExperienceItem {
  id: string;
  organization: string;
  role: string;
  kind: ExperienceKind;
  startDate: string;
  endDate: string | null;
  location?: string;
  description: string;
  skills: string[];
  achievements: string[];
  evidenceHref?: string;
  relatedProjectSlug?: string;
}
