"use client";

import { m as motion } from "framer-motion";
import type { Profile } from "@/lib/types";
import Typewriter from "./Typewriter";
import SocialIcon, { socialMeta } from "./SocialIcon";
import PlayerCard from "./PlayerCard";
import CountUp from "./CountUp";
import { CrowdFlashes } from "./cricket";
import { kit } from "./palette";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero({ profile }: { profile: Profile }) {
  const [first, ...rest] = profile.name.split(" ");
  const last = rest.join(" ");
  const year = new Date().getFullYear();

  return (
    <section id="home" className="relative flex min-h-screen items-center px-4 pt-28 pb-16 sm:px-6">
      <CrowdFlashes />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.35fr_1fr]">
        {/* the scoreboard */}
        <motion.div
          initial={{ opacity: 0, rotateX: -35, y: 40 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          transition={{ duration: 1, ease }}
          style={{ transformPerspective: 1200 }}
          className="board overflow-hidden"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#1f2a24] bg-black/40 px-5 py-2.5">
            <span className="cond flex items-center gap-2 text-[11px] text-[#ff6b73]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#ff6b73]" /> Live from {profile.location || "the crease"}
            </span>
            <span className="led text-xs">SEASON {year}</span>
          </div>

          <div className="dotmatrix p-6 sm:p-8">
            <p className="cond text-xs text-lime">Now batting</p>
            <h1 className="font-display mt-2 leading-[0.85] font-black uppercase">
              <span className="sr-only">{profile.name}</span>
              <motion.span
                aria-hidden
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease }}
                className="block text-7xl text-chalk sm:text-8xl lg:text-[7.5rem]"
              >
                {first}
              </motion.span>
              {last && (
                <motion.span
                  aria-hidden
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55, duration: 0.8, ease }}
                  className="block text-5xl text-transparent [-webkit-text-stroke:2px_#ffb020] sm:text-6xl lg:text-7xl"
                >
                  {last}
                </motion.span>
              )}
            </h1>

            {profile.roles.length > 0 && (
              <div className="mt-6 flex min-h-12 items-center rounded-lg border border-amber/25 bg-black/50 px-4 py-2.5">
                <Typewriter words={profile.roles} className="led text-lg sm:text-2xl" />
              </div>
            )}

            {profile.stats.length > 0 && (
              <div className="mt-6 grid grid-cols-3 gap-2">
                {profile.stats.slice(0, 3).map((s, i) => (
                  <motion.div
                    key={s.label + i}
                    initial={{ opacity: 0, rotateX: 90 }}
                    animate={{ opacity: 1, rotateX: 0 }}
                    transition={{ delay: 0.9 + i * 0.15, duration: 0.6, ease }}
                    className="rounded-lg border-t-4 bg-black/50 px-3 py-3"
                    style={{ borderColor: kit(i) }}
                  >
                    <div className="led text-3xl sm:text-4xl">
                      <CountUp value={s.value} />
                    </div>
                    <div className="cond mt-1 text-[10px] leading-tight text-chalk/55">{s.label}</div>
                  </motion.div>
                ))}
              </div>
            )}

            {profile.availabilityText && (
              <p className="mt-5 flex items-center gap-2 text-sm">
                <span className="cond text-chalk/50">Status:</span>
                <span className={`led ${profile.availableForWork ? "led-green" : ""}`}>
                  {profile.availableForWork ? "● Available" : "● Not available"} — {profile.availabilityText}
                </span>
              </p>
            )}
          </div>
        </motion.div>

        <PlayerCard
          photo={profile.photo}
          name={first}
          label={profile.roles[0] || "All-rounder"}
          sub={profile.location}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8, ease }}
          className="lg:col-span-2"
        >
          <p className="max-w-2xl text-xl leading-relaxed text-chalk/80">{profile.tagline}</p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn-ball">
              View highlights
            </a>
            <a href="#contact" className="btn-chalk">
              Let&apos;s talk
            </a>
            <ul className="flex flex-wrap gap-2 sm:ml-3">
              {profile.socials.map((s, i) => (
                <li key={s.platform + s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={socialMeta(s.platform).label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-pitch-950 text-pitch-950 transition-transform duration-300 hover:-translate-y-1 hover:rotate-12"
                    style={{ background: kit(i) }}
                  >
                    <SocialIcon platform={s.platform} className="h-[18px] w-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
