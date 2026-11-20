"use client";

import { useMemo, useState } from "react";
import { m as motion } from "framer-motion";
import Image from "next/image";
import { FaGithub } from "react-icons/fa6";
import type { Project } from "@/lib/types";
import SectionHeading from "./SectionHeading";
import { kit } from "./palette";

export default function Projects({ items }: { items: Project[] }) {
  const [filter, setFilter] = useState("All");

  const filters = useMemo(() => {
    const counts = new Map<string, number>();
    items.forEach((p) => p.tags.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)));
    const top = [...counts.entries()].filter(([, c]) => c > 1).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([t]) => t);
    return ["All", ...top];
  }, [items]);

  const visible = filter === "All" ? items : items.filter((p) => p.tags.includes(filter));

  return (
    <section id="projects" className="relative px-4 py-28 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="03"
          eyebrow="Match highlights"
          title={
            <>
              Products I&apos;ve <span className="hl">shipped</span>
            </>
          }
          subtitle="Every project is a match. Grab a ticket."
        />

        {filters.length > 2 && (
          <div className="mb-10 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`cond rounded-full border-2 px-4 py-2 text-xs transition-all ${
                  filter === f ? "-rotate-2 border-pitch-950 bg-amber text-pitch-950 shadow-[3px_3px_0_#03140d]" : "border-chalk/25 text-chalk/70 hover:border-chalk/60 hover:text-chalk"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        )}

        <div key={filter} className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, i) => (
              <motion.div
                key={project.id ?? project.name}
                initial={{ opacity: 0, y: 50, rotate: i % 2 ? 3 : -3 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <Ticket project={project} index={items.indexOf(project)} />
              </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const SMALL_WORDS = new Set(["of", "the", "and", "for", "a", "an"]);

/** "Healthy Longevity Compass" → "HLC", "FII-CMI" stays "FII-CMI" — shown when a project has no image. */
function initials(name: string) {
  if (!/\s/.test(name.trim()) && name.length <= 8) return name.toUpperCase();
  const words = name.split(/[\s\-–—&]+/).filter((w) => /^[a-z0-9]/i.test(w) && !SMALL_WORDS.has(w.toLowerCase()));
  return (words.length > 1 ? words.map((w) => w[0]).join("") : name).slice(0, 3).toUpperCase();
}

function Ticket({ project, index }: { project: Project; index: number }) {
  const color = kit(index);
  return (
    <article className="group relative flex h-full flex-col transition-transform duration-300 hover:-translate-y-2 hover:rotate-[-1deg]">
      {/* ticket header */}
      <div className="relative rounded-t-3xl border-2 border-b-0 border-pitch-950 px-5 pt-4 pb-5" style={{ background: color }}>
        <div className="flex items-center justify-between text-pitch-950">
          <span className="cond text-[11px]">Match {String(index + 1).padStart(2, "0")}</span>
          {project.featured && <span className="cond rounded-full bg-pitch-950 px-2.5 py-1 text-[10px] text-amber">★ Featured</span>}
        </div>
        <h3 className="font-display mt-2 text-4xl leading-none font-black text-pitch-950 uppercase">{project.name}</h3>
        {project.subtitle && <p className="cond mt-1.5 text-xs text-pitch-950/70">{project.subtitle}</p>}
      </div>

      {/* perforation */}
      <div className="relative h-0 border-t-2 border-dashed border-pitch-950/60">
        <span className="absolute -top-3 -left-3 h-6 w-6 rounded-full bg-pitch-900" />
        <span className="absolute -top-3 -right-3 h-6 w-6 rounded-full bg-pitch-900" />
      </div>

      {/* ticket body */}
      <div className="flex flex-1 flex-col rounded-b-3xl border-2 border-t-0 border-pitch-950 bg-chalk p-5 text-pitch-950 shadow-[8px_8px_0_rgba(0,0,0,0.4)]">
        <div className="overflow-hidden rounded-xl border-2 border-pitch-950/10 bg-white">
          {project.image ? (
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={project.image}
                alt={project.name}
                fill
                sizes="(max-width: 768px) 92vw, (max-width: 1024px) 46vw, 360px"
                className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ) : (
            <div
              className="relative flex aspect-[16/10] items-center justify-center overflow-hidden"
              style={{ background: `repeating-linear-gradient(135deg, ${color}26 0 14px, ${color}0d 14px 28px)` }}
            >
              <span
                className={`font-display leading-none font-black text-pitch-950/15 uppercase transition-transform duration-500 group-hover:scale-110 ${
                  initials(project.name).length > 3 ? "text-5xl" : "text-7xl"
                }`}
              >
                {initials(project.name)}
              </span>
              <span className="cond absolute right-3 bottom-2.5 text-[10px] text-pitch-950/35">{project.subtitle || "Shipped"}</span>
            </div>
          )}
        </div>
        {project.description && <p className="mt-4 flex-1 leading-relaxed text-pitch-900/80">{project.description}</p>}
        {project.tags.length > 0 && (
          <div className="mt-4">
            <p className="cond text-[10px] text-pitch-900/45">Playing XI</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {project.tags.map((t) => (
                <span key={t} className="cond rounded-md bg-pitch-950/[0.07] px-2 py-1 text-[11px] text-pitch-900">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
        <div className="mt-5 flex gap-2">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="cond flex-1 rounded-xl bg-pitch-950 px-4 py-3 text-center text-xs text-chalk transition hover:bg-ball"
            >
              ● Watch live ↗
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} source code`}
              className="flex items-center justify-center rounded-xl border-2 border-pitch-950 px-4 transition hover:bg-pitch-950 hover:text-chalk"
            >
              <FaGithub />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
