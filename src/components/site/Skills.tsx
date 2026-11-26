"use client";

import { useState } from "react";
import { AnimatePresence, m as motion } from "framer-motion";
import type { SkillCategory } from "@/lib/types";
import SectionHeading from "./SectionHeading";
// Shots alternate amber and cream so they stand out on the green field.
const shotColor = (i: number) => (i % 2 ? "#f5efdc" : "#ffb020");

const runsFor = (level: number) => (level >= 90 ? 6 : level >= 75 ? 4 : Math.max(1, Math.round(level / 30)));

export default function Skills({ categories }: { categories: SkillCategory[] }) {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const current = categories[Math.min(active, categories.length - 1)];
  const skills = current?.skills ?? [];

  // wagon wheel geometry (viewBox 400x400, batter at the centre)
  const C = 200;
  const shot = (i: number, level: number) => {
    const angle = ((-90 + (360 / Math.max(skills.length, 1)) * i + 17) * Math.PI) / 180;
    const r = 28 + (level / 100) * 152;
    return { x: C + r * Math.cos(angle), y: C + r * Math.sin(angle) };
  };

  return (
    <section id="skills" className="relative px-4 py-28 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="04"
          eyebrow="Wagon wheel"
          title={
            <>
              Where I <span className="hl">score</span> my runs
            </>
          }
          subtitle="Each line is a skill — the further it reaches, the deeper my experience."
        />

        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((c, i) => (
            <button
              key={c.id ?? c.title}
              onClick={() => {
                setActive(i);
                setHover(null);
              }}
              className={`cond rounded-full border-2 px-5 py-2.5 text-xs transition-all ${
                active === i ? "border-pitch-950 bg-lime text-pitch-950 shadow-[3px_3px_0_#03140d]" : "border-chalk/25 text-chalk/70 hover:text-chalk"
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          {/* the field */}
          <div className="relative mx-auto w-full max-w-md">
            <svg viewBox="0 0 400 400" className="w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)]">
              <defs>
                <pattern id="mow" width="40" height="400" patternUnits="userSpaceOnUse">
                  <rect width="20" height="400" fill="#1f8a52" />
                  <rect x="20" width="20" height="400" fill="#1a7a48" />
                </pattern>
              </defs>
              <circle cx={C} cy={C} r="196" fill="url(#mow)" />
              <circle cx={C} cy={C} r="188" fill="none" stroke="#f5efdc" strokeWidth="3" />
              <circle cx={C} cy={C} r="110" fill="none" stroke="#f5efdc" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="6 8" />
              <rect x={C - 9} y={C - 40} width="18" height="80" rx="3" fill="#d9c49a" />
              <rect x={C - 9} y={C - 34} width="18" height="2" fill="#f5efdc" />
              <rect x={C - 9} y={C + 32} width="18" height="2" fill="#f5efdc" />
              <AnimatePresence>
                {skills.map((s, i) => {
                  const p = shot(i, s.level);
                  const dim = hover !== null && hover !== i;
                  return (
                    <motion.g key={`${current.title}-${s.name}`} initial={{ opacity: 0 }} animate={{ opacity: dim ? 0.2 : 1 }} exit={{ opacity: 0 }}>
                      <motion.line
                        x1={C}
                        y1={C}
                        x2={p.x}
                        y2={p.y}
                        stroke={shotColor(i)}
                        strokeWidth={hover === i ? 5 : 3.5}
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: "easeOut" }}
                      />
                      <motion.circle
                        cx={p.x}
                        cy={p.y}
                        r={hover === i ? 9 : 7}
                        fill={shotColor(i)}
                        stroke="#03140d"
                        strokeWidth="2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.8 + i * 0.08, type: "spring", stiffness: 300 }}
                      />
                    </motion.g>
                  );
                })}
              </AnimatePresence>
              <circle cx={C} cy={C} r="7" fill="#e3343f" stroke="#f5efdc" strokeWidth="2" />
            </svg>
          </div>

          {/* the legend */}
          <AnimatePresence mode="wait">
            <motion.ul
              key={current?.title}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="grid gap-2.5 sm:grid-cols-2"
            >
              {skills.map((s, i) => {
                const runs = runsFor(s.level);
                return (
                  <li
                    key={s.name + i}
                    onPointerEnter={() => setHover(i)}
                    onPointerLeave={() => setHover(null)}
                    className="board flex cursor-default items-center gap-3 px-4 py-3 transition-transform hover:-translate-y-0.5"
                  >
                    <span className="h-3 w-3 shrink-0 rounded-full ring-2 ring-pitch-950" style={{ background: shotColor(i) }} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-semibold text-chalk">{s.name}</span>
                      <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-white/10">
                        <motion.span
                          className="block h-full rounded-full"
                          style={{ background: shotColor(i) }}
                          initial={{ width: 0 }}
                          animate={{ width: `${s.level}%` }}
                          transition={{ duration: 1, delay: 0.2 + i * 0.05 }}
                        />
                      </span>
                    </span>
                    <span
                      className={`cond shrink-0 rounded-md px-2 py-1 text-[11px] ${
                        runs === 6 ? "bg-amber text-pitch-950" : runs === 4 ? "border border-amber/60 text-amber" : "border border-chalk/25 text-chalk/70"
                      }`}
                    >
                      {runs === 6 ? "Expert" : runs === 4 ? "Advanced" : runs >= 2 ? "Proficient" : "Learning"}
                    </span>
                  </li>
                );
              })}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
