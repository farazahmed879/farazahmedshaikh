"use client";

import { m as motion } from "framer-motion";

/** A red leather cricket ball with a stitched seam. */
export function CricketBall({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <circle cx="20" cy="20" r="19" fill="#c61f2b" />
      <ellipse cx="13" cy="11" rx="7" ry="4.5" fill="#fff" opacity="0.22" transform="rotate(-30 13 11)" />
      <path d="M11 3.5 C 19 12, 19 28, 11 36.5" stroke="#f5efdc" strokeWidth="1.4" fill="none" strokeDasharray="2.2 2" />
      <path d="M29 3.5 C 21 12, 21 28, 29 36.5" stroke="#f5efdc" strokeWidth="1.4" fill="none" strokeDasharray="2.2 2" />
      <circle cx="20" cy="20" r="19" fill="none" stroke="#7d0f17" strokeWidth="1" />
    </svg>
  );
}

/** Three stumps and two bails. When `out` is true the bails fly off. */
export function Stumps({ out = false, className = "h-28 w-20" }: { out?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 80 120" className={className} aria-hidden overflow="visible">
      {[14, 36, 58].map((x) => (
        <rect key={x} x={x} y="18" width="8" height="100" rx="3" fill="#f5efdc" stroke="#03140d" strokeWidth="1.5" />
      ))}
      <motion.rect
        x="12"
        y="11"
        width="28"
        height="6"
        rx="3"
        fill="#ffb020"
        animate={out ? { x: -30, y: -60, rotate: -220, opacity: 0 } : { x: 0, y: 0, rotate: 0, opacity: 1 }}
        transition={{ duration: out ? 1 : 0.4, ease: "easeOut" }}
        style={{ originX: "26px", originY: "14px" }}
      />
      <motion.rect
        x="40"
        y="11"
        width="28"
        height="6"
        rx="3"
        fill="#ffb020"
        animate={out ? { x: 40, y: -70, rotate: 240, opacity: 0 } : { x: 0, y: 0, rotate: 0, opacity: 1 }}
        transition={{ duration: out ? 1.1 : 0.4, ease: "easeOut" }}
        style={{ originX: "54px", originY: "14px" }}
      />
    </svg>
  );
}

/** Camera flashes popping in the crowd. */
export function CrowdFlashes({ count = 30 }: { count?: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[45%] overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="animate-flash absolute h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_12px_4px_rgba(255,255,255,0.8)]"
          style={{
            left: `${(i * 37 + 11) % 100}%`,
            top: `${(i * 23 + 7) % 90}%`,
            animationDelay: `${((i * 1.37) % 7).toFixed(2)}s`,
            animationDuration: `${5 + (i % 5)}s`,
          }}
        />
      ))}
    </div>
  );
}
