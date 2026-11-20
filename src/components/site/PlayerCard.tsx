"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { CricketBall } from "./cricket";

type Props = {
  photo: string;
  name: string;
  label: string;
  sub?: string;
  stamp?: string;
  stickers?: string[];
  delay?: number;
};

/** A collectible player trading card with 3D tilt, a spinning ball and optional floating emoji stickers. */
export default function PlayerCard({ photo, name, label, sub, stamp, stickers = [], delay = 0.4 }: Props) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [10, -10]), { stiffness: 180, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-12, 12]), { stiffness: 180, damping: 18 });
  const shine = useTransform(mx, [0, 1], ["0%", "100%"]);

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
      className="relative mx-auto w-64 sm:w-80"
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
            style={{ background: ["#ffb020", "#ff5fa2", "#38bdf8", "#c4f442", "#ff8a2a", "#a78bfa", "#f5efdc"][i % 7], animationDelay: `${i * 0.6}s`, ["--r" as string]: `${i % 2 ? 8 : -8}deg` }}
          >
            {s}
          </span>
        </motion.span>
      ))}

      <motion.div
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width);
          my.set((e.clientY - r.top) / r.height);
        }}
        onPointerLeave={() => {
          mx.set(0.5);
          my.set(0.5);
        }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative rounded-[26px] border-4 border-pitch-950 bg-chalk p-3 shadow-[12px_12px_0_rgba(0,0,0,0.45)]"
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
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photo} alt={name} className="aspect-[4/5] w-full object-cover" />
          ) : (
            <div className="aspect-[4/5] w-full" />
          )}
          <motion.div
            aria-hidden
            style={{ left: shine }}
            className="pointer-events-none absolute -inset-y-10 w-24 -translate-x-1/2 rotate-12 bg-white/25 blur-xl"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
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
      </motion.div>
    </motion.div>
  );
}
