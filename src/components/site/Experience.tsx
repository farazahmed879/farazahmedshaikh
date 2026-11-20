"use client";

import { useState } from "react";
import { AnimatePresence, m as motion } from "framer-motion";
import type { Experience } from "@/lib/types";
import SectionHeading from "./SectionHeading";
import { kit } from "./palette";

const isCurrent = (period: string) => /present|now|current|today/i.test(period);

export default function ExperienceSection({ items }: { items: Experience[] }) {
  const [open, setOpen] = useState(0);

  return (
    <section id="experience" className="relative px-4 py-28 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="02"
          eyebrow="Career scorecard"
          title={
            <>
              Every team I&apos;ve <span className="hl">batted</span> for
            </>
          }
          subtitle="Tap a row for the full innings."
        />

        <div className="board overflow-hidden">
          <div className="flex items-center justify-between border-b-2 border-[#1f2a24] bg-black/50 px-5 py-3">
            <span className="cond text-xs text-amber">1st innings · career</span>
            <span className="led text-xs">{items.length} TEAMS</span>
          </div>

          <div className="cond hidden grid-cols-[48px_1.4fr_1fr_1fr_120px] gap-4 border-b border-[#1f2a24] px-5 py-2 text-[11px] text-chalk/40 md:grid">
            <span>#</span>
            <span>Team</span>
            <span>Role</span>
            <span>Spell</span>
            <span className="text-right">Status</span>
          </div>

          <ul>
            {items.map((item, i) => {
              const current = isCurrent(item.period);
              const expanded = open === i;
              return (
                <motion.li
                  key={item.id ?? i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="border-b border-[#1f2a24] last:border-0"
                >
                  <button
                    onClick={() => setOpen(expanded ? -1 : i)}
                    aria-expanded={expanded}
                    className={`grid w-full grid-cols-[40px_1fr_auto] items-center gap-x-4 gap-y-1 px-5 py-5 text-left transition-colors md:grid-cols-[48px_1.4fr_1fr_1fr_120px] ${
                      expanded ? "bg-white/[0.04]" : "hover:bg-white/[0.03]"
                    }`}
                  >
                    <span className="led text-xl">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex items-center gap-3">
                      <span className="h-8 w-1.5 shrink-0 rounded-full" style={{ background: kit(i) }} />
                      <span className="font-display text-2xl leading-none font-extrabold text-chalk uppercase sm:text-3xl">{item.company}</span>
                    </span>
                    <span className="col-start-2 text-chalk/75 md:col-start-auto">{item.role}</span>
                    <span className="cond col-start-2 text-xs text-chalk/50 md:col-start-auto">{item.period}</span>
                    <span className="col-start-3 row-start-1 text-right md:col-start-auto md:row-start-auto">
                      {current ? (
                        <span className="led led-green text-sm">
                          NOT OUT<span className="animate-blink">*</span>
                        </span>
                      ) : (
                        <span className="cond text-[11px] text-chalk/40">Innings done</span>
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {expanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-6 px-5 pb-7 md:grid-cols-[48px_1fr] md:gap-4">
                          <span />
                          <div className="chalk-card p-6">
                            {item.location && <p className="cond text-xs text-ball">📍 {item.location}</p>}
                            {item.description && <p className="mt-2 text-lg leading-relaxed text-pitch-900/85">{item.description}</p>}
                            {item.highlights.length > 0 && (
                              <ul className="mt-4 space-y-2 text-pitch-900/80">
                                {item.highlights.map((h, j) => (
                                  <li key={j} className="flex gap-3">
                                    <span className="cond mt-0.5 rounded bg-amber px-1.5 text-[10px] text-pitch-950">4</span>
                                    {h}
                                  </li>
                                ))}
                              </ul>
                            )}
                            {item.tech.length > 0 && (
                              <div className="mt-5 flex flex-wrap items-center gap-2">
                                <span className="cond text-[11px] text-pitch-900/50">Shots played:</span>
                                {item.tech.map((t) => (
                                  <span key={t} className="cond rounded-full border-2 border-pitch-950/15 bg-pitch-950/[0.06] px-3 py-1 text-[11px] text-pitch-950">
                                    {t}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </ul>
          <div className="flex items-center justify-between bg-black/50 px-5 py-3">
            <span className="cond text-[11px] text-chalk/40">Innings in progress</span>
            <span className="led text-xs">
              STILL BATTING<span className="animate-blink">_</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
