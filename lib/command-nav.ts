import { PUBLIC_ROUTES } from "@/lib/constants";

export type CommandNavIcon =
  | "home"
  | "mission"
  | "city"
  | "projects"
  | "research"
  | "experience"
  | "skills"
  | "education"
  | "about"
  | "contact";

export interface CommandNavItem {
  href: string;
  label: string;
  icon: CommandNavIcon;
}

/**
 * Dashboard destinations. Skills live on Home (`/#stack`);
 * Education and Resume/About use the existing Resume route.
 */
export const COMMAND_NAV: CommandNavItem[] = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/mission-control", label: "Mission Control", icon: "mission" },
  { href: "/city", label: "Tharun City", icon: "city" },
  { href: "/projects", label: "Project Lab", icon: "projects" },
  { href: "/research", label: "Research Lab", icon: "research" },
  { href: "/experience", label: "Experience", icon: "experience" },
  { href: "/#stack", label: "Skills & Tech", icon: "skills" },
  { href: "/resume", label: "Education", icon: "education" },
  { href: "/resume", label: "Resume / About", icon: "about" },
  { href: "/contact", label: "Contact", icon: "contact" },
];

const KNOWN_PATHS = new Set<string>(PUBLIC_ROUTES.map((item) => item.href));

export function commandNavPath(href: string): string {
  return href.split("#")[0] ?? href;
}

export function commandNavHash(href: string): string | undefined {
  const hash = href.split("#")[1];
  return hash || undefined;
}

export function isCommandNavActive(
  href: string,
  pathname: string,
  hash = "",
): boolean {
  const path = commandNavPath(href);
  const itemHash = commandNavHash(href);
  const currentHash = hash.replace(/^#/, "");

  if (itemHash) {
    return pathname === path && currentHash === itemHash;
  }

  if (path === "/") {
    return pathname === "/" && currentHash !== "stack";
  }

  if (path === "/mission-control") {
    return pathname === "/mission-control";
  }

  if (path === "/projects") {
    return pathname === "/projects" || pathname.startsWith("/projects/");
  }

  return pathname === path || pathname.startsWith(`${path}/`);
}

export function commandNavUsesExistingRoutes(): boolean {
  return COMMAND_NAV.every((item) => KNOWN_PATHS.has(commandNavPath(item.href)));
}
