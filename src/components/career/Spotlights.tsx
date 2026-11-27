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
      {/* quiet event number in the corner */}
      <span
        aria-hidden
        className={`font-display pointer-events-none absolute -bottom-10 text-[11rem] leading-none font-black text-pitch-950/[0.05] ${flip ? "left-6" : "right-6"}`}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className={`relative grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:gap-12 lg:p-12 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
        {/* story */}
        <div>
          <div className="flex items-center gap-3.5">
            <motion.span
              variants={{ hover: { rotate: [0, -10, 10, -4, 0] } }}
              transition={{ duration: 0.6 }}
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-pitch-950 bg-chalk text-3xl shadow-[3px_3px_0_#03140d] sm:h-16 sm:w-16 sm:text-4xl"
            >
              {item.emoji}
            </motion.span>
            <div className="min-w-0">
              <span className="cond inline-block rounded-full bg-pitch-950 px-3 py-1 text-[10px] text-amber">
                Main event {String(index + 1).padStart(2, "0")}
              </span>
              {item.eyebrow && <p className="cond mt-1.5 truncate text-xs text-pitch-950/65">{item.eyebrow}</p>}
            </div>
          </div>

          <h3 className="hl-plate font-display mt-6 text-5xl leading-[0.95] font-black uppercase sm:text-6xl">
            <Highlight text={item.title} />
          </h3>

          <div className="mt-5 space-y-4">
            {lines(item.text.replace(/\n{2,}/g, "\n")).map((para, k) => (
              <p key={k} className="max-w-xl text-[1.05rem] leading-relaxed text-pitch-950/85">
                {para}
              </p>
            ))}
          </div>

          {points.length > 0 && (
            <ul className="mt-7 grid gap-2 sm:grid-cols-2">
              {points.map((p, k) => (
                <motion.li
                  key={k}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + k * 0.08, duration: 0.5, ease }}
                  className="flex items-start gap-2.5 rounded-xl bg-chalk/60 px-3.5 py-2.5 text-[0.95rem] font-semibold ring-1 ring-pitch-950/10"
                >
                  <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-pitch-950 text-[10px] text-amber">✓</span>
                  <span className="leading-snug">{p}</span>
                </motion.li>
              ))}
            </ul>
          )}
        </div>

        {/* photos on top, quote card below */}
        {(quotes.length > 0 || photos.length > 0) && (
          <div className={`flex flex-col gap-6 ${photos.length ? "self-start" : "self-center"}`}>
            {photos.length > 0 && <PhotoReel photos={photos} title={item.title.replace(/\*/g, "")} />}
            {quotes.length > 0 && <QuoteBoard quotes={quotes} compact={photos.length > 0} />}
          </div>
        )}
      </div>
    </motion.article>
  );
}

function QuoteBoard({ quotes, compact = false }: { quotes: { text: string; author: string }[]; compact?: boolean }) {
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
      className={`relative flex flex-col rounded-[1.5rem] bg-pitch-950 text-chalk shadow-[6px_6px_0_rgba(3,20,13,0.3)] ${
        compact ? "min-h-[12rem] p-6 sm:p-7" : "min-h-[15rem] p-7 sm:p-9"
      }`}
    >
      <p className="cond relative flex items-center gap-2 text-[11px] text-lime">
        <span aria-hidden className="font-display text-4xl leading-none text-amber">“</span>
        Words I live by
      </p>

      <div className="relative mt-3 flex flex-1 items-center">
        <AnimatePresence mode="wait">
          <motion.figure
            key={active}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.5, ease }}
          >
            <blockquote className={`leading-snug font-semibold ${compact ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"}`}>{q.text}</blockquote>
            {q.author && <figcaption className="cond mt-4 text-xs text-amber">— {q.author}</figcaption>}
          </motion.figure>
        </AnimatePresence>
      </div>

      {many && (
        <div className="relative mt-6 flex items-center gap-2">
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
      className="relative rounded-[1.5rem] border-2 border-pitch-950 bg-chalk p-2 shadow-[6px_6px_0_rgba(3,20,13,0.3)]"
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
