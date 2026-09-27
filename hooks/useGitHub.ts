import { getGitHubSnapshot, type GitHubSnapshot } from "@/lib/github";

export async function loadGitHubSnapshot(): Promise<GitHubSnapshot> {
  return getGitHubSnapshot();
}
