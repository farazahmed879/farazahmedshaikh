import { FaGithub, FaStar, FaCodeFork } from "react-icons/fa6";
import type { GithubRepo } from "@/lib/types";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { kit } from "./palette";

function timeAgo(date: string) {
  const days = Math.floor((Date.now() - new Date(date).getTime()) / 86_400_000);
  if (days < 1) return "today";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

export default function GithubRepos({ repos, username }: { repos: GithubRepo[]; username: string }) {
  return (
    <section id="github" className="relative px-4 py-28 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-x-6">
          <SectionHeading
            index="05"
            eyebrow="Practice sessions"
            title={
              <>
                In the <span className="hl">nets</span>
              </>
            }
            subtitle="What I've been practising lately, straight from GitHub."
          />
          <Reveal className="mb-14">
            <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" className="btn-chalk">
              <FaGithub /> @{username}
            </a>
          </Reveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo, i) => (
            <Reveal key={repo.id} delay={(i % 3) * 0.08}>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="board net-bg group flex h-full flex-col overflow-hidden p-6 transition-transform duration-300 hover:-translate-y-1.5 hover:rotate-[0.6deg]"
              >
                <span className="absolute inset-x-0 top-0 h-1.5" style={{ background: kit(i) }} />
                <div className="flex items-center justify-between">
                  <span className="led text-xs">SESSION {String(i + 1).padStart(2, "0")}</span>
                  <span className="cond text-[11px] text-chalk/40">{timeAgo(repo.pushed_at)}</span>
                </div>
                <h3 className="font-display mt-3 text-2xl leading-tight font-extrabold break-all text-chalk uppercase group-hover:text-amber">{repo.name}</h3>
                <p className="mt-2 line-clamp-3 flex-1 text-sm text-chalk/60">{repo.description || ""}</p>
                <div className="cond mt-5 flex items-center gap-4 text-[11px] text-chalk/60">
                  {repo.language && (
                    <span className="rounded-md px-2 py-1 text-pitch-950" style={{ background: kit(i + 2) }}>
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <FaStar className="text-amber" /> {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaCodeFork /> {repo.forks_count}
                  </span>
                  <span className="ml-auto text-chalk/40 transition group-hover:text-chalk">Open ↗</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
