import type { Profile } from "@/lib/types";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import CountUp from "./CountUp";
import { kit } from "./palette";

export default function About({ profile, storyLabel }: { profile: Profile; storyLabel?: string }) {
  const paragraphs = profile.bio.split(/\n{2,}/).filter(Boolean);
  const rows = [
    ["Full name", profile.name],
    ["Playing role", profile.roles[0]],
    ["Specialties", profile.roles.slice(1).join(" · ")],
    ["Home ground", profile.location],
  ].filter(([, v]) => v);

  return (
    <section id="about" className="relative px-4 py-28 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="01" eyebrow="Player profile" title={profile.aboutHeading || "About me"} />

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="chalk-card seam p-7 sm:p-10">
            <div className="flex items-center justify-between">
              <span className="cond text-xs text-ball">Player profile</span>
              <span className="cond text-xs text-pitch-900/50">Est. in the nets</span>
            </div>
            <dl className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-[140px_1fr]">
              {rows.map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="cond text-xs text-pitch-900/55 sm:pt-1">{k}</dt>
                  <dd className="font-display text-2xl leading-tight font-extrabold text-pitch-950 uppercase">{v}</dd>
                </div>
              ))}
            </dl>
            <hr className="my-7 border-t-2 border-dashed border-pitch-950/15" />
            <div className="space-y-4">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-lg leading-relaxed text-pitch-900/80">
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {profile.resumeUrl && (
                <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-ball">
                  Download resume
                </a>
              )}
              {storyLabel && (
                <a
                  href="/career"
                  className="cond group inline-flex items-center gap-2 rounded-full border-2 border-pitch-950 px-7 py-3 text-[15px] font-extrabold text-pitch-950 transition hover:bg-pitch-950 hover:text-chalk"
                >
                  Read {storyLabel.toLowerCase().startsWith("my ") ? storyLabel.toLowerCase() : storyLabel}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              )}
            </div>
          </Reveal>

          {profile.stats.length > 0 && (
            <Reveal delay={0.15} className="board dotmatrix self-start p-6">
              <p className="cond text-xs text-amber">Career stats</p>
              <div className="mt-5 grid gap-3">
                {profile.stats.map((stat, i) => (
                  <div key={stat.label + i} className="flex items-center gap-4 rounded-xl border-l-[6px] bg-black/50 px-5 py-4" style={{ borderColor: kit(i) }}>
                    <div className="led w-24 shrink-0 text-5xl">
                      <CountUp value={stat.value} />
                    </div>
                    <div className="cond text-sm leading-snug text-chalk/70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
