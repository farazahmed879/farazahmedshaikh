"use client";

import { useEffect, useRef, useState } from "react";
import { CricketBall } from "./cricket";

/**
 * A small cricket ball that chases the pointer and spins as it moves (mouse users only).
 * Plain requestAnimationFrame easing — no animation library needed for this.
 */
export default function BallCursor() {
  const [enabled, setEnabled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (fine && !reduced) setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let spin = 0;
    let frame = 0;

    const move = (e: PointerEvent) => {
      target.x = e.clientX + 14;
      target.y = e.clientY + 14;
    };
    const tick = () => {
      const dx = (target.x - pos.x) * 0.22;
      pos.x += dx;
      pos.y += (target.y - pos.y) * 0.22;
      spin += dx * 1.2; // rolls in the direction it travels
      if (ref.current) ref.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) rotate(${spin}deg)`;
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", move, { passive: true });
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed top-0 left-0 z-[80] drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)] will-change-transform">
      <CricketBall className="h-5 w-5" />
    </div>
  );
}
