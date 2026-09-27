export type DesktopAppId =
  | "mission-control"
  | "project-lab"
  | "city"
  | "research"
  | "bookmyshift-hq"
  | "experience"
  | "github"
  | "resume"
  | "contact"
  | "about";

export interface DesktopApp {
  id: DesktopAppId;
  title: string;
  href: string;
  command: string;
  summary: string;
}

export const DESKTOP_APPS: DesktopApp[] = [
  {
    id: "mission-control",
    title: "Mission Control",
    href: "/mission-control",
    command: "open mission control",
    summary: "Recruiter dashboard: identity, missions, systems, activity.",
  },
  {
    id: "project-lab",
    title: "Project Lab",
    href: "/projects",
    command: "open projects",
    summary: "Product catalog of systems Tharun builds.",
  },
  {
    id: "city",
    title: "Tharun City",
    href: "/city",
    command: "open city",
    summary: "Optional map of districts. Never the only way in.",
  },
  {
    id: "research",
    title: "Research Lab",
    href: "/research",
    command: "open research",
    summary: "Research titles and topics from portfolio data.",
  },
  {
    id: "bookmyshift-hq",
    title: "BookMyShift HQ",
    href: "/projects/bookmyshift",
    command: "open bookmyshift",
    summary: "Startup headquarters for the workforce platform.",
  },
  {
    id: "experience",
    title: "Experience",
    href: "/experience",
    command: "open experience",
    summary: "Founding and independent engineering timeline.",
  },
  {
    id: "github",
    title: "GitHub",
    href: "/github",
    command: "open github",
    summary: "Public repositories with a fail-soft fallback.",
  },
  {
    id: "resume",
    title: "Resume",
    href: "/resume",
    command: "open resume",
    summary: "Short recruiter view of role and positioning.",
  },
  {
    id: "contact",
    title: "Contact",
    href: "/contact",
    command: "open contact",
    summary: "Public contact surface. No form backend in v1.",
  },
  {
    id: "about",
    title: "About",
    href: "/",
    command: "open about",
    summary: "Who Tharun is and how this environment is structured.",
  },
];

export function getDesktopApp(id: string): DesktopApp | undefined {
  return DESKTOP_APPS.find((app) => app.id === id);
}
