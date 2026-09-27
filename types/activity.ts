export type ActivityType =
  | "PROJECT"
  | "RESEARCH"
  | "INTERNSHIP"
  | "CERTIFICATION"
  | "HACKATHON"
  | "CONFERENCE"
  | "LEARNING"
  | "STARTUP"
  | "GITHUB"
  | "ACHIEVEMENT";

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  date: string;
  relatedProjectSlug?: string;
  relatedResearchId?: string;
  relatedExperienceId?: string;
  href?: string;
}
