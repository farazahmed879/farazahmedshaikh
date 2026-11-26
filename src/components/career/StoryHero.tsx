"use client";

import { m as motion } from "framer-motion";
import type { Profile, Story } from "@/lib/types";
import PlayerCard from "@/components/site/PlayerCard";
import { CrowdFlashes } from "@/components/site/cricket";
import Highlight from "./Highlight";

const ease = [0.22, 1, 0.36, 1] as const;

export default function StoryHero({ story, profile }: { story: Story; profile: Profile }) {
  const paragraphs = story.intro.split(/\n{2,}/).filter(Boolean);
  const [first] = profile.name.split(" ");

  return (
    <section id="intro" className="relative flex min-h-screen items-center px-4 pt-32 pb-20 sm:px-6">
      <CrowdFlashes count={22} />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease }} className="flex items-center gap-3">
            <span className="led rounded-md border border-amber/30 bg-black/40 px-2 py-0.5 text-sm">BIO</span>
            <span className="cond text-xs text-lime">{story.eyebrow}</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease }}
            className="font-display mt-5 text-6xl leading-[0.88] font-black text-chalk uppercase sm:text-7xl lg:text-8xl"
          >
            <Highlight text={story.title} />
          </motion.h1>
          <div className="mt-8 space-y-4">
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 + i * 0.15, ease }}
                className="max-w-xl text-lg leading-relaxed text-chalk/75"
              >
                {p}
              </motion.p>
            ))}
          </div>
          {story.quote && (
            <motion.figure
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1, ease }}
              className="board mt-10 max-w-xl p-5"
            >
              <figcaption className="cond flex items-center gap-2 text-[11px] text-lime">
                My motto
              </figcaption>
              <blockquote className="font-display mt-3 text-3xl leading-tight font-extrabold text-amber uppercase">“{story.quote}”</blockquote>
              {story.quoteAuthor && <p className="cond mt-2 text-[11px] text-chalk/50">— {story.quoteAuthor}</p>}
            </motion.figure>
          )}
        </div>

        <PlayerCard
          photo={profile.photo}
          name={first}
          label={profile.roles[0] || "All-rounder"}
          sub={profile.location}
          stickers={[...(story.spotlights ?? []), ...story.passions].map((p) => p.emoji).filter(Boolean)}
        />
      </div>
    </section>
  );
}
