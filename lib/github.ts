import { logger } from "@/lib/logger";

export interface GitHubRepositorySummary {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  url: string;
  updatedAt: string;
}

export interface GitHubSnapshot {
  source: "live" | "fallback";
  username: string | null;
  repositoryCount: number;
  repositories: GitHubRepositorySummary[];
  message?: string;
}

const FALLBACK_SNAPSHOT: GitHubSnapshot = {
  source: "fallback",
  username: process.env.GITHUB_USERNAME || null,
  repositoryCount: 0,
  repositories: [],
  message: "GitHub data temporarily unavailable.",
};

export async function getGitHubSnapshot(): Promise<GitHubSnapshot> {
  const username = process.env.GITHUB_USERNAME;

  if (!username) {
    return {
      ...FALLBACK_SNAPSHOT,
      message: "GitHub username is not configured. Showing fallback state.",
    };
  }

  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
      "User-Agent": "tharun-os",
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=6&sort=updated`,
      { headers, cache: "force-cache", next: { revalidate: 3600 } },
    );

    if (!response.ok) {
      logger.warn("github_fetch_failed", { status: response.status });
      return { ...FALLBACK_SNAPSHOT, username };
    }

    const payload = (await response.json()) as Array<{
      name: string;
      description: string | null;
      language: string | null;
      stargazers_count: number;
      forks_count: number;
      html_url: string;
      updated_at: string;
    }>;

    return {
      source: "live",
      username,
      repositoryCount: payload.length,
      repositories: payload.map((repo) => ({
        name: repo.name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        url: repo.html_url,
        updatedAt: repo.updated_at,
      })),
    };
  } catch (error) {
    logger.error("github_fetch_exception", {
      reason: error instanceof Error ? error.message : "unknown",
    });
    return { ...FALLBACK_SNAPSHOT, username };
  }
}
