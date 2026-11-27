"use client";

import { useEffect, useRef, useState } from "react";
import { CricketBall } from "./cricket";

const SHOT_MS = 520;
const SWING_MS = 420; // bat swing length (must match the bat-swing CSS animation)
const CONTACT_MS = 185; // when, during the swing, the bat meets the ball
// the two cursor images, their click points (hotspots) and the handle end the bat swings around
const BATS = {
  idle: { src: "/cursors/bat.svg", hot: [5, 5], pivot: [24, 24] },
  ready: { src: "/cursors/bat-ready.svg", hot: [11, 2], pivot: [20, 27] },
} as const;
const TRAIL = 6;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * The ball that goes with the bat cursor (mouse users only). It follows just in front of the bat's face
 * and rolls as it moves. Every click plays a small shot: a swing streak and impact ring at the bat, then
 * the ball is driven away along a curved arc with a fading trail, and rolls back.
 * Plain requestAnimationFrame + CSS — no animation library needed.
 */
export default function BallCursor() {
  const [enabled, setEnabled] = useState(false);
  const ballRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLSpanElement | null)[]>([]);

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
    // the shot in progress, if any
    let shot: { start: number; from: { x: number; y: number }; dx: number; dy: number; bend: number } | null = null;
    const history: { x: number; y: number }[] = [];

    const move = (e: PointerEvent) => {
      // sit just below-right of the bat's face (the bat's tip is the pointer)
      target.x = e.clientX + 10;
      target.y = e.clientY + 18;
    };

    const burst = (x: number, y: number) => {
      // swing streak + impact ring at the point of contact; removed when their CSS animation ends
      for (const cls of ["shot-swing", "shot-ring"]) {
        const el = document.createElement("span");
        el.className = cls;
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        el.setAttribute("aria-hidden", "true");
        el.addEventListener("animationend", () => el.remove());
        document.body.appendChild(el);
      }
    };

    // A real cursor image can't move, so for the swing we hide it and put an identical bat in its place.
    let swingBat: HTMLImageElement | null = null;
    let swingTimer = 0;
    const endSwing = () => {
      document.documentElement.classList.remove("batting");
      swingBat?.remove();
      swingBat = null;
    };
    const swing = (e: PointerEvent) => {
      window.clearTimeout(swingTimer);
      endSwing();
      const over = (e.target as HTMLElement | null)?.closest("a, button, [role='button'], label, summary, select");
      const bat = over ? BATS.ready : BATS.idle;
      const img = document.createElement("img");
      img.src = bat.src;
      img.alt = "";
      img.className = "shot-bat";
      img.style.left = `${e.clientX - bat.hot[0]}px`;
      img.style.top = `${e.clientY - bat.hot[1]}px`;
      img.style.transformOrigin = `${bat.pivot[0]}px ${bat.pivot[1]}px`;
      document.body.appendChild(img);
      document.documentElement.classList.add("batting");
      swingBat = img;
      swingTimer = window.setTimeout(endSwing, SWING_MS);
    };

    const strike = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      if ((e.target as HTMLElement | null)?.closest("input, textarea, select, [contenteditable='true']")) return;
      swing(e);
      // a random stroke anywhere in the upper half: pull to the left … drive straight … cut to the right
      const angle = (-160 + Math.random() * 140) * (Math.PI / 180);
      const dist = 110 + Math.random() * 50;
      shot = {
        start: performance.now() + CONTACT_MS, // the ball leaves when the bat meets it
        from: { x: pos.x, y: pos.y },
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist,
        bend: (Math.random() < 0.5 ? -1 : 1) * (18 + Math.random() * 14),
      };
      history.length = 0;
      const cx = e.clientX + 8, cy = e.clientY + 14;
      window.setTimeout(() => {
        spin += 720;
        burst(cx, cy);
      }, CONTACT_MS);
    };

    const tick = (now: number) => {
      let x: number, y: number;
      if (shot && now >= shot.start) {
        const t = Math.min((now - shot.start) / SHOT_MS, 1);
        const k = easeOut(t);
        // straight line to the landing point, bent sideways into an arc
        const len = Math.hypot(shot.dx, shot.dy) || 1;
        const nx = -shot.dy / len, ny = shot.dx / len;
        const arc = Math.sin(Math.PI * t) * shot.bend;
        x = shot.from.x + shot.dx * k + nx * arc;
        y = shot.from.y + shot.dy * k + ny * arc;
        pos.x = x;
        pos.y = y;
        spin += 14;
        history.unshift({ x, y });
        if (history.length > TRAIL * 2) history.pop();
        if (t >= 1) shot = null; // then it rolls back to the bat via the normal follow below
      } else {
        if (shot) shot.from = { x: pos.x, y: pos.y }; // still waiting for contact: launch from wherever it is
        const dx = (target.x - pos.x) * 0.2;
        pos.x += dx;
        pos.y += (target.y - pos.y) * 0.2;
        spin += dx * 1.2; // rolls in the direction it travels
        x = pos.x;
        y = pos.y;
        if (history.length) history.pop();
      }
      if (ballRef.current) ballRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${spin}deg)`;
      trailRefs.current.forEach((dot, i) => {
        const p = history[(i + 1) * 2];
        if (!dot) return;
        if (!p) {
          dot.style.opacity = "0";
          return;
        }
        dot.style.opacity = String(0.45 * (1 - i / TRAIL));
        dot.style.transform = `translate3d(${p.x + 3}px, ${p.y + 3}px, 0) scale(${1 - i * 0.12})`;
      });
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", strike, { passive: true });
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", strike);
      cancelAnimationFrame(frame);
      window.clearTimeout(swingTimer);
      endSwing();
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      {Array.from({ length: TRAIL }).map((_, i) => (
        <span
          key={i}
          ref={(el) => {
            trailRefs.current[i] = el;
          }}
          aria-hidden
          className="pointer-events-none fixed top-0 left-0 z-[79] h-2.5 w-2.5 rounded-full bg-[#f5efdc] opacity-0 will-change-transform"
        />
      ))}
      <div ref={ballRef} aria-hidden className="pointer-events-none fixed top-0 left-0 z-[80] drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)] will-change-transform">
        <CricketBall className="h-4 w-4" />
      </div>
    </>
  );
}
