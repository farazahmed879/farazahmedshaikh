import "server-only";
import type { GithubRepo } from "./types";

/** Fetches the most recently pushed public, non-fork repos. Cached for an hour. */
export async function getGithubRepos(username: string, count: number): Promise<GithubRepo[]> {
  if (!username || count <= 0) return [];
  try {
    const res = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=pushed&per_page=100`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
        },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return [];
    const repos = (await res.json()) as (GithubRepo & { fork: boolean; archived: boolean })[];
    return repos
      .filter((r) => !r.fork && !r.archived)
      .slice(0, count)
      .map(({ id, name, description, html_url, homepage, language, stargazers_count, forks_count, pushed_at }) => ({
        id, name, description, html_url, homepage, language, stargazers_count, forks_count, pushed_at,
      }));
  } catch {
    return [];
  }
}
