export interface Skill {
  id: string;
  name: string;
  group: "language" | "framework" | "domain" | "platform" | "tool";
  level?: "working" | "applied" | "deep";
}

export interface Profile {
  name: string;
  shortName: string;
  role: string;
  positioning: string;
  summary: string;
  location?: string;
  email?: string;
  githubUsername?: string;
  skills: Skill[];
  socials: {
    github?: string;
    linkedin?: string;
    website?: string;
  };
}
