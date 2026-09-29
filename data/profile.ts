import type { Profile } from "@/types/profile";
import { skills } from "@/data/skills";

export const GITHUB_PROFILE_URL = "https://github.com/Tharun-GK";
export const LINKEDIN_PROFILE_URL = "https://www.linkedin.com/in/tharun-g-k/";
export const PUBLIC_EMAIL = "tharungk202@gmail.com";
export const RESUME_HREF = "/resume/Tharun-G-K-Resume.pdf";

export const profile: Profile = {
  name: "Tharun G K",
  shortName: "Tharun",
  role: "Information Science and Technology undergraduate · Presidency University · Graduating 2027",
  positioning:
    "Building software and AI/ML applications across Python, web technologies, APIs, testing, cloud, and research-led systems.",
  summary:
    "Information Science and Technology undergraduate at Presidency University, graduating in 2027. Practical experience in software development, AI/ML application development, Python, web technologies, APIs, testing and debugging, cloud applications, and AI-based applications.",
  email: PUBLIC_EMAIL,
  githubUsername: "Tharun-GK",
  resumeHref: RESUME_HREF,
  skills,
  socials: {
    github: GITHUB_PROFILE_URL,
    linkedin: LINKEDIN_PROFILE_URL,
  },
};
