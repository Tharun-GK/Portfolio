export const SITE_NAME = "THARUN OS";
export const SITE_TAGLINE =
  "An interactive environment for the systems I build, the problems I solve, and the ideas I explore.";

export const PUBLIC_ROUTES = [
  { href: "/", label: "Home", command: "open home" },
  { href: "/mission-control", label: "Mission Control", command: "open mission control" },
  { href: "/projects", label: "Project Lab", command: "open projects" },
  { href: "/city", label: "Tharun City", command: "open city" },
  { href: "/research", label: "Research Lab", command: "open research" },
  { href: "/experience", label: "Experience", command: "open experience" },
  { href: "/github", label: "GitHub", command: "open github" },
  { href: "/resume", label: "Resume", command: "open resume" },
  { href: "/contact", label: "Contact", command: "open contact" },
] as const;

export const PROJECT_CATEGORY_LABEL: Record<string, string> = {
  "ai-ml": "AI/ML",
  "full-stack": "Full Stack",
  research: "Research",
  startup: "Startup",
  healthcare: "Healthcare",
  cybersecurity: "Cybersecurity",
  other: "Other",
};

export const PROJECT_STATUS_LABEL: Record<string, string> = {
  planning: "Planning",
  building: "Building",
  testing: "Testing",
  active: "Active",
  completed: "Completed",
  archived: "Archived",
};
