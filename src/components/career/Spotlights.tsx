"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, m as motion } from "framer-motion";
import type { StorySpotlight } from "@/lib/types";
import SectionHeading from "@/components/site/SectionHeading";
import { kit } from "@/components/site/palette";
import Highlight from "./Highlight";

const ease = [0.22, 1, 0.36, 1] as const;
const QUOTE_MS = 6500;

const lines = (text: string) =>
  (text || "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

/** "Quote — Author" → { text, author }. Also accepts " - " as the separator. */
function parseQuote(line: string) {
  const at = Math.max(line.lastIndexOf(" — "), line.lastIndexOf(" – "), line.lastIndexOf(" - "));
  if (at <= 0) return { text: line.replace(/^["“]|["”]$/g, ""), author: "" };
  return { text: line.slice(0, at).trim().replace(/^["“]|["”]$/g, ""), author: line.slice(at + 3).trim() };
}

/** Big "main event" panels for the most important parts of life. */
export default function Spotlights({ items }: { items: StorySpotlight[] }) {
  return (
    <section id="spotlight" className="relative px-4 py-28 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="01"
          eyebrow="Headline acts"
          title={
            <>
              What <span className="hl">defines</span> me
            </>
          }
          subtitle="The things I give the most to — on and off the field."
        />
        <div className="space-y-12">
          {items.map((s, i) => (
            <Spotlight key={s.title + i} item={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Spotlight({ item, index }: { item: StorySpotlight; index: number }) {
  const points = lines(item.points);
  const quotes = lines(item.quotes).map(parseQuote);
  const photos = (item.photos ?? []).filter(Boolean);
  const flip = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease }}
      whileHover="hover"
      className="relative overflow-hidden rounded-[2.25rem] border-[3px] border-pitch-950 text-pitch-950 shadow-[12px_12px_0_rgba(0,0,0,0.5)]"
      style={{ background: kit(index) }}
    >
      {/* giant faded event number */}
      <span
        aria-hidden
        className={`font-display pointer-events-none absolute -bottom-16 text-[16rem] leading-none font-black text-pitch-950/[0.06] ${flip ? "left-4" : "right-4"}`}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      {/* sun-ray burst */}
      <div
        aria-hidden
        className={`pointer-events-none absolute -top-32 h-96 w-96 animate-[spin_40s_linear_infinite] rounded-full bg-[repeating-conic-gradient(rgba(3,20,13,0.06)_0deg_9deg,transparent_9deg_18deg)] ${
          flip ? "-right-32" : "-left-32"
        }`}
      />

      <div className={`relative grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.15fr_1fr] lg:gap-12 lg:p-12 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
        {/* story */}
        <div>
          <div className="flex flex-wrap items-center gap-4">
            <motion.span
              variants={{ hover: { rotate: [0, -14, 14, -6, 0], scale: 1.1 } }}
              transition={{ duration: 0.7 }}
              className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-[3px] border-pitch-950 bg-chalk text-4xl shadow-[4px_4px_0_#03140d] sm:h-24 sm:w-24 sm:text-5xl"
            >
              <span className="absolute -inset-2 animate-[spin_14s_linear_infinite] rounded-full border-2 border-dashed border-pitch-950/40" />
              {item.emoji}
            </motion.span>
            <div>
              <span className="cond inline-block rounded-full bg-pitch-950 px-3 py-1.5 text-[11px] text-amber">
                Main event {String(index + 1).padStart(2, "0")}
              </span>
              {item.eyebrow && <p className="cond mt-2 text-xs text-pitch-950/70">{item.eyebrow}</p>}
            </div>
          </div>

          <h3 className="hl-plate font-display mt-6 text-5xl leading-[0.95] font-black uppercase sm:text-7xl">
            <Highlight text={item.title} />
          </h3>

          <div className="mt-5 space-y-4">
            {lines(item.text.replace(/\n{2,}/g, "\n")).map((para, k) => (
              <p key={k} className="text-lg leading-relaxed text-pitch-950/85">
                {para}
              </p>
            ))}
          </div>

          {points.length > 0 && (
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {points.map((p, k) => (
                <motion.li
                  key={k}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + k * 0.08, duration: 0.5, ease }}
                  className="flex items-start gap-2.5 rounded-xl border-2 border-pitch-950/15 bg-chalk/55 px-3.5 py-2.5 font-semibold"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pitch-950 text-[11px] text-amber">✓</span>
                  <span className="leading-snug">{p}</span>
                </motion.li>
              ))}
            </ul>
          )}
        </div>

        {/* quotes */}
        {(quotes.length > 0 || photos.length > 0) && (
          <div className="flex flex-col gap-7 self-center">
            {quotes.length > 0 && <QuoteBoard quotes={quotes} />}
            {photos.length > 0 && <PhotoReel photos={photos} title={item.title.replace(/\*/g, "")} />}
          </div>
        )}
      </div>
    </motion.article>
  );
}

function QuoteBoard({ quotes }: { quotes: { text: string; author: string }[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const many = quotes.length > 1;

  useEffect(() => {
    if (!many || paused) return;
    const t = setInterval(() => setActive((a) => (a + 1) % quotes.length), QUOTE_MS);
    return () => clearInterval(t);
  }, [many, paused, quotes.length]);

  const q = quotes[Math.min(active, quotes.length - 1)];

  return (
    <div
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      className="relative flex min-h-[18rem] flex-col rounded-[1.75rem] border-[3px] border-pitch-950 bg-pitch-950 p-8 text-chalk shadow-[8px_8px_0_rgba(3,20,13,0.35)] sm:p-10"
    >
      <span aria-hidden className="font-display pointer-events-none absolute -top-6 left-6 text-[9rem] leading-none text-amber">
        “
      </span>
      <p className="cond relative mt-8 text-[11px] text-lime">Words I live by</p>

      <div className="relative mt-4 flex flex-1 items-center">
        <AnimatePresence mode="wait">
          <motion.figure
            key={active}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.5, ease }}
          >
            <blockquote className="text-2xl leading-snug font-semibold sm:text-[1.7rem]">{q.text}</blockquote>
            {q.author && <figcaption className="cond mt-5 text-sm text-amber">— {q.author}</figcaption>}
          </motion.figure>
        </AnimatePresence>
      </div>

      {many && (
        <div className="relative mt-8 flex items-center gap-2">
          {quotes.map((_, k) => (
            <button
              key={k}
              type="button"
              onClick={() => setActive(k)}
              aria-label={`Show quote ${k + 1}`}
              className={`h-2.5 rounded-full transition-all ${k === active ? "w-8 bg-amber" : "w-2.5 bg-chalk/25 hover:bg-chalk/50"}`}
            />
          ))}
          <span className="cond ml-auto text-[10px] text-chalk/40">
            {active + 1} / {quotes.length}
          </span>
        </div>
      )}
    </div>
  );
}

/** Small swipeable photo carousel that auto-advances (pauses on hover). */
function PhotoReel({ photos, title }: { photos: string[]; title: string }) {
  const [[active, dir], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const many = photos.length > 1;
  const go = (step: number) => setState(([a]) => [(a + step + photos.length) % photos.length, step]);

  useEffect(() => {
    if (!many || paused) return;
    const t = setInterval(() => setState(([a]) => [(a + 1) % photos.length, 1]), 4500);
    return () => clearInterval(t);
  }, [many, paused, photos.length]);

  const i = Math.min(active, photos.length - 1);

  // Swipe without framer's drag feature (keeps the lightweight animation bundle).
  const swipeStart = useRef<number | null>(null);
  const onSwipeStart = (e: React.PointerEvent) => {
    if (many) swipeStart.current = e.clientX;
  };
  const onSwipeEnd = (e: React.PointerEvent) => {
    if (swipeStart.current === null) return;
    const dx = e.clientX - swipeStart.current;
    swipeStart.current = null;
    if (dx < -50) go(1);
    else if (dx > 50) go(-1);
  };

  return (
    <div
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      className="relative rotate-[-1.2deg] rounded-[1.5rem] border-[3px] border-pitch-950 bg-chalk p-2.5 shadow-[8px_8px_0_rgba(3,20,13,0.35)] transition-transform duration-300 hover:rotate-0"
    >
      <div
        onPointerDown={onSwipeStart}
        onPointerUp={onSwipeEnd}
        onPointerCancel={() => (swipeStart.current = null)}
        className={`relative aspect-[4/3] touch-pan-y overflow-hidden rounded-[1rem] bg-pitch-950 select-none ${many ? "cursor-grab active:cursor-grabbing" : ""}`}
      >
        <AnimatePresence initial={false} custom={dir}>
          <motion.div
            key={i}
            custom={dir}
            variants={{
              enter: (d: number) => ({ x: `${d * 100}%`, opacity: 0.4 }),
              center: { x: 0, opacity: 1 },
              exit: (d: number) => ({ x: `${d * -100}%`, opacity: 0.4 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease }}
            className="absolute inset-0"
          >
            <Image
              src={photos[i]}
              alt={`${title} — photo ${i + 1}`}
              fill
              draggable={false}
              sizes="(max-width: 1024px) 88vw, 460px"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {many && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className="absolute top-1/2 left-2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-pitch-950/70 text-chalk backdrop-blur transition hover:bg-amber hover:text-pitch-950"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photo"
              className="absolute top-1/2 right-2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-pitch-950/70 text-chalk backdrop-blur transition hover:bg-amber hover:text-pitch-950"
            >
              ›
            </button>
          </>
        )}
      </div>

      {many && (
        <div className="flex items-center gap-1.5 px-1.5 pt-2.5 pb-0.5">
          {photos.map((_, k) => (
            <button
              key={k}
              type="button"
              onClick={() => setState([k, k > i ? 1 : -1])}
              aria-label={`Show photo ${k + 1}`}
              className={`h-2 rounded-full transition-all ${k === i ? "w-6 bg-pitch-950" : "w-2 bg-pitch-950/25 hover:bg-pitch-950/50"}`}
            />
          ))}
          <span className="cond ml-auto text-[10px] text-pitch-950/50">
            {i + 1} / {photos.length}
          </span>
        </div>
      )}
    </div>
  );
}
