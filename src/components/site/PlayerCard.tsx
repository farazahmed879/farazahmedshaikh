"use client";

import { useEffect, useState } from "react";
import { m as motion } from "framer-motion";
import Image from "next/image";
import { CricketBall } from "./cricket";
import { KIT } from "./palette";

const PHOTO_MS = 4500;

type Props = {
  /** Up to 3 photos; with more than one they crossfade automatically. */
  photos: string[];
  name: string;
  label: string;
  sub?: string;
  stamp?: string;
  stickers?: string[];
  delay?: number;
};

/** A collectible player trading card with 3D tilt, a spinning ball and optional floating emoji stickers. */
export default function PlayerCard({ photos: allPhotos, name, label, sub, stamp, stickers = [], delay = 0.4 }: Props) {
  const photos = allPhotos.filter(Boolean).slice(0, 3);
  const [shown, setShown] = useState(0);
  const [paused, setPaused] = useState(false);
  const many = photos.length > 1;

  useEffect(() => {
    if (!many || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // a fresh timer after every change, so clicking a dot always gives that photo its full time
    const t = setTimeout(() => setShown((i) => (i + 1) % photos.length), PHOTO_MS);
    return () => clearTimeout(t);
  }, [many, paused, photos.length, shown]);

  // 3D tilt follows the pointer via CSS variables; a CSS transition gives it the springy ease.
  const tilt = (el: HTMLElement, x: number, y: number) => {
    el.style.setProperty("--rx", `${10 - y * 20}deg`);
    el.style.setProperty("--ry", `${x * 24 - 12}deg`);
    el.style.setProperty("--shine", `${x * 100}%`);
  };

  const spots = [
    "-left-10 top-6",
    "-right-10 top-24",
    "-left-12 bottom-24",
    "-right-8 bottom-6",
    "left-1/2 -top-12",
    "-left-6 top-1/2",
    "-right-12 top-1/2",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotate: 8 }}
      animate={{ opacity: 1, y: 0, rotate: -3 }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-56 sm:w-72 lg:w-80"
      style={{ perspective: 1000 }}
    >
      {stickers.slice(0, spots.length).map((s, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 0.8 + i * 0.12, type: "spring", stiffness: 260, damping: 14 }}
          className={`absolute ${spots[i]} z-20 hidden sm:block`}
        >
          <span
            className="animate-float flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-pitch-950 text-3xl shadow-[4px_4px_0_#03140d]"
            style={{ background: [...KIT, "#f5efdc"][i % (KIT.length + 1)], animationDelay: `${i * 0.6}s`, ["--r" as string]: `${i % 2 ? 8 : -8}deg` }}
          >
            {s}
          </span>
        </motion.span>
      ))}

      <div
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          tilt(e.currentTarget, (e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height);
        }}
        onPointerLeave={(e) => tilt(e.currentTarget, 0.5, 0.5)}
        style={{ transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))", transformStyle: "preserve-3d" }}
        className="relative transition-transform duration-300 ease-out rounded-[26px] border-4 border-pitch-950 bg-chalk p-3 shadow-[12px_12px_0_rgba(0,0,0,0.45)]"
      >
        {/* team stripes */}
        <div className="flex items-center gap-3 px-1 pb-2">
          <div className="flex gap-1">
            <span className="h-2.5 w-8 rounded-full bg-amber" />
            <span className="h-2.5 w-5 rounded-full bg-ball" />
            <span className="h-2.5 w-3 rounded-full bg-grass" />
          </div>
          <span className="cond text-[10px] text-pitch-900/60">Portfolio XI</span>
        </div>

        <div className="relative overflow-hidden rounded-2xl border-2 border-pitch-950 bg-pitch-800">
          <div className="relative aspect-[4/5] w-full" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
            {photos.map((src, i) => (
              // Photos are stacked and crossfade. The first is preloaded (above the fold); Next.js serves resized WebP/AVIF copies.
              <Image
                key={src + i}
                src={src}
                alt={i === 0 ? name : `${name} — photo ${i + 1}`}
                fill
                preload={i === 0}
                sizes="(max-width: 640px) 80vw, 360px"
                aria-hidden={i !== shown}
                className={`object-cover transition-opacity duration-1000 ease-in-out ${i === shown ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
          <div
            aria-hidden
            style={{ left: "var(--shine, 50%)" }}
            className="pointer-events-none absolute -inset-y-10 w-24 -translate-x-1/2 rotate-12 bg-white/25 blur-xl transition-[left] duration-300 ease-out"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
          {many && (
            <div className="absolute inset-x-0 bottom-2.5 z-10 flex justify-center gap-1.5">
              {photos.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setShown(i)}
                  aria-label={`Show photo ${i + 1}`}
                  aria-current={i === shown}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === shown ? "w-5 bg-chalk" : "w-1.5 bg-chalk/50 hover:bg-chalk/80"}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="px-1 pt-3 pb-1">
          <p className="font-display text-3xl leading-none font-black text-pitch-950 uppercase">{name}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="cond rounded-md bg-pitch-950 px-2 py-1 text-[11px] text-amber">{label}</span>
            {sub && <span className="cond text-[11px] text-pitch-900/60">{sub}</span>}
          </div>
        </div>

        <div className="absolute -top-5 -right-5 z-10 drop-shadow-[0_6px_10px_rgba(0,0,0,0.5)]">
          <CricketBall className="h-14 w-14 animate-[spin_5s_linear_infinite]" />
        </div>

        {stamp && (
          <motion.div
            initial={{ scale: 2.5, opacity: 0, rotate: -40 }}
            animate={{ scale: 1, opacity: 1, rotate: -14 }}
            transition={{ delay: delay + 1.2, type: "spring", stiffness: 300, damping: 15 }}
            className="cond absolute top-1/2 -left-8 z-10 rounded-xl border-[3px] border-ball bg-chalk px-3 py-1.5 text-sm text-ball shadow-lg"
          >
            {stamp}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
