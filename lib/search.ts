import { activities } from "@/data/activities";
import { cityLocations } from "@/data/city-locations";
import { experienceItems } from "@/data/experience";
import { projects } from "@/data/projects";
import { researchItems } from "@/data/research";
import { skills } from "@/data/skills";
import { PUBLIC_ROUTES } from "@/lib/constants";

export type SearchResultKind =
  | "project"
  | "research"
  | "experience"
  | "skill"
  | "activity"
  | "city"
  | "application";

export interface SearchResult {
  id: string;
  kind: SearchResultKind;
  title: string;
  description: string;
  href: string;
  score: number;
}

function scoreMatch(query: string, title: string, keywords: string[]): number {
  const q = query.trim().toLowerCase();
  if (!q) {
    return 0;
  }

  const titleLower = title.toLowerCase();
  if (titleLower === q) {
    return 100;
  }
  if (titleLower.startsWith(q)) {
    return 80;
  }
  if (titleLower.includes(q)) {
    return 60;
  }

  const keywordHit = keywords.some((keyword) => keyword.toLowerCase().includes(q));
  return keywordHit ? 40 : 0;
}

export function searchPortfolio(query: string, limit = 12): SearchResult[] {
  const results: SearchResult[] = [];

  for (const project of projects) {
    const score = scoreMatch(query, project.title, [
      ...project.tags,
      ...project.technologies,
      project.shortDescription,
      project.category,
      ...project.categories,
    ]);
    if (score > 0) {
      results.push({
        id: project.id,
        kind: "project",
        title: project.title,
        description: project.shortDescription,
        href: `/projects/${project.slug}`,
        score,
      });
    }
  }

  for (const item of researchItems) {
    const score = scoreMatch(query, item.title, item.topics);
    if (score > 0) {
      results.push({
        id: item.id,
        kind: "research",
        title: item.title,
        description: item.description,
        href: "/research",
        score,
      });
    }
  }

  for (const item of experienceItems) {
    const score = scoreMatch(query, `${item.role} ${item.organization}`, [
      ...item.skills,
      item.description,
    ]);
    if (score > 0) {
      results.push({
        id: item.id,
        kind: "experience",
        title: `${item.role} · ${item.organization}`,
        description: item.description,
        href: "/experience",
        score,
      });
    }
  }

  for (const skill of skills) {
    const score = scoreMatch(query, skill.name, [skill.group]);
    if (score > 0) {
      results.push({
        id: skill.id,
        kind: "skill",
        title: skill.name,
        description: skill.group,
        href: "/mission-control",
        score,
      });
    }
  }

  for (const activity of activities) {
    const score = scoreMatch(query, activity.title, [activity.description, activity.type]);
    if (score > 0) {
      results.push({
        id: activity.id,
        kind: "activity",
        title: activity.title,
        description: activity.description,
        href: activity.href ?? "/mission-control",
        score,
      });
    }
  }

  for (const location of cityLocations) {
    const score = scoreMatch(query, location.name, [location.description, location.route]);
    if (score > 0) {
      results.push({
        id: location.id,
        kind: "city",
        title: location.name,
        description: location.description,
        href: location.route,
        score,
      });
    }
  }

  for (const route of PUBLIC_ROUTES) {
    const score = scoreMatch(query, route.label, [route.command, route.href]);
    if (score > 0) {
      results.push({
        id: route.href,
        kind: "application",
        title: route.label,
        description: `Open ${route.label}`,
        href: route.href,
        score,
      });
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, limit);
}
