"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useVelocity, useTransform } from "framer-motion";
import { CricketBall } from "./cricket";

/** A small cricket ball that chases the pointer and spins as it moves (mouse users only). */
export default function BallCursor() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 260, damping: 22, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 260, damping: 22, mass: 0.5 });
  const vx = useVelocity(sx);
  const rotate = useTransform(vx, (v) => v / 4);
  const spin = useSpring(rotate, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX + 14);
      y.set(e.clientY + 14);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!enabled) return null;
  return (
    <motion.div aria-hidden style={{ x: sx, y: sy, rotate: spin }} className="pointer-events-none fixed top-0 left-0 z-[80] drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
      <CricketBall className="h-5 w-5" />
    </motion.div>
  );
}
