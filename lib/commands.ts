import { projects } from "@/data/projects";
import { DESKTOP_APPS } from "@/lib/os-apps";
import { searchPortfolio } from "@/lib/search";

export interface CommandHit {
  id: string;
  title: string;
  description: string;
  href: string;
  group: "command" | "project" | "search";
}

function appCommands(): CommandHit[] {
  return DESKTOP_APPS.map((app) => ({
    id: `cmd-${app.id}`,
    title: app.command,
    description: `Open ${app.title}`,
    href: app.href,
    group: "command",
  }));
}

function projectCommands(): CommandHit[] {
  const hits: CommandHit[] = [];

  for (const project of projects) {
    hits.push({
      id: `project-open-${project.slug}`,
      title: `Open ${project.title}`,
      description: "Open Project",
      href: `/projects/${project.slug}`,
      group: "project",
    });
    hits.push({
      id: `project-arch-${project.slug}`,
      title: `${project.title} architecture`,
      description: "View Architecture",
      href: `/projects/${project.slug}#architecture`,
      group: "project",
    });
    hits.push({
      id: `project-uc-${project.slug}`,
      title: `${project.title} use cases`,
      description: "View Use Cases",
      href: `/projects/${project.slug}#use-cases`,
      group: "project",
    });
    if (project.links.github) {
      hits.push({
        id: `project-gh-${project.slug}`,
        title: `${project.title} on GitHub`,
        description: "Open GitHub",
        href: project.links.github,
        group: "project",
      });
    }
  }

  return hits;
}

function scoreCommand(query: string, title: string, extra: string[]): number {
  const q = query.trim().toLowerCase();
  if (!q) {
    return 1;
  }

  const haystack = [title, ...extra].join(" ").toLowerCase();
  if (title.toLowerCase() === q) {
    return 100;
  }
  if (title.toLowerCase().startsWith(q) || haystack.startsWith(q)) {
    return 80;
  }
  if (haystack.includes(q)) {
    return 50;
  }
  return 0;
}

export function resolveCommandQuery(query: string, limit = 12): CommandHit[] {
  const trimmed = query.trim();
  const catalog = [...appCommands(), ...projectCommands()];

  if (!trimmed) {
    return appCommands().slice(0, limit);
  }

  const fromCatalog = catalog
    .map((item) => ({
      item,
      score: scoreCommand(trimmed, item.title, [item.description, item.href]),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.item);

  const fromSearch: CommandHit[] = searchPortfolio(trimmed, limit).map((result) => ({
    id: `search-${result.id}`,
    title: result.title,
    description: result.description,
    href: result.href,
    group: "search" as const,
  }));

  const seen = new Set<string>();
  const merged: CommandHit[] = [];

  for (const hit of [...fromCatalog, ...fromSearch]) {
    const key = `${hit.href}:${hit.description}`;
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    merged.push(hit);
    if (merged.length >= limit) {
      break;
    }
  }

  return merged;
}
