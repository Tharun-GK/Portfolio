export type ResearchStatus = "draft" | "in-progress" | "submitted" | "presented" | "published";

export interface ResearchItem {
  id: string;
  title: string;
  description: string;
  role: string;
  conference?: string;
  venue?: string;
  date: string;
  status: ResearchStatus;
  topics: string[];
  documentHref?: string;
  relatedProjectSlug?: string;
}
