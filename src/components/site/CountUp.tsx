"use client";

import { useEffect, useRef, useState } from "react";

const DURATION = 1800;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

/** Counts up the numeric part of values like "9+", "120k" or "98%" when scrolled into view. */
export default function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  const [display, setDisplay] = useState(match ? `${match[1]}0${match[3]}` : value);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match) return;
    const [, prefix, num, suffix] = match;
    const target = parseFloat(num);
    const decimals = num.includes(".") ? num.split(".")[1].length : 0;
    let frame = 0;

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / DURATION, 1);
        setDisplay(`${prefix}${(target * easeOut(t)).toFixed(decimals)}${suffix}`);
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          run();
        }
      },
      { rootMargin: "-40px" }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <span ref={ref}>{display}</span>;
}
