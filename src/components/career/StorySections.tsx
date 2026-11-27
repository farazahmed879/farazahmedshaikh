"use client";

import { m as motion } from "framer-motion";
import Image from "next/image";
import { HiOutlineAcademicCap, HiOutlineMail } from "react-icons/hi";
import type { Profile, Story } from "@/lib/types";
import SectionHeading from "@/components/site/SectionHeading";
import SocialIcon, { socialMeta } from "@/components/site/SocialIcon";
import { CricketBall } from "@/components/site/cricket";
import { kit } from "@/components/site/palette";
import Highlight, { Emphasis } from "./Highlight";
import { useShowMore } from "@/components/site/ShowMore";

const ease = [0.22, 1, 0.36, 1] as const;
const view = { once: true, margin: "-80px" } as const;

/* ---------------- Life chapters: over by over ---------------- */

export function Chapters({ story }: { story: Story }) {
  return (
    <section id="chapters" className="relative px-4 py-28 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <SectionHeading index="02" eyebrow="Over by over" title={<>The innings of <span className="hl">my life</span></>} />
        <ol className="relative space-y-8 before:absolute before:top-4 before:bottom-4 before:left-[88px] before:hidden before:w-1 before:rounded-full before:bg-[repeating-linear-gradient(to_bottom,#f5efdc_0_10px,transparent_10px_20px)] before:opacity-20 md:before:block">
          {story.chapters.map((c, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={view}
              transition={{ duration: 0.7, ease }}
              className="relative grid grid-cols-1 gap-3 md:grid-cols-[180px_1fr] md:gap-8"
            >
              <div className="board flex h-fit w-fit items-baseline gap-2 px-4 py-2 md:w-auto md:flex-col md:items-center md:justify-center md:gap-0 md:px-2 md:py-4">
                <span className="cond text-[10px] text-chalk/45">Over {i + 1}</span>
                <span className="led text-xl md:mt-1 md:text-4xl">{c.year}</span>
              </div>
              <div className="chalk-card group p-5 transition-transform duration-300 hover:-rotate-[0.6deg] sm:p-6 md:p-8">
                <span className="absolute top-0 left-6 h-2 w-16 rounded-b-full" style={{ background: kit(i) }} />
                <h3 className="font-display text-2xl font-black text-pitch-950 uppercase sm:text-3xl md:text-4xl">{c.title}</h3>
                <p className="mt-3 leading-relaxed text-pitch-900/80 sm:text-lg">
                  <Emphasis text={c.description} />
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- Education: the academy ---------------- */

export function Education({ story }: { story: Story }) {
  return (
    <section id="education" className="relative px-4 py-28 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <SectionHeading index="03" eyebrow="The academy" title={<>Where I <span className="hl">trained</span></>} />
        <div className="grid gap-6 md:grid-cols-2">
          {story.education.map((e, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 40, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={view}
              transition={{ duration: 0.7, delay: i * 0.1, ease }}
              className={`relative overflow-hidden rounded-3xl border-2 border-pitch-950 p-8 text-pitch-950 shadow-[8px_8px_0_rgba(0,0,0,0.45)] ${story.education.length === 1 ? "md:col-span-2" : ""}`}
              style={{ background: kit(i + 2) }}
            >
              <HiOutlineAcademicCap className="absolute -right-8 -bottom-10 h-52 w-52 text-pitch-950/10" />
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pitch-950 text-amber">
                <HiOutlineAcademicCap className="h-8 w-8" />
              </div>
              {e.period && <p className="cond mt-6 text-xs text-pitch-950/70">{e.period}</p>}
              <h3 className="font-display mt-2 text-3xl leading-[0.95] font-black uppercase sm:text-4xl lg:text-5xl">{e.institution}</h3>
              {e.degree && <p className="cond mt-2 text-sm">{e.degree}</p>}
              {e.description && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-pitch-950/80">{e.description}</p>}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Passions: off the field ---------------- */

export function Passions({ story }: { story: Story }) {
  // Passions with a longer story become big "pillar" cards; the rest are compact cards.
  const pillars = story.passions.filter((p) => p.details?.trim());
  const others = story.passions.filter((p) => !p.details?.trim());

  return (
    <section id="passions" className="relative px-4 py-28 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="04"
          eyebrow="Off the field"
          title={<>What I love <span className="hl">beyond code</span></>}
          subtitle="The things that make me who I am — and the ones I'd never give up."
        />

        {pillars.length > 0 && (
          <div className={`grid gap-6 ${pillars.length > 1 ? "md:grid-cols-2" : ""}`}>
            {pillars.map((p, i) => (
              <motion.article
                key={p.title + i}
                initial={{ opacity: 0, y: 60, rotate: i % 2 ? 3 : -3 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={view}
                transition={{ duration: 0.8, delay: (i % 2) * 0.12, ease }}
                whileHover="hover"
                className={`relative flex flex-col overflow-hidden rounded-[2rem] border-[3px] border-pitch-950 p-8 text-pitch-950 shadow-[10px_10px_0_rgba(0,0,0,0.5)] sm:p-10 ${
                  pillars.length % 2 === 1 && i === pillars.length - 1 && pillars.length > 1 ? "md:col-span-2" : ""
                }`}
                style={{ background: kit(i) }}
              >
                {/* sun-ray burst behind the emoji */}
                <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 animate-[spin_30s_linear_infinite] rounded-full bg-[repeating-conic-gradient(rgba(3,20,13,0.07)_0deg_10deg,transparent_10deg_20deg)]" />
                <div className="relative flex items-start justify-between gap-4">
                  <span className="cond rounded-full bg-pitch-950 px-3 py-1.5 text-[11px] text-amber">Pillar {String(i + 1).padStart(2, "0")}</span>
                  <motion.span
                    variants={{ hover: { rotate: [0, -16, 16, -8, 0], scale: 1.2 } }}
                    transition={{ duration: 0.7 }}
                    className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-[3px] border-pitch-950 bg-chalk text-5xl shadow-[4px_4px_0_#03140d]"
                  >
                    <span className="absolute -inset-2 animate-[spin_14s_linear_infinite] rounded-full border-2 border-dashed border-pitch-950/40" />
                    {p.emoji}
                  </motion.span>
                </div>
                <h3 className="font-display relative mt-4 text-5xl leading-[0.9] font-black uppercase sm:text-6xl">{p.title}</h3>
                {p.description && <p className="relative mt-4 text-xl leading-snug font-semibold">{p.description}</p>}
                <div className="relative mt-4 space-y-3">
                  {p.details!.split(/\n{2,}/).filter(Boolean).map((para, k) => (
                    <p key={k} className="text-lg leading-relaxed text-pitch-950/80">
                      {para}
                    </p>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {others.length > 0 && (
          <>
            {pillars.length > 0 && (
              <div className="mt-16 mb-6 flex items-center gap-4">
                <span className="cond text-sm text-lime">And also in my kit bag</span>
                <span className="h-0.5 flex-1 bg-[repeating-linear-gradient(90deg,rgba(245,239,220,0.25)_0_8px,transparent_8px_16px)]" />
              </div>
            )}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((p, i) => (
                <motion.article
                  key={p.title + i}
                  initial={{ opacity: 0, y: 50, rotate: i % 2 ? 4 : -4 }}
                  whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 1 : -1 }}
                  viewport={view}
                  transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease }}
                  whileHover="hover"
                  className={`relative overflow-hidden rounded-3xl border-2 border-pitch-950 p-7 text-pitch-950 shadow-[7px_7px_0_rgba(0,0,0,0.45)] ${
                    pillars.length === 0 && i === 0 ? "lg:col-span-2" : ""
                  }`}
                  style={{ background: kit(i + pillars.length) }}
                >
                  <span className="font-display pointer-events-none absolute -right-2 -bottom-8 text-[9rem] leading-none font-black text-pitch-950/[0.07]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <motion.div variants={{ hover: { rotate: [0, -14, 14, -8, 0], scale: 1.25 } }} transition={{ duration: 0.6 }} className="relative inline-block text-5xl">
                    {p.emoji}
                  </motion.div>
                  <h3 className="font-display relative mt-4 text-3xl font-black uppercase">{p.title}</h3>
                  <p className="relative mt-2 text-lg leading-relaxed text-pitch-950/80">{p.description}</p>
                </motion.article>
              ))}
            </div>
          </>
        )}

        {story.funFacts.length > 0 && (
          <div className="board mt-16 p-6 sm:p-8">
            <p className="cond flex items-center gap-2 text-xs text-lime">
              Quick facts
            </p>
            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={view}
              variants={{ show: { transition: { staggerChildren: 0.1 } } }}
              className="mt-5 flex flex-wrap gap-3"
            >
              {story.funFacts.map((f, i) => (
                <motion.li
                  key={i}
                  variants={{ hidden: { opacity: 0, scale: 0.5, y: 20 }, show: { opacity: 1, scale: 1, y: 0 } }}
                  transition={{ type: "spring", stiffness: 260, damping: 16 }}
                  whileHover={{ y: -4, rotate: i % 2 ? 2 : -2 }}
                  className="relative rounded-2xl rounded-bl-none bg-chalk px-5 py-3 font-semibold text-pitch-950"
                >
                  “{f}”
                </motion.li>
              ))}
            </motion.ul>
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------------- Goals: the run chase ---------------- */

const MILESTONES = [
  { runs: "50", name: "Fifty" },
  { runs: "100", name: "Century" },
  { runs: "200", name: "Double ton" },
  { runs: "300", name: "Triple ton" },
];

export function Goals({ story }: { story: Story }) {
  const goals = story.goals.slice(0, MILESTONES.length);
  return (
    <section id="future" className="relative px-4 py-28 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="05" eyebrow="The chase" title={<>Milestones I&apos;m <span className="hl">chasing</span></>} />


        {/* pitch with a rolling ball */}
        <div className="relative mb-10 hidden h-3 rounded-full bg-turf/30 md:block">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={view}
            transition={{ duration: 2, ease }}
            className="h-full rounded-full bg-gradient-to-r from-amber to-grass"
          />
          <motion.div
            initial={{ left: "0%", rotate: 0 }}
            whileInView={{ left: "100%", rotate: 720 }}
            viewport={view}
            transition={{ duration: 2, ease }}
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <CricketBall className="h-8 w-8" />
          </motion.div>
        </div>

        <div className={`grid gap-6 ${["", "md:grid-cols-1", "md:grid-cols-2", "md:grid-cols-3", "md:grid-cols-4"][goals.length] ?? ""}`}>
          {goals.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={view}
              transition={{ duration: 0.7, delay: 0.4 + i * 0.25, ease }}
              className="chalk-card relative p-7"
            >
              <div className="flex items-end justify-between">
                <span className="font-display text-6xl leading-none font-black text-grass">
                  {MILESTONES[i].runs}
                </span>
                <span className="cond rounded-full bg-pitch-950 px-3 py-1 text-[10px] text-amber">{MILESTONES[i].name}</span>
              </div>
              <p className="cond mt-5 text-xs text-ball">{g.horizon}</p>
              <h3 className="font-display mt-1 text-3xl font-black text-pitch-950 uppercase">{g.title}</h3>
              <p className="mt-2 leading-relaxed text-pitch-900/75">{g.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- The dream: world cup final ---------------- */

export function Dream({ story }: { story: Story }) {
  return (
    <section id="dream" className="relative px-4 py-28 sm:px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={view}
        transition={{ duration: 1, ease }}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border-4 border-pitch-950 bg-[radial-gradient(ellipse_at_top,#1d7a4a,#062118_70%)] px-6 py-20 text-center shadow-[14px_14px_0_rgba(0,0,0,0.5)] sm:px-16"
      >
        {/* confetti */}
        {Array.from({ length: 36 }).map((_, i) => (
          <motion.span
            key={i}
            aria-hidden
            className="absolute top-0 h-3 w-1.5 rounded-sm"
            style={{ left: `${(i * 29) % 100}%`, background: kit(i) }}
            animate={{ y: ["-10%", "620%"], rotate: [0, 360 * (i % 2 ? 1 : -1)], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: (i * 0.23) % 4, ease: "linear" }}
          />
        ))}
        <motion.div
          initial={{ y: 30, scale: 0.6 }}
          whileInView={{ y: 0, scale: 1 }}
          viewport={view}
          transition={{ type: "spring", stiffness: 160, damping: 10, delay: 0.3 }}
          className="relative text-8xl drop-shadow-[0_0_40px_rgba(255,176,32,0.7)]"
        >
          🏆
        </motion.div>
        <p className="cond relative mt-6 text-sm text-lime">The World Cup final · My dream</p>
        <h2 className="font-display relative mt-4 text-5xl leading-[0.95] font-black text-chalk uppercase sm:text-7xl">
          <Highlight text={story.dreamTitle} />
        </h2>
        {story.dreamText && <p className="relative mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-chalk/80">{story.dreamText}</p>}
      </motion.div>
    </section>
  );
}

/* ---------------- Gallery: photo wall ---------------- */

export function Gallery({ story }: { story: Story }) {
  const photos = story.gallery.filter((g) => g.image);
  const { shown, button: showMore } = useShowMore(photos, "photos", "moments");
  if (!photos.length) return null;
  return (
    <section id="moments" className="relative px-4 py-28 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="06" eyebrow="Photo wall" title={<>Moments <span className="hl">off camera</span></>} />
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {shown.map((p, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 2 : -2 }}
              whileHover={{ rotate: 0, scale: 1.03 }}
              viewport={view}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              className="relative mb-6 break-inside-avoid bg-chalk p-3 pb-12 shadow-[8px_8px_0_rgba(0,0,0,0.45)]"
            >
              <span className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-[-3deg] opacity-80" style={{ background: kit(i) }} />
              {/* width/height only reserve space; h-auto keeps each photo's real proportions */}
              <Image
                src={p.image}
                alt={p.caption || ""}
                width={800}
                height={600}
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 360px"
                className="h-auto w-full"
              />
              {p.caption && <figcaption className="font-display absolute inset-x-3 bottom-3 text-xl font-extrabold text-pitch-950 uppercase">{p.caption}</figcaption>}
            </motion.figure>
          ))}
        </div>
        {showMore}
      </div>
    </section>
  );
}

/* ---------------- Connect ---------------- */

function handleFrom(url: string) {
  try {
    const parts = new URL(url).pathname.split("/").filter(Boolean);
    const last = parts[parts.length - 1];
    return last ? `@${decodeURIComponent(last)}` : new URL(url).hostname;
  } catch {
    return url;
  }
}

export function Connect({ story, profile }: { story: Story; profile: Profile }) {
  const cards = [
    ...(profile.email ? [{ key: "email", href: `mailto:${profile.email}`, icon: <HiOutlineMail className="h-6 w-6" />, label: "Email", handle: profile.email }] : []),
    ...profile.socials.map((s) => ({
      key: s.platform + s.url,
      href: s.url,
      icon: <SocialIcon platform={s.platform} className="h-6 w-6" />,
      label: socialMeta(s.platform).label,
      handle: handleFrom(s.url),
    })),
  ];

  return (
    <section id="connect" className="relative px-4 py-28 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="07" eyebrow="Find me online" title={story.connectTitle || "Let's connect"} subtitle={story.connectText} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <motion.a
              key={c.key}
              href={c.href}
              target={c.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, rotate: i % 2 ? 1.5 : -1.5 }}
              viewport={view}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="chalk-card flex items-center gap-4 overflow-hidden p-4 pr-5"
            >
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 border-pitch-950 text-pitch-950" style={{ background: kit(i) }}>
                {c.icon}
              </span>
              <span className="min-w-0 flex-1">
                <span className="font-display block text-2xl leading-tight font-black text-pitch-950 uppercase">{c.label}</span>
                <span className="block truncate text-sm text-pitch-900/60">{c.handle}</span>
              </span>
            </motion.a>
          ))}
        </div>
        <div className="mt-14 flex flex-wrap justify-center gap-3">
          <a href="/#projects" className="btn-ball">
            See my highlights
          </a>
          <a href="/#contact" className="btn-chalk">
            Send me a message
          </a>
        </div>
      </div>
    </section>
  );
}
